import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { Doc, Id } from "../convex/_generated/dataModel";
import { App, ChatErrorBoundary } from "./app";
import { ChannelActionDialog, ChannelNameDialog, ChannelPeopleDialog } from "./channel-dialogs";
import { TranscriptStatus } from "./transcript-status";

// These are native query snapshots. Transport and authorization have separate backend tests.
const fake = vi.hoisted(() => ({
	channels: [] as unknown[],
	messages: [] as unknown[],
	replies: [] as unknown[],
	roster: [] as { userId: string; displayName: string | null }[],
	version: 0,
	listeners: new Set<() => void>(),
	cache: new Map<string, unknown>(),
	overrides: new Map<string, unknown>(),
	active: new Map<string, { name: string; args: Record<string, unknown> }[]>(),
	query: vi.fn(),
	mutation: vi.fn(),
	action: vi.fn(),
	narrow: false,
	media: new Set<(event: { matches: boolean }) => void>(),
	session: {
		ready: true,
		refreshing: false,
		connected: true,
		canSend: true,
		can_request_now: (): boolean => true,
		member: { generation: "fresh", membershipLifetime: 1, displayName: "Alice" } as
			| { generation: string; membershipLifetime: number; displayName: string }
			| undefined,
		message: null as string | null,
		retry: vi.fn(),
	},
}));
vi.mock("./session", () => ({ use_chat_session: () => fake.session }));
vi.mock("convex/react", async () => {
	const { useEffect, useId, useSyncExternalStore } = await import("react");
	const { getFunctionName } = await import("convex/server");
	const convex = {
		query: (reference: Parameters<typeof getFunctionName>[0], args: unknown) =>
			fake.query(getFunctionName(reference), args),
		mutation: (reference: Parameters<typeof getFunctionName>[0], args: unknown) =>
			fake.mutation(getFunctionName(reference), args),
	};
	function useSnapshots(requests: { name: string; args: Record<string, unknown> }[]) {
		const id = useId();
		const key = JSON.stringify(requests);
		useSyncExternalStore(
			(listener) => {
				fake.listeners.add(listener);
				return () => {
					fake.listeners.delete(listener);
				};
			},
			() => fake.version,
		);
		useEffect(() => {
			fake.active.set(id, requests);
			return () => {
				fake.active.delete(id);
			};
		}, [id, key]);
	}
	return {
		useConvex: () => convex,
		useQuery: (reference: Parameters<typeof getFunctionName>[0], args: Record<string, unknown> | "skip") => {
			const name = getFunctionName(reference);
			useSnapshots(args === "skip" ? [] : [{ name, args }]);
			return args === "skip" ? undefined : query_answer(name, args);
		},
		useQueries: (
			queries: Record<string, { query: Parameters<typeof getFunctionName>[0]; args: Record<string, unknown> }>,
		) => {
			useSnapshots(Object.values(queries).map((entry) => ({ name: getFunctionName(entry.query), args: entry.args })));
			return Object.fromEntries(
				Object.entries(queries).map(([key, entry]) => [key, query_answer(getFunctionName(entry.query), entry.args)]),
			);
		},
		useMutation: (reference: Parameters<typeof getFunctionName>[0]) => (args: unknown) =>
			fake.mutation(getFunctionName(reference), args),
		useAction: (reference: Parameters<typeof getFunctionName>[0]) => (args: unknown) =>
			fake.action(getFunctionName(reference), args),
	};
});

