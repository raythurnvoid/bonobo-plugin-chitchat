import { convexTest } from "convex-test";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { api, internal } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

describe("members.resolve", () => {
	test("distinguishes an unnamed active member from a former member", async () => {
		const { t, user, member, installationId } = await setup();
		await t.mutation(internal.access.apply_event, {
			installationId,
			revision: 1,
			event: {
				kind: "member",
				member: { ...member, hostUserId: "unnamed", hostMembershipId: "unnamed-membership", displayName: null },
			},
		});
		expect(await user.query(api.members.resolve, { userIds: ["unnamed", "former"] })).toEqual({
			unnamed: "Someone with no name yet",
			former: null,
		});
	});
});

beforeEach(() => {
	vi.useFakeTimers();
	vi.setSystemTime(new Date("2026-09-08T12:00:00Z"));
	vi.stubEnv("PRESS_HTTP_URL", "https://press.test");
	vi.stubEnv("PRESS_CHITCHAT_SERVICE_SECRET", "pse_testservice");
});
afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllEnvs();
	vi.unstubAllGlobals();
});

async function setup() {
	const t = convexTest(schema, modules);
	const facts = {
		hostSessionId: "session-one",
		hostUserId: "member-one",
		hostMembershipId: "membership-one",
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
		displayName: "One",
		exchangeId: "exchange-one",
		validatedAt: Date.now(),
		expiresAt: Date.now() + 30_000,
	};
	const member = {
		hostUserId: facts.hostUserId,
		hostMembershipId: facts.hostMembershipId,
		membershipLifetime: 1,
		displayName: "One",
		active: true,
		canRead: true,
		canWrite: true,
		isOwner: false,
	};
	const installationId = await t.mutation(internal.access.ensure_installation, {
		facts,
		generation: "fresh-generation",
	});
	if (!installationId) throw new Error("Setup did not create an installation");
	expect(
		await t.mutation(internal.access.accept_snapshot_page, {
			installationId,
			expectedStartRevision: null,
			expectedCursor: null,
			page: { startRevision: 0, currentRevision: 0, members: [member], continueCursor: null },
		}),
	).toBe(true);
	expect(await t.mutation(internal.access.finish_snapshot, { installationId })).toBe(true);
	expect(await t.mutation(internal.access.finish_catchup, { installationId, observedRevision: 0 })).toBe(true);
	expect(await t.mutation(internal.access.admit_lease, { installationId, facts })).toBe(true);
	const user = t.withIdentity({
		issuer: "https://press.test/plugins-services",
		subject: facts.hostSessionId,
		exchangeId: facts.exchangeId,
	});
	return { t, user, facts, member, installationId };
}

describe("sessions.current", () => {
	test("requires the configured issuer and current exchange", async () => {
		const { t, user, facts } = await setup();
		expect(await user.query(api.sessions.current, {})).toMatchObject({ hostUserId: "member-one", canWrite: true });
		expect(await t.query(api.sessions.current, {})).toBeNull();
		expect(
			await t
				.withIdentity({
					issuer: "https://press.test/plugins/chitchat",
					subject: facts.hostSessionId,
					exchangeId: facts.exchangeId,
				})
				.query(api.sessions.current, {}),
		).toBeNull();
		expect(
			await t
				.withIdentity({
					issuer: "https://another.test/plugins-services",
					subject: facts.hostSessionId,
					exchangeId: facts.exchangeId,
				})
				.query(api.sessions.current, {}),
		).toBeNull();
		expect(
			await t
				.withIdentity({
					issuer: "https://press.test/plugins-services",
					subject: facts.hostSessionId,
					exchangeId: "old-exchange",
				})
				.query(api.sessions.current, {}),
		).toBeNull();
	});

	test("denies a delivered write downgrade while retaining read access", async () => {
		const { t, user, member, installationId } = await setup();
		expect(
			await t.mutation(internal.access.apply_event, {
				installationId,
				revision: 1,
				event: { kind: "member", member: { ...member, canWrite: false } },
			}),
		).toBe(true);
		expect(await user.query(api.sessions.current, {})).toMatchObject({ canWrite: false });
		expect(
			await user.mutation(api.channels.create, {
				clientRequestId: "create",
				name: "general",
				topic: "",
				visibility: "public",
				invitedUserIds: [],
			}),
		).toMatchObject({ _nay: { message: "Permission denied" } });
		expect(await t.run(async (ctx) => (await ctx.db.query("channels").collect()).length)).toBe(0);
	});

	test("does not disconnect a different session or a no-op event", async () => {
		const { t, user, installationId } = await setup();
		await t.mutation(internal.access.apply_event, { installationId, revision: 1, event: { kind: "noop" } });
		await t.mutation(internal.access.apply_event, {
			installationId,
			revision: 2,
			event: { kind: "session_revoked", hostSessionId: "other-session" },
		});
		expect(await user.query(api.sessions.current, {})).not.toBeNull();
	});
});

