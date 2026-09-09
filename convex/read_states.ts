import { v } from "convex/values";
import { doc } from "convex-helpers/validators";
import { chat_error } from "../shared/chat";
import { channels_get_access } from "./channels";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import { internalMutation, mutation, query } from "./_generated/server";
import { messages_get_access, messages_public_doc } from "./messages";
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
	args: { channelId: v.id("channels"), rootSequence: v.number() },
	returns: v.union(v.object({ _yay: doc(schema, "read_states") }), v.object({ _nay: chat_error })),
	handler: async (ctx, args) => {
		const access = await channels_get_access(ctx, args.channelId);
		if (access._nay) return access;
		if (!Number.isSafeInteger(args.rootSequence) || args.rootSequence < 0)
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
			replySequence: sameLifetime ? existing!.replySequence : 0,
			revision: (existing?.revision ?? 0) + 1,
		};
		if (existing) await ctx.db.patch("read_states", existing._id, value);
		const id = existing?._id ?? (await ctx.db.insert("read_states", value));
		return { _yay: (await ctx.db.get("read_states", id))! };
	},
});

async function advance_replies(ctx: MutationCtx, state: Doc<"read_states">) {
	const replies = await ctx.db
		.query("messages")
		.withIndex("by_channel_channelReplySequence", (q) =>
			q.eq("channelId", state.channelId).gt("channelReplySequence", state.replySequence),
		)
		.take(100);

	const threads = new Map<Id<"messages">, number>();
	let sequence = state.replySequence;
	for (const reply of replies) {
		const rootMessageId = reply.rootMessageId!;
		if (!threads.has(rootMessageId)) {
			const read = await ctx.db
				.query("thread_read_states")
				.withIndex("by_rootMessage_hostUserId", (q) =>
					q.eq("rootMessageId", rootMessageId).eq("hostUserId", state.hostUserId),
				)
				.first();
			threads.set(rootMessageId, read?.membershipLifetime === state.membershipLifetime ? read.replySequence : 0);
		}
		// A later thread must not clear an earlier unread reply in another thread.
		if (reply.sequence > threads.get(rootMessageId)!) break;
		sequence = reply.channelReplySequence!;
	}

	if (sequence > state.replySequence)
		await ctx.db.patch("read_states", state._id, { replySequence: sequence, revision: state.revision + 1 });
	if (replies.length === 100 && sequence === replies.at(-1)!.channelReplySequence)
		await ctx.scheduler.runAfter(0, internal.read_states.continue_replies, {
			readStateId: state._id,
			membershipLifetime: state.membershipLifetime,
		});
}

export const continue_replies = internalMutation({
	args: { readStateId: v.id("read_states"), membershipLifetime: v.number() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const state = await ctx.db.get("read_states", args.readStateId);
		// Cleanup may remove the accepted read or replace it for a new membership.
		if (state?.membershipLifetime !== args.membershipLifetime) return null;
		const member = await ctx.db
			.query("workspace_members")
			.withIndex("by_installation_hostUserId", (q) =>
				q.eq("installationId", state.installationId).eq("hostUserId", state.hostUserId),
			)
			.first();
		if (!member?.active || member.cleanupPending || member.membershipLifetime !== args.membershipLifetime) return null;

		await advance_replies(ctx, state);
		return null;
	},
});

export const mark_thread_read = mutation({
	args: { rootMessageId: v.id("messages"), replySequence: v.number() },
	returns: v.union(v.object({ _yay: v.null() }), v.object({ _nay: chat_error })),
	handler: async (ctx, args) => {
		const access = await messages_get_access(ctx, args.rootMessageId);
		if (access._nay) return access;
		const { message, channel, session, member } = access._yay;
		if (message.rootMessageId !== null) return { _nay: { message: "Not found" } };
		if (!Number.isSafeInteger(args.replySequence) || args.replySequence < 0)
			return { _nay: { message: "Invalid read position" } };

		const summary = await ctx.db
			.query("thread_summaries")
			.withIndex("by_rootMessage", (q) => q.eq("rootMessageId", args.rootMessageId))
			.first();
		const existing = await ctx.db
			.query("thread_read_states")
			.withIndex("by_rootMessage_hostUserId", (q) =>
				q.eq("rootMessageId", args.rootMessageId).eq("hostUserId", session.hostUserId),
			)
			.first();
		const state = await ctx.db
			.query("read_states")
			.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id).eq("hostUserId", session.hostUserId))
			.first();
		const value = {
			installationId: channel.installationId,
			channelId: channel._id,
			rootMessageId: args.rootMessageId,
			hostUserId: session.hostUserId,
			membershipLifetime: member.membershipLifetime,
			replySequence: Math.max(
				existing?.membershipLifetime === member.membershipLifetime ? existing.replySequence : 0,
				Math.min(args.replySequence, summary!.lastReplySequence),
			),
		};
		const sameLifetime = state?.membershipLifetime === member.membershipLifetime;
		const channelValue = {
			installationId: channel.installationId,
			channelId: channel._id,
			hostUserId: session.hostUserId,
			membershipLifetime: member.membershipLifetime,
			rootSequence: sameLifetime ? state.rootSequence : 0,
			replySequence: sameLifetime ? state.replySequence : 0,
			revision: (state?.revision ?? 0) + 1,
		};

		if (existing) await ctx.db.patch("thread_read_states", existing._id, value);
		else await ctx.db.insert("thread_read_states", value);
		if (state && !sameLifetime) await ctx.db.patch("read_states", state._id, channelValue);
		const stateId = state?._id ?? (await ctx.db.insert("read_states", channelValue));
		await advance_replies(ctx, (await ctx.db.get("read_states", stateId))!);
		return { _yay: null };
	},
});
