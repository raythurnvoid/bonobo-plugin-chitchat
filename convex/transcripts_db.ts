import { v } from "convex/values";
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

async function pending_readers(ctx: MutationCtx, channelId: Id<"channels">) {
	for (const status of ["pending", "running", "blocked"] as const) {
		const job = await ctx.db
			.query("transcript_jobs")
			.withIndex("by_channel_kind_status_sequence", (q) =>
				q.eq("channelId", channelId).eq("operation.kind", "readers").eq("status", status),
			)
			.first();
		if (job) return true;
	}
	return false;
}

async function current_run(ctx: MutationCtx, runId: Id<"transcript_runs">, claim: string, acknowledge = false) {
	const run = await ctx.db.get("transcript_runs", runId);
	if (!run || run.claim !== claim || run.leaseUntil <= Date.now()) return null;
	const destination = await ctx.db
		.query("transcript_destinations")
		.withIndex("by_channel", (q) => q.eq("channelId", run.channelId))
		.unique();
	if (!destination || (run.kind === "readers" ? destination.readerRunId : destination.runId) !== run._id) return null;
	if (!acknowledge && run.kind !== "readers" && (await pending_readers(ctx, run.channelId))) return null;
	return { run, destination };
}

// #region run claims

export const claim = internalMutation({
	args: { channelId: v.id("channels") },
	returns: v.union(
		v.null(),
		v.object({
			channel: doc(schema, "channels"),
			destination: doc(schema, "transcript_destinations"),
			state: doc(schema, "transcript_channels"),
			job: v.union(doc(schema, "transcript_jobs"), v.null()),
			run: doc(schema, "transcript_runs"),
		}),
	),
	handler: async (ctx, args) => {
		const channel = await ctx.db.get("channels", args.channelId);
		const destination = await ctx.db
			.query("transcript_destinations")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		const state = await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		if (!channel || !destination || !state) return null;
		let run = destination.runId ? await ctx.db.get("transcript_runs", destination.runId) : null;
		const readersPending = await pending_readers(ctx, channel._id);
		const settleFence =
			readersPending && run?.phase === "fence" && run.fenceUncertain && destination.readerRunId === null;
		if ((state.nextAttemptAt > Date.now() || state.status === "blocked") && !settleFence) return null;
		// Reader wake-ups must settle an earlier uncertain fence, even after a later permission refusal.
		if (readersPending && !settleFence) return null;
		if (run && run.phase !== "complete" && run.leaseUntil > Date.now()) return null;
		if (!run || run.phase === "complete") {
			if (state.appliedSequence >= state.desiredSequence) return null;
			const job = await ctx.db
				.query("transcript_jobs")
				.withIndex("by_channel_sequence", (q) =>
					q.eq("channelId", channel._id).eq("sequence", state.appliedSequence + 1),
				)
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
				readerReceiptId: null,
				readerOriginalReceiptId: null,
				readerSourceSecret: null,
				readerRollbackSecret: null,
				readerAttempt: 0,
				readerRefresh: false,
				readerStep: 0,
				readerSnapshot: null,
			});
			run = (await ctx.db.get("transcript_runs", runId))!;
			await ctx.db.patch("transcript_destinations", destination._id, { runId });
			if (job.operation.kind !== "readers")
				await ctx.db.patch("transcript_jobs", job._id, {
					status: "running",
					attempts: job.attempts + 1,
					workerGeneration: state.workerGeneration,
				});
		}
		const claim = crypto.randomUUID();
		await ctx.db.patch("transcript_runs", run._id, { claim, leaseUntil: Date.now() + 60_000 });
		await ctx.db.patch("transcript_channels", state._id, {
			status: "running",
			error: null,
			nextAttemptAt: Date.now() + 60_000,
		});
		const job =
			run.kind === "incremental"
				? await ctx.db
						.query("transcript_jobs")
						.withIndex("by_channel_sequence", (q) => q.eq("channelId", channel._id).eq("sequence", run.barrier))
						.unique()
				: null;
		return { channel, destination, state, job, run: { ...run, claim } };
	},
});

