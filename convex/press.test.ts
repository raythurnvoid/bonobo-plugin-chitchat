import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { afterEach, describe, expect, test, vi } from "vitest";
import { press_get_lease } from "./press";

afterEach(() => vi.unstubAllGlobals());

async function serve_lease(change: (facts: Record<string, unknown>) => void = () => {}, audience = "chitchat") {
	const keys = await generateKeyPair("ES256");
	const jwk = { ...(await exportJWK(keys.publicKey)), kid: "test", alg: "ES256", use: "sig" };
	vi.stubGlobal(
		"fetch",
		vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
			const url = input instanceof Request ? input.url : String(input);
			if (url === "https://press.test/.well-known/jwks.json") return Response.json({ keys: [jwk] });
			expect(url).toBe("https://press.test/api/internal/plugins/chitchat/lease");
			expect(init?.headers).toMatchObject({
				Authorization: "Bearer plu_test",
				"X-Bonobo-Service-Authorization": "Bearer pse_testservice",
			});
			if (typeof init?.body !== "string") throw new Error("Missing lease request");
			const request = JSON.parse(init.body);
			const facts = {
				hostSessionId: "session",
				hostUserId: "user",
				hostMembershipId: "membership",
				hostOrganizationId: "organization",
				hostWorkspaceId: "workspace",
				hostInstallationId: "installation",
				hostPluginVersionId: "version",
				hostServiceAccountId: "account",
				membershipLifetime: 1,
				requiredRevision: 3,
				canRead: true,
				canWrite: true,
				isOwner: false,
				organizationOwnerUserId: "owner",
				displayName: "Member",
				exchangeId: request.exchangeId,
				validatedAt: Date.now(),
				expiresAt: request.requestedExpiresAt,
			};
			change(facts);
			const jwt = await new SignJWT(facts)
				.setProtectedHeader({ alg: "ES256", kid: "test" })
				.setIssuer("https://press.test/plugins/chitchat")
				.setAudience(audience)
				.setSubject("session")
				.setExpirationTime(Math.floor(facts.expiresAt / 1000))
				.sign(keys.privateKey);
			return Response.json({ jwt, facts: { hostUserId: "forged-unsigned-sidecar" } });
		}),
	);
}

describe("press_get_lease", () => {
	test("uses verified claims and binds the exact exchange and requested expiry", async () => {
		await serve_lease();
		const expiresAt = Date.now() + 25_000;
		const result = await press_get_lease("plu_test", expiresAt);
		expect(result.lease?.facts).toMatchObject({ hostUserId: "user", expiresAt, requiredRevision: 3 });
		expect(result.lease?.jwt).toBeTypeOf("string");
	});

	test("refuses another application's audience", async () => {
		await serve_lease(() => {}, "press");
		await expect(press_get_lease("plu_test")).rejects.toThrow();
	});

	test("refuses a signed response from a different exchange", async () => {
		await serve_lease((facts) => {
			facts.exchangeId = "old-exchange";
		});
		await expect(press_get_lease("plu_test")).rejects.toThrow("does not match its request");
	});

	test("refuses a signed expiry beyond the requested deadline", async () => {
		await serve_lease((facts) => {
			facts.expiresAt = Number(facts.expiresAt) + 1000;
		});
		await expect(press_get_lease("plu_test")).rejects.toThrow("does not match its request");
	});

	test("keeps an explicit host refusal without trying to parse claims", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => Response.json({ message: "Forbidden" }, { status: 403 })),
		);
		expect(await press_get_lease("plu_test")).toEqual({ status: 403, lease: null });
	});
});
