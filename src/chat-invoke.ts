import type { BonoboUiFrontendClient } from "bonobo-plugin-sdk/frontend";
import { chat_get_error_message, type chat_BackendEndpointId } from "./chat-data";

/**
 * Page-side wrapper for `client.backend.invoke`: waits out `busy` answers (the serialization
 * lock and the invoke rate bucket both answer `busy` with `retryAfterMs`), parses the backend's
 * relayed JSON, and maps everything into the `_yay`/`_nay` shape the page's write machinery
 * already speaks. `unavailable` stays `unavailable` — the run may have happened, so callers
 * replay with the same `clientRequestId`, exactly like the old append door.
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

export type chat_InvokeResult = { _yay: Record<string, unknown> } | { _nay: { name: string; message: string } };

export function chat_invoke_input_too_large(input: unknown) {
	return new TextEncoder().encode(JSON.stringify(input)).byteLength > chat_INVOKE_INPUT_MAX_BYTES;
}

function wait(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function chat_invoke_backend(
	client: BonoboUiFrontendClient,
	endpoint: chat_BackendEndpointId,
	input: unknown,
): Promise<chat_InvokeResult> {
	try {
		for (let call = 1; ; call += 1) {
			const result = await client.backend.invoke({ endpoint, input });
			if ("_nay" in result) {
				if (result._nay.name === "busy" && call < BUSY_RETRY_MAX_CALLS) {
					await wait(Math.min(result._nay.retryAfterMs ?? 1_000, BUSY_RETRY_MAX_WAIT_MS));
					continue;
				}
				if (result._nay.name === "busy") {
					return { _nay: { name: "busy", message: chat_INVOKE_BUSY_MESSAGE } };
				}
				return { _nay: { name: result._nay.name, message: result._nay.message } };
			}

			let body: unknown = null;
			try {
				body = JSON.parse(result._yay.output);
			} catch {
				body = null;
			}
			const bodyRecord = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};

			if (result._yay.pluginStatus >= 200 && result._yay.pluginStatus < 300) {
				return { _yay: bodyRecord };
			}

			const message =
				typeof bodyRecord.message === "string" && bodyRecord.message !== ""
					? bodyRecord.message
					: `The Chitchat backend refused this call (${result._yay.pluginStatus})`;
			// 409 keeps the name the page's conflict handling listens for; 413 marks both
			// too-large states (the 16 KiB store cap relayed by the backend, like the 32 KiB
			// pre-check above).
			const name =
				result._yay.pluginStatus === 409 ? "conflict" : result._yay.pluginStatus === 413 ? "too_large" : "refused";
			return { _nay: { name, message } };
		}
	} catch (error: unknown) {
		// The SDK call itself resolves refusals, so a throw here is unexpected — treat it as
		// uncertain, like a lost network answer.
		return { _nay: { name: "unavailable", message: chat_get_error_message(error) } };
	}
}
