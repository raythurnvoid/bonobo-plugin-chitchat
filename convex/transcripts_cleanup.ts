import { v } from "convex/values";
import { internalMutation, type MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

async function remove_unused_file(ctx: MutationCtx, fileId: Id<"transcript_files"> | null) {
	if (!fileId) return;
	const file = await ctx.db.get("transcript_files", fileId);
	if (!file || file.active) return;
	const path = await ctx.db
		.query("transcript_paths")
		.withIndex("by_channel_path", (q) => q.eq("channelId", file.channelId).eq("path", file.path))
		.unique();
	if (path?.fileId === fileId && !path.archived) return;
	const block = await ctx.db
		.query("transcript_blocks")
		.withIndex("by_file_start", (q) => q.eq("fileId", fileId))
		.first();
	if (!block) await ctx.db.delete("transcript_files", fileId);
}

// Only a completed manifest may release abandoned attempts and their immutable input copies.
export const channel = internalMutation({
	args: { channelId: v.id("channels"), throughCreatedAt: v.number() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const destination = await ctx.db
			.query("transcript_destinations")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		const run = await ctx.db
			.query("transcript_runs")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.first();
		if (
			run &&
			run._creationTime <= args.throughCreatedAt &&
			((destination?.runId !== run._id && destination?.readerRunId !== run._id) || run.phase === "complete")
		) {
			const blocks = await ctx.db
				.query("transcript_staged_blocks")
				.withIndex("by_run_message", (q) => q.eq("runId", run._id))
				.take(20);
			for (const block of blocks) await ctx.db.delete("transcript_staged_blocks", block._id);
			if (blocks.length) {
				await ctx.scheduler.runAfter(0, internal.transcripts_cleanup.channel, args);
				return;
			}
			const inputs = await ctx.db
				.query("transcript_inputs")
				.withIndex("by_run_order", (q) => q.eq("runId", run._id))
				.take(20);
			for (const input of inputs) {
				await remove_unused_file(ctx, input.fileId);
				await ctx.db.delete("transcript_inputs", input._id);
			}
			if (inputs.length) {
				await ctx.scheduler.runAfter(0, internal.transcripts_cleanup.channel, args);
				return;
			}
			const writes = await ctx.db
				.query("transcript_writes")
				.withIndex("by_run_order", (q) => q.eq("runId", run._id))
				.take(20);
			for (const write of writes) {
				await remove_unused_file(ctx, write.fileId);
				await ctx.db.delete("transcript_writes", write._id);
			}
			if (writes.length) {
				await ctx.scheduler.runAfter(0, internal.transcripts_cleanup.channel, args);
				return;
			}
			if (destination?.runId === run._id)
				await ctx.db.patch("transcript_destinations", destination._id, { runId: null });
			await ctx.db.delete("transcript_runs", run._id);
			await ctx.scheduler.runAfter(0, internal.transcripts_cleanup.channel, args);
			return;
		}
		const state = await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		if (!state) return;
		const jobs = await ctx.db
			.query("transcript_jobs")
			.withIndex("by_channel_sequence", (q) => q.eq("channelId", args.channelId).lte("sequence", state.appliedSequence))
			.take(20);
		for (const job of jobs) await ctx.db.delete("transcript_jobs", job._id);
		if (jobs.length === 20) await ctx.scheduler.runAfter(0, internal.transcripts_cleanup.channel, args);
	},
});
