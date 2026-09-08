import { paginationOptsValidator, paginationResultValidator } from "convex/server";
import { doc } from "convex-helpers/validators";
import { v } from "convex/values";
import { chat_PAGE_MAX_BYTES, chat_PAGE_SIZE } from "../shared/chat";
import { auth_get_current_access } from "./auth";
import { channels_get_access } from "./channels";
import { messages_public_doc } from "./messages";
import { read_states_get_unread } from "./read_states";
import { query } from "./_generated/server";
import schema from "./schema";

export const activity = query({
	args: { paginationOpts: paginationOptsValidator },
	returns: paginationResultValidator(v.object({ channel: doc(schema, "channels"), message: doc(schema, "messages") })),
	handler: async (ctx, args) => {
		const access = await auth_get_current_access(ctx);
		if (access._nay) return { page: [], isDone: true, continueCursor: "" };
		const installationId = access._yay.installation._id;
		const page = await ctx.db
			.query("messages")
			.withIndex("by_installation_visibility_rootMessage_createdAt", (q) =>
				q.eq("installationId", installationId).eq("visibility", "public").eq("rootMessageId", null),
			)
			.order("desc")
			.paginate({
				...args.paginationOpts,
				numItems: Math.min(chat_PAGE_SIZE, Math.max(1, args.paginationOpts.numItems)),
				maximumRowsRead: chat_PAGE_SIZE,
				maximumBytesRead: chat_PAGE_MAX_BYTES,
			});
		const items = await Promise.all(
			page.page
				.filter((message) => message.deletedAt === null)
				.map(async (message) => {
					const channel = await ctx.db.get("channels", message.channelId);
					return channel?.deletedAt === null ? { channel, message: messages_public_doc(message) } : null;
				}),
		);
		return { ...page, page: items.filter((item) => item !== null) };
	},
});

export const threads = query({
	args: { paginationOpts: paginationOptsValidator },
	returns: paginationResultValidator(
		v.object({
			channel: doc(schema, "channels"),
			summary: doc(schema, "thread_summaries"),
			latest: doc(schema, "messages"),
		}),
	),
	handler: async (ctx, args) => {
		const access = await auth_get_current_access(ctx);
		if (access._nay) return { page: [], isDone: true, continueCursor: "" };
		const installationId = access._yay.installation._id;
		const page = await ctx.db
			.query("thread_summaries")
			.withIndex("by_installation_visibility_latestActiveReplyAt", (q) =>
				q.eq("installationId", installationId).eq("visibility", "public").gt("latestActiveReplyAt", null),
			)
			.order("desc")
			.paginate({
				...args.paginationOpts,
				numItems: Math.min(chat_PAGE_SIZE, Math.max(1, args.paginationOpts.numItems)),
				maximumRowsRead: chat_PAGE_SIZE,
				maximumBytesRead: chat_PAGE_MAX_BYTES,
			});
		const items = await Promise.all(
			page.page.map(async (summary) => {
				const [channel, latest] = await Promise.all([
					ctx.db.get("channels", summary.channelId),
					summary.latestActiveReplyId ? ctx.db.get("messages", summary.latestActiveReplyId) : null,
				]);
				return channel?.deletedAt === null && latest !== null
					? { channel, summary, latest: messages_public_doc(latest) }
					: null;
			}),
		);
		return { ...page, page: items.filter((item) => item !== null) };
	},
});

export const unreads = query({
	args: { visibility: v.union(v.literal("public"), v.literal("private")), paginationOpts: paginationOptsValidator },
	returns: paginationResultValidator(
		v.object({
			channel: doc(schema, "channels"),
			mentionCount: v.number(),
			latest: v.union(doc(schema, "messages"), v.null()),
			lastActivityAt: v.number(),
		}),
	),
	handler: async (ctx, args) => {
		const access = await auth_get_current_access(ctx);
		if (access._nay) return { page: [], isDone: true, continueCursor: "" };
		const { installation, session, member } = access._yay;
		const options = {
			...args.paginationOpts,
			numItems: Math.min(chat_PAGE_SIZE, Math.max(1, args.paginationOpts.numItems)),
			maximumRowsRead: chat_PAGE_SIZE,
			maximumBytesRead: chat_PAGE_MAX_BYTES,
		};
		const page =
			args.visibility === "public"
				? await ctx.db
						.query("channels")
						.withIndex("by_installation_visibility_archivedAt_sortName", (q) =>
							q.eq("installationId", installation._id).eq("visibility", "public").eq("archivedAt", null),
						)
						.paginate(options)
				: await ctx.db
						.query("channel_members")
						.withIndex("by_installation_hostUserId_channel", (q) =>
							q.eq("installationId", installation._id).eq("hostUserId", session.hostUserId),
						)
						.paginate(options);
		const items = await Promise.all(
			page.page.map(async (entry) => {
				if ("membershipLifetime" in entry && entry.membershipLifetime !== member.membershipLifetime) return null;
				const channelId = "channelId" in entry ? entry.channelId : entry._id;
				const current = await channels_get_access(ctx, channelId);
				if (current._nay || current._yay.channel.archivedAt !== null) return null;
				const unread = await read_states_get_unread(ctx, current._yay);
				return unread.hasUnread
					? {
							channel: current._yay.channel,
							mentionCount: unread.mentionCount,
							latest: unread.latest,
							lastActivityAt: unread.lastActivityAt,
						}
					: null;
			}),
		);
		// Filtering a channel page can return no unreads while more channels remain.
		return { ...page, page: items.filter((item) => item !== null) };
	},
});
