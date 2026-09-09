import { v } from "convex/values";
import { chat_CHANNEL_MEMBER_LIMIT, chat_member_level, chat_write_result, type chat_WriteResult } from "../shared/chat";
import { auth_get_current_access } from "./auth";
import { transcripts_deletions_queue } from "./transcripts_deletions";
import {
	channels_get_access,
	channels_get_request,
	channels_queue_transcript,
	channels_save_request,
} from "./channels";
import type { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { internalMutation, internalQuery, mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";

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
	if (replay._yay) {
		if (replay._yay.kind === "membership") {
			const change = await ctx.db
				.query("channel_access_changes")
				.withIndex("by_installation_actorHostUserId_clientRequestId", (q) =>
					q
						.eq("installationId", installation._id)
						.eq("actorHostUserId", session.hostUserId)
						.eq("clientRequestId", args.clientRequestId),
				)
				.first();
			if (change?.status === "cancelled")
				return {
					_nay: { name: "conflict", message: "Channel access changed. Check the current people and try again." },
				};
		}
		return { _yay: replay._yay };
	}
	const access = await channels_get_access(ctx, args.channelId, true);
	if (access._nay) return access;
	const { channel } = access._yay;
	if (channel.visibility !== "private") return { _nay: { message: "This action needs a private channel." } };
	const pending = await ctx.db
		.query("channel_access_changes")
		.withIndex("by_channel_status", (q) => q.eq("channelId", channel._id).eq("status", "pending"))
		.first();
	if (pending) {
		if (
			pending.actorHostUserId === session.hostUserId &&
			pending.clientRequestId === args.clientRequestId &&
			pending.fingerprint === fingerprint
		) {
			return {
				_yay: {
					kind: "membership" as const,
					channelId: channel._id,
					membershipRevision: pending.readerRevision,
					left: pending.left,
					deleted: pending.deleted,
					pending: true,
				},
			};
		}
		return { _nay: { name: "conflict", message: "A channel access change is already pending." } };
	}
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
	const readerRevision = channel.membershipRevision + 1;
	const deleted = desired.length === 0;
	const left = !desired.some((entry) => entry.hostUserId === session.hostUserId);
	await ctx.db.insert("channel_access_changes", {
		channelId: channel._id,
		installationId: installation._id,
		actorHostUserId: session.hostUserId,
		actorLifetime: member.membershipLifetime,
		clientRequestId: args.clientRequestId,
		operation,
		fingerprint,
		expectedMembershipRevision: channel.membershipRevision,
		readerRevision,
		principals: desired,
		deleted,
		left,
		status: "pending",
		createdAt: Date.now(),
		hostReceiptId: null,
	});
	await channels_queue_transcript(ctx, channel._id, {
		kind: "readers",
		readerRevision,
		readers: desired.map((entry) => ({ userId: entry.hostUserId, membershipLifetime: entry.membershipLifetime })),
		deleted,
	});
	const result = {
		kind: "membership" as const,
		channelId: channel._id,
		membershipRevision: readerRevision,
		left,
		deleted,
		pending: true,
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

export const status = query({
	args: { channelId: v.id("channels"), clientRequestId: v.string() },
	returns: v.union(
		v.object({
			status: v.union(v.literal("pending"), v.literal("complete"), v.literal("cancelled")),
			membershipRevision: v.number(),
			left: v.boolean(),
			deleted: v.boolean(),
		}),
		v.null(),
	),
	handler: async (ctx, args) => {
		const access = await auth_get_current_access(ctx);
		if (access._nay) return null;
		const receipt = await ctx.db
			.query("request_results")
			.withIndex("by_installation_actorHostUserId_clientRequestId", (q) =>
				q
					.eq("installationId", access._yay.installation._id)
					.eq("actorHostUserId", access._yay.session.hostUserId)
					.eq("clientRequestId", args.clientRequestId),
			)
			.first();
		const own = await ctx.db
			.query("channel_access_changes")
			.withIndex("by_installation_actorHostUserId_clientRequestId", (q) =>
				q
					.eq("installationId", access._yay.installation._id)
					.eq("actorHostUserId", access._yay.session.hostUserId)
					.eq("clientRequestId", args.clientRequestId),
			)
			.first();
		if (receipt?.result.kind === "membership" && !receipt.result.pending && receipt.result.channelId === args.channelId)
			return {
				status: own?.status === "cancelled" ? ("cancelled" as const) : ("complete" as const),
				membershipRevision: receipt.result.membershipRevision,
				left: receipt.result.left,
				deleted: receipt.result.deleted,
			};
		return own?.channelId === args.channelId
			? { status: own.status, membershipRevision: own.readerRevision, left: own.left, deleted: own.deleted }
			: null;
	},
});

// Check the original actor, member lifetimes, and pending channel revision before completion.
async function current_change(ctx: QueryCtx | MutationCtx, change: Doc<"channel_access_changes">) {
	if (change.status !== "pending") return null;
	const channel = await ctx.db.get("channels", change.channelId);
	if (!channel || channel.membershipRevision !== change.expectedMembershipRevision || channel.deletedAt !== null)
		return null;
	const actor = await ctx.db
		.query("workspace_members")
		.withIndex("by_installation_hostUserId", (q) =>
			q.eq("installationId", change.installationId).eq("hostUserId", change.actorHostUserId),
		)
		.first();
	const actorGrant = await ctx.db
		.query("channel_members")
		.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id).eq("hostUserId", change.actorHostUserId))
		.first();
	if (
		!actor?.active ||
		!actor.canRead ||
		actor.cleanupPending ||
		actor.membershipLifetime !== change.actorLifetime ||
		actorGrant?.membershipLifetime !== change.actorLifetime
	)
		return null;
	if (change.operation !== "channel_members.leave" && (!actor.canWrite || actorGrant.level !== "manage")) return null;
	const existing = await ctx.db
		.query("channel_members")
		.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id))
		.take(chat_CHANNEL_MEMBER_LIMIT);
	const members = await Promise.all(
		change.principals.map((entry) =>
			ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", change.installationId).eq("hostUserId", entry.hostUserId),
				)
				.first(),
		),
	);
	// A role downgrade must not trap somebody else who is leaving the channel.
	if (
		members.some(
			(member, index) =>
				!member?.active ||
				(!member.canRead &&
					!existing.some(
						(grant) => grant.hostUserId === member.hostUserId && grant.membershipLifetime === member.membershipLifetime,
					)) ||
				member.cleanupPending ||
				member.membershipLifetime !== change.principals[index]!.membershipLifetime,
		)
	)
		return null;
	return { channel, existing };
}

