import { ConvexError, v } from "convex/values";
import { doc } from "convex-helpers/validators";
import { internalAction, internalMutation, type MutationCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import schema from "./schema";
import {
	chatbe_readme_markdown,
	chatbe_sha256_hex,
	chatbe_utf8_byte_size,
	chatbe_ROLLOVER_MAX_BYTES,
} from "../shared/transcript-markdown";
import { transcripts_get_token, transcripts_host_post, transcripts_host_scope } from "./transcripts_grants";
import { transcripts_get_error_message, transcripts_prepared, transcripts_receipt } from "./transcripts_worker";

async function create_run(ctx: MutationCtx, index: Doc<"transcript_indexes">, reconcile: boolean) {
	const runId = await ctx.db.insert("transcript_index_runs", {
		indexId: index._id,
		grantChannelId: index.grantChannelId!,
		barrier: index.desiredSequence,
		phase: reconcile ? "fence" : "fold",
		reconcile,
		reconcileAfterPublish: false,
		cursor: null,
		entries: [],
		content: "",
		leaseUntil: 0,
		retryAt: 0,
		failures: 0,
		claim: "",
		expectedNodeId: null,
		expectedContentRevision: null,
		prepared: false,
		writerId: index.writerId ?? "",
		writerGeneration: index.writerGeneration,
		parentNodeId: index.parentNodeId ?? "",
	});
	await ctx.db.patch("transcript_indexes", index._id, { activeRunId: runId });
	return (await ctx.db.get("transcript_index_runs", runId))!;
}

async function active_run(ctx: MutationCtx, args: { runId: Id<"transcript_index_runs">; claim: string }) {
	const run = await ctx.db.get("transcript_index_runs", args.runId);
	if (!run || run.phase === "complete" || run.claim !== args.claim || run.leaseUntil <= Date.now()) return null;
	const index = (await ctx.db.get("transcript_indexes", run.indexId))!;
	return index.activeRunId === run._id ? { run, index } : null;
}

// The caller checks channel management. Press checks the Files sponsor on every host operation.
export async function transcripts_index_request(
	ctx: MutationCtx,
	args: { indexId: Id<"transcript_indexes">; reconcile: boolean },
) {
	const index = await ctx.db.get("transcript_indexes", args.indexId);
	if (!index?.grantChannelId) return;
	const current = index.activeRunId ? await ctx.db.get("transcript_index_runs", index.activeRunId) : null;
	if (!args.reconcile && !current && index.nodeId && index.appliedSequence >= index.desiredSequence) return;
	if (args.reconcile && index.nodeId && (!current?.reconcile || current.prepared)) {
		// A new host generation stops even an old HTTP write that has not finalized yet.
		await create_run(ctx, index, true);
	} else if (current) {
		if (args.reconcile && !index.nodeId && current.prepared) {
			// Recover the first write's receipt before fencing. Its file id is not known yet.
			await ctx.db.patch("transcript_index_runs", current._id, { reconcileAfterPublish: true });
		}
		const canRestart = !current.prepared && current.phase !== "fence";
		await ctx.db.patch("transcript_index_runs", current._id, {
			grantChannelId: index.grantChannelId,
			claim: "",
			leaseUntil: 0,
			retryAt: 0,
			failures: 0,
			...(canRestart
				? { barrier: index.desiredSequence, phase: "fold" as const, cursor: null, entries: [], content: "" }
				: {}),
		});
	}
	await ctx.db.patch("transcript_indexes", index._id, { status: "pending", error: null });
	await ctx.scheduler.runAfter(0, internal.transcripts_index.run, { indexId: index._id });
}

export const claim = internalMutation({
	args: { indexId: v.id("transcript_indexes") },
	returns: v.union(doc(schema, "transcript_index_runs"), v.null()),
	handler: async (ctx, args) => {
		const index = await ctx.db.get("transcript_indexes", args.indexId);
		if (!index?.grantChannelId || index.status === "blocked") return null;
		let run = index.activeRunId ? await ctx.db.get("transcript_index_runs", index.activeRunId) : null;
		if (run && (run.leaseUntil > Date.now() || run.retryAt > Date.now())) return null;
		if (!run) {
			if (index.nodeId && index.appliedSequence >= index.desiredSequence) return null;
			run = await create_run(ctx, index, false);
		}
		const claim = crypto.randomUUID();
		const leaseUntil = Date.now() + 60_000;
		await ctx.db.patch("transcript_index_runs", run._id, { claim, leaseUntil });
		await ctx.db.patch("transcript_indexes", index._id, { status: "running", error: null });
		return { ...run, claim, leaseUntil };
	},
});

export const step = internalMutation({
	args: { runId: v.id("transcript_index_runs"), claim: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await active_run(ctx, args);
		if (!current) return;
		const { run, index } = current;
		if (run.phase === "fold") {
			const jobs = await ctx.db
				.query("transcript_index_jobs")
				.withIndex("by_index_sequence", (q) =>
					q.eq("indexId", index._id).gt("sequence", index.foldedSequence).lte("sequence", run.barrier),
				)
				.take(20);
			let entryBytes = index.entryBytes;
			let entryCount = index.entryCount;
			// One channel may occur several times in this page, so apply jobs in sequence.
			for (const job of jobs) {
				const entry = await ctx.db
					.query("transcript_index_entries")
					.withIndex("by_index_channel", (q) => q.eq("indexId", index._id).eq("channelId", job.channelId))
					.unique();
				if (entry) {
					entryBytes -= chatbe_utf8_byte_size(`\n- [${entry.name}](./${entry.slug}.md)`);
					entryCount--;
				}
				if (job.active) {
					const value = { indexId: index._id, channelId: job.channelId, name: job.name, slug: job.slug };
					if (entry) await ctx.db.replace("transcript_index_entries", entry._id, value);
					else await ctx.db.insert("transcript_index_entries", value);
					entryBytes += chatbe_utf8_byte_size(`\n- [${job.name}](./${job.slug}.md)`);
					entryCount++;
				} else if (entry) await ctx.db.delete("transcript_index_entries", entry._id);
			}
			const foldedSequence = jobs.at(-1)?.sequence ?? index.foldedSequence;
			await ctx.db.patch("transcript_indexes", index._id, { foldedSequence, entryBytes, entryCount });
			if (foldedSequence >= run.barrier) await ctx.db.patch("transcript_index_runs", run._id, { phase: "render" });
		} else if (run.phase === "render") {
			const size =
				chatbe_utf8_byte_size(chatbe_readme_markdown([])) +
				(index.entryCount ? chatbe_utf8_byte_size("\n\n## Channels\n") : 0) +
				index.entryBytes;
			if (size > chatbe_ROLLOVER_MAX_BYTES)
				throw new ConvexError(
					"The complete channel index exceeds 100,000 bytes. Archive channels or shorten their names, then retry. Channel transcript sync can continue.",
				);
			const page = await ctx.db
				.query("transcript_index_entries")
				.withIndex("by_index", (q) => q.eq("indexId", index._id))
				.paginate({ cursor: run.cursor, numItems: 50, maximumRowsRead: 50, maximumBytesRead: 100_000 });
			const entries = [...run.entries, ...page.page.map(({ name, slug }) => ({ name, slug }))];
			// The full Markdown guard bounds this staging array. Sorting once preserves localeCompare.
			await ctx.db.patch("transcript_index_runs", run._id, {
				entries: page.isDone ? [] : entries,
				content: page.isDone ? chatbe_readme_markdown(entries) : "",
				cursor: page.isDone ? null : page.continueCursor,
				phase: page.isDone ? "publish" : "render",
			});
		}
	},
});

export const fenced = internalMutation({
	args: {
		runId: v.id("transcript_index_runs"),
		claim: v.string(),
		operationId: v.string(),
		writerGeneration: v.number(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await active_run(ctx, args);
		if (!current) return;
		const { run, index } = current;
		if (
			run.phase !== "fence" ||
			args.operationId !== `${run._id}:fence` ||
			args.writerGeneration !== run.writerGeneration + 1
		)
			throw new Error("Press returned a different README fence receipt.");
		await ctx.db.patch("transcript_indexes", index._id, { writerGeneration: args.writerGeneration });
		await ctx.db.patch("transcript_index_runs", run._id, { writerGeneration: args.writerGeneration, phase: "fold" });
	},
});

export const prepared = internalMutation({
	args: {
		runId: v.id("transcript_index_runs"),
		claim: v.string(),
		writerId: v.string(),
		writerGeneration: v.number(),
		parentNodeId: v.string(),
		expectedNodeId: v.union(v.string(), v.null()),
		expectedContentRevision: v.union(v.string(), v.null()),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await active_run(ctx, args);
		if (!current) return;
		const { run, index } = current;
		if (run.phase !== "publish" || run.prepared) return;
		if (
			index.writerId &&
			(args.writerId !== index.writerId ||
				args.parentNodeId !== index.parentNodeId ||
				args.writerGeneration !== index.writerGeneration)
		)
			throw new ConvexError("The README destination changed. Its saved path cannot be adopted.");
		if (args.expectedNodeId !== index.nodeId)
			throw new ConvexError(
				"The README path contains a different file. Move it away or restore the original file, then retry.",
			);
		if (!run.reconcile && args.expectedContentRevision !== index.contentRevision)
			throw new ConvexError("The README text changed in Files. Rebuild transcripts to replace these edits.");
		const { runId: _run, claim: _claim, ...prepared } = args;
		await ctx.db.patch("transcript_index_runs", run._id, { ...prepared, prepared: true });
		await ctx.db.patch("transcript_indexes", index._id, {
			writerId: args.writerId,
			writerGeneration: args.writerGeneration,
			parentNodeId: args.parentNodeId,
		});
	},
});

export const release = internalMutation({
	args: {
		runId: v.id("transcript_index_runs"),
		claim: v.string(),
		error: v.union(v.string(), v.null()),
		retryable: v.boolean(),
		receipt: v.union(
			v.null(),
			v.object({
				operationId: v.string(),
				writerGeneration: v.number(),
				nodeId: v.union(v.string(), v.null()),
				contentRevision: v.union(v.string(), v.null()),
			}),
		),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await active_run(ctx, args);
		if (!current) return;
		const { run, index } = current;
		if (args.receipt) {
			const receipt = args.receipt;
			if (
				run.phase !== "publish" ||
				!run.prepared ||
				receipt.operationId !== `${run._id}:readme` ||
				receipt.writerGeneration !== run.writerGeneration ||
				!receipt.nodeId ||
				!receipt.contentRevision ||
				(run.expectedNodeId !== null && receipt.nodeId !== run.expectedNodeId)
			)
				throw new Error("Press returned a different README write receipt.");
			await ctx.db.patch("transcript_index_runs", run._id, {
				phase: "complete",
				leaseUntil: 0,
				entries: [],
				content: "",
			});
			await ctx.db.patch("transcript_indexes", index._id, {
				activeRunId: null,
				nodeId: receipt.nodeId,
				contentRevision: receipt.contentRevision,
				appliedSequence: run.barrier,
				status: run.barrier >= index.desiredSequence ? "ready" : "pending",
				error: null,
			});
			await ctx.scheduler.runAfter(0, internal.transcripts_index.cleanup, {
				indexId: index._id,
				throughCreatedAt: run._creationTime,
			});
			if (run.reconcileAfterPublish) await transcripts_index_request(ctx, { indexId: index._id, reconcile: true });
			else if (run.barrier < index.desiredSequence)
				await ctx.scheduler.runAfter(0, internal.transcripts_index.run, { indexId: index._id });
			return;
		}
		const delay = args.error && args.retryable ? Math.min(60_000, 1000 * 2 ** Math.min(run.failures, 6)) : 0;
		await ctx.db.patch("transcript_index_runs", run._id, {
			leaseUntil: 0,
			retryAt: Date.now() + delay,
			failures: args.error ? run.failures + 1 : 0,
		});
		await ctx.db.patch("transcript_indexes", index._id, {
			status: args.error && !args.retryable ? "blocked" : "pending",
			error: args.error,
		});
		if (!args.error || args.retryable)
			await ctx.scheduler.runAfter(delay, internal.transcripts_index.run, { indexId: index._id });
	},
});

export const cleanup = internalMutation({
	args: { indexId: v.id("transcript_indexes"), throughCreatedAt: v.number() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const index = await ctx.db.get("transcript_indexes", args.indexId);
		if (!index) return;
		const jobs = await ctx.db
			.query("transcript_index_jobs")
			.withIndex("by_index_sequence", (q) => q.eq("indexId", index._id).lte("sequence", index.appliedSequence))
			.take(50);
		const runs = await ctx.db
			.query("transcript_index_runs")
			.withIndex("by_index", (q) => q.eq("indexId", index._id).lte("_creationTime", args.throughCreatedAt))
			.take(21);
		await Promise.all(jobs.map((job) => ctx.db.delete("transcript_index_jobs", job._id)));
		await Promise.all(
			runs.filter((run) => run._id !== index.activeRunId).map((run) => ctx.db.delete("transcript_index_runs", run._id)),
		);
		if (jobs.length === 50 || runs.length === 21)
			await ctx.scheduler.runAfter(0, internal.transcripts_index.cleanup, args);
	},
});

export const run = internalAction({
	args: { indexId: v.id("transcript_indexes") },
	returns: v.null(),
	handler: async (ctx, args): Promise<void> => {
		const run = await ctx.runMutation(internal.transcripts_index.claim, args);
		if (!run) return;
		const checkpoint = { runId: run._id, claim: run.claim };
		try {
			let receipt = null;
			if (run.phase === "fold" || run.phase === "render")
				await ctx.runMutation(internal.transcripts_index.step, checkpoint);
			else {
				const { token, grant, installation } = await transcripts_get_token(ctx, run.grantChannelId);
				const path = `${grant.rootPath}/README.md`;
				if (run.phase === "fence") {
					const fenced = await transcripts_host_post(
						"/api/internal/plugins/files/fence",
						{
							writerId: run.writerId,
							operationId: `${run._id}:fence`,
							writerGeneration: run.writerGeneration,
							nextGeneration: run.writerGeneration + 1,
						},
						token,
						transcripts_receipt,
					);
					await ctx.runMutation(internal.transcripts_index.fenced, {
						...checkpoint,
						operationId: fenced.operationId,
						writerGeneration: fenced.writerGeneration,
					});
				} else if (run.phase === "publish" && !run.prepared) {
					const root = await transcripts_host_post(
						"/api/internal/plugins/files/ensure",
						{
							datasetGeneration: installation.generation,
							channelId: "__root",
							rootPath: grant.rootPath,
							path: grant.rootPath,
							readOnly: true,
						},
						token,
						transcripts_host_scope,
					);
					const prepared = await transcripts_host_post(
						"/api/internal/plugins/files/prepare",
						{ writerId: root.writerId, path },
						token,
						transcripts_prepared,
					);
					if (
						root.folderNodeId !== prepared.expectedParentNodeId ||
						root.writerGeneration !== prepared.writerGeneration
					)
						throw new Error("The README destination changed while preparing its write. Retry Files sync.");
					await ctx.runMutation(internal.transcripts_index.prepared, {
						...checkpoint,
						writerId: root.writerId,
						writerGeneration: prepared.writerGeneration,
						parentNodeId: prepared.expectedParentNodeId,
						expectedNodeId: prepared.nodeId,
						expectedContentRevision: prepared.contentRevision,
					});
				} else if (run.phase === "publish") {
					const saved = await transcripts_host_post(
						"/api/internal/plugins/files/write",
						{
							writerId: run.writerId,
							path,
							operationId: `${run._id}:readme`,
							writerGeneration: run.writerGeneration,
							sequence: run.barrier + 1,
							expectedParentNodeId: run.parentNodeId,
							expectedNodeId: run.expectedNodeId,
							expectedContentRevision: run.expectedContentRevision,
							expectedReaderRevision: null,
							content: run.content,
							contentHash: await chatbe_sha256_hex(run.content),
						},
						token,
						transcripts_receipt,
					);
					receipt = {
						operationId: saved.operationId,
						writerGeneration: saved.writerGeneration,
						nodeId: saved.nodeId,
						contentRevision: saved.contentRevision,
					};
				}
			}
			await ctx.runMutation(internal.transcripts_index.release, {
				...checkpoint,
				receipt,
				error: null,
				retryable: false,
			});
		} catch (error) {
			const message = transcripts_get_error_message(error, "The channel index could not be saved.");
			await ctx.runMutation(internal.transcripts_index.release, {
				...checkpoint,
				receipt: null,
				retryable: error instanceof TypeError || /timeout|timed out|temporarily|\(5\d\d\)|\(429\)/i.test(message),
				error: message,
			});
		}
	},
});
