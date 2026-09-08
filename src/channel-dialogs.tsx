import { useConvex, useQuery } from "convex/react";
import type { FunctionArgs } from "convex/server";
import { useEffect, useId, useState } from "react";
import { api } from "../convex/_generated/api";
import type { Doc, Id } from "../convex/_generated/dataModel";
import { chat_PRIVATE_CHANNEL_DISCLOSURE, chat_member_label } from "../shared/chat-display";
import { ChatPageControls, use_chat_page } from "./chat-pages";
import { Dialog } from "./dialog";
import { use_chat_session } from "./session";

function MemberPicker(props: {
	selfUserId: string;
	selected: string[];
	disabled: boolean;
	onToggle: (userId: string, selected: boolean) => void;
}) {
	const session = use_chat_session();
	const page = use_chat_page(`${session.member?.generation}:${session.member?.membershipLifetime}`);
	const roster = useQuery(
		api.members.list,
		session.ready ? { paginationOpts: { numItems: 100, cursor: page.cursor } } : "skip",
	);
	return (
		<>
			{!roster ? (
				<p className="channel-status" role="status">
					Loading people…
				</p>
			) : (
				<ul className="people-list">
					{roster.page
						.filter((member) => member.userId !== props.selfUserId)
						.map((member) => (
							<li key={member.userId} className="people-item">
								<label>
									<input
										type="checkbox"
										checked={props.selected.includes(member.userId)}
										disabled={props.disabled}
										onChange={(event) => props.onToggle(member.userId, event.currentTarget.checked)}
									/>
									{chat_member_label(member.displayName)}
								</label>
							</li>
						))}
				</ul>
			)}
			{roster?.page.length === 0 ? <p className="channel-status">No people on this page.</p> : null}
			<ChatPageControls page={page} result={roster} label="People" />
		</>
	);
}

// #region channel name

type NameAttempt =
	| { kind: "create"; args: FunctionArgs<typeof api.channels.create> }
	| { kind: "rename"; args: FunctionArgs<typeof api.channels.update> };

