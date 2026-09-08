import type { AuthConfig } from "convex/server";

if (!process.env.PRESS_HTTP_URL) {
	throw new Error("PRESS_HTTP_URL is not set in Convex env");
}

export default {
	providers: [
		{
			type: "customJwt",
			issuer: `${process.env.PRESS_HTTP_URL}/plugins/chitchat`,
			applicationID: "chitchat",
			jwks: `${process.env.PRESS_HTTP_URL}/.well-known/jwks.json`,
			algorithm: "ES256",
		},
	],
} satisfies AuthConfig;
