import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import type { BonoboHttpApi } from "bonobo-plugin-sdk/http-api";
import { useAction, useMutation, useQuery } from "convex/react";
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
// The subpath keeps the plugin below its published bundle limit.
import * as Ariakit from "@ariakit/react/combobox";
import { api } from "../convex/_generated/api";
import type { Doc, Id } from "../convex/_generated/dataModel";
import { chat_validate_message, type chat_WriteResult } from "../shared/chat";
import {
	chat_filter_mention_members,
	chat_format_recency,
	chat_get_error_message,
	chat_insert_mention,
	chat_mention_ids_still_in_text,
	chat_mention_query_at,
	chat_PRIVATE_CHANNEL_DISCLOSURE,
	chat_REACTION_EMOJI,
	chat_REACTION_LABELS,
	chat_REACTION_TOKENS,
	type chat_ReactionToken,
} from "../shared/chat-display";
import { use_chat_draft, type chat_PendingSend } from "./chat-drafts";
import { use_chat_window } from "./chat-window";
import { use_chat_session } from "./session";
import { Dialog } from "./dialog";
import { chatbe_bounded_author_name } from "../shared/transcript-markdown";

export type chat_MemberNamesApi = {
	get: (userId: string) => string | null | undefined;
	resolve: (userIds: string[], authorIds?: string[]) => Promise<void>;
};
type Attachment = Doc<"messages">["attachments"][number];
type DraftOwner = ReturnType<typeof use_chat_draft>;

function use_send_queue(props: {
	client: BonoboClient;
	channelId: Id<"channels">;
	rootMessageId: Id<"messages"> | null;
	draft: DraftOwner;
	canWrite: boolean;
	onRequestStart: () => void;
	onRequestSettled: () => void;
}) {
	const session = use_chat_session();
	const send = useMutation(api.messages.send);
	const reply = useMutation(api.messages.reply);
	const authorize = useAction(api.files.authorize_selection);
	const active = useRef(new Set<string>());
	const settled = useRef(props.onRequestSettled);
	settled.current = props.onRequestSettled;
	const [error, setError] = useState<string | null>(null);
	const run = async (entry: chat_PendingSend) => {
		if (active.current.has(entry.clientRequestId)) return;
		if (!session.ready || !session.can_request_now()) {
			props.draft.set({
				...props.draft.get(),
				pending: props.draft
					.get()
					.pending.map((item) =>
						item.clientRequestId === entry.clientRequestId
							? { ...item, status: "failed", error: "Chitchat is reconnecting. Retry when it is ready." }
							: item,
					),
			});
			return;
		}
		active.current.add(entry.clientRequestId);
		props.onRequestStart();
		props.draft.set({
			...props.draft.get(),
			pending: props.draft
				.get()
				.pending.map((item) =>
					item.clientRequestId === entry.clientRequestId ? { ...item, status: "sending", error: null } : item,
				),
		});
		const input = {
			clientRequestId: entry.clientRequestId,
			text: entry.text,
			attachments: entry.attachments,
			mentions: entry.mentions,
		};
		const submit = () =>
			props.rootMessageId
				? reply({ ...input, rootMessageId: props.rootMessageId })
				: send({ ...input, channelId: props.channelId });
		try {
			// Read a saved receipt before checking files again. A confirmed send stays confirmable after a file is removed.
			let result = await submit();
			if (result._nay?.message === "Check attachment access again before sending.") {
				const proof = await authorize({
					pressToken: await props.client.getToken(),
					fileNodeIds: entry.attachments.map((file) => file.fileNodeId),
				});
				if (proof._nay) throw new Error(proof._nay.message);
				if (
					entry.attachments.some(
						(file) =>
							!proof._yay.some((verified) => verified.fileNodeId === file.fileNodeId && verified.name === file.name),
					)
				)
					throw new Error("An attachment was renamed. Remove this pending send and select the file again.");
				if (!session.can_request_now()) throw new Error("Chitchat is reconnecting. Retry when it is ready.");
				result = await submit();
			}
			if (result._nay) throw new Error(result._nay.message);
			props.draft.set({
				...props.draft.get(),
				pending: props.draft.get().pending.filter((item) => item.clientRequestId !== entry.clientRequestId),
			});
		} catch (cause) {
			props.draft.set({
				...props.draft.get(),
				pending: props.draft
					.get()
					.pending.map((item) =>
						item.clientRequestId === entry.clientRequestId
							? { ...item, status: "failed", error: chat_get_error_message(cause) }
							: item,
					),
			});
		} finally {
			active.current.delete(entry.clientRequestId);
			settled.current();
		}
	};
	const enqueue = (text: string, attachments: Attachment[], mentions: string[]) => {
		if (!props.canWrite || !session.canSend || !session.can_request_now()) {
			setError("Chitchat is reconnecting or read-only. Your draft is kept.");
			return false;
		}
		const invalid = chat_validate_message({
			text,
			attachments,
			mentions,
			authorName: chatbe_bounded_author_name(session.member?.displayName ?? null),
		});
		if (invalid) {
			setError(invalid);
			return false;
		}
		const entry: chat_PendingSend = {
			clientRequestId: crypto.randomUUID(),
			text,
			attachments,
			mentions,
			status: "sending",
			error: null,
		};
		const refusal = props.draft.set({
			...props.draft.get(),
			text: "",
			attachments: [],
			mentions: [],
			pending: [...props.draft.get().pending, entry],
		});
		if (refusal) {
			setError(refusal);
			return false;
		}
		setError(null);
		void run(entry);
		return true;
	};
	return {
		enqueue,
		retry: (entry: chat_PendingSend) => void run(entry),
		error,
		busy: props.draft.value.pending.some((entry) => entry.status === "sending"),
	};
}

