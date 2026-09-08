import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { useConvex, useQueries, useQuery } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import {
	Component,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
	type ErrorInfo,
	type ReactNode,
} from "react";
import { api } from "../convex/_generated/api";
import type { Doc, Id } from "../convex/_generated/dataModel";
import { ChannelActionDialog, ChannelNameDialog, ChannelPeopleDialog } from "./channel-dialogs";
import { ChannelRowMenu } from "./channel-row-menu";
import { ChannelView, type chat_MemberNamesApi } from "./channel-view";
import { chat_format_recency } from "../shared/chat-display";
import { ChatPageControls, use_chat_page } from "./chat-pages";
import { use_chat_session } from "./session";
import { TranscriptStatus } from "./transcript-status";

// #region member names

function use_member_names(scopeKey: string, enabled: boolean): chat_MemberNamesApi {
	const convex = useConvex();
	const cache = useRef(new Map<string, { name: string | null; at: number; author: boolean }>());
	const pending = useRef(new Map<string, { promise: Promise<void>; author: boolean }>());
	const generation = useRef(0);
	const [, redraw] = useState(0);
	useEffect(() => {
		generation.current += 1;
		cache.current.clear();
		pending.current.clear();
	}, [scopeKey, enabled]);
	const resolve = useCallback(
		async (ids: string[], authorIds: string[] = []) => {
			if (!enabled) return;
			const expectedGeneration = generation.current;
			const authors = new Set(authorIds);
			for (const id of authorIds) {
				const existing = cache.current.get(id);
				if (existing) {
					cache.current.delete(id);
					cache.current.set(id, { ...existing, author: true });
				}
			}
			const missing = [...new Set(ids)]
				.slice(0, 1000)
				.filter((id) => !cache.current.has(id) || Date.now() - cache.current.get(id)!.at >= 300_000);
			const waits = new Set<Promise<void>>();
			const requested: string[] = [];
			for (const id of missing) {
				const inflight = pending.current.get(id);
				if (inflight) {
					if (authors.has(id)) inflight.author = true;
					waits.add(inflight.promise);
				} else requested.push(id);
			}
			for (let offset = 0; offset < requested.length; offset += 50) {
				const batch = requested.slice(offset, offset + 50);
				const request = convex
					.query(api.members.resolve, { userIds: batch })
					.then((names) => {
						if (generation.current !== expectedGeneration || !names) return;
						for (const id of batch) {
							const author = pending.current.get(id)?.author === true || cache.current.get(id)?.author === true;
							cache.current.delete(id);
							cache.current.set(id, { name: names[id] ?? null, at: Date.now(), author });
						}
						while (cache.current.size > 1000) {
							// Optional mention labels must not evict authors still visible in either pane.
							const oldest =
								[...cache.current].find(([, entry]) => !entry.author)?.[0] ?? cache.current.keys().next().value;
							if (oldest !== undefined) cache.current.delete(oldest);
						}
					})
					.catch(() => undefined)
					.finally(() => {
						if (generation.current === expectedGeneration) for (const id of batch) pending.current.delete(id);
					});
				for (const id of batch) pending.current.set(id, { promise: request, author: authors.has(id) });
				waits.add(request);
			}
			if (waits.size > 0) {
				await Promise.all(waits);
				if (generation.current === expectedGeneration) redraw((value) => value + 1);
			}
		},
		[convex, enabled],
	);
	useEffect(() => {
		if (!enabled) return;
		const timer = setInterval(() => {
			void resolve([...cache.current.keys()]);
		}, 60_000);
		return () => clearInterval(timer);
	}, [resolve, enabled]);
	return useMemo(() => ({ get: (id: string) => cache.current.get(id)?.name, resolve }), [resolve]);
}

// #endregion member names

// #region overview views

type OpenChannel = (channel: Doc<"channels">, rootId?: Id<"messages">) => void;

function member_name(names: chat_MemberNamesApi, userId: string) {
	const name = names.get(userId);
	return name === undefined ? "…" : (name ?? "Former member");
}

