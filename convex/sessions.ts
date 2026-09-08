import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { auth_get_current_access } from "./auth";

export const current = query({
	args: {},
	returns: v.union(
		v.null(),
		v.object({
			hostUserId: v.string(),
			displayName: v.union(v.string(), v.null()),
			installationId: v.id("installations"),
			generation: v.string(),
			membershipLifetime: v.number(),
			canWrite: v.boolean(),
			isOwner: v.boolean(),
			expiresAt: v.number(),
		}),
	),
	handler: async (ctx) => {
		const access = await auth_get_current_access(ctx);
		if (access._nay) return null;
		const { session, installation, member } = access._yay;
		return {
			hostUserId: member.hostUserId,
			displayName: member.displayName,
			installationId: installation._id,
			generation: installation.generation,
			membershipLifetime: member.membershipLifetime,
			canWrite: session.canWrite && member.canWrite,
			isOwner: session.isOwner && member.isOwner,
			expiresAt: session.expiresAt,
		};
	},
});

export const status = query({
	args: {},
	returns: v.union(v.literal("ready"), v.literal("refresh_required"), v.literal("denied")),
	handler: async (ctx) => {
		const access = await auth_get_current_access(ctx);
		if (!access._nay) return "ready" as const;
		return access._nay.name === "refresh_required" ? ("refresh_required" as const) : ("denied" as const);
	},
});

export const expire = internalMutation({
	args: { sessionId: v.id("sessions"), exchangeId: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const session = await ctx.db.get(args.sessionId);
		if (session && session.exchangeId === args.exchangeId && session.expiresAt <= Date.now()) {
			// This write wakes idle subscriptions; Date.now alone does not invalidate a query.
			await ctx.db.patch(session._id, { revokedAt: Date.now(), expiryJobId: null });
		}
		return null;
	},
});