describe("wake_installations", () => {
	test("repeated outage polls leave no extra retry chain", async () => {
		const { t } = await setup();
		const fetchMock = vi.fn(async () => { throw new TypeError("Press is unavailable"); });
		vi.stubGlobal("fetch", fetchMock);
		for (let poll = 0; poll < 4; poll++) {
			await t.mutation(internal.access.wake_installations, { paginationOpts: { numItems: 50, cursor: null } });
			vi.advanceTimersByTime(0);
			await t.finishInProgressScheduledFunctions();
			const jobs = await t.run((ctx) => ctx.db.system.query("_scheduled_functions").collect());
			expect(jobs.filter((job) => job.name === "access:sync" && job.state.kind === "pending")).toEqual([]);
			expect(fetchMock).toHaveBeenCalledTimes(poll + 1);
			vi.advanceTimersByTime(30_000);
			await t.finishInProgressScheduledFunctions();
		}
	});

	test("pages through installations and schedules each active one without waiting for another service call", async () => {
		const { t, installationId } = await setup();
		await t.run(async (ctx) => {
			const { _id, _creationTime, ...installation } = (await ctx.db.get("installations", installationId))!;
			for (let index = 0; index < 52; index++)
				await ctx.db.insert("installations", {
					...installation,
					hostInstallationId: `other-${index}`,
					status: index === 51 ? "revoked" : "ready",
				});
		});
		await t.mutation(internal.access.wake_installations, { paginationOpts: { numItems: 50, cursor: null } });
		const firstPage = await t.run((ctx) => ctx.db.system.query("_scheduled_functions").collect());
		expect(firstPage.filter((job) => job.name === "access:sync")).toHaveLength(50);
		const continuation = firstPage.find((job) => job.name === "access:wake_installations");
		if (!continuation) throw new Error("The next installation page was not scheduled");
		await t.mutation(internal.access.wake_installations, continuation.args[0]);
		const allPages = await t.run((ctx) => ctx.db.system.query("_scheduled_functions").collect());
		expect(allPages.filter((job) => job.name === "access:sync")).toHaveLength(52);
	});
});

describe("sync", () => {
	test("pulls a new removal even when the local revision already meets the requested revision", async () => {
		const { t, user, member, installationId } = await setup();
		const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
			expect(String(input)).toBe("https://press.test/api/v1/plugins/access/changes");
			expect(JSON.parse(String(init?.body))).toEqual({ installationId: "installation", afterRevision: 0, limit: 100 });
			return Response.json({
				events: [{ revision: 1, event: { kind: "member", member: { ...member, active: false, canRead: false, canWrite: false } } }],
				currentRevision: 1,
				continueRevision: 1,
				isDone: true,
			});
		});
		vi.stubGlobal("fetch", fetchMock);
		expect(await t.action(internal.access.sync, { installationId, requiredRevision: 0 })).toBe(true);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(await user.query(api.sessions.current, {})).toBeNull();
	});

	test("a failed installation does not stop another installation from pulling changes", async () => {
		const { t, facts, installationId } = await setup();
		const secondId = await t.mutation(internal.access.ensure_installation, {
			facts: { ...facts, hostInstallationId: "second-installation" },
			generation: "second-generation",
		});
		if (!secondId) throw new Error("Setup has no second installation");
		const seen: string[] = [];
		vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
			const body = JSON.parse(String(init?.body));
			seen.push(body.installationId);
			if (body.installationId === "installation") throw new TypeError("Connection unavailable");
			if (String(input).endsWith("/members/list"))
				return Response.json({ startRevision: 0, currentRevision: 0, members: [], continueCursor: null });
			return Response.json({ events: [], currentRevision: 0, continueRevision: 0, isDone: true });
		}));
		const results = await Promise.all([
			t.action(internal.access.sync, { installationId, requiredRevision: 0 }),
			t.action(internal.access.sync, { installationId: secondId, requiredRevision: 0 }),
		]);
		expect(results).toEqual([false, true]);
		expect(seen).toContain("second-installation");
		expect((await t.query(internal.access.get_installation, { installationId: secondId }))?.status).toBe("ready");
	});
});

