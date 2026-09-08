import { cleanup, render, screen } from "@testing-library/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import type { Id } from "../convex/_generated/dataModel";
import { use_chat_window } from "./chat-window";

afterEach(cleanup);

describe("use_chat_window", () => {
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
