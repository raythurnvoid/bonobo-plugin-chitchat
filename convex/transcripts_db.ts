import { ConvexError, v } from "convex/values";
import { doc } from "convex-helpers/validators";
import { internalMutation, internalQuery, type MutationCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import {
	chatbe_channel_header,
	chatbe_sha256_hex,
	chatbe_utf8_byte_size,
	chatbe_ROLLOVER_MAX_BYTES,
} from "../shared/transcript-markdown";
import schema from "./schema";
import { transcripts_next_retry, transcripts_retry_delay, transcripts_wake } from "./transcripts_wake";
import { chat_transcript_error_code } from "../shared/chat";

async function current_run(ctx: MutationCtx, runId: Id<"transcript_runs">, claim: string) {
	const run = await ctx.db.get("transcript_runs", runId);
	if (!run || run.claim !== claim || run.leaseUntil <= Date.now()) return null;
	const destination = await ctx.db
		.query("transcript_destinations")
		.withIndex("by_channel", (q) => q.eq("channelId", run.channelId))
		.unique();
	if (!destination || destination.runId !== run._id) return null;
	return { run, destination };
}

// #region run claims

// Claims run inside the dispatcher mutation. Each returns the claimed run, the time when it can claim
// again (a gate), or null when it has no work now. Work that waits for another step gets woken by that step.
export async function transcripts_db_claim(ctx: MutationCtx, channelId: Id<"channels">) {
	const channel = await ctx.db.get("channels", channelId);
	const destination = await ctx.db
		.query("transcript_destinations")
		.withIndex("by_channel", (q) => q.eq("channelId", channelId))
		.unique();
	const state = await ctx.db
		.query("transcript_channels")
		.withIndex("by_channel", (q) => q.eq("channelId", channelId))
		.unique();
	if (!channel || !destination || !state) return null;
	let run = destination.runId ? await ctx.db.get("transcript_runs", destination.runId) : null;
	if (state.status === "blocked") return null;
	if (state.nextAttemptAt > Date.now()) return state.nextAttemptAt;
	if (run && run.phase !== "complete" && run.leaseUntil > Date.now()) return run.leaseUntil;
	if (!run || run.phase === "complete") {
		if (state.appliedSequence >= state.desiredSequence) return null;
		const job = await ctx.db
			.query("transcript_jobs")
			.withIndex("by_channel_sequence", (q) => q.eq("channelId", channel._id).eq("sequence", state.appliedSequence + 1))
			.unique();
		if (!job) throw new Error("The next transcript operation is missing.");
		let startOrder = destination.tailOrder;
		if (job.operation.kind === "block") {
			const operation = job.operation;
			const existing = await ctx.db
				.query("transcript_blocks")
				.withIndex("by_message", (q) => q.eq("messageId", operation.messageId))
				.unique();
			let fileId = existing?.fileId;
			if (!existing && job.operation.replySequence > 0) {
				const { rootSequence, replySequence } = job.operation;
				const previous = await ctx.db
					.query("transcript_blocks")
					.withIndex("by_channel_rootSequence_replySequence", (q) =>
						q.eq("channelId", channel._id).eq("rootSequence", rootSequence).lt("replySequence", replySequence),
					)
					.order("desc")
					.first();
				if (!previous) throw new Error("The reply's transcript root is missing.");
				fileId = previous.fileId;
			}
			if (fileId) startOrder = (await ctx.db.get("transcript_files", fileId))!.order;
		}
		const runId = await ctx.db.insert("transcript_runs", {
			channelId: channel._id,
			recoveryRunId: null,
			barrier: job.sequence,
			kind: "incremental",
			fenceUncertain: false,
			phase: "copy",
			writerGeneration: destination.writerGeneration,
			leaseUntil: 0,
			claim: "",
			startOrder,
			endOrder: startOrder,
			cursor: null,
			foldedSequence: state.appliedSequence,
			header: destination.header,
			outputOrder: startOrder,
			buffer: "",
			outputCount: 0,
			error: null,
			createdAt: Date.now(),
		});
		run = (await ctx.db.get("transcript_runs", runId))!;
		await ctx.db.patch("transcript_destinations", destination._id, { runId });
		await ctx.db.patch("transcript_jobs", job._id, {
			status: "running",
			attempts: job.attempts + 1,
			workerGeneration: state.workerGeneration,
		});
	}
	const claim = crypto.randomUUID();
	const leaseUntil = Date.now() + 60_000;
	await ctx.db.patch("transcript_runs", run._id, { claim, leaseUntil });
	await ctx.db.patch("transcript_channels", state._id, {
		status: "running",
		error: null,
		errorCode: undefined,
		nextAttemptAt: leaseUntil,
	});
	return { runId: run._id, claim, leaseUntil };
}

// Load what the action needs for a claim that the dispatcher made. A stale or expired claim loads nothing.
export const claimed = internalQuery({
	args: { runId: v.id("transcript_runs"), claim: v.string() },
	returns: v.union(
		v.null(),
		v.object({
			channel: doc(schema, "channels"),
			destination: doc(schema, "transcript_destinations"),
			job: v.union(doc(schema, "transcript_jobs"), v.null()),
			run: doc(schema, "transcript_runs"),
		}),
	),
	handler: async (ctx, args) => {
		const run = await ctx.db.get("transcript_runs", args.runId);
		if (!run || run.claim !== args.claim || run.leaseUntil <= Date.now()) return null;
		const channel = await ctx.db.get("channels", run.channelId);
		const destination = await ctx.db
			.query("transcript_destinations")
			.withIndex("by_channel", (q) => q.eq("channelId", run.channelId))
			.unique();
		if (!channel || !destination) return null;
		// An incremental run works on the one job at its barrier. A rebuild folds many jobs.
		const job =
			run.kind !== "reconcile"
				? await ctx.db
						.query("transcript_jobs")
						.withIndex("by_channel_sequence", (q) => q.eq("channelId", channel._id).eq("sequence", run.barrier))
						.unique()
				: null;
		return { channel, destination, job, run };
	},
});

export const release = internalMutation({
	args: {
		runId: v.id("transcript_runs"),
		claim: v.string(),
		error: v.union(v.string(), v.null()),
		errorCode: v.union(chat_transcript_error_code, v.null()),
		retryAfterMs: v.union(v.number(), v.null()),
		definiteRefusal: v.boolean(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const state = (await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", current.run.channelId))
			.unique())!;
		const retry = transcripts_next_retry(state.retry, args.errorCode);
		const nextAttemptAt = Date.now() + (retry ? transcripts_retry_delay(retry.failures, args.retryAfterMs) : 0);
		await ctx.db.patch("transcript_runs", current.run._id, {
			leaseUntil: 0,
			error: args.error,
			// An unsent call or a first-attempt refusal cannot have advanced Bonobo Senate.
			...(current.run.phase === "fence" && (!current.run.fenceUncertain || args.definiteRefusal)
				? { claim: "", fenceUncertain: false }
				: {}),
		});
		await ctx.db.patch("transcript_channels", state._id, {
			status: args.error
				? retry
					? "pending"
					: "blocked"
				: current.run.phase === "complete" && state.appliedSequence >= state.desiredSequence
					? "ready"
					: "pending",
			error: args.error,
			errorCode: args.errorCode ?? undefined,
			retry,
			nextAttemptAt,
		});
		// The dispatcher checks every gate again. A blocked file run then arms nothing for itself.
		await transcripts_wake(ctx, { channelStateId: state._id }, nextAttemptAt);
	},
});

export const advance = internalMutation({
	args: {
		runId: v.id("transcript_runs"),
		claim: v.string(),
		phase: v.union(
			v.literal("fence"),
			v.literal("copy"),
			v.literal("fold"),
			v.literal("stage"),
			v.literal("prepare"),
			v.literal("validate"),
			v.literal("publish"),
			v.literal("archive"),
			v.literal("place"),
			v.literal("finish"),
		),
		cursor: v.union(v.string(), v.null()),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		await ctx.db.patch("transcript_runs", current.run._id, {
			phase: args.phase,
			cursor: args.cursor,
			...(current.run.phase === "fence" ? { fenceUncertain: false } : {}),
		});
		if (current.run.phase === "fence")
			await ctx.db.patch("transcript_destinations", current.destination._id, {
				writerGeneration: current.run.writerGeneration,
			});
	},
});

export const mark_fence_sent = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string() },
	returns: v.boolean(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current || current.run.phase !== "fence") return false;
		await ctx.db.patch("transcript_runs", current.run._id, { fenceUncertain: true });
		return true;
	},
});

