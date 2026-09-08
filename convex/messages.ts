import { paginationOptsValidator, paginationResultValidator } from "convex/server";
import { v } from "convex/values";
import { doc } from "convex-helpers/validators";
import {
	chat_attachment,
	chat_PAGE_MAX_BYTES,
	chat_PAGE_SIZE,
	chat_validate_message,
	chat_write_result,
	type chat_Result,
	type chat_WriteResult,
} from "../shared/chat";
import { chatbe_bounded_author_name, chatbe_format_message_block } from "../shared/transcript-markdown";
import {
	channels_get_access,
	channels_get_request,
	channels_queue_transcript,
	channels_save_request,
} from "./channels";
import { files_validate_attachments } from "./files";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";
import schema from "./schema";

export function messages_public_doc(message: Doc<"messages">) {
	return message.deletedAt === null ? message : { ...message, text: "", attachments: [], mentions: [] };
}

export async function messages_get_access(
	ctx: QueryCtx | MutationCtx,
	messageId: Id<"messages">,
): Promise<
	chat_Result<NonNullable<Awaited<ReturnType<typeof channels_get_access>>["_yay"]> & { message: Doc<"messages"> }>
> {
	const message = await ctx.db.get("messages", messageId);
	if (!message) return { _nay: { message: "Not found" } } as const;
	const access = await channels_get_access(ctx, message.channelId);
	if (access._nay) return access;
	return { _yay: { ...access._yay, message } };
}

export async function messages_queue_block(ctx: MutationCtx, message: Doc<"messages">) {
	const root = message.rootMessageId === null ? message : await ctx.db.get("messages", message.rootMessageId);
	if (!root) throw new Error("Reply root is missing");
	const counts = await ctx.db
		.query("reaction_counts")
		.withIndex("by_message_token", (q) => q.eq("messageId", message._id))
		.take(8);
	const renderedBlock = chatbe_format_message_block({
		message,
		indent: message.rootMessageId === null ? "" : "  ",
		reactionCounts: new Map(counts.map((entry) => [entry.token, entry.count])),
	});
	await channels_queue_transcript(ctx, message.channelId, {
		kind: "block",
		messageId: message._id,
		rootSequence: root.sequence,
		replySequence: message.rootMessageId === null ? 0 : message.sequence,
		renderedBlock,
		sourceRevision: message.revision,
	});
}

async function validate_mentions(ctx: MutationCtx, installationId: Id<"installations">, mentions: string[]) {
	const mentioned = await Promise.all(
		mentions.map((hostUserId) =>
			ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", installationId).eq("hostUserId", hostUserId),
				)
				.first(),
		),
	);
	return mentioned.some((member) => !member?.active || !member.canRead || member.cleanupPending)
		? "Choose current workspace members to mention."
		: null;
}

async function update_mentions(ctx: MutationCtx, message: Doc<"messages">) {
	if (message.visibility !== "public" || message.rootMessageId !== null) return;
	const existing = await ctx.db
		.query("mentions")
		.withIndex("by_message", (q) => q.eq("messageId", message._id))
		.take(50);
	await Promise.all(existing.map((entry) => ctx.db.delete("mentions", entry._id)));
	if (message.deletedAt !== null) return;
	await Promise.all(
		message.mentions
			.filter((id) => id !== message.authorHostUserId)
			.map((recipientHostUserId) =>
				ctx.db.insert("mentions", {
					installationId: message.installationId,
					channelId: message.channelId,
					messageId: message._id,
					recipientHostUserId,
					sequence: message.sequence,
				}),
			),
	);
}

async function update_author_activity(ctx: MutationCtx, message: Doc<"messages">) {
	if (message.visibility !== "public" || message.rootMessageId !== null) return;
	const existing = await ctx.db
		.query("channel_author_activity")
		.withIndex("by_channel_authorHostUserId", (q) =>
			q.eq("channelId", message.channelId).eq("authorHostUserId", message.authorHostUserId),
		)
		.first();
	if (message.deletedAt !== null && existing?.latestRootMessageId !== message._id) return;
	const latest =
		message.deletedAt === null
			? message
			: await ctx.db
					.query("messages")
					.withIndex("by_channel_rootMessage_author_deletedAt_sequence", (q) =>
						q
							.eq("channelId", message.channelId)
							.eq("rootMessageId", null)
							.eq("authorHostUserId", message.authorHostUserId)
							.eq("deletedAt", null),
					)
					.order("desc")
					.first();
	if (!latest) {
		if (existing) await ctx.db.delete("channel_author_activity", existing._id);
		return;
	}
	const value = {
		channelId: message.channelId,
		authorHostUserId: message.authorHostUserId,
		latestRootMessageId: latest._id,
		latestSequence: latest.sequence,
		latestAt: latest.createdAt,
	};
	if (existing) await ctx.db.patch("channel_author_activity", existing._id, value);
	else await ctx.db.insert("channel_author_activity", value);
}