describe("admit_lease", () => {
	test("remembers a source session revoked before its first native admission", async () => {
		const { t, facts, installationId } = await setup();
		await t.mutation(internal.access.apply_event, {
			installationId,
			revision: 1,
			event: { kind: "session_revoked", hostSessionId: "not-yet-admitted" },
		});
		expect(
			await t.mutation(internal.access.admit_lease, {
				installationId,
				facts: { ...facts, hostSessionId: "not-yet-admitted", exchangeId: "late-first-response" },
			}),
		).toBe(false);
		expect(await t.run(async (ctx) => (await ctx.db.query("sessions").collect()).length)).toBe(1);
	});

	test("requires fresh validation when a snapshot starts after the lease revision", async () => {
		const { t, user, facts, member, installationId } = await setup();
		await t.mutation(internal.access.restart_snapshot, { installationId, revoked: false });
		await t.mutation(internal.access.accept_snapshot_page, {
			installationId,
			expectedStartRevision: null,
			expectedCursor: null,
			page: { startRevision: 1, currentRevision: 1, members: [member], continueCursor: null },
		});
		await t.mutation(internal.access.finish_snapshot, { installationId });
		await t.mutation(internal.access.finish_catchup, { installationId, observedRevision: 1 });
		expect(await user.query(api.sessions.current, {})).toBeNull();
		expect(
			await t.mutation(internal.access.admit_lease, {
				installationId,
				facts: { ...facts, hostSessionId: "first-session", exchangeId: "late-first-response" },
			}),
		).toBe(false);
		expect(
			await t.mutation(internal.access.admit_lease, {
				installationId,
				facts: { ...facts, hostSessionId: "new-session", exchangeId: "fresh-response", requiredRevision: 1 },
			}),
		).toBe(true);
	});

	test("keeps the original deadline when a response arrives late", async () => {
		const { t, facts, installationId } = await setup();
		vi.advanceTimersByTime(25_000);
		expect(
			await t.mutation(internal.access.admit_lease, {
				installationId,
				facts: { ...facts, exchangeId: "exchange-two", validatedAt: facts.validatedAt + 1 },
			}),
		).toBe(true);
		const stored = await t.run(async (ctx) => await ctx.db.query("sessions").unique());
		expect(stored?.expiresAt).toBe(facts.expiresAt);
		vi.advanceTimersByTime(5_001);
		expect(
			await t.mutation(internal.access.admit_lease, {
				installationId,
				facts: { ...facts, exchangeId: "exchange-three" },
			}),
		).toBe(false);
	});

	test("cannot replace a newer lease with a delayed older response", async () => {
		const { t, user, facts, installationId } = await setup();
		vi.advanceTimersByTime(1_000);
		const next = { ...facts, exchangeId: "exchange-new", validatedAt: Date.now(), expiresAt: Date.now() + 30_000 };
		expect(await t.mutation(internal.access.admit_lease, { installationId, facts: next })).toBe(true);
		expect(await t.mutation(internal.access.admit_lease, { installationId, facts })).toBe(false);
		expect(await user.query(api.sessions.current, {})).toBeNull();
		expect(
			await t
				.withIdentity({
					issuer: "https://press.test/plugins-services",
					subject: facts.hostSessionId,
					exchangeId: next.exchangeId,
				})
				.query(api.sessions.current, {}),
		).not.toBeNull();
	});

	test("an old expiry task cannot expire a renewed session", async () => {
		const { t, facts, installationId } = await setup();
		const old = await t.run(async (ctx) => await ctx.db.query("sessions").unique());
		if (!old) throw new Error("Setup has no session");
		vi.advanceTimersByTime(20_000);
		const next = { ...facts, exchangeId: "exchange-new", validatedAt: Date.now(), expiresAt: Date.now() + 30_000 };
		expect(await t.mutation(internal.access.admit_lease, { installationId, facts: next })).toBe(true);
		vi.advanceTimersByTime(10_001);
		await t.mutation(internal.sessions.expire, { sessionId: old._id, exchangeId: facts.exchangeId });
		expect(
			await t
				.withIdentity({
					issuer: "https://press.test/plugins-services",
					subject: facts.hostSessionId,
					exchangeId: next.exchangeId,
				})
				.query(api.sessions.current, {}),
		).not.toBeNull();
	});

	test("a targeted revoke rejects an earlier exchanged response", async () => {
		const { t, user, facts, installationId } = await setup();
		await t.mutation(internal.access.apply_event, {
			installationId,
			revision: 1,
			event: { kind: "session_revoked", hostSessionId: facts.hostSessionId },
		});
		expect(await user.query(api.sessions.current, {})).toBeNull();
		expect(
			await t.mutation(internal.access.admit_lease, {
				installationId,
				facts: { ...facts, exchangeId: "later-response" },
			}),
		).toBe(false);
	});
});