// #endregion run claims

// #region source snapshots

export const copy_file = internalQuery({
	args: { runId: v.id("transcript_runs") },
	returns: v.union(
		v.null(),
		v.object({ file: doc(schema, "transcript_files"), blocks: v.array(doc(schema, "transcript_blocks")) }),
	),
	handler: async (ctx, args) => {
		const run = (await ctx.db.get("transcript_runs", args.runId))!;
		const file = await ctx.db
			.query("transcript_files")
			.withIndex("by_channel_active_order", (q) =>
				q
					.eq("channelId", run.channelId)
					.eq("active", true)
					.gte("order", run.cursor === null ? run.startOrder : Number(run.cursor) + 1)
					.lte("order", run.endOrder),
			)
			.first();
		if (!file) return null;
		const blocks = await ctx.db
			.query("transcript_blocks")
			.withIndex("by_file_start", (q) => q.eq("fileId", file._id))
			.take(2048);
		return { file, blocks };
	},
});

export const save_input = internalMutation({
	args: {
		runId: v.id("transcript_runs"),
		claim: v.string(),
		fileId: v.id("transcript_files"),
		content: v.string(),
		contentRevision: v.string(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const file = (await ctx.db.get("transcript_files", args.fileId))!;
		const blocks = await ctx.db
			.query("transcript_blocks")
			.withIndex("by_file_start", (q) => q.eq("fileId", file._id))
			.take(2048);
		let position = 0;
		if (file.header && args.content.startsWith(file.header)) position = file.header.length;
		else if (file.header) throw new ConvexError("The transcript header changed. Rebuild the Files copy to replace it.");
		for (const block of blocks) {
			let start = block.start;
			if (args.content !== file.content) {
				start = args.content.indexOf(block.text);
				if (start < position || args.content.indexOf(block.text, start + 1) !== -1)
					throw new ConvexError("A transcript block is missing or repeated. Rebuild the Files copy to replace it.");
			}
			if (start < position || args.content.slice(start, start + block.text.length) !== block.text)
				throw new ConvexError("The transcript block changed. Rebuild the Files copy to replace it.");
			await ctx.db.insert("transcript_staged_blocks", {
				runId: current.run._id,
				messageId: block.messageId,
				rootSequence: block.rootSequence,
				replySequence: block.replySequence,
				text: block.text,
				sourceRevision: block.sourceRevision,
				prefix: args.content.slice(position, start),
				suffix: "",
				outputOrder: null,
				start: 0,
				end: 0,
				placed: false,
			});
			position = start + block.text.length;
		}
		const tail = args.content.slice(position);
		if (blocks.length > 0 && tail) {
			const last = await ctx.db
				.query("transcript_staged_blocks")
				.withIndex("by_run_message", (q) => q.eq("runId", current.run._id).eq("messageId", blocks.at(-1)!.messageId))
				.unique();
			await ctx.db.patch("transcript_staged_blocks", last!._id, { suffix: tail });
		}
		await ctx.db.insert("transcript_inputs", {
			runId: current.run._id,
			fileId: file._id,
			order: file.order,
			path: file.path,
			nodeId: file.nodeId,
			contentRevision: args.contentRevision,
			tail: blocks.length ? "" : tail,
			archived: false,
		});
		await ctx.db.patch("transcript_runs", current.run._id, {
			cursor: String(file.order),
			...(blocks.length === 0 ? { buffer: current.run.buffer + tail } : {}),
		});
	},
});

export const copy_reconcile = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const page = await ctx.db
			.query("transcript_blocks")
			.withIndex("by_channel_rootSequence_replySequence", (q) => q.eq("channelId", current.run.channelId))
			.paginate({ cursor: current.run.cursor, numItems: 20, maximumRowsRead: 20, maximumBytesRead: 700_000 });
		for (const block of page.page)
			await ctx.db.insert("transcript_staged_blocks", {
				runId: current.run._id,
				messageId: block.messageId,
				rootSequence: block.rootSequence,
				replySequence: block.replySequence,
				text: block.text,
				prefix: "\n\n",
				suffix: "",
				sourceRevision: block.sourceRevision,
				outputOrder: null,
				start: 0,
				end: 0,
				placed: false,
			});
		await ctx.db.patch("transcript_runs", current.run._id, {
			cursor: page.isDone ? null : page.continueCursor,
			phase: page.isDone ? "fold" : "copy",
		});
	},
});

