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
 * Refusals are values, not exceptions: the door's status and body come back as-is so an endpoint
 * can relay a clear message (a 16 KiB store refusal, a scope "Permission denied") to the page
 * instead of turning everything into a generic 500. Only a 5xx and a body that is not JSON throw,
 * the way `client.fetchJson` throws them on the page side.
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
			// Read the body as text first. A 5xx is refused whatever it says, and a body that will
			// not parse has to be reported with its status.
			const text = await response.text();

			// This throw is meant to escape `worker.fetch`. The host then answers the page 502,
			// and the page treats a thrown answer as an unknown outcome and replays with the same
			// clientRequestId. Relaying the 5xx as this run's own status would instead tell the
			// page the write definitely failed, which nobody knows.
			if (response.status >= 500) {
				throw new Error(`${path} responded ${response.status}: ${text}`);
			}

			let parsed: unknown;
			try {
				parsed = JSON.parse(text);
			} catch {
				throw new Error(`${path} responded ${response.status}: the body was not JSON`);
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
