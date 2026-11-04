// TODO(migration): delete this file and `migrations.test.ts` in phase B.
//
// One-time erase of the rows that the removed reader lists left behind (commit dc18f64).
// Run it once with `convex run migrations:erase`. Each step reads one page of one table. It schedules
// itself again with the next cursor, and when its table is done it schedules the next step.
//
// It erases only transcript bookkeeping. It never touches messages, channels, members, or other chat rows.
// Transcript files that are already in Files stay there.

import { v } from "convex/values";
import { internalMutation, type MutationCtx } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { transcripts_wake } from "./transcripts_wake";

// Keep each transaction small. Transcript files and runs can hold up to about 100 KB of text each.
const BATCH = 50;
const MAX_BYTES = 4_000_000;

const cursor = v.union(v.string(), v.null());

type Step = typeof internal.migrations.erase_private_channels;

// Read the next page of this step, or start the next step when this one is done.
async function continue_with(
	ctx: MutationCtx,
	page: { isDone: boolean; continueCursor: string },
	step: Step,
	next: Step | null,
) {
	if (!page.isDone) await ctx.scheduler.runAfter(0, step, { cursor: page.continueCursor });
	else if (next) await ctx.scheduler.runAfter(0, next, { cursor: null });
	else console.log("The reader data erase is done.");
}

// Run this once. It starts the first step, and each step starts the next one.
export const erase = internalMutation({
	args: {},
	returns: v.null(),
	handler: async (ctx) => {
		await ctx.scheduler.runAfter(0, internal.migrations.erase_private_channels, { cursor: null });
		return null;
	},
});

// #region private channels

// Delete one batch of transcript rows of this private channel. Return how many rows it changed.
// 0 means the channel has no transcript rows left.
async function erase_channel_work(ctx: MutationCtx, channel: Doc<"channels">) {
	const channelId = channel._id;

	const state = await ctx.db
		.query("transcript_channels")
		.withIndex("by_channel", (q) => q.eq("channelId", channelId))
		.unique();
	if (state) {
		// Cancel the pending wake-up first, so no dispatch runs for this channel again.
		await transcripts_wake(ctx, { channelStateId: state._id }, null);
		await ctx.db.delete("transcript_channels", state._id);
		return 1;
	}

	const grants = await ctx.db
		.query("host_grants")
		.withIndex("by_channel", (q) => q.eq("channelId", channelId))
		.take(BATCH);
	for (const grant of grants) {
		await transcripts_wake(ctx, { grantId: grant._id }, null);
		await ctx.db.delete("host_grants", grant._id);
	}
	if (grants.length) return grants.length;

	// The index file may use this channel's Files connection, which is now deleted. Clear it, so the
	// index waits. The next Files connection of a public channel becomes its connection.
	const index = await ctx.db
		.query("transcript_indexes")
		.withIndex("by_installation_generation", (q) =>
			q.eq("installationId", channel.installationId).eq("generation", channel.generation),
		)
		.unique();
	if (index?.grantChannelId === channelId) {
		await ctx.db.patch("transcript_indexes", index._id, { grantChannelId: undefined });
		return 1;
	}

	const run = await ctx.db
		.query("transcript_runs")
		.withIndex("by_channel", (q) => q.eq("channelId", channelId))
		.first();
	if (run) {
		// Delete the rows of the run first, then the run.
		const staged = await ctx.db
			.query("transcript_staged_blocks")
			.withIndex("by_run_message", (q) => q.eq("runId", run._id))
			.take(BATCH);
		await Promise.all(staged.map((doc) => ctx.db.delete("transcript_staged_blocks", doc._id)));
		if (staged.length) return staged.length;
		const inputs = await ctx.db
			.query("transcript_inputs")
			.withIndex("by_run_order", (q) => q.eq("runId", run._id))
			.take(BATCH);
		await Promise.all(inputs.map((doc) => ctx.db.delete("transcript_inputs", doc._id)));
		if (inputs.length) return inputs.length;
		const writes = await ctx.db
			.query("transcript_writes")
			.withIndex("by_run_order", (q) => q.eq("runId", run._id))
			.take(BATCH);
		await Promise.all(writes.map((doc) => ctx.db.delete("transcript_writes", doc._id)));
		if (writes.length) return writes.length;
		await ctx.db.delete("transcript_runs", run._id);
		return 1;
	}

	const jobs = await ctx.db
		.query("transcript_jobs")
		.withIndex("by_channel_sequence", (q) => q.eq("channelId", channelId))
		.take(BATCH);
	await Promise.all(jobs.map((doc) => ctx.db.delete("transcript_jobs", doc._id)));
	if (jobs.length) return jobs.length;

	const destinations = await ctx.db
		.query("transcript_destinations")
		.withIndex("by_channel", (q) => q.eq("channelId", channelId))
		.take(BATCH);
	await Promise.all(destinations.map((doc) => ctx.db.delete("transcript_destinations", doc._id)));
	if (destinations.length) return destinations.length;

	const blocks = await ctx.db
		.query("transcript_blocks")
		.withIndex("by_channel_rootSequence_replySequence", (q) => q.eq("channelId", channelId))
		.take(BATCH);
	await Promise.all(blocks.map((doc) => ctx.db.delete("transcript_blocks", doc._id)));
	if (blocks.length) return blocks.length;

	const paths = await ctx.db
		.query("transcript_paths")
		.withIndex("by_channel_path", (q) => q.eq("channelId", channelId))
		.take(BATCH);
	await Promise.all(paths.map((doc) => ctx.db.delete("transcript_paths", doc._id)));
	if (paths.length) return paths.length;

	const files = await ctx.db
		.query("transcript_files")
		.withIndex("by_channel_active_order", (q) => q.eq("channelId", channelId))
		.take(BATCH);
	await Promise.all(files.map((doc) => ctx.db.delete("transcript_files", doc._id)));
	return files.length;
}

