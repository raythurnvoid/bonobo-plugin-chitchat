import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { doc } from "convex-helpers/validators";
import { zodToConvex } from "convex-helpers/server/zod4";
import { z } from "zod";
import { internalAction, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import schema from "./schema";
import { press_access_event, press_lease_facts, press_member, press_post } from "./press";
import { channel_members_remove_host_member } from "./channel_members";

const snapshot_response = z.object({
	startRevision: z.number().int().nonnegative(),
	currentRevision: z.number().int().nonnegative(),
	members: z.array(press_member).max(50),
	continueCursor: z.string().nullable(),
});
const events_response = z.object({
	events: z.array(z.object({ revision: z.number().int().positive(), event: press_access_event })).max(100),
	currentRevision: z.number().int().nonnegative(),
	continueRevision: z.number().int().nonnegative(),
	isDone: z.boolean(),
});

export const get_installation = internalQuery({
	args: { installationId: v.id("installations") },
	returns: v.union(doc(schema, "installations"), v.null()),
	handler: async (ctx, args) => await ctx.db.get(args.installationId),
});

export const ensure_installation = internalMutation({
	args: { facts: zodToConvex(press_lease_facts), generation: v.string() },
	returns: v.union(v.id("installations"), v.null()),
	handler: async (ctx, { facts, generation }) => {
		if (!facts.canRead || facts.expiresAt <= Date.now()) return null;
		const existing = await ctx.db
			.query("installations")
			.withIndex("by_hostInstallationId", (q) => q.eq("hostInstallationId", facts.hostInstallationId))
			.unique();
		if (existing) {
			if (
				existing.status === "revoked" ||
				existing.hostOrganizationId !== facts.hostOrganizationId ||
				existing.hostWorkspaceId !== facts.hostWorkspaceId
			)
				return null;
			if (
				existing.hostPluginVersionId !== facts.hostPluginVersionId ||
				existing.hostServiceAccountId !== facts.hostServiceAccountId ||
				existing.organizationOwnerUserId !== facts.organizationOwnerUserId
			) {
				if (
					facts.requiredRevision < existing.appliedAccessRevision ||
					facts.requiredRevision < existing.invalidatedAtRevision
				)
					return null;
				await ctx.db.patch(existing._id, {
					hostPluginVersionId: facts.hostPluginVersionId,
					hostServiceAccountId: facts.hostServiceAccountId,
					organizationOwnerUserId: facts.organizationOwnerUserId,
					status: "bootstrapping",
					invalidatedAtRevision: facts.requiredRevision,
					bootstrapStartRevision: null,
					bootstrapCursor: null,
					bootstrapPhase: "members",
					bootstrapTargetRevision: facts.requiredRevision,
				});
			}
			return existing._id;
		}
		return await ctx.db.insert("installations", {
			hostInstallationId: facts.hostInstallationId,
			hostOrganizationId: facts.hostOrganizationId,
			hostWorkspaceId: facts.hostWorkspaceId,
			hostPluginVersionId: facts.hostPluginVersionId,
			hostServiceAccountId: facts.hostServiceAccountId,
			organizationOwnerUserId: facts.organizationOwnerUserId,
			status: "bootstrapping",
			appliedAccessRevision: 0,
			invalidatedAtRevision: facts.requiredRevision,
			bootstrapStartRevision: null,
			bootstrapCursor: null,
			bootstrapPhase: "members",
			bootstrapTargetRevision: facts.requiredRevision,
			generation,
			outputRoot: null,
		});
	},
});

export const accept_snapshot_page = internalMutation({
	args: {
		installationId: v.id("installations"),
		expectedStartRevision: v.union(v.number(), v.null()),
		expectedCursor: v.union(v.string(), v.null()),
		page: zodToConvex(snapshot_response),
	},
	returns: v.boolean(),
	handler: async (ctx, args) => {
		const installation = await ctx.db.get(args.installationId);
		if (
			!installation ||
			installation.status !== "bootstrapping" ||
			installation.bootstrapPhase !== "members" ||
			installation.bootstrapStartRevision !== args.expectedStartRevision ||
			installation.bootstrapCursor !== args.expectedCursor
		)
			return false;
		if (
			args.page.startRevision < installation.invalidatedAtRevision ||
			args.page.currentRevision < args.page.startRevision ||
			(args.expectedStartRevision !== null && args.page.startRevision !== args.expectedStartRevision)
		)
			return false;
		for (const member of args.page.members) {
			const existing = await ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", installation._id).eq("hostUserId", member.hostUserId),
				)
				.unique();
			const fields = {
				installationId: installation._id,
				...member,
				revision: args.page.startRevision,
				cleanupPending:
					existing?.cleanupPending === true ||
					(existing !== null && (!member.active || existing.membershipLifetime !== member.membershipLifetime)),
			};
			if (existing) await ctx.db.replace(existing._id, fields);
			else await ctx.db.insert("workspace_members", fields);
		}
		await ctx.db.patch(installation._id, {
			bootstrapStartRevision: args.page.startRevision,
			bootstrapCursor: args.page.continueCursor,
			bootstrapTargetRevision: Math.max(installation.bootstrapTargetRevision, args.page.currentRevision),
			bootstrapPhase: args.page.continueCursor === null ? "cleanup" : "members",
		});
		return true;
	},
});