describe("apply_event", () => {
	test("refuses a gap and refuses admission beyond the applied revision", async () => {
		const { t, facts, member, installationId } = await setup();
		expect(
			await t.mutation(internal.access.apply_event, { installationId, revision: 2, event: { kind: "member", member } }),
		).toBe(false);
		expect((await t.query(internal.access.get_installation, { installationId }))?.appliedAccessRevision).toBe(0);
		expect(
			await t.mutation(internal.access.admit_lease, {
				installationId,
				facts: { ...facts, requiredRevision: 2, exchangeId: "future-exchange" },
			}),
		).toBe(false);
	});

	test("remove and re-invite do not restore a previous private grant", async () => {
		const { t, user, facts, member, installationId } = await setup();
		const channel = await user.mutation(api.channels.create, {
			clientRequestId: "private",
			name: "private",
			topic: "",
			visibility: "private",
			invitedUserIds: [],
		});
		if (channel._nay || channel._yay.kind !== "channel") throw new Error("Setup has no private channel");
		const removed = {
			...member,
			hostMembershipId: null,
			membershipLifetime: 2,
			active: false,
			canRead: false,
			canWrite: false,
		};
		expect(
			await t.mutation(internal.access.apply_event, {
				installationId,
				revision: 1,
				event: { kind: "member", member: removed },
			}),
		).toBe(true);
		expect(await user.query(api.sessions.current, {})).toBeNull();
		expect(
			await t.mutation(internal.access.apply_event, {
				installationId,
				revision: 2,
				event: { kind: "member", member: { ...member, membershipLifetime: 2 } },
			}),
		).toBe(true);
		vi.advanceTimersByTime(100);
		const next = {
			...facts,
			membershipLifetime: 2,
			requiredRevision: 2,
			exchangeId: "reinvited",
			validatedAt: Date.now(),
			expiresAt: Date.now() + 30_000,
		};
		expect(await t.mutation(internal.access.admit_lease, { installationId, facts: next })).toBe(true);
		const returned = t.withIdentity({
			issuer: "https://press.test/plugins-services",
			subject: facts.hostSessionId,
			exchangeId: next.exchangeId,
		});
		expect(await returned.query(api.channels.get, { channelId: channel._yay.channelId })).toBeNull();
		expect(
			(
				await returned.query(api.channels.list_mine, {
					archived: false,
					paginationOpts: { numItems: 50, cursor: null },
				})
			).page,
		).toEqual([]);
	});

	test("a role change during a snapshot requires another pass", async () => {
		const { t, user, member, installationId } = await setup();
		await t.mutation(internal.access.apply_event, {
			installationId,
			revision: 1,
			event: { kind: "refresh", reason: "permissions" },
		});
		expect(await user.query(api.sessions.current, {})).toBeNull();
		await t.mutation(internal.access.accept_snapshot_page, {
			installationId,
			expectedStartRevision: null,
			expectedCursor: null,
			page: { startRevision: 1, currentRevision: 2, members: [member], continueCursor: null },
		});
		await t.mutation(internal.access.finish_snapshot, { installationId });
		expect(
			await t.mutation(internal.access.apply_event, {
				installationId,
				revision: 2,
				event: { kind: "refresh", reason: "permissions" },
			}),
		).toBe(false);
		expect(await t.mutation(internal.access.finish_catchup, { installationId, observedRevision: 2 })).toBe(false);
		expect(await t.query(internal.access.get_installation, { installationId })).toMatchObject({
			status: "bootstrapping",
			bootstrapStartRevision: null,
			bootstrapPhase: "members",
		});
	});
});
