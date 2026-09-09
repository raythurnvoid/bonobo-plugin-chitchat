import { act, cleanup, fireEvent, render, renderHook, screen, waitFor, within } from "@testing-library/react";
import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { Doc, Id } from "../convex/_generated/dataModel";
import { ChannelView, MessageRow, type ChannelViewProps } from "./channel-view";
import { use_chat_window } from "./chat-window";

const fake = vi.hoisted(() => ({
	roots: [] as unknown[],
	replies: [] as unknown[],
	version: 0,
	listeners: new Set<() => void>(),
	cache: new Map<string, unknown>(),
	querySets: [] as Record<string, unknown>[],
	mutation: vi.fn(),
	action: vi.fn(),
	readDenied: false,
	session: {
		ready: true,
		refreshing: false,
		canSend: true,
		can_request_now: (): boolean => true,
		member: { displayName: "Alice" },
	},
}));
vi.mock("./session", () => ({ use_chat_session: () => fake.session }));
vi.mock("convex/react", async () => {
	const { useSyncExternalStore } = await import("react");
	const { getFunctionName } = await import("convex/server");
	function useVersion() {
		useSyncExternalStore(
			(listener) => {
				fake.listeners.add(listener);
				return () => {
					fake.listeners.delete(listener);
				};
			},
			() => fake.version,
		);
	}
	function answer(name: string, args: Record<string, unknown>) {
		const key = `${fake.version}:${name}:${JSON.stringify(args)}`;
		if (fake.cache.has(key)) return fake.cache.get(key);
		const roots = fake.roots as Doc<"messages">[];
		const replies = fake.replies as Doc<"messages">[];
		let result: unknown;
		if (name === "messages:latest_roots" || name === "messages:latest_replies") {
			const all = name.endsWith("roots") ? roots : replies;
			result = fake.readDenied ? null : { messages: all.slice(0, 50), sequence: all[0]?.sequence ?? 0 };
		} else if (name === "messages:list_roots" || name === "messages:list_replies") {
			const options = args.paginationOpts as { cursor: string | null; numItems: number; endCursor?: string };
			const upper = options.cursor ? Number(options.cursor) : Number(args.anchorSequence);
			const all = (name.endsWith("roots") ? roots : replies).filter((row) => row.sequence <= upper);
			const page = all.slice(0, options.numItems);
			result = { page, isDone: all.length <= page.length, continueCursor: String((page.at(-1)?.sequence ?? 1) - 1) };
		} else if (name === "messages:get")
			result = fake.readDenied ? null : ([...roots, ...replies].find((row) => row._id === args.messageId) ?? null);
		else if (name === "reactions:get_for_message") result = [];
		else if (name === "threads:get_summary")
			result = { totalReplyCount: replies.length, latestReplyAt: replies[0]?.createdAt ?? null };
		else if (name === "members:list")
			result = { page: [{ userId: "bob", displayName: "Bob" }], isDone: true, continueCursor: "" };
		fake.cache.set(key, result);
		return result;
	}
	return {
		useQuery: (reference: Parameters<typeof getFunctionName>[0], args: Record<string, unknown> | "skip") => {
			useVersion();
			return args === "skip" ? undefined : answer(getFunctionName(reference), args);
		},
		useQueries: (
			queries: Record<string, { query: Parameters<typeof getFunctionName>[0]; args: Record<string, unknown> }>,
		) => {
			useVersion();
			fake.querySets.push(queries);
			return Object.fromEntries(
				Object.entries(queries).map(([key, query]) => [key, answer(getFunctionName(query.query), query.args)]),
			);
		},
		useMutation: (reference: Parameters<typeof getFunctionName>[0]) => (args: unknown) =>
			fake.mutation(getFunctionName(reference), args),
		useAction: (reference: Parameters<typeof getFunctionName>[0]) => (args: unknown) =>
			fake.action(getFunctionName(reference), args),
	};
});