export const fold = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const { run, destination } = current;
		const jobs = await ctx.db
			.query("transcript_jobs")
			.withIndex("by_channel_sequence", (q) =>
				q.eq("channelId", run.channelId).gt("sequence", run.foldedSequence).lte("sequence", run.barrier),
			)
			.take(20);
		let header = run.header;
		let foldedSequence = run.foldedSequence;
		for (const job of jobs) {
			const operation = job.operation;
			if (operation.kind === "block") {
				const existing = await ctx.db
					.query("transcript_staged_blocks")
					.withIndex("by_run_message", (q) => q.eq("runId", run._id).eq("messageId", operation.messageId))
					.unique();
				if (existing)
					await ctx.db.patch("transcript_staged_blocks", existing._id, {
						text: operation.renderedBlock,
						sourceRevision: operation.sourceRevision,
					});
				else
					await ctx.db.insert("transcript_staged_blocks", {
						runId: run._id,
						messageId: operation.messageId,
						rootSequence: operation.rootSequence,
						replySequence: operation.replySequence,
						text: operation.renderedBlock,
						prefix: "\n\n",
						suffix: "",
						sourceRevision: operation.sourceRevision,
						outputOrder: null,
						start: 0,
						end: 0,
						placed: false,
					});
			} else if (operation.kind === "header") header = chatbe_channel_header(operation.name, operation.topic);
			foldedSequence = job.sequence;
		}
		if (foldedSequence < run.barrier) {
			await ctx.db.patch("transcript_runs", run._id, { foldedSequence, header });
			return;
		}
		// Only an overflowing old part pulls later parts into this attempt.
		if (run.kind === "incremental" && run.endOrder < destination.tailOrder) {
			const blocks = await ctx.db
				.query("transcript_staged_blocks")
				.withIndex("by_run_rootSequence_replySequence", (q) => q.eq("runId", run._id))
				.take(2048);
			const bytes =
				chatbe_utf8_byte_size(header) +
				blocks.reduce((sum, block) => sum + chatbe_utf8_byte_size(block.prefix + block.text + block.suffix), 0);
			if (bytes > chatbe_ROLLOVER_MAX_BYTES) {
				await ctx.db.patch("transcript_runs", run._id, {
					foldedSequence,
					header,
					phase: "copy",
					endOrder: destination.tailOrder,
				});
				return;
			}
		}
		await ctx.db.patch("transcript_runs", run._id, {
			foldedSequence,
			header,
			phase: "stage",
			cursor: null,
			buffer: header + run.buffer,
		});
	},
});