function UnreadsView(props: {
	scopeKey: string;
	enabled: boolean;
	memberNames: chat_MemberNamesApi;
	onOpen: OpenChannel;
}) {
	const publicPage = use_chat_page(`${props.scopeKey}:public`);
	const privatePage = use_chat_page(`${props.scopeKey}:private`);
	const publicRows = useQuery(
		api.views.unreads,
		props.enabled ? { visibility: "public", paginationOpts: { numItems: 50, cursor: publicPage.cursor } } : "skip",
	);
	const privateRows = useQuery(
		api.views.unreads,
		props.enabled ? { visibility: "private", paginationOpts: { numItems: 50, cursor: privatePage.cursor } } : "skip",
	);
	useEffect(() => {
		void props.memberNames.resolve(
			(publicRows?.page ?? []).flatMap((row) => (row.latest ? [row.latest.authorHostUserId] : [])),
		);
	}, [publicRows, props.memberNames]);
	const allRead =
		publicPage.number === 1 &&
		privatePage.number === 1 &&
		publicRows?.isDone &&
		privateRows?.isDone &&
		publicRows.page.length === 0 &&
		privateRows.page.length === 0;
	return (
		<section className="view" aria-label="Unreads">
			<header className="view-head">
				<h2 className="view-title">Unreads</h2>
			</header>
			<p className="view-note">Unread channels across this workspace. Private channels show their name only.</p>
			{allRead ? (
				<p className="channel-status">You are all caught up.</p>
			) : (
				<>
					{[
						{ label: "Public channels", page: publicPage, result: publicRows },
						{ label: "Private channels", page: privatePage, result: privateRows },
					].map(({ label, page, result }) => (
						<section key={label} className="view-group">
							<h3 className="view-group-title">{label}</h3>
							{!result ? (
								<p className="channel-status" role="status">
									Loading unreads…
								</p>
							) : result.page.length === 0 ? (
								<p className="channel-status">No unread channels on this page.</p>
							) : (
								<ul className="view-rows">
									{result.page.map((row) => (
										<li key={row.channel._id} className="view-row">
											<button type="button" className="view-row-button" onClick={() => props.onOpen(row.channel)}>
												<span className="view-row-title">
													#{row.channel.name}
													{row.mentionCount > 0 ? (
														<span className="mention-badge">
															{row.mentionCount >= 100 ? "99+" : row.mentionCount}
															<span className="visually-hidden"> mentions of you</span>
														</span>
													) : null}
												</span>
												<span className="view-row-time">{chat_format_recency(row.lastActivityAt, Date.now())}</span>
												{row.latest ? (
													<span className="view-row-preview">
														{member_name(props.memberNames, row.latest.authorHostUserId)}:{" "}
														{row.latest.text.slice(0, 160)}
													</span>
												) : null}
											</button>
										</li>
									))}
								</ul>
							)}
							<ChatPageControls page={page} result={result} label={label} />
						</section>
					))}
				</>
			)}
		</section>
	);
}

function ActivityView(props: {
	scopeKey: string;
	enabled: boolean;
	userId: string;
	memberNames: chat_MemberNamesApi;
	onOpen: OpenChannel;
}) {
	const page = use_chat_page(props.scopeKey);
	const rows = useQuery(
		api.views.activity,
		props.enabled ? { paginationOpts: { numItems: 50, cursor: page.cursor } } : "skip",
	);
	useEffect(() => {
		void props.memberNames.resolve((rows?.page ?? []).map((row) => row.message.authorHostUserId));
	}, [rows, props.memberNames]);
	const groups: { channel: Doc<"channels">; messages: Doc<"messages">[] }[] = [];
	for (const row of rows?.page ?? []) {
		const last = groups[groups.length - 1];
		if (last?.channel._id === row.channel._id) last.messages.push(row.message);
		else groups.push({ channel: row.channel, messages: [row.message] });
	}
	return (
		<section className="view" aria-label="Activity">
			<header className="view-head">
				<h2 className="view-title">Activity</h2>
			</header>
			<p className="view-note">Public messages, newest first. Private channels are not shown here.</p>
			{!rows ? (
				<p className="channel-status" role="status">
					Loading activity…
				</p>
			) : groups.length === 0 ? (
				<p className="channel-status">No public messages on this page.</p>
			) : (
				<div className="view-groups">
					{groups.map((group, index) => (
						<section key={`${group.channel._id}:${index}`} className="view-group">
							<h3 className="view-group-title">
								<button type="button" className="view-group-link" onClick={() => props.onOpen(group.channel)}>
									#{group.channel.name}
								</button>
							</h3>
							<ul className="view-rows">
								{group.messages.map((message) => (
									<li
										key={message._id}
										className={message.mentions.includes(props.userId) ? "view-row mention-self" : "view-row"}
									>
										<span className="view-row-title">{member_name(props.memberNames, message.authorHostUserId)}</span>
										<span className="view-row-time">{chat_format_recency(message.createdAt, Date.now())}</span>
										<span className="view-row-preview">{message.text.slice(0, 160)}</span>
									</li>
								))}
							</ul>
						</section>
					))}
				</div>
			)}
			<ChatPageControls page={page} result={rows} label="Activity" />
		</section>
	);
}