async function send_message(
	ctx: MutationCtx,
	args: {
		channelId: Id<"channels"> | null;
		rootMessageId: Id<"messages"> | null;
		clientRequestId: string;
		text: string;
		attachments: { fileNodeId: string; name: string }[];
		mentions: string[];
	},
): Promise<chat_WriteResult> {
	const root = args.rootMessageId === null ? null : await ctx.db.get("messages", args.rootMessageId);
	if (args.rootMessageId !== null && (!root || root.rootMessageId !== null))
		return { _nay: { message: "Replies can only answer a root message." } };
	const channelId = root?.channelId ?? args.channelId;
	if (channelId === null) return { _nay: { message: "Not found" } };
	const access = await channels_get_access(ctx, channelId);
	if (access._nay) return access;
	const { channel, session } = access._yay;
	const operation = root === null ? "messages.send" : "messages.reply";
	const fingerprint = JSON.stringify(args);
	const replay = await channels_get_request(
		ctx,
		channel.installationId,
		session.hostUserId,
		args.clientRequestId,
		operation,
		fingerprint,
	);
	if (replay._nay || replay._yay) return replay._nay ? replay : { _yay: replay._yay! };
	if (!access._yay.canWrite) return { _nay: { message: "Permission denied" } };
	if (channel.archivedAt !== null) return { _nay: { message: "This channel is archived" } };
	const mentions = [...new Set(args.mentions)];
	const authorName = chatbe_bounded_author_name(session.displayName);
	const invalid = chat_validate_message({ ...args, mentions, authorName });
	if (invalid) return { _nay: { message: invalid } };
	const attachmentError = await files_validate_attachments(ctx, access._yay, args.attachments);
	if (attachmentError) return { _nay: { message: attachmentError } };
	const mentionError = await validate_mentions(ctx, channel.installationId, mentions);
	if (mentionError) return { _nay: { message: mentionError } };
	const summary =
		root === null
			? null
			: await ctx.db
					.query("thread_summaries")
					.withIndex("by_rootMessage", (q) => q.eq("rootMessageId", root._id))
					.first();
	if (root !== null && summary === null) throw new Error("Root summary is missing");
	const sequence = root === null ? channel.lastRootSequence + 1 : summary!.lastReplySequence + 1;
	const now = Date.now();
	const publicId = crypto.randomUUID();
	const messageId = await ctx.db.insert("messages", {
		installationId: channel.installationId,
		channelId,
		visibility: channel.visibility,
		rootMessageId: root?._id ?? null,
		publicId,
		marker: root === null ? publicId : `${root.publicId}:${publicId}`,
		authorHostUserId: session.hostUserId,
		authorName,
		createdAt: now,
		sequence,
		channelReplySequence: root === null ? null : channel.lastReplySequence + 1,
		text: args.text,
		attachments: args.attachments,
		mentions,
		revision: 1,
		editedAt: null,
		deletedAt: null,
	});
	if (root === null) {
		await ctx.db.patch("channels", channelId, { lastRootSequence: sequence, lastRootAt: now });
		await ctx.db.insert("thread_summaries", {
			installationId: channel.installationId,
			channelId,
			visibility: channel.visibility,
			rootMessageId: messageId,
			totalReplyCount: 0,
			activeReplyCount: 0,
			lastReplySequence: 0,
			latestReplyAt: null,
			latestActiveReplyId: null,
			latestActiveReplyAt: null,
			revision: 1,
		});
	} else {
		await ctx.db.patch("channels", channelId, { lastReplySequence: channel.lastReplySequence + 1, lastReplyAt: now });
		await ctx.db.patch("thread_summaries", summary!._id, {
			totalReplyCount: summary!.totalReplyCount + 1,
			activeReplyCount: summary!.activeReplyCount + 1,
			lastReplySequence: sequence,
			latestReplyAt: now,
			latestActiveReplyId: messageId,
			latestActiveReplyAt: now,
			revision: summary!.revision + 1,
		});
	}
	const message = (await ctx.db.get("messages", messageId))!;
	await update_author_activity(ctx, message);
	await update_mentions(ctx, message);
	await messages_queue_block(ctx, message);
	const result = { kind: "message" as const, messageId, revision: 1, sequence };
	await channels_save_request(ctx, {
		installationId: channel.installationId,
		actorHostUserId: session.hostUserId,
		clientRequestId: args.clientRequestId,
		operation,
		fingerprint,
		result,
	});
	return { _yay: result };
}

