import { v } from "convex/values";
import { doc } from "convex-helpers/validators";
import { chat_error } from "../shared/chat";
import { channels_get_access } from "./channels";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";
import { messages_public_doc } from "./messages";
import schema from "./schema";

export async function read_states_get_unread(
	ctx: QueryCtx | MutationCtx,
	access: NonNullable<Awaited<ReturnType<typeof channels_get_access>>["_yay"]>,
) {
	const { channel, session, member } = access;
	const stored = await ctx.db
		.query("read_states")
		.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id).eq("hostUserId", session.hostUserId))
		.first();
	const state = stored?.membershipLifetime === member.membershipLifetime ? stored : null;
	const rootSequence = state?.rootSequence ?? 0;
	const replySequence = state?.replySequence ?? 0;
	if (channel.visibility === "private")
		return {
			state,
			hasUnread: channel.lastRootSequence > rootSequence || channel.lastReplySequence > replySequence,
			mentionCount: 0,
			latest: null,
			lastActivityAt: Math.max(channel.lastRootAt, channel.lastReplyAt),
		};
	const [heads, mentions] = await Promise.all([
		ctx.db
			.query("channel_author_activity")
			.withIndex("by_channel_latestSequence", (q) => q.eq("channelId", channel._id))
			.order("desc")
			.take(2),
		ctx.db
			.query("mentions")
			.withIndex("by_channel_recipient_sequence", (q) =>
				q.eq("channelId", channel._id).eq("recipientHostUserId", session.hostUserId).gt("sequence", rootSequence),
			)
			.take(100),
	]);
	const other = heads.find((entry) => entry.authorHostUserId !== session.hostUserId);
	const hasUnread = other !== undefined && other.latestSequence > rootSequence;
	const latest = hasUnread ? await ctx.db.get("messages", other.latestRootMessageId) : null;
	return {
		state,
		hasUnread,
		mentionCount: mentions.length,
		latest: latest === null ? null : messages_public_doc(latest),
		lastActivityAt: other?.latestAt ?? 0,
	};
}

export const get_for_channel = query({
	args: { channelId: v.id("channels") },
	returns: v.union(
		v.object({
			state: v.union(doc(schema, "read_states"), v.null()),
			hasUnread: v.boolean(),
			mentionCount: v.number(),
			latest: v.union(doc(schema, "messages"), v.null()),
			lastActivityAt: v.number(),
		}),
		v.null(),
	),
	handler: async (ctx, args) => {
		const access = await channels_get_access(ctx, args.channelId);
		return access._yay ? read_states_get_unread(ctx, access._yay) : null;
	},
});

export const mark_read = mutation({
	args: { channelId: v.id("channels"), rootSequence: v.number(), replySequence: v.number() },
	returns: v.union(v.object({ _yay: doc(schema, "read_states") }), v.object({ _nay: chat_error })),
	handler: async (ctx, args) => {
		const access = await channels_get_access(ctx, args.channelId);
		if (access._nay) return access;
		if (
			!Number.isSafeInteger(args.rootSequence) ||
			args.rootSequence < 0 ||
			!Number.isSafeInteger(args.replySequence) ||
			args.replySequence < 0
		)
			return { _nay: { message: "Invalid read position" } };
		const { channel, session, member } = access._yay;
		const existing = await ctx.db
			.query("read_states")
			.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id).eq("hostUserId", session.hostUserId))
			.first();
		const sameLifetime = existing?.membershipLifetime === member.membershipLifetime;
		const value = {
			installationId: channel.installationId,
			channelId: channel._id,
			hostUserId: session.hostUserId,
			membershipLifetime: member.membershipLifetime,
			rootSequence: Math.max(
				sameLifetime ? existing!.rootSequence : 0,
				Math.min(args.rootSequence, channel.lastRootSequence),
			),
			replySequence: Math.max(
				sameLifetime ? existing!.replySequence : 0,
				Math.min(args.replySequence, channel.lastReplySequence),
			),
			revision: (existing?.revision ?? 0) + 1,
		};
		if (existing) await ctx.db.patch("read_states", existing._id, value);
		const id = existing?._id ?? (await ctx.db.insert("read_states", value));
		return { _yay: (await ctx.db.get("read_states", id))! };
	},
});
