import { act, cleanup, render, screen } from "@testing-library/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { getFunctionName, makeFunctionReference } from "convex/server";
import { afterEach, describe, expect, test, vi } from "vitest";
import type { Id } from "../convex/_generated/dataModel";
import { use_chat_query } from "./chat-query";

afterEach(cleanup);

const first = makeFunctionReference<"query", { cursor: string | null }, { page: string[] } | null>("pages:first");
const second = makeFunctionReference<"query", { cursor: string | null }, { page: string[] } | null>("pages:second");

function access() {
	return {
		ready: true,
		refreshing: false,
		member: {
			hostUserId: "member",
			installationId: "installation" as Id<"installations">,
			generation: "fresh",
			membershipLifetime: 1,
			displayName: "Member",
			canWrite: true,
			isOwner: false,
			expiresAt: 100,
		},
	};
}

describe("use_chat_query", () => {
	test("keeps the real subscription and one result during verified renewal", async () => {
		const client = new ConvexReactClient("https://chat.test");
		const session = access();
		let result: { page: string[] } | null = { page: ["Saved query"] };
		const callbacks = new Set<() => void>();
		const unsubscribed = vi.fn();
		const watch = vi.spyOn(client, "watchQuery").mockImplementation(() => ({
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
		function Probe() {
			const value = use_chat_query(session, first, { cursor: null });
			return <p>{value?.page.join(",") ?? "No result"}</p>;
		}
		try {
			const view = render(
				<ConvexProvider client={client}>
					<Probe />
				</ConvexProvider>,
			);
			const row = screen.getByText("Saved query");
			act(() => {
				session.ready = false;
				session.refreshing = true;
				result = null;
				view.rerender(
					<ConvexProvider client={client}>
						<Probe />
					</ConvexProvider>,
				);
				for (const callback of callbacks) callback();
			});
			expect(screen.getByText("Saved query")).toBe(row);
			expect(unsubscribed).not.toHaveBeenCalled();
			expect(callbacks.size).toBe(1);
			expect([...new Set(watch.mock.calls.map(([reference]) => getFunctionName(reference)))]).toEqual(["pages:first"]);
			act(() => {
				session.refreshing = false;
				view.rerender(
					<ConvexProvider client={client}>
						<Probe />
					</ConvexProvider>,
				);
			});
			expect(screen.getByText("No result")).toBeTruthy();
			expect(unsubscribed).toHaveBeenCalledTimes(1);
		} finally {
			cleanup();
			await client.close();
		}
	});
	test.each([
		"skip",
		"args",
		"function",
		"user",
		"installation",
		"generation",
		"lifetime",
		"denial",
		"null",
		"empty",
		"loading",
	] as const)("clears the prior result after %s changes", async (change) => {
		const client = new ConvexReactClient("https://chat.test");
		const session = access();
		let result: { page: string[] } | null | undefined = { page: ["Saved query"] };
		let reference = first;
		let args: { cursor: string | null } | "skip" = { cursor: null };
		const callbacks = new Set<() => void>();
		vi.spyOn(client, "watchQuery").mockImplementation(() => ({
			onUpdate: (callback) => {
				callbacks.add(callback);
				return () => {
					callbacks.delete(callback);
				};
			},
			localQueryResult: () => result,
			journal: () => undefined,
			localQueryLogs: () => undefined,
		}));
		function Probe() {
			const value = use_chat_query(session, reference, args);
			return <p>{value?.page.join(",") || "No result"}</p>;
		}
		try {
			const view = render(
				<ConvexProvider client={client}>
					<Probe />
				</ConvexProvider>,
			);
			expect(screen.getByText("Saved query")).toBeTruthy();
			act(() => {
				session.ready = false;
				session.refreshing = true;
				if (change === "skip") args = "skip";
				else if (change === "args") args = { cursor: "next" };
				else if (change === "function") reference = second;
				else if (change === "user") session.member.hostUserId = "another-member";
				else if (change === "installation")
					session.member.installationId = "another-installation" as Id<"installations">;
				else if (change === "generation") session.member.generation = "another-generation";
				else if (change === "lifetime") session.member.membershipLifetime = 2;
				else {
					session.refreshing = false;
					session.ready = change !== "denial";
					result = change === "null" ? null : change === "empty" ? { page: [] } : undefined;
				}
				view.rerender(
					<ConvexProvider client={client}>
						<Probe />
					</ConvexProvider>,
				);
				for (const callback of callbacks) callback();
			});
			expect(screen.getByText("No result")).toBeTruthy();
			view.rerender(
				<ConvexProvider client={client}>
					<Probe />
				</ConvexProvider>,
			);
			expect(screen.queryByText("Saved query")).toBeNull();
		} finally {
			cleanup();
			await client.close();
		}
	});
});
