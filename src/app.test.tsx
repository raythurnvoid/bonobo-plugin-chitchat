import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/preact";
import type { BonoboUiFrontendClient } from "bonobo-plugin-sdk/frontend";
import { afterEach, expect, test, vi } from "vitest";
import { App } from "./app";

function inv(epochMs: number): string {
	return String(9_999_999_999_999 - epochMs).padStart(13, "0");
}

// Channel keys are client-generated UUIDs.
const CH1_KEY = "11111111-1111-4111-8111-111111111111";
const CH2_KEY = "22222222-2222-4222-8222-222222222222";

function channel_doc(key: string, name: string, archivedAt: number | null = null) {
	return {
		collection: "channels",
		key,
		value: { name, archivedAt },
		revision: 1,
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
		rand?: string;
		text?: string;
		createdBy?: string;
		revision?: number;
		editedAt?: number | null;
		deletedAt?: number | null;
		attachments?: { fileNodeId: string; name: string }[];
	} = {},
) {
	return {
		collection: "messages",
		key: `${CH1_KEY}:${inv(epochMs)}:${overrides.rand ?? "aaaa"}`,
		value: {
			text: overrides.text ?? `text-${epochMs}`,
			attachments: overrides.attachments ?? [],
			editedAt: overrides.editedAt ?? null,
			deletedAt: overrides.deletedAt ?? null,
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

type WatchSub = {
	opts: { collection: string; keyPrefix?: string; limit: number };
	onUpdate: (docs: unknown[] | null) => void;
	unsubscribed: boolean;
};

type WindowUpdate = { docs: unknown[]; hasMore: boolean; atCapacity: boolean; incomplete: boolean };

type WindowSub = {
	opts: { collection: string; keyPrefix?: string; pageSize: number };
	onUpdate: (update: WindowUpdate | null) => void;
	unsubscribed: boolean;
	loadOlderCalls: number;
};

/** Builds one watchWindow update payload; flags default to a fully covered window. */
function window_update(docs: unknown[], overrides: Partial<Omit<WindowUpdate, "docs">> = {}): WindowUpdate {
	return { docs, hasMore: false, atCapacity: false, incomplete: false, ...overrides };
}

type WriteResult = { _yay: { key: string } } | { _nay: { name?: string; message: string } };
type AppendOpts = { collection: string; keyPrefix?: string; value: Record<string, unknown>; clientRequestId?: string };
type PutOpts = { collection: string; key: string; value: Record<string, unknown>; expectedRevision?: number };
type KeyOpts = { collection: string; key: string };
type FetchInit = { method?: string; headers?: Record<string, string>; body?: Record<string, unknown> };

function make_harness() {
	const watches: WatchSub[] = [];
	const windows: WindowSub[] = [];
	const names: Record<string, string | null> = { user_me: "Me", user_other: "Bob" };
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
		fetchJson: vi.fn<(path: string, init?: FetchInit) => Promise<unknown>>(async () => {
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
			append: vi.fn<(opts: AppendOpts) => Promise<WriteResult>>(async () => ({
				_yay: { key: `${CH1_KEY}:${inv(50_000)}:sent` },
			})),
			put: vi.fn<(opts: PutOpts) => Promise<WriteResult>>(async () => ({ _yay: { key: "k" } })),
			remove: vi.fn<(opts: KeyOpts) => Promise<WriteResult>>(async () => ({ _yay: { key: "k" } })),
			putOwned: vi.fn<(opts: PutOpts) => Promise<WriteResult>>(async () => ({ _yay: { key: "k" } })),
			removeOwned: vi.fn<(opts: KeyOpts) => Promise<WriteResult>>(async () => ({ _yay: { key: "k" } })),
		},
		members: {
			resolve: vi.fn(async (ids: string[]) => Object.fromEntries(ids.map((id) => [id, names[id] ?? null]))),
		},
	};
	const find_watch = (collection: string, keyPrefix?: string) => {
		const matches = watches.filter(
			(sub) =>
				!sub.unsubscribed &&
				sub.opts.collection === collection &&
				(keyPrefix === undefined || sub.opts.keyPrefix === keyPrefix),
		);
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
	return { client: client as unknown as BonoboUiFrontendClient, raw: client, watches, windows, find_watch, find_window };
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
	h.find_watch("channels")!.onUpdate(channels);
	if (channels.length > 0) {
		await waitFor(() => expect(h.find_window("messages", `${CH1_KEY}:`)).toBeTruthy());
	}
	return utils;
}

function announcer_text(container: Element): string {
	return container.querySelector(".chitchat-announcer")?.textContent ?? "";
}

afterEach(cleanup);

// #region channels and states

test("boot shows the channels loading status, then the empty state with a create button", async () => {
	const h = make_harness();
	render(<App client={h.client} />);
	expect(screen.getAllByRole("status").some((el) => el.textContent?.includes("Loading channels…"))).toBe(true);

	h.find_watch("channels")!.onUpdate([]);
	expect(await screen.findByText("No channels yet — create the first one.")).toBeTruthy();
	expect(screen.getByRole("button", { name: "Create channel" })).toBeTruthy();
});

test("the open channel carries aria-current and archived channels hide behind the toggle", async () => {
	const h = make_harness();
	await boot(h, [channel_doc(CH1_KEY, "general"), channel_doc(CH2_KEY, "old-stuff", 123)]);

	const generalButton = screen.getByRole("button", { name: "#general" });
	expect(generalButton.getAttribute("aria-current")).toBe("page");
	expect(screen.queryByRole("button", { name: "#old-stuff (archived)" })).toBeNull();

	fireEvent.click(screen.getByRole("button", { name: "Show archived" }));
	expect(await screen.findByRole("button", { name: "#old-stuff (archived)" })).toBeTruthy();
});

test("permission-lost: a null channels window replaces the page with an alert", async () => {
	const h = make_harness();
	await boot(h);
	h.find_watch("channels")!.onUpdate(null);

	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("Access to this plugin's data ended");
	expect(screen.queryByRole("log")).toBeNull();
});

test("a null messages window shows the channel-level alert", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(null);

	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("Access to messages in #general ended");
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

	fireEvent.click(screen.getByRole("button", { name: "Rename #general" }));
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

	fireEvent.click(screen.getByRole("button", { name: "Rename #general" }));
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

// #endregion log and messages

// #region send flow

test("Enter sends, Shift+Enter does not, and the send appends under the channel prefix", async () => {
	const h = make_harness();
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const input = await screen.findByRole("textbox", { name: "Message #general" });
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
	const ack = deferred<{ _yay: { key: string } }>();
	h.raw.data.append.mockReturnValueOnce(ack.promise);
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const input = await screen.findByRole("textbox", { name: "Message #general" });
	fireEvent.input(input, { target: { value: "hello there" } });
	fireEvent.click(screen.getByRole("button", { name: "Send" }));

	// "Sending…" appears twice: on the pending row's status and as the disabled Send label.
	expect(await screen.findAllByText("Sending…")).toBeTruthy();
	await waitFor(() => expect(screen.getByRole("button", { name: "Sending…" }).hasAttribute("disabled")).toBe(true));

	ack.resolve({ _yay: { key: `${CH1_KEY}:${inv(9_000)}:sent` } });
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
		.mockResolvedValueOnce({ _yay: { key: `${CH1_KEY}:${inv(9_000)}:sent` } })
		.mockResolvedValueOnce({ _yay: { key: `${CH1_KEY}:${inv(9_100)}:snd2` } });
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	const input = await screen.findByRole("textbox", { name: "Message #general" });
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

// #endregion send flow

// #region announcer

test("a remote arrival announces author and preview; the user's own send never announces", async () => {
	const h = make_harness();
	const ack = deferred<{ _yay: { key: string } }>();
	h.raw.data.append.mockReturnValueOnce(ack.promise);
	const { container } = await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([]));

	// Own send: the watch echo arrives BEFORE the ack (the common race). Only the
	// createdBy check keeps it out of the announcer.
	const input = await screen.findByRole("textbox", { name: "Message #general" });
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
	ack.resolve({ _yay: { key: ownKey } });

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

// #endregion own vs other affordances

// #region reactions

test("reaction chips group by createdBy, expose aria-pressed, and toggle putOwned/removeOwned", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "m1", text: "react to me" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("react to me");
	h.find_window("reactions", `${CH1_KEY}:`)!.onUpdate(
		window_update([
			reaction_doc(doc.key, "heart", "user_me"),
			reaction_doc(doc.key, "heart", "user_other"),
			reaction_doc(doc.key, "party", "user_other"),
		]),
	);

	const mineChip = await screen.findByRole("button", { name: "Heart, 2 reactions" });
	expect(mineChip.getAttribute("aria-pressed")).toBe("true");
	const otherChip = screen.getByRole("button", { name: "Party, 1 reaction" });
	expect(otherChip.getAttribute("aria-pressed")).toBe("false");

	// Toggling my own reaction off removes my owned doc.
	fireEvent.click(mineChip);
	await waitFor(() => expect(h.raw.data.removeOwned).toHaveBeenCalledTimes(1));
	expect(h.raw.data.removeOwned.mock.calls[0][0]).toEqual({ collection: "reactions", key: `${doc.key}:heart` });

	// Toggling a reaction I do not hold adds my owned doc.
	fireEvent.click(otherChip);
	await waitFor(() => expect(h.raw.data.putOwned).toHaveBeenCalledTimes(1));
	expect(h.raw.data.putOwned.mock.calls[0][0]).toEqual({ collection: "reactions", key: `${doc.key}:party`, value: {} });
});

test("a forged reaction doc with a mismatched key tail counts under createdBy", async () => {
	const h = make_harness();
	await boot(h);
	const doc = message_doc(1_000, { rand: "m1", text: "target" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([doc]));
	await screen.findByText("target");
	// user_other smuggled user_me's id into the caller key; createdBy is stamped user_other.
	h.find_window("reactions", `${CH1_KEY}:`)!.onUpdate(
		window_update([
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

// #endregion reactions

// #region threads

test("reply counts follow the replies window: covered roots get counts, the deepest partially-covered root does not, and 99+ follows hasMore", async () => {
	const h = make_harness();
	await boot(h);
	const rootNew = message_doc(2_000, { rand: "newr", text: "new root" });
	const rootOld = message_doc(1_000, { rand: "oldr", text: "old root" });
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([rootNew, rootOld]));
	await screen.findByText("old root");

	const replies = h.find_window("replies", `${CH1_KEY}:`)!;
	replies.onUpdate(
		window_update(
			Array.from({ length: 3 }, (_, index) => ({
				...message_doc(1_000, {}),
				collection: "replies",
				key: `${rootNew.key}:${inv(2_000 + index)}:r${index}`,
			})),
		),
	);
	expect(await screen.findByRole("button", { name: "3 replies" })).toBeTruthy();

	// While more replies exist below the window, rootNew is fully covered (the window
	// reaches the older rootOld), so its big count shows — capped at 99+. rootOld is the
	// deepest partially-covered root: its count would be a lower bound, so no count is
	// claimed for it.
	const hundredOnNew = Array.from({ length: 100 }, (_, index) => ({
		...message_doc(1_000, {}),
		collection: "replies",
		key: `${rootNew.key}:${inv(2_000 + index)}:r${index}`,
	}));
	const oneOnOld = {
		...message_doc(1_000, {}),
		collection: "replies",
		key: `${rootOld.key}:${inv(2_000)}:ro00`,
	};
	replies.onUpdate(window_update([...hundredOnNew, oneOnOld], { hasMore: true }));
	expect(await screen.findByRole("button", { name: "99+ replies" })).toBeTruthy();
	expect(screen.getByRole("button", { name: "View thread" })).toBeTruthy();

	// Once nothing more exists below, every count is exact and prints uncapped.
	replies.onUpdate(window_update([...hundredOnNew, oneOnOld]));
	expect(await screen.findByRole("button", { name: "100 replies" })).toBeTruthy();
	expect(screen.getByRole("button", { name: "1 reply" })).toBeTruthy();
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

	// The thread opens its own bounded replies watch on the root key.
	await waitFor(() => expect(h.find_watch("replies", `${doc.key}:`)).toBeTruthy());
	h.find_watch("replies", `${doc.key}:`)!.onUpdate([]);

	const replyBox = within(panel).getByRole("textbox", { name: "Reply in thread" });
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
	const ack = deferred<{ _yay: { key: string } }>();
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
	await waitFor(() => expect(h.find_watch("replies", `${rootA.key}:`)).toBeTruthy());
	h.find_watch("replies", `${rootA.key}:`)!.onUpdate([
		{ ...message_doc(3_000, { text: "reply on a" }), collection: "replies", key: `${rootA.key}:${inv(3_000)}:ra01` },
	]);
	await screen.findByText("reply on a");
	const replyBox = within(panel).getByRole("textbox", { name: "Reply in thread" });
	fireEvent.input(replyBox, { target: { value: "late reply" } });
	fireEvent.keyDown(replyBox, { key: "Enter" });
	await screen.findAllByText("Sending…");

	// Switch the panel to thread B: the panel must remount with fresh state — no A
	// replies, no surviving pending send whose retry would write under B's prefix.
	const rowB = screen.getByText("root b").closest("[data-key]") as HTMLElement;
	fireEvent.click(within(rowB).getByRole("button", { name: "Reply in thread" }));
	await waitFor(() => expect(h.find_watch("replies", `${rootB.key}:`)).toBeTruthy());
	const freshPanel = await screen.findByRole("region", { name: "Thread" });
	expect(await within(freshPanel).findByText("Loading replies…")).toBeTruthy();
	expect(screen.queryByText("reply on a")).toBeNull();
	expect(screen.queryByText("Sending…")).toBeNull();
});

// #endregion threads

// #region load older

test("Load older extends the window through the SDK window manager — the HTTP paging path is gone", async () => {
	const h = make_harness();
	await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(window_update([message_doc(1_000, { rand: "m1", text: "live one" })], { hasMore: true }));

	await screen.findByText("live one");
	fireEvent.click(screen.getByRole("button", { name: "Load older" }));
	expect(messages.loadOlderCalls).toBe(1);
	expect(h.raw.fetchJson).not.toHaveBeenCalled();

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

test("at capacity the Load older button yields to an honest status line", async () => {
	const h = make_harness();
	await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	messages.onUpdate(
		window_update([message_doc(1_000, { rand: "m1", text: "live one" })], { hasMore: true, atCapacity: true }),
	);

	await screen.findByText("live one");
	expect(screen.queryByRole("button", { name: "Load older" })).toBeNull();
	expect(screen.getByText("Older messages can't be loaded right now.")).toBeTruthy();
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

// #endregion load older

// #region companion catch-up

test("the catch-up loop extends a lagging companion window after every delivery", async () => {
	const h = make_harness();
	await boot(h);
	const messages = h.find_window("messages", `${CH1_KEY}:`)!;
	const reactions = h.find_window("reactions", `${CH1_KEY}:`)!;
	const replies = h.find_window("replies", `${CH1_KEY}:`)!;

	const rootNew = message_doc(2_000, { rand: "newr", text: "new root" });
	const rootOld = message_doc(1_000, { rand: "oldr", text: "old root" });
	messages.onUpdate(window_update([rootNew, rootOld]));
	await screen.findByText("old root");

	// Reactions cover only the newest root while more exist below: extend one page.
	reactions.onUpdate(window_update([reaction_doc(rootNew.key, "heart", "user_other")], { hasMore: true }));
	expect(reactions.loadOlderCalls).toBe(1);

	// The extension reaches the oldest rendered root: caught up, no further command.
	reactions.onUpdate(
		window_update([reaction_doc(rootNew.key, "heart", "user_other"), reaction_doc(rootOld.key, "party", "user_other")], {
			hasMore: true,
		}),
	);
	expect(reactions.loadOlderCalls).toBe(1);

	// hasMore false never triggers a command, and at capacity the loop stops honestly
	// instead of spamming commands the host would refuse.
	replies.onUpdate(window_update([]));
	expect(replies.loadOlderCalls).toBe(0);
	replies.onUpdate(window_update([], { hasMore: true, atCapacity: true }));
	expect(replies.loadOlderCalls).toBe(0);

	// A deeper messages delivery re-evaluates the companions: reactions lag again.
	const rootOldest = message_doc(500, { rand: "olds", text: "oldest root" });
	messages.onUpdate(window_update([rootNew, rootOld, rootOldest]));
	await screen.findByText("oldest root");
	expect(reactions.loadOlderCalls).toBe(2);
	expect(replies.loadOlderCalls).toBe(0);
});

// #endregion companion catch-up

// #region attachments

test("an attachment resolves its link on click; a permission error renders an inline alert", async () => {
	const h = make_harness();
	h.raw.fetchJson
		.mockResolvedValueOnce({
			items: [{ fileNodeId: "n1", url: "https://signed.example/n1", expiresAt: Date.now() + 600_000 }],
			errors: [],
			truncated: false,
		})
		.mockResolvedValueOnce({
			items: [],
			errors: [{ fileNodeId: "n2", message: "Permission denied" }],
			truncated: false,
		});
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(
		window_update([
			message_doc(1_000, { rand: "m1", text: "with files", attachments: [{ fileNodeId: "n1", name: "spec.pdf" }, { fileNodeId: "n2", name: "secret.txt" }] }),
		]),
	);

	await screen.findByText("with files");
	fireEvent.click(screen.getByRole("button", { name: "spec.pdf" }));
	const link = await screen.findByRole("link", { name: "spec.pdf" });
	expect(link.getAttribute("href")).toBe("https://signed.example/n1");
	expect(h.raw.fetchJson.mock.calls[0][1]?.body).toEqual({ fileNodeIds: ["n1"] });

	fireEvent.click(screen.getByRole("button", { name: "secret.txt" }));
	const alert = await screen.findByRole("alert");
	expect(alert.textContent).toContain("Permission denied");
});

test("the picker lists workspace files and a picked file rides the next send", async () => {
	const h = make_harness();
	h.raw.fetchJson.mockResolvedValueOnce({
		items: [
			{ path: "/docs/spec.pdf", name: "spec.pdf", kind: "file", nodeId: "n1", contentType: "application/pdf", updatedAt: 1 },
		],
		cursor: null,
		isDone: true,
	});
	await boot(h);
	h.find_window("messages", `${CH1_KEY}:`)!.onUpdate(window_update([]));

	fireEvent.click(await screen.findByRole("button", { name: "Attach file" }));
	const dialog = await screen.findByRole("dialog");
	expect(h.raw.fetchJson.mock.calls[0][0]).toBe("/api/v1/files/list");
	const listBody = h.raw.fetchJson.mock.calls[0][1]?.body;
	expect(listBody?.kind).toBe("file");
	expect(listBody?.contentTypePrefixes).toContain("image/");

	fireEvent.click(await within(dialog).findByRole("button", { name: /spec\.pdf/ }));
	await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

	const input = screen.getByRole("textbox", { name: "Message #general" });
	fireEvent.input(input, { target: { value: "see attached" } });
	fireEvent.keyDown(input, { key: "Enter" });
	await waitFor(() => expect(h.raw.data.append).toHaveBeenCalledTimes(1));
	expect(h.raw.data.append.mock.calls[0][0].value.attachments).toEqual([{ fileNodeId: "n1", name: "spec.pdf" }]);
});

// #endregion attachments
