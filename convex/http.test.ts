import { convexTest } from "convex-test";
import type { FunctionArgs } from "convex/server";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { api, internal } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

beforeEach(() => {
	vi.useFakeTimers();
	vi.setSystemTime(new Date("2026-09-09T12:00:00Z"));
});
afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

async function setup() {
	const t = convexTest(schema, modules);
	const keys = await generateKeyPair("ES256");
	const jwk = { ...(await exportJWK(keys.publicKey)), kid: "test", alg: "ES256", use: "sig" };
	const facts = {
		hostUserId: "member",
		hostMembershipId: "membership",
		hostOrganizationId: "organization",
		hostWorkspaceId: "workspace",
		hostInstallationId: "installation",
		hostPluginVersionId: "version",
		hostServiceAccountId: "account",
		membershipLifetime: 1,
		requiredRevision: 0,
		canRead: true,
		canWrite: true,
		isOwner: false,
		organizationOwnerUserId: "owner",
		displayName: "Member",
	};
	const member = {
		hostUserId: facts.hostUserId,
		hostMembershipId: facts.hostMembershipId,
		membershipLifetime: 1,
		displayName: "Member",
		active: true,
		canRead: true,
		canWrite: true,
		isOwner: false,
	};
	const feed = {
		status: 200,
		events: [] as Array<Pick<FunctionArgs<typeof internal.access.apply_event>, "revision" | "event">>,
	};
	const requests: string[] = [];
	vi.stubGlobal(
		"fetch",
		vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
			const url = input instanceof Request ? input.url : String(input);
			const path = new URL(url).pathname;
			requests.push(path);
			if (path === "/.well-known/jwks.json") return Response.json({ keys: [jwk] });
			if (typeof init?.body !== "string") throw new Error("Missing Press request");
			const body = JSON.parse(init.body);
			if (path === "/api/v1/plugins/identity/exchange") {
				const hostSessionId = new Headers(init.headers).get("Authorization")!.slice("Bearer plu_".length);
				const jwt = await new SignJWT({
					...facts,
					hostSessionId,
					exchangeId: body.exchangeId,
					validatedAt: Date.now(),
					expiresAt: body.requestedExpiresAt,
				})
					.setProtectedHeader({ alg: "ES256", kid: "test" })
					.setIssuer("https://press.test/plugins-services")
					.setAudience("bonobo-plugin:chitchat")
					.setSubject(hostSessionId)
					.setExpirationTime(Math.floor(body.requestedExpiresAt / 1000))
					.sign(keys.privateKey);
				return Response.json({ jwt });
			}
			if (path === "/api/v1/plugins/members/list")
				return Response.json({
					startRevision: facts.requiredRevision,
					currentRevision: facts.requiredRevision,
					members: [member],
					continueCursor: null,
				});
			expect(path).toBe("/api/v1/plugins/access/changes");
			if (feed.status !== 200) return Response.json({ message: "Rate limited" }, { status: feed.status });
			return Response.json({
				events: feed.events.filter((entry) => entry.revision > body.afterRevision),
				currentRevision: facts.requiredRevision,
				continueRevision: facts.requiredRevision,
				isDone: true,
			});
		}),
	);
	const request_lease = (session = "session") =>
		t.fetch("/auth/lease", {
			method: "POST",
			headers: { Origin: "https://press.test", "Content-Type": "application/json" },
			body: JSON.stringify({ pressToken: `plu_${session}` }),
		});
	return { t, facts, member, feed, requests, request_lease };
}