export const finish_snapshot = internalMutation({
	args: { installationId: v.id("installations") },
	returns: v.boolean(),
	handler: async (ctx, args) => {
		const installation = await ctx.db.get(args.installationId);
		if (
			!installation ||
			installation.status !== "bootstrapping" ||
			installation.bootstrapPhase !== "cleanup" ||
			installation.bootstrapStartRevision === null
		)
			return false;
		const base = installation.bootstrapStartRevision;
		const missing = await ctx.db
			.query("workspace_members")
			.withIndex("by_installation_revision", (q) => q.eq("installationId", installation._id).lt("revision", base))
			.take(50);
		for (const member of missing) {
			await ctx.db.patch(member._id, {
				active: false,
				canRead: false,
				canWrite: false,
				isOwner: false,
				revision: base,
				cleanupPending: true,
			});
		}
		if (missing.length > 0) return false;
		const pending = await ctx.db
			.query("workspace_members")
			.withIndex("by_installation_cleanupPending", (q) =>
				q.eq("installationId", installation._id).eq("cleanupPending", true),
			)
			.first();
		if (pending) {
			const done = await channel_members_remove_host_member(ctx, {
				installationId: installation._id,
				hostUserId: pending.hostUserId,
				membershipLifetime: pending.active ? pending.membershipLifetime : -1,
			});
			if (done) await ctx.db.patch(pending._id, { cleanupPending: false });
			return false;
		}
		// Keep queries closed until all changes observed during the scan have been replayed.
		await ctx.db.patch(installation._id, {
			appliedAccessRevision: base,
			invalidatedAtRevision: Math.max(installation.invalidatedAtRevision, base),
			bootstrapPhase: "events",
		});
		return true;
	},
});

export const apply_event = internalMutation({
	args: { installationId: v.id("installations"), revision: v.number(), event: zodToConvex(press_access_event) },
	returns: v.boolean(),
	handler: async (ctx, args) => {
		const installation = await ctx.db.get(args.installationId);
		if (!installation || installation.status === "revoked") return false;
		if (args.revision <= installation.appliedAccessRevision) return true;
		if (
			args.revision !== installation.appliedAccessRevision + 1 ||
			(installation.status === "bootstrapping" && installation.bootstrapPhase !== "events")
		)
			return false;
		const event = args.event;
		if (event.kind === "refresh") {
			await ctx.db.patch(installation._id, {
				status: "bootstrapping",
				invalidatedAtRevision: args.revision,
				bootstrapStartRevision: null,
				bootstrapCursor: null,
				bootstrapPhase: "members",
				bootstrapTargetRevision: args.revision,
			});
			return false;
		}
		if (event.kind === "revoked") {
			await ctx.db.patch(installation._id, {
				status: "revoked",
				invalidatedAtRevision: args.revision,
				appliedAccessRevision: args.revision,
			});
			return true;
		}
		if (event.kind === "session_revoked") {
			const revoked = await ctx.db
				.query("revoked_sessions")
				.withIndex("by_hostSessionId", (q) => q.eq("hostSessionId", event.hostSessionId))
				.unique();
			if (revoked) await ctx.db.patch(revoked._id, { revision: args.revision });
			else
				await ctx.db.insert("revoked_sessions", {
					installationId: installation._id,
					hostSessionId: event.hostSessionId,
					revision: args.revision,
				});
			const session = await ctx.db
				.query("sessions")
				.withIndex("by_hostSessionId", (q) => q.eq("hostSessionId", event.hostSessionId))
				.unique();
			if (session?.installationId === installation._id) {
				await ctx.db.patch(session._id, { revokedAt: Date.now(), revokedRevision: args.revision });
			}
		}
		if (event.kind === "member") {
			let member = await ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", installation._id).eq("hostUserId", event.member.hostUserId),
				)
				.unique();
			if (!member || member.revision !== args.revision) {
				const fields = {
					installationId: installation._id,
					...event.member,
					revision: args.revision,
					cleanupPending:
						member?.cleanupPending === true ||
						(member !== null &&
							(!event.member.active || member.membershipLifetime !== event.member.membershipLifetime)),
				};
				if (member) await ctx.db.replace(member._id, fields);
				else await ctx.db.insert("workspace_members", fields);
				member = await ctx.db
					.query("workspace_members")
					.withIndex("by_installation_hostUserId", (q) =>
						q.eq("installationId", installation._id).eq("hostUserId", event.member.hostUserId),
					)
					.unique();
			}
			if (member?.cleanupPending) {
				const done = await channel_members_remove_host_member(ctx, {
					installationId: installation._id,
					hostUserId: member.hostUserId,
					membershipLifetime: member.active ? member.membershipLifetime : -1,
				});
				if (!done) return false;
				await ctx.db.patch(member._id, { cleanupPending: false });
			}
		}
		await ctx.db.patch(installation._id, { appliedAccessRevision: args.revision });
		return true;
	},
});

