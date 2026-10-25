import { v } from "convex/values";
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

export const get_installation_by_host = internalQuery({
	args: { hostInstallationId: v.string() },
	returns: v.union(doc(schema, "installations"), v.null()),
	handler: async (ctx, args) =>
		await ctx.db
			.query("installations")
			.withIndex("by_hostInstallationId", (q) => q.eq("hostInstallationId", args.hostInstallationId))
			.unique(),
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

// Return true when this call saved a cleanup step or finished the snapshot.
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
		if (missing.length > 0) return true;
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
			return true;
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

// The feed returns only this installation's events, so revisions have gaps. `afterRevision` is the revision
// the caller read after: the request's revision for the first event, then the previous event's revision.
// An event applies only when nothing was applied in between.
//
// "applied": the event is applied, so go on with the page. "partial": some work was saved, but the page
// stops here, because a refresh started or member cleanup has more steps. "refused": nothing was saved.
export const apply_event = internalMutation({
	args: {
		installationId: v.id("installations"),
		afterRevision: v.number(),
		revision: v.number(),
		event: zodToConvex(press_access_event),
	},
	returns: v.union(v.literal("applied"), v.literal("partial"), v.literal("refused")),
	handler: async (ctx, args) => {
		const installation = await ctx.db.get(args.installationId);
		if (!installation || installation.status === "revoked") return "refused";
		if (args.revision <= installation.appliedAccessRevision) return "applied";
		if (
			installation.appliedAccessRevision !== args.afterRevision ||
			(installation.status === "bootstrapping" && installation.bootstrapPhase !== "events")
		)
			return "refused";
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
			return "partial";
		}
		if (event.kind === "revoked") {
			await ctx.db.patch(installation._id, {
				status: "revoked",
				invalidatedAtRevision: args.revision,
				appliedAccessRevision: args.revision,
			});
			return "applied";
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
				if (!done) return "partial";
				await ctx.db.patch(member._id, { cleanupPending: false });
			}
		}
		await ctx.db.patch(installation._id, { appliedAccessRevision: args.revision });
		return "applied";
	},
});

