import type { BonoboUiFrontendClient, BonoboUiMember } from "bonobo-plugin-sdk/frontend";
import type { CSSProperties, ChangeEvent, KeyboardEvent, PointerEvent } from "react";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
// The `@ariakit/react` barrel drags in Tab, Menu, Select, Form and the rest, and the published
// bundle has a hard 900,000-byte ceiling. The combobox subpath carries only what this file uses.
import * as Ariakit from "@ariakit/react/combobox";
import {
	chat_channel_is_private,
	chat_download_urls_response_schema,
	chat_files_list_response_schema,
	chat_filter_mention_members,
	chat_format_recency,
	chat_get_error_message,
	chat_insert_mention,
	chat_key_timestamp,
	chat_mention_ids_still_in_text,
	chat_mention_query_at,
	chat_mention_roster_refusal_copy,
	chat_message_key_prefix,
	chat_plugin_data_list_response_schema,
	chat_PRIVATE_CHANNEL_DISCLOSURE,
	chat_reaction_caller_key,
	chat_REACTION_EMOJI,
	chat_REACTION_LABELS,
	chat_REACTION_TOKENS,
	chat_reply_key_prefix,
	chat_reply_root_key,
	chat_validate_message_doc,
	chat_validate_reaction_doc,
	type chat_Attachment,
	type chat_ChannelValue,
	type chat_Doc,
	type chat_FilesListItem,
	type chat_MessageValue,
	type chat_ReactionDoc,
	type chat_ReactionToken,
} from "./chat-data";
import {
	chat_count_replies,
	chat_create_accumulating_store,
	chat_format_reply_count,
	chat_group_reactions,
	type chat_AccumulatingStore,
	type chat_ReactionGroup,
} from "./chat-store";
import { Dialog } from "./dialog";

/**
 * Member display names resolved through the SDK's members API, cached in the App. The object
 * keeps one identity for the page's lifetime (the App re-renders consumers itself when a
 * resolution lands), so watch effects may safely list it as a dependency.
 */
export type chat_MemberNamesApi = {
	/** undefined = not resolved yet; null = missing or deleted user ("Former member"). */
	get: (userId: string) => string | null | undefined;
	/** Resolves unknown ids through the SDK's members API; already-known ids are skipped. */
	resolve: (userIds: string[]) => Promise<void>;
};

// #region send queue

type PendingSend = {
	clientRequestId: string;
	text: string;
	attachments: chat_Attachment[];
	mentions: string[];
	status: "sending" | "failed";
	errorMessage: string | null;
};

/**
 * Optimistic sends for one composer. Every logical send mints one clientRequestId and
 * every retry of that send reuses it verbatim, so a replayed append answers the stored
 * key instead of writing the message twice.
 */
function use_send_queue(opts: {
	client: BonoboUiFrontendClient;
	collection: "messages" | "replies";
	keyPrefix: string;
	userId: string;
	onDelivered: (doc: chat_Doc<chat_MessageValue>) => void;
	/**
	 * A full store is not this send's problem, it is the channel's. Report it up so the channel
	 * says so once and stops the composer, instead of printing the same sentence on every row the
	 * member then tries to send.
	 */
	onStorageFull: (message: string) => void;
}) {
	const [pending, setPending] = useState<PendingSend[]>([]);

	const start = (entry: {
		clientRequestId: string;
		text: string;
		attachments: chat_Attachment[];
		mentions: string[];
	}) => {
		const value: chat_MessageValue = {
			text: entry.text,
			attachments: entry.attachments,
			editedAt: null,
			deletedAt: null,
			...(entry.mentions.length > 0 ? { mentions: entry.mentions } : {}),
		};
		opts.client.data
			.append({
				collection: opts.collection,
				keyPrefix: opts.keyPrefix,
				value,
				clientRequestId: entry.clientRequestId,
			})
			.then((result) => {
				if ("_nay" in result) {
					const storageFull = result._nay.name === "storage_full";
					if (storageFull) {
						opts.onStorageFull(result._nay.message);
					}
					setPending((prev) =>
						prev.map((p) =>
							p.clientRequestId === entry.clientRequestId
								? { ...p, status: "failed" as const, errorMessage: storageFull ? null : result._nay.message }
								: p,
						),
					);
					return;
				}
				setPending((prev) => prev.filter((p) => p.clientRequestId !== entry.clientRequestId));
				const key = result._yay.key;
				const timestamp = chat_key_timestamp(key) ?? Date.now();
				// Show the delivered message immediately; the watch echo replaces this synthetic
				// doc because the server revision is higher.
				opts.onDelivered({
					key,
					value,
					revision: 0,
					createdBy: opts.userId,
					updatedBy: opts.userId,
					createdAt: timestamp,
					updatedAt: timestamp,
					timestamp,
				});
			})
			.catch((error: unknown) => {
				setPending((prev) =>
					prev.map((p) =>
						p.clientRequestId === entry.clientRequestId
							? { ...p, status: "failed" as const, errorMessage: chat_get_error_message(error) }
							: p,
					),
				);
			});
	};

	const send = (text: string, attachments: chat_Attachment[], mentions: string[]) => {
		const clientRequestId = crypto.randomUUID();
		setPending((prev) => [
			...prev,
			{ clientRequestId, text, attachments, mentions, status: "sending", errorMessage: null },
		]);
		start({ clientRequestId, text, attachments, mentions });
	};

	const retry = (entry: PendingSend) => {
		setPending((prev) =>
			prev.map((p) =>
				p.clientRequestId === entry.clientRequestId ? { ...p, status: "sending" as const, errorMessage: null } : p,
			),
		);
		start(entry);
	};

	return { pending, send, retry, busy: pending.some((p) => p.status === "sending") };
}

// #endregion send queue

// #region attachments

/** Content-type families the attachment picker lists: images, media, and documents. */
const ATTACHABLE_CONTENT_TYPE_PREFIXES = ["image/", "video/", "audio/", "application/", "text/"];

/**
 * How many file ids one download-urls request may carry. The route itself clips the list at 20 and
 * charges one rate-limit unit per id, so a bigger request would spend the whole burst and silently
 * drop the tail.
 */
const DOWNLOAD_URL_BATCH_SIZE = 20;

/** What one attachment resolved to. Absent from the map means "not resolved yet". */
type AttachmentResolution = { kind: "ready"; url: string } | { kind: "error"; message: string };

/**
 * One message's attachments. Nothing is requested until a member opens one; that click then
 * resolves the whole message at once, because a batch costs the same rate-limit budget as the same
 * number of single calls and saves the round trips.
 *
 * URLs are never stored in the message doc: every resolve asks the server again, so it rechecks
 * this member's permission on each file.
 */