export function ChannelNameDialog(props: {
	channel: Doc<"channels"> | null;
	selfUserId: string;
	onSaved: (channelId: Id<"channels">) => void;
	onClose: () => void;
}) {
	const convex = useConvex();
	const session = use_chat_session();
	const titleId = useId();
	const inputId = useId();
	const topicId = useId();
	const errorId = useId();
	const permissions = useQuery(
		api.channels.permissions,
		session.ready && props.channel ? { channelId: props.channel._id } : "skip",
	);
	const [name, setName] = useState(props.channel?.name ?? "");
	const [topic, setTopic] = useState(props.channel?.topic ?? "");
	const [isPrivate, setIsPrivate] = useState(false);
	const [invited, setInvited] = useState<string[]>([]);
	const [attempt, setAttempt] = useState<NameAttempt | null>(null);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const locked = busy || attempt !== null;

	const save = async () => {
		if (busy) return;
		if (!session.can_request_now()) {
			setError("Reconnect before saving. Your changes are kept.");
			return;
		}
		if (name.trim().length === 0 || name.trim().length > 64 || topic.trim().length > 250) {
			setError("Use a name of 1–64 characters and a topic of at most 250 characters.");
			return;
		}
		const request =
			attempt ??
			(props.channel
				? {
						kind: "rename" as const,
						args: {
							channelId: props.channel._id,
							expectedRevision: props.channel.revision,
							clientRequestId: crypto.randomUUID(),
							name: name.trim(),
							topic: topic.trim(),
						},
					}
				: {
						kind: "create" as const,
						args: {
							clientRequestId: crypto.randomUUID(),
							name: name.trim(),
							topic: topic.trim(),
							visibility: isPrivate ? ("private" as const) : ("public" as const),
							invitedUserIds: isPrivate ? invited : [],
						},
					});
		setAttempt(request);
		setBusy(true);
		setError(null);
		try {
			const result =
				request.kind === "create"
					? await convex.mutation(api.channels.create, request.args)
					: await convex.mutation(api.channels.update, request.args);
			if (result._nay) {
				setAttempt(null);
				setError(result._nay.message);
				return;
			}
			if (result._yay.kind === "channel") props.onSaved(result._yay.channelId);
		} catch {
			setError("The save may have reached Chitchat. Retry to check the same request.");
		} finally {
			setBusy(false);
		}
	};
	return (
		<Dialog
			labelledBy={titleId}
			accessUnavailable={!session.refreshing && (!session.ready || (props.channel !== null && permissions === null))}
			onReconnect={session.retry}
			onClose={() => {
				if (!busy) props.onClose();
			}}
		>
			<h2 id={titleId} className="dialog-title">
				{props.channel ? `Rename #${props.channel.name}` : "Create channel"}
			</h2>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					void save();
				}}
				onKeyDown={(event) => {
					if (event.key === "Enter" && event.nativeEvent.isComposing) event.preventDefault();
				}}
			>
				<div className="field">
					<label htmlFor={inputId}>Channel name</label>
					<input
						id={inputId}
						data-dialog-initial
						value={name}
						required
						maxLength={64}
						disabled={locked}
						aria-describedby={error ? errorId : undefined}
						onInput={(event) => setName(event.currentTarget.value)}
					/>
				</div>
				<div className="field">
					<label htmlFor={topicId}>Topic (optional)</label>
					<input
						id={topicId}
						value={topic}
						maxLength={250}
						disabled={locked}
						onInput={(event) => setTopic(event.currentTarget.value)}
					/>
				</div>
				{!props.channel ? (
					<div className="field">
						<label className="checkbox-label">
							<input
								type="checkbox"
								checked={isPrivate}
								disabled={locked}
								onChange={(event) => setIsPrivate(event.currentTarget.checked)}
							/>
							Private channel
						</label>
						{isPrivate ? (
							<>
								<p className="field-note">{chat_PRIVATE_CHANNEL_DISCLOSURE}</p>
								<p className="field-note">
									Tick one person for a direct message, or several for a group. Up to 50 people can join.
								</p>
								<MemberPicker
									selfUserId={props.selfUserId}
									selected={invited}
									disabled={locked}
									onToggle={(userId, selected) =>
										setInvited((current) => (selected ? [...current, userId] : current.filter((id) => id !== userId)))
									}
								/>
								<p className="field-note">{invited.length + 1} people selected, including you.</p>
							</>
						) : null}
					</div>
				) : null}
				{error ? (
					<p id={errorId} className="form-error" role="alert">
						{error}
					</p>
				) : null}
				<div className="dialog-actions">
					<button type="button" className="button" disabled={busy} onClick={props.onClose}>
						{attempt ? "Stop checking" : "Cancel"}
					</button>
					<button
						type="submit"
						className="button button-primary"
						disabled={busy || !(attempt ? session.connected : session.canSend)}
					>
						{busy ? "Saving…" : attempt ? "Retry" : props.channel ? "Rename" : "Create"}
					</button>
				</div>
			</form>
		</Dialog>
	);
}

// #endregion channel name

// #region private channel people