const channelId = "channel-one" as Id<"channels">;
const installationId = "installation-one" as Id<"installations">;
function message(sequence: number, values: Partial<Doc<"messages">> = {}): Doc<"messages"> {
	return {
		_id: `message-${sequence}` as Id<"messages">,
		_creationTime: sequence,
		installationId,
		channelId,
		visibility: "public",
		rootMessageId: null,
		publicId: `public-${sequence}`,
		marker: `marker-${sequence}`,
		authorHostUserId: "bob",
		authorName: "Bob",
		createdAt: 1_800_000_000_000 + sequence,
		sequence,
		channelReplySequence: null,
		text: `Message ${sequence}`,
		attachments: [],
		mentions: [],
		revision: 1,
		editedAt: null,
		deletedAt: null,
		...values,
	};
}
function channel(): Doc<"channels"> {
	return {
		_id: channelId,
		_creationTime: 1,
		installationId,
		generation: "fresh",
		publicId: "channel-public",
		visibility: "public",
		name: "general",
		sortName: "general",
		topic: "Team chat",
		createdBy: "alice",
		createdAt: 1,
		revision: 1,
		membershipRevision: 0,
		memberCount: 0,
		archivedAt: null,
		deletedAt: null,
		lastRootSequence: 1000,
		lastReplySequence: 0,
		lastRootAt: 1,
		lastReplyAt: 0,
		transcriptSlug: "general",
	};
}
function props(): ChannelViewProps {
	return {
		client: {
			context: { userId: "alice" },
			getToken: vi.fn(async () => "plu_test"),
			fetchJson: vi.fn(),
		} as unknown as BonoboClient,
		channelId,
		channel: channel(),
		userId: "alice",
		memberNames: { get: (id) => (id === "alice" ? "Alice" : "Bob"), resolve: vi.fn(async () => {}) },
		announce: vi.fn(),
		threadRootId: null,
		setThreadRootId: vi.fn(),
		isNarrow: false,
		canWrite: true,
		online: true,
		openedAtReadSequence: 0,
		onObservedRead: vi.fn(),
		onObservedThreadRead: vi.fn(),
		onRequestStart: vi.fn(),
		onRequestSettled: vi.fn(),
		sendInFlight: false,
	};
}
function publish() {
	act(() => {
		fake.version += 1;
		fake.cache.clear();
		for (const listener of fake.listeners) listener();
	});
}
beforeEach(() => {
	fake.roots = [message(1)];
	fake.replies = [];
	fake.version = 0;
	fake.cache.clear();
	fake.querySets = [];
	fake.readDenied = false;
	fake.session = {
		ready: true,
		refreshing: false,
		canSend: true,
		can_request_now: (): boolean => true,
		member: { displayName: "Alice" },
	};
	fake.mutation
		.mockReset()
		.mockResolvedValue({ _yay: { kind: "message", messageId: "new-message", revision: 1, sequence: 2 } });
	fake.action.mockReset();
	vi.stubGlobal(
		"ResizeObserver",
		class {
			observe() {}
			disconnect() {}
		},
	);
});
afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});

