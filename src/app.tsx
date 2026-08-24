import type {
	BonoboUiFrontendClient,
	BonoboUiMember,
	BonoboUiScope,
	BonoboUiScopePrincipal,
	BonoboUiScopeResult,
	BonoboUiTheme,
} from "bonobo-plugin-sdk/frontend";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
	chat_CHANNEL_NAME_MAX_LENGTH,
	chat_CHANNEL_TOPIC_MAX_LENGTH,
	chat_channel_is_private,
	chat_create_channel_key,
	chat_CURSOR_CALLER_KEY,
	chat_cursor_stored_key,
	chat_fold_public_unreads,
	chat_format_recency,
	chat_get_error_message,
	chat_merge_cursor_maps,
	chat_message_channel_key,
	chat_parse_private_cursor_key,
	chat_private_cursor_caller_key,
	chat_PRIVATE_CHANNEL_COLLECTIONS,
	chat_PRIVATE_CHANNEL_DISCLOSURE,
	chat_reply_root_key,
	chat_validate_channel_doc,
	chat_validate_cursor_map_doc,
	chat_validate_message_doc,
	chat_validate_private_cursor_doc,
	type chat_ChannelValue,
	type chat_CursorMapValue,
	type chat_Doc,
	type chat_MessageValue,
	type chat_PrivateCursorDoc,
	type chat_PublicUnread,
} from "./chat-data";
import { chat_create_window_store } from "./chat-store";
import { ChannelView, type chat_MemberNamesApi } from "./channel-view";
import { Dialog } from "./dialog";

// #region member names

/**
 * One cached member-name resolver for the whole page. Names live in a ref (async
 * resolutions read and write the latest map without stale-closure risk). When a
 * resolution lands, a state counter bumps purely to re-render consumers.
 *
 * The returned object must keep ONE identity for the page's lifetime: the messages watch
 * effect lists it as a dependency, and a fresh object per render would tear down and
 * rebuild the subscription and its accumulated store — collapsing "Load older" history
 * back to the newest window on every remote arrival.
 */
/**
 * How long a resolved name is trusted. A member can change their display name, and a member who was
 * not in the workspace yet resolves to null — both are permanent in a cache that never expires, and
 * a page open all day is the ordinary case for a chat plugin.
 */
const MEMBER_NAME_MAX_AGE_MS = 5 * 60 * 1000;

function use_member_names(client: BonoboUiFrontendClient): chat_MemberNamesApi {
	const namesRef = useRef(new Map<string, string | null>());
	const requestedRef = useRef(new Map<string, number>());
	// The value is never read; setting it re-renders consumers after names land.
	const [, setResolutionCount] = useState(0);

	const get = useCallback((userId: string) => {
		return namesRef.current.has(userId) ? namesRef.current.get(userId)! : undefined;
	}, []);

	const resolve = useCallback(
		async (userIds: string[]) => {
			const now = Date.now();
			const missing = [...new Set(userIds)].filter((id) => {
				const requestedAt = requestedRef.current.get(id);
				return requestedAt === undefined || now - requestedAt >= MEMBER_NAME_MAX_AGE_MS;
			});
			if (missing.length === 0) {
				return;
			}
			for (const id of missing) {
				requestedRef.current.set(id, now);
			}
			// The server resolves at most 50 ids per request.
			for (let start = 0; start < missing.length; start += 50) {
				const batch = missing.slice(start, start + 50);
				try {
					const members = await client.members.resolve(batch);
					for (const id of batch) {
						namesRef.current.set(id, members[id] ?? null);
					}
				} catch {
					// Allow a later retry for this batch.
					for (const id of batch) {
						requestedRef.current.delete(id);
					}
				}
			}
			setResolutionCount((current) => current + 1);
		},
		[client],
	);

	return useMemo(() => ({ get, resolve }), [get, resolve]);
}

/** One page of the workspace roster, for the pickers that add people to a private channel. */
type Roster = { members: BonoboUiMember[]; error: string | null; truncated: boolean };

/**
 * Reads the first page of the roster once, when a dialog that needs it opens.
 *
 * One page only. A picker is a small list a person reads, so paging further would grow the dialog
 * past what anybody scrolls; the dialog says so instead of pretending the list is complete.
 */
function use_roster(client: BonoboUiFrontendClient): Roster | null {
	const [roster, setRoster] = useState<Roster | null>(null);

	useEffect(() => {
		let cancelled = false;
		// `members.list` resolves every refusal and never rejects, so there is nothing to catch.
		client.members.list({ limit: 100 }).then((result) => {
			if (cancelled) {
				return;
			}
			if ("_nay" in result) {
				setRoster({ members: [], error: result._nay.message, truncated: false });
				return;
			}
			setRoster({ members: result._yay.members, error: null, truncated: result._yay.cursor !== null });
		});
		return () => {
			cancelled = true;
		};
	}, [client]);

	return roster;
}

// #endregion member names

// #region channel dialogs

/**
 * The people picker both dialogs use.
 *
 * The caller is not in the list. They are in every private channel they create by definition, and a
 * checkbox that cannot be unticked is a control that does nothing.
 */
function MemberPicker(props: {
	client: BonoboUiFrontendClient;
	selfUserId: string;
	selected: string[];
	onToggle: (userId: string, selected: boolean) => void;
}) {
	// Mounted only while a dialog is really showing the picker, so the roster is read then and not
	// on every page load.
	const roster = use_roster(props.client);

	if (roster === null) {
		return (
			<p className="channel-status" role="status">
				Loading people…
			</p>
		);
	}
	if (roster.error !== null) {
		return (
			<p className="form-error" role="alert">
				{roster.error}
			</p>
		);
	}

	const others = roster.members
		.filter((member) => member.userId !== props.selfUserId)
		.sort((a, b) => (a.displayName ?? "").localeCompare(b.displayName ?? ""));
	if (others.length === 0) {
		return <p className="channel-status">Nobody else is in this workspace yet.</p>;
	}

	return (
		<>
			<ul className="people-list">
				{others.map((member) => (
					<li key={member.userId} className="people-item">
						<label>
							<input
								type="checkbox"
								checked={props.selected.includes(member.userId)}
								onChange={(event) => props.onToggle(member.userId, event.currentTarget.checked)}
							/>
							{member.displayName ?? "Someone with no name yet"}
						</label>
					</li>
				))}
			</ul>
			{roster.truncated ? <p className="channel-status">Showing the first 100 people in this workspace.</p> : null}
		</>
	);
}