// #endregion source snapshots

// #region output staging

async function save_output(ctx: MutationCtx, run: Doc<"transcript_runs">, order: number, content: string) {
	if (chatbe_utf8_byte_size(content) > chatbe_ROLLOVER_MAX_BYTES)
		throw new ConvexError("This transcript part exceeds 100,000 bytes.");
	await ctx.db.insert("transcript_writes", {
		runId: run._id,
		order,
		path: "",
		content,
		contentHash: await chatbe_sha256_hex(content),
		expectedParentNodeId: "",
		expectedNodeId: null,
		expectedContentRevision: null,
		operationId: `${run._id}:write:${order}`,
		nodeId: null,
		contentRevision: null,
		fileId: null,
		status: "staged",
	});
}

export const stage = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const { run } = current;
		const page = await ctx.db
			.query("transcript_staged_blocks")
			.withIndex("by_run_rootSequence_replySequence", (q) => q.eq("runId", run._id))
			.paginate({ cursor: run.cursor, numItems: 20, maximumRowsRead: 20, maximumBytesRead: 700_000 });
		let buffer = run.buffer;
		let order = run.outputOrder;
		let outputCount = run.outputCount;
		for (const block of page.page) {
			const text = block.prefix + block.text + block.suffix;
			if (chatbe_utf8_byte_size(buffer + text) > chatbe_ROLLOVER_MAX_BYTES) {
				if (buffer === run.header) throw new ConvexError("One transcript block exceeds the file size limit.");
				await save_output(ctx, run, order, buffer);
				outputCount++;
				order++;
				buffer = run.header;
			}
			const start = buffer.length + block.prefix.length;
			buffer += text;
			await ctx.db.patch("transcript_staged_blocks", block._id, {
				outputOrder: order,
				start,
				end: start + block.text.length,
			});
		}
		if (page.isDone) {
			await save_output(ctx, run, order, buffer);
			outputCount++;
		}
		await ctx.db.patch("transcript_runs", run._id, {
			buffer: page.isDone ? "" : buffer,
			outputOrder: order,
			outputCount,
			cursor: page.isDone ? null : page.continueCursor,
			phase: page.isDone ? "prepare" : "stage",
		});
	},
});

