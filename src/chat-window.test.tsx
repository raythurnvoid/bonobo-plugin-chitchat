import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import type { Doc, Id } from "../convex/_generated/dataModel";
import { use_chat_window } from "./chat-window";

afterEach(cleanup);

describe("use_chat_window", () => {
	test("keeps the subscribed rows through renewal and clears a confirmed refusal", async () => {
		const row: Doc<"messages"> = {
			_id: "message" as Id<"messages">,
			_creationTime: 1,
			installationId: "installation" as Id<"installations">,
			channelId: "channel" as Id<"channels">,
			visibility: "public",
			rootMessageId: null,
			publicId: "message",
			marker: "message",
			authorHostUserId: "member",
			authorName: "Member",
			createdAt: 1,
			sequence: 1,
			channelReplySequence: null,
			text: "Saved message",
			attachments: [],
			mentions: [],
			revision: 1,
			editedAt: null,
			deletedAt: null,
		};
		const client = new ConvexReactClient("https://chat.test");
		let result: { messages: Doc<"messages">[]; sequence: number } | null = { messages: [row], sequence: 1 };
		const callbacks = new Set<() => void>();
		const unsubscribed = vi.fn();
		vi.spyOn(client, "watchQuery").mockImplementation(() => ({
			onUpdate: (callback) => {
				callbacks.add(callback);
				return () => {
					callbacks.delete(callback);
					unsubscribed();
				};
			},
			localQueryResult: () => result,
			journal: () => undefined,
			localQueryLogs: () => undefined,
		}));
		function Probe(props: { enabled: boolean; retain: boolean }) {
			const window = use_chat_window({ target: { channelId: row.channelId }, ...props });
			return window.rows.map((message) => <textarea key={message._id} aria-label="Edit" defaultValue={message.text} />);
		}
		try {
			const view = render(
				<ConvexProvider client={client}>
					<Probe enabled retain={false} />
				</ConvexProvider>,
			);
			const input = screen.getByLabelText("Edit") as HTMLTextAreaElement;
			fireEvent.change(input, { target: { value: "Unsaved edit" } });
			act(() => {
				result = null;
				view.rerender(
					<ConvexProvider client={client}>
						<Probe enabled={false} retain />
					</ConvexProvider>,
				);
				for (const callback of callbacks) callback();
			});
			expect(unsubscribed).not.toHaveBeenCalled();
			expect(screen.getByLabelText("Edit")).toBe(input);
			expect(input.value).toBe("Unsaved edit");
			act(() => {
				result = { messages: [row], sequence: 1 };
				view.rerender(
					<ConvexProvider client={client}>
						<Probe enabled retain={false} />
					</ConvexProvider>,
				);
				for (const callback of callbacks) callback();
			});
			expect(screen.getByLabelText("Edit")).toBe(input);
			expect(input.value).toBe("Unsaved edit");
			act(() => {
				result = null;
				for (const callback of callbacks) callback();
			});
			expect(screen.queryByLabelText("Edit")).toBeNull();
		} finally {
			cleanup();
			await client.close();
		}
	});
	test("keeps real Convex subscriptions stable while opening a channel", async () => {
		const client = new ConvexReactClient("https://chat.test");
		const watch = vi.spyOn(client, "watchQuery").mockImplementation(() => ({
			onUpdate: () => () => {},
			localQueryResult: () => undefined,
			journal: () => undefined,
			localQueryLogs: () => undefined,
		}));
		function Probe(props: { enabled: boolean }) {
			const window = use_chat_window({
				target: { channelId: "channel" as Id<"channels"> },
				enabled: props.enabled,
				retain: false,
			});
			return <p>{window.loading ? "Loading messages" : "No messages"}</p>;
		}
		try {
			const view = render(
				<ConvexProvider client={client}>
					<Probe enabled />
				</ConvexProvider>,
			);
			expect(screen.getByText("Loading messages")).toBeTruthy();
			expect(watch).toHaveBeenCalled();
			view.rerender(
				<ConvexProvider client={client}>
					<Probe enabled={false} />
				</ConvexProvider>,
			);
			expect(screen.getByText("No messages")).toBeTruthy();
		} finally {
			cleanup();
			await client.close();
		}
	});
});
