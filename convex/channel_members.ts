import { v } from "convex/values";
import { chat_CHANNEL_MEMBER_LIMIT, chat_member_level, chat_write_result, type chat_WriteResult } from "../shared/chat";
import { auth_get_current_access } from "./auth";
import { channels_get_access, channels_get_request, channels_save_request } from "./channels";
import type { Id } from "./_generated/dataModel";
import { mutation, type MutationCtx } from "./_generated/server";

async function begin_change(
	ctx: MutationCtx,
	args: {
		channelId: Id<"channels">;
		clientRequestId: string;
		expectedMembershipRevision: number;
		expectedPrincipalCount?: number;
		kind: "change" | "leave" | "delete";
		hostUserId: string | null;
		level: "read" | "write" | "manage" | null;
	},
): Promise<chat_WriteResult> {
	const current = await auth_get_current_access(ctx);
	if (current._nay) return current;
	const { installation, session, member } = current._yay;
	const operation = `channel_members.${args.kind}`;
	const fingerprint = JSON.stringify(args);
	// Only the actor's minimal receipt survives their successful departure.
	const replay = await channels_get_request(
		ctx,
		installation._id,
		session.hostUserId,
		args.clientRequestId,
		operation,
		fingerprint,
	);
	if (replay._nay) return replay;
	if (replay._yay) return { _yay: replay._yay };
	const access = await channels_get_access(ctx, args.channelId);
	if (access._nay) return access;
	const { channel } = access._yay;
	if (channel.visibility !== "private") return { _nay: { message: "This action needs a private channel." } };
	const principals = await ctx.db
		.query("channel_members")
		.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id))
		.take(chat_CHANNEL_MEMBER_LIMIT);
	const own = principals.find(
		(entry) => entry.hostUserId === session.hostUserId && entry.membershipLifetime === member.membershipLifetime,
	);
	if ((args.kind === "leave" && !own) || (args.kind !== "leave" && !access._yay.canManage))
		return { _nay: { message: "Permission denied" } };
	if (
		channel.membershipRevision !== args.expectedMembershipRevision ||
		(args.expectedPrincipalCount !== undefined && channel.memberCount !== args.expectedPrincipalCount)
	) {
		return { _nay: { name: "conflict", message: "The people in this channel changed. Check them and try again." } };
	}
	let desired = principals.map(({ hostUserId, membershipLifetime, level }) => ({
		hostUserId,
		membershipLifetime,
		level,
	}));
	const targetId = args.kind === "leave" ? session.hostUserId : args.hostUserId;
	if (args.kind === "delete") desired = [];
	else {
		desired = desired.filter((entry) => entry.hostUserId !== targetId);
		if (args.kind === "change" && args.level !== null && targetId !== null) {
			const target = await ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", installation._id).eq("hostUserId", targetId),
				)
				.first();
			if (!target?.active || !target.canRead || target.cleanupPending)
				return { _nay: { message: "Choose a current workspace member." } };
			desired.push({ hostUserId: targetId, membershipLifetime: target.membershipLifetime, level: args.level });
		}
	}
	if (desired.length > chat_CHANNEL_MEMBER_LIMIT)
		return { _nay: { message: "A private channel can have up to 50 people." } };
	if (desired.length > 0 && !desired.some((entry) => entry.level === "manage")) {
		const successor = desired
			.filter((entry) => entry.hostUserId !== targetId)
			.sort((left, right) => (left.hostUserId < right.hostUserId ? -1 : 1))[0];
		if (!successor) return { _nay: { message: "Another person must be able to manage this channel first." } };
		successor.level = "manage";
	}
	// Apply the change now. Private channels have no Files transcript, so no Files step has to finish first.
	const membershipRevision = channel.membershipRevision + 1;
	const deleted = desired.length === 0;
	const left = !desired.some((entry) => entry.hostUserId === session.hostUserId);
	await Promise.all(principals.map((entry) => ctx.db.delete("channel_members", entry._id)));
	await Promise.all(
		desired.map((entry) =>
			ctx.db.insert("channel_members", {
				installationId: channel.installationId,
				channelId: channel._id,
				...entry,
				joinedAt: Date.now(),
			}),
		),
	);
	await ctx.db.patch("channels", channel._id, {
		membershipRevision,
		memberCount: desired.length,
		deletedAt: deleted ? Date.now() : null,
	});
	const result = {
		kind: "membership" as const,
		channelId: channel._id,
		membershipRevision,
		left,
		deleted,
	};
	await channels_save_request(ctx, {
		installationId: installation._id,
		actorHostUserId: session.hostUserId,
		clientRequestId: args.clientRequestId,
		operation,
		fingerprint,
		result,
	});
	return { _yay: result };
}