export const recovery_run = internalQuery({
	args: { runId: v.id("transcript_runs") },
	returns: v.union(doc(schema, "transcript_runs"), v.null()),
	handler: async (ctx, args) => {
		const run = await ctx.db.get("transcript_runs", args.runId);
		return run?.recoveryRunId ? await ctx.db.get("transcript_runs", run.recoveryRunId) : null;
	},
});

export const next_write = internalQuery({
	args: { runId: v.id("transcript_runs"), status: v.union(v.literal("staged"), v.literal("prepared")) },
	returns: v.union(doc(schema, "transcript_writes"), v.null()),
	handler: async (ctx, args) =>
		await ctx.db
			.query("transcript_writes")
			.withIndex("by_run_status_order", (q) => q.eq("runId", args.runId).eq("status", args.status))
			.first(),
});

export const prepare_write = internalMutation({
	args: {
		runId: v.id("transcript_runs"),
		claim: v.string(),
		writeId: v.id("transcript_writes"),
		path: v.string(),
		expectedParentNodeId: v.string(),
		expectedNodeId: v.union(v.string(), v.null()),
		expectedContentRevision: v.union(v.string(), v.null()),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const { runId: _run, claim: _claim, writeId, ...preconditions } = args;
		await ctx.db.patch("transcript_writes", writeId, { ...preconditions, status: "prepared" });
	},
});