export function ChannelPeopleDialog(props: { channelId: Id<"channels">; selfUserId: string; onClose: () => void }) {
	const convex = useConvex();
	const session = use_chat_session();
	const titleId = useId();
	const [attempt, setAttempt] = useState<FunctionArgs<typeof api.channel_members.change> | null>(null);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const channel = useQuery(api.channels.get, session.ready ? { channelId: props.channelId } : "skip");
	const people = useQuery(
		api.channels.list_members,
		session.ready ? { channelId: props.channelId, paginationOpts: { numItems: 50, cursor: null } } : "skip",
	);
	const permissions = useQuery(api.channels.permissions, session.ready ? { channelId: props.channelId } : "skip");
	const names = useQuery(
		api.members.resolve,
		session.ready && people ? { userIds: people.page.map((person) => person.hostUserId) } : "skip",
	);
	const result = useQuery(
		api.channel_members.status,
		session.ready && attempt ? { channelId: props.channelId, clientRequestId: attempt.clientRequestId } : "skip",
	);
	const waiting = result?.status === "pending";
	useEffect(() => {
		if (result?.status === "complete") {
			setAttempt(null);
			setError(null);
		}
		if (result?.status === "cancelled") {
			setAttempt(null);
			setError("Access changed before this request finished. Check the people list and try again.");
		}
	}, [result]);

	const change = async (request: FunctionArgs<typeof api.channel_members.change>) => {
		if (busy || waiting) return;
		if (!session.can_request_now()) {
			setError("Reconnect before changing channel access.");
			return;
		}
		setAttempt(request);
		setBusy(true);
		setError(null);
		try {
			const saved = await convex.mutation(api.channel_members.change, request);
			if (saved._nay) {
				setAttempt(null);
				setError(saved._nay.message);
			}
		} catch {
			setError("This change may have reached Chitchat. Retry to check it.");
		} finally {
			setBusy(false);
		}
	};
	const request_change = (hostUserId: string, level: "read" | "write" | "manage" | null) => {
		if (!people) return;
		void change({
			channelId: props.channelId,
			clientRequestId: crypto.randomUUID(),
			expectedMembershipRevision: people.membershipRevision,
			expectedPrincipalCount: people.memberCount,
			hostUserId,
			level,
		});
	};
	return (
		<Dialog
			labelledBy={titleId}
			accessUnavailable={!session.refreshing && (!session.ready || permissions === null)}
			onReconnect={session.retry}
			onClose={() => {
				if (!busy) props.onClose();
			}}
		>
			<h2 id={titleId} className="dialog-title">
				{channel ? `People in #${channel.name}` : "Channel access"}
			</h2>
			<p className="field-note">{chat_PRIVATE_CHANNEL_DISCLOSURE}</p>
			{waiting ? (
				<p role="status">Updating channel and transcript access…</p>
			) : !people ? (
				<p className="channel-status" role="status">
					{people === null ? "The people list is not currently available." : "Loading people…"}
				</p>
			) : (
				<ul className="people-list current-people" aria-label="People in this channel">
					{people.page.map((person) => (
						<li key={person.hostUserId} className="people-item">
							<span>
								{names?.[person.hostUserId] ?? "Unnamed member"}
								{person.level === "manage" ? " (can add people)" : person.level === "read" ? " (can read)" : ""}
							</span>
							{permissions?.canManage && person.hostUserId !== props.selfUserId ? (
								<>
									<select
										aria-label={`Access for ${names?.[person.hostUserId] ?? "member"}`}
										value={person.level}
										disabled={busy || attempt !== null}
										onChange={(event) => {
											const level = event.currentTarget.value;
											if (level === "read" || level === "write" || level === "manage")
												request_change(person.hostUserId, level);
										}}
									>
										<option value="read">Can read</option>
										<option value="write">Can write</option>
										<option value="manage">Can add people</option>
									</select>
									<button
										type="button"
										className="button"
										disabled={busy || attempt !== null}
										onClick={() => request_change(person.hostUserId, null)}
									>
										Remove
									</button>
								</>
							) : null}
						</li>
					))}
				</ul>
			)}
			{permissions?.canManage && people ? (
				<div className="field">
					<p className="field-label">Add people</p>
					<MemberPicker
						selfUserId={props.selfUserId}
						selected={people.page.map((person) => person.hostUserId)}
						disabled={busy || attempt !== null}
						onToggle={(userId, selected) => request_change(userId, selected ? "write" : null)}
					/>
				</div>
			) : null}
			{error ? (
				<p className="form-error" role="alert">
					{error}
				</p>
			) : null}
			<div className="dialog-actions">
				{attempt && !waiting ? (
					<button
						type="button"
						className="button"
						disabled={busy || !session.canSend}
						onClick={() => void change(attempt)}
					>
						Retry
					</button>
				) : null}
				<button type="button" className="button" data-dialog-initial disabled={busy} onClick={props.onClose}>
					Close
				</button>
			</div>
		</Dialog>
	);
}

// #endregion private channel people

// #region archive and leave