// The feed says that no event for this installation is in (fromRevision, toRevision], so move across the gap.
export const advance_access_revision = internalMutation({
	args: { installationId: v.id("installations"), fromRevision: v.number(), toRevision: v.number() },
	returns: v.boolean(),
	handler: async (ctx, args) => {
		const installation = await ctx.db.get(args.installationId);
		if (!installation || installation.status === "revoked") return false;
		if (args.toRevision <= installation.appliedAccessRevision) return true;
		if (
			installation.appliedAccessRevision !== args.fromRevision ||
			(installation.status === "bootstrapping" && installation.bootstrapPhase !== "events")
		)
			return false;
		await ctx.db.patch(installation._id, { appliedAccessRevision: args.toRevision });
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
	// `budgetMs` bounds one call, so a large roster cannot hold an HTTP request past its caller's limit.
	// The lease route and the access notice route each pass their own budget.
	// `progressed` says whether this call saved anything, so the notice route can ask for a quick retry.
	// `needsLease` says the member list answered 409 unavailable: the installation is disabled, or its service
	// connection still names the old version or account after an upgrade. Only a lease exchange binds it again.
	args: { installationId: v.id("installations"), requiredRevision: v.number(), budgetMs: v.number() },
	returns: v.object({ ready: v.boolean(), progressed: v.boolean(), needsLease: v.boolean() }),
	handler: async (ctx, args): Promise<{ ready: boolean; progressed: boolean; needsLease: boolean }> => {
		let progressed = false;
		try {
			const stopAt = Date.now() + args.budgetMs;
			// One Bonobo Senate call may use at most the time that is left, and never more than 15 s.
			const timeout = () => Math.min(15_000, stopAt - Date.now());
			for (let step = 0; step < 10 && Date.now() < stopAt; step++) {
				const installation = await ctx.runQuery(internal.access.get_installation, {
					installationId: args.installationId,
				});
				if (!installation || installation.status === "revoked") return { ready: false, progressed, needsLease: false };
				if (installation.status === "bootstrapping" && installation.bootstrapPhase === "members") {
					const answer = await press_post(
						"/api/v1/plugins/members/list",
						{
							installationId: installation.hostInstallationId,
							cursor: installation.bootstrapCursor,
							startRevision: installation.bootstrapStartRevision,
						},
						undefined,
						timeout(),
					);
					const page = snapshot_response.safeParse(answer.body);
					if (answer.status === 409 && z.object({ code: z.literal("unavailable") }).safeParse(answer.body).success)
						return { ready: false, progressed, needsLease: true };
					if (answer.status === 410) {
						const failure = z.object({ code: z.string() }).safeParse(answer.body);
						await ctx.runMutation(internal.access.restart_snapshot, {
							installationId: installation._id,
							revoked: failure.success && failure.data.code === "revoked",
						});
						continue;
					}
					if (answer.status !== 200 || !page.success) throw new Error("Bonobo Senate snapshot is unavailable");
					if (
						await ctx.runMutation(internal.access.accept_snapshot_page, {
							installationId: installation._id,
							expectedStartRevision: installation.bootstrapStartRevision,
							expectedCursor: installation.bootstrapCursor,
							page: page.data,
						})
					)
						progressed = true;
					continue;
				}
				if (installation.status === "bootstrapping" && installation.bootstrapPhase === "cleanup") {
					if (await ctx.runMutation(internal.access.finish_snapshot, { installationId: installation._id }))
						progressed = true;
					continue;
				}
				const answer = await press_post(
					"/api/v1/plugins/access/changes",
					{
						installationId: installation.hostInstallationId,
						afterRevision: installation.appliedAccessRevision,
						limit: 100,
					},
					undefined,
					timeout(),
				);
				if (answer.status === 410) {
					const failure = z.object({ code: z.string() }).safeParse(answer.body);
					await ctx.runMutation(internal.access.restart_snapshot, {
						installationId: installation._id,
						revoked: failure.success && failure.data.code === "revoked",
					});
					continue;
				}
				const page = events_response.safeParse(answer.body);
				if (answer.status !== 200 || !page.success) throw new Error("Bonobo Senate events are unavailable");
				// Gaps are normal: the feed skips other installations' revisions. Every event for this
				// installation in (applied, continueRevision] is on the page, in order.
				let afterRevision = installation.appliedAccessRevision;
				let complete = true;
				for (const entry of page.data.events) {
					if (entry.revision <= afterRevision || entry.revision > page.data.continueRevision)
						throw new Error("Bonobo Senate access events are out of order");
					const applied = await ctx.runMutation(internal.access.apply_event, {
						installationId: installation._id,
						afterRevision,
						...entry,
					});
					if (applied !== "refused") progressed = true;
					if (applied !== "applied") {
						complete = false;
						break;
					}
					afterRevision = entry.revision;
				}
				if (!complete) continue;
				const advanced = await ctx.runMutation(internal.access.advance_access_revision, {
					installationId: installation._id,
					fromRevision: afterRevision,
					toRevision: page.data.continueRevision,
				});
				if (advanced && page.data.continueRevision > afterRevision) progressed = true;
				if (advanced && page.data.isDone && page.data.continueRevision >= args.requiredRevision) {
					const ready = await ctx.runMutation(internal.access.finish_catchup, {
						installationId: installation._id,
						observedRevision: page.data.continueRevision,
					});
					return { ready, progressed, needsLease: false };
				}
			}
		} catch {
			console.warn("Bonobo Senate membership sync will retry", { installationId: args.installationId });
		}
		// The next lease request or access notice resumes saved progress. Bonobo Senate retries a notice
		// until Chitchat answers 200, so this call must not start a retry chain of its own.
		return { ready: false, progressed, needsLease: false };
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