async function complete_pending_change(
	ctx: MutationCtx,
	args: { changeId: Id<"channel_access_changes">; readerRevision: number; hostReceiptId: string },
) {
	const change = await ctx.db.get("channel_access_changes", args.changeId);
	if (!change || change.readerRevision !== args.readerRevision) return false;
	if (change.status === "complete") return true;
	if (change.status !== "pending") return false;
	const ready = await current_change(ctx, change);
	if (!ready) return false;
	const { channel, existing } = ready;
	await Promise.all(existing.map((entry) => ctx.db.delete("channel_members", entry._id)));
	await Promise.all(
		change.principals.map((entry) =>
			ctx.db.insert("channel_members", {
				installationId: channel.installationId,
				channelId: channel._id,
				...entry,
				joinedAt: Date.now(),
			}),
		),
	);
	await ctx.db.patch("channels", channel._id, {
		membershipRevision: change.readerRevision,
		memberCount: change.principals.length,
		deletedAt: change.deleted ? Date.now() : null,
	});
	await ctx.db.patch("channel_access_changes", change._id, { status: "complete", hostReceiptId: args.hostReceiptId });
	const result = {
		kind: "membership" as const,
		channelId: channel._id,
		membershipRevision: change.readerRevision,
		left: change.left,
		deleted: change.deleted,
		pending: false,
	};
	const receipt = await ctx.db
		.query("request_results")
		.withIndex("by_installation_actorHostUserId_clientRequestId", (q) =>
			q
				.eq("installationId", change.installationId)
				.eq("actorHostUserId", change.actorHostUserId)
				.eq("clientRequestId", change.clientRequestId),
		)
		.first();
	if (!receipt) throw new Error("Channel access request receipt is missing");
	await ctx.db.patch("request_results", receipt._id, { result });
	return true;
}

export const complete_change = internalMutation({
	args: { changeId: v.id("channel_access_changes"), readerRevision: v.number(), hostReceiptId: v.string() },
	returns: v.boolean(),
	handler: complete_pending_change,
});

export const is_change_current = internalQuery({
	args: { changeId: v.id("channel_access_changes") },
	returns: v.boolean(),
	handler: async (ctx, args) => {
		const change = await ctx.db.get("channel_access_changes", args.changeId);
		return change !== null && (await current_change(ctx, change)) !== null;
	},
});