export const send = mutation({
	args: {
		channelId: v.id("channels"),
		clientRequestId: v.string(),
		text: v.string(),
		attachments: v.array(chat_attachment),
		mentions: v.array(v.string()),
	},
	returns: chat_write_result,
	handler: async (ctx, args) => send_message(ctx, { ...args, rootMessageId: null }),
});

export const reply = mutation({
	args: {
		rootMessageId: v.id("messages"),
		clientRequestId: v.string(),
		text: v.string(),
		attachments: v.array(chat_attachment),
		mentions: v.array(v.string()),
	},
	returns: chat_write_result,
	handler: async (ctx, args) => send_message(ctx, { ...args, channelId: null }),
});

export const get = query({
	args: { messageId: v.id("messages") },
	returns: v.union(doc(schema, "messages"), v.null()),
	handler: async (ctx, args) => {
		const access = await messages_get_access(ctx, args.messageId);
		return access._yay ? messages_public_doc(access._yay.message) : null;
	},
});

export const latest_roots = query({
	args: { channelId: v.id("channels") },
	returns: v.union(v.object({ messages: v.array(doc(schema, "messages")), sequence: v.number() }), v.null()),
	handler: async (ctx, args) => {
		const access = await channels_get_access(ctx, args.channelId);
		if (access._nay) return null;
		const messages = await ctx.db
			.query("messages")
			.withIndex("by_channel_rootMessage_sequence", (q) => q.eq("channelId", args.channelId).eq("rootMessageId", null))
			.order("desc")
			.take(chat_PAGE_SIZE);
		return { messages: messages.map(messages_public_doc), sequence: access._yay.channel.lastRootSequence };
	},
});

export const latest_replies = query({
	args: { rootMessageId: v.id("messages") },
	returns: v.union(v.object({ messages: v.array(doc(schema, "messages")), sequence: v.number() }), v.null()),
	handler: async (ctx, args) => {
		const access = await messages_get_access(ctx, args.rootMessageId);
		if (access._nay || access._yay.message.rootMessageId !== null) return null;
		const messages = await ctx.db
			.query("messages")
			.withIndex("by_channel_rootMessage_sequence", (q) =>
				q.eq("channelId", access._yay.channel._id).eq("rootMessageId", args.rootMessageId),
			)
			.order("desc")
			.take(chat_PAGE_SIZE);
		const summary = await ctx.db
			.query("thread_summaries")
			.withIndex("by_rootMessage", (q) => q.eq("rootMessageId", args.rootMessageId))
			.first();
		return { messages: messages.map(messages_public_doc), sequence: summary!.lastReplySequence };
	},
});

export const list_roots = query({
	args: { channelId: v.id("channels"), anchorSequence: v.number(), paginationOpts: paginationOptsValidator },
	returns: paginationResultValidator(doc(schema, "messages")),
	handler: async (ctx, args) => {
		const access = await channels_get_access(ctx, args.channelId);
		if (access._nay || !Number.isSafeInteger(args.anchorSequence) || args.anchorSequence < 0)
			return { page: [], isDone: true, continueCursor: "" };
		const page = await ctx.db
			.query("messages")
			.withIndex("by_channel_rootMessage_sequence", (q) =>
				q.eq("channelId", args.channelId).eq("rootMessageId", null).lte("sequence", args.anchorSequence),
			)
			.order("desc")
			.paginate({
				...args.paginationOpts,
				numItems: Math.min(chat_PAGE_SIZE, Math.max(1, args.paginationOpts.numItems)),
				maximumRowsRead: chat_PAGE_SIZE,
				maximumBytesRead: chat_PAGE_MAX_BYTES,
			});
		return { ...page, page: page.page.map(messages_public_doc) };
	},
});

