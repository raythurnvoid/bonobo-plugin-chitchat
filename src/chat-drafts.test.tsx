import { act, cleanup, renderHook } from "@testing-library/react";
import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { afterEach, describe, expect, test } from "vitest";
import { use_chat_draft, type chat_PendingSend } from "./chat-drafts";

afterEach(cleanup);
describe("use_chat_draft", () => {
	test("keeps20 nonempty drafts, refuses a21st, and reuses only an explicitly cleared slot", () => {
		const client = {} as BonoboClient;
		const hook = renderHook(({ key }) => use_chat_draft(client, key), { initialProps: { key: "draft-0" } });
		for (let index = 0; index < 20; index += 1) {
			hook.rerender({ key: `draft-${index}` });
			act(() => expect(hook.result.current.set({ ...hook.result.current.value, text: `text-${index}` })).toBeNull());
		}
		hook.rerender({ key: "draft-20" });
		act(() =>
			expect(hook.result.current.set({ ...hook.result.current.value, text: "new text" })).toContain("20 saved drafts"),
		);
		hook.rerender({ key: "draft-0" });
		expect(hook.result.current.value.text).toBe("text-0");
		act(() => {
			hook.result.current.set({ ...hook.result.current.value, text: "" });
		});
		hook.rerender({ key: "draft-20" });
		act(() => expect(hook.result.current.set({ ...hook.result.current.value, text: "new text" })).toBeNull());
	});
	test("bounds unconfirmed sends to5 per composer and20 per frame", () => {
		const client = {} as BonoboClient;
		const hook = renderHook(({ key }) => use_chat_draft(client, key), { initialProps: { key: "channel-0" } });
		const pending = (count: number): chat_PendingSend[] =>
			Array.from({ length: count }, (_, index) => ({
				clientRequestId: String(index),
				text: "retry me",
				attachments: [],
				mentions: [],
				status: "failed",
				error: "Lost response",
			}));
		for (let channel = 0; channel < 4; channel += 1) {
			hook.rerender({ key: `channel-${channel}` });
			act(() => expect(hook.result.current.set({ ...hook.result.current.value, pending: pending(5) })).toBeNull());
		}
		act(() =>
			expect(hook.result.current.set({ ...hook.result.current.value, pending: pending(6) })).toContain("unconfirmed"),
		);
		hook.rerender({ key: "channel-4" });
		act(() =>
			expect(hook.result.current.set({ ...hook.result.current.value, pending: pending(1) })).toContain("unconfirmed"),
		);
		hook.rerender({ key: "channel-0" });
		expect(hook.result.current.value.pending).toHaveLength(5);
	});
	test("rejects large pasted drafts without replacing existing text", () => {
		const client = {} as BonoboClient;
		const hook = renderHook(() => use_chat_draft(client, "channel"));
		act(() => {
			hook.result.current.set({ ...hook.result.current.value, text: "kept" });
		});
		act(() =>
			expect(hook.result.current.set({ ...hook.result.current.value, text: "x".repeat(16_385) })).toContain("too long"),
		);
		expect(hook.result.current.value.text).toBe("kept");
	});
});