function MessageAttachments(props: { client: BonoboUiFrontendClient; attachments: chat_Attachment[] }) {
	const [resolved, setResolved] = useState(new Map<string, AttachmentResolution>());
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
	const focusFileNodeIdRef = useRef<string | null>(null);

	// The clicked button is replaced by its link, so move focus onto the link. Without this the
	// member's focus falls back to the document and they lose their place in the log.
	useEffect(() => {
		const fileNodeId = focusFileNodeIdRef.current;
		if (fileNodeId === null) {
			return;
		}
		const link = linkRefs.current.get(fileNodeId);
		if (link) {
			focusFileNodeIdRef.current = null;
			link.focus();
		}
	}, [resolved]);

	const handle_resolve = (fileNodeId: string) => {
		focusFileNodeIdRef.current = fileNodeId;
		setLoading(true);
		setError(null);
		(async (/* iife */) => {
			const next = new Map(resolved);
			// Walk this component's own list in batches. `truncated` cannot drive the tail: it is
			// true only for a request that carried more than 20 ids, so a request already capped at
			// 20 always answers false and a message with 21 attachments would lose the last one.
			for (let index = 0; index < props.attachments.length; index += DOWNLOAD_URL_BATCH_SIZE) {
				const batch = props.attachments.slice(index, index + DOWNLOAD_URL_BATCH_SIZE);
				const raw: unknown = await props.client.fetchJson("/api/v1/files/download-urls", {
					body: { fileNodeIds: batch.map((attachment) => attachment.fileNodeId) },
				});
				const parsed = chat_download_urls_response_schema.safeParse(raw);
				if (!parsed.success) {
					throw new Error("Unexpected response for the download links");
				}
				for (const item of parsed.data.items) {
					next.set(item.fileNodeId, { kind: "ready", url: item.url });
				}
				for (const failure of parsed.data.errors) {
					next.set(failure.fileNodeId, { kind: "error", message: failure.message });
				}
			}
			return next;
		})()
			.then((next) => {
				setLoading(false);
				setResolved(next);
			})
			.catch((resolveError: unknown) => {
				setLoading(false);
				focusFileNodeIdRef.current = null;
				setError(chat_get_error_message(resolveError));
			});
	};

	return (
		<div className="message-attachments">
			{props.attachments.map((attachment) => {
				const state = resolved.get(attachment.fileNodeId);
				if (state?.kind === "ready") {
					return (
						<span key={attachment.fileNodeId} className="attachment">
							<a
								ref={(element) => {
									if (element === null) {
										linkRefs.current.delete(attachment.fileNodeId);
									} else {
										linkRefs.current.set(attachment.fileNodeId, element);
									}
								}}
								className="attachment-link"
								href={state.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								{attachment.name}
							</a>
							<span className="attachment-hint">Link ready — it expires after a few minutes.</span>
						</span>
					);
				}

				return (
					<span key={attachment.fileNodeId} className="attachment">
						<button
							type="button"
							className="attachment-button"
							disabled={loading}
							onClick={() => handle_resolve(attachment.fileNodeId)}
						>
							{loading ? `Getting link for ${attachment.name}…` : attachment.name}
						</button>
						{state?.kind === "error" ? (
							<span className="attachment-error" role="alert">
								{state.message}
							</span>
						) : null}
					</span>
				);
			})}
			{error !== null ? (
				<span className="attachment-error" role="alert">
					{error}
				</span>
			) : null}
		</div>
	);
}

function AttachmentPickerDialog(props: {
	client: BonoboUiFrontendClient;
	onPick: (attachment: chat_Attachment) => void;
	onClose: () => void;
}) {
	const titleId = useId();
	const [items, setItems] = useState<chat_FilesListItem[]>([]);
	const [cursor, setCursor] = useState<string | null>(null);
	const [isDone, setIsDone] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const seenNodeIdsRef = useRef(new Set<string>());
	const startedRef = useRef(false);

	const handle_load = () => {
		setLoading(true);
		setError(null);
		props.client
			.fetchJson("/api/v1/files/list", {
				body: {
					path: "/",
					recursive: true,
					kind: "file",
					limit: 100,
					scanLimit: 10_000,
					contentTypePrefixes: ATTACHABLE_CONTENT_TYPE_PREFIXES,
					cursor,
				},
			})
			.then((raw: unknown) => {
				setLoading(false);
				const parsed = chat_files_list_response_schema.safeParse(raw);
				if (!parsed.success) {
					setError("Unexpected response from the file list");
					return;
				}
				const fresh = parsed.data.items.filter((item) => !seenNodeIdsRef.current.has(item.nodeId));
				for (const item of fresh) {
					seenNodeIdsRef.current.add(item.nodeId);
				}
				setItems((prev) => [...prev, ...fresh]);
				setCursor(parsed.data.cursor);
				setIsDone(parsed.data.isDone);
			})
			.catch((loadError: unknown) => {
				setLoading(false);
				setError(chat_get_error_message(loadError));
			});
	};

	useEffect(() => {
		// A ref guard, not an effect dependency: the load closure changes with the cursor.
		if (startedRef.current) {
			return;
		}
		startedRef.current = true;
		handle_load();
	}, []);

	return (
		<Dialog labelledBy={titleId} onClose={props.onClose}>
			<h2 id={titleId} className="dialog-title">
				Attach a file
			</h2>
			<button type="button" className="button" data-dialog-initial onClick={props.onClose}>
				Cancel
			</button>
			{items.length > 0 ? (
				<ul className="picker-list">
					{items.map((item) => (
						<li key={item.nodeId}>
							<button
								type="button"
								className="picker-item"
								onClick={() => props.onPick({ fileNodeId: item.nodeId, name: item.name })}
							>
								<span className="picker-item-name">{item.name}</span>
								<span className="picker-item-path">{item.path}</span>
							</button>
						</li>
					))}
				</ul>
			) : null}
			{loading ? (
				<div className="channel-status" role="status">
					Loading files…
				</div>
			) : null}
			{error !== null ? (
				<div className="channel-status is-error" role="alert">
					<span>{error}</span>
					<button type="button" className="button" onClick={handle_load}>
						Retry
					</button>
				</div>
			) : null}
			{!loading && error === null && items.length === 0 && isDone ? (
				<div className="channel-status">No files found.</div>
			) : null}
			{!isDone && !loading && error === null ? (
				<button type="button" className="button" onClick={handle_load}>
					Load more
				</button>
			) : null}
		</Dialog>
	);
}

// #endregion attachments

// #region composer

type Composer_Props = {
	client: BonoboUiFrontendClient;
	label: string;
	busy: boolean;
	/**
	 * The store refused a write, so sending cannot succeed until somebody frees space. The text
	 * box stays editable on purpose: disabling it would take it out of the tab order and throw
	 * away whatever the member had already typed.
	 */
	disabled: boolean;
	onSend: (text: string, attachments: chat_Attachment[], mentions: string[]) => void;
};

/** How many people the @-menu offers at once — a menu a person scans, not a roster. */
const MENTION_MENU_SIZE = 8;

/** One `members.list` page. The SDK refuses anything outside 1..100. */
const MENTION_ROSTER_PAGE_SIZE = 100;

/**
 * Stop paging after this many pages even if the cursor continues. A 10,000-member workspace
 * must not spend the first "@" walking the whole list.
 */
const MENTION_ROSTER_MAX_PAGES = 10;

type MentionRoster =
	| { status: "ready"; members: BonoboUiMember[] }
	| { status: "refused"; name: string };

const mention_roster_cache = new WeakMap<BonoboUiFrontendClient, MentionRoster>();
const mention_roster_inflight = new WeakMap<BonoboUiFrontendClient, Promise<MentionRoster>>();

/**
 * Loads the workspace roster once per client for the life of the page. The first "@" starts
 * it; later keystrokes and the thread composer reuse the same answer.
 */
function load_mention_roster(client: BonoboUiFrontendClient): Promise<MentionRoster> {
	const cached = mention_roster_cache.get(client);
	if (cached !== undefined) {
		return Promise.resolve(cached);
	}
	const inflight = mention_roster_inflight.get(client);
	if (inflight !== undefined) {
		return inflight;
	}
	const pending = fetch_mention_roster(client).then((roster) => {
		// Cache only answers. A transient refusal (a connection blip on the first "@") must not
		// disable mentions for the rest of the page's life; the composer that saw it keeps it in
		// its own state, and the next composer mount asks again.
		if (roster.status === "ready") {
			mention_roster_cache.set(client, roster);
		}
		mention_roster_inflight.delete(client);
		return roster;
	});
	mention_roster_inflight.set(client, pending);
	return pending;
}

async function fetch_mention_roster(client: BonoboUiFrontendClient): Promise<MentionRoster> {
	const members: BonoboUiMember[] = [];
	let cursor: string | undefined;
	for (let page = 0; page < MENTION_ROSTER_MAX_PAGES; page += 1) {
		const result = await client.members.list({
			limit: MENTION_ROSTER_PAGE_SIZE,
			...(cursor === undefined ? {} : { cursor }),
		});
		if ("_nay" in result) {
			// Keep names from earlier pages. A first-page refusal must not look like an empty
			// workspace, because the SDK never answers that way.
			if (members.length > 0) {
				return { status: "ready", members };
			}
			return { status: "refused", name: result._nay.name };
		}
		members.push(...result._yay.members);
		if (result._yay.cursor === null) {
			return { status: "ready", members };
		}
		cursor = result._yay.cursor;
	}
	return { status: "ready", members };
}

function mention_item_id(userId: string) {
	return `mention:${userId}`;
}

function Composer(props: Composer_Props) {
	const hintId = useId();
	const [text, setText] = useState("");
	const [attachments, setAttachments] = useState<chat_Attachment[]>([]);
	const [pickerOpen, setPickerOpen] = useState(false);
	/** null = never asked; "loading" = first "@" in flight. */
	const [mentionRoster, setMentionRoster] = useState<MentionRoster | "loading" | null>(null);
	/** The `@word` under the caret: where the `@` sits and what follows it. */
	const [mentionQuery, setMentionQuery] = useState<{ start: number; query: string } | null>(null);
	/** userId → the display name that was inserted for it. Send keeps only names still in the text. */
	const chosenMentionsRef = useRef(new Map<string, string>());
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const pendingCaretRef = useRef<number | null>(null);
	// The layout effect below pushes `mentionOpen` into the store; `setOpen` mirrors the other
	// direction. When Ariakit dismisses on its own — outside press, focus leaving, or our
	// `combobox.hide()` calls — the query must clear with it, or the store closes while
	// `mentionQuery` stays set and Enter picks from a menu that is no longer on screen.
	const combobox = Ariakit.useComboboxStore({
		placement: "top-start",
		resetValueOnHide: false,
		setOpen: (open) => {
			if (!open) {
				setMentionQuery(null);
			}
		},
	});

	const selfUserId = props.client.context.userId;
	const mentionCandidates =
		mentionQuery !== null && mentionRoster !== null && mentionRoster !== "loading" && mentionRoster.status === "ready"
			? chat_filter_mention_members(mentionRoster.members, mentionQuery.query, selfUserId).slice(0, MENTION_MENU_SIZE)
			: [];
	const mentionOpen =
		mentionQuery !== null &&
		(mentionRoster === "loading" ||
			(mentionRoster !== null && mentionRoster.status === "refused") ||
			mentionCandidates.length > 0);

	const start_roster = () => {
		if (mentionRoster !== null) {
			return;
		}
		const cached = mention_roster_cache.get(props.client);
		if (cached !== undefined) {
			setMentionRoster(cached);
			return;
		}
		setMentionRoster("loading");
		load_mention_roster(props.client).then(setMentionRoster);
	};

	const pick_mention = (member: { userId: string; label: string }) => {
		if (mentionQuery === null) {
			return;
		}
		const caret = textareaRef.current?.selectionStart ?? text.length;
		const inserted = chat_insert_mention(text, mentionQuery.start, caret, member.label);
		chosenMentionsRef.current.set(member.userId, member.label);
		setText(inserted.text);
		setMentionQuery(null);
		pendingCaretRef.current = inserted.caret;
		combobox.hide();
		combobox.setValue("");
	};

	const handle_send = () => {
		// One send at a time: the a11y contract disables sending while one is in flight.
		if (props.busy || props.disabled) {
			return;
		}
		const trimmed = text.trim();
		if (trimmed === "" && attachments.length === 0) {
			return;
		}
		const mentions = chat_mention_ids_still_in_text(chosenMentionsRef.current, trimmed);
		props.onSend(trimmed, attachments, mentions);
		setText("");
		setAttachments([]);
		setMentionQuery(null);
		chosenMentionsRef.current.clear();
		combobox.hide();
	};

	const handle_change = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.currentTarget.value;
		const caret = event.currentTarget.selectionStart ?? value.length;
		setText(value);
		const query = chat_mention_query_at(value, caret);
		setMentionQuery(query);
		combobox.setValue(query?.query ?? "");
		if (query === null) {
			combobox.hide();
			return;
		}
		start_roster();
	};

	const handle_key_down = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (mentionOpen) {
			// The caret is leaving the "@word". Close like the Ariakit example does, so a later
			// Enter cannot insert at a position the user already left. The caret still moves.
			if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
				combobox.hide();
				return;
			}
			if (event.key === "Escape") {
				event.preventDefault();
				event.stopPropagation();
				setMentionQuery(null);
				combobox.hide();
				return;
			}
			if ((event.key === "Enter" || event.key === "Tab") && !event.shiftKey && mentionCandidates.length > 0) {
				event.preventDefault();
				const activeId = combobox.getState().activeId;
				const picked =
					mentionCandidates.find((member) => mention_item_id(member.userId) === activeId) ?? mentionCandidates[0];
				pick_mention(picked);
				return;
			}
		}
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handle_send();
		}
	};

	useLayoutEffect(() => {
		combobox.setOpen(mentionOpen);
	}, [combobox, mentionOpen]);

	useLayoutEffect(() => {
		const caret = pendingCaretRef.current;
		if (caret === null) {
			return;
		}
		pendingCaretRef.current = null;
		const element = textareaRef.current;
		if (element !== null) {
			element.focus();
			element.setSelectionRange(caret, caret);
		}
	}, [text]);

	useEffect(() => {
		combobox.render();
	}, [combobox, text]);

	return (
		<div className="composer">
			{attachments.length > 0 ? (
				<ul className="composer-attachments">
					{attachments.map((attachment) => (
						<li key={attachment.fileNodeId} className="composer-attachment">
							<span>{attachment.name}</span>
							<button
								type="button"
								className="composer-attachment-remove"
								aria-label={`Remove attachment ${attachment.name}`}
								onClick={() =>
									setAttachments((prev) => prev.filter((entry) => entry.fileNodeId !== attachment.fileNodeId))
								}
							>
								×
							</button>
						</li>
					))}
				</ul>
			) : null}
			{/* One bar, not a tall box above a button row: the composer used to cost ~130px of a
			    900px frame and read heavier than the log it serves. */}
			<div className="composer-bar">
				<Ariakit.Combobox
					store={combobox}
					autoSelect
					value={text}
					showOnClick={false}
					showOnChange={false}
					showOnKeyPress={false}
					setValueOnChange={false}
					render={
						<textarea
							ref={textareaRef}
							className="composer-input"
							aria-label={props.label}
							aria-describedby={hintId}
							placeholder={props.label}
							rows={1}
							onChange={handle_change}
							onKeyDown={handle_key_down}
							// A pointer press moves the caret, so the menu closes with it, like the
							// Ariakit combobox-textarea example.
							onPointerDown={combobox.hide}
							onScroll={combobox.render}
						/>
					}
				/>
				{/* Icon-only, like the reference composer. The label moves to `aria-label`, so the control
				    keeps the same accessible name it had as a text button. */}
				<button
					type="button"
					className="composer-action"
					aria-label="Attach file"
					disabled={props.disabled}
					onClick={() => setPickerOpen(true)}
				>
					<Paperclip size={18} aria-hidden="true" />
				</button>
				<button
					type="button"
					className="composer-action composer-send"
					aria-label={props.busy ? "Sending…" : "Send"}
					disabled={props.busy || props.disabled}
					onClick={handle_send}
				>
					<ArrowUp size={18} aria-hidden="true" />
				</button>
			</div>
			<Ariakit.ComboboxPopover
				store={combobox}
				portal
				unmountOnHide
				gutter={4}
				fitViewport
				hidden={!mentionOpen}
				getAnchorRect={() => {
					const element = textareaRef.current;
					if (element === null) {
						return null;
					}
					return element.getBoundingClientRect();
				}}
				className="mention-menu"
				aria-label="Mention somebody"
			>
				{mentionRoster === "loading" ? (
					<div className="mention-menu-status" role="status">
						Loading people…
					</div>
				) : null}
				{mentionRoster !== null && mentionRoster !== "loading" && mentionRoster.status === "refused" ? (
					<div className="mention-menu-status" role="status">
						{chat_mention_roster_refusal_copy(mentionRoster.name)}
					</div>
				) : null}
				{mentionCandidates.map((member) => (
					<Ariakit.ComboboxItem
						key={member.userId}
						id={mention_item_id(member.userId)}
						value={member.label}
						setValueOnClick={false}
						focusOnHover
						className="mention-option"
						onMouseDown={(event) => {
							event.preventDefault();
						}}
						onClick={() => pick_mention(member)}
					>
						{member.label}
					</Ariakit.ComboboxItem>
				))}
			</Ariakit.ComboboxPopover>
			<span id={hintId} className="composer-hint">
				Enter sends · Shift+Enter for a new line
			</span>
			{pickerOpen ? (
				<AttachmentPickerDialog
					client={props.client}
					onPick={(attachment) => {
						setAttachments((prev) =>
							prev.some((entry) => entry.fileNodeId === attachment.fileNodeId) ? prev : [...prev, attachment],
						);
						setPickerOpen(false);
					}}
					onClose={() => setPickerOpen(false)}
				/>
			) : null}
		</div>
	);
}

// #endregion composer

// #region message row