// Cancellation follows Files rollback, manual takeover, or confirmation that no output exists.
async function cancel_pending_change(
	ctx: MutationCtx,
	args: { changeId: Id<"channel_access_changes">; hostReceiptId: string },
) {
	const change = await ctx.db.get("channel_access_changes", args.changeId);
	if (!change) return false;
	if (change.status === "cancelled") return true;
	if (change.status !== "pending") return false;
	const channel = await ctx.db.get("channels", change.channelId);
	if (!channel || channel.membershipRevision !== change.expectedMembershipRevision) return false;
	const actorGrant = await ctx.db
		.query("channel_members")
		.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id).eq("hostUserId", change.actorHostUserId))
		.first();
	const receipt = await ctx.db
		.query("request_results")
		.withIndex("by_installation_actorHostUserId_clientRequestId", (q) =>
			q
				.eq("installationId", change.installationId)
				.eq("actorHostUserId", change.actorHostUserId)
				.eq("clientRequestId", change.clientRequestId),
		)
		.first();
	if (!receipt) throw new Error("Channel access request receipt is missing");
	await ctx.db.patch("channel_access_changes", change._id, {
		status: "cancelled",
		hostReceiptId: args.hostReceiptId,
	});
	await ctx.db.patch("request_results", receipt._id, {
		result: {
			kind: "membership",
			channelId: channel._id,
			membershipRevision: channel.membershipRevision,
			left: actorGrant?.membershipLifetime !== change.actorLifetime,
			deleted: channel.deletedAt !== null,
			pending: false,
		},
	});
	return true;
}

export const cancel_change = internalMutation({
	args: { changeId: v.id("channel_access_changes"), hostReceiptId: v.string() },
	returns: v.boolean(),
	handler: cancel_pending_change,
});

export const complete_without_files = internalMutation({
	args: { channelId: v.id("channels") },
	returns: v.boolean(),
	handler: async (ctx, args) => {
		const [grant, destination] = await Promise.all([
			ctx.db
				.query("host_grants")
				.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
				.unique(),
			ctx.db
				.query("transcript_destinations")
				.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
				.unique(),
		]);
		// A saved connection intent may already have created a private folder in Press.
		if (grant || destination) return false;
		const pending = await ctx.db
			.query("channel_access_changes")
			.withIndex("by_channel_status", (q) => q.eq("channelId", args.channelId).eq("status", "pending"))
			.first();
		if (pending) {
			const hostReceiptId = `no-output:${pending._id}`;
			const completed = await complete_pending_change(ctx, {
				changeId: pending._id,
				readerRevision: pending.readerRevision,
				hostReceiptId,
			});
			if (!completed) await cancel_pending_change(ctx, { changeId: pending._id, hostReceiptId });
		}
		const readerJobs = await ctx.db
			.query("transcript_jobs")
			.withIndex("by_channel_kind_status_sequence", (q) =>
				q.eq("channelId", args.channelId).eq("operation.kind", "readers").eq("status", "pending"),
			)
			.take(20);
		for (const job of readerJobs) await ctx.db.patch("transcript_jobs", job._id, { status: "complete", error: null });
		if (readerJobs.length === 20)
			await ctx.scheduler.runAfter(0, internal.channel_members.complete_without_files, args);

		const transcript = await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		if (transcript)
			await ctx.db.patch("transcript_channels", transcript._id, {
				status: "blocked",
				error: "Connect Files to save Markdown copies.",
			});
		return true;
	},
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
			const pending = await ctx.db
				.query("channel_access_changes")
				.withIndex("by_channel_status", (q) => q.eq("channelId", channel._id).eq("status", "pending"))
				.first();
			if (pending) await ctx.db.patch("channel_access_changes", pending._id, { status: "cancelled" });
			const remaining = await ctx.db
				.query("channel_members")
				.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id))
				.take(chat_CHANNEL_MEMBER_LIMIT);
			// The index orders stable host IDs, so every cleanup picks the same successor.
			if (remaining.length > 0 && !remaining.some((entry) => entry.level === "manage"))
				await ctx.db.patch("channel_members", remaining[0]!._id, { level: "manage" });
			// Advance beyond an abandoned reader job so its late receipt cannot win.
			const readerRevision = Math.max(channel.membershipRevision, pending?.readerRevision ?? 0) + 1;
			await ctx.db.patch("channels", channel._id, {
				memberCount: remaining.length,
				membershipRevision: readerRevision,
				deletedAt: remaining.length === 0 ? Date.now() : null,
			});
			const sequence = await channels_queue_transcript(ctx, channel._id, {
				kind: "readers",
				readerRevision,
				readers: remaining.map((entry) => ({ userId: entry.hostUserId, membershipLifetime: entry.membershipLifetime })),
				deleted: remaining.length === 0,
			});
			if (remaining.length === 0) {
				const [connection, destination] = await Promise.all([
					ctx.db
						.query("host_grants")
						.withIndex("by_channel", (q) => q.eq("channelId", channel._id))
						.unique(),
					ctx.db
						.query("transcript_destinations")
						.withIndex("by_channel", (q) => q.eq("channelId", channel._id))
						.unique(),
				]);
				// The departed sponsor may be unable to remove Files readers. Keep owner recovery available now.
				if (connection || destination) await transcripts_deletions_queue(ctx, channel, sequence, readerRevision);
			}
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
