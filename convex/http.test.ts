import { convexTest } from "convex-test";
import type { FunctionArgs } from "convex/server";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { api, internal } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");
// The cached signing key is saved encrypted.
process.env.CHITCHAT_GRANT_ENCRYPTION_KEY = btoa("k".repeat(32));

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
	// 409 stands for a disabled installation, or one whose connection still names the old version.
	const snapshot = { status: 200 };
	const requests: string[] = [];
	const key = `whsec_${btoa("s".repeat(32))}`;
	vi.stubGlobal(
		"fetch",
		vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
			const url = input instanceof Request ? input.url : String(input);
			const path = new URL(url).pathname;
			requests.push(path);
			if (path === "/.well-known/jwks.json") return Response.json({ keys: [jwk] });
			if (typeof init?.body !== "string") throw new Error("Missing Bonobo Senate request");
			const body = JSON.parse(init.body);
			if (path === "/api/v1/plugins/service-events/key") return Response.json({ key, createdAt: 1 });
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
			if (path === "/api/v1/plugins/members/list" && snapshot.status !== 200)
				return Response.json(
					{ code: "unavailable", message: "Installation is unavailable" },
					{ status: snapshot.status },
				);
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
	// Sign like Bonobo Senate: Standard Webhooks HMAC over "id.timestamp.body".
	const send_notice = async (
		revision: number,
		options: { key?: string; sentAt?: number; badFirstEntry?: boolean } = {},
	) => {
		const id = `installation:${revision}`;
		const timestamp = String(Math.floor((options.sentAt ?? Date.now()) / 1000));
		const body = JSON.stringify({
			type: "workspace.access.changed",
			timestamp: new Date().toISOString(),
			data: { installationId: "installation", revision },
		});
		const hmac = await crypto.subtle.importKey(
			"raw",
			Uint8Array.from(atob((options.key ?? key).slice("whsec_".length)), (character) => character.charCodeAt(0)),
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign"],
		);
		const signature = await crypto.subtle.sign("HMAC", hmac, new TextEncoder().encode(`${id}.${timestamp}.${body}`));
		return await t.fetch("/bonobo/access-events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"webhook-id": id,
				"webhook-timestamp": timestamp,
				"webhook-signature": `${options.badFirstEntry ? "v1,not-base64! " : ""}v1,${btoa(String.fromCharCode(...new Uint8Array(signature)))}`,
			},
			body,
		});
	};
	return { t, facts, member, feed, snapshot, requests, request_lease, send_notice };
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
		const refused = await request_lease();
		expect(refused.status).toBe(503);
		expect(refused.headers.get("Retry-After")).toBe("2");
		expect(await refused.json()).toEqual({ code: "syncing", phase: "events", retryAfterMs: 2_000 });
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
			afterRevision: 0,
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

	test("a signed notice applies a later revocation and current renewal still refuses it", async () => {
		const { t, facts, feed, requests, request_lease, send_notice } = await setup();
		expect((await request_lease()).status).toBe(200);
		const previous = await t.run((ctx) => ctx.db.query("sessions").unique());
		if (!previous) throw new Error("Missing session");
		facts.requiredRevision = 1;
		feed.events.push({ revision: 1, event: { kind: "session_revoked", hostSessionId: "session" } });
		requests.length = 0;
		expect((await send_notice(1)).status).toBe(200);
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

describe("POST /bonobo/access-events", () => {
	const pending_jobs = async (t: Awaited<ReturnType<typeof setup>>["t"]) =>
		(await t.run((ctx) => ctx.db.system.query("_scheduled_functions").collect())).filter(
			(job) => job.state.kind === "pending",
		).length;

	test("a forged or stale notice answers 401 and schedules nothing", async () => {
		const { t, facts, feed, requests, request_lease, send_notice } = await setup();
		expect((await request_lease()).status).toBe(200);
		facts.requiredRevision = 1;
		feed.events.push({ revision: 1, event: { kind: "session_revoked", hostSessionId: "session" } });
		const jobs = await pending_jobs(t);
		requests.length = 0;
		expect((await send_notice(1, { key: `whsec_${btoa("x".repeat(32))}` })).status).toBe(401);
		expect((await send_notice(1, { sentAt: Date.now() - 301_000 })).status).toBe(401);
		expect((await send_notice(1, { key: `whsec_${btoa("y".repeat(32))}` })).status).toBe(401);
		expect((await t.fetch("/bonobo/access-events", { method: "POST", body: "x".repeat(5000) })).status).toBe(413);
		// The first mismatch fetches the key once. Later mismatches in the same minute do not.
		expect(requests).toEqual(["/api/v1/plugins/service-events/key"]);
		expect(await pending_jobs(t)).toBe(jobs);
		expect(await t.run((ctx) => ctx.db.query("installations").unique())).toMatchObject({ appliedAccessRevision: 0 });
	});

	test("answers 503 until access is caught up", async () => {
		const { t, facts, feed, requests, request_lease, send_notice } = await setup();
		// Chitchat starts an installation on its first lease, so a notice before that has nothing to do.
		expect((await send_notice(0)).status).toBe(200);
		expect(requests).not.toContain("/api/v1/plugins/access/changes");
		expect((await request_lease()).status).toBe(200);
		facts.requiredRevision = 1;
		feed.events.push({ revision: 1, event: { kind: "noop" } });
		feed.status = 429;
		const busy = await send_notice(1);
		expect(busy.status).toBe(503);
		// Nothing was saved, so Bonobo Senate should use its normal backoff.
		expect(busy.headers.get("Retry-After")).toBeNull();
		feed.status = 200;
		// The feed has only revision 1 so far. Saving it is progress, so ask again soon.
		const partial = await send_notice(2);
		expect(partial.status).toBe(503);
		expect(partial.headers.get("Retry-After")).toBe("5");
		expect((await send_notice(1)).status).toBe(200);
		expect(await t.run((ctx) => ctx.db.query("installations").unique())).toMatchObject({ appliedAccessRevision: 1 });
		requests.length = 0;
		expect((await send_notice(1)).status).toBe(200);
		expect(requests).toEqual([]);
	});

	test("answers 200 while Bonobo Senate says the installation needs a new lease", async () => {
		const { t, facts, feed, snapshot, request_lease, send_notice } = await setup();
		expect((await request_lease()).status).toBe(200);
		facts.requiredRevision = 1;
		// An upgrade sends a refresh, and the member list stays unavailable until the next lease.
		feed.events.push({ revision: 1, event: { kind: "refresh", reason: "installation" } });
		snapshot.status = 409;
		expect((await send_notice(1)).status).toBe(200);
		expect(await t.run((ctx) => ctx.db.query("installations").unique())).toMatchObject({
			status: "bootstrapping",
			bootstrapPhase: "members",
		});
	});

	test("asks for a quick retry when only member cleanup moved", async () => {
		const { t, facts, member, feed, request_lease, send_notice } = await setup();
		expect((await request_lease()).status).toBe(200);
		// One call removes at most 10 x 20 read positions, so 250 need a second notice.
		await t.run(async (ctx) => {
			const installation = (await ctx.db.query("installations").unique())!;
			const channelId = await ctx.db.insert("channels", {
				installationId: installation._id,
				generation: installation.generation,
				publicId: "channel",
				visibility: "public",
				name: "General",
				sortName: "general",
				topic: "",
				createdBy: "owner",
				createdAt: 0,
				revision: 1,
				membershipRevision: 1,
				memberCount: 1,
				archivedAt: null,
				deletedAt: null,
				lastRootSequence: 0,
				lastReplySequence: 0,
				lastRootAt: 0,
				lastReplyAt: 0,
				transcriptSlug: "general",
			});
			for (let index = 0; index < 250; index++)
				await ctx.db.insert("read_states", {
					installationId: installation._id,
					channelId,
					hostUserId: member.hostUserId,
					membershipLifetime: 1,
					rootSequence: index,
					replySequence: 0,
					revision: 1,
				});
		});
		facts.requiredRevision = 1;
		feed.events.push({ revision: 1, event: { kind: "member", member: { ...member, active: false } } });
		const partial = await send_notice(1);
		expect(partial.status).toBe(503);
		expect(partial.headers.get("Retry-After")).toBe("5");
		expect((await send_notice(1)).status).toBe(200);
	});

	test("fetches the key again when the saved key cannot be decrypted", async () => {
		const { t, requests, request_lease, send_notice } = await setup();
		expect((await request_lease()).status).toBe(200);
		// For example after CHITCHAT_GRANT_ENCRYPTION_KEY changed.
		await t.run(async (ctx) => {
			await ctx.db.insert("signing_keys", { key: "not.decryptable", fetchedAt: 0 });
		});
		requests.length = 0;
		expect((await send_notice(0)).status).toBe(200);
		expect(requests).toEqual(["/api/v1/plugins/service-events/key"]);
	});

	test("accepts a valid signature after a malformed one in the list", async () => {
		const { request_lease, send_notice } = await setup();
		expect((await request_lease()).status).toBe(200);
		expect((await send_notice(0, { badFirstEntry: true })).status).toBe(200);
	});
});
