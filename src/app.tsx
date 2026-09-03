import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { useQueries, useQuery } from "convex/react";
import type { FunctionArgs, FunctionReturnType } from "convex/server";
import type { GenericId } from "convex/values";
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
	chat_member_label,
	chat_mention_roster_refusal_copy,
	chat_merge_cursor_maps,
	chat_message_channel_key,
	chat_private_channel_key_is_valid,
	chat_private_cursor_caller_key,
	chat_PRIVATE_CHANNEL_COLLECTIONS,
	chat_PRIVATE_CHANNEL_DISCLOSURE,
	chat_reply_root_key,
	chat_validate_channel_doc,
	chat_validate_cursor_map_doc,
	chat_validate_message_doc,
	chat_validate_private_cursor_doc,
	type chat_ChannelValue,
	type chat_CursorMapDoc,
	type chat_CursorMapValue,
	type chat_Doc,
	type chat_MessageValue,
	type chat_PrivateActivityCursor,
	type chat_PrivateCursorDoc,
	type chat_PublicUnread,
} from "./chat-data";
import { chat_create_window_store } from "./chat-store";
import { chat_list_members, type chat_Member, type chat_Scope, type chat_ScopePrincipal } from "./chat-doors";
import { chat_invoke_backend } from "./chat-invoke";
import { ChannelView, type chat_MemberNamesApi } from "./channel-view";
import { ChannelRowMenu } from "./channel-row-menu";
import { Dialog } from "./dialog";

type PluginDoors = BonoboClient["api"]["plugins_data"];

/** One change to who can read a private range, as the `user_manage_scope` door takes it. */
type ScopeAction = FunctionArgs<PluginDoors["user_manage_scope"]>["action"];

/** What one `watch_documents` read answers: a page of documents, or null when it was refused. */
type DocumentsRead = FunctionReturnType<PluginDoors["watch_documents"]>;

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

function use_member_names(client: BonoboClient): chat_MemberNamesApi {
	const namesRef = useRef(new Map<string, string | null>());
	const resolvedAtRef = useRef(new Map<string, number>());
	const inflightRef = useRef(new Map<string, Promise<void>>());
	// The value is never read; setting it re-renders consumers after names land.
	const [, setResolutionCount] = useState(0);

	const get = useCallback((userId: string) => {
		return namesRef.current.has(userId) ? namesRef.current.get(userId)! : undefined;
	}, []);

	const resolve = useCallback(
		async (userIds: GenericId<"users">[]) => {
			const now = Date.now();
			const missing: GenericId<"users">[] = [];
			const requests = new Set<Promise<void>>();
			for (const id of new Set(userIds)) {
				const request = inflightRef.current.get(id);
				if (request !== undefined) {
					// A second message from this author must wait for the lookup already in progress.
					requests.add(request);
					continue;
				}
				const resolvedAt = resolvedAtRef.current.get(id);
				if (resolvedAt === undefined || now - resolvedAt >= MEMBER_NAME_MAX_AGE_MS) {
					missing.push(id);
				}
			}
			// The server resolves at most 50 ids per request.
			for (let start = 0; start < missing.length; start += 50) {
				const batch = missing.slice(start, start + 50);
				const request = client.convex
					.query(client.api.plugins_data.resolve_member_display, { userIds: batch })
					.then((answer) => {
						// A null answer is a refusal. Every id in the batch then reads as a former member,
						// the same as an id the server does not know.
						const members = new Map<string, string | null>(Object.entries(answer?.members ?? {}));
						for (const id of batch) {
							namesRef.current.set(id, members.get(id) ?? null);
							resolvedAtRef.current.set(id, Date.now());
						}
					})
					.catch(() => {
						// Allow a later retry for this batch.
						for (const id of batch) {
							resolvedAtRef.current.delete(id);
						}
					});
				for (const id of batch) {
					inflightRef.current.set(id, request);
				}
				void request.then(() => {
					for (const id of batch) {
						if (inflightRef.current.get(id) === request) {
							inflightRef.current.delete(id);
						}
					}
				});
				requests.add(request);
			}
			if (requests.size === 0) {
				return;
			}
			await Promise.all(requests);
			setResolutionCount((current) => current + 1);
		},
		[client],
	);

	return useMemo(() => ({ get, resolve }), [get, resolve]);
}

/** One page of the workspace roster, for the pickers that add people to a private channel. */
type Roster = { members: chat_Member[]; error: string | null; truncated: boolean };

/**
 * Reads the first page of the roster once, when a dialog that needs it opens.
 *
 * One page only. A picker is a small list a person reads, so paging further would grow the dialog
 * past what anybody scrolls; the dialog says so instead of pretending the list is complete.
 */