// Private channels get no transcripts now. Old private work would still run in `dispatch` and fail, so
// delete all of it. Only private channels had reader jobs and reader runs, so this deletes them too.
export const erase_private_channels = internalMutation({
	args: { cursor },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db
			.query("channels")
			.paginate({ cursor: args.cursor, numItems: BATCH, maximumBytesRead: MAX_BYTES });
		for (const channel of page.page) {
			if (channel.visibility !== "private") continue;
			// Change at most one batch per transaction. Run the same page again until all its channels are clean.
			if ((await erase_channel_work(ctx, channel)) > 0) {
				await ctx.scheduler.runAfter(0, internal.migrations.erase_private_channels, args);
				return null;
			}
		}
		await continue_with(
			ctx,
			page,
			internal.migrations.erase_private_channels,
			internal.migrations.erase_private_requests,
		);
		return null;
	},
});

// Requests have no channel index, so this step reads the whole table. No user waits for it.
export const erase_private_requests = internalMutation({
	args: { cursor },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db
			.query("transcript_requests")
			.paginate({ cursor: args.cursor, numItems: BATCH, maximumBytesRead: MAX_BYTES });
		for (const request of page.page) {
			const channel = await ctx.db.get("channels", request.channelId);
			if (channel?.visibility === "private") await ctx.db.delete("transcript_requests", request._id);
		}
		await continue_with(
			ctx,
			page,
			internal.migrations.erase_private_requests,
			internal.migrations.delete_access_changes,
		);
		return null;
	},
});

// #endregion private channels

// #region removed tables

export const delete_access_changes = internalMutation({
	args: { cursor },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db
			.query("channel_access_changes")
			.paginate({ cursor: args.cursor, numItems: BATCH, maximumBytesRead: MAX_BYTES });
		await Promise.all(page.page.map((doc) => ctx.db.delete("channel_access_changes", doc._id)));
		await continue_with(ctx, page, internal.migrations.delete_access_changes, internal.migrations.delete_deletions);
		return null;
	},
});

export const delete_deletions = internalMutation({
	args: { cursor },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db
			.query("transcript_deletions")
			.paginate({ cursor: args.cursor, numItems: BATCH, maximumBytesRead: MAX_BYTES });
		await Promise.all(page.page.map((doc) => ctx.db.delete("transcript_deletions", doc._id)));
		await continue_with(ctx, page, internal.migrations.delete_deletions, internal.migrations.strip_jobs);
		return null;
	},
});

// #endregion removed tables

// #region removed fields