const installationId = "installation-one" as Id<"installations">;
function channel(id: string, changes: Partial<Doc<"channels">> = {}): Doc<"channels"> {
	return {
		_id: id as Id<"channels">,
		_creationTime: 1,
		installationId,
		generation: "fresh",
		publicId: id,
		name: id,
		sortName: id,
		topic: "Team chat",
		visibility: "public",
		createdBy: "alice",
		createdAt: 1,
		revision: 1,
		membershipRevision: 1,
		memberCount: 2,
		archivedAt: null,
		deletedAt: null,
		lastRootSequence: 1,
		lastReplySequence: 0,
		lastRootAt: 1,
		lastReplyAt: 0,
		transcriptSlug: id,
		...changes,
	};
}
function message(channelId: Id<"channels">, changes: Partial<Doc<"messages">> = {}): Doc<"messages"> {
	return {
		_id: `${channelId}-root` as Id<"messages">,
		_creationTime: 1,
		installationId,
		channelId,
		visibility: "public",
		rootMessageId: null,
		publicId: `${channelId}-root`,
		marker: `${channelId}-root`,
		authorHostUserId: "bob",
		authorName: "Bob",
		createdAt: 1_800_000_000_000,
		sequence: 1,
		channelReplySequence: null,
		text: `Message in ${channelId}`,
		attachments: [],
		mentions: [],
		revision: 1,
		editedAt: null,
		deletedAt: null,
		...changes,
	};
}
function paginate<T>(all: T[], args: Record<string, unknown>) {
	const options = args.paginationOpts as { numItems: number; cursor: string | null };
	const offset = Number(options.cursor ?? 0);
	const page = all.slice(offset, offset + options.numItems);
	return { page, continueCursor: String(offset + page.length), isDone: offset + page.length >= all.length };
}
function query_answer(name: string, args: Record<string, unknown>): unknown {
	const exact = `${name}:${JSON.stringify(args)}`;
	if (fake.overrides.has(exact)) return fake.overrides.get(exact);
	if (fake.overrides.has(name)) return fake.overrides.get(name);
	const key = `${fake.version}:${exact}`;
	if (fake.cache.has(key)) return fake.cache.get(key);
	const channels = fake.channels as Doc<"channels">[];
	const messages = fake.messages as Doc<"messages">[];
	const replies = fake.replies as Doc<"messages">[];
	let result: unknown;
	if (name === "channels:list_public")
		result = paginate(
			channels.filter((entry) => entry.visibility === "public" && (entry.archivedAt !== null) === args.archived),
			args,
		);
	else if (name === "channels:list_mine")
		result = paginate(
			channels.filter(
				(entry) =>
					entry.visibility === "private" &&
					(args.archived === undefined || (entry.archivedAt !== null) === args.archived),
			),
			args,
		);
	else if (name === "channels:get") result = channels.find((entry) => entry._id === args.channelId) ?? null;
	else if (name === "channels:permissions") result = { canWrite: true, canManage: true };
	else if (name === "read_states:get_for_channel")
		result = {
			state: { rootSequence: 0, replySequence: 0 },
			hasUnread: false,
			mentionCount: 0,
			latest: null,
			lastActivityAt: 1,
		};
	else if (name === "messages:latest_roots") {
		const rows = messages.filter((entry) => entry.channelId === args.channelId);
		result = { messages: rows.slice(0, 50), sequence: rows[0]?.sequence ?? 0 };
	} else if (name === "messages:latest_replies") {
		const rows = replies.filter((entry) => entry.rootMessageId === args.rootMessageId);
		result = { messages: rows.slice(0, 50), sequence: rows[0]?.sequence ?? 0 };
	} else if (name === "messages:get") result = messages.find((entry) => entry._id === args.messageId) ?? null;
	else if (name === "messages:list_roots" || name === "messages:list_replies") result = paginate([], args);
	else if (name === "reactions:get_for_message") result = [];
	else if (name === "threads:get_summary")
		result = {
			totalReplyCount: replies.filter((entry) => entry.rootMessageId === args.rootMessageId).length,
			latestReplyAt: replies[0]?.createdAt ?? null,
		};
	else if (name === "views:activity" || name === "views:threads" || name === "views:unreads")
		result = paginate([], args);
	else if (name === "members:list") result = paginate(fake.roster, args);
	else if (name === "members:resolve")
		result = Object.fromEntries(
			(args.userIds as string[]).map((id) => [
				id,
				fake.roster.find((person) => person.userId === id)?.displayName ?? null,
			]),
		);
	else if (name === "channels:list_members")
		result = {
			page: [
				{ hostUserId: "alice", membershipLifetime: 1, level: "manage" },
				{ hostUserId: "bob", membershipLifetime: 1, level: "write" },
			],
			isDone: true,
			continueCursor: "",
			membershipRevision: 1,
			memberCount: 2,
		};
	else if (name === "channel_members:status" || name === "transcripts:status") result = null;
	else throw new Error(`Unhandled native query ${name}`);
	fake.cache.set(key, result);
	return result;
}
function client(): BonoboClient {
	return {
		context: { userId: "alice" },
		getToken: vi.fn(async () => "plu_test"),
		fetchJson: vi.fn(),
	} as unknown as BonoboClient;
}
function publish() {
	act(() => {
		fake.version += 1;
		fake.cache.clear();
		for (const listener of fake.listeners) listener();
	});
}
function set_connection(ready: boolean) {
	fake.session.ready = ready;
	fake.session.connected = ready;
	fake.session.canSend = ready;
	fake.session.member = ready ? { generation: "fresh", membershipLifetime: 1, displayName: "Alice" } : undefined;
	fake.session.message = ready ? null : "Chitchat is reconnecting. Your draft is kept.";
	publish();
}
function resize(narrow: boolean) {
	act(() => {
		fake.narrow = narrow;
		for (const listener of fake.media) listener({ matches: narrow });
	});
}
function queries(name: string) {
	return [...fake.active.values()].flat().filter((entry) => entry.name === name);
}
function deferred<T>() {
	let resolve!: (value: T) => void;
	let reject!: (cause: unknown) => void;
	const promise = new Promise<T>((yay, nay) => {
		resolve = yay;
		reject = nay;
	});
	return { promise, resolve, reject };
}
beforeEach(() => {
	fake.channels = [channel("general"), channel("random"), channel("private-room", { visibility: "private" })];
	fake.messages = (fake.channels as Doc<"channels">[]).map((entry) =>
		message(entry._id, { visibility: entry.visibility }),
	);
	fake.replies = [];
	fake.roster = [
		{ userId: "alice", displayName: "Alice" },
		{ userId: "bob", displayName: "Bob" },
		{ userId: "carol", displayName: "Carol" },
	];
	fake.version = 0;
	fake.cache.clear();
	fake.overrides.clear();
	fake.active.clear();
	fake.narrow = false;
	fake.media.clear();
	fake.session = {
		ready: true,
		refreshing: false,
		connected: true,
		canSend: true,
		can_request_now: () => fake.session.ready && fake.session.connected,
		member: { generation: "fresh", membershipLifetime: 1, displayName: "Alice" },
		message: null,
		retry: vi.fn(),
	};
	fake.query
		.mockReset()
		.mockImplementation(async (name: string, args: Record<string, unknown>) => query_answer(name, args));
	fake.mutation.mockReset().mockResolvedValue({ _yay: { kind: "channel", channelId: "general", revision: 2 } });
	fake.action.mockReset().mockResolvedValue({ _yay: true });
	vi.stubGlobal(
		"ResizeObserver",
		class {
			observe() {}
			disconnect() {}
		},
	);
	vi.stubGlobal("matchMedia", (query: string) => ({
		media: query,
		matches: query === "(max-width: 719px)" && fake.narrow,
		addEventListener: (_type: string, listener: (event: { matches: boolean }) => void) => {
			if (query === "(max-width: 719px)") fake.media.add(listener);
		},
		removeEventListener: (_type: string, listener: (event: { matches: boolean }) => void) =>
			fake.media.delete(listener),
		addListener() {},
		removeListener() {},
	}));
});
afterEach(() => {
	cleanup();
	vi.clearAllTimers();
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

describe("App", () => {
	test("keeps an inline edit and its subscriptions during a verified token refresh", async () => {
		fake.messages = [message((fake.channels[0] as Doc<"channels">)._id, { authorHostUserId: "alice" })];
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "#general" }));
		await screen.findByRole("log", { name: "Messages in #general" });
		fireEvent.click(screen.getByRole("button", { name: "Edit" }));
		fireEvent.change(screen.getByLabelText("Edit message"), { target: { value: "Keep this unsaved edit" } });
		fake.session.ready = false;
		fake.session.refreshing = true;
		fake.session.canSend = false;
		fake.overrides.set("channels:get", null);
		fake.overrides.set("messages:latest_roots", null);
		publish();
		expect(queries("channels:get")).toHaveLength(1);
		expect(queries("messages:latest_roots")).toHaveLength(1);
		expect((screen.getByLabelText("Edit message") as HTMLTextAreaElement).value).toBe("Keep this unsaved edit");
		expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(true);
		fake.overrides.clear();
		fake.session.ready = true;
		fake.session.refreshing = false;
		fake.session.canSend = true;
		publish();
		expect((screen.getByLabelText("Edit message") as HTMLTextAreaElement).value).toBe("Keep this unsaved edit");
		fake.overrides.set("channels:get", null);
		fake.overrides.set("messages:latest_roots", null);
		publish();
		expect(screen.queryByLabelText("Edit message")).toBeNull();
		expect(document.body.textContent).not.toContain("Message in general");
	});
	test("pages public and private channels with bounded read subscriptions", () => {
		fake.channels = Array.from({ length: 121 }, (_, index) => channel(`public-${index + 1}`)).concat(
			Array.from({ length: 61 }, (_, index) => channel(`private-${index + 1}`, { visibility: "private" })),
		);
		render(<App client={client()} />);
		expect(document.querySelectorAll(".channel-item")).toHaveLength(100);
		expect(queries("read_states:get_for_channel")).toHaveLength(100);
		const controls = screen.getByLabelText("Public channels pages");
		fireEvent.click(within(controls).getByRole("button", { name: "Next" }));
		expect(screen.queryByRole("button", { name: "#public-1" })).toBeNull();
		expect(screen.getByRole("button", { name: "#public-51" })).toBeTruthy();
		expect(document.querySelectorAll(".channel-item")).toHaveLength(100);
		expect(queries("read_states:get_for_channel")).toHaveLength(100);
		fireEvent.click(within(screen.getByLabelText("Private channels pages")).getByRole("button", { name: "Next" }));
		expect(document.querySelectorAll(".channel-item")).toHaveLength(61);
		expect(queries("channels:list_mine")[0].args).toEqual({
			archived: false,
			paginationOpts: { numItems: 50, cursor: "50" },
		});
	});
	test("can walk long channel lists with only 20 back cursors and return to First", () => {
		fake.channels = Array.from({ length: 1251 }, (_, index) => channel(`room-${index + 1}`));
		render(<App client={client()} />);
		const controls = screen.getByLabelText("Public channels pages");
		for (let page = 0; page < 24; page += 1) fireEvent.click(within(controls).getByRole("button", { name: "Next" }));
		expect(within(controls).getByText("Page 25")).toBeTruthy();
		for (let page = 0; page < 20; page += 1)
			fireEvent.click(within(controls).getByRole("button", { name: "Previous" }));
		expect((within(controls).getByRole("button", { name: "Previous" }) as HTMLButtonElement).disabled).toBe(true);
		expect(within(controls).getByText("Page 5")).toBeTruthy();
		fireEvent.click(within(controls).getByRole("button", { name: "First" }));
		expect(screen.getByRole("button", { name: "#room-1" })).toBeTruthy();
	}, 15_000);
	test("shows a truthful partial unread badge and continues through empty filtered pages", () => {
		fake.channels = Array.from({ length: 51 }, (_, index) => channel(`room-${index + 1}`));
		fake.overrides.set('read_states:get_for_channel:{"channelId":"room-1"}', {
			state: null,
			hasUnread: true,
			mentionCount: 101,
			latest: null,
			lastActivityAt: 1,
		});
		fake.overrides.set('views:unreads:{"visibility":"public","paginationOpts":{"numItems":50,"cursor":null}}', {
			page: [],
			continueCursor: "50",
			isDone: false,
		});
		render(<App client={client()} />);
		const unreads = screen.getByRole("button", { name: /Unreads 1\+ unread channels shown/ });
		expect(screen.getByRole("button", { name: /#room-1 99\+ unread mentions/ })).toBeTruthy();
		fireEvent.click(unreads);
		expect(screen.queryByText("You are all caught up.")).toBeNull();
		const region = screen.getByRole("region", { name: "Unreads" });
		fireEvent.click(
			within(within(region).getByLabelText("Public channels pages")).getByRole("button", { name: "Next" }),
		);
		expect(queries("views:unreads").some((entry) => JSON.stringify(entry.args).includes('"cursor":"50"'))).toBe(true);
	});
	test("does not claim the workspace is empty on a filtered non-final private page", () => {
		fake.channels = [];
		fake.overrides.set("channels:list_mine", { page: [], continueCursor: "50", isDone: false });
		render(<App client={client()} />);
		expect(document.body.textContent).not.toContain("No channels yet");
		expect(
			(
				within(screen.getByLabelText("Private channels pages")).getByRole("button", {
					name: "Next",
				}) as HTMLButtonElement
			).disabled,
		).toBe(false);
	});
	test("only the selected public overview keeps its query and a thread row opens its root", async () => {
		const general = fake.channels[0] as Doc<"channels">;
		const root = fake.messages[0] as Doc<"messages">;
		const reply = message(general._id, {
			_id: "reply-one" as Id<"messages">,
			rootMessageId: root._id,
			text: "latest reply",
		});
		fake.replies = [reply];
		fake.overrides.set("views:activity", {
			page: [{ channel: general, message: { ...root, mentions: ["alice"] } }],
			continueCursor: "",
			isDone: true,
		});
		fake.overrides.set("views:threads", {
			page: [
				{
					channel: general,
					summary: { _id: "summary-one", rootMessageId: root._id, activeReplyCount: 1 },
					latest: reply,
				},
			],
			continueCursor: "",
			isDone: true,
		});
		render(<App client={client()} />);
		expect(queries("views:activity")).toHaveLength(0);
		fireEvent.click(screen.getByRole("button", { name: "Activity" }));
		const activity = screen.getByRole("region", { name: "Activity" });
		expect(activity.textContent).toContain("Private channels are not shown here.");
		expect(activity.querySelector(".mention-self")).not.toBeNull();
		fireEvent.click(screen.getByRole("button", { name: "Threads" }));
		expect(queries("views:activity")).toHaveLength(0);
		expect(queries("views:threads")).toHaveLength(1);
		fireEvent.click(within(screen.getByRole("region", { name: "Threads" })).getByRole("button"));
		await screen.findByRole("region", { name: "Thread" });
		expect(queries("messages:get")[0].args).toEqual({ messageId: root._id });
		expect(queries("views:threads")).toHaveLength(0);
	});
	test("keeps the selected channel when its sidebar page is replaced", async () => {
		fake.channels = Array.from({ length: 51 }, (_, index) => channel(`room-${index + 1}`));
		fake.messages = [message("room-1" as Id<"channels">)];
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "#room-1" }));
		await screen.findByRole("log", { name: "Messages in #room-1" });
		fireEvent.click(within(screen.getByLabelText("Public channels pages")).getByRole("button", { name: "Next" }));
		expect(screen.getByRole("log", { name: "Messages in #room-1" })).toBeTruthy();
		expect(screen.queryByRole("button", { name: "#room-1" })).toBeNull();
	});
	test("resolves every visible author even when many mentions fill the name budget", async () => {
		fake.channels = [channel("general", { lastRootSequence: 50 })];
		fake.roster = [];
		fake.messages = Array.from({ length: 50 }, (_, index) => {
			const authorId = `author-${index}`;
			fake.roster.push({ userId: authorId, displayName: `Author ${index}` });
			const mentions = Array.from({ length: 50 }, (_, mention) => `mention-${index}-${mention}`);
			for (const id of mentions) fake.roster.push({ userId: id, displayName: id });
			return message("general" as Id<"channels">, {
				_id: `root-${index}` as Id<"messages">,
				authorHostUserId: authorId,
				authorName: `Author ${index}`,
				sequence: 50 - index,
				mentions,
				text: mentions.map((id) => `@${id}`).join(" "),
			});
		});
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "#general" }));
		await screen.findByText("Author 0");
		expect(document.querySelectorAll(".message")).toHaveLength(50);
		expect(
			fake.query.mock.calls.filter(([name]) => name === "members:resolve").flatMap(([, args]) => args.userIds),
		).toContain("author-49");
		expect(screen.getByText("Author 49")).toBeTruthy();
	});
	test("opens a channel without duplicate sibling keys", async () => {
		const errors = vi.spyOn(console, "error").mockImplementation(() => {});
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "#general" }));
		await screen.findByText("Message in general");
		expect(errors.mock.calls.filter((call) => String(call[0]).includes("same key"))).toEqual([]);
	});
	test("a newer selection wins over a delayed channel open", async () => {
		const pending = deferred<unknown>();
		fake.query.mockImplementationOnce(() => pending.promise);
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "#general" }));
		fireEvent.click(screen.getByRole("button", { name: "#random" }));
		await screen.findByRole("log", { name: "Messages in #random" });
		await act(async () => pending.resolve({ state: { rootSequence: 0 } }));
		expect(screen.getByRole("log", { name: "Messages in #random" })).toBeTruthy();
	});
	test("a delayed open cannot restore a private name after access expires", async () => {
		const pending = deferred<unknown>();
		fake.query.mockImplementationOnce(() => pending.promise);
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "#private-room (private)" }));
		set_connection(false);
		await act(async () => pending.resolve(null));
		expect(document.body.textContent).not.toContain("private-room");
	});
	test("losing write access hides write actions but keeps public messages readable", async () => {
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "#general" }));
		await screen.findByText("Message in general");
		fake.session.canSend = false;
		fake.overrides.set("channels:permissions", { canWrite: false, canManage: false });
		publish();
		expect(screen.getByText("Message in general")).toBeTruthy();
		expect((screen.getByRole("button", { name: "Send" }) as HTMLButtonElement).disabled).toBe(true);
		expect((screen.getByRole("button", { name: "Create channel" }) as HTMLButtonElement).disabled).toBe(true);
		fireEvent.click(screen.getByRole("button", { name: "Actions for #general" }));
		expect(screen.queryByRole("menuitem", { name: "Rename #general" })).toBeNull();
	});
	test("keeps a selected composer draft and clears private rows during lease loss", async () => {
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "#private-room (private)" }));
		await screen.findByText("Message in private-room");
		fireEvent.change(screen.getByRole("combobox", { name: "Message #private-room" }), {
			target: { value: "my pending draft" },
		});
		set_connection(false);
		expect(screen.queryByText("Message in private-room")).toBeNull();
		expect((screen.getByRole("combobox", { name: "Message draft" }) as HTMLTextAreaElement).value).toBe(
			"my pending draft",
		);
		set_connection(true);
		expect((screen.getByRole("combobox", { name: "Message #private-room" }) as HTMLTextAreaElement).value).toBe(
			"my pending draft",
		);
	});
	test("moves narrow focus from the sidebar to Channels and keeps drawer Escape usable", async () => {
		render(<App client={client()} />);
		const general = screen.getByRole("button", { name: "#general" });
		general.focus();
		resize(true);
		const toggle = screen.getByRole("button", { name: "Channels" });
		expect(document.activeElement).toBe(toggle);
		expect(document.querySelector(".sidebar-inner")?.hasAttribute("inert")).toBe(true);
		fireEvent.click(toggle);
		expect(screen.getByRole("navigation", { name: "Channels" }).classList.contains("is-open")).toBe(true);
		expect(document.querySelector(".sidebar-inner")?.hasAttribute("inert")).toBe(false);
		general.focus();
		fireEvent.keyDown(general, { key: "Escape" });
		expect(document.activeElement).toBe(toggle);
		expect(toggle.getAttribute("aria-expanded")).toBe("false");
		expect(screen.getByRole("heading", { name: "Chitchat", level: 1 })).toBeTruthy();
	});
	test("moves focus from a hidden separator to the narrow thread back control", async () => {
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "#general" }));
		await screen.findByText("Message in general");
		fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
		const separator = screen.getByRole("separator", { name: "Resize thread panel" });
		separator.focus();
		resize(true);
		expect(document.activeElement).toBe(screen.getByRole("button", { name: "Back to messages" }));
		fireEvent.click(screen.getByRole("button", { name: "Back to messages" }));
		expect(screen.queryByRole("region", { name: "Thread" })).toBeNull();
	});
	test("blocks view and channel navigation while a message send is in flight", async () => {
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "#general" }));
		await screen.findByText("Message in general");
		const pending = deferred<unknown>();
		fake.mutation.mockImplementation((name: string) =>
			name === "messages:send" ? pending.promise : Promise.resolve({ _yay: true }),
		);
		fireEvent.change(screen.getByRole("combobox", { name: "Message #general" }), { target: { value: "pending send" } });
		fireEvent.click(screen.getByRole("button", { name: "Send" }));
		expect((screen.getByRole("button", { name: "#random" }) as HTMLButtonElement).disabled).toBe(true);
		expect((screen.getByRole("button", { name: "Activity" }) as HTMLButtonElement).disabled).toBe(true);
		await act(async () =>
			pending.resolve({ _yay: { kind: "message", messageId: "new-message", revision: 1, sequence: 2 } }),
		);
		expect((screen.getByRole("button", { name: "#random" }) as HTMLButtonElement).disabled).toBe(false);
	});
	test("keeps an open create draft through temporary lease loss", async () => {
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
		fireEvent.input(screen.getByLabelText("Channel name"), { target: { value: "draft-room" } });
		set_connection(false);
		set_connection(true);
		expect((screen.getByLabelText("Channel name") as HTMLInputElement).value).toBe("draft-room");
	});
	test("keeps an uncertain create request ID through temporary lease loss", async () => {
		fake.mutation.mockRejectedValueOnce(new Error("Lost response"));
		render(<App client={client()} />);
		fireEvent.click(screen.getByRole("button", { name: "Create channel" }));
		fireEvent.input(screen.getByLabelText("Channel name"), { target: { value: "once-only" } });
		fireEvent.click(screen.getByRole("button", { name: "Create" }));
		await screen.findByText("The save may have reached Chitchat. Retry to check the same request.");
		const first = fake.mutation.mock.calls[0][1];
		set_connection(false);
		set_connection(true);
		fireEvent.click(screen.getByRole("button", { name: "Retry" }));
		await waitFor(() => expect(fake.mutation).toHaveBeenCalledTimes(2));
		expect(fake.mutation.mock.calls[1][1]).toEqual(first);
	});
	test("keeps archived private channels outside the active list", () => {
		fake.channels.push(channel("private-archive", { visibility: "private", archivedAt: 2 }));
		render(<App client={client()} />);
		expect(screen.queryByRole("button", { name: /#private-archive \(private\)/ })).toBeNull();
		fireEvent.click(screen.getByRole("button", { name: "Show archived channels" }));
		expect(screen.getByRole("button", { name: /#private-archive \(private\) \(archived\)/ })).toBeTruthy();
	});
	test("retries the same observed read position after a transient refusal", async () => {
		vi.useFakeTimers();
		fake.mutation.mockResolvedValueOnce({ _nay: { name: "unavailable", message: "Try again" } });
		render(<App client={client()} />);
		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: "#general" }));
		});
		expect(fake.mutation.mock.calls.filter(([name]) => name === "read_states:mark_read")).toHaveLength(1);
		await act(async () => {
			await vi.advanceTimersByTimeAsync(5000);
		});
		const calls = fake.mutation.mock.calls.filter(([name]) => name === "read_states:mark_read");
		expect(calls.length).toBeGreaterThan(1);
		expect(calls[1][1]).toEqual(calls[0][1]);
	});
	test("stops a pending read retry when the private channel is no longer readable", async () => {
		vi.useFakeTimers();
		fake.mutation.mockResolvedValue({ _nay: { message: "Not found" } });
		render(<App client={client()} />);
		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: "#private-room (private)" }));
		});
		expect(fake.mutation.mock.calls.filter(([name]) => name === "read_states:mark_read")).toHaveLength(1);
		fake.channels = (fake.channels as Doc<"channels">[]).filter((entry) => entry.visibility !== "private");
		fake.overrides.set("messages:latest_roots", null);
		publish();
		await act(async () => {
			await vi.advanceTimersByTimeAsync(5000);
		});
		expect(fake.mutation.mock.calls.filter(([name]) => name === "read_states:mark_read")).toHaveLength(1);
	});
	test("stops read retries during a disconnected lease and resumes after reconnect", async () => {
		vi.useFakeTimers();
		fake.mutation.mockResolvedValueOnce({ _nay: { message: "Try again" } });
		render(<App client={client()} />);
		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: "#general" }));
		});
		set_connection(false);
		await act(async () => {
			await vi.advanceTimersByTimeAsync(5000);
		});
		expect(fake.mutation.mock.calls.filter(([name]) => name === "read_states:mark_read")).toHaveLength(1);
		set_connection(true);
		await act(async () => {});
		expect(fake.mutation.mock.calls.filter(([name]) => name === "read_states:mark_read")).toHaveLength(2);
	});
});