function AddReactionButton(props: {
	groups: chat_ReactionGroup[];
	onPick: (token: chat_ReactionToken, currentlyPressed: boolean) => void;
}) {
	const [open, setOpen] = useState(false);
	const openerRef = useRef<HTMLButtonElement | null>(null);
	const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

	// Move focus onto the first token when the palette opens.
	useEffect(() => {
		if (open) {
			itemRefs.current[0]?.focus();
		}
	}, [open]);

	const close = () => {
		setOpen(false);
		openerRef.current?.focus();
	};

	const handle_item_key_down = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (event.key === "Escape") {
			event.preventDefault();
			close();
		} else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
			event.preventDefault();
			itemRefs.current[(index + 1) % chat_REACTION_TOKENS.length]?.focus();
		} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
			event.preventDefault();
			itemRefs.current[(index + chat_REACTION_TOKENS.length - 1) % chat_REACTION_TOKENS.length]?.focus();
		}
	};

	return (
		<span className="add-reaction">
			<button
				ref={openerRef}
				type="button"
				className="button message-action"
				aria-expanded={open}
				onClick={() => (open ? close() : setOpen(true))}
			>
				Add reaction
			</button>
			{open ? (
				<span className="reaction-palette" role="group" aria-label="Choose a reaction">
					{chat_REACTION_TOKENS.map((token, index) => {
						const pressed = props.groups.find((group) => group.token === token)?.reactedByMe ?? false;
						return (
							<button
								key={token}
								ref={(el) => {
									itemRefs.current[index] = el;
								}}
								type="button"
								className="reaction-palette-item"
								aria-pressed={pressed}
								aria-label={chat_REACTION_LABELS[token]}
								onKeyDown={(event) => handle_item_key_down(event, index)}
								onClick={() => {
									props.onPick(token, pressed);
									close();
								}}
							>
								<span aria-hidden="true">{chat_REACTION_EMOJI[token]}</span>
							</button>
						);
					})}
				</span>
			) : null}
		</span>
	);
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** How long after the previous message the next one by the same author still joins its group. */
const GROUP_MAX_GAP_MS = 5 * 60 * 1000;