export const next_input = internalQuery({
	args: { runId: v.id("transcript_runs") },
	returns: v.union(
		v.null(),
		doc(schema, "transcript_inputs"),
		v.object({
			fileId: v.id("transcript_files"),
			order: v.number(),
			path: v.string(),
			nodeId: v.string(),
			contentRevision: v.string(),
			archived: v.boolean(),
		}),
	),
	handler: async (ctx, args) => {
		const run = (await ctx.db.get("transcript_runs", args.runId))!;
		if (run.kind === "reconcile" && run.phase === "validate") {
			const next = await ctx.db
				.query("transcript_paths")
				.withIndex("by_channel_archived_path", (q) =>
					q
						.eq("channelId", run.channelId)
						.eq("archived", false)
						.gt("path", run.cursor ?? ""),
				)
				.first();
			const file = next ? await ctx.db.get("transcript_files", next.fileId) : null;
			return file
				? {
						fileId: file._id,
						order: file.order,
						path: file.path,
						nodeId: file.nodeId,
						contentRevision: file.contentRevision,
						archived: false,
					}
				: null;
		}
		if (run.kind === "reconcile")
			return await ctx.db
				.query("transcript_inputs")
				.withIndex("by_run_path", (q) => q.eq("runId", run._id).gt("path", run.cursor ?? ""))
				.first();
		return await ctx.db
			.query("transcript_inputs")
			.withIndex("by_run_order", (q) =>
				q.eq("runId", run._id).gte("order", run.cursor === null ? run.startOrder : Number(run.cursor) + 1),
			)
			.first();
	},
});

export const target = internalQuery({
	args: { runId: v.id("transcript_runs"), path: v.string() },
	returns: v.object({
		input: v.union(doc(schema, "transcript_inputs"), v.null()),
		file: v.union(doc(schema, "transcript_files"), v.null()),
	}),
	handler: async (ctx, args) => {
		const run = (await ctx.db.get("transcript_runs", args.runId))!;
		const input = await ctx.db
			.query("transcript_inputs")
			.withIndex("by_run_path", (q) => q.eq("runId", run._id).eq("path", args.path))
			.unique();
		const path = await ctx.db
			.query("transcript_paths")
			.withIndex("by_channel_path", (q) => q.eq("channelId", run.channelId).eq("path", args.path))
			.unique();
		const file = path && !path.archived ? await ctx.db.get("transcript_files", path.fileId) : null;
		return { input, file };
	},
});

export const validate_input = internalMutation({
	args: {
		runId: v.id("transcript_runs"),
		claim: v.string(),
		fileId: v.id("transcript_files"),
		contentRevision: v.string(),
		archived: v.boolean(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const file = (await ctx.db.get("transcript_files", args.fileId))!;
		const existing = await ctx.db
			.query("transcript_inputs")
			.withIndex("by_run_path", (q) => q.eq("runId", current.run._id).eq("path", file.path))
			.unique();
		if (existing) await ctx.db.patch("transcript_inputs", existing._id, { archived: args.archived });
		else
			await ctx.db.insert("transcript_inputs", {
				runId: current.run._id,
				fileId: file._id,
				order: file.order,
				path: file.path,
				nodeId: file.nodeId,
				contentRevision: args.contentRevision,
				tail: "",
				archived: args.archived,
			});
		if (args.archived) {
			const path = await ctx.db
				.query("transcript_paths")
				.withIndex("by_channel_path", (q) => q.eq("channelId", current.run.channelId).eq("path", file.path))
				.unique();
			if (path?.fileId === file._id) await ctx.db.patch("transcript_paths", path._id, { archived: true });
		}
		await ctx.db.patch("transcript_runs", current.run._id, {
			cursor: current.run.kind === "reconcile" ? file.path : String(file.order),
		});
	},
});

export const output_for_order = internalQuery({
	args: { runId: v.id("transcript_runs"), order: v.number() },
	returns: v.union(doc(schema, "transcript_writes"), v.null()),
	handler: async (ctx, args) =>
		await ctx.db
			.query("transcript_writes")
			.withIndex("by_run_order", (q) => q.eq("runId", args.runId).eq("order", args.order))
			.unique(),
});

// #endregion output staging

// #region control jobs

// Finish a job that changes no file, for example an archive flag.
export const complete_control = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const state = (await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", current.run.channelId))
			.unique())!;
		const job = (await ctx.db
			.query("transcript_jobs")
			.withIndex("by_channel_sequence", (q) =>
				q.eq("channelId", current.run.channelId).eq("sequence", current.run.barrier),
			)
			.unique())!;
		await ctx.db.patch("transcript_jobs", job._id, { status: "complete", error: null });
		await ctx.db.patch("transcript_channels", state._id, {
			appliedSequence: current.run.barrier,
			renderedSequence: current.run.barrier,
			status: current.run.barrier >= state.desiredSequence ? "ready" : "pending",
			error: null,
			errorCode: undefined,
			retry: undefined,
			nextAttemptAt: Date.now(),
		});
		await ctx.db.patch("transcript_runs", current.run._id, { phase: "complete" });
		await ctx.scheduler.runAfter(0, internal.transcripts_cleanup.channel, {
			channelId: current.run.channelId,
			throughCreatedAt: current.run._creationTime,
		});
		await transcripts_wake(ctx, { channelStateId: state._id }, Date.now());
	},
});