describe("ChannelNameDialog", () => {
	test("validates blank names and submits trimmed name and topic", async () => {
		const onSaved = vi.fn();
		render(<ChannelNameDialog channel={null} selfUserId="alice" onSaved={onSaved} onClose={vi.fn()} />);
		const name = screen.getByLabelText("Channel name");
		expect(document.activeElement).toBe(name);
		fireEvent.input(name, { target: { value: "   " } });
		fireEvent.submit(name.closest("form")!);
		expect(fake.mutation).not.toHaveBeenCalled();
		expect(screen.getByRole("alert").textContent).toContain("1–64");
		fireEvent.input(name, { target: { value: "  product  " } });
		fireEvent.input(screen.getByLabelText("Topic (optional)"), { target: { value: "  team plans  " } });
		fireEvent.click(screen.getByRole("button", { name: "Create" }));
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith(
				"channels:create",
				expect.objectContaining({ name: "product", topic: "team plans", visibility: "public", invitedUserIds: [] }),
			),
		);
		expect(onSaved).toHaveBeenCalledWith("general");
	});
	test("uses current people for one private-channel create and gives the owner disclosure", async () => {
		render(<ChannelNameDialog channel={null} selfUserId="alice" onSaved={vi.fn()} onClose={vi.fn()} />);
		fireEvent.input(screen.getByLabelText("Channel name"), { target: { value: "direct" } });
		fireEvent.click(screen.getByRole("checkbox", { name: "Private channel" }));
		expect(screen.getByText(/organization owner can read this channel/)).toBeTruthy();
		expect(screen.queryByRole("checkbox", { name: "Alice" })).toBeNull();
		fireEvent.click(screen.getByRole("checkbox", { name: "Bob" }));
		expect(screen.getByText("2 people selected, including you.")).toBeTruthy();
		fireEvent.click(screen.getByRole("button", { name: "Create" }));
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith(
				"channels:create",
				expect.objectContaining({ visibility: "private", invitedUserIds: ["bob"] }),
			),
		);
	});
	test("keeps private selections while replacing a 100-member roster page", () => {
		fake.roster = Array.from({ length: 121 }, (_, index) => ({
			userId: `user-${index}`,
			displayName: `Person ${index}`,
		}));
		render(<ChannelNameDialog channel={null} selfUserId="alice" onSaved={vi.fn()} onClose={vi.fn()} />);
		fireEvent.click(screen.getByRole("checkbox", { name: "Private channel" }));
		fireEvent.click(screen.getByRole("checkbox", { name: "Person 0" }));
		fireEvent.click(within(screen.getByLabelText("People pages")).getByRole("button", { name: "Next" }));
		expect(screen.queryByRole("checkbox", { name: "Person 0" })).toBeNull();
		fireEvent.click(screen.getByRole("checkbox", { name: "Person 100" }));
		fireEvent.click(within(screen.getByLabelText("People pages")).getByRole("button", { name: "First" }));
		expect((screen.getByRole("checkbox", { name: "Person 0" }) as HTMLInputElement).checked).toBe(true);
		expect(screen.getByText("3 people selected, including you.")).toBeTruthy();
	});
	test("unlocks fields after a definite refusal and starts a fresh request", async () => {
		fake.mutation.mockResolvedValueOnce({ _nay: { name: "conflict", message: "Choose a different name" } });
		render(<ChannelNameDialog channel={null} selfUserId="alice" onSaved={vi.fn()} onClose={vi.fn()} />);
		const name = screen.getByLabelText("Channel name");
		fireEvent.input(name, { target: { value: "first" } });
		fireEvent.click(screen.getByRole("button", { name: "Create" }));
		await screen.findByText("Choose a different name");
		expect((name as HTMLInputElement).disabled).toBe(false);
		fireEvent.input(name, { target: { value: "second" } });
		fireEvent.click(screen.getByRole("button", { name: "Create" }));
		await waitFor(() => expect(fake.mutation).toHaveBeenCalledTimes(2));
		expect(fake.mutation.mock.calls[1][1].clientRequestId).not.toBe(fake.mutation.mock.calls[0][1].clientRequestId);
	});
	test("freezes an uncertain rename and retries its same revision and text", async () => {
		fake.mutation.mockRejectedValueOnce(new Error("Lost response"));
		render(
			<ChannelNameDialog
				channel={channel("general", { revision: 4 })}
				selfUserId="alice"
				onSaved={vi.fn()}
				onClose={vi.fn()}
			/>,
		);
		fireEvent.input(screen.getByLabelText("Channel name"), { target: { value: "renamed" } });
		fireEvent.input(screen.getByLabelText("Topic (optional)"), { target: { value: "" } });
		fireEvent.click(screen.getByRole("button", { name: "Rename" }));
		await screen.findByText("The save may have reached Chitchat. Retry to check the same request.");
		expect((screen.getByLabelText("Channel name") as HTMLInputElement).disabled).toBe(true);
		fireEvent.click(screen.getByRole("button", { name: "Retry" }));
		await waitFor(() => expect(fake.mutation).toHaveBeenCalledTimes(2));
		expect(fake.mutation.mock.calls[1][1]).toEqual(fake.mutation.mock.calls[0][1]);
		expect(fake.mutation.mock.calls[0][1]).toMatchObject({ expectedRevision: 4, name: "renamed", topic: "" });
	});
	test("can confirm an uncertain rename after write access is removed", async () => {
		fake.mutation.mockRejectedValueOnce(new Error("Lost response"));
		render(<ChannelNameDialog channel={channel("general")} selfUserId="alice" onSaved={vi.fn()} onClose={vi.fn()} />);
		fireEvent.input(screen.getByLabelText("Channel name"), { target: { value: "renamed" } });
		fireEvent.click(screen.getByRole("button", { name: "Rename" }));
		await screen.findByText("The save may have reached Chitchat. Retry to check the same request.");
		fake.session.canSend = false;
		fake.overrides.set("channels:permissions", { canWrite: false, canManage: false });
		publish();
		fireEvent.click(screen.getByRole("button", { name: "Retry" }));
		await act(async () => {});
		expect(fake.mutation).toHaveBeenCalledTimes(2);
		expect(fake.mutation.mock.calls[1][1]).toEqual(fake.mutation.mock.calls[0][1]);
	});
	test("keeps an in-flight dialog mounted and does not send after the live deadline", async () => {
		const pending = deferred<unknown>();
		fake.mutation.mockImplementationOnce(() => pending.promise);
		const onClose = vi.fn();
		render(<ChannelNameDialog channel={null} selfUserId="alice" onSaved={vi.fn()} onClose={onClose} />);
		fireEvent.input(screen.getByLabelText("Channel name"), { target: { value: "busy" } });
		fake.session.can_request_now = () => false;
		fireEvent.click(screen.getByRole("button", { name: "Create" }));
		expect(fake.mutation).not.toHaveBeenCalled();
		fake.session.can_request_now = () => true;
		fireEvent.click(screen.getByRole("button", { name: "Create" }));
		fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
		expect(onClose).not.toHaveBeenCalled();
		await act(async () => pending.resolve({ _nay: { message: "Refused" } }));
		fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
		expect(onClose).toHaveBeenCalledTimes(1);
	});
	test("hides a private rename's fields when its channel access is denied", () => {
		render(
			<ChannelNameDialog
				channel={channel("private-room", { visibility: "private" })}
				selfUserId="alice"
				onSaved={vi.fn()}
				onClose={vi.fn()}
			/>,
		);
		fake.overrides.set("channels:permissions", null);
		publish();
		expect(document.body.textContent).not.toContain("private-room");
		expect(screen.queryByLabelText("Channel name")).toBeNull();
		expect(screen.getByRole("dialog", { name: "Channel access is unavailable" })).toBeTruthy();
	});
});