function use_roster(client: BonoboClient): Roster | null {
	const [roster, setRoster] = useState<Roster | null>(null);

	useEffect(() => {
		let cancelled = false;
		// `chat_list_members` resolves every refusal and never rejects, so there is nothing to catch.
		chat_list_members(client, { limit: 100 }).then((result) => {
			if (cancelled) {
				return;
			}
			if ("_nay" in result) {
				setRoster({ members: [], error: chat_mention_roster_refusal_copy(result._nay.name), truncated: false });
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
	client: BonoboClient;
	selfUserId: GenericId<"users">;
	selected: string[];
	disabled?: boolean;
	onToggle: (userId: GenericId<"users">, selected: boolean) => void;
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
		.sort((a, b) => chat_member_label(a.displayName).localeCompare(chat_member_label(b.displayName)));
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
								disabled={props.disabled}
								onChange={(event) => props.onToggle(member.userId, event.currentTarget.checked)}
							/>
							{chat_member_label(member.displayName)}
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
	privacy: { client: BonoboClient; selfUserId: GenericId<"users"> } | null;
	busy: boolean;
	waiting: boolean;
	fieldsLocked: boolean;
	error: string | null;
	onSubmit: (name: string, topic: string, people: { isPrivate: boolean; userIds: GenericId<"users">[] }) => void;
	onClose: () => void;
}) {
	const titleId = useId();
	const inputId = useId();
	const topicId = useId();
	const privateId = useId();
	const [name, setName] = useState(props.initialName);
	const [topic, setTopic] = useState(props.initialTopic);
	const [isPrivate, setIsPrivate] = useState(false);
	const [invited, setInvited] = useState<GenericId<"users">[]>([]);
	const [validationError, setValidationError] = useState<string | null>(null);
	const fieldsLocked = props.busy || props.fieldsLocked;

	const handle_submit = () => {
		if (props.busy || props.waiting) {
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
	const handle_close = () => {
		// Keep the dialog mounted until the active write finishes.
		if (!props.busy) {
			props.onClose();
		}
	};

	return (
		<Dialog labelledBy={titleId} onClose={handle_close}>
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
					disabled={fieldsLocked}
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
					disabled={fieldsLocked}
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
							disabled={fieldsLocked}
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
								disabled={fieldsLocked}
								onToggle={(userId, selected) =>
									setInvited((current) => (selected ? [...current, userId] : current.filter((id) => id !== userId)))
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
				<button type="button" className="button" disabled={props.busy} onClick={handle_close}>
					Cancel
				</button>
				<button
					type="button"
					className="button button-primary"
					disabled={props.busy || props.waiting}
					onClick={handle_submit}
				>
					{props.busy ? "Saving…" : props.waiting ? "Checking…" : props.fieldsLocked ? "Retry" : props.submitLabel}
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
	client: BonoboClient;
	channel: chat_Doc<chat_ChannelValue>;
	selfUserId: GenericId<"users">;
	memberNames: chat_MemberNamesApi;
	onClose: () => void;
}) {
	const titleId = useId();
	const [principals, setPrincipals] = useState<chat_ScopePrincipal[] | null | undefined>(undefined);
	const [loaded, setLoaded] = useState(false);
	const [principalReadError, setPrincipalReadError] = useState<string | null>(null);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const busyRef = useRef(false);
	const mountedRef = useRef(true);
	const readGenerationRef = useRef(0);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
			readGenerationRef.current += 1;
		};
	}, []);

	const reload = useCallback(() => {
		const generation = (readGenerationRef.current += 1);
		setLoaded(false);
		setPrincipalReadError(null);
		return Promise.resolve()
			.then(() =>
				props.client.convex.query(props.client.api.plugins_data.watch_scope_principals, {
					scopeId: props.channel.key,
				}),
			)
			.then((rawResult) => {
				if (!mountedRef.current || readGenerationRef.current !== generation) {
					return { kind: "cancelled" } as const;
				}
				const result = private_scope_principal_result(rawResult);
				setLoaded(true);
				if (result === null) {
					setPrincipals(undefined);
					setPrincipalReadError("The people list response was invalid.");
					return { kind: "unavailable" } as const;
				}
				setPrincipals(result._yay);
				if (result._yay !== null) {
					props.memberNames.resolve(result._yay.map((principal) => principal.userId));
				}
				return { kind: "exact", principals: result._yay } as const;
			})
			.catch(() => {
				if (!mountedRef.current || readGenerationRef.current !== generation) {
					return { kind: "cancelled" } as const;
				}
				setLoaded(true);
				setPrincipals(undefined);
				setPrincipalReadError("Failed to read who can access this");
				return { kind: "unavailable" } as const;
			});
	}, [props.client, props.channel.key, props.memberNames]);

	useEffect(() => {
		void reload();
	}, [reload]);

	const change = (action: ScopeAction) => {
		if (busyRef.current) {
			return;
		}
		busyRef.current = true;
		setBusy(true);
		setError(null);
		props.client.convex
			.mutation(props.client.api.plugins_data.user_manage_scope, { action })
			.then((result) => {
				if (result._nay) {
					setError(result._nay.message);
					return;
				}
				return reload().then(() => undefined);
			})
			.catch(() => {
				// The call was rejected, so the change may still have reached the server. Reload
				// before showing access as current.
				return reload().then((current) => {
					if (current.kind === "cancelled") {
						return;
					}
					setError(
						current.kind === "unavailable"
							? "We could not confirm the change, and the current people list could not be loaded."
							: current.principals === null
								? "We could not confirm the change, and this people list is no longer readable."
								: "We could not confirm the change. The current people list is shown.",
					);
				});
			})
			.finally(() => {
				busyRef.current = false;
				setBusy(false);
			});
	};

	const inScope = new Set((principals ?? []).map((principal) => principal.userId));
	// Only somebody holding `manage` may change the list. The server refuses either way; the dialog
	// hides the controls so nobody is offered a button that always fails.
	const canManage = (principals ?? []).some(
		(principal) => principal.userId === props.selfUserId && principal.level === "manage",
	);
	const handle_close = () => {
		// Do not make a membership change look cancelled while the host is still applying it.
		if (!busy) {
			props.onClose();
		}
	};

	return (
		<Dialog labelledBy={titleId} onClose={handle_close}>
			<h2 id={titleId} className="dialog-title">
				People in #{props.channel.value.name}
			</h2>
			<p className="field-note">{chat_PRIVATE_CHANNEL_DISCLOSURE}</p>
			{!loaded ? (
				<p className="channel-status" role="status">
					Loading people…
				</p>
			) : principalReadError !== null ? (
				<p className="form-error" role="alert">
					{principalReadError}
				</p>
			) : principals === undefined ? (
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
										change({
											kind: "remove_principal",
											scopeId: props.channel.key,
											userId: principal.userId,
										})
									}
								>
									Remove
								</button>
							) : null}
						</li>
					))}
				</ul>
			)}
			{loaded && principals !== undefined && principals !== null && canManage ? (
				<div className="field">
					{/* Not a <label>: it names a group of checkboxes, and a label with no control of its
					    own is a control assistive tech announces and nobody can operate. */}
					<p className="field-label">Add people</p>
					<MemberPicker
						client={props.client}
						selfUserId={props.selfUserId}
						selected={[...inScope]}
						disabled={busy}
						onToggle={(userId, selected) =>
							change(
								selected
									? {
											kind: "set_principal",
											scopeId: props.channel.key,
											userId,
											level: "member",
										}
									: { kind: "remove_principal", scopeId: props.channel.key, userId },
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
				{loaded && principalReadError !== null ? (
					<button type="button" className="button" data-dialog-initial disabled={busy} onClick={() => void reload()}>
						Retry
					</button>
				) : null}
				<button
					type="button"
					className="button"
					data-dialog-initial={principalReadError === null ? true : undefined}
					disabled={busy}
					onClick={handle_close}
				>
					Close
				</button>
			</div>
		</Dialog>
	);
}

function ArchiveChannelDialog(props: {
	channelName: string;
	busy: boolean;
	retry: boolean;
	error: string | null;
	onConfirm: () => void;
	onClose: () => void;
}) {
	const titleId = useId();
	const handle_close = () => {
		// Keep the result dialog mounted until the archive write finishes.
		if (!props.busy) {
			props.onClose();
		}
	};
	return (
		<Dialog labelledBy={titleId} onClose={handle_close}>
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
				<button type="button" className="button" data-dialog-initial disabled={props.busy} onClick={handle_close}>
					Cancel
				</button>
				<button type="button" className="button button-danger" disabled={props.busy} onClick={props.onConfirm}>
					{props.busy ? "Archiving…" : props.retry ? "Retry" : "Archive channel"}
				</button>
			</div>
		</Dialog>
	);
}

function ExitChannelDialog(props: {
	client: BonoboClient;
	channel: chat_Doc<chat_ChannelValue>;
	action: "leave" | "delete";
	busy: boolean;
	waiting: boolean;
	error: string | null;
	onConfirm: (expectedPrincipalCount: number | undefined) => void;
	onClose: () => void;
}) {
	const titleId = useId();
	const [principalCount, setPrincipalCount] = useState<number | null | undefined>(undefined);
	const [principalReadError, setPrincipalReadError] = useState<string | null>(null);
	const [readAttempt, setReadAttempt] = useState(0);

	useEffect(() => {
		let cancelled = false;
		setPrincipalCount(undefined);
		setPrincipalReadError(null);
		Promise.resolve()
			.then(() =>
				props.client.convex.query(props.client.api.plugins_data.watch_scope_principals, {
					scopeId: props.channel.key,
				}),
			)
			.then((rawResult) => {
				if (cancelled) {
					return;
				}
				const result = private_scope_principal_result(rawResult);
				if (result === null) {
					setPrincipalReadError("The people list response was invalid.");
					return;
				}
				setPrincipalCount(result._yay?.length ?? null);
			})
			.catch(() => {
				if (!cancelled) {
					setPrincipalReadError("Failed to read who can access this");
				}
			});
		return () => {
			cancelled = true;
		};
	}, [props.client, props.channel.key, readAttempt]);

	const deleting = props.action === "delete" || principalCount === 1;
	const handle_close = () => {
		// Keep the result dialog mounted while the host call decides whether the channel still exists.
		if (!props.busy) {
			props.onClose();
		}
	};
	const body =
		principalCount === undefined
			? ""
			: props.action === "delete"
				? principalCount === null
					? "We could not read how many people are in this channel. Deleting it will remove the channel for everyone who is in it. Nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files. This cannot be undone."
					: `${principalCount === 1 ? "This deletes the channel for the one person in it." : `This deletes the channel for all ${principalCount} people in it.`} Nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files. This cannot be undone.`
				: principalCount === null
					? "We could not read who else is in this channel. If other people remain, they keep the channel and somebody who can add people has to add you back. If you are the only person left, leaving deletes it. Then nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files."
					: principalCount === 1
						? "You are the only person in this channel, so leaving deletes it. Nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files. This cannot be undone."
						: `You stop seeing this channel and its messages here. If you are not the organization owner, you also lose access to its files. ${principalCount === 2 ? "The other person keeps it." : `The other ${principalCount - 1} people keep it.`} Somebody who can add people has to add you back.`;

	return (
		<Dialog labelledBy={titleId} onClose={handle_close}>
			<h2 id={titleId} className="dialog-title">
				{props.action === "delete"
					? `Delete #${props.channel.value.name} for everyone?`
					: `Leave #${props.channel.value.name}?`}
			</h2>
			{principalReadError !== null ? (
				<p className="form-error" role="alert">
					{principalReadError}
				</p>
			) : principalCount === undefined ? (
				<p role="status">Reading who is in this channel…</p>
			) : (
				<p>{body}</p>
			)}
			{props.error !== null ? (
				<p className="form-error" role="alert">
					{props.error}
				</p>
			) : null}
			<div className="dialog-actions">
				<button
					type="button"
					className="button"
					data-dialog-initial={principalReadError === null ? true : undefined}
					disabled={props.busy}
					onClick={handle_close}
				>
					Cancel
				</button>
				{principalReadError !== null ? (
					<button
						type="button"
						className="button"
						data-dialog-initial
						disabled={props.busy}
						onClick={() => setReadAttempt((current) => current + 1)}
					>
						Retry
					</button>
				) : null}
				<button
					type="button"
					className="button button-danger"
					disabled={props.busy || props.waiting || principalCount === undefined || principalReadError !== null}
					onClick={() => props.onConfirm(principalCount ?? undefined)}
				>
					{props.waiting
						? "Checking…"
						: props.busy
							? deleting
								? "Deleting…"
								: "Leaving…"
							: props.action === "delete"
								? "Delete channel"
								: principalCount === 1
									? "Leave and delete channel"
									: "Leave channel"}
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
	privateActivity: Map<string, PrivateChannelActivity>;
	recentDead: boolean;
	memberNames: chat_MemberNamesApi;
	onSelectChannel: (channel: chat_Doc<chat_ChannelValue>) => void;
}) {
	const rows: UnreadRow[] = [];
	for (const channel of props.channels) {
		// A closed private channel can only say "something is newer than your cursor", so its row
		// has no preview and no mention count.
		if (chat_channel_is_private(channel.key)) {
			const last = props.privateActivity.get(channel.key);
			const cursor = props.privateCursors.get(channel.key)?.activity ?? EMPTY_PRIVATE_ACTIVITY;
			if (last !== undefined && !private_activity_covers(cursor, last.activity)) {
				rows.push({ channel, at: last.at, mentionCount: 0, preview: null });
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
					The recent-messages feed stopped, so unread state for public channels is not updating. Reload the page to try
					again.
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
	selfUserId: GenericId<"users">;
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
					The recent-messages feed stopped, so this view is not updating. Reload the page to try again.
				</div>
			) : null}
			{groups.length === 0 ? (
				<div className="channel-status">No public messages yet.</div>
			) : (
				<div className="view-groups">
					{groups.map((group, index) => (
						<section key={`${group.channel.key}:${index}`} className="view-group">
							<h3 className="view-group-title">
								<button type="button" className="view-group-link" onClick={() => props.onSelectChannel(group.channel)}>
									#{group.channel.value.name}
								</button>
							</h3>
							<ul className="view-rows">
								{group.messages.map((doc) => (
									<li
										key={doc.key}
										className={doc.value.mentions?.includes(props.selfUserId) ? "view-row mention-self" : "view-row"}
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
	client: BonoboClient;
	channels: chat_Doc<chat_ChannelValue>[];
	memberNames: chat_MemberNamesApi;
	onOpenThread: (channel: chat_Doc<chat_ChannelValue>, rootKey: string) => void;
}) {
	// The replies feed lives only while this view is mounted: the hook starts the read on mount
	// and ends it on unmount.
	const repliesRead = useQuery(props.client.api.plugins_data.watch_recent, {
		collection: "replies",
		limit: 100,
		order: "desc",
	});
	const replies = useMemo(
		() =>
			repliesRead === undefined || repliesRead === null
				? []
				: chat_create_window_store(chat_validate_message_doc).apply_window(repliesRead.docs),
		[repliesRead],
	);
	const loaded = repliesRead !== undefined;
	const dead = repliesRead === null;

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
				The newest public reply activity; counts read the newest 100 replies. Private channels are not shown here.
			</p>
			{dead ? (
				<div className="channel-status is-error" role="alert">
					The replies feed stopped, so this view is not updating. Reload the page to try again.
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
 * What the page says when its channels read is refused. A null answer means the session ran out
 * or the member lost access, and only the clock tells the two apart. They are not
 * interchangeable: a member whose plugin was uninstalled cannot fix anything by signing in again,
 * and a member whose session ran out only has to reload.
 */
function channels_death_message(client: BonoboClient): string {
	if (Date.now() >= client.session.expiresAt()) {
		return "This Chitchat session expired. Reload the page to continue.";
	}
	// Deliberately names no cause. The commonest trigger is an uninstall or a revoked
	// installation, and telling a member their permissions changed sends them to an admin over
	// something no permission of theirs caused.
	return "Chitchat can no longer read its data. Reload the page to try again.";
}

/**
 * What the page shows when a live read throws. The plugin doors throw only for a caller with no
 * identity, so after boot a throw means the session ran out, unless the clock says it has not. Then
 * the read itself failed, and the member still has to reload: a plugin frame cannot mint a new
 * session by itself.
 */
type ChatErrorBoundary_Props = { client: BonoboClient; children: ReactNode };

export class ChatErrorBoundary extends Component<ChatErrorBoundary_Props, { failed: boolean }> {
	state = { failed: false };

	static getDerivedStateFromError() {
		return { failed: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("[chitchat] A live read failed", { message: error.message, componentStack: info.componentStack });
	}

	render() {
		if (!this.state.failed) {
			return this.props.children;
		}
		return (
			<div className="chitchat">
				<div className="page-dead" role="alert">
					<h1>Chitchat</h1>
					<p>
						{Date.now() >= this.props.client.session.expiresAt()
							? "This Chitchat session expired. Reload the page to continue."
							: "Chitchat could not read its data. Check your connection and reload the page."}
					</p>
				</div>
			</div>
		);
	}
}

/**
 * How many private scopes this page reads at once. Each one is its own live query, so this is a
 * courtesy to the server, not a hard limit. The sidebar says when scopes past this line exist
 * instead of silently hiding them.
 */
const MAX_WATCHED_SCOPES = 8;

/** How long the page waits after new messages render before it moves the read cursor. */
const MARK_READ_DEBOUNCE_MS = 2000;

/** Retry uncertain cursor writes without spinning while the data connection is down. */
const CURSOR_RETRY_INITIAL_MS = 250;
const CURSOR_RETRY_MAX_MS = 4000;

/** Retry a private-create proof without spinning while the data connection is down. */
const PRIVATE_CREATE_RETRY_INITIAL_MS = 250;
const PRIVATE_CREATE_RETRY_MAX_MS = 4000;

const PRIVATE_CREATE_READ_ABSENT_MESSAGE =
	"Chitchat cannot confirm whether this private channel was created because no channel is readable at its saved key. Retry checks the same key, or Cancel.";
const PRIVATE_CREATE_PRINCIPAL_MISSING_MESSAGE =
	"This private channel exists, but you are not in its current access list. Retry checks the same key, or Cancel.";

/** Retry an uncertain Leave or Delete proof without spinning while the data connection is down. */
const EXIT_READ_RETRY_INITIAL_MS = 250;
const EXIT_READ_RETRY_MAX_MS = 4000;

const MESSAGE_CHANGE_IN_FLIGHT_NAVIGATION_MESSAGE =
	"Wait for pending message changes to finish before leaving this channel or thread.";

type PrivateChannelScope = chat_Scope;

type PrivateScopeWatchDescriptor = Pick<PrivateChannelScope, "scopeId" | "keyPrefix" | "collections">;

/** Accept only ranges made by Chitchat's one private-channel transaction. */
function private_channel_scope_is_valid(scope: chat_Scope) {
	return (
		chat_private_channel_key_is_valid(scope.scopeId) &&
		scope.keyPrefix === scope.scopeId &&
		scope.collections.length === chat_PRIVATE_CHANNEL_COLLECTIONS.length &&
		chat_PRIVATE_CHANNEL_COLLECTIONS.every((collection) => scope.collections.includes(collection)) &&
		Number.isSafeInteger(scope.membershipRevision) &&
		scope.membershipRevision >= 0 &&
		scope.appendActivity.every(
			(entry) =>
				Number.isSafeInteger(entry.at) &&
				entry.at >= 0 &&
				Number.isSafeInteger(entry.sequence) &&
				entry.sequence >= 0 &&
				entry.createdByUserId !== "",
		)
	);
}

/** Treat the principal query as outside data before it proves the current member's grant. */
function private_scope_principals_are_valid(value: unknown): value is chat_ScopePrincipal[] {
	return (
		Array.isArray(value) &&
		value.every(
			(principal: unknown) =>
				typeof principal === "object" &&
				principal !== null &&
				"userId" in principal &&
				typeof principal.userId === "string" &&
				principal.userId !== "" &&
				"level" in principal &&
				(principal.level === "member" || principal.level === "manage"),
		)
	);
}

/** Keep exact null separate from a malformed principal read. */
function private_scope_principal_result(value: unknown): { _yay: chat_ScopePrincipal[] | null } | null {
	return value === null || private_scope_principals_are_valid(value) ? { _yay: value } : null;
}

/**
 * Use only message and reply appends for private unread state. Reactions, channel docs, and
 * unknown collections do not mean that the chat has new text.
 */
type PrivateChannelActivity = {
	at: number;
	activity: chat_PrivateActivityCursor;
};

const EMPTY_PRIVATE_ACTIVITY: chat_PrivateActivityCursor = { messages: 0, replies: 0 };

function private_activity_max(
	left: chat_PrivateActivityCursor,
	right: chat_PrivateActivityCursor,
): chat_PrivateActivityCursor {
	return {
		messages: Math.max(left.messages, right.messages),
		replies: Math.max(left.replies, right.replies),
	};
}

function private_activity_covers(current: chat_PrivateActivityCursor, wanted: chat_PrivateActivityCursor) {
	return current.messages >= wanted.messages && current.replies >= wanted.replies;
}

function private_scope_activity(scope: PrivateChannelScope): PrivateChannelActivity {
	let at = 0;
	let cursor = EMPTY_PRIVATE_ACTIVITY;
	for (const entry of scope.appendActivity) {
		if (entry.collection === "messages") {
			at = Math.max(at, entry.at);
			cursor = private_activity_max(cursor, { messages: entry.sequence, replies: 0 });
		} else if (entry.collection === "replies") {
			at = Math.max(at, entry.at);
			cursor = private_activity_max(cursor, { messages: 0, replies: entry.sequence });
		}
	}
	return { at, activity: cursor };
}

type PrivateCursorWrite = {
	channelKey: string;
	pendingAt: number;
	pendingActivity: chat_PrivateActivityCursor;
	storedAt: number;
	storedActivity: chat_PrivateActivityCursor;
	revision: number;
	running: boolean;
	waitingForRefresh: boolean;
	retryDelayMs: number;
	retryTimer: ReturnType<typeof setTimeout> | null;
	cancelled: boolean;
};

type PendingReadMark = {
	channel: chat_Doc<chat_ChannelValue>;
	at: number;
	activity: chat_PrivateActivityCursor | null;
};

function cancel_private_cursor(write: PrivateCursorWrite) {
	write.cancelled = true;
	if (write.retryTimer !== null) {
		clearTimeout(write.retryTimer);
	}
}

function sync_private_cursor(write: PrivateCursorWrite, cursor: chat_PrivateCursorDoc) {
	if (cursor.revision <= write.revision) {
		return false;
	}
	write.revision = cursor.revision;
	write.storedAt = Math.max(write.storedAt, cursor.at);
	write.storedActivity = private_activity_max(write.storedActivity, cursor.activity);
	write.waitingForRefresh = false;
	return true;
}

type ChannelDialogState =
	| { kind: "create" }
	| { kind: "rename"; channel: chat_Doc<chat_ChannelValue> }
	| { kind: "archive"; channel: chat_Doc<chat_ChannelValue> }
	| { kind: "people"; channel: chat_Doc<chat_ChannelValue> }
	| { kind: "exit"; action: "leave" | "delete"; channel: chat_Doc<chat_ChannelValue> };

type PendingChannelValue = {
	channelKey: string;
	value: chat_ChannelValue;
	expectedRevision: number;
	sectionMoveRequestId: symbol | null;
};

type PendingPrivateCreateReconciliation = {
	key: string;
	running: boolean;
	retryDelayMs: number;
	retryTimer: ReturnType<typeof setTimeout> | null;
	cancelled: boolean;
};

type PendingExitReconciliation = {
	channel: chat_Doc<chat_ChannelValue>;
	action: "leave" | "delete";
	running: boolean;
	retryDelayMs: number;
	retryTimer: ReturnType<typeof setTimeout> | null;
	cancelled: boolean;
};

type PendingReaddReconciliation = {
	scope: PrivateChannelScope;
	running: boolean;
	retryDelayMs: number;
	retryTimer: ReturnType<typeof setTimeout> | null;
	cancelled: boolean;
};

function cancel_private_create_reconciliation(reconciliation: PendingPrivateCreateReconciliation) {
	reconciliation.cancelled = true;
	if (reconciliation.retryTimer !== null) {
		clearTimeout(reconciliation.retryTimer);
		reconciliation.retryTimer = null;
	}
}

function cancel_exit_reconciliation(reconciliation: PendingExitReconciliation) {
	reconciliation.cancelled = true;
	if (reconciliation.retryTimer !== null) {
		clearTimeout(reconciliation.retryTimer);
		reconciliation.retryTimer = null;
	}
}

function cancel_readd_reconciliation(reconciliation: PendingReaddReconciliation) {
	reconciliation.cancelled = true;
	if (reconciliation.retryTimer !== null) {
		clearTimeout(reconciliation.retryTimer);
		reconciliation.retryTimer = null;
	}
}

export function App(props: { client: BonoboClient }) {
	const { client } = props;
	const userId = client.context.userId;
	const memberNames = use_member_names(client);
	// The public channels read is the page's primary subscription: when the door refuses it the
	// member lost access, and the whole page switches to the permission-lost state.
	const channelsRead = useQuery(client.api.plugins_data.watch_documents, { collection: "channels", limit: 100 });
	const publicChannels = useMemo(() => {
		if (channelsRead === undefined || channelsRead === null) {
			return [];
		}
		// A public `p/` doc has no scope. Never let its key make it look private in the UI.
		return chat_create_window_store(chat_validate_channel_doc).apply_window(
			channelsRead.docs.filter((doc) => !chat_channel_is_private(doc.key)),
		);
	}, [channelsRead]);
	const channelsLoaded = channelsRead !== undefined;
	// The read stops at 100 channels and has no way to reach past that. Say so, or a workspace with
	// more channels shows a sidebar that looks complete and is not.
	const channelsTruncated = channelsRead !== undefined && channelsRead !== null && channelsRead.truncated;
	/**
	 * The private ranges this member is in, and the channels found inside each one. A read with no
	 * key range answers only the public part of a collection, so a private channel is reached by its
	 * own read, one per scope, and the two lists are merged for the sidebar.
	 */
	const [scopes, setScopes] = useState<PrivateChannelScope[]>([]);
	const [privateChannelsByScope, setPrivateChannelsByScope] = useState<Record<string, chat_Doc<chat_ChannelValue>[]>>(
		{},
	);
	/** The member's public cursor map doc, delivered live. Null until it exists or when it dies. */
	const [cursorDoc, setCursorDoc] = useState<chat_CursorMapDoc | null>(null);
	// The newest 100 public messages, one bounded descending read. This single feed answers
	// unread detection, mention detection, the Activity view and the Unreads previews — zero
	// extra writes per message. The accepted horizon: a channel whose newest message fell out of
	// these 100 shows as read even when it is not.
	const recentRead = useQuery(client.api.plugins_data.watch_recent, { collection: "messages", limit: 100, order: "desc" });
	const recentFeed = useMemo(
		() =>
			recentRead === undefined || recentRead === null
				? []
				: chat_create_window_store(chat_validate_message_doc).apply_window(recentRead.docs),
		[recentRead],
	);
	const recentDead = recentRead === null;
	/** This member's own private read cursors, delivered by the per-scope channels reads. */
	const [privateCursorsByScope, setPrivateCursorsByScope] = useState<Record<string, chat_PrivateCursorDoc[]>>({});
	/** Increments for every live full scope-list delivery, including an unchanged list. */
	const [scopeDeliveryVersion, setScopeDeliveryVersion] = useState(0);
	/** Holds either a channel key or a `view:*` key — views share the one selection. */
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [sendRequestsByChannel, setSendRequestsByChannel] = useState<Record<string, number>>({});
	/**
	 * The read cursor of the selected channel, frozen at the moment it was opened. `ChannelView`
	 * puts its "New messages" mark above the first message newer than this. null = nothing was
	 * unread when the channel opened, so no mark is drawn.
	 */
	const [openedAtLastReadAt, setOpenedAtLastReadAt] = useState<number | null>(null);
	/**
	 * The open thread, held here rather than in `ChannelView`, because the icon rail collapses on the
	 * `.chitchat` root and only this component renders it.
	 */
	const [threadRootKey, setThreadRootKey] = useState<string | null>(null);
	const [railExpanded, setRailExpanded] = useState(false);
	const [dialog, setDialog] = useState<ChannelDialogState | null>(null);
	const [dialogBusy, setDialogBusy] = useState(false);
	const [exitReconciling, setExitReconciling] = useState(false);
	const [channelCreateUncertain, setChannelCreateUncertain] = useState(false);
	const [channelCreateReconciling, setChannelCreateReconciling] = useState(false);
	const [channelValueUncertain, setChannelValueUncertain] = useState(false);
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
	const appRef = useRef<HTMLDivElement | null>(null);
	const navRef = useRef<HTMLElement | null>(null);
	const drawerToggleRef = useRef<HTMLButtonElement | null>(null);
	const railExpandRef = useRef<HTMLButtonElement | null>(null);
	const responsiveFocusOwnerRef = useRef<"drawer" | "sidebar" | "separator" | null>(null);
	const pendingResponsiveFocusRef = useRef<"drawer" | "selected" | "thread" | null>(null);
	/** The latest cursor doc, readable by write paths without a stale closure. */
	const cursorDocRef = useRef<chat_CursorMapDoc | null>(null);
	/** The current public keys, including when a cursor backoff timer came from an older render. */
	const publicChannelKeysRef = useRef(new Set<string>());
	publicChannelKeysRef.current = new Set(publicChannels.map((channel) => channel.key));
	/** Hold the exact key and payload only while a create result may have committed. */
	const pendingChannelCreateRef = useRef<{
		/** Private creates mint the scope/channel key here; a public create's key comes back from the backend. */
		key: string;
		name: string;
		topic: string;
		isPrivate: boolean;
		userIds: GenericId<"users">[];
		/** Public creates dedupe by this id in the backend, so an uncertain retry cannot create twice. */
		clientRequestId: string;
	} | null>(null);
	const pendingPrivateCreateReconciliationRef = useRef<PendingPrivateCreateReconciliation | null>(null);
	/** Hold one exact rename or archive until its uncertain result is settled. */
	const pendingChannelValueRef = useRef<PendingChannelValue | null>(null);
	/** Conflicted or oversized public cursor writes wait here and share one retry at a time. */
	const cursorRetryRef = useRef<{
		channels: Record<string, number>;
		attemptedRevision: number;
		running: boolean;
		needsCompaction: boolean;
		retryCurrentRevision: boolean;
		waitBeforeRetry: boolean;
		retryDelayMs: number;
		retryTimer: ReturnType<typeof setTimeout> | null;
	} | null>(null);
	const markReadTimersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());
	/** Survive ChannelView renders so a navigation handler sees a send start synchronously. */
	const sendRequestsByChannelRef = useRef(new Map<string, number>());
	const pendingMarkReadsRef = useRef(new Map<string, PendingReadMark>());
	const pendingExitKeysRef = useRef(new Set<string>());
	const exitMarkBuffersRef = useRef(new Map<string, PendingReadMark>());
	const exitOutcomesRef = useRef(
		new Map<string, "pending" | "left" | "deleted" | "leave_unconfirmed" | "delete_unconfirmed">(),
	);
	const pendingExitReconciliationsRef = useRef(new Map<string, PendingExitReconciliation>());
	/** Keep an exact departure hidden until an exact principal read proves this member was added back. */
	const exactDepartureScopeIdsRef = useRef(new Set<string>());
	const scopeCandidatesRef = useRef(new Map<string, PrivateChannelScope>());
	const checkedDepartureCandidateRevisionsRef = useRef(new Map<string, number>());
	const pendingReaddReconciliationsRef = useRef(new Map<string, PendingReaddReconciliation>());
	/** The newest membership revision from the full live scope list, by scope id. */
	const scopeMembershipRevisionsRef = useRef(new Map<string, number>());
	const pendingSuccessfulLeavesRef = useRef(
		new Map<string, { channel: chat_Doc<chat_ChannelValue>; membershipRevision: number }>(),
	);
	const liveScopeIdsRef = useRef(new Set<string>());
	/** The last answer applied per private range, so one delivery is not applied twice. */
	const appliedScopeReadsRef = useRef(new Map<string, DocumentsRead>());
	const scopeDeliveryVersionRef = useRef(0);
	const mountedRef = useRef(true);
	const privateCursorWritesRef = useRef(new Map<string, PrivateCursorWrite>());
	const previousLiveScopeIdsRef = useRef(new Set<string>());
	const pendingDeparturesRef = useRef(new Map<string, chat_Doc<chat_ChannelValue>>());
	const pendingChannelSectionMovesRef = useRef(
		new Map<symbol, { channelKey: string; sourceRevision: number; archived: boolean }>(),
	);
	const pendingReaddedExitFocusRef = useRef<string | null>(null);
	const [pendingFocusRepair, setPendingFocusRepair] = useState(false);

	const apply_public_cursor_local = useCallback(
		(revision: number, value: chat_CursorMapValue) => {
			const base = cursorDocRef.current;
			if (base !== null && base.revision > revision) {
				return;
			}
			const now = Date.now();
			const stored: chat_CursorMapDoc = {
				key: chat_cursor_stored_key(userId),
				value,
				revision,
				createdBy: userId,
				updatedBy: userId,
				createdAt: base?.createdAt ?? now,
				updatedAt: now,
				ownership: "owned",
				timestamp: base?.timestamp ?? now,
			};
			cursorDocRef.current = stored;
			setCursorDoc(stored);
		},
		[userId],
	);

	const run_public_cursor_retry = useCallback(
		function run_public_cursor_retry() {
			const retry = cursorRetryRef.current;
			const latest = cursorDocRef.current;
			const latestRevision = latest?.revision ?? 0;
			if (
				!mountedRef.current ||
				retry === null ||
				retry.running ||
				retry.retryTimer !== null ||
				(latestRevision === retry.attemptedRevision && !retry.retryCurrentRevision)
			) {
				return;
			}
			if (retry.waitBeforeRetry) {
				const delayMs = retry.retryDelayMs;
				retry.waitBeforeRetry = false;
				retry.retryTimer = setTimeout(() => {
					retry.retryTimer = null;
					retry.retryDelayMs = Math.min(delayMs * 2, CURSOR_RETRY_MAX_MS);
					run_public_cursor_retry();
				}, delayMs);
				return;
			}

			const wanted: chat_CursorMapValue = { channels: retry.channels };
			retry.channels = {};
			retry.attemptedRevision = latestRevision;
			retry.retryCurrentRevision = false;
			const needsCompaction = retry.needsCompaction;
			retry.needsCompaction = false;
			const merged = chat_merge_cursor_maps(latest?.value ?? { channels: {} }, wanted);
			const submitted = needsCompaction
				? {
						channels: Object.fromEntries(
							Object.entries(merged.channels).filter(([key]) => publicChannelKeysRef.current.has(key)),
						),
					}
				: merged;
			if (needsCompaction && Object.keys(submitted.channels).length === Object.keys(merged.channels).length) {
				// Keep every wanted mark for a later revision when no stale channel can be removed now.
				retry.channels = chat_merge_cursor_maps({ channels: retry.channels }, wanted).channels;
				retry.needsCompaction = true;
				console.warn("[chitchat] The read-cursor map is still too large after cleanup");
				return;
			}
			retry.running = true;
			client.convex
				.mutation(client.api.plugins_data.user_put_owned_document, {
					collection: "cursors",
					key: chat_CURSOR_CALLER_KEY,
					value: submitted,
					expectedRevision: latestRevision,
				})
				.then((result) => {
					retry.running = false;
					if (!mountedRef.current || cursorRetryRef.current !== retry) {
						return;
					}
					if (result._yay) {
						retry.retryDelayMs = CURSOR_RETRY_INITIAL_MS;
						apply_public_cursor_local(result._yay.revision, submitted);
					} else if (result._nay.name === "conflict") {
						// Put this flight back before another retry, including wants queued while it ran.
						retry.channels = chat_merge_cursor_maps({ channels: retry.channels }, wanted).channels;
						retry.needsCompaction ||= needsCompaction;
						// A conflict needs its winner's revision. Only a separate unavailable call may
						// still retry this revision after its backoff timer.
						retry.retryCurrentRevision = retry.waitBeforeRetry;
						retry.retryDelayMs = CURSOR_RETRY_INITIAL_MS;
					} else if (result._nay.name === "storage_full") {
						// A size refusal can retry this revision after stale channel keys are removed.
						retry.channels = chat_merge_cursor_maps({ channels: retry.channels }, wanted).channels;
						retry.needsCompaction = true;
						retry.retryCurrentRevision = true;
						retry.retryDelayMs = CURSOR_RETRY_INITIAL_MS;
						if (needsCompaction) {
							console.warn("[chitchat] The compacted read-cursor retry was refused", {
								message: result._nay.message,
							});
							return;
						}
					} else {
						console.warn("[chitchat] A read-cursor retry was refused", {
							message: result._nay.message,
						});
					}

					if (Object.keys(retry.channels).length === 0) {
						cursorRetryRef.current = null;
						return;
					}
					run_public_cursor_retry();
				})
				.catch(() => {
					retry.running = false;
					if (!mountedRef.current || cursorRetryRef.current !== retry) {
						return;
					}
					// The call may not have reached the store. Keep its maxima and retry this revision.
					retry.channels = chat_merge_cursor_maps({ channels: retry.channels }, wanted).channels;
					retry.needsCompaction ||= needsCompaction;
					retry.retryCurrentRevision = true;
					retry.waitBeforeRetry = true;
					run_public_cursor_retry();
				});
		},
		[apply_public_cursor_local, client],
	);

	/** Merge one failed public map into the single retry, including same-revision recovery. */
	const queue_public_cursor_retry = (
		value: chat_CursorMapValue,
		attemptedRevision: number,
		reason: "conflict" | "storage_full" | "unavailable",
	) => {
		if (!mountedRef.current) {
			return;
		}
		const pending = cursorRetryRef.current;
		const retry = pending ?? {
			channels: {},
			attemptedRevision,
			running: false,
			needsCompaction: false,
			retryCurrentRevision: false,
			waitBeforeRetry: false,
			retryDelayMs: CURSOR_RETRY_INITIAL_MS,
			retryTimer: null,
		};
		retry.channels = chat_merge_cursor_maps({ channels: retry.channels }, value).channels;
		retry.attemptedRevision = Math.max(retry.attemptedRevision, attemptedRevision);
		if (reason === "storage_full") {
			retry.needsCompaction = true;
			retry.retryCurrentRevision = true;
		} else if (reason === "unavailable") {
			retry.retryCurrentRevision = true;
			if (retry.retryTimer === null) {
				retry.waitBeforeRetry = true;
			}
		}
		cursorRetryRef.current = retry;
		run_public_cursor_retry();
	};

	const run_private_cursor_write = useCallback(
		function run_private_cursor_write(write: PrivateCursorWrite) {
			const stored_covers_pending = () =>
				write.storedAt >= write.pendingAt && private_activity_covers(write.storedActivity, write.pendingActivity);
			const schedule_retry = (retry: () => void) => {
				if (
					write.cancelled ||
					!mountedRef.current ||
					!liveScopeIdsRef.current.has(write.channelKey) ||
					stored_covers_pending() ||
					write.retryTimer !== null
				) {
					return;
				}
				const delayMs = write.retryDelayMs;
				write.retryTimer = setTimeout(() => {
					write.retryTimer = null;
					write.retryDelayMs = Math.min(delayMs * 2, CURSOR_RETRY_MAX_MS);
					retry();
				}, delayMs);
			};

			const refresh_after_conflict = () => {
				if (
					write.cancelled ||
					!mountedRef.current ||
					!liveScopeIdsRef.current.has(write.channelKey) ||
					!write.waitingForRefresh ||
					write.running ||
					write.retryTimer !== null
				) {
					return;
				}
				write.running = true;
				const storedKey = `${chat_private_cursor_caller_key(write.channelKey)}:${userId}`;
				client
					.fetchJson("/api/v1/plugin-data/read", { collection: "channels", key: storedKey })
					.then((answer) => {
						if (privateCursorWritesRef.current.get(write.channelKey) !== write || write.cancelled) {
							return;
						}
						write.running = false;
						// A live ranged watch may have supplied the winner while this read was in flight.
						if (!write.waitingForRefresh) {
							run_private_cursor_write(write);
							return;
						}
						const cursor = answer.status === 200 ? chat_validate_private_cursor_doc(answer.body.document) : null;
						if (
							cursor !== null &&
							cursor.key === storedKey &&
							cursor.channelKey === write.channelKey &&
							cursor.createdBy === userId &&
							sync_private_cursor(write, cursor)
						) {
							write.retryDelayMs = CURSOR_RETRY_INITIAL_MS;
							run_private_cursor_write(write);
							return;
						}
						schedule_retry(refresh_after_conflict);
					})
					.catch(() => {
						if (privateCursorWritesRef.current.get(write.channelKey) !== write || write.cancelled) {
							return;
						}
						write.running = false;
						if (!write.waitingForRefresh) {
							run_private_cursor_write(write);
							return;
						}
						schedule_retry(refresh_after_conflict);
					});
			};

			if (
				write.running ||
				write.retryTimer !== null ||
				write.cancelled ||
				!liveScopeIdsRef.current.has(write.channelKey)
			) {
				return;
			}
			if (write.waitingForRefresh) {
				refresh_after_conflict();
				return;
			}
			if (stored_covers_pending()) {
				privateCursorWritesRef.current.delete(write.channelKey);
				return;
			}

			const at = Math.max(write.pendingAt, write.storedAt);
			const activity = private_activity_max(write.pendingActivity, write.storedActivity);
			const expectedRevision = write.revision;
			write.running = true;
			client.convex
				.mutation(client.api.plugins_data.user_put_owned_document, {
					collection: "channels",
					key: chat_private_cursor_caller_key(write.channelKey),
					value: { at, activity },
					expectedRevision,
				})
				.then((result) => {
					if (privateCursorWritesRef.current.get(write.channelKey) !== write || write.cancelled) {
						return;
					}
					write.running = false;
					if (result._yay) {
						// Use the stored revision the door returned. Do not guess `revision + 1`.
						write.retryDelayMs = CURSOR_RETRY_INITIAL_MS;
						write.revision = Math.max(write.revision, result._yay.revision);
						write.storedAt = Math.max(write.storedAt, at);
						write.storedActivity = private_activity_max(write.storedActivity, activity);
						run_private_cursor_write(write);
						return;
					}
					if (result._nay.name === "conflict") {
						if (write.revision !== expectedRevision) {
							run_private_cursor_write(write);
							return;
						}
						// This exact read also works after the scope falls outside the eight live reads.
						write.waitingForRefresh = true;
						refresh_after_conflict();
						return;
					}
					console.warn("[chitchat] A private read-cursor write was refused", {
						message: result._nay.message,
					});
					privateCursorWritesRef.current.delete(write.channelKey);
				})
				.catch((error: unknown) => {
					if (privateCursorWritesRef.current.get(write.channelKey) !== write || write.cancelled) {
						return;
					}
					write.running = false;
					// The call may not have reached the store. Retry with backoff.
					console.warn("[chitchat] A private read-cursor write failed", {
						message: chat_get_error_message(error),
					});
					schedule_retry(() => run_private_cursor_write(write));
				});
		},
		[client, userId],
	);

	const liveScopeIds = useMemo(() => new Set(scopes.map((scope) => scope.scopeId)), [scopes]);
	// Activity changes arrive on every scoped append. Keep ranged reads keyed only by their range.
	const scopeWatchStructureKey = JSON.stringify(
		scopes
			.map((scope) => ({
				scopeId: scope.scopeId,
				keyPrefix: scope.keyPrefix,
				collections: [...scope.collections].sort(),
			}))
			.sort((a, b) => a.scopeId.localeCompare(b.scopeId)),
	);
	const scopeWatchDescriptors = useMemo<PrivateScopeWatchDescriptor[]>(
		() =>
			scopes.map((scope) => ({
				scopeId: scope.scopeId,
				keyPrefix: scope.keyPrefix,
				collections: scope.collections,
			})),
		[scopeWatchStructureKey],
	);
	const firstWatchedScopes = useMemo(
		() => [...scopeWatchDescriptors].sort((a, b) => a.scopeId.localeCompare(b.scopeId)).slice(0, MAX_WATCHED_SCOPES),
		[scopeWatchDescriptors],
	);
	const watchedScopes = useMemo(() => {
		const ordered = [...scopeWatchDescriptors].sort((a, b) => a.scopeId.localeCompare(b.scopeId));
		const selectedScope =
			selectedKey !== null && chat_channel_is_private(selectedKey)
				? ordered.find((scope) => scope.scopeId === selectedKey)
				: undefined;
		if (selectedScope === undefined || firstWatchedScopes.some((scope) => scope.scopeId === selectedScope.scopeId)) {
			return firstWatchedScopes;
		}
		return [selectedScope, ...ordered.filter((scope) => scope.scopeId !== selectedScope.scopeId).slice(0, 7)].sort(
			(a, b) => a.scopeId.localeCompare(b.scopeId),
		);
	}, [firstWatchedScopes, scopeWatchDescriptors, selectedKey]);
	const watchedScopeIds = useMemo(() => new Set(watchedScopes.map((scope) => scope.scopeId)), [watchedScopes]);

	// One sidebar: a private channel sits among the public ones rather than in a tray of its own.
	// Channel keys are client-generated, so the list sorts by name.
	const channels = [
		...publicChannels,
		...Object.entries(privateChannelsByScope).flatMap(([scopeId, entries]) =>
			liveScopeIds.has(scopeId) && watchedScopeIds.has(scopeId) ? entries : [],
		),
	].sort((a, b) => a.value.name.localeCompare(b.value.name));

	/** channelKey → this member's own private cursor, flattened from the per-scope deliveries. */
	const privateCursors = new Map(
		Object.entries(privateCursorsByScope).flatMap(([scopeId, entries]) =>
			liveScopeIds.has(scopeId) && watchedScopeIds.has(scopeId)
				? entries.map((doc) => [doc.channelKey, doc] as const)
				: [],
		),
	);
	/** channelKey → durable message/reply activity from the full scope list. */
	const privateActivity = new Map(scopes.map((scope) => [scope.scopeId, private_scope_activity(scope)]));

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
			const activity = privateActivity.get(channel.key)?.activity ?? EMPTY_PRIVATE_ACTIVITY;
			const cursor = privateCursors.get(channel.key)?.activity ?? EMPTY_PRIVATE_ACTIVITY;
			return !private_activity_covers(cursor, activity);
		}
		return publicUnreads.has(channel.key);
	};

	/** Where this member's read cursor stands for a channel right now, epoch ms. 0 = never read. */
	const read_cursor_at = (channel: chat_Doc<chat_ChannelValue>) => {
		return chat_channel_is_private(channel.key)
			? (privateCursors.get(channel.key)?.at ?? 0)
			: (cursorDoc?.value.channels[channel.key] ?? 0);
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

	const handle_send_request_start = useCallback((channelKey: string) => {
		const next = (sendRequestsByChannelRef.current.get(channelKey) ?? 0) + 1;
		sendRequestsByChannelRef.current.set(channelKey, next);
		setSendRequestsByChannel(Object.fromEntries(sendRequestsByChannelRef.current));
	}, []);

	const handle_send_request_settled = useCallback((channelKey: string) => {
		const current = sendRequestsByChannelRef.current.get(channelKey) ?? 0;
		if (current === 0) {
			return;
		}
		if (current === 1) {
			sendRequestsByChannelRef.current.delete(channelKey);
		} else {
			sendRequestsByChannelRef.current.set(channelKey, current - 1);
		}
		setSendRequestsByChannel(Object.fromEntries(sendRequestsByChannelRef.current));
	}, []);

	const reconcile_departed_scope = useCallback(
		(scope: PrivateChannelScope) => {
			if (
				!exactDepartureScopeIdsRef.current.has(scope.scopeId) ||
				(checkedDepartureCandidateRevisionsRef.current.get(scope.scopeId) ?? -1) >= scope.membershipRevision
			) {
				return;
			}

			const current = pendingReaddReconciliationsRef.current.get(scope.scopeId);
			if (current !== undefined) {
				current.scope = scope;
				return;
			}

			const reconciliation: PendingReaddReconciliation = {
				scope,
				running: false,
				retryDelayMs: EXIT_READ_RETRY_INITIAL_MS,
				retryTimer: null,
				cancelled: false,
			};
			pendingReaddReconciliationsRef.current.set(scope.scopeId, reconciliation);

			const is_current = () =>
				mountedRef.current &&
				!reconciliation.cancelled &&
				pendingReaddReconciliationsRef.current.get(scope.scopeId) === reconciliation;
			const stop = () => {
				cancel_readd_reconciliation(reconciliation);
				if (pendingReaddReconciliationsRef.current.get(scope.scopeId) === reconciliation) {
					pendingReaddReconciliationsRef.current.delete(scope.scopeId);
				}
			};
			const restore = () => {
				const restoredScope = reconciliation.scope;
				stop();
				exactDepartureScopeIdsRef.current.delete(restoredScope.scopeId);
				checkedDepartureCandidateRevisionsRef.current.delete(restoredScope.scopeId);
				pendingDeparturesRef.current.delete(restoredScope.scopeId);
				pendingExitKeysRef.current.delete(restoredScope.scopeId);
				exitMarkBuffersRef.current.delete(restoredScope.scopeId);
				exitOutcomesRef.current.delete(restoredScope.scopeId);
				const nextLiveScopeIds = new Set(liveScopeIdsRef.current);
				nextLiveScopeIds.add(restoredScope.scopeId);
				liveScopeIdsRef.current = nextLiveScopeIds;
				scopeMembershipRevisionsRef.current.set(restoredScope.scopeId, restoredScope.membershipRevision);
				scopeDeliveryVersionRef.current += 1;
				setScopes((scopes) => {
					const index = scopes.findIndex((entry) => entry.scopeId === restoredScope.scopeId);
					if (index === -1) {
						return [...scopes, restoredScope];
					}
					const next = [...scopes];
					next[index] = restoredScope;
					return next;
				});
				setScopeDeliveryVersion(scopeDeliveryVersionRef.current);
			};
			const run = () => {
				if (!is_current() || reconciliation.running || reconciliation.retryTimer !== null) {
					return;
				}
				reconciliation.running = true;
				const attemptedRevision = reconciliation.scope.membershipRevision;
				const schedule_retry = () => {
					if (!is_current() || reconciliation.retryTimer !== null) {
						return;
					}
					const delayMs = reconciliation.retryDelayMs;
					reconciliation.retryTimer = setTimeout(() => {
						reconciliation.retryTimer = null;
						reconciliation.retryDelayMs = Math.min(delayMs * 2, EXIT_READ_RETRY_MAX_MS);
						run();
					}, delayMs);
				};
				const settle_absent = () => {
					reconciliation.running = false;
					if (reconciliation.scope.membershipRevision !== attemptedRevision) {
						run();
						return;
					}
					checkedDepartureCandidateRevisionsRef.current.set(scope.scopeId, attemptedRevision);
					stop();
				};

				Promise.resolve()
					.then(() =>
						client.fetchJson("/api/v1/plugin-data/read", { collection: "channels", key: scope.scopeId }),
					)
					.then((answer) => {
						if (!is_current()) {
							return;
						}
						if (answer.status !== 200) {
							reconciliation.running = false;
							schedule_retry();
							return;
						}
						if (answer.body.document === null) {
							settle_absent();
							return;
						}
						const channel = chat_validate_channel_doc(answer.body.document);
						if (
							answer.body.document.collection !== "channels" ||
							channel === null ||
							channel.key !== scope.scopeId ||
							!chat_channel_is_private(channel.key)
						) {
							reconciliation.running = false;
							schedule_retry();
							return;
						}
						return client.convex
							.query(client.api.plugins_data.watch_scope_principals, { scopeId: channel.key })
							.then((rawResult) => {
								if (!is_current()) {
									return;
								}
								reconciliation.running = false;
								const result = private_scope_principal_result(rawResult);
								if (result === null) {
									schedule_retry();
									return;
								}
								const principals = result._yay;
								if (principals === null) {
									settle_absent();
									return;
								}
								if (reconciliation.scope.membershipRevision !== attemptedRevision) {
									run();
									return;
								}
								if (principals.some((principal) => principal.userId === userId)) {
									restore();
									return;
								}
								checkedDepartureCandidateRevisionsRef.current.set(scope.scopeId, attemptedRevision);
								stop();
							});
					})
					.catch(() => {
						if (!is_current()) {
							return;
						}
						reconciliation.running = false;
						schedule_retry();
					});
			};

			run();
		},
		[client, userId],
	);

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

	// Do not pull focus back after the member moves to another control or leaves the iframe.
	useEffect(() => {
		const clear_if_outside = (event: FocusEvent) => {
			const target = event.target;
			if (target instanceof Node && !appRef.current?.contains(target)) {
				responsiveFocusOwnerRef.current = null;
			}
		};
		const clear_on_window_blur = () => {
			responsiveFocusOwnerRef.current = null;
		};
		document.addEventListener("focusin", clear_if_outside);
		window.addEventListener("blur", clear_on_window_blur);
		return () => {
			document.removeEventListener("focusin", clear_if_outside);
			window.removeEventListener("blur", clear_on_window_blur);
		};
	}, []);

	// The drawer's overlay behaviour is a media-query state, and `inert` has to follow it.
	useEffect(() => {
		const query = window.matchMedia("(max-width: 719px)");
		setIsNarrow(query.matches);
		const handle_change = (event: MediaQueryListEvent) => {
			const focusOwner = responsiveFocusOwnerRef.current;
			pendingResponsiveFocusRef.current = event.matches
				? threadRootKey !== null && (focusOwner === "sidebar" || focusOwner === "separator")
						? "thread"
						: focusOwner === "sidebar" && !drawerOpen
							? "drawer"
							: null
				: focusOwner === "drawer"
					? "selected"
					: null;
			setIsNarrow(event.matches);
		};
		query.addEventListener("change", handle_change);
		return () => query.removeEventListener("change", handle_change);
	}, [drawerOpen, threadRootKey]);

	// A responsive layout can hide the focused rail, drawer toggle, or thread separator. Move to
	// the matching visible control after React updates `inert` and the thread button label.
	useLayoutEffect(() => {
		const target = pendingResponsiveFocusRef.current;
		pendingResponsiveFocusRef.current = null;
		const focus_thread = () => {
			const thread = appRef.current?.querySelector<HTMLElement>(".thread") ?? null;
			if (thread === null) {
				return false;
			}
			const threadBack = thread?.querySelector<HTMLButtonElement>(".thread-head button") ?? null;
			threadBack?.focus();
			// A pending send disables Back. Keep focus on the named thread region until it settles.
			if (document.activeElement !== threadBack) {
				thread.focus();
			}
			return document.activeElement === threadBack || document.activeElement === thread;
		};
		if (target === "drawer") {
			// A narrow open thread hides the drawer toggle. Keep focus on its visible Back control.
			if (threadRootKey === null || !focus_thread()) {
				drawerToggleRef.current?.focus();
			}
		} else if (target === "thread") {
			if (!focus_thread()) {
				drawerToggleRef.current?.focus();
			}
		} else if (target === "selected") {
			const selectedControl = navRef.current?.querySelector<HTMLButtonElement>('[aria-current="page"]') ?? null;
			selectedControl?.focus();
			if (document.activeElement !== selectedControl) {
				navRef.current?.focus();
			}
		}
	}, [isNarrow, threadRootKey]);

	// Which private ranges this member is in. It is live, so being added to a private channel makes
	// it appear here, and being taken out makes it go away, without reloading the page.
	const scopesRead = useQuery(client.api.plugins_data.watch_my_scopes, {});
	useEffect(() => {
		// A refused list keeps the last one. The ranged reads answer for themselves, and only a live
		// list proves a departure.
		if (scopesRead === undefined || scopesRead === null) {
			return;
		}
		const scopeCandidates = scopesRead.filter(private_channel_scope_is_valid);
		scopeCandidatesRef.current = new Map(scopeCandidates.map((scope) => [scope.scopeId, scope]));
		for (const [scopeId, reconciliation] of pendingReaddReconciliationsRef.current) {
			if (!scopeCandidatesRef.current.has(scopeId)) {
				cancel_readd_reconciliation(reconciliation);
				pendingReaddReconciliationsRef.current.delete(scopeId);
			}
		}
		const validScopes = scopeCandidates.filter((scope) => {
			if (!exactDepartureScopeIdsRef.current.has(scope.scopeId)) {
				return true;
			}
			// A revision can change for another principal. Restore only after an exact principal read.
			reconcile_departed_scope(scope);
			return false;
		});
		const nextLiveScopeIds = new Set(validScopes.map((scope) => scope.scopeId));
		for (const [channelKey, write] of privateCursorWritesRef.current) {
			if (!nextLiveScopeIds.has(channelKey)) {
				cancel_private_cursor(write);
				privateCursorWritesRef.current.delete(channelKey);
			}
		}
		scopeMembershipRevisionsRef.current = new Map(validScopes.map((scope) => [scope.scopeId, scope.membershipRevision]));
		scopeDeliveryVersionRef.current += 1;
		liveScopeIdsRef.current = nextLiveScopeIds;
		setScopes(validScopes);
		setScopeDeliveryVersion(scopeDeliveryVersionRef.current);
	}, [scopesRead, reconcile_departed_scope]);

	// One channels read per private range, beside the public one above. Only the full scope list
	// proves departure: a ranged read that answers null keeps its cached rows until that list drops
	// the scope. Only the first MAX_WATCHED_SCOPES ranges get a read, and the sidebar renders one
	// honest line when more exist. The record handed to `useQueries` must keep its identity between
	// renders, or the hook resubscribes on every render.
	const scopeQueries = useMemo(
		() =>
			Object.fromEntries(
				watchedScopes.map((scope) => [
					scope.scopeId,
					{
						query: client.api.plugins_data.watch_documents,
						args: { collection: "channels", keyPrefix: scope.keyPrefix, limit: 100 },
					},
				]),
			),
		[client, watchedScopes],
	);
	const scopeReads = useQueries(scopeQueries);
	useEffect(() => {
		for (const scopeId of appliedScopeReadsRef.current.keys()) {
			if (!watchedScopes.some((scope) => scope.scopeId === scopeId)) {
				appliedScopeReadsRef.current.delete(scopeId);
			}
		}
		for (const scope of watchedScopes) {
			const read: DocumentsRead | undefined | Error = scopeReads[scope.scopeId];
			// The record changes identity on every delivery in the set. Apply each range's answer once.
			if (
				read === undefined ||
				read === null ||
				read instanceof Error ||
				appliedScopeReadsRef.current.get(scope.scopeId) === read
			) {
				continue;
			}
			appliedScopeReadsRef.current.set(scope.scopeId, read);
			// The range also holds member cursor docs. Only its exact root key is the channel.
			const channelDocs = chat_create_window_store(chat_validate_channel_doc).apply_window(
				read.docs.filter((doc) => doc.key === scope.scopeId),
			);
			setPrivateChannelsByScope((current) => ({ ...current, [scope.scopeId]: channelDocs }));

			// Only this member's own cursors matter for unread state. `createdBy` is the
			// server-stamped owner; the key tail is not trusted.
			const mine = read.docs
				.map(chat_validate_private_cursor_doc)
				.filter(
					(doc): doc is chat_PrivateCursorDoc =>
						doc !== null && doc.channelKey === scope.scopeId && doc.createdBy === userId,
				);
			for (const doc of mine) {
				const write = privateCursorWritesRef.current.get(doc.channelKey);
				if (write !== undefined && sync_private_cursor(write, doc)) {
					if (write.retryTimer !== null) {
						clearTimeout(write.retryTimer);
						write.retryTimer = null;
					}
					write.retryDelayMs = CURSOR_RETRY_INITIAL_MS;
					run_private_cursor_write(write);
				}
			}
			setPrivateCursorsByScope((current) => ({ ...current, [scope.scopeId]: mine }));
		}
	}, [scopeReads, watchedScopes, run_private_cursor_write, userId]);

	// The member's public read cursors, one map doc. It is also the conflict-retry read: the winner
	// of a lost compare-and-set arrives here and the retry effect below merges over it. It goes
	// through `useQueries` so a failed query answers an Error here instead of throwing: with no
	// cursor map everything recent shows unread, which is the honest degraded answer.
	const cursorQueries = useMemo(
		() => ({
			cursors: {
				query: client.api.plugins_data.watch_documents,
				args: { collection: "cursors", keyPrefix: chat_cursor_stored_key(userId), limit: 1 },
			},
		}),
		[client, userId],
	);
	const cursorsRead: DocumentsRead | undefined | Error = useQueries(cursorQueries).cursors;
	useEffect(() => {
		if (cursorsRead === undefined) {
			return;
		}
		const storedKey = chat_cursor_stored_key(userId);
		const doc =
			cursorsRead === null || cursorsRead instanceof Error
				? null
				: (cursorsRead.docs
						.map(chat_validate_cursor_map_doc)
						.find(
							(entry): entry is chat_CursorMapDoc =>
								entry !== null && entry.key === storedKey && entry.createdBy === userId && entry.ownership === "owned",
						) ?? null);
		setCursorDoc(doc);
		cursorDocRef.current = doc;
	}, [cursorsRead, userId]);

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

	// Repair focus only after the watch moves a channel row between its two different lists.
	useEffect(() => {
		let repairFocus = false;
		for (const [requestId, move] of pendingChannelSectionMovesRef.current) {
			const channel = channels.find((entry) => entry.key === move.channelKey);
			if (channel === undefined) {
				pendingChannelSectionMovesRef.current.delete(requestId);
				repairFocus = true;
				continue;
			}
			if (channel.revision <= move.sourceRevision) {
				continue;
			}
			// Any newer value settles this request. Keep no marker that can steal focus on a later move.
			pendingChannelSectionMovesRef.current.delete(requestId);
			if ((channel.value.archivedAt !== null) === move.archived) {
				repairFocus = true;
			}
		}
		if (repairFocus) {
			setPendingFocusRepair(true);
		}
	}, [channels]);

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

		client.convex
			.mutation(client.api.plugins_data.user_put_owned_document, {
				collection: "cursors",
				key: chat_CURSOR_CALLER_KEY,
				value,
				expectedRevision,
			})
			.then((result) => {
				if (result._yay) {
					apply_public_cursor_local(result._yay.revision, value);
					return;
				}
				if (result._nay.name === "conflict") {
					queue_public_cursor_retry(value, expectedRevision, "conflict");
					return;
				}
				if (result._nay.name === "storage_full") {
					// The shared queue removes stale channels and keeps concurrent wanted maxima together.
					queue_public_cursor_retry(value, expectedRevision, "storage_full");
					return;
				}
				console.warn("[chitchat] A read-cursor write was refused", { message: result._nay.message });
			})
			.catch((error: unknown) => {
				// The call may not have reached the store. Retry the same revision with backoff.
				console.warn("[chitchat] A read-cursor write failed", { message: chat_get_error_message(error) });
				queue_public_cursor_retry(value, expectedRevision, "unavailable");
			});
	};

	/**
	 * Moves this member's read cursor for one private channel. The doc lives inside the scope's
	 * range, so a `p/` key never enters the public map. Serialize this page's writes and carry the
	 * stored revision forward, so two marks before the watch echo cannot race each other.
	 */
	const write_private_cursor = (
		channel: chat_Doc<chat_ChannelValue>,
		at: number,
		activity: chat_PrivateActivityCursor,
	) => {
		if (!liveScopeIdsRef.current.has(channel.key)) {
			return;
		}
		const pending = privateCursorWritesRef.current.get(channel.key);
		if (pending !== undefined) {
			pending.pendingAt = Math.max(pending.pendingAt, at);
			pending.pendingActivity = private_activity_max(pending.pendingActivity, activity);
			run_private_cursor_write(pending);
			return;
		}
		const existing = privateCursors.get(channel.key);
		if ((existing?.at ?? 0) >= at && private_activity_covers(existing?.activity ?? EMPTY_PRIVATE_ACTIVITY, activity)) {
			return;
		}
		const write: PrivateCursorWrite = {
			channelKey: channel.key,
			pendingAt: at,
			pendingActivity: activity,
			storedAt: existing?.at ?? 0,
			storedActivity: existing?.activity ?? EMPTY_PRIVATE_ACTIVITY,
			revision: existing?.revision ?? 0,
			running: false,
			waitingForRefresh: false,
			retryDelayMs: CURSOR_RETRY_INITIAL_MS,
			retryTimer: null,
			cancelled: false,
		};
		privateCursorWritesRef.current.set(channel.key, write);
		run_private_cursor_write(write);
	};

	const mark_channel_read = (
		channel: chat_Doc<chat_ChannelValue>,
		at: number,
		activity: chat_PrivateActivityCursor | null,
	) => {
		if (chat_channel_is_private(channel.key)) {
			write_private_cursor(channel, at, activity ?? EMPTY_PRIVATE_ACTIVITY);
		} else {
			write_public_cursor(channel.key, at);
		}
	};

	const cancel_pending_mark_read = (channelKey: string, cancelStartedWrite = true) => {
		const timer = markReadTimersRef.current.get(channelKey);
		if (timer !== undefined) {
			clearTimeout(timer);
			markReadTimersRef.current.delete(channelKey);
		}
		pendingMarkReadsRef.current.delete(channelKey);
		if (cancelStartedWrite) {
			const privateWrite = privateCursorWritesRef.current.get(channelKey);
			if (privateWrite !== undefined) {
				privateWrite.cancelled = true;
				if (privateWrite.retryTimer !== null) {
					clearTimeout(privateWrite.retryTimer);
				}
				privateCursorWritesRef.current.delete(channelKey);
			}
		}
	};

	const schedule_mark_read = (
		channel: chat_Doc<chat_ChannelValue>,
		timestamp: number,
		activity: chat_PrivateActivityCursor | null,
	) => {
		const pending = pendingMarkReadsRef.current.get(channel.key);
		pendingMarkReadsRef.current.set(channel.key, {
			channel,
			at: Math.max(pending?.at ?? 0, timestamp),
			activity: activity === null ? null : private_activity_max(pending?.activity ?? EMPTY_PRIVATE_ACTIVITY, activity),
		});
		if (markReadTimersRef.current.has(channel.key)) {
			return;
		}
		markReadTimersRef.current.set(
			channel.key,
			setTimeout(() => {
				markReadTimersRef.current.delete(channel.key);
				const entry = pendingMarkReadsRef.current.get(channel.key);
				pendingMarkReadsRef.current.delete(channel.key);
				if (entry !== undefined && !pendingExitKeysRef.current.has(channel.key)) {
					mark_channel_read(entry.channel, entry.at, entry.activity);
				}
			}, MARK_READ_DEBOUNCE_MS),
		);
	};

	/**
	 * The channel reports the newest message it rendered; the write is debounced so a burst of
	 * arrivals costs one cursor write, not one per message.
	 */
	const handle_newest_visible = (channel: chat_Doc<chat_ChannelValue>, timestamp: number) => {
		const privateLatest = chat_channel_is_private(channel.key) ? privateActivity.get(channel.key) : undefined;
		const mark: PendingReadMark = {
			channel,
			at: Math.max(timestamp, privateLatest?.at ?? 0),
			activity: privateLatest?.activity ?? (chat_channel_is_private(channel.key) ? EMPTY_PRIVATE_ACTIVITY : null),
		};
		if (pendingExitKeysRef.current.has(channel.key)) {
			const buffered = exitMarkBuffersRef.current.get(channel.key);
			exitMarkBuffersRef.current.set(channel.key, {
				channel,
				at: Math.max(buffered?.at ?? 0, mark.at),
				activity:
					mark.activity === null
						? null
						: private_activity_max(buffered?.activity ?? EMPTY_PRIVATE_ACTIVITY, mark.activity),
			});
			return;
		}
		schedule_mark_read(channel, mark.at, mark.activity);
	};

	const selectedPrivateActivity = selectedKey === null ? undefined : privateActivity.get(selectedKey);
	const selectedPrivateActivityAt = selectedPrivateActivity?.at ?? 0;
	const selectedPrivateMessageSequence = selectedPrivateActivity?.activity.messages ?? 0;
	const selectedPrivateReplySequence = selectedPrivateActivity?.activity.replies ?? 0;
	useEffect(() => {
		if (selectedKey === null || selectedPrivateActivity === undefined || !chat_channel_is_private(selectedKey)) {
			return;
		}
		const channel = channels.find((entry) => entry.key === selectedKey);
		const cursor = privateCursors.get(selectedKey);
		if (
			channel !== undefined &&
			((cursor?.at ?? 0) < selectedPrivateActivityAt ||
				!private_activity_covers(cursor?.activity ?? EMPTY_PRIVATE_ACTIVITY, selectedPrivateActivity.activity))
		) {
			// A reply may not change the top-level message window. The scope activity still marks it read.
			schedule_mark_read(channel, selectedPrivateActivityAt, selectedPrivateActivity.activity);
		}
	}, [selectedKey, selectedPrivateActivityAt, selectedPrivateMessageSequence, selectedPrivateReplySequence]);

	// Losing a scope is the authoritative departure signal. Rendered rows can also disappear only
	// because the eight-watch budget changed, and that must not announce a departure or move focus.
	useEffect(() => {
		const previous = previousLiveScopeIdsRef.current;
		// A manager may add the member back while an exit result is pending. Clear only the old
		// departure snapshot; the exit request keeps its lock until its result settles.
		for (const scopeId of liveScopeIds) {
			pendingDeparturesRef.current.delete(scopeId);
		}
		for (const scopeId of previous) {
			if (liveScopeIds.has(scopeId)) {
				continue;
			}
			const channel = privateChannelsByScope[scopeId]?.find((entry) => entry.key === scopeId);
			if (channel !== undefined) {
				pendingDeparturesRef.current.set(scopeId, channel);
			}
			cancel_pending_mark_read(scopeId);
		}
		previousLiveScopeIdsRef.current = new Set(liveScopeIds);
	}, [liveScopeIds, privateChannelsByScope]);

	useEffect(() => {
		if (dialog !== null) {
			return;
		}
		let repairFocus = false;
		for (const [scopeId, channel] of pendingDeparturesRef.current) {
			const outcome = exitOutcomesRef.current.get(scopeId);
			if (outcome === "pending") {
				continue;
			}
			const actedOn = outcome !== undefined;
			announce(
				outcome === "deleted"
					? `Deleted #${channel.value.name}`
					: outcome === "left"
						? `Left #${channel.value.name}`
						: outcome === "delete_unconfirmed"
							? `You no longer have access to #${channel.value.name}. The Delete request could not be confirmed.`
							: outcome === "leave_unconfirmed"
								? `You no longer have access to #${channel.value.name}. The Leave request could not be confirmed.`
								: `You were removed from #${channel.value.name}.`,
			);
			if (selectedKey === scopeId) {
				setSelectedKey(null);
				setThreadRootKey(null);
				setOpenedAtLastReadAt(null);
			}
			if (selectedKey === scopeId || actedOn) {
				repairFocus = true;
			}
			pendingExitKeysRef.current.delete(scopeId);
			exitMarkBuffersRef.current.delete(scopeId);
			exitOutcomesRef.current.delete(scopeId);
			pendingDeparturesRef.current.delete(scopeId);
		}
		if (repairFocus) {
			setPendingFocusRepair(true);
		}
	}, [announce, dialog, liveScopeIds, selectedKey]);

	// Clear a departing selected channel's thread first. A background departure can finish after a
	// resize, so use the open thread's visible back control instead of leaving a repair pending.
	useLayoutEffect(() => {
		if (!pendingFocusRepair || dialog !== null) {
			return;
		}
		const activeElement = document.activeElement;
		if (activeElement instanceof HTMLElement && activeElement !== document.body && activeElement.isConnected) {
			setPendingFocusRepair(false);
			return;
		}
		if (isNarrow && !drawerOpen) {
			if (threadRootKey !== null) {
				const threadBack = appRef.current?.querySelector<HTMLButtonElement>(".thread-head button") ?? null;
				if (threadBack !== null) {
					threadBack.focus();
					if (document.activeElement === threadBack) {
						setPendingFocusRepair(false);
						return;
					}
				}
			}
			setPendingFocusRepair(false);
			drawerToggleRef.current?.focus();
		} else {
			setPendingFocusRepair(false);
			navRef.current?.focus();
		}
	}, [dialog, drawerOpen, isNarrow, pendingFocusRepair, threadRootKey]);

	// Run after the dialog's unmount cleanup restores its opener. On a resize that opener may now
	// be hidden, so this later repair must be the final focus move.
	useEffect(() => {
		const channelKey = pendingReaddedExitFocusRef.current;
		if (channelKey === null || dialog !== null) {
			return;
		}
		pendingReaddedExitFocusRef.current = null;
		if (isNarrow && !drawerOpen) {
			if (threadRootKey !== null) {
				const threadBack = appRef.current?.querySelector<HTMLButtonElement>(".thread-head button") ?? null;
				if (threadBack !== null) {
					threadBack.focus();
					if (document.activeElement === threadBack) {
						return;
					}
				}
			}
			drawerToggleRef.current?.focus();
			return;
		}
		for (const row of appRef.current?.querySelectorAll<HTMLElement>(".channel-item") ?? []) {
			if (row.dataset.channelKey === channelKey) {
				const trigger = row.querySelector<HTMLButtonElement>(".ChannelRowMenu-trigger");
				if (trigger !== null) {
					trigger.focus();
					if (document.activeElement === trigger) {
						return;
					}
				}
			}
		}
		navRef.current?.focus();
	}, [dialog, drawerOpen, isNarrow, threadRootKey]);

	const guard_selected_send_navigation = () => {
		if (selectedKey === null || (sendRequestsByChannelRef.current.get(selectedKey) ?? 0) === 0) {
			return false;
		}
		announce(MESSAGE_CHANGE_IN_FLIGHT_NAVIGATION_MESSAGE);
		return true;
	};

	const handle_select_channel = (channel: chat_Doc<chat_ChannelValue>) => {
		if ((channel.key !== selectedKey || threadRootKey !== null) && guard_selected_send_navigation()) {
			return false;
		}
		setSelectedKey(channel.key);
		// `ChannelView` is keyed by channel and remounts, but this state does not. A key left over
		// from the old channel resolves to no message in the new one, so no panel renders while the
		// rail stays collapsed beside an empty column.
		setThreadRootKey(null);
		// Opening a channel reads it. Write only when something is unread, so channel switching
		// does not spend the write budget on channels that were already read.
		if (channel_has_unread(channel) || channel_mention_count(channel) > 0) {
			// Freeze where the cursor stood BEFORE the write below moves it. The channel places its
			// "New messages" mark on this value, so reading it live would erase the mark a moment
			// after the member arrived.
			setOpenedAtLastReadAt(read_cursor_at(channel));
			// Use only server-observed activity. A fast device clock must not hide later messages.
			const privateLatest = privateActivity.get(channel.key);
			const publicLatest = publicUnreads.get(channel.key)?.latest.timestamp ?? 0;
			mark_channel_read(channel, privateLatest?.at ?? publicLatest, privateLatest?.activity ?? null);
		} else {
			setOpenedAtLastReadAt(null);
		}
		// The switch is announced; focus stays on the invoked channel control (a11y contract C9).
		announce(`#${channel.value.name}`);
		// At narrow widths the drawer closes; the control the focus sat on disappears with
		// it, so focus moves to the drawer toggle to keep keyboard context.
		if (drawerOpen && is_narrow()) {
			setDrawerOpen(false);
			drawerToggleRef.current?.focus();
		}
		return true;
	};

	const handle_select_view = (view: (typeof VIEWS)[number]) => {
		if (view.key !== selectedKey && guard_selected_send_navigation()) {
			return;
		}
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
		if (handle_select_channel(channel)) {
			setThreadRootKey(rootKey);
		}
	};

	const handle_open_create_dialog = () => {
		if (!guard_selected_send_navigation()) {
			setDialog({ kind: "create" });
		}
	};

	// A conflict waits for the newer winner. A size refusal retries without stale channels, and an
	// unavailable call retries the same revision with backoff. All paths share pending maxima.
	useEffect(() => {
		run_public_cursor_retry();
	}, [cursorDoc, publicChannels, run_public_cursor_retry]);

	// Pending debounced mark-reads must not fire against an unmounted page.
	useEffect(() => {
		// StrictMode replays setup after cleanup while the page is still mounted.
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
			const publicRetry = cursorRetryRef.current;
			if (publicRetry !== null && publicRetry.retryTimer !== null) {
				clearTimeout(publicRetry.retryTimer);
			}
			cursorRetryRef.current = null;
			for (const timer of markReadTimersRef.current.values()) {
				clearTimeout(timer);
			}
			markReadTimersRef.current.clear();
			pendingMarkReadsRef.current.clear();
			for (const write of privateCursorWritesRef.current.values()) {
				cancel_private_cursor(write);
			}
			privateCursorWritesRef.current.clear();
			pendingExitKeysRef.current.clear();
			exitMarkBuffersRef.current.clear();
			exitOutcomesRef.current.clear();
			for (const reconciliation of pendingExitReconciliationsRef.current.values()) {
				cancel_exit_reconciliation(reconciliation);
			}
			pendingExitReconciliationsRef.current.clear();
			for (const reconciliation of pendingReaddReconciliationsRef.current.values()) {
				cancel_readd_reconciliation(reconciliation);
			}
			pendingReaddReconciliationsRef.current.clear();
			exactDepartureScopeIdsRef.current.clear();
			checkedDepartureCandidateRevisionsRef.current.clear();
			scopeCandidatesRef.current.clear();
			scopeMembershipRevisionsRef.current.clear();
			pendingSuccessfulLeavesRef.current.clear();
			sendRequestsByChannelRef.current.clear();
			const privateCreateReconciliation = pendingPrivateCreateReconciliationRef.current;
			if (privateCreateReconciliation !== null) {
				cancel_private_create_reconciliation(privateCreateReconciliation);
				pendingPrivateCreateReconciliationRef.current = null;
			}
		};
	}, []);

	const resume_refused_exit = (channelKey: string) => {
		const reconciliation = pendingExitReconciliationsRef.current.get(channelKey);
		if (reconciliation !== undefined) {
			cancel_exit_reconciliation(reconciliation);
			pendingExitReconciliationsRef.current.delete(channelKey);
		}
		pendingSuccessfulLeavesRef.current.delete(channelKey);
		pendingExitKeysRef.current.delete(channelKey);
		exitOutcomesRef.current.delete(channelKey);
		const buffered = exitMarkBuffersRef.current.get(channelKey);
		exitMarkBuffersRef.current.delete(channelKey);
		if (mountedRef.current && buffered !== undefined && liveScopeIdsRef.current.has(channelKey)) {
			schedule_mark_read(buffered.channel, buffered.at, buffered.activity);
		}
	};

	const close_dialog = () => {
		if (dialog?.kind === "exit" && pendingExitReconciliationsRef.current.has(dialog.channel.key)) {
			resume_refused_exit(dialog.channel.key);
		}
		pendingChannelCreateRef.current = null;
		const privateCreateReconciliation = pendingPrivateCreateReconciliationRef.current;
		if (privateCreateReconciliation !== null) {
			cancel_private_create_reconciliation(privateCreateReconciliation);
		}
		pendingPrivateCreateReconciliationRef.current = null;
		setChannelCreateUncertain(false);
		setChannelCreateReconciling(false);
		pendingChannelValueRef.current = null;
		setChannelValueUncertain(false);
		setExitReconciling(false);
		setDialog(null);
		setDialogBusy(false);
		setDialogError(null);
	};

	const resume_readded_exit = (channelKey: string) => {
		pendingDeparturesRef.current.delete(channelKey);
		resume_refused_exit(channelKey);
		pendingReaddedExitFocusRef.current = channelKey;
		close_dialog();
	};

	const settle_departed_exit = (
		channel: chat_Doc<chat_ChannelValue>,
		outcome: "left" | "deleted" | "delete_unconfirmed",
	) => {
		const reconciliation = pendingExitReconciliationsRef.current.get(channel.key);
		if (reconciliation !== undefined) {
			cancel_exit_reconciliation(reconciliation);
			pendingExitReconciliationsRef.current.delete(channel.key);
		}
		pendingSuccessfulLeavesRef.current.delete(channel.key);
		exitOutcomesRef.current.set(channel.key, outcome);
		pendingDeparturesRef.current.set(channel.key, channel);
		const nextLiveScopeIds = new Set(liveScopeIdsRef.current);
		nextLiveScopeIds.delete(channel.key);
		liveScopeIdsRef.current = nextLiveScopeIds;
		scopeMembershipRevisionsRef.current.delete(channel.key);
		// Remove the row now. The scope watch still reconciles later server changes.
		setScopes((current) => current.filter((scope) => scope.scopeId !== channel.key));
		close_dialog();
	};

	const run_exit_reconciliation = (reconciliation: PendingExitReconciliation) => {
		const is_current = () =>
			mountedRef.current &&
			!reconciliation.cancelled &&
			pendingExitReconciliationsRef.current.get(reconciliation.channel.key) === reconciliation;
		const settle_departure = () => {
			exactDepartureScopeIdsRef.current.add(reconciliation.channel.key);
			checkedDepartureCandidateRevisionsRef.current.delete(reconciliation.channel.key);
			settle_departed_exit(reconciliation.channel, reconciliation.action === "leave" ? "left" : "delete_unconfirmed");
			const candidate = scopeCandidatesRef.current.get(reconciliation.channel.key);
			if (candidate !== undefined) {
				reconcile_departed_scope(candidate);
			}
		};
		const schedule_retry = () => {
			if (!is_current() || reconciliation.retryTimer !== null) {
				return;
			}
			const delayMs = reconciliation.retryDelayMs;
			reconciliation.retryTimer = setTimeout(() => {
				reconciliation.retryTimer = null;
				reconciliation.retryDelayMs = Math.min(delayMs * 2, EXIT_READ_RETRY_MAX_MS);
				run_exit_reconciliation(reconciliation);
			}, delayMs);
		};

		if (!is_current() || reconciliation.running || reconciliation.retryTimer !== null) {
			return;
		}
		reconciliation.running = true;
		Promise.resolve()
			.then(() =>
				client.fetchJson("/api/v1/plugin-data/read", { collection: "channels", key: reconciliation.channel.key }),
			)
			.then((answer) => {
				if (!is_current()) {
					return;
				}
				if (answer.status !== 200) {
					reconciliation.running = false;
					schedule_retry();
					return;
				}
				if (answer.body.document === null) {
					reconciliation.running = false;
					settle_departure();
					return;
				}
				const channel = chat_validate_channel_doc(answer.body.document);
				if (
					answer.body.document.collection !== "channels" ||
					channel === null ||
					channel.key !== reconciliation.channel.key ||
					!chat_channel_is_private(channel.key)
				) {
					reconciliation.running = false;
					schedule_retry();
					return;
				}
				// An organization owner can read this document without a scope grant. Check the exact
				// principal list before deciding whether this member still belongs to the channel.
				return client.convex
					.query(client.api.plugins_data.watch_scope_principals, { scopeId: channel.key })
					.then((rawResult) => {
						if (!is_current()) {
							return;
						}
						reconciliation.running = false;
						const result = private_scope_principal_result(rawResult);
						if (result === null) {
							schedule_retry();
							return;
						}
						const principals = result._yay;
						if (principals === null) {
							settle_departure();
							return;
						}
						if (!principals.some((principal) => principal.userId === userId)) {
							settle_departure();
							return;
						}
						pendingDeparturesRef.current.delete(channel.key);
						resume_refused_exit(channel.key);
						setExitReconciling(false);
						setDialogBusy(false);
					});
			})
			.catch(() => {
				if (!is_current()) {
					return;
				}
				reconciliation.running = false;
				schedule_retry();
			});
	};

	const handle_exit_channel = (
		channel: chat_Doc<chat_ChannelValue>,
		action: "leave" | "delete",
		expectedPrincipalCount: number | undefined,
	) => {
		if (pendingExitKeysRef.current.has(channel.key)) {
			return;
		}
		if ((sendRequestsByChannelRef.current.get(channel.key) ?? 0) > 0) {
			setDialogBusy(false);
			setDialogError(MESSAGE_CHANGE_IN_FLIGHT_NAVIGATION_MESSAGE);
			announce(MESSAGE_CHANGE_IN_FLIGHT_NAVIGATION_MESSAGE);
			return;
		}
		const pending = pendingMarkReadsRef.current.get(channel.key);
		if (pending !== undefined) {
			const buffered = exitMarkBuffersRef.current.get(channel.key);
			exitMarkBuffersRef.current.set(channel.key, {
				channel: pending.channel,
				at: Math.max(buffered?.at ?? 0, pending.at),
				activity:
					pending.activity === null
						? null
						: private_activity_max(buffered?.activity ?? EMPTY_PRIVATE_ACTIVITY, pending.activity),
			});
		}
		pendingExitKeysRef.current.add(channel.key);
		exitOutcomesRef.current.set(channel.key, "pending");
		// Keep a write that already reached the server. If exit is refused, its queued maximum still
		// completes; if exit succeeds, the scope mutation or the next live-scope update stops it.
		cancel_pending_mark_read(channel.key, false);
		setDialogBusy(true);
		setDialogError(null);
		const change = client.convex.mutation(client.api.plugins_data.user_manage_scope, {
			action:
				action === "delete"
					? {
							kind: "delete",
							scopeId: channel.key,
							...(expectedPrincipalCount === undefined ? {} : { expectedPrincipalCount }),
						}
					: {
							kind: "remove_principal",
							scopeId: channel.key,
							userId,
							...(expectedPrincipalCount === undefined ? {} : { expectedPrincipalCount }),
						},
		});
		const handle_uncertain_exit = (message: string) => {
			const reconciliation: PendingExitReconciliation = {
				channel,
				action,
				running: false,
				retryDelayMs: EXIT_READ_RETRY_INITIAL_MS,
				retryTimer: null,
				cancelled: false,
			};
			pendingExitReconciliationsRef.current.set(channel.key, reconciliation);
			setDialogBusy(false);
			setExitReconciling(true);
			setDialogError(message);
			run_exit_reconciliation(reconciliation);
		};
		change
			.then((result) => {
				if (!mountedRef.current) {
					return;
				}
				if (result._nay) {
					resume_refused_exit(channel.key);
					setDialogBusy(false);
					setDialogError(
						result._nay.name === "conflict"
							? "Who is in this channel changed. Close it and try again."
							: result._nay.message,
					);
					return;
				}
				if (action === "leave" && !result._yay.deleted) {
					const currentRevision = scopeMembershipRevisionsRef.current.get(channel.key);
					if (currentRevision === undefined) {
						settle_departed_exit(channel, "left");
						return;
					}
					if (currentRevision > result._yay.membershipRevision) {
						// A later membership change added this member back, so keep the live channel.
						resume_readded_exit(channel.key);
						return;
					}
					// The Leave reply can arrive before its full scope-list update. Keep the request
					// pending until that exact scope is absent or a newer membership change appears.
					pendingSuccessfulLeavesRef.current.set(channel.key, {
						channel,
						membershipRevision: result._yay.membershipRevision,
					});
					return;
				}
				settle_departed_exit(channel, result._yay.deleted ? "deleted" : "left");
			})
			.catch((error: unknown) => {
				if (!mountedRef.current) {
					return;
				}
				// A rejected call is uncertain: read the exact channel, because a cached full scope
				// list cannot prove the write result.
				handle_uncertain_exit(chat_get_error_message(error));
			});
	};

	// A successful Leave may be newer than the last scope-list delivery. Only this target scope's
	// absence, or a strictly newer target membership revision, can settle that pending result.
	useEffect(() => {
		for (const [scopeId, pending] of pendingSuccessfulLeavesRef.current) {
			const currentRevision = scopeMembershipRevisionsRef.current.get(scopeId);
			if (currentRevision === undefined) {
				settle_departed_exit(pending.channel, "left");
				continue;
			}
			if (currentRevision > pending.membershipRevision) {
				resume_readded_exit(scopeId);
			}
		}
	}, [scopeDeliveryVersion]);

	const run_private_create_reconciliation = (reconciliation: PendingPrivateCreateReconciliation) => {
		const is_current = () =>
			mountedRef.current &&
			!reconciliation.cancelled &&
			pendingPrivateCreateReconciliationRef.current === reconciliation;
		const schedule_retry = () => {
			if (!is_current() || reconciliation.retryTimer !== null) {
				return;
			}
			const delayMs = reconciliation.retryDelayMs;
			reconciliation.retryTimer = setTimeout(() => {
				reconciliation.retryTimer = null;
				reconciliation.retryDelayMs = Math.min(delayMs * 2, PRIVATE_CREATE_RETRY_MAX_MS);
				run_private_create_reconciliation(reconciliation);
			}, delayMs);
		};
		const stop_with_locked_retry = (message: string) => {
			cancel_private_create_reconciliation(reconciliation);
			pendingPrivateCreateReconciliationRef.current = null;
			setChannelCreateUncertain(true);
			setChannelCreateReconciling(false);
			setDialogBusy(false);
			setDialogError(message);
		};

		if (!is_current() || reconciliation.running || reconciliation.retryTimer !== null) {
			return;
		}
		reconciliation.running = true;
		Promise.resolve()
			.then(() =>
				client.fetchJson("/api/v1/plugin-data/read", { collection: "channels", key: reconciliation.key }),
			)
			.then((answer) => {
				if (!is_current()) {
					return;
				}
				if (answer.status !== 200) {
					reconciliation.running = false;
					schedule_retry();
					return;
				}
				if (answer.body.document === null) {
					reconciliation.running = false;
					// Null hides absent, released, and unreadable scopes. Keep the exact key until Cancel.
					stop_with_locked_retry(PRIVATE_CREATE_READ_ABSENT_MESSAGE);
					return;
				}
				const channel = chat_validate_channel_doc(answer.body.document);
				if (
					answer.body.document.collection !== "channels" ||
					channel === null ||
					channel.key !== reconciliation.key ||
					!chat_channel_is_private(channel.key)
				) {
					reconciliation.running = false;
					schedule_retry();
					return;
				}
				// An organization owner can read this document without a direct scope grant. Require
				// the exact principal list before treating the create as available to this member.
				return client.convex
					.query(client.api.plugins_data.watch_scope_principals, { scopeId: channel.key })
					.then((rawResult) => {
						if (!is_current()) {
							return;
						}
						reconciliation.running = false;
						const result = private_scope_principal_result(rawResult);
						if (result === null) {
							schedule_retry();
							return;
						}
						const principals = result._yay;
						if (principals === null || !principals.some((principal) => principal.userId === userId)) {
							stop_with_locked_retry(PRIVATE_CREATE_PRINCIPAL_MISSING_MESSAGE);
							return;
						}
						cancel_private_create_reconciliation(reconciliation);
						pendingPrivateCreateReconciliationRef.current = null;
						setSelectedKey(reconciliation.key);
						setOpenedAtLastReadAt(null);
						close_dialog();
					});
			})
			.catch(() => {
				if (!is_current()) {
					return;
				}
				reconciliation.running = false;
				schedule_retry();
			});
	};

	// A lost reply leaves the exact compare-and-set request locked until the watch shows its result.
	useEffect(() => {
		const pending = pendingChannelValueRef.current;
		if (
			!channelValueUncertain ||
			pending === null ||
			dialog === null ||
			(dialog.kind !== "rename" && dialog.kind !== "archive") ||
			dialog.channel.key !== pending.channelKey
		) {
			return;
		}
		const channel = channels.find((entry) => entry.key === pending.channelKey);
		if (channel === undefined) {
			close_dialog();
			return;
		}
		if (channel.revision <= pending.expectedRevision) {
			return;
		}
		const matches =
			pending.sectionMoveRequestId === null
				? channel.value.name === pending.value.name && (channel.value.topic ?? "") === (pending.value.topic ?? "")
				: channel.value.archivedAt !== null;
		if (matches) {
			close_dialog();
			return;
		}
		pendingChannelValueRef.current = null;
		setChannelValueUncertain(false);
		setDialogBusy(false);
		setDialog((current) =>
			current !== null &&
			(current.kind === "rename" || current.kind === "archive") &&
			current.channel.key === channel.key
				? { ...current, channel }
				: current,
		);
		setDialogError("Someone else changed this channel while the request was pending. Review it and try again.");
	}, [channelValueUncertain, channels, dialog]);

	const handle_create_channel = (
		name: string,
		topic: string,
		people: { isPrivate: boolean; userIds: GenericId<"users">[] },
	) => {
		setDialogBusy(true);
		setDialogError(null);
		// Public channels go through the backend, which mints the key and dedupes by
		// clientRequestId. Private channels still create the scope, invitees, and this first
		// shared document together through the user door, so a refusal cannot leave partial
		// setup behind; their transcript projection bootstraps on the first send.
		const pending = pendingChannelCreateRef.current;
		const retryingUncertain = channelCreateUncertain && pending !== null;
		const attempt = retryingUncertain
			? pending
			: {
					key: chat_create_channel_key(people.isPrivate ? "private" : "public"),
					name,
					topic,
					isPrivate: people.isPrivate,
					userIds: [...people.userIds],
					clientRequestId: crypto.randomUUID(),
				};
		pendingChannelCreateRef.current = attempt;
		setChannelCreateUncertain(false);
		setChannelCreateReconciling(false);

		(async (/* iife */) => {
			const finish_created = (selectedKey: string) => {
				// The sidebar shows the channel when the watch delivers it; select it now.
				setSelectedKey(selectedKey);
				// A channel this member just created has nothing unread, and the frozen cursor belongs
				// to the channel they were reading before this one.
				setOpenedAtLastReadAt(null);
				close_dialog();
			};

			if (!attempt.isPrivate) {
				const result = await chat_invoke_backend(client, "channel-manage", {
					action: "create",
					name: attempt.name,
					topic: attempt.topic === "" ? null : attempt.topic,
					clientRequestId: attempt.clientRequestId,
				});
				if ("_nay" in result) {
					if (result._nay.name === "unavailable") {
						setChannelCreateUncertain(true);
						setChannelCreateReconciling(false);
						setDialogBusy(false);
						setDialogError(result._nay.message);
						return;
					}
					pendingChannelCreateRef.current = null;
					setChannelCreateUncertain(false);
					setDialogBusy(false);
					setDialogError(result._nay.message);
					return;
				}
				const channelKey = result._yay.channelKey;
				if (typeof channelKey !== "string") {
					pendingChannelCreateRef.current = null;
					setChannelCreateUncertain(false);
					setDialogBusy(false);
					setDialogError("The Chitchat backend answered without a channel key");
					return;
				}
				finish_created(channelKey);
				return;
			}

			const value = {
				name: attempt.name,
				archivedAt: null,
				...(attempt.topic === "" ? {} : { topic: attempt.topic }),
			} satisfies chat_ChannelValue;
			const result = await client.convex.mutation(client.api.plugins_data.user_manage_scope, {
				action: {
					kind: "create_with_document",
					scopeId: attempt.key,
					collections: chat_PRIVATE_CHANNEL_COLLECTIONS,
					keyPrefix: attempt.key,
					principals: attempt.userIds.map((userId) => ({ userId, level: "member" as const })),
					document: { collection: "channels", key: attempt.key, value },
				},
			});
			if (result._nay) {
				// A private scope may have changed or been released after an uncertain store, so
				// read the exact current channel instead.
				if (retryingUncertain && result._nay.name === "conflict") {
					const reconciliation: PendingPrivateCreateReconciliation = {
						key: attempt.key,
						running: false,
						retryDelayMs: PRIVATE_CREATE_RETRY_INITIAL_MS,
						retryTimer: null,
						cancelled: false,
					};
					pendingPrivateCreateReconciliationRef.current = reconciliation;
					setChannelCreateUncertain(true);
					setChannelCreateReconciling(true);
					setDialogBusy(false);
					setDialogError("Checking whether this private channel was created.");
					run_private_create_reconciliation(reconciliation);
					return;
				}
				pendingChannelCreateRef.current = null;
				setChannelCreateUncertain(false);
				setDialogBusy(false);
				setDialogError(result._nay.message);
				return;
			}
			finish_created(attempt.key);
		})().catch((error: unknown) => {
			// A rejected call may still have created the channel. Keep the exact key for a retry.
			setChannelCreateUncertain(true);
			setChannelCreateReconciling(false);
			setDialogBusy(false);
			setDialogError(chat_get_error_message(error));
		});
	};

	const put_channel_value = (channel: chat_Doc<chat_ChannelValue>, value: chat_ChannelValue) => {
		const pending = pendingChannelValueRef.current;
		const retryingUncertain = channelValueUncertain && pending !== null;
		const movesChannelSection = (channel.value.archivedAt !== null) !== (value.archivedAt !== null);
		const attempt: PendingChannelValue = retryingUncertain
			? pending
			: {
					channelKey: channel.key,
					value,
					expectedRevision: channel.revision,
					sectionMoveRequestId: movesChannelSection ? Symbol() : null,
				};
		pendingChannelValueRef.current = attempt;
		setChannelValueUncertain(false);
		if (!retryingUncertain && attempt.sectionMoveRequestId !== null) {
			pendingChannelSectionMovesRef.current.set(attempt.sectionMoveRequestId, {
				channelKey: attempt.channelKey,
				sourceRevision: attempt.expectedRevision,
				archived: attempt.value.archivedAt !== null,
			});
		}
		setDialogBusy(true);
		setDialogError(null);
		// The backend serializes channel updates on the installation lock and refreshes the
		// projected transcript (README row, tail header) in the same run. The merged update is
		// idempotent, so an uncertain retry repeats it safely.
		chat_invoke_backend(client, "channel-manage", {
			action: "update",
			channelKey: attempt.channelKey,
			name: attempt.value.name,
			topic: attempt.value.topic ?? null,
			archived: attempt.value.archivedAt !== null,
		})
			.then((result) => {
				if ("_nay" in result) {
					if (result._nay.name === "unavailable" || (retryingUncertain && result._nay.name === "conflict")) {
						// An exact retry conflict means the stored revision moved. Let the watch say which value won.
						setChannelValueUncertain(true);
						setDialogBusy(false);
						setDialogError(result._nay.message);
						return;
					}
					pendingChannelValueRef.current = null;
					setChannelValueUncertain(false);
					if (attempt.sectionMoveRequestId !== null && result._nay.name !== "conflict") {
						pendingChannelSectionMovesRef.current.delete(attempt.sectionMoveRequestId);
					}
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
				// Keep the exact request until a newer watch value proves whether it committed.
				setChannelValueUncertain(true);
				setDialogBusy(false);
				setDialogError(chat_get_error_message(error));
			});
	};

	const handle_unarchive = (channel: chat_Doc<chat_ChannelValue>) => {
		const sectionMoveRequestId = Symbol();
		pendingChannelSectionMovesRef.current.set(sectionMoveRequestId, {
			channelKey: channel.key,
			sourceRevision: channel.revision,
			archived: false,
		});
		chat_invoke_backend(client, "channel-manage", { action: "update", channelKey: channel.key, archived: false })
			.then((result) => {
				if ("_nay" in result) {
					// Conflict and unavailable can race a committed winner. Let the watch settle them.
					if (result._nay.name !== "conflict" && result._nay.name !== "unavailable") {
						pendingChannelSectionMovesRef.current.delete(sectionMoveRequestId);
					}
					announce(result._nay.message);
				}
			})
			.catch((error: unknown) => {
				// Keep an uncertain request until a newer watch value proves whether it committed.
				announce(chat_get_error_message(error));
			});
	};

	if (channelsRead === null) {
		return (
			<div className="chitchat">
				<div className="page-dead" role="alert">
					<h1>Chitchat</h1>
					<p>{channels_death_message(client)}</p>
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
	const selectedSendInFlight = selected !== null && (sendRequestsByChannel[selected.key] ?? 0) > 0;

	// The Unreads sidebar row aggregates what the channel rows show one by one.
	const unreadChannelCount = activeChannels.filter(channel_has_unread).length;
	const totalMentions = activeChannels.reduce((sum, channel) => sum + channel_mention_count(channel), 0);
	const unwatchedScopeCount = Math.max(0, scopes.length - watchedScopes.length);

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
						const privateScope = scopes.find((scope) => scope.scopeId === channel.key);
						return (
							<li key={channel.key} className="channel-item" data-channel-key={channel.key}>
								<button
									type="button"
									className={hasUnread || mentionCount > 0 ? "channel-link is-unread" : "channel-link"}
									aria-current={channel.key === selectedKey ? "page" : undefined}
									disabled={selectedSendInFlight && (channel.key !== selectedKey || threadRootKey !== null)}
									onClick={() => handle_select_channel(channel)}
								>
									{/* The collapsed rail shows this initial; the full name below stays in the
								    accessibility tree at every width, so the button is never announced as one
								    letter. aria-hidden keeps the initial out of that name. */}
									<span className="channel-initial" aria-hidden="true">
										{channel.value.name.slice(0, 1).toUpperCase()}
									</span>
									<span className="channel-name">
										{/* One text node on purpose. Wrapping the "#" in its own element to dim it
									    made the accessible name "# general" instead of "#general", which is the
									    name members hear and every QA locator matches on. */}
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
									<ChannelRowMenu
										channelName={channel.value.name}
										items={[
											...(chat_channel_is_private(channel.key)
												? [
														{
															id: "people",
															label: `People in #${channel.value.name}`,
															onSelect: () => setDialog({ kind: "people", channel }),
														},
													]
												: []),
											{
												id: "rename",
												label: `Rename #${channel.value.name}`,
												onSelect: () => setDialog({ kind: "rename", channel }),
											},
											channel.value.archivedAt === null
												? {
														id: "archive",
														label: `Archive #${channel.value.name}`,
														onSelect: () => setDialog({ kind: "archive", channel }),
													}
												: {
														id: "unarchive",
														label: `Unarchive #${channel.value.name}`,
														onSelect: () => handle_unarchive(channel),
													},
											...(privateScope
												? [
														{ id: "private-exit-separator", separator: true as const },
														{
															id: "leave",
															label: `Leave #${channel.value.name}`,
															danger: true,
															onSelect: () => setDialog({ kind: "exit", action: "leave", channel }),
														},
														...(privateScope.level === "manage"
															? [
																	{
																		id: "delete",
																		label: `Delete #${channel.value.name} for everyone`,
																		danger: true,
																		onSelect: () => setDialog({ kind: "exit", action: "delete", channel }),
																	},
																]
															: []),
													]
												: []),
										]}
									/>
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	};

	return (
		<div
			ref={appRef}
			className="chitchat"
			onFocusCapture={(event) => {
				const target = event.target as HTMLElement;
				responsiveFocusOwnerRef.current =
					target === drawerToggleRef.current
						? "drawer"
						: navRef.current?.contains(target)
							? "sidebar"
							: target.classList.contains("thread-resize")
								? "separator"
								: null;
			}}
		>
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
				className={["sidebar", drawerOpen ? "is-open" : "", railExpanded ? "is-expanded" : ""]
					.filter(Boolean)
					.join(" ")}
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
						<button
							type="button"
							className="button sidebar-create"
							disabled={selectedSendInFlight}
							onClick={handle_open_create_dialog}
						>
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
									disabled={selectedSendInFlight}
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
						privateActivity={privateActivity}
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
						onRequestStart={() => handle_send_request_start(selected.key)}
						onRequestSettled={() => handle_send_request_settled(selected.key)}
						sendInFlight={selectedSendInFlight}
						onNewestVisible={(timestamp) => handle_newest_visible(selected, timestamp)}
						openedAtLastReadAt={openedAtLastReadAt}
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
					waiting={channelCreateReconciling}
					fieldsLocked={channelCreateUncertain}
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
					waiting={false}
					fieldsLocked={channelValueUncertain}
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
					retry={channelValueUncertain}
					error={dialogError}
					onConfirm={() => put_channel_value(dialog.channel, { ...dialog.channel.value, archivedAt: Date.now() })}
					onClose={close_dialog}
				/>
			) : null}
			{dialog !== null && dialog.kind === "exit" ? (
				<ExitChannelDialog
					client={client}
					channel={dialog.channel}
					action={dialog.action}
					busy={dialogBusy}
					waiting={exitReconciling}
					error={dialogError}
					onConfirm={(expectedPrincipalCount) =>
						handle_exit_channel(dialog.channel, dialog.action, expectedPrincipalCount)
					}
					onClose={close_dialog}
				/>
			) : null}
			{/* The single polite announcer. It is permanently mounted and fed ONLY with
			    state changes and channel switches — never the user's own sent messages. */}
			<div className="chitchat-announcer visually-hidden" role="status" aria-live="polite">
				<span data-announcement-sequence={String(announcement.sequence)} />
				{spokenText}
			</div>
		</div>
	);
}

// #endregion app
