import { z } from "zod";
import { createRemoteJWKSet, jwtVerify } from "jose";

if (!process.env.PRESS_HTTP_URL) {
	throw new Error("PRESS_HTTP_URL is not set in Convex env");
}
if (!process.env.PRESS_CHITCHAT_SERVICE_SECRET) {
	throw new Error("PRESS_CHITCHAT_SERVICE_SECRET is not set in Convex env");
}
export const press_HTTP_URL = process.env.PRESS_HTTP_URL;
const PRESS_SERVICE_SECRET = process.env.PRESS_CHITCHAT_SERVICE_SECRET;

export const press_lease_facts = z.object({
	hostSessionId: z.string(),
	hostUserId: z.string(),
	hostMembershipId: z.string(),
	hostOrganizationId: z.string(),
	hostWorkspaceId: z.string(),
	hostInstallationId: z.string(),
	hostPluginVersionId: z.string(),
	hostServiceAccountId: z.string(),
	membershipLifetime: z.number().int().nonnegative(),
	requiredRevision: z.number().int().nonnegative(),
	canRead: z.boolean(),
	canWrite: z.boolean(),
	isOwner: z.boolean(),
	organizationOwnerUserId: z.string(),
	displayName: z.string().nullable(),
	exchangeId: z.string(),
	validatedAt: z.number().int().nonnegative(),
	expiresAt: z.number().int().nonnegative(),
});
export const press_member = z.object({
	hostUserId: z.string(),
	hostMembershipId: z.string().nullable(),
	membershipLifetime: z.number().int().nonnegative(),
	displayName: z.string().nullable(),
	active: z.boolean(),
	canRead: z.boolean(),
	canWrite: z.boolean(),
	isOwner: z.boolean(),
});
export const press_access_event = z.discriminatedUnion("kind", [
	z.object({ kind: z.literal("noop") }),
	z.object({ kind: z.literal("member"), member: press_member }),
	z.object({ kind: z.literal("refresh"), reason: z.enum(["permissions", "installation", "account", "members"]) }),
	z.object({ kind: z.literal("session_revoked"), hostSessionId: z.string() }),
	z.object({
		kind: z.literal("revoked"),
		reason: z.enum(["uninstalled", "workspace_deleted", "organization_deleted"]),
	}),
]);

// Only backend actions use the service proof. The browser supplies its current Press session separately.
export async function press_post(path: string, body: unknown, token?: string) {
	const response = await fetch(`${press_HTTP_URL}${path}`, {
		method: "POST",
		redirect: "error",
		headers: {
			"Content-Type": "application/json",
			"X-Bonobo-Service-Authorization": `Bearer ${PRESS_SERVICE_SECRET}`,
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(15_000),
	});
	const answer: unknown = await response.json();
	return { status: response.status, body: answer };
}

// Verifies the exact bearer without admitting or replacing a native session.
export async function press_get_lease(pressToken: string, requestedExpiresAt = Date.now() + 30_000) {
	const exchangeId = crypto.randomUUID();
	const answer = await press_post(
		"/api/internal/plugins/chitchat/lease",
		{ exchangeId, requestedExpiresAt },
		pressToken,
	);
	if (answer.status !== 200) return { status: answer.status, lease: null };
	const signed = z.object({ jwt: z.string().max(16_000) }).parse(answer.body);
	const verified = await jwtVerify(signed.jwt, createRemoteJWKSet(new URL(`${press_HTTP_URL}/.well-known/jwks.json`)), {
		issuer: `${press_HTTP_URL}/plugins/chitchat`,
		audience: "chitchat",
		algorithms: ["ES256"],
	});
	const facts = press_lease_facts.parse(verified.payload);
	if (
		facts.exchangeId !== exchangeId ||
		facts.hostSessionId !== verified.payload.sub ||
		facts.expiresAt > requestedExpiresAt ||
		facts.expiresAt > facts.validatedAt + 30_000 ||
		verified.payload.exp !== Math.floor(facts.expiresAt / 1000)
	) {
		throw new Error("Press lease does not match its request");
	}
	return { status: 200, lease: { jwt: signed.jwt, facts } };
}