describe("ChannelPeopleDialog", () => {
	test("a manager changes a person's level with the displayed revision and count", async () => {
		fake.mutation.mockResolvedValue({ _yay: { kind: "membership", pending: true } });
		render(<ChannelPeopleDialog channelId={"private-room" as Id<"channels">} selfUserId="alice" onClose={vi.fn()} />);
		fireEvent.change(screen.getByRole("combobox", { name: "Access for Bob" }), { target: { value: "read" } });
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith(
				"channel_members:change",
				expect.objectContaining({
					hostUserId: "bob",
					level: "read",
					expectedMembershipRevision: 1,
					expectedPrincipalCount: 2,
				}),
			),
		);
		fake.overrides.set("channel_members:status", {
			status: "pending",
			left: false,
			deleted: false,
			membershipRevision: 2,
		});
		publish();
		expect(screen.getByText("Updating channel and transcript access…")).toBeTruthy();
		expect((screen.getByRole("checkbox", { name: "Carol" }) as HTMLInputElement).disabled).toBe(true);
	});
	test("keeps an uncertain membership request locked and retries it unchanged", async () => {
		fake.mutation.mockRejectedValueOnce(new Error("Lost response"));
		render(<ChannelPeopleDialog channelId={"private-room" as Id<"channels">} selfUserId="alice" onClose={vi.fn()} />);
		fireEvent.click(screen.getByRole("button", { name: "Remove" }));
		await screen.findByText("This change may have reached Chitchat. Retry to check it.");
		expect((screen.getByRole("combobox", { name: "Access for Bob" }) as HTMLSelectElement).disabled).toBe(true);
		fireEvent.click(screen.getByRole("button", { name: "Retry" }));
		await waitFor(() => expect(fake.mutation).toHaveBeenCalledTimes(2));
		expect(fake.mutation.mock.calls[1][1]).toEqual(fake.mutation.mock.calls[0][1]);
	});
	test("shows a cancelled change and unlocks the current people list", async () => {
		render(<ChannelPeopleDialog channelId={"private-room" as Id<"channels">} selfUserId="alice" onClose={vi.fn()} />);
		fireEvent.click(screen.getByRole("button", { name: "Remove" }));
		await waitFor(() => expect(fake.mutation).toHaveBeenCalledTimes(1));
		fake.overrides.set("channel_members:status", {
			status: "cancelled",
			membershipRevision: 1,
			left: false,
			deleted: false,
		});
		publish();
		expect(
			screen.getByText("Access changed before this request finished. Check the people list and try again."),
		).toBeTruthy();
		expect((screen.getByRole("combobox", { name: "Access for Bob" }) as HTMLSelectElement).disabled).toBe(false);
	});
	test("readers can inspect people without seeing management controls", () => {
		fake.overrides.set("channels:permissions", { canWrite: false, canManage: false });
		render(<ChannelPeopleDialog channelId={"private-room" as Id<"channels">} selfUserId="alice" onClose={vi.fn()} />);
		expect(screen.getByRole("list", { name: "People in this channel" })).toBeTruthy();
		expect(screen.queryByRole("button", { name: "Remove" })).toBeNull();
		expect(screen.queryByRole("combobox")).toBeNull();
		expect(screen.queryByRole("checkbox")).toBeNull();
	});
	test("does not dismiss or change a second person while a membership write is in flight", async () => {
		const pending = deferred<unknown>();
		fake.mutation.mockImplementationOnce(() => pending.promise);
		const onClose = vi.fn();
		render(<ChannelPeopleDialog channelId={"private-room" as Id<"channels">} selfUserId="alice" onClose={onClose} />);
		fireEvent.click(screen.getByRole("button", { name: "Remove" }));
		fireEvent.click(screen.getByRole("checkbox", { name: "Carol" }));
		fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
		expect(onClose).not.toHaveBeenCalled();
		expect(fake.mutation).toHaveBeenCalledTimes(1);
		await act(async () => pending.resolve({ _nay: { message: "People changed" } }));
		expect(screen.getByText("People changed")).toBeTruthy();
		expect((screen.getByRole("checkbox", { name: "Carol" }) as HTMLInputElement).disabled).toBe(false);
	});
});