export function ChannelActionDialog(props: {
	channel: Doc<"channels">;
	action: "archive" | "unarchive" | "leave" | "delete";
	onDone: () => void;
	onClose: () => void;
}) {
	const convex = useConvex();
	const session = use_chat_session();
	const titleId = useId();
	const [requestId] = useState(() => crypto.randomUUID());
	const [busy, setBusy] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const privateAction = props.action === "leave" || props.action === "delete";
	const permissions = useQuery(api.channels.permissions, session.ready ? { channelId: props.channel._id } : "skip");
	const status = useQuery(
		api.channel_members.status,
		session.ready && submitted && privateAction ? { channelId: props.channel._id, clientRequestId: requestId } : "skip",
	);
	const waiting = status?.status === "pending";
	useEffect(() => {
		if (status?.status === "complete") props.onDone();
		if (status?.status === "cancelled")
			setError("Access changed before this request finished. Close this dialog and try again.");
	}, [status, props.onDone]);
	const label =
		props.action === "archive"
			? "Archive"
			: props.action === "unarchive"
				? "Unarchive"
				: props.action === "leave"
					? "Leave"
					: "Delete";
	const confirm = async () => {
		if (busy || waiting) return;
		if (!session.can_request_now()) {
			setError("Reconnect before changing this channel.");
			return;
		}
		setBusy(true);
		setSubmitted(true);
		setError(null);
		try {
			const result =
				props.action === "archive" || props.action === "unarchive"
					? await convex.mutation(api.channels.archive, {
							channelId: props.channel._id,
							clientRequestId: requestId,
							expectedRevision: props.channel.revision,
							archived: props.action === "archive",
						})
					: props.action === "leave"
						? await convex.mutation(api.channel_members.leave, {
								channelId: props.channel._id,
								clientRequestId: requestId,
								expectedMembershipRevision: props.channel.membershipRevision,
								expectedPrincipalCount: props.channel.memberCount,
							})
						: await convex.mutation(api.channel_members.delete_channel, {
								channelId: props.channel._id,
								clientRequestId: requestId,
								expectedMembershipRevision: props.channel.membershipRevision,
								expectedPrincipalCount: props.channel.memberCount,
							});
			if (result._nay) {
				setSubmitted(false);
				setError(result._nay.message);
				return;
			}
			if (result._yay.kind !== "membership" || !result._yay.pending) props.onDone();
		} catch {
			setError("This change may have reached Chitchat. Retry to check the same request.");
		} finally {
			setBusy(false);
		}
	};
	const deleting = props.action === "delete" || (props.action === "leave" && props.channel.memberCount === 1);
	return (
		<Dialog
			labelledBy={titleId}
			accessUnavailable={!session.refreshing && (!session.ready || permissions === null)}
			onReconnect={session.retry}
			onClose={() => {
				if (!busy) props.onClose();
			}}
		>
			<h2 id={titleId} className="dialog-title">
				{label} #{props.channel.name}
				{props.action === "delete" ? " for everyone" : ""}?
			</h2>
			<p>
				{props.action === "archive"
					? "The channel is hidden from the active list. Its messages stay stored and it can be unarchived any time."
					: props.action === "unarchive"
						? "The channel returns to the active list."
						: deleting
							? `This deletes the channel for all ${props.channel.memberCount} people in it. Nobody can open it again. Copies in Files follow their own sharing settings. This cannot be undone.`
							: "You stop seeing this channel and its messages. Other people keep it. Somebody who can add people has to add you back. Copies in Files follow their own sharing settings."}
			</p>
			{waiting ? <p role="status">Updating channel and transcript access…</p> : null}
			{error ? (
				<p className="form-error" role="alert">
					{error}
				</p>
			) : null}
			<div className="dialog-actions">
				<button type="button" className="button" data-dialog-initial disabled={busy} onClick={props.onClose}>
					{waiting ? "Close" : "Cancel"}
				</button>
				<button
					type="button"
					className={`button ${deleting || props.action === "archive" ? "button-danger" : "button-primary"}`}
					disabled={busy || waiting || !(props.action === "leave" || submitted ? session.connected : session.canSend)}
					onClick={() => void confirm()}
				>
					{busy ? "Saving…" : submitted ? "Retry" : `${label} channel`}
				</button>
			</div>
		</Dialog>
	);
}

// #endregion archive and leave
