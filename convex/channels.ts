import { paginationOptsValidator, paginationResultValidator } from "convex/server";
import { v } from "convex/values";
import { doc } from "convex-helpers/validators";
import {
	chat_CHANNEL_MEMBER_LIMIT,
	chat_PAGE_MAX_BYTES,
	chat_PAGE_SIZE,
	chat_validate_request_id,
	chat_write_result,
	type chat_Result,
	type chat_WriteResult,
} from "../shared/chat";
import { chatbe_collision_slug, chatbe_sha256_hex, chatbe_slug_channel_name } from "../shared/transcript-markdown";
import { auth_get_current_access } from "./auth";
import type { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";
import schema from "./schema";

export async function channels_get_access(
	ctx: QueryCtx | MutationCtx,
	channelId: Id<"channels">,
	allowPending = false,
): Promise<
	chat_Result<
		NonNullable<Awaited<ReturnType<typeof auth_get_current_access>>["_yay"]> & {
			channel: Doc<"channels">;
			canWrite: boolean;
			canManage: boolean;
		}
	>
> {
	const access = await auth_get_current_access(ctx);
	if (access._nay) return access;
	const channel = await ctx.db.get("channels", channelId);
	if (!channel || channel.installationId !== access._yay.installation._id || channel.deletedAt !== null) {
		return { _nay: { message: "Not found" } } as const;
	}
	const grant =
		channel.visibility === "private"
			? await ctx.db
					.query("channel_members")
					.withIndex("by_channel_hostUserId", (q) =>
						q.eq("channelId", channelId).eq("hostUserId", access._yay.session.hostUserId),
					)
					.first()
			: null;
	const level = grant?.membershipLifetime === access._yay.member.membershipLifetime ? grant.level : null;
	if (
		channel.visibility === "private" &&
		level === null &&
		!(access._yay.session.isOwner && access._yay.member.isOwner)
	) {
		return { _nay: { message: "Not found" } } as const;
	}
	if (channel.visibility === "private" && !allowPending) {
		const changing = await ctx.db
			.query("channel_access_changes")
			.withIndex("by_channel_status", (q) => q.eq("channelId", channelId).eq("status", "pending"))
			.first();
		if (changing) return { _nay: { message: "Channel access is updating. Try again shortly." } } as const;
	}
	return {
		_yay: {
			...access._yay,
			channel,
			canWrite:
				access._yay.session.canWrite &&
				access._yay.member.canWrite &&
				(channel.visibility === "public" || level === "write" || level === "manage"),
			canManage:
				access._yay.session.canWrite &&
				access._yay.member.canWrite &&
				(channel.visibility === "public" || level === "manage"),
		},
	};
}

export async function channels_get_request(
	ctx: QueryCtx | MutationCtx,
	installationId: Id<"installations">,
	actorHostUserId: string,
	clientRequestId: string,
	operation: string,
	fingerprint: string,
): Promise<chat_Result<Doc<"request_results">["result"] | null>> {
	if (!chat_validate_request_id(clientRequestId)) return { _nay: { message: "Invalid request ID" } };
	const receipt = await ctx.db
		.query("request_results")
		.withIndex("by_installation_actorHostUserId_clientRequestId", (q) =>
			q
				.eq("installationId", installationId)
				.eq("actorHostUserId", actorHostUserId)
				.eq("clientRequestId", clientRequestId),
		)
		.first();
	if (receipt && (receipt.operation !== operation || receipt.fingerprint !== fingerprint)) {
		return { _nay: { name: "conflict", message: "This request ID was already used for another change." } };
	}
	return { _yay: receipt?.result ?? null };
}

export async function channels_save_request(
	ctx: MutationCtx,
	args: Omit<Doc<"request_results">, "_id" | "_creationTime" | "createdAt">,
) {
	await ctx.db.insert("request_results", { ...args, createdAt: Date.now() });
}

export async function channels_queue_transcript(
	ctx: MutationCtx,
	channelId: Id<"channels">,
	operation: Doc<"transcript_jobs">["operation"],
) {
	const state = await ctx.db
		.query("transcript_channels")
		.withIndex("by_channel", (q) => q.eq("channelId", channelId))
		.first();
	const sequence = (state?.desiredSequence ?? 0) + 1;
	if (state) {
		await ctx.db.patch("transcript_channels", state._id, {
			desiredSequence: sequence,
			...(state.status === "ready" ? { status: "pending" as const } : {}),
		});
	} else {
		await ctx.db.insert("transcript_channels", {
			channelId,
			desiredSequence: sequence,
			renderedSequence: 0,
			appliedSequence: 0,
			workerGeneration: 0,
			status: "pending",
			error: null,
			nextAttemptAt: Date.now(),
			readerRevision: 0,
		});
	}
	await ctx.db.insert("transcript_jobs", {
		channelId,
		sequence,
		operation,
		status: "pending",
		attempts: 0,
		nextAttemptAt: Date.now(),
		workerGeneration: 0,
		createdAt: Date.now(),
		error: null,
	});
	await ctx.scheduler.runAfter(0, internal.transcripts_worker.run_channel, { channelId });
}

export async function channels_queue_index(ctx: MutationCtx, channel: Doc<"channels">) {
	if (channel.visibility !== "public") return;
	let state = await ctx.db
		.query("transcript_indexes")
		.withIndex("by_installation_generation", (q) =>
			q.eq("installationId", channel.installationId).eq("generation", channel.generation),
		)
		.first();
	if (!state) {
		const id = await ctx.db.insert("transcript_indexes", {
			installationId: channel.installationId,
			generation: channel.generation,
			desiredSequence: 0,
			appliedSequence: 0,
			foldedSequence: 0,
			entryBytes: 0,
			entryCount: 0,
			activeRunId: null,
			nodeId: null,
			contentRevision: null,
			writerId: null,
			writerGeneration: 0,
			parentNodeId: null,
			status: "pending",
			error: null,
		});
		state = (await ctx.db.get("transcript_indexes", id))!;
	}
	const sequence = state.desiredSequence + 1;
	await ctx.db.patch("transcript_indexes", state._id, {
		desiredSequence: sequence,
		...(state.status === "ready" ? { status: "pending" as const } : {}),
	});
	await ctx.db.insert("transcript_index_jobs", {
		indexId: state._id,
		sequence,
		channelId: channel._id,
		name: channel.name,
		slug: channel.transcriptSlug,
		active: channel.archivedAt === null && channel.deletedAt === null,
		status: "pending",
	});
	await ctx.scheduler.runAfter(0, internal.transcripts_index.run, { indexId: state._id });
}

export const get = query({
	args: { channelId: v.id("channels") },
	returns: v.union(doc(schema, "channels"), v.null()),
	handler: async (ctx, args) => (await channels_get_access(ctx, args.channelId))._yay?.channel ?? null,
});

export const permissions = query({
	args: { channelId: v.id("channels") },
	returns: v.union(v.object({ canWrite: v.boolean(), canManage: v.boolean() }), v.null()),
	handler: async (ctx, args) => {
		// Keep access controls visible while a private reader change waits for Files.
		const access = await channels_get_access(ctx, args.channelId, true);
		return access._yay ? { canWrite: access._yay.canWrite, canManage: access._yay.canManage } : null;
	},
});

export const list_public = query({
	args: { archived: v.boolean(), paginationOpts: paginationOptsValidator },
	returns: paginationResultValidator(doc(schema, "channels")),
	handler: async (ctx, args) => {
		const access = await auth_get_current_access(ctx);
		if (access._nay) return { page: [], isDone: true, continueCursor: "" };
		const installationId = access._yay.installation._id;
		const page = await ctx.db
			.query("channels")
			.withIndex("by_installation_visibility_archivedAt_sortName", (q) => {
				const range = q.eq("installationId", installationId).eq("visibility", "public");
				return args.archived ? range.gt("archivedAt", null) : range.eq("archivedAt", null);
			})
			.paginate({
				...args.paginationOpts,
				numItems: Math.min(chat_PAGE_SIZE, Math.max(1, args.paginationOpts.numItems)),
				maximumRowsRead: chat_PAGE_SIZE,
				maximumBytesRead: chat_PAGE_MAX_BYTES,
			});
		return { ...page, page: page.page.filter((channel) => channel.deletedAt === null) };
	},
});

export const list_mine = query({
	args: { archived: v.boolean(), paginationOpts: paginationOptsValidator },
	returns: paginationResultValidator(doc(schema, "channels")),
	handler: async (ctx, args) => {
		const access = await auth_get_current_access(ctx);
		if (access._nay) return { page: [], isDone: true, continueCursor: "" };
		const { installation, session, member } = access._yay;
		const page = await ctx.db
			.query("channel_members")
			.withIndex("by_installation_hostUserId_channel", (q) =>
				q.eq("installationId", installation._id).eq("hostUserId", session.hostUserId),
			)
			.paginate({
				...args.paginationOpts,
				numItems: Math.min(chat_PAGE_SIZE, Math.max(1, args.paginationOpts.numItems)),
				maximumRowsRead: chat_PAGE_SIZE,
				maximumBytesRead: chat_PAGE_MAX_BYTES,
			});
		const channels = await Promise.all(
			page.page
				.filter((grant) => grant.membershipLifetime === member.membershipLifetime)
				.map((grant) => ctx.db.get("channels", grant.channelId)),
		);
		// A skipped stale grant does not end pagination.
		return {
			...page,
			page: channels.filter(
				(channel): channel is Doc<"channels"> =>
					channel !== null && channel.deletedAt === null && (channel.archivedAt !== null) === args.archived,
			),
		};
	},
});

export const list_members = query({
	args: { channelId: v.id("channels"), paginationOpts: paginationOptsValidator },
	returns: v.union(
		v.object({
			...paginationResultValidator(doc(schema, "channel_members")).fields,
			membershipRevision: v.number(),
			memberCount: v.number(),
		}),
		v.null(),
	),
	handler: async (ctx, args) => {
		const access = await channels_get_access(ctx, args.channelId);
		if (access._nay) return null;
		const page = await ctx.db
			.query("channel_members")
			.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", args.channelId))
			.paginate({
				...args.paginationOpts,
				numItems: Math.min(chat_PAGE_SIZE, Math.max(1, args.paginationOpts.numItems)),
				maximumRowsRead: chat_PAGE_SIZE,
				maximumBytesRead: chat_PAGE_MAX_BYTES,
			});
		return {
			...page,
			membershipRevision: access._yay.channel.membershipRevision,
			memberCount: access._yay.channel.memberCount,
		};
	},
});

export const create = mutation({
	args: {
		clientRequestId: v.string(),
		name: v.string(),
		topic: v.string(),
		visibility: v.union(v.literal("public"), v.literal("private")),
		invitedUserIds: v.array(v.string()),
	},
	returns: chat_write_result,
	handler: async (ctx, args): Promise<chat_WriteResult> => {
		const access = await auth_get_current_access(ctx);
		if (access._nay) return access;
		const { installation, session, member } = access._yay;
		const fingerprint = JSON.stringify(args);
		const replay = await channels_get_request(
			ctx,
			installation._id,
			session.hostUserId,
			args.clientRequestId,
			"channels.create",
			fingerprint,
		);
		if (replay._nay || replay._yay) return replay._nay ? replay : { _yay: replay._yay! };
		if (!session.canWrite || !member.canWrite) return { _nay: { message: "Permission denied" } };
		const name = args.name.trim();
		const topic = args.topic.trim();
		if (name.length < 1 || name.length > 64 || topic.length > 250)
			return { _nay: { message: "Use a name of 1–64 characters and a topic of at most 250 characters." } };
		const invited = [...new Set(args.invitedUserIds)].filter((id) => id !== session.hostUserId);
		if (invited.length >= chat_CHANNEL_MEMBER_LIMIT || (args.visibility === "public" && invited.length > 0))
			return { _nay: { message: "A private channel can have up to 50 people." } };
		const members = await Promise.all(
			invited.map((hostUserId) =>
				ctx.db
					.query("workspace_members")
					.withIndex("by_installation_hostUserId", (q) =>
						q.eq("installationId", installation._id).eq("hostUserId", hostUserId),
					)
					.first(),
			),
		);
		if (members.some((entry) => !entry?.active || !entry.canRead || entry.cleanupPending))
			return { _nay: { message: "Choose current workspace members." } };
		const publicId = crypto.randomUUID();
		let slug = chatbe_slug_channel_name(name);
		if (args.visibility === "private") slug = `${slug}-${(await chatbe_sha256_hex(publicId)).slice(0, 8)}`;
		const collision = await ctx.db
			.query("channels")
			.withIndex("by_installation_generation_transcriptSlug", (q) =>
				q.eq("installationId", installation._id).eq("generation", installation.generation).eq("transcriptSlug", slug),
			)
			.first();
		if (collision) slug = await chatbe_collision_slug(name, publicId);
		const channelId = await ctx.db.insert("channels", {
			installationId: installation._id,
			generation: installation.generation,
			publicId,
			visibility: args.visibility,
			name,
			sortName: name.toLowerCase(),
			topic,
			createdBy: session.hostUserId,
			createdAt: Date.now(),
			revision: 1,
			membershipRevision: 1,
			memberCount: args.visibility === "private" ? invited.length + 1 : 0,
			archivedAt: null,
			deletedAt: null,
			lastRootSequence: 0,
			lastReplySequence: 0,
			lastRootAt: 0,
			lastReplyAt: 0,
			transcriptSlug: slug,
		});
		if (args.visibility === "private") {
			await ctx.db.insert("channel_members", {
				installationId: installation._id,
				channelId,
				hostUserId: session.hostUserId,
				membershipLifetime: member.membershipLifetime,
				level: "manage",
				joinedAt: Date.now(),
			});
			await Promise.all(
				members.map((entry) =>
					ctx.db.insert("channel_members", {
						installationId: installation._id,
						channelId,
						hostUserId: entry!.hostUserId,
						membershipLifetime: entry!.membershipLifetime,
						level: "write",
						joinedAt: Date.now(),
					}),
				),
			);
		}
		await channels_queue_transcript(ctx, channelId, {
			kind: "header",
			name,
			topic,
			isPrivate: args.visibility === "private",
		});
		if (args.visibility === "private")
			await channels_queue_transcript(ctx, channelId, {
				kind: "readers",
				readerRevision: 1,
				readers: [member, ...members].map((entry) => ({
					userId: entry!.hostUserId,
					membershipLifetime: entry!.membershipLifetime,
				})),
				deleted: false,
			});
		await channels_queue_index(ctx, (await ctx.db.get("channels", channelId))!);
		const result = { kind: "channel" as const, channelId, revision: 1 };
		await channels_save_request(ctx, {
			installationId: installation._id,
			actorHostUserId: session.hostUserId,
			clientRequestId: args.clientRequestId,
			operation: "channels.create",
			fingerprint,
			result,
		});
		return { _yay: result };
	},
});

export const update = mutation({
	args: {
		channelId: v.id("channels"),
		clientRequestId: v.string(),
		expectedRevision: v.number(),
		name: v.string(),
		topic: v.string(),
	},
	returns: chat_write_result,
	handler: async (ctx, args): Promise<chat_WriteResult> => {
		const access = await channels_get_access(ctx, args.channelId);
		if (access._nay) return access;
		const { channel, session } = access._yay;
		const fingerprint = JSON.stringify(args);
		const replay = await channels_get_request(
			ctx,
			channel.installationId,
			session.hostUserId,
			args.clientRequestId,
			"channels.update",
			fingerprint,
		);
		if (replay._nay || replay._yay) return replay._nay ? replay : { _yay: replay._yay! };
		if (!access._yay.canWrite) return { _nay: { message: "Permission denied" } };
		if (channel.revision !== args.expectedRevision)
			return { _nay: { name: "conflict", message: "The channel changed. Reload it and try again." } };
		const name = args.name.trim();
		const topic = args.topic.trim();
		if (!name || name.length > 64 || topic.length > 250)
			return { _nay: { message: "Use a name of 1–64 characters and a topic of at most 250 characters." } };
		const revision = channel.revision + 1;
		await ctx.db.patch("channels", channel._id, { name, sortName: name.toLowerCase(), topic, revision });
		await channels_queue_transcript(ctx, channel._id, {
			kind: "header",
			name,
			topic,
			isPrivate: channel.visibility === "private",
		});
		await channels_queue_index(ctx, { ...channel, name, topic, revision });
		const result = { kind: "channel" as const, channelId: channel._id, revision };
		await channels_save_request(ctx, {
			installationId: channel.installationId,
			actorHostUserId: session.hostUserId,
			clientRequestId: args.clientRequestId,
			operation: "channels.update",
			fingerprint,
			result,
		});
		return { _yay: result };
	},
});

export const archive = mutation({
	args: {
		channelId: v.id("channels"),
		clientRequestId: v.string(),
		expectedRevision: v.number(),
		archived: v.boolean(),
	},
	returns: chat_write_result,
	handler: async (ctx, args): Promise<chat_WriteResult> => {
		const access = await channels_get_access(ctx, args.channelId);
		if (access._nay) return access;
		const { channel, session } = access._yay;
		const fingerprint = JSON.stringify(args);
		const replay = await channels_get_request(
			ctx,
			channel.installationId,
			session.hostUserId,
			args.clientRequestId,
			"channels.archive",
			fingerprint,
		);
		if (replay._nay || replay._yay) return replay._nay ? replay : { _yay: replay._yay! };
		if (!access._yay.canWrite) return { _nay: { message: "Permission denied" } };
		if (channel.revision !== args.expectedRevision)
			return { _nay: { name: "conflict", message: "The channel changed. Reload it and try again." } };
		const revision = channel.revision + 1;
		const archivedAt = args.archived ? (channel.archivedAt ?? Date.now()) : null;
		await ctx.db.patch("channels", channel._id, { revision, archivedAt });
		await channels_queue_transcript(ctx, channel._id, { kind: "archive", archived: args.archived });
		await channels_queue_index(ctx, { ...channel, revision, archivedAt });
		const result = { kind: "channel" as const, channelId: channel._id, revision };
		await channels_save_request(ctx, {
			installationId: channel.installationId,
			actorHostUserId: session.hostUserId,
			clientRequestId: args.clientRequestId,
			operation: "channels.archive",
			fingerprint,
			result,
		});
		return { _yay: result };
	},
});