export const strip_jobs = internalMutation({
	args: { cursor },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db
			.query("transcript_jobs")
			.paginate({ cursor: args.cursor, numItems: BATCH, maximumBytesRead: MAX_BYTES });
		for (const job of page.page) {
			const operation = job.operation;
			// The first step already deleted every reader job, because only private channels had them.
			// Delete any one that is left anyway, so the strict schema of phase B can deploy.
			if (operation.kind === "readers") {
				await ctx.db.delete("transcript_jobs", job._id);
				continue;
			}
			const oldHeader = operation.kind === "header" && "isPrivate" in operation;
			if (!oldHeader && job.retry === undefined && job.status !== "blocked") continue;
			await ctx.db.patch("transcript_jobs", job._id, {
				...(oldHeader ? { operation: { kind: "header" as const, name: operation.name, topic: operation.topic } } : {}),
				retry: undefined,
				// Only reader jobs could be "blocked", so none should be left. The new code keeps failures on the
				// channel state, not on the job, and a claimed job is "running". So "running" is the safe value.
				...(job.status === "blocked" ? { status: "running" as const } : {}),
			});
		}
		await continue_with(ctx, page, internal.migrations.strip_jobs, internal.migrations.strip_runs);
		return null;
	},
});

export const strip_runs = internalMutation({
	args: { cursor },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db
			.query("transcript_runs")
			.paginate({ cursor: args.cursor, numItems: BATCH, maximumBytesRead: MAX_BYTES });
		for (const run of page.page) {
			// Like reader jobs, reader runs belonged only to private channels. Delete any one that is left.
			if (run.kind === "readers") {
				await ctx.db.delete("transcript_runs", run._id);
				continue;
			}
			const fields = [
				run.readerReceiptId,
				run.readerOriginalReceiptId,
				run.readerSourceSecret,
				run.readerRollbackSecret,
				run.readerAttempt,
				run.readerRefresh,
				run.readerStep,
				run.readerSnapshot,
			];
			if (fields.every((field) => field === undefined)) continue;
			await ctx.db.patch("transcript_runs", run._id, {
				readerReceiptId: undefined,
				readerOriginalReceiptId: undefined,
				readerSourceSecret: undefined,
				readerRollbackSecret: undefined,
				readerAttempt: undefined,
				readerRefresh: undefined,
				readerStep: undefined,
				readerSnapshot: undefined,
			});
		}
		await continue_with(ctx, page, internal.migrations.strip_runs, internal.migrations.strip_destinations);
		return null;
	},
});

export const strip_destinations = internalMutation({
	args: { cursor },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db
			.query("transcript_destinations")
			.paginate({ cursor: args.cursor, numItems: BATCH, maximumBytesRead: MAX_BYTES });
		for (const destination of page.page) {
			const fields = [
				destination.readerRevision,
				destination.detached,
				destination.readerRunId,
				destination.readerError,
				destination.readerErrorCode,
			];
			if (fields.every((field) => field === undefined)) continue;
			await ctx.db.patch("transcript_destinations", destination._id, {
				readerRevision: undefined,
				detached: undefined,
				readerRunId: undefined,
				readerError: undefined,
				readerErrorCode: undefined,
			});
		}
		await continue_with(ctx, page, internal.migrations.strip_destinations, internal.migrations.strip_channel_states);
		return null;
	},
});

export const strip_channel_states = internalMutation({
	args: { cursor },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db
			.query("transcript_channels")
			.paginate({ cursor: args.cursor, numItems: BATCH, maximumBytesRead: MAX_BYTES });
		for (const state of page.page)
			if (state.readerRevision !== undefined)
				await ctx.db.patch("transcript_channels", state._id, { readerRevision: undefined });
		await continue_with(ctx, page, internal.migrations.strip_channel_states, internal.migrations.strip_writes);
		return null;
	},
});

export const strip_writes = internalMutation({
	args: { cursor },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db
			.query("transcript_writes")
			.paginate({ cursor: args.cursor, numItems: BATCH, maximumBytesRead: MAX_BYTES });
		for (const write of page.page)
			if (write.expectedReaderRevision !== undefined)
				await ctx.db.patch("transcript_writes", write._id, { expectedReaderRevision: undefined });
		await continue_with(ctx, page, internal.migrations.strip_writes, internal.migrations.strip_request_results);
		return null;
	},
});

export const strip_request_results = internalMutation({
	args: { cursor },
	returns: v.null(),
	handler: async (ctx, args) => {
		const page = await ctx.db
			.query("request_results")
			.paginate({ cursor: args.cursor, numItems: BATCH, maximumBytesRead: MAX_BYTES });
		for (const request of page.page) {
			const result = request.result;
			if (result.kind !== "membership" || !("pending" in result)) continue;
			const { pending: _pending, ...rest } = result;
			await ctx.db.patch("request_results", request._id, { result: rest });
		}
		await continue_with(ctx, page, internal.migrations.strip_request_results, null);
		return null;
	},
});

// #endregion removed fields