function ThreadsView(props: {
	scopeKey: string;
	enabled: boolean;
	memberNames: chat_MemberNamesApi;
	onOpen: OpenChannel;
}) {
	const page = use_chat_page(props.scopeKey);
	const rows = useQuery(
		api.views.threads,
		props.enabled ? { paginationOpts: { numItems: 50, cursor: page.cursor } } : "skip",
	);
	useEffect(() => {
		void props.memberNames.resolve((rows?.page ?? []).map((row) => row.latest.authorHostUserId));
	}, [rows, props.memberNames]);
	return (
		<section className="view" aria-label="Threads">
			<header className="view-head">
				<h2 className="view-title">Threads</h2>
			</header>
			<p className="view-note">Public threads with replies. Private channels are not shown here.</p>
			{!rows ? (
				<p className="channel-status" role="status">
					Loading threads…
				</p>
			) : rows.page.length === 0 ? (
				<p className="channel-status">No thread activity on this page.</p>
			) : (
				<ul className="view-rows">
					{rows.page.map((row) => (
						<li key={row.summary._id} className="view-row">
							<button
								type="button"
								className="view-row-button"
								onClick={() => props.onOpen(row.channel, row.summary.rootMessageId)}
							>
								<span className="view-row-title">#{row.channel.name}</span>
								<span className="view-row-time">{chat_format_recency(row.latest.createdAt, Date.now())}</span>
								<span className="view-row-preview">
									{row.summary.activeReplyCount} {row.summary.activeReplyCount === 1 ? "reply" : "replies"} ·{" "}
									{member_name(props.memberNames, row.latest.authorHostUserId)}: {row.latest.text.slice(0, 160)}
								</span>
							</button>
						</li>
					))}
				</ul>
			)}
			<ChatPageControls page={page} result={rows} label="Threads" />
		</section>
	);
}

// #endregion overview views

// #region sidebar

type ChannelDialog =
	| { kind: "create" }
	| { kind: "rename" | "people" | "archive" | "unarchive" | "leave" | "delete"; channel: Doc<"channels"> };
type ChannelRead = FunctionReturnType<typeof api.read_states.get_for_channel>;