export const release = internalMutation({
	args: {
		runId: v.id("transcript_runs"),
		claim: v.string(),
		error: v.union(v.string(), v.null()),
		retryable: v.boolean(),
		definiteRefusal: v.boolean(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim, true);
		if (!current) return;
		const state = (await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", current.run.channelId))
			.unique())!;
		const delay = args.error ? 30_000 : 0;
		await ctx.db.patch("transcript_runs", current.run._id, {
			leaseUntil: 0,
			error: args.error,
			// An unsent call or a first-attempt refusal cannot have advanced Press.
			...(current.run.phase === "fence" && (!current.run.fenceUncertain || args.definiteRefusal)
				? { claim: "", fenceUncertain: false }
				: {}),
		});
		await ctx.db.patch("transcript_channels", state._id, {
			status: args.error
				? args.retryable
					? "pending"
					: "blocked"
				: current.run.phase === "complete" && state.appliedSequence >= state.desiredSequence
					? "ready"
					: "pending",
			error: args.error,
			nextAttemptAt: Date.now() + delay,
		});
		if (args.error === null || args.retryable)
			await ctx.scheduler.runAfter(delay, internal.transcripts_worker.run_channel, {
				channelId: current.run.channelId,
			});
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
		const current = await current_run(ctx, args.runId, args.claim, args.phase === "copy");
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
		const current = await current_run(ctx, args.runId, args.claim, true);
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
		else if (file.header) throw new Error("The transcript header changed. Rebuild the Files copy to replace it.");
		for (const block of blocks) {
			let start = block.start;
			if (args.content !== file.content) {
				start = args.content.indexOf(block.text);
				if (start < position || args.content.indexOf(block.text, start + 1) !== -1)
					throw new Error("A transcript block is missing or repeated. Rebuild the Files copy to replace it.");
			}
			if (start < position || args.content.slice(start, start + block.text.length) !== block.text)
				throw new Error("The transcript block changed. Rebuild the Files copy to replace it.");
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
			if (operation.kind === "readers") break;
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
			} else if (operation.kind === "header")
				header = chatbe_channel_header(operation.name, operation.topic, operation.isPrivate);
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

export const next_job = internalQuery({
	args: { runId: v.id("transcript_runs") },
	returns: v.union(doc(schema, "transcript_jobs"), v.null()),
	handler: async (ctx, args) => {
		const run = (await ctx.db.get("transcript_runs", args.runId))!;
		return await ctx.db
			.query("transcript_jobs")
			.withIndex("by_channel_sequence", (q) =>
				q.eq("channelId", run.channelId).gt("sequence", run.foldedSequence).lte("sequence", run.barrier),
			)
			.first();
	},
});

// #endregion source snapshots

// #region output staging

async function save_output(ctx: MutationCtx, run: Doc<"transcript_runs">, order: number, content: string) {
	if (chatbe_utf8_byte_size(content) > chatbe_ROLLOVER_MAX_BYTES)
		throw new Error("This transcript part exceeds 100,000 bytes.");
	await ctx.db.insert("transcript_writes", {
		runId: run._id,
		order,
		path: "",
		content,
		contentHash: await chatbe_sha256_hex(content),
		expectedParentNodeId: "",
		expectedNodeId: null,
		expectedContentRevision: null,
		expectedReaderRevision: null,
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
				if (buffer === run.header) throw new Error("One transcript block exceeds the file size limit.");
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
		expectedReaderRevision: v.union(v.number(), v.null()),
		detached: v.boolean(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const { runId: _run, claim: _claim, writeId, detached, ...preconditions } = args;
		await ctx.db.patch("transcript_writes", writeId, { ...preconditions, status: "prepared" });
		await ctx.db.patch("transcript_destinations", current.destination._id, {
			readerRevision: args.expectedReaderRevision,
			detached,
		});
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

// #region private reader changes

export const claim_readers = internalMutation({
	args: { channelId: v.id("channels") },
	returns: v.union(
		v.null(),
		v.object({
			channel: doc(schema, "channels"),
			destination: doc(schema, "transcript_destinations"),
			job: doc(schema, "transcript_jobs"),
			run: doc(schema, "transcript_runs"),
		}),
	),
	handler: async (ctx, args) => {
		const channel = await ctx.db.get("channels", args.channelId);
		const destination = await ctx.db
			.query("transcript_destinations")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		if (!channel || !destination) return null;
		let run = destination.readerRunId ? await ctx.db.get("transcript_runs", destination.readerRunId) : null;
		if (!run && destination.runId) {
			const fileRun = await ctx.db.get("transcript_runs", destination.runId);
			if (fileRun?.phase === "fence" && fileRun.claim !== "") return null;
		}
		if (run && run.phase !== "complete" && run.leaseUntil > Date.now()) return null;
		let job =
			run && run.phase !== "complete"
				? await ctx.db
						.query("transcript_jobs")
						.withIndex("by_channel_sequence", (q) => q.eq("channelId", channel._id).eq("sequence", run!.barrier))
						.unique()
				: null;
		if (job && job.nextAttemptAt > Date.now()) return null;
		if (!job) {
			job = await ctx.db
				.query("transcript_jobs")
				.withIndex("by_channel_kind_status_sequence", (q) =>
					q.eq("channelId", channel._id).eq("operation.kind", "readers").eq("status", "pending"),
				)
				.first();
			if (!job) return null;
			const runId = await ctx.db.insert("transcript_runs", {
				channelId: channel._id,
				recoveryRunId: null,
				barrier: job.sequence,
				kind: "readers",
				fenceUncertain: false,
				phase: "copy",
				writerGeneration: destination.writerGeneration,
				leaseUntil: 0,
				claim: "",
				startOrder: destination.tailOrder,
				endOrder: destination.tailOrder,
				cursor: null,
				foldedSequence: 0,
				header: "",
				outputOrder: 0,
				buffer: "",
				outputCount: 0,
				error: null,
				createdAt: Date.now(),
				readerReceiptId: null,
				readerOriginalReceiptId: null,
				readerSourceSecret: null,
				readerRollbackSecret: null,
				readerAttempt: 0,
				readerRefresh: false,
				readerStep: 0,
				readerSnapshot: null,
			});
			run = (await ctx.db.get("transcript_runs", runId))!;
			await ctx.db.patch("transcript_destinations", destination._id, { readerRunId: runId, readerError: null });
		}
		const claim = crypto.randomUUID();
		await ctx.db.patch("transcript_runs", run!._id, { claim, leaseUntil: Date.now() + 60_000 });
		await ctx.db.patch("transcript_jobs", job._id, {
			status: "running",
			nextAttemptAt: Date.now() + 60_000,
			attempts: job.attempts + 1,
		});
		return { channel, destination, job, run: { ...run!, claim } };
	},
});

export const release_readers = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string(), error: v.union(v.string(), v.null()) },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		const job = (await ctx.db
			.query("transcript_jobs")
			.withIndex("by_channel_sequence", (q) =>
				q.eq("channelId", current.run.channelId).eq("sequence", current.run.barrier),
			)
			.unique())!;
		const delay = args.error ? 30_000 : 0;
		await ctx.db.patch("transcript_runs", current.run._id, { leaseUntil: 0, error: args.error });
		await ctx.db.patch("transcript_jobs", job._id, {
			status: args.error ? "blocked" : "running",
			error: args.error,
			nextAttemptAt: Date.now() + delay,
		});
		await ctx.db.patch("transcript_destinations", current.destination._id, { readerError: args.error });
		await ctx.scheduler.runAfter(delay, internal.transcripts_worker.run_channel, { channelId: current.run.channelId });
	},
});

export const reader_context = internalQuery({
	args: { channelId: v.id("channels"), readerRevision: v.number() },
	returns: v.object({
		channel: doc(schema, "channels"),
		change: v.union(doc(schema, "channel_access_changes"), v.null()),
		readers: v.array(v.object({ userId: v.string(), membershipLifetime: v.number() })),
	}),
	handler: async (ctx, args) => {
		const channel = (await ctx.db.get("channels", args.channelId))!;
		const change = await ctx.db
			.query("channel_access_changes")
			.withIndex("by_channel_status", (q) => q.eq("channelId", channel._id).eq("status", "pending"))
			.unique();
		const members = await ctx.db
			.query("channel_members")
			.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id))
			.take(50);
		const readers = [];
		for (const member of members) {
			const current = await ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", channel.installationId).eq("hostUserId", member.hostUserId),
				)
				.unique();
			if (current?.active && !current.cleanupPending && current.membershipLifetime === member.membershipLifetime)
				readers.push({ userId: member.hostUserId, membershipLifetime: member.membershipLifetime });
		}
		return { channel, change: change?.readerRevision === args.readerRevision ? change : null, readers };
	},
});

