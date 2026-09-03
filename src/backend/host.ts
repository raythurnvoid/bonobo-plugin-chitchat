import type { BonoboEnv } from "bonobo-plugin-sdk";
import type { BonoboHttpApi, BonoboHttpApiPath, BonoboHttpResponse } from "bonobo-plugin-sdk/http-api";

/**
 * The shape `chatbe_host_message` needs. Every host answer has it, and so does anything else with
 * a status and a body.
 */
export type chatbe_HostAnswer = {
	status: number;
	body: unknown;
};

/**
 * The route, its body, and its answer are all typed from the app's own table. A path the host does
 * not serve is a compile error, so is a body field the route does not accept, and narrowing on
 * `status` narrows the body.
 *
 * Every answer is a value, not an exception: the door's status and body come back as-is so an
 * endpoint can relay a clear message (a 16 KiB store refusal, a scope "Permission denied") to the
 * page instead of turning everything into a generic 500. `body` is `null` when the text did not
 * parse. This mirrors `client.fetchJson` on the page side. The worker's `host_post` helper is where
 * a 5xx and a null body become a throw, because that decision belongs to the caller. Every door
 * call goes through it, `door` and `files_read_or_null` alike.
 */
export type chatbe_Host = {
	post<P extends BonoboHttpApiPath>(path: P, body: BonoboHttpApi[P]["POST"]["body"]): Promise<BonoboHttpResponse<P>>;
};

export function chatbe_create_host(env: BonoboEnv): chatbe_Host {
	return {
		async post<P extends BonoboHttpApiPath>(path: P, body: BonoboHttpApi[P]["POST"]["body"]) {
			const response = await fetch(`${env.BONOBO.host.apiOrigin}${path}`, {
				method: "POST",
				headers: {
					authorization: `Bearer ${env.BONOBO.host.token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify(body),
			});
			// Read the body as text first, so a body that will not parse can become `null` beside
			// its status instead of taking the status with it.
			const text = await response.text();
			let parsed: unknown = null;
			try {
				parsed = JSON.parse(text);
			} catch {
				// Not JSON, so the answer keeps its status and a null body.
			}

			// The route table says what this status carries. The host is the app itself, so the
			// declared shape is the shape.
			return { status: response.status, body: parsed } as BonoboHttpResponse<P>;
		},
	};
}

/**
 * The human-readable reason of a refused door call, for relaying to the page.
 */
export function chatbe_host_message(answer: chatbe_HostAnswer) {
	if (typeof answer.body === "object" && answer.body !== null) {
		const message = (answer.body as Record<string, unknown>).message;
		if (typeof message === "string" && message !== "") {
			return message;
		}
	}

	return `The host refused this call (status ${answer.status})`;
}
