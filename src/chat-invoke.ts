import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { chat_get_error_message, type chat_BackendEndpointId } from "./chat-data";

/**
 * Page-side wrapper for the invoke route: waits out the held-back answers (409 is the
 * serialization lock, 429 the rate bucket, and both may carry `retryAfterMs`), parses the
 * backend's relayed JSON, and maps everything into the `_yay`/`_nay` shape the page's write
 * machinery already speaks. A 5xx, an answer that did not parse, and a thrown call all become
 * `unavailable` — the run may have happened, so callers replay with the same `clientRequestId`,
 * exactly like the old append door.
 */

const BUSY_RETRY_MAX_CALLS = 3;
const BUSY_RETRY_MAX_WAIT_MS = 5_000;

/**
 * The invoke door caps the whole request body at 32 KiB. Inputs are pre-checked against this
 * lower bound so the envelope's own fields always fit, and an over-long message fails fast with
 * a clear sentence instead of an opaque door refusal.
 */
export const chat_INVOKE_INPUT_MAX_BYTES = 30_000;

export const chat_INVOKE_TOO_LARGE_MESSAGE = "This message is too long to send. Shorten it and try again.";

export const chat_INVOKE_BUSY_MESSAGE = "Sending too fast — wait a moment and try again.";

export const chat_INVOKE_SESSION_EXPIRED_MESSAGE = "This plugin session expired. Reload the page and try again.";

export const chat_INVOKE_DENIED_MESSAGE = "This plugin may not run its backend here.";

export type chat_InvokeResult = { _yay: Record<string, unknown> } | { _nay: { name: string; message: string } };

export function chat_invoke_input_too_large(input: unknown) {
	return new TextEncoder().encode(JSON.stringify(input)).byteLength > chat_INVOKE_INPUT_MAX_BYTES;
}

function wait(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function chat_invoke_backend(
	client: BonoboClient,
	endpoint: chat_BackendEndpointId,
	input: unknown,
): Promise<chat_InvokeResult> {
	try {
		for (let call = 1; ; call += 1) {
			const answer = await client.fetchJson("/api/v1/plugin-backend/invoke", { endpoint, input });

			// Nobody knows whether the run happened: the host failed (5xx, including this route's
			// own 502), or the answer did not parse. Callers replay with the same
			// `clientRequestId`, exactly like the old append door. Since SDK 0.18.0 these resolve
			// like any other answer, so this branch has to come before the status checks below —
			// without it a 502 would read as a plain refusal, which says the run definitely did
			// not happen.
			if (answer.status >= 500 || answer.body === null) {
				return {
					_nay: {
						name: "unavailable",
						message: `The Chitchat backend did not answer (${answer.status})`,
					},
				};
			}

			// The host held the call back instead of running the backend. 429 without a hint is
			// the plugin API call limit, so fall back to one second.
			if (answer.status === 409 || answer.status === 429) {
				if (call < BUSY_RETRY_MAX_CALLS) {
					await wait(Math.min(answer.body.retryAfterMs ?? 1_000, BUSY_RETRY_MAX_WAIT_MS));
					continue;
				}
				return { _nay: { name: "busy", message: chat_INVOKE_BUSY_MESSAGE } };
			}

			// A lapsed session and a revoked plugin look the same on the wire: the route answers
			// 401 or 403 with one domain word. The session clock is the whole difference, and the
			// two need different sentences, because one asks the member to reload and the other
			// says this frame lost access.
			if (answer.status === 401 || answer.status === 403) {
				const message =
					Date.now() >= client.session.expiresAt() ? chat_INVOKE_SESSION_EXPIRED_MESSAGE : chat_INVOKE_DENIED_MESSAGE;
				return { _nay: { name: "refused", message } };
			}

			// The host refused the request itself: an unknown endpoint or a body over the 32 KiB
			// cap. Both answers carry their own sentence, and 413 keeps the name the page's
			// too-large handling listens for.
			if (answer.status !== 200) {
				return {
					_nay: { name: answer.status === 413 ? "too_large" : "refused", message: answer.body.message },
				};
			}

			let body: unknown = null;
			try {
				body = JSON.parse(answer.body.output);
			} catch {
				body = null;
			}
			const bodyRecord = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};

			if (answer.body.pluginStatus >= 200 && answer.body.pluginStatus < 300) {
				return { _yay: bodyRecord };
			}

			const message =
				typeof bodyRecord.message === "string" && bodyRecord.message !== ""
					? bodyRecord.message
					: `The Chitchat backend refused this call (${answer.body.pluginStatus})`;
			// 409 keeps the name the page's conflict handling listens for; 413 marks both
			// too-large states (the 16 KiB store cap relayed by the backend, like the 32 KiB
			// pre-check above).
			const name =
				answer.body.pluginStatus === 409 ? "conflict" : answer.body.pluginStatus === 413 ? "too_large" : "refused";
			return { _nay: { name, message } };
		}
	} catch (error: unknown) {
		// Only a network failure and a refused session refresh throw now: the call produced no
		// answer at all. The backend may have run all the same, so the outcome is uncertain, like
		// a lost network answer.
		return { _nay: { name: "unavailable", message: chat_get_error_message(error) } };
	}
}