describe("ChannelActionDialog", () => {
	test("retries an uncertain archive with its original request ID and revision", async () => {
		fake.mutation.mockRejectedValueOnce(new Error("Lost response"));
		const onDone = vi.fn();
		render(
			<ChannelActionDialog
				channel={channel("general", { revision: 3 })}
				action="archive"
				onDone={onDone}
				onClose={vi.fn()}
			/>,
		);
		expect(document.activeElement).toBe(screen.getByRole("button", { name: "Cancel" }));
		fireEvent.click(screen.getByRole("button", { name: "Archive channel" }));
		await screen.findByText("This change may have reached Chitchat. Retry to check the same request.");
		fireEvent.click(screen.getByRole("button", { name: "Retry" }));
		await waitFor(() => expect(onDone).toHaveBeenCalledTimes(1));
		expect(fake.mutation.mock.calls[0][1]).toMatchObject({ archived: true, expectedRevision: 3 });
		expect(fake.mutation.mock.calls[1][1]).toEqual(fake.mutation.mock.calls[0][1]);
	});
	test("can check an uncertain archive receipt after write access is removed", async () => {
		fake.mutation.mockRejectedValueOnce(new Error("Lost response"));
		render(<ChannelActionDialog channel={channel("general")} action="archive" onDone={vi.fn()} onClose={vi.fn()} />);
		fireEvent.click(screen.getByRole("button", { name: "Archive channel" }));
		await screen.findByText("This change may have reached Chitchat. Retry to check the same request.");
		fake.session.canSend = false;
		fake.overrides.set("channels:permissions", { canWrite: false, canManage: false });
		publish();
		fireEvent.click(screen.getByRole("button", { name: "Retry" }));
		await act(async () => {});
		expect(fake.mutation).toHaveBeenCalledTimes(2);
		expect(fake.mutation.mock.calls[1][1]).toEqual(fake.mutation.mock.calls[0][1]);
	});
	test("allows a read-only member to leave and waits for the reader receipt", async () => {
		fake.session.canSend = false;
		fake.overrides.set("channels:permissions", { canWrite: false, canManage: false });
		fake.mutation.mockResolvedValue({ _yay: { kind: "membership", pending: true } });
		const onDone = vi.fn();
		render(
			<ChannelActionDialog
				channel={channel("private-room", { visibility: "private", memberCount: 4, membershipRevision: 7 })}
				action="leave"
				onDone={onDone}
				onClose={vi.fn()}
			/>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Leave channel" }));
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith(
				"channel_members:leave",
				expect.objectContaining({ expectedMembershipRevision: 7, expectedPrincipalCount: 4 }),
			),
		);
		expect(onDone).not.toHaveBeenCalled();
		fake.overrides.set("channel_members:status", {
			status: "complete",
			membershipRevision: 8,
			left: true,
			deleted: false,
		});
		publish();
		expect(onDone).toHaveBeenCalledTimes(1);
	});
	test("explains last-person deletion and sends the reviewed principal count", async () => {
		render(
			<ChannelActionDialog
				channel={channel("private-room", { visibility: "private", memberCount: 1 })}
				action="leave"
				onDone={vi.fn()}
				onClose={vi.fn()}
			/>,
		);
		expect(screen.getByText(/deletes the channel for all 1 people/)).toBeTruthy();
		fireEvent.click(screen.getByRole("button", { name: "Leave channel" }));
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith(
				"channel_members:leave",
				expect.objectContaining({ expectedPrincipalCount: 1 }),
			),
		);
	});
	test("keeps Escape locked only while the membership request is in flight", async () => {
		const pending = deferred<unknown>();
		fake.mutation.mockImplementationOnce(() => pending.promise);
		const onClose = vi.fn();
		render(
			<ChannelActionDialog
				channel={channel("private-room", { visibility: "private" })}
				action="delete"
				onDone={vi.fn()}
				onClose={onClose}
			/>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Delete channel" }));
		fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
		expect(onClose).not.toHaveBeenCalled();
		await act(async () => pending.resolve({ _yay: { kind: "membership", pending: true } }));
		fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
		expect(onClose).toHaveBeenCalledTimes(1);
	});
});