export const list_replies = query({
	args: { rootMessageId: v.id("messages"), anchorSequence: v.number(), paginationOpts: paginationOptsValidator },
	returns: paginationResultValidator(doc(schema, "messages")),
	handler: async (ctx, args) => {
		const access = await messages_get_access(ctx, args.rootMessageId);
		if (
			access._nay ||
			access._yay.message.rootMessageId !== null ||
			!Number.isSafeInteger(args.anchorSequence) ||
			args.anchorSequence < 0
		)
			return { page: [], isDone: true, continueCursor: "" };
		const page = await ctx.db
			.query("messages")
			.withIndex("by_channel_rootMessage_sequence", (q) =>
				q
					.eq("channelId", access._yay.channel._id)
					.eq("rootMessageId", args.rootMessageId)
					.lte("sequence", args.anchorSequence),
			)
			.order("desc")
			.paginate({
				...args.paginationOpts,
				numItems: Math.min(chat_PAGE_SIZE, Math.max(1, args.paginationOpts.numItems)),
				maximumRowsRead: chat_PAGE_SIZE,
				maximumBytesRead: chat_PAGE_MAX_BYTES,
			});
		return { ...page, page: page.page.map(messages_public_doc) };
	},
});

export const edit = mutation({
	args: {
		messageId: v.id("messages"),
		clientRequestId: v.string(),
		expectedRevision: v.number(),
		text: v.string(),
		mentions: v.array(v.string()),
	},
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
			"messages.edit",
			fingerprint,
		);
		if (replay._nay || replay._yay) return replay._nay ? replay : { _yay: replay._yay! };
		if (!access._yay.canWrite || message.authorHostUserId !== session.hostUserId)
			return { _nay: { message: "Permission denied" } };
		if (message.revision !== args.expectedRevision || message.deletedAt !== null)
			return { _nay: { name: "conflict", message: "The message changed. Reload it and try again." } };
		const mentions = [...new Set(args.mentions)];
		const invalid = chat_validate_message({ ...message, text: args.text, mentions });
		if (invalid) return { _nay: { message: invalid } };
		const mentionError = await validate_mentions(ctx, message.installationId, mentions);
		if (mentionError) return { _nay: { message: mentionError } };
		const updated = { ...message, text: args.text, mentions, editedAt: Date.now(), revision: message.revision + 1 };
		await ctx.db.patch("messages", message._id, {
			text: updated.text,
			mentions,
			editedAt: updated.editedAt,
			revision: updated.revision,
		});
		await update_mentions(ctx, updated);
		await messages_queue_block(ctx, updated);
		const result = {
			kind: "message" as const,
			messageId: message._id,
			revision: updated.revision,
			sequence: message.sequence,
		};
		await channels_save_request(ctx, {
			installationId: message.installationId,
			actorHostUserId: session.hostUserId,
			clientRequestId: args.clientRequestId,
			operation: "messages.edit",
			fingerprint,
			result,
		});
		return { _yay: result };
	},
});

export const remove = mutation({
	args: { messageId: v.id("messages"), clientRequestId: v.string(), expectedRevision: v.number() },
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
			"messages.remove",
			fingerprint,
		);
		if (replay._nay || replay._yay) return replay._nay ? replay : { _yay: replay._yay! };
		if (!access._yay.canWrite || message.authorHostUserId !== session.hostUserId)
			return { _nay: { message: "Permission denied" } };
		if (message.revision !== args.expectedRevision)
			return { _nay: { name: "conflict", message: "The message changed. Reload it and try again." } };
		let revision = message.revision;
		if (message.deletedAt === null) {
			revision += 1;
			const updated = { ...message, deletedAt: Date.now(), revision };
			await ctx.db.patch("messages", message._id, { deletedAt: updated.deletedAt, revision });
			if (message.rootMessageId !== null) {
				const rootMessageId = message.rootMessageId;
				const summary = await ctx.db
					.query("thread_summaries")
					.withIndex("by_rootMessage", (q) => q.eq("rootMessageId", rootMessageId))
					.first();
				if (!summary) throw new Error("Root summary is missing");
				const latest = await ctx.db
					.query("messages")
					.withIndex("by_rootMessage_deletedAt_sequence", (q) =>
						q.eq("rootMessageId", rootMessageId).eq("deletedAt", null),
					)
					.order("desc")
					.first();
				await ctx.db.patch("thread_summaries", summary._id, {
					activeReplyCount: summary.activeReplyCount - 1,
					latestActiveReplyId: latest?._id ?? null,
					latestActiveReplyAt: latest?.createdAt ?? null,
					revision: summary.revision + 1,
				});
			}
			await update_author_activity(ctx, updated);
			await update_mentions(ctx, updated);
			await messages_queue_block(ctx, updated);
		}
		const result = { kind: "message" as const, messageId: message._id, revision, sequence: message.sequence };
		await channels_save_request(ctx, {
			installationId: message.installationId,
			actorHostUserId: session.hostUserId,
			clientRequestId: args.clientRequestId,
			operation: "messages.remove",
			fingerprint,
			result,
		});
		return { _yay: result };
	},
});
