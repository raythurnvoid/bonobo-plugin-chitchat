import type { BonoboUiFrontendClient } from "bonobo-plugin-sdk/frontend";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
	chat_CHANNEL_NAME_MAX_LENGTH,
	chat_create_channel_key,
	chat_get_error_message,
	chat_validate_channel_doc,
	type chat_ChannelValue,
	type chat_Doc,
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
function use_member_names(client: BonoboUiFrontendClient): chat_MemberNamesApi {
	const namesRef = useRef(new Map<string, string | null>());
	const requestedRef = useRef(new Set<string>());
	// The value is never read; setting it re-renders consumers after names land.
	const [, setResolutionCount] = useState(0);

	const get = useCallback((userId: string) => {
		return namesRef.current.has(userId) ? namesRef.current.get(userId)! : undefined;
	}, []);

	const resolve = useCallback(
		async (userIds: string[]) => {
			const missing = [...new Set(userIds)].filter((id) => !requestedRef.current.has(id));
			if (missing.length === 0) {
				return;
			}
			for (const id of missing) {
				requestedRef.current.add(id);
			}
			// The bridge accepts at most 50 ids per request.
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

// #endregion member names

// #region channel dialogs

function ChannelNameDialog(props: {
	title: string;
	submitLabel: string;
	initialName: string;
	busy: boolean;
	error: string | null;
	onSubmit: (name: string) => void;
	onClose: () => void;
}) {
	const titleId = useId();
	const inputId = useId();
	const [name, setName] = useState(props.initialName);
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
		setValidationError(null);
		props.onSubmit(trimmed);
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

// #region app

type ChannelDialogState =
	| { kind: "create" }
	| { kind: "rename"; channel: chat_Doc<chat_ChannelValue> }
	| { kind: "archive"; channel: chat_Doc<chat_ChannelValue> };

export function App(props: { client: BonoboUiFrontendClient }) {
	const { client } = props;
	const userId = client.context.userId;
	const memberNames = use_member_names(client);
	const [channels, setChannels] = useState<chat_Doc<chat_ChannelValue>[]>([]);
	const [channelsLoaded, setChannelsLoaded] = useState(false);
	const [channelsDead, setChannelsDead] = useState(false);
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [showArchived, setShowArchived] = useState(false);
	const [dialog, setDialog] = useState<ChannelDialogState | null>(null);
	const [dialogBusy, setDialogBusy] = useState(false);
	const [dialogError, setDialogError] = useState<string | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [announcement, setAnnouncement] = useState({ sequence: 0, text: "" });
	const navRef = useRef<HTMLElement | null>(null);
	const drawerToggleRef = useRef<HTMLButtonElement | null>(null);

	const announce = useCallback((text: string) => {
		setAnnouncement((current) => ({ sequence: current.sequence + 1, text }));
	}, []);

	// The channels watch is the page's primary subscription: when the host kills it the
	// member lost access, and the whole page switches to the permission-lost state.
	useEffect(() => {
		const store = chat_create_window_store(chat_validate_channel_doc);
		const unsubscribe = client.data.watch({ collection: "channels", limit: 100 }, (docs) => {
			if (docs === null) {
				setChannelsDead(true);
				return;
			}
			// Channel keys are client-generated, so the sidebar sorts by name.
			const sorted = [...store.apply_window(docs)].sort((a, b) => a.value.name.localeCompare(b.value.name));
			setChannels(sorted);
			setChannelsLoaded(true);
		});
		return unsubscribe;
	}, [client]);

	// Pick the first active channel once channels load and nothing is selected yet.
	useEffect(() => {
		if (selectedKey === null) {
			const firstActive = channels.find((channel) => channel.value.archivedAt === null);
			if (firstActive !== undefined) {
				setSelectedKey(firstActive.key);
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

	const handle_select_channel = (channel: chat_Doc<chat_ChannelValue>) => {
		setSelectedKey(channel.key);
		// The switch is announced; focus stays on the invoked channel control (a11y contract C9).
		announce(`#${channel.value.name}`);
		// At narrow widths the drawer closes; the control the focus sat on disappears with
		// it, so focus moves to the drawer toggle to keep keyboard context.
		if (drawerOpen && is_narrow()) {
			setDrawerOpen(false);
			drawerToggleRef.current?.focus();
		}
	};

	const close_dialog = () => {
		setDialog(null);
		setDialogBusy(false);
		setDialogError(null);
	};

	const handle_create_channel = (name: string) => {
		setDialogBusy(true);
		setDialogError(null);
		// Create through put with a client-generated key: put on an absent key creates a
		// SHARED doc, so any member can rename or archive the channel later.
		const key = chat_create_channel_key();
		client.data
			.put({ collection: "channels", key, value: { name, archivedAt: null } satisfies chat_ChannelValue })
			.then((result) => {
				if ("_nay" in result) {
					setDialogBusy(false);
					setDialogError(result._nay.message);
					return;
				}
				// The sidebar shows the channel when the watch delivers it; select it now.
				// (0.8.0 put results carry only revision and byteSize, so use the local key.)
				setSelectedKey(key);
				close_dialog();
			})
			.catch((error: unknown) => {
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

	if (channelsDead) {
		return (
			<div className="chitchat">
				<div className="page-dead" role="alert">
					<h1>Chitchat</h1>
					<p>
						Access to this plugin's data ended — the plugin may have been disabled or your permissions changed. The
						composer is disabled. Reload the page after access is restored.
					</p>
				</div>
			</div>
		);
	}

	const visibleChannels = channels.filter((channel) => showArchived || channel.value.archivedAt === null);
	const selected = channels.find((channel) => channel.key === selectedKey) ?? null;

	return (
		<div className="chitchat">
			<button
				ref={drawerToggleRef}
				type="button"
				className="button drawer-toggle"
				aria-expanded={drawerOpen}
				onClick={() => setDrawerOpen((current) => !current)}
			>
				Channels
			</button>
			<nav
				ref={navRef}
				className={drawerOpen ? "sidebar is-open" : "sidebar"}
				aria-label="Channels"
				tabIndex={-1}
			>
				<div className="sidebar-head">
					<h1 className="sidebar-title">Chitchat</h1>
					<button type="button" className="button" onClick={() => setDialog({ kind: "create" })}>
						Create channel
					</button>
				</div>
				{!channelsLoaded ? (
					<div className="channel-status" role="status">
						Loading channels…
					</div>
				) : visibleChannels.length === 0 ? (
					<div className="channel-status">No channels yet</div>
				) : (
					<ul className="channel-list">
						{visibleChannels.map((channel) => (
							<li key={channel.key} className="channel-item">
								<button
									type="button"
									className="channel-link"
									aria-current={channel.key === selectedKey ? "page" : undefined}
									onClick={() => handle_select_channel(channel)}
								>
									#{channel.value.name}
									{channel.value.archivedAt !== null ? " (archived)" : ""}
								</button>
								<span className="channel-item-actions">
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
						))}
					</ul>
				)}
				<button
					type="button"
					className="button sidebar-archived-toggle"
					aria-pressed={showArchived}
					onClick={() => setShowArchived((current) => !current)}
				>
					Show archived
				</button>
			</nav>
			<main className="main">
				{selected !== null ? (
					<ChannelView
						key={selected.key}
						client={client}
						userId={userId}
						channel={selected}
						memberNames={memberNames}
						announce={announce}
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
					busy={dialogBusy}
					error={dialogError}
					onSubmit={handle_create_channel}
					onClose={close_dialog}
				/>
			) : null}
			{dialog !== null && dialog.kind === "rename" ? (
				<ChannelNameDialog
					title={`Rename #${dialog.channel.value.name}`}
					submitLabel="Rename"
					initialName={dialog.channel.value.name}
					busy={dialogBusy}
					error={dialogError}
					onSubmit={(name) => put_channel_value(dialog.channel, { ...dialog.channel.value, name })}
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
				<span data-announcement-sequence={String(announcement.sequence)}>{announcement.sequence}</span>
				{announcement.text !== "" ? ` ${announcement.text}` : ""}
			</div>
		</div>
	);
}

// #endregion app