function MessageAttachments(props: { client: BonoboClient; attachments: Attachment[] }) {
	const [resolved, setResolved] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const links = useRef(new Map<string, HTMLAnchorElement>());
	const focusFile = useRef<string | null>(null);
	useEffect(() => {
		if (focusFile.current) {
			links.current.get(focusFile.current)?.focus();
			focusFile.current = null;
		}
	}, [resolved]);
	const resolve = async (fileNodeId: string) => {
		setLoading(true);
		setError(null);
		focusFile.current = fileNodeId;
		try {
			const answer = await props.client.fetchJson("/api/v1/files/download-urls", {
				fileNodeIds: props.attachments.map((file) => file.fileNodeId),
			});
			if (answer.status !== 200 || !answer.body)
				throw new Error(answer.body?.message ?? "The file links are unavailable.");
			setResolved(Object.fromEntries(answer.body.items.map((file) => [file.fileNodeId, file.url])));
			const failure = answer.body.errors.find((file) => file.fileNodeId === fileNodeId);
			if (failure) setError(failure.message);
		} catch (cause) {
			setError(chat_get_error_message(cause));
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="message-attachments">
			{props.attachments.map((file) => (
				<span key={file.fileNodeId} className="attachment">
					{resolved[file.fileNodeId] ? (
						<>
							<a
								ref={(element) => {
									if (element) links.current.set(file.fileNodeId, element);
									else links.current.delete(file.fileNodeId);
								}}
								className="attachment-link"
								href={resolved[file.fileNodeId]}
								target="_blank"
								rel="noopener noreferrer"
							>
								{file.name}
							</a>
							<button
								type="button"
								className="attachment-button"
								disabled={loading}
								onClick={() => void resolve(file.fileNodeId)}
							>
								Refresh link
							</button>
						</>
					) : (
						<button
							type="button"
							className="attachment-button"
							disabled={loading}
							onClick={() => void resolve(file.fileNodeId)}
						>
							{loading ? `Getting link for ${file.name}…` : file.name}
						</button>
					)}
				</span>
			))}
			{error ? (
				<span className="attachment-error" role="alert">
					{error}
				</span>
			) : null}
		</div>
	);
}

type FilesListItem = BonoboHttpApi["/api/v1/files/list"]["POST"]["response"][200]["body"]["items"][number];
function AttachmentPickerDialog(props: {
	client: BonoboClient;
	onPick: (attachment: Attachment) => void;
	onClose: () => void;
}) {
	const titleId = useId();
	const [items, setItems] = useState<FilesListItem[]>([]);
	const [cursor, setCursor] = useState<string | null>(null);
	const [next, setNext] = useState<string | null>(null);
	const [done, setDone] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [attempt, setAttempt] = useState(0);
	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setError(null);
		setItems([]);
		void props.client
			.fetchJson("/api/v1/files/list", {
				path: "/",
				recursive: true,
				kind: "file",
				limit: 100,
				scanLimit: 10_000,
				contentTypePrefixes: ["image/", "video/", "audio/", "application/", "text/"],
				cursor,
			})
			.then((answer) => {
				if (cancelled) return;
				if (answer.status !== 200) {
					setError(answer.body?.message ?? "Files could not be loaded.");
					return;
				}
				if (!answer.body) {
					setError("Files could not be loaded.");
					return;
				}
				setItems(answer.body.items);
				setNext(answer.body.cursor);
				setDone(answer.body.isDone);
			})
			.catch((cause) => {
				if (!cancelled) setError(chat_get_error_message(cause));
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, [props.client, cursor, attempt]);
	return (
		<Dialog labelledBy={titleId} onClose={props.onClose}>
			<h2 id={titleId} className="dialog-title">
				Attach a file
			</h2>
			<button type="button" className="button" data-dialog-initial onClick={props.onClose}>
				Cancel
			</button>
			<ul className="picker-list">
				{items.map((file) => (
					<li key={file.nodeId}>
						<button
							type="button"
							className="picker-item"
							onClick={() => props.onPick({ fileNodeId: file.nodeId, name: file.name })}
						>
							<span className="picker-item-name">{file.name}</span>
							<span className="picker-item-path">{file.path}</span>
						</button>
					</li>
				))}
			</ul>
			{loading ? <p role="status">Loading files…</p> : null}
			{error ? (
				<p role="alert">
					{error}{" "}
					<button type="button" onClick={() => setAttempt(attempt + 1)}>
						Retry
					</button>
				</p>
			) : null}
			{!loading && !error && items.length === 0 ? (
				<p>{done ? "No files found." : "No matching files on this page."}</p>
			) : null}
			{cursor !== null ? (
				<button type="button" className="button" disabled={loading} onClick={() => setCursor(null)}>
					First page
				</button>
			) : null}
			{!done ? (
				<button type="button" className="button" disabled={loading || !!error} onClick={() => setCursor(next)}>
					Next files
				</button>
			) : null}
		</Dialog>
	);
}

function Composer(props: {
	client: BonoboClient;
	userId: string;
	draft: DraftOwner;
	label: string;
	busy: boolean;
	disabled: boolean;
	inert?: boolean;
	onSend: (text: string, attachments: Attachment[], mentions: string[]) => boolean;
}) {
	const hintId = useId();
	const menuId = useId();
	const session = use_chat_session();
	const [pickerOpen, setPickerOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [mentionQuery, setMentionQuery] = useState<{ start: number; query: string } | null>(null);
	const [memberCursor, setMemberCursor] = useState<string | null>(null);
	const members = useQuery(
		api.members.list,
		mentionQuery !== null && session.ready ? { paginationOpts: { numItems: 100, cursor: memberCursor } } : "skip",
	);
	const text = props.draft.value.text;
	const textarea = useRef<HTMLTextAreaElement | null>(null);
	const caret = useRef<number | null>(null);
	const combobox = Ariakit.useComboboxStore({
		placement: "top-start",
		resetValueOnHide: false,
		setOpen: (open) => {
			if (!open) setMentionQuery(null);
		},
	});
	const candidates =
		mentionQuery && members
			? chat_filter_mention_members(members.page, mentionQuery.query, props.userId).slice(0, 8)
			: [];
	const open = mentionQuery !== null && session.ready;
	const change = (value: Partial<DraftOwner["value"]>) => setError(props.draft.set({ ...props.draft.get(), ...value }));
	const pick = (member: { userId: string; label: string }) => {
		if (!mentionQuery) return;
		const inserted = chat_insert_mention(
			text,
			mentionQuery.start,
			textarea.current?.selectionStart ?? text.length,
			member.label,
		);
		const mentions = new Map(props.draft.value.mentions);
		mentions.set(member.userId, member.label);
		change({ text: inserted.text, mentions: [...mentions] });
		caret.current = inserted.caret;
		combobox.hide();
	};
	const send = () => {
		if (props.busy || props.disabled) return;
		const trimmed = text.trim();
		if (!trimmed && props.draft.value.attachments.length === 0) return;
		if (
			props.onSend(
				trimmed,
				props.draft.value.attachments,
				chat_mention_ids_still_in_text(props.draft.value.mentions, trimmed),
			)
		)
			combobox.hide();
	};
	const keyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.nativeEvent.isComposing || event.keyCode === 229) return;
		if (open) {
			if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
				combobox.hide();
				return;
			}
			if (event.key === "Escape") {
				event.preventDefault();
				event.stopPropagation();
				combobox.hide();
				return;
			}
			if ((event.key === "Enter" || event.key === "Tab") && !event.shiftKey && candidates.length) {
				event.preventDefault();
				pick(
					candidates.find((member) => `${menuId}-${member.userId}` === combobox.getState().activeId) ?? candidates[0],
				);
				return;
			}
		}
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			send();
		}
	};
	useLayoutEffect(() => {
		combobox.setOpen(open);
	}, [combobox, open]);
	useLayoutEffect(() => {
		if (caret.current !== null && textarea.current) {
			textarea.current.focus();
			textarea.current.setSelectionRange(caret.current, caret.current);
			caret.current = null;
		}
	}, [text]);
	return (
		<div className="composer" inert={props.inert || undefined}>
			{props.draft.value.attachments.length ? (
				<ul className="composer-attachments">
					{props.draft.value.attachments.map((file) => (
						<li key={file.fileNodeId} className="composer-attachment">
							<span>{file.name}</span>
							<button
								type="button"
								className="composer-attachment-remove"
								aria-label={`Remove attachment ${file.name}`}
								onClick={() =>
									change({
										attachments: props.draft.value.attachments.filter((item) => item.fileNodeId !== file.fileNodeId),
									})
								}
							>
								×
							</button>
						</li>
					))}
				</ul>
			) : null}
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
							ref={textarea}
							className="composer-input"
							aria-label={props.label}
							aria-describedby={hintId}
							placeholder={props.label}
							rows={1}
							onChange={(event) => {
								const value = event.currentTarget.value;
								change({ text: value });
								const query = chat_mention_query_at(value, event.currentTarget.selectionStart);
								setMentionQuery(query);
								combobox.setValue(query?.query ?? "");
							}}
							onKeyDown={keyDown}
							onPointerDown={combobox.hide}
							onScroll={combobox.render}
						/>
					}
				/>
				<button
					type="button"
					className="composer-action"
					aria-label="Attach file"
					disabled={props.disabled || props.draft.value.attachments.length >= 20}
					onClick={() => setPickerOpen(true)}
				>
					<Paperclip size={18} aria-hidden="true" />
				</button>
				<button
					type="button"
					className="composer-action composer-send"
					aria-label={props.busy ? "Sending…" : "Send"}
					disabled={props.busy || props.disabled}
					onClick={send}
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
				hidden={!open}
				getAnchorRect={() => textarea.current?.getBoundingClientRect() ?? null}
				className="mention-menu"
				aria-label="Mention somebody"
			>
				{!members ? <div role="status">Loading people…</div> : null}
				{members && candidates.length === 0 ? <div role="status">No match on this page.</div> : null}
				{candidates.map((member) => (
					<Ariakit.ComboboxItem
						key={member.userId}
						id={`${menuId}-${member.userId}`}
						value={member.label}
						setValueOnClick={false}
						focusOnHover
						className="mention-option"
						onMouseDown={(event) => event.preventDefault()}
						onClick={() => pick(member)}
					>
						{member.label}
					</Ariakit.ComboboxItem>
				))}
				{memberCursor !== null ? (
					<button type="button" onClick={() => setMemberCursor(null)}>
						First people
					</button>
				) : null}
				{members && !members.isDone ? (
					<button type="button" onClick={() => setMemberCursor(members.continueCursor)}>
						Next people
					</button>
				) : null}
			</Ariakit.ComboboxPopover>
			<span id={hintId} className="composer-hint">
				Enter sends · Shift+Enter for a new line
			</span>
			{error ? (
				<p className="form-error" role="alert">
					{error}
				</p>
			) : null}
			{pickerOpen ? (
				<AttachmentPickerDialog
					client={props.client}
					onClose={() => setPickerOpen(false)}
					onPick={(file) => {
						if (!props.draft.value.attachments.some((item) => item.fileNodeId === file.fileNodeId))
							change({ attachments: [...props.draft.value.attachments, file] });
						setPickerOpen(false);
					}}
				/>
			) : null}
		</div>
	);
}