describe("ChannelView", () => {
	test("keeps a draft across channel changes and auth loss while clearing protected rows", () => {
		const initial = props();
		const view = render(<ChannelView {...initial} />);
		fireEvent.change(screen.getByRole("combobox", { name: "Message #general" }), {
			target: { value: "Keep my draft" },
		});
		view.rerender(<ChannelView {...initial} channelId={"channel-two" as Id<"channels">} />);
		expect((screen.getByRole("combobox", { name: "Message #general" }) as HTMLTextAreaElement).value).toBe("");
		view.rerender(<ChannelView {...initial} />);
		expect((screen.getByRole("combobox", { name: "Message #general" }) as HTMLTextAreaElement).value).toBe(
			"Keep my draft",
		);
		fake.session.ready = false;
		fake.session.canSend = false;
		view.rerender(<ChannelView {...initial} channel={null} />);
		expect(screen.queryByText("Message 1")).toBeNull();
		expect((screen.getByRole("combobox", { name: "Message draft" }) as HTMLTextAreaElement).value).toBe(
			"Keep my draft",
		);
		expect((screen.getByRole("button", { name: "Send" }) as HTMLButtonElement).disabled).toBe(true);
	});
	test("checks the live deadline again and does not send IME or Shift+Enter", async () => {
		const initial = props();
		render(<ChannelView {...initial} />);
		const input = screen.getByRole("combobox", { name: "Message #general" });
		fireEvent.change(input, { target: { value: "hello" } });
		fireEvent.keyDown(input, { key: "Enter", isComposing: true });
		fireEvent.keyDown(input, { key: "Enter", shiftKey: true });
		expect(fake.mutation).not.toHaveBeenCalled();
		fake.session.can_request_now = () => false;
		fireEvent.click(screen.getByRole("button", { name: "Send" }));
		expect(fake.mutation).not.toHaveBeenCalled();
		expect((input as HTMLTextAreaElement).value).toBe("hello");
		fake.session.can_request_now = () => true;
		fireEvent.keyDown(input, { key: "Enter" });
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith(
				"messages:send",
				expect.objectContaining({ channelId, text: "hello", mentions: [] }),
			),
		);
		expect(initial.onRequestStart).toHaveBeenCalledTimes(1);
		await waitFor(() => expect(initial.onRequestSettled).toHaveBeenCalledTimes(1));
	});
	test("retries the same send ID after a lost response and keeps the pending text", async () => {
		fake.mutation.mockRejectedValueOnce(new Error("Lost response"));
		const initial = props();
		render(<ChannelView {...initial} />);
		fireEvent.change(screen.getByRole("combobox", { name: "Message #general" }), {
			target: { value: "one logical message" },
		});
		fireEvent.click(screen.getByRole("button", { name: "Send" }));
		await screen.findByText("Lost response");
		const first = fake.mutation.mock.calls[0][1];
		fireEvent.click(screen.getByRole("button", { name: "Retry sending message" }));
		await waitFor(() => expect(fake.mutation).toHaveBeenCalledTimes(2));
		expect(fake.mutation.mock.calls[1][1]).toEqual(first);
		await waitFor(() => expect(screen.queryByText("Not confirmed")).toBeNull());
	});
	test("validates UTF-8 size without clearing the rejected draft", () => {
		render(<ChannelView {...props()} />);
		const input = screen.getByRole("combobox", { name: "Message #general" });
		const text = "😀".repeat(5000);
		fireEvent.change(input, { target: { value: text } });
		fireEvent.click(screen.getByRole("button", { name: "Send" }));
		expect(fake.mutation).not.toHaveBeenCalled();
		expect((input as HTMLTextAreaElement).value).toBe(text);
		expect(screen.getByText("This message is too long to store. Shorten it and send again.")).toBeTruthy();
	});
	test("checks selected files before a new send and retries a saved receipt without rechecking files", async () => {
		const initial = props();
		vi.mocked(initial.client.fetchJson).mockResolvedValue({
			status: 200,
			body: {
				items: [
					{
						nodeId: "file-one",
						name: "one.pdf",
						path: "/one.pdf",
						kind: "file",
						contentType: "application/pdf",
						updatedAt: 1,
						status: "ready",
						size: 12,
					},
				],
				cursor: "",
				isDone: true,
			},
		} as never);
		fake.mutation
			.mockResolvedValueOnce({ _nay: { message: "Check attachment access again before sending." } })
			.mockRejectedValueOnce(new Error("Lost file-send response"));
		fake.action.mockResolvedValue({ _yay: [{ fileNodeId: "file-one", name: "one.pdf" }] });
		render(<ChannelView {...initial} />);
		fireEvent.click(screen.getByRole("button", { name: "Attach file" }));
		fireEvent.click(await screen.findByRole("button", { name: "one.pdf /one.pdf" }));
		fireEvent.click(screen.getByRole("button", { name: "Send" }));
		await screen.findByText("Lost file-send response");
		expect(fake.action).toHaveBeenCalledWith("files:authorize_selection", {
			pressToken: "plu_test",
			fileNodeIds: ["file-one"],
		});
		const original = fake.mutation.mock.calls[0][1];
		fireEvent.click(screen.getByRole("button", { name: "Retry sending message" }));
		await waitFor(() => expect(fake.mutation).toHaveBeenCalledTimes(3));
		expect(fake.mutation.mock.calls.map((call) => call[1])).toEqual([original, original, original]);
		expect(fake.action).toHaveBeenCalledTimes(1);
	});
	test("can confirm an uncertain send after a channel becomes read-only", async () => {
		fake.mutation.mockRejectedValueOnce(new Error("Lost response"));
		const initial = props();
		const view = render(<ChannelView {...initial} />);
		fireEvent.change(screen.getByRole("combobox", { name: "Message #general" }), { target: { value: "already sent" } });
		fireEvent.click(screen.getByRole("button", { name: "Send" }));
		await screen.findByText("Lost response");
		fake.session.canSend = false;
		view.rerender(<ChannelView {...initial} canWrite={false} />);
		expect((screen.getByRole("button", { name: "Send" }) as HTMLButtonElement).disabled).toBe(true);
		fireEvent.click(screen.getByRole("button", { name: "Retry sending message" }));
		await waitFor(() => expect(fake.mutation).toHaveBeenCalledTimes(2));
		expect(fake.mutation.mock.calls[0][1]).toEqual(fake.mutation.mock.calls[1][1]);
	});
	test("inserts a selected mention and opens the native root thread", async () => {
		const initial = props();
		render(<ChannelView {...initial} />);
		const input = screen.getByRole("combobox", { name: "Message #general" });
		fireEvent.change(input, { target: { value: "@Bo", selectionStart: 3 } });
		await screen.findByRole("option", { name: "Bob" });
		fireEvent.keyDown(input, { key: "Enter" });
		expect((input as HTMLTextAreaElement).value).toBe("@Bob ");
		fireEvent.click(screen.getByRole("button", { name: "Send" }));
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith("messages:send", expect.objectContaining({ mentions: ["bob"] })),
		);
		fireEvent.click(screen.getByRole("button", { name: "Reply in thread" }));
		expect(initial.setThreadRootId).toHaveBeenCalledWith("message-1");
	});
	test("returns focus to the message pane when the thread root is outside loaded history", async () => {
		fake.roots = Array.from({ length: 60 }, (_, index) => message(60 - index));
		const initial = props();
		const view = render(<ChannelView {...initial} threadRootId={"message-1" as Id<"messages">} />);
		fireEvent.click(screen.getByRole("button", { name: "Close thread" }));
		expect(initial.setThreadRootId).toHaveBeenCalledWith(null);
		view.rerender(<ChannelView {...initial} />);
		await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("log", { name: "Messages in #general" })));
	});
	test("loads more than100 replies and keeps the narrow thread back control", () => {
		fake.replies = Array.from({ length: 121 }, (_, index) =>
			message(121 - index, {
				_id: `reply-${121 - index}` as Id<"messages">,
				rootMessageId: "message-1" as Id<"messages">,
			}),
		);
		const initial = props();
		render(<ChannelView {...initial} threadRootId={"message-1" as Id<"messages">} isNarrow />);
		const thread = screen.getByRole("region", { name: "Thread" });
		expect(within(thread).getByRole("button", { name: "Back to messages" })).toBe(document.activeElement);
		fireEvent.click(within(thread).getByRole("button", { name: "Load older" }));
		fireEvent.click(within(thread).getByRole("button", { name: "Load older" }));
		expect(within(thread).getAllByText("Message 1").length).toBe(2);
		fireEvent.keyDown(thread, { key: "Escape" });
		expect(initial.setThreadRootId).toHaveBeenCalledWith(null);
	});
	test("does not mark covered roots or unopened replies read", () => {
		const initial = props();
		initial.channel = { ...channel(), visibility: "private", lastReplySequence: 7 };
		const view = render(<ChannelView {...initial} threadRootId={"message-1" as Id<"messages">} isNarrow />);
		expect(initial.onObservedRead).not.toHaveBeenCalled();
		view.rerender(<ChannelView {...initial} />);
		expect(initial.onObservedRead).toHaveBeenCalledWith({ rootSequence: 1 });
	});
	test("marks only the visible thread head after scrolling and tab visibility changes", () => {
		const initial = props();
		const rootMessageId = "message-1" as Id<"messages">;
		fake.replies = [message(1, { _id: "reply-1" as Id<"messages">, rootMessageId })];
		render(<ChannelView {...initial} threadRootId={rootMessageId} />);
		expect(initial.onObservedThreadRead).toHaveBeenCalledWith({ rootMessageId, replySequence: 1 });
		vi.mocked(initial.onObservedThreadRead).mockClear();
		const log = screen.getByRole("region", { name: "Thread" }).querySelector(".thread-replies") as HTMLDivElement;
		Object.defineProperties(log, {
			scrollHeight: { configurable: true, value: 1000 },
			clientHeight: { configurable: true, value: 100 },
		});
		log.scrollTop = 0;
		fireEvent.scroll(log);
		fake.replies.unshift(message(2, { _id: "reply-2" as Id<"messages">, rootMessageId }));
		publish();
		expect(initial.onObservedThreadRead).not.toHaveBeenCalled();
		log.scrollTop = 900;
		fireEvent.scroll(log);
		expect(initial.onObservedThreadRead).toHaveBeenCalledWith({ rootMessageId, replySequence: 2 });
		vi.mocked(initial.onObservedThreadRead).mockClear();
		const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
		fake.replies.unshift(message(3, { _id: "reply-3" as Id<"messages">, rootMessageId }));
		publish();
		expect(initial.onObservedThreadRead).not.toHaveBeenCalled();
		visibility.mockReturnValue("visible");
		fireEvent(document, new Event("visibilitychange"));
		expect(initial.onObservedThreadRead).toHaveBeenCalledWith({ rootMessageId, replySequence: 3 });
		visibility.mockRestore();
	});
});

