import type { BonoboUiFrontendClient, BonoboUiMember } from "bonobo-plugin-sdk/frontend";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import {
	chat_channel_is_private,
	chat_download_urls_response_schema,
	chat_files_list_response_schema,
	chat_format_recency,
	chat_get_error_message,
	chat_key_timestamp,
	chat_message_key_prefix,
	chat_plugin_data_list_response_schema,
	chat_PRIVATE_CHANNEL_DISCLOSURE,
	chat_reaction_caller_key,
	chat_REACTION_EMOJI,
	chat_REACTION_LABELS,
	chat_REACTION_TOKENS,
	chat_reply_key_prefix,
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
	chat_create_window_store,
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

function Composer(props: Composer_Props) {
	const hintId = useId();
	const [text, setText] = useState("");
	const [attachments, setAttachments] = useState<chat_Attachment[]>([]);
	const [pickerOpen, setPickerOpen] = useState(false);
	/** null = never asked; "failed" = the roster was refused, so @ degrades to plain text. */
	const [mentionRoster, setMentionRoster] = useState<BonoboUiMember[] | "failed" | null>(null);
	/** The `@word` under the caret: where the `@` sits and what follows it. */
	const [mentionQuery, setMentionQuery] = useState<{ start: number; query: string } | null>(null);
	const [mentionIndex, setMentionIndex] = useState(0);
	/** userId → the display name that was inserted for it. Send keeps only names still in the text. */
	const chosenMentionsRef = useRef(new Map<string, string>());
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const rosterRequestedRef = useRef(false);

	// The roster is read on the first "@", not on mount — most sends never mention anybody.
	// A refusal degrades to plain text, mirroring the people dialog: the member can still type
	// "@Ana" as ordinary words.
	const update_mention_query = (value: string, caret: number) => {
		const match = /(?:^|\s)@([^\s@]*)$/.exec(value.slice(0, caret));
		if (match === null) {
			setMentionQuery(null);
			return;
		}
		setMentionQuery({ start: caret - match[1].length - 1, query: match[1] });
		setMentionIndex(0);
		if (!rosterRequestedRef.current) {
			rosterRequestedRef.current = true;
			// `members.list` resolves every refusal and never rejects.
			props.client.members.list({ limit: 100 }).then((result) => {
				setMentionRoster("_nay" in result ? "failed" : result._yay.members);
			});
		}
	};

	const selfUserId = props.client.context.userId;
	const mentionCandidates =
		mentionQuery !== null && Array.isArray(mentionRoster)
			? mentionRoster
					.filter(
						(member): member is BonoboUiMember & { displayName: string } =>
							typeof member.displayName === "string" &&
							member.displayName !== "" &&
							member.userId !== selfUserId &&
							member.displayName.toLowerCase().startsWith(mentionQuery.query.toLowerCase()),
					)
					.slice(0, MENTION_MENU_SIZE)
			: [];

	const pick_mention = (member: BonoboUiMember & { displayName: string }) => {
		if (mentionQuery === null) {
			return;
		}
		const caret = textareaRef.current?.selectionStart ?? text.length;
		const next = `${text.slice(0, mentionQuery.start)}@${member.displayName} ${text.slice(caret)}`;
		chosenMentionsRef.current.set(member.userId, member.displayName);
		setText(next);
		setMentionQuery(null);
		// Put the caret after the inserted "@Name " so typing continues past it.
		const newCaret = mentionQuery.start + member.displayName.length + 2;
		queueMicrotask(() => {
			const element = textareaRef.current;
			if (element !== null) {
				element.focus();
				element.setSelectionRange(newCaret, newCaret);
			}
		});
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
		// Store only ids whose "@Name" still stands in the sent text — deleting the name from the
		// text deletes the mention.
		const mentions = [...chosenMentionsRef.current.entries()]
			.filter(([, name]) => trimmed.includes(`@${name}`))
			.map(([id]) => id);
		props.onSend(trimmed, attachments, mentions);
		setText("");
		setAttachments([]);
		setMentionQuery(null);
		chosenMentionsRef.current.clear();
	};

	const handle_key_down = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		// While the mention menu is open it owns these keys; Enter picks, it does not send.
		if (mentionQuery !== null && mentionCandidates.length > 0) {
			if (event.key === "ArrowDown") {
				event.preventDefault();
				setMentionIndex((index) => (index + 1) % mentionCandidates.length);
				return;
			}
			if (event.key === "ArrowUp") {
				event.preventDefault();
				setMentionIndex((index) => (index - 1 + mentionCandidates.length) % mentionCandidates.length);
				return;
			}
			if (event.key === "Enter" || event.key === "Tab") {
				event.preventDefault();
				pick_mention(mentionCandidates[mentionIndex]);
				return;
			}
			if (event.key === "Escape") {
				// Stop it here or the thread panel reads the same press as "close the thread".
				event.preventDefault();
				event.stopPropagation();
				setMentionQuery(null);
				return;
			}
		}
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handle_send();
		}
	};

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
				<textarea
					ref={textareaRef}
					className="composer-input"
					aria-label={props.label}
					aria-describedby={hintId}
					placeholder={props.label}
					rows={1}
					value={text}
					onInput={(event) => {
						const value = event.currentTarget.value;
						setText(value);
						update_mention_query(value, event.currentTarget.selectionStart ?? value.length);
					}}
					onKeyDown={handle_key_down}
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
			{mentionQuery !== null && mentionCandidates.length > 0 ? (
				<>
					<ul className="mention-menu" role="listbox" aria-label="Mention somebody">
						{mentionCandidates.map((member, index) => (
							<li
								key={member.userId}
								role="option"
								aria-selected={index === mentionIndex}
								className={index === mentionIndex ? "mention-option is-active" : "mention-option"}
								// Mousedown, not click: a click would blur the textarea first.
								onMouseDown={(event) => {
									event.preventDefault();
									pick_mention(member);
								}}
							>
								{member.displayName}
							</li>
						))}
					</ul>
					{/* Speak the active option. The textarea keeps focus, so without this a keyboard
					    user hears nothing while arrowing through the menu. */}
					<span className="visually-hidden" role="status">
						{`${mentionCandidates[mentionIndex]?.displayName ?? ""}, ${mentionIndex + 1} of ${mentionCandidates.length}`}
					</span>
				</>
			) : null}
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
	 * "unknown" = the reactions window does not cover this row, so the app cannot say which
	 * reactions it has. An empty array here would render as "nobody reacted", which is a different
	 * statement and a false one. The row shows an uncovered state instead, and the toggle refuses.
	 */
	reactionGroups: chat_ReactionGroup[] | "unknown";
	/**
	 * null = this row offers no thread affordance (rows inside a thread panel).
	 * "unknown" = the replies window does not reach this root yet, so no count is claimed.
	 */
	replyCount: number | "unknown" | null;
	/** Newest reply time the window holds for this root, or null when it holds no reply for it. */
	replyLatestAt: number | null;
	/** True while the replies window says more replies exist below it — gates the "99+" cap. */
	repliesHasMore: boolean;
	onOpenThread: ((doc: chat_Doc<chat_MessageValue>) => void) | null;
	replyTriggerRef: ((el: HTMLButtonElement | null) => void) | null;
	onApplyLocal: (doc: chat_Doc<chat_MessageValue>) => void;
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
		// The reactions window does not cover this row, so nothing here knows what this member
		// already holds. The remove path is hidden rather than refused — no chips render, and the
		// row says why — while the add path stays live: `putOwned` writes the member's own key with
		// the same empty value whether or not it is already there, so it is correct either way.
		// Refusing both would stop reactions on every message older than the coverage frontier,
		// which in a busy channel is a couple of days back.
		if (props.reactionGroups === "unknown" && currentlyPressed) {
			setRowError("Reactions on this message could not be loaded, so they can't be removed right now.");
			return;
		}
		const request = currentlyPressed
			? client.data.removeOwned({ collection: "reactions", key: chat_reaction_caller_key(doc.key, token) })
			: client.data.putOwned({ collection: "reactions", key: chat_reaction_caller_key(doc.key, token), value: {} });
		request
			.then((result) => {
				if ("_nay" in result) {
					if (result._nay.name === "storage_full") {
						props.onStorageFull(result._nay.message);
						return;
					}
					setRowError(result._nay.message);
				}
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
					{/* An uncovered row has no known pressed state, so the palette shows none. The
					    toggle refuses the click and says why. */}
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
		return `Chitchat has too many live views open, so ${subject} stopped updating. Close a thread, or reload the page.`;
	}

	return `Chitchat stopped reading ${subject}. Reload the page to try again.`;
}