// #endregion control jobs

// #region publication

export const save_receipt = internalMutation({
	args: {
		runId: v.id("transcript_runs"),
		claim: v.string(),
		writeId: v.id("transcript_writes"),
		nodeId: v.string(),
		contentRevision: v.string(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const write = (await ctx.db.get("transcript_writes", args.writeId))!;
		const source =
			current.run.phase === "recover"
				? (await ctx.db.get("transcript_runs", current.run.recoveryRunId!))!
				: current.run;
		if (write.runId !== source._id || write.status !== "prepared") return;
		const fileId = await ctx.db.insert("transcript_files", {
			channelId: current.run.channelId,
			order: write.order,
			path: write.path,
			nodeId: args.nodeId,
			contentRevision: args.contentRevision,
			content: write.content,
			header: source.header,
			active: false,
		});
		const path = await ctx.db
			.query("transcript_paths")
			.withIndex("by_channel_path", (q) => q.eq("channelId", current.run.channelId).eq("path", write.path))
			.unique();
		if (path) await ctx.db.patch("transcript_paths", path._id, { fileId, archived: false });
		else
			await ctx.db.insert("transcript_paths", {
				channelId: current.run.channelId,
				path: write.path,
				fileId,
				archived: false,
			});
		await ctx.db.patch("transcript_writes", write._id, {
			nodeId: args.nodeId,
			contentRevision: args.contentRevision,
			fileId,
			status: "published",
		});
	},
});

export const discard_recovery_write = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string(), writeId: v.id("transcript_writes") },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current || current.run.phase !== "recover") return;
		const write = await ctx.db.get("transcript_writes", args.writeId);
		if (write?.runId === current.run.recoveryRunId && write.status === "prepared")
			await ctx.db.patch("transcript_writes", write._id, { status: "discarded" });
	},
});

export const advance_recovery_archive = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string(), fileId: v.id("transcript_files"), archived: v.boolean() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current || current.run.phase !== "recover") return;
		const previous = (await ctx.db.get("transcript_runs", current.run.recoveryRunId!))!;
		const file = (await ctx.db.get("transcript_files", args.fileId))!;
		if (args.archived) {
			const path = await ctx.db
				.query("transcript_paths")
				.withIndex("by_channel_path", (q) => q.eq("channelId", current.run.channelId).eq("path", file.path))
				.unique();
			if (path?.fileId === file._id) await ctx.db.patch("transcript_paths", path._id, { archived: true });
		}
		await ctx.db.patch("transcript_runs", previous._id, {
			cursor: previous.kind === "reconcile" ? file.path : String(file.order),
		});
	},
});