describe("MessageRow", () => {
	test("requests an attachment download without opening another window", async () => {
		const initial = props();
		vi.mocked(initial.client.fetchJson).mockResolvedValue({
			status: 200,
			body: {
				items: [
					{
						fileNodeId: "file-one",
						name: "one.png",
						contentType: "image/png",
						url: "https://files.test/one",
						expiresAt: Date.now() + 60_000,
					},
				],
				errors: [],
				truncated: false,
			},
		});
		render(
			<ul>
				<MessageRow
					{...initial}
					doc={message(1, { attachments: [{ fileNodeId: "file-one", name: "one.png" }] })}
					isContinuation={false}
				/>
			</ul>,
		);
		fireEvent.click(screen.getByRole("button", { name: "one.png" }));
		const link = await screen.findByRole("link", { name: "one.png" });
		expect(initial.client.fetchJson).toHaveBeenCalledWith("/api/v1/files/download-urls", {
			fileNodeIds: ["file-one"],
			download: true,
		});
		expect(link.getAttribute("download")).toBe("one.png");
		expect(link.getAttribute("target")).toBeNull();
		expect(document.activeElement).toBe(link);
	});
	test("stops an expired attachment link and allows refreshing it", async () => {
		const initial = props();
		const item = { fileNodeId: "file-one", name: "one.md", contentType: "text/markdown" };
		vi.mocked(initial.client.fetchJson)
			.mockResolvedValueOnce({
				status: 200,
				body: {
					items: [{ ...item, url: "https://files.test/expired", expiresAt: Date.now() - 1 }],
					errors: [],
					truncated: false,
				},
			})
			.mockResolvedValueOnce({
				status: 200,
				body: {
					items: [{ ...item, url: "https://files.test/fresh", expiresAt: Date.now() + 60_000 }],
					errors: [],
					truncated: false,
				},
			});
		render(
			<ul>
				<MessageRow
					{...initial}
					doc={message(1, { attachments: [{ fileNodeId: "file-one", name: "one.md" }] })}
					isContinuation={false}
				/>
			</ul>,
		);
		fireEvent.click(screen.getByRole("button", { name: "one.md" }));
		const link = await screen.findByRole("link", { name: "one.md" });
		expect(fireEvent.click(link)).toBe(false);
		expect(screen.getByRole("alert").textContent).toBe("This download link expired. Use Refresh link to try again.");
		fireEvent.click(screen.getByRole("button", { name: "Refresh link" }));
		await waitFor(() => expect(link.getAttribute("href")).toBe("https://files.test/fresh"));
		expect(screen.queryByRole("alert")).toBeNull();
		expect(fireEvent.click(link)).toBe(true);
	});
	test("edits with an expected revision, permits attachment-only text, and deletes with focus retained", async () => {
		const initial = props();
		const doc = message(1, { authorHostUserId: "alice", attachments: [{ fileNodeId: "file-one", name: "one.pdf" }] });
		const view = render(
			<ul>
				<MessageRow {...initial} doc={doc} isContinuation={false} />
			</ul>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Edit" }));
		const editor = screen.getByRole("textbox", { name: "Edit message" });
		expect(editor).toBe(document.activeElement);
		fireEvent.change(editor, { target: { value: "" } });
		fireEvent.click(screen.getByRole("button", { name: "Save" }));
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith(
				"messages:edit",
				expect.objectContaining({ messageId: doc._id, text: "", expectedRevision: 1 }),
			),
		);
		await waitFor(() => expect(screen.queryByRole("textbox", { name: "Edit message" })).toBeNull());
		fireEvent.click(screen.getByRole("button", { name: "Delete" }));
		fireEvent.click(screen.getByRole("button", { name: "Delete message" }));
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith("messages:remove", expect.objectContaining({ expectedRevision: 1 })),
		);
		view.rerender(
			<ul>
				<MessageRow {...initial} doc={{ ...doc, deletedAt: 2, text: "", attachments: [] }} isContinuation={false} />
			</ul>,
		);
		expect(screen.getByText("Message deleted")).toBeTruthy();
		expect(screen.queryByRole("button", { name: "Edit" })).toBeNull();
	});
	test("keeps an edit draft when new roots and history navigation evict its page", () => {
		fake.roots = Array.from({ length: 350 }, (_, index) => message(350 - index, { authorHostUserId: "alice" }));
		render(<ChannelView {...props()} />);
		const oldRow = screen.getByText("Message 301").closest("li")!;
		fireEvent.click(within(oldRow).getByRole("button", { name: "Edit" }));
		const editor = screen.getByRole("textbox", { name: "Edit message" }) as HTMLTextAreaElement;
		fireEvent.change(editor, { target: { value: "Unsaved draft" } });
		fake.roots.unshift(message(351));
		publish();
		expect(screen.getByRole("textbox", { name: "Edit message" })).toBe(editor);
		for (let i = 0; i < 5; i++) fireEvent.click(screen.getByRole("button", { name: "Load older" }));
		expect(screen.getByRole("textbox", { name: "Edit message" })).toBe(editor);
		fireEvent.click(screen.getByRole("button", { name: /Latest messages/ }));
		expect(editor.value).toBe("Unsaved draft");
		expect(screen.getByRole("textbox", { name: "Edit message" })).toBe(editor);
		fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
		expect(screen.queryByText("Message 301")).toBeNull();
	});
	test("keeps the draft revision and mentions after a newer saved edit arrives", async () => {
		const initial = props();
		const doc = message(1, { authorHostUserId: "alice", text: "@Bob old", mentions: ["bob"] });
		const view = render(
			<ul>
				<MessageRow {...initial} doc={doc} isContinuation={false} />
			</ul>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Edit" }));
		fireEvent.change(screen.getByRole("textbox", { name: "Edit message" }), { target: { value: "@Bob my draft" } });
		view.rerender(
			<ul>
				<MessageRow
					{...initial}
					doc={{ ...doc, revision: 2, text: "new saved edit", mentions: [] }}
					isContinuation={false}
				/>
			</ul>,
		);
		fake.mutation.mockResolvedValueOnce({
			_nay: { name: "conflict", message: "This message changed. Reload it before editing." },
		});
		fireEvent.click(screen.getByRole("button", { name: "Save" }));
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith(
				"messages:edit",
				expect.objectContaining({ expectedRevision: 1, mentions: ["bob"] }),
			),
		);
		expect((screen.getByRole("textbox", { name: "Edit message" }) as HTMLTextAreaElement).value).toBe("@Bob my draft");
		fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
		fireEvent.click(screen.getByRole("button", { name: "Edit" }));
		expect((screen.getByRole("textbox", { name: "Edit message" }) as HTMLTextAreaElement).value).toBe("new saved edit");
	});
	test("keeps one edited reply through eviction and clears it when access is refused", () => {
		const rootMessageId = "message-1" as Id<"messages">;
		fake.replies = Array.from({ length: 50 }, (_, index) =>
			message(50 - index, { _id: `reply-${50 - index}` as Id<"messages">, rootMessageId, authorHostUserId: "alice" }),
		);
		render(<ChannelView {...props()} threadRootId={rootMessageId} />);
		const thread = screen.getByRole("region", { name: "Thread" });
		const reply = thread.querySelector('[data-key="reply-1"]') as HTMLElement;
		fireEvent.click(within(reply).getByRole("button", { name: "Edit" }));
		const editor = within(thread).getByRole("textbox", { name: "Edit message" }) as HTMLTextAreaElement;
		fireEvent.change(editor, { target: { value: "Reply draft" } });
		fake.replies.unshift(message(51, { _id: "reply-51" as Id<"messages">, rootMessageId, authorHostUserId: "alice" }));
		publish();
		expect(within(thread).getByRole("textbox", { name: "Edit message" })).toBe(editor);
		expect(editor.value).toBe("Reply draft");
		expect(thread.querySelectorAll(".thread-replies [data-key]")).toHaveLength(51);
		expect(
			within(thread)
				.getAllByRole("button", { name: "Edit" })
				.every((button) => (button as HTMLButtonElement).disabled),
		).toBe(true);
		fake.session.ready = false;
		fake.session.refreshing = true;
		fake.readDenied = true;
		publish();
		expect(within(thread).getByRole("textbox", { name: "Edit message" })).toBe(editor);
		expect(editor.value).toBe("Reply draft");
		fake.session.ready = true;
		fake.session.refreshing = false;
		fake.readDenied = true;
		publish();
		expect(screen.queryByRole("textbox", { name: "Edit message" })).toBeNull();
	});
	test("uses desired reaction state and keeps keyboard palette focus", async () => {
		render(
			<ul>
				<MessageRow {...props()} doc={message(1)} isContinuation={false} />
			</ul>,
		);
		const trigger = screen.getByRole("button", { name: "Add reaction" });
		fireEvent.click(trigger);
		const first = screen.getByRole("button", { name: "Thumbs up" });
		expect(first).toBe(document.activeElement);
		fireEvent.keyDown(first, { key: "ArrowRight" });
		expect(screen.getByRole("button", { name: "Heart" })).toBe(document.activeElement);
		fireEvent.click(screen.getByRole("button", { name: "Heart" }));
		await waitFor(() =>
			expect(fake.mutation).toHaveBeenCalledWith(
				"reactions:set",
				expect.objectContaining({ token: "heart", on: true }),
			),
		);
		expect(trigger).toBe(document.activeElement);
	});
});