export const finish_catchup = internalMutation({
	args: { installationId: v.id("installations"), observedRevision: v.number() },
	returns: v.boolean(),
	handler: async (ctx, args) => {
		const installation = await ctx.db.get(args.installationId);
		if (
			!installation ||
			installation.status === "revoked" ||
			installation.appliedAccessRevision < args.observedRevision ||
			installation.appliedAccessRevision < installation.bootstrapTargetRevision
		)
			return false;
		if (installation.status === "bootstrapping" && installation.bootstrapPhase !== "events") return false;
		await ctx.db.patch(installation._id, { status: "ready" });
		return true;
	},
});

export const restart_snapshot = internalMutation({
	args: { installationId: v.id("installations"), revoked: v.boolean() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const installation = await ctx.db.get(args.installationId);
		if (installation && installation.status !== "revoked") {
			await ctx.db.patch(installation._id, {
				status: args.revoked ? "revoked" : "bootstrapping",
				bootstrapStartRevision: null,
				bootstrapCursor: null,
				bootstrapPhase: "members",
			});
		}
		return null;
	},
});

export const sync = internalAction({
	args: { installationId: v.id("installations"), requiredRevision: v.number() },
	returns: v.boolean(),
	handler: async (ctx, args): Promise<boolean> => {
		try {
			// Bound one action. A continuation keeps a large roster from blocking an HTTP lease request.
			const stopAt = Date.now() + 12_000;
			for (let step = 0; step < 10 && Date.now() < stopAt; step++) {
				const installation = await ctx.runQuery(internal.access.get_installation, {
					installationId: args.installationId,
				});
				if (!installation || installation.status === "revoked") return false;
				if (installation.status === "bootstrapping" && installation.bootstrapPhase === "members") {
					const answer = await press_post("/api/v1/plugins/members/list", {
						installationId: installation.hostInstallationId,
						cursor: installation.bootstrapCursor,
						startRevision: installation.bootstrapStartRevision,
					});
					const page = snapshot_response.safeParse(answer.body);
					if (answer.status === 410) {
						const failure = z.object({ code: z.string() }).safeParse(answer.body);
						await ctx.runMutation(internal.access.restart_snapshot, {
							installationId: installation._id,
							revoked: failure.success && failure.data.code === "revoked",
						});
						continue;
					}
					if (answer.status !== 200 || !page.success) throw new Error("Press snapshot is unavailable");
					await ctx.runMutation(internal.access.accept_snapshot_page, {
						installationId: installation._id,
						expectedStartRevision: installation.bootstrapStartRevision,
						expectedCursor: installation.bootstrapCursor,
						page: page.data,
					});
					continue;
				}
				if (installation.status === "bootstrapping" && installation.bootstrapPhase === "cleanup") {
					await ctx.runMutation(internal.access.finish_snapshot, { installationId: installation._id });
					continue;
				}
				const answer = await press_post("/api/v1/plugins/access/changes", {
					installationId: installation.hostInstallationId,
					afterRevision: installation.appliedAccessRevision,
					limit: 100,
				});
				if (answer.status === 410) {
					const failure = z.object({ code: z.string() }).safeParse(answer.body);
					await ctx.runMutation(internal.access.restart_snapshot, {
						installationId: installation._id,
						revoked: failure.success && failure.data.code === "revoked",
					});
					continue;
				}
				const page = events_response.safeParse(answer.body);
				if (answer.status !== 200 || !page.success) throw new Error("Press events are unavailable");
				let expectedRevision = installation.appliedAccessRevision + 1;
				let complete = true;
				for (const entry of page.data.events) {
					if (entry.revision !== expectedRevision++) throw new Error("Press access events contain a gap");
					if (!(await ctx.runMutation(internal.access.apply_event, { installationId: installation._id, ...entry }))) {
						complete = false;
						break;
					}
				}
				if (
					complete &&
					page.data.isDone &&
					page.data.continueRevision === expectedRevision - 1 &&
					page.data.currentRevision === page.data.continueRevision &&
					page.data.currentRevision >= args.requiredRevision
				) {
					return await ctx.runMutation(internal.access.finish_catchup, {
						installationId: installation._id,
						observedRevision: page.data.currentRevision,
					});
				}
			}
		} catch {
			console.warn("Press membership sync will retry", { installationId: args.installationId });
		}
		// The cron resumes saved progress. A failed call must not start another retry chain.
		return false;
	},
});