export const place = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const blocks = await ctx.db
			.query("transcript_staged_blocks")
			.withIndex("by_run_placed", (q) => q.eq("runId", current.run._id).eq("placed", false))
			.take(20);
		for (const block of blocks) {
			const write = (await ctx.db
				.query("transcript_writes")
				.withIndex("by_run_order", (q) => q.eq("runId", current.run._id).eq("order", block.outputOrder!))
				.unique())!;
			if (!write.fileId || write.status !== "published")
				throw new ConvexError("The transcript write is not confirmed.");
			const existing = await ctx.db
				.query("transcript_blocks")
				.withIndex("by_message", (q) => q.eq("messageId", block.messageId))
				.unique();
			const values = {
				channelId: current.run.channelId,
				messageId: block.messageId,
				rootSequence: block.rootSequence,
				replySequence: block.replySequence,
				text: block.text,
				sourceRevision: block.sourceRevision,
				fileId: write.fileId,
				start: block.start,
				end: block.end,
			};
			if (existing) await ctx.db.replace("transcript_blocks", existing._id, values);
			else await ctx.db.insert("transcript_blocks", values);
			await ctx.db.patch("transcript_staged_blocks", block._id, { placed: true });
		}
		if (blocks.length < 20) await ctx.db.patch("transcript_runs", current.run._id, { phase: "finish", cursor: null });
	},
});

export const finish = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const { run, destination } = current;
		// The new file and block positions become available after this final checkpoint.
		if (run.phase === "finish") {
			const old = await ctx.db
				.query("transcript_files")
				.withIndex("by_channel_active_order", (q) =>
					q.eq("channelId", run.channelId).eq("active", true).gte("order", run.startOrder).lte("order", run.endOrder),
				)
				.take(20);
			for (const file of old) await ctx.db.patch("transcript_files", file._id, { active: false });
			if (old.length < 20) await ctx.db.patch("transcript_runs", run._id, { phase: "activate", cursor: null });
			return;
		}
		if (run.phase === "activate") {
			const page = await ctx.db
				.query("transcript_writes")
				.withIndex("by_run_order", (q) => q.eq("runId", run._id))
				.paginate({ cursor: run.cursor, numItems: 20, maximumRowsRead: 20 });
			for (const write of page.page) await ctx.db.patch("transcript_files", write.fileId!, { active: true });
			await ctx.db.patch("transcript_runs", run._id, {
				cursor: page.isDone ? null : page.continueCursor,
				phase: page.isDone ? "jobs" : "activate",
			});
			return;
		}
		const state = (await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", run.channelId))
			.unique())!;
		const jobs = await ctx.db
			.query("transcript_jobs")
			.withIndex("by_channel_sequence", (q) =>
				q
					.eq("channelId", run.channelId)
					.gt("sequence", run.cursor === null ? state.appliedSequence : Number(run.cursor))
					.lte("sequence", run.barrier),
			)
			.take(20);
		for (const job of jobs)
			await ctx.db.patch("transcript_jobs", job._id, {
				status: run.kind === "reconcile" ? "superseded" : "complete",
				error: null,
			});
		if (jobs.length === 20) {
			await ctx.db.patch("transcript_runs", run._id, { cursor: String(jobs.at(-1)!.sequence) });
			return;
		}
		await ctx.db.patch("transcript_channels", state._id, {
			appliedSequence: run.barrier,
			renderedSequence: run.barrier,
			status: run.barrier >= state.desiredSequence ? "ready" : "pending",
			error: null,
			errorCode: undefined,
			retry: undefined,
			nextAttemptAt: Date.now(),
		});
		await ctx.db.patch("transcript_destinations", destination._id, {
			header: run.header,
			tailOrder: run.endOrder === destination.tailOrder ? run.outputOrder : destination.tailOrder,
		});
		await ctx.db.patch("transcript_runs", run._id, { phase: "complete", buffer: "" });
		await ctx.scheduler.runAfter(0, internal.transcripts_cleanup.channel, {
			channelId: run.channelId,
			throughCreatedAt: run._creationTime,
		});
		await transcripts_wake(ctx, { channelStateId: state._id }, Date.now());
	},
});

// #endregion publication