type ThreadPanel_Props = {
	client: BonoboUiFrontendClient;
	userId: string;
	root: chat_Doc<chat_MessageValue>;
	reactionGroupsByTarget: Map<string, chat_ReactionGroup[]>;
	memberNames: chat_MemberNamesApi;
	/** Below 720px the panel covers the whole frame, so its way out reads as "back", not "close". */
	isNarrow: boolean;
	storageFull: string | null;
	onStorageFull: (message: string) => void;
	onApplyLocalRoot: (doc: chat_Doc<chat_MessageValue>) => void;
	onClose: () => void;
};

export function ThreadPanel(props: ThreadPanel_Props) {
	const { client, userId, root, memberNames } = props;
	const [replies, setReplies] = useState<chat_Doc<chat_MessageValue>[]>([]);
	const [repliesLoaded, setRepliesLoaded] = useState(false);
	const [repliesTruncated, setRepliesTruncated] = useState(false);
	const [repliesDeath, setRepliesDeath] = useState<{ reason?: string } | null>(null);
	const storeRef = useRef<chat_AccumulatingStore<chat_MessageValue> | null>(null);
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);

	// Move focus into the panel when it opens; the parent focuses the trigger on close.
	useEffect(() => {
		closeButtonRef.current?.focus();
	}, []);

	useEffect(() => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		storeRef.current = store;
		const unsubscribe = client.data.watch(
			{ collection: "replies", keyPrefix: chat_reply_key_prefix(root.key), limit: 100 },
			(update, info) => {
				// A dead watch must not leave the panel on "Loading replies…" forever, and after a
				// first delivery it must not leave the list looking live while it silently freezes.
				if (update === null) {
					setRepliesDeath({ reason: info?.reason });
					setRepliesLoaded(true);
					return;
				}
				setRepliesDeath(null);
				store.apply_window(update.docs);
				setReplies(store.get_sorted());
				setRepliesLoaded(true);
				// A plain watch reads the newest 100 replies and cannot reach past that. The panel
				// has no "load older" because `watch` exposes none, and a fourth window would put
				// the frame over its 24-subscription budget. So say the list is cut instead of
				// showing 100 replies under a "99+" count as if that were all of them.
				setRepliesTruncated(update.truncated);
			},
		);
		return unsubscribe;
	}, [client, root.key]);

	const queue = use_send_queue({
		client,
		collection: "replies",
		keyPrefix: chat_reply_key_prefix(root.key),
		userId,
		onDelivered: (doc) => {
			storeRef.current?.apply_local(doc);
			setReplies(storeRef.current?.get_sorted() ?? []);
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
					onStorageFull={props.onStorageFull}
				/>
			</ul>
			{repliesDeath !== null ? (
				<div className="channel-status is-error" role="alert">
					{watch_death_message(repliesDeath.reason, "the replies in this thread")}
				</div>
			) : null}
			{repliesTruncated ? (
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
								onApplyLocal={(updated) => {
									storeRef.current?.apply_local(updated);
									setReplies(storeRef.current?.get_sorted() ?? []);
								}}
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
				disabled={props.storageFull !== null || repliesDeath !== null}
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

/** What the catch-up loop needs to know about a companion window's coverage. */
type CompanionCoverage = {
	hasMore: boolean;
	atCapacity: boolean;
	/** Root message key (first 55 chars) of the deepest validated doc, or null when empty. */
	deepestRoot: string | null;
	/**
	 * The window lost documents in the middle of its range and cannot re-read them. It does not
	 * say which ones, so no row can be called covered while this is true.
	 */
	incomplete: boolean;
};

/**
 * The part of a companion's coverage the render reads. The refs above feed the catch-up loop,
 * which runs inside a delivery callback and must see the value that just arrived; this state
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
 * Whether a companion window can speak for one row. A window with nothing older left covers
 * everything; otherwise it covers only roots strictly newer than the deepest root it delivered.
 * An incomplete window covers nothing, because the gap could be anywhere inside its range, and a
 * dead one covers nothing, because it stopped hearing about changes anywhere in its range.
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
	const messagesStoreRef = useRef<chat_AccumulatingStore<chat_MessageValue> | null>(null);
	const messagesWindowRef = useRef<WindowHandle | null>(null);
	const reactionsWindowRef = useRef<WindowHandle | null>(null);
	const repliesWindowRef = useRef<WindowHandle | null>(null);
	const reactionsCoverageRef = useRef<CompanionCoverage | null>(null);
	const repliesCoverageRef = useRef<CompanionCoverage | null>(null);
	const oldestRootRef = useRef<string | null>(null);
	// The oldest key the reactive WINDOW itself delivered, kept apart from the merged store. An
	// HTTP page merges older keys into that store forever, and reading the fencepost back off it
	// would drag both companions into paging history the window never asked for.
	const windowOldestKeyRef = useRef<string | null>(null);
	/** The last key the previous HTTP page returned. The next page continues strictly after it. */
	const httpOldestKeyRef = useRef<string | null>(null);
	const channelBodyRef = useRef<HTMLDivElement | null>(null);
	const channelNameRef = useRef(channel.value.name);
	const seenKeysRef = useRef<Set<string> | null>(null);
	const replyTriggersRef = useRef(new Map<string, HTMLButtonElement>());
	const logRef = useRef<HTMLDivElement | null>(null);
	const newestKeyRef = useRef<string | null>(null);
	const pendingCountRef = useRef(0);

	// The announcer reads the channel name through this ref so a rename does not sit in the
	// messages effect's dependencies: any member renaming the channel in a loop would
	// otherwise tear down and rebuild every viewer's subscription (and its retained window)
	// at the rename rate.
	useEffect(() => {
		channelNameRef.current = channel.value.name;
	}, [channel.value.name]);

	// Companion catch-up: reactions and replies key by TARGET, not by time, so their windows
	// can lag behind the rendered message range. After every window delivery, extend a
	// companion one page while it still has older docs and its deepest covered root is newer
	// than the oldest rendered message. Plain JS `<` works here because every key chitchat
	// itself mints is ASCII by construction (client UUID prefix, server digit-and-hex tail) —
	// validation does NOT enforce ASCII, so a foreign writer's non-ASCII key could skew this
	// catch-up coverage for that key. Accepted: it never affects message delivery.
	const evaluate_companion_catch_up = () => {
		const oldestRoot = oldestRootRef.current;
		if (oldestRoot === null) {
			return;
		}
		for (const companion of [
			{ coverage: reactionsCoverageRef.current, windowHandle: reactionsWindowRef.current },
			{ coverage: repliesCoverageRef.current, windowHandle: repliesWindowRef.current },
		]) {
			if (companion.coverage === null || !companion.coverage.hasMore || companion.coverage.atCapacity) {
				continue;
			}
			if (companion.coverage.deepestRoot === null || companion.coverage.deepestRoot < oldestRoot) {
				companion.windowHandle?.loadOlder();
			}
		}
	};

	// Messages window: the host retains loaded history, so each update is the whole window.
	// The accumulating store stays as the merge seam for optimistic local echoes (its
	// revision-forward rule), plus remote-arrival detection for the announcer.
	useEffect(() => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		messagesStoreRef.current = store;
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
			messagesWindowRef.current = null;
			watchWindow.unsubscribe();
		};
	}, [client, channel.key, userId, memberNames, announce]);

	// Reactions window: replace-from-window (a reaction removed by removeOwned must
	// disappear). The channel prefix also covers reply reactions, because reply keys extend
	// their root message key.
	useEffect(() => {
		const store = chat_create_window_store(chat_validate_reaction_doc);
		const watchWindow = client.data.watchWindow(
			{ collection: "reactions", keyPrefix: chat_message_key_prefix(channel.key), pageSize: 100 },
			(update, info) => {
				// A ref alone cannot drive a render. Without the state the chips freeze at their
				// last delivered values and go on looking live while nothing reaches them again.
				if (update === null) {
					reactionsCoverageRef.current = null;
					setReactionCoverage((previous) => ({ ...previous, death: { reason: info?.reason } }));
					return;
				}
				const validated = store.apply_window(update.docs);
				setReactionDocs(validated);
				const deepestRoot =
					validated.length > 0 ? validated[validated.length - 1].key.slice(0, ROOT_KEY_LENGTH) : null;
				reactionsCoverageRef.current = {
					hasMore: update.hasMore,
					atCapacity: update.atCapacity,
					deepestRoot,
					incomplete: update.incomplete,
				};
				setReactionCoverage({ hasMore: update.hasMore, deepestRoot, incomplete: update.incomplete, death: null });
				evaluate_companion_catch_up();
			},
		);
		reactionsWindowRef.current = watchWindow;
		return () => {
			reactionsWindowRef.current = null;
			reactionsCoverageRef.current = null;
			watchWindow.unsubscribe();
		};
	}, [client, channel.key]);

	// Channel-wide replies window: feeds the per-root reply counts. Counts are exact for
	// covered roots; the catch-up loop drives coverage down to the oldest rendered message.
	useEffect(() => {
		const store = chat_create_window_store(chat_validate_message_doc);
		const watchWindow = client.data.watchWindow(
			{ collection: "replies", keyPrefix: chat_message_key_prefix(channel.key), pageSize: 100 },
			(update, info) => {
				// Same as the reactions window: a dead counter that keeps rendering an exact number
				// is the most confident and the stalest thing on the row.
				if (update === null) {
					repliesCoverageRef.current = null;
					setReplyCoverage((previous) => ({ ...previous, death: { reason: info?.reason } }));
					return;
				}
				const validated = store.apply_window(update.docs);
				setChannelReplies(validated);
				const deepestRoot =
					validated.length > 0 ? validated[validated.length - 1].key.slice(0, ROOT_KEY_LENGTH) : null;
				repliesCoverageRef.current = {
					hasMore: update.hasMore,
					atCapacity: update.atCapacity,
					deepestRoot,
					incomplete: update.incomplete,
				};
				setReplyCoverage({ hasMore: update.hasMore, deepestRoot, incomplete: update.incomplete, death: null });
				evaluate_companion_catch_up();
			},
		);
		repliesWindowRef.current = watchWindow;
		return () => {
			repliesWindowRef.current = null;
			repliesCoverageRef.current = null;
			watchWindow.unsubscribe();
		};
	}, [client, channel.key]);

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
										// Reactions are claimed only for rows the reactions window covers. An
										// empty list on an uncovered row would read as "nobody reacted".
										reactionGroups={
											companion_covers_root(reactionCoverage, entry.doc.key.slice(0, ROOT_KEY_LENGTH))
												? (reactionGroupsByTarget.get(entry.doc.key) ?? [])
												: "unknown"
										}
										// A count is claimed only for roots the replies window covers: every
										// root while nothing more exists below, else only roots strictly newer
										// than the deepest covered root (that one may still have replies below
										// the window).
										replyCount={
											companion_covers_root(replyCoverage, entry.doc.key.slice(0, ROOT_KEY_LENGTH))
												? (replyCounts.get(entry.doc.key)?.count ?? 0)
												: "unknown"
										}
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
						reactionGroupsByTarget={reactionGroupsByTarget}
						memberNames={memberNames}
						isNarrow={isNarrow}
						storageFull={storageFull}
						onStorageFull={setStorageFull}
						onApplyLocalRoot={apply_local_message}
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
