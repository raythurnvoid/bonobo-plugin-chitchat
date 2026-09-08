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
	vi.stubEnv("PRESS_ACCESS_PUSH_SECRET", "push_testsecret");
});
afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllEnvs();
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
		issuer: "https://press.test/plugins/chitchat",
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
					issuer: "https://another.test/plugins/chitchat",
					subject: facts.hostSessionId,
					exchangeId: facts.exchangeId,
				})
				.query(api.sessions.current, {}),
		).toBeNull();
		expect(
			await t
				.withIdentity({
					issuer: "https://press.test/plugins/chitchat",
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
					issuer: "https://press.test/plugins/chitchat",
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
					issuer: "https://press.test/plugins/chitchat",
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
			issuer: "https://press.test/plugins/chitchat",
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