/** The clock time a row shows. Within 7 days this is the whole visible timestamp. */
function format_clock_time(timestamp: number) {
	return new Date(timestamp).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

/** The full written date. The day divider shows it, and every recent row carries it for screen readers. */
function format_absolute_date(timestamp: number) {
	return new Date(timestamp).toLocaleDateString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

/** The date a day divider announces. "Today" and "Yesterday" are read relative to `now`. */
function format_day_label(timestamp: number, now: number) {
	const day = new Date(timestamp).toDateString();
	if (day === new Date(now).toDateString()) {
		return "Today";
	}
	if (day === new Date(now - DAY_MS).toDateString()) {
		return "Yesterday";
	}

	return format_absolute_date(timestamp);
}

/**
 * Two letters for the avatar. The two states that are not a name — a member who left, and a name
 * still resolving — get a neutral glyph instead, because "FM" would read as somebody's initials.
 */
function author_initials(authorName: string | null | undefined) {
	if (authorName === null || authorName === undefined) {
		return "•";
	}
	const words = authorName.split(/\s+/u).filter((word) => word !== "");
	if (words.length === 0) {
		return "•";
	}

	const last = words.length > 1 ? words[words.length - 1][0] : "";
	return `${words[0][0]}${last}`.toUpperCase();
}

/** One entry of a rendered log: a day divider, the unread mark, or a message row. */
type MessageListEntry =
	| { kind: "divider"; key: string; label: string }
	| { kind: "new"; key: string }
	| { kind: "message"; doc: chat_Doc<chat_MessageValue>; isContinuation: boolean };

/**
 * Turns messages in display order (oldest first) into rows and day dividers.
 *
 * A divider renders strictly between two days and never above the first message, so a log inside
 * one day has none at all. A row continues the previous author's group when the same member wrote
 * it, on the same day, soon enough after the row above. Grouping is visual only: a continuation
 * still renders its author and time, hidden from sight but not from assistive technology.
 *
 * `unread` places the "New" mark above the first message the member has not read. Its `lastReadAt`
 * is frozen when the channel opens, not read live: opening a channel writes the read cursor a
 * moment later, and a live value would erase the mark while the member is still looking at it. The
 * member's own messages never trigger the mark — they are not news to their author. A message
 * directly under the mark still starts a new author group, so the mark never lands inside one.
 */
function build_message_entries(
	docs: chat_Doc<chat_MessageValue>[],
	now: number,
	unread: { lastReadAt: number; selfUserId: string } | null = null,
): MessageListEntry[] {
	const entries: MessageListEntry[] = [];
	let previous: chat_Doc<chat_MessageValue> | null = null;
	let markPlaced = false;
	for (const doc of docs) {
		const startsNewDay = previous !== null && new Date(previous.timestamp).toDateString() !== new Date(doc.timestamp).toDateString();
		if (startsNewDay) {
			entries.push({ kind: "divider", key: `divider:${doc.key}`, label: format_day_label(doc.timestamp, now) });
		}
		const startsUnread =
			!markPlaced &&
			unread !== null &&
			doc.timestamp > unread.lastReadAt &&
			doc.createdBy !== unread.selfUserId &&
			doc.value.deletedAt === null;
		if (startsUnread) {
			markPlaced = true;
			entries.push({ kind: "new", key: `new:${doc.key}` });
		}
		const isContinuation =
			previous !== null &&
			!startsNewDay &&
			!startsUnread &&
			previous.createdBy === doc.createdBy &&
			doc.timestamp - previous.timestamp <= GROUP_MAX_GAP_MS;
		entries.push({ kind: "message", doc, isContinuation });
		previous = doc;
	}

	return entries;
}

/**
 * Renders a message's text with its mentions wrapped for styling. Only ids stored in
 * `mentions` are candidates, and only where `@Name` still matches the member's CURRENT display
 * name — after a rename the old text degrades to plain words rather than guessing at spans.
 */
function render_message_text(value: chat_MessageValue, memberNames: chat_MemberNamesApi, selfUserId: string) {
	const mentions = value.mentions ?? [];
	if (mentions.length === 0) {
		return value.text;
	}
	const named = mentions
		.map((id) => ({ id, name: memberNames.get(id) }))
		.filter((entry): entry is { id: string; name: string } => typeof entry.name === "string" && entry.name !== "")
		// Longest name first, so "@Ana Pane" is not cut short by a colleague named "Ana".
		.sort((a, b) => b.name.length - a.name.length);
	if (named.length === 0) {
		return value.text;
	}

	const parts: (string | { id: string; name: string })[] = [];
	let rest = value.text;
	while (rest !== "") {
		let earliest: { index: number; id: string; name: string } | null = null;
		for (const entry of named) {
			const index = rest.indexOf(`@${entry.name}`);
			if (index !== -1 && (earliest === null || index < earliest.index)) {
				earliest = { index, id: entry.id, name: entry.name };
			}
		}
		if (earliest === null) {
			parts.push(rest);
			break;
		}
		if (earliest.index > 0) {
			parts.push(rest.slice(0, earliest.index));
		}
		parts.push({ id: earliest.id, name: earliest.name });
		rest = rest.slice(earliest.index + earliest.name.length + 1);
	}
	return parts.map((part, index) =>
		typeof part === "string" ? (
			part
		) : (
			<span key={index} className={part.id === selfUserId ? "mention mention-self" : "mention"}>
				@{part.name}
			</span>
		),
	);
}

type MessageRow_Props = {
	client: BonoboUiFrontendClient;
	collection: "messages" | "replies";
	doc: chat_Doc<chat_MessageValue>;
	isOwn: boolean;
	selfUserId: string;
	memberNames: chat_MemberNamesApi;
	/** True when this row joins the group above it: same author, same day, close in time. */
	isContinuation: boolean;
	authorName: string | null | undefined;
	/**
	 * "unknown" = the reactions list does not cover this row, so the app cannot say which
	 * reactions it has. An empty array here would render as "nobody reacted", which is a different
	 * statement and a false one. The row shows an uncovered state instead. Add stays live;
	 * remove is hidden because there are no chips.
	 */
	reactionGroups: chat_ReactionGroup[] | "unknown";
	/**
	 * null = this row offers no thread affordance (rows inside a thread panel).
	 * "unknown" = the replies list does not reach this root yet, so no count is claimed.
	 */
	replyCount: number | "unknown" | null;
	/** Newest reply time the page holds for this root, or null when it holds no reply for it. */
	replyLatestAt: number | null;
	/** True while the replies list says more replies exist below it — gates the "99+" cap. */
	repliesHasMore: boolean;
	onOpenThread: ((doc: chat_Doc<chat_MessageValue>) => void) | null;
	replyTriggerRef: ((el: HTMLButtonElement | null) => void) | null;
	onApplyLocal: (doc: chat_Doc<chat_MessageValue>) => void;
	/** Merge a reaction the member just wrote, including a removed marker. */
	onApplyReaction: (doc: chat_ReactionDoc) => void;
	/** See `use_send_queue`: a full store is the channel's state, not this row's error. */
	onStorageFull: (message: string) => void;
};

export function MessageRow(props: MessageRow_Props) {
	const { client, collection, doc, isOwn } = props;
	const confirmTitleId = useId();
	const [editing, setEditing] = useState(false);
	const [editText, setEditText] = useState("");
	const [busy, setBusy] = useState(false);
	const [rowError, setRowError] = useState<string | null>(null);
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const editInputRef = useRef<HTMLTextAreaElement | null>(null);
	const editButtonRef = useRef<HTMLButtonElement | null>(null);

	// Move focus into the edit box when inline editing starts.
	useEffect(() => {
		if (editing) {
			editInputRef.current?.focus();
		}
	}, [editing]);

	const apply_value = (value: chat_MessageValue, onDone: () => void) => {
		setBusy(true);
		setRowError(null);
		client.data
			// Compare against the revision this row is showing. Another member's edit reaches the
			// row through the window, so a stale number here is a real conflict and must be told.
			.put({ collection, key: doc.key, value, expectedRevision: doc.revision })
			.then((result) => {
				setBusy(false);
				if ("_nay" in result) {
					if (result._nay.name === "storage_full") {
						props.onStorageFull(result._nay.message);
						return;
					}
					setRowError(result._nay.message);
					return;
				}
				// Echo the revision the server stored, not a guessed `doc.revision + 1`. The store
				// merges forward, so this echo is what the next edit compares against. A guess that
				// is lower than the stored one refuses the member's own next edit as a conflict.
				props.onApplyLocal({ ...doc, value, revision: result._yay.revision, updatedAt: Date.now() });
				onDone();
			})
			.catch((error: unknown) => {
				setBusy(false);
				setRowError(chat_get_error_message(error));
			});
	};

	const handle_edit_save = () => {
		if (busy) {
			return;
		}
		const trimmed = editText.trim();
		if (trimmed === "") {
			return;
		}
		apply_value({ ...doc.value, text: trimmed, editedAt: Date.now() }, () => {
			setEditing(false);
			editButtonRef.current?.focus();
		});
	};

	const handle_edit_cancel = () => {
		setEditing(false);
		editButtonRef.current?.focus();
	};

	const handle_delete = () => {
		apply_value({ ...doc.value, deletedAt: Date.now() }, () => {
			// The Dialog gives focus back to the Delete button on unmount.
			setConfirmingDelete(false);
		});
	};

	const handle_toggle_reaction = (token: chat_ReactionToken, currentlyPressed: boolean) => {
		setRowError(null);
		// The reactions list does not cover this row, so nothing here knows what this member
		// already holds. The remove path is hidden rather than refused — no chips render, and the
		// row says why — while the add path stays live: `putOwned` writes the member's own key
		// whether or not a chip is on screen, so it is correct either way.
		if (props.reactionGroups === "unknown" && currentlyPressed) {
			setRowError("Reactions on this message could not be loaded, so they can't be removed right now.");
			return;
		}
		const removed = currentlyPressed;
		client.data
			.putOwned({
				collection: "reactions",
				key: chat_reaction_caller_key(doc.key, token),
				value: removed ? { removed: true } : {},
			})
			.then((result) => {
				if ("_nay" in result) {
					if (result._nay.name === "storage_full") {
						props.onStorageFull(result._nay.message);
						return;
					}
					setRowError(result._nay.message);
					return;
				}
				props.onApplyReaction({
					key: result._yay.key,
					targetKey: doc.key,
					token,
					createdBy: props.selfUserId,
					revision: result._yay.revision,
					updatedAt: Date.now(),
					removed,
				});
			})
			.catch((error: unknown) => {
				setRowError(chat_get_error_message(error));
			});
	};

	const isDeleted = doc.value.deletedAt !== null;
	const authorLabel = props.authorName === null ? "Former member" : (props.authorName ?? "…");
	// Within a week the row shows clock time only, so the hidden span carries the date back for a
	// screen reader moving row by row — the day divider is a sibling and names no row. Beyond a
	// week the visible string is the date itself, and a hidden copy would announce it twice.
	const isRecent = Date.now() - doc.timestamp < 7 * DAY_MS;
	// A root with replies shows its summary as body content; a root with none, or one the replies
	// window cannot speak for, keeps the affordance in the hover cluster.
	const hasThreadSummary =
		props.onOpenThread !== null && typeof props.replyCount === "number" && props.replyCount > 0;

	return (
		<li className={props.isContinuation ? "message is-continuation" : "message is-leader"} data-key={doc.key}>
			<span className="message-avatar" aria-hidden="true">
				{author_initials(props.authorName)}
			</span>
			<div className={props.isContinuation ? "message-head visually-hidden" : "message-head"}>
				<span className="message-author">{authorLabel}</span>
				<time className="message-time" dateTime={new Date(doc.timestamp).toISOString()}>
					{isRecent ? <span className="visually-hidden">{format_absolute_date(doc.timestamp)} </span> : null}
					<span className="message-clock">
						{isRecent ? format_clock_time(doc.timestamp) : format_absolute_date(doc.timestamp)}
					</span>
				</time>
			</div>
			{isDeleted ? (
				<p className="message-text is-deleted">Message deleted</p>
			) : editing ? (
				<div className="message-edit">
					<textarea
						ref={editInputRef}
						className="composer-input"
						aria-label="Edit message"
						rows={2}
						value={editText}
						onInput={(event) => setEditText(event.currentTarget.value)}
						onKeyDown={(event) => {
							if (event.key === "Escape") {
								event.preventDefault();
								handle_edit_cancel();
							} else if (event.key === "Enter" && !event.shiftKey) {
								event.preventDefault();
								handle_edit_save();
							}
						}}
					/>
					<div className="message-edit-actions">
						<button type="button" className="button" disabled={busy} onClick={handle_edit_cancel}>
							Cancel
						</button>
						<button type="button" className="button button-primary" disabled={busy} onClick={handle_edit_save}>
							{busy ? "Saving…" : "Save"}
						</button>
					</div>
				</div>
			) : (
				<>
					<p className="message-text">
						{render_message_text(doc.value, props.memberNames, props.selfUserId)}
						{doc.value.editedAt !== null ? <span className="message-edited"> (edited)</span> : null}
					</p>
					{doc.value.attachments.length > 0 ? (
						<MessageAttachments client={client} attachments={doc.value.attachments} />
					) : null}
					{props.reactionGroups === "unknown" ? (
						<div className="message-reactions-unknown">Reactions unavailable</div>
					) : props.reactionGroups.length > 0 ? (
						<div className="message-reactions">
							{props.reactionGroups.map((group) => (
								<button
									key={group.token}
									type="button"
									className={group.reactedByMe ? "reaction-chip is-mine" : "reaction-chip"}
									aria-pressed={group.reactedByMe}
									aria-label={`${chat_REACTION_LABELS[group.token]}, ${group.count} ${group.count === 1 ? "reaction" : "reactions"}`}
									onClick={() => handle_toggle_reaction(group.token, group.reactedByMe)}
								>
									<span aria-hidden="true">{chat_REACTION_EMOJI[group.token]}</span>
									<span className="reaction-chip-count">{group.count}</span>
								</button>
							))}
						</div>
					) : null}
					{/* Persistent body content, not a hover action: a member must be able to see that
					    a message has replies without pointing at it. */}
					{hasThreadSummary && typeof props.replyCount === "number" ? (
						<button
							ref={props.replyTriggerRef ?? undefined}
							type="button"
							className="message-thread-summary"
							onClick={() => props.onOpenThread?.(doc)}
						>
							<span className="message-thread-summary-icon" aria-hidden="true">
								↳
							</span>
							<span className="message-thread-summary-count">
								{`${chat_format_reply_count(props.replyCount, props.repliesHasMore)} ${
									props.replyCount === 1 ? "reply" : "replies"
								}`}
							</span>
							{props.replyLatestAt !== null ? (
								<span className="message-thread-summary-recency">
									{`Last reply ${chat_format_recency(props.replyLatestAt, Date.now())}`}
								</span>
							) : null}
						</button>
					) : null}
				</>
			)}
			{!isDeleted && !editing ? (
				<div className="message-actions">
					{props.onOpenThread !== null && props.replyCount !== null && !hasThreadSummary ? (
						<button
							ref={props.replyTriggerRef ?? undefined}
							type="button"
							className="button message-action"
							onClick={() => props.onOpenThread?.(doc)}
						>
							{props.replyCount === "unknown" ? "View thread" : "Reply in thread"}
						</button>
					) : null}
					{/* An uncovered row has no known pressed state, so the palette shows none.
					    Add still writes this member's own key. Remove is hidden — no chips. */}
					<AddReactionButton
						groups={props.reactionGroups === "unknown" ? [] : props.reactionGroups}
						onPick={handle_toggle_reaction}
					/>
					{isOwn ? (
						<>
							<button
								ref={editButtonRef}
								type="button"
								className="button message-action"
								onClick={() => {
									setEditText(doc.value.text);
									setEditing(true);
								}}
							>
								Edit
							</button>
							<button
								type="button"
								className="button message-action button-danger"
								onClick={() => setConfirmingDelete(true)}
							>
								Delete
							</button>
						</>
					) : null}
				</div>
			) : null}
			{rowError !== null ? (
				<p className="form-error" role="alert">
					{rowError}
				</p>
			) : null}
			{confirmingDelete ? (
				<Dialog labelledBy={confirmTitleId} onClose={() => setConfirmingDelete(false)}>
					<h2 id={confirmTitleId} className="dialog-title">
						Delete message?
					</h2>
					<p>The message is replaced by a "Message deleted" placeholder for everyone.</p>
					<div className="dialog-actions">
						<button
							type="button"
							className="button"
							data-dialog-initial
							disabled={busy}
							onClick={() => setConfirmingDelete(false)}
						>
							Cancel
						</button>
						<button type="button" className="button button-danger" disabled={busy} onClick={handle_delete}>
							{busy ? "Deleting…" : "Delete message"}
						</button>
					</div>
				</Dialog>
			) : null}
		</li>
	);
}

function PendingRow(props: { pending: PendingSend; onRetry: () => void }) {
	return (
		<li
			className={
				props.pending.status === "failed"
					? "message is-leader is-pending is-failed"
					: "message is-leader is-pending"
			}
		>
			<span className="message-avatar" aria-hidden="true">
				•
			</span>
			<div className="message-head">
				<span className="message-author">You</span>
				<span className="message-time">{props.pending.status === "sending" ? "Sending…" : "Not sent"}</span>
			</div>
			<p className="message-text">{props.pending.text}</p>
			{props.pending.attachments.length > 0 ? (
				<p className="message-text">
					{props.pending.attachments.map((attachment) => attachment.name).join(", ")}
				</p>
			) : null}
			{props.pending.status === "failed" ? (
				<div className="message-send-error" role="alert">
					<span>{props.pending.errorMessage ?? "Failed to send message"}</span>
					<button type="button" className="button" onClick={props.onRetry}>
						Retry sending message
					</button>
				</div>
			) : null}
		</li>
	);
}

// #endregion message row

// #region thread panel

/**
 * What a dead subscription means for one part of the channel. `subject` names that part, so each
 * dead view says what stopped updating instead of all of them sharing one vague sentence.
 */
function watch_death_message(reason: string | undefined, subject: string) {
	// Names no cause. The commonest trigger is an uninstall or a revoked installation, and telling
	// a member their permissions changed sends them to an admin over something they did not cause.
	if (reason === "denied") {
		return `Chitchat can no longer read ${subject}. Reload the page to try again.`;
	}
	if (reason === "session_expired") {
		return `This Chitchat session expired, so ${subject} stopped updating. Reload the page to continue.`;
	}
	if (reason === "unavailable") {
		return `Chitchat cannot reach ${subject} right now. Nothing here will update until the connection returns.`;
	}
	if (reason === "capacity") {
		return `Chitchat has too many live views open, so ${subject} stopped updating. Reload the page.`;
	}

	return `Chitchat stopped reading ${subject}. Reload the page to try again.`;
}

type ThreadPanel_Props = {
	client: BonoboUiFrontendClient;
	userId: string;
	root: chat_Doc<chat_MessageValue>;
	replies: chat_Doc<chat_MessageValue>[];
	repliesLoaded: boolean;
	repliesTruncated: boolean;
	repliesError: string | null;
	reactionGroupsByTarget: Map<string, chat_ReactionGroup[]>;
	memberNames: chat_MemberNamesApi;
	/** Below 720px the panel covers the whole frame, so its way out reads as "back", not "close". */
	isNarrow: boolean;
	storageFull: string | null;
	onStorageFull: (message: string) => void;
	onApplyLocalRoot: (doc: chat_Doc<chat_MessageValue>) => void;
	onApplyLocalReply: (doc: chat_Doc<chat_MessageValue>) => void;
	onApplyReaction: (doc: chat_ReactionDoc) => void;
	onClose: () => void;
};

export function ThreadPanel(props: ThreadPanel_Props) {
	const { client, userId, root, memberNames, replies, repliesLoaded } = props;
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);

	// Move focus into the panel when it opens; the parent focuses the trigger on close.
	useEffect(() => {
		closeButtonRef.current?.focus();
	}, []);

	const queue = use_send_queue({
		client,
		collection: "replies",
		keyPrefix: chat_reply_key_prefix(root.key),
		userId,
		onDelivered: (doc) => {
			props.onApplyLocalReply(doc);
		},
		onStorageFull: props.onStorageFull,
	});

	// Resolve author names for the replies in view, and mentioned members' names for the text.
	useEffect(() => {
		const ids = new Set<string>();
		for (const doc of replies) {
			ids.add(doc.createdBy);
			for (const id of doc.value.mentions ?? []) {
				ids.add(id);
			}
		}
		if (ids.size > 0) {
			void memberNames.resolve([...ids]);
		}
	}, [replies, memberNames]);

	const handle_key_down = (event: KeyboardEvent<HTMLElement>) => {
		if (event.key === "Escape") {
			event.stopPropagation();
			props.onClose();
		}
	};

	// The store sorts newest first; the panel reads oldest first, like the channel log.
	const replyEntries = build_message_entries([...replies].reverse(), Date.now());

	return (
		<section className="thread" aria-label="Thread" onKeyDown={handle_key_down}>
			<div className="thread-head">
				<h3 className="thread-title">Thread</h3>
				{/* Below 720px the panel covers the frame and the drawer toggle is hidden, so this is
				    the only way out — say "back", which is what it does there. */}
				<button ref={closeButtonRef} type="button" className="button" onClick={props.onClose}>
					{props.isNarrow ? "Back to messages" : "Close thread"}
				</button>
			</div>
			<ul className="message-list thread-root">
				<MessageRow
					client={client}
					collection="messages"
					doc={root}
					isOwn={root.createdBy === userId}
					selfUserId={userId}
					memberNames={memberNames}
					isContinuation={false}
					authorName={memberNames.get(root.createdBy)}
					reactionGroups={props.reactionGroupsByTarget.get(root.key) ?? []}
					replyCount={null}
					replyLatestAt={null}
					repliesHasMore={false}
					onOpenThread={null}
					replyTriggerRef={null}
					onApplyLocal={props.onApplyLocalRoot}
					onApplyReaction={props.onApplyReaction}
					onStorageFull={props.onStorageFull}
				/>
			</ul>
			{props.repliesError !== null ? (
				<div className="channel-status is-error" role="alert">
					{props.repliesError}
				</div>
			) : null}
			{props.repliesTruncated ? (
				<div className="channel-status" role="status">
					Only the newest 100 replies are shown.
				</div>
			) : null}
			{!repliesLoaded ? (
				<div className="channel-status" role="status">
					Loading replies…
				</div>
			) : replies.length === 0 && queue.pending.length === 0 ? (
				<div className="channel-status">No replies yet</div>
			) : (
				<ul className="message-list thread-replies">
					{replyEntries.map((entry) =>
						entry.kind === "divider" ? (
							<li key={entry.key} className="day-divider">
								{entry.label}
							</li>
						) : entry.kind === "new" ? // A thread panel passes no read cursor, so this entry never reaches it.
						null : (
							<MessageRow
								key={entry.doc.key}
								client={client}
								collection="replies"
								doc={entry.doc}
								isOwn={entry.doc.createdBy === userId}
								selfUserId={userId}
								memberNames={memberNames}
								isContinuation={entry.isContinuation}
								authorName={memberNames.get(entry.doc.createdBy)}
								reactionGroups={props.reactionGroupsByTarget.get(entry.doc.key) ?? []}
								replyCount={null}
								replyLatestAt={null}
								repliesHasMore={false}
								onOpenThread={null}
								replyTriggerRef={null}
								onApplyLocal={props.onApplyLocalReply}
								onApplyReaction={props.onApplyReaction}
								onStorageFull={props.onStorageFull}
							/>
						),
					)}
					{queue.pending.map((pending) => (
						<PendingRow key={pending.clientRequestId} pending={pending} onRetry={() => queue.retry(pending)} />
					))}
				</ul>
			)}
			{props.storageFull !== null ? (
				<div className="channel-status is-error" role="alert">
					{props.storageFull}
				</div>
			) : null}
			<Composer
				client={client}
				label="Reply in thread"
				busy={queue.busy}
				disabled={props.storageFull !== null || props.repliesError !== null}
				onSend={queue.send}
			/>
		</section>
	);
}

// #endregion thread panel

// #region channel view

type ChannelView_Props = {
	client: BonoboUiFrontendClient;
	userId: string;
	channel: chat_Doc<chat_ChannelValue>;
	memberNames: chat_MemberNamesApi;
	announce: (text: string) => void;
	/**
	 * The open thread. It lives in the parent because the icon rail collapses on the app root, which
	 * only the parent renders, and a channel switch has to clear it there too.
	 */
	threadRootKey: string | null;
	setThreadRootKey: (key: string | null) => void;
	/** True while `(max-width: 719px)` matches, where the thread panel covers the whole frame. */
	isNarrow: boolean;
	/**
	 * Called with the newest rendered message's timestamp after every delivery. The app debounces
	 * it into this member's read-cursor write, so what was on screen stays read after a reload.
	 */
	onNewestVisible: (timestamp: number) => void;
	/**
	 * Where this member's read cursor stood when the channel was opened, or null when nothing was
	 * unread. The "New messages" mark goes above the first message newer than it. The app freezes
	 * the value at open time, because opening a channel writes the cursor forward a moment later
	 * and a live value would erase the mark while the member is still reading.
	 */
	openedAtLastReadAt: number | null;
};

/**
 * How much newer a private send must be than the channel doc's `lastMessageAt` before the sender
 * stamps it again. One stamp per burst keeps the doubled write inside the send rate budget.
 */
const PRIVATE_STAMP_DEBOUNCE_MS = 15_000;

/** The loadOlder/unsubscribe handle `client.data.watchWindow` returns. */
type WindowHandle = ReturnType<BonoboUiFrontendClient["data"]["watchWindow"]>;

/**
 * The part of a companion's coverage the render reads. The refs feed the catch-up loop,
 * which runs inside a list callback and must see the value that just arrived; this state
 * feeds the rows and the notices, which need a render.
 */
type CompanionCoverageState = {
	hasMore: boolean;
	deepestRoot: string | null;
	incomplete: boolean;
	/**
	 * The subscription died, so nothing new will ever arrive. Its last values are frozen, and the
	 * most confident of them — an exact reply count — would be the stalest thing on the row.
	 */
	death: { reason?: string } | null;
};

/**
 * Whether a companion HTTP list can speak for one row. A finished list covers everything;
 * otherwise it covers only roots strictly newer than the deepest root it delivered.
 * An incomplete list covers nothing, because the gap could be anywhere inside its range, and a
 * dead feed covers nothing, because it stopped hearing about changes anywhere in its range.
 */
function companion_covers_root(coverage: CompanionCoverageState, rootKey: string) {
	if (coverage.incomplete || coverage.death !== null) {
		return false;
	}

	return !coverage.hasMore || (coverage.deepestRoot !== null && rootKey < coverage.deepestRoot);
}

/**
 * Message and reply keys are `<channel uuid (36)>:<inverted ms (13)>:<rand (4)>...`, so the
 * first 55 characters of any chitchat-minted key name its root message. Companion keys
 * (reactions, replies) extend a root key, so the same slice normalizes them all.
 */
const ROOT_KEY_LENGTH = 55;

/** How many documents one deep-history page asks for. The route's own ceiling is 100. */
const DEEP_HISTORY_PAGE_SIZE = 100;
/** First wait after a failed companion list. Failure recovery, not a refresh poll. */
const COMPANION_RETRY_INITIAL_MS = 1_000;
/** Longest wait between companion-list retries. */
const COMPANION_RETRY_MAX_MS = 30_000;

function newest_updated_at(docs: { updatedAt: number }[]): number | null {
	let newest: number | null = null;
	for (const doc of docs) {
		if (newest === null || doc.updatedAt > newest) {
			newest = doc.updatedAt;
		}
	}
	return newest;
}

function raw_document_key(raw: unknown): string | null {
	if (typeof raw !== "object" || raw === null) {
		return null;
	}
	const key = (raw as { key?: unknown }).key;
	return typeof key === "string" ? key : null;
}

function newest_raw_updated_at(docs: unknown[]): number | null {
	let newest: number | null = null;
	for (const raw of docs) {
		if (typeof raw !== "object" || raw === null) {
			continue;
		}
		const updatedAt = (raw as { updatedAt?: unknown }).updatedAt;
		if (typeof updatedAt === "number" && Number.isFinite(updatedAt) && (newest === null || updatedAt > newest)) {
			newest = updatedAt;
		}
	}
	return newest;
}

function next_feed_since(args: { current: number; newest: number | null; truncated: boolean }) {
	if (args.newest === null) {
		return null;
	}
	// The host returns at most 100 rows. A full page still on this millisecond would never
	// advance, so later edits stay hidden. Step one millisecond past it.
	if (args.truncated && args.newest === args.current) {
		return args.newest + 1;
	}
	if (args.newest > args.current) {
		return args.newest;
	}
	return null;
}

function docs_in_prefix(docs: unknown[], prefix: string) {
	return docs.filter((raw) => {
		const key = raw_document_key(raw);
		return key !== null && key.startsWith(prefix);
	});
}

function list_plugin_documents(
	client: BonoboUiFrontendClient,
	body: { collection: string; keyPrefix: string; keyStartExclusive?: string; limit: number },
) {
	return client.fetchJson("/api/v1/plugin-data/list", { body }).then((raw: unknown) => {
		const parsed = chat_plugin_data_list_response_schema.safeParse(raw);
		if (!parsed.success) {
			throw new Error("Unexpected response from the document list");
		}
		return parsed.data;
	});
}

function reaction_groups_for_row(
	coverage: CompanionCoverageState,
	groupsByTarget: Map<string, chat_ReactionGroup[]>,
	key: string,
): chat_ReactionGroup[] | "unknown" {
	// A dead or gapped list cannot speak for any row, even one we already grouped.
	if (coverage.incomplete || coverage.death !== null) {
		return "unknown";
	}
	const groups = groupsByTarget.get(key);
	if (groups !== undefined && groups.length > 0) {
		return groups;
	}
	if (companion_covers_root(coverage, key.slice(0, ROOT_KEY_LENGTH))) {
		return groups ?? [];
	}
	return "unknown";
}

function reply_count_for_row(
	coverage: CompanionCoverageState,
	counts: Map<string, { count: number; latestAt: number }>,
	key: string,
): number | "unknown" {
	if (coverage.incomplete || coverage.death !== null) {
		return "unknown";
	}
	const entry = counts.get(key);
	if (entry !== undefined && entry.count > 0) {
		return entry.count;
	}
	if (companion_covers_root(coverage, key.slice(0, ROOT_KEY_LENGTH))) {
		return entry?.count ?? 0;
	}
	return "unknown";
}

/** §5's floors: the log never goes under 420px, and the thread panel never under 244px. */
const MIN_LOG_WIDTH = 420;
const MIN_THREAD_WIDTH = 244;
const DEFAULT_THREAD_WIDTH = 340;

/** One arrow press on the thread separator. */
const THREAD_RESIZE_STEP = 16;

/** `.thread` reads its flex basis from this, so the separator writes it on `.channel-body`. */
type ChannelBody_CssVars = {
	"--thread-width": string;
};

/**
 * The deep-history control, once the reactive window has stopped growing.
 *
 * `failed` covers every non-ok response, because `fetchJson` throws on all of them. A 429 sets
 * `retryAt`, which disables the control until the wait passes and then returns it to idle; every
 * other failure leaves `retryAt` null and offers a Retry button instead.
 */
type DeepHistoryState =
	| { kind: "idle" }
	| { kind: "loading" }
	| { kind: "exhausted" }
	| { kind: "failed"; message: string; retryAt: number | null };

/**
 * Reads `retryAfterMs` out of a 429 body. The body is whatever the route sent, so a bad shape or
 * unparseable text answers null and the caller falls back to a short wait.
 */
function read_retry_after_ms(responseText: unknown) {
	if (typeof responseText !== "string") {
		return null;
	}
	let parsed: unknown;
	try {
		parsed = JSON.parse(responseText);
	} catch {
		return null;
	}
	if (typeof parsed !== "object" || parsed === null) {
		return null;
	}
	const value = (parsed as { retryAfterMs?: unknown }).retryAfterMs;
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

/**
 * One open channel: message log, reactive document windows, composer, and thread panel.
 * The parent keys this component by channel key, so every mount owns exactly one channel.
 */
export function ChannelView(props: ChannelView_Props) {
	const {
		client,
		userId,
		channel,
		memberNames,
		announce,
		threadRootKey,
		setThreadRootKey,
		isNarrow,
		onNewestVisible,
		openedAtLastReadAt,
	} =
		props;
	const [messages, setMessages] = useState<chat_Doc<chat_MessageValue>[]>([]);
	const [messagesLoaded, setMessagesLoaded] = useState(false);
	const [messagesDeath, setMessagesDeath] = useState<{ reason?: string } | null>(null);
	const [messagesWindow, setMessagesWindow] = useState({ hasMore: false, atCapacity: false, incomplete: false });
	const [reactionDocs, setReactionDocs] = useState<chat_ReactionDoc[]>([]);
	const [channelReplies, setChannelReplies] = useState<chat_Doc<chat_MessageValue>[]>([]);
	const [reactionCoverage, setReactionCoverage] = useState<CompanionCoverageState>({
		hasMore: false,
		deepestRoot: null,
		incomplete: false,
		death: null,
	});
	const [replyCoverage, setReplyCoverage] = useState<CompanionCoverageState>({
		hasMore: false,
		deepestRoot: null,
		incomplete: false,
		death: null,
	});
	const [storageFull, setStorageFull] = useState<string | null>(null);
	const [deepHistory, setDeepHistory] = useState<DeepHistoryState>({ kind: "idle" });
	const [threadWidth, setThreadWidth] = useState(DEFAULT_THREAD_WIDTH);
	const [bodyWidth, setBodyWidth] = useState(0);
	const [messagesSince, setMessagesSince] = useState<number | null>(null);
	const [repliesSince, setRepliesSince] = useState<number | null>(null);
	const [reactionsSince, setReactionsSince] = useState<number | null>(null);
	const [threadRepliesLoaded, setThreadRepliesLoaded] = useState(false);
	const [threadRepliesTruncated, setThreadRepliesTruncated] = useState(false);
	const [threadRepliesError, setThreadRepliesError] = useState<string | null>(null);
	const messagesStoreRef = useRef<chat_AccumulatingStore<chat_Doc<chat_MessageValue>> | null>(null);
	const repliesStoreRef = useRef<chat_AccumulatingStore<chat_Doc<chat_MessageValue>> | null>(null);
	const reactionsStoreRef = useRef<chat_AccumulatingStore<chat_ReactionDoc> | null>(null);
	const messagesWindowRef = useRef<WindowHandle | null>(null);
	const reactionsCoverageRef = useRef<CompanionCoverageState | null>(null);
	const repliesCoverageRef = useRef<CompanionCoverageState | null>(null);
	const oldestRootRef = useRef<string | null>(null);
	// The oldest key the reactive WINDOW itself delivered, kept apart from the merged store. An
	// HTTP page merges older keys into that store forever, and reading the fencepost back off it
	// would drag both companions into paging history the window never asked for.
	const windowOldestKeyRef = useRef<string | null>(null);
	/** The last key the previous HTTP page returned. The next page continues strictly after it. */
	const httpOldestKeyRef = useRef<string | null>(null);
	const companionHttpFenceRef = useRef<{ reactions: string | null; replies: string | null }>({
		reactions: null,
		replies: null,
	});
	const companionInflightRef = useRef<{ reactions: boolean; replies: boolean }>({
		reactions: false,
		replies: false,
	});
	const companionRetryRef = useRef<{
		reactions: { delayMs: number; timer: ReturnType<typeof setTimeout> | null };
		replies: { delayMs: number; timer: ReturnType<typeof setTimeout> | null };
	}>({
		reactions: { delayMs: COMPANION_RETRY_INITIAL_MS, timer: null },
		replies: { delayMs: COMPANION_RETRY_INITIAL_MS, timer: null },
	});
	// The window effect owns companion lists. A fetch that fails after a channel switch must
	// not start backoff on the unmounted instance — that loop would keep listing the old prefix.
	const companionMountedRef = useRef(false);
	const feedsStartedRef = useRef(false);
	const channelBodyRef = useRef<HTMLDivElement | null>(null);
	const channelNameRef = useRef(channel.value.name);
	const seenKeysRef = useRef<Set<string> | null>(null);
	const replyTriggersRef = useRef(new Map<string, HTMLButtonElement>());
	const logRef = useRef<HTMLDivElement | null>(null);
	const newestKeyRef = useRef<string | null>(null);
	const pendingCountRef = useRef(0);
	const channelPrefix = chat_message_key_prefix(channel.key);
	const privateScopeId = chat_channel_is_private(channel.key) ? channel.key : undefined;

	// The announcer reads the channel name through this ref so a rename does not sit in the
	// messages effect's dependencies: any member renaming the channel in a loop would
	// otherwise tear down and rebuild every viewer's subscription (and its retained window)
	// at the rename rate.
	useEffect(() => {
		channelNameRef.current = channel.value.name;
	}, [channel.value.name]);

	const apply_reply_docs = (docs: unknown[]) => {
		const store = repliesStoreRef.current;
		if (store === null) {
			return;
		}
		store.apply_window(docs);
		setChannelReplies(store.get_sorted());
	};

	const apply_message_docs = (docs: unknown[]) => {
		const store = messagesStoreRef.current;
		if (store === null) {
			return [];
		}
		const applied = store.apply_window(docs);
		setMessages(store.get_sorted());
		return applied;
	};

	const set_companion_coverage = (
		collection: "reactions" | "replies",
		pageDocs: { key: string }[],
		isDone: boolean,
		incomplete: boolean,
	) => {
		const deepestRoot =
			pageDocs.length > 0 ? pageDocs[pageDocs.length - 1]!.key.slice(0, ROOT_KEY_LENGTH) : null;
		if (pageDocs.length > 0) {
			companionHttpFenceRef.current[collection] = pageDocs[pageDocs.length - 1]!.key;
		}
		const next: CompanionCoverageState = {
			// An empty page with isDone still false would otherwise re-request the same range forever.
			hasMore: pageDocs.length === 0 ? false : !isDone,
			deepestRoot:
				deepestRoot ??
				(collection === "reactions" ? reactionsCoverageRef.current?.deepestRoot : repliesCoverageRef.current?.deepestRoot) ??
				null,
			incomplete,
			// Keep a dead feed dead. An HTTP list that was already in flight must not wipe the
			// death flag, or chips look live again while later hearts never arrive.
			death:
				(collection === "reactions" ? reactionsCoverageRef.current?.death : repliesCoverageRef.current?.death) ??
				null,
		};
		if (collection === "reactions") {
			reactionsCoverageRef.current = next;
			setReactionCoverage(next);
			if (!incomplete) {
				reset_companion_retry("reactions");
			}
		} else {
			repliesCoverageRef.current = next;
			setReplyCoverage(next);
			if (!incomplete) {
				reset_companion_retry("replies");
			}
		}
	};

	const clear_companion_retry = (collection: "reactions" | "replies") => {
		const slot = companionRetryRef.current[collection];
		if (slot.timer !== null) {
			clearTimeout(slot.timer);
			slot.timer = null;
		}
	};

	const reset_companion_retry = (collection: "reactions" | "replies") => {
		clear_companion_retry(collection);
		companionRetryRef.current[collection].delayMs = COMPANION_RETRY_INITIAL_MS;
	};

	const schedule_companion_retry = (collection: "reactions" | "replies") => {
		const coverage = collection === "reactions" ? reactionsCoverageRef.current : repliesCoverageRef.current;
		if (coverage?.death != null) {
			return;
		}
		const slot = companionRetryRef.current[collection];
		if (slot.timer !== null) {
			return;
		}
		const delayMs = slot.delayMs;
		const waitMs = delayMs * (0.5 + Math.random());
		slot.timer = setTimeout(() => {
			slot.timer = null;
			slot.delayMs = Math.min(delayMs * 2, COMPANION_RETRY_MAX_MS);
			list_companion(collection);
		}, waitMs);
	};

	const list_companion = (collection: "reactions" | "replies") => {
		if (companionInflightRef.current[collection]) {
			return;
		}
		const coverage = collection === "reactions" ? reactionsCoverageRef.current : repliesCoverageRef.current;
		if (coverage?.death != null) {
			return;
		}
		companionInflightRef.current[collection] = true;
		const fence = companionHttpFenceRef.current[collection];
		list_plugin_documents(client, {
			collection,
			keyPrefix: channelPrefix,
			...(fence === null ? {} : { keyStartExclusive: fence }),
			limit: DEEP_HISTORY_PAGE_SIZE,
		})
			.then((page) => {
				companionInflightRef.current[collection] = false;
				if (!companionMountedRef.current) {
					return;
				}
				if (collection === "reactions") {
					const store = reactionsStoreRef.current;
					if (store === null) {
						return;
					}
					const validated = store.apply_window(page.documents);
					setReactionDocs(store.get_sorted());
					set_companion_coverage("reactions", validated, page.isDone, false);
				} else {
					const store = repliesStoreRef.current;
					if (store === null) {
						return;
					}
					const validated = store.apply_window(page.documents);
					setChannelReplies(store.get_sorted());
					set_companion_coverage("replies", validated, page.isDone, false);
				}
				evaluate_companion_catch_up();
			})
			.catch(() => {
				companionInflightRef.current[collection] = false;
				if (!companionMountedRef.current) {
					return;
				}
				set_companion_coverage(collection, [], true, true);
				// Failure recovery with backoff, not a periodic refresh: one timer, stop on
				// success, never on a dead feed. The SDK can deliver a cached snapshot before
				// this list fails, and then the feed will not fire again, so a quiet tab still
				// needs this timer.
				schedule_companion_retry(collection);
			});
	};

	const retry_incomplete_companion = (collection: "reactions" | "replies") => {
		const coverage = collection === "reactions" ? reactionsCoverageRef.current : repliesCoverageRef.current;
		if (coverage === null || !coverage.incomplete || coverage.death !== null) {
			return;
		}
		clear_companion_retry(collection);
		list_companion(collection);
	};

	// Companion catch-up: reactions and replies key by TARGET, not by time, so their HTTP
	// lists can lag behind the rendered message range. After every window delivery, fetch
	// another companion page while it still has older docs and its deepest covered root is
	// newer than the oldest WINDOW message. Plain JS `<` works here because every key
	// chitchat itself mints is ASCII by construction (client UUID prefix, server digit-and-hex
	// tail) — validation does NOT enforce ASCII, so a foreign writer's non-ASCII key could
	// skew this catch-up coverage for that key. Accepted: it never affects message delivery.
	const evaluate_companion_catch_up = () => {
		const oldestRoot = oldestRootRef.current;
		if (oldestRoot === null) {
			return;
		}
		for (const collection of ["reactions", "replies"] as const) {
			const coverage = collection === "reactions" ? reactionsCoverageRef.current : repliesCoverageRef.current;
			if (coverage === null || !coverage.hasMore || coverage.incomplete || coverage.death !== null) {
				continue;
			}
			if (coverage.deepestRoot === null || coverage.deepestRoot < oldestRoot) {
				list_companion(collection);
			}
		}
	};

	const start_feeds_if_needed = (windowDocs: { updatedAt: number }[]) => {
		if (feedsStartedRef.current) {
			return;
		}
		const fence = newest_updated_at(windowDocs);
		if (fence === null) {
			return;
		}
		feedsStartedRef.current = true;
		// One fence for all three feeds: the newest messages-window updatedAt. Companion lists
		// do not pick their own. A lower fence only over-delivers, and the merge already dedups.
		// The query is inclusive, so subscribe at this value as-is — not plus one.
		setMessagesSince(fence);
		setRepliesSince(fence);
		setReactionsSince(fence);
	};

	// Messages window: the host retains loaded history, so each update is the whole window.
	// The accumulating store stays as the merge seam for optimistic local echoes (its
	// revision-forward rule), plus remote-arrival detection for the announcer.
	useEffect(() => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		messagesStoreRef.current = store;
		repliesStoreRef.current = chat_create_accumulating_store(chat_validate_message_doc);
		reactionsStoreRef.current = chat_create_accumulating_store(chat_validate_reaction_doc);
		companionMountedRef.current = true;
		feedsStartedRef.current = false;
		companionHttpFenceRef.current = { reactions: null, replies: null };
		companionInflightRef.current = { reactions: false, replies: false };
		reset_companion_retry("reactions");
		reset_companion_retry("replies");
		reactionsCoverageRef.current = null;
		repliesCoverageRef.current = null;
		setMessagesSince(null);
		setRepliesSince(null);
		setReactionsSince(null);
		const watchWindow = client.data.watchWindow(
			{ collection: "messages", keyPrefix: chat_message_key_prefix(channel.key), pageSize: 100 },
			(update, info) => {
				if (update === null) {
					setMessagesDeath({ reason: info?.reason });
					return;
				}
				const windowDocs = store.apply_window(update.docs);
				setMessages(store.get_sorted());
				setMessagesLoaded(true);
				setMessagesWindow({ hasMore: update.hasMore, atCapacity: update.atCapacity, incomplete: update.incomplete });
				// Read the frontier off this delivery, not off the merged store: the store also holds
				// every row an HTTP page added below the window, and the companions must not chase those.
				const windowOldestKey = windowDocs.reduce<string | null>(
					(oldest, doc) => (oldest === null || doc.key > oldest ? doc.key : oldest),
					null,
				);
				windowOldestKeyRef.current = windowOldestKey;
				oldestRootRef.current = windowOldestKey === null ? null : windowOldestKey.slice(0, ROOT_KEY_LENGTH);
				start_feeds_if_needed(windowDocs);
				if (reactionsCoverageRef.current === null && !companionInflightRef.current.reactions) {
					list_companion("reactions");
				}
				if (repliesCoverageRef.current === null && !companionInflightRef.current.replies) {
					list_companion("replies");
				}
				evaluate_companion_catch_up();

				const seen = seenKeysRef.current;
				// The first window is existing history, never announced.
				if (seen === null) {
					seenKeysRef.current = new Set(windowDocs.map((doc) => doc.key));
					return;
				}
				// Announce only messages authored by OTHER members. The user's own sends must
				// never reach the announcer — the log itself is aria-live="off" for the same reason.
				const arrivals = windowDocs.filter(
					(doc) => !seen.has(doc.key) && doc.createdBy !== userId && doc.value.deletedAt === null,
				);
				for (const doc of windowDocs) {
					seen.add(doc.key);
				}
				if (arrivals.length === 1) {
					const arrival = arrivals[0];
					memberNames
						.resolve([arrival.createdBy])
						.then(() => {
							const name = memberNames.get(arrival.createdBy) ?? null;
							const text = arrival.value.text;
							const preview = text.length > 80 ? `${text.slice(0, 80)}…` : text;
							announce(`${name ?? "Former member"}: ${preview}`);
						})
						.catch(() => {
							announce(`New message in #${channelNameRef.current}`);
						});
				} else if (arrivals.length > 1) {
					// Coalesce a burst into one announcement.
					announce(`${arrivals.length} new messages in #${channelNameRef.current}`);
				}
			},
		);
		messagesWindowRef.current = watchWindow;
		return () => {
			companionMountedRef.current = false;
			reset_companion_retry("reactions");
			reset_companion_retry("replies");
			messagesWindowRef.current = null;
			watchWindow.unsubscribe();
		};
	}, [client, channel.key, userId, memberNames, announce]);

	const feed_scope_args = privateScopeId === undefined ? {} : { scopeId: privateScopeId };

	useEffect(() => {
		if (messagesSince === null) {
			return;
		}
		const unsubscribe = client.data.watchChanges(
			{ collection: "messages", limit: 100, updatedSince: messagesSince, ...feed_scope_args },
			(update, info) => {
				if (update === null) {
					setMessagesDeath({ reason: info?.reason });
					return;
				}
				const store = messagesStoreRef.current;
				if (store === null) {
					return;
				}
				const mine = docs_in_prefix(update.docs, channelPrefix);
				store.apply_window(mine);
				setMessages(store.get_sorted());
				if (update.truncated && windowOldestKeyRef.current !== null) {
					list_plugin_documents(client, {
						collection: "messages",
						keyPrefix: channelPrefix,
						keyStartExclusive: windowOldestKeyRef.current,
						limit: DEEP_HISTORY_PAGE_SIZE,
					})
						.then((page) => {
							apply_message_docs(page.documents);
						})
						.catch(() => {});
				}
				const newest = newest_raw_updated_at(update.docs);
				const nextSince = next_feed_since({
					current: messagesSince,
					newest,
					truncated: update.truncated,
				});
				if (nextSince !== null) {
					setMessagesSince(nextSince);
				}
			},
		);
		return unsubscribe;
	}, [client, channel.key, messagesSince, privateScopeId, channelPrefix]);

	useEffect(() => {
		if (repliesSince === null) {
			return;
		}
		const unsubscribe = client.data.watchChanges(
			{ collection: "replies", limit: 100, updatedSince: repliesSince, ...feed_scope_args },
			(update, info) => {
				if (update === null) {
					clear_companion_retry("replies");
					const previous = repliesCoverageRef.current ?? {
						hasMore: false,
						deepestRoot: null,
						incomplete: false,
						death: null,
					};
					const next = { ...previous, incomplete: false, death: { reason: info?.reason } };
					repliesCoverageRef.current = next;
					setReplyCoverage(next);
					return;
				}
				const store = repliesStoreRef.current;
				if (store === null) {
					return;
				}
				const mine = docs_in_prefix(update.docs, channelPrefix);
				store.apply_window(mine);
				setChannelReplies(store.get_sorted());
				retry_incomplete_companion("replies");
				const newest = newest_raw_updated_at(update.docs);
				const nextSince = next_feed_since({
					current: repliesSince,
					newest,
					truncated: update.truncated,
				});
				if (nextSince !== null) {
					setRepliesSince(nextSince);
				}
			},
		);
		return unsubscribe;
	}, [client, channel.key, repliesSince, privateScopeId, channelPrefix]);

	useEffect(() => {
		if (reactionsSince === null) {
			return;
		}
		const unsubscribe = client.data.watchChanges(
			{ collection: "reactions", limit: 100, updatedSince: reactionsSince, ...feed_scope_args },
			(update, info) => {
				if (update === null) {
					clear_companion_retry("reactions");
					const previous = reactionsCoverageRef.current ?? {
						hasMore: false,
						deepestRoot: null,
						incomplete: false,
						death: null,
					};
					const next = { ...previous, incomplete: false, death: { reason: info?.reason } };
					reactionsCoverageRef.current = next;
					setReactionCoverage(next);
					return;
				}
				const store = reactionsStoreRef.current;
				if (store === null) {
					return;
				}
				const mine = docs_in_prefix(update.docs, channelPrefix);
				store.apply_window(mine);
				setReactionDocs(store.get_sorted());
				retry_incomplete_companion("reactions");
				const newest = newest_raw_updated_at(update.docs);
				const nextSince = next_feed_since({
					current: reactionsSince,
					newest,
					truncated: update.truncated,
				});
				if (nextSince !== null) {
					setReactionsSince(nextSince);
				}
			},
		);
		return unsubscribe;
	}, [client, channel.key, reactionsSince, privateScopeId, channelPrefix]);

	useEffect(() => {
		const on_visibility = () => {
			if (document.visibilityState !== "visible") {
				return;
			}
			retry_incomplete_companion("reactions");
			retry_incomplete_companion("replies");
		};
		document.addEventListener("visibilitychange", on_visibility);
		return () => document.removeEventListener("visibilitychange", on_visibility);
	}, [client, channel.key]);

	useEffect(() => {
		if (threadRootKey === null) {
			setThreadRepliesLoaded(true);
			setThreadRepliesTruncated(false);
			setThreadRepliesError(null);
			return;
		}
		let cancelled = false;
		setThreadRepliesLoaded(false);
		setThreadRepliesTruncated(false);
		setThreadRepliesError(null);
		list_plugin_documents(client, {
			collection: "replies",
			keyPrefix: chat_reply_key_prefix(threadRootKey),
			limit: DEEP_HISTORY_PAGE_SIZE,
		})
			.then((page) => {
				if (cancelled) {
					return;
				}
				apply_reply_docs(page.documents);
				setThreadRepliesTruncated(!page.isDone);
				setThreadRepliesLoaded(true);
			})
			.catch((error: unknown) => {
				if (cancelled) {
					return;
				}
				setThreadRepliesError(chat_get_error_message(error));
				setThreadRepliesLoaded(true);
			});
		return () => {
			cancelled = true;
		};
	}, [client, threadRootKey]);

	/**
	 * §7.4's private-channel mitigation: after a successful append in a private channel the
	 * sender stamps `lastMessageAt` on the channel doc, because a rangeless read never sees a
	 * private scope and members with the channel closed have nothing else to say "unread" from.
	 * Compare-and-set so a concurrent rename is not clobbered; a lost race parks the timestamp
	 * and the effect below retries once from the fresher doc the channels watch delivers.
	 */
	const stampRetryRef = useRef<number | null>(null);
	const stamp_last_message = (channelDoc: chat_Doc<chat_ChannelValue>, at: number) => {
		client.data
			.put({
				collection: "channels",
				key: channelDoc.key,
				value: { ...channelDoc.value, lastMessageAt: at },
				expectedRevision: channelDoc.revision,
			})
			.then((result) => {
				if ("_nay" in result && result._nay.name === "conflict" && stampRetryRef.current === null) {
					stampRetryRef.current = at;
				}
			})
			.catch(() => {});
	};

	// The one retry of a conflicted stamp, fired when the channels watch delivers a fresher doc.
	useEffect(() => {
		const at = stampRetryRef.current;
		if (at === null) {
			return;
		}
		stampRetryRef.current = null;
		if ((channel.value.lastMessageAt ?? 0) < at) {
			stamp_last_message(channel, at);
		}
	}, [channel]);

	const queue = use_send_queue({
		client,
		collection: "messages",
		keyPrefix: chat_message_key_prefix(channel.key),
		userId,
		onDelivered: (doc) => {
			messagesStoreRef.current?.apply_local(doc);
			seenKeysRef.current?.add(doc.key);
			setMessages(messagesStoreRef.current?.get_sorted() ?? []);
			// Debounced: a burst of sends stamps once, so the doubled write stays inside the
			// send rate budget.
			if (
				chat_channel_is_private(channel.key) &&
				doc.timestamp - (channel.value.lastMessageAt ?? 0) >= PRIVATE_STAMP_DEBOUNCE_MS
			) {
				stamp_last_message(channel, doc.timestamp);
			}
		},
		onStorageFull: setStorageFull,
	});

	// Resolve author names for everything in view — and mentioned members, whose names the text
	// needs even when they never posted here.
	useEffect(() => {
		const ids = new Set<string>();
		for (const doc of messages) {
			ids.add(doc.createdBy);
			for (const id of doc.value.mentions ?? []) {
				ids.add(id);
			}
		}
		for (const doc of channelReplies) {
			ids.add(doc.createdBy);
			for (const id of doc.value.mentions ?? []) {
				ids.add(id);
			}
		}
		if (ids.size > 0) {
			void memberNames.resolve([...ids]);
		}
	}, [messages, channelReplies, memberNames]);

	// Report the newest rendered message so the app can move this member's read cursor. Own
	// sends count too: writing in a channel is reading it.
	useEffect(() => {
		if (messages.length > 0) {
			onNewestVisible(messages[0].timestamp);
		}
	}, [messages, onNewestVisible]);

	// Keep the newest message visible: jump (no smooth animation, which also satisfies
	// reduced motion) when a new newest message or an own pending send appears.
	useEffect(() => {
		const newestKey = messages.length > 0 ? messages[0].key : null;
		const newestChanged = newestKey !== null && newestKey !== newestKeyRef.current;
		const pendingGrew = queue.pending.length > pendingCountRef.current;
		newestKeyRef.current = newestKey;
		pendingCountRef.current = queue.pending.length;
		if ((newestChanged || pendingGrew) && logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight;
		}
	}, [messages, queue.pending.length]);

	// The SDK window retains everything it loaded, so "load older" is one call on the window
	// handle; the extended window arrives as a normal update.
	const handle_load_older = () => {
		messagesWindowRef.current?.loadOlder();
	};

	/**
	 * Once the window has spent its intervals, older history comes over HTTP instead.
	 *
	 * The continuation is a fencepost, not a cursor. The route now takes a cursor beside a key range,
	 * but it binds each cursor to the exact range it was issued for and refuses one sent back with a
	 * different range. A fencepost is just a key, so it needs no such binding and it survives a page
	 * reload. The first press continues from the window's own oldest key, so nothing the window
	 * already holds is fetched again.
	 */
	const handle_load_older_http = () => {
		const fencepost = httpOldestKeyRef.current ?? windowOldestKeyRef.current;
		if (fencepost === null) {
			return;
		}
		setDeepHistory({ kind: "loading" });
		client
			.fetchJson("/api/v1/plugin-data/list", {
				body: {
					collection: "messages",
					keyPrefix: chat_message_key_prefix(channel.key),
					keyStartExclusive: fencepost,
					limit: DEEP_HISTORY_PAGE_SIZE,
				},
			})
			.then((raw: unknown) => {
				const parsed = chat_plugin_data_list_response_schema.safeParse(raw);
				if (!parsed.success) {
					setDeepHistory({ kind: "failed", message: "Unexpected response for older messages.", retryAt: null });
					return;
				}
				const store = messagesStoreRef.current;
				if (store === null) {
					return;
				}
				// The store merges by key, so a page that overlaps what is already held adds nothing.
				const merged = store.apply_window(parsed.data.documents);
				setMessages(store.get_sorted());
				for (const doc of merged) {
					// These rows are history. They must never reach the announcer as new arrivals.
					seenKeysRef.current?.add(doc.key);
					if (httpOldestKeyRef.current === null || doc.key > httpOldestKeyRef.current) {
						httpOldestKeyRef.current = doc.key;
					}
				}
				// `isDone` is the route's own exhaustion signal. A page that happens to be exactly
				// full is not the end, and treating it as one would hide real history.
				setDeepHistory(parsed.data.isDone ? { kind: "exhausted" } : { kind: "idle" });
			})
			.catch((error: unknown) => {
				// `fetchJson` throws on every non-ok response, so 429 is one branch of many. Only the
				// throttled one names a wait and clears itself; the rest hand back a Retry.
				const status = (error as { status?: unknown }).status;
				if (status !== 429) {
					setDeepHistory({ kind: "failed", message: chat_get_error_message(error), retryAt: null });
					return;
				}
				const retryAfterMs = read_retry_after_ms((error as { responseText?: unknown }).responseText) ?? 1_000;
				setDeepHistory({
					kind: "failed",
					message: "Older messages are being loaded too quickly. Waiting a moment before you can try again.",
					retryAt: Date.now() + retryAfterMs,
				});
			});
	};

	// The throttle clears itself: the bucket refills at two tokens a second, so the control returns
	// to idle on its own rather than staying dead for the life of the frame. It never re-requests.
	useEffect(() => {
		if (deepHistory.kind !== "failed" || deepHistory.retryAt === null) {
			return;
		}
		const timer = setTimeout(
			() => {
				setDeepHistory({ kind: "idle" });
			},
			Math.max(0, deepHistory.retryAt - Date.now()),
		);
		return () => {
			clearTimeout(timer);
		};
	}, [deepHistory]);

	// The separator publishes its range to assistive tech, and that range is the container's width
	// minus the log floor. Reading the element during render would give a number from the previous
	// layout, so the width is state and an observer keeps it current. Without this the separator
	// keeps announcing the range it had before the window was resized: measured at 1060px, it still
	// said "980 of 244 to 1612" while the panel really sat at 399 with a maximum of 640.
	// Only the separator reads this width, so the observer runs only while one is on screen.
	useEffect(() => {
		const body = channelBodyRef.current;
		if (threadRootKey === null || body === null) {
			return;
		}

		setBodyWidth(body.clientWidth);
		const observer = new ResizeObserver(() => setBodyWidth(body.clientWidth));
		observer.observe(body);
		return () => observer.disconnect();
	}, [threadRootKey]);

	/**
	 * Moves the separator between the log and the thread panel.
	 *
	 * `.thread` takes its width from `--thread-width` as a flex basis, so writing `width` would
	 * move nothing. The clamp keeps §5's two floors; when the container is too narrow to hold both
	 * (or has not been laid out yet, so its width reads 0) the maximum collapses onto the minimum
	 * and the separator simply does not move.
	 *
	 * The stored width is the member's preference and is never rewritten by a resize. Only what the
	 * panel actually gets, and what the separator announces, pass through this clamp — so shrinking
	 * the window and growing it back returns the panel to the width they chose.
	 */
	const clamp_thread_width = (width: number) => {
		const maximum = Math.max(MIN_THREAD_WIDTH, bodyWidth - MIN_LOG_WIDTH);
		return Math.min(maximum, Math.max(MIN_THREAD_WIDTH, width));
	};

	const handle_resize_key_down = (event: KeyboardEvent<HTMLDivElement>) => {
		// The panel is the RIGHT column, so moving the separator left makes it wider.
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			setThreadWidth(clamp_thread_width(threadWidth + THREAD_RESIZE_STEP));
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			setThreadWidth(clamp_thread_width(threadWidth - THREAD_RESIZE_STEP));
		} else if (event.key === "Home") {
			event.preventDefault();
			setThreadWidth(clamp_thread_width(DEFAULT_THREAD_WIDTH));
		}
	};

	const handle_resize_pointer_down = (event: PointerEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.currentTarget.setPointerCapture(event.pointerId);
	};

	const handle_resize_pointer_move = (event: PointerEvent<HTMLDivElement>) => {
		if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
			return;
		}
		const bounds = channelBodyRef.current?.getBoundingClientRect();
		if (bounds === undefined) {
			return;
		}
		setThreadWidth(clamp_thread_width(bounds.right - event.clientX));
	};

	const reactionGroupsByTarget = useMemo(() => chat_group_reactions(reactionDocs, userId), [reactionDocs, userId]);

	const replyCounts = useMemo(() => chat_count_replies(channelReplies), [channelReplies]);

	const apply_local_message = (doc: chat_Doc<chat_MessageValue>) => {
		messagesStoreRef.current?.apply_local(doc);
		setMessages(messagesStoreRef.current?.get_sorted() ?? []);
	};

	const apply_local_reply = (doc: chat_Doc<chat_MessageValue>) => {
		repliesStoreRef.current?.apply_local(doc);
		setChannelReplies(repliesStoreRef.current?.get_sorted() ?? []);
	};

	const apply_local_reaction = (doc: chat_ReactionDoc) => {
		reactionsStoreRef.current?.apply_local(doc);
		setReactionDocs(reactionsStoreRef.current?.get_sorted() ?? []);
	};

	const threadReplies =
		threadRootKey === null
			? []
			: channelReplies.filter((doc) => chat_reply_root_key(doc.key) === threadRootKey);

	const handle_close_thread = () => {
		const key = threadRootKey;
		setThreadRootKey(null);
		if (key !== null) {
			replyTriggersRef.current.get(key)?.focus();
		}
	};

	const threadRoot = threadRootKey === null ? null : (messages.find((doc) => doc.key === threadRootKey) ?? null);
	const messageEntries = build_message_entries(
		[...messages].reverse(),
		Date.now(),
		openedAtLastReadAt === null ? null : { lastReadAt: openedAtLastReadAt, selfUserId: userId },
	);
	const threadWidthMaximum = Math.max(MIN_THREAD_WIDTH, bodyWidth - MIN_LOG_WIDTH);
	const threadWidthEffective = clamp_thread_width(threadWidth);

	if (messagesDeath !== null) {
		return (
			<div className="channel">
				<div className="channel-dead" role="alert">
					{watch_death_message(messagesDeath.reason, `messages in #${channel.value.name}`)}
				</div>
			</div>
		);
	}

	return (
		<div className="channel">
			<header className="channel-head">
				<div className="channel-head-main">
					<h2 className="channel-title">#{channel.value.name}</h2>
					{channel.value.topic !== undefined && channel.value.topic !== "" ? (
						<p className="channel-topic">{channel.value.topic}</p>
					) : null}
					{/* The same words the create and people dialogs use. Saying "private" without naming the
					    organization owner would be a disclosure, and this header is where somebody reading
					    the channel every day sees it. */}
					{chat_channel_is_private(channel.key) ? (
						<p className="channel-privacy">{chat_PRIVATE_CHANNEL_DISCLOSURE}</p>
					) : null}
				</div>
				{channel.value.archivedAt !== null ? <span className="channel-archived-badge">Archived</span> : null}
			</header>
			<div
				ref={channelBodyRef}
				className="channel-body"
				style={{ "--thread-width": `${threadWidthEffective}px` } satisfies ChannelBody_CssVars as CSSProperties}
			>
				<div
					ref={logRef}
					className="message-log"
					role="log"
					aria-live="off"
					aria-label={`Messages in #${channel.value.name}`}
				>
					{messagesLoaded && messagesWindow.hasMore && !messagesWindow.atCapacity ? (
						<div className="log-older">
							<button type="button" className="button" onClick={handle_load_older}>
								Load older
							</button>
						</div>
					) : null}
					{/* The live window has spent its intervals. Deeper history still exists and is
					    readable over HTTP, so the capacity state is a working control, not a dead end.
					    The log itself is aria-live="off", so the state line carries role="status" or
					    reaching capacity would be announced to nobody. */}
					{messagesLoaded && messagesWindow.hasMore && messagesWindow.atCapacity ? (
						<div className="log-older">
							<span className="channel-status" role="status">
								{deepHistory.kind === "loading"
									? "Loading older messages…"
									: deepHistory.kind === "exhausted"
										? `You have reached the start of #${channel.value.name}.`
										: "The live view stopped growing. Older messages load on request."}
							</span>
							{deepHistory.kind === "exhausted" ? null : (
								<button
									type="button"
									className="button"
									disabled={
										deepHistory.kind === "loading" ||
										(deepHistory.kind === "failed" && deepHistory.retryAt !== null)
									}
									onClick={handle_load_older_http}
								>
									Load older messages
								</button>
							)}
							{deepHistory.kind === "failed" ? (
								<span className="channel-status is-error" role="alert">
									{deepHistory.message}
								</span>
							) : null}
						</div>
					) : null}
					{/* Nothing is missing from this view — the rows are all still here. What the store
					    holds for the range it lost is frozen at the last value it heard about. */}
					{messagesWindow.incomplete ? (
						<div className="channel-status" role="alert">
							Older messages in view may be out of date.
						</div>
					) : null}
					{reactionCoverage.incomplete || replyCoverage.incomplete ? (
						<div className="channel-status" role="alert">
							Some reactions and replies in this range could not be loaded.
						</div>
					) : null}
					{reactionCoverage.death !== null ? (
						<div className="channel-status is-error" role="alert">
							{watch_death_message(reactionCoverage.death.reason, "reactions in this channel")}
						</div>
					) : null}
					{replyCoverage.death !== null ? (
						<div className="channel-status is-error" role="alert">
							{watch_death_message(replyCoverage.death.reason, "reply counts in this channel")}
						</div>
					) : null}
					{!messagesLoaded ? (
						<div className="channel-status" role="status">
							Loading messages…
						</div>
					) : messages.length === 0 && queue.pending.length === 0 ? (
						<div className="channel-status">No messages yet</div>
					) : (
						<ul className="message-list">
							{messageEntries.map((entry) =>
								entry.kind === "divider" ? (
									<li key={entry.key} className="day-divider">
										{entry.label}
									</li>
								) : entry.kind === "new" ? (
									// Announced from its own content like the day divider, so it needs no role
									// and no label. "New messages" and not "New": read out on its own, a bare
									// "New" says nothing about what follows.
									<li key={entry.key} className="new-divider">
										<span className="new-divider-label">New messages</span>
									</li>
								) : (
									<MessageRow
										key={entry.doc.key}
										client={client}
										collection="messages"
										doc={entry.doc}
										isOwn={entry.doc.createdBy === userId}
										selfUserId={userId}
										memberNames={memberNames}
										isContinuation={entry.isContinuation}
										authorName={memberNames.get(entry.doc.createdBy)}
										// Known groups still render even when the HTTP list has not reached
										// this row yet. Empty + uncovered still reads as unknown.
										reactionGroups={reaction_groups_for_row(
											reactionCoverage,
											reactionGroupsByTarget,
											entry.doc.key,
										)}
										replyCount={reply_count_for_row(replyCoverage, replyCounts, entry.doc.key)}
										replyLatestAt={replyCounts.get(entry.doc.key)?.latestAt ?? null}
										repliesHasMore={replyCoverage.hasMore}
										onOpenThread={(root) => setThreadRootKey(root.key)}
										replyTriggerRef={(el) => {
											if (el === null) {
												replyTriggersRef.current.delete(entry.doc.key);
											} else {
												replyTriggersRef.current.set(entry.doc.key, el);
											}
										}}
										onApplyLocal={apply_local_message}
										onApplyReaction={apply_local_reaction}
										onStorageFull={setStorageFull}
									/>
								),
							)}
							{queue.pending.map((pending) => (
								<PendingRow key={pending.clientRequestId} pending={pending} onRetry={() => queue.retry(pending)} />
							))}
						</ul>
					)}
				</div>
				{/* A 24px transparent strip over the panel edge. It is absolutely positioned so it
				    costs the flex row no width, which is what keeps §5's two floors reachable. */}
				{threadRoot !== null ? (
					<div
						className="thread-resize"
						role="separator"
						tabIndex={0}
						aria-orientation="vertical"
						aria-label="Resize thread panel"
						aria-valuenow={threadWidthEffective}
						aria-valuemin={MIN_THREAD_WIDTH}
						aria-valuemax={threadWidthMaximum}
						onKeyDown={handle_resize_key_down}
						onPointerDown={handle_resize_pointer_down}
						onPointerMove={handle_resize_pointer_move}
						onDoubleClick={() => setThreadWidth(clamp_thread_width(DEFAULT_THREAD_WIDTH))}
					/>
				) : null}
				{threadRoot !== null ? (
					<ThreadPanel
						// Key by the root so switching threads remounts the panel: replies,
						// loading state, and the send queue must not leak from the previous
						// root (a surviving pending retry would append under the new root's
						// keyPrefix — a wrong-thread write).
						key={threadRoot.key}
						client={client}
						userId={userId}
						root={threadRoot}
						replies={threadReplies}
						repliesLoaded={threadRepliesLoaded}
						repliesTruncated={threadRepliesTruncated}
						repliesError={threadRepliesError}
						reactionGroupsByTarget={reactionGroupsByTarget}
						memberNames={memberNames}
						isNarrow={isNarrow}
						storageFull={storageFull}
						onStorageFull={setStorageFull}
						onApplyLocalRoot={apply_local_message}
						onApplyLocalReply={apply_local_reply}
						onApplyReaction={apply_local_reaction}
						onClose={handle_close_thread}
					/>
				) : null}
			</div>
			{/* One channel-level statement, not the same sentence repeated on every refused row.
			    The server's own message is what separates "you are full" from "the plugin is full". */}
			{storageFull !== null ? (
				<div className="channel-status is-error" role="alert">
					{storageFull}
				</div>
			) : null}
			<Composer
				client={client}
				label={`Message #${channel.value.name}`}
				busy={queue.busy}
				disabled={storageFull !== null}
				onSend={queue.send}
			/>
		</div>
	);
}

// #endregion channel view
