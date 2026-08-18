import type { BonoboUiFrontendClient } from "bonobo-plugin-sdk/frontend";
import type { KeyboardEvent } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
	chat_download_urls_response_schema,
	chat_files_list_response_schema,
	chat_get_error_message,
	chat_key_timestamp,
	chat_message_key_prefix,
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
 * Member display names resolved through the host bridge, cached in the App. The object
 * keeps one identity for the page's lifetime (the App re-renders consumers itself when a
 * resolution lands), so watch effects may safely list it as a dependency.
 */
export type chat_MemberNamesApi = {
	/** undefined = not resolved yet; null = missing or deleted user ("Former member"). */
	get: (userId: string) => string | null | undefined;
	/** Resolves unknown ids through the bridge; already-known ids are skipped. */
	resolve: (userIds: string[]) => Promise<void>;
};

// #region send queue

type PendingSend = {
	clientRequestId: string;
	text: string;
	attachments: chat_Attachment[];
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
}) {
	const [pending, setPending] = useState<PendingSend[]>([]);

	const start = (entry: { clientRequestId: string; text: string; attachments: chat_Attachment[] }) => {
		const value: chat_MessageValue = {
			text: entry.text,
			attachments: entry.attachments,
			editedAt: null,
			deletedAt: null,
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
					setPending((prev) =>
						prev.map((p) =>
							p.clientRequestId === entry.clientRequestId
								? { ...p, status: "failed" as const, errorMessage: result._nay.message }
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

	const send = (text: string, attachments: chat_Attachment[]) => {
		const clientRequestId = crypto.randomUUID();
		setPending((prev) => [...prev, { clientRequestId, text, attachments, status: "sending", errorMessage: null }]);
		start({ clientRequestId, text, attachments });
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

function AttachmentLink(props: { client: BonoboUiFrontendClient; attachment: chat_Attachment }) {
	const [state, setState] = useState<
		{ kind: "idle" } | { kind: "loading" } | { kind: "ready"; url: string } | { kind: "error"; message: string }
	>({ kind: "idle" });

	// URLs are never stored in the message doc: every open resolves a fresh signed URL so
	// the server rechecks this member's file permission per click.
	const handle_resolve = () => {
		setState({ kind: "loading" });
		props.client
			.fetchJson("/api/v1/files/download-urls", { body: { fileNodeIds: [props.attachment.fileNodeId] } })
			.then((raw: unknown) => {
				const parsed = chat_download_urls_response_schema.safeParse(raw);
				if (!parsed.success) {
					setState({ kind: "error", message: "Unexpected response for the download link" });
					return;
				}
				const item = parsed.data.items.find((candidate) => candidate.fileNodeId === props.attachment.fileNodeId);
				if (item !== undefined) {
					setState({ kind: "ready", url: item.url });
					return;
				}
				const failure = parsed.data.errors.find((candidate) => candidate.fileNodeId === props.attachment.fileNodeId);
				setState({ kind: "error", message: failure?.message ?? "Failed to get a download link" });
			})
			.catch((error: unknown) => {
				setState({ kind: "error", message: chat_get_error_message(error) });
			});
	};

	if (state.kind === "ready") {
		return (
			<span className="attachment">
				<a className="attachment-link" href={state.url} target="_blank" rel="noopener noreferrer">
					{props.attachment.name}
				</a>
				<span className="attachment-hint">Link ready — it expires after a few minutes.</span>
			</span>
		);
	}

	return (
		<span className="attachment">
			<button
				type="button"
				className="attachment-button"
				disabled={state.kind === "loading"}
				onClick={handle_resolve}
			>
				{state.kind === "loading" ? `Getting link for ${props.attachment.name}…` : props.attachment.name}
			</button>
			{state.kind === "error" ? (
				<span className="attachment-error" role="alert">
					{state.message}
				</span>
			) : null}
		</span>
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
	onSend: (text: string, attachments: chat_Attachment[]) => void;
};

function Composer(props: Composer_Props) {
	const hintId = useId();
	const [text, setText] = useState("");
	const [attachments, setAttachments] = useState<chat_Attachment[]>([]);
	const [pickerOpen, setPickerOpen] = useState(false);

	const handle_send = () => {
		// One send at a time: the a11y contract disables sending while one is in flight.
		if (props.busy) {
			return;
		}
		const trimmed = text.trim();
		if (trimmed === "" && attachments.length === 0) {
			return;
		}
		props.onSend(trimmed, attachments);
		setText("");
		setAttachments([]);
	};

	const handle_key_down = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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
			<textarea
				className="composer-input"
				aria-label={props.label}
				aria-describedby={hintId}
				rows={2}
				value={text}
				onInput={(event) => setText(event.currentTarget.value)}
				onKeyDown={handle_key_down}
			/>
			<div className="composer-row">
				<span id={hintId} className="composer-hint">
					Enter sends · Shift+Enter for a new line
				</span>
				<button type="button" className="button" onClick={() => setPickerOpen(true)}>
					Attach file
				</button>
				<button type="button" className="button button-primary" disabled={props.busy} onClick={handle_send}>
					{props.busy ? "Sending…" : "Send"}
				</button>
			</div>
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

type MessageRow_Props = {
	client: BonoboUiFrontendClient;
	collection: "messages" | "replies";
	doc: chat_Doc<chat_MessageValue>;
	isOwn: boolean;
	authorName: string | null | undefined;
	reactionGroups: chat_ReactionGroup[];
	/**
	 * null = this row offers no thread affordance (rows inside a thread panel).
	 * "unknown" = the replies window does not reach this root yet, so no count is claimed.
	 */
	replyCount: number | "unknown" | null;
	/** True while the replies window says more replies exist below it — gates the "99+" cap. */
	repliesHasMore: boolean;
	onOpenThread: ((doc: chat_Doc<chat_MessageValue>) => void) | null;
	replyTriggerRef: ((el: HTMLButtonElement | null) => void) | null;
	onApplyLocal: (doc: chat_Doc<chat_MessageValue>) => void;
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
			.put({ collection, key: doc.key, value })
			.then((result) => {
				setBusy(false);
				if ("_nay" in result) {
					setRowError(result._nay.message);
					return;
				}
				props.onApplyLocal({ ...doc, value, revision: doc.revision + 1, updatedAt: Date.now() });
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
		const request = currentlyPressed
			? client.data.removeOwned({ collection: "reactions", key: chat_reaction_caller_key(doc.key, token) })
			: client.data.putOwned({ collection: "reactions", key: chat_reaction_caller_key(doc.key, token), value: {} });
		request
			.then((result) => {
				if ("_nay" in result) {
					setRowError(result._nay.message);
				}
			})
			.catch((error: unknown) => {
				setRowError(chat_get_error_message(error));
			});
	};

	const isDeleted = doc.value.deletedAt !== null;

	return (
		<li className="message" data-key={doc.key}>
			<div className="message-head">
				<span className="message-author">
					{props.authorName === null ? "Former member" : (props.authorName ?? "…")}
				</span>
				<time className="message-time">{new Date(doc.timestamp).toLocaleString()}</time>
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
						{doc.value.text}
						{doc.value.editedAt !== null ? <span className="message-edited"> (edited)</span> : null}
					</p>
					{doc.value.attachments.length > 0 ? (
						<div className="message-attachments">
							{doc.value.attachments.map((attachment) => (
								<AttachmentLink key={attachment.fileNodeId} client={client} attachment={attachment} />
							))}
						</div>
					) : null}
					{props.reactionGroups.length > 0 ? (
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
				</>
			)}
			{!isDeleted && !editing ? (
				<div className="message-actions">
					{props.onOpenThread !== null && props.replyCount !== null ? (
						<button
							ref={props.replyTriggerRef ?? undefined}
							type="button"
							className="button message-action"
							onClick={() => props.onOpenThread?.(doc)}
						>
							{props.replyCount === "unknown"
								? "View thread"
								: props.replyCount === 0
									? "Reply in thread"
									: `${chat_format_reply_count(props.replyCount, props.repliesHasMore)} ${
											props.replyCount === 1 ? "reply" : "replies"
										}`}
						</button>
					) : null}
					<AddReactionButton groups={props.reactionGroups} onPick={handle_toggle_reaction} />
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
		<li className={props.pending.status === "failed" ? "message is-pending is-failed" : "message is-pending"}>
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

type ThreadPanel_Props = {
	client: BonoboUiFrontendClient;
	userId: string;
	root: chat_Doc<chat_MessageValue>;
	reactionGroupsByTarget: Map<string, chat_ReactionGroup[]>;
	memberNames: chat_MemberNamesApi;
	onApplyLocalRoot: (doc: chat_Doc<chat_MessageValue>) => void;
	onClose: () => void;
};

export function ThreadPanel(props: ThreadPanel_Props) {
	const { client, userId, root, memberNames } = props;
	const [replies, setReplies] = useState<chat_Doc<chat_MessageValue>[]>([]);
	const [repliesLoaded, setRepliesLoaded] = useState(false);
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
			(docs) => {
				if (docs === null) {
					return;
				}
				store.apply_window(docs);
				setReplies(store.get_sorted());
				setRepliesLoaded(true);
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
	});

	// Resolve author names for the replies in view.
	useEffect(() => {
		const ids = [...new Set(replies.map((doc) => doc.createdBy))];
		if (ids.length > 0) {
			void memberNames.resolve(ids);
		}
	}, [replies, memberNames]);

	const handle_key_down = (event: KeyboardEvent<HTMLElement>) => {
		if (event.key === "Escape") {
			event.stopPropagation();
			props.onClose();
		}
	};

	return (
		<section className="thread" aria-label="Thread" onKeyDown={handle_key_down}>
			<div className="thread-head">
				<h3 className="thread-title">Thread</h3>
				<button ref={closeButtonRef} type="button" className="button" onClick={props.onClose}>
					Close thread
				</button>
			</div>
			<ul className="message-list thread-root">
				<MessageRow
					client={client}
					collection="messages"
					doc={root}
					isOwn={root.createdBy === userId}
					authorName={memberNames.get(root.createdBy)}
					reactionGroups={props.reactionGroupsByTarget.get(root.key) ?? []}
					replyCount={null}
					repliesHasMore={false}
					onOpenThread={null}
					replyTriggerRef={null}
					onApplyLocal={props.onApplyLocalRoot}
				/>
			</ul>
			{!repliesLoaded ? (
				<div className="channel-status" role="status">
					Loading replies…
				</div>
			) : replies.length === 0 && queue.pending.length === 0 ? (
				<div className="channel-status">No replies yet</div>
			) : (
				<ul className="message-list thread-replies">
					{[...replies].reverse().map((doc) => (
						<MessageRow
							key={doc.key}
							client={client}
							collection="replies"
							doc={doc}
							isOwn={doc.createdBy === userId}
							authorName={memberNames.get(doc.createdBy)}
							reactionGroups={props.reactionGroupsByTarget.get(doc.key) ?? []}
							replyCount={null}
							repliesHasMore={false}
							onOpenThread={null}
							replyTriggerRef={null}
							onApplyLocal={(updated) => {
								storeRef.current?.apply_local(updated);
								setReplies(storeRef.current?.get_sorted() ?? []);
							}}
						/>
					))}
					{queue.pending.map((pending) => (
						<PendingRow key={pending.clientRequestId} pending={pending} onRetry={() => queue.retry(pending)} />
					))}
				</ul>
			)}
			<Composer client={client} label="Reply in thread" busy={queue.busy} onSend={queue.send} />
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
};

/** The loadOlder/unsubscribe handle `client.data.watchWindow` returns. */
type WindowHandle = ReturnType<BonoboUiFrontendClient["data"]["watchWindow"]>;

/** What the catch-up loop needs to know about a companion window's coverage. */
type CompanionCoverage = {
	hasMore: boolean;
	atCapacity: boolean;
	/** Root message key (first 55 chars) of the deepest validated doc, or null when empty. */
	deepestRoot: string | null;
};

/**
 * Message and reply keys are `<channel uuid (36)>:<inverted ms (13)>:<rand (4)>...`, so the
 * first 55 characters of any chitchat-minted key name its root message. Companion keys
 * (reactions, replies) extend a root key, so the same slice normalizes them all.
 */
const ROOT_KEY_LENGTH = 55;

/**
 * One open channel: message log, reactive document windows, composer, and thread panel.
 * The parent keys this component by channel key, so every mount owns exactly one channel.
 */
export function ChannelView(props: ChannelView_Props) {
	const { client, userId, channel, memberNames, announce } = props;
	const [messages, setMessages] = useState<chat_Doc<chat_MessageValue>[]>([]);
	const [messagesLoaded, setMessagesLoaded] = useState(false);
	const [messagesDead, setMessagesDead] = useState(false);
	const [messagesWindow, setMessagesWindow] = useState({ hasMore: false, atCapacity: false, incomplete: false });
	const [reactionDocs, setReactionDocs] = useState<chat_ReactionDoc[]>([]);
	const [channelReplies, setChannelReplies] = useState<chat_Doc<chat_MessageValue>[]>([]);
	const [replyCoverage, setReplyCoverage] = useState<{ hasMore: boolean; deepestRoot: string | null }>({
		hasMore: false,
		deepestRoot: null,
	});
	const [threadRootKey, setThreadRootKey] = useState<string | null>(null);
	const messagesStoreRef = useRef<chat_AccumulatingStore<chat_MessageValue> | null>(null);
	const messagesWindowRef = useRef<WindowHandle | null>(null);
	const reactionsWindowRef = useRef<WindowHandle | null>(null);
	const repliesWindowRef = useRef<WindowHandle | null>(null);
	const reactionsCoverageRef = useRef<CompanionCoverage | null>(null);
	const repliesCoverageRef = useRef<CompanionCoverage | null>(null);
	const oldestRootRef = useRef<string | null>(null);
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
			(update) => {
				if (update === null) {
					setMessagesDead(true);
					return;
				}
				const windowDocs = store.apply_window(update.docs);
				const sorted = store.get_sorted();
				setMessages(sorted);
				setMessagesLoaded(true);
				setMessagesWindow({ hasMore: update.hasMore, atCapacity: update.atCapacity, incomplete: update.incomplete });
				oldestRootRef.current =
					sorted.length > 0 ? sorted[sorted.length - 1].key.slice(0, ROOT_KEY_LENGTH) : null;
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
			(update) => {
				if (update === null) {
					reactionsCoverageRef.current = null;
					return;
				}
				const validated = store.apply_window(update.docs);
				setReactionDocs(validated);
				reactionsCoverageRef.current = {
					hasMore: update.hasMore,
					atCapacity: update.atCapacity,
					deepestRoot:
						validated.length > 0 ? validated[validated.length - 1].key.slice(0, ROOT_KEY_LENGTH) : null,
				};
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
			(update) => {
				if (update === null) {
					repliesCoverageRef.current = null;
					return;
				}
				const validated = store.apply_window(update.docs);
				setChannelReplies(validated);
				const deepestRoot =
					validated.length > 0 ? validated[validated.length - 1].key.slice(0, ROOT_KEY_LENGTH) : null;
				repliesCoverageRef.current = { hasMore: update.hasMore, atCapacity: update.atCapacity, deepestRoot };
				setReplyCoverage({ hasMore: update.hasMore, deepestRoot });
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

	const queue = use_send_queue({
		client,
		collection: "messages",
		keyPrefix: chat_message_key_prefix(channel.key),
		userId,
		onDelivered: (doc) => {
			messagesStoreRef.current?.apply_local(doc);
			seenKeysRef.current?.add(doc.key);
			setMessages(messagesStoreRef.current?.get_sorted() ?? []);
		},
	});

	// Resolve author names for everything in view.
	useEffect(() => {
		const ids = new Set<string>();
		for (const doc of messages) {
			ids.add(doc.createdBy);
		}
		for (const doc of channelReplies) {
			ids.add(doc.createdBy);
		}
		if (ids.size > 0) {
			void memberNames.resolve([...ids]);
		}
	}, [messages, channelReplies, memberNames]);

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

	// The host window retains everything it loaded, so "load older" is one bridge command;
	// the extended window arrives as a normal update.
	const handle_load_older = () => {
		messagesWindowRef.current?.loadOlder();
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

	if (messagesDead) {
		return (
			<div className="channel">
				<div className="channel-dead" role="alert">
					Access to messages in #{channel.value.name} ended. Your permissions may have changed — reload the page to try
					again.
				</div>
			</div>
		);
	}

	return (
		<div className="channel">
			<header className="channel-head">
				<h2 className="channel-title">#{channel.value.name}</h2>
				{channel.value.archivedAt !== null ? <span className="channel-archived-badge">Archived</span> : null}
			</header>
			<div className="channel-body">
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
					{messagesLoaded && messagesWindow.hasMore && messagesWindow.atCapacity ? (
						<div className="channel-status">Older messages can't be loaded right now.</div>
					) : null}
					{messagesWindow.incomplete ? (
						<div className="channel-status" role="alert">
							Some messages in this range could not be loaded.
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
							{[...messages].reverse().map((doc) => (
								<MessageRow
									key={doc.key}
									client={client}
									collection="messages"
									doc={doc}
									isOwn={doc.createdBy === userId}
									authorName={memberNames.get(doc.createdBy)}
									reactionGroups={reactionGroupsByTarget.get(doc.key) ?? []}
									// A count is claimed only for roots the replies window covers: every
									// root while nothing more exists below, else only roots strictly newer
									// than the deepest covered root (that one may still have replies below
									// the window).
									replyCount={
										!replyCoverage.hasMore ||
										(replyCoverage.deepestRoot !== null &&
											doc.key.slice(0, ROOT_KEY_LENGTH) < replyCoverage.deepestRoot)
											? (replyCounts.get(doc.key) ?? 0)
											: "unknown"
									}
									repliesHasMore={replyCoverage.hasMore}
									onOpenThread={(root) => setThreadRootKey(root.key)}
									replyTriggerRef={(el) => {
										if (el === null) {
											replyTriggersRef.current.delete(doc.key);
										} else {
											replyTriggersRef.current.set(doc.key, el);
										}
									}}
									onApplyLocal={apply_local_message}
								/>
							))}
							{queue.pending.map((pending) => (
								<PendingRow key={pending.clientRequestId} pending={pending} onRetry={() => queue.retry(pending)} />
							))}
						</ul>
					)}
				</div>
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
						onApplyLocalRoot={apply_local_message}
						onClose={handle_close_thread}
					/>
				) : null}
			</div>
			<Composer client={client} label={`Message #${channel.value.name}`} busy={queue.busy} onSend={queue.send} />
		</div>
	);
}

// #endregion channel view
