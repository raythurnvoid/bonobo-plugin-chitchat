import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { BonoboUiFrontendClient, BonoboUiTheme } from "bonobo-plugin-sdk/frontend";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { App } from "./app";
import { chat_ANONYMOUS_MEMBER_LABEL, chat_mention_roster_refusal_copy, chat_PRIVATE_CHANNEL_COLLECTIONS } from "./chat-data";

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
function private_cursor_doc(channelKey: string, at: number, revision = 1) {
	return {
		collection: "channels",
		key: `${channelKey}:read:user_me`,
		value: { at },
		revision,
		createdBy: "user_me",
		updatedBy: "user_me",
		ownership: "owned",
		createdAt: 1,
		updatedAt: 1,
	};
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
	opts: { collection: string; limit: number; order?: "asc" | "desc"; since?: number; before?: number; scopeId?: string };
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
type KeyOpts = { collection: string; key: string };
type MembersListResult =
	| { _yay: { members: { userId: string; displayName: string | null }[]; cursor: string | null } }
	| { _nay: { name: string; message: string } };
type FetchInit = { method?: string; headers?: Record<string, string>; body?: Record<string, unknown> };
type ScopeEntry = { scopeId: string; keyPrefix: string; collections: string[]; level: "member" | "manage" };

function make_harness() {
	let putRevision = 1;
	const watches: WatchSub[] = [];
	const recents: RecentSub[] = [];
	const windows: WindowSub[] = [];
	const changes: ChangesSub[] = [];
	const themeListeners: ((theme: BonoboUiTheme) => void)[] = [];
	const names: Record<string, string | null> = { user_me: "Me", user_other: "Bob", user_third: "Cleo" };
	/**
	 * Every call the page makes that changes or reads a scope, in order, next to the data writes.
	 * The order is the point: a channel document written before its scope exists can never be made
	 * private afterwards, because a scope refuses a key range that already holds documents.
	 */
	const calls: { op: string; args: Record<string, unknown> }[] = [];
	/** What `scopes.listPrincipals` answers per scope. A missing entry answers null, as the server does. */
	const scopePrincipals = new Map<string, { userId: string; level: "member" | "manage" }[]>();
	/** Live subscribers to `scopes.watchMine`, so a test can hand the page a private range. */
	const scopeWatchers: ((scopes: ScopeEntry[] | null) => void)[] = [];
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
				return { _yay: { scopeId: opts.scopeId } };
			}),
			setPrincipal: vi.fn(async (opts: { scopeId: string; userId: string; level: "member" | "manage" }) => {
				calls.push({ op: "scopes.setPrincipal", args: { ...opts } });
				const current = scopePrincipals.get(opts.scopeId) ?? [];
				scopePrincipals.set(opts.scopeId, [
					...current.filter((principal) => principal.userId !== opts.userId),
					{ userId: opts.userId, level: opts.level },
				]);
				return { _yay: { scopeId: opts.scopeId } };
			}),
			removePrincipal: vi.fn(async (opts: { scopeId: string; userId: string }) => {
				calls.push({ op: "scopes.removePrincipal", args: { ...opts } });
				scopePrincipals.set(
					opts.scopeId,
					(scopePrincipals.get(opts.scopeId) ?? []).filter((principal) => principal.userId !== opts.userId),
				);
				return { _yay: { scopeId: opts.scopeId } };
			}),
			delete: vi.fn(async (opts: { scopeId: string }) => {
				calls.push({ op: "scopes.delete", args: { ...opts } });
				scopePrincipals.delete(opts.scopeId);
				return { _yay: { scopeId: opts.scopeId } };
			}),
			listPrincipals: vi.fn(async (opts: { scopeId: string }) => scopePrincipals.get(opts.scopeId) ?? null),
			watchMine: vi.fn((onUpdate: (scopes: ScopeEntry[] | null) => void) => {
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
			// Start with no theme, the shape an older host produces, so every test that says nothing
			// about the theme exercises the fallback path.
			current: vi.fn<() => BonoboUiTheme | null>(() => null),
			subscribe: vi.fn((onChange: (theme: BonoboUiTheme) => void) => {
				themeListeners.push(onChange);
				return () => {
					const index = themeListeners.indexOf(onChange);
					if (index >= 0) {
						themeListeners.splice(index, 1);
					}
				};
			}),
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
	/** Delivers a theme the way the host does after the member switches the app's theme. */
	const send_theme = (theme: BonoboUiTheme) => {
		for (const listener of [...themeListeners]) {
			listener(theme);
		}
	};
	/** Delivers the scope list the way the server does after somebody changes who is in a range. */
	const send_scopes = (scopes: ScopeEntry[] | null) => {
		for (const listener of [...scopeWatchers]) {
			listener(scopes);
		}
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
		send_theme,
		send_scopes,
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

/** Renders the App, delivers one channel, and waits for the channel view's windows. */
async function boot(h: ReturnType<typeof make_harness>, channels: unknown[] = [channel_doc(CH1_KEY, "general")]) {
	const utils = render(<App client={h.client} />);
	h.find_watch("channels")!.onUpdate(watch_update(channels));
	if (channels.length > 0) {
		await waitFor(() => expect(h.find_window("messages", `${CH1_KEY}:`)).toBeTruthy());
	}
	return utils;
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
	expect(within(channelsList!).getAllByRole("button", { name: /^#/u }).map((button) => button.textContent)).toEqual([
		"G#general",
		"R#random",
	]);
	expect(within(archivedList!).getAllByRole("button", { name: /^#/u }).map((button) => button.textContent)).toEqual([
		"O#old-stuff (archived)",
	]);
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

test("the thread-open class is on the app root and a channel switch clears it", async () => {
	const h = make_harness();
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const doc = message_doc(1_000, { rand: "root", text: "thread root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("thread root");

	const root = document.querySelector(".chitchat")!;
	expect(root.classList.contains("has-thread")).toBe(false);

	// The rail collapse is a stylesheet rule on this class, so nothing else can observe whether any
	// element ever carries it.
	fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
	await screen.findByRole("region", { name: "Thread" });
	expect(document.querySelector(".chitchat")!.classList.contains("has-thread")).toBe(true);

	// ChannelView is keyed by channel and remounts on a switch; this state does not. Left set, the
	// key resolves to no message in the new channel, so no panel renders while the rail stays
	// collapsed to 56 icon-only pixels beside an empty column.
	fireEvent.click(screen.getByRole("button", { name: "#random" }));
	await waitFor(() => expect(document.querySelector(".chitchat")!.classList.contains("has-thread")).toBe(false));
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
	expect(document.querySelector(".sidebar")!.classList.contains("is-expanded")).toBe(true);
});

test("a rename carries the channel topic and an emptied topic is removed", async () => {
	const h = make_harness();
	await boot(h, [{ ...channel_doc(CH1_KEY, "general"), value: { name: "general", archivedAt: null, topic: "standups" } }]);

	fireEvent.click(await open_channel_menu_item("general", "Rename #general"));
	const dialog = await screen.findByRole("dialog");
	// The topic is editable here, and it round-trips: a rename that dropped it would delete the
	// topic on every rename, because the put replaces the whole value.
	const topicBox = within(dialog).getByRole("textbox", { name: "Topic (optional)" });
	expect((topicBox as HTMLInputElement).value).toBe("standups");

	fireEvent.input(topicBox, { target: { value: "daily standups" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Rename" }));
	await waitFor(() => expect(h.raw.data.put).toHaveBeenCalledTimes(1));
	expect(h.raw.data.put.mock.calls[0][0].value).toEqual({
		name: "general",
		archivedAt: null,
		topic: "daily standups",
	});
});

test('permission-lost: a "denied" channels death names no cause and offers a reload', async () => {
	const h = make_harness();
	await boot(h);
	h.find_watch("channels")!.onUpdate(null, { reason: "denied", message: "This plugin no longer has access to its data" });

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
	// A member whose session ran out only has to reload; a member whose connection dropped cannot
	// fix anything by reloading. One string for both is advice that is wrong half the time.
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

test("create channel dialog validates the name and puts a shared doc under a client key", async () => {
	const h = make_harness();
	await boot(h, []);

	fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
	const dialog = await screen.findByRole("dialog");
	expect(dialog.getAttribute("aria-modal")).toBe("true");

	// Empty name refused locally, nothing sent.
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	expect(await within(dialog).findByRole("alert")).toBeTruthy();
	expect(h.raw.data.put).not.toHaveBeenCalled();

	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "general" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Create" }));
	// Creation goes through put with a client-generated key, so the doc is SHARED and any
	// member can rename or archive it later. append (owner-locked docs) must not be used.
	await waitFor(() => expect(h.raw.data.put).toHaveBeenCalledTimes(1));
	const call = h.raw.data.put.mock.calls[0][0];
	expect(call.collection).toBe("channels");
	expect(typeof call.key).toBe("string");
	expect(call.key.length).toBeGreaterThan(0);
	expect(call.value).toEqual({ name: "general", archivedAt: null });
	expect(h.raw.data.append).not.toHaveBeenCalled();
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test("a non-creator can rename a channel: the shared put succeeds and the dialog closes", async () => {
	const h = make_harness();
	// The channel was created by another member; channel docs are shared, so the rename
	// from this member (user_me) goes through.
	await boot(h, [{ ...channel_doc(CH1_KEY, "general"), createdBy: "user_other", updatedBy: "user_other" }]);

	fireEvent.click(await open_channel_menu_item("general", "Rename #general"));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "renamed" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Rename" }));

	await waitFor(() => expect(h.raw.data.put).toHaveBeenCalledTimes(1));
	expect(h.raw.data.put.mock.calls[0][0]).toEqual({
		collection: "channels",
		key: CH1_KEY,
		value: { name: "renamed", archivedAt: null },
		expectedRevision: 1,
	});
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test("rename is compare-and-set: a conflict keeps the dialog open with a clear error", async () => {
	const h = make_harness();
	h.raw.data.put.mockResolvedValueOnce({
		_nay: { name: "conflict", message: "This document changed since it was read" },
	});
	await boot(h, [{ ...channel_doc(CH1_KEY, "general"), revision: 4 }]);

	fireEvent.click(await open_channel_menu_item("general", "Rename #general"));
	const dialog = await screen.findByRole("dialog");
	fireEvent.input(within(dialog).getByLabelText("Channel name"), { target: { value: "renamed" } });
	fireEvent.click(within(dialog).getByRole("button", { name: "Rename" }));

	// The put carries the revision the dialog captured, so a concurrent rename conflicts
	// instead of being silently overwritten.
	await waitFor(() => expect(h.raw.data.put).toHaveBeenCalledTimes(1));
	expect(h.raw.data.put.mock.calls[0][0]).toEqual({
		collection: "channels",
		key: CH1_KEY,
		value: { name: "renamed", archivedAt: null },
		expectedRevision: 4,
	});
	const alert = await within(dialog).findByRole("alert");
	expect(alert.textContent).toContain("Someone else changed this channel");
	expect(screen.getByRole("dialog")).toBeTruthy();
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

test("Enter sends, Shift+Enter does not, and the send appends under the channel prefix", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const input = await screen.findByRole("combobox", { name: "Message #general" });
	fireEvent.input(input, { target: { value: "line one" } });
	fireEvent.keyDown(input, { key: "Enter", shiftKey: true });
	expect(h.raw.data.append).not.toHaveBeenCalled();

	fireEvent.keyDown(input, { key: "Enter" });
	await waitFor(() => expect(h.raw.data.append).toHaveBeenCalledTimes(1));
	const call = h.raw.data.append.mock.calls[0][0];
	expect(call.collection).toBe("messages");
	expect(call.keyPrefix).toBe(`${CH1_KEY}:`);
	expect(call.value).toEqual({ text: "line one", attachments: [], editedAt: null, deletedAt: null });
});

test("an in-flight send disables Send, shows the pending row, and the ack keeps the message", async () => {
	const h = make_harness();
	const ack = deferred<{ _yay: { key: string; revision: number } }>();
	h.raw.data.append.mockReturnValueOnce(ack.promise);
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const input = await screen.findByRole("combobox", { name: "Message #general" });
	fireEvent.input(input, { target: { value: "hello there" } });
	fireEvent.click(screen.getByRole("button", { name: "Send" }));

	// "Sending…" appears twice: on the pending row's status and as the disabled Send label.
	expect(await screen.findAllByText("Sending…")).toBeTruthy();
	await waitFor(() => expect(screen.getByRole("button", { name: "Sending…" }).hasAttribute("disabled")).toBe(true));

	ack.resolve({ _yay: { key: `${CH1_KEY}:${inv(9_000)}:sent`, revision: 1 } });
	await waitFor(() => {
		expect(screen.queryByText("Sending…")).toBeNull();
		expect(screen.getByText("hello there")).toBeTruthy();
	});
	expect(screen.getByRole("button", { name: "Send" }).hasAttribute("disabled")).toBe(false);
});

test("a failed send surfaces the _nay message and Retry reuses the same clientRequestId", async () => {
	const h = make_harness();
	h.raw.data.append
		.mockResolvedValueOnce({ _nay: { message: "Rate limited — try again in a few seconds" } })
		.mockResolvedValueOnce({ _yay: { key: `${CH1_KEY}:${inv(9_000)}:sent`, revision: 1 } })
		.mockResolvedValueOnce({ _yay: { key: `${CH1_KEY}:${inv(9_100)}:snd2`, revision: 1 } });
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const input = await screen.findByRole("combobox", { name: "Message #general" });
	fireEvent.input(input, { target: { value: "first try" } });
	fireEvent.click(screen.getByRole("button", { name: "Send" }));

	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("Rate limited — try again in a few seconds");

	fireEvent.click(screen.getByRole("button", { name: "Retry sending message" }));
	await waitFor(() => expect(h.raw.data.append).toHaveBeenCalledTimes(2));
	// The retry replays the SAME logical send: identical clientRequestId, so the door
	// dedupes instead of writing twice.
	const firstId = h.raw.data.append.mock.calls[0][0].clientRequestId;
	const retryId = h.raw.data.append.mock.calls[1][0].clientRequestId;
	expect(typeof firstId).toBe("string");
	expect(retryId).toBe(firstId);

	// A fresh send mints a fresh id.
	await waitFor(() => expect(screen.queryByText("Sending…")).toBeNull());
	fireEvent.input(input, { target: { value: "second message" } });
	fireEvent.keyDown(input, { key: "Enter" });
	await waitFor(() => expect(h.raw.data.append).toHaveBeenCalledTimes(3));
	expect(h.raw.data.append.mock.calls[2][0].clientRequestId).not.toBe(firstId);
});

test("a storage_full refusal becomes one announced channel state and stops the composer", async () => {
	const h = make_harness();
	h.raw.data.append.mockResolvedValueOnce({
		_nay: { name: "storage_full", message: "This plugin has used its 10000 document slots" },
	});
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	fireEvent.input(screen.getByRole("combobox", { name: "Message #general" }), { target: { value: "hello" } });
	fireEvent.click(screen.getByRole("button", { name: "Send" }));

	// A full store is the channel's state, not this row's error. The server's own message is the
	// only thing that separates "you are full" from "the plugin is full", so it is what shows.
	const alert = await screen.findByText("This plugin has used its 10000 document slots");
	expect(alert.getAttribute("role")).toBe("alert");
	expect(alert.closest(".message")).toBeNull();
	await waitFor(() =>
		expect((screen.getByRole("button", { name: "Send" }) as HTMLButtonElement).disabled).toBe(true),
	);

	// The failed row keeps its retry, but not a second copy of the same sentence.
	const failedRow = screen.getByText("hello").closest(".message") as HTMLElement;
	expect(within(failedRow).queryByText(/document slots/)).toBeNull();
	expect(within(failedRow).getByRole("button", { name: "Retry sending message" })).toBeTruthy();
});

// #endregion send flow

// #region announcer

test("a remote arrival announces author and preview; the user's own send never announces", async () => {
	const h = make_harness();
	const ack = deferred<{ _yay: { key: string; revision: number } }>();
	h.raw.data.append.mockReturnValueOnce(ack.promise);
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
	ack.resolve({ _yay: { key: ownKey, revision: 1 } });

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

test("editing an own message puts the new text and renders the (edited) marker", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "mine", text: "before", createdBy: "user_me" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));

	await screen.findByText("before");
	fireEvent.click(screen.getByRole("button", { name: "Edit" }));
	const editBox = await screen.findByRole("textbox", { name: "Edit message" });
	fireEvent.input(editBox, { target: { value: "after" } });
	fireEvent.click(screen.getByRole("button", { name: "Save" }));

	await waitFor(() => expect(h.raw.data.put).toHaveBeenCalledTimes(1));
	const call = h.raw.data.put.mock.calls[0][0];
	expect(call.collection).toBe("messages");
	expect(call.key).toBe(doc.key);
	expect(call.value.text).toBe("after");
	expect(typeof call.value.editedAt).toBe("number");
	expect(await screen.findByText("(edited)")).toBeTruthy();
	expect(screen.getByText("after")).toBeTruthy();
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

	await waitFor(() => expect(h.raw.data.put).toHaveBeenCalledTimes(1));
	const call = h.raw.data.put.mock.calls[0][0];
	expect(call.key).toBe(doc.key);
	expect(typeof call.value.deletedAt).toBe("number");
	expect(await screen.findByText("Message deleted")).toBeTruthy();
	expect(screen.queryByText("to remove")).toBeNull();
});

test("a plain text-only message row keeps its action buttons focusable", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([message_doc(1_000, { rand: "m1", text: "plain row" })]));

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

test("a second edit compares against the revision the first write stored, and a stale one conflicts", async () => {
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
	await waitFor(() => expect(h.raw.data.put).toHaveBeenCalledTimes(1));
	const storedRevision = (await h.raw.data.put.mock.results[0].value)._yay.revision;
	await screen.findByText("second");

	// The server now holds `storedRevision`, and the window has not delivered it back yet. A
	// second edit that compared against the doc as it was first read would be refused as a
	// conflict, telling the member their own message changed under them.
	await save("third");
	await waitFor(() => expect(h.raw.data.put).toHaveBeenCalledTimes(2));
	expect(h.raw.data.put.mock.calls[1][0].expectedRevision).toBe(storedRevision);
	expect(await screen.findByText("third")).toBeTruthy();

	// A revision the server has moved past is a real conflict, and the row says so without
	// changing what it shows.
	h.raw.data.put.mockResolvedValueOnce({ _nay: { name: "conflict", message: "Revision mismatch" } });
	await save("fourth");
	expect(await screen.findByText("Revision mismatch")).toBeTruthy();
	expect(h.raw.data.put.mock.calls[2][0].value.text).toBe("fourth");
	// The editor stays open holding the unsaved text, and the stored message did not change.
	fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
	expect(await screen.findByText("third")).toBeTruthy();
	expect(screen.queryByText("fourth")).toBeNull();
});

// #endregion own vs other affordances

// #region reactions

test("reaction chips group by createdBy, expose aria-pressed, and toggle putOwned with a removed marker", async () => {
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

	// Toggling my own reaction off writes a removed marker on the same owned key.
	fireEvent.click(mineChip);
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1));
	expect(h.raw.data.putOwned.mock.calls[0][0]).toEqual({
		collection: "reactions",
		key: `${doc.key}:heart`,
		value: { removed: true },
	});
	expect(h.raw.data.removeOwned).not.toHaveBeenCalled();

	// Toggling a reaction I do not hold adds my owned doc.
	fireEvent.click(otherChip);
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(2));
	expect(h.raw.data.putOwned.mock.calls[1][0]).toEqual({ collection: "reactions", key: `${doc.key}:party`, value: {} });
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
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1));
	expect(h.raw.data.putOwned.mock.calls[0][0].key).toBe(`${doc.key}:rocket`);
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

test("a row the reactions list cannot reach says so instead of showing no reactions", async () => {
	const h = make_harness();
	const newestRoot = message_doc(2_000, { rand: "newr", text: "new root" });
	await boot_two_roots(h, {
		reactions: [reaction_doc(newestRoot.key, "heart", "user_me")],
		reactionsDone: false,
	});

	const oldRow = row_of("old root");
	expect(await within(oldRow).findByText("Reactions unavailable")).toBeTruthy();
	expect(oldRow.querySelector(".message-reactions")).toBeNull();

	// The remove path is hidden, not refused: with no chips there is nothing to un-react. The add
	// path stays live, because `putOwned` writes the member's own key with the same empty value
	// whether or not it is already there. Refusing both would stop reactions on every message past
	// the coverage frontier, which in a busy channel is a couple of days back.
	await pick_reaction(oldRow, "Heart");
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1));
	expect(h.raw.data.putOwned.mock.calls[0][0].key).toBe(`${row_key(oldRow)}:heart`);
	expect(h.raw.data.removeOwned).not.toHaveBeenCalled();
});

test("a row the reactions list does reach still writes the reaction", async () => {
	const h = make_harness();
	await boot_two_roots(h);

	await pick_reaction(row_of("old root"), "Heart");
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1));
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
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1));
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
		window_update([message_doc(2_000, { rand: "newr", text: "new root" }), message_doc(1_000, { rand: "oldr", text: "old root" })]),
	);

	const notice = await screen.findByText("Some reactions and replies in this range could not be loaded.");
	expect(notice.getAttribute("role")).toBe("alert");
});

test("a failed companion list retries once without waiting for a feed", async () => {
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
		list_calls(h, "reactions").filter(([, init]) => (init?.body as { keyPrefix?: string } | undefined)?.keyPrefix === ch1Prefix);
	try {
		await act(async () => {
			h.find_window("messages", ch1Prefix)!.onUpdate(window_update([message_doc(2_000, { rand: "newr", text: "new root" })]));
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
	await waitFor(() => expect(h.raw.data.append).toHaveBeenCalledTimes(1));
	const call = h.raw.data.append.mock.calls[0][0];
	expect(call.collection).toBe("replies");
	expect(call.keyPrefix).toBe(`${doc.key}:`);

	fireEvent.click(closeButton);
	await waitFor(() => expect(screen.queryByRole("region", { name: "Thread" })).toBeNull());
	// Focus returns to the exact reply trigger of that root message.
	expect(document.activeElement?.textContent).toContain("Reply in thread");
});

test("switching the open thread to another root resets replies, loading state, and pending sends", async () => {
	const h = make_harness();
	const ack = deferred<{ _yay: { key: string; revision: number } }>();
	h.raw.data.append.mockReturnValueOnce(ack.promise);
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
				[{ ...message_doc(3_000, { text: "reply on a" }), collection: "replies", key: `${rootA.key}:${inv(3_000)}:ra01` }],
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

	// Switch the panel to thread B: the panel must remount with fresh state — no A
	// replies, no surviving pending send whose retry would write under B's prefix.
	const rowB = screen.getByText("root b").closest("[data-key]") as HTMLElement;
	fireEvent.click(within(rowB).getByRole("button", { name: "Reply in thread" }));
	const freshPanel = await screen.findByRole("region", { name: "Thread" });
	expect(await within(freshPanel).findByText("No replies yet")).toBeTruthy();
	expect(screen.queryByText("reply on a")).toBeNull();
	expect(screen.queryByText("Sending…")).toBeNull();
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

/** Drives the window to capacity so the HTTP control is the only way further back. */
async function boot_at_capacity(h: ReturnType<typeof make_harness>, newest = message_doc(1_000, { rand: "m1", text: "window newest" })) {
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
	h.find_changes("messages")!.onUpdate(watch_update([{ ...newest, revision: 2, updatedAt: newest.updatedAt + 50 }], true));
	await waitFor(() => expect(list_calls(h, "messages").length).toBe(messageListsBefore + 1));
	expect(list_calls(h, "messages").at(-1)?.[1]?.body).toEqual({
		collection: "messages",
		keyPrefix: `${CH1_KEY}:`,
		keyStartExclusive: newest.key,
		limit: 100,
	});
});

test("a page in flight disables the control, and rows below the reactions frontier stay uncovered", async () => {
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
	expect(within(row_of("fetched row")).getByText("Reactions unavailable")).toBeTruthy();
});

test("isDone replaces the control with static text and a further interaction issues no request", async () => {
	const h = make_harness();
	await boot_at_capacity(h);
	h.raw.fetchJson.mockResolvedValueOnce(http_page(Array.from({ length: 100 }, (_, index) => message_doc(500 - index, { rand: `o${index}` })), true));

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
		Object.assign(new Error("/api/v1/plugin-data/list responded 403: forbidden"), { status: 403, responseText: "forbidden" }),
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
			message_doc(1_000, { rand: "m1", text: "with files", attachments: [{ fileNodeId: "n1", name: "spec.pdf" }, { fileNodeId: "n2", name: "secret.txt" }] }),
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
					{ path: "/docs/spec.pdf", name: "spec.pdf", kind: "file", nodeId: "n1", contentType: "application/pdf", updatedAt: 1 },
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
	await waitFor(() => expect(h.raw.data.append).toHaveBeenCalledTimes(1));
	expect(h.raw.data.append.mock.calls[0][0].value.attachments).toEqual([{ fileNodeId: "n1", name: "spec.pdf" }]);
});

// #endregion attachments

// #region theme

/** A whole theme, because the host always sends every role and the page writes all of them. */
function theme_of(mode: "light" | "dark", overrides: Partial<Record<string, string>> = {}): BonoboUiTheme {
	const base = {
		surface: "#101014",
		surfaceRaised: "#16161a",
		surfaceOverlay: "#1b1b20",
		surfaceHover: "#232329",
		border: "#1d1d22",
		borderStrong: "#2c2c33",
		text: "#ececef",
		textMuted: "#9a9aa3",
		textSubtle: "#8b8b94",
		accent: "#8ab4ff",
		accentHover: "#a8c8ff",
		selection: "#24304a",
		success: "#8fd39a",
		danger: "#ff8f8f",
	};
	return { mode, tokens: { ...base, ...overrides } } as BonoboUiTheme;
}

test("the host's theme paints the page, and a later switch follows it", async () => {
	const h = make_harness();
	render(<App client={h.client} />);

	// An older host sends no theme. Nothing is stamped, and the stylesheet's own dark block stands.
	expect(document.documentElement.classList.contains("theme-light")).toBe(false);
	expect(document.documentElement.style.getPropertyValue("--bonobo-surface")).toBe("");

	h.send_theme(theme_of("light", { surface: "#ffffff", text: "#1b1b20", surfaceRaised: "#fbfbfd" }));
	await waitFor(() => expect(document.documentElement.classList.contains("theme-light")).toBe(true));
	// The host resolved these values itself, so the page wears the app's colours rather than a guess.
	expect(document.documentElement.style.getPropertyValue("--bonobo-surface")).toBe("#ffffff");
	expect(document.documentElement.style.getPropertyValue("--bonobo-text")).toBe("#1b1b20");
	// camelCase roles reach CSS in the spelling the stylesheet reads.
	expect(document.documentElement.style.getPropertyValue("--bonobo-surface-raised")).toBe("#fbfbfd");

	// Switching back has to take the class off again, or the light palette keeps painting a dark app.
	h.send_theme(theme_of("dark", { surface: "#101014" }));
	await waitFor(() => expect(document.documentElement.classList.contains("theme-light")).toBe(false));
	expect(document.documentElement.style.getPropertyValue("--bonobo-surface")).toBe("#101014");
});

test("a theme the host already sent is applied at startup, without waiting for a switch", async () => {
	const h = make_harness();
	h.raw.theme.current.mockReturnValue(theme_of("light", { surface: "#ffffff" }));
	render(<App client={h.client} />);

	// The host sends the theme inside the init message, so a page that only subscribed would start
	// dark and flip to light on the member's first unrelated theme change.
	await waitFor(() => expect(document.documentElement.classList.contains("theme-light")).toBe(true));
	expect(document.documentElement.style.getPropertyValue("--bonobo-surface")).toBe("#ffffff");
});

// #endregion theme

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
async function boot_sidebar(h: ReturnType<typeof make_harness>, channels: unknown[], privateKeys: string[] = []) {
	const publicChannels = channels.filter((doc) => !privateKeys.some((key) => (doc as { key: string }).key === key));
	const utils = render(<App client={h.client} />);
	h.find_watch("channels")!.onUpdate(watch_update(publicChannels));
	await deliver_scopes(h, channels, privateKeys);
	await waitFor(() => expect(screen.getByRole("navigation", { name: "Channels" })).toBeTruthy());
	return utils;
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

test("a private channel arrives through its own scope read, and leaves when the member is taken out", async () => {
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

	// Being taken out kills that read. The channel goes with it, in the open page.
	h.find_watch("channels", PRIVATE_KEY)!.onUpdate(null, { reason: "denied", message: "x" });
	await waitFor(() => expect(nav.textContent).not.toContain("secret-plans"));
	// And the public channel is untouched: one scope ending is not the page losing access.
	expect(within(nav).getByText("#general")).toBeTruthy();
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
	await boot_sidebar(h, [channel_doc(PRIVATE_DM_KEY, "bob"), channel_doc(PRIVATE_KEY, "secret-plans")], [PRIVATE_DM_KEY, PRIVATE_KEY]);

	const nav = screen.getByRole("navigation", { name: "Channels" });
	const rows = [...nav.querySelectorAll(".channel-item")];
	// Two people or three, the row is built by the same code. There is no DM branch to take.
	const skeleton = (row: Element) => [...row.querySelectorAll("*")].map((node) => node.className).join(" ");
	expect(skeleton(rows[0])).toBe(skeleton(rows[1]));

	// And the same store path: the same three collections, each keyed off the channel's own key.
	await waitFor(() => expect(h.find_window("messages", `${PRIVATE_DM_KEY}:`)).toBeTruthy());
	h.find_window("messages", `${PRIVATE_DM_KEY}:`)!.onUpdate(window_update([message_doc(1_000, { channelKey: PRIVATE_DM_KEY, rand: "dm1", text: "hi" })]));
	await wait_for_feeds(h, PRIVATE_DM_KEY);
	expect(h.find_changes("messages", PRIVATE_DM_KEY)?.opts.scopeId).toBe(PRIVATE_DM_KEY);
	expect(h.find_changes("replies", PRIVATE_DM_KEY)?.opts.scopeId).toBe(PRIVATE_DM_KEY);
	expect(h.find_changes("reactions", PRIVATE_DM_KEY)?.opts.scopeId).toBe(PRIVATE_DM_KEY);
	expect(h.find_window("reactions", `${PRIVATE_DM_KEY}:`)).toBeUndefined();
	expect(h.find_window("replies", `${PRIVATE_DM_KEY}:`)).toBeUndefined();

	fireEvent.click(screen.getByRole("button", { name: "#secret-plans (private)" }));
	await waitFor(() => expect(h.find_window("messages", `${PRIVATE_KEY}:`)).toBeTruthy());
	h.find_window("messages", `${PRIVATE_KEY}:`)!.onUpdate(window_update([message_doc(1_000, { channelKey: PRIVATE_KEY, rand: "p1", text: "secret" })]));
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

test("creating a private channel scopes every collection before the channel document exists", async () => {
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

	await waitFor(() => expect(h.calls.length).toBeGreaterThan(before + 2));
	const made = h.calls.slice(before);
	// The scope first, then the people, then the document. A channel document written before its
	// scope existed could never be made private: a scope refuses a key range that already holds
	// documents, and the channel document is the one carrying the channel's name.
	expect(made.map((call) => call.op)).toEqual(["scopes.create", "scopes.setPrincipal", "put"]);
	// All four collections in one call. Three of four would leave the fourth readable by everybody.
	expect(made[0].args.collections).toEqual(["channels", "messages", "replies", "reactions"]);
	expect(made[0].args.keyPrefix).toBe(made[0].args.scopeId);
	expect(String(made[0].args.keyPrefix)).toMatch(/^p\//);
	expect(made[1].args).toEqual({ scopeId: made[0].args.scopeId, userId: "user_other", level: "member" });
	expect(made[2].args).toEqual({ collection: "channels", key: made[0].args.keyPrefix });
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

// #endregion private channels

// #region unreads, views, mentions

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

test("a channel with nothing unread opens without the mark", async () => {
	const h = make_harness();
	await boot_sidebar(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "random")]);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	// The cursor is past everything the feed holds, so the row carries no mark to begin with.
	h.find_recent("messages")!.onUpdate(
		watch_update([message_doc(2000, { channelKey: CH2_KEY, createdBy: "user_other", rand: "u1" })]),
	);
	h.find_watch("cursors", "me:user_me")!.onUpdate(watch_update([cursor_doc({ [CH2_KEY]: 5000 }, 3)]));
	const randomRow = within(nav).getByRole("button", { name: /^#random/ });
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
		expect(within(nav).getByRole("button", { name: /^#random/ }).getAttribute("aria-current")).toBe("page"),
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

test("a private channel's cursor is written inside its scope range, and the public map never holds a p/ key", async () => {
	const h = make_harness();
	await boot_sidebar(
		h,
		[
			channel_doc(CH1_KEY, "general"),
			channel_doc(CH2_KEY, "random"),
			channel_doc(PRIVATE_KEY, "secret-plans", null, { lastMessageAt: 5000 }),
		],
		[PRIVATE_KEY],
	);
	const nav = screen.getByRole("navigation", { name: "Channels" });

	// Somebody stamped the private channel at t=5000 and this member has no cursor for it yet.
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
		expect((h.raw.data.putOwned.mock.calls as [PutOpts][]).some(([opts]) => opts.collection === "cursors")).toBe(
			true,
		),
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

test("a private channel goes unread and back to read through lastMessageAt and its scope cursor", async () => {
	const h = make_harness();
	await boot_sidebar(
		h,
		[channel_doc(CH1_KEY, "general"), channel_doc(PRIVATE_KEY, "secret-plans", null, { lastMessageAt: 5000 })],
		[PRIVATE_KEY],
	);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	const privateRow = () => within(nav).getByRole("button", { name: /^#secret-plans/ });
	await waitFor(() => expect(privateRow().className).toContain("is-unread"));

	// The scope's channels read delivers this member's cursor doc beside the channel doc. The
	// cursor is newer than the stamp, so the row reads as read — and the cursor doc itself must
	// never appear as a channel row.
	h.find_watch("channels", PRIVATE_KEY)!.onUpdate(
		watch_update([
			channel_doc(PRIVATE_KEY, "secret-plans", null, { lastMessageAt: 5000 }),
			private_cursor_doc(PRIVATE_KEY, 6000),
		]),
	);
	await waitFor(() => expect(privateRow().className).not.toContain("is-unread"));
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
		expect(within(nav).getByRole("button", { name: /^#random/ }).getAttribute("aria-current")).toBe("page"),
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
	expect(h.raw.data.append).not.toHaveBeenCalled();
	await waitFor(() => expect(textarea.value).toBe("Hi @Bob "));

	// The next Enter sends, and the stored mention is the member's ID, not the display name —
	// a rename must not orphan old mentions' targets.
	fireEvent.keyDown(textarea, { key: "Enter" });
	const append = await waitFor(() => {
		expect(h.raw.data.append).toHaveBeenCalledTimes(1);
		return h.raw.data.append.mock.calls[0]![0] as AppendOpts;
	});
	expect(append.value.text).toBe("Hi @Bob");
	expect(append.value.mentions).toEqual(["user_other"]);
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
	const append = await waitFor(() => {
		expect(h.raw.data.append).toHaveBeenCalledTimes(1);
		return h.raw.data.append.mock.calls[0]![0] as AppendOpts;
	});
	expect(append.value.text).toBe("Hi @ob");
	expect(append.value.mentions).toBeUndefined();
});

test("moving the caret with an arrow key closes the @-menu, so Enter sends instead of picking", async () => {
	const h = make_harness();
	await boot(h);
	const textarea = composer_box("Message #general");

	type_in_composer(textarea, "Hi @ob");
	await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));

	fireEvent.keyDown(textarea, { key: "ArrowLeft" });
	fireEvent.keyDown(textarea, { key: "Enter" });
	const append = await waitFor(() => {
		expect(h.raw.data.append).toHaveBeenCalledTimes(1);
		return h.raw.data.append.mock.calls[0]![0] as AppendOpts;
	});
	expect(append.value.text).toBe("Hi @ob");
	expect(append.value.mentions).toBeUndefined();
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
	const append = await waitFor(() => {
		expect(h.raw.data.append).toHaveBeenCalledTimes(1);
		return h.raw.data.append.mock.calls[0]![0] as AppendOpts;
	});
	expect(append.value.text).toBe("ping @B");
	expect(append.value.mentions).toBeUndefined();
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
	const append = await waitFor(() => {
		expect(h.raw.data.append).toHaveBeenCalledTimes(1);
		return h.raw.data.append.mock.calls[0]![0] as AppendOpts;
	});
	expect(append.value.mentions).toEqual(["user_anon"]);
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
	expect(h.raw.members.list.mock.calls.map((call) => call[0])).toEqual([{ limit: 100 }, { limit: 100, cursor: "page_2" }]);

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

test("sending in a private channel stamps lastMessageAt on the channel doc, debounced", async () => {
	const h = make_harness();
	// The channel was last stamped 16s before the send the append mock answers (t=50,000), so the
	// first send stamps; the second send lands 1s later, inside the 15s debounce, and does not.
	const staleStamp = 50_000 - 16_000;
	await boot_sidebar(h, [channel_doc(PRIVATE_KEY, "secret-plans", null, { lastMessageAt: staleStamp })], [PRIVATE_KEY]);
	const nav = screen.getByRole("navigation", { name: "Channels" });
	fireEvent.click(within(nav).getByRole("button", { name: /^#secret-plans/ }));
	await waitFor(() => expect(h.find_window("messages", `${PRIVATE_KEY}:`)).toBeTruthy());
	h.find_window("messages", `${PRIVATE_KEY}:`)!.onUpdate(window_update([]));

	h.raw.data.append.mockResolvedValueOnce({
		_yay: { key: `${PRIVATE_KEY}:${inv(50_000)}:sent`, revision: 1 },
	});
	const textarea = screen.getByRole("combobox", { name: "Message #secret-plans" }) as HTMLTextAreaElement;
	type_in_composer(textarea, "psst");
	fireEvent.keyDown(textarea, { key: "Enter" });

	// The sender stamps the channel doc so members with the channel closed can see unread state —
	// a rangeless read never sees a private scope, and this doc is all they get.
	const stamp = await waitFor(() => {
		const found = (h.raw.data.put.mock.calls as [PutOpts][])
			.map(([opts]) => opts)
			.find((opts) => opts.collection === "channels" && opts.key === PRIVATE_KEY);
		expect(found).toBeTruthy();
		return found!;
	});
	expect(stamp.value.lastMessageAt).toBe(50_000);
	expect(stamp.value.name).toBe("secret-plans");
	expect(stamp.expectedRevision).toBe(1);

	// The watch echoes the fresh stamp back into the channel doc; a send 1s later sits inside
	// the debounce, so no second stamp is written.
	h.find_watch("channels", PRIVATE_KEY)!.onUpdate(
		watch_update([channel_doc(PRIVATE_KEY, "secret-plans", null, { lastMessageAt: 50_000 })]),
	);
	h.raw.data.append.mockResolvedValueOnce({
		_yay: { key: `${PRIVATE_KEY}:${inv(51_000)}:sen2`, revision: 1 },
	});
	type_in_composer(textarea, "again");
	fireEvent.keyDown(textarea, { key: "Enter" });
	await waitFor(() => expect(h.raw.data.append).toHaveBeenCalledTimes(2));
	const stamps = (h.raw.data.put.mock.calls as [PutOpts][])
		.map(([opts]) => opts)
		.filter((opts) => opts.collection === "channels" && opts.key === PRIVATE_KEY);
	expect(stamps).toHaveLength(1);
});

// #endregion unreads, views, mentions
