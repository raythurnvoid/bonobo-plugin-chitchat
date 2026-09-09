import { v } from "convex/values";
import { doc } from "convex-helpers/validators";
import { auth_get_current_access } from "./auth";
import { channels_get_access } from "./channels";
import { internal } from "./_generated/api";
import { internalMutation, type MutationCtx, type QueryCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import schema from "./schema";

// Deleted chat stays closed. The organization owner or original actor may finish its Files copy.
export async function transcripts_deletions_get_access(ctx: QueryCtx | MutationCtx, channelId: Id<"channels">) {
	const access = await channels_get_access(ctx, channelId, true);
	if (access._yay) return access;

	const current = await auth_get_current_access(ctx);
	if (current._nay) return current;
	const deletion = await ctx.db
		.query("transcript_deletions")
		.withIndex("by_channel", (q) => q.eq("channelId", channelId))
		.unique();
	const { installation, member, session } = current._yay;
	if (
		!deletion ||
		deletion.installationId !== installation._id ||
		deletion.completedAt !== null ||
		(!(member.isOwner && session.isOwner) &&
			(deletion.actorHostUserId !== member.hostUserId || deletion.actorLifetime !== member.membershipLifetime))
	)
		return { _nay: { message: "Not found" } } as const;

	const channel = (await ctx.db.get("channels", channelId))!;
	return {
		_yay: {
			...current._yay,
			channel,
			canWrite: false,
			canManage: member.canWrite && session.canWrite,
		},
	};
}

export async function transcripts_deletions_queue(
	ctx: MutationCtx,
	channel: Doc<"channels">,
	barrier: number,
	readerRevision: number,
) {
	const existing = await ctx.db
		.query("transcript_deletions")
		.withIndex("by_channel", (q) => q.eq("channelId", channel._id))
		.unique();
	if (existing) return;

	const change = await ctx.db
		.query("channel_access_changes")
		.withIndex("by_channel_status", (q) => q.eq("channelId", channel._id).eq("status", "complete"))
		.order("desc")
		.first();
	const own = change?.deleted && change.readerRevision === readerRevision ? change : null;

	await ctx.db.insert("transcript_deletions", {
		channelId: channel._id,
		installationId: channel.installationId,
		actorHostUserId: own?.actorHostUserId ?? null,
		actorLifetime: own?.actorLifetime ?? null,
		barrier,
		archiveStartedAt: null,
		completedAt: null,
		cursor: -1,
		claim: "",
		leaseUntil: 0,
		nextAttemptAt: Date.now(),
		error: null,
		prepared: null,
	});
}

export const claim = internalMutation({
	args: { channelId: v.id("channels") },
	returns: v.union(
		v.null(),
		v.object({ deletion: doc(schema, "transcript_deletions"), destination: doc(schema, "transcript_destinations") }),
	),
	handler: async (ctx, args) => {
		const deletion = await ctx.db
			.query("transcript_deletions")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		if (
			!deletion ||
			deletion.completedAt !== null ||
			deletion.leaseUntil > Date.now() ||
			deletion.nextAttemptAt > Date.now()
		)
			return null;

		const state = await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		const destination = await ctx.db
			.query("transcript_destinations")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		if (!state || state.appliedSequence < deletion.barrier || !destination || destination.readerRunId) {
			// Let later deletions reach the sweep while this copy waits for repair.
			if (state?.status === "blocked")
				await ctx.db.patch("transcript_deletions", deletion._id, { nextAttemptAt: Date.now() + 60_000 });
			return null;
		}

		const run = destination.runId ? await ctx.db.get("transcript_runs", destination.runId) : null;
		if (run && run.phase !== "complete") return null;

		const file = deletion.prepared
			? null
			: await ctx.db
					.query("transcript_files")
					.withIndex("by_channel_active_order", (q) =>
						q.eq("channelId", args.channelId).eq("active", true).gt("order", deletion.cursor),
					)
					.first();
		if (destination.detached || (!deletion.prepared && !file)) {
			await ctx.db.patch("transcript_deletions", deletion._id, { completedAt: Date.now(), error: null });
			return null;
		}

		const prepared = deletion.prepared ?? {
			fileId: file!._id,
			order: file!.order,
			path: file!.path,
			nodeId: file!.nodeId,
			writerGeneration: destination.writerGeneration,
			operationId: `${deletion._id}:${file!._id}`,
		};
		const values = {
			claim: crypto.randomUUID(),
			leaseUntil: Date.now() + 60_000,
			archiveStartedAt: deletion.archiveStartedAt ?? Date.now(),
			prepared,
			error: null,
		};
		await ctx.db.patch("transcript_deletions", deletion._id, values);
		return { deletion: { ...deletion, ...values }, destination };
	},
});

export const release = internalMutation({
	args: {
		deletionId: v.id("transcript_deletions"),
		claim: v.string(),
		error: v.union(v.string(), v.null()),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const deletion = await ctx.db.get("transcript_deletions", args.deletionId);
		if (!deletion || deletion.claim !== args.claim || deletion.completedAt !== null) return;

		const delay = args.error ? 30_000 : 0;
		await ctx.db.patch("transcript_deletions", deletion._id, {
			leaseUntil: 0,
			nextAttemptAt: Date.now() + delay,
			error: args.error,
			...(!args.error ? { cursor: deletion.prepared!.order, prepared: null } : {}),
		});
		await ctx.scheduler.runAfter(delay, internal.transcripts_worker.run_channel, { channelId: deletion.channelId });
	},
});