describe("POST /auth/lease", () => {
	test("bootstraps access before admitting the first lease", async () => {
		const { t, requests, request_lease } = await setup();
		expect((await request_lease()).status).toBe(200);
		expect(requests).toContain("/api/v1/plugins/members/list");
		expect(requests).toContain("/api/v1/plugins/access/changes");
		expect(await t.run((ctx) => ctx.db.query("installations").unique())).toMatchObject({ status: "ready" });
		expect(await t.run((ctx) => ctx.db.query("sessions").unique())).toMatchObject({ hostSessionId: "session" });
	});

	test("renews 50 frames four times without extra access-feed reads", async () => {
		const { t, requests, request_lease } = await setup();
		for (let frame = 0; frame < 50; frame++) expect((await request_lease(`frame-${frame}`)).status).toBe(200);
		requests.length = 0;
		for (let renewal = 0; renewal < 4; renewal++) {
			vi.advanceTimersByTime(15_000);
			await t.finishInProgressScheduledFunctions();
			for (let frame = 0; frame < 50; frame++) expect((await request_lease(`frame-${frame}`)).status).toBe(200);
		}
		expect(requests.filter((path) => path === "/api/v1/plugins/identity/exchange")).toHaveLength(200);
		expect(requests.filter((path) => path === "/api/v1/plugins/access/changes")).toHaveLength(0);
		const sessions = await t.run((ctx) => ctx.db.query("sessions").collect());
		expect(sessions).toHaveLength(50);
		expect(sessions.every((session) => session.revokedAt === null && session.expiresAt > Date.now())).toBe(true);
	});

	test("renews current access even when the feed would refuse the request", async () => {
		const { t, feed, requests, request_lease } = await setup();
		expect((await request_lease()).status).toBe(200);
		feed.status = 429;
		requests.length = 0;
		vi.advanceTimersByTime(15_000);
		expect((await request_lease()).status).toBe(200);
		expect(requests).not.toContain("/api/v1/plugins/access/changes");
		expect(await t.run((ctx) => ctx.db.query("sessions").unique())).toMatchObject({ validatedAt: Date.now() });
	});

	test("refuses renewal when a newer required revision cannot be read", async () => {
		const { t, facts, feed, requests, request_lease } = await setup();
		expect((await request_lease()).status).toBe(200);
		const previous = await t.run((ctx) => ctx.db.query("sessions").unique());
		facts.requiredRevision = 1;
		feed.status = 429;
		requests.length = 0;
		vi.advanceTimersByTime(15_000);
		expect((await request_lease()).status).toBe(503);
		expect(requests).toContain("/api/v1/plugins/access/changes");
		expect(await t.run((ctx) => ctx.db.query("sessions").unique())).toEqual(previous);
	});

	test("admits a lease whose required revision is already covered by a later event", async () => {
		const { t, requests, request_lease } = await setup();
		expect((await request_lease()).status).toBe(200);
		const installation = await t.run((ctx) => ctx.db.query("installations").unique());
		if (!installation) throw new Error("Missing installation");
		await t.mutation(internal.access.apply_event, {
			installationId: installation._id,
			revision: 1,
			event: { kind: "noop" },
		});
		requests.length = 0;
		vi.advanceTimersByTime(15_000);
		expect((await request_lease()).status).toBe(200);
		expect(requests).not.toContain("/api/v1/plugins/access/changes");
	});

	test("refuses a different membership lifetime even when its required revision is covered", async () => {
		const { t, facts, requests, request_lease } = await setup();
		expect((await request_lease()).status).toBe(200);
		const previous = await t.run((ctx) => ctx.db.query("sessions").unique());
		facts.membershipLifetime = 2;
		requests.length = 0;
		vi.advanceTimersByTime(15_000);
		expect((await request_lease()).status).toBe(409);
		expect(requests).not.toContain("/api/v1/plugins/access/changes");
		expect(await t.run((ctx) => ctx.db.query("sessions").unique())).toEqual(previous);
	});

	test("applies a newer revision before admitting the lease", async () => {
		const { t, facts, member, feed, requests, request_lease } = await setup();
		expect((await request_lease()).status).toBe(200);
		facts.requiredRevision = 1;
		facts.canWrite = false;
		feed.events.push({ revision: 1, event: { kind: "member", member: { ...member, canWrite: false } } });
		requests.length = 0;
		vi.advanceTimersByTime(15_000);
		expect((await request_lease()).status).toBe(200);
		expect(requests).toContain("/api/v1/plugins/access/changes");
		expect(await t.run((ctx) => ctx.db.query("installations").unique())).toMatchObject({ appliedAccessRevision: 1 });
		expect(await t.run((ctx) => ctx.db.query("workspace_members").unique())).toMatchObject({ canWrite: false });
		expect(await t.run((ctx) => ctx.db.query("sessions").unique())).toMatchObject({
			canWrite: false,
			requiredRevision: 1,
		});
	});

	test("bootstraps a changed plugin version even at the same revision", async () => {
		const { t, facts, requests, request_lease } = await setup();
		expect((await request_lease()).status).toBe(200);
		facts.hostPluginVersionId = "new-version";
		requests.length = 0;
		vi.advanceTimersByTime(15_000);
		expect((await request_lease()).status).toBe(200);
		expect(requests).toContain("/api/v1/plugins/members/list");
		expect(requests).toContain("/api/v1/plugins/access/changes");
		expect(await t.run((ctx) => ctx.db.query("installations").unique())).toMatchObject({
			status: "ready",
			hostPluginVersionId: "new-version",
		});
	});

	test("background polling discovers a later revocation and current renewal still refuses it", async () => {
		const { t, facts, feed, requests, request_lease } = await setup();
		expect((await request_lease()).status).toBe(200);
		const previous = await t.run((ctx) => ctx.db.query("sessions").unique());
		if (!previous) throw new Error("Missing session");
		facts.requiredRevision = 1;
		feed.events.push({ revision: 1, event: { kind: "session_revoked", hostSessionId: "session" } });
		requests.length = 0;
		await t.mutation(internal.access.wake_installations, { paginationOpts: { numItems: 50, cursor: null } });
		vi.advanceTimersByTime(0);
		await t.finishInProgressScheduledFunctions();
		expect(requests).toContain("/api/v1/plugins/access/changes");
		expect(
			await t
				.withIdentity({
					issuer: "https://press.test/plugins-services",
					subject: "session",
					exchangeId: previous.exchangeId,
				})
				.query(api.sessions.current, {}),
		).toBeNull();
		requests.length = 0;
		vi.advanceTimersByTime(15_000);
		expect((await request_lease()).status).toBe(409);
		expect(requests).not.toContain("/api/v1/plugins/access/changes");
		expect(await t.run((ctx) => ctx.db.query("sessions").unique())).toMatchObject({ exchangeId: previous.exchangeId });
	});
});