describe("use_chat_window", () => {
	test("bounds live subscriptions while walking 100000 roots in both directions", () => {
		fake.roots = Array.from({ length: 100_000 }, (_, index) => message(100_000 - index));
		const hook = renderHook(() => use_chat_window({ target: { channelId }, enabled: true, retain: false }));
		expect(hook.result.current.rows.length).toBe(50);
		for (let page = 0; page < 12; page += 1) act(() => hook.result.current.older());
		expect(hook.result.current.rows.length).toBeLessThanOrEqual(250);
		expect(Math.max(...fake.querySets.map((queries) => Object.keys(queries).length))).toBeLessThanOrEqual(5);
		const previous = hook.result.current.rows[0].sequence;
		act(() => hook.result.current.newer());
		expect(hook.result.current.rows[0].sequence).toBeGreaterThan(previous);
		act(() => hook.result.current.latest());
		expect(hook.result.current.rows[0].sequence).toBe(100_000);
		expect(Object.keys(fake.querySets.at(-1)!).length).toBe(0);
	});
	test("keeps old windows fixed during live arrivals and clears them on denial", () => {
		fake.roots = Array.from({ length: 200 }, (_, index) => message(200 - index));
		const hook = renderHook(() => use_chat_window({ target: { channelId }, enabled: true, retain: false }));
		act(() => hook.result.current.older());
		const oldestTop = hook.result.current.rows[0]._id;
		fake.roots.unshift(message(201));
		publish();
		expect(hook.result.current.rows[0]._id).toBe(oldestTop);
		expect(hook.result.current.newCount).toBeGreaterThan(0);
		fake.readDenied = true;
		publish();
		expect(hook.result.current.rows).toEqual([]);
	});
	test("preserves the first live page while loading older and evicts large pages within3MiB", () => {
		fake.roots = Array.from({ length: 1000 }, (_, index) => message(1000 - index, { text: "x".repeat(15_900) }));
		const hook = renderHook(() => use_chat_window({ target: { channelId }, enabled: true, retain: false }));
		act(() => hook.result.current.older());
		expect(hook.result.current.rows[0].sequence).toBe(1000);
		expect(hook.result.current.rows.at(-1)?.sequence).toBe(901);
		for (let index = 0; index < 6; index += 1) act(() => hook.result.current.older());
		const retained = { rows: hook.result.current.rows, head: { messages: fake.roots.slice(0, 50), sequence: 1000 } };
		expect(new TextEncoder().encode(JSON.stringify(retained)).byteLength).toBeLessThanOrEqual(3 * 1024 * 1024);
		expect(hook.result.current.rows.at(-1)!.sequence).toBeLessThan(901);
	});
});