export const stage_readers = internalMutation({
	args: {
		runId: v.id("transcript_runs"),
		claim: v.string(),
		revision: v.number(),
		readers: v.array(v.object({ userId: v.string(), membershipLifetime: v.number() })),
		compensation: v.boolean(),
		refresh: v.optional(v.boolean()),
		sourceSecret: v.optional(v.string()),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		await ctx.db.patch("transcript_runs", current.run._id, {
			readerSnapshot: { revision: args.revision, readers: args.readers },
			readerStep: current.run.readerStep + (args.compensation ? 1 : 0),
			readerRefresh: args.refresh ?? false,
			readerReceiptId: null,
			...(args.sourceSecret ? { readerSourceSecret: args.sourceSecret } : {}),
		});
	},
});

export const set_reader_rollback_source = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string(), sourceSecret: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (current && current.run.readerStep > 0 && !current.run.readerReceiptId)
			await ctx.db.patch("transcript_runs", current.run._id, { readerRollbackSecret: args.sourceSecret });
	},
});

export const restart_readers = internalMutation({
	args: { runId: v.id("transcript_runs"), claim: v.string(), sourceSecret: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current || !current.run.readerRefresh || !current.run.readerReceiptId) return;
		const job = await ctx.db
			.query("transcript_jobs")
			.withIndex("by_channel_sequence", (q) =>
				q.eq("channelId", current.run.channelId).eq("sequence", current.run.barrier),
			)
			.unique();
		if (job?.operation.kind !== "readers") return;
		await ctx.db.patch("transcript_runs", current.run._id, {
			readerAttempt: current.run.readerAttempt + 1,
			readerRefresh: false,
			readerStep: 0,
			readerSourceSecret: args.sourceSecret,
			readerRollbackSecret: null,
			readerReceiptId: null,
			readerOriginalReceiptId: null,
			readerSnapshot: { revision: job.operation.readerRevision, readers: job.operation.readers },
		});
	},
});

