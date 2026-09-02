import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type {
	BonoboUiFrontendClient,
	BonoboUiScopePrincipal,
	BonoboUiScopePrincipalListResult,
	BonoboUiTheme,
} from "bonobo-plugin-sdk/frontend";
import { StrictMode } from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { App } from "./app";
import {
	chat_ANONYMOUS_MEMBER_LABEL,
	chat_mention_roster_refusal_copy,
	chat_PRIVATE_CHANNEL_COLLECTIONS,
} from "./chat-data";

function inv(epochMs: number): string {
	return String(9_999_999_999_999 - epochMs).padStart(13, "0");
}

const DAY_MS = 24 * 60 * 60 * 1000;

// Channel keys are client-generated UUIDs.
const CH1_KEY = "11111111-1111-4111-8111-111111111111";
const CH2_KEY = "22222222-2222-4222-8222-222222222222";
const CH3_KEY = "33333333-3333-4333-8333-333333333333";

function channel_doc(
	key: string,
	name: string,
	archivedAt: number | null = null,
	valueExtra: Record<string, unknown> = {},
) {
	return {
		collection: "channels",
		key,
		value: { name, archivedAt, ...valueExtra },
		revision: 1,
		createdBy: "user_me",
		updatedBy: "user_me",
		ownership: "owned",
		createdAt: 1,
		updatedAt: 1,
	};
}

/** This member's own read cursor for one private channel, as the scope's channels read delivers it. */
function private_cursor_doc(channelKey: string, at: number, revision = 1, activity = { messages: 0, replies: 0 }) {
	return {
		collection: "channels",
		key: `${channelKey}:read:user_me`,
		value: { at, activity },
		revision,
		createdBy: "user_me",
		updatedBy: "user_me",
		ownership: "owned",
		createdAt: 1,
		updatedAt: 1,
	};
}

function legacy_private_cursor_doc(channelKey: string, at: number, revision = 1) {
	return { ...private_cursor_doc(channelKey, at, revision), value: { at } };
}

/** The member's public cursor map doc, as the cursors watch delivers it. */
function cursor_doc(channels: Record<string, number>, revision = 1) {
	return {
		collection: "cursors",
		key: "me:user_me",
		value: { channels },
		revision,
		createdBy: "user_me",
		updatedBy: "user_me",
		ownership: "owned",
		createdAt: 1,
		updatedAt: 1,
	};
}

function message_doc(
	epochMs: number,
	overrides: {
		channelKey?: string;
		rand?: string;
		text?: string;
		createdBy?: string;
		revision?: number;
		editedAt?: number | null;
		deletedAt?: number | null;
		attachments?: { fileNodeId: string; name: string }[];
		mentions?: string[];
	} = {},
) {
	return {
		collection: "messages",
		key: `${overrides.channelKey ?? CH1_KEY}:${inv(epochMs)}:${overrides.rand ?? "aaaa"}`,
		value: {
			text: overrides.text ?? `text-${epochMs}`,
			attachments: overrides.attachments ?? [],
			editedAt: overrides.editedAt ?? null,
			deletedAt: overrides.deletedAt ?? null,
			...(overrides.mentions === undefined ? {} : { mentions: overrides.mentions }),
		},
		revision: overrides.revision ?? 1,
		createdBy: overrides.createdBy ?? "user_other",
		updatedBy: overrides.createdBy ?? "user_other",
		ownership: "owned",
		createdAt: epochMs,
		updatedAt: epochMs,
	};
}

function reaction_doc(targetKey: string, token: string, createdBy: string, keyTail = createdBy) {
	return {
		collection: "reactions",
		key: `${targetKey}:${token}:${keyTail}`,
		value: {},
		revision: 1,
		createdBy,
		updatedBy: createdBy,
		ownership: "owned",
		createdAt: 1,
		updatedAt: 1,
	};
}

type WatchUpdate = { docs: unknown[]; truncated: boolean };

/** The death payload the SDK hands a watch alongside its final null. */
type WatchDeathInfo = { reason?: string; message?: string };

type WatchSub = {
	opts: { collection: string; keyPrefix?: string; limit: number };
	onUpdate: (update: WatchUpdate | null, info?: WatchDeathInfo) => void;
	unsubscribed: boolean;
};

/** Builds one watch update payload; `truncated` defaults to a read that reached everything. */
function watch_update(docs: unknown[], truncated = false): WatchUpdate {
	return { docs, truncated };
}

type RecentSub = {
	opts: {
		collection: string;
		limit: number;
		order?: "asc" | "desc";
		since?: number;
		before?: number;
		scopeId?: string;
	};
	onUpdate: (update: WatchUpdate | null, info?: WatchDeathInfo) => void;
	unsubscribed: boolean;
};

type ChangesSub = {
	opts: { collection: string; limit: number; updatedSince?: number; scopeId?: string };
	onUpdate: (update: WatchUpdate | null, info?: WatchDeathInfo) => void;
	unsubscribed: boolean;
};

type WindowUpdate = { docs: unknown[]; hasMore: boolean; atCapacity: boolean; incomplete: boolean };

type WindowSub = {
	opts: { collection: string; keyPrefix?: string; pageSize: number };
	onUpdate: (update: WindowUpdate | null, info?: WatchDeathInfo) => void;
	unsubscribed: boolean;
	loadOlderCalls: number;
};

/** Builds one watchWindow update payload; flags default to a fully covered window. */
function window_update(docs: unknown[], overrides: Partial<Omit<WindowUpdate, "docs">> = {}): WindowUpdate {
	return { docs, hasMore: false, atCapacity: false, incomplete: false, ...overrides };
}

// The two fields the plugin actually reads off a write: `key` for the send queue, `revision`
// for the next compare-and-set. The real SDK also answers `byteSize`, which nothing here reads.
type WriteResult = { _yay: { key: string; revision: number } } | { _nay: { name?: string; message: string } };
type AppendOpts = { collection: string; keyPrefix?: string; value: Record<string, unknown>; clientRequestId?: string };
type PutOpts = { collection: string; key: string; value: Record<string, unknown>; expectedRevision?: number };
type InvokeOpts = { endpoint: string; input: Record<string, unknown> };
type InvokeResult =
	| { _yay: { runId: string; pluginStatus: number; output: string; outputTruncated: boolean } }
	| { _nay: { name: string; message: string; retryAfterMs?: number } };

/** Wraps a backend answer the way the invoke door delivers a finished run: the body as JSON text. */
function invoke_ok(body: Record<string, unknown>, pluginStatus = 200): InvokeResult {
	return { _yay: { runId: "run1", pluginStatus, output: JSON.stringify(body), outputTruncated: false } };
}

/** A relayed backend refusal: a non-2xx pluginStatus still resolves `_yay`, not `_nay`. */
function invoke_refused(pluginStatus: number, message: string): InvokeResult {
	return invoke_ok({ message }, pluginStatus);
}

/** A door-level failure — busy, denied, unavailable — where the run may never have started. */
function invoke_nay(name: string, message: string, retryAfterMs?: number): InvokeResult {
	return { _nay: { name, message, ...(retryAfterMs === undefined ? {} : { retryAfterMs }) } };
}
type KeyOpts = { collection: string; key: string };
type MembersListResult =
	| { _yay: { members: { userId: string; displayName: string | null }[]; cursor: string | null } }
	| { _nay: { name: string; message: string } };
type ScopeChangeResult =
	| { _yay: { scopeId: string; deleted: boolean; membershipRevision: number } }
	| { _nay: { name?: string; message: string } };
type FetchInit = { method?: string; headers?: Record<string, string>; body?: Record<string, unknown> };
type ScopeEntry = {
	scopeId: string;
	keyPrefix: string;
	collections: string[];
	level: "member" | "manage";
	membershipRevision: number;
	appendActivity: { collection: string; at: number; createdByUserId: string; sequence: number }[];
};
type ScopeFixture = Omit<ScopeEntry, "membershipRevision" | "appendActivity"> & {
	membershipRevision?: number;
	appendActivity?: (Omit<ScopeEntry["appendActivity"][number], "sequence"> & { sequence?: number })[];
};
type ScopeChangeOpts = { scopeId: string; expectedPrincipalCount?: number };
type ScopeWatchCallback = (scopes: ScopeEntry[] | null, info?: WatchDeathInfo) => void;

function make_harness() {
	let putRevision = 1;
	const watches: WatchSub[] = [];
	const recents: RecentSub[] = [];
	const windows: WindowSub[] = [];
	const changes: ChangesSub[] = [];
	const names: Record<string, string | null> = { user_me: "Me", user_other: "Bob", user_third: "Cleo" };
	const scopeMembershipRevisions = new Map<string, number>();
	const next_scope_membership_revision = (scopeId: string) => {
		const revision = (scopeMembershipRevisions.get(scopeId) ?? 0) + 1;
		scopeMembershipRevisions.set(scopeId, revision);
		return revision;
	};
	/**
	 * Every call the page makes that changes or reads a scope, in order, next to the data writes.
	 * The order is the point: a channel document written before its scope exists can never be made
	 * private afterwards, because a scope refuses a key range that already holds documents.
	 */
	const calls: { op: string; args: Record<string, unknown> }[] = [];
	/** What `scopes.listPrincipals` answers per scope. A missing entry answers null, as the server does. */
	const scopePrincipals = new Map<string, { userId: string; level: "member" | "manage" }[]>();
	/** Live subscribers to `scopes.watchMine`, so a test can hand the page a private range. */
	const scopeWatchers: ScopeWatchCallback[] = [];
	const client = {
		context: {
			kind: "page",
			pluginName: "chitchat",
			userId: "user_me",
			pageId: "chat",
			pageTitle: "Chitchat",
			organizationId: "org1",
			workspaceId: "ws1",
		},
		apiOrigin: "https://api.example",
		getToken: vi.fn(async () => "tok"),
		refreshToken: vi.fn(async () => "tok"),
		fetchJson: vi.fn<(path: string, init?: FetchInit) => Promise<unknown>>(async (path: string) => {
			// Companion HTTP lists run after the first messages-window delivery. An empty finished
			// page covers every rendered row, which is the ordinary test default.
			if (path === "/api/v1/plugin-data/list") {
				return { documents: [], cursor: null, isDone: true };
			}
			throw new Error("fetchJson not stubbed");
		}),
		data: {
			watch: vi.fn((opts: WatchSub["opts"], onUpdate: WatchSub["onUpdate"]) => {
				const sub: WatchSub = { opts, onUpdate, unsubscribed: false };
				watches.push(sub);
				return () => {
					sub.unsubscribed = true;
				};
			}),
			watchRecent: vi.fn((opts: RecentSub["opts"], onUpdate: RecentSub["onUpdate"]) => {
				const sub: RecentSub = { opts, onUpdate, unsubscribed: false };
				recents.push(sub);
				return () => {
					sub.unsubscribed = true;
				};
			}),
			watchWindow: vi.fn((opts: WindowSub["opts"], onUpdate: WindowSub["onUpdate"]) => {
				const sub: WindowSub = { opts, onUpdate, unsubscribed: false, loadOlderCalls: 0 };
				windows.push(sub);
				return {
					loadOlder: () => {
						sub.loadOlderCalls += 1;
					},
					unsubscribe: () => {
						sub.unsubscribed = true;
					},
				};
			}),
			watchChanges: vi.fn((opts: ChangesSub["opts"], onUpdate: ChangesSub["onUpdate"]) => {
				const sub: ChangesSub = { opts, onUpdate, unsubscribed: false };
				changes.push(sub);
				return () => {
					sub.unsubscribed = true;
				};
			}),
			append: vi.fn<(opts: AppendOpts) => Promise<WriteResult>>(async () => ({
				_yay: { key: `${CH1_KEY}:${inv(50_000)}:sent`, revision: 1 },
			})),
			// A stored revision does not have to be the caller's revision plus one: another member's
			// write can land in between. The mock jumps, so a test cannot pass by guessing the next
			// number instead of reading the one the write answered.
			put: vi.fn<(opts: PutOpts) => Promise<WriteResult>>(async (opts: PutOpts) => {
				calls.push({ op: "put", args: { collection: opts.collection, key: opts.key } });
				return { _yay: { key: "k", revision: (putRevision += 10) } };
			}),
			remove: vi.fn<(opts: KeyOpts) => Promise<WriteResult>>(async () => ({ _yay: { key: "k", revision: 1 } })),
			putOwned: vi.fn<(opts: PutOpts) => Promise<WriteResult>>(async () => ({ _yay: { key: "k", revision: 1 } })),
			removeOwned: vi.fn<(opts: KeyOpts) => Promise<WriteResult>>(async () => ({ _yay: { key: "k", revision: 1 } })),
		},
		backend: {
			// Messages, replies, reactions, and channel create/update go through the plugin backend
			// now. The defaults mirror what the worker answers on a clean run; a test overrides the
			// mock for refusals, lost answers, and replay checks.
			invoke: vi.fn<(opts: InvokeOpts) => Promise<InvokeResult>>(async (opts) => {
				const input = opts.input;
				switch (opts.endpoint) {
					case "message-send":
						return invoke_ok({ messageKey: `${input.channelKey}:${inv(50_000)}:sent` });
					case "reply-send":
						return invoke_ok({ messageKey: `${input.rootMessageKey}:${inv(50_000)}:sent`, transcriptUpdated: true });
					case "message-edit":
					case "message-delete":
						// Like the put mock above: the answered revision jumps so a test cannot pass by
						// guessing "mine plus one" instead of reading the one the backend stored.
						return invoke_ok({ transcriptUpdated: true, revision: (putRevision += 10) });
					case "reaction-toggle":
						return invoke_ok({
							transcriptUpdated: true,
							key: `${input.targetKey}:${input.token}:user_me`,
							revision: 1,
						});
					case "channel-manage":
						if (input.action === "create") {
							return invoke_ok({ channelKey: crypto.randomUUID() });
						}
						return invoke_ok({});
					case "reconcile":
						return invoke_ok({ done: true });
					default:
						return invoke_refused(404, "Unknown endpoint");
				}
			}),
		},
		members: {
			resolve: vi.fn(async (ids: string[]) => Object.fromEntries(ids.map((id) => [id, names[id] ?? null]))),
			list: vi.fn<(opts: { limit: number; cursor?: string | null }) => Promise<MembersListResult>>(async () => ({
				_yay: {
					members: Object.entries(names).map(([userId, displayName]) => ({ userId, displayName })),
					cursor: null,
				},
			})),
		},
		scopes: {
			create: vi.fn(async (opts: { scopeId: string; collections: string[]; keyPrefix: string }) => {
				calls.push({ op: "scopes.create", args: { ...opts } });
				// The server puts the creator in with `manage`, so the fake does too — the people
				// dialog decides whether to offer its controls from exactly that.
				scopePrincipals.set(opts.scopeId, [{ userId: "user_me", level: "manage" }]);
				return {
					_yay: {
						scopeId: opts.scopeId,
						deleted: false,
						membershipRevision: next_scope_membership_revision(opts.scopeId),
					},
				};
			}),
			createWithDocument: vi.fn<
				(opts: {
					scopeId: string;
					collections: string[];
					keyPrefix: string;
					principals: { userId: string; level: "member" | "manage" }[];
					document: { collection: string; key: string; value: Record<string, unknown> };
				}) => Promise<ScopeChangeResult>
			>(async (opts) => {
				calls.push({ op: "scopes.createWithDocument", args: { ...opts } });
				scopePrincipals.set(opts.scopeId, [{ userId: "user_me", level: "manage" }, ...opts.principals]);
				return {
					_yay: {
						scopeId: opts.scopeId,
						deleted: false,
						membershipRevision: next_scope_membership_revision(opts.scopeId),
					},
				};
			}),
			setPrincipal: vi.fn<
				(opts: { scopeId: string; userId: string; level: "member" | "manage" }) => Promise<ScopeChangeResult>
			>(async (opts) => {
				calls.push({ op: "scopes.setPrincipal", args: { ...opts } });
				const current = scopePrincipals.get(opts.scopeId) ?? [];
				scopePrincipals.set(opts.scopeId, [
					...current.filter((principal) => principal.userId !== opts.userId),
					{ userId: opts.userId, level: opts.level },
				]);
				return {
					_yay: {
						scopeId: opts.scopeId,
						deleted: false,
						membershipRevision: next_scope_membership_revision(opts.scopeId),
					},
				};
			}),
			removePrincipal: vi.fn<(opts: ScopeChangeOpts & { userId: string }) => Promise<ScopeChangeResult>>(
				async (opts) => {
					calls.push({ op: "scopes.removePrincipal", args: { ...opts } });
					scopePrincipals.set(
						opts.scopeId,
						(scopePrincipals.get(opts.scopeId) ?? []).filter((principal) => principal.userId !== opts.userId),
					);
					return {
						_yay: {
							scopeId: opts.scopeId,
							deleted: false,
							membershipRevision: next_scope_membership_revision(opts.scopeId),
						},
					};
				},
			),
			delete: vi.fn<(opts: ScopeChangeOpts) => Promise<ScopeChangeResult>>(async (opts) => {
				calls.push({ op: "scopes.delete", args: { ...opts } });
				scopePrincipals.delete(opts.scopeId);
				return {
					_yay: {
						scopeId: opts.scopeId,
						deleted: true,
						membershipRevision: next_scope_membership_revision(opts.scopeId),
					},
				};
			}),
			listPrincipals: vi.fn<(opts: { scopeId: string }) => Promise<BonoboUiScopePrincipalListResult>>(async (opts) => ({
				_yay: scopePrincipals.get(opts.scopeId) ?? null,
			})),
			watchMine: vi.fn((onUpdate: ScopeWatchCallback) => {
				scopeWatchers.push(onUpdate);
				return () => {
					const index = scopeWatchers.indexOf(onUpdate);
					if (index >= 0) {
						scopeWatchers.splice(index, 1);
					}
				};
			}),
		},
		theme: {
			// The SDK applies the host theme to the document itself; the page never reads it.
			current: vi.fn<() => BonoboUiTheme | null>(() => null),
			subscribe: vi.fn(() => () => {}),
		},
	};
	// The key prefix is matched exactly, `undefined` included: the page now opens a second channels
	// watch per private range, so "the channels watch with no prefix" has to mean the public one.
	const find_watch = (collection: string, keyPrefix?: string) => {
		const matches = watches.filter(
			(sub) => !sub.unsubscribed && sub.opts.collection === collection && sub.opts.keyPrefix === keyPrefix,
		);
		return matches[matches.length - 1];
	};
	const find_recent = (collection: string) => {
		const matches = recents.filter((sub) => !sub.unsubscribed && sub.opts.collection === collection);
		return matches[matches.length - 1];
	};
	const find_window = (collection: string, keyPrefix?: string) => {
		const matches = windows.filter(
			(sub) =>
				!sub.unsubscribed &&
				sub.opts.collection === collection &&
				(keyPrefix === undefined || sub.opts.keyPrefix === keyPrefix),
		);
		return matches[matches.length - 1];
	};
	const find_changes = (collection: string, scopeId?: string) => {
		const matches = changes.filter(
			(sub) => !sub.unsubscribed && sub.opts.collection === collection && sub.opts.scopeId === scopeId,
		);
		return matches[matches.length - 1];
	};
	/** Delivers the scope list the way the server does after somebody changes who is in a range. */
	const send_scopes = (scopes: ScopeFixture[]) => {
		const delivered = scopes.map((scope) => ({
			...scope,
			membershipRevision: scope.membershipRevision ?? 1,
			appendActivity: (scope.appendActivity ?? []).map((entry, index) => ({
				...entry,
				sequence: entry.sequence ?? index + 1,
			})),
		}));
		scopeMembershipRevisions.clear();
		for (const scope of delivered) {
			scopeMembershipRevisions.set(scope.scopeId, scope.membershipRevision);
		}
		for (const listener of [...scopeWatchers]) {
			listener(delivered);
		}
	};
	/** Ends the newest scope watch the way the SDK does before its one final null delivery. */
	const send_scope_death = (reason: string) => {
		const listener = scopeWatchers.pop();
		if (listener === undefined) {
			throw new Error("No live scope watch");
		}
		listener(null, { reason, message: `Scope watch ${reason}` });
	};
	return {
		client: client as unknown as BonoboUiFrontendClient,
		raw: client,
		watches,
		recents,
		windows,
		changes,
		find_watch,
		find_recent,
		find_window,
		find_changes,
		send_scopes,
		send_scope_death,
		calls,
		scopePrincipals,
	};
}

function deferred<T>() {
	let resolve!: (value: T) => void;
	let reject!: (error: unknown) => void;
	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return { promise, resolve, reject };
}

/**
 * Runs an action that opens a channel with the reconcile the channel view fires on open answered
 * by a stub. A test's queued answers and call counts then stay with the action it is testing. The
 * real invoke spy is back in place when this returns, and two tests open a channel without going
 * through the helpers below, to cover the reconcile call itself.
 */
async function without_open_reconcile<T>(
	h: ReturnType<typeof make_harness>,
	open: () => Promise<T>,
	opensChannel = true,
) {
	const invoke = h.raw.backend.invoke;
	const stub = vi.fn<(opts: InvokeOpts) => Promise<InvokeResult>>(async () => invoke_ok({ done: true }));
	h.raw.backend.invoke = stub;

	const opened = await open();
	if (opensChannel) {
		await waitFor(() => expect(stub).toHaveBeenCalledWith({ endpoint: "reconcile", input: expect.anything() }));
	}

	h.raw.backend.invoke = invoke;
	return opened;
}

/** Renders the App, delivers one channel, and waits for the channel view's windows. */
async function boot(h: ReturnType<typeof make_harness>, channels: unknown[] = [channel_doc(CH1_KEY, "general")]) {
	return await without_open_reconcile(
		h,
		async () => {
			const utils = render(<App client={h.client} />);
			h.find_watch("channels")!.onUpdate(watch_update(channels));
			if (channels.length > 0) {
				await waitFor(() => expect(h.find_window("messages", `${CH1_KEY}:`)).toBeTruthy());
			}
			return utils;
		},
		channels.length > 0,
	);
}

function list_calls(h: ReturnType<typeof make_harness>, collection?: string) {
	return h.raw.fetchJson.mock.calls.filter(([path, init]) => {
		if (path !== "/api/v1/plugin-data/list") {
			return false;
		}
		if (collection === undefined) {
			return true;
		}
		return (init?.body as { collection?: string } | undefined)?.collection === collection;
	});
}

function http_page(documents: unknown[], isDone: boolean) {
	return { documents, cursor: null, isDone };
}

/** The invoke calls the page made, optionally narrowed to one endpoint, as their `{endpoint, input}` opts. */
function invoke_calls(h: ReturnType<typeof make_harness>, endpoint?: string) {
	return h.raw.backend.invoke.mock.calls
		.map(([opts]) => opts)
		.filter((opts) => endpoint === undefined || opts.endpoint === endpoint);
}

function file_calls(h: ReturnType<typeof make_harness>, path: string) {
	return h.raw.fetchJson.mock.calls.filter(([called]) => called === path);
}

async function wait_for_companion_lists(h: ReturnType<typeof make_harness>) {
	await waitFor(() => {
		expect(list_calls(h, "reactions").length).toBeGreaterThanOrEqual(1);
		expect(list_calls(h, "replies").length).toBeGreaterThanOrEqual(1);
	});
}

async function wait_for_feeds(h: ReturnType<typeof make_harness>, scopeId?: string) {
	await waitFor(() => {
		expect(h.find_changes("messages", scopeId)).toBeTruthy();
		expect(h.find_changes("replies", scopeId)).toBeTruthy();
		expect(h.find_changes("reactions", scopeId)).toBeTruthy();
	});
}

function composer_box(name: string) {
	return screen.getByRole("combobox", { name }) as HTMLTextAreaElement;
}

/**
 * Types into the composer. The combobox is controlled, so assigning `.value` and firing `input`
 * is ignored. The caret has to be in the event: `@` is only a mention when it sits under it.
 */
function type_in_composer(box: HTMLTextAreaElement, value: string, caret = value.length) {
	fireEvent.input(box, { target: { value, selectionStart: caret, selectionEnd: caret } });
}

/**
 * Opens a channel row's overflow menu and returns one of its items.
 *
 * The row's actions used to be buttons sitting in the row itself. They live in a floating menu now,
 * so a test has to open it before the item exists at all.
 */
async function open_channel_menu_item(channelName: string, itemName: string) {
	fireEvent.click(screen.getByRole("button", { name: `Actions for #${channelName}` }));
	return await screen.findByRole("menuitem", { name: itemName });
}

/** Listeners the app registered on the narrow media query, so a test can flip the match. */
const narrowQueryListeners = new Set<(event: MediaQueryListEvent) => void>();
let narrowMatches = false;

/**
 * Drives `(max-width: 719px)`. happy-dom answers matchMedia from a viewport that never changes, and
 * the drawer's `inert` contract exists only below that width — so without this the narrow half of
 * every drawer assertion would be unreachable.
 */
function set_viewport_narrow(matches: boolean): void {
	narrowMatches = matches;
	for (const listener of narrowQueryListeners) {
		listener({ matches } as MediaQueryListEvent);
	}
}

/**
 * What each `ResizeObserver` callback is watching, so a test can report a new size to the observers
 * of one element only.
 *
 * Tracking the targets is not decoration. Ariakit positions its menu with floating-ui, which
 * registers its own ResizeObserver and destructures the entries argument. Firing every observer with
 * no arguments threw in there and took an unrelated test down with it.
 */
const resizeObserverTargets = new Map<ResizeObserverCallback, Set<Element>>();

/**
 * Reports a container resize. happy-dom's ResizeObserver never fires, so the separator's range
 * would stay frozen at whatever it read when the panel opened — which is the very bug this stands
 * in for.
 */
function report_container_resize(width: number): void {
	const body = document.querySelector(".channel-body")!;
	Object.defineProperty(body, "clientWidth", { configurable: true, value: width });

	// Only the observers actually watching this element, the way a real ResizeObserver behaves.
	for (const [callback, targets] of resizeObserverTargets) {
		if (!targets.has(body)) {
			continue;
		}

		const entries = [...targets].map((target) => ({ target, contentRect: target.getBoundingClientRect() }));
		callback(entries as unknown as ResizeObserverEntry[], null as unknown as ResizeObserver);
	}
}

beforeEach(() => {
	narrowQueryListeners.clear();
	narrowMatches = false;
	resizeObserverTargets.clear();
	vi.stubGlobal(
		"ResizeObserver",
		class {
			#callback: ResizeObserverCallback;
			#targets = new Set<Element>();

			constructor(callback: ResizeObserverCallback) {
				this.#callback = callback;
				resizeObserverTargets.set(callback, this.#targets);
			}
			observe(target: Element) {
				this.#targets.add(target);
			}
			unobserve(target: Element) {
				this.#targets.delete(target);
			}
			disconnect() {
				this.#targets.clear();
				resizeObserverTargets.delete(this.#callback);
			}
		},
	);
	vi.stubGlobal("matchMedia", (query: string) => ({
		matches: query.includes("max-width: 719px") ? narrowMatches : false,
		media: query,
		addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
			narrowQueryListeners.add(listener);
		},
		removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
			narrowQueryListeners.delete(listener);
		},
	}));
});

function announcer_text(container: Element): string {
	return container.querySelector(".chitchat-announcer")?.textContent ?? "";
}

afterEach(() => {
	cleanup();
	// The theme lands on the document element, which no unmount touches, so a light run would leak
	// into every test after it.
	document.documentElement.className = "";
	document.documentElement.removeAttribute("style");
});

// #region channels and states

test("boot shows the channels loading status, then the empty state with a create button", async () => {
	const h = make_harness();
	render(<App client={h.client} />);
	expect(screen.getAllByRole("status").some((el) => el.textContent?.includes("Loading channels…"))).toBe(true);

	h.find_watch("channels")!.onUpdate(watch_update([]));
	expect(await screen.findByText("No channels yet — create the first one.")).toBeTruthy();
	expect(screen.getByRole("button", { name: "Create channel" })).toBeTruthy();
});

test("channel sections are grouped, not flat, and no channel appears in two of them", async () => {
	const h = make_harness();
	// Delivered out of order on purpose: the sections sort by name, and the first active channel
	// stays #general so the boot fixture opens the window it waits for.
	await boot(h, [
		channel_doc(CH3_KEY, "random"),
		channel_doc(CH1_KEY, "general"),
		channel_doc(CH2_KEY, "old-stuff", 123),
	]);

	const generalButton = screen.getByRole("button", { name: "#general" });
	expect(generalButton.getAttribute("aria-current")).toBe("page");

	// Two lists, each named by its own visible heading. A flat list with visual separators would
	// resolve one list here, and the archived rows would be indistinguishable to assistive tech.
	const [channelsList, archivedList] = screen.getAllByRole("list", { name: /Channels|Archived/u });
	expect(channelsList).toBeTruthy();
	expect(archivedList).toBeTruthy();

	// Sorted by name inside each section, and an archived channel is in exactly one of them —
	// the defect the accepted mockups were rejected for.
	expect(
		within(channelsList!)
			.getAllByRole("button", { name: /^#/u })
			.map((button) => button.textContent),
	).toEqual(["G#general", "R#random"]);
	expect(
		within(archivedList!)
			.getAllByRole("button", { name: /^#/u })
			.map((button) => button.textContent),
	).toEqual(["O#old-stuff (archived)"]);
	expect(within(channelsList!).queryByRole("button", { name: "#old-stuff (archived)" })).toBeNull();

	// The toggle the sections replace is gone; two independent controls over one visibility is the
	// duplicate affordance the sections exist to remove.
	expect(screen.queryByRole("button", { name: "Show archived" })).toBeNull();
});

test("the collapsed rail shows an initial that is not part of the button's name", async () => {
	const h = make_harness();
	await boot(h, [channel_doc(CH1_KEY, "general")]);

	// The initial is visible chrome for the 56px rail. It must not reach the accessible name, or a
	// member using assistive tech hears "G #general".
	const generalButton = screen.getByRole("button", { name: "#general" });
	const initial = generalButton.querySelector(".channel-initial");
	expect(initial?.textContent).toBe("G");
	expect(initial?.getAttribute("aria-hidden")).toBe("true");
	// The full name stays in the tree at every width — the rail hides it visually, and hiding it
	// from the tree would leave a rail of single letters.
	expect(generalButton.querySelector(".channel-name")?.textContent).toBe("#general");
});

test("the closed drawer is inert only while it is the narrow overlay", async () => {
	const h = make_harness();
	// The drawer is only an overlay below 720px. At desktop width it is always open, so an
	// unconditional inert={!drawerOpen} would put the whole channel list out of reach everywhere.
	set_viewport_narrow(false);
	await boot(h);

	const wideInner = document.querySelector(".sidebar-inner")!;
	expect(wideInner.hasAttribute("inert")).toBe(false);

	set_viewport_narrow(true);
	await waitFor(() => expect(document.querySelector(".sidebar-inner")!.hasAttribute("inert")).toBe(true));

	// Opening the drawer makes its contents reachable again.
	fireEvent.click(screen.getByRole("button", { name: "Channels" }));
	await waitFor(() => expect(document.querySelector(".sidebar-inner")!.hasAttribute("inert")).toBe(false));
});

test("a narrow resize moves focus from the channel rail to the visible Channels toggle", async () => {
	const h = make_harness();
	set_viewport_narrow(false);
	await boot(h);
	const selected = screen.getByRole("button", { name: "#general" });
	selected.focus();
	expect(document.activeElement).toBe(selected);

	set_viewport_narrow(true);
	const toggle = screen.getByRole("button", { name: "Channels" });
	await waitFor(() => expect(document.activeElement).toBe(toggle));
	expect(document.querySelector(".sidebar-inner")!.hasAttribute("inert")).toBe(true);
});

test("a narrow resize moves channel focus to the open thread instead of the hidden toggle", async () => {
	const h = make_harness();
	set_viewport_narrow(false);
	await boot(h);
	const message = message_doc(1_000, { rand: "thread", text: "thread root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([message]));
	await screen.findByText("thread root");
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));

	const selected = screen.getByRole("button", { name: "#general" });
	selected.focus();
	expect(document.activeElement).toBe(selected);

	set_viewport_narrow(true);
	const thread = screen.getByRole("region", { name: "Thread" });
	const back = await within(thread).findByRole("button", { name: "Back to messages" });
	await waitFor(() => expect(document.activeElement).toBe(back));
	expect(document.querySelector(".sidebar-inner")!.hasAttribute("inert")).toBe(true);
});

test("a narrow resize keeps focus in an open drawer that stays visible", async () => {
	const h = make_harness();
	set_viewport_narrow(true);
	await boot(h);
	fireEvent.click(screen.getByRole("button", { name: "Channels" }));
	set_viewport_narrow(false);

	const selected = screen.getByRole("button", { name: "#general" });
	selected.focus();
	expect(document.activeElement).toBe(selected);

	set_viewport_narrow(true);
	await waitFor(() => expect(document.querySelector(".sidebar-inner")!.hasAttribute("inert")).toBe(false));
	expect(document.activeElement).toBe(selected);
});

test("a narrow resize focuses the thread region while its Back button is disabled", async () => {
	const h = make_harness();
	const ack = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(ack.promise);
	set_viewport_narrow(false);
	await boot(h);
	const message = message_doc(1_000, { rand: "thread", text: "thread root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([message]));
	await screen.findByText("thread root");
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));

	const thread = await screen.findByRole("region", { name: "Thread" });
	const replyBox = within(thread).getByRole("combobox", { name: "Reply in thread" });
	fireEvent.input(replyBox, { target: { value: "pending reply" } });
	fireEvent.keyDown(replyBox, { key: "Enter" });
	await waitFor(() => expect(invoke_calls(h, "reply-send")).toHaveLength(1));
	const back = within(thread).getByRole("button", { name: "Close thread" });
	expect(back.hasAttribute("disabled")).toBe(true);

	const expand = screen.getByRole("button", { name: "Expand channel rail" });
	expand.focus();
	expect(document.activeElement).toBe(expand);
	set_viewport_narrow(true);
	await waitFor(() => expect(document.activeElement).toBe(thread));

	await act(async () => {
		ack.resolve(invoke_ok({ messageKey: `${message.key}:${inv(2_000)}:rply` }));
		await ack.promise;
	});
});

test("a narrow resize falls back to Channels while a requested thread root is not loaded", async () => {
	const h = make_harness();
	set_viewport_narrow(false);
	await boot(h);
	await open_missing_general_thread_from_threads(h);

	const selected = screen.getByRole("button", { name: "#general" });
	selected.focus();
	expect(document.activeElement).toBe(selected);
	set_viewport_narrow(true);

	const toggle = screen.getByRole("button", { name: "Channels" });
	await waitFor(() => expect(document.activeElement).toBe(toggle));
	expect(document.querySelector(".sidebar-inner")!.hasAttribute("inert")).toBe(true);
});

test("a wide resize moves focus from the hidden Channels toggle to the selected row", async () => {
	const h = make_harness();
	set_viewport_narrow(true);
	await boot(h);
	const toggle = screen.getByRole("button", { name: "Channels" });
	toggle.focus();
	expect(document.activeElement).toBe(toggle);

	set_viewport_narrow(false);
	const selected = screen.getByRole("button", { name: "#general" });
	await waitFor(() => expect(document.activeElement).toBe(selected));
	expect(document.querySelector(".sidebar-inner")!.hasAttribute("inert")).toBe(false);
});

test("a resize does not pull focus back after it moves outside Chitchat", async () => {
	const h = make_harness();
	set_viewport_narrow(false);
	await boot(h);
	const selected = screen.getByRole("button", { name: "#general" });
	selected.focus();
	const outside = document.createElement("button");
	document.body.append(outside);
	try {
		outside.focus();
		expect(document.activeElement).toBe(outside);
		set_viewport_narrow(true);
		await waitFor(() => expect(document.querySelector(".sidebar-inner")!.hasAttribute("inert")).toBe(true));
		expect(document.activeElement).toBe(outside);
	} finally {
		outside.remove();
	}
});

test("a narrow resize moves focus from the hidden thread separator to the thread back button", async () => {
	const h = make_harness();
	set_viewport_narrow(false);
	await boot(h);
	const message = message_doc(1_000, { rand: "thread", text: "thread root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([message]));
	await screen.findByText("thread root");
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	const separator = await screen.findByRole("separator", { name: "Resize thread panel" });
	separator.focus();
	expect(document.activeElement).toBe(separator);

	set_viewport_narrow(true);
	const thread = screen.getByRole("region", { name: "Thread" });
	const back = await within(thread).findByRole("button", { name: "Back to messages" });
	await waitFor(() => expect(document.activeElement).toBe(back));
});

test("the page heading and the nav landmark survive an inert closed drawer", async () => {
	const h = make_harness();
	set_viewport_narrow(true);
	await boot(h);

	// inert removes a subtree from accessibility APIs. With the h1 inside the nav, a closed drawer
	// leaves a document whose only heading is an h2 and whose nav landmark is gone — two of the four
	// baseline items this app is measured on.
	const inner = document.querySelector(".sidebar-inner")!;
	expect(inner.hasAttribute("inert")).toBe(true);

	const heading = screen.getByRole("heading", { level: 1, name: "Chitchat" });
	expect(inner.contains(heading)).toBe(false);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	expect(nav.hasAttribute("inert")).toBe(false);
});

test("the rendered thread controls the responsive layout and a channel switch removes it", async () => {
	const h = make_harness();
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const doc = message_doc(1_000, { rand: "root", text: "thread root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("thread root");

	const root = document.querySelector(".chitchat")!;
	expect(root.querySelector(".thread")).toBeNull();
	expect(root.classList.contains("has-thread")).toBe(false);

	// The stylesheet reads the rendered panel through :has(.thread), not a state-only root class.
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	const thread = await screen.findByRole("region", { name: "Thread" });
	expect(root.querySelector(".thread")).toBe(thread);
	expect(root.classList.contains("has-thread")).toBe(false);

	// ChannelView is keyed by channel and remounts on a switch. The old thread key resolves to no
	// message in the new channel, so the panel leaves the DOM and the :has(.thread) rule stops.
	fireEvent.click(screen.getByRole("button", { name: "#random" }));
	await waitFor(() => expect(root.querySelector(".thread")).toBeNull());
	expect(root.classList.contains("has-thread")).toBe(false);
});

test("opening a channel reconciles it, and a switch reconciles the channel switched to", async () => {
	const h = make_harness();
	// `boot` waits for the first reconcile and clears the mock, so start from the raw render here.
	render(<App client={h.client} />);
	h.find_watch("channels")!.onUpdate(watch_update([channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]));

	// Nothing but the backend's own transcript heal runs on open: no send, no write.
	await waitFor(() => expect(invoke_calls(h)).toEqual([{ endpoint: "reconcile", input: { channelKey: CH1_KEY } }]));

	fireEvent.click(screen.getByRole("button", { name: "#random" }));
	await waitFor(() =>
		expect(invoke_calls(h, "reconcile")).toEqual([
			{ endpoint: "reconcile", input: { channelKey: CH1_KEY } },
			{ endpoint: "reconcile", input: { channelKey: CH2_KEY } },
		]),
	);
});

test("a refused reconcile leaves the channel usable and shows no alert", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockImplementation(async (opts: InvokeOpts) => {
		if (opts.endpoint === "reconcile") {
			return invoke_refused(503, "Files service unavailable");
		}
		return invoke_ok({});
	});
	render(<App client={h.client} />);
	h.find_watch("channels")!.onUpdate(watch_update([channel_doc(CH1_KEY, "general")]));

	// The heal is background maintenance. A member who cannot heal the transcript can still chat.
	await waitFor(() => expect(invoke_calls(h, "reconcile")).toHaveLength(1));
	expect(composer_box("Message #general").disabled).toBe(false);
	expect(screen.queryByRole("alert")).toBeNull();
});

test("the icon rail's expand control is a labelled toggle that reports its state", async () => {
	const h = make_harness();
	await boot(h);

	// The control only does anything in the 720–903px band with a thread open, where the expanded
	// rail overlays instead of returning to the flex flow — in flow it would overflow the frame.
	const expand = screen.getByRole("button", { name: "Expand channel rail" });
	expect(expand.getAttribute("aria-expanded")).toBe("false");

	fireEvent.click(expand);
	const collapse = await screen.findByRole("button", { name: "Collapse channel rail" });
	expect(collapse.getAttribute("aria-expanded")).toBe("true");
	expect(screen.getByRole("navigation", { name: "Channels" }).classList.contains("is-expanded")).toBe(true);
});

test("a rename carries the channel topic and an emptied topic is removed", async () => {
	const h = make_harness();
	await boot(h, [
		{ ...channel_doc(CH1_KEY, "general"), value: { name: "general", archivedAt: null, topic: "standups" } },
	]);

	fireEvent.click(await open_channel_menu_item("general", "Rename #general"));
	const dialog = await screen.findByRole("dialog");
	// The topic is editable here, and it round-trips: a rename that dropped it would delete the
	// topic on every rename, because the put replaces the whole value.
	const topicBox = within(dialog).getByRole("textbox", { name: "Topic (optional)" });
	expect((topicBox as HTMLInputElement).value).toBe("standups");

	fireEvent.input(topicBox, { target: { value: "daily standups" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Rename" }));
	await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(1));
	expect(invoke_calls(h, "channel-manage")[0]!.input).toEqual({
		action: "update",
		channelKey: CH1_KEY,
		name: "general",
		topic: "daily standups",
		archived: false,
	});
});

test('permission-lost: a "denied" channels death names no cause and offers a reload', async () => {
	const h = make_harness();
	await boot(h);
	h.find_watch("channels")!.onUpdate(null, {
		reason: "denied",
		message: "This plugin no longer has access to its data",
	});

	const alert = await screen.findByRole("alert");
	// The commonest trigger is an uninstall or a revoked installation. Telling a member their
	// permissions changed sends them to an admin over something no permission of theirs caused, and
	// "disabled or your permissions changed" is the ambiguity the reason exists to remove.
	expect(alert.textContent).toContain("Chitchat can no longer read its data");
	expect(alert.textContent).toContain("Reload");
	expect(alert.textContent).not.toMatch(/permission/iu);
	expect(alert.textContent).not.toMatch(/disabled/iu);
	expect(screen.queryByRole("log")).toBeNull();
});

test("the other channels-death reasons each say something different", async () => {
	// Keep each cause clear, and give a connection death the manual recovery this page needs.
	const cases = [
		{ reason: "session_expired", contains: "session expired" },
		{ reason: "unavailable", contains: "cannot reach its data" },
		{ reason: "capacity", contains: "too many live views" },
	];

	for (const { reason, contains } of cases) {
		const h = make_harness();
		render(<App client={h.client} />);
		h.find_watch("channels")!.onUpdate(watch_update([channel_doc(CH1_KEY, "general")]));
		h.find_watch("channels")!.onUpdate(null, { reason, message: "x" });

		const alert = await screen.findByRole("alert");
		expect(alert.textContent?.toLowerCase()).toContain(contains);
		if (reason === "unavailable") {
			expect(alert.textContent).toMatch(/reload/iu);
			expect(alert.textContent).not.toContain("connection returns");
		}
		cleanup();
	}
});

test("a null messages window shows the channel-level alert", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(null);

	// A bare null carries no reason, so the page says what it knows — the read stopped — and does
	// not guess at a cause the SDK did not give it.
	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("Chitchat stopped reading messages in #general");
});

test("a dead messages window names its reason", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(null, { reason: "session_expired" } satisfies WatchDeathInfo);

	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("session expired");
	expect(alert.textContent).not.toContain("permissions");
});

test("an unavailable messages window tells the member to check the connection and reload", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(null, { reason: "unavailable" } satisfies WatchDeathInfo);

	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("Check your connection");
	expect(alert.textContent).toMatch(/reload/iu);
	expect(alert.textContent).not.toContain("connection returns");
});

test("create channel dialog validates the name and sends the create through the backend", async () => {
	const h = make_harness();
	await boot(h, []);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	expect(dialog.getAttribute("aria-modal")).toBe("true");

	// Empty name refused locally, nothing sent.
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	expect(await within(dialog).findByRole("alert")).toBeTruthy();
	expect(h.raw.backend.invoke).not.toHaveBeenCalled();

	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "general" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	// The backend mints the key and writes the channel doc shared, so any member can rename
	// or archive it later. The page itself no longer writes channel docs for public channels.
	await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(1));
	const call = invoke_calls(h, "channel-manage")[0]!;
	expect(call.input.action).toBe("create");
	expect(call.input.name).toBe("general");
	expect(call.input.topic).toBeNull();
	expect(typeof call.input.clientRequestId).toBe("string");
	expect(h.raw.data.put).not.toHaveBeenCalled();
	expect(h.raw.data.append).not.toHaveBeenCalled();
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test("an unavailable public create retries the same create request, which the backend dedupes", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "Connection lost after send"));
	await boot(h, []);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	const name = within(dialog).getByLabelText("Channel name") as HTMLInputElement;
	const topic = within(dialog).getByLabelText("Topic (optional)") as HTMLInputElement;
	const privacy = within(dialog).getByLabelText("Private channel") as HTMLInputElement;
	fireEvent.input(name, { target: { value: "general" } });
	fireEvent.input(topic, { target: { value: "Team updates" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));

	expect((await within(dialog).findByRole("alert")).textContent).toContain("Connection lost after send");
	expect(name.disabled).toBe(true);
	expect(topic.disabled).toBe(true);
	expect(privacy.disabled).toBe(true);
	const retry = within(dialog).getByRole("button", { name: "Retry" });
	expect((retry as HTMLButtonElement).disabled).toBe(false);
	expect((within(dialog).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(false);
	fireEvent.click(retry);

	// The retry repeats the exact request. The same clientRequestId lets the backend answer the
	// already-committed create instead of making a second channel.
	await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(2));
	const [first, second] = invoke_calls(h, "channel-manage");
	expect(second!.input).toEqual(first!.input);
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test("a first public create conflict unlocks the form and a new submit uses a fresh request", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_refused(409, "Channel already exists"));
	await boot(h, []);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	const name = within(dialog).getByLabelText("Channel name") as HTMLInputElement;
	const topic = within(dialog).getByLabelText("Topic (optional)") as HTMLInputElement;
	const privacy = within(dialog).getByLabelText("Private channel") as HTMLInputElement;
	fireEvent.input(name, { target: { value: "general" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));

	expect((await within(dialog).findByRole("alert")).textContent).toContain("Channel already exists");
	expect(name.disabled).toBe(false);
	expect(topic.disabled).toBe(false);
	expect(privacy.disabled).toBe(false);
	expect(within(dialog).getByRole("button", { name: "Create" })).toBeTruthy();
	fireEvent.input(name, { target: { value: "random" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));

	await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(2));
	const [first, second] = invoke_calls(h, "channel-manage");
	expect(second!.input.clientRequestId).not.toBe(first!.input.clientRequestId);
	expect(second!.input.name).toBe("random");
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test("a non-creator can rename a channel: the backend update succeeds and the dialog closes", async () => {
	const h = make_harness();
	// The channel was created by another member; channel docs are shared, so the rename
	// from this member (user_me) goes through.
	await boot(h, [{ ...channel_doc(CH1_KEY, "general"), createdBy: "user_other", updatedBy: "user_other" }]);

	fireEvent.click(await open_channel_menu_item("general", "Rename #general"));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "renamed" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Rename" }));

	await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(1));
	expect(invoke_calls(h, "channel-manage")[0]!.input).toEqual({
		action: "update",
		channelKey: CH1_KEY,
		name: "renamed",
		topic: null,
		archived: false,
	});
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test("a rename conflict keeps the dialog open with a clear error", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_refused(409, "This document changed since it was read"));
	await boot(h, [{ ...channel_doc(CH1_KEY, "general"), revision: 4 }]);

	fireEvent.click(await open_channel_menu_item("general", "Rename #general"));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "renamed" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Rename" }));

	// A backend conflict means a concurrent change won; the dialog says so instead of
	// silently overwriting.
	await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(1));
	const alert = await within(dialog).findByRole("alert");
	expect(alert.textContent).toContain("Someone else changed this channel");
	expect(screen.getByRole("dialog")).toBeTruthy();
});

test.each(["unavailable", "thrown"] as const)(
	"an %s rename locks its exact request until a retry and matching watch settle it",
	async (failure) => {
		const h = make_harness();
		if (failure === "unavailable") {
			h.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "Connection lost after send"));
		} else {
			h.raw.backend.invoke.mockRejectedValueOnce(new Error("Connection lost after send"));
		}
		h.raw.backend.invoke.mockResolvedValueOnce(invoke_refused(409, "This document changed since it was read"));
		await boot(h);

		fireEvent.click(await open_channel_menu_item("general", "Rename #general"));
		const dialog = await screen.findByRole("dialog");
		const name = within(dialog).getByLabelText("Channel name") as HTMLInputElement;
		const topic = within(dialog).getByLabelText("Topic (optional)") as HTMLInputElement;
		fireEvent.input(name, { target: { value: "renamed" } });
		fireEvent.input(topic, { target: { value: "daily updates" } });
		fireEvent.click(within(dialog).getByRole("button", { name: "Rename" }));

		expect((await within(dialog).findByRole("alert")).textContent).toContain("Connection lost after send");
		expect(name.disabled).toBe(true);
		expect(topic.disabled).toBe(true);
		expect((within(dialog).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(false);
		fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));

		await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(2));
		const [firstUpdate, retryUpdate] = invoke_calls(h, "channel-manage");
		expect(retryUpdate!.input).toEqual(firstUpdate!.input);
		h.find_watch("channels")!.onUpdate(
			watch_update([{ ...channel_doc(CH1_KEY, "renamed", null, { topic: "daily updates" }), revision: 2 }]),
		);

		await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	},
);

test("an uncertain rename settles when its name and topic arrive with a concurrent archive", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "Connection lost after send"));
	await boot(h);

	fireEvent.click(await open_channel_menu_item("general", "Rename #general"));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "renamed" } });
	fireEvent.input(within(dialog).getByLabelText("Topic (optional)"), { target: { value: "daily updates" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Rename" }));
	await within(dialog).findByRole("alert");

	h.find_watch("channels")!.onUpdate(
		watch_update([{ ...channel_doc(CH1_KEY, "renamed", 123, { topic: "daily updates" }), revision: 2 }]),
	);

	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test("Escape cannot dismiss a channel-name dialog while its write is pending", async () => {
	const h = make_harness();
	const pendingInvoke = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(pendingInvoke.promise);
	await boot(h);

	fireEvent.click(await open_channel_menu_item("general", "Rename #general"));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "renamed" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Rename" }));
	await waitFor(() => expect(within(dialog).getByRole("button", { name: "Saving…" })).toBeTruthy());
	expect((within(dialog).getByLabelText("Channel name") as HTMLInputElement).disabled).toBe(true);
	expect((within(dialog).getByLabelText("Topic (optional)") as HTMLInputElement).disabled).toBe(true);

	fireEvent.keyDown(dialog, { key: "Escape" });
	expect(screen.getByRole("dialog")).toBe(dialog);
	pendingInvoke.resolve(invoke_ok({}));
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test("Escape cannot dismiss the archive dialog while its write is pending", async () => {
	const h = make_harness();
	const pendingInvoke = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(pendingInvoke.promise);
	await boot(h);

	fireEvent.click(await open_channel_menu_item("general", "Archive #general"));
	const dialog = await screen.findByRole("dialog");
	fireEvent.click(within(dialog).getByRole("button", { name: "Archive channel" }));
	await waitFor(() => expect(within(dialog).getByRole("button", { name: "Archiving…" })).toBeTruthy());

	fireEvent.keyDown(dialog, { key: "Escape" });
	expect(screen.getByRole("dialog")).toBe(dialog);
	pendingInvoke.resolve(invoke_ok({}));
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test.each([
	{ failure: "unavailable", matchingWatch: true },
	{ failure: "thrown", matchingWatch: false },
] as const)(
	"an uncertain archive after a $failure result retries exactly and settles from the watch",
	async (testCase) => {
		const h = make_harness();
		if (testCase.failure === "unavailable") {
			h.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "Connection lost after send"));
		} else {
			h.raw.backend.invoke.mockRejectedValueOnce(new Error("Connection lost after send"));
		}
		h.raw.backend.invoke.mockResolvedValueOnce(invoke_refused(409, "This document changed since it was read"));
		await boot(h);

		fireEvent.click(await open_channel_menu_item("general", "Archive #general"));
		const dialog = await screen.findByRole("dialog", { name: "Archive #general?" });
		fireEvent.click(within(dialog).getByRole("button", { name: "Archive channel" }));

		expect((await within(dialog).findByRole("alert")).textContent).toContain("Connection lost after send");
		expect((within(dialog).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(false);
		fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));

		await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(2));
		const [firstUpdate, retryUpdate] = invoke_calls(h, "channel-manage");
		expect(retryUpdate!.input).toEqual(firstUpdate!.input);
		h.find_watch("channels")!.onUpdate(
			watch_update([
				{
					...channel_doc(
						CH1_KEY,
						testCase.matchingWatch ? "general" : "renamed",
						testCase.matchingWatch ? 123 : null,
					),
					revision: 2,
				},
			]),
		);

		if (testCase.matchingWatch) {
			await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
		} else {
			await waitFor(() =>
				expect(within(dialog).getByRole("alert").textContent).toContain("while the request was pending"),
			);
			expect(within(dialog).getByRole("button", { name: "Archive channel" })).toBeTruthy();
		}
	},
);

test("keyboard archive repairs focus after the channel watch moves the row", async () => {
	const h = make_harness();
	const pendingInvoke = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(pendingInvoke.promise);
	await boot(h);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	const archive = await open_channel_menu_item("general", "Archive #general");
	archive.focus();
	fireEvent.click(archive);
	const dialog = await screen.findByRole("dialog", { name: "Archive #general?" });
	const confirm = within(dialog).getByRole("button", { name: "Archive channel" });
	confirm.focus();
	fireEvent.click(confirm);
	await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(1));

	pendingInvoke.resolve(invoke_ok({}));
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	h.find_watch("channels")!.onUpdate(watch_update([{ ...channel_doc(CH1_KEY, "general", 123), revision: 2 }]));

	await screen.findByRole("button", { name: "#general (archived)" });
	await waitFor(() => expect(document.activeElement).toBe(nav));
});

test("keyboard unarchive repairs focus after the channel watch moves the row", async () => {
	const h = make_harness();
	const pendingInvoke = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(pendingInvoke.promise);
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "old-stuff", 123)]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	const unarchive = await open_channel_menu_item("old-stuff", "Unarchive #old-stuff");
	unarchive.focus();
	fireEvent.click(unarchive);
	await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(1));

	await act(async () => {
		pendingInvoke.resolve(invoke_ok({}));
		await pendingInvoke.promise;
	});
	h.find_watch("channels")!.onUpdate(
		watch_update([channel_doc(CH1_KEY, "general"), { ...channel_doc(CH2_KEY, "old-stuff"), revision: 2 }]),
	);

	await screen.findByRole("button", { name: "#old-stuff" });
	await waitFor(() => expect(document.activeElement).toBe(nav));
});

test("a delayed unarchive watch keeps focus on the control the member moved to", async () => {
	const h = make_harness();
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "old-stuff", 123)]);

	fireEvent.click(await open_channel_menu_item("old-stuff", "Unarchive #old-stuff"));
	await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(1));
	const create = screen.getByRole("button", { name: "Create channel" });
	create.focus();

	h.find_watch("channels")!.onUpdate(
		watch_update([channel_doc(CH1_KEY, "general"), { ...channel_doc(CH2_KEY, "old-stuff"), revision: 2 }]),
	);

	await screen.findByRole("button", { name: "#old-stuff" });
	await waitFor(() => expect(document.activeElement).toBe(create));
});

test("archive repairs focus when its response is lost before the committed watch update", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "Connection lost after send"));
	await boot(h);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	const archive = await open_channel_menu_item("general", "Archive #general");
	archive.focus();
	fireEvent.click(archive);
	const dialog = await screen.findByRole("dialog", { name: "Archive #general?" });
	const confirm = within(dialog).getByRole("button", { name: "Archive channel" });
	confirm.focus();
	fireEvent.click(confirm);
	await within(dialog).findByRole("alert");

	h.find_watch("channels")!.onUpdate(watch_update([{ ...channel_doc(CH1_KEY, "general", 123), revision: 2 }]));
	await screen.findByRole("button", { name: "#general (archived)" });
	fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));

	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	await waitFor(() => expect(document.activeElement).toBe(nav));
});

test("unarchive repairs focus when its response is lost before the committed watch update", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "Connection lost after send"));
	const utils = await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "old-stuff", 123)]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	const unarchive = await open_channel_menu_item("old-stuff", "Unarchive #old-stuff");
	unarchive.focus();
	fireEvent.click(unarchive);
	await waitFor(() => expect(announcer_text(utils.container)).toContain("Connection lost after send"));

	h.find_watch("channels")!.onUpdate(
		watch_update([channel_doc(CH1_KEY, "general"), { ...channel_doc(CH2_KEY, "old-stuff"), revision: 2 }]),
	);

	await screen.findByRole("button", { name: "#old-stuff" });
	await waitFor(() => expect(document.activeElement).toBe(nav));
});

test("archive conflict repairs focus when the winner arrives through the watch", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_refused(409, "This document changed since it was read"));
	await boot(h);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	fireEvent.click(await open_channel_menu_item("general", "Archive #general"));
	const dialog = await screen.findByRole("dialog", { name: "Archive #general?" });
	fireEvent.click(within(dialog).getByRole("button", { name: "Archive channel" }));
	await within(dialog).findByRole("alert");

	h.find_watch("channels")!.onUpdate(watch_update([{ ...channel_doc(CH1_KEY, "general", 123), revision: 2 }]));
	await screen.findByRole("button", { name: "#general (archived)" });
	fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));

	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	await waitFor(() => expect(document.activeElement).toBe(nav));
});

test("unarchive conflict repairs focus when the winner arrives through the watch", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_refused(409, "This document changed since it was read"));
	const utils = await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "old-stuff", 123)]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	const unarchive = await open_channel_menu_item("old-stuff", "Unarchive #old-stuff");
	unarchive.focus();
	fireEvent.click(unarchive);
	await waitFor(() => expect(announcer_text(utils.container)).toContain("This document changed since it was read"));

	h.find_watch("channels")!.onUpdate(
		watch_update([channel_doc(CH1_KEY, "general"), { ...channel_doc(CH2_KEY, "old-stuff"), revision: 2 }]),
	);

	await screen.findByRole("button", { name: "#old-stuff" });
	await waitFor(() => expect(document.activeElement).toBe(nav));
});

test("a missing background private channel settles unarchive and repairs focus", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "Connection lost after send"));
	const utils = await boot_sidebar(
		h,
		[channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans", 123)],
		[PRIVATE_KEY],
	);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	const unarchive = await open_channel_menu_item("secret-plans", "Unarchive #secret-plans");
	unarchive.focus();
	fireEvent.click(unarchive);
	await waitFor(() => expect(announcer_text(utils.container)).toContain("Connection lost after send"));

	// Scope removal is authoritative even though no newer channel document can arrive.
	h.send_scopes([]);

	await waitFor(() => expect(screen.queryByRole("button", { name: /#secret-plans/u })).toBeNull());
	await waitFor(() => expect(document.activeElement).toBe(nav));
});

test("one conflicted unarchive cannot remove an overlapping successful request's focus repair", async () => {
	const h = make_harness();
	const successfulInvoke = deferred<InvokeResult>();
	h.raw.backend.invoke
		.mockReturnValueOnce(successfulInvoke.promise)
		.mockResolvedValueOnce(invoke_refused(409, "This document changed since it was read"));
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "old-stuff", 123)]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	const first = await open_channel_menu_item("old-stuff", "Unarchive #old-stuff");
	first.focus();
	fireEvent.click(first);
	await waitFor(() => expect(screen.queryByRole("menuitem", { name: "Unarchive #old-stuff" })).toBeNull());
	const second = await open_channel_menu_item("old-stuff", "Unarchive #old-stuff");
	second.focus();
	fireEvent.click(second);
	await waitFor(() => expect(invoke_calls(h, "channel-manage")).toHaveLength(2));

	await act(async () => {
		successfulInvoke.resolve(invoke_ok({}));
		await successfulInvoke.promise;
	});
	h.find_watch("channels")!.onUpdate(
		watch_update([channel_doc(CH1_KEY, "general"), { ...channel_doc(CH2_KEY, "old-stuff"), revision: 2 }]),
	);

	await screen.findByRole("button", { name: "#old-stuff" });
	await waitFor(() => expect(document.activeElement).toBe(nav));
});

test("a newer opposite update discards an uncertain move without stealing focus later", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockRejectedValueOnce(new Error("Connection lost after send"));
	await boot(h);

	fireEvent.click(await open_channel_menu_item("general", "Archive #general"));
	const dialog = await screen.findByRole("dialog", { name: "Archive #general?" });
	fireEvent.click(within(dialog).getByRole("button", { name: "Archive channel" }));
	await within(dialog).findByRole("alert");

	// A newer rename proves the uncertain archive did not win. Settle its request without repair.
	h.find_watch("channels")!.onUpdate(watch_update([{ ...channel_doc(CH1_KEY, "renamed"), revision: 2 }]));
	await screen.findByRole("button", { name: "#renamed" });
	fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	const create = screen.getByRole("button", { name: "Create channel" });
	create.focus();

	// A later independent archive must not consume the already settled request and move focus.
	await act(async () => {
		h.find_watch("channels")!.onUpdate(watch_update([{ ...channel_doc(CH1_KEY, "renamed", 123), revision: 3 }]));
		await Promise.resolve();
	});

	expect(screen.getByRole("button", { name: "#renamed (archived)" })).toBeTruthy();
	expect(document.activeElement).toBe(create);
});

test("channel switch announces the channel name through the polite announcer", async () => {
	const h = make_harness();
	const { container } = await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);

	fireEvent.click(screen.getByRole("button", { name: "#random" }));
	await waitFor(() => expect(announcer_text(container)).toContain("#random"));
});

test("a channels read that hit its limit says so in the sidebar", async () => {
	const h = make_harness();
	render(<App client={h.client} />);

	// The workspace holds more than 100 channels. A plain watch reads the first 100 and cannot
	// reach the rest, so a sidebar with no notice would claim to list every channel.
	h.find_watch("channels")!.onUpdate(watch_update([channel_doc(CH1_KEY, "general")], true));

	expect(await screen.findByText("Only the first 100 channels are shown.")).toBeTruthy();
});

// #endregion channels and states

// #region log and messages

test("the log is role=log with aria-live=off and a label naming the channel", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const log = await screen.findByRole("log");
	expect(log.getAttribute("aria-live")).toBe("off");
	expect(log.getAttribute("aria-label")).toBe("Messages in #general");
	expect(await screen.findByText("No messages yet")).toBeTruthy();
});

test("messages render oldest at the top, newest at the bottom", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([
			message_doc(3_000, { rand: "m3", text: "newest" }),
			message_doc(1_000, { rand: "m1", text: "oldest" }),
			message_doc(2_000, { rand: "m2", text: "middle" }),
		]),
	);

	await screen.findByText("newest");
	const log = screen.getByRole("log");
	const rows = [...log.querySelectorAll("[data-key]")];
	expect(rows.map((row) => row.querySelector(".message-text")?.textContent)).toEqual(["oldest", "middle", "newest"]);
});

test("an author who resolves to null renders as Former member", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([message_doc(1_000, { createdBy: "user_gone" })]));

	expect(await screen.findByText("Former member")).toBeTruthy();
});

test("a message row's action cluster sits inside the row element the stylesheet selects", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([message_doc(1_000, { rand: "mine", text: "own row", createdBy: "user_me" })]),
	);

	// `chitchat-css.test.ts` pins the `.message .message-actions` selector as text. Nothing
	// checked that any DOM ever matches it, so renaming the class in the component alone would
	// leave both gates green and the actions unstyled.
	const actions = (await screen.findByText("own row")).closest(".message")?.querySelector(".message-actions");
	expect(actions).toBeTruthy();
});

test("the at-capacity notice is announced, not just displayed", async () => {
	const h = make_harness();
	await boot(h);

	// The log itself is aria-live="off", so a bare div inside it reaches nobody. Hitting the
	// window's growth ceiling is exactly the moment a member needs to be told.
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([message_doc(1_000, { rand: "m1", text: "capped" })], { hasMore: true, atCapacity: true }),
	);

	const notice = await screen.findByText("The live view stopped growing. Older messages load on request.");
	expect(notice.getAttribute("role")).toBe("status");
});

test("a row's time carries a machine date, a hidden written date, and a visible clock time", async () => {
	const h = make_harness();
	await boot(h);
	const timestamp = Date.now() - 60_000;
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([message_doc(timestamp, { rand: "m1", text: "timed" })]),
	);

	await screen.findByText("timed");
	const time = row_of("timed").querySelector("time")!;
	expect(Date.parse(time.dateTime)).toBe(timestamp);

	// The visible string shortens to clock time, and the day divider is a sibling that names no
	// row — so without the hidden date a reader moving row by row gets no date for a whole week.
	// It has to be text, not aria-label: `time` is name-prohibited.
	expect(time.textContent).toContain(
		new Date(timestamp).toLocaleDateString(undefined, {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
	);
	expect(time.querySelector(".message-clock")!.textContent).toBe(
		new Date(timestamp).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
	);
});

test("a day divider is an li in the message list, between two days", async () => {
	const h = make_harness();
	await boot(h);
	const today = Date.now();
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([
			message_doc(today, { rand: "m2", text: "today one" }),
			message_doc(today - DAY_MS, { rand: "m1", text: "yesterday one" }),
		]),
	);

	await screen.findByText("today one");
	// A div or an hr between the rows would malform a <ul> inside a role="log". A listitem is
	// announced from its own content, so the date is read once with no role and no label.
	const dividers = document.querySelectorAll(".day-divider");
	expect(dividers.length).toBe(1);
	expect(dividers[0].tagName).toBe("LI");
	expect(dividers[0].parentElement!.classList.contains("message-list")).toBe(true);
	expect(dividers[0].getAttribute("role")).toBeNull();
});

test("a log inside one day renders no divider above its first message", async () => {
	const h = make_harness();
	await boot(h);
	const today = Date.now();
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([
			message_doc(today, { rand: "m2", text: "later today" }),
			message_doc(today - 60_000, { rand: "m1", text: "earlier today" }),
		]),
	);

	// The rule is strictly between days. The accepted mockups draw a "Today" divider above the
	// first row and that half is dropped, so the density fixture can hold twelve rows and no divider.
	await screen.findByText("later today");
	expect(document.querySelectorAll(".day-divider").length).toBe(0);
});

test("the avatar shows initials nobody hears, and a glyph for the two states that are not a name", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([
			message_doc(1_000, { rand: "m1", text: "named", createdBy: "user_other" }),
			message_doc(900, { rand: "m2", text: "gone", createdBy: "user_gone" }),
		]),
	);

	await screen.findByText("named");
	await waitFor(() => expect(screen.getByText("Bob")).toBeTruthy());
	const namedRow = row_of("named");
	const avatar = namedRow.querySelector(".message-avatar")!;
	expect(avatar.getAttribute("aria-hidden")).toBe("true");
	expect(avatar.textContent).toBe("B");

	// Initials rendered as plain text would double the author in every log announcement, which is
	// the one thing the grouping work protects. Count the author outside the hidden subtree.
	const carriers = [...namedRow.querySelectorAll("*")].filter(
		(element) => element.textContent === "Bob" && element.closest("[aria-hidden='true']") === null,
	);
	expect(carriers.length).toBe(1);

	// "Former member" must not become "FM": those letters are nobody's initials.
	expect(row_of("gone").querySelector(".message-avatar")!.textContent).toBe("•");
});

test("a grouped continuation still renders its author and its time", async () => {
	const h = make_harness();
	await boot(h);
	const base = Date.now();
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([
			message_doc(base, { rand: "m2", text: "second one", createdBy: "user_other" }),
			message_doc(base - 30_000, { rand: "m1", text: "first one", createdBy: "user_other" }),
		]),
	);

	await screen.findByText("second one");
	await waitFor(() => expect(screen.getAllByText("Bob").length).toBe(2));

	// Grouping is a visual affordance only. `.visually-hidden` is clip-path, so the head stays in
	// the accessibility tree; dropping it costs a screen-reader user the author on most rows.
	const second = row_of("second one");
	expect(second.classList.contains("is-continuation")).toBe(true);
	expect(within(second).getByText("Bob")).toBeTruthy();
	expect(second.querySelector(".message-head")!.classList.contains("visually-hidden")).toBe(true);
});

test("an incomplete messages window says the view may be stale, not that messages are missing", async () => {
	const h = make_harness();
	await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([message_doc(1_000, { rand: "m1", text: "delivered once" })]));
	await screen.findByText("delivered once");

	// The store never drops a key, so a document that leaves the flatten is not missing from the
	// view — it is frozen at the last value anybody heard about. Saying it could not be loaded
	// would be affirmatively wrong about a row that is right there on the screen.
	messages.onUpdate(window_update([], { incomplete: true }));
	const notice = await screen.findByText("Older messages in view may be out of date.");
	expect(notice.getAttribute("role")).toBe("alert");
	expect(notice.textContent).not.toContain("could not be loaded");
	expect(notice.textContent).not.toContain("missing");
	expect(screen.getByText("delivered once")).toBeTruthy();
});

// #endregion log and messages

// #region send flow

test("Enter sends, Shift+Enter does not, and the send invokes the backend under the channel key", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const input = await screen.findByRole("combobox", { name: "Message #general" });
	fireEvent.input(input, { target: { value: "line one" } });
	fireEvent.keyDown(input, { key: "Enter", shiftKey: true });
	expect(h.raw.backend.invoke).not.toHaveBeenCalled();

	fireEvent.keyDown(input, { key: "Enter" });
	await waitFor(() => expect(invoke_calls(h, "message-send")).toHaveLength(1));
	const call = invoke_calls(h, "message-send")[0]!;
	expect(call.input.channelKey).toBe(CH1_KEY);
	expect(call.input.text).toBe("line one");
	expect(call.input.attachments).toEqual([]);
	expect(call.input.mentions).toEqual([]);
	expect(typeof call.input.clientRequestId).toBe("string");
	expect(h.raw.data.append).not.toHaveBeenCalled();
});

test("an in-flight send disables Send, shows the pending row, and the ack keeps the message", async () => {
	const h = make_harness();
	const ack = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(ack.promise);
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const input = await screen.findByRole("combobox", { name: "Message #general" });
	fireEvent.input(input, { target: { value: "hello there" } });
	fireEvent.click(screen.getByRole("button", { name: "Send" }));

	// "Sending…" appears twice: on the pending row's status and as the disabled Send label.
	expect(await screen.findAllByText("Sending…")).toBeTruthy();
	await waitFor(() => expect(screen.getByRole("button", { name: "Sending…" }).hasAttribute("disabled")).toBe(true));

	ack.resolve(invoke_ok({ messageKey: `${CH1_KEY}:${inv(9_000)}:sent` }));
	await waitFor(() => {
		expect(screen.queryByText("Sending…")).toBeNull();
		expect(screen.getByText("hello there")).toBeTruthy();
	});
	expect(screen.getByRole("button", { name: "Send" }).hasAttribute("disabled")).toBe(false);
});

test("an in-flight top-level send blocks a channel switch, and a late failure keeps Retry visible", async () => {
	const h = make_harness();
	const ack = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(ack.promise);
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const input = await screen.findByRole("combobox", { name: "Message #general" });
	const random = screen.getByRole("button", { name: "#random" });
	fireEvent.input(input, { target: { value: "late top-level send" } });
	// Keep both clicks in one turn. The App ref must see the send before React can paint disabled nav.
	act(() => {
		fireEvent.click(screen.getByRole("button", { name: "Send" }));
		fireEvent.click(random);
	});

	expect(screen.getByRole("combobox", { name: "Message #general" })).toBeTruthy();
	expect(
		await screen.findByText("Wait for pending message changes to finish before leaving this channel or thread.", {
			selector: ".channel-status",
		}),
	).toBeTruthy();
	await waitFor(() => expect(random.hasAttribute("disabled")).toBe(true));

	// A definite refusal, not a lost answer: unavailable would replay silently instead of failing.
	await act(async () => {
		ack.resolve(invoke_refused(500, "late top-level failed"));
		await Promise.resolve();
	});
	const failedRow = screen.getByText("late top-level send").closest(".message") as HTMLElement;
	expect(await within(failedRow).findByRole("button", { name: "Retry sending message" })).toBeTruthy();
	expect(within(failedRow).getByRole("alert").textContent).toContain("late top-level failed");
	await waitFor(() => expect(random.hasAttribute("disabled")).toBe(false));
});

test("a failed send surfaces the refusal message and Retry reuses the same clientRequestId", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_refused(429, "Rate limited — try again in a few seconds"));
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const input = await screen.findByRole("combobox", { name: "Message #general" });
	fireEvent.input(input, { target: { value: "first try" } });
	fireEvent.click(screen.getByRole("button", { name: "Send" }));

	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("Rate limited — try again in a few seconds");

	fireEvent.click(screen.getByRole("button", { name: "Retry sending message" }));
	await waitFor(() => expect(invoke_calls(h, "message-send")).toHaveLength(2));
	// The retry replays the SAME logical send: identical clientRequestId, so the backend
	// dedupes instead of writing twice.
	const sends = invoke_calls(h, "message-send");
	const firstId = sends[0]!.input.clientRequestId;
	expect(typeof firstId).toBe("string");
	expect(sends[1]!.input.clientRequestId).toBe(firstId);

	// A fresh send mints a fresh id.
	await waitFor(() => expect(screen.queryByText("Sending…")).toBeNull());
	fireEvent.input(input, { target: { value: "second message" } });
	fireEvent.keyDown(input, { key: "Enter" });
	await waitFor(() => expect(invoke_calls(h, "message-send")).toHaveLength(3));
	expect(invoke_calls(h, "message-send")[2]!.input.clientRequestId).not.toBe(firstId);
});

test("a storage_full refusal becomes one announced channel state and stops the composer", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(
		invoke_nay("storage_full", "This plugin has used its 10000 document slots"),
	);
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	fireEvent.input(screen.getByRole("combobox", { name: "Message #general" }), { target: { value: "hello" } });
	fireEvent.click(screen.getByRole("button", { name: "Send" }));

	// A full store is the channel's state, not this row's error. The server's own message is the
	// only thing that separates "you are full" from "the plugin is full", so it is what shows.
	const alert = await screen.findByText("This plugin has used its 10000 document slots");
	expect(alert.getAttribute("role")).toBe("alert");
	expect(alert.closest(".message")).toBeNull();
	await waitFor(() => expect((screen.getByRole("button", { name: "Send" }) as HTMLButtonElement).disabled).toBe(true));

	// The failed row keeps its retry, but not a second copy of the same sentence.
	const failedRow = screen.getByText("hello").closest(".message") as HTMLElement;
	expect(within(failedRow).queryByText(/document slots/)).toBeNull();
	expect(within(failedRow).getByRole("button", { name: "Retry sending message" })).toBeTruthy();
});

test("an unavailable send retry timer stops when the page unmounts", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValue(invoke_nay("unavailable", "Reply lost"));
	const { unmount } = await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	vi.useFakeTimers();
	try {
		type_in_composer(composer_box("Message #general"), "uncertain send");
		await act(async () => {
			fireEvent.keyDown(composer_box("Message #general"), { key: "Enter" });
			await Promise.resolve();
		});
		expect(h.raw.backend.invoke).toHaveBeenCalledTimes(1);

		unmount();
		await act(async () => {
			await vi.advanceTimersByTimeAsync(60_000);
		});
		expect(h.raw.backend.invoke).toHaveBeenCalledTimes(1);
	} finally {
		vi.useRealTimers();
	}
});

// #endregion send flow

// #region announcer

test("a remote arrival announces author and preview; the user's own send never announces", async () => {
	const h = make_harness();
	const ack = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(ack.promise);
	const { container } = await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([]));

	// Own send: the watch echo arrives BEFORE the ack (the common race). Only the
	// createdBy check keeps it out of the announcer.
	const input = await screen.findByRole("combobox", { name: "Message #general" });
	fireEvent.input(input, { target: { value: "my own words" } });
	fireEvent.click(screen.getByRole("button", { name: "Send" }));
	const ownKey = `${CH1_KEY}:${inv(9_000)}:sent`;
	messages.onUpdate(
		window_update([
			{ ...message_doc(9_000, { rand: "sent", text: "my own words" }), createdBy: "user_me", updatedBy: "user_me" },
		]),
	);
	await screen.findAllByText("my own words");
	expect(announcer_text(container)).not.toContain("my own words");
	ack.resolve(invoke_ok({ messageKey: ownKey }));

	// Remote arrival: announced as "<author>: <preview>".
	messages.onUpdate(
		window_update([
			{ ...message_doc(9_000, { rand: "sent", text: "my own words" }), createdBy: "user_me", updatedBy: "user_me" },
			message_doc(9_500, { rand: "rem1", text: "hello from Bob" }),
		]),
	);
	await waitFor(() => expect(announcer_text(container)).toContain("Bob: hello from Bob"));
	expect(announcer_text(container)).not.toContain("my own words");
});

test("a burst of remote arrivals coalesces into one counted announcement", async () => {
	const h = make_harness();
	const { container } = await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([]));

	messages.onUpdate(
		window_update([
			message_doc(9_200, { rand: "rem3", text: "three" }),
			message_doc(9_100, { rand: "rem2", text: "two" }),
			message_doc(9_000, { rand: "rem1", text: "one" }),
		]),
	);
	await waitFor(() => expect(announcer_text(container)).toContain("3 new messages in #general"));
});

test("a delayed author lookup cannot announce after the member switches channels", async () => {
	const h = make_harness();
	const names = deferred<Record<string, string | null>>();
	h.raw.members.resolve.mockReturnValueOnce(names.promise);
	const { container } = await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([]));
	messages.onUpdate(window_update([message_doc(9_000, { rand: "old", text: "old message" })]));

	fireEvent.click(screen.getByRole("button", { name: "#random" }));
	await waitFor(() => expect(announcer_text(container)).toContain("#random"));

	await act(async () => {
		names.resolve({ user_other: "Bob" });
		await names.promise;
		await Promise.resolve();
	});
	expect(announcer_text(container)).toContain("#random");
	expect(announcer_text(container)).not.toContain("old message");
});

test("same-author arrivals wait for one lookup and only announce the newest message", async () => {
	const h = make_harness();
	const names = deferred<Record<string, string | null>>();
	const startedAt = Date.now();
	const now = vi.spyOn(Date, "now").mockReturnValue(startedAt);
	h.raw.members.resolve.mockReturnValueOnce(names.promise);
	try {
		const { container } = await boot(h);
		const messages = h.find_window("messages", `${CH1_KEY}:`)!;
		const first = message_doc(9_000, { rand: "first", text: "first message" });
		const second = message_doc(9_100, { rand: "second", text: "second message" });
		messages.onUpdate(window_update([]));
		messages.onUpdate(window_update([first]));
		// A suspended lookup may outlive the cache TTL. It is still the one request to await.
		now.mockReturnValue(startedAt + 5 * 60 * 1_000 + 1);
		messages.onUpdate(window_update([second, first]));

		await act(async () => {
			await Promise.resolve();
		});
		expect(announcer_text(container)).not.toContain("Former member");
		expect(h.raw.members.resolve).toHaveBeenCalledTimes(1);

		await act(async () => {
			names.resolve({ user_other: "Bob" });
			await names.promise;
			await Promise.resolve();
		});
		await waitFor(() => expect(announcer_text(container)).toBe("Bob: second message"));
		expect(announcer_text(container)).not.toContain("first message");
	} finally {
		now.mockRestore();
	}
});

test("the announcer speaks the text alone: the sequence lives in an attribute", async () => {
	const h = make_harness();
	const { container } = await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([]));
	messages.onUpdate(window_update([message_doc(9_000, { rand: "rem1", text: "hello" })]));

	await waitFor(() => expect(announcer_text(container)).toContain("Bob: hello"));
	const announcer = container.querySelector(".chitchat-announcer")!;
	const sequenceSpan = announcer.querySelector("[data-announcement-sequence]")!;

	// The sequence exists to make two identical announcements differ. It used to be rendered as
	// text inside the live region, so assistive tech read the number out loud before the message.
	expect(sequenceSpan.textContent).toBe("");
	expect(sequenceSpan.getAttribute("data-announcement-sequence")).toBe("1");
	// And no leading space in front of the text either.
	expect(announcer.textContent).toBe("Bob: hello");
});

// #endregion announcer

// #region own vs other affordances

test("edit and delete exist only on own messages", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([
			message_doc(2_000, { rand: "them", text: "other message", createdBy: "user_other" }),
			message_doc(1_000, { rand: "mine", text: "own message", createdBy: "user_me" }),
		]),
	);

	await screen.findByText("own message");
	const ownRow = screen.getByText("own message").closest("[data-key]") as HTMLElement;
	const otherRow = screen.getByText("other message").closest("[data-key]") as HTMLElement;
	expect(within(ownRow).getByRole("button", { name: "Edit" })).toBeTruthy();
	expect(within(ownRow).getByRole("button", { name: "Delete" })).toBeTruthy();
	expect(within(otherRow).queryByRole("button", { name: "Edit" })).toBeNull();
	expect(within(otherRow).queryByRole("button", { name: "Delete" })).toBeNull();
});

test("editing an own message sends the new text through the backend and renders the (edited) marker", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "mine", text: "before", createdBy: "user_me" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));

	await screen.findByText("before");
	fireEvent.click(screen.getByRole("button", { name: "Edit" }));
	const editBox = await screen.findByRole("textbox", { name: "Edit message" });
	fireEvent.input(editBox, { target: { value: "after" } });
	fireEvent.click(screen.getByRole("button", { name: "Save" }));

	// The backend stamps `editedAt` itself; the page only names the message and the new text.
	await waitFor(() => expect(invoke_calls(h, "message-edit")).toHaveLength(1));
	expect(invoke_calls(h, "message-edit")[0]!.input).toEqual({ messageKey: doc.key, text: "after", mentions: [] });
	expect(await screen.findByText("(edited)")).toBeTruthy();
	expect(screen.getByText("after")).toBeTruthy();
	await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: "Edit" })));
});

test("Cancel closes an edit and restores focus to its Edit button", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "mine", text: "before", createdBy: "user_me" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));

	await screen.findByText("before");
	fireEvent.click(screen.getByRole("button", { name: "Edit" }));
	const editBox = await screen.findByRole("textbox", { name: "Edit message" });
	expect(document.activeElement).toBe(editBox);
	fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

	await waitFor(() => expect(screen.queryByRole("textbox", { name: "Edit message" })).toBeNull());
	expect(document.activeElement).toBe(screen.getByRole("button", { name: "Edit" }));
});

test("a pending message edit freezes its draft and ignores Escape until a refusal settles", async () => {
	const h = make_harness();
	const pendingInvoke = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(pendingInvoke.promise);
	await boot(h);
	const doc = message_doc(1_000, { rand: "mine", text: "before", createdBy: "user_me" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));

	await screen.findByText("before");
	fireEvent.click(screen.getByRole("button", { name: "Edit" }));
	const editBox = (await screen.findByRole("textbox", { name: "Edit message" })) as HTMLTextAreaElement;
	fireEvent.input(editBox, { target: { value: "submitted draft" } });
	fireEvent.click(screen.getByRole("button", { name: "Save" }));
	await screen.findByRole("button", { name: "Saving…" });

	expect(editBox.readOnly).toBe(true);
	expect((screen.getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(true);
	// readOnly makes normal typing inert. Escape must also leave the submitted draft open.
	fireEvent.keyDown(editBox, { key: "x" });
	fireEvent.keyDown(editBox, { key: "Escape" });
	expect(screen.getByRole("textbox", { name: "Edit message" })).toBe(editBox);
	expect(editBox.value).toBe("submitted draft");

	pendingInvoke.resolve(invoke_refused(409, "Message changed"));
	expect((await screen.findByRole("alert")).textContent).toContain("Message changed");
	expect(editBox.readOnly).toBe(false);
	expect(editBox.value).toBe("submitted draft");
	expect(invoke_calls(h, "message-edit")[0]!.input.text).toBe("submitted draft");
});

test("an unavailable message edit retries the exact write and stays locked until its watch echo", async () => {
	const h = make_harness();
	const firstInvoke = deferred<InvokeResult>();
	const retryInvoke = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(firstInvoke.promise).mockReturnValueOnce(retryInvoke.promise);
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	const doc = message_doc(1_000, { rand: "mine", text: "before", createdBy: "user_me" });
	messages.onUpdate(window_update([doc]));

	await screen.findByText("before");
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	const panel = await screen.findByRole("region", { name: "Thread" });
	fireEvent.click(within(panel).getByRole("button", { name: "Edit" }));
	const editBox = (await within(panel).findByRole("textbox", { name: "Edit message" })) as HTMLTextAreaElement;
	const close = within(panel).getByRole("button", { name: "Close thread" });
	const random = screen.getByRole("button", { name: "#random" });
	fireEvent.input(editBox, { target: { value: "submitted once" } });
	// Start and navigate in one turn. The stable counters must lock before React paints.
	act(() => {
		fireEvent.click(within(panel).getByRole("button", { name: "Save" }));
		fireEvent.click(close);
		fireEvent.click(random);
	});

	expect(screen.getByRole("combobox", { name: "Message #general" })).toBeTruthy();
	expect(screen.getByRole("region", { name: "Thread" })).toBe(panel);
	await waitFor(() => expect(random.hasAttribute("disabled")).toBe(true));
	await waitFor(() => expect(close.hasAttribute("disabled")).toBe(true));
	const submitted = invoke_calls(h, "message-edit")[0]!;
	expect(submitted.input.messageKey).toBe(doc.key);
	expect(submitted.input.text).toBe("submitted once");

	await act(async () => {
		firstInvoke.resolve(invoke_nay("unavailable", "The edit result was lost"));
		await firstInvoke.promise;
	});
	expect((await within(panel).findByRole("alert")).textContent).toContain("The edit result was lost");
	expect(editBox.readOnly).toBe(true);
	expect((within(panel).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(false);
	expect(random.hasAttribute("disabled")).toBe(true);

	fireEvent.click(within(panel).getByRole("button", { name: "Retry" }));
	await waitFor(() => expect(invoke_calls(h, "message-edit")).toHaveLength(2));
	expect(invoke_calls(h, "message-edit")[1]!.input).toEqual(submitted.input);

	// The watch echo carries the backend's own editedAt stamp, not one the page chose.
	await act(async () => {
		messages.onUpdate(
			window_update([
				{
					...doc,
					value: { ...doc.value, text: "submitted once", editedAt: 2_000 },
					revision: doc.revision + 1,
					updatedAt: 2_000,
				},
			]),
		);
		await Promise.resolve();
	});
	await waitFor(() => expect(within(panel).queryByRole("textbox", { name: "Edit message" })).toBeNull());
	expect(within(panel).getByText("submitted once")).toBeTruthy();
	await waitFor(() => expect(random.hasAttribute("disabled")).toBe(false));
	await waitFor(() => expect(close.hasAttribute("disabled")).toBe(false));

	// The late replay result belongs to the request the watch already proved.
	await act(async () => {
		retryInvoke.resolve(invoke_refused(409, "Already stored"));
		await retryInvoke.promise;
	});
	expect(screen.queryByText("Already stored")).toBeNull();
});

test("a newer different watch value settles an uncertain edit as a conflict", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "The edit result was lost"));
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	const doc = message_doc(1_000, { rand: "mine", text: "before", createdBy: "user_me" });
	messages.onUpdate(window_update([doc]));

	await screen.findByText("before");
	fireEvent.click(screen.getByRole("button", { name: "Edit" }));
	const editBox = (await screen.findByRole("textbox", { name: "Edit message" })) as HTMLTextAreaElement;
	fireEvent.input(editBox, { target: { value: "keep my draft" } });
	fireEvent.click(screen.getByRole("button", { name: "Save" }));
	await screen.findByText("The edit result was lost");

	messages.onUpdate(
		window_update([
			{
				...doc,
				value: { ...doc.value, text: "other edit", editedAt: 2_000 },
				revision: 2,
				updatedAt: 2_000,
			},
		]),
	);

	await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("Someone else changed this message"));
	expect(editBox.readOnly).toBe(false);
	expect(editBox.value).toBe("keep my draft");
	expect((screen.getByRole("button", { name: "#random" }) as HTMLButtonElement).disabled).toBe(false);
	fireEvent.click(screen.getByRole("button", { name: "Save" }));
	await waitFor(() => expect(invoke_calls(h, "message-edit")).toHaveLength(2));
	expect(invoke_calls(h, "message-edit")[1]!.input.text).toBe("keep my draft");
});

test("a newer tombstone ends an uncertain edit and focuses the stable message row", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "The edit result was lost"));
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	const doc = message_doc(1_000, { rand: "mine", text: "before", createdBy: "user_me" });
	messages.onUpdate(window_update([doc]));

	await screen.findByText("before");
	fireEvent.click(screen.getByRole("button", { name: "Edit" }));
	const editBox = await screen.findByRole("textbox", { name: "Edit message" });
	fireEvent.input(editBox, { target: { value: "submitted edit" } });
	fireEvent.click(screen.getByRole("button", { name: "Save" }));
	await screen.findByText("The edit result was lost");
	expect((screen.getByRole("button", { name: "#random" }) as HTMLButtonElement).disabled).toBe(true);

	messages.onUpdate(
		window_update([
			{
				...doc,
				value: { ...doc.value, deletedAt: 2_000 },
				revision: 2,
				updatedAt: 2_000,
			},
		]),
	);

	const deleted = await screen.findByText("Message deleted");
	const row = deleted.closest("[data-key]") as HTMLElement;
	await waitFor(() => expect(document.activeElement).toBe(row));
	expect(row.tabIndex).toBe(-1);
	expect(screen.queryByRole("textbox", { name: "Edit message" })).toBeNull();
	expect(screen.queryByRole("alert")).toBeNull();
	expect((screen.getByRole("button", { name: "#random" }) as HTMLButtonElement).disabled).toBe(false);

	// A later live value must not reveal the old editor or its submitted text.
	messages.onUpdate(
		window_update([
			{
				...doc,
				value: { ...doc.value, text: "restored message", editedAt: 3_000 },
				revision: 3,
				updatedAt: 3_000,
			},
		]),
	);
	expect(await screen.findByText("restored message")).toBeTruthy();
	expect(screen.queryByRole("textbox", { name: "Edit message" })).toBeNull();
});

test("a remote tombstone moves focus from a removed Edit button to the message row", async () => {
	const h = make_harness();
	await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	const doc = message_doc(1_000, { rand: "mine", text: "before", createdBy: "user_me" });
	messages.onUpdate(window_update([doc]));

	await screen.findByText("before");
	const edit = screen.getByRole("button", { name: "Edit" });
	edit.focus();
	expect(document.activeElement).toBe(edit);
	messages.onUpdate(
		window_update([
			{
				...doc,
				value: { ...doc.value, deletedAt: 2_000 },
				revision: 2,
				updatedAt: 2_000,
			},
		]),
	);

	const deleted = await screen.findByText("Message deleted");
	const row = deleted.closest("[data-key]") as HTMLElement;
	await waitFor(() => expect(document.activeElement).toBe(row));
	expect(row.tabIndex).toBe(-1);
});

test("deleting an own message confirms in a dialog, puts a tombstone, and renders Message deleted", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "mine", text: "to remove", createdBy: "user_me" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));

	await screen.findByText("to remove");
	fireEvent.click(screen.getByRole("button", { name: "Delete" }));
	const dialog = await screen.findByRole("dialog");
	fireEvent.click(within(dialog).getByRole("button", { name: "Delete message" }));

	// The backend stamps the tombstone itself; the page only names the message.
	await waitFor(() => expect(invoke_calls(h, "message-delete")).toHaveLength(1));
	expect(invoke_calls(h, "message-delete")[0]!.input).toEqual({ messageKey: doc.key });
	const deleted = await screen.findByText("Message deleted");
	const row = deleted.closest("[data-key]") as HTMLElement;
	await waitFor(() => expect(document.activeElement).toBe(row));
	expect(row.tabIndex).toBe(-1);
	expect(screen.queryByText("to remove")).toBeNull();
});

test("Escape cannot close a delete confirmation while its write is pending", async () => {
	const h = make_harness();
	const pendingInvoke = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(pendingInvoke.promise);
	await boot(h);
	const doc = message_doc(1_000, { rand: "mine", text: "to remove", createdBy: "user_me" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));

	await screen.findByText("to remove");
	fireEvent.click(screen.getByRole("button", { name: "Delete" }));
	const dialog = await screen.findByRole("dialog");
	fireEvent.click(within(dialog).getByRole("button", { name: "Delete message" }));
	await within(dialog).findByRole("button", { name: "Deleting…" });

	fireEvent.keyDown(dialog, { key: "Escape" });
	expect(screen.getByRole("dialog")).toBe(dialog);
	expect((within(dialog).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(true);

	pendingInvoke.resolve(invoke_ok({ transcriptUpdated: true, revision: 2 }));
	expect(await screen.findByText("Message deleted")).toBeTruthy();
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test("a thrown message delete retries the exact tombstone and stays locked until its watch echo", async () => {
	const h = make_harness();
	const firstInvoke = deferred<InvokeResult>();
	const retryInvoke = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(firstInvoke.promise).mockReturnValueOnce(retryInvoke.promise);
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	const doc = message_doc(1_000, { rand: "mine", text: "to remove", createdBy: "user_me" });
	messages.onUpdate(window_update([doc]));

	await screen.findByText("to remove");
	const random = screen.getByRole("button", { name: "#random" });
	fireEvent.click(screen.getByRole("button", { name: "Delete" }));
	const dialog = await screen.findByRole("dialog");
	fireEvent.click(within(dialog).getByRole("button", { name: "Delete message" }));
	await waitFor(() => expect(random.hasAttribute("disabled")).toBe(true));
	const submitted = invoke_calls(h, "message-delete")[0]!;
	expect(submitted.input).toEqual({ messageKey: doc.key });

	await act(async () => {
		firstInvoke.reject(new Error("Connection ended after delete"));
		try {
			await firstInvoke.promise;
		} catch {
			// The row turns the transport rejection into the exact retry state below.
		}
	});
	expect((await within(dialog).findByRole("alert")).textContent).toContain("Connection ended after delete");
	expect((within(dialog).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(false);
	expect(random.hasAttribute("disabled")).toBe(true);

	fireEvent.click(within(dialog).getByRole("button", { name: "Retry delete" }));
	await waitFor(() => expect(invoke_calls(h, "message-delete")).toHaveLength(2));
	expect(invoke_calls(h, "message-delete")[1]!.input).toEqual(submitted.input);

	await act(async () => {
		messages.onUpdate(
			window_update([
				{ ...doc, value: { ...doc.value, deletedAt: 2_000 }, revision: doc.revision + 1, updatedAt: 2_000 },
			]),
		);
		await Promise.resolve();
	});
	expect(await screen.findByText("Message deleted")).toBeTruthy();
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	await waitFor(() => expect(random.hasAttribute("disabled")).toBe(false));

	await act(async () => {
		retryInvoke.resolve(invoke_refused(409, "Already deleted"));
		await retryInvoke.promise;
	});
	expect(screen.queryByText("Already deleted")).toBeNull();
});

test("a newer live message settles an uncertain delete as a conflict", async () => {
	const h = make_harness();
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "The delete result was lost"));
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	const doc = message_doc(1_000, { rand: "mine", text: "to remove", createdBy: "user_me" });
	messages.onUpdate(window_update([doc]));

	await screen.findByText("to remove");
	fireEvent.click(screen.getByRole("button", { name: "Delete" }));
	const dialog = await screen.findByRole("dialog");
	fireEvent.click(within(dialog).getByRole("button", { name: "Delete message" }));
	await within(dialog).findByText("The delete result was lost");

	messages.onUpdate(
		window_update([
			{
				...doc,
				value: { ...doc.value, text: "other edit", editedAt: 2_000 },
				revision: 2,
				updatedAt: 2_000,
			},
		]),
	);

	await waitFor(() =>
		expect(within(dialog).getByRole("alert").textContent).toContain("Someone else changed this message"),
	);
	expect(within(dialog).getByRole("button", { name: "Delete message" })).toBeTruthy();
	expect((screen.getByRole("button", { name: "#random" }) as HTMLButtonElement).disabled).toBe(false);
	fireEvent.click(within(dialog).getByRole("button", { name: "Delete message" }));
	await waitFor(() => expect(invoke_calls(h, "message-delete")).toHaveLength(2));
	expect(invoke_calls(h, "message-delete")[1]!.input).toEqual({ messageKey: doc.key });
});

test("a plain text-only message row keeps its action buttons focusable", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([message_doc(1_000, { rand: "m1", text: "plain row" })]),
	);

	await screen.findByText("plain row");
	const row = screen.getByText("plain row").closest("[data-key]") as HTMLElement;
	// The actions must be real tab stops: tabbing into one is the only way focus can
	// enter a plain row and trigger the :focus-within reveal.
	const reply = within(row).getByRole("button", { name: "Reply in thread" });
	expect(reply.getAttribute("tabindex")).toBeNull();
	expect(reply.hasAttribute("disabled")).toBe(false);
	reply.focus();
	expect(document.activeElement).toBe(reply);
});

test("a second edit follows the first before any watch echo, and a conflict keeps the editor open", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "mine", text: "first", createdBy: "user_me" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("first");

	const save = async (text: string) => {
		fireEvent.click(screen.getByRole("button", { name: "Edit" }));
		const box = await screen.findByRole("textbox", { name: "Edit message" });
		fireEvent.input(box, { target: { value: text } });
		fireEvent.click(screen.getByRole("button", { name: "Save" }));
	};

	await save("second");
	await waitFor(() => expect(invoke_calls(h, "message-edit")).toHaveLength(1));
	await screen.findByText("second");

	// The window has not delivered the stored value back yet. The local echo must carry the
	// answered revision, or this second edit would settle against a stale row.
	await save("third");
	await waitFor(() => expect(invoke_calls(h, "message-edit")).toHaveLength(2));
	expect(invoke_calls(h, "message-edit")[1]!.input.text).toBe("third");
	expect(await screen.findByText("third")).toBeTruthy();

	// A backend conflict is a real refusal, and the row says so without changing what it shows.
	h.raw.backend.invoke.mockResolvedValueOnce(invoke_refused(409, "Revision mismatch"));
	await save("fourth");
	expect(await screen.findByText("Revision mismatch")).toBeTruthy();
	expect(invoke_calls(h, "message-edit")[2]!.input.text).toBe("fourth");
	// The editor stays open holding the unsaved text, and the stored message did not change.
	fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
	expect(await screen.findByText("third")).toBeTruthy();
	expect(screen.queryByText("fourth")).toBeNull();
});

// #endregion own vs other affordances

// #region reactions

test("reaction chips group by createdBy, expose aria-pressed, and toggle through the backend", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "m1", text: "react to me" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("react to me");
	await wait_for_feeds(h);
	h.find_changes("reactions")!.onUpdate(
		watch_update([
			reaction_doc(doc.key, "heart", "user_me"),
			reaction_doc(doc.key, "heart", "user_other"),
			reaction_doc(doc.key, "party", "user_other"),
		]),
	);

	const mineChip = await screen.findByRole("button", { name: "Heart, 2 reactions" });
	expect(mineChip.getAttribute("aria-pressed")).toBe("true");
	const otherChip = screen.getByRole("button", { name: "Party, 1 reaction" });
	expect(otherChip.getAttribute("aria-pressed")).toBe("false");

	// Toggling my own reaction off asks the backend to write the removed marker.
	fireEvent.click(mineChip);
	await waitFor(() => expect(invoke_calls(h, "reaction-toggle")).toHaveLength(1));
	expect(invoke_calls(h, "reaction-toggle")[0]!.input).toEqual({ targetKey: doc.key, token: "heart", on: false });
	expect(h.raw.data.putOwned).not.toHaveBeenCalled();
	expect(h.raw.data.removeOwned).not.toHaveBeenCalled();

	// Toggling a reaction I do not hold turns it on under my own id.
	fireEvent.click(otherChip);
	await waitFor(() => expect(invoke_calls(h, "reaction-toggle")).toHaveLength(2));
	expect(invoke_calls(h, "reaction-toggle")[1]!.input).toEqual({ targetKey: doc.key, token: "party", on: true });
});

test("a forged reaction doc with a mismatched key tail counts under createdBy", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "m1", text: "target" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("target");
	await wait_for_feeds(h);
	// user_other smuggled user_me's id into the caller key; createdBy is stamped user_other.
	h.find_changes("reactions")!.onUpdate(
		watch_update([
			reaction_doc(doc.key, "heart", "user_other", "user_me"),
			reaction_doc(doc.key, "heart", "user_other"),
		]),
	);

	// One distinct reactor (user_other) — and it is NOT highlighted as mine.
	const chip = await screen.findByRole("button", { name: "Heart, 1 reaction" });
	expect(chip.getAttribute("aria-pressed")).toBe("false");
});

test("the add-reaction palette opens, picks a token, and returns focus to the opener", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "m1", text: "palette target" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));

	await screen.findByText("palette target");
	const opener = screen.getByRole("button", { name: "Add reaction" });
	fireEvent.click(opener);
	const palette = await screen.findByRole("group", { name: "Choose a reaction" });
	await waitFor(() => expect(document.activeElement?.getAttribute("aria-label")).toBe("Thumbs up"));

	fireEvent.click(within(palette).getByRole("button", { name: "Rocket" }));
	await waitFor(() => expect(invoke_calls(h, "reaction-toggle")).toHaveLength(1));
	expect(invoke_calls(h, "reaction-toggle")[0]!.input).toEqual({ targetKey: doc.key, token: "rocket", on: true });
	await waitFor(() => expect(document.activeElement).toBe(opener));
});

/** Renders two roots and returns the older one's row, which sits outside a lagging companion. */
async function boot_two_roots(
	h: ReturnType<typeof make_harness>,
	companion: {
		reactions?: unknown[];
		replies?: unknown[];
		reactionsDone?: boolean;
		repliesDone?: boolean;
	} = {},
) {
	await boot(h);
	const rootNew = message_doc(2_000, { rand: "newr", text: "new root" });
	const rootOld = message_doc(1_000, { rand: "oldr", text: "old root" });
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const body = init?.body as { collection?: string; keyStartExclusive?: string } | undefined;
		const collection = body?.collection;
		// A lagging first page would otherwise catch up immediately. Hold later pages so the
		// frontier stays where the test put it.
		if (body?.keyStartExclusive !== undefined && collection === "reactions" && companion.reactionsDone === false) {
			return new Promise(() => {});
		}
		if (body?.keyStartExclusive !== undefined && collection === "replies" && companion.repliesDone === false) {
			return new Promise(() => {});
		}
		if (collection === "reactions") {
			return http_page(companion.reactions ?? [], companion.reactionsDone ?? true);
		}
		if (collection === "replies") {
			return http_page(companion.replies ?? [], companion.repliesDone ?? true);
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([rootNew, rootOld]));
	await screen.findByText("old root");
	await wait_for_companion_lists(h);
	return { rootNew, rootOld };
}

function row_of(text: string) {
	return screen.getByText(text).closest("[data-key]") as HTMLElement;
}

function row_key(row: HTMLElement) {
	return row.getAttribute("data-key")!;
}

async function pick_reaction(row: HTMLElement, name: string) {
	fireEvent.click(within(row).getByRole("button", { name: "Add reaction" }));
	const palette = await within(row).findByRole("group", { name: "Choose a reaction" });
	fireEvent.click(within(palette).getByRole("button", { name }));
}

test("an initial pending reactions list stays neutral until its result arrives", async () => {
	const h = make_harness();
	await boot(h);
	const root = message_doc(2_000, { rand: "newr", text: "pending reactions" });
	const pendingReactions = deferred<unknown>();
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		return collection === "reactions" ? pendingReactions.promise : http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
	const row = await waitFor(() => row_of("pending reactions"));
	await waitFor(() => expect(list_calls(h, "reactions")).toHaveLength(1));
	expect(within(row).queryByText("Reactions unavailable")).toBeNull();
	expect(within(row).getByRole("button", { name: "Add reaction" })).toBeTruthy();

	await act(async () => {
		pendingReactions.resolve(http_page([reaction_doc(root.key, "heart", "user_other")], true));
		await Promise.resolve();
	});
	expect(await within(row).findByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
	expect(within(row).queryByText("Reactions unavailable")).toBeNull();
});

test("a healthy row below the reactions frontier stays neutral without claiming no reactions", async () => {
	const h = make_harness();
	const newestRoot = message_doc(2_000, { rand: "newr", text: "new root" });
	await boot_two_roots(h, {
		reactions: [reaction_doc(newestRoot.key, "heart", "user_me")],
		reactionsDone: false,
	});

	const oldRow = row_of("old root");
	expect(within(oldRow).queryByText("Reactions unavailable")).toBeNull();
	expect(oldRow.querySelector(".message-reactions")).toBeNull();

	// The remove path is hidden, not refused: with no chips there is nothing to un-react. The add
	// path stays live, because turning a reaction on is idempotent at the backend whether or not
	// it is already there. Refusing both would stop reactions on every message past the coverage
	// frontier, which in a busy channel is a couple of days back.
	await pick_reaction(oldRow, "Heart");
	await waitFor(() => expect(invoke_calls(h, "reaction-toggle")).toHaveLength(1));
	expect(invoke_calls(h, "reaction-toggle")[0]!.input).toEqual({
		targetKey: row_key(oldRow),
		token: "heart",
		on: true,
	});
});

test("a row the reactions list does reach still writes the reaction", async () => {
	const h = make_harness();
	await boot_two_roots(h);

	await pick_reaction(row_of("old root"), "Heart");
	await waitFor(() => expect(invoke_calls(h, "reaction-toggle")).toHaveLength(1));
});

test("an incomplete companion list makes every row uncovered, however deep it reached", async () => {
	const h = make_harness();
	await boot(h);
	const rootNew = message_doc(2_000, { rand: "newr", text: "new root" });
	const rootOld = message_doc(1_000, { rand: "oldr", text: "old root" });
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions" || collection === "replies") {
			throw new Error("companion list failed");
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([rootNew, rootOld]));
	await screen.findByText("old root");

	const newRow = row_of("new root");
	expect(await within(newRow).findByText("Reactions unavailable")).toBeTruthy();
	expect(within(newRow).getByRole("button", { name: "View thread" })).toBeTruthy();

	await pick_reaction(newRow, "Heart");
	await waitFor(() => expect(invoke_calls(h, "reaction-toggle")).toHaveLength(1));
	expect(h.raw.data.removeOwned).not.toHaveBeenCalled();
});

test("an incomplete companion list is reported to the member", async () => {
	const h = make_harness();
	await boot(h);
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			throw new Error("companion list failed");
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([
			message_doc(2_000, { rand: "newr", text: "new root" }),
			message_doc(1_000, { rand: "oldr", text: "old root" }),
		]),
	);

	const notice = await screen.findByText("Some reactions and replies in this range could not be loaded.");
	expect(notice.getAttribute("role")).toBe("alert");
});

test("a failed companion list retries on the backoff timer without a feed", async () => {
	const h = make_harness();
	await boot(h);
	vi.useFakeTimers();
	const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
	const root = message_doc(2_000, { rand: "newr", text: "new root" });
	const heart = reaction_doc(root.key, "heart", "user_other");
	let reactionLists = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			reactionLists += 1;
			if (reactionLists === 1) {
				throw new Error("companion list failed");
			}
			return http_page([heart], true);
		}
		return http_page([], true);
	});
	try {
		await act(async () => {
			h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
			await Promise.resolve();
			await Promise.resolve();
		});
		const row = row_of("new root");
		expect(within(row).getByText("Reactions unavailable")).toBeTruthy();
		expect(list_calls(h, "reactions")).toHaveLength(1);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(1_000);
		});
		expect(within(row).getByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
		expect(within(row).queryByText("Reactions unavailable")).toBeNull();
		expect(list_calls(h, "reactions")).toHaveLength(2);
	} finally {
		randomSpy.mockRestore();
		vi.useRealTimers();
	}
});

test("an empty non-final companion page is incomplete and retries", async () => {
	const h = make_harness();
	await boot(h);
	vi.useFakeTimers();
	const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
	const root = message_doc(2_000, { rand: "newr", text: "new root" });
	const heart = reaction_doc(root.key, "heart", "user_other");
	let reactionLists = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			reactionLists += 1;
			return reactionLists === 1 ? http_page([], false) : http_page([heart], true);
		}
		return http_page([], true);
	});
	try {
		await act(async () => {
			h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
			await Promise.resolve();
			await Promise.resolve();
		});
		const row = row_of("new root");
		expect(within(row).getByText("Reactions unavailable")).toBeTruthy();
		expect(list_calls(h, "reactions")).toHaveLength(1);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(1_000);
		});
		expect(within(row).getByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
		expect(within(row).queryByText("Reactions unavailable")).toBeNull();
		expect(list_calls(h, "reactions")).toHaveLength(2);
	} finally {
		randomSpy.mockRestore();
		vi.useRealTimers();
	}
});

test("a failed companion list retries with backoff until it succeeds and then stops", async () => {
	const h = make_harness();
	await boot(h);
	vi.useFakeTimers();
	const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
	const root = message_doc(2_000, { rand: "newr", text: "new root" });
	const heart = reaction_doc(root.key, "heart", "user_other");
	let reactionLists = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			reactionLists += 1;
			if (reactionLists <= 3) {
				throw new Error("companion list failed");
			}
			return http_page([heart], true);
		}
		return http_page([], true);
	});
	try {
		await act(async () => {
			h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(screen.getByText("new root")).toBeTruthy();
		const row = row_of("new root");
		expect(within(row).getByText("Reactions unavailable")).toBeTruthy();
		expect(list_calls(h, "reactions")).toHaveLength(1);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(1_000);
		});
		expect(list_calls(h, "reactions")).toHaveLength(2);
		expect(within(row).getByText("Reactions unavailable")).toBeTruthy();

		await act(async () => {
			await vi.advanceTimersByTimeAsync(2_000);
		});
		expect(list_calls(h, "reactions")).toHaveLength(3);
		expect(within(row).getByText("Reactions unavailable")).toBeTruthy();

		await act(async () => {
			await vi.advanceTimersByTimeAsync(4_000);
		});
		expect(within(row).getByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
		expect(within(row).queryByText("Reactions unavailable")).toBeNull();
		expect(list_calls(h, "reactions")).toHaveLength(4);

		const afterSuccess = list_calls(h, "reactions").length;
		await act(async () => {
			await vi.advanceTimersByTimeAsync(60_000);
		});
		expect(list_calls(h, "reactions")).toHaveLength(afterSuccess);
	} finally {
		randomSpy.mockRestore();
		vi.useRealTimers();
	}
});

test("a dead incomplete companion list does not keep retrying on the backoff timer", async () => {
	const h = make_harness();
	await boot(h);
	vi.useFakeTimers();
	const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
	const root = message_doc(2_000, { rand: "newr", text: "new root" });
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			throw new Error("companion list failed");
		}
		return http_page([], true);
	});
	try {
		await act(async () => {
			h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(h.find_changes("reactions")).toBeTruthy();
		expect(list_calls(h, "reactions")).toHaveLength(1);

		await act(async () => {
			h.find_changes("reactions")!.onUpdate(null, { reason: "denied" } satisfies WatchDeathInfo);
		});
		expect(within(row_of("new root")).getByText("Reactions unavailable")).toBeTruthy();

		const listsAfterDeath = list_calls(h, "reactions").length;
		await act(async () => {
			await vi.advanceTimersByTimeAsync(60_000);
		});
		expect(list_calls(h, "reactions")).toHaveLength(listsAfterDeath);
	} finally {
		randomSpy.mockRestore();
		vi.useRealTimers();
	}
});

test("a failed companion list retries when that collection's feed delivers", async () => {
	const h = make_harness();
	await boot(h);
	vi.useFakeTimers();
	const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
	const root = message_doc(2_000, { rand: "newr", text: "new root" });
	const heart = reaction_doc(root.key, "heart", "user_other");
	let reactionLists = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			reactionLists += 1;
			if (reactionLists === 1) {
				throw new Error("companion list failed");
			}
			return http_page([heart], true);
		}
		return http_page([], true);
	});
	try {
		await act(async () => {
			h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
			await Promise.resolve();
			await Promise.resolve();
		});
		const row = row_of("new root");
		expect(within(row).getByText("Reactions unavailable")).toBeTruthy();
		expect(h.find_changes("reactions")).toBeTruthy();
		expect(list_calls(h, "reactions")).toHaveLength(1);

		await act(async () => {
			h.find_changes("reactions")!.onUpdate(watch_update([]));
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(within(row).getByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
		expect(within(row).queryByText("Reactions unavailable")).toBeNull();
		expect(list_calls(h, "reactions")).toHaveLength(2);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(60_000);
		});
		expect(list_calls(h, "reactions")).toHaveLength(2);
	} finally {
		randomSpy.mockRestore();
		vi.useRealTimers();
	}
});

test("a dead incomplete companion list does not retry when the tab becomes visible", async () => {
	const h = make_harness();
	await boot(h);
	vi.useFakeTimers();
	const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
	const root = message_doc(2_000, { rand: "newr", text: "new root" });
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			throw new Error("companion list failed");
		}
		return http_page([], true);
	});
	try {
		await act(async () => {
			h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(h.find_changes("reactions")).toBeTruthy();
		await act(async () => {
			h.find_changes("reactions")!.onUpdate(null, { reason: "denied" } satisfies WatchDeathInfo);
		});
		expect(within(row_of("new root")).getByText("Reactions unavailable")).toBeTruthy();
		expect(screen.queryByText("Some reactions and replies in this range could not be loaded.")).toBeNull();

		const listsAfterDeath = list_calls(h, "reactions").length;
		document.dispatchEvent(new Event("visibilitychange"));
		await act(async () => {
			await vi.advanceTimersByTimeAsync(60_000);
		});
		expect(list_calls(h, "reactions")).toHaveLength(listsAfterDeath);
	} finally {
		randomSpy.mockRestore();
		vi.useRealTimers();
	}
});

test("an in-flight companion list does not start backoff after a channel switch", async () => {
	const h = make_harness();
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	vi.useFakeTimers();
	const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
	const pendingReactions = deferred<unknown>();
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			return pendingReactions.promise;
		}
		return http_page([], true);
	});
	const ch1Prefix = `${CH1_KEY}:`;
	const lists_for_ch1 = () =>
		list_calls(h, "reactions").filter(
			([, init]) => (init?.body as { keyPrefix?: string } | undefined)?.keyPrefix === ch1Prefix,
		);
	try {
		await act(async () => {
			h.find_window("messages", ch1Prefix)!.onUpdate(
				window_update([message_doc(2_000, { rand: "newr", text: "new root" })]),
			);
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(lists_for_ch1()).toHaveLength(1);

		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: "#random" }));
		});
		expect(h.find_window("messages", `${CH2_KEY}:`)).toBeTruthy();

		pendingReactions.reject(new Error("companion list failed"));
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
			await vi.advanceTimersByTimeAsync(60_000);
		});
		expect(lists_for_ch1()).toHaveLength(1);
	} finally {
		randomSpy.mockRestore();
		vi.useRealTimers();
	}
});

test("a companion list that finishes after the feed dies does not clear death", async () => {
	const h = make_harness();
	await boot(h);
	const root = message_doc(2_000, { rand: "newr", text: "new root" });
	const heart = reaction_doc(root.key, "heart", "user_other");
	const pendingReactions = deferred<unknown>();
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			return pendingReactions.promise;
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
	await screen.findByText("new root");
	const row = row_of("new root");
	await wait_for_feeds(h);
	h.find_changes("reactions")!.onUpdate(null, { reason: "denied" } satisfies WatchDeathInfo);
	expect(await within(row).findByText("Reactions unavailable")).toBeTruthy();

	pendingReactions.resolve(http_page([heart], true));
	await new Promise((resolve) => setTimeout(resolve, 0));
	expect(within(row).queryByRole("button", { name: "Heart, 1 reaction" })).toBeNull();
	expect(
		screen.getByText("Chitchat can no longer read reactions in this channel. Reload the page to try again."),
	).toBeTruthy();
	expect(within(row).getByText("Reactions unavailable")).toBeTruthy();
});

test("the action cluster renders only button classes the stylesheet's reveal rules name", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "m1", text: "actionable", createdBy: "user_me" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("actionable");

	const row = row_of("actionable");
	fireEvent.click(within(row).getByRole("button", { name: "Add reaction" }));
	await within(row).findByRole("group", { name: "Choose a reaction" });

	// The cluster is pointer-events: none once it overlays the row, and the reveal rules restore
	// `auto` per descendant. chitchat-css.test.ts checks that list of class names against the
	// stylesheet; this keeps the same list honest about what the component actually renders, so a
	// new button class cannot arrive dead to the mouse while both files stay green.
	const cluster = row.querySelector(".message-actions")!;
	const buttons = [...cluster.querySelectorAll("button")];
	expect(buttons.length).toBeGreaterThan(0);
	for (const button of buttons) {
		const identity = [...button.classList].filter(
			(name) => name === "message-action" || name === "reaction-palette-item",
		);
		expect(identity.length).toBe(1);
	}
});

test("a dead reactions feed makes the chips uncovered instead of freezing them", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "m1", text: "reacted" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await wait_for_feeds(h);
	const reactions = h.find_changes("reactions")!;
	reactions.onUpdate(watch_update([reaction_doc(doc.key, "heart", "user_other")]));
	expect(await screen.findByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();

	reactions.onUpdate(null, { reason: "denied" } satisfies WatchDeathInfo);
	expect(await screen.findByText("Reactions unavailable")).toBeTruthy();
	expect(screen.queryByRole("button", { name: "Heart, 1 reaction" })).toBeNull();
});

test("a failed reactions list hides a cached thread-root chip", async () => {
	const h = make_harness();
	await boot(h);
	const root = message_doc(1_000, { rand: "root", text: "failed thread root" });
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			throw new Error("reaction list failed");
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
	await wait_for_feeds(h);
	h.find_changes("reactions")!.onUpdate(watch_update([reaction_doc(root.key, "heart", "user_me")]));
	expect(await within(row_of("failed thread root")).findByText("Reactions unavailable")).toBeTruthy();

	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	const panel = await screen.findByRole("region", { name: "Thread" });
	const threadRoot = within(panel).getByText("failed thread root").closest("[data-key]") as HTMLElement;
	expect(within(threadRoot).getByText("Reactions unavailable")).toBeTruthy();
	expect(within(threadRoot).queryByRole("button", { name: "Heart, 1 reaction" })).toBeNull();
	expect(h.raw.data.putOwned).not.toHaveBeenCalled();
});

test("a dead reactions feed hides stale chips on the thread root and its reply", async () => {
	const h = make_harness();
	await boot(h);
	const root = message_doc(1_000, { rand: "root", text: "dead thread root" });
	const reply = {
		...message_doc(2_000, { rand: "r001", text: "dead thread reply" }),
		collection: "replies",
		key: `${root.key}:${inv(2_000)}:r001`,
	};
	const rootHeart = reaction_doc(root.key, "heart", "user_me");
	const replyParty = reaction_doc(reply.key, "party", "user_other");
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			return http_page([rootHeart, replyParty], true);
		}
		if (collection === "replies") {
			return http_page([reply], true);
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
	expect(await screen.findByRole("button", { name: /^1 reply/ })).toBeTruthy();
	await wait_for_feeds(h);

	fireEvent.click(screen.getByRole("button", { name: /^1 reply/ }));
	const panel = await screen.findByRole("region", { name: "Thread" });
	expect(await within(panel).findByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
	expect(await within(panel).findByRole("button", { name: "Party, 1 reaction" })).toBeTruthy();

	h.find_changes("reactions")!.onUpdate(null, { reason: "denied" } satisfies WatchDeathInfo);
	await waitFor(() => expect(within(panel).getAllByText("Reactions unavailable")).toHaveLength(2));
	expect(within(panel).queryByRole("button", { name: "Heart, 1 reaction" })).toBeNull();
	expect(within(panel).queryByRole("button", { name: "Party, 1 reaction" })).toBeNull();
	expect(h.raw.data.putOwned).not.toHaveBeenCalled();
});

// #endregion reactions

// #region threads

test("reply counts follow the replies list: covered roots get counts, the deepest partially-covered root does not, and 99+ follows hasMore", async () => {
	const h = make_harness();
	await boot(h);
	const rootNew = message_doc(2_000, { rand: "newr", text: "new root" });
	const rootOld = message_doc(1_000, { rand: "oldr", text: "old root" });
	const hundredOnNew = Array.from({ length: 100 }, (_, index) => ({
		...message_doc(1_000, {}),
		collection: "replies",
		key: `${rootNew.key}:${inv(2_000 + index)}:r${index}`,
	}));
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const body = init?.body as { collection?: string; keyStartExclusive?: string } | undefined;
		if (body?.collection === "replies") {
			if (body.keyStartExclusive !== undefined) {
				return new Promise(() => {});
			}
			return http_page(hundredOnNew, false);
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([rootNew, rootOld]));
	expect(await screen.findByRole("button", { name: /^99\+ replies/ })).toBeTruthy();
	expect(screen.getByRole("button", { name: "View thread" })).toBeTruthy();
});

test("a finished replies list claims an exact count on every rendered root", async () => {
	const h = make_harness();
	await boot(h);
	const rootNew = message_doc(2_000, { rand: "newr", text: "new root" });
	const rootOld = message_doc(1_000, { rand: "oldr", text: "old root" });
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "replies") {
			return http_page(
				[
					...Array.from({ length: 3 }, (_, index) => ({
						...message_doc(1_000, {}),
						collection: "replies",
						key: `${rootNew.key}:${inv(2_000 + index)}:r${index}`,
					})),
					{ ...message_doc(1_000, {}), collection: "replies", key: `${rootOld.key}:${inv(2_000)}:ro00` },
				],
				true,
			);
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([rootNew, rootOld]));
	expect(await screen.findByRole("button", { name: /^3 replies/ })).toBeTruthy();
	expect(screen.getByRole("button", { name: /^1 reply/ })).toBeTruthy();
	expect(screen.queryByRole("button", { name: "View thread" })).toBeNull();
});

test("the thread panel opens with focus inside, replies append under the root, close returns focus", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "root", text: "thread root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("thread root");

	const trigger = screen.getByRole("button", { name: "Reply in thread" });
	fireEvent.click(trigger);
	const panel = await screen.findByRole("region", { name: "Thread" });
	const closeButton = within(panel).getByRole("button", { name: "Close thread" });
	await waitFor(() => expect(document.activeElement).toBe(closeButton));

	const replyBox = within(panel).getByRole("combobox", { name: "Reply in thread" });
	fireEvent.input(replyBox, { target: { value: "a reply" } });
	fireEvent.keyDown(replyBox, { key: "Enter" });
	await waitFor(() => expect(invoke_calls(h, "reply-send")).toHaveLength(1));
	expect(invoke_calls(h, "reply-send")[0]!.input.rootMessageKey).toBe(doc.key);
	expect(invoke_calls(h, "reply-send")[0]!.input.text).toBe("a reply");

	fireEvent.click(closeButton);
	await waitFor(() => expect(screen.queryByRole("region", { name: "Thread" })).toBeNull());
	// Focus returns to the root's reply trigger — the thread summary now, since the sent reply
	// gave the root a reply count.
	expect(document.activeElement?.textContent).toContain("1 reply");
});

test("an in-flight reply blocks a thread switch, and a late failure keeps Retry visible", async () => {
	const h = make_harness();
	const ack = deferred<InvokeResult>();
	h.raw.backend.invoke.mockReturnValueOnce(ack.promise);
	await boot(h);
	const rootA = message_doc(1_000, { rand: "aaam", text: "root a" });
	const rootB = message_doc(2_000, { rand: "bbbm", text: "root b" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([rootB, rootA]));
	await screen.findByText("root a");

	// Open thread A, accumulate a reply, and leave one send in flight.
	const rowA = screen.getByText("root a").closest("[data-key]") as HTMLElement;
	fireEvent.click(within(rowA).getByRole("button", { name: "Reply in thread" }));
	const panel = await screen.findByRole("region", { name: "Thread" });
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const body = init?.body as { collection?: string; keyPrefix?: string } | undefined;
		if (body?.collection === "replies" && body.keyPrefix === `${rootA.key}:`) {
			return http_page(
				[
					{
						...message_doc(3_000, { text: "reply on a" }),
						collection: "replies",
						key: `${rootA.key}:${inv(3_000)}:ra01`,
					},
				],
				true,
			);
		}
		return http_page([], true);
	});
	// Re-open is already done; the panel listed on open. Drive the same prefix list by toggling
	// would remount. Apply the reply through the channel replies feed instead.
	await wait_for_feeds(h);
	h.find_changes("replies")!.onUpdate(
		watch_update([
			{ ...message_doc(3_000, { text: "reply on a" }), collection: "replies", key: `${rootA.key}:${inv(3_000)}:ra01` },
		]),
	);
	await screen.findByText("reply on a");
	const replyBox = within(panel).getByRole("combobox", { name: "Reply in thread" });
	fireEvent.input(replyBox, { target: { value: "late reply" } });
	fireEvent.keyDown(replyBox, { key: "Enter" });
	await screen.findAllByText("Sending…");

	// Keep thread A mounted until the append settles. A late failure must still have its text and
	// retry button, rather than being lost under a new thread prefix.
	const selectedChannel = screen.getByRole("button", { name: "#general" });
	expect(selectedChannel.hasAttribute("disabled")).toBe(true);
	fireEvent.click(selectedChannel);
	expect(await screen.findByRole("region", { name: "Thread" })).toBe(panel);
	const rowB = screen.getByText("root b").closest("[data-key]") as HTMLElement;
	const switchThread = within(rowB).getByRole("button", { name: "Reply in thread" });
	expect(switchThread.hasAttribute("disabled")).toBe(true);
	fireEvent.click(switchThread);
	expect(await screen.findByRole("region", { name: "Thread" })).toBe(panel);
	expect(within(panel).getByText("late reply")).toBeTruthy();

	// A definite refusal, not a lost answer: unavailable would replay silently instead of failing.
	await act(async () => {
		ack.resolve(invoke_refused(500, "late reply failed"));
		await Promise.resolve();
	});
	expect(await within(panel).findByRole("button", { name: "Retry sending message" })).toBeTruthy();
	expect(within(panel).getByRole("alert").textContent).toContain("late reply failed");
	await waitFor(() => expect(switchThread.hasAttribute("disabled")).toBe(false));

	// Once the request has failed, navigation unlocks. Switching now deliberately discards A's
	// local failed row instead of losing it before the user can choose Retry.
	fireEvent.click(switchThread);
	const freshPanel = await screen.findByRole("region", { name: "Thread" });
	expect(await within(freshPanel).findByText("No replies yet")).toBeTruthy();
	expect(screen.queryByText("reply on a")).toBeNull();
	expect(screen.queryByText("late reply")).toBeNull();
});

test("a thread whose replies list is cut says so in the panel", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "root", text: "root row" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("root row");
	await wait_for_companion_lists(h);
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const body = init?.body as { collection?: string; keyPrefix?: string } | undefined;
		if (body?.collection === "replies" && body.keyPrefix === `${doc.key}:`) {
			return http_page(
				Array.from({ length: 100 }, (_, index) => ({
					...message_doc(1_000, {}),
					collection: "replies",
					key: `${doc.key}:${inv(2_000 + index)}:r${index}`,
				})),
				false,
			);
		}
		return http_page([], true);
	});
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	const panel = await screen.findByRole("region", { name: "Thread" });
	const notice = await within(panel).findByText("Only the newest 100 replies are shown.");
	expect(notice.getAttribute("role")).toBe("status");
});

test("a dead replies feed makes an exact count read unknown", async () => {
	const h = make_harness();
	await boot(h);
	const root = message_doc(1_000, { rand: "root", text: "counted root" });
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "replies") {
			return http_page([{ ...message_doc(900, {}), collection: "replies", key: `${root.key}:${inv(900)}:r0` }], true);
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));
	expect(await screen.findByRole("button", { name: /^1 reply/ })).toBeTruthy();
	await wait_for_feeds(h);
	h.find_changes("replies")!.onUpdate(null, { reason: "denied" } satisfies WatchDeathInfo);
	expect(await screen.findByRole("button", { name: "View thread" })).toBeTruthy();
	expect(screen.queryByRole("button", { name: /^1 reply/ })).toBeNull();
});

test("the thread summary is body content on a root with replies, outside the hover cluster", async () => {
	const h = make_harness();
	await boot(h);
	const root = message_doc(1_000, { rand: "root", text: "summarised root" });
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "replies") {
			return http_page(
				[
					{ ...message_doc(900, {}), collection: "replies", key: `${root.key}:${inv(900)}:r0` },
					{ ...message_doc(800, {}), collection: "replies", key: `${root.key}:${inv(800)}:r1` },
				],
				true,
			);
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([root]));

	const summary = await screen.findByRole("button", { name: /^2 replies/ });
	expect(summary.closest(".message-actions")).toBeNull();
	expect(summary.classList.contains("message-thread-summary")).toBe(true);
	expect(document.activeElement).not.toBe(summary);
	expect(row_of("summarised root").matches(":hover")).toBe(false);
});

test("an uncovered root shows no reply time and keeps its affordance in the cluster", async () => {
	const h = make_harness();
	const rootNew = message_doc(2_000, { rand: "newr", text: "new root" });
	await boot_two_roots(h, {
		replies: [{ ...message_doc(900, {}), collection: "replies", key: `${rootNew.key}:${inv(900)}:r0` }],
		repliesDone: false,
	});

	const oldRow = row_of("old root");
	expect(within(oldRow).getByRole("button", { name: "View thread" })).toBeTruthy();
	expect(within(oldRow).queryByText(/ago|Last reply/)).toBeNull();
	expect(oldRow.querySelector(".message-thread-summary")).toBeNull();
});

test("a failed thread replies list is reported and does not sit on Loading replies", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "root", text: "thread root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("thread root");
	await wait_for_companion_lists(h);
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const body = init?.body as { collection?: string; keyPrefix?: string } | undefined;
		if (body?.collection === "replies" && body.keyPrefix === `${doc.key}:`) {
			throw new Error("thread list failed");
		}
		return http_page([], true);
	});
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	await screen.findByRole("region", { name: "Thread" });
	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("thread list failed");
	expect(screen.queryByText("Loading replies…")).toBeNull();
});

test("the thread separator is a keyboard-operable splitter that respects both floors", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "root", text: "thread root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("thread root");

	// happy-dom applies no layout, so `.channel-body` reads 0 wide and the clamp maximum would
	// collapse onto its minimum in both directions. Stub the container the component measures.
	// This has to happen BEFORE the thread opens: the component measures once when the separator
	// appears and then follows a ResizeObserver, which happy-dom never fires.
	const body = document.querySelector(".channel-body")!;
	Object.defineProperty(body, "clientWidth", { configurable: true, value: 1_000 });

	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	await screen.findByRole("region", { name: "Thread" });

	const handle = screen.getByRole("separator", { name: "Resize thread panel" });
	expect(handle.getAttribute("aria-orientation")).toBe("vertical");
	expect(handle.getAttribute("aria-valuenow")).toBe("340");
	expect(handle.getAttribute("aria-valuemin")).toBe("244");

	// The panel is the right column, so moving the separator left widens it — the window-splitter
	// convention. A drag-only handle fails WCAG 2.1.1 outright.
	fireEvent.keyDown(handle, { key: "ArrowLeft" });
	await waitFor(() => expect(handle.getAttribute("aria-valuenow")).toBe("356"));
	fireEvent.keyDown(handle, { key: "ArrowRight" });
	await waitFor(() => expect(handle.getAttribute("aria-valuenow")).toBe("340"));

	// The 244px panel floor and the 420px log floor both hold, whichever way it is pushed.
	for (let press = 0; press < 40; press += 1) {
		fireEvent.keyDown(handle, { key: "ArrowRight" });
	}
	await waitFor(() => expect(handle.getAttribute("aria-valuenow")).toBe("244"));
	for (let press = 0; press < 60; press += 1) {
		fireEvent.keyDown(handle, { key: "ArrowLeft" });
	}
	await waitFor(() => expect(handle.getAttribute("aria-valuenow")).toBe(String(1_000 - 420)));

	fireEvent.keyDown(handle, { key: "Home" });
	await waitFor(() => expect(handle.getAttribute("aria-valuenow")).toBe("340"));
});

test("a narrower container moves the separator's whole range, and giving the room back restores the chosen width", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "root", text: "thread root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("thread root");

	const body = document.querySelector(".channel-body")!;
	Object.defineProperty(body, "clientWidth", { configurable: true, value: 2_000 });
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	await screen.findByRole("region", { name: "Thread" });

	const handle = screen.getByRole("separator", { name: "Resize thread panel" });
	for (let press = 0; press < 40; press += 1) {
		fireEvent.keyDown(handle, { key: "ArrowLeft" });
	}
	await waitFor(() => expect(handle.getAttribute("aria-valuenow")).toBe("980"));
	expect(handle.getAttribute("aria-valuemax")).toBe(String(2_000 - 420));

	// Shrink the window. The panel cannot keep 980px and the maximum is no longer 1580, so a
	// separator that kept announcing either number would be telling a screen reader three wrong
	// things at once — measured live at 1060px before this was fixed.
	report_container_resize(1_060);
	await waitFor(() => expect(handle.getAttribute("aria-valuenow")).toBe(String(1_060 - 420)));
	expect(handle.getAttribute("aria-valuemax")).toBe(String(1_060 - 420));
	expect(document.querySelector<HTMLElement>(".channel-body")!.style.getPropertyValue("--thread-width")).toBe(
		`${1_060 - 420}px`,
	);

	// The stored width is the member's choice, not a casualty of the resize, so the room coming
	// back brings the panel back to it without another keystroke.
	report_container_resize(2_000);
	await waitFor(() => expect(handle.getAttribute("aria-valuenow")).toBe("980"));
});

test("below 720px the thread head offers a back control, not a close control", async () => {
	const h = make_harness();
	set_viewport_narrow(true);
	await boot(h);
	const doc = message_doc(1_000, { rand: "root", text: "thread root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("thread root");
	const trigger = screen.getByRole("button", { name: "Reply in thread" });
	fireEvent.click(trigger);
	await screen.findByRole("region", { name: "Thread" });

	// The panel covers the whole frame there and the floating drawer toggle is hidden, so this is
	// the only way out — and it must give focus back to the control that opened it.
	const back = screen.getByRole("button", { name: "Back to messages" });
	expect(screen.queryByRole("button", { name: "Close thread" })).toBeNull();
	fireEvent.click(back);
	await waitFor(() => expect(screen.queryByRole("region", { name: "Thread" })).toBeNull());
	expect(document.activeElement).toBe(screen.getByRole("button", { name: "Reply in thread" }));
});

// #endregion threads

// #region load older

// Below capacity the window still has intervals to spend, so "load older" must stay reactive and
// cost no HTTP page. The HTTP door is for the state after that, not a replacement for this one.
test("below capacity Load older extends the window and issues no HTTP request", async () => {
	const h = make_harness();
	await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([message_doc(1_000, { rand: "m1", text: "live one" })], { hasMore: true }));

	await screen.findByText("live one");
	fireEvent.click(screen.getByRole("button", { name: "Load older" }));
	expect(messages.loadOlderCalls).toBe(1);
	expect(list_calls(h, "messages")).toHaveLength(0);

	// The extended window arrives as a normal update; nothing more below hides the button.
	messages.onUpdate(
		window_update([
			message_doc(1_000, { rand: "m1", text: "live one" }),
			message_doc(500, { rand: "old1", text: "the older one" }),
		]),
	);
	await screen.findByText("the older one");
	await waitFor(() => expect(screen.queryByRole("button", { name: "Load older" })).toBeNull());
});

test("at capacity the reactive Load older button hands over to the HTTP control", async () => {
	const h = make_harness();
	await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(
		window_update([message_doc(1_000, { rand: "m1", text: "live one" })], { hasMore: true, atCapacity: true }),
	);

	// The window has no interval left to spend, so its own control goes and the HTTP page takes
	// over. History is still reachable — the door never closed, the plugin had just stopped using it.
	await screen.findByText("live one");
	expect(screen.queryByRole("button", { name: "Load older" })).toBeNull();
	expect(screen.getByRole("button", { name: "Load older messages" })).toBeTruthy();
});

test("retained history survives a remote arrival: the messages window never resubscribes", async () => {
	const h = make_harness();
	const { container } = await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([message_doc(1_000, { rand: "m1", text: "live one" })], { hasMore: true }));
	await screen.findByText("live one");
	fireEvent.click(screen.getByRole("button", { name: "Load older" }));
	messages.onUpdate(
		window_update([
			message_doc(1_000, { rand: "m1", text: "live one" }),
			message_doc(500, { rand: "old1", text: "the older one" }),
		]),
	);
	await screen.findByText("the older one");
	expect(announcer_text(container)).toBe("");

	// A remote arrival makes the announcer resolve the author, which re-renders the App.
	// The window subscription and its retained history must survive that render.
	messages.onUpdate(
		window_update([
			message_doc(2_000, { rand: "m2", text: "fresh arrival" }),
			message_doc(1_000, { rand: "m1", text: "live one" }),
			message_doc(500, { rand: "old1", text: "the older one" }),
		]),
	);
	await waitFor(() => expect(announcer_text(container)).toContain("Bob: fresh arrival"));
	expect(screen.getByText("the older one")).toBeTruthy();
	const messageWindowCount = h.raw.data.watchWindow.mock.calls.filter(
		(call) => call[0].collection === "messages",
	).length;
	expect(messageWindowCount).toBe(1);
});

test("history below an invalid live-window frontier is not announced as a new message", async () => {
	const h = make_harness();
	const { container } = await boot(h);
	const invalid = {
		...message_doc(1_000, { rand: "invalid-live", text: "invalid live" }),
		value: { notAMessage: true },
	};
	const older = message_doc(500, { rand: "valid-history", text: "valid history" });
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([invalid], { hasMore: true }));

	fireEvent.click(await screen.findByRole("button", { name: "Load older" }));
	messages.onUpdate(window_update([invalid, older]));
	await screen.findByText("valid history");
	expect(announcer_text(container)).toBe("");

	const newer = message_doc(1_500, { rand: "valid-arrival", text: "valid arrival" });
	messages.onUpdate(window_update([newer, invalid, older]));
	await waitFor(() => expect(announcer_text(container)).toContain("Bob: valid arrival"));
});

test("an at-capacity arrival before the older tail does not clear its history fence", async () => {
	const h = make_harness();
	const { container } = await boot(h);
	const live = message_doc(1_000, { rand: "live", text: "live row" });
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([live], { hasMore: true }));
	await screen.findByText("live row");
	fireEvent.click(screen.getByRole("button", { name: "Load older" }));

	// A five-range window pushes its sixth tail before that tail has data. A newer delivery from an
	// existing range can therefore report atCapacity first, and that newer row must still announce.
	const newer = message_doc(1_500, { rand: "newer", text: "newer arrival" });
	messages.onUpdate(window_update([newer, live], { hasMore: true, atCapacity: true }));
	await waitFor(() => expect(announcer_text(container)).toContain("Bob: newer arrival"));
	const arrivalAnnouncement = announcer_text(container);

	const older = message_doc(500, { rand: "older", text: "older tail" });
	messages.onUpdate(window_update([newer, live, older], { hasMore: true, atCapacity: true }));
	await screen.findByText("older tail");
	await new Promise((resolve) => setTimeout(resolve, 0));
	expect(announcer_text(container)).toBe(arrivalAnnouncement);
});

/** Drives the window to capacity so the HTTP control is the only way further back. */
async function boot_at_capacity(
	h: ReturnType<typeof make_harness>,
	newest = message_doc(1_000, { rand: "m1", text: "window newest" }),
) {
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([newest], { hasMore: true, atCapacity: true }));
	await screen.findByText("window newest");
	await wait_for_companion_lists(h);
	return newest;
}

test("at capacity the control pages older history over HTTP with a fencepost and no cursor", async () => {
	const h = make_harness();
	const newest = await boot_at_capacity(h);
	const older = message_doc(500, { rand: "old1", text: "older one" });
	const oldest = message_doc(400, { rand: "old2", text: "oldest one" });
	h.raw.fetchJson.mockResolvedValueOnce(http_page([older, oldest], false));

	fireEvent.click(screen.getByRole("button", { name: "Load older messages" }));
	await screen.findByText("older one");

	// The route binds a cursor to the range it was issued for, so a page-1 cursor replayed against a
	// changed range is refused instead of being reinterpreted inside it. A fencepost carries no such
	// binding: it is the last key of the page, and the first press continues from the window's own
	// oldest key.
	const [path, init] = list_calls(h, "messages")[0]!;
	expect(path).toBe("/api/v1/plugin-data/list");
	expect(init?.body).toEqual({
		collection: "messages",
		keyPrefix: `${CH1_KEY}:`,
		keyStartExclusive: newest.key,
		limit: 100,
	});
	expect(init?.body).not.toHaveProperty("cursor");

	// Page two continues after page one's last key, and the merged store gains keys with no repeat.
	h.raw.fetchJson.mockResolvedValueOnce(http_page([message_doc(300, { rand: "old3", text: "third page one" })], false));
	fireEvent.click(screen.getByRole("button", { name: "Load older messages" }));
	await screen.findByText("third page one");
	expect(list_calls(h, "messages")[1]?.[1]?.body).toMatchObject({ keyStartExclusive: oldest.key });
	expect(screen.getAllByText("older one").length).toBe(1);
	expect(screen.getByText("window newest")).toBeTruthy();
});

test("foreign message values advance both history fences and still start the change feeds", async () => {
	const h = make_harness();
	await boot(h);
	const invalidWindowDoc = {
		...message_doc(1_000, { rand: "window-bad", text: "invalid window value" }),
		value: { notAMessage: true },
	};
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([invalidWindowDoc], { hasMore: true, atCapacity: true }),
	);
	await wait_for_companion_lists(h);
	await wait_for_feeds(h);
	expect(h.find_changes("messages")!.opts.updatedSince).toBe(1_000);
	expect(screen.queryByText("invalid window value")).toBeNull();

	const invalidPage = Array.from({ length: 100 }, (_, index) => ({
		...message_doc(900 - index, { rand: `page-bad-${index}`, text: `invalid page value ${index}` }),
		value: { notAMessage: true },
	}));
	h.raw.fetchJson.mockResolvedValueOnce(http_page(invalidPage, false));
	const control = screen.getByRole("button", { name: "Load older messages" });
	fireEvent.click(control);
	await waitFor(() => expect((control as HTMLButtonElement).disabled).toBe(false));
	expect(screen.queryByText("invalid page value 0")).toBeNull();

	h.raw.fetchJson.mockResolvedValueOnce(http_page([message_doc(500, { rand: "older-good", text: "older valid" })], true));
	fireEvent.click(control);
	await screen.findByText("older valid");
	expect(list_calls(h, "messages")[0]?.[1]?.body).toMatchObject({ keyStartExclusive: invalidWindowDoc.key });
	expect(list_calls(h, "messages")[1]?.[1]?.body).toMatchObject({
		keyStartExclusive: invalidPage.at(-1)!.key,
	});
});

test("an empty non-final history page shows Retry and keeps the same fencepost", async () => {
	const h = make_harness();
	const newest = await boot_at_capacity(h);
	h.raw.fetchJson.mockResolvedValueOnce(http_page([], false));
	const control = screen.getByRole("button", { name: "Load older messages" });
	fireEvent.click(control);
	await screen.findByText("Older messages returned an incomplete page. Please retry.");
	expect((control as HTMLButtonElement).disabled).toBe(false);

	h.raw.fetchJson.mockResolvedValueOnce(http_page([message_doc(500, { rand: "retry-good", text: "retry older" })], true));
	fireEvent.click(control);
	await screen.findByText("retry older");
	expect(list_calls(h, "messages")).toHaveLength(2);
	expect(list_calls(h, "messages")[0]?.[1]?.body).toMatchObject({ keyStartExclusive: newest.key });
	expect(list_calls(h, "messages")[1]?.[1]?.body).toMatchObject({ keyStartExclusive: newest.key });
});

test("a frozen HTTP-loaded row updates when the messages change feed delivers a newer revision", async () => {
	const h = make_harness();
	await boot_at_capacity(h);
	const older = message_doc(500, { rand: "old1", text: "older one" });
	h.raw.fetchJson.mockResolvedValueOnce(http_page([older], true));
	fireEvent.click(screen.getByRole("button", { name: "Load older messages" }));
	await screen.findByText("older one");
	await wait_for_feeds(h);
	h.find_changes("messages")!.onUpdate(
		watch_update([
			{
				...older,
				value: { ...older.value, text: "edited older", editedAt: 2_000 },
				revision: 2,
				updatedAt: older.updatedAt + 50,
			},
		]),
	);
	expect(await screen.findByText("edited older")).toBeTruthy();
	expect(screen.queryByText("older one")).toBeNull();
});

test("a feed document that fails validation is dropped and is not re-read", async () => {
	const h = make_harness();
	await boot(h);
	const live = message_doc(1_000, { rand: "m1", text: "live one" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([live]));
	await screen.findByText("live one");
	await wait_for_feeds(h);
	const invalid = {
		...message_doc(900, { rand: "bad1", text: "should not render" }),
		value: { notAMessage: true },
	};
	h.find_changes("messages")!.onUpdate(watch_update([invalid]));
	await new Promise((resolve) => setTimeout(resolve, 0));
	expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(0);
	expect(screen.queryByText("should not render")).toBeNull();
});

test("the change feeds fence at the newest loaded updatedAt", async () => {
	const h = make_harness();
	await boot(h);
	const newest = message_doc(2_000, { rand: "newr", text: "new root" });
	const older = message_doc(1_000, { rand: "oldr", text: "old root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([newest, older]));
	await screen.findByText("old root");
	await wait_for_feeds(h);
	expect(h.find_changes("messages")!.opts.updatedSince).toBe(2_000);
	expect(h.find_changes("replies")!.opts.updatedSince).toBe(2_000);
	expect(h.find_changes("reactions")!.opts.updatedSince).toBe(2_000);
});

test("a change-feed delivery advances the cursor to the newest updatedAt", async () => {
	const h = make_harness();
	await boot(h);
	const live = message_doc(1_000, { rand: "m1", text: "live one" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([live]));
	await screen.findByText("live one");
	await wait_for_feeds(h);
	const fence = h.find_changes("messages")!.opts.updatedSince;
	expect(fence).toBe(1_000);
	h.find_changes("messages")!.onUpdate(
		watch_update([
			{
				...live,
				value: { ...live.value, text: "edited live", editedAt: 1_050 },
				revision: 2,
				updatedAt: 1_050,
			},
		]),
	);
	await waitFor(() => expect(h.find_changes("messages")!.opts.updatedSince).toBe(1_050));
	expect(await screen.findByText("edited live")).toBeTruthy();
});

test("a truncated change-feed page tied to the fence millisecond advances past that millisecond", async () => {
	const h = make_harness();
	await boot(h);
	const live = message_doc(1_000, { rand: "m1", text: "live one" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([live]));
	await screen.findByText("live one");
	await wait_for_feeds(h);
	expect(h.find_changes("messages")!.opts.updatedSince).toBe(1_000);
	h.find_changes("messages")!.onUpdate(watch_update([{ ...live, revision: 2, updatedAt: 1_000 }], true));
	await waitFor(() => expect(h.find_changes("messages")!.opts.updatedSince).toBe(1_001));
});

test("a truncated messages feed HTTP-lists the frozen window range", async () => {
	const h = make_harness();
	const newest = await boot_at_capacity(h);
	await wait_for_feeds(h);
	const messageListsBefore = list_calls(h, "messages").length;
	h.find_changes("messages")!.onUpdate(
		watch_update([{ ...newest, revision: 2, updatedAt: newest.updatedAt + 50 }], true),
	);
	await waitFor(() => expect(list_calls(h, "messages").length).toBe(messageListsBefore + 1));
	expect(list_calls(h, "messages").at(-1)?.[1]?.body).toEqual({
		collection: "messages",
		keyPrefix: `${CH1_KEY}:`,
		keyStartExclusive: newest.key,
		limit: 100,
	});
});

test("a page in flight disables the control, and rows below a healthy reactions frontier stay neutral", async () => {
	const h = make_harness();
	await boot(h);
	const newest = message_doc(1_000, { rand: "m1", text: "window newest" });
	const pendingMessagesPage = deferred<unknown>();
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			return http_page([reaction_doc(newest.key, "heart", "user_other")], false);
		}
		if (collection === "messages") {
			return pendingMessagesPage.promise;
		}
		return http_page([], true);
	});
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([newest], { hasMore: true, atCapacity: true }));
	await screen.findByText("window newest");
	await wait_for_companion_lists(h);

	const control = screen.getByRole("button", { name: "Load older messages" });
	const messageCallsBefore = list_calls(h, "messages").length;
	fireEvent.click(control);

	await waitFor(() => expect((control as HTMLButtonElement).disabled).toBe(true));
	expect(screen.getAllByRole("status").some((element) => element.textContent === "Loading older messages…")).toBe(true);
	fireEvent.click(control);
	expect(list_calls(h, "messages")).toHaveLength(messageCallsBefore + 1);

	pendingMessagesPage.resolve(http_page([message_doc(500, { rand: "old1", text: "fetched row" })], false));
	await screen.findByText("fetched row");
	expect(within(row_of("fetched row")).queryByText("Reactions unavailable")).toBeNull();
});

test("isDone replaces the control with static text and a further interaction issues no request", async () => {
	const h = make_harness();
	await boot_at_capacity(h);
	h.raw.fetchJson.mockResolvedValueOnce(
		http_page(
			Array.from({ length: 100 }, (_, index) => message_doc(500 - index, { rand: `o${index}` })),
			true,
		),
	);

	fireEvent.click(screen.getByRole("button", { name: "Load older messages" }));
	await screen.findByText("You have reached the start of #general.");
	expect(screen.queryByRole("button", { name: "Load older messages" })).toBeNull();

	fireEvent.click(screen.getByText("You have reached the start of #general."));
	expect(list_calls(h, "messages")).toHaveLength(1);
});

test("a 429 names a wait, retries nothing by itself, and returns to idle when the wait passes", async () => {
	const h = make_harness();
	await boot_at_capacity(h);
	h.raw.fetchJson.mockRejectedValueOnce(
		Object.assign(new Error("429"), {
			status: 429,
			responseText: JSON.stringify({ message: "Slow down", retryAfterMs: 30 }),
		}),
	);

	fireEvent.click(screen.getByRole("button", { name: "Load older messages" }));
	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("too quickly");
	expect((screen.getByRole("button", { name: "Load older messages" }) as HTMLButtonElement).disabled).toBe(true);
	expect(list_calls(h, "messages")).toHaveLength(1);

	// The bucket refills at two tokens a second, so the throttle clears on its own. Staying dead
	// for the life of the frame is the failure mode the wait exists to prevent — and the control
	// must not re-request while it waits, because every request spends another token.
	await waitFor(() =>
		expect((screen.getByRole("button", { name: "Load older messages" }) as HTMLButtonElement).disabled).toBe(false),
	);
	expect(list_calls(h, "messages")).toHaveLength(1);
});

test("a non-429 failure reads differently and hands the control straight back", async () => {
	const h = make_harness();
	await boot_at_capacity(h);
	h.raw.fetchJson.mockRejectedValueOnce(
		Object.assign(new Error("/api/v1/plugin-data/list responded 403: forbidden"), {
			status: 403,
			responseText: "forbidden",
		}),
	);

	// fetchJson throws on every non-ok response, so a 400, a 403 after a permission change and a
	// 500 all reach here — branching only on 429 leaves them as unhandled rejections.
	fireEvent.click(screen.getByRole("button", { name: "Load older messages" }));
	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("403");
	expect(alert.textContent).not.toContain("too quickly");
	await waitFor(() =>
		expect((screen.getByRole("button", { name: "Load older messages" }) as HTMLButtonElement).disabled).toBe(false),
	);
});

test("an HTTP page does not drag the companion lists into paging history", async () => {
	const h = make_harness();
	const newest = await boot_at_capacity(h);
	const reactionCalls = list_calls(h, "reactions").length;
	const replyCalls = list_calls(h, "replies").length;

	h.raw.fetchJson.mockResolvedValueOnce(http_page([message_doc(500, { rand: "old1", text: "deep row" })], false));
	fireEvent.click(screen.getByRole("button", { name: "Load older messages" }));
	await screen.findByText("deep row");

	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([newest], { hasMore: true, atCapacity: true }));
	await waitFor(() => expect(screen.getByText("deep row")).toBeTruthy());
	expect(list_calls(h, "reactions")).toHaveLength(reactionCalls);
	expect(list_calls(h, "replies")).toHaveLength(replyCalls);
});

// #endregion load older

// #region companion catch-up

test("the catch-up loop lists another companion page after every delivery", async () => {
	const h = make_harness();
	await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	const rootNew = message_doc(2_000, { rand: "newr", text: "new root" });
	const rootOld = message_doc(1_000, { rand: "oldr", text: "old root" });
	const rootOldest = message_doc(500, { rand: "olds", text: "oldest root" });
	let reactionPages = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			reactionPages += 1;
			if (reactionPages === 1) {
				return http_page([reaction_doc(rootNew.key, "heart", "user_other")], false);
			}
			if (reactionPages === 2) {
				return http_page([reaction_doc(rootOld.key, "party", "user_other")], false);
			}
			return http_page([reaction_doc(rootOldest.key, "wow", "user_other")], true);
		}
		return http_page([], true);
	});
	messages.onUpdate(window_update([rootNew, rootOld]));
	await screen.findByText("old root");
	await waitFor(() => expect(list_calls(h, "reactions").length).toBe(2));

	const reactionCallsAfterCatchUp = list_calls(h, "reactions").length;
	expect(list_calls(h, "replies").length).toBe(1);

	messages.onUpdate(window_update([rootNew, rootOld, rootOldest]));
	await screen.findByText("oldest root");
	await waitFor(() => expect(list_calls(h, "reactions").length).toBe(reactionCallsAfterCatchUp + 1));
	expect(list_calls(h, "replies").length).toBe(1);
});

test("private same-millisecond roots do not collapse at the companion frontier", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	fireEvent.click(within(nav).getByRole("button", { name: /^#secret-plans/ }));
	const messages = await waitFor(() => {
		const found = h.find_window("messages", `${PRIVATE_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	const rootNew = message_doc(1_000, {
		channelKey: PRIVATE_KEY,
		rand: "aa00",
		text: "same-time new root",
	});
	const rootOld = message_doc(1_000, {
		channelKey: PRIVATE_KEY,
		rand: "aaff",
		text: "same-time old root",
	});
	const firstReaction = reaction_doc(rootNew.key, "heart", "user_other");
	const firstReply = {
		...message_doc(1_100, { channelKey: PRIVATE_KEY, rand: "r001", text: "first reply" }),
		collection: "replies",
		key: `${rootNew.key}:${inv(1_100)}:r001`,
	};
	const secondReply = {
		...message_doc(1_200, { channelKey: PRIVATE_KEY, rand: "r002", text: "second reply" }),
		collection: "replies",
		key: `${rootOld.key}:${inv(1_200)}:r002`,
	};
	let reactionPages = 0;
	let replyPages = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			reactionPages += 1;
			return reactionPages === 1
				? http_page([firstReaction], false)
				: http_page([reaction_doc(rootOld.key, "party", "user_other")], true);
		}
		if (collection === "replies") {
			replyPages += 1;
			return replyPages === 1 ? http_page([firstReply], false) : http_page([secondReply], true);
		}
		return http_page([], true);
	});

	messages.onUpdate(window_update([rootNew, rootOld]));
	const oldRow = (await screen.findByText("same-time old root")).closest("[data-key]") as HTMLElement;
	await waitFor(() => {
		expect(list_calls(h, "reactions")).toHaveLength(2);
		expect(list_calls(h, "replies")).toHaveLength(2);
	});

	const reactionCalls = list_calls(h, "reactions");
	const replyCalls = list_calls(h, "replies");
	expect(reactionCalls[1]?.[1]?.body).toMatchObject({ keyStartExclusive: firstReaction.key });
	expect(replyCalls[1]?.[1]?.body).toMatchObject({ keyStartExclusive: firstReply.key });
	expect(within(oldRow).getByRole("button", { name: "Party, 1 reaction" })).toBeTruthy();
	expect(within(oldRow).getByRole("button", { name: /^1 reply/ })).toBeTruthy();
});

test("invalid full companion pages advance from their raw envelope keys", async () => {
	const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
	try {
		const h = make_harness();
		await boot(h);
		const messages = h.find_window("messages", `${CH1_KEY}:`)!;
		const rootNew = message_doc(2_000, { rand: "newr", text: "new root before invalid companions" });
		const rootOld = message_doc(1_000, { rand: "oldr", text: "old root after invalid companions" });
		const invalidReactions = Array.from({ length: 100 }, (_, index) => ({
			...reaction_doc(rootNew.key, "heart", `user_bad_${index}`, `bad_${String(index).padStart(3, "0")}`),
			value: { removed: false },
		}));
		const invalidReplies = Array.from({ length: 100 }, (_, index) => ({
			...message_doc(3_000 + index, { rand: `b${String(index).padStart(3, "0")}` }),
			collection: "replies",
			key: `${rootNew.key}:${inv(3_000 + index)}:b${String(index).padStart(3, "0")}`,
			value: { text: "missing required fields" },
		})).sort((a, b) => a.key.localeCompare(b.key));
		const oldReply = {
			...message_doc(1_100, { rand: "r001", text: "older valid reply" }),
			collection: "replies",
			key: `${rootOld.key}:${inv(1_100)}:r001`,
		};
		let reactionPages = 0;
		let replyPages = 0;
		h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
			if (path !== "/api/v1/plugin-data/list") {
				throw new Error("fetchJson not stubbed");
			}
			const collection = (init?.body as { collection?: string } | undefined)?.collection;
			if (collection === "reactions") {
				reactionPages += 1;
				return reactionPages === 1
					? http_page(invalidReactions, false)
					: http_page([reaction_doc(rootOld.key, "party", "user_other")], true);
			}
			if (collection === "replies") {
				replyPages += 1;
				return replyPages === 1 ? http_page(invalidReplies, false) : http_page([oldReply], true);
			}
			return http_page([], true);
		});

		messages.onUpdate(window_update([rootNew, rootOld]));
		const oldRow = (await screen.findByText("old root after invalid companions")).closest("[data-key]") as HTMLElement;
		await waitFor(() => {
			expect(list_calls(h, "reactions")).toHaveLength(2);
			expect(list_calls(h, "replies")).toHaveLength(2);
		});

		expect(list_calls(h, "reactions")[1]?.[1]?.body).toMatchObject({
			keyStartExclusive: invalidReactions.at(-1)!.key,
		});
		expect(list_calls(h, "replies")[1]?.[1]?.body).toMatchObject({
			keyStartExclusive: invalidReplies.at(-1)!.key,
		});
		expect(within(oldRow).getByRole("button", { name: "Party, 1 reaction" })).toBeTruthy();
		expect(within(oldRow).getByRole("button", { name: /^1 reply/ })).toBeTruthy();
	} finally {
		warn.mockRestore();
	}
});

// #endregion companion catch-up

// #region attachments

test("one click resolves the whole message in a single request; a per-file error renders inline", async () => {
	const h = make_harness();
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/list") {
			return http_page([], true);
		}
		if (path === "/api/v1/files/download-urls") {
			return {
				items: [{ fileNodeId: "n1", url: "https://signed.example/n1", expiresAt: Date.now() + 600_000 }],
				errors: [{ fileNodeId: "n2", message: "Permission denied" }],
				truncated: false,
			};
		}
		throw new Error("fetchJson not stubbed");
	});
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([
			message_doc(1_000, {
				rand: "m1",
				text: "with files",
				attachments: [
					{ fileNodeId: "n1", name: "spec.pdf" },
					{ fileNodeId: "n2", name: "secret.txt" },
				],
			}),
			message_doc(900, { rand: "m2", text: "other files", attachments: [{ fileNodeId: "n9", name: "untouched.pdf" }] }),
		]),
	);

	await screen.findByText("with files");
	fireEvent.click(screen.getByRole("button", { name: "spec.pdf" }));
	const link = await screen.findByRole("link", { name: "spec.pdf" });
	expect(link.getAttribute("href")).toBe("https://signed.example/n1");
	const downloadCalls = file_calls(h, "/api/v1/files/download-urls");
	expect(downloadCalls).toHaveLength(1);
	expect(downloadCalls[0]?.[1]?.body).toEqual({ fileNodeIds: ["n1", "n2"] });

	expect(screen.getByRole("button", { name: "untouched.pdf" })).toBeTruthy();

	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("Permission denied");
});

test("a message with 21 attachments issues a second request carrying the 21st id", async () => {
	const h = make_harness();
	const attachments = Array.from({ length: 21 }, (_, index) => ({
		fileNodeId: `n${index + 1}`,
		name: `file-${index + 1}.pdf`,
	}));
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path === "/api/v1/plugin-data/list") {
			return http_page([], true);
		}
		if (path === "/api/v1/files/download-urls") {
			const ids = ((init?.body as { fileNodeIds?: string[] } | undefined)?.fileNodeIds ?? []) as string[];
			return {
				items: ids.map((fileNodeId) => ({ fileNodeId, url: `https://s/${fileNodeId}`, expiresAt: 1 })),
				errors: [],
				truncated: false,
			};
		}
		throw new Error("fetchJson not stubbed");
	});
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([message_doc(1_000, { rand: "m1", text: "many files", attachments })]),
	);

	await screen.findByText("many files");
	fireEvent.click(screen.getByRole("button", { name: "file-1.pdf" }));
	await screen.findByRole("link", { name: "file-21.pdf" });

	const downloadCalls = file_calls(h, "/api/v1/files/download-urls");
	expect(downloadCalls).toHaveLength(2);
	expect(downloadCalls[0]?.[1]?.body).toEqual({ fileNodeIds: attachments.slice(0, 20).map((a) => a.fileNodeId) });
	expect(downloadCalls[1]?.[1]?.body).toEqual({ fileNodeIds: ["n21"] });
});

test("the picker lists workspace files and a picked file rides the next send", async () => {
	const h = make_harness();
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/list") {
			return http_page([], true);
		}
		if (path === "/api/v1/files/list") {
			return {
				items: [
					{
						path: "/docs/spec.pdf",
						name: "spec.pdf",
						kind: "file",
						nodeId: "n1",
						contentType: "application/pdf",
						updatedAt: 1,
					},
				],
				cursor: null,
				isDone: true,
			};
		}
		throw new Error("fetchJson not stubbed");
	});
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	fireEvent.click(await screen.findByRole("button", { name: "Attach file" }));
	const dialog = await screen.findByRole("dialog");
	const fileListCalls = file_calls(h, "/api/v1/files/list");
	expect(fileListCalls).toHaveLength(1);
	const listBody = fileListCalls[0]?.[1]?.body;
	expect(listBody?.kind).toBe("file");
	expect(listBody?.contentTypePrefixes).toContain("image/");

	fireEvent.click(await within(dialog).findByRole("button", { name: /spec\.pdf/ }));
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

	const input = screen.getByRole("combobox", { name: "Message #general" });
	fireEvent.input(input, { target: { value: "see attached" } });
	fireEvent.keyDown(input, { key: "Enter" });
	await waitFor(() => expect(invoke_calls(h, "message-send")).toHaveLength(1));
	expect(invoke_calls(h, "message-send")[0]!.input.attachments).toEqual([{ fileNodeId: "n1", name: "spec.pdf" }]);
});

// #endregion attachments

// #region private channels

// Private channel keys carry the `p/` prefix the scope is created over.
const PRIVATE_KEY = "p/44444444-4444-4444-8444-444444444444";
const PRIVATE_DM_KEY = "p/55555555-5555-4555-8555-555555555555";

/**
 * Renders the app and delivers one channels window, without waiting on a particular channel's log.
 *
 * A private channel goes through its own scope read, because that is the only way it can arrive: a
 * read with no key range answers only the public part of a collection, so a scoped document never
 * comes back on the public watch. `privateKeys` are the ranges this member is in.
 */
async function boot_sidebar(
	h: ReturnType<typeof make_harness>,
	channels: unknown[],
	privateKeys: string[] = [],
	strict = false,
) {
	const publicChannels = channels.filter((doc) => !privateKeys.some((key) => (doc as { key: string }).key === key));
	return await without_open_reconcile(
		h,
		async () => {
			const app = <App client={h.client} />;
			const utils = render(strict ? <StrictMode>{app}</StrictMode> : app);
			h.find_watch("channels")!.onUpdate(watch_update(publicChannels));
			await deliver_scopes(h, channels, privateKeys);
			await waitFor(() => expect(screen.getByRole("navigation", { name: "Channels" })).toBeTruthy());
			return utils;
		},
		channels.length > 0,
	);
}

/** Hands the page the scope list, then answers each scope's own channels read. */
async function deliver_scopes(h: ReturnType<typeof make_harness>, channels: unknown[], privateKeys: string[]) {
	h.send_scopes(
		privateKeys.map((key) => ({
			scopeId: key,
			keyPrefix: key,
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage" as const,
		})),
	);
	for (const key of privateKeys) {
		const watch = await waitFor(() => {
			const found = h.find_watch("channels", key);
			expect(found).toBeTruthy();
			return found!;
		});
		watch.onUpdate(watch_update(channels.filter((doc) => (doc as { key: string }).key === key)));
	}
}

/** Opens a Threads row whose root is outside the selected channel's loaded message window. */
async function open_missing_general_thread_from_threads(h: ReturnType<typeof make_harness>) {
	const nav = screen.getByRole("navigation", { name: "Channels" });
	fireEvent.click(within(nav).getByRole("button", { name: "Threads" }));
	const repliesFeed = await waitFor(() => {
		const found = h.find_recent("replies");
		expect(found).toBeTruthy();
		return found!;
	});
	const rootKey = `${CH1_KEY}:${inv(3000)}:missing`;
	repliesFeed.onUpdate(
		watch_update([
			{
				collection: "replies",
				key: `${rootKey}:${inv(3600)}:reply`,
				value: { text: "reply to unloaded root", attachments: [], editedAt: null, deletedAt: null },
				revision: 1,
				createdBy: "user_other",
				updatedBy: "user_other",
				ownership: "owned",
				createdAt: 3600,
				updatedAt: 3600,
			},
		]),
	);
	const view = await screen.findByRole("region", { name: "Threads" });
	fireEvent.click(await waitFor(() => within(view).getByRole("button", { name: /^#general/ })));
	await waitFor(() =>
		expect(
			within(nav)
				.getByRole("button", { name: /^#general/ })
				.getAttribute("aria-current"),
		).toBe("page"),
	);
	expect(screen.queryByRole("region", { name: "Thread" })).toBeNull();
	const app = document.querySelector(".chitchat")!;
	expect(app.className).toBe("chitchat");
	expect(app.querySelector(".thread")).toBeNull();
	expect(app.querySelector(".app-bar > .drawer-toggle")).toBe(screen.getByRole("button", { name: "Channels" }));
}

test("a private channel the member is not in leaves nothing behind — no row, no name, no placeholder", async () => {
	const h = make_harness();
	// This is what a member outside the scope really receives. Every read door hides a scope's
	// documents from somebody it does not name, so the private channel's document never arrives.
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general")]);

	const nav = screen.getByRole("navigation", { name: "Channels" });
	expect(within(nav).getByText("#general")).toBeTruthy();
	expect(nav.querySelectorAll(".channel-item")).toHaveLength(1);
	expect(nav.textContent).not.toContain("secret-plans");
	expect(nav.textContent).not.toContain(PRIVATE_KEY);
	// A placeholder IS discovery: a greyed-out or locked row tells the member a channel exists that
	// they may not read, which is the one thing the scope is for.
	expect(nav.textContent).not.toMatch(/locked|hidden|private|no access|restricted/i);
});

test("a public p/ channel doc is dropped instead of being shown as private", async () => {
	const h = make_harness();
	await boot_sidebar(h, [
		channel_doc(CH1_KEY, "general"),
		channel_doc(PRIVATE_KEY, "forged-secret"),
		channel_doc("p/not-a-uuid", "forged-malformed"),
	]);

	const nav = screen.getByRole("navigation", { name: "Channels" });
	expect(within(nav).getByText("#general")).toBeTruthy();
	expect(nav.textContent).not.toContain("forged-secret");
	expect(nav.textContent).not.toContain("forged-malformed");
	expect(nav.textContent).not.toContain("(private)");
});

test("private watches accept only the exact Chitchat scope and channel root", async () => {
	const h = make_harness();
	render(<App client={h.client} />);
	h.find_watch("channels")!.onUpdate(watch_update([channel_doc(CH1_KEY, "general")]));
	h.send_scopes([
		{
			scopeId: "p/not-a-uuid",
			keyPrefix: "p/not-a-uuid",
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage",
		},
		{
			scopeId: PRIVATE_KEY,
			keyPrefix: PRIVATE_DM_KEY,
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage",
		},
		{
			scopeId: PRIVATE_DM_KEY,
			keyPrefix: PRIVATE_DM_KEY,
			collections: ["channels", "messages", "replies"],
			level: "manage",
		},
		{
			scopeId: "p/cccccccc-cccc-4ccc-8ccc-cccccccccccc",
			keyPrefix: "p/cccccccc-cccc-4ccc-8ccc-cccccccccccc",
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS, "files"],
			level: "manage",
		},
		{
			scopeId: "p/dddddddd-dddd-4ddd-8ddd-dddddddddddd",
			keyPrefix: "p/dddddddd-dddd-4ddd-8ddd-dddddddddddd",
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage",
			appendActivity: [{ collection: "messages", at: -1, createdByUserId: "user_other" }],
		},
		{
			scopeId: "p/eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee",
			keyPrefix: "p/eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee",
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage",
			appendActivity: [{ collection: "messages", at: 1, createdByUserId: "user_other", sequence: -1 }],
		},
	]);

	expect(h.find_watch("channels", "p/not-a-uuid")).toBeUndefined();
	expect(h.find_watch("channels", PRIVATE_KEY)).toBeUndefined();
	expect(h.find_watch("channels", PRIVATE_DM_KEY)).toBeUndefined();
	expect(h.find_watch("channels", "p/cccccccc-cccc-4ccc-8ccc-cccccccccccc")).toBeUndefined();
	expect(h.find_watch("channels", "p/dddddddd-dddd-4ddd-8ddd-dddddddddddd")).toBeUndefined();
	expect(h.find_watch("channels", "p/eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee")).toBeUndefined();

	h.send_scopes([
		{
			scopeId: PRIVATE_KEY,
			keyPrefix: PRIVATE_KEY,
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage",
		},
	]);
	const privateWatch = await waitFor(() => {
		const found = h.find_watch("channels", PRIVATE_KEY);
		expect(found).toBeTruthy();
		return found!;
	});
	privateWatch.onUpdate(
		watch_update([channel_doc(`${PRIVATE_KEY}:child`, "forged-child"), channel_doc(PRIVATE_KEY, "secret-plans")]),
	);

	const nav = screen.getByRole("navigation", { name: "Channels" });
	await waitFor(() => expect(within(nav).getByText("#secret-plans (private)")).toBeTruthy());
	expect(nav.textContent).not.toContain("forged-child");
});

test("the same channel shows normally for a member who is in it", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);

	const nav = screen.getByRole("navigation", { name: "Channels" });
	expect(nav.querySelectorAll(".channel-item")).toHaveLength(2);
	expect(within(nav).getByText("#secret-plans (private)")).toBeTruthy();
	// The row itself only carries the menu trigger; the action lives in the floating menu it opens.
	expect(within(nav).getByRole("button", { name: "Actions for #secret-plans" })).toBeTruthy();
	expect(await open_channel_menu_item("secret-plans", "People in #secret-plans")).toBeTruthy();
});

test("a private channel leaves when the full scope list says the member was taken out", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	// Nothing is read from the private range until the scope list names it. The public watch answers
	// only the public part of the collection, so with no scope there is no second read at all.
	expect(h.find_watch("channels", PRIVATE_KEY)).toBeUndefined();

	await deliver_scopes(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	// It appears in the same list as the public channel, sorted by name, with no reload.
	await waitFor(() => expect(within(nav).getByText("#secret-plans (private)")).toBeTruthy());
	// Scoped to the channel lists: the view rows above them reuse `.channel-name` for the rail.
	expect([...nav.querySelectorAll(".channel-list .channel-name")].map((name) => name.textContent)).toEqual([
		"#general",
		"#secret-plans (private)",
	]);

	// A dead ranged read is not proof of departure. The full scope list is still live and still
	// names this channel, so keep the row until that list changes.
	h.find_watch("channels", PRIVATE_KEY)!.onUpdate(null, { reason: "unavailable", message: "x" });
	expect(within(nav).getByText("#secret-plans (private)")).toBeTruthy();

	// The full membership list is the departure signal. The ranged read may die for other reasons,
	// and the SDK drops a late death after its subscription was already released.
	h.send_scopes([]);
	await waitFor(() => expect(nav.textContent).not.toContain("secret-plans"));
	// And the public channel is untouched: one scope ending is not the page losing access.
	expect(within(nav).getByText("#general")).toBeTruthy();
});

test("an unavailable private channel read restarts and applies its fresh channel and cursor", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const firstWatch = h.find_watch("channels", PRIVATE_KEY)!;
	firstWatch.onUpdate(watch_update([channel_doc(PRIVATE_KEY, "secret-plans"), private_cursor_doc(PRIVATE_KEY, 5000)]));
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const cached = await waitFor(() => within(nav).getByRole("button", { name: "#secret-plans (private)" }));

	vi.useFakeTimers();
	try {
		firstWatch.onUpdate(null, { reason: "unavailable", message: "Connection lost" });
		expect(firstWatch.unsubscribed).toBe(true);
		expect(cached.isConnected).toBe(true);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(249);
		});
		expect(h.find_watch("channels", PRIVATE_KEY)).toBeUndefined();
		await act(async () => {
			await vi.advanceTimersByTimeAsync(1);
		});
		const restarted = h.find_watch("channels", PRIVATE_KEY);
		expect(restarted).toBeTruthy();
		expect(restarted).not.toBe(firstWatch);

		await act(async () => {
			restarted!.onUpdate(
				watch_update([
					{ ...channel_doc(PRIVATE_KEY, "renamed"), revision: 2 },
					private_cursor_doc(PRIVATE_KEY, 8000, 2),
				]),
			);
			await Promise.resolve();
		});
		const renamed = within(nav).getByRole("button", { name: "#renamed (private)" });
		expect(renamed.classList.contains("is-unread")).toBe(false);
	} finally {
		vi.useRealTimers();
	}
});

test("a denied private channel read restarts when watchMine coalesces a fast remove and re-add", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const firstWatch = h.find_watch("channels", PRIVATE_KEY)!;
	firstWatch.onUpdate(watch_update([channel_doc(PRIVATE_KEY, "secret-plans"), private_cursor_doc(PRIVATE_KEY, 5000)]));
	const nav = screen.getByRole("navigation", { name: "Channels" });
	await waitFor(() => expect(within(nav).getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy());

	vi.useFakeTimers();
	try {
		// The ranged query sees the short removal, but the full list sees only the final re-add.
		firstWatch.onUpdate(null, { reason: "denied", message: "Access changed" });
		h.send_scopes([{ ...private_scope(), membershipRevision: 2 }]);
		expect(firstWatch.unsubscribed).toBe(true);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(250);
		});
		const activePrivateWatches = h.watches.filter(
			(sub) => !sub.unsubscribed && sub.opts.collection === "channels" && sub.opts.keyPrefix === PRIVATE_KEY,
		);
		expect(activePrivateWatches).toHaveLength(1);
		expect(
			h.watches.filter((sub) => sub.opts.collection === "channels" && sub.opts.keyPrefix === PRIVATE_KEY),
		).toHaveLength(2);

		await act(async () => {
			activePrivateWatches[0]!.onUpdate(
				watch_update([
					{ ...channel_doc(PRIVATE_KEY, "renamed"), revision: 2 },
					private_cursor_doc(PRIVATE_KEY, 8000, 2),
				]),
			);
			await Promise.resolve();
		});
		expect(within(nav).getByRole("button", { name: "#renamed (private)" })).toBeTruthy();
	} finally {
		vi.useRealTimers();
	}
});

test("an open private channel restarts its reads in place after a fast remove and re-add", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const rangedWatch = h.find_watch("channels", PRIVATE_KEY)!;
	const rangedWatchCount = h.watches.length;
	const firstWindow = await waitFor(() => {
		const found = h.find_window("messages", `${PRIVATE_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	const root = message_doc(1_000, { channelKey: PRIVATE_KEY, rand: "root", text: "cached root" });
	firstWindow.onUpdate(window_update([root]));
	await wait_for_feeds(h, PRIVATE_KEY);
	const firstFeeds = ["messages", "replies", "reactions"].map((collection) => h.find_changes(collection, PRIVATE_KEY)!);
	const textarea = composer_box("Message #secret-plans");
	type_in_composer(textarea, "keep this draft");
	textarea.focus();

	// The scoped reads see the short removal. Keep the mounted view and its draft until the full
	// scope list delivers the re-added membership generation.
	firstWindow.onUpdate(null, { reason: "denied" } satisfies WatchDeathInfo);
	for (const feed of firstFeeds) {
		feed.onUpdate(null, { reason: "denied" } satisfies WatchDeathInfo);
	}
	expect(textarea.isConnected).toBe(true);
	expect(textarea.value).toBe("keep this draft");
	expect(document.activeElement).toBe(textarea);

	h.send_scopes([{ ...private_scope(), membershipRevision: 2 }]);
	const replacementWindow = await waitFor(() => {
		const active = h.windows.filter(
			(sub) => !sub.unsubscribed && sub.opts.collection === "messages" && sub.opts.keyPrefix === `${PRIVATE_KEY}:`,
		);
		expect(active).toHaveLength(1);
		expect(h.windows.filter((sub) => sub.opts.keyPrefix === `${PRIVATE_KEY}:`)).toHaveLength(2);
		return active[0]!;
	});
	expect(replacementWindow).not.toBe(firstWindow);
	expect(screen.getByText("cached root")).toBeTruthy();
	expect(textarea.isConnected).toBe(true);
	expect(textarea.value).toBe("keep this draft");
	expect(document.activeElement).toBe(textarea);
	expect(h.find_watch("channels", PRIVATE_KEY)).toBe(rangedWatch);
	expect(h.watches).toHaveLength(rangedWatchCount);
	await waitFor(() =>
		expect(h.changes.filter((sub) => !sub.unsubscribed && sub.opts.scopeId === PRIVATE_KEY)).toHaveLength(0),
	);

	replacementWindow.onUpdate(window_update([root]));
	await waitFor(() => {
		const active = h.changes.filter((sub) => !sub.unsubscribed && sub.opts.scopeId === PRIVATE_KEY);
		expect(active).toHaveLength(3);
		expect(h.changes.filter((sub) => sub.opts.scopeId === PRIVATE_KEY)).toHaveLength(6);
	});
	const replacementMessages = h.find_changes("messages", PRIVATE_KEY)!;
	const replacementReplies = h.find_changes("replies", PRIVATE_KEY)!;
	const replacementReactions = h.find_changes("reactions", PRIVATE_KEY)!;
	const editedRoot = {
		...root,
		value: { ...root.value, text: "fresh root", editedAt: 2_000 },
		revision: 2,
		updatedAt: 2_000,
	};
	const reply = {
		...message_doc(3_000, { channelKey: PRIVATE_KEY, rand: "r001", text: "fresh reply" }),
		collection: "replies",
		key: `${root.key}:${inv(3_000)}:r001`,
	};
	replacementMessages.onUpdate(watch_update([editedRoot]));
	replacementReplies.onUpdate(watch_update([reply]));
	replacementReactions.onUpdate(watch_update([{ ...reaction_doc(root.key, "heart", "user_other"), updatedAt: 3_000 }]));

	expect(await screen.findByText("fresh root")).toBeTruthy();
	expect(await screen.findByRole("button", { name: /^1 reply/ })).toBeTruthy();
	expect(await screen.findByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
	await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
	expect(textarea.isConnected).toBe(true);
	expect(textarea.value).toBe("keep this draft");
	expect(document.activeElement).toBe(textarea);
});

test("a private read generation scans companion gaps from the beginning", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const root = message_doc(1_000, { channelKey: PRIVATE_KEY, rand: "root", text: "cached root" });
	const newerRoot = message_doc(3_000, { channelKey: PRIVATE_KEY, rand: "newr", text: "new root" });
	const oldReply = {
		...message_doc(1_500, { channelKey: PRIVATE_KEY, rand: "r001", text: "old reply" }),
		collection: "replies",
		key: `${root.key}:${inv(1_500)}:r001`,
	};
	const gapReply = {
		...message_doc(2_000, { channelKey: PRIVATE_KEY, rand: "r002", text: "gap reply" }),
		collection: "replies",
		key: `${root.key}:${inv(2_000)}:r002`,
	};
	const oldReaction = { ...reaction_doc(root.key, "party", "user_other"), createdAt: 1_500, updatedAt: 1_500 };
	const gapReaction = { ...reaction_doc(root.key, "heart", "user_third"), createdAt: 2_000, updatedAt: 2_000 };
	let reactionLists = 0;
	let replyLists = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			reactionLists += 1;
			return http_page(reactionLists === 1 ? [oldReaction] : [gapReaction, oldReaction], true);
		}
		if (collection === "replies") {
			replyLists += 1;
			return http_page(replyLists === 1 ? [oldReply] : [gapReply, oldReply], true);
		}
		return http_page([], true);
	});

	h.find_window("messages", `${PRIVATE_KEY}:`)!.onUpdate(window_update([root]));
	expect(await screen.findByRole("button", { name: "Party, 1 reaction" })).toBeTruthy();
	expect(await screen.findByRole("button", { name: /^1 reply/ })).toBeTruthy();
	expect(list_calls(h, "reactions")).toHaveLength(1);
	expect(list_calls(h, "replies")).toHaveLength(1);

	// The gap companion rows are older than the new root's feed fence. Only a fresh HTTP scan
	// from the channel prefix can recover them after access returns.
	h.send_scopes([{ ...private_scope(), membershipRevision: 2 }]);
	const replacementWindow = await waitFor(() => {
		const active = h.windows.filter(
			(sub) => !sub.unsubscribed && sub.opts.collection === "messages" && sub.opts.keyPrefix === `${PRIVATE_KEY}:`,
		);
		expect(active).toHaveLength(1);
		expect(h.windows.filter((sub) => sub.opts.keyPrefix === `${PRIVATE_KEY}:`)).toHaveLength(2);
		return active[0]!;
	});
	replacementWindow.onUpdate(window_update([newerRoot, root]));

	expect(await screen.findByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
	expect(await screen.findByRole("button", { name: /^2 replies/ })).toBeTruthy();
	expect(list_calls(h, "reactions")).toHaveLength(2);
	expect(list_calls(h, "replies")).toHaveLength(2);
	for (const collection of ["reactions", "replies"] as const) {
		const secondBody = list_calls(h, collection)[1]![1]?.body as { keyStartExclusive?: string };
		expect(secondBody.keyStartExclusive).toBeUndefined();
		const feed = h.find_changes(collection, PRIVATE_KEY)!;
		expect(feed.opts.updatedSince).toBe(3_000);
		expect(feed.opts.updatedSince).toBeGreaterThan(gapReaction.updatedAt);
	}
});

test("a pending reactions refresh keeps cached groups without an unavailable warning", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const root = message_doc(1_000, { channelKey: PRIVATE_KEY, rand: "root", text: "cached reactions" });
	const heart = { ...reaction_doc(root.key, "heart", "user_other"), updatedAt: 1_000 };
	const party = { ...reaction_doc(root.key, "party", "user_third"), updatedAt: 2_000 };
	const refreshedReactions = deferred<unknown>();
	let reactionLists = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			reactionLists += 1;
			return reactionLists === 1 ? http_page([heart], true) : refreshedReactions.promise;
		}
		return http_page([], true);
	});
	h.find_window("messages", `${PRIVATE_KEY}:`)!.onUpdate(window_update([root]));
	expect(await screen.findByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();

	h.send_scopes([{ ...private_scope(), membershipRevision: 2 }]);
	const replacementWindow = await waitFor(() => {
		const active = h.windows.filter(
			(sub) => !sub.unsubscribed && sub.opts.collection === "messages" && sub.opts.keyPrefix === `${PRIVATE_KEY}:`,
		);
		expect(active).toHaveLength(1);
		expect(h.windows.filter((sub) => sub.opts.keyPrefix === `${PRIVATE_KEY}:`)).toHaveLength(2);
		return active[0]!;
	});
	replacementWindow.onUpdate(window_update([root]));
	await waitFor(() => expect(list_calls(h, "reactions")).toHaveLength(2));
	const row = row_of("cached reactions");
	expect(within(row).getByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
	expect(within(row).queryByText("Reactions unavailable")).toBeNull();

	await act(async () => {
		refreshedReactions.resolve(http_page([party, heart], true));
		await Promise.resolve();
	});
	expect(await within(row).findByRole("button", { name: "Party, 1 reaction" })).toBeTruthy();
	expect(within(row).queryByText("Reactions unavailable")).toBeNull();
});

test("late companion results from an old private read generation are ignored", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const root = message_doc(1_000, { channelKey: PRIVATE_KEY, rand: "root", text: "cached root" });
	const oldReactions = deferred<unknown>();
	const oldReplies = deferred<unknown>();
	const currentReactions = deferred<unknown>();
	const currentReplies = deferred<unknown>();
	let reactionLists = 0;
	let replyLists = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const collection = (init?.body as { collection?: string } | undefined)?.collection;
		if (collection === "reactions") {
			reactionLists += 1;
			return reactionLists === 1 ? oldReactions.promise : currentReactions.promise;
		}
		if (collection === "replies") {
			replyLists += 1;
			return replyLists === 1 ? oldReplies.promise : currentReplies.promise;
		}
		return http_page([], true);
	});

	h.find_window("messages", `${PRIVATE_KEY}:`)!.onUpdate(window_update([root]));
	await waitFor(() => {
		expect(list_calls(h, "reactions")).toHaveLength(1);
		expect(list_calls(h, "replies")).toHaveLength(1);
	});
	h.send_scopes([{ ...private_scope(), membershipRevision: 2 }]);
	const replacementWindow = await waitFor(() => {
		const active = h.windows.filter(
			(sub) => !sub.unsubscribed && sub.opts.collection === "messages" && sub.opts.keyPrefix === `${PRIVATE_KEY}:`,
		);
		expect(active).toHaveLength(1);
		expect(h.windows.filter((sub) => sub.opts.keyPrefix === `${PRIVATE_KEY}:`)).toHaveLength(2);
		return active[0]!;
	});
	replacementWindow.onUpdate(window_update([root]));
	await waitFor(() => {
		expect(list_calls(h, "reactions")).toHaveLength(2);
		expect(list_calls(h, "replies")).toHaveLength(2);
	});

	const currentReaction = { ...reaction_doc(root.key, "heart", "user_other"), updatedAt: 2_000 };
	const currentReply = {
		...message_doc(2_000, { channelKey: PRIVATE_KEY, rand: "r002", text: "current reply" }),
		collection: "replies",
		key: `${root.key}:${inv(2_000)}:r002`,
	};
	await act(async () => {
		currentReactions.resolve(http_page([currentReaction], true));
		currentReplies.resolve(http_page([currentReply], true));
		await Promise.resolve();
	});
	expect(await screen.findByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
	expect(await screen.findByRole("button", { name: /^1 reply/ })).toBeTruthy();

	vi.useFakeTimers();
	try {
		await act(async () => {
			oldReactions.resolve(http_page([{ ...reaction_doc(root.key, "party", "user_third"), updatedAt: 1_500 }], false));
			oldReplies.reject(new Error("old reply list failed"));
			await Promise.resolve();
			await Promise.resolve();
			await vi.advanceTimersByTimeAsync(60_000);
		});
		expect(screen.queryByRole("button", { name: "Party, 1 reaction" })).toBeNull();
		expect(screen.getByRole("button", { name: "Heart, 1 reaction" })).toBeTruthy();
		expect(screen.getByRole("button", { name: /^1 reply/ })).toBeTruthy();
		expect(screen.queryByText("Some reactions and replies in this range could not be loaded.")).toBeNull();
		expect(list_calls(h, "reactions")).toHaveLength(2);
		expect(list_calls(h, "replies")).toHaveLength(2);
	} finally {
		vi.useRealTimers();
	}
});

test("an open private thread refreshes its exact reply list in place for a new read generation", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const root = message_doc(1_000, { channelKey: PRIVATE_KEY, rand: "root", text: "thread root" });
	const oldExact = deferred<unknown>();
	const currentExact = deferred<unknown>();
	let exactLists = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const body = init?.body as { collection?: string; keyPrefix?: string } | undefined;
		if (body?.collection === "replies" && body.keyPrefix === `${root.key}:`) {
			exactLists += 1;
			return exactLists === 1 ? oldExact.promise : currentExact.promise;
		}
		return http_page([], true);
	});
	h.find_window("messages", `${PRIVATE_KEY}:`)!.onUpdate(window_update([root]));
	await screen.findByText("thread root");

	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	const panel = await screen.findByRole("region", { name: "Thread" });
	await waitFor(() => expect(exactLists).toBe(1));
	const replyBox = within(panel).getByRole("combobox", { name: "Reply in thread" }) as HTMLTextAreaElement;
	type_in_composer(replyBox, "keep this reply draft");
	replyBox.focus();

	h.send_scopes([{ ...private_scope(), membershipRevision: 2 }]);
	await waitFor(() => expect(exactLists).toBe(2));
	expect(screen.getByRole("region", { name: "Thread" })).toBe(panel);
	expect(within(panel).getByRole("combobox", { name: "Reply in thread" })).toBe(replyBox);
	expect(replyBox.value).toBe("keep this reply draft");
	expect(document.activeElement).toBe(replyBox);

	await act(async () => {
		oldExact.reject(new Error("stale exact list failed"));
		await Promise.resolve();
	});
	expect(within(panel).queryByText("stale exact list failed")).toBeNull();
	expect(within(panel).getByText("Loading replies…")).toBeTruthy();

	const freshReply = {
		...message_doc(2_000, { channelKey: PRIVATE_KEY, rand: "r002", text: "fresh exact reply" }),
		collection: "replies",
		key: `${root.key}:${inv(2_000)}:r002`,
	};
	await act(async () => {
		currentExact.resolve(http_page([freshReply], true));
		await Promise.resolve();
	});
	expect(await within(panel).findByText("fresh exact reply")).toBeTruthy();
	expect(within(panel).queryByText("Loading replies…")).toBeNull();
	expect(within(panel).queryByRole("alert")).toBeNull();
	expect(replyBox.hasAttribute("disabled")).toBe(false);
	expect(replyBox.value).toBe("keep this reply draft");
	expect(document.activeElement).toBe(replyBox);
});

test("a private thread keeps cached replies and focus while its exact list refreshes", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const root = message_doc(1_000, { channelKey: PRIVATE_KEY, rand: "root", text: "thread root" });
	const cachedReply = {
		...message_doc(2_000, { channelKey: PRIVATE_KEY, rand: "r002", text: "cached exact reply" }),
		collection: "replies",
		key: `${root.key}:${inv(2_000)}:r002`,
	};
	const refreshedExact = deferred<unknown>();
	let exactLists = 0;
	h.raw.fetchJson.mockImplementation(async (path: string, init?: FetchInit) => {
		if (path !== "/api/v1/plugin-data/list") {
			throw new Error("fetchJson not stubbed");
		}
		const body = init?.body as { collection?: string; keyPrefix?: string } | undefined;
		if (body?.collection === "replies" && body.keyPrefix === `${root.key}:`) {
			exactLists += 1;
			return exactLists === 1 ? http_page([cachedReply], true) : refreshedExact.promise;
		}
		return http_page([], true);
	});
	h.find_window("messages", `${PRIVATE_KEY}:`)!.onUpdate(window_update([root]));
	await screen.findByText("thread root");

	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	const panel = await screen.findByRole("region", { name: "Thread" });
	const replyRow = row_of("cached exact reply");
	const reactionButton = within(replyRow).getByRole("button", { name: "Add reaction" });
	reactionButton.focus();
	expect(document.activeElement).toBe(reactionButton);

	h.send_scopes([{ ...private_scope(), membershipRevision: 2 }]);
	await waitFor(() => expect(exactLists).toBe(2));
	expect(within(panel).getByText("Loading replies…")).toBeTruthy();
	expect(row_of("cached exact reply")).toBe(replyRow);
	expect(within(replyRow).getByRole("button", { name: "Add reaction" })).toBe(reactionButton);
	expect(document.activeElement).toBe(reactionButton);

	await act(async () => {
		refreshedExact.resolve(http_page([cachedReply], true));
		await Promise.resolve();
	});
	await waitFor(() => expect(within(panel).queryByText("Loading replies…")).toBeNull());
	expect(row_of("cached exact reply")).toBe(replyRow);
	expect(document.activeElement).toBe(reactionButton);
});

test("a private channel read restarts when the full scope list recovers after its retry", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const firstWatch = h.find_watch("channels", PRIVATE_KEY)!;
	firstWatch.onUpdate(watch_update([channel_doc(PRIVATE_KEY, "secret-plans"), private_cursor_doc(PRIVATE_KEY, 5000)]));
	const nav = screen.getByRole("navigation", { name: "Channels" });
	await waitFor(() => expect(within(nav).getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy());

	vi.useFakeTimers();
	try {
		// The ranged retry is queued first. It fires while the full scope list is still dead.
		firstWatch.onUpdate(null, { reason: "unavailable", message: "Connection lost" });
		h.send_scope_death("unavailable");
		await act(async () => {
			await vi.advanceTimersByTimeAsync(250);
		});
		expect(h.find_watch("channels", PRIVATE_KEY)).toBeUndefined();
		expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(2);

		await act(async () => {
			h.send_scopes([private_scope()]);
			await Promise.resolve();
		});
		const activePrivateWatches = h.watches.filter(
			(sub) => !sub.unsubscribed && sub.opts.collection === "channels" && sub.opts.keyPrefix === PRIVATE_KEY,
		);
		expect(activePrivateWatches).toHaveLength(1);
		const restarted = activePrivateWatches[0]!;
		expect(restarted).not.toBe(firstWatch);
		expect(
			h.watches.filter((sub) => sub.opts.collection === "channels" && sub.opts.keyPrefix === PRIVATE_KEY),
		).toHaveLength(2);

		await act(async () => {
			restarted.onUpdate(
				watch_update([
					{ ...channel_doc(PRIVATE_KEY, "renamed"), revision: 2 },
					private_cursor_doc(PRIVATE_KEY, 8000, 2),
				]),
			);
			await Promise.resolve();
		});
		const renamed = within(nav).getByRole("button", { name: "#renamed (private)" });
		expect(renamed.classList.contains("is-unread")).toBe(false);
	} finally {
		vi.useRealTimers();
	}
});

test("a two-person direct message renders through the same component and store path as a bigger private channel", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_DM_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
		{ userId: "user_third", level: "member" },
	]);
	// "bob" sorts first, so the DM is the selected channel.
	await boot_sidebar(
		h,
		[channel_doc(PRIVATE_DM_KEY, "bob"), channel_doc(PRIVATE_KEY, "secret-plans")],
		[PRIVATE_DM_KEY, PRIVATE_KEY],
	);

	const nav = screen.getByRole("navigation", { name: "Channels" });
	const rows = [...nav.querySelectorAll(".channel-item")];
	// Two people or three, the row is built by the same code. There is no DM branch to take.
	const skeleton = (row: Element) => [...row.querySelectorAll("*")].map((node) => node.className).join(" ");
	expect(skeleton(rows[0])).toBe(skeleton(rows[1]));

	// And the same store path: the same three collections, each keyed off the channel's own key.
	await waitFor(() => expect(h.find_window("messages", `${PRIVATE_DM_KEY}:`)).toBeTruthy());
	h.find_window("messages", `${PRIVATE_DM_KEY}:`)!.onUpdate(
		window_update([message_doc(1_000, { channelKey: PRIVATE_DM_KEY, rand: "dm1", text: "hi" })]),
	);
	await wait_for_feeds(h, PRIVATE_DM_KEY);
	expect(h.find_changes("messages", PRIVATE_DM_KEY)?.opts.scopeId).toBe(PRIVATE_DM_KEY);
	expect(h.find_changes("replies", PRIVATE_DM_KEY)?.opts.scopeId).toBe(PRIVATE_DM_KEY);
	expect(h.find_changes("reactions", PRIVATE_DM_KEY)?.opts.scopeId).toBe(PRIVATE_DM_KEY);
	expect(h.find_window("reactions", `${PRIVATE_DM_KEY}:`)).toBeUndefined();
	expect(h.find_window("replies", `${PRIVATE_DM_KEY}:`)).toBeUndefined();

	fireEvent.click(screen.getByRole("button", { name: "#secret-plans (private)" }));
	await waitFor(() => expect(h.find_window("messages", `${PRIVATE_KEY}:`)).toBeTruthy());
	h.find_window("messages", `${PRIVATE_KEY}:`)!.onUpdate(
		window_update([message_doc(1_000, { channelKey: PRIVATE_KEY, rand: "p1", text: "secret" })]),
	);
	await wait_for_feeds(h, PRIVATE_KEY);
	expect(h.find_changes("messages", PRIVATE_KEY)?.opts.scopeId).toBe(PRIVATE_KEY);
	expect(h.find_window("reactions", `${PRIVATE_KEY}:`)).toBeUndefined();
	expect(h.find_window("replies", `${PRIVATE_KEY}:`)).toBeUndefined();
});

test("a private channel names the organization owner as a reader, and a public one says nothing of the sort", async () => {
	const h = make_harness();
	// "general" sorts before "secret-plans", so the public channel opens first.
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	await waitFor(() => expect(h.find_window("messages", `${CH1_KEY}:`)).toBeTruthy());
	expect(document.querySelector(".channel-privacy")).toBeNull();

	fireEvent.click(screen.getByRole("button", { name: "#secret-plans (private)" }));
	const privacy = await waitFor(() => {
		const node = document.querySelector(".channel-privacy");
		expect(node).toBeTruthy();
		return node!;
	});
	// Saying "private" and stopping there would be a disclosure: the organization owner passes every
	// permission check before any grant is read.
	expect(privacy.textContent).toContain("organization owner");
});

test("creating a private channel sends its whole setup through one atomic scope call", async () => {
	const h = make_harness();
	await boot(h);
	const before = h.calls.length;

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "secret-plans" } });
	fireEvent.click(within(dialog).getByLabelText("Private channel"));
	// One person ticked is a direct message. There is no separate control for one.
	fireEvent.click(await within(dialog).findByLabelText("Bob"));
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));

	await waitFor(() => expect(h.calls.length).toBe(before + 1));
	const made = h.calls.slice(before);
	expect(made.map((call) => call.op)).toEqual(["scopes.createWithDocument"]);
	expect(made[0].args.collections).toEqual(["channels", "messages", "replies", "reactions"]);
	expect(made[0].args.keyPrefix).toBe(made[0].args.scopeId);
	expect(String(made[0].args.keyPrefix)).toMatch(/^p\//);
	expect(made[0].args.principals).toEqual([{ userId: "user_other", level: "member" }]);
	expect(made[0].args.document).toEqual({
		collection: "channels",
		key: made[0].args.scopeId,
		value: { name: "secret-plans", archivedAt: null },
	});
	expect(h.raw.scopes.create).not.toHaveBeenCalled();
	expect(h.raw.scopes.setPrincipal).not.toHaveBeenCalled();
	expect(h.raw.data.put).not.toHaveBeenCalled();
});

test("a definite private-create refusal leaves the dialog open and unlocks its fields", async () => {
	const h = make_harness();
	h.raw.scopes.createWithDocument.mockResolvedValueOnce({
		_nay: { name: "storage_full", message: "No document slots remain" },
	});
	await boot(h);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "secret-plans" } });
	fireEvent.click(within(dialog).getByLabelText("Private channel"));
	fireEvent.click(await within(dialog).findByLabelText("Bob"));
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));

	expect((await within(dialog).findByRole("alert")).textContent).toContain("No document slots remain");
	expect(h.raw.scopes.createWithDocument).toHaveBeenCalledTimes(1);
	expect((within(dialog).getByLabelText("Channel name") as HTMLInputElement).disabled).toBe(false);
	expect((within(dialog).getByLabelText("Topic (optional)") as HTMLInputElement).disabled).toBe(false);
	expect((within(dialog).getByLabelText("Private channel") as HTMLInputElement).disabled).toBe(false);
	expect((within(dialog).getByLabelText("Bob") as HTMLInputElement).disabled).toBe(false);
	expect(within(dialog).getByRole("button", { name: "Create" })).toBeTruthy();
	expect(h.raw.scopes.create).not.toHaveBeenCalled();
	expect(h.raw.scopes.setPrincipal).not.toHaveBeenCalled();
	expect(h.raw.scopes.delete).not.toHaveBeenCalled();
	expect(h.raw.data.put).not.toHaveBeenCalled();
});

test("a private exact retry conflict accepts a renamed exact read only after current principal proof", async () => {
	const h = make_harness();
	const pendingCreate = deferred<ScopeChangeResult>();
	const exactRead = deferred<unknown>();
	const exactPrincipals = deferred<BonoboUiScopePrincipalListResult>();
	h.raw.scopes.createWithDocument
		.mockReturnValueOnce(pendingCreate.promise)
		.mockResolvedValueOnce({ _nay: { name: "conflict", message: "This scope changed" } });
	h.raw.scopes.listPrincipals.mockReturnValueOnce(exactPrincipals.promise);
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return exactRead.promise;
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	await boot(h);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	const name = within(dialog).getByLabelText("Channel name") as HTMLInputElement;
	const topic = within(dialog).getByLabelText("Topic (optional)") as HTMLInputElement;
	const privacy = within(dialog).getByLabelText("Private channel") as HTMLInputElement;
	fireEvent.input(name, { target: { value: "secret-plans" } });
	fireEvent.input(topic, { target: { value: "Launch planning" } });
	fireEvent.click(privacy);
	const bob = (await within(dialog).findByLabelText("Bob")) as HTMLInputElement;
	fireEvent.click(bob);
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	await waitFor(() => expect(within(dialog).getByRole("button", { name: "Saving…" })).toBeTruthy());

	expect(name.disabled).toBe(true);
	expect(topic.disabled).toBe(true);
	expect(privacy.disabled).toBe(true);
	expect(bob.disabled).toBe(true);
	fireEvent.keyDown(name, { key: "x" });
	fireEvent.keyDown(topic, { key: "x" });
	privacy.click();
	expect(name.value).toBe("secret-plans");
	expect(topic.value).toBe("Launch planning");
	expect(privacy.checked).toBe(true);

	pendingCreate.reject(new Error("Connection lost"));
	expect((await within(dialog).findByRole("alert")).textContent).toContain("Connection lost");
	expect(name.disabled).toBe(true);
	expect(topic.disabled).toBe(true);
	expect(privacy.disabled).toBe(true);
	expect(bob.disabled).toBe(true);
	expect((within(dialog).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(false);
	const first = h.raw.scopes.createWithDocument.mock.calls[0]![0];
	fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));
	await waitFor(() => expect(h.raw.scopes.createWithDocument).toHaveBeenCalledTimes(2));

	const retry = h.raw.scopes.createWithDocument.mock.calls[1]![0];
	expect(retry).toEqual(first);
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1));
	expect(file_calls(h, "/api/v1/plugin-data/read")[0]![1]?.body).toEqual({
		collection: "channels",
		key: first.scopeId,
	});
	expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(1);
	expect(screen.getByRole("dialog")).toBe(dialog);
	expect(name.disabled).toBe(true);
	expect((within(dialog).getByRole("button", { name: "Checking…" }) as HTMLButtonElement).disabled).toBe(true);
	expect((within(dialog).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(false);

	// A restarted Convex watch would replay this cached absence first. It is not proof.
	h.send_scopes([]);
	expect(screen.getByRole("dialog")).toBe(dialog);
	exactRead.resolve({ document: { ...channel_doc(first.scopeId, "renamed"), revision: 2 } });
	await waitFor(() => expect(h.raw.scopes.listPrincipals).toHaveBeenCalledWith({ scopeId: first.scopeId }));
	expect(screen.getByRole("dialog")).toBe(dialog);
	exactPrincipals.resolve({ _yay: [{ userId: "user_me", level: "manage" }] });
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

	// The exact read selected the original key. The normal scope and ranged watches can catch up later.
	h.send_scopes([private_scope([], first.scopeId)]);
	const privateWatch = await waitFor(() => {
		const found = h.find_watch("channels", first.scopeId);
		expect(found).toBeTruthy();
		return found!;
	});
	privateWatch.onUpdate(watch_update([{ ...channel_doc(first.scopeId, "renamed"), revision: 2 }]));
	const row = await screen.findByRole("button", { name: "#renamed (private)" });
	expect(row.getAttribute("aria-current")).toBe("page");
});

test("a null private create proof keeps the same key uncertain and locked", async () => {
	const h = make_harness();
	const exactRead = deferred<unknown>();
	h.raw.scopes.createWithDocument
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _nay: { name: "conflict", message: "This scope changed" } })
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost again" } });
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return exactRead.promise;
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	await boot(h);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	const name = within(dialog).getByLabelText("Channel name") as HTMLInputElement;
	fireEvent.input(name, { target: { value: "secret-plans" } });
	fireEvent.click(within(dialog).getByLabelText("Private channel"));
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	await within(dialog).findByText("Connection lost");
	fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));
	await waitFor(() => expect(h.raw.scopes.createWithDocument).toHaveBeenCalledTimes(2));
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1));
	expect((within(dialog).getByLabelText("Channel name") as HTMLInputElement).disabled).toBe(true);

	const first = h.raw.scopes.createWithDocument.mock.calls[0]![0];
	// Cached presence is also not proof that the original create still exists now.
	h.send_scopes([private_scope([], first.scopeId)]);
	expect(within(dialog).getByRole("button", { name: "Checking…" })).toBeTruthy();
	exactRead.resolve({ document: null });
	await waitFor(() => expect(within(dialog).getByRole("alert").textContent).toContain("cannot confirm whether"));
	expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(1);
	expect(h.raw.scopes.listPrincipals).not.toHaveBeenCalled();
	expect(name.disabled).toBe(true);
	expect((within(dialog).getByLabelText("Private channel") as HTMLInputElement).disabled).toBe(true);
	expect((within(dialog).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(false);
	vi.useFakeTimers();
	try {
		await act(async () => {
			await vi.advanceTimersByTimeAsync(10_000);
		});
		expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1);
		expect(h.raw.scopes.createWithDocument).toHaveBeenCalledTimes(2);
	} finally {
		vi.useRealTimers();
	}
	fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));

	await waitFor(() => expect(h.raw.scopes.createWithDocument).toHaveBeenCalledTimes(3));
	expect(h.raw.scopes.createWithDocument.mock.calls[2]![0]).toEqual(first);
	expect((await within(dialog).findByRole("alert")).textContent).toContain("Connection lost again");
	expect(name.disabled).toBe(true);
	expect(screen.getByRole("dialog")).toBe(dialog);
});

test("an owner-readable private channel with an exact-null principal list keeps the same create key locked", async () => {
	const h = make_harness();
	h.raw.scopes.createWithDocument
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _nay: { name: "conflict", message: "This scope changed" } })
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost again" } });
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			const first = h.raw.scopes.createWithDocument.mock.calls[0]![0];
			return { document: { ...channel_doc(first.scopeId, "renamed"), revision: 2 } };
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	h.raw.scopes.listPrincipals.mockResolvedValueOnce({ _yay: null });
	await boot(h);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	const name = within(dialog).getByLabelText("Channel name") as HTMLInputElement;
	fireEvent.input(name, { target: { value: "secret-plans" } });
	fireEvent.click(within(dialog).getByLabelText("Private channel"));
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	await within(dialog).findByText("Connection lost");
	const first = h.raw.scopes.createWithDocument.mock.calls[0]![0];
	fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));

	await waitFor(() =>
		expect(within(dialog).getByRole("alert").textContent).toContain("not in its current access list"),
	);
	expect(h.raw.scopes.listPrincipals).toHaveBeenCalledWith({ scopeId: first.scopeId });
	expect(name.disabled).toBe(true);
	expect((within(dialog).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(false);
	vi.useFakeTimers();
	try {
		await act(async () => {
			await vi.advanceTimersByTimeAsync(10_000);
		});
		expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1);
		expect(h.raw.scopes.listPrincipals).toHaveBeenCalledTimes(1);
	} finally {
		vi.useRealTimers();
	}
	fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));
	await waitFor(() => expect(h.raw.scopes.createWithDocument).toHaveBeenCalledTimes(3));
	expect(h.raw.scopes.createWithDocument.mock.calls[2]![0]).toEqual(first);
	expect(screen.getByRole("dialog")).toBe(dialog);
});

test("private create exact-read failures retry with exponential backoff capped at four seconds", async () => {
	const h = make_harness();
	let readAttempts = 0;
	h.raw.scopes.listPrincipals.mockResolvedValue({ _yay: [{ userId: "user_me", level: "manage" }] });
	h.raw.scopes.createWithDocument
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _nay: { name: "conflict", message: "This scope changed" } });
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			readAttempts += 1;
			if (readAttempts === 1 || readAttempts === 4 || readAttempts === 6) {
				throw new Error("Connection lost");
			}
			if (readAttempts === 2 || readAttempts === 5) {
				return {};
			}
			if (readAttempts === 3) {
				return { document: channel_doc(CH1_KEY, "wrong channel") };
			}
			const first = h.raw.scopes.createWithDocument.mock.calls[0]![0];
			return { document: { ...channel_doc(first.scopeId, "renamed"), revision: 2 } };
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	await boot(h);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "secret-plans" } });
	fireEvent.click(within(dialog).getByLabelText("Private channel"));
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	await within(dialog).findByText("Connection lost");

	vi.useFakeTimers();
	try {
		await act(async () => {
			fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(readAttempts).toBe(1);
		expect((within(dialog).getByLabelText("Channel name") as HTMLInputElement).disabled).toBe(true);

		for (const [index, delayMs] of [250, 500, 1000, 2000, 4000, 4000].entries()) {
			await act(async () => {
				await vi.advanceTimersByTimeAsync(delayMs - 1);
			});
			expect(readAttempts).toBe(index + 1);
			await act(async () => {
				await vi.advanceTimersByTimeAsync(1);
			});
		}
		expect(readAttempts).toBe(7);
		expect(screen.queryByRole("dialog")).toBeNull();
	} finally {
		vi.useRealTimers();
	}
});

test("private create unavailable and malformed principal reads retry until an exact list includes this member", async () => {
	const h = make_harness();
	h.raw.scopes.createWithDocument
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _nay: { name: "conflict", message: "This scope changed" } });
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			const first = h.raw.scopes.createWithDocument.mock.calls[0]![0];
			return { document: { ...channel_doc(first.scopeId, "renamed"), revision: 2 } };
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	h.raw.scopes.listPrincipals
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _yay: "not a principal list" } as unknown as BonoboUiScopePrincipalListResult)
		.mockResolvedValueOnce({ _yay: [{ userId: "user_me", level: "manage" }] });
	await boot(h);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "secret-plans" } });
	fireEvent.click(within(dialog).getByLabelText("Private channel"));
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	await within(dialog).findByText("Connection lost");

	vi.useFakeTimers();
	try {
		await act(async () => {
			fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));
			await Promise.resolve();
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(h.raw.scopes.listPrincipals).toHaveBeenCalledTimes(1);
		expect(screen.getByRole("dialog")).toBe(dialog);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(250);
		});
		expect(h.raw.scopes.listPrincipals).toHaveBeenCalledTimes(2);
		expect(screen.getByRole("dialog")).toBe(dialog);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(500);
		});
		expect(h.raw.scopes.listPrincipals).toHaveBeenCalledTimes(3);
		expect(screen.queryByRole("dialog")).toBeNull();
	} finally {
		vi.useRealTimers();
	}
});

test("cancelling private create reconciliation clears its retry timer", async () => {
	const h = make_harness();
	h.raw.scopes.createWithDocument
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _nay: { name: "conflict", message: "This scope changed" } });
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return {};
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	await boot(h);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "secret-plans" } });
	fireEvent.click(within(dialog).getByLabelText("Private channel"));
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	await within(dialog).findByText("Connection lost");

	vi.useFakeTimers();
	try {
		await act(async () => {
			fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1);
		fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
		await act(async () => {
			await vi.advanceTimersByTimeAsync(10_000);
		});
		expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1);
	} finally {
		vi.useRealTimers();
	}
});

test("a late private create exact read cannot settle a new dialog after Cancel", async () => {
	const h = make_harness();
	const exactRead = deferred<unknown>();
	h.raw.scopes.createWithDocument
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _nay: { name: "conflict", message: "This scope changed" } });
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return exactRead.promise;
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	await boot(h);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	let dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "secret-plans" } });
	fireEvent.click(within(dialog).getByLabelText("Private channel"));
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	await within(dialog).findByText("Connection lost");
	fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1));
	const first = h.raw.scopes.createWithDocument.mock.calls[0]![0];
	fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	dialog = await screen.findByRole("dialog");
	exactRead.resolve({ document: { ...channel_doc(first.scopeId, "renamed"), revision: 2 } });
	await act(async () => {
		await Promise.resolve();
		await Promise.resolve();
	});
	expect(screen.getByRole("dialog")).toBe(dialog);
	expect((within(dialog).getByLabelText("Channel name") as HTMLInputElement).disabled).toBe(false);
});

test("the people dialog shows who is in a private channel and can take somebody out again", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);

	fireEvent.click(await open_channel_menu_item("secret-plans", "People in #secret-plans"));
	const dialog = await screen.findByRole("dialog");
	// The list comes from the server, not from what this page remembers writing — after a reload
	// the page knows nothing, and a colleague with `manage` may have changed it since.
	const current = await waitFor(() => {
		const list = dialog.querySelector(".current-people");
		expect(list?.textContent).toContain("Bob");
		return list!;
	});
	expect(current.textContent).toContain("Me (can add people)");
	expect(within(dialog).getByText(/organization owner/)).toBeTruthy();

	fireEvent.click(within(dialog).getByRole("button", { name: "Remove" }));
	// The shrink path. Without it a private channel would be append-only: you could add a colleague
	// and would have no door to take it back.
	await waitFor(() => expect(dialog.querySelector(".current-people")?.textContent).not.toContain("Bob"));
	expect(h.calls.some((call) => call.op === "scopes.removePrincipal" && call.args.userId === "user_other")).toBe(true);
});

test("an unavailable add reloads and shows a committed member before ending the busy state", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [{ userId: "user_me", level: "manage" }]);
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);

	fireEvent.click(await open_channel_menu_item("secret-plans", "People in #secret-plans"));
	const dialog = await screen.findByRole("dialog");
	const bob = await within(dialog).findByLabelText("Bob");
	const reload = deferred<BonoboUiScopePrincipalListResult>();
	h.raw.scopes.setPrincipal.mockResolvedValueOnce({
		_nay: { name: "unavailable", message: "Connection lost after send" },
	});
	h.raw.scopes.listPrincipals.mockReturnValueOnce(reload.promise);

	fireEvent.click(bob);
	await waitFor(() => expect(h.raw.scopes.listPrincipals).toHaveBeenCalledTimes(2));
	expect((within(dialog).getByRole("button", { name: "Close" }) as HTMLButtonElement).disabled).toBe(true);
	reload.resolve({
		_yay: [
			{ userId: "user_me", level: "manage" },
			{ userId: "user_other", level: "member" },
		],
	});

	await waitFor(() => expect(dialog.querySelector(".current-people")?.textContent).toContain("Bob"));
	expect((await within(dialog).findByRole("alert")).textContent).toBe(
		"We could not confirm the change. The current people list is shown.",
	);
	await waitFor(() =>
		expect((within(dialog).getByRole("button", { name: "Close" }) as HTMLButtonElement).disabled).toBe(false),
	);
});

test("an unavailable remove reloads and hides a committed removal before ending the busy state", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);

	fireEvent.click(await open_channel_menu_item("secret-plans", "People in #secret-plans"));
	const dialog = await screen.findByRole("dialog");
	const remove = await within(dialog).findByRole("button", { name: "Remove" });
	const reload = deferred<BonoboUiScopePrincipalListResult>();
	h.raw.scopes.removePrincipal.mockResolvedValueOnce({
		_nay: { name: "unavailable", message: "Connection lost after send" },
	});
	h.raw.scopes.listPrincipals.mockReturnValueOnce(reload.promise);

	fireEvent.click(remove);
	await waitFor(() => expect(h.raw.scopes.listPrincipals).toHaveBeenCalledTimes(2));
	expect((within(dialog).getByRole("button", { name: "Close" }) as HTMLButtonElement).disabled).toBe(true);
	reload.resolve({ _yay: [{ userId: "user_me", level: "manage" }] });

	await waitFor(() => expect(dialog.querySelector(".current-people")?.textContent).not.toContain("Bob"));
	expect((await within(dialog).findByRole("alert")).textContent).toBe(
		"We could not confirm the change. The current people list is shown.",
	);
	await waitFor(() =>
		expect((within(dialog).getByRole("button", { name: "Close" }) as HTMLButtonElement).disabled).toBe(false),
	);
});

test("an unavailable people read shows Retry and does not look like exact lost access", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [{ userId: "user_me", level: "manage" }]);
	h.raw.scopes.listPrincipals.mockResolvedValueOnce({
		_nay: { name: "unavailable", message: "Failed to read who can access this" },
	});
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);

	fireEvent.click(await open_channel_menu_item("secret-plans", "People in #secret-plans"));
	const dialog = await screen.findByRole("dialog");
	expect((await within(dialog).findByRole("alert")).textContent).toBe("Failed to read who can access this");
	expect(within(dialog).queryByText(/no longer readable/)).toBeNull();

	const retry = within(dialog).getByRole("button", { name: "Retry" });
	expect(document.activeElement).toBe(within(dialog).getByRole("button", { name: "Close" }));
	fireEvent.click(retry);
	await waitFor(() => expect(dialog.querySelector(".current-people")?.textContent).toContain("Me"));
	expect(h.raw.scopes.listPrincipals).toHaveBeenCalledTimes(2);
});

test("an exact-null people read shows the no-longer-readable state without Retry", async () => {
	const h = make_harness();
	h.raw.scopes.listPrincipals.mockResolvedValueOnce({ _yay: null });
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);

	fireEvent.click(await open_channel_menu_item("secret-plans", "People in #secret-plans"));
	const dialog = await screen.findByRole("dialog");
	expect((await within(dialog).findByRole("alert")).textContent).toContain("no longer readable");
	expect(within(dialog).queryByRole("button", { name: "Retry" })).toBeNull();
	expect(document.activeElement).toBe(within(dialog).getByRole("button", { name: "Close" }));
});

test("a definite people refusal keeps the current list and does not reload", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [{ userId: "user_me", level: "manage" }]);
	h.raw.scopes.setPrincipal.mockResolvedValueOnce({ _nay: { name: "denied", message: "Not allowed" } });
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);

	fireEvent.click(await open_channel_menu_item("secret-plans", "People in #secret-plans"));
	const dialog = await screen.findByRole("dialog");
	fireEvent.click(await within(dialog).findByLabelText("Bob"));

	expect((await within(dialog).findByRole("alert")).textContent).toBe("Not allowed");
	expect(h.raw.scopes.listPrincipals).toHaveBeenCalledTimes(1);
	expect(dialog.querySelector(".current-people")?.textContent).not.toContain("Bob");
});

test("Escape cannot dismiss the people dialog while a membership change is pending", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const pendingRemove = deferred<ScopeChangeResult>();
	h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingRemove.promise);
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);

	fireEvent.click(await open_channel_menu_item("secret-plans", "People in #secret-plans"));
	const dialog = await screen.findByRole("dialog");
	fireEvent.click(await within(dialog).findByRole("button", { name: "Remove" }));
	await waitFor(() =>
		expect(within(dialog).getByRole("button", { name: "Close" }).hasAttribute("disabled")).toBe(true),
	);

	fireEvent.keyDown(dialog, { key: "Escape" });
	expect(screen.getByRole("dialog")).toBe(dialog);
	pendingRemove.resolve({ _yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 } });
	await waitFor(() =>
		expect(within(dialog).getByRole("button", { name: "Close" }).hasAttribute("disabled")).toBe(false),
	);
});

test("a pending people change blocks a second picker change and keeps Escape locked", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [{ userId: "user_me", level: "manage" }]);
	const pendingAdd = deferred<ScopeChangeResult>();
	h.raw.scopes.setPrincipal.mockReturnValueOnce(pendingAdd.promise);
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);

	fireEvent.click(await open_channel_menu_item("secret-plans", "People in #secret-plans"));
	const dialog = await screen.findByRole("dialog");
	const bob = await within(dialog).findByLabelText("Bob");
	const cleo = within(dialog).getByLabelText("Cleo");
	fireEvent.click(bob);
	await waitFor(() => expect((cleo as HTMLInputElement).disabled).toBe(true));
	fireEvent.click(cleo);
	expect(h.raw.scopes.setPrincipal).toHaveBeenCalledTimes(1);
	fireEvent.keyDown(dialog, { key: "Escape" });
	expect(screen.getByRole("dialog")).toBe(dialog);

	pendingAdd.resolve({ _yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 } });
	await waitFor(() =>
		expect(within(dialog).getByRole("button", { name: "Close" }).hasAttribute("disabled")).toBe(false),
	);
});

test("a selected eighth private channel keeps its draft and focus when an earlier ninth scope arrives", async () => {
	const h = make_harness();
	const keys = Array.from({ length: 8 }, (_, index) => `p/60000000-0000-4000-8000-00000000000${index + 1}`);
	const docs = keys.map((key, index) => channel_doc(key, `room-${index + 1}`));
	const earlierKey = "p/10000000-0000-4000-8000-000000000000";
	const earlierDoc = channel_doc(earlierKey, "room-0");
	const utils = await boot_sidebar(h, docs, keys);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	fireEvent.click(within(nav).getByRole("button", { name: "#room-8 (private)" }));
	const selectedWindow = await waitFor(() => {
		const found = h.find_window("messages", `${keys[7]}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	selectedWindow.onUpdate(window_update([]));
	const composer = await waitFor(() => composer_box("Message #room-8"));
	type_in_composer(composer, "unsent draft");
	composer.focus();
	await waitFor(() => expect(announcer_text(utils.container)).toContain("#room-8"));
	const announcementBeforeReorder = announcer_text(utils.container);

	const fullScopes = [earlierKey, ...keys].map((key) => ({
		scopeId: key,
		keyPrefix: key,
		collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
		level: "manage" as const,
	}));
	h.send_scopes(fullScopes);
	const earlierWatch = await waitFor(() => {
		const found = h.find_watch("channels", earlierKey);
		expect(found).toBeTruthy();
		return found!;
	});
	earlierWatch.onUpdate(watch_update([earlierDoc]));

	await waitFor(() => {
		const privateNames = [...nav.querySelectorAll(".channel-list .channel-name")].filter((node) =>
			node.textContent?.includes("(private)"),
		);
		expect(privateNames).toHaveLength(8);
		expect(nav.textContent).toContain("#room-8 (private)");
		expect(nav.textContent).not.toContain("#room-7 (private)");
	});
	expect(screen.getByText(/8 private channels at a time; 1 more is hidden/)).toBeTruthy();
	expect(composer_box("Message #room-8")).toBe(composer);
	expect(composer.value).toBe("unsent draft");
	expect(document.activeElement).toBe(composer);
	expect(announcer_text(utils.container)).toBe(announcementBeforeReorder);

	// A real loss comes from the full live list even though a strict lexical budget would have
	// hidden this selected scope. The clear then lets the normal auto-select choose another row.
	h.send_scopes(fullScopes.filter((scope) => scope.scopeId !== keys[7]));
	await waitFor(() => expect(nav.textContent).not.toContain("#room-8 (private)"));
	await waitFor(() => expect(announcer_text(utils.container)).toContain("You were removed from #room-8."));
	await waitFor(() => expect(document.activeElement).toBe(nav));
	await waitFor(() => {
		const selected = nav.querySelector('[aria-current="page"]');
		expect(selected).toBeTruthy();
		expect(selected?.textContent).not.toContain("room-8");
	});
});

test("an involuntary background departure keeps the current channel and composer focus", async () => {
	const h = make_harness();
	const utils = await boot_sidebar(
		h,
		[channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")],
		[PRIVATE_KEY],
	);
	const composer = await waitFor(() => composer_box("Message #general"));
	type_in_composer(composer, "current draft");
	composer.focus();

	h.send_scopes([]);

	await waitFor(() => expect(screen.queryByText("#secret-plans (private)")).toBeNull());
	await waitFor(() => expect(announcer_text(utils.container)).toContain("You were removed from #secret-plans."));
	expect(composer_box("Message #general")).toBe(composer);
	expect(composer.value).toBe("current draft");
	expect(document.activeElement).toBe(composer);
});

test("Leave freezes its count, starts on Cancel, and sends the reviewed count", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const leaveItem = await open_channel_menu_item("secret-plans", "Leave #secret-plans");
	expect(leaveItem.textContent).toBe("Leave #secret-plans");
	fireEvent.click(leaveItem);
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	const cancel = within(dialog).getByRole("button", { name: "Cancel" });
	await waitFor(() => expect(document.activeElement).toBe(cancel));
	await waitFor(() => expect(within(dialog).getByRole("button", { name: "Leave channel" })).toBeTruthy());

	// The promise result is the consent snapshot. A harmless parent render cannot change the copy
	// or the count later sent to the host.
	h.scopePrincipals.set(PRIVATE_KEY, [{ userId: "user_me", level: "manage" }]);
	h.send_scopes([
		{
			scopeId: PRIVATE_KEY,
			keyPrefix: PRIVATE_KEY,
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage",
		},
	]);
	expect(within(dialog).getByRole("button", { name: "Leave channel" })).toBeTruthy();
	h.raw.scopes.removePrincipal.mockResolvedValueOnce({
		_nay: { name: "conflict", message: "Principal count changed" },
	});
	fireEvent.click(within(dialog).getByRole("button", { name: "Leave channel" }));
	await waitFor(() =>
		expect(h.raw.scopes.removePrincipal).toHaveBeenLastCalledWith({
			scopeId: PRIVATE_KEY,
			userId: "user_me",
			expectedPrincipalCount: 2,
		}),
	);
	expect((await within(dialog).findByRole("alert")).textContent).toBe(
		"Who is in this channel changed. Close it and try again.",
	);

	// The frozen value belongs to this dialog only. Reopening reads the new one-person result.
	fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const reopened = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	expect(await within(reopened).findByText(/You are the only person in this channel/)).toBeTruthy();
	expect(within(reopened).getByRole("button", { name: "Leave and delete channel" })).toBeTruthy();
});

test("Delete is manager-only, uses its own copy, and sends the frozen count", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Delete #secret-plans for everyone"));
	const dialog = await screen.findByRole("dialog", { name: "Delete #secret-plans for everyone?" });
	expect((await within(dialog).findByText(/This deletes the channel for all 2 people in it/)).textContent).toBe(
		"This deletes the channel for all 2 people in it. Nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files. This cannot be undone.",
	);
	h.raw.scopes.delete.mockResolvedValueOnce({ _nay: { message: "Try again" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Delete channel" }));
	await waitFor(() =>
		expect(h.raw.scopes.delete).toHaveBeenCalledWith({
			scopeId: PRIVATE_KEY,
			expectedPrincipalCount: 2,
		}),
	);
	await within(dialog).findByText("Try again");
	fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));

	// A member still gets Leave, but never a Delete control that the host will always refuse.
	h.send_scopes([
		{
			scopeId: PRIVATE_KEY,
			keyPrefix: PRIVATE_KEY,
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "member",
		},
	]);
	const leave = await open_channel_menu_item("secret-plans", "Leave #secret-plans");
	expect(leave).toBeTruthy();
	expect(screen.queryByRole("menuitem", { name: "Delete #secret-plans for everyone" })).toBeNull();
});

test.each([
	{
		action: "Leave" as const,
		menuName: "Leave #secret-plans",
		confirmName: "Leave channel",
		body: "We could not read who else is in this channel. If other people remain, they keep the channel and somebody who can add people has to add you back. If you are the only person left, leaving deletes it. Then nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files.",
	},
	{
		action: "Delete" as const,
		menuName: "Delete #secret-plans for everyone",
		confirmName: "Delete channel",
		body: "We could not read how many people are in this channel. Deleting it will remove the channel for everyone who is in it. Nobody will be able to open the channel again. The organization owner may still be able to read messages that were copied into archived files. This cannot be undone.",
	},
])("unknown-count $action uses its exact copy and omits expectedPrincipalCount", async (testCase) => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	fireEvent.click(await open_channel_menu_item("secret-plans", testCase.menuName));
	const dialog = await screen.findByRole("dialog");
	expect((await within(dialog).findByText(testCase.body)).textContent).toBe(testCase.body);

	if (testCase.action === "Leave") {
		h.raw.scopes.removePrincipal.mockResolvedValueOnce({ _nay: { message: "Try again" } });
	} else {
		h.raw.scopes.delete.mockResolvedValueOnce({ _nay: { message: "Try again" } });
	}
	fireEvent.click(within(dialog).getByRole("button", { name: testCase.confirmName }));
	await waitFor(() => {
		const call =
			testCase.action === "Leave"
				? h.raw.scopes.removePrincipal.mock.calls.at(-1)?.[0]
				: h.raw.scopes.delete.mock.calls.at(-1)?.[0];
		expect(call).toBeTruthy();
		expect(call).not.toHaveProperty("expectedPrincipalCount");
	});
});

test("an unavailable principal count keeps Delete disabled until Retry gets an exact count", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	h.raw.scopes.listPrincipals.mockResolvedValueOnce({
		_nay: { name: "unavailable", message: "Failed to read who can access this" },
	});
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);

	fireEvent.click(await open_channel_menu_item("secret-plans", "Delete #secret-plans for everyone"));
	const dialog = await screen.findByRole("dialog");
	expect((await within(dialog).findByRole("alert")).textContent).toBe("Failed to read who can access this");
	const confirm = within(dialog).getByRole("button", { name: "Delete channel" }) as HTMLButtonElement;
	expect(confirm.disabled).toBe(true);
	fireEvent.click(confirm);
	expect(h.raw.scopes.delete).not.toHaveBeenCalled();

	fireEvent.click(within(dialog).getByRole("button", { name: "Retry" }));
	expect(await within(dialog).findByText(/This deletes the channel for all 2 people in it/)).toBeTruthy();
	expect(confirm.disabled).toBe(false);
});

test.each([
	{ action: "Leave" as const, document: channel_doc(PRIVATE_KEY, "renamed"), announcement: null },
	{ action: "Leave" as const, document: null, announcement: "Left #secret-plans" },
	{ action: "Delete" as const, document: channel_doc(PRIVATE_KEY, "renamed"), announcement: null },
	{
		action: "Delete" as const,
		document: null,
		announcement: "The Delete request could not be confirmed.",
	},
])("a lost-response $action waits for an exact read when document=$document", async (testCase) => {
	const h = make_harness();
	const exactRead = deferred<unknown>();
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return exactRead.promise;
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const scopeResult = { _nay: { name: "unavailable", message: "Connection lost after send" } } as const;
	if (testCase.action === "Leave") {
		h.raw.scopes.removePrincipal.mockResolvedValueOnce(scopeResult);
	} else {
		h.raw.scopes.delete.mockResolvedValueOnce(scopeResult);
	}

	const menuName = testCase.action === "Leave" ? "Leave #secret-plans" : "Delete #secret-plans for everyone";
	fireEvent.click(await open_channel_menu_item("secret-plans", menuName));
	const dialog = await screen.findByRole("dialog");
	const confirmName = testCase.action === "Leave" ? "Leave channel" : "Delete channel";
	fireEvent.click(await within(dialog).findByRole("button", { name: confirmName }));
	await within(dialog).findByRole("alert");
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1));
	expect(file_calls(h, "/api/v1/plugin-data/read")[0]![1]?.body).toEqual({
		collection: "channels",
		key: PRIVATE_KEY,
	});
	// The request stays locked. Retrying before the exact read settles it could issue the same
	// destructive action twice.
	expect(within(dialog).getByRole("button", { name: "Checking…" })).toBeTruthy();

	// A restarted watch can replay either cached state. Neither state settles the request.
	h.send_scopes(testCase.document === null ? [private_scope([])] : []);
	expect(screen.getByRole("dialog")).toBe(dialog);
	exactRead.resolve({ document: testCase.document });

	if (testCase.document !== null) {
		await waitFor(() => expect(within(dialog).getByRole("button", { name: confirmName })).toBeTruthy());
		fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
	} else {
		await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
		await waitFor(() => expect(announcer_text(utils.container)).toContain(testCase.announcement));
		const announcement = announcer_text(utils.container);
		expect(announcement).not.toContain("Deleted #secret-plans");
		await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("navigation", { name: "Channels" })));
	}
});

test("an owner Leave settles from the exact principal list when one member remains", async () => {
	const h = make_harness();
	const exactRead = deferred<unknown>();
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return exactRead.promise;
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	h.raw.scopes.removePrincipal.mockResolvedValueOnce({
		_nay: { name: "unavailable", message: "Connection lost after send" },
	});
	const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1));

	// The owner can still read the channel after leaving. The live principal list is the membership proof.
	h.scopePrincipals.set(PRIVATE_KEY, [{ userId: "user_other", level: "manage" }]);
	h.raw.scopes.listPrincipals.mockResolvedValueOnce({ _yay: null });
	exactRead.resolve({ document: { ...channel_doc(PRIVATE_KEY, "renamed"), revision: 2 } });
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	expect(h.raw.scopes.listPrincipals).toHaveBeenCalledWith({ scopeId: PRIVATE_KEY });
	await waitFor(() => expect(announcer_text(utils.container)).toContain("Left #secret-plans"));
	expect(screen.queryByRole("button", { name: "#secret-plans (private)" })).toBeNull();
});

test("a re-add candidate delivered before a late exact-null Leave result waits for fresh exact proof", async () => {
	const h = make_harness();
	const exitRead = deferred<unknown>();
	const malformedRead = deferred<unknown>();
	const lateRead = deferred<unknown>();
	const readdRead = deferred<unknown>();
	let readIndex = 0;
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return [exitRead.promise, malformedRead.promise, lateRead.promise, readdRead.promise][readIndex++]!;
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	h.raw.scopes.removePrincipal.mockResolvedValueOnce({
		_nay: { name: "unavailable", message: "Connection lost after send" },
	});
	const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	h.send_scopes([{ ...private_scope([]), membershipRevision: 7 }]);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1));

	// The first read may have observed departure before this candidate reached the client. Its late
	// null result cannot decide whether the newer candidate includes this member now.
	h.send_scopes([{ ...private_scope([]), membershipRevision: 8 }]);
	exitRead.resolve({ document: null });
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	expect(screen.queryByRole("button", { name: "#secret-plans (private)" })).toBeNull();
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(2));
	malformedRead.resolve({});
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(3));

	// A full-list removal cancels this proof. Its late success cannot restore the departed scope.
	h.send_scopes([]);
	lateRead.resolve({ document: { ...channel_doc(PRIVATE_KEY, "stale"), revision: 2 } });
	await Promise.resolve();
	expect(screen.queryByRole("button", { name: "#secret-plans (private)" })).toBeNull();

	// A later candidate starts a new proof with a new identity.
	h.send_scopes([{ ...private_scope([]), membershipRevision: 9 }]);
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(4));
	readdRead.resolve({ document: { ...channel_doc(PRIVATE_KEY, "renamed"), revision: 2 } });
	await waitFor(() => expect(screen.getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy());
	expect(h.raw.scopes.listPrincipals).toHaveBeenLastCalledWith({ scopeId: PRIVATE_KEY });
	expect(announcer_text(utils.container)).toContain("Left #secret-plans");
});

test.each([
	{ action: "Leave" as const, menuName: "Leave #secret-plans", confirmName: "Leave channel" },
	{
		action: "Delete" as const,
		menuName: "Delete #secret-plans for everyone",
		confirmName: "Delete channel",
	},
])("uncertain $action ignores higher presence until exact principals prove a re-add", async (testCase) => {
	const h = make_harness();
	const exitResult = deferred<ScopeChangeResult>();
	const reads = [deferred<unknown>(), deferred<unknown>(), deferred<unknown>(), deferred<unknown>()];
	let readIndex = 0;
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return reads[readIndex++]!.promise;
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	if (testCase.action === "Leave") {
		h.raw.scopes.removePrincipal.mockImplementationOnce(() => exitResult.promise);
	} else {
		h.raw.scopes.delete.mockImplementationOnce(() => exitResult.promise);
	}
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	h.send_scopes([{ ...private_scope([]), membershipRevision: 10 }]);
	fireEvent.click(await open_channel_menu_item("secret-plans", testCase.menuName));
	const dialog = await screen.findByRole("dialog");
	fireEvent.click(await within(dialog).findByRole("button", { name: testCase.confirmName }));

	// Another principal's level changes at revision 11 before this member's departure commits at 12.
	// That count-neutral revision is not proof that this member was added back.
	h.send_scopes([{ ...private_scope([]), membershipRevision: 11 }]);
	exitResult.resolve({ _nay: { name: "unavailable", message: "Connection lost after commit" } });
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1));
	reads[0]!.resolve({ document: null });
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	expect(screen.queryByRole("button", { name: "#secret-plans (private)" })).toBeNull();

	// Recheck the candidate because it arrived before the exact departure result. A fresh null keeps
	// the departure fence in place.
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(2));
	reads[1]!.resolve({ document: null });
	expect(screen.queryByRole("button", { name: "#secret-plans (private)" })).toBeNull();

	// Even a later, higher scope row stays hidden when the exact principal list excludes this member.
	h.scopePrincipals.set(PRIVATE_KEY, [{ userId: "user_other", level: "manage" }]);
	h.send_scopes([{ ...private_scope([]), membershipRevision: 12 }]);
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(3));
	h.raw.scopes.listPrincipals.mockResolvedValueOnce({ _yay: null });
	reads[2]!.resolve({ document: { ...channel_doc(PRIVATE_KEY, "renamed"), revision: 2 } });
	await waitFor(() => expect(h.raw.scopes.listPrincipals).toHaveBeenCalledTimes(2));
	expect(screen.queryByRole("button", { name: "#secret-plans (private)" })).toBeNull();

	// A real re-add is restored only after both exact reads now include this member.
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	h.send_scopes([{ ...private_scope([]), membershipRevision: 13 }]);
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(4));
	reads[3]!.resolve({ document: { ...channel_doc(PRIVATE_KEY, "renamed-again"), revision: 3 } });
	await waitFor(() => expect(screen.getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy());
});

test.each([
	{ kind: "returned unavailable", rejects: false },
	{ kind: "rejected promise", rejects: true },
])("an exact readable channel unlocks Leave after a $kind", async (testCase) => {
	const h = make_harness();
	const exactRead = deferred<unknown>();
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return exactRead.promise;
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	if (testCase.rejects) {
		h.raw.scopes.removePrincipal.mockRejectedValueOnce(new Error("Connection lost after send"));
	} else {
		h.raw.scopes.removePrincipal.mockResolvedValueOnce({
			_nay: { name: "unavailable", message: "Connection lost after send" },
		});
	}
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));
	await within(dialog).findByRole("alert");

	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1));
	expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(1);
	expect(within(dialog).getByRole("button", { name: "Checking…" })).toBeTruthy();
	h.send_scopes([
		{
			scopeId: PRIVATE_KEY,
			keyPrefix: PRIVATE_KEY,
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage",
			membershipRevision: 1,
		},
	]);
	expect(within(dialog).getByRole("button", { name: "Checking…" })).toBeTruthy();
	exactRead.resolve({ document: { ...channel_doc(PRIVATE_KEY, "renamed"), revision: 2 } });

	await waitFor(() => expect(within(dialog).getByRole("button", { name: "Leave channel" })).toBeTruthy());
	expect(screen.getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy();
	fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
});

test("uncertain Delete exact-read failures back off to four seconds", async () => {
	const h = make_harness();
	let readAttempts = 0;
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			readAttempts += 1;
			if (readAttempts === 1 || readAttempts === 4) {
				throw new Error("Connection lost");
			}
			if (readAttempts === 2 || readAttempts === 5) {
				return {};
			}
			if (readAttempts === 3 || readAttempts === 6) {
				return { document: channel_doc(CH1_KEY, "wrong channel") };
			}
			return { document: null };
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	h.raw.scopes.delete.mockResolvedValueOnce({
		_nay: { name: "unavailable", message: "Connection lost after send" },
	});
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Delete #secret-plans for everyone"));
	const dialog = await screen.findByRole("dialog", { name: "Delete #secret-plans for everyone?" });

	vi.useFakeTimers();
	try {
		await act(async () => {
			fireEvent.click(within(dialog).getByRole("button", { name: "Delete channel" }));
			await Promise.resolve();
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(readAttempts).toBe(1);
		expect(within(dialog).getByRole("button", { name: "Checking…" })).toBeTruthy();

		for (const [index, delayMs] of [250, 500, 1000, 2000, 4000, 4000].entries()) {
			if (index === 5) {
				h.send_scopes([]);
			}
			await act(async () => {
				await vi.advanceTimersByTimeAsync(delayMs - 1);
			});
			expect(readAttempts).toBe(index + 1);
			await act(async () => {
				await vi.advanceTimersByTimeAsync(1);
			});
		}
		expect(readAttempts).toBe(7);
		expect(screen.queryByRole("dialog")).toBeNull();
		expect(file_calls(h, "/api/v1/plugin-data/read")[0]![1]?.body).toEqual({
			collection: "channels",
			key: PRIVATE_KEY,
		});
	} finally {
		vi.useRealTimers();
	}
});

test("Cancel ignores a late uncertain Leave exact read", async () => {
	const h = make_harness();
	const exactRead = deferred<unknown>();
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return exactRead.promise;
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	h.raw.scopes.removePrincipal.mockResolvedValueOnce({
		_nay: { name: "unavailable", message: "Connection lost after send" },
	});
	const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));
	await waitFor(() => expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1));
	expect((within(dialog).getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(false);
	fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

	exactRead.resolve({ document: null });
	await act(async () => {
		await Promise.resolve();
		await Promise.resolve();
	});
	expect(screen.getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy();
	expect(announcer_text(utils.container)).not.toContain("Left #secret-plans");
	expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1);
});

test("an unavailable scope-watch death after a confirmed Leave result restarts and settles", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	h.raw.scopes.removePrincipal.mockResolvedValueOnce({
		_yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 },
	});
	const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));
	await waitFor(() => expect(within(dialog).getByRole("button", { name: "Leaving…" })).toBeTruthy());
	await waitFor(() => expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(1));

	vi.useFakeTimers();
	try {
		await act(async () => {
			h.send_scope_death("unavailable");
			await Promise.resolve();
		});
		await act(async () => {
			await vi.advanceTimersByTimeAsync(249);
		});
		expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(1);
		await act(async () => {
			await vi.advanceTimersByTimeAsync(1);
		});
		expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(2);

		await act(async () => {
			h.send_scopes([]);
			await Promise.resolve();
		});
		await act(async () => {
			await vi.advanceTimersByTimeAsync(20);
		});
		expect(screen.queryByRole("dialog")).toBeNull();
		expect(screen.queryByText("#secret-plans (private)")).toBeNull();
		expect(announcer_text(utils.container)).toContain("Left #secret-plans");
	} finally {
		vi.useRealTimers();
	}
});

test("scope-watch unavailable retries back off to four seconds and reset after a live delivery", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general")]);
	expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(1);

	vi.useFakeTimers();
	try {
		let expectedCalls = 1;
		for (const delayMs of [250, 500, 1000, 2000, 4000, 4000]) {
			h.send_scope_death("unavailable");
			await act(async () => {
				await vi.advanceTimersByTimeAsync(delayMs - 1);
			});
			expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(expectedCalls);
			await act(async () => {
				await vi.advanceTimersByTimeAsync(1);
			});
			expectedCalls += 1;
			expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(expectedCalls);
		}

		await act(async () => {
			h.send_scopes([]);
			await Promise.resolve();
		});
		h.send_scope_death("unavailable");
		await act(async () => {
			await vi.advanceTimersByTimeAsync(249);
		});
		expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(expectedCalls);
		await act(async () => {
			await vi.advanceTimersByTimeAsync(1);
		});
		expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(expectedCalls + 1);
	} finally {
		vi.useRealTimers();
	}
});

test.each(["denied", "session_expired", "capacity", "invalid"])(
	"scope-watch %s death does not restart inside the frame",
	async (reason) => {
		const h = make_harness();
		await boot_sidebar(h, [channel_doc(CH1_KEY, "general")]);
		expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(1);

		vi.useFakeTimers();
		try {
			h.send_scope_death(reason);
			await act(async () => {
				await vi.advanceTimersByTimeAsync(10_000);
			});
			expect(h.raw.scopes.watchMine).toHaveBeenCalledTimes(1);
		} finally {
			vi.useRealTimers();
		}
	},
);

test("a successful Leave announces the server's deleted result and repairs focus after the row leaves", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const pendingLeave = deferred<ScopeChangeResult>();
	h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);
	const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog");
	await waitFor(() => expect(within(dialog).getByRole("button", { name: "Leave channel" })).toBeTruthy());
	fireEvent.click(within(dialog).getByRole("button", { name: "Leave channel" }));

	// Keep focus in the still-open modal until the host tells the page whether this was a leave or a
	// delete. Do not send a scope-watch update: success itself must remove the stale row.
	expect(dialog.contains(document.activeElement)).toBe(true);

	pendingLeave.resolve({ _yay: { scopeId: PRIVATE_KEY, deleted: true, membershipRevision: 2 } });
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	await waitFor(() => expect(screen.queryByText("#secret-plans (private)")).toBeNull());
	await waitFor(() => expect(announcer_text(utils.container)).toContain("Deleted #secret-plans"));
	await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("navigation", { name: "Channels" })));
});

test("unrelated and older target scope updates keep a successful Leave pending", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const pendingLeave = deferred<ScopeChangeResult>();
	h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);
	const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));

	await act(async () => {
		h.send_scopes([
			{
				scopeId: PRIVATE_KEY,
				keyPrefix: PRIVATE_KEY,
				collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
				level: "manage",
			},
			{
				scopeId: PRIVATE_DM_KEY,
				keyPrefix: PRIVATE_DM_KEY,
				collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
				level: "manage",
			},
		]);
		await Promise.resolve();
	});
	expect(screen.getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy();

	pendingLeave.resolve({ _yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 } });
	await waitFor(() => expect(within(dialog).getByRole("button", { name: "Leaving…" })).toBeTruthy());
	expect(screen.getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy();
	h.send_scopes([
		{
			scopeId: PRIVATE_KEY,
			keyPrefix: PRIVATE_KEY,
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage",
			membershipRevision: 1,
		},
		{
			scopeId: PRIVATE_DM_KEY,
			keyPrefix: PRIVATE_DM_KEY,
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage",
			membershipRevision: 2,
		},
	]);
	await waitFor(() => expect(within(dialog).getByRole("button", { name: "Leaving…" })).toBeTruthy());
	expect(screen.getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy();

	h.send_scopes([
		{
			scopeId: PRIVATE_DM_KEY,
			keyPrefix: PRIVATE_DM_KEY,
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "manage",
		},
	]);
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	await waitFor(() => expect(screen.queryByText("#secret-plans (private)")).toBeNull());
	await waitFor(() => expect(announcer_text(utils.container)).toContain("Left #secret-plans"));
	await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("navigation", { name: "Channels" })));
});

test("a coalesced newer scope revision wins over an older successful Leave", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const pendingLeave = deferred<ScopeChangeResult>();
	h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);
	const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const messageWindow = await waitFor(() => {
		const found = h.find_window("messages", `${PRIVATE_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	const leaveItem = await open_channel_menu_item("secret-plans", "Leave #secret-plans");
	const announcementBefore = announcer_text(utils.container);

	vi.useFakeTimers();
	try {
		await act(async () => {
			messageWindow.onUpdate(
				window_update([message_doc(5_000, { channelKey: PRIVATE_KEY, rand: "pending", text: "visible" })]),
			);
			await Promise.resolve();
		});
		fireEvent.click(leaveItem);
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
		});
		const dialog = screen.getByRole("dialog", { name: "Leave #secret-plans?" });
		fireEvent.click(within(dialog).getByRole("button", { name: "Leave channel" }));

		// The Leave result is newer than the last full scope list, so it cannot settle the row yet.
		pendingLeave.resolve({ _yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 } });
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(within(dialog).getByRole("button", { name: "Leaving…" })).toBeTruthy();
		expect(screen.getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy();

		// The server may coalesce the absent and re-added states into one direct present delivery.
		// Its strictly newer target revision proves that the re-add won.
		await act(async () => {
			h.send_scopes([
				{
					scopeId: PRIVATE_KEY,
					keyPrefix: PRIVATE_KEY,
					collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
					level: "manage",
					membershipRevision: 3,
				},
			]);
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(screen.queryByRole("dialog")).toBeNull();
		const row = screen.getByRole("button", { name: "#secret-plans (private)" });
		expect(row.getAttribute("aria-current")).toBe("page");
		expect(composer_box("Message #secret-plans")).toBeTruthy();
		expect(document.activeElement).toBe(screen.getByRole("button", { name: "Actions for #secret-plans" }));
		expect(announcer_text(utils.container)).toBe(announcementBefore);

		await act(async () => {
			await vi.advanceTimersByTimeAsync(2_500);
		});
		const cursorWrites = (h.raw.data.putOwned.mock.calls as [PutOpts][])
			.map(([opts]) => opts)
			.filter((opts) => opts.collection === "channels" && opts.key === `${PRIVATE_KEY}:read`);
		expect(cursorWrites).toHaveLength(1);
		expect(cursorWrites[0]?.value).toEqual({ at: 5_000, activity: { messages: 0, replies: 0 } });
	} finally {
		vi.useRealTimers();
	}
});

test("a background channel re-add focuses that channel's action trigger", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const pendingLeave = deferred<ScopeChangeResult>();
	h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);
	const utils = await boot_sidebar(
		h,
		[channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")],
		[PRIVATE_KEY],
	);
	const selected = screen.getByRole("button", { name: "#general" });
	expect(selected.getAttribute("aria-current")).toBe("page");
	const announcementBefore = announcer_text(utils.container);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));

	pendingLeave.resolve({ _yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 } });
	await act(async () => {
		h.send_scopes([
			{
				scopeId: PRIVATE_KEY,
				keyPrefix: PRIVATE_KEY,
				collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
				level: "manage",
				membershipRevision: 3,
			},
		]);
		await Promise.resolve();
	});

	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	expect(selected.getAttribute("aria-current")).toBe("page");
	expect(document.activeElement).toBe(screen.getByRole("button", { name: "Actions for #secret-plans" }));
	expect(announcer_text(utils.container)).toBe(announcementBefore);
});

test("a background channel re-add after a narrow resize focuses the open thread", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const pendingLeave = deferred<ScopeChangeResult>();
	h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);
	set_viewport_narrow(false);
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const root = message_doc(5_000, { channelKey: CH1_KEY, rand: "thread", text: "public thread root" });
	const messageWindow = await waitFor(() => {
		const found = h.find_window("messages", `${CH1_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	messageWindow.onUpdate(window_update([root]));
	await screen.findByText("public thread root");
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	const thread = await screen.findByRole("region", { name: "Thread" });
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));

	await act(async () => {
		set_viewport_narrow(true);
		await Promise.resolve();
	});
	const back = await within(thread).findByRole("button", { name: "Back to messages" });
	pendingLeave.resolve({ _yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 } });
	await act(async () => {
		h.send_scopes([
			{
				scopeId: PRIVATE_KEY,
				keyPrefix: PRIVATE_KEY,
				collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
				level: "manage",
				membershipRevision: 3,
			},
		]);
		await Promise.resolve();
	});

	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	await waitFor(() => expect(document.activeElement).toBe(back));
	expect(screen.getByRole("region", { name: "Thread" })).toBe(thread);
});

test("a background channel re-add after a narrow resize falls back when the thread root is missing", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const pendingLeave = deferred<ScopeChangeResult>();
	h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);
	set_viewport_narrow(false);
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	await open_missing_general_thread_from_threads(h);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));

	await act(async () => {
		set_viewport_narrow(true);
		pendingLeave.resolve({ _yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 } });
		h.send_scopes([
			{
				scopeId: PRIVATE_KEY,
				keyPrefix: PRIVATE_KEY,
				collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
				level: "manage",
				membershipRevision: 3,
			},
		]);
		await Promise.resolve();
	});

	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	expect(screen.getByRole("button", { name: "#secret-plans (private)" })).toBeTruthy();
	expect(screen.queryByRole("region", { name: "Thread" })).toBeNull();
	const drawerToggle = screen.getByRole("button", { name: "Channels" });
	expect(document.querySelector(".chitchat:has(.thread)")).toBeNull();
	expect(document.querySelector(".chitchat .app-bar > .drawer-toggle")).toBe(drawerToggle);
	await waitFor(() => expect(document.activeElement).toBe(drawerToggle));
});

test("leaving a background channel repairs desktop focus while another channel's thread stays open", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const root = message_doc(5_000, { channelKey: CH1_KEY, rand: "thread", text: "public thread root" });
	const messageWindow = await waitFor(() => {
		const found = h.find_window("messages", `${CH1_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	messageWindow.onUpdate(window_update([root]));
	await screen.findByText("public thread root");
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	const thread = await screen.findByRole("region", { name: "Thread" });

	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	const leave = await within(dialog).findByRole("button", { name: "Leave channel" });
	fireEvent.click(leave);
	h.send_scopes([]);

	await waitFor(() => expect(screen.queryByText("#secret-plans (private)")).toBeNull());
	const nav = screen.getByRole("navigation", { name: "Channels" });
	await waitFor(() => expect(document.activeElement).toBe(nav));
	expect(screen.getByRole("region", { name: "Thread" })).toBe(thread);

	// Closing the unrelated thread returns to its row. A focus repair left pending would jump to nav.
	fireEvent.click(within(thread).getByRole("button", { name: "Close thread" }));
	await waitFor(() => expect(screen.queryByRole("region", { name: "Thread" })).toBeNull());
	expect(document.activeElement?.textContent).toContain("Reply in thread");
});

test("a background Leave resized to narrow focuses the open thread without a late repair", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const pendingLeave = deferred<ScopeChangeResult>();
	h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);
	set_viewport_narrow(false);
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const root = message_doc(5_000, { channelKey: CH1_KEY, rand: "thread", text: "public thread root" });
	const messageWindow = await waitFor(() => {
		const found = h.find_window("messages", `${CH1_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	messageWindow.onUpdate(window_update([root]));
	await screen.findByText("public thread root");
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	const thread = await screen.findByRole("region", { name: "Thread" });

	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));
	set_viewport_narrow(true);
	const back = await within(thread).findByRole("button", { name: "Back to messages" });

	pendingLeave.resolve({ _yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 } });
	h.send_scopes([]);
	await waitFor(() => expect(screen.queryByText("#secret-plans (private)")).toBeNull());
	await waitFor(() => expect(document.activeElement).toBe(back));
	expect(screen.getByRole("region", { name: "Thread" })).toBe(thread);

	// Closing the unrelated thread returns to its row. A delayed repair would steal focus afterward.
	fireEvent.click(back);
	await waitFor(() => expect(screen.queryByRole("region", { name: "Thread" })).toBeNull());
	expect(document.activeElement?.textContent).toContain("Reply in thread");
});

test("a background Leave resized to narrow falls back when the thread root is missing", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const pendingLeave = deferred<ScopeChangeResult>();
	h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);
	set_viewport_narrow(false);
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	await open_missing_general_thread_from_threads(h);
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	fireEvent.click(await within(dialog).findByRole("button", { name: "Leave channel" }));

	await act(async () => {
		set_viewport_narrow(true);
		pendingLeave.resolve({ _yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 } });
		h.send_scopes([]);
		await Promise.resolve();
	});

	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
	expect(screen.queryByText("#secret-plans (private)")).toBeNull();
	expect(screen.queryByRole("region", { name: "Thread" })).toBeNull();
	const drawerToggle = screen.getByRole("button", { name: "Channels" });
	expect(document.querySelector(".chitchat:has(.thread)")).toBeNull();
	expect(document.querySelector(".chitchat .app-bar > .drawer-toggle")).toBe(drawerToggle);
	await waitFor(() => expect(document.activeElement).toBe(drawerToggle));
});

test("selected scope loss closes a narrow thread before focusing the visible Channels toggle", async () => {
	const h = make_harness();
	set_viewport_narrow(true);
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	fireEvent.click(screen.getByRole("button", { name: "Channels" }));
	const nav = screen.getByRole("navigation", { name: "Channels" });
	fireEvent.click(within(nav).getByRole("button", { name: "#secret-plans (private)" }));
	const messageWindow = await waitFor(() => {
		const found = h.find_window("messages", `${PRIVATE_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	messageWindow.onUpdate(
		window_update([message_doc(5_000, { channelKey: PRIVATE_KEY, rand: "thread", text: "thread root" })]),
	);
	await screen.findByText("thread root");
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	await screen.findByRole("region", { name: "Thread" });

	h.send_scopes([]);

	await waitFor(() => expect(screen.queryByRole("region", { name: "Thread" })).toBeNull());
	const drawerToggle = screen.getByRole("button", { name: "Channels" });
	await waitFor(() => expect(document.activeElement).toBe(drawerToggle));
});

test.each([
	{ action: "Leave" as const, resultDeleted: false },
	{ action: "Delete" as const, resultDeleted: true },
])(
	"a pending selected-channel mark-read cannot write after $action starts and the scope departs",
	async ({ action, resultDeleted }) => {
		const h = make_harness();
		h.scopePrincipals.set(PRIVATE_KEY, [
			{ userId: "user_me", level: "manage" },
			{ userId: "user_other", level: "member" },
		]);
		await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
		const messageWindow = await waitFor(() => {
			const found = h.find_window("messages", `${PRIVATE_KEY}:`);
			expect(found).toBeTruthy();
			return found!;
		});
		const menuItem = await open_channel_menu_item(
			"secret-plans",
			action === "Leave" ? "Leave #secret-plans" : "Delete #secret-plans for everyone",
		);
		const pendingChange = deferred<ScopeChangeResult>();
		if (action === "Leave") {
			h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingChange.promise);
		} else {
			h.raw.scopes.delete.mockReturnValueOnce(pendingChange.promise);
		}

		vi.useFakeTimers();
		try {
			await act(async () => {
				messageWindow.onUpdate(
					window_update([message_doc(5_000, { channelKey: PRIVATE_KEY, rand: "pending", text: "visible" })]),
				);
				await Promise.resolve();
			});
			fireEvent.click(menuItem);
			await act(async () => {
				await Promise.resolve();
				await Promise.resolve();
			});
			const dialog = screen.getByRole("dialog");
			const confirmName = action === "Leave" ? "Leave channel" : "Delete channel";
			fireEvent.click(within(dialog).getByRole("button", { name: confirmName }));
			await act(async () => {
				await Promise.resolve();
				await Promise.resolve();
			});
			dialog.focus();
			expect(document.activeElement).toBe(dialog);
			fireEvent.keyDown(dialog, { key: "Tab" });
			expect(document.activeElement).toBe(dialog);
			fireEvent.keyDown(dialog, { key: "Escape" });
			expect(screen.getByRole("dialog")).toBe(dialog);

			// The true departure also cancels the matching key as a backstop. Keep the mutation pending
			// while timers pass, so the busy-state render cannot re-arm the old channel's timer.
			await act(async () => {
				await vi.advanceTimersByTimeAsync(5_000);
			});
			const privateCursorWrites = () =>
				(h.raw.data.putOwned.mock.calls as [PutOpts][]).filter(
					([opts]) => opts.collection === "channels" && opts.key === `${PRIVATE_KEY}:read`,
				);
			expect(privateCursorWrites()).toHaveLength(0);
			expect(dialog.contains(document.activeElement)).toBe(true);

			// A later full-list departure is a second backstop. No timer can write after that point either.
			await act(async () => {
				h.send_scopes([]);
				await vi.advanceTimersByTimeAsync(5_000);
			});
			expect(privateCursorWrites()).toHaveLength(0);

			pendingChange.resolve({
				_yay: { scopeId: PRIVATE_KEY, deleted: resultDeleted, membershipRevision: 2 },
			});
			await act(async () => {
				await Promise.resolve();
				await Promise.resolve();
				await vi.advanceTimersByTimeAsync(5_000);
			});
			expect(privateCursorWrites()).toHaveLength(0);
		} finally {
			vi.useRealTimers();
		}
	},
);

test.each([
	{ action: "Leave" as const, mode: "unavailable" as const },
	{ action: "Leave" as const, mode: "throw" as const },
	{ action: "Delete" as const, mode: "unavailable" as const },
	{ action: "Delete" as const, mode: "throw" as const },
])("an exact null after a watch-first $action and $mode settles safely", async ({ action, mode }) => {
	const h = make_harness();
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			return { document: null };
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const messageWindow = await waitFor(() => {
		const found = h.find_window("messages", `${PRIVATE_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	const pendingChange = deferred<ScopeChangeResult>();
	if (action === "Leave") {
		h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingChange.promise);
	} else {
		h.raw.scopes.delete.mockReturnValueOnce(pendingChange.promise);
	}
	const menuItem = await open_channel_menu_item(
		"secret-plans",
		action === "Leave" ? "Leave #secret-plans" : "Delete #secret-plans for everyone",
	);

	vi.useFakeTimers();
	try {
		await act(async () => {
			messageWindow.onUpdate(
				window_update([message_doc(5_000, { channelKey: PRIVATE_KEY, rand: "pending", text: "visible" })]),
			);
			await Promise.resolve();
		});
		fireEvent.click(menuItem);
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
		});
		const dialog = screen.getByRole("dialog");
		fireEvent.click(
			within(dialog).getByRole("button", { name: action === "Leave" ? "Leave channel" : "Delete channel" }),
		);
		await act(async () => {
			h.send_scopes([]);
			await Promise.resolve();
		});

		if (mode === "unavailable") {
			pendingChange.resolve({ _nay: { name: "unavailable", message: "Try again" } });
		} else {
			pendingChange.reject(new Error("Network failed"));
		}
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
			await vi.advanceTimersByTimeAsync(5_000);
		});
		await act(async () => {
			await vi.advanceTimersByTimeAsync(20);
		});
		expect(screen.queryByRole("dialog")).toBeNull();
		expect(screen.queryByText("#secret-plans (private)")).toBeNull();
		const announcement = announcer_text(utils.container);
		expect(announcement).toContain(
			action === "Leave" ? "Left #secret-plans" : "The Delete request could not be confirmed.",
		);
		expect(announcement).not.toContain("Deleted #secret-plans");
		expect(document.activeElement).toBe(screen.getByRole("navigation", { name: "Channels" }));
		const privateCursorWrites = (h.raw.data.putOwned.mock.calls as [PutOpts][]).filter(
			([opts]) => opts.collection === "channels" && opts.key === `${PRIVATE_KEY}:read`,
		);
		expect(privateCursorWrites).toHaveLength(0);
	} finally {
		vi.useRealTimers();
	}
});

test("a late exit refusal after unmount does not restart a private cursor timer", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const messageWindow = await waitFor(() => {
		const found = h.find_window("messages", `${PRIVATE_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	const pendingLeave = deferred<ScopeChangeResult>();
	h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);
	const leaveItem = await open_channel_menu_item("secret-plans", "Leave #secret-plans");

	vi.useFakeTimers();
	try {
		await act(async () => {
			messageWindow.onUpdate(
				window_update([message_doc(5_000, { channelKey: PRIVATE_KEY, rand: "pending", text: "visible" })]),
			);
			await Promise.resolve();
		});
		fireEvent.click(leaveItem);
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
		});
		fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Leave channel" }));
		utils.unmount();

		pendingLeave.resolve({ _nay: { name: "unavailable", message: "Try again" } });
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
			await vi.advanceTimersByTimeAsync(5_000);
		});
		const privateCursorWrites = (h.raw.data.putOwned.mock.calls as [PutOpts][]).filter(
			([opts]) => opts.collection === "channels" && opts.key === `${PRIVATE_KEY}:read`,
		);
		expect(privateCursorWrites).toHaveLength(0);
	} finally {
		vi.useRealTimers();
	}
});

test("remote scope loss cancels a pending selected-channel mark-read", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const messageWindow = await waitFor(() => {
		const found = h.find_window("messages", `${PRIVATE_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});

	vi.useFakeTimers();
	try {
		await act(async () => {
			messageWindow.onUpdate(
				window_update([message_doc(5_000, { channelKey: PRIVATE_KEY, rand: "pending", text: "visible" })]),
			);
			await Promise.resolve();
		});
		// Another manager removes this member. No local Leave/Delete handler runs first.
		await act(async () => {
			h.send_scopes([]);
			await Promise.resolve();
		});
		await act(async () => {
			await vi.advanceTimersByTimeAsync(5_000);
		});
		const privateCursorWrites = (h.raw.data.putOwned.mock.calls as [PutOpts][]).filter(
			([opts]) => opts.collection === "channels" && opts.key === `${PRIVATE_KEY}:read`,
		);
		expect(privateCursorWrites).toHaveLength(0);
	} finally {
		vi.useRealTimers();
	}
});

test.each(["unavailable", "throw"] as const)(
	"a %s resumes two channel timers without replacing either key",
	async (mode) => {
		const h = make_harness();
		const secondPrivateKey = "p/20000000-0000-4000-8000-000000000000";
		h.raw.fetchJson.mockImplementation(async (path: string) => {
			if (path === "/api/v1/plugin-data/read") {
				return { document: channel_doc(PRIVATE_KEY, "secret-a") };
			}
			if (path === "/api/v1/plugin-data/list") {
				return { documents: [], cursor: null, isDone: true };
			}
			throw new Error("fetchJson not stubbed");
		});
		h.scopePrincipals.set(PRIVATE_KEY, [
			{ userId: "user_me", level: "manage" },
			{ userId: "user_other", level: "member" },
		]);
		await boot_sidebar(
			h,
			[channel_doc(PRIVATE_KEY, "secret-a"), channel_doc(secondPrivateKey, "secret-b")],
			[PRIVATE_KEY, secondPrivateKey],
		);
		const nav = screen.getByRole("navigation", { name: "Channels" });
		const firstWindow = await waitFor(() => {
			const found = h.find_window("messages", `${PRIVATE_KEY}:`);
			expect(found).toBeTruthy();
			return found!;
		});

		vi.useFakeTimers();
		try {
			await act(async () => {
				firstWindow.onUpdate(
					window_update([message_doc(5_000, { channelKey: PRIVATE_KEY, rand: "first", text: "first" })]),
				);
				await Promise.resolve();
			});
			fireEvent.click(within(nav).getByRole("button", { name: "#secret-b (private)" }));
			await act(async () => {
				await Promise.resolve();
				await Promise.resolve();
			});
			const secondWindow = h.find_window("messages", `${secondPrivateKey}:`);
			expect(secondWindow).toBeTruthy();
			await act(async () => {
				secondWindow!.onUpdate(
					window_update([message_doc(9_000, { channelKey: secondPrivateKey, rand: "second", text: "second" })]),
				);
				await Promise.resolve();
			});

			fireEvent.click(screen.getByRole("button", { name: "Actions for #secret-a" }));
			const leaveItem = screen.getByRole("menuitem", { name: "Leave #secret-a" });
			const pendingLeave = deferred<ScopeChangeResult>();
			h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);
			fireEvent.click(leaveItem);
			await act(async () => {
				await Promise.resolve();
				await Promise.resolve();
			});
			const dialog = screen.getByRole("dialog");
			fireEvent.click(within(dialog).getByRole("button", { name: "Leave channel" }));

			if (mode === "unavailable") {
				pendingLeave.resolve({ _nay: { name: "unavailable", message: "Try again" } });
			} else {
				pendingLeave.reject(new Error("Network failed"));
			}
			await act(async () => {
				await Promise.resolve();
				await Promise.resolve();
				h.send_scopes(
					[PRIVATE_KEY, secondPrivateKey].map((scopeId) => ({
						scopeId,
						keyPrefix: scopeId,
						collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
						level: "manage" as const,
					})),
				);
				await Promise.resolve();
				await vi.advanceTimersByTimeAsync(2_500);
			});
			dialog.focus();
			fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
			expect(document.activeElement).toBe(within(dialog).getByRole("button", { name: "Leave channel" }));
			const cursorWrites = (h.raw.data.putOwned.mock.calls as [PutOpts][])
				.map(([opts]) => opts)
				.filter((opts) => opts.collection === "channels" && opts.key.endsWith(":read"));
			expect(Object.fromEntries(cursorWrites.map((opts) => [opts.key, opts.value]))).toEqual({
				[`${PRIVATE_KEY}:read`]: { at: 5_000, activity: { messages: 0, replies: 0 } },
				[`${secondPrivateKey}:read`]: { at: 9_000, activity: { messages: 0, replies: 0 } },
			});
		} finally {
			vi.useRealTimers();
		}
	},
);

test.each(["unavailable", "throw"] as const)(
	"a %s resumes only the guarded channel's newest buffered mark-read after StrictMode replays effects",
	async (mode) => {
		const h = make_harness();
		h.raw.fetchJson.mockImplementation(async (path: string) => {
			if (path === "/api/v1/plugin-data/read") {
				return { document: channel_doc(PRIVATE_KEY, "secret-plans") };
			}
			if (path === "/api/v1/plugin-data/list") {
				return { documents: [], cursor: null, isDone: true };
			}
			throw new Error("fetchJson not stubbed");
		});
		h.scopePrincipals.set(PRIVATE_KEY, [
			{ userId: "user_me", level: "manage" },
			{ userId: "user_other", level: "member" },
		]);
		await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY], true);
		const messageWindow = await waitFor(() => {
			const found = h.find_window("messages", `${PRIVATE_KEY}:`);
			expect(found).toBeTruthy();
			return found!;
		});
		const leaveItem = await open_channel_menu_item("secret-plans", "Leave #secret-plans");
		const pendingLeave = deferred<ScopeChangeResult>();
		h.raw.scopes.removePrincipal.mockReturnValueOnce(pendingLeave.promise);

		vi.useFakeTimers();
		try {
			await act(async () => {
				messageWindow.onUpdate(
					window_update([message_doc(5_000, { channelKey: PRIVATE_KEY, rand: "first", text: "first" })]),
				);
				await Promise.resolve();
			});
			fireEvent.click(leaveItem);
			await act(async () => {
				await Promise.resolve();
				await Promise.resolve();
			});
			const dialog = screen.getByRole("dialog");
			fireEvent.click(within(dialog).getByRole("button", { name: "Leave channel" }));
			await act(async () => {
				await Promise.resolve();
				messageWindow.onUpdate(
					window_update([message_doc(7_000, { channelKey: PRIVATE_KEY, rand: "latest", text: "latest" })]),
				);
				await Promise.resolve();
			});

			if (mode === "unavailable") {
				pendingLeave.resolve({ _nay: { name: "unavailable", message: "Try again" } });
			} else {
				pendingLeave.reject(new Error("Network failed"));
			}
			await act(async () => {
				await Promise.resolve();
				await Promise.resolve();
				h.send_scopes([
					{
						scopeId: PRIVATE_KEY,
						keyPrefix: PRIVATE_KEY,
						collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
						level: "manage",
					},
				]);
				await Promise.resolve();
			});
			await act(async () => {
				await vi.advanceTimersByTimeAsync(2_500);
			});
			const cursorWrites = (h.raw.data.putOwned.mock.calls as [PutOpts][])
				.map(([opts]) => opts)
				.filter((opts) => opts.collection === "channels" && opts.key === `${PRIVATE_KEY}:read`);
			expect(cursorWrites).toHaveLength(1);
			expect(cursorWrites[0]?.value).toEqual({ at: 7_000, activity: { messages: 0, replies: 0 } });
		} finally {
			vi.useRealTimers();
		}
	},
);

// #endregion private channels

// #region unreads, views, mentions

test("the public cursor watch ignores foreign prefix docs and non-owned exact docs", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const randomRow = () => within(nav).getByRole("button", { name: /^#random/ });
	const cursors = h.find_watch("cursors", "me:user_me")!;

	h.find_recent("messages")!.onUpdate(
		watch_update([message_doc(2_000, { channelKey: CH2_KEY, createdBy: "user_other" })]),
	);
	cursors.onUpdate(
		watch_update([{ ...cursor_doc({ [CH2_KEY]: 3_000 }, 3), key: "me:user_me:user_other", createdBy: "user_other" }]),
	);
	await waitFor(() => expect(randomRow().className).toContain("is-unread"));

	cursors.onUpdate(watch_update([{ ...cursor_doc({ [CH2_KEY]: 3_000 }, 4), ownership: "shared" }]));
	expect(randomRow().className).toContain("is-unread");
	cursors.onUpdate(watch_update([{ ...cursor_doc({ [CH2_KEY]: 3_000 }, 5), createdBy: "user_other" }]));
	expect(randomRow().className).toContain("is-unread");

	// Only the exact owned row stamped for this member may clear the unread mark.
	cursors.onUpdate(watch_update([cursor_doc({ [CH2_KEY]: 3_000 }, 6)]));
	await waitFor(() => expect(randomRow().className).not.toContain("is-unread"));
});

test("a message newer than the cursor marks its channel unread, and a newer cursor clears it", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const randomRow = () => within(nav).getByRole("button", { name: /^#random/ });

	// Bob wrote in #random at t=2000; this member's cursor read it only up to t=1000.
	h.find_recent("messages")!.onUpdate(
		watch_update([message_doc(2000, { channelKey: CH2_KEY, createdBy: "user_other" })]),
	);
	h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([cursor_doc({ [CH2_KEY]: 1000 }, 3)]));
	await waitFor(() => expect(randomRow().className).toContain("is-unread"));
	expect(randomRow().querySelector(".unread-dot")).toBeTruthy();
	// #general heard nothing, so it carries no mark.
	expect(within(nav).getByRole("button", { name: /^#general/ }).className).not.toContain("is-unread");

	// The cursor moves past the message (this member read it elsewhere); the mark clears with no
	// feed change at all.
	h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([cursor_doc({ [CH2_KEY]: 3000 }, 4)]));
	await waitFor(() => expect(randomRow().className).not.toContain("is-unread"));

	// This member's own later send never marks the channel unread for them.
	h.find_recent("messages")!.onUpdate(
		watch_update([
			message_doc(4000, { channelKey: CH2_KEY, createdBy: "user_me", rand: "mine" }),
			message_doc(2000, { channelKey: CH2_KEY, createdBy: "user_other" }),
		]),
	);
	await waitFor(() => expect(randomRow().className).not.toContain("is-unread"));
});

test("opening an unread channel marks where reading stopped, and the mark survives the read write", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	// Bob wrote in #random after this member's cursor stopped at t=1000.
	h.find_recent("messages")!.onUpdate(
		watch_update([message_doc(2000, { channelKey: CH2_KEY, createdBy: "user_other", rand: "u1" })]),
	);
	h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([cursor_doc({ [CH2_KEY]: 1000 }, 3)]));
	const randomRow = () => within(nav).getByRole("button", { name: /^#random/ });
	await waitFor(() => expect(randomRow().className).toContain("is-unread"));

	fireEvent.click(randomRow());
	const window2 = await waitFor(() => {
		const found = h.find_window("messages", `${CH2_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	// Newest first, as a window delivers them: one read message, then two unread ones, and this
	// member's own send in between the unread pair.
	window2.onUpdate(
		window_update([
			message_doc(3000, { channelKey: CH2_KEY, createdBy: "user_me", rand: "u3", text: "mine after" }),
			message_doc(2000, { channelKey: CH2_KEY, createdBy: "user_other", rand: "u1", text: "first unread" }),
			message_doc(500, { channelKey: CH2_KEY, createdBy: "user_other", rand: "u0", text: "already read" }),
		]),
	);
	await screen.findByText("first unread");

	// The mark sits directly above the first message this member has not read, and nowhere else.
	const divider = await waitFor(() => {
		const found = document.querySelector(".new-divider");
		expect(found).toBeTruthy();
		return found!;
	});
	expect(document.querySelectorAll(".new-divider").length).toBe(1);
	expect(divider.textContent).toContain("New messages");
	expect(divider.nextElementSibling?.textContent).toContain("first unread");

	// Opening the channel writes the cursor forward. The mark is placed on the value frozen at
	// open time, so the member keeps seeing where they stopped instead of watching it vanish.
	h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([cursor_doc({ [CH2_KEY]: 9000 }, 4)]));
	await waitFor(() => expect(randomRow().className).not.toContain("is-unread"));
	expect(document.querySelectorAll(".new-divider").length).toBe(1);
});

test("opening a public channel uses the observed message time when the device clock is ahead", async () => {
	const now = vi.spyOn(Date, "now").mockReturnValue(90_000);
	try {
		const h = make_harness();
		await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
		const nav = screen.getByRole("navigation", { name: "Channels" });
		h.find_recent("messages")!.onUpdate(
			watch_update([message_doc(2_000, { channelKey: CH2_KEY, createdBy: "user_other" })]),
		);
		h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([cursor_doc({ [CH2_KEY]: 1_000 }, 3)]));
		const row = () => within(nav).getByRole("button", { name: /^#random/ });
		await waitFor(() => expect(row().className).toContain("is-unread"));

		fireEvent.click(row());
		const write = await waitFor(() => {
			const found = (h.raw.data.putOwned.mock.calls as [PutOpts][])
				.map(([opts]) => opts)
				.find((opts) => opts.collection === "cursors");
			expect(found).toBeTruthy();
			return found!;
		});
		expect((write.value.channels as Record<string, number>)[CH2_KEY]).toBe(2_000);
	} finally {
		now.mockRestore();
	}
});

test("unavailable public cursor writes retry the same revision and keep concurrent maxima", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	h.find_recent("messages")!.onUpdate(
		watch_update([message_doc(300, { channelKey: CH1_KEY }), message_doc(200, { channelKey: CH2_KEY })]),
	);
	h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([cursor_doc({}, 3)]));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#random/ }).className).toContain("is-unread"));
	h.raw.data.putOwned
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _yay: { key: "me:user_me", revision: 4 } });

	vi.useFakeTimers();
	try {
		fireEvent.click(within(nav).getByRole("button", { name: /^#random/ }));
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
		});
		fireEvent.click(within(nav).getByRole("button", { name: /^#general/ }));
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2);
		const first = h.raw.data.putOwned.mock.calls[0]![0] as PutOpts;
		const second = h.raw.data.putOwned.mock.calls[1]![0] as PutOpts;

		await act(async () => {
			await vi.advanceTimersByTimeAsync(250);
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(3);
		const retry = h.raw.data.putOwned.mock.calls[2]![0] as PutOpts;
		const firstChannels = first.value.channels as Record<string, number>;
		const secondChannels = second.value.channels as Record<string, number>;
		expect(retry.expectedRevision).toBe(3);
		expect(retry.value.channels).toEqual({
			[CH1_KEY]: secondChannels[CH1_KEY],
			[CH2_KEY]: firstChannels[CH2_KEY],
		});
	} finally {
		vi.useRealTimers();
	}
});

test("a compacted unavailable cursor retry keeps a new channel's wanted maximum", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const cursors = h.find_watch("cursors", "me:user_me")!;
	const channels = h.find_watch("channels")!;
	const recent = h.find_recent("messages")!;
	const staleCursors = Object.fromEntries(Array.from({ length: 300 }, (_, index) => [`stale-${index}`, index]));
	h.raw.data.putOwned
		.mockResolvedValueOnce({ _nay: { name: "storage_full", message: "Cursor map is too large" } })
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Connection lost" } })
		.mockResolvedValueOnce({ _yay: { key: "me:user_me", revision: 4 } });
	recent.onUpdate(watch_update([message_doc(200, { channelKey: CH2_KEY })]));
	cursors.onUpdate(watch_update([cursor_doc({ [CH1_KEY]: 100, ...staleCursors }, 3)]));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#random/ }).className).toContain("is-unread"));

	vi.useFakeTimers();
	try {
		fireEvent.click(within(nav).getByRole("button", { name: /^#random/ }));
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2);
		const firstWanted = h.raw.data.putOwned.mock.calls[0]![0].value.channels as Record<string, number>;

		// The compacted call is waiting to retry. Add a channel now, then queue its mark into the
		// same flight. The timer must read this render's channel keys, not the older callback's list.
		await act(async () => {
			channels.onUpdate(
				watch_update([
					channel_doc(CH1_KEY, "general"),
					channel_doc(CH2_KEY, "random"),
					channel_doc(CH3_KEY, "project"),
				]),
			);
			recent.onUpdate(
				watch_update([message_doc(400, { channelKey: CH3_KEY }), message_doc(200, { channelKey: CH2_KEY })]),
			);
			await Promise.resolve();
			await Promise.resolve();
		});
		const project = within(nav).getByRole("button", { name: /^#project/ });
		expect(project.className).toContain("is-unread");
		fireEvent.click(project);
		await act(async () => {
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(3);
		const projectWanted = h.raw.data.putOwned.mock.calls[2]![0].value.channels as Record<string, number>;

		await act(async () => {
			await vi.advanceTimersByTimeAsync(250);
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(4);
		const retryChannels = h.raw.data.putOwned.mock.calls[3]![0].value.channels as Record<string, number>;
		expect(retryChannels[CH2_KEY]).toBe(firstWanted[CH2_KEY]);
		expect(retryChannels[CH3_KEY]).toBe(projectWanted[CH3_KEY]);
		expect(Object.keys(retryChannels).some((key) => key.startsWith("stale-"))).toBe(false);
	} finally {
		vi.useRealTimers();
	}
});

test("a definite public cursor refusal does not start a retry loop", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	h.find_recent("messages")!.onUpdate(watch_update([message_doc(200, { channelKey: CH2_KEY })]));
	h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([cursor_doc({}, 3)]));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#random/ }).className).toContain("is-unread"));
	h.raw.data.putOwned.mockResolvedValueOnce({ _nay: { name: "denied", message: "Write refused" } });

	vi.useFakeTimers();
	try {
		fireEvent.click(within(nav).getByRole("button", { name: /^#random/ }));
		await act(async () => {
			await Promise.resolve();
			await vi.advanceTimersByTimeAsync(10_000);
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1);
	} finally {
		vi.useRealTimers();
	}
});

test("a channel with nothing unread opens without the mark", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	// The cursor is past everything the feed holds, so the row carries no mark to begin with.
	h.find_recent("messages")!.onUpdate(
		watch_update([message_doc(2000, { channelKey: CH2_KEY, createdBy: "user_other", rand: "u1" })]),
	);
	h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([cursor_doc({ [CH2_KEY]: 5000 }, 3)]));
	const randomRow = await waitFor(() => within(nav).getByRole("button", { name: /^#random/ }));
	await waitFor(() => expect(randomRow.className).not.toContain("is-unread"));

	fireEvent.click(randomRow);
	const window2 = await waitFor(() => {
		const found = h.find_window("messages", `${CH2_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	window2.onUpdate(
		window_update([message_doc(2000, { channelKey: CH2_KEY, createdBy: "user_other", rand: "u1", text: "read one" })]),
	);
	await screen.findByText("read one");
	expect(document.querySelector(".new-divider")).toBeNull();
});

test("unread mentions of this member show as an amber count, on the row and on the Unreads view", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	// Two unread messages in #random name this member; a third names somebody else.
	h.find_recent("messages")!.onUpdate(
		watch_update([
			message_doc(3000, { channelKey: CH2_KEY, mentions: ["user_me"], rand: "m1", text: "hey @Me" }),
			message_doc(2000, { channelKey: CH2_KEY, mentions: ["user_me"], rand: "m2", text: "ping @Me" }),
			message_doc(1000, { channelKey: CH2_KEY, mentions: ["user_third"], rand: "m3" }),
		]),
	);
	h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([]));

	// The row shows the count badge instead of the plain dot.
	const randomRow = () => within(nav).getByRole("button", { name: /^#random/ });
	await waitFor(() => expect(randomRow().querySelector(".mention-badge")?.textContent).toContain("2"));
	expect(randomRow().querySelector(".unread-dot")).toBeNull();
	// The sidebar's Unreads row aggregates the same count.
	const unreadsRow = within(nav).getByRole("button", { name: /Unreads/ });
	expect(unreadsRow.querySelector(".mention-badge")?.textContent).toContain("2");

	// Opening the Unreads view shows the channel with its count and a preview, newest first.
	fireEvent.click(unreadsRow);
	const view = await screen.findByRole("region", { name: "Unreads" });
	const row = within(view).getByRole("button", { name: /^#random/ });
	expect(row.querySelector(".mention-badge")?.textContent).toContain("2");
	await waitFor(() => expect(row.querySelector(".view-row-preview")?.textContent).toContain("Bob: hey @Me"));

	// Choosing the row opens the channel.
	fireEvent.click(row);
	await waitFor(() =>
		expect(
			within(nav)
				.getByRole("button", { name: /^#random/ })
				.getAttribute("aria-current"),
		).toBe("page"),
	);
});

test("a conflicted cursor write retries once and carries BOTH cursors — the winner's and this page's", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	// #random is unread, and the member's map holds one other cursor at revision 3.
	h.find_recent("messages")!.onUpdate(watch_update([message_doc(2000, { channelKey: CH2_KEY })]));
	const cursors = h.find_watch("cursors", "me:user_me")!;
	cursors.onUpdate(watch_update([cursor_doc({ [CH3_KEY]: 500 }, 3)]));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#random/ }).className).toContain("is-unread"));

	// Another tab of the same member wins the race: the first write answers a conflict.
	h.raw.data.putOwned.mockResolvedValueOnce({ _nay: { name: "conflict", message: "Revision mismatch" } });
	fireEvent.click(within(nav).getByRole("button", { name: /^#random/ }));
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1));
	const first = h.raw.data.putOwned.mock.calls[0]![0] as PutOpts;
	expect(first.collection).toBe("cursors");
	expect(first.expectedRevision).toBe(3);

	// The watch delivers the winner: it moved the OTHER channel's cursor further than this page
	// ever knew.
	cursors.onUpdate(watch_update([cursor_doc({ [CH3_KEY]: 900 }, 7)]));

	// §16 Cursor map, app half: the retried write compares against the winner's revision and its
	// map carries BOTH cursors — the winner's newer entry and the one this click wanted. A plain
	// overwrite in either direction would move somebody's read state backwards.
	const retry = await waitFor(() => {
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2);
		return h.raw.data.putOwned.mock.calls[1]![0] as PutOpts;
	});
	expect(retry.expectedRevision).toBe(7);
	const retryChannels = retry.value.channels as Record<string, number>;
	expect(retryChannels[CH3_KEY]).toBe(900);
	expect(retryChannels[CH2_KEY]).toBeGreaterThanOrEqual(2000);
});

test("a newer cursor watch wins over an older successful write", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const cursors = h.find_watch("cursors", "me:user_me")!;
	const oldSuccess = deferred<WriteResult>();
	h.raw.data.putOwned
		.mockReturnValueOnce(oldSuccess.promise)
		.mockImplementationOnce(async (opts) =>
			opts.expectedRevision === 7
				? { _yay: { key: "me:user_me", revision: 8 } }
				: { _nay: { name: "conflict", message: "Revision mismatch" } },
		);

	h.find_recent("messages")!.onUpdate(watch_update([message_doc(200, { channelKey: CH2_KEY })]));
	cursors.onUpdate(watch_update([cursor_doc({ [CH3_KEY]: 500 }, 3)]));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#random/ }).className).toContain("is-unread"));
	fireEvent.click(within(nav).getByRole("button", { name: /^#random/ }));
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1));
	const first = h.raw.data.putOwned.mock.calls[0]![0] as PutOpts;
	expect(first.expectedRevision).toBe(3);

	// A different page advances the same map before this older success arrives. Keep the newer
	// revision and every cursor it carried when the next channel queues its own mark.
	const firstChannels = first.value.channels as Record<string, number>;
	cursors.onUpdate(watch_update([cursor_doc({ ...firstChannels, [CH3_KEY]: 900 }, 7)]));
	oldSuccess.resolve({ _yay: { key: "me:user_me", revision: 4 } });
	await act(async () => {
		await Promise.resolve();
		await Promise.resolve();
	});

	h.find_recent("messages")!.onUpdate(
		watch_update([
			message_doc(300, { channelKey: CH1_KEY, rand: "general-unread" }),
			message_doc(200, { channelKey: CH2_KEY }),
		]),
	);
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#general/ }).className).toContain("is-unread"));
	fireEvent.click(within(nav).getByRole("button", { name: /^#general/ }));
	const next = await waitFor(() => {
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2);
		return h.raw.data.putOwned.mock.calls[1]![0] as PutOpts;
	});
	expect(next.expectedRevision).toBe(7);
	const nextChannels = next.value.channels as Record<string, number>;
	expect(nextChannels[CH3_KEY]).toBe(900);
	expect(nextChannels[CH2_KEY]).toBe(firstChannels[CH2_KEY]);
	expect(nextChannels[CH1_KEY]).toBeGreaterThanOrEqual(300);
	expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2);
});

test("concurrent public cursor conflicts keep every pending channel at its newest cursor", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const cursors = h.find_watch("cursors", "me:user_me")!;
	const firstConflict = deferred<WriteResult>();
	const secondConflict = deferred<WriteResult>();
	h.raw.data.putOwned.mockReturnValueOnce(firstConflict.promise).mockReturnValueOnce(secondConflict.promise);

	// Both rows are unread. The stored #general cursor also makes the first wanted map overlap the
	// second one, so the retry must keep both channel keys and the larger #general value.
	h.find_recent("messages")!.onUpdate(
		watch_update([
			message_doc(300, { channelKey: CH1_KEY, rand: "general-unread" }),
			message_doc(200, { channelKey: CH2_KEY, rand: "random-unread" }),
		]),
	);
	cursors.onUpdate(watch_update([cursor_doc({ [CH1_KEY]: 100 }, 3)]));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#random/ }).className).toContain("is-unread"));

	// Keep both writes open until they have read the same revision.
	fireEvent.click(within(nav).getByRole("button", { name: /^#random/ }));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#general/ }).className).toContain("is-unread"));
	fireEvent.click(within(nav).getByRole("button", { name: /^#general/ }));
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2));
	const first = h.raw.data.putOwned.mock.calls[0]![0] as PutOpts;
	const second = h.raw.data.putOwned.mock.calls[1]![0] as PutOpts;
	expect(first.expectedRevision).toBe(3);
	expect(second.expectedRevision).toBe(3);
	const firstChannels = first.value.channels as Record<string, number>;
	const secondChannels = second.value.channels as Record<string, number>;
	expect(secondChannels[CH2_KEY]).toBeUndefined();
	expect(secondChannels[CH1_KEY]).toBeGreaterThan(firstChannels[CH1_KEY]!);

	await act(async () => {
		firstConflict.resolve({ _nay: { name: "conflict", message: "Revision mismatch" } });
		secondConflict.resolve({ _nay: { name: "conflict", message: "Revision mismatch" } });
		await Promise.resolve();
		await Promise.resolve();
	});
	expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2);

	// One winner delivery releases one retry. Its map must include both pending writes, with the
	// largest value for each channel, plus the winner's unrelated channel.
	cursors.onUpdate(watch_update([cursor_doc({ [CH1_KEY]: 150, [CH3_KEY]: 900 }, 7)]));
	const retry = await waitFor(() => {
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(3);
		return h.raw.data.putOwned.mock.calls[2]![0] as PutOpts;
	});
	expect(retry.expectedRevision).toBe(7);
	expect(retry.value.channels).toEqual({
		[CH1_KEY]: secondChannels[CH1_KEY],
		[CH2_KEY]: firstChannels[CH2_KEY],
		[CH3_KEY]: 900,
	});
});

test("watch-first public cursor conflicts keep all wants through another conflict", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const cursors = h.find_watch("cursors", "me:user_me")!;
	const firstConflict = deferred<WriteResult>();
	const secondConflict = deferred<WriteResult>();
	const retryConflict = deferred<WriteResult>();
	h.raw.data.putOwned
		.mockReturnValueOnce(firstConflict.promise)
		.mockReturnValueOnce(secondConflict.promise)
		.mockReturnValueOnce(retryConflict.promise)
		.mockResolvedValueOnce({ _yay: { key: "me:user_me", revision: 9 } });

	h.find_recent("messages")!.onUpdate(
		watch_update([message_doc(300, { channelKey: CH1_KEY }), message_doc(200, { channelKey: CH2_KEY })]),
	);
	cursors.onUpdate(watch_update([cursor_doc({ [CH1_KEY]: 100 }, 3)]));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#random/ }).className).toContain("is-unread"));

	// Start two writes from the same revision, then deliver the other tab's winner before either
	// conflict result. The retry runner must keep the second wanted map while the first retry runs.
	fireEvent.click(within(nav).getByRole("button", { name: /^#random/ }));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#general/ }).className).toContain("is-unread"));
	fireEvent.click(within(nav).getByRole("button", { name: /^#general/ }));
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2));
	const first = h.raw.data.putOwned.mock.calls[0]![0] as PutOpts;
	const second = h.raw.data.putOwned.mock.calls[1]![0] as PutOpts;
	const firstChannels = first.value.channels as Record<string, number>;
	const secondChannels = second.value.channels as Record<string, number>;
	cursors.onUpdate(watch_update([cursor_doc({ [CH1_KEY]: 150, [CH3_KEY]: 900 }, 7)]));
	await act(async () => {
		firstConflict.resolve({ _nay: { name: "conflict", message: "Revision mismatch" } });
		secondConflict.resolve({ _nay: { name: "conflict", message: "Revision mismatch" } });
		await Promise.resolve();
		await Promise.resolve();
	});
	const firstRetry = await waitFor(() => {
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(3);
		return h.raw.data.putOwned.mock.calls[2]![0] as PutOpts;
	});
	expect(firstRetry.expectedRevision).toBe(7);
	expect(firstRetry.value.channels).toEqual({
		[CH1_KEY]: 150,
		[CH2_KEY]: firstChannels[CH2_KEY],
		[CH3_KEY]: 900,
	});

	// A newer winner arrives while that one retry is open. Its conflict must put the in-flight map
	// back beside the queued map, then continue from the latest revision with every per-key maximum.
	cursors.onUpdate(watch_update([cursor_doc({ [CH1_KEY]: 175, [CH3_KEY]: 950 }, 8)]));
	await act(async () => {
		retryConflict.resolve({ _nay: { name: "conflict", message: "Revision mismatch" } });
		await Promise.resolve();
		await Promise.resolve();
	});
	const finalRetry = await waitFor(() => {
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(4);
		return h.raw.data.putOwned.mock.calls[3]![0] as PutOpts;
	});
	expect(finalRetry.expectedRevision).toBe(8);
	expect(finalRetry.value.channels).toEqual({
		[CH1_KEY]: secondChannels[CH1_KEY],
		[CH2_KEY]: firstChannels[CH2_KEY],
		[CH3_KEY]: 950,
	});
});

test("a conflicted public cursor retry compacts after storage_full without losing queued marks", async () => {
	const h = make_harness();
	await boot_sidebar(h, [
		channel_doc(CH1_KEY, "general"),
		channel_doc(CH2_KEY, "random"),
		channel_doc(CH3_KEY, "project"),
	]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const cursors = h.find_watch("cursors", "me:user_me")!;
	const retryCapacity = deferred<WriteResult>();
	h.raw.data.putOwned
		.mockResolvedValueOnce({ _nay: { name: "conflict", message: "Revision mismatch" } })
		.mockReturnValueOnce(retryCapacity.promise)
		.mockResolvedValueOnce({ _nay: { name: "conflict", message: "Revision mismatch" } })
		.mockResolvedValueOnce({ _yay: { key: "me:user_me", revision: 8 } });
	const staleCursors = Object.fromEntries(Array.from({ length: 300 }, (_, index) => [`stale-${index}`, index]));

	h.find_recent("messages")!.onUpdate(
		watch_update([message_doc(300, { channelKey: CH1_KEY }), message_doc(200, { channelKey: CH2_KEY })]),
	);
	cursors.onUpdate(watch_update([cursor_doc({ [CH1_KEY]: 100, ...staleCursors }, 3)]));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#random/ }).className).toContain("is-unread"));

	// The first mark conflicts. Its winner is still near the value limit, so the queued retry is
	// allowed to reach the server and fail with storage_full.
	fireEvent.click(within(nav).getByRole("button", { name: /^#random/ }));
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1));
	const firstWanted = h.raw.data.putOwned.mock.calls[0]![0].value.channels as Record<string, number>;
	cursors.onUpdate(watch_update([cursor_doc({ [CH1_KEY]: 150, [CH3_KEY]: 900, ...staleCursors }, 7)]));
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2));

	// Queue another channel while that oversized retry is open. Cleanup must carry both wanted
	// maxima, keep the winner's live channel, and remove only stale channel keys.
	fireEvent.click(within(nav).getByRole("button", { name: /^#general/ }));
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(3));
	const secondWanted = h.raw.data.putOwned.mock.calls[2]![0].value.channels as Record<string, number>;
	await act(async () => {
		retryCapacity.resolve({ _nay: { name: "storage_full", message: "Cursor map is too large" } });
		await Promise.resolve();
		await Promise.resolve();
	});

	const compactedRetry = await waitFor(() => {
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(4);
		return h.raw.data.putOwned.mock.calls[3]![0] as PutOpts;
	});
	expect(compactedRetry.expectedRevision).toBe(7);
	expect(compactedRetry.value.channels).toEqual({
		[CH1_KEY]: secondWanted[CH1_KEY],
		[CH2_KEY]: firstWanted[CH2_KEY],
		[CH3_KEY]: 900,
	});
});

test("concurrent capacity cleanup keeps both channel marks after a conflict", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const cursors = h.find_watch("cursors", "me:user_me")!;
	const firstCapacity = deferred<WriteResult>();
	const secondCapacity = deferred<WriteResult>();
	const compactedConflict = deferred<WriteResult>();
	h.raw.data.putOwned
		.mockReturnValueOnce(firstCapacity.promise)
		.mockReturnValueOnce(secondCapacity.promise)
		.mockReturnValueOnce(compactedConflict.promise)
		.mockResolvedValueOnce({ _yay: { key: "me:user_me", revision: 5 } });
	const staleCursors = Object.fromEntries(Array.from({ length: 300 }, (_, index) => [`stale-${index}`, index]));

	h.find_recent("messages")!.onUpdate(
		watch_update([message_doc(300, { channelKey: CH1_KEY }), message_doc(200, { channelKey: CH2_KEY })]),
	);
	cursors.onUpdate(watch_update([cursor_doc({ [CH1_KEY]: 100, ...staleCursors }, 3)]));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#random/ }).className).toContain("is-unread"));

	// Start two maps from the same oversized revision. Each map wants a different unread channel.
	fireEvent.click(within(nav).getByRole("button", { name: /^#random/ }));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#general/ }).className).toContain("is-unread"));
	fireEvent.click(within(nav).getByRole("button", { name: /^#general/ }));
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2));
	const firstWanted = h.raw.data.putOwned.mock.calls[0]![0].value.channels as Record<string, number>;
	const secondWanted = h.raw.data.putOwned.mock.calls[1]![0].value.channels as Record<string, number>;

	// Both first writes hit the size ceiling. One single-flight cleanup holds both wanted maps.
	firstCapacity.resolve({ _nay: { name: "storage_full", message: "Cursor map is too large" } });
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(3));
	secondCapacity.resolve({ _nay: { name: "storage_full", message: "Cursor map is too large" } });
	await act(async () => {
		await Promise.resolve();
		await Promise.resolve();
	});
	expect(h.raw.data.putOwned).toHaveBeenCalledTimes(3);
	const firstClean = h.raw.data.putOwned.mock.calls[2]![0] as PutOpts;
	expect(firstClean.expectedRevision).toBe(3);
	expect(firstClean.value.channels).toEqual({ [CH1_KEY]: firstWanted[CH1_KEY], [CH2_KEY]: firstWanted[CH2_KEY] });

	// A conflict puts that cleanup back beside the second wanted map. The winner watch then releases
	// one compacted retry with the newest mark for each channel.
	await act(async () => {
		compactedConflict.resolve({ _nay: { name: "conflict", message: "Revision mismatch" } });
		await Promise.resolve();
		await Promise.resolve();
	});
	expect(h.raw.data.putOwned).toHaveBeenCalledTimes(3);
	cursors.onUpdate(watch_update([cursor_doc({ [CH1_KEY]: 150 }, 4)]));
	const finalRetry = await waitFor(() => {
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(4);
		return h.raw.data.putOwned.mock.calls[3]![0] as PutOpts;
	});
	expect(finalRetry.expectedRevision).toBe(4);
	expect(finalRetry.value.channels).toEqual({
		[CH1_KEY]: secondWanted[CH1_KEY],
		[CH2_KEY]: firstWanted[CH2_KEY],
	});
});

test("a private channel's cursor is written inside its scope range, and the public map never holds a p/ key", async () => {
	const h = make_harness();
	await boot_sidebar(
		h,
		[channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random"), channel_doc(PRIVATE_KEY, "secret-plans")],
		[PRIVATE_KEY],
	);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	// Durable scope activity is newer than this member's missing cursor.
	h.send_scopes([private_scope([{ collection: "messages", at: 5_000, createdByUserId: "user_other" }])]);
	const privateRow = () => within(nav).getByRole("button", { name: /^#secret-plans/ });
	await waitFor(() => expect(privateRow().className).toContain("is-unread"));

	// Open an unread PUBLIC channel first, so the public map really is written in this test and
	// the leak assertion below checks a write that exists. Wait for the mark: the click writes a
	// cursor only for a channel the page itself shows as unread.
	h.find_recent("messages")!.onUpdate(watch_update([message_doc(2000, { channelKey: CH2_KEY })]));
	h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([]));
	await waitFor(() => expect(within(nav).getByRole("button", { name: /^#random/ }).className).toContain("is-unread"));
	fireEvent.click(within(nav).getByRole("button", { name: /^#random/ }));
	await waitFor(() =>
		expect((h.raw.data.putOwned.mock.calls as [PutOpts][]).some(([opts]) => opts.collection === "cursors")).toBe(true),
	);

	// Now open the private channel.
	fireEvent.click(privateRow());
	const writes = await waitFor(() => {
		const all = (h.raw.data.putOwned.mock.calls as [PutOpts][]).map(([opts]) => opts);
		expect(all.some((opts) => opts.collection === "channels")).toBe(true);
		return all;
	});
	// The private cursor lives INSIDE the scope's key range, riding the reads that already exist.
	const privateWrite = writes.find((opts) => opts.collection === "channels")!;
	expect(privateWrite.key).toBe(`${PRIVATE_KEY}:read`);
	expect(typeof (privateWrite.value as { at?: unknown }).at).toBe("number");
	// The leak assertion: a `p/` key in the workspace-readable cursor map would tell every member
	// the channel exists, so no public map write may ever carry one.
	for (const opts of writes.filter((entry) => entry.collection === "cursors")) {
		const channelKeys = Object.keys((opts.value as { channels: Record<string, number> }).channels);
		expect(channelKeys.some((key) => key.startsWith("p/"))).toBe(false);
	}
});

test("two private mark-reads use the returned revision and keep the newest timestamp", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const messageWindow = await waitFor(() => {
		const found = h.find_window("messages", `${PRIVATE_KEY}:`);
		expect(found).toBeTruthy();
		return found!;
	});
	const firstWrite = deferred<WriteResult>();
	h.raw.data.putOwned.mockReturnValueOnce(firstWrite.promise);

	vi.useFakeTimers();
	try {
		await act(async () => {
			messageWindow.onUpdate(
				window_update([message_doc(5_000, { channelKey: PRIVATE_KEY, rand: "first", text: "first" })]),
			);
			await Promise.resolve();
			await Promise.resolve();
		});
		await act(async () => {
			await vi.advanceTimersByTimeAsync(2_500);
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1);

		await act(async () => {
			messageWindow.onUpdate(
				window_update([message_doc(7_000, { channelKey: PRIVATE_KEY, rand: "latest", text: "latest" })]),
			);
			await Promise.resolve();
			await Promise.resolve();
		});
		await act(async () => {
			await vi.advanceTimersByTimeAsync(2_500);
		});
		// The second mark waits. It must not reuse revision 0 while the first write is open.
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1);

		await act(async () => {
			firstWrite.resolve({ _yay: { key: `${PRIVATE_KEY}:read`, revision: 11 } });
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2);
		const second = h.raw.data.putOwned.mock.calls[1]![0] as PutOpts;
		expect(second.expectedRevision).toBe(11);
		expect(second.value).toEqual({ at: 7_000, activity: { messages: 0, replies: 0 } });
	} finally {
		vi.useRealTimers();
	}
});

test.each(["unavailable", "throw"] as const)(
	"a private cursor %s retries without a watch and keeps the newest timestamp",
	async (mode) => {
		const h = make_harness();
		await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
		const messageWindow = await waitFor(() => {
			const found = h.find_window("messages", `${PRIVATE_KEY}:`);
			expect(found).toBeTruthy();
			return found!;
		});
		const firstWrite = deferred<WriteResult>();
		h.raw.data.putOwned
			.mockReturnValueOnce(firstWrite.promise)
			.mockResolvedValueOnce({ _yay: { key: `${PRIVATE_KEY}:read`, revision: 1 } });

		vi.useFakeTimers();
		try {
			for (const at of [5_000, 7_000]) {
				await act(async () => {
					messageWindow.onUpdate(
						window_update([message_doc(at, { channelKey: PRIVATE_KEY, rand: String(at), text: String(at) })]),
					);
					await Promise.resolve();
					await Promise.resolve();
				});
				await act(async () => {
					await vi.advanceTimersByTimeAsync(2_500);
				});
			}
			expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1);

			await act(async () => {
				if (mode === "unavailable") {
					firstWrite.resolve({ _nay: { name: "unavailable", message: "Connection lost" } });
				} else {
					firstWrite.reject(new Error("Connection lost"));
				}
				await Promise.resolve();
				await Promise.resolve();
				await vi.advanceTimersByTimeAsync(250);
			});
			expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2);
			const retry = h.raw.data.putOwned.mock.calls[1]![0] as PutOpts;
			expect(retry.expectedRevision).toBe(0);
			expect(retry.value).toEqual({ at: 7_000, activity: { messages: 0, replies: 0 } });
		} finally {
			vi.useRealTimers();
		}
	},
);

test("a conflicted private mark-read merges both sequence components from the scope watch", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const firstWrite = deferred<WriteResult>();
	h.raw.data.putOwned.mockReturnValueOnce(firstWrite.promise);

	vi.useFakeTimers();
	try {
		await act(async () => {
			h.send_scopes([
				private_scope([
					{ collection: "messages", at: 7_000, createdByUserId: "user_other", sequence: 2 },
					{ collection: "replies", at: 6_500, createdByUserId: "user_other", sequence: 3 },
				]),
			]);
			await Promise.resolve();
			await Promise.resolve();
		});
		await act(async () => {
			await vi.advanceTimersByTimeAsync(2_500);
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1);

		await act(async () => {
			firstWrite.resolve({ _nay: { name: "conflict", message: "Document changed" } });
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1);

		await act(async () => {
			h.find_watch("channels", PRIVATE_KEY)!.onUpdate(
				watch_update([
					channel_doc(PRIVATE_KEY, "secret-plans"),
					private_cursor_doc(PRIVATE_KEY, 6_000, 11, { messages: 5, replies: 1 }),
				]),
			);
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2);
		const retry = h.raw.data.putOwned.mock.calls[1]![0] as PutOpts;
		expect(retry.expectedRevision).toBe(11);
		expect(retry.value).toEqual({ at: 7_000, activity: { messages: 5, replies: 3 } });
	} finally {
		vi.useRealTimers();
	}
});

test("a conflicted private mark-read refreshes after its ninth-scope watch closes", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	h.send_scopes([private_scope([{ collection: "messages", at: 7_000, createdByUserId: "user_other" }])]);

	// Eight earlier ids make the selected channel ninth. Selection keeps its ranged read only until
	// navigation returns the watch budget to the stable first eight.
	const earlierKeys = Array.from({ length: 8 }, (_, index) => `p/00000000-0000-4000-8000-00000000000${index}`);
	const firstWrite = deferred<WriteResult>();
	h.raw.data.putOwned
		.mockReturnValueOnce(firstWrite.promise)
		.mockResolvedValueOnce({ _yay: { key: `${PRIVATE_KEY}:read`, revision: 22 } });
	let readAttempts = 0;
	h.raw.fetchJson.mockImplementation(async (path: string) => {
		if (path === "/api/v1/plugin-data/read") {
			readAttempts += 1;
			if (readAttempts === 1) {
				throw new Error("Connection lost");
			}
			return {
				document: private_cursor_doc(PRIVATE_KEY, 6_000, 11, { messages: 0, replies: 4 }),
			};
		}
		if (path === "/api/v1/plugin-data/list") {
			return { documents: [], cursor: null, isDone: true };
		}
		throw new Error("fetchJson not stubbed");
	});

	vi.useFakeTimers();
	try {
		vi.setSystemTime(7_000);
		await act(async () => {
			fireEvent.click(within(nav).getByRole("button", { name: /^#secret-plans/ }));
			await Promise.resolve();
			await Promise.resolve();
			h.send_scopes(
				[...earlierKeys, PRIVATE_KEY].map((key) => ({
					scopeId: key,
					keyPrefix: key,
					collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
					level: "manage" as const,
				})),
			);
			await Promise.resolve();
			await Promise.resolve();
			const selectedWatch = h.find_watch("channels", PRIVATE_KEY);
			expect(selectedWatch).toBeTruthy();
			selectedWatch!.onUpdate(watch_update([channel_doc(PRIVATE_KEY, "secret-plans")]));
			await vi.advanceTimersByTimeAsync(2_000);
		});
		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1);

		await act(async () => {
			fireEvent.click(within(nav).getByRole("button", { name: "#general" }));
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(h.find_watch("channels", PRIVATE_KEY)).toBeUndefined();
		expect(
			h.watches.filter(
				(sub) => !sub.unsubscribed && sub.opts.collection === "channels" && sub.opts.keyPrefix !== undefined,
			),
		).toHaveLength(8);

		await act(async () => {
			firstWrite.resolve({ _nay: { name: "conflict", message: "Document changed" } });
			await Promise.resolve();
			await Promise.resolve();
		});
		expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1);
		expect(file_calls(h, "/api/v1/plugin-data/read")[0]![1]?.body).toEqual({
			collection: "channels",
			key: `${PRIVATE_KEY}:read:user_me`,
		});

		await act(async () => {
			await vi.advanceTimersByTimeAsync(249);
		});
		expect(file_calls(h, "/api/v1/plugin-data/read")).toHaveLength(1);
		await act(async () => {
			await vi.advanceTimersByTimeAsync(1);
		});

		expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2);
		expect(h.raw.data.putOwned.mock.calls[1]![0]).toEqual({
			collection: "channels",
			key: `${PRIVATE_KEY}:read`,
			value: { at: 7_000, activity: { messages: 1, replies: 4 } },
			expectedRevision: 11,
		});
		expect(h.find_watch("channels", PRIVATE_KEY)).toBeUndefined();
	} finally {
		vi.useRealTimers();
	}
});

test("a legacy private cursor upgrades by CAS and cannot hide durable sequence activity", async () => {
	const h = make_harness();
	await boot_sidebar(
		h,
		[channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans", null, { lastMessageAt: 5000 })],
		[PRIVATE_KEY],
	);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const privateRow = () => within(nav).getByRole("button", { name: /^#secret-plans/ });
	// Old channel values are opaque. Only the scope marker can make this row unread.
	await waitFor(() => expect(privateRow().className).not.toContain("is-unread"));
	h.send_scopes([private_scope([{ collection: "messages", at: 5_000, createdByUserId: "user_other" }])]);
	await waitFor(() => expect(privateRow().className).toContain("is-unread"));

	// A legacy time-only cursor maps to zero sequences. Its later time cannot hide the append.
	h.find_watch("channels", PRIVATE_KEY)!.onUpdate(
		watch_update([
			channel_doc(PRIVATE_KEY, "secret-plans", null, { lastMessageAt: 5000 }),
			legacy_private_cursor_doc(PRIVATE_KEY, 6000),
		]),
	);
	await waitFor(() => expect(privateRow().className).toContain("is-unread"));

	// Opening upgrades the old doc at its current revision. Keep its later divider time while the
	// durable sequence becomes covered.
	fireEvent.click(privateRow());
	const upgrade = await waitFor(() => {
		const found = (h.raw.data.putOwned.mock.calls as [PutOpts][])
			.map(([opts]) => opts)
			.find((opts) => opts.collection === "channels" && opts.key === `${PRIVATE_KEY}:read`);
		expect(found).toBeTruthy();
		return found!;
	});
	expect(upgrade).toMatchObject({
		expectedRevision: 1,
		value: { at: 6_000, activity: { messages: 1, replies: 0 } },
	});
	expect([...nav.querySelectorAll(".channel-list .channel-name")].map((name) => name.textContent)).toEqual([
		"#general",
		"#secret-plans (private)",
	]);
});

test("the Threads view reads the replies feed only while it is open, and a row opens its channel", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	expect(h.find_recent("replies")).toBeUndefined();

	fireEvent.click(within(nav).getByRole("button", { name: "Threads" }));
	const repliesFeed = await waitFor(() => {
		const found = h.find_recent("replies");
		expect(found).toBeTruthy();
		return found!;
	});
	expect(repliesFeed.opts.order).toBe("desc");

	// Two replies under one root in #random: one row, counted, newest time shown.
	const rootTail = `${inv(3000)}:root`;
	repliesFeed.onUpdate(
		watch_update([
			{
				collection: "replies",
				key: `${CH2_KEY}:${rootTail}:${inv(3600)}:r2`,
				value: { text: "second", attachments: [], editedAt: null, deletedAt: null },
				revision: 1,
				createdBy: "user_other",
				updatedBy: "user_other",
				ownership: "owned",
				createdAt: 3600,
				updatedAt: 3600,
			},
			{
				collection: "replies",
				key: `${CH2_KEY}:${rootTail}:${inv(3500)}:r1`,
				value: { text: "first", attachments: [], editedAt: null, deletedAt: null },
				revision: 1,
				createdBy: "user_third",
				updatedBy: "user_third",
				ownership: "owned",
				createdAt: 3500,
				updatedAt: 3500,
			},
		]),
	);
	const view = await screen.findByRole("region", { name: "Threads" });
	const row = await waitFor(() => within(view).getByRole("button", { name: /^#random/ }));
	expect(row.textContent).toContain("2 replies");

	// Choosing the row opens the channel, and the view's feed subscription is released with it.
	fireEvent.click(row);
	await waitFor(() =>
		expect(
			within(nav)
				.getByRole("button", { name: /^#random/ })
				.getAttribute("aria-current"),
		).toBe("page"),
	);
	expect(h.find_recent("replies")).toBeUndefined();
});

test("the Activity view groups the public feed by channel and emphasises mentions of this member", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	h.find_recent("messages")!.onUpdate(
		watch_update([
			message_doc(4000, { channelKey: CH2_KEY, text: "for @Me", mentions: ["user_me"], rand: "a1" }),
			message_doc(3000, { channelKey: CH2_KEY, text: "plain", rand: "a2" }),
			message_doc(2000, { channelKey: CH1_KEY, text: "older", rand: "a3" }),
			message_doc(1500, { channelKey: CH2_KEY, text: "gone", deletedAt: 1600, rand: "a4" }),
		]),
	);
	fireEvent.click(within(nav).getByRole("button", { name: "Activity" }));
	const view = await screen.findByRole("region", { name: "Activity" });

	// Newest first, grouped under channel headers; the tombstone never appears.
	const headers = [...view.querySelectorAll(".view-group-title")].map((title) => title.textContent);
	expect(headers).toEqual(["#random", "#general"]);
	expect(within(view).queryByText("gone")).toBeNull();
	// The mention of this member takes the amber emphasis; the plain row does not.
	const mentionRow = within(view).getByText("for @Me").closest(".view-row")!;
	expect(mentionRow.className).toContain("mention-self");
	expect(within(view).getByText("plain").closest(".view-row")!.className).not.toContain("mention-self");
	// The view says its own boundary out loud.
	expect(within(view).getByText(/Private channels are not shown here/)).toBeTruthy();
});

test("terminal Unreads, Activity, and Threads feeds tell the member to reload", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	h.find_recent("messages")!.onUpdate(null, { reason: "unavailable" } satisfies WatchDeathInfo);

	for (const name of ["Unreads", "Activity"] as const) {
		fireEvent.click(within(nav).getByRole("button", { name }));
		const view = await screen.findByRole("region", { name });
		expect(within(view).getByRole("alert").textContent).toMatch(/reload/iu);
	}

	fireEvent.click(within(nav).getByRole("button", { name: "Threads" }));
	const repliesFeed = await waitFor(() => {
		const found = h.find_recent("replies");
		expect(found).toBeTruthy();
		return found!;
	});
	repliesFeed.onUpdate(null, { reason: "denied" } satisfies WatchDeathInfo);
	const threads = await screen.findByRole("region", { name: "Threads" });
	expect(within(threads).getByRole("alert").textContent).toMatch(/reload/iu);
});

test("the sidebar watches at most 8 private scopes and says how many are hidden", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general")]);

	const keys = Array.from({ length: 9 }, (_, index) => `p/55555555-5555-4555-8555-55555555555${index}`);
	h.send_scopes(
		keys.map((key) => ({
			scopeId: key,
			keyPrefix: key,
			collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
			level: "member" as const,
		})),
	);
	// Exactly 8 ranged reads open — the slot arithmetic — and the ninth scope is named, not
	// silently dropped.
	await waitFor(() =>
		expect(
			h.watches.filter(
				(sub) => !sub.unsubscribed && sub.opts.collection === "channels" && sub.opts.keyPrefix !== undefined,
			),
		).toHaveLength(8),
	);
	expect(screen.getByText(/8 private channels at a time; 1 more is hidden/)).toBeTruthy();
});

test("the composer's @-menu stores the member's id, and Enter picks before it sends", async () => {
	const h = make_harness();
	await boot(h);
	const textarea = composer_box("Message #general");

	// Typing "@" asks for the roster (lazily — nothing was fetched on mount) and opens the menu
	// without this member in it.
	expect(h.raw.members.list).not.toHaveBeenCalled();
	type_in_composer(textarea, "Hi @");
	await waitFor(() => expect(h.raw.members.list).toHaveBeenCalledTimes(1));
	expect(h.raw.members.list.mock.calls[0]![0]).toEqual({ limit: 100 });
	const options = await screen.findAllByRole("option");
	expect(options.map((option) => option.textContent)).toEqual(["Bob", "Cleo"]);

	type_in_composer(textarea, "Hi @ob");
	await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));
	expect(screen.getByRole("option").textContent).toBe("Bob");

	// Enter while the menu is open picks — it must not send.
	fireEvent.keyDown(textarea, { key: "Enter" });
	expect(h.raw.backend.invoke).not.toHaveBeenCalled();
	await waitFor(() => expect(textarea.value).toBe("Hi @Bob "));

	// The next Enter sends, and the stored mention is the member's ID, not the display name —
	// a rename must not orphan old mentions' targets.
	fireEvent.keyDown(textarea, { key: "Enter" });
	const send = await waitFor(() => {
		expect(invoke_calls(h, "message-send")).toHaveLength(1);
		return invoke_calls(h, "message-send")[0]!;
	});
	expect(send.input.text).toBe("Hi @Bob");
	expect(send.input.mentions).toEqual(["user_other"]);
});

test("a pointer press in the textarea closes the @-menu, so Enter sends instead of picking", async () => {
	const h = make_harness();
	await boot(h);
	const textarea = composer_box("Message #general");

	type_in_composer(textarea, "Hi @ob");
	await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));

	// The press moves the caret away from the "@word". The menu must close with it — the closing
	// path runs through the store's setOpen, the same path Ariakit's own dismissals use — or the
	// next Enter would pick from a menu the user already left.
	fireEvent.pointerDown(textarea);
	fireEvent.keyDown(textarea, { key: "Enter" });
	const send = await waitFor(() => {
		expect(invoke_calls(h, "message-send")).toHaveLength(1);
		return invoke_calls(h, "message-send")[0]!;
	});
	expect(send.input.text).toBe("Hi @ob");
	expect(send.input.mentions).toEqual([]);
});

test("moving the caret with an arrow key closes the @-menu, so Enter sends instead of picking", async () => {
	const h = make_harness();
	await boot(h);
	const textarea = composer_box("Message #general");

	type_in_composer(textarea, "Hi @ob");
	await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));

	fireEvent.keyDown(textarea, { key: "ArrowLeft" });
	fireEvent.keyDown(textarea, { key: "Enter" });
	const send = await waitFor(() => {
		expect(invoke_calls(h, "message-send")).toHaveLength(1);
		return invoke_calls(h, "message-send")[0]!;
	});
	expect(send.input.text).toBe("Hi @ob");
	expect(send.input.mentions).toEqual([]);
});

test("a roster refusal is not cached for later composers", async () => {
	const h = make_harness();
	h.raw.members.list.mockResolvedValueOnce({
		_nay: { name: "unavailable", message: "The member list is unavailable right now" },
	});
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const textarea = composer_box("Message #general");

	// The first "@" hits the transient refusal and shows the generic copy.
	type_in_composer(textarea, "@");
	await waitFor(() => expect(h.raw.members.list).toHaveBeenCalledTimes(1));
	const menu = await screen.findByRole("listbox", { name: "Mention somebody" });
	expect(within(menu).getByRole("status").textContent).toBe(chat_mention_roster_refusal_copy("unavailable"));

	// ChannelView remounts on a switch, so #random gets a fresh composer. It must ask again
	// instead of reusing one transient refusal for the page's whole life.
	fireEvent.click(screen.getByRole("button", { name: "#random" }));
	const reopened = composer_box("Message #random");
	type_in_composer(reopened, "@");
	await waitFor(() => expect(h.raw.members.list).toHaveBeenCalledTimes(2));
	expect((await screen.findAllByRole("option")).map((option) => option.textContent)).toEqual(["Bob", "Cleo"]);
});

test("a later roster-page refusal shows no partial roster and retries from page one", async () => {
	const h = make_harness();
	h.raw.members.list
		.mockResolvedValueOnce({
			_yay: { members: [{ userId: "user_a", displayName: "Ada" }], cursor: "page_2" },
		})
		.mockResolvedValueOnce({
			_nay: { name: "unavailable", message: "The member list is unavailable right now" },
		})
		.mockResolvedValueOnce({
			_yay: {
				members: [
					{ userId: "user_a", displayName: "Ada" },
					{ userId: "user_b", displayName: "Bea" },
				],
				cursor: null,
			},
		});
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const textarea = composer_box("Message #general");

	type_in_composer(textarea, "@");
	await waitFor(() => expect(h.raw.members.list).toHaveBeenCalledTimes(2));
	const menu = await screen.findByRole("listbox", { name: "Mention somebody" });
	await waitFor(() =>
		expect(within(menu).getByRole("status").textContent).toBe(chat_mention_roster_refusal_copy("unavailable")),
	);
	expect(within(menu).queryAllByRole("option")).toHaveLength(0);

	// A new composer must start from page one instead of caching Ada from the failed attempt.
	fireEvent.click(screen.getByRole("button", { name: "#random" }));
	const reopened = composer_box("Message #random");
	type_in_composer(reopened, "@");
	expect((await screen.findAllByRole("option")).map((option) => option.textContent)).toEqual(["Ada", "Bea"]);
	expect(h.raw.members.list.mock.calls.map((call) => call[0])).toEqual([
		{ limit: 100 },
		{ limit: 100, cursor: "page_2" },
		{ limit: 100 },
	]);
});

test("the @-menu shows a short explanation when the roster is not_consented, and the send carries no mentions", async () => {
	const h = make_harness();
	h.raw.members.list.mockResolvedValueOnce({
		_nay: { name: "not_consented", message: "This workspace has not granted this plugin the member list" },
	});
	await boot(h);
	const textarea = composer_box("Message #general");

	type_in_composer(textarea, "ping @B");
	await waitFor(() => expect(h.raw.members.list).toHaveBeenCalledTimes(1));
	const menu = await screen.findByRole("listbox", { name: "Mention somebody" });
	expect(within(menu).queryAllByRole("option")).toHaveLength(0);
	expect(within(menu).getByRole("status").textContent).toBe(chat_mention_roster_refusal_copy("not_consented"));

	// Escape closes the explanation; the next Enter sends the typed words as plain text.
	fireEvent.keyDown(textarea, { key: "Escape" });
	fireEvent.keyDown(textarea, { key: "Enter" });
	const send = await waitFor(() => {
		expect(invoke_calls(h, "message-send")).toHaveLength(1);
		return invoke_calls(h, "message-send")[0]!;
	});
	expect(send.input.text).toBe("ping @B");
	expect(send.input.mentions).toEqual([]);
});

test("a member with no display name is offered under the anonymous fallback, and send stores their id", async () => {
	const h = make_harness();
	h.raw.members.list.mockResolvedValueOnce({
		_yay: {
			members: [
				{ userId: "user_me", displayName: "Me" },
				{ userId: "user_anon", displayName: null },
			],
			cursor: null,
		},
	});
	await boot(h);
	const textarea = composer_box("Message #general");

	type_in_composer(textarea, "@");
	expect((await screen.findByRole("option")).textContent).toBe(chat_ANONYMOUS_MEMBER_LABEL);

	fireEvent.keyDown(textarea, { key: "Enter" });
	await waitFor(() => expect(textarea.value).toBe(`@${chat_ANONYMOUS_MEMBER_LABEL} `));
	fireEvent.keyDown(textarea, { key: "Enter" });
	const send = await waitFor(() => {
		expect(invoke_calls(h, "message-send")).toHaveLength(1);
		return invoke_calls(h, "message-send")[0]!;
	});
	expect(send.input.mentions).toEqual(["user_anon"]);
});

test("the roster is paged once per session and not fetched again on later @ keystrokes", async () => {
	const h = make_harness();
	h.raw.members.list
		.mockResolvedValueOnce({
			_yay: { members: [{ userId: "user_a", displayName: "Ada" }], cursor: "page_2" },
		})
		.mockResolvedValueOnce({
			_yay: { members: [{ userId: "user_b", displayName: "Bea" }], cursor: null },
		});
	await boot(h);
	const textarea = composer_box("Message #general");

	type_in_composer(textarea, "@");
	const options = await screen.findAllByRole("option");
	expect(options.map((option) => option.textContent)).toEqual(["Ada", "Bea"]);
	expect(h.raw.members.list.mock.calls.map((call) => call[0])).toEqual([
		{ limit: 100 },
		{ limit: 100, cursor: "page_2" },
	]);

	fireEvent.keyDown(textarea, { key: "Escape" });
	type_in_composer(textarea, "later @");
	await screen.findAllByRole("option");
	expect(h.raw.members.list).toHaveBeenCalledTimes(2);
});

test("a mention renders as a span, and a mention of this member takes the amber emphasis", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([message_doc(1000, { text: "hey @Me and @Bob", mentions: ["user_me", "user_other"] })]),
	);

	// The spans appear once the mentioned names resolve.
	const selfMention = await waitFor(() => {
		const found = document.querySelector(".mention.mention-self");
		expect(found).toBeTruthy();
		return found!;
	});
	expect(selfMention.textContent).toBe("@Me");
	// The other member's mention is marked but not amber: the emphasis means "this names YOU".
	const mentions = [...document.querySelectorAll(".message-text .mention")];
	expect(mentions.map((span) => span.textContent)).toEqual(["@Me", "@Bob"]);
	expect(mentions[1]!.className).not.toContain("mention-self");
});

function private_scope(appendActivity: ScopeFixture["appendActivity"] = [], scopeId = PRIVATE_KEY): ScopeFixture {
	return {
		scopeId,
		keyPrefix: scopeId,
		collections: [...chat_PRIVATE_CHANNEL_COLLECTIONS],
		level: "manage",
		appendActivity,
	};
}

async function open_private_composer(h: ReturnType<typeof make_harness>) {
	// `boot_sidebar` already waited out the open reconcile. The stub stays for the click below,
	// which reconciles again only when the channel was not selected yet.
	return await without_open_reconcile(
		h,
		async () => {
			const utils = await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
			const nav = screen.getByRole("navigation", { name: "Channels" });
			fireEvent.click(within(nav).getByRole("button", { name: /^#secret-plans/ }));
			const messageWindow = await waitFor(() => {
				const found = h.find_window("messages", `${PRIVATE_KEY}:`);
				expect(found).toBeTruthy();
				return found!;
			});
			messageWindow.onUpdate(window_update([]));
			return {
				unmount: utils.unmount,
				textarea: screen.getByRole("combobox", { name: "Message #secret-plans" }) as HTMLTextAreaElement,
			};
		},
		false,
	);
}

test("durable private message activity updates unread without replacing its ranged watch", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const privateWatch = h.find_watch("channels", PRIVATE_KEY)!;
	const watchCount = h.watches.length;

	h.send_scopes([private_scope([{ collection: "messages", at: 5_000, createdByUserId: "user_other" }])]);

	const privateRow = await waitFor(() => within(nav).getByRole("button", { name: /^#secret-plans/ }));
	await waitFor(() => expect(privateRow.className).toContain("is-unread"));
	expect(h.find_watch("channels", PRIVATE_KEY)).toBe(privateWatch);
	expect(h.watches).toHaveLength(watchCount);
	expect(h.raw.data.put).not.toHaveBeenCalled();

	fireEvent.click(within(nav).getByRole("button", { name: /^Unreads/ }));
	const unreads = await screen.findByRole("region", { name: "Unreads" });
	expect(within(unreads).getByRole("button", { name: /^#secret-plans/ })).toBeTruthy();
});

test("a same-millisecond message sequence advance becomes unread", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const privateRow = () => within(nav).getByRole("button", { name: /^#secret-plans/ });
	h.find_watch("channels", PRIVATE_KEY)!.onUpdate(
		watch_update([
			channel_doc(PRIVATE_KEY, "secret-plans"),
			private_cursor_doc(PRIVATE_KEY, 5_000, 1, { messages: 4, replies: 0 }),
		]),
	);
	h.send_scopes([private_scope([{ collection: "messages", at: 5_000, createdByUserId: "user_other", sequence: 4 }])]);
	await waitFor(() => expect(privateRow().className).not.toContain("is-unread"));

	// The second append can have the same timestamp and a lexically lower hidden key. Sequence is
	// the durable order, so it must still reopen unread state.
	h.send_scopes([private_scope([{ collection: "messages", at: 5_000, createdByUserId: "user_other", sequence: 5 }])]);
	await waitFor(() => expect(privateRow().className).toContain("is-unread"));
});

test("private message and reply sequences advance independently", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const privateRow = () => within(nav).getByRole("button", { name: /^#secret-plans/ });
	h.find_watch("channels", PRIVATE_KEY)!.onUpdate(
		watch_update([
			channel_doc(PRIVATE_KEY, "secret-plans"),
			private_cursor_doc(PRIVATE_KEY, 7_500, 1, { messages: 4, replies: 1 }),
		]),
	);

	h.send_scopes([
		private_scope([
			{ collection: "channels", at: 10_000, createdByUserId: "user_other" },
			{ collection: "reactions", at: 9_000, createdByUserId: "user_other" },
			{ collection: "files", at: 8_500, createdByUserId: "user_other" },
			{ collection: "messages", at: 7_500, createdByUserId: "user_other", sequence: 4 },
			{ collection: "replies", at: 7_000, createdByUserId: "user_other", sequence: 1 },
		]),
	]);
	await waitFor(() => expect(privateRow().className).not.toContain("is-unread"));

	h.send_scopes([
		private_scope([
			{ collection: "channels", at: 10_000, createdByUserId: "user_other" },
			{ collection: "reactions", at: 9_000, createdByUserId: "user_other" },
			{ collection: "messages", at: 7_500, createdByUserId: "user_other", sequence: 4 },
			{ collection: "replies", at: 8_000, createdByUserId: "user_other", sequence: 2 },
		]),
	]);
	await waitFor(() => expect(privateRow().className).toContain("is-unread"));

	h.find_watch("channels", PRIVATE_KEY)!.onUpdate(
		watch_update([
			channel_doc(PRIVATE_KEY, "secret-plans"),
			private_cursor_doc(PRIVATE_KEY, 8_000, 2, { messages: 4, replies: 2 }),
		]),
	);
	await waitFor(() => expect(privateRow().className).not.toContain("is-unread"));
	h.send_scopes([
		private_scope([
			{ collection: "messages", at: 8_000, createdByUserId: "user_other", sequence: 5 },
			{ collection: "replies", at: 8_000, createdByUserId: "user_other", sequence: 2 },
		]),
	]);
	await waitFor(() => expect(privateRow().className).toContain("is-unread"));
	expect(h.raw.data.put).not.toHaveBeenCalled();
});

test("same-time own then other private activity is not hidden after the cursor covers the own append", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const privateRow = () => within(nav).getByRole("button", { name: /^#secret-plans/ });

	h.send_scopes([private_scope([{ collection: "messages", at: 7_000, createdByUserId: "user_me", sequence: 1 }])]);
	await waitFor(() => expect(privateRow().className).toContain("is-unread"));

	h.find_watch("channels", PRIVATE_KEY)!.onUpdate(
		watch_update([
			channel_doc(PRIVATE_KEY, "secret-plans"),
			private_cursor_doc(PRIVATE_KEY, 7_000, 1, { messages: 1, replies: 0 }),
		]),
	);
	await waitFor(() => expect(privateRow().className).not.toContain("is-unread"));

	h.send_scopes([private_scope([{ collection: "messages", at: 7_000, createdByUserId: "user_other", sequence: 2 }])]);
	await waitFor(() => expect(privateRow().className).toContain("is-unread"));
});

test.each([
	["ahead", 90_000, 5_000],
	["behind", 1_000, 5_000],
] as const)(
	"opening a private channel uses durable reply time when the device clock is %s",
	async (_, deviceAt, replyAt) => {
		const now = vi.spyOn(Date, "now").mockReturnValue(deviceAt);
		try {
			const h = make_harness();
			await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
			h.send_scopes([
				private_scope([{ collection: "replies", at: replyAt, createdByUserId: "user_other", sequence: 1 }]),
			]);
			const nav = screen.getByRole("navigation", { name: "Channels" });
			const privateRow = () => within(nav).getByRole("button", { name: /^#secret-plans/ });
			await waitFor(() => expect(privateRow().className).toContain("is-unread"));

			fireEvent.click(privateRow());
			const cursorWrite = await waitFor(() => {
				const found = (h.raw.data.putOwned.mock.calls as [PutOpts][])
					.map(([opts]) => opts)
					.find((opts) => opts.collection === "channels" && opts.key === `${PRIVATE_KEY}:read`);
				expect(found).toBeTruthy();
				return found!;
			});
			expect(cursorWrite.value).toEqual({ at: replyAt, activity: { messages: 0, replies: 1 } });
			expect(h.raw.data.put).not.toHaveBeenCalled();
		} finally {
			now.mockRestore();
		}
	},
);

test("a private send with a lost response remains unread after the sender reloads", async () => {
	const first = make_harness();
	first.raw.backend.invoke.mockResolvedValueOnce(invoke_nay("unavailable", "The message may have been stored"));
	const { textarea, unmount } = await open_private_composer(first);
	type_in_composer(textarea, "stored before reload");
	await act(async () => {
		fireEvent.keyDown(textarea, { key: "Enter" });
		await Promise.resolve();
		await Promise.resolve();
	});
	expect(invoke_calls(first, "message-send")).toHaveLength(1);
	const request = invoke_calls(first, "message-send")[0]!;
	unmount();

	const second = make_harness();
	await boot_sidebar(
		second,
		[channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")],
		[PRIVATE_KEY],
	);
	second.send_scopes([private_scope([{ collection: "messages", at: 50_000, createdByUserId: "user_me" }])]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	await waitFor(() =>
		expect(within(nav).getByRole("button", { name: /^#secret-plans/ }).className).toContain("is-unread"),
	);
	expect(request.input.clientRequestId).toMatch(/^[0-9a-f-]{36}$/);
	expect(first.raw.data.put).not.toHaveBeenCalled();
	expect(second.raw.data.put).not.toHaveBeenCalled();
});

test("activity from a removed sender remains unread for a member after reload", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_KEY]);
	h.send_scopes([private_scope([{ collection: "replies", at: 6_000, createdByUserId: "user_removed" }])]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	await waitFor(() =>
		expect(within(nav).getByRole("button", { name: /^#secret-plans/ }).className).toContain("is-unread"),
	);
	expect(nav.textContent).not.toContain("user_removed");
});

test("an unavailable private send replays one request while navigation and Leave stay blocked", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const replay = deferred<InvokeResult>();
	h.raw.backend.invoke
		.mockResolvedValueOnce(invoke_nay("unavailable", "The reply may have been lost"))
		.mockReturnValueOnce(replay.promise);
	const { textarea } = await open_private_composer(h);

	type_in_composer(textarea, "uncertain private message");
	await act(async () => {
		fireEvent.keyDown(textarea, { key: "Enter" });
		await Promise.resolve();
	});
	expect(invoke_calls(h, "message-send")).toHaveLength(1);
	const firstSend = invoke_calls(h, "message-send")[0]!;

	const unreads = screen.getByRole("button", { name: "Unreads" });
	expect(unreads.hasAttribute("disabled")).toBe(true);
	fireEvent.click(unreads);
	expect(screen.getByRole("combobox", { name: "Message #secret-plans" })).toBeTruthy();

	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	const leave = await within(dialog).findByRole("button", { name: "Leave channel" });
	fireEvent.click(leave);
	expect((await within(dialog).findByRole("alert")).textContent).toBe(
		"Wait for pending message changes to finish before leaving this channel or thread.",
	);
	expect(h.raw.scopes.removePrincipal).not.toHaveBeenCalled();

	await waitFor(() => expect(invoke_calls(h, "message-send")).toHaveLength(2), { timeout: 2_500 });
	expect(invoke_calls(h, "message-send")[1]!.input).toEqual(firstSend.input);
	expect(unreads.hasAttribute("disabled")).toBe(true);
	fireEvent.click(leave);
	expect(h.raw.scopes.removePrincipal).not.toHaveBeenCalled();

	await act(async () => {
		replay.resolve(invoke_ok({ messageKey: `${PRIVATE_KEY}:${inv(50_000)}:sent` }));
		await Promise.resolve();
		await Promise.resolve();
	});
	expect(h.raw.data.put).not.toHaveBeenCalled();
	expect(unreads.hasAttribute("disabled")).toBe(false);
	expect(screen.queryByText("Sending…")).toBeNull();
	expect(screen.getAllByText("uncertain private message")).toHaveLength(1);
});

test("an unavailable private reply replays one request and unlocks its thread after success", async () => {
	const h = make_harness();
	await open_private_composer(h);
	const rootA = message_doc(49_000, { channelKey: PRIVATE_KEY, rand: "root", text: "private root a" });
	const rootB = message_doc(48_000, { channelKey: PRIVATE_KEY, rand: "roo2", text: "private root b" });
	h.find_window("messages", `${PRIVATE_KEY}:`)!.onUpdate(window_update([rootA, rootB]));
	await screen.findByText("private root a");

	const replay = deferred<InvokeResult>();
	h.raw.backend.invoke
		.mockResolvedValueOnce(invoke_nay("unavailable", "The reply may have been lost"))
		.mockReturnValueOnce(replay.promise);
	const rowA = screen.getByText("private root a").closest("[data-key]") as HTMLElement;
	fireEvent.click(within(rowA).getByRole("button", { name: "Reply in thread" }));
	const panel = await screen.findByRole("region", { name: "Thread" });

	const replyBox = within(panel).getByRole("combobox", { name: "Reply in thread" }) as HTMLTextAreaElement;
	type_in_composer(replyBox, "uncertain private reply");
	await act(async () => {
		fireEvent.keyDown(replyBox, { key: "Enter" });
		await Promise.resolve();
	});
	expect(invoke_calls(h, "reply-send")).toHaveLength(1);
	const firstReply = invoke_calls(h, "reply-send")[0]!;
	expect(firstReply.input.rootMessageKey).toBe(rootA.key);

	const close = within(panel).getByRole("button", { name: "Close thread" });
	const rowB = screen.getByText("private root b").closest("[data-key]") as HTMLElement;
	const switchThread = within(rowB).getByRole("button", { name: "Reply in thread" });
	expect(close.hasAttribute("disabled")).toBe(true);
	expect(switchThread.hasAttribute("disabled")).toBe(true);
	fireEvent.click(close);
	fireEvent.click(switchThread);
	expect(screen.getByRole("region", { name: "Thread" })).toBe(panel);

	await waitFor(() => expect(invoke_calls(h, "reply-send")).toHaveLength(2), { timeout: 2_500 });
	expect(invoke_calls(h, "reply-send")[1]!.input).toEqual(firstReply.input);
	expect(close.hasAttribute("disabled")).toBe(true);

	await act(async () => {
		replay.resolve(invoke_ok({ messageKey: `${rootA.key}:${inv(51_000)}:repl`, transcriptUpdated: true }));
		await Promise.resolve();
		await Promise.resolve();
	});
	expect(h.raw.data.put).not.toHaveBeenCalled();
	expect(close.hasAttribute("disabled")).toBe(false);
	expect(switchThread.hasAttribute("disabled")).toBe(false);
	expect(within(panel).getAllByText("uncertain private reply")).toHaveLength(1);
});

test("Leave waits for a delayed send, then removes the member without a channel put", async () => {
	const h = make_harness();
	h.scopePrincipals.set(PRIVATE_KEY, [
		{ userId: "user_me", level: "manage" },
		{ userId: "user_other", level: "member" },
	]);
	const send = deferred<InvokeResult>();
	const events: string[] = [];
	h.raw.backend.invoke.mockImplementationOnce(() => {
		events.push("invoke");
		return send.promise;
	});
	h.raw.scopes.removePrincipal.mockImplementationOnce(async () => {
		events.push("scopes.removePrincipal");
		return { _yay: { scopeId: PRIVATE_KEY, deleted: false, membershipRevision: 2 } };
	});
	const { textarea } = await open_private_composer(h);

	type_in_composer(textarea, "committed before leave");
	fireEvent.keyDown(textarea, { key: "Enter" });
	await waitFor(() => expect(invoke_calls(h, "message-send")).toHaveLength(1));
	fireEvent.click(await open_channel_menu_item("secret-plans", "Leave #secret-plans"));
	const dialog = await screen.findByRole("dialog", { name: "Leave #secret-plans?" });
	const leave = await within(dialog).findByRole("button", { name: "Leave channel" });
	fireEvent.click(leave);
	expect((await within(dialog).findByRole("alert")).textContent).toBe(
		"Wait for pending message changes to finish before leaving this channel or thread.",
	);
	expect(h.raw.scopes.removePrincipal).not.toHaveBeenCalled();

	await act(async () => {
		send.resolve(invoke_ok({ messageKey: `${PRIVATE_KEY}:${inv(50_000)}:sent` }));
		await Promise.resolve();
		await Promise.resolve();
	});
	await waitFor(() => expect(screen.queryByText("Sending…")).toBeNull());
	expect(h.raw.data.put).not.toHaveBeenCalled();

	fireEvent.click(leave);
	await waitFor(() => expect(h.raw.scopes.removePrincipal).toHaveBeenCalledTimes(1));
	expect(events).toEqual(["invoke", "scopes.removePrincipal"]);
	expect(h.raw.data.put).not.toHaveBeenCalled();
});
// #endregion unreads, views, mentions