function AddReactionButton(props: {
	groups: { token: chat_ReactionToken; reactedByMe: boolean }[];
	disabled: boolean;
	onPick: (token: chat_ReactionToken, pressed: boolean) => void;
}) {
	const [open, setOpen] = useState(false);
	const trigger = useRef<HTMLButtonElement | null>(null);
	const items = useRef<(HTMLButtonElement | null)[]>([]);
	useEffect(() => {
		if (open) items.current[0]?.focus();
	}, [open]);
	const close = () => {
		setOpen(false);
		trigger.current?.focus();
	};
	return (
		<span className="add-reaction">
			<button
				ref={trigger}
				type="button"
				className="button message-action"
				disabled={props.disabled}
				aria-expanded={open}
				onClick={() => (open ? close() : setOpen(true))}
			>
				Add reaction
			</button>
			{open ? (
				<span className="reaction-palette" role="group" aria-label="Choose a reaction">
					{chat_REACTION_TOKENS.map((token, index) => {
						const pressed = props.groups.some((group) => group.token === token && group.reactedByMe);
						return (
							<button
								key={token}
								ref={(element) => {
									items.current[index] = element;
								}}
								type="button"
								className="reaction-palette-item"
								aria-pressed={pressed}
								aria-label={chat_REACTION_LABELS[token]}
								onKeyDown={(event) => {
									if (event.key === "Escape") {
										event.preventDefault();
										event.stopPropagation();
										close();
									} else if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) {
										event.preventDefault();
										items.current[(index + (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : 7)) % 8]?.focus();
									}
								}}
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

const DAY_MS = 86_400_000;
function absolute_date(timestamp: number) {
	return new Date(timestamp).toLocaleDateString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
function day_label(timestamp: number) {
	const day = new Date(timestamp).toDateString();
	return day === new Date().toDateString()
		? "Today"
		: day === new Date(Date.now() - DAY_MS).toDateString()
			? "Yesterday"
			: absolute_date(timestamp);
}
function initials(name: string | null | undefined) {
	const words = name?.trim().split(/\s+/u);
	return words?.[0] ? `${words[0][0]}${words.length > 1 ? words.at(-1)![0] : ""}`.toUpperCase() : "•";
}
function render_message_text(doc: Doc<"messages">, memberNames: chat_MemberNamesApi, selfUserId: string) {
	const names = doc.mentions
		.map((id) => ({ id, name: memberNames.get(id) }))
		.filter((item): item is { id: string; name: string } => typeof item.name === "string" && item.name !== "")
		.sort((a, b) => b.name.length - a.name.length);
	const parts: (string | { id: string; name: string })[] = [];
	let rest = doc.text;
	while (rest) {
		const found = names
			.map((item) => ({ ...item, at: rest.indexOf(`@${item.name}`) }))
			.filter((item) => item.at >= 0)
			.sort((a, b) => a.at - b.at)[0];
		if (!found) {
			parts.push(rest);
			break;
		}
		if (found.at) parts.push(rest.slice(0, found.at));
		parts.push(found);
		rest = rest.slice(found.at + found.name.length + 1);
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

type RowProps = {
	client: BonoboClient;
	doc: Doc<"messages">;
	userId: string;
	memberNames: chat_MemberNamesApi;
	canWrite: boolean;
	isContinuation: boolean;
	onOpenThread?: (id: Id<"messages">) => void;
	threadDisabled?: boolean;
	onRequestStart: () => void;
	onRequestSettled: () => void;
	replyTriggerRef?: (element: HTMLButtonElement | null) => void;
};
export function MessageRow(props: RowProps) {
	const { doc } = props;
	const session = use_chat_session();
	const reactions = useQuery(api.reactions.get_for_message, session.ready ? { messageId: doc._id } : "skip");
	const summary = useQuery(
		api.threads.get_summary,
		props.onOpenThread && session.ready ? { rootMessageId: doc._id } : "skip",
	);
	const edit = useMutation(api.messages.edit);
	const remove = useMutation(api.messages.remove);
	const react = useMutation(api.reactions.set);
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState("");
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [uncertain, setUncertain] = useState(false);
	const operation = useRef<(() => Promise<chat_WriteResult>) | null>(null);
	const editor = useRef<HTMLTextAreaElement | null>(null);
	const row = useRef<HTMLLIElement | null>(null);
	const editButton = useRef<HTMLButtonElement | null>(null);
	const titleId = useId();
	const deleted = doc.deletedAt !== null;
	const canWrite = props.canWrite && session.canSend;
	useEffect(() => {
		if (editing) editor.current?.focus();
	}, [editing]);
	useEffect(() => {
		if (deleted) {
			const focused = row.current?.contains(document.activeElement);
			setEditing(false);
			setConfirmDelete(false);
			if (focused) row.current?.focus();
		}
	}, [deleted]);
	const run = async () => {
		if (busy || !operation.current || !session.can_request_now()) return;
		setBusy(true);
		setError(null);
		props.onRequestStart();
		try {
			const result = await operation.current();
			if (result._nay) {
				setError(result._nay.message);
				operation.current = null;
				setUncertain(false);
				return;
			}
			operation.current = null;
			setUncertain(false);
			setEditing(false);
			setConfirmDelete(false);
			queueMicrotask(() => (deleted ? row.current : editButton.current)?.focus());
		} catch (cause) {
			setError(chat_get_error_message(cause));
			setUncertain(true);
		} finally {
			setBusy(false);
			props.onRequestSettled();
		}
	};
	const save = () => {
		if (!canWrite && !operation.current) return;
		if (!operation.current) {
			const mentions = doc.mentions.filter((id) => {
				const name = props.memberNames.get(id);
				return !!name && text.includes(`@${name}`);
			});
			const invalid = chat_validate_message({ ...doc, text: text.trim(), mentions });
			if (invalid) {
				setError(invalid);
				return;
			}
			const args = {
				messageId: doc._id,
				clientRequestId: crypto.randomUUID(),
				expectedRevision: doc.revision,
				text: text.trim(),
				mentions,
			};
			operation.current = () => edit(args);
		}
		void run();
	};
	const deleteMessage = () => {
		if (!canWrite && !operation.current) return;
		if (!operation.current) {
			const args = { messageId: doc._id, clientRequestId: crypto.randomUUID(), expectedRevision: doc.revision };
			operation.current = () => remove(args);
		}
		void run();
	};
	const toggle = (token: chat_ReactionToken, on: boolean) => {
		if (!canWrite || busy || operation.current || !session.can_request_now()) return;
		const args = { messageId: doc._id, clientRequestId: crypto.randomUUID(), token, on: !on };
		operation.current = () => react(args);
		void run();
	};
	const cancel = () => {
		if (!busy) {
			operation.current = null;
			setUncertain(false);
			setEditing(false);
			setConfirmDelete(false);
			setError(null);
			queueMicrotask(() => editButton.current?.focus());
		}
	};
	const name = props.memberNames.get(doc.authorHostUserId);
	const recent = Date.now() - doc.createdAt < 7 * DAY_MS;
	return (
		<li
			ref={row}
			className={props.isContinuation ? "message is-continuation" : "message is-leader"}
			data-key={doc._id}
			tabIndex={-1}
		>
			<span className="message-avatar" aria-hidden="true">
				{initials(name)}
			</span>
			<div className={props.isContinuation ? "message-head visually-hidden" : "message-head"}>
				<span className="message-author">{name === null ? "Former member" : (name ?? "…")}</span>
				<time className="message-time" dateTime={new Date(doc.createdAt).toISOString()}>
					{recent ? <span className="visually-hidden">{absolute_date(doc.createdAt)} </span> : null}
					<span className="message-clock">
						{recent
							? new Date(doc.createdAt).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
							: absolute_date(doc.createdAt)}
					</span>
				</time>
			</div>
			{deleted ? (
				<p className="message-text is-deleted">Message deleted</p>
			) : editing ? (
				<div className="message-edit">
					<textarea
						ref={editor}
						className="composer-input"
						aria-label="Edit message"
						value={text}
						readOnly={busy || uncertain}
						onChange={(event) => setText(event.currentTarget.value)}
						onKeyDown={(event) => {
							if (event.nativeEvent.isComposing || event.keyCode === 229) return;
							if (event.key === "Escape") {
								event.preventDefault();
								event.stopPropagation();
								cancel();
							} else if (event.key === "Enter" && !event.shiftKey) {
								event.preventDefault();
								save();
							}
						}}
					/>
					<div className="message-edit-actions">
						<button type="button" className="button" disabled={busy} onClick={cancel}>
							Cancel
						</button>
						<button
							type="button"
							className="button button-primary"
							disabled={busy || (!canWrite && !uncertain)}
							onClick={save}
						>
							{busy ? "Saving…" : uncertain ? "Retry" : "Save"}
						</button>
					</div>
				</div>
			) : (
				<>
					<p className="message-text">
						{render_message_text(doc, props.memberNames, props.userId)}
						{doc.editedAt !== null ? <span className="message-edited"> (edited)</span> : null}
					</p>
					{doc.attachments.length ? <MessageAttachments client={props.client} attachments={doc.attachments} /> : null}
					{reactions?.length ? (
						<div className="message-reactions">
							{reactions.map((group) => (
								<button
									key={group.token}
									type="button"
									disabled={!canWrite || busy}
									className={group.reactedByMe ? "reaction-chip is-mine" : "reaction-chip"}
									aria-pressed={group.reactedByMe}
									aria-label={`${chat_REACTION_LABELS[group.token]}, ${group.count} ${group.count === 1 ? "reaction" : "reactions"}`}
									onClick={() => toggle(group.token, group.reactedByMe)}
								>
									<span aria-hidden="true">{chat_REACTION_EMOJI[group.token]}</span>
									<span className="reaction-chip-count">{group.count}</span>
								</button>
							))}
						</div>
					) : null}
				</>
			)}
			{props.onOpenThread && (summary?.totalReplyCount ?? 0) > 0 ? (
				<button
					ref={props.replyTriggerRef}
					type="button"
					className="message-thread-summary"
					disabled={props.threadDisabled}
					onClick={() => props.onOpenThread?.(doc._id)}
				>
					<span className="message-thread-summary-icon" aria-hidden="true">
						↳
					</span>
					<span className="message-thread-summary-count">
						{summary!.totalReplyCount} {summary!.totalReplyCount === 1 ? "reply" : "replies"}
					</span>
					{summary?.latestReplyAt ? (
						<span className="message-thread-summary-recency">
							Last reply {chat_format_recency(summary.latestReplyAt, Date.now())}
						</span>
					) : null}
				</button>
			) : null}
			{!deleted && !editing ? (
				<div className="message-actions">
					{props.onOpenThread && !summary?.totalReplyCount ? (
						<button
							ref={props.replyTriggerRef}
							type="button"
							className="button message-action"
							disabled={props.threadDisabled}
							onClick={() => props.onOpenThread?.(doc._id)}
						>
							{summary === undefined ? "View thread" : "Reply in thread"}
						</button>
					) : null}
					<AddReactionButton groups={reactions ?? []} disabled={!canWrite || busy} onPick={toggle} />
					{doc.authorHostUserId === props.userId && props.canWrite ? (
						<>
							<button
								ref={editButton}
								type="button"
								className="button message-action"
								disabled={busy || uncertain}
								onClick={() => {
									setText(doc.text);
									setEditing(true);
									setError(null);
								}}
							>
								Edit
							</button>
							<button
								type="button"
								className="button message-action button-danger"
								disabled={busy || uncertain}
								onClick={() => setConfirmDelete(true)}
							>
								Delete
							</button>
						</>
					) : null}
				</div>
			) : null}
			{error && !confirmDelete ? (
				<p className="form-error" role="alert">
					{error}
					{uncertain && !editing ? (
						<>
							<button type="button" className="button" disabled={busy || !session.ready} onClick={() => void run()}>
								Retry change
							</button>
							<button type="button" className="button" disabled={busy} onClick={cancel}>
								Dismiss
							</button>
						</>
					) : null}
				</p>
			) : null}
			{confirmDelete ? (
				<Dialog labelledBy={titleId} onClose={cancel}>
					<h2 id={titleId} className="dialog-title">
						Delete message?
					</h2>
					<p>The message is replaced by a “Message deleted” placeholder for everyone.</p>
					{error ? (
						<p className="form-error" role="alert">
							{error}
						</p>
					) : null}
					<div className="dialog-actions">
						<button type="button" className="button" data-dialog-initial disabled={busy} onClick={cancel}>
							Cancel
						</button>
						<button
							type="button"
							className="button button-danger"
							disabled={busy || (!canWrite && !uncertain)}
							onClick={deleteMessage}
						>
							{busy ? "Deleting…" : uncertain ? "Retry delete" : "Delete message"}
						</button>
					</div>
				</Dialog>
			) : null}
		</li>
	);
}

function PendingRows(props: { draft: DraftOwner; queue: ReturnType<typeof use_send_queue>; disabled: boolean }) {
	return (
		<>
			{props.draft.value.pending.map((pending) => (
				<li
					key={pending.clientRequestId}
					className={
						pending.status === "failed" ? "message is-leader is-pending is-failed" : "message is-leader is-pending"
					}
				>
					<span className="message-avatar" aria-hidden="true">
						•
					</span>
					<div className="message-head">
						<span className="message-author">You</span>
						<span className="message-time">{pending.status === "sending" ? "Sending…" : "Not confirmed"}</span>
					</div>
					<p className="message-text">{pending.text}</p>
					{pending.attachments.length ? (
						<p className="message-text">{pending.attachments.map((file) => file.name).join(", ")}</p>
					) : null}
					{pending.status === "failed" ? (
						<div className="message-send-error" role="alert">
							<span>{pending.error}</span>
							<button
								type="button"
								className="button"
								disabled={props.disabled || props.queue.busy}
								onClick={() => props.queue.retry(pending)}
							>
								Retry sending message
							</button>
							<button
								type="button"
								className="button"
								onClick={() =>
									props.draft.set({
										...props.draft.get(),
										pending: props.draft
											.get()
											.pending.filter((item) => item.clientRequestId !== pending.clientRequestId),
									})
								}
							>
								Remove pending message
							</button>
						</div>
					) : null}
				</li>
			))}
		</>
	);
}
function HistoryControls(props: { window: ReturnType<typeof use_chat_window>; disabled: boolean }) {
	return (
		<div className="log-older">
			{props.window.hasOlder ? (
				<button
					type="button"
					className="button"
					disabled={props.disabled || props.window.loading}
					onClick={props.window.older}
				>
					Load older
				</button>
			) : null}
			{props.window.hasNewer ? (
				<>
					<button
						type="button"
						className="button"
						disabled={props.disabled || props.window.loading}
						onClick={props.window.newer}
					>
						Newer messages
					</button>
					<button type="button" className="button" disabled={props.disabled} onClick={props.window.latest}>
						Latest messages{props.window.newCount ? ` (${props.window.newCount} newer)` : ""}
					</button>
				</>
			) : null}
			{props.window.error ? (
				<p className="form-error" role="alert">
					{props.window.error}
					<button type="button" onClick={props.window.latest}>
						Reload messages
					</button>
				</p>
			) : null}
		</div>
	);
}
function MessageList(
	props: Omit<RowProps, "doc" | "isContinuation"> & {
		rows: Doc<"messages">[];
		readSequence?: number;
		setReplyTrigger?: (id: Id<"messages">, element: HTMLButtonElement | null) => void;
	},
) {
	const rows = [...props.rows].reverse();
	let marked = false;
	return (
		<>
			{rows.map((doc, index) => {
				const previous = rows[index - 1];
				const newDay =
					previous && new Date(previous.createdAt).toDateString() !== new Date(doc.createdAt).toDateString();
				const newMark =
					!marked &&
					props.readSequence !== undefined &&
					doc.sequence > props.readSequence &&
					doc.authorHostUserId !== props.userId &&
					doc.deletedAt === null;
				if (newMark) marked = true;
				const continuation =
					!!previous &&
					!newDay &&
					!newMark &&
					previous.authorHostUserId === doc.authorHostUserId &&
					doc.createdAt - previous.createdAt <= 300_000;
				return (
					<MessageEntry
						key={doc._id}
						{...props}
						doc={doc}
						isContinuation={continuation}
						newDay={newDay ? day_label(doc.createdAt) : null}
						newMark={newMark}
						replyTriggerRef={props.setReplyTrigger ? (element) => props.setReplyTrigger?.(doc._id, element) : undefined}
					/>
				);
			})}
		</>
	);
}
function MessageEntry(props: RowProps & { newDay: string | null; newMark: boolean }) {
	return (
		<>
			{props.newDay ? <li className="day-divider">{props.newDay}</li> : null}
			{props.newMark ? (
				<li className="new-divider">
					<span className="new-divider-label">New messages</span>
				</li>
			) : null}
			<MessageRow {...props} />
		</>
	);
}

export type ChannelViewProps = {
	client: BonoboClient;
	channelId: Id<"channels">;
	channel: Doc<"channels"> | null;
	userId: string;
	memberNames: chat_MemberNamesApi;
	announce: (text: string) => void;
	threadRootId: Id<"messages"> | null;
	setThreadRootId: (id: Id<"messages"> | null) => void;
	isNarrow: boolean;
	canWrite: boolean;
	online: boolean;
	openedAtReadSequence: number;
	onObservedRead: (position: { rootSequence: number; replySequence: number }) => void;
	onRequestStart: () => void;
	onRequestSettled: () => void;
	sendInFlight: boolean;
};
export function ThreadPanel(props: ChannelViewProps & { rootMessageId: Id<"messages">; onClose: () => void }) {
	const session = use_chat_session();
	const enabled = session.ready && props.channel !== null;
	const root = useQuery(api.messages.get, enabled || session.refreshing ? { messageId: props.rootMessageId } : "skip");
	const retainedRoot = useRef(root);
	if (root) retainedRoot.current = root;
	if (!enabled && !session.refreshing) retainedRoot.current = null;
	const shownRoot = session.refreshing ? retainedRoot.current : root;
	const window = use_chat_window({
		target: { rootMessageId: props.rootMessageId },
		enabled: enabled && root !== null,
		retain: session.refreshing,
	});
	const draft = use_chat_draft(props.client, `${props.userId}:${props.channelId}:${props.rootMessageId}`);
	const queue = use_send_queue({
		...props,
		rootMessageId: props.rootMessageId,
		draft,
		canWrite: props.canWrite && !window.denied && props.channel?.archivedAt === null,
	});
	const close = useRef<HTMLButtonElement | null>(null);
	const log = useRef<HTMLDivElement | null>(null);
	const nearBottom = useRef(true);
	const anchor = useRef<{ id: string; top: number } | null>(null);
	useEffect(() => {
		close.current?.focus();
	}, []);
	useEffect(() => {
		const docs = shownRoot ? [shownRoot, ...window.rows] : window.rows;
		const authors = [...new Set(docs.map((doc) => doc.authorHostUserId))];
		const ids = [...new Set([...authors, ...docs.flatMap((doc) => doc.mentions)])];
		if (ids.length) void props.memberNames.resolve(ids, authors);
	}, [window.rows, shownRoot, props.memberNames]);
	useLayoutEffect(() => {
		if (!log.current) return;
		if (nearBottom.current && window.atLatest) log.current.scrollTop = log.current.scrollHeight;
		else if (anchor.current) {
			const element = [...log.current.querySelectorAll<HTMLElement>("[data-key]")].find(
				(item) => item.dataset.key === anchor.current!.id,
			);
			if (element) log.current.scrollTop += element.getBoundingClientRect().top - anchor.current.top;
		}
	}, [window.rows, window.atLatest]);
	return (
		<section
			className="thread"
			aria-label="Thread"
			tabIndex={-1}
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					event.stopPropagation();
					if (!props.sendInFlight) props.onClose();
					else props.announce("Wait for pending message changes to finish before closing the thread.");
				}
			}}
		>
			<div className="thread-head">
				<h3 className="thread-title">Thread</h3>
				<button ref={close} type="button" className="button" disabled={props.sendInFlight} onClick={props.onClose}>
					{props.isNarrow ? "Back to messages" : "Close thread"}
				</button>
			</div>
			{shownRoot ? (
				<ul className="message-list thread-root">
					<MessageRow {...props} doc={shownRoot} isContinuation={false} />
				</ul>
			) : (
				<p className="channel-status">
					{enabled && root === undefined ? "Loading thread…" : "This thread is unavailable."}
				</p>
			)}
			<div
				ref={log}
				className="thread-replies"
				onScroll={() => {
					const element = log.current;
					if (!element) return;
					nearBottom.current = element.scrollHeight - element.scrollTop - element.clientHeight < 80;
					const first = [...element.querySelectorAll<HTMLElement>("[data-key]")].find(
						(item) => item.getBoundingClientRect().bottom >= element.getBoundingClientRect().top,
					);
					anchor.current = first ? { id: first.dataset.key!, top: first.getBoundingClientRect().top } : null;
				}}
			>
				<HistoryControls window={window} disabled={props.sendInFlight || !enabled} />
				{window.loading ? (
					<p className="channel-status" role="status">
						Loading replies…
					</p>
				) : null}
				{enabled && !window.denied && !window.loading && !window.rows.length ? (
					<p className="channel-status">No replies yet</p>
				) : null}
				<ul className="message-list">
					<MessageList {...props} rows={window.rows} />
					<PendingRows draft={draft} queue={queue} disabled={!session.ready || !session.can_request_now()} />
				</ul>
			</div>
			{queue.error ? (
				<p className="form-error" role="alert">
					{queue.error}
				</p>
			) : null}
			<Composer
				client={props.client}
				userId={props.userId}
				draft={draft}
				label="Reply in thread"
				busy={queue.busy}
				disabled={
					!enabled ||
					!shownRoot ||
					window.denied ||
					!props.canWrite ||
					!session.canSend ||
					props.channel?.archivedAt !== null
				}
				onSend={queue.enqueue}
			/>
		</section>
	);
}

const MIN_LOG_WIDTH = 420;
const MIN_THREAD_WIDTH = 244;
const DEFAULT_THREAD_WIDTH = 340;
export function ChannelView(props: ChannelViewProps) {
	// Channel changes discard subscriptions. Drafts stay in the frame's small memory store.
	return <ChannelContent key={`${props.userId}:${props.channelId}`} {...props} />;
}
function ChannelContent(props: ChannelViewProps) {
	const session = use_chat_session();
	const enabled = session.ready && props.channel !== null;
	const threadCoversChannel = props.isNarrow && props.threadRootId !== null;
	const window = use_chat_window({ target: { channelId: props.channelId }, enabled, retain: session.refreshing });
	const draft = use_chat_draft(props.client, `${props.userId}:${props.channelId}`);
	const queue = use_send_queue({
		...props,
		rootMessageId: null,
		draft,
		canWrite: props.canWrite && !window.denied && props.channel?.archivedAt === null,
	});
	const body = useRef<HTMLDivElement | null>(null);
	const log = useRef<HTMLDivElement | null>(null);
	const triggers = useRef(new Map<Id<"messages">, HTMLButtonElement>());
	const nearBottom = useRef(true);
	const anchor = useRef<{ id: string; top: number } | null>(null);
	const previousSequence = useRef<number | null>(null);
	const [bodyWidth, setBodyWidth] = useState(0);
	const [threadWidth, setThreadWidth] = useState(DEFAULT_THREAD_WIDTH);
	const [visibleSequence, setVisibleSequence] = useState(0);
	const maximum = Math.max(MIN_THREAD_WIDTH, bodyWidth - MIN_LOG_WIDTH);
	const effective = Math.min(maximum, Math.max(MIN_THREAD_WIDTH, threadWidth));
	useEffect(() => {
		if (!props.threadRootId || !body.current) return;
		const element = body.current;
		setBodyWidth(element.clientWidth);
		const observer = new ResizeObserver(() => setBodyWidth(element.clientWidth));
		observer.observe(element);
		return () => observer.disconnect();
	}, [props.threadRootId]);
	useEffect(() => {
		const authors = [...new Set(window.rows.map((doc) => doc.authorHostUserId))];
		const ids = [...new Set([...authors, ...window.rows.flatMap((doc) => doc.mentions)])];
		if (ids.length) void props.memberNames.resolve(ids, authors);
	}, [window.rows, props.memberNames]);
	useLayoutEffect(() => {
		if (!log.current) return;
		if (nearBottom.current && window.atLatest) {
			log.current.scrollTop = log.current.scrollHeight;
			setVisibleSequence(window.sequence);
		} else if (anchor.current) {
			const element = [...log.current.querySelectorAll<HTMLElement>("[data-key]")].find(
				(item) => item.dataset.key === anchor.current!.id,
			);
			if (element) log.current.scrollTop += element.getBoundingClientRect().top - anchor.current.top;
		}
	}, [window.rows, window.atLatest, window.sequence]);
	useEffect(() => {
		if (previousSequence.current !== null && window.sequence > previousSequence.current && window.atLatest)
			props.announce("New messages in this channel.");
		previousSequence.current = window.sequence;
	}, [window.sequence, window.atLatest, props.announce]);
	useEffect(() => {
		const mark = () => {
			if (
				enabled &&
				window.atLatest &&
				nearBottom.current &&
				document.visibilityState === "visible" &&
				visibleSequence === window.sequence
			)
				props.onObservedRead({ rootSequence: visibleSequence, replySequence: props.channel?.lastReplySequence ?? 0 });
		};
		mark();
		document.addEventListener("visibilitychange", mark);
		return () => document.removeEventListener("visibilitychange", mark);
	}, [
		enabled,
		window.atLatest,
		visibleSequence,
		window.sequence,
		props.channel?.lastReplySequence,
		props.onObservedRead,
	]);
	const closeThread = () => {
		if (props.sendInFlight) return;
		const id = props.threadRootId;
		props.setThreadRootId(null);
		// A thread opened from the overview can be outside the loaded message page.
		if (id) queueMicrotask(() => (triggers.current.get(id) ?? log.current)?.focus());
	};
	return (
		<div className="channel">
			<header className="channel-head" inert={threadCoversChannel || undefined}>
				<div className="channel-head-main">
					<h2 className="channel-title">{props.channel ? `#${props.channel.name}` : "Channel unavailable"}</h2>
					{props.channel?.topic ? <p className="channel-topic">{props.channel.topic}</p> : null}
					{props.channel?.visibility === "private" ? (
						<p className="channel-privacy">{chat_PRIVATE_CHANNEL_DISCLOSURE}</p>
					) : null}
				</div>
				{props.channel?.archivedAt ? <span className="channel-archived-badge">Archived</span> : null}
			</header>
			<div ref={body} className="channel-body" style={{ "--thread-width": `${effective}px` } as CSSProperties}>
				<div
					ref={log}
					className="message-log"
					inert={threadCoversChannel || undefined}
					role="log"
					tabIndex={0}
					aria-live="off"
					aria-label={props.channel ? `Messages in #${props.channel.name}` : "Messages"}
					onScroll={() => {
						const element = log.current;
						if (!element) return;
						nearBottom.current = element.scrollHeight - element.scrollTop - element.clientHeight < 80;
						if (nearBottom.current && window.atLatest) setVisibleSequence(window.sequence);
						const first = [...element.querySelectorAll<HTMLElement>("[data-key]")].find(
							(item) => item.getBoundingClientRect().bottom >= element.getBoundingClientRect().top,
						);
						anchor.current = first ? { id: first.dataset.key!, top: first.getBoundingClientRect().top } : null;
					}}
				>
					{!enabled && !session.refreshing ? (
						<p className="channel-status" role="status">
							Messages are hidden until Chitchat can confirm your access. Your draft is kept.
						</p>
					) : null}
					<HistoryControls window={window} disabled={props.sendInFlight || !enabled} />
					{window.loading ? (
						<p className="channel-status" role="status">
							Loading messages…
						</p>
					) : null}
					{enabled && !window.denied && !window.loading && !window.rows.length && !draft.value.pending.length ? (
						<p className="channel-status">No messages yet</p>
					) : null}
					<ul className="message-list">
						<MessageList
							{...props}
							rows={window.rows}
							readSequence={props.openedAtReadSequence}
							onOpenThread={(id) => {
								if (!props.sendInFlight) props.setThreadRootId(id);
							}}
							threadDisabled={props.sendInFlight}
							setReplyTrigger={(id, element) => {
								if (element) triggers.current.set(id, element);
								else triggers.current.delete(id);
							}}
						/>
						<PendingRows draft={draft} queue={queue} disabled={!session.ready || !session.can_request_now()} />
					</ul>
				</div>
				{props.threadRootId ? (
					<>
						<div
							className="thread-resize"
							inert={threadCoversChannel || undefined}
							role="separator"
							tabIndex={0}
							aria-orientation="vertical"
							aria-label="Resize thread panel"
							aria-valuenow={effective}
							aria-valuemin={MIN_THREAD_WIDTH}
							aria-valuemax={maximum}
							onKeyDown={(event) => {
								if (["ArrowLeft", "ArrowRight", "Home"].includes(event.key)) {
									event.preventDefault();
									setThreadWidth(
										Math.min(
											maximum,
											Math.max(
												MIN_THREAD_WIDTH,
												event.key === "Home"
													? DEFAULT_THREAD_WIDTH
													: effective + (event.key === "ArrowLeft" ? 16 : -16),
											),
										),
									);
								}
							}}
							onPointerDown={(event) => {
								event.preventDefault();
								event.currentTarget.setPointerCapture(event.pointerId);
							}}
							onPointerMove={(event) => {
								if (event.currentTarget.hasPointerCapture(event.pointerId) && body.current)
									setThreadWidth(
										Math.min(
											maximum,
											Math.max(MIN_THREAD_WIDTH, body.current.getBoundingClientRect().right - event.clientX),
										),
									);
							}}
							onDoubleClick={() => setThreadWidth(DEFAULT_THREAD_WIDTH)}
						/>
						<ThreadPanel key={props.threadRootId} {...props} rootMessageId={props.threadRootId} onClose={closeThread} />
					</>
				) : null}
			</div>
			{props.sendInFlight ? (
				<p className="channel-status" role="status">
					Wait for pending message changes to finish before leaving this channel or thread.
				</p>
			) : null}
			{queue.error ? (
				<p className="form-error" role="alert">
					{queue.error}
				</p>
			) : null}
			<Composer
				client={props.client}
				userId={props.userId}
				draft={draft}
				label={props.channel ? `Message #${props.channel.name}` : "Message draft"}
				busy={queue.busy}
				disabled={
					!enabled ||
					window.denied ||
					!props.canWrite ||
					!session.canSend ||
					!props.online ||
					props.channel?.archivedAt !== null
				}
				inert={threadCoversChannel}
				onSend={queue.enqueue}
			/>
		</div>
	);
}