export const reader_receipt = internalMutation({
	args: {
		runId: v.id("transcript_runs"),
		claim: v.string(),
		receiptId: v.string(),
		readerRevision: v.union(v.number(), v.null()),
		detached: v.boolean(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		await ctx.db.patch("transcript_runs", current.run._id, {
			readerReceiptId: args.receiptId,
			...(current.run.readerStep === 0 ? { readerOriginalReceiptId: args.receiptId } : {}),
		});
		await ctx.db.patch("transcript_destinations", current.destination._id, {
			readerRevision: args.readerRevision,
			detached: args.detached,
		});
	},
});

export const complete_control = internalMutation({
	args: {
		runId: v.id("transcript_runs"),
		claim: v.string(),
		readerRevision: v.optional(v.number()),
		foldedSequence: v.optional(v.number()),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const current = await current_run(ctx, args.runId, args.claim);
		if (!current) return;
		if (args.foldedSequence !== undefined) {
			await ctx.db.patch("transcript_runs", current.run._id, {
				foldedSequence: args.foldedSequence,
				readerReceiptId: null,
				readerOriginalReceiptId: null,
				readerSourceSecret: null,
				readerSnapshot: null,
				readerStep: 0,
			});
			return;
		}
		if (current.run.kind === "readers") {
			const job = (await ctx.db
				.query("transcript_jobs")
				.withIndex("by_channel_sequence", (q) =>
					q.eq("channelId", current.run.channelId).eq("sequence", current.run.barrier),
				)
				.unique())!;
			await ctx.db.patch("transcript_jobs", job._id, { status: "complete", error: null });
			await ctx.db.patch("transcript_destinations", current.destination._id, { readerRunId: null, readerError: null });
			await ctx.db.delete("transcript_runs", current.run._id);
			if (current.destination.runId) {
				const fileRun = await ctx.db.get("transcript_runs", current.destination.runId);
				if (fileRun && fileRun.phase !== "complete")
					await ctx.db.patch("transcript_runs", fileRun._id, { leaseUntil: 0 });
			}
			const state = await ctx.db
				.query("transcript_channels")
				.withIndex("by_channel", (q) => q.eq("channelId", current.run.channelId))
				.unique();
			if (state)
				await ctx.db.patch("transcript_channels", state._id, {
					...(state.status !== "blocked" ? { status: "pending" as const, nextAttemptAt: Date.now() } : {}),
					...(args.readerRevision !== undefined ? { readerRevision: args.readerRevision } : {}),
				});
			await ctx.scheduler.runAfter(0, internal.transcripts_worker.run_channel, { channelId: current.run.channelId });
			return;
		}
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
			nextAttemptAt: Date.now(),
			...(args.readerRevision !== undefined ? { readerRevision: args.readerRevision } : {}),
		});
		await ctx.db.patch("transcript_runs", current.run._id, { phase: "complete" });
		await ctx.scheduler.runAfter(0, internal.transcripts_cleanup.channel, {
			channelId: current.run.channelId,
			throughCreatedAt: current.run._creationTime,
		});
		await ctx.scheduler.runAfter(0, internal.transcripts_worker.run_channel, { channelId: current.run.channelId });
	},
});

// #endregion private reader changes

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
		const current = await current_run(ctx, args.runId, args.claim, true);
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
		const current = await current_run(ctx, args.runId, args.claim, true);
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
			if (!write.fileId || write.status !== "published") throw new Error("The transcript write is not confirmed.");
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
		await ctx.scheduler.runAfter(0, internal.transcripts_worker.run_channel, { channelId: run.channelId });
	},
});

// #endregion publication