export const wake_installations = internalMutation({
	args: { paginationOpts: paginationOptsValidator },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db.query("installations").paginate({ ...args.paginationOpts, numItems: 50 });
		for (const installation of page.page) {
			if (installation.status !== "revoked") {
				await ctx.scheduler.runAfter(0, internal.access.sync, {
					installationId: installation._id,
					requiredRevision: installation.appliedAccessRevision,
				});
			}
		}
		if (!page.isDone)
			await ctx.scheduler.runAfter(0, internal.access.wake_installations, {
				paginationOpts: { numItems: 50, cursor: page.continueCursor },
			});
		return null;
	},
});

export const admit_lease = internalMutation({
	args: { installationId: v.id("installations"), facts: zodToConvex(press_lease_facts) },
	returns: v.boolean(),
	handler: async (ctx, { installationId, facts }) => {
		const installation = await ctx.db.get(installationId);
		const expiresAt = Math.floor(facts.expiresAt / 1000) * 1000;
		if (
			!installation ||
			installation.status !== "ready" ||
			expiresAt <= Date.now() ||
			installation.appliedAccessRevision < facts.requiredRevision ||
			facts.requiredRevision < installation.invalidatedAtRevision ||
			installation.hostInstallationId !== facts.hostInstallationId ||
			installation.hostOrganizationId !== facts.hostOrganizationId ||
			installation.hostWorkspaceId !== facts.hostWorkspaceId ||
			installation.hostPluginVersionId !== facts.hostPluginVersionId ||
			installation.hostServiceAccountId !== facts.hostServiceAccountId
		)
			return false;
		const member = await ctx.db
			.query("workspace_members")
			.withIndex("by_installation_hostUserId", (q) =>
				q.eq("installationId", installationId).eq("hostUserId", facts.hostUserId),
			)
			.unique();
		if (
			!member ||
			!member.active ||
			member.cleanupPending ||
			!member.canRead ||
			!facts.canRead ||
			member.hostMembershipId !== facts.hostMembershipId ||
			member.membershipLifetime !== facts.membershipLifetime
		)
			return false;
		const revoked = await ctx.db
			.query("revoked_sessions")
			.withIndex("by_hostSessionId", (q) => q.eq("hostSessionId", facts.hostSessionId))
			.unique();
		if (revoked) return false;
		const previous = await ctx.db
			.query("sessions")
			.withIndex("by_hostSessionId", (q) => q.eq("hostSessionId", facts.hostSessionId))
			.unique();
		if (
			previous &&
			(previous.installationId !== installationId ||
				previous.hostUserId !== facts.hostUserId ||
				(previous.revokedRevision !== null && previous.revokedRevision >= facts.requiredRevision) ||
				previous.validatedAt > facts.validatedAt ||
				(previous.validatedAt === facts.validatedAt && previous.exchangeId > facts.exchangeId))
		)
			return false;
		if (previous?.exchangeId === facts.exchangeId)
			return previous.revokedAt === null && previous.expiresAt > Date.now();
		if (previous?.expiryJobId) await ctx.scheduler.cancel(previous.expiryJobId);
		const fields = {
			installationId,
			hostSessionId: facts.hostSessionId,
			exchangeId: facts.exchangeId,
			hostUserId: facts.hostUserId,
			hostMembershipId: facts.hostMembershipId,
			membershipLifetime: facts.membershipLifetime,
			requiredRevision: facts.requiredRevision,
			validatedAt: facts.validatedAt,
			expiresAt,
			canRead: facts.canRead,
			canWrite: facts.canWrite,
			isOwner: facts.isOwner,
			displayName: facts.displayName,
			revokedAt: null,
			revokedRevision: null,
			expiryJobId: null,
		};
		const sessionId = previous?._id ?? (await ctx.db.insert("sessions", fields));
		if (previous) await ctx.db.replace(previous._id, fields);
		const expiryJobId = await ctx.scheduler.runAt(expiresAt, internal.sessions.expire, {
			sessionId,
			exchangeId: facts.exchangeId,
		});
		await ctx.db.patch(sessionId, { expiryJobId });
		return true;
	},
});