function ChannelNameDialog(props: {
	title: string;
	submitLabel: string;
	initialName: string;
	initialTopic: string;
	/**
	 * The privacy controls, or null when the dialog may not offer them. Renaming never may: the
	 * channel's key decides whether it is private and a key never changes.
	 */
	privacy: { client: BonoboUiFrontendClient; selfUserId: string } | null;
	busy: boolean;
	error: string | null;
	onSubmit: (name: string, topic: string, people: { isPrivate: boolean; userIds: string[] }) => void;
	onClose: () => void;
}) {
	const titleId = useId();
	const inputId = useId();
	const topicId = useId();
	const privateId = useId();
	const [name, setName] = useState(props.initialName);
	const [topic, setTopic] = useState(props.initialTopic);
	const [isPrivate, setIsPrivate] = useState(false);
	const [invited, setInvited] = useState<string[]>([]);
	const [validationError, setValidationError] = useState<string | null>(null);

	const handle_submit = () => {
		if (props.busy) {
			return;
		}
		const trimmed = name.trim();
		if (trimmed.length < 1 || trimmed.length > chat_CHANNEL_NAME_MAX_LENGTH) {
			setValidationError(`Enter a name between 1 and ${chat_CHANNEL_NAME_MAX_LENGTH} characters.`);
			return;
		}
		const trimmedTopic = topic.trim();
		if (trimmedTopic.length > chat_CHANNEL_TOPIC_MAX_LENGTH) {
			setValidationError(`Keep the topic under ${chat_CHANNEL_TOPIC_MAX_LENGTH} characters.`);
			return;
		}
		setValidationError(null);
		props.onSubmit(trimmed, trimmedTopic, { isPrivate, userIds: invited });
	};

	const error = validationError ?? props.error;

	return (
		<Dialog labelledBy={titleId} onClose={props.onClose}>
			<h2 id={titleId} className="dialog-title">
				{props.title}
			</h2>
			<div className="field">
				<label htmlFor={inputId}>Channel name</label>
				<input
					id={inputId}
					data-dialog-initial
					type="text"
					value={name}
					maxLength={chat_CHANNEL_NAME_MAX_LENGTH}
					onInput={(event) => setName(event.currentTarget.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							handle_submit();
						}
					}}
				/>
			</div>
			<div className="field">
				<label htmlFor={topicId}>Topic (optional)</label>
				<input
					id={topicId}
					type="text"
					value={topic}
					maxLength={chat_CHANNEL_TOPIC_MAX_LENGTH}
					onInput={(event) => setTopic(event.currentTarget.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							handle_submit();
						}
					}}
				/>
			</div>
			{props.privacy !== null ? (
				<div className="field">
					<label className="checkbox-label" htmlFor={privateId}>
						<input
							id={privateId}
							type="checkbox"
							checked={isPrivate}
							onChange={(event) => setIsPrivate(event.currentTarget.checked)}
						/>
						Private channel
					</label>
					{isPrivate ? (
						<>
							<p className="field-note">{chat_PRIVATE_CHANNEL_DISCLOSURE}</p>
							{/* A direct message is this, with one person ticked. There is no separate kind of
							    channel for it and no separate screen. */}
							<p className="field-note">Tick one person for a direct message, or several for a group.</p>
							<MemberPicker
								client={props.privacy.client}
								selfUserId={props.privacy.selfUserId}
								selected={invited}
								onToggle={(userId, selected) =>
									setInvited((current) =>
										selected ? [...current, userId] : current.filter((id) => id !== userId),
									)
								}
							/>
						</>
					) : null}
				</div>
			) : null}
			{error !== null ? (
				<p className="form-error" role="alert">
					{error}
				</p>
			) : null}
			<div className="dialog-actions">
				<button type="button" className="button" disabled={props.busy} onClick={props.onClose}>
					Cancel
				</button>
				<button type="button" className="button button-primary" disabled={props.busy} onClick={handle_submit}>
					{props.busy ? "Saving…" : props.submitLabel}
				</button>
			</div>
		</Dialog>
	);
}

/**
 * Who is in one private channel, and the only screen that changes it.
 *
 * The list comes from the server, not from what this page remembers writing: a colleague with
 * `manage` may have changed it since, and after a reload the page knows nothing at all.
 */
function ChannelPeopleDialog(props: {
	client: BonoboUiFrontendClient;
	channel: chat_Doc<chat_ChannelValue>;
	selfUserId: string;
	memberNames: chat_MemberNamesApi;
	onClose: () => void;
}) {
	const titleId = useId();
	const [principals, setPrincipals] = useState<BonoboUiScopePrincipal[] | null>(null);
	const [loaded, setLoaded] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const reload = useCallback(() => {
		return props.client.scopes.listPrincipals({ scopeId: props.channel.key }).then((result) => {
			setPrincipals(result);
			setLoaded(true);
			if (result !== null) {
				props.memberNames.resolve(result.map((principal) => principal.userId));
			}
			return result;
		});
	}, [props.client, props.channel.key, props.memberNames]);

	useEffect(() => {
		void reload();
	}, [reload]);

	const change = (action: Promise<BonoboUiScopeResult>) => {
		setBusy(true);
		setError(null);
		action
			.then((result) => {
				if ("_nay" in result) {
					setError(result._nay.message);
					return;
				}
				return reload().then(() => undefined);
			})
			.finally(() => setBusy(false));
	};

	const inScope = new Set((principals ?? []).map((principal) => principal.userId));
	// Only somebody holding `manage` may change the list. The server refuses either way; the dialog
	// hides the controls so nobody is offered a button that always fails.
	const canManage = (principals ?? []).some(
		(principal) => principal.userId === props.selfUserId && principal.level === "manage",
	);

	return (
		<Dialog labelledBy={titleId} onClose={props.onClose}>
			<h2 id={titleId} className="dialog-title">
				People in #{props.channel.value.name}
			</h2>
			<p className="field-note">{chat_PRIVATE_CHANNEL_DISCLOSURE}</p>
			{!loaded ? (
				<p className="channel-status" role="status">
					Loading people…
				</p>
			) : principals === null ? (
				<p className="form-error" role="alert">
					This channel's people list is no longer readable. Reload the page.
				</p>
			) : (
				<ul className="people-list current-people" aria-label="People in this channel">
					{principals.map((principal) => (
						<li key={principal.userId} className="people-item">
							<span>
								{props.memberNames.get(principal.userId) ?? principal.userId}
								{principal.level === "manage" ? " (can add people)" : ""}
							</span>
							{canManage && principal.userId !== props.selfUserId ? (
								<button
									type="button"
									className="button channel-item-action"
									disabled={busy}
									onClick={() =>
										change(
											props.client.scopes.removePrincipal({
												scopeId: props.channel.key,
												userId: principal.userId,
											}),
										)
									}
								>
									Remove
								</button>
							) : null}
						</li>
					))}
				</ul>
			)}
			{loaded && principals !== null && canManage ? (
				<div className="field">
					{/* Not a <label>: it names a group of checkboxes, and a label with no control of its
					    own is a control assistive tech announces and nobody can operate. */}
					<p className="field-label">Add people</p>
					<MemberPicker
						client={props.client}
						selfUserId={props.selfUserId}
						selected={[...inScope]}
						onToggle={(userId, selected) =>
							change(
								selected
									? props.client.scopes.setPrincipal({
											scopeId: props.channel.key,
											userId,
											level: "member",
										})
									: props.client.scopes.removePrincipal({ scopeId: props.channel.key, userId }),
							)
						}
					/>
				</div>
			) : null}
			{error !== null ? (
				<p className="form-error" role="alert">
					{error}
				</p>
			) : null}
			<div className="dialog-actions">
				<button type="button" className="button" data-dialog-initial onClick={props.onClose}>
					Close
				</button>
			</div>
		</Dialog>
	);
}

function ArchiveChannelDialog(props: {
	channelName: string;
	busy: boolean;
	error: string | null;
	onConfirm: () => void;
	onClose: () => void;
}) {
	const titleId = useId();
	return (
		<Dialog labelledBy={titleId} onClose={props.onClose}>
			<h2 id={titleId} className="dialog-title">
				Archive #{props.channelName}?
			</h2>
			<p>The channel is hidden from the list. Its messages stay stored and it can be unarchived any time.</p>
			{props.error !== null ? (
				<p className="form-error" role="alert">
					{props.error}
				</p>
			) : null}
			<div className="dialog-actions">
				<button type="button" className="button" data-dialog-initial disabled={props.busy} onClick={props.onClose}>
					Cancel
				</button>
				<button type="button" className="button button-danger" disabled={props.busy} onClick={props.onConfirm}>
					{props.busy ? "Archiving…" : "Archive channel"}
				</button>
			</div>
		</Dialog>
	);
}

// #endregion channel dialogs

// #region views

/**
 * The three sidebar views. They share the one selection state with channels — opening a view
 * closes the channel — so a view never holds live subscriptions while a channel is open and vice
 * versa. The keys contain `:`, which no channel key does (a UUID, optionally under `p/`), so a
 * view key can never collide with a channel key in `selectedKey`.
 */
const VIEWS = [
	{ key: "view:unreads", name: "Unreads" },
	{ key: "view:threads", name: "Threads" },
	{ key: "view:activity", name: "Activity" },
] as const;

/** "Former member" for a deleted user, "…" while the name has not resolved yet. */
function author_label(name: string | null | undefined) {
	return name === null ? "Former member" : (name ?? "…");
}

/** The one-line preview a view row shows, cut like the announcer cuts arrivals. */
function preview_text(text: string) {
	return text.length > 80 ? `${text.slice(0, 80)}…` : text;
}

