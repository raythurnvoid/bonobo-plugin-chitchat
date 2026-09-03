import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { afterEach, describe, expect, test, vi } from "vitest";
import {
	chat_invoke_backend,
	chat_INVOKE_BUSY_MESSAGE,
	chat_INVOKE_DENIED_MESSAGE,
	chat_INVOKE_SESSION_EXPIRED_MESSAGE,
} from "./chat-invoke";

/** An hour of session left, which is what the page has while a member is working. */
function make_client(fetchJson: unknown, expiresAt = Date.now() + 60 * 60 * 1_000): BonoboClient {
	return { fetchJson, session: { expiresAt: () => expiresAt } } as unknown as BonoboClient;
}

/** A finished run, the way the invoke route delivers one: the backend's body as JSON text. */
function run_finished(body: Record<string, unknown>, pluginStatus = 200) {
	return {
		status: 200,
		body: { runId: "run1", pluginStatus, output: JSON.stringify(body), outputTruncated: false },
	};
}

afterEach(() => {
	vi.useRealTimers();
});

describe("chat_invoke_backend", () => {
	test("waits out a held-back answer and returns the run that follows", async () => {
		vi.useFakeTimers();
		const fetchJson = vi
			.fn()
			.mockResolvedValueOnce({ status: 409, body: { message: "Already running", retryAfterMs: 400 } })
			.mockResolvedValueOnce(run_finished({ messageKey: "k1" }));

		const result = chat_invoke_backend(make_client(fetchJson), "message-send", { text: "hi" });

		await vi.advanceTimersByTimeAsync(399);
		expect(fetchJson).toHaveBeenCalledTimes(1);
		await vi.advanceTimersByTimeAsync(1);
		expect(await result).toEqual({ _yay: { messageKey: "k1" } });
		// The retry sends the same body, so a replayed send keeps its clientRequestId.
		expect(fetchJson.mock.calls[1]).toEqual(fetchJson.mock.calls[0]);
	});

	test("gives up after three held-back answers with the wait-a-moment sentence", async () => {
		vi.useFakeTimers();
		// The plugin API call limit answers 429 with no hint, so the wait falls back to one second.
		const fetchJson = vi.fn().mockResolvedValue({ status: 429, body: { message: "Too many requests" } });

		const result = chat_invoke_backend(make_client(fetchJson), "message-send", { text: "hi" });
		await vi.advanceTimersByTimeAsync(2_000);

		expect(await result).toEqual({ _nay: { name: "busy", message: chat_INVOKE_BUSY_MESSAGE } });
		expect(fetchJson).toHaveBeenCalledTimes(3);
	});

	test("refuses with the route's own sentence, and keeps the too-large name for a 413", async () => {
		const refusal = async (status: number, message: string) =>
			chat_invoke_backend(make_client(vi.fn().mockResolvedValue({ status, body: { message } })), "message-send", {});

		expect(await refusal(413, "Request body is too large")).toEqual({
			_nay: { name: "too_large", message: "Request body is too large" },
		});
		expect(await refusal(400, "serializationKey is required")).toEqual({
			_nay: { name: "refused", message: "serializationKey is required" },
		});
		expect(await refusal(404, "Unknown endpoint")).toEqual({
			_nay: { name: "refused", message: "Unknown endpoint" },
		});
	});

	test("tells a lapsed session apart from a lost permission on the same status", async () => {
		// The route answers one domain word for both, so the session clock is the only thing that
		// can separate "reload the page" from "you may not run this here".
		const auth = async (status: number, expiresAt: number) =>
			chat_invoke_backend(
				make_client(vi.fn().mockResolvedValue({ status, body: { message: "Unauthenticated" } }), expiresAt),
				"message-send",
				{},
			);

		expect(await auth(401, Date.now() - 1_000)).toEqual({
			_nay: { name: "refused", message: chat_INVOKE_SESSION_EXPIRED_MESSAGE },
		});
		expect(await auth(403, Date.now() + 60_000)).toEqual({
			_nay: { name: "refused", message: chat_INVOKE_DENIED_MESSAGE },
		});
	});

	test("reads the backend's own status out of a finished run", async () => {
		const relayed = async (pluginStatus: number, message: string) =>
			chat_invoke_backend(
				make_client(vi.fn().mockResolvedValue(run_finished({ message }, pluginStatus))),
				"message-send",
				{},
			);

		expect(await relayed(409, "This message changed")).toEqual({
			_nay: { name: "conflict", message: "This message changed" },
		});
		expect(await relayed(413, "That value is too large")).toEqual({
			_nay: { name: "too_large", message: "That value is too large" },
		});
		// A full store reaches the page as an ordinary refusal with the host's own sentence.
		expect(await relayed(403, "This plugin has used its 10000 document slots")).toEqual({
			_nay: { name: "refused", message: "This plugin has used its 10000 document slots" },
		});
	});

	test("turns a thrown answer into an uncertain outcome", async () => {
		// Only a 5xx, a body that is not JSON, a refused session refresh, and a network failure
		// throw. The run may have happened in every one of those cases.
		const fetchJson = vi.fn().mockRejectedValue(new Error("Plugin backend failed"));

		expect(await chat_invoke_backend(make_client(fetchJson), "message-send", {})).toEqual({
			_nay: { name: "unavailable", message: "Plugin backend failed" },
		});
	});
});