function ChannelLink(props: {
	channel: Doc<"channels">;
	selected: boolean;
	blocked: boolean;
	enabled: boolean;
	unread: ChannelRead | Error | undefined;
	onOpen: OpenChannel;
	onDialog: (dialog: ChannelDialog) => void;
}) {
	const permissions = useQuery(api.channels.permissions, props.enabled ? { channelId: props.channel._id } : "skip");
	const unread = props.unread instanceof Error ? null : props.unread;
	const channel = props.channel;
	return (
		<li className="channel-item" data-channel-key={channel._id}>
			<button
				type="button"
				className={unread?.hasUnread || unread?.mentionCount ? "channel-link is-unread" : "channel-link"}
				aria-current={props.selected ? "page" : undefined}
				disabled={props.blocked}
				onClick={() => props.onOpen(channel)}
			>
				<span className="channel-initial" aria-hidden="true">
					{channel.name.slice(0, 1).toUpperCase()}
				</span>
				<span className="channel-name">
					#{channel.name}
					{channel.visibility === "private" ? " (private)" : ""}
					{channel.archivedAt !== null ? " (archived)" : ""}
				</span>
				{unread && unread.mentionCount > 0 ? (
					<span className="mention-badge">
						{unread.mentionCount >= 100 ? "99+" : unread.mentionCount}
						<span className="visually-hidden"> unread mentions</span>
					</span>
				) : unread?.hasUnread ? (
					<>
						<span className="unread-dot" aria-hidden="true" />
						<span className="visually-hidden">unread</span>
					</>
				) : null}
			</button>
			<span className="channel-item-actions">
				<ChannelRowMenu
					channelName={channel.name}
					items={[
						...(channel.visibility === "private"
							? [
									{
										id: "people",
										label: `People in #${channel.name}`,
										onSelect: () => props.onDialog({ kind: "people", channel }),
									},
								]
							: []),
						...(permissions?.canWrite
							? [
									{
										id: "rename",
										label: `Rename #${channel.name}`,
										onSelect: () => props.onDialog({ kind: "rename", channel }),
									},
									{
										id: "archive",
										label: `${channel.archivedAt === null ? "Archive" : "Unarchive"} #${channel.name}`,
										onSelect: () =>
											props.onDialog({ kind: channel.archivedAt === null ? "archive" : "unarchive", channel }),
									},
								]
							: []),
						...(channel.visibility === "private"
							? [
									{
										id: "leave",
										label: `Leave #${channel.name}`,
										danger: true,
										onSelect: () => props.onDialog({ kind: "leave", channel }),
									},
								]
							: []),
						...(channel.visibility === "private" && permissions?.canManage
							? [
									{
										id: "delete",
										label: `Delete #${channel.name} for everyone`,
										danger: true,
										onSelect: () => props.onDialog({ kind: "delete", channel }),
									},
								]
							: []),
					]}
				/>
			</span>
		</li>
	);
}

// #endregion sidebar

// #region app

export class ChatErrorBoundary extends Component<{ client: BonoboClient; children: ReactNode }, { failed: boolean }> {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("Chitchat could not render", { error: error.message, componentStack: info.componentStack });
	}
	render() {
		return this.state.failed ? (
			<main className="page-dead" role="alert">
				<h1>Chitchat</h1>
				<p>Chitchat could not load this view. Press is still available.</p>
				<button type="button" className="button" onClick={() => window.location.reload()}>
					Reload Chitchat
				</button>
			</main>
		) : (
			this.props.children
		);
	}
}