/** One row the Unreads view shows. Private rows carry no preview: a shared doc cannot say more. */
type UnreadRow = {
	channel: chat_Doc<chat_ChannelValue>;
	at: number;
	mentionCount: number;
	preview: chat_Doc<chat_MessageValue> | null;
};

function UnreadsView(props: {
	channels: chat_Doc<chat_ChannelValue>[];
	publicUnreads: Map<string, chat_PublicUnread>;
	privateCursors: Map<string, chat_PrivateCursorDoc>;
	recentDead: boolean;
	memberNames: chat_MemberNamesApi;
	onSelectChannel: (channel: chat_Doc<chat_ChannelValue>) => void;
}) {
	const rows: UnreadRow[] = [];
	for (const channel of props.channels) {
		// A closed private channel can only say "something is newer than your cursor" — the
		// stamp on its own doc — so its row has no preview and no mention count.
		if (chat_channel_is_private(channel.key)) {
			const last = channel.value.lastMessageAt;
			if (last !== undefined && last > (props.privateCursors.get(channel.key)?.at ?? 0)) {
				rows.push({ channel, at: last, mentionCount: 0, preview: null });
			}
			continue;
		}
		const unread = props.publicUnreads.get(channel.key);
		if (unread !== undefined) {
			rows.push({ channel, at: unread.latest.timestamp, mentionCount: unread.mentionCount, preview: unread.latest });
		}
	}
	rows.sort((a, b) => b.at - a.at);

	// Resolve the preview authors. `resolve` skips ids it already knows, so re-running when the
	// fold changes costs nothing once names are cached.
	const memberNames = props.memberNames;
	useEffect(() => {
		const ids = [...props.publicUnreads.values()].map((unread) => unread.latest.createdBy);
		if (ids.length > 0) {
			void memberNames.resolve(ids);
		}
	}, [props.publicUnreads, memberNames]);

	const now = Date.now();
	return (
		<section className="view" aria-label="Unreads">
			<header className="view-head">
				<h2 className="view-title">Unreads</h2>
			</header>
			<p className="view-note">
				Only the newest 100 public messages are checked, so an older unread channel can be missing here. Private
				channels show their name only.
			</p>
			{props.recentDead ? (
				<div className="channel-status is-error" role="alert">
					The recent-messages feed stopped, so unread state for public channels is not updating.
				</div>
			) : null}
			{rows.length === 0 ? (
				<div className="channel-status">You are all caught up.</div>
			) : (
				<ul className="view-rows">
					{rows.map((row) => (
						<li key={row.channel.key} className="view-row">
							<button type="button" className="view-row-button" onClick={() => props.onSelectChannel(row.channel)}>
								<span className="view-row-title">
									#{row.channel.value.name}
									{row.mentionCount > 0 ? (
										<span className="mention-badge">
											{row.mentionCount}
											<span className="visually-hidden"> mentions of you</span>
										</span>
									) : null}
								</span>
								<span className="view-row-time">{chat_format_recency(row.at, now)}</span>
								{row.preview !== null ? (
									<span className="view-row-preview">
										{`${author_label(memberNames.get(row.preview.createdBy))}: ${preview_text(row.preview.value.text)}`}
									</span>
								) : null}
							</button>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

function ActivityView(props: {
	feed: chat_Doc<chat_MessageValue>[];
	channels: chat_Doc<chat_ChannelValue>[];
	selfUserId: string;
	recentDead: boolean;
	memberNames: chat_MemberNamesApi;
	onSelectChannel: (channel: chat_Doc<chat_ChannelValue>) => void;
}) {
	const channelsByKey = new Map(props.channels.map((channel) => [channel.key, channel]));
	// Group consecutive same-channel messages, newest first, under one channel header each.
	const groups: { channel: chat_Doc<chat_ChannelValue>; messages: chat_Doc<chat_MessageValue>[] }[] = [];
	for (const doc of props.feed) {
		if (doc.value.deletedAt !== null) {
			continue;
		}
		const channelKey = chat_message_channel_key(doc.key);
		const channel = channelKey === null ? undefined : channelsByKey.get(channelKey);
		// A message whose channel is not in the sidebar list (past the 100-channel read) has no
		// name to head its group with; skip it rather than render an unnamed header.
		if (channel === undefined) {
			continue;
		}
		const lastGroup = groups[groups.length - 1];
		if (lastGroup !== undefined && lastGroup.channel.key === channel.key) {
			lastGroup.messages.push(doc);
		} else {
			groups.push({ channel, messages: [doc] });
		}
	}

	const memberNames = props.memberNames;
	useEffect(() => {
		const ids = [...new Set(props.feed.map((doc) => doc.createdBy))];
		if (ids.length > 0) {
			void memberNames.resolve(ids);
		}
	}, [props.feed, memberNames]);

	const now = Date.now();
	return (
		<section className="view" aria-label="Activity">
			<header className="view-head">
				<h2 className="view-title">Activity</h2>
			</header>
			<p className="view-note">The newest public messages. Private channels are not shown here.</p>
			{props.recentDead ? (
				<div className="channel-status is-error" role="alert">
					The recent-messages feed stopped, so this view is not updating.
				</div>
			) : null}
			{groups.length === 0 ? (
				<div className="channel-status">No public messages yet.</div>
			) : (
				<div className="view-groups">
					{groups.map((group, index) => (
						<section key={`${group.channel.key}:${index}`} className="view-group">
							<h3 className="view-group-title">
								<button
									type="button"
									className="view-group-link"
									onClick={() => props.onSelectChannel(group.channel)}
								>
									#{group.channel.value.name}
								</button>
							</h3>
							<ul className="view-rows">
								{group.messages.map((doc) => (
									<li
										key={doc.key}
										className={
											doc.value.mentions?.includes(props.selfUserId) ? "view-row mention-self" : "view-row"
										}
									>
										<span className="view-row-title">{author_label(memberNames.get(doc.createdBy))}</span>
										<span className="view-row-time">{chat_format_recency(doc.timestamp, now)}</span>
										<span className="view-row-preview">{preview_text(doc.value.text)}</span>
									</li>
								))}
							</ul>
						</section>
					))}
				</div>
			)}
		</section>
	);
}

function ThreadsView(props: {
	client: BonoboUiFrontendClient;
	channels: chat_Doc<chat_ChannelValue>[];
	memberNames: chat_MemberNamesApi;
	onOpenThread: (channel: chat_Doc<chat_ChannelValue>, rootKey: string) => void;
}) {
	const [replies, setReplies] = useState<chat_Doc<chat_MessageValue>[]>([]);
	const [loaded, setLoaded] = useState(false);
	const [dead, setDead] = useState(false);

	// The replies feed lives only while this view is mounted, so it never holds a subscription
	// slot while a channel (with its three windows and thread watch) is open.
	useEffect(() => {
		const store = chat_create_window_store(chat_validate_message_doc);
		const unsubscribe = props.client.data.watchRecent(
			{ collection: "replies", limit: 100, order: "desc" },
			(update) => {
				if (update === null) {
					setDead(true);
					setLoaded(true);
					return;
				}
				setReplies(store.apply_window(update.docs));
				setLoaded(true);
			},
		);
		return unsubscribe;
	}, [props.client]);

	const channelsByKey = new Map(props.channels.map((channel) => [channel.key, channel]));
	// One row per thread root. The feed is newest-first, so the first reply seen for a root is
	// its newest and the map's insertion order is already the view's order.
	const threads = new Map<
		string,
		{ channel: chat_Doc<chat_ChannelValue>; newest: chat_Doc<chat_MessageValue>; count: number }
	>();
	for (const doc of replies) {
		if (doc.value.deletedAt !== null) {
			continue;
		}
		const rootKey = chat_reply_root_key(doc.key);
		const channelKey = rootKey === null ? null : chat_message_channel_key(rootKey);
		const channel = channelKey === null ? undefined : channelsByKey.get(channelKey);
		if (rootKey === null || channel === undefined) {
			continue;
		}
		const existing = threads.get(rootKey);
		if (existing === undefined) {
			threads.set(rootKey, { channel, newest: doc, count: 1 });
		} else {
			existing.count += 1;
		}
	}

	const memberNames = props.memberNames;
	useEffect(() => {
		const ids = [...new Set(replies.map((doc) => doc.createdBy))];
		if (ids.length > 0) {
			void memberNames.resolve(ids);
		}
	}, [replies, memberNames]);

	const now = Date.now();
	return (
		<section className="view" aria-label="Threads">
			<header className="view-head">
				<h2 className="view-title">Threads</h2>
			</header>
			<p className="view-note">
				The newest public reply activity; counts read the newest 100 replies. Private channels are not shown
				here.
			</p>
			{dead ? (
				<div className="channel-status is-error" role="alert">
					The replies feed stopped, so this view is not updating.
				</div>
			) : null}
			{!loaded ? (
				<div className="channel-status" role="status">
					Loading threads…
				</div>
			) : threads.size === 0 ? (
				<div className="channel-status">No recent thread activity.</div>
			) : (
				<ul className="view-rows">
					{[...threads.entries()].map(([rootKey, thread]) => (
						<li key={rootKey} className="view-row">
							<button
								type="button"
								className="view-row-button"
								onClick={() => props.onOpenThread(thread.channel, rootKey)}
							>
								<span className="view-row-title">#{thread.channel.value.name}</span>
								<span className="view-row-time">{chat_format_recency(thread.newest.timestamp, now)}</span>
								<span className="view-row-preview">
									{`${thread.count} ${thread.count === 1 ? "reply" : "replies"} · ${author_label(
										memberNames.get(thread.newest.createdBy),
									)}: ${preview_text(thread.newest.value.text)}`}
								</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

// #endregion views

// #region app

/**
 * What the page says when its channels subscription dies. The reasons are not interchangeable: a
 * member whose plugin was uninstalled cannot fix anything by signing in again, and a member whose
 * session ran out only has to reload.
 */
function channels_death_message(reason: string | undefined): string {
	if (reason === "denied") {
		// Deliberately names no cause. The commonest trigger is an uninstall or a revoked
		// installation, and telling a member their permissions changed sends them to an admin over
		// something no permission of theirs caused.
		return "Chitchat can no longer read its data. Reload the page to try again.";
	}
	if (reason === "session_expired") {
		return "This Chitchat session expired. Reload the page to continue.";
	}
	if (reason === "unavailable") {
		return "Chitchat cannot reach its data right now. Nothing will update until the connection returns.";
	}
	if (reason === "capacity") {
		return "Chitchat has too many live views open. Close a thread, or reload the page.";
	}
	return "Chitchat stopped reading its data. Reload the page to try again.";
}

/** `surfaceRaised` becomes `--bonobo-surface-raised`, the spelling the stylesheet reads. */
function theme_property_name(token: string) {
	return `--bonobo-${token.replace(/[A-Z]/gu, (letter) => `-${letter.toLowerCase()}`)}`;
}

/**
 * How many private scopes this page watches. Worst-case slot spend with a channel and a thread
 * open: channels 1 + scope list 1 + N scope reads + cursors 1 + recent feed 1 + three channel
 * windows + one thread watch = 8 + N, and the SDK allows 16 — so N is 8. The sidebar says when
 * scopes past this line exist instead of silently hiding them.
 */
const MAX_WATCHED_SCOPES = 8;

/** How long the page waits after new messages render before it moves the read cursor. */
const MARK_READ_DEBOUNCE_MS = 2000;

type ChannelDialogState =
	| { kind: "create" }
	| { kind: "rename"; channel: chat_Doc<chat_ChannelValue> }
	| { kind: "archive"; channel: chat_Doc<chat_ChannelValue> }
	| { kind: "people"; channel: chat_Doc<chat_ChannelValue> };

export function App(props: { client: BonoboUiFrontendClient }) {
	const { client } = props;
	const userId = client.context.userId;
	const memberNames = use_member_names(client);
	const [publicChannels, setPublicChannels] = useState<chat_Doc<chat_ChannelValue>[]>([]);
	/**
	 * The private ranges this member is in, and the channels found inside each one. A read with no
	 * key range answers only the public part of a collection, so a private channel is reached by its
	 * own read, one per scope, and the two lists are merged for the sidebar.
	 */
	const [scopes, setScopes] = useState<BonoboUiScope[]>([]);
	const [privateChannelsByScope, setPrivateChannelsByScope] = useState<
		Record<string, chat_Doc<chat_ChannelValue>[]>
	>({});
	const [channelsLoaded, setChannelsLoaded] = useState(false);
	const [channelsDeath, setChannelsDeath] = useState<{ reason?: string } | null>(null);
	const [channelsTruncated, setChannelsTruncated] = useState(false);
	/** The member's public cursor map doc, delivered live. Null until it exists or when it dies. */
	const [cursorDoc, setCursorDoc] = useState<chat_Doc<chat_CursorMapValue> | null>(null);
	/** The newest 100 public messages, newest first — the one feed behind unreads and Activity. */
	const [recentFeed, setRecentFeed] = useState<chat_Doc<chat_MessageValue>[]>([]);
	const [recentDead, setRecentDead] = useState(false);
	/** This member's own private read cursors, delivered by the per-scope channels reads. */
	const [privateCursorsByScope, setPrivateCursorsByScope] = useState<Record<string, chat_PrivateCursorDoc[]>>({});
	/** Holds either a channel key or a `view:*` key — views share the one selection. */
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	/**
	 * The open thread, held here rather than in `ChannelView`, because the icon rail collapses on the
	 * `.chitchat` root and only this component renders it.
	 */
	const [threadRootKey, setThreadRootKey] = useState<string | null>(null);
	const [railExpanded, setRailExpanded] = useState(false);
	const [dialog, setDialog] = useState<ChannelDialogState | null>(null);
	const [dialogBusy, setDialogBusy] = useState(false);
	const [dialogError, setDialogError] = useState<string | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [announcement, setAnnouncement] = useState({ sequence: 0, text: "" });
	/** What the live region currently holds. The effect below clears it, then sets it again. */
	const [spokenText, setSpokenText] = useState("");
	/**
	 * Whether the drawer is currently the narrow overlay. `inert` may only be applied then: at
	 * desktop widths the drawer is always open, and an unconditional `inert={!drawerOpen}` would put
	 * the whole channel list out of reach at every width.
	 */
	const [isNarrow, setIsNarrow] = useState(false);
	const navRef = useRef<HTMLElement | null>(null);
	const drawerToggleRef = useRef<HTMLButtonElement | null>(null);
	const railExpandRef = useRef<HTMLButtonElement | null>(null);
	/** The latest cursor doc, readable by write paths without a stale closure. */
	const cursorDocRef = useRef<chat_Doc<chat_CursorMapValue> | null>(null);
	/** The map a conflicted cursor write wanted; the retry effect merges it over the winner. */
	const cursorRetryRef = useRef<{ channels: Record<string, number>; attemptedRevision: number } | null>(null);
	const markReadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const pendingMarkReadRef = useRef<{ channel: chat_Doc<chat_ChannelValue>; at: number } | null>(null);

	// One sidebar: a private channel sits among the public ones rather than in a tray of its own.
	// Channel keys are client-generated, so the list sorts by name.
	const channels = [...publicChannels, ...Object.values(privateChannelsByScope).flat()].sort((a, b) =>
		a.value.name.localeCompare(b.value.name),
	);

	/** channelKey → this member's own private cursor, flattened from the per-scope deliveries. */
	const privateCursors = new Map(Object.values(privateCursorsByScope).flat().map((doc) => [doc.channelKey, doc]));

	// One fold serves the sidebar marks, the Unreads view and its aggregate row. Memoized so the
	// name-resolving effects that depend on it run only when the feed or the cursors change.
	const publicUnreads = useMemo(
		() =>
			chat_fold_public_unreads({
				docs: recentFeed,
				cursorChannels: cursorDoc?.value.channels ?? {},
				selfUserId: userId,
			}),
		[recentFeed, cursorDoc, userId],
	);

	/**
	 * Whether a channel row shows an unread mark. The selected channel never does: opening it is
	 * reading it, and the cursor writes below make that stick across a reload.
	 */
	const channel_has_unread = (channel: chat_Doc<chat_ChannelValue>) => {
		if (channel.key === selectedKey || channel.value.archivedAt !== null) {
			return false;
		}
		if (chat_channel_is_private(channel.key)) {
			const last = channel.value.lastMessageAt;
			return last !== undefined && last > (privateCursors.get(channel.key)?.at ?? 0);
		}
		return publicUnreads.has(channel.key);
	};

	/** Unread mentions of this member in a channel. Zero for private ones: a shared doc cannot say. */
	const channel_mention_count = (channel: chat_Doc<chat_ChannelValue>) => {
		return channel.key === selectedKey || channel.value.archivedAt !== null
			? 0
			: (publicUnreads.get(channel.key)?.mentionCount ?? 0);
	};

	const channelsSectionId = useId();
	const archivedSectionId = useId();

	const announce = useCallback((text: string) => {
		setAnnouncement((current) => ({ sequence: current.sequence + 1, text }));
	}, []);

	// Clear-then-set. The sequence number used to be rendered as text so that two identical
	// announcements differed, because a live region does not speak text it already holds — but
	// assistive tech read the digit out loud too ("1 Ana: hello"). Emptying the region and setting
	// the text again on the next frame makes the same difference without a spoken number. The
	// region itself stays mounted: a region added together with its text often announces nothing.
	useEffect(() => {
		if (announcement.text === "") {
			return;
		}
		setSpokenText("");
		const frame = requestAnimationFrame(() => setSpokenText(announcement.text));
		return () => cancelAnimationFrame(frame);
	}, [announcement]);

	// The drawer's overlay behaviour is a media-query state, and `inert` has to follow it.
	useEffect(() => {
		const query = window.matchMedia("(max-width: 719px)");
		setIsNarrow(query.matches);
		const handle_change = (event: MediaQueryListEvent) => setIsNarrow(event.matches);
		query.addEventListener("change", handle_change);
		return () => query.removeEventListener("change", handle_change);
	}, []);

	// The host resolves its own palette and sends finished colour values, so this page never guesses
	// at them. Write each role into its `--bonobo-*` property and put the mode on the document
	// element, which is where `chitchat.css` reads both. The frame is a separate document and never
	// sees the app's own theme class change, so the subscription is the only way to hear a switch.
	// A host that sends no theme leaves the properties unset and the stylesheet's dark block standing.
	useEffect(() => {
		const apply_theme = (theme: BonoboUiTheme) => {
			const root = document.documentElement;
			root.classList.toggle("theme-light", theme.mode === "light");
			for (const [token, value] of Object.entries(theme.tokens)) {
				root.style.setProperty(theme_property_name(token), value);
			}
		};

		const current = client.theme.current();
		if (current !== null) {
			apply_theme(current);
		}
		return client.theme.subscribe(apply_theme);
	}, [client]);

	// The public channels watch is the page's primary subscription: when the host kills it the
	// member lost access, and the whole page switches to the permission-lost state.
	useEffect(() => {
		const store = chat_create_window_store(chat_validate_channel_doc);
		const unsubscribe = client.data.watch({ collection: "channels", limit: 100 }, (update, info) => {
			if (update === null) {
				setChannelsDeath({ ...(info?.reason === undefined ? {} : { reason: info.reason }) });
				return;
			}
			setPublicChannels(store.apply_window(update.docs));
			setChannelsLoaded(true);
			// The read stops at 100 channels and this watch has no way to reach past that. Say so,
			// or a workspace with more channels shows a sidebar that looks complete and is not.
			setChannelsTruncated(update.truncated);
		});
		return unsubscribe;
	}, [client]);

	// Which private ranges this member is in. It is live, so being added to a private channel makes
	// it appear here, and being taken out makes it go away, without reloading the page.
	useEffect(() => {
		const unsubscribe = client.scopes.watchMine((list) => {
			setScopes(list ?? []);
		});
		return unsubscribe;
	}, [client]);

	// One channels read per private range, beside the public one above. A dead read means this
	// member was taken out of that range while the page was open, so its channels go with it.
	// Only the first MAX_WATCHED_SCOPES ranges get a read — the slot arithmetic on that constant —
	// and the sidebar renders one honest line when more exist.
	useEffect(() => {
		const unsubscribes = scopes.slice(0, MAX_WATCHED_SCOPES).map((scope) => {
			const store = chat_create_window_store(chat_validate_channel_doc);
			return client.data.watch(
				{ collection: "channels", keyPrefix: scope.keyPrefix, limit: 100 },
				(update) => {
					// The scope's range holds the channel doc AND the members' read-cursor docs
					// (`<channelKey>:read:<userId>`). Split them here: a cursor doc is not an
					// invalid channel, so it must not reach the channel store's dropped-doc warning.
					const channelDocs =
						update === null
							? []
							: update.docs.filter((raw) => {
									const key = (raw as { key?: unknown }).key;
									return !(typeof key === "string" && chat_parse_private_cursor_key(key) !== null);
								});
					setPrivateChannelsByScope((current) => {
						if (update === null) {
							const { [scope.scopeId]: _gone, ...rest } = current;
							return rest;
						}
						return { ...current, [scope.scopeId]: store.apply_window(channelDocs) };
					});
					setPrivateCursorsByScope((current) => {
						if (update === null) {
							const { [scope.scopeId]: _gone, ...rest } = current;
							return rest;
						}
						// Only this member's own cursors matter for unread state. `createdBy` is the
						// server-stamped owner; the key tail is not trusted.
						const mine = update.docs
							.map(chat_validate_private_cursor_doc)
							.filter((doc): doc is chat_PrivateCursorDoc => doc !== null && doc.createdBy === userId);
						return { ...current, [scope.scopeId]: mine };
					});
				},
			);
		});
		return () => {
			for (const unsubscribe of unsubscribes) {
				unsubscribe();
			}
		};
	}, [client, scopes, userId]);

	// The member's public read cursors, one map doc. This watch is also the conflict-retry read:
	// the SDK has no one-shot read, so the winner of a lost compare-and-set arrives here and the
	// retry effect below merges over it.
	useEffect(() => {
		const unsubscribe = client.data.watch(
			{ collection: "cursors", keyPrefix: chat_cursor_stored_key(userId), limit: 1 },
			(update) => {
				// A dead cursors watch does not take the page down: with no cursor map everything
				// recent shows unread, which is the honest degraded answer.
				if (update === null) {
					setCursorDoc(null);
					cursorDocRef.current = null;
					return;
				}
				const doc =
					update.docs
						.map(chat_validate_cursor_map_doc)
						.find((entry): entry is chat_Doc<chat_CursorMapValue> => entry !== null) ?? null;
				setCursorDoc(doc);
				cursorDocRef.current = doc;
			},
		);
		return unsubscribe;
	}, [client, userId]);

	// The newest 100 public messages, one bounded descending read. This single feed answers
	// unread detection, mention detection, the Activity view and the Unreads previews — zero
	// extra writes per message. The accepted horizon: a channel whose newest message fell out of
	// these 100 shows as read even when it is not.
	useEffect(() => {
		const store = chat_create_window_store(chat_validate_message_doc);
		const unsubscribe = client.data.watchRecent({ collection: "messages", limit: 100, order: "desc" }, (update) => {
			if (update === null) {
				setRecentDead(true);
				setRecentFeed([]);
				return;
			}
			setRecentDead(false);
			setRecentFeed(store.apply_window(update.docs));
		});
		return unsubscribe;
	}, [client]);

	// Pick the first active channel once channels load and nothing is selected yet. The setter is
	// functional on purpose: effects run after the render they belong to, so a click landing in
	// that gap (a view row, another channel) has already selected something by the time this
	// fires — and this default must never override a member's own pick.
	useEffect(() => {
		if (selectedKey === null) {
			const firstActive = channels.find((channel) => channel.value.archivedAt === null);
			if (firstActive !== undefined) {
				setSelectedKey((current) => current ?? firstActive.key);
			}
		}
	}, [channels, selectedKey]);

	// Focus moves into the drawer when it opens at narrow widths.
	useEffect(() => {
		if (drawerOpen) {
			navRef.current?.focus();
		}
	}, [drawerOpen]);

	const is_narrow = () => window.matchMedia("(max-width: 719px)").matches;

	/**
	 * Moves one public channel's read cursor forward in the member's map doc. Compare-and-set
	 * against the doc the watch delivered; on a lost race the wanted map is parked in
	 * `cursorRetryRef` and the retry effect below merges it over the winner. On success the doc
	 * is echoed locally (like a message edit) so the badge clears before the watch echoes back.
	 */
	const write_public_cursor = (channelKey: string, at: number) => {
		const base = cursorDocRef.current;
		const currentChannels = base?.value.channels ?? {};
		if ((currentChannels[channelKey] ?? 0) >= at) {
			return;
		}
		const value: chat_CursorMapValue = { channels: { ...currentChannels, [channelKey]: at } };
		const expectedRevision = base?.revision ?? 0;

		const apply_local = (revision: number, applied: chat_CursorMapValue) => {
			const now = Date.now();
			const stored: chat_Doc<chat_CursorMapValue> = {
				key: chat_cursor_stored_key(userId),
				value: applied,
				revision,
				createdBy: userId,
				updatedBy: userId,
				createdAt: base?.createdAt ?? now,
				updatedAt: now,
				timestamp: base?.timestamp ?? now,
			};
			cursorDocRef.current = stored;
			setCursorDoc(stored);
		};

		client.data
			.putOwned({ collection: "cursors", key: chat_CURSOR_CALLER_KEY, value, expectedRevision })
			.then((result) => {
				if ("_yay" in result) {
					apply_local(result._yay.revision, value);
					return;
				}
				if (result._nay.name === "conflict") {
					// The winner may already be here (the watch delivered while the write was in
					// flight); then retry now. Otherwise park the wanted map for the retry effect.
					const latest = cursorDocRef.current;
					if (latest !== null && latest.revision !== expectedRevision) {
						const merged = chat_merge_cursor_maps(latest.value, value);
						client.data
							.putOwned({
								collection: "cursors",
								key: chat_CURSOR_CALLER_KEY,
								value: merged,
								expectedRevision: latest.revision,
							})
							.then((retryResult) => {
								// One retry only: a second conflict waits for the next mark-read.
								if ("_yay" in retryResult) {
									apply_local(retryResult._yay.revision, merged);
								}
							})
							.catch(() => {});
						return;
					}
					cursorRetryRef.current = { channels: value.channels, attemptedRevision: expectedRevision };
					return;
				}
				// Any other refusal: the likeliest is the value-size ceiling (~290 entries). Drop
				// the entries for channels no longer in the sidebar and retry once.
				const sidebarKeys = new Set(channels.map((channel) => channel.key));
				const kept = Object.fromEntries(
					Object.entries(value.channels).filter(([key]) => key === channelKey || sidebarKeys.has(key)),
				);
				if (Object.keys(kept).length === Object.keys(value.channels).length) {
					console.warn("[chitchat] A read-cursor write was refused", { message: result._nay.message });
					return;
				}
				client.data
					.putOwned({ collection: "cursors", key: chat_CURSOR_CALLER_KEY, value: { channels: kept }, expectedRevision })
					.then((retryResult) => {
						if ("_yay" in retryResult) {
							apply_local(retryResult._yay.revision, { channels: kept });
						} else {
							console.warn("[chitchat] A read-cursor write was refused", { message: retryResult._nay.message });
						}
					})
					.catch(() => {});
			})
			.catch((error: unknown) => {
				console.warn("[chitchat] A read-cursor write failed", { message: chat_get_error_message(error) });
			});
	};

	/**
	 * Moves this member's read cursor for one private channel. The doc lives inside the scope's
	 * range, so a `p/` key never enters the public map. Only this member writes this doc, so a
	 * conflict is a race with this page's own concurrent write and the next mark-read heals it.
	 */
	const write_private_cursor = (channel: chat_Doc<chat_ChannelValue>, at: number) => {
		const existing = privateCursors.get(channel.key);
		if ((existing?.at ?? 0) >= at) {
			return;
		}
		client.data
			.putOwned({
				collection: "channels",
				key: chat_private_cursor_caller_key(channel.key),
				value: { at },
				expectedRevision: existing?.revision ?? 0,
			})
			.then((result) => {
				if ("_nay" in result && result._nay.name !== "conflict") {
					console.warn("[chitchat] A private read-cursor write was refused", { message: result._nay.message });
				}
			})
			.catch((error: unknown) => {
				console.warn("[chitchat] A private read-cursor write failed", { message: chat_get_error_message(error) });
			});
	};

	const mark_channel_read = (channel: chat_Doc<chat_ChannelValue>, at: number) => {
		if (chat_channel_is_private(channel.key)) {
			write_private_cursor(channel, at);
		} else {
			write_public_cursor(channel.key, at);
		}
	};

	/**
	 * The channel reports the newest message it rendered; the write is debounced so a burst of
	 * arrivals costs one cursor write, not one per message.
	 */
	const handle_newest_visible = (channel: chat_Doc<chat_ChannelValue>, timestamp: number) => {
		const pending = pendingMarkReadRef.current;
		pendingMarkReadRef.current =
			pending !== null && pending.channel.key === channel.key
				? { channel, at: Math.max(pending.at, timestamp) }
				: { channel, at: timestamp };
		if (markReadTimerRef.current === null) {
			markReadTimerRef.current = setTimeout(() => {
				markReadTimerRef.current = null;
				const entry = pendingMarkReadRef.current;
				pendingMarkReadRef.current = null;
				if (entry !== null) {
					mark_channel_read(entry.channel, entry.at);
				}
			}, MARK_READ_DEBOUNCE_MS);
		}
	};

	const handle_select_channel = (channel: chat_Doc<chat_ChannelValue>) => {
		setSelectedKey(channel.key);
		// `ChannelView` is keyed by channel and remounts, but this state does not. A key left over
		// from the old channel resolves to no message in the new one, so no panel renders while the
		// rail stays collapsed beside an empty column.
		setThreadRootKey(null);
		// Opening a channel reads it. Write only when something is unread, so channel switching
		// does not spend the write budget on channels that were already read.
		if (channel_has_unread(channel) || channel_mention_count(channel) > 0) {
			mark_channel_read(channel, Date.now());
		}
		// The switch is announced; focus stays on the invoked channel control (a11y contract C9).
		announce(`#${channel.value.name}`);
		// At narrow widths the drawer closes; the control the focus sat on disappears with
		// it, so focus moves to the drawer toggle to keep keyboard context.
		if (drawerOpen && is_narrow()) {
			setDrawerOpen(false);
			drawerToggleRef.current?.focus();
		}
	};

	const handle_select_view = (view: (typeof VIEWS)[number]) => {
		setSelectedKey(view.key);
		setThreadRootKey(null);
		announce(view.name);
		if (drawerOpen && is_narrow()) {
			setDrawerOpen(false);
			drawerToggleRef.current?.focus();
		}
	};

	/**
	 * A Threads-view row opens its channel and asks for the thread. `handle_select_channel`
	 * clears the thread key, so set it after — the later state write wins. If the root is
	 * outside the channel's loaded window, the channel opens without the panel.
	 */
	const handle_open_thread_from_view = (channel: chat_Doc<chat_ChannelValue>, rootKey: string) => {
		handle_select_channel(channel);
		setThreadRootKey(rootKey);
	};

	// The other half of the cursor compare-and-set: when a write lost the race, the watch
	// delivers the winner here. Merge per-key maxima over it and write once more, so neither
	// side's read state moves backwards. One retry — a second conflict waits for the next
	// mark-read to try again.
	useEffect(() => {
		const pending = cursorRetryRef.current;
		if (pending === null || cursorDoc === null || cursorDoc.revision === pending.attemptedRevision) {
			return;
		}
		cursorRetryRef.current = null;
		const merged = chat_merge_cursor_maps(cursorDoc.value, { channels: pending.channels });
		client.data
			.putOwned({
				collection: "cursors",
				key: chat_CURSOR_CALLER_KEY,
				value: merged,
				expectedRevision: cursorDoc.revision,
			})
			.then((result) => {
				if ("_nay" in result && result._nay.name !== "conflict") {
					console.warn("[chitchat] The read-cursor retry was refused", { message: result._nay.message });
				}
			})
			.catch(() => {});
	}, [cursorDoc, client]);

	// A pending debounced mark-read must not fire against an unmounted page.
	useEffect(() => {
		return () => {
			if (markReadTimerRef.current !== null) {
				clearTimeout(markReadTimerRef.current);
			}
		};
	}, []);

	const close_dialog = () => {
		setDialog(null);
		setDialogBusy(false);
		setDialogError(null);
	};

	const handle_create_channel = (name: string, topic: string, people: { isPrivate: boolean; userIds: string[] }) => {
		setDialogBusy(true);
		setDialogError(null);
		// Create through put with a client-generated key: put on an absent key creates a
		// SHARED doc, so any member can rename or archive the channel later.
		const key = chat_create_channel_key(people.isPrivate ? "private" : "public");

		(async (/* iife */) => {
			// The scope has to exist before the channel document does. A scope refuses a key range that
			// already holds documents, so writing the channel first would leave a channel nobody can
			// ever make private — and the channel's own name is the first thing the scope hides.
			if (people.isPrivate) {
				const scope = await client.scopes.create({
					scopeId: key,
					collections: chat_PRIVATE_CHANNEL_COLLECTIONS,
					keyPrefix: key,
				});
				if ("_nay" in scope) {
					setDialogBusy(false);
					setDialogError(scope._nay.message);
					return;
				}
				// One at a time and in order, so the first refusal is the one the member reads. A person
				// who cannot be added (they left the workspace, or they are already in 50 scopes) stops
				// the create rather than quietly missing from the channel.
				for (const userId of people.userIds) {
					const added = await client.scopes.setPrincipal({ scopeId: key, userId, level: "member" });
					if ("_nay" in added) {
						setDialogBusy(false);
						setDialogError(added._nay.message);
						return;
					}
				}
			}

			const result = await client.data.put({
				collection: "channels",
				key,
				value: { name, archivedAt: null, ...(topic === "" ? {} : { topic }) } satisfies chat_ChannelValue,
			});
			if ("_nay" in result) {
				setDialogBusy(false);
				setDialogError(result._nay.message);
				return;
			}
			// The sidebar shows the channel when the watch delivers it; select it now.
			// (0.8.0 put results carry only revision and byteSize, so use the local key.)
			setSelectedKey(key);
			close_dialog();
		})().catch((error: unknown) => {
			setDialogBusy(false);
			setDialogError(chat_get_error_message(error));
		});
	};

	const put_channel_value = (channel: chat_Doc<chat_ChannelValue>, value: chat_ChannelValue) => {
		setDialogBusy(true);
		setDialogError(null);
		client.data
			// expectedRevision makes the write compare-and-set: a concurrent rename or archive
			// from another member answers a conflict instead of being silently overwritten.
			.put({ collection: "channels", key: channel.key, value, expectedRevision: channel.revision })
			.then((result) => {
				if ("_nay" in result) {
					setDialogBusy(false);
					setDialogError(
						result._nay.name === "conflict"
							? "Someone else changed this channel while the dialog was open. Close it and try again."
							: result._nay.message,
					);
					return;
				}
				close_dialog();
			})
			.catch((error: unknown) => {
				setDialogBusy(false);
				setDialogError(chat_get_error_message(error));
			});
	};

	const handle_unarchive = (channel: chat_Doc<chat_ChannelValue>) => {
		client.data
			.put({
				collection: "channels",
				key: channel.key,
				value: { ...channel.value, archivedAt: null },
				expectedRevision: channel.revision,
			})
			.then((result) => {
				if ("_nay" in result) {
					announce(result._nay.message);
				}
			})
			.catch((error: unknown) => {
				announce(chat_get_error_message(error));
			});
	};

	if (channelsDeath !== null) {
		return (
			<div className="chitchat">
				<div className="page-dead" role="alert">
					<h1>Chitchat</h1>
					<p>{channels_death_message(channelsDeath.reason)}</p>
				</div>
			</div>
		);
	}

	// Two sections, both derived from data the page already holds. A channel appears in exactly one.
	const by_name = (a: chat_Doc<chat_ChannelValue>, b: chat_Doc<chat_ChannelValue>) =>
		a.value.name.localeCompare(b.value.name);
	const activeChannels = channels.filter((channel) => channel.value.archivedAt === null).sort(by_name);
	const archivedChannels = channels.filter((channel) => channel.value.archivedAt !== null).sort(by_name);
	const selected = channels.find((channel) => channel.key === selectedKey) ?? null;

	// The Unreads sidebar row aggregates what the channel rows show one by one.
	const unreadChannelCount = activeChannels.filter(channel_has_unread).length;
	const totalMentions = activeChannels.reduce((sum, channel) => sum + channel_mention_count(channel), 0);
	const unwatchedScopeCount = Math.max(0, scopes.length - MAX_WATCHED_SCOPES);

	const render_channel_section = (title: string, sectionChannels: chat_Doc<chat_ChannelValue>[], id: string) => {
		// A section with no channels renders nothing: an ordinary workspace has no archived channels,
		// and an empty heading over an empty list is a worse answer than no section.
		if (sectionChannels.length === 0) {
			return null;
		}

		return (
			<div className="channel-section">
				{/* Sibling in level of the channel title, under the page h1 outside this nav. */}
				<h2 id={id} className="channel-section-title">
					{title}
				</h2>
				<ul className="channel-list" aria-labelledby={id}>
					{sectionChannels.map((channel) => {
						const hasUnread = channel_has_unread(channel);
						const mentionCount = channel_mention_count(channel);
						return (
						<li key={channel.key} className="channel-item">
							<button
								type="button"
								className={hasUnread || mentionCount > 0 ? "channel-link is-unread" : "channel-link"}
								aria-current={channel.key === selectedKey ? "page" : undefined}
								onClick={() => handle_select_channel(channel)}
							>
								{/* The collapsed rail shows this initial; the full name below stays in the
								    accessibility tree at every width, so the button is never announced as one
								    letter. aria-hidden keeps the initial out of that name. */}
								<span className="channel-initial" aria-hidden="true">
									{channel.value.name.slice(0, 1).toUpperCase()}
								</span>
								<span className="channel-name">
									#{channel.value.name}
									{/* Said on the channels that are in the list, and nowhere else. A member who is
									    not in a private channel receives none of its documents, so it is absent from
									    this list entirely — there is deliberately no greyed-out row for it, because
									    a row is how a member learns the channel exists. */}
									{chat_channel_is_private(channel.key) ? " (private)" : ""}
									{channel.value.archivedAt !== null ? " (archived)" : ""}
								</span>
								{/* A mention count outranks the plain dot: the amber is design-brief decision
								    1's one meaning — unread and mention emphasis, never selection. */}
								{mentionCount > 0 ? (
									<span className="mention-badge">
										{mentionCount}
										<span className="visually-hidden"> unread mentions</span>
									</span>
								) : hasUnread ? (
									<>
										<span className="unread-dot" aria-hidden="true" />
										<span className="visually-hidden">unread</span>
									</>
								) : null}
							</button>
							<span className="channel-item-actions">
								{chat_channel_is_private(channel.key) ? (
									<button
										type="button"
										className="button channel-item-action"
										aria-label={`People in #${channel.value.name}`}
										onClick={() => setDialog({ kind: "people", channel })}
									>
										People
									</button>
								) : null}
								<button
									type="button"
									className="button channel-item-action"
									aria-label={`Rename #${channel.value.name}`}
									onClick={() => setDialog({ kind: "rename", channel })}
								>
									Rename
								</button>
								{channel.value.archivedAt === null ? (
									<button
										type="button"
										className="button channel-item-action"
										aria-label={`Archive #${channel.value.name}`}
										onClick={() => setDialog({ kind: "archive", channel })}
									>
										Archive
									</button>
								) : (
									<button
										type="button"
										className="button channel-item-action"
										aria-label={`Unarchive #${channel.value.name}`}
										onClick={() => handle_unarchive(channel)}
									>
										Unarchive
									</button>
								)}
							</span>
						</li>
						);
					})}
				</ul>
			</div>
		);
	};

	return (
		<div className={threadRootKey === null ? "chitchat" : "chitchat has-thread"}>
			{/* The page heading sits outside the <nav>, because the closed drawer marks its contents
			    inert and would otherwise take the document's only level-1 heading with it. The
			    <header> around it is what keeps it inside a landmark: a heading loose in the body
			    belongs to no region, and axe reports it. The drawer toggle belongs here too — it is
			    the app bar's own control, not part of the channel list it opens. */}
			<header className="app-bar">
				<h1 className="visually-hidden">Chitchat</h1>
				<button
					ref={drawerToggleRef}
					type="button"
					className="button drawer-toggle"
					aria-expanded={drawerOpen}
					onClick={() => setDrawerOpen((current) => !current)}
				>
					Channels
				</button>
			</header>
			<nav
				ref={navRef}
				className={`sidebar${drawerOpen ? " is-open" : ""}${railExpanded ? " is-expanded" : ""}`}
				aria-label="Channels"
				tabIndex={-1}
			>
				{/* One inert element, so the closed drawer's contents leave the accessibility tree
				    while the nav landmark itself stays. */}
				<div className="sidebar-inner" inert={isNarrow && !drawerOpen ? true : undefined}>
					<div className="sidebar-head">
						<p className="sidebar-title">Chitchat</p>
						<button
							ref={railExpandRef}
							type="button"
							className="button sidebar-expand"
							aria-expanded={railExpanded}
							aria-label={railExpanded ? "Collapse channel rail" : "Expand channel rail"}
							onClick={() => setRailExpanded((current) => !current)}
						>
							{railExpanded ? "«" : "»"}
						</button>
						<button type="button" className="button" onClick={() => setDialog({ kind: "create" })}>
							Create channel
						</button>
					</div>
					{channelsTruncated ? (
						<div className="channel-status" role="status">
							Only the first 100 channels are shown.
						</div>
					) : null}
					{unwatchedScopeCount > 0 ? (
						<div className="channel-status" role="status">
							{`This page can watch ${MAX_WATCHED_SCOPES} private channels at a time; ${unwatchedScopeCount} more ${unwatchedScopeCount === 1 ? "is" : "are"} hidden.`}
						</div>
					) : null}
					<ul className="view-list" aria-label="Views">
						{VIEWS.map((view) => (
							<li key={view.key} className="view-item">
								<button
									type="button"
									className={
										view.key === "view:unreads" && (unreadChannelCount > 0 || totalMentions > 0)
											? "channel-link view-link is-unread"
											: "channel-link view-link"
									}
									aria-current={selectedKey === view.key ? "page" : undefined}
									onClick={() => handle_select_view(view)}
								>
									<span className="channel-initial" aria-hidden="true">
										{view.name.slice(0, 1)}
									</span>
									<span className="channel-name">{view.name}</span>
									{view.key === "view:unreads" && totalMentions > 0 ? (
										<span className="mention-badge">
											{totalMentions}
											<span className="visually-hidden"> mentions of you</span>
										</span>
									) : view.key === "view:unreads" && unreadChannelCount > 0 ? (
										<>
											<span className="unread-dot" aria-hidden="true" />
											<span className="visually-hidden">unread</span>
										</>
									) : null}
								</button>
							</li>
						))}
					</ul>
					{!channelsLoaded ? (
						<div className="channel-status" role="status">
							Loading channels…
						</div>
					) : channels.length === 0 ? (
						<div className="channel-status">No channels yet</div>
					) : (
						<>
							{render_channel_section("Channels", activeChannels, channelsSectionId)}
							{render_channel_section("Archived", archivedChannels, archivedSectionId)}
						</>
					)}
				</div>
			</nav>
			<main className="main">
				{selectedKey === "view:unreads" ? (
					<UnreadsView
						channels={activeChannels}
						publicUnreads={publicUnreads}
						privateCursors={privateCursors}
						recentDead={recentDead}
						memberNames={memberNames}
						onSelectChannel={handle_select_channel}
					/>
				) : selectedKey === "view:threads" ? (
					<ThreadsView
						client={client}
						channels={activeChannels}
						memberNames={memberNames}
						onOpenThread={handle_open_thread_from_view}
					/>
				) : selectedKey === "view:activity" ? (
					<ActivityView
						feed={recentFeed}
						channels={activeChannels}
						selfUserId={userId}
						recentDead={recentDead}
						memberNames={memberNames}
						onSelectChannel={handle_select_channel}
					/>
				) : selected !== null ? (
					<ChannelView
						key={selected.key}
						client={client}
						userId={userId}
						channel={selected}
						memberNames={memberNames}
						announce={announce}
						threadRootKey={threadRootKey}
						setThreadRootKey={setThreadRootKey}
						isNarrow={isNarrow}
						onNewestVisible={(timestamp) => handle_newest_visible(selected, timestamp)}
					/>
				) : !channelsLoaded ? (
					<div className="channel-status" role="status">
						Loading channels…
					</div>
				) : channels.length === 0 ? (
					<div className="channel-status">
						<span>No channels yet — create the first one.</span>
					</div>
				) : (
					<div className="channel-status">Select a channel.</div>
				)}
			</main>
			{dialog !== null && dialog.kind === "create" ? (
				<ChannelNameDialog
					title="Create channel"
					submitLabel="Create"
					initialName=""
					initialTopic=""
					privacy={{ client, selfUserId: userId }}
					busy={dialogBusy}
					error={dialogError}
					onSubmit={handle_create_channel}
					onClose={close_dialog}
				/>
			) : null}
			{dialog !== null && dialog.kind === "people" ? (
				<ChannelPeopleDialog
					client={client}
					channel={dialog.channel}
					selfUserId={userId}
					memberNames={memberNames}
					onClose={close_dialog}
				/>
			) : null}
			{dialog !== null && dialog.kind === "rename" ? (
				<ChannelNameDialog
					title={`Rename #${dialog.channel.value.name}`}
					submitLabel="Rename"
					initialName={dialog.channel.value.name}
					initialTopic={dialog.channel.value.topic ?? ""}
					privacy={null}
					busy={dialogBusy}
					error={dialogError}
					onSubmit={(name, topic) =>
						put_channel_value(dialog.channel, {
							...dialog.channel.value,
							name,
							// An emptied topic is removed rather than stored as "", so a channel with no
							// topic reads the same whether it never had one or the member cleared it.
							...(topic === "" ? { topic: undefined } : { topic }),
						})
					}
					onClose={close_dialog}
				/>
			) : null}
			{dialog !== null && dialog.kind === "archive" ? (
				<ArchiveChannelDialog
					channelName={dialog.channel.value.name}
					busy={dialogBusy}
					error={dialogError}
					onConfirm={() => put_channel_value(dialog.channel, { ...dialog.channel.value, archivedAt: Date.now() })}
					onClose={close_dialog}
				/>
			) : null}
			{/* The single polite announcer. It is permanently mounted and fed ONLY with
			    remote-authored arrivals and channel switches — never the user's own sends. */}
			<div className="chitchat-announcer visually-hidden" role="status" aria-live="polite">
				<span data-announcement-sequence={String(announcement.sequence)} />
				{spokenText}
			</div>
		</div>
	);
}

// #endregion app
