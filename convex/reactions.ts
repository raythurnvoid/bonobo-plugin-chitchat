import { v } from "convex/values";
import { chat_reaction_token, chat_write_result, type chat_WriteResult } from "../shared/chat";
import { channels_get_request, channels_save_request } from "./channels";
import { messages_get_access, messages_queue_block } from "./messages";
import { mutation, query } from "./_generated/server";

export const get_for_message = query({
	args: { messageId: v.id("messages") },
	returns: v.union(
		v.array(v.object({ token: chat_reaction_token, count: v.number(), reactedByMe: v.boolean() })),
		v.null(),
	),
	handler: async (ctx, args) => {
		const access = await messages_get_access(ctx, args.messageId);
		if (access._nay) return null;
		const [counts, own] = await Promise.all([
			ctx.db
				.query("reaction_counts")
				.withIndex("by_message_token", (q) => q.eq("messageId", args.messageId))
				.take(8),
			ctx.db
				.query("reactions")
				.withIndex("by_message_hostUserId", (q) =>
					q.eq("messageId", args.messageId).eq("hostUserId", access._yay.session.hostUserId),
				)
				.take(8),
		]);
		return counts.map((entry) => ({
			token: entry.token,
			count: entry.count,
			reactedByMe: own.some((reaction) => reaction.token === entry.token),
		}));
	},
});

export const set = mutation({
	args: { messageId: v.id("messages"), clientRequestId: v.string(), token: chat_reaction_token, on: v.boolean() },
	returns: chat_write_result,
	handler: async (ctx, args): Promise<chat_WriteResult> => {
		const access = await messages_get_access(ctx, args.messageId);
		if (access._nay) return access;
		const { message, session } = access._yay;
		const fingerprint = JSON.stringify(args);
		const replay = await channels_get_request(
			ctx,
			message.installationId,
			session.hostUserId,
			args.clientRequestId,
			"reactions.set",
			fingerprint,
		);
		if (replay._nay || replay._yay) return replay._nay ? replay : { _yay: replay._yay! };
		if (!access._yay.canWrite) return { _nay: { message: "Permission denied" } };
		const existing = await ctx.db
			.query("reactions")
			.withIndex("by_message_token_hostUserId", (q) =>
				q.eq("messageId", message._id).eq("token", args.token).eq("hostUserId", session.hostUserId),
			)
			.first();
		if (args.on !== (existing !== null)) {
			const count = await ctx.db
				.query("reaction_counts")
				.withIndex("by_message_token", (q) => q.eq("messageId", message._id).eq("token", args.token))
				.first();
			if (args.on)
				await ctx.db.insert("reactions", {
					installationId: message.installationId,
					channelId: message.channelId,
					messageId: message._id,
					hostUserId: session.hostUserId,
					token: args.token,
				});
			else await ctx.db.delete("reactions", existing!._id);
			const nextCount = (count?.count ?? 0) + (args.on ? 1 : -1);
			if (count) {
				if (nextCount === 0) await ctx.db.delete("reaction_counts", count._id);
				else await ctx.db.patch("reaction_counts", count._id, { count: nextCount });
			} else await ctx.db.insert("reaction_counts", { messageId: message._id, token: args.token, count: nextCount });
			await messages_queue_block(ctx, message);
		}
		const result = { kind: "reaction" as const, messageId: message._id, token: args.token, on: args.on };
		await channels_save_request(ctx, {
			installationId: message.installationId,
			actorHostUserId: session.hostUserId,
			clientRequestId: args.clientRequestId,
			operation: "reactions.set",
			fingerprint,
			result,
		});
		return { _yay: result };
	},
});