export function App(props: { client: BonoboClient }) {
	const convex = useConvex();
	const session = use_chat_session();
	const userId = props.client.context.userId;
	const scopeKey = `${session.member?.generation ?? "loading"}:${session.member?.membershipLifetime ?? 0}`;
	const memberNames = use_member_names(scopeKey, session.ready || session.refreshing);
	const publicPage = use_chat_page(`${scopeKey}:public`);
	const privatePage = use_chat_page(`${scopeKey}:private`);
	const archivedPage = use_chat_page(`${scopeKey}:archived`);
	const archivedPrivatePage = use_chat_page(`${scopeKey}:archived-private`);
	const [showArchived, setShowArchived] = useState(false);
	const publicChannels = useQuery(
		api.channels.list_public,
		session.ready ? { archived: false, paginationOpts: { numItems: 50, cursor: publicPage.cursor } } : "skip",
	);
	const privateChannels = useQuery(
		api.channels.list_mine,
		session.ready ? { archived: false, paginationOpts: { numItems: 50, cursor: privatePage.cursor } } : "skip",
	);
	const archivedPrivateChannels = useQuery(
		api.channels.list_mine,
		session.ready && showArchived
			? { archived: true, paginationOpts: { numItems: 50, cursor: archivedPrivatePage.cursor } }
			: "skip",
	);
	const archivedChannels = useQuery(
		api.channels.list_public,
		session.ready && showArchived
			? { archived: true, paginationOpts: { numItems: 50, cursor: archivedPage.cursor } }
			: "skip",
	);
	const [selection, setSelection] = useState<
		| { kind: "channel"; id: Id<"channels">; openedAtReadSequence: number }
		| { kind: "unreads" | "activity" | "threads" }
		| null
	>(null);
	const [threadRootId, setThreadRootId] = useState<Id<"messages"> | null>(null);
	const [dialog, setDialog] = useState<ChannelDialog | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [railExpanded, setRailExpanded] = useState(false);
	const [isNarrow, setIsNarrow] = useState(() => window.matchMedia("(max-width: 719px)").matches);
	const [sendRequests, setSendRequests] = useState(0);
	const [readRetry, setReadRetry] = useState(0);
	const readFailures = useRef(0);
	const [announcement, setAnnouncement] = useState({ sequence: 0, text: "" });
	const [desiredRead, setDesiredRead] = useState<{
		channelId: Id<"channels">;
		rootSequence: number;
		replySequence: number;
	} | null>(null);
	const selectedId = selection?.kind === "channel" ? selection.id : null;
	const selected = useQuery(api.channels.get, session.ready && selectedId ? { channelId: selectedId } : "skip");
	const selectedPermissions = useQuery(
		api.channels.permissions,
		session.ready && selectedId ? { channelId: selectedId } : "skip",
	);
	const [previousSelected, setPreviousSelected] = useState<Doc<"channels"> | null>(null);
	if (selected && selected !== previousSelected) setPreviousSelected(selected);
	if (
		((!session.ready && !session.refreshing) || selected === null) &&
		previousSelected !== null &&
		!session.refreshing
	)
		setPreviousSelected(null);
	const channel = session.refreshing && previousSelected?._id === selectedId ? previousSelected : (selected ?? null);
	const appRef = useRef<HTMLDivElement>(null);
	const navRef = useRef<HTMLElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);
	const focusOwner = useRef<"sidebar" | "drawer" | "separator" | null>(null);
	const pendingFocus = useRef<"drawer" | "thread" | "selected" | null>(null);
	const selectionRequest = useRef(0);
	const lastReadWrite = useRef<string | null>(null);
	useEffect(() => {
		// A late read must not reopen a channel from an expired membership.
		selectionRequest.current += 1;
	}, [session.ready, scopeKey]);
	const channelsTitleId = useId();
	const privateTitleId = useId();
	const archivedTitleId = useId();
	const archivedPrivateTitleId = useId();
	const allChannels = useMemo(
		() => [
			...(publicChannels?.page ?? []),
			...(privateChannels?.page ?? []),
			...(archivedChannels?.page ?? []),
			...(archivedPrivateChannels?.page ?? []),
		],
		[publicChannels, privateChannels, archivedChannels, archivedPrivateChannels],
	);
	const readQueries = useMemo(
		() =>
			Object.fromEntries(
				allChannels.map((entry) => [
					entry._id,
					{ query: api.read_states.get_for_channel, args: { channelId: entry._id } },
				]),
			),
		[allChannels],
	);
	const readAnswers = useQueries(readQueries);
	const unreadCount = allChannels.filter((entry) => {
		const read: ChannelRead | Error | undefined = readAnswers[entry._id];
		return entry.archivedAt === null && !(read instanceof Error) && read?.hasUnread;
	}).length;
	const partial =
		!publicChannels?.isDone || !privateChannels?.isDone || publicPage.number > 1 || privatePage.number > 1;
	const announce = useCallback(
		(text: string) => setAnnouncement((current) => ({ sequence: current.sequence + 1, text })),
		[],
	);
	const onRequestStart = useCallback(() => setSendRequests((count) => count + 1), []);
	const onRequestSettled = useCallback(() => setSendRequests((count) => Math.max(0, count - 1)), []);
	const onObservedRead = useCallback(
		(position: { rootSequence: number; replySequence: number }) => {
			if (!selectedId) return;
			setDesiredRead((current) =>
				current?.channelId === selectedId &&
				current.rootSequence >= position.rootSequence &&
				current.replySequence >= position.replySequence
					? current
					: {
							channelId: selectedId,
							rootSequence: Math.max(
								current?.channelId === selectedId ? current.rootSequence : 0,
								position.rootSequence,
							),
							replySequence: Math.max(
								current?.channelId === selectedId ? current.replySequence : 0,
								position.replySequence,
							),
						},
			);
		},
		[selectedId],
	);
	useEffect(() => {
		if (!desiredRead || desiredRead.channelId !== selected?._id || !session.connected || !session.can_request_now())
			return;
		const key = JSON.stringify(desiredRead);
		if (lastReadWrite.current === key) return;
		lastReadWrite.current = key;
		let cancelled = false;
		let retryTimer: ReturnType<typeof setTimeout> | undefined;
		const retry = () => {
			if (cancelled || lastReadWrite.current !== key) return;
			lastReadWrite.current = null;
			readFailures.current += 1;
			retryTimer = setTimeout(
				() => setReadRetry((value) => value + 1),
				Math.min(30_000, 1000 * 2 ** Math.min(readFailures.current - 1, 5)),
			);
		};
		void convex
			.mutation(api.read_states.mark_read, desiredRead)
			.then((result) => {
				if ("_nay" in result) retry();
				else readFailures.current = 0;
			})
			.catch(retry);
		return () => {
			cancelled = true;
			if (retryTimer) clearTimeout(retryTimer);
			if (lastReadWrite.current === key) lastReadWrite.current = null;
		};
	}, [convex, desiredRead, selected?._id, session.connected, session.can_request_now, readRetry]);

	const open_channel = useCallback(
		async (entry: Doc<"channels">, rootId?: Id<"messages">) => {
			if (sendRequests > 0 || !session.ready) return;
			const requestId = ++selectionRequest.current;
			try {
				const read = await convex.query(api.read_states.get_for_channel, { channelId: entry._id });
				if (requestId !== selectionRequest.current) return;
				setSelection({ kind: "channel", id: entry._id, openedAtReadSequence: read?.state?.rootSequence ?? 0 });
				setThreadRootId(rootId ?? null);
				setDrawerOpen(false);
				setRailExpanded(false);
				announce(`Opened #${entry.name}`);
			} catch {
				announce("Could not open this channel. Try again.");
			}
		},
		[convex, sendRequests, session.ready, announce],
	);
	const close_dialog = useCallback(() => {
		setDialog(null);
		pendingFocus.current = "selected";
	}, []);
	const finish_action = useCallback(() => {
		setDialog(null);
		setShowArchived(true);
		pendingFocus.current = "selected";
	}, []);

	useEffect(() => {
		const clearOutside = (event: FocusEvent) => {
			if (event.target instanceof Node && !appRef.current?.contains(event.target)) focusOwner.current = null;
		};
		const clearBlur = () => {
			focusOwner.current = null;
		};
		document.addEventListener("focusin", clearOutside);
		window.addEventListener("blur", clearBlur);
		return () => {
			document.removeEventListener("focusin", clearOutside);
			window.removeEventListener("blur", clearBlur);
		};
	}, []);
	useEffect(() => {
		const query = window.matchMedia("(max-width: 719px)");
		const change = (event: MediaQueryListEvent) => {
			pendingFocus.current = event.matches
				? threadRootId && (focusOwner.current === "sidebar" || focusOwner.current === "separator")
					? "thread"
					: focusOwner.current === "sidebar" && !drawerOpen
						? "drawer"
						: null
				: focusOwner.current === "drawer"
					? "selected"
					: null;
			setIsNarrow(event.matches);
		};
		query.addEventListener("change", change);
		return () => query.removeEventListener("change", change);
	}, [drawerOpen, threadRootId]);
	useLayoutEffect(() => {
		if (dialog !== null) return;
		const target = pendingFocus.current;
		pendingFocus.current = null;
		if (target === "thread" || (target === "drawer" && threadRootId)) {
			const thread = appRef.current?.querySelector<HTMLElement>(".thread");
			const back = thread?.querySelector<HTMLButtonElement>(".thread-head button:not([disabled])");
			if (back) back.focus();
			else if (thread) thread.focus();
			else toggleRef.current?.focus();
		} else if (target === "drawer" || (target === "selected" && isNarrow && !drawerOpen)) toggleRef.current?.focus();
		else if (target === "selected") {
			const selectedButton = navRef.current?.querySelector<HTMLButtonElement>('[aria-current="page"]');
			if (selectedButton && !selectedButton.disabled) selectedButton.focus();
			else navRef.current?.focus();
		}
	}, [dialog, isNarrow, threadRootId, drawerOpen]);

	const render_section = (title: string, id: string, entries: Doc<"channels">[]) =>
		entries.length === 0 ? null : (
			<div className="channel-section">
				<h2 id={id} className="channel-section-title">
					{title}
				</h2>
				<ul className="channel-list" aria-labelledby={id}>
					{entries.map((entry) => (
						<ChannelLink
							key={entry._id}
							channel={entry}
							selected={selectedId === entry._id}
							blocked={sendRequests > 0}
							enabled={session.ready}
							unread={readAnswers[entry._id]}
							onOpen={open_channel}
							onDialog={setDialog}
						/>
					))}
				</ul>
			</div>
		);
	return (
		<div
			ref={appRef}
			className="chitchat"
			onFocusCapture={(event) => {
				const target = event.target as HTMLElement;
				focusOwner.current =
					target === toggleRef.current
						? "drawer"
						: navRef.current?.contains(target)
							? "sidebar"
							: target.classList.contains("thread-resize")
								? "separator"
								: null;
			}}
		>
			<header className="app-bar">
				<h1 className="visually-hidden">Chitchat</h1>
				<button
					ref={toggleRef}
					type="button"
					className="button drawer-toggle"
					aria-expanded={drawerOpen}
					onClick={() => setDrawerOpen((open) => !open)}
				>
					Channels
				</button>
			</header>
			<nav
				ref={navRef}
				className={["sidebar", drawerOpen && "is-open", railExpanded && "is-expanded"].filter(Boolean).join(" ")}
				aria-label="Channels"
				tabIndex={-1}
				onKeyDown={(event) => {
					if (event.key === "Escape" && isNarrow && drawerOpen) {
						setDrawerOpen(false);
						toggleRef.current?.focus();
					}
				}}
			>
				<div className="sidebar-inner" inert={isNarrow && !drawerOpen ? true : undefined}>
					<div className="sidebar-head">
						<p className="sidebar-title">Chitchat</p>
						<button
							type="button"
							className="button sidebar-expand"
							aria-expanded={railExpanded}
							aria-label={railExpanded ? "Collapse channel rail" : "Expand channel rail"}
							onClick={() => setRailExpanded((expanded) => !expanded)}
						>
							{railExpanded ? "«" : "»"}
						</button>
						<button
							type="button"
							className="button sidebar-create"
							disabled={sendRequests > 0 || !session.canSend}
							onClick={() => setDialog({ kind: "create" })}
						>
							Create channel
						</button>
					</div>
					<ul className="view-list" aria-label="Views">
						{(["unreads", "threads", "activity"] as const).map((kind) => (
							<li key={kind} className="view-item">
								<button
									type="button"
									className={
										kind === "unreads" && unreadCount > 0
											? "channel-link view-link is-unread"
											: "channel-link view-link"
									}
									aria-current={selection?.kind === kind ? "page" : undefined}
									disabled={sendRequests > 0}
									onClick={() => {
										selectionRequest.current += 1;
										setSelection({ kind });
										setThreadRootId(null);
										setDrawerOpen(false);
										announce(`Opened ${kind}`);
									}}
								>
									<span className="channel-initial" aria-hidden="true">
										{kind[0].toUpperCase()}
									</span>
									<span className="channel-name">{kind[0].toUpperCase() + kind.slice(1)}</span>
									{kind === "unreads" && unreadCount > 0 ? (
										<span className="mention-badge">
											{unreadCount}
											{partial ? "+" : ""}
											<span className="visually-hidden"> unread channels shown</span>
										</span>
									) : null}
								</button>
							</li>
						))}
					</ul>
					{session.ready && publicChannels && privateChannels ? (
						<>
							{render_section("Channels", channelsTitleId, publicChannels.page)}
							<ChatPageControls page={publicPage} result={publicChannels} label="Public channels" />
							{render_section("Private channels", privateTitleId, privateChannels.page)}
							<ChatPageControls page={privatePage} result={privateChannels} label="Private channels" />
							{allChannels.length === 0 ? <p className="channel-status">No channels on this page</p> : null}
							<button
								type="button"
								className="button sidebar-archive-toggle"
								aria-expanded={showArchived}
								onClick={() => setShowArchived((show) => !show)}
							>
								{showArchived ? "Hide archived channels" : "Show archived channels"}
							</button>
							{showArchived ? (
								<>
									{render_section("Archived", archivedTitleId, archivedChannels?.page ?? [])}
									<ChatPageControls page={archivedPage} result={archivedChannels} label="Archived channels" />
									{render_section(
										"Archived private channels",
										archivedPrivateTitleId,
										archivedPrivateChannels?.page ?? [],
									)}
									<ChatPageControls
										page={archivedPrivatePage}
										result={archivedPrivateChannels}
										label="Archived private channels"
									/>
								</>
							) : null}
						</>
					) : (
						<p className="channel-status" role="status">
							{session.message ? "Channel access is unavailable." : "Loading channels…"}
						</p>
					)}
				</div>
			</nav>
			<main className="main" tabIndex={-1}>
				{selectedId ? (
					<TranscriptStatus key={`transcript:${selectedId}`} client={props.client} channelId={selectedId} />
				) : null}
				{session.message ? (
					<div className="connection-status" role="alert">
						{session.message}
						<button type="button" className="button" onClick={session.retry}>
							Reconnect
						</button>
					</div>
				) : null}
				{selection?.kind === "unreads" ? (
					<UnreadsView scopeKey={scopeKey} enabled={session.ready} memberNames={memberNames} onOpen={open_channel} />
				) : selection?.kind === "activity" ? (
					<ActivityView
						scopeKey={scopeKey}
						enabled={session.ready}
						userId={userId}
						memberNames={memberNames}
						onOpen={open_channel}
					/>
				) : selection?.kind === "threads" ? (
					<ThreadsView scopeKey={scopeKey} enabled={session.ready} memberNames={memberNames} onOpen={open_channel} />
				) : selection?.kind === "channel" ? (
					<ChannelView
						key={`channel:${selection.id}`}
						client={props.client}
						channelId={selection.id}
						channel={channel}
						userId={userId}
						memberNames={memberNames}
						announce={announce}
						threadRootId={threadRootId}
						setThreadRootId={setThreadRootId}
						isNarrow={isNarrow}
						canWrite={selectedPermissions?.canWrite ?? false}
						online={session.connected}
						openedAtReadSequence={selection.openedAtReadSequence}
						onObservedRead={onObservedRead}
						onRequestStart={onRequestStart}
						onRequestSettled={onRequestSettled}
						sendInFlight={sendRequests > 0}
					/>
				) : (
					<p className="channel-status">
						{!session.ready
							? "Connecting to Chitchat…"
							: allChannels.length === 0
								? partial
									? "No channels on this page. Use the page controls to continue."
									: "No channels yet — create the first one."
								: "Select a channel."}
					</p>
				)}
			</main>
			{dialog?.kind === "create" ? (
				<ChannelNameDialog
					channel={null}
					selfUserId={userId}
					onClose={close_dialog}
					onSaved={(id) => {
						close_dialog();
						setSelection({ kind: "channel", id, openedAtReadSequence: 0 });
						setThreadRootId(null);
					}}
				/>
			) : null}
			{dialog?.kind === "rename" ? (
				<ChannelNameDialog channel={dialog.channel} selfUserId={userId} onClose={close_dialog} onSaved={close_dialog} />
			) : null}
			{dialog?.kind === "people" ? (
				<ChannelPeopleDialog channelId={dialog.channel._id} selfUserId={userId} onClose={close_dialog} />
			) : null}
			{dialog && dialog.kind !== "create" && dialog.kind !== "rename" && dialog.kind !== "people" ? (
				<ChannelActionDialog
					channel={dialog.channel}
					action={dialog.kind}
					onClose={close_dialog}
					onDone={finish_action}
				/>
			) : null}
			<div className="chitchat-announcer visually-hidden" role="status" aria-live="polite">
				<span data-announcement-sequence={announcement.sequence} />
				{announcement.text}
			</div>
		</div>
	);
}

// #endregion app
