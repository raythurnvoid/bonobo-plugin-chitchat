import type { BonoboEnv } from "bonobo-plugin-sdk";

/**
 * One host API answer. Refusals are values, not exceptions: the door's status and body come back
 * as-is so an endpoint can relay a clear message (a 16 KiB store refusal, a scope "Permission
 * denied") to the page instead of turning everything into a generic 500.
 */
export type chatbe_HostAnswer = {
	status: number;
	body: unknown;
};

export type chatbe_Host = {
	post(path: string, body: unknown): Promise<chatbe_HostAnswer>;
};

export function chatbe_create_host(env: BonoboEnv): chatbe_Host {
	return {
		async post(path, body) {
			const response = await fetch(`${env.BONOBO.host.apiOrigin}${path}`, {
				method: "POST",
				headers: {
					authorization: `Bearer ${env.BONOBO.host.token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const text = await response.text();

			let parsed: unknown = null;
			try {
				parsed = text === "" ? null : JSON.parse(text);
			} catch {
				parsed = { message: text };
			}

			return { status: response.status, body: parsed };
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