describe("ChatErrorBoundary", () => {
	test("retries a view failure without navigating the plugin frame", () => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		const reload = vi.spyOn(window.location, "reload").mockImplementation(() => {});
		let failed = true;
		function FailedView() {
			if (failed) throw new Error("A query could not render");
			return <p>Recovered chat</p>;
		}
		render(
			<ChatErrorBoundary client={client()}>
				<FailedView />
			</ChatErrorBoundary>,
		);
		expect(screen.getByRole("alert").textContent).toContain("Press is still available.");
		failed = false;
		fireEvent.click(screen.getByRole("button", { name: /Chitchat/ }));
		expect(reload).not.toHaveBeenCalled();
		expect(screen.getByText("Recovered chat")).toBeTruthy();
		expect(screen.queryByRole("alert")).toBeNull();
	});
});

describe("TranscriptStatus", () => {
	function status(changes: Record<string, unknown> = {}) {
		return {
			status: "blocked",
			canConnect: true,
			canReconcile: true,
			folderPath: "/fresh-transcripts/general",
			folderNodeId: "folder-general",
			readerMode: "manual",
			error: "A file marker is missing",
			indexStatus: "ready",
			indexError: null,
			...changes,
		};
	}
	function render_status(host = client()) {
		fake.overrides.set("transcripts:status", status());
		return render(<TranscriptStatus client={host} channelId={"general" as Id<"channels">} />);
	}
	function open_rebuild() {
		fireEvent.click(screen.getByText("Transcript details"));
		fireEvent.click(screen.getByRole("button", { name: "Rebuild copies" }));
		return screen.getByRole("dialog", { name: "Rebuild transcript copies?" });
	}
	test("shows chat-save status separately from a blocked Files copy and its error", () => {
		render_status();
		expect(screen.getByRole("status").textContent).toBe("Chat is saved. Transcript sync needs attention.");
		fireEvent.click(screen.getByText("Transcript details"));
		expect(screen.getByText("A file marker is missing")).toBeTruthy();
		expect(screen.getByText("Files sharing is managed in Press.")).toBeTruthy();
		expect(screen.getByText("/fresh-transcripts/general")).toBeTruthy();
	});
	test("explains initial permissions without asking to open a folder that does not exist", () => {
		render_status();
		fake.overrides.set(
			"transcripts:status",
			status({ folderNodeId: null, canReconcile: false, readerMode: "unconfigured", error: "Permission denied" }),
		);
		publish();
		fireEvent.click(screen.getByText("Transcript details"));
		expect(screen.getByText(/Planned folder in Press Files/)).toBeTruthy();
		expect(screen.getByText(/If permissions blocked setup, ask a workspace admin to connect/)).toBeTruthy();
		expect(
			screen.getByText(/Both the person connecting and the Chitchat service account need Can manage/),
		).toBeTruthy();
		expect(document.body.textContent).not.toContain("open this folder");
		expect(fake.action).not.toHaveBeenCalled();
		expect(fake.mutation).not.toHaveBeenCalled();
	});
	test("asks for Can manage on an existing folder so private readers can be updated", () => {
		render_status();
		fireEvent.click(screen.getByText("Transcript details"));
		expect(screen.getByText(/Give the Chitchat service account Can manage, then reconnect/)).toBeTruthy();
		expect(document.body.textContent).not.toContain("Planned folder");
		expect(document.body.textContent).not.toContain("ask a workspace admin to connect");
	});
	test("can retry a blocked channel index while the channel copy is saved", async () => {
		render_status();
		fake.overrides.set(
			"transcripts:status",
			status({
				status: "ready",
				error: null,
				indexStatus: "blocked",
				indexError: "The channel index exceeds 100,000 bytes.",
			}),
		);
		publish();
		expect(screen.getByRole("status").textContent).toBe("Chat is saved. The channel index needs attention.");
		fireEvent.click(screen.getByRole("button", { name: "Retry sync" }));
		await waitFor(() => expect(fake.mutation).toHaveBeenCalledWith("transcripts:retry", { channelId: "general" }));
	});
	test("connects through the current Press token and retries the same connection ID", async () => {
		fake.action.mockRejectedValueOnce(new Error("Lost response"));
		const host = client();
		render_status(host);
		fireEvent.click(screen.getByRole("button", { name: "Reconnect Files" }));
		await screen.findByText("Could not confirm the Files connection. Retry to check it.");
		fireEvent.click(screen.getByRole("button", { name: "Reconnect Files" }));
		await waitFor(() => expect(fake.action).toHaveBeenCalledTimes(2));
		expect(fake.action.mock.calls[0]).toEqual([
			"transcripts:connect",
			expect.objectContaining({ channelId: "general", pluginToken: "plu_test" }),
		]);
		expect(fake.action.mock.calls[1][1].clientRequestId).toBe(fake.action.mock.calls[0][1].clientRequestId);
	});
	test("does not start a connection if access expires while fetching its Press token", async () => {
		const token = deferred<string>();
		const host = client();
		vi.mocked(host.getToken).mockImplementationOnce(() => token.promise);
		render_status(host);
		fireEvent.click(screen.getByRole("button", { name: "Reconnect Files" }));
		set_connection(false);
		await act(async () => token.resolve("plu_test"));
		expect(fake.action).not.toHaveBeenCalled();
	});
	test("requires the overwrite checkbox before rebuilding and keeps the same retry ID", async () => {
		fake.mutation.mockRejectedValueOnce(new Error("Lost response"));
		render_status();
		const dialog = open_rebuild();
		const confirm = within(dialog).getByRole("button", { name: "Rebuild copies" });
		expect((confirm as HTMLButtonElement).disabled).toBe(true);
		expect(fake.mutation).not.toHaveBeenCalled();
		fireEvent.click(within(dialog).getByRole("checkbox", { name: "Replace edits in the generated transcripts" }));
		fireEvent.click(confirm);
		await screen.findByText("Could not confirm the rebuild request. Retry to check it.");
		fireEvent.click(within(dialog).getByRole("button", { name: "Rebuild copies" }));
		await waitFor(() => expect(fake.mutation).toHaveBeenCalledTimes(2));
		expect(fake.mutation.mock.calls[0][0]).toBe("transcripts:reconcile");
		expect(fake.mutation.mock.calls[1][1]).toEqual(fake.mutation.mock.calls[0][1]);
	});
	test("does not rebuild after management permission is removed during confirmation", () => {
		render_status();
		const dialog = open_rebuild();
		fireEvent.click(within(dialog).getByRole("checkbox", { name: "Replace edits in the generated transcripts" }));
		fake.overrides.set("transcripts:status", status({ canConnect: false, canReconcile: false }));
		fake.session.canSend = false;
		publish();
		const confirm = within(dialog).queryByRole("button", { name: "Rebuild copies" });
		if (confirm) fireEvent.click(confirm);
		expect(fake.mutation).not.toHaveBeenCalled();
	});
	test("never calls connect, retry or rebuild while offline", () => {
		render_status();
		const dialog = open_rebuild();
		fireEvent.click(within(dialog).getByRole("checkbox", { name: "Replace edits in the generated transcripts" }));
		fake.session.connected = false;
		publish();
		for (const button of screen
			.getAllByRole("button")
			.filter((button) => ["Reconnect Files", "Retry sync", "Rebuild copies"].includes(button.textContent ?? "")))
			fireEvent.click(button);
		expect(fake.action).not.toHaveBeenCalled();
		expect(fake.mutation).not.toHaveBeenCalled();
	});
	test("hides the destination and confirmation contents on channel access loss", () => {
		render_status();
		open_rebuild();
		fake.overrides.set("transcripts:status", null);
		publish();
		expect(document.body.textContent).not.toContain("/fresh-transcripts/general");
		expect(screen.queryByRole("checkbox")).toBeNull();
		expect(fake.mutation).not.toHaveBeenCalled();
	});
	test("restarts a blocked sync and displays a definite refusal", async () => {
		fake.mutation.mockResolvedValue({ _nay: { message: "The folder is read-only" } });
		render_status();
		fireEvent.click(screen.getByRole("button", { name: "Retry sync" }));
		await screen.findByText("The folder is read-only");
		expect(fake.mutation).toHaveBeenCalledWith("transcripts:retry", { channelId: "general" });
	});
});