export const change = mutation({
	args: {
		channelId: v.id("channels"),
		clientRequestId: v.string(),
		expectedMembershipRevision: v.number(),
		expectedPrincipalCount: v.optional(v.number()),
		hostUserId: v.string(),
		level: v.union(chat_member_level, v.null()),
	},
	returns: chat_write_result,
	handler: async (ctx, args) => begin_change(ctx, { ...args, kind: "change" }),
});

export const leave = mutation({
	args: {
		channelId: v.id("channels"),
		clientRequestId: v.string(),
		expectedMembershipRevision: v.number(),
		expectedPrincipalCount: v.optional(v.number()),
	},
	returns: chat_write_result,
	handler: async (ctx, args) => begin_change(ctx, { ...args, kind: "leave", hostUserId: null, level: null }),
});

export const delete_channel = mutation({
	args: {
		channelId: v.id("channels"),
		clientRequestId: v.string(),
		expectedMembershipRevision: v.number(),
		expectedPrincipalCount: v.optional(v.number()),
	},
	returns: chat_write_result,
	handler: async (ctx, args) => begin_change(ctx, { ...args, kind: "delete", hostUserId: null, level: null }),
});

export async function channel_members_remove_host_member(
	ctx: MutationCtx,
	args: { installationId: Id<"installations">; hostUserId: string; membershipLifetime: number },
) {
	const grants = await ctx.db
		.query("channel_members")
		.withIndex("by_installation_hostUserId_membershipLifetime", (q) => {
			const range = q.eq("installationId", args.installationId).eq("hostUserId", args.hostUserId);
			return args.membershipLifetime >= 0 ? range.lt("membershipLifetime", args.membershipLifetime) : range;
		})
		.take(20);
	await Promise.all(
		grants.map(async (grant) => {
			const channel = await ctx.db.get("channels", grant.channelId);
			await ctx.db.delete("channel_members", grant._id);
			if (!channel || channel.deletedAt !== null) return;
			const remaining = await ctx.db
				.query("channel_members")
				.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id))
				.take(chat_CHANNEL_MEMBER_LIMIT);
			// The index orders stable host IDs, so every cleanup picks the same successor.
			if (remaining.length > 0 && !remaining.some((entry) => entry.level === "manage"))
				await ctx.db.patch("channel_members", remaining[0]!._id, { level: "manage" });
			await ctx.db.patch("channels", channel._id, {
				memberCount: remaining.length,
				membershipRevision: channel.membershipRevision + 1,
				deletedAt: remaining.length === 0 ? Date.now() : null,
			});
		}),
	);
	const cursors = await ctx.db
		.query("read_states")
		.withIndex("by_installation_hostUserId_membershipLifetime", (q) => {
			const range = q.eq("installationId", args.installationId).eq("hostUserId", args.hostUserId);
			return args.membershipLifetime >= 0 ? range.lt("membershipLifetime", args.membershipLifetime) : range;
		})
		.take(20);
	await Promise.all(cursors.map((entry) => ctx.db.delete("read_states", entry._id)));
	const threads = await ctx.db
		.query("thread_read_states")
		.withIndex("by_installation_hostUserId_membershipLifetime", (q) => {
			const range = q.eq("installationId", args.installationId).eq("hostUserId", args.hostUserId);
			return args.membershipLifetime >= 0 ? range.lt("membershipLifetime", args.membershipLifetime) : range;
		})
		.take(20);
	await Promise.all(threads.map((entry) => ctx.db.delete("thread_read_states", entry._id)));
	return grants.length < 20 && cursors.length < 20 && threads.length < 20;
}
