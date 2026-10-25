import { z } from "zod";
import { v, type Infer } from "convex/values";
import { internalAction, internalMutation, type ActionCtx, type MutationCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import {
	transcripts_get_error_code,
	transcripts_get_error_message,
	transcripts_get_token,
	transcripts_host_post,
	transcripts_HostError,
	transcripts_StepError,
} from "./transcripts_grants";
import { transcripts_db_claim, transcripts_db_claim_readers } from "./transcripts_db";
import { transcripts_deletions_claim } from "./transcripts_deletions";
import { transcripts_wake } from "./transcripts_wake";
import { channel_members_complete_without_files } from "./channel_members";
import { chatbe_rollover_path, chatbe_ROLLOVER_MAX_BYTES } from "../shared/transcript-markdown";
import { transcripts_decrypt, transcripts_encrypt } from "./transcripts_secrets";

export const transcripts_prepared = z.object({
	nodeId: z.string().nullable(),
	content: z.string().nullable(),
	contentType: z.literal("text/markdown;charset=utf-8").nullable(),
	contentRevision: z.string().nullable(),
	expectedParentNodeId: z.string(),
	writerGeneration: z.number(),
	readerRevision: z.number().nullable(),
	detached: z.boolean(),
});
export const transcripts_receipt = z.object({
	_id: z.string(),
	nodeId: z.string().nullable(),
	contentRevision: z.string().nullable(),
	writerGeneration: z.number(),
	readerRevision: z.number().nullable(),
	operationId: z.string(),
});
export const transcripts_file_result = z.object({ receipt: transcripts_receipt }).transform((result) => result.receipt);

async function readers_step(
	ctx: ActionCtx,
	current: {
		run: Doc<"transcript_runs">;
		destination: Doc<"transcript_destinations">;
		job: Doc<"transcript_jobs">;
	},
	token: string,
) {
	const { run, destination, job } = current;
	if (job.operation.kind !== "readers") return;
	const operation = job.operation;
	const checkpoint = { runId: run._id, claim: run.claim };
	const context = await ctx.runQuery(internal.transcripts_db.reader_context, {
		channelId: run.channelId,
		readerRevision: operation.readerRevision,
	});
	const invalidPending =
		context.change !== null &&
		!(await ctx.runQuery(internal.channel_members.is_change_current, { changeId: context.change._id }));
	if (
		run.readerStep === 0 &&
		!run.readerReceiptId &&
		(invalidPending || (run.readerSnapshot !== null && context.channel.membershipRevision > operation.readerRevision))
	) {
		await ctx.runMutation(internal.transcripts_db.stage_readers, {
			...checkpoint,
			revision: context.channel.membershipRevision,
			readers: context.readers,
			compensation: true,
			...(run.readerSourceSecret === null ? { sourceSecret: await transcripts_encrypt(token) } : {}),
		});
		return;
	}
	if (!run.readerSnapshot) {
		const stale = context.channel.membershipRevision > operation.readerRevision;
		if (stale) {
			await ctx.runMutation(internal.transcripts_db.complete_control, {
				...checkpoint,
				readerRevision: context.channel.membershipRevision,
				...(run.kind === "reconcile" ? { foldedSequence: job.sequence } : {}),
			});
			return;
		}
		await ctx.runMutation(internal.transcripts_db.stage_readers, {
			...checkpoint,
			revision: operation.readerRevision,
			readers: operation.readers,
			compensation: false,
			sourceSecret: await transcripts_encrypt(token),
		});
		return;
	}
	const readerToken = await transcripts_decrypt(run.readerSourceSecret!);
	if (!run.readerReceiptId) {
		if (run.readerStep === 0 && readerToken !== token) {
			// Settle the old operation first. Its lost reply may still own the host journal.
			await ctx.runMutation(internal.transcripts_db.stage_readers, {
				...checkpoint,
				revision: context.channel.membershipRevision,
				readers: context.readers,
				compensation: true,
				refresh: true,
			});
			return;
		}
		if (run.readerStep > 0 && run.readerOriginalReceiptId?.startsWith("manual:")) {
			await ctx.runMutation(internal.transcripts_db.reader_receipt, {
				...checkpoint,
				receiptId: run.readerOriginalReceiptId,
				readerRevision: destination.readerRevision,
				detached: true,
			});
			return;
		}
		if (run.readerStep > 0 && !run.readerOriginalReceiptId?.startsWith("manual:")) {
			const rollbackToken = run.readerRollbackSecret
				? await transcripts_decrypt(run.readerRollbackSecret)
				: readerToken;
			let rollback;
			try {
				rollback = await transcripts_host_post(
					"/api/v1/files/plugin-access/undo",
					{
						writerId: destination.writerId,
						operationId: `${run._id}:${job.sequence}:rollback:${run.readerAttempt}`,
						writerGeneration: run.writerGeneration,
						...(run.readerOriginalReceiptId
							? { receiptId: run.readerOriginalReceiptId }
							: { originalReaderOperationId: `${run._id}:${job.sequence}:readers:${run.readerAttempt}` }),
					},
					rollbackToken,
					z.object({
						_id: z.string().nullable(),
						readerRevision: z.number(),
						detached: z.boolean(),
						restored: z.boolean(),
					}),
				);
			} catch (error) {
				if (
					!(error instanceof transcripts_HostError) ||
					error.code !== "reader_proof_mismatch" ||
					rollbackToken === token
				)
					throw error;
				// An upgrade can retire the saved bearer. Save current authority before retrying its exact operation.
				await ctx.runMutation(internal.transcripts_db.set_reader_rollback_source, {
					...checkpoint,
					sourceSecret: await transcripts_encrypt(token),
				});
				return;
			}
			if (!rollback.restored && !rollback.detached)
				throw new Error("Bonobo Senate has not restored the previous Files readers.");
			await ctx.runMutation(internal.transcripts_db.reader_receipt, {
				...checkpoint,
				receiptId: rollback._id ?? `manual:${run._id}:${job.sequence}`,
				readerRevision: rollback.readerRevision,
				detached: rollback.detached,
			});
			return;
		}
		// An explicit Files takeover leaves its readers independent of later chat membership.
		const prepared = await transcripts_host_post(
			"/api/v1/files/plugin-writers/inspect",
			{
				writerId: destination.writerId,
				path: chatbe_rollover_path(destination.folderPath, context.channel.transcriptSlug, 0),
				maxBytes: chatbe_ROLLOVER_MAX_BYTES,
			},
			readerToken,
			transcripts_prepared,
		);
		if (prepared.detached) {
			await ctx.runMutation(internal.transcripts_db.reader_receipt, {
				...checkpoint,
				receiptId: `manual:${run._id}:${run.readerStep}`,
				readerRevision: prepared.readerRevision,
				detached: true,
			});
			return;
		}
		const receipt = await transcripts_host_post(
			"/api/v1/files/plugin-access/set",
			{
				path: destination.folderPath,
				access: { readers: run.readerSnapshot.readers },
				writer: {
					writerId: destination.writerId,
					operationId: `${run._id}:${job.sequence}:readers:${run.readerAttempt}`,
					writerGeneration: run.writerGeneration,
					expectedReaderRevision: destination.readerRevision!,
				},
			},
			readerToken,
			transcripts_file_result,
		);
		await ctx.runMutation(internal.transcripts_db.reader_receipt, {
			...checkpoint,
			receiptId: receipt._id,
			readerRevision: receipt.readerRevision,
			detached: false,
		});
		return;
	}
	if (
		run.readerRefresh &&
		!invalidPending &&
		(context.change !== null || context.channel.membershipRevision === operation.readerRevision)
	) {
		await ctx.runMutation(internal.transcripts_db.restart_readers, {
			...checkpoint,
			sourceSecret: await transcripts_encrypt(token),
		});
		return;
	}
	if (run.readerStep === 0 && context.change) {
		const complete: boolean = await ctx.runMutation(internal.channel_members.complete_change, {
			changeId: context.change._id,
			readerRevision: operation.readerRevision,
			hostReceiptId: run.readerReceiptId,
		});
		if (!complete) {
			await ctx.runMutation(internal.transcripts_db.stage_readers, {
				...checkpoint,
				revision: context.channel.membershipRevision,
				readers: context.readers,
				compensation: true,
			});
			return;
		}
	} else if (run.readerStep > 0) {
		if (context.change) {
			const cancelled: boolean = await ctx.runMutation(internal.channel_members.cancel_change, {
				changeId: context.change._id,
				hostReceiptId: run.readerReceiptId,
			});
			if (!cancelled)
				throw new transcripts_StepError("Channel access changed during Files sync. Try again.", "temporary");
		}
	} else {
		const snapshot = [...run.readerSnapshot.readers].sort((a, b) => a.userId.localeCompare(b.userId));
		const readers = [...context.readers].sort((a, b) => a.userId.localeCompare(b.userId));
		if (JSON.stringify(snapshot) !== JSON.stringify(readers)) {
			await ctx.runMutation(internal.transcripts_db.stage_readers, {
				...checkpoint,
				revision: context.channel.membershipRevision,
				readers: context.readers,
				compensation: true,
			});
			return;
		}
	}
	await ctx.runMutation(internal.transcripts_db.complete_control, {
		...checkpoint,
		readerRevision: Math.max(context.channel.membershipRevision, operation.readerRevision),
		...(run.kind === "reconcile" ? { foldedSequence: job.sequence } : {}),
	});
}

const channel_work = v.union(
	v.object({ kind: v.literal("readers"), runId: v.id("transcript_runs"), claim: v.string() }),
	v.object({ kind: v.literal("file"), runId: v.id("transcript_runs"), claim: v.string() }),
	v.object({ kind: v.literal("deletion"), deletionId: v.id("transcript_deletions"), claim: v.string() }),
);

async function start_work(
	ctx: MutationCtx,
	stateId: Id<"transcript_channels">,
	channelId: Id<"channels">,
	work: Infer<typeof channel_work>,
	leaseUntil: number,
) {
	// If the action never ends, this wake-up claims the same work again after the lease.
	await transcripts_wake(ctx, { channelStateId: stateId }, leaseUntil + 1_000);
	await ctx.scheduler.runAfter(0, internal.transcripts_worker.run, { channelId, work });
	return null;
}

// Claim one piece of channel work, then start the action that does it.
//
// Convex runs a scheduled mutation exactly once, but a scheduled action at most once. So the claim,
// the watchdog wake-up, and the action start happen in this one transaction. When nothing can run now,
// arm the earliest gate time, or nothing when every piece of work waits for a person or another step.
export const dispatch = internalMutation({
	args: { channelId: v.id("channels") },
	returns: v.null(),
	handler: async (ctx, args) => {
		const state = await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		if (!state) return null;
		if (await channel_members_complete_without_files(ctx, args)) {
			await transcripts_wake(ctx, { channelStateId: state._id }, null);
			return null;
		}

		const gates: number[] = [];
		// Reader changes go first. File runs and deletions wait for them.
		const readers = await transcripts_db_claim_readers(ctx, args.channelId);
		if (typeof readers === "number") gates.push(readers);
		else if (readers)
			return await start_work(
				ctx,
				state._id,
				args.channelId,
				{ kind: "readers", runId: readers.runId, claim: readers.claim },
				readers.leaseUntil,
			);
		const deletion = await transcripts_deletions_claim(ctx, args.channelId);
		if (typeof deletion === "number") gates.push(deletion);
		else if (deletion)
			return await start_work(
				ctx,
				state._id,
				args.channelId,
				{ kind: "deletion", deletionId: deletion.deletionId, claim: deletion.claim },
				deletion.leaseUntil,
			);
		const file = await transcripts_db_claim(ctx, args.channelId);
		if (typeof file === "number") gates.push(file);
		else if (file)
			return await start_work(
				ctx,
				state._id,
				args.channelId,
				{ kind: "file", runId: file.runId, claim: file.claim },
				file.leaseUntil,
			);
		await transcripts_wake(ctx, { channelStateId: state._id }, gates.length ? Math.min(...gates) : null);
		return null;
	},
});

export const run = internalAction({
	args: { channelId: v.id("channels"), work: channel_work },
	returns: v.null(),
	handler: async (ctx, args): Promise<void> => {
		const { work } = args;
		if (work.kind === "readers") {
			const reader = await ctx.runQuery(internal.transcripts_db.claimed, { runId: work.runId, claim: work.claim });
			if (!reader?.job) return;
			const checkpoint = { runId: work.runId, claim: work.claim };
			try {
				const source =
					(await ctx.runQuery(internal.transcripts_grants.reader_source, { channelId: args.channelId })) ??
					reader.run.readerSourceSecret;
				if (!source) throw new transcripts_StepError("Connect Files sync again to continue.", "auth_expired");
				await readers_step(ctx, { ...reader, job: reader.job }, await transcripts_decrypt(source));
				await ctx.runMutation(internal.transcripts_db.release_readers, {
					...checkpoint,
					error: null,
					errorCode: null,
					retryAfterMs: null,
				});
			} catch (error) {
				const message = transcripts_get_error_message(error, "Files readers could not be updated.");
				await ctx.runMutation(internal.transcripts_db.release_readers, {
					...checkpoint,
					error: message,
					errorCode: transcripts_get_error_code(error, message),
					retryAfterMs: error instanceof transcripts_HostError ? error.retryAfterMs : null,
				});
			}
			return;
		}
		if (work.kind === "deletion") {
			const deletion = await ctx.runQuery(internal.transcripts_deletions.claimed, {
				deletionId: work.deletionId,
				claim: work.claim,
			});
			if (!deletion) return;
			const prepared = deletion.deletion.prepared!;
			const checkpoint = { deletionId: work.deletionId, claim: work.claim };
			try {
				const { token } = await transcripts_get_token(ctx, args.channelId);
				// Archive after the copy boundary, preserving this exact file's current text and manual edits.
				const receipt = await transcripts_host_post(
					"/api/v1/files/plugin-archive",
					{
						path: prepared.path,
						writer: {
							writerId: deletion.destination.writerId,
							operationId: prepared.operationId,
							writerGeneration: prepared.writerGeneration,
							nodeId: prepared.nodeId,
							sequence: deletion.deletion.barrier + 1,
						},
					},
					token,
					transcripts_file_result,
				);
				if (receipt.nodeId !== prepared.nodeId || receipt.operationId !== prepared.operationId)
					throw new Error("Bonobo Senate did not confirm this transcript archive.");
				await ctx.runMutation(internal.transcripts_deletions.release, {
					...checkpoint,
					error: null,
					errorCode: null,
					retryAfterMs: null,
				});
			} catch (error) {
				const message = transcripts_get_error_message(error, "The transcript could not be archived.");
				await ctx.runMutation(internal.transcripts_deletions.release, {
					...checkpoint,
					error: message,
					errorCode: transcripts_get_error_code(error, message),
					retryAfterMs: error instanceof transcripts_HostError ? error.retryAfterMs : null,
				});
			}
			return;
		}
		const current = await ctx.runQuery(internal.transcripts_db.claimed, { runId: work.runId, claim: work.claim });
		if (!current) return;
		const { run, destination, channel, job } = current;
		const checkpoint = { runId: run._id, claim: run.claim };
		try {
			const next =
				run.kind === "reconcile" && run.phase === "fold"
					? await ctx.runQuery(internal.transcripts_db.next_job, { runId: run._id })
					: null;
			const readerJob = job?.operation.kind === "readers" ? job : next?.operation.kind === "readers" ? next : null;
			const token = (await transcripts_get_token(ctx, channel._id)).token;
			if (readerJob)
				await ctx.runMutation(internal.transcripts_db.complete_control, {
					...checkpoint,
					...(run.kind === "reconcile" ? { foldedSequence: readerJob.sequence } : {}),
				});
			else if (job?.operation.kind === "archive")
				await ctx.runMutation(internal.transcripts_db.complete_control, checkpoint);
			else if (run.phase === "recover") {
				const previous = (await ctx.runQuery(internal.transcripts_db.recovery_run, { runId: run._id }))!;
				const write = await ctx.runQuery(internal.transcripts_db.next_write, {
					runId: previous._id,
					status: "prepared",
				});
				if (previous.phase === "archive") {
					const input = await ctx.runQuery(internal.transcripts_db.next_input, { runId: previous._id });
					if (!input)
						await ctx.runMutation(internal.transcripts_db.advance, { ...checkpoint, phase: "fence", cursor: null });
					else {
						const targetOrder = input.path.endsWith(`/${channel.transcriptSlug}.md`)
							? previous.outputOrder
							: input.order;
						const output = await ctx.runQuery(internal.transcripts_db.output_for_order, {
							runId: previous._id,
							order: targetOrder,
						});
						let archived = false;
						if (!output || output.path !== input.path) {
							try {
								await transcripts_host_post(
									"/api/v1/files/plugin-archive",
									{
										path: input.path,
										writer: {
											writerId: destination.writerId,
											operationId: `${previous._id}:archive:${input.fileId}`,
											writerGeneration: previous.writerGeneration,
											nodeId: input.nodeId,
											sequence: previous.barrier,
											expectedContentRevision: input.contentRevision,
										},
									},
									token,
									transcripts_file_result,
								);
								archived = true;
							} catch (error) {
								if (!(error instanceof transcripts_HostError) || error.status !== 409) throw error;
								const prepared = await transcripts_host_post(
									"/api/v1/files/plugin-writers/inspect",
									{ writerId: destination.writerId, path: input.path, maxBytes: chatbe_ROLLOVER_MAX_BYTES },
									token,
									transcripts_prepared,
								);
								if (prepared.writerGeneration !== previous.writerGeneration) throw error;
							}
						}
						await ctx.runMutation(internal.transcripts_db.advance_recovery_archive, {
							...checkpoint,
							fileId: input.fileId,
							archived,
						});
					}
				} else if (!write)
					await ctx.runMutation(internal.transcripts_db.advance, { ...checkpoint, phase: "fence", cursor: null });
				else {
					try {
						// Settle the old request before its generation is fenced. Never adopt an unknown path.
						const receipt = await transcripts_host_post(
							"/api/v1/files/write",
							{
								path: write.path,
								expectedParentNodeId: write.expectedParentNodeId,
								content: write.content,
								contentType: "text/markdown;charset=utf-8",
								nonCollaborative: true,
								writer: {
									writerId: destination.writerId,
									operationId: write.operationId,
									writerGeneration: previous.writerGeneration,
									sequence: previous.barrier,
									expectedNodeId: write.expectedNodeId,
									expectedContentRevision: write.expectedContentRevision,
									expectedReaderRevision: write.expectedReaderRevision,
									contentHash: write.contentHash,
								},
							},
							token,
							transcripts_file_result,
						);
						if (!receipt.nodeId || !receipt.contentRevision)
							throw new Error("Bonobo Senate did not confirm the transcript content.");
						await ctx.runMutation(internal.transcripts_db.save_receipt, {
							...checkpoint,
							writeId: write._id,
							nodeId: receipt.nodeId,
							contentRevision: receipt.contentRevision,
						});
					} catch (error) {
						if (!(error instanceof transcripts_HostError) || error.status !== 409) throw error;
						// A current-generation conflict has no receipt. The confirmed rebuild can stage fresh preconditions.
						const prepared = await transcripts_host_post(
							"/api/v1/files/plugin-writers/inspect",
							{
								writerId: destination.writerId,
								path: write.path,
								maxBytes: chatbe_ROLLOVER_MAX_BYTES,
							},
							token,
							transcripts_prepared,
						);
						if (prepared.writerGeneration !== previous.writerGeneration) throw error;
						await ctx.runMutation(internal.transcripts_db.discard_recovery_write, {
							...checkpoint,
							writeId: write._id,
						});
					}
				}
			} else if (run.phase === "fence") {
				if (!(await ctx.runMutation(internal.transcripts_db.mark_fence_sent, checkpoint))) return;
				await transcripts_host_post(
					"/api/v1/files/plugin-writers/advance",
					{
						writerId: destination.writerId,
						operationId: `${run._id}:fence`,
						writerGeneration: run.writerGeneration - 1,
						nextGeneration: run.writerGeneration,
					},
					token,
					transcripts_receipt,
				);
				await ctx.runMutation(internal.transcripts_db.advance, { ...checkpoint, phase: "copy", cursor: null });
			} else if (run.phase === "copy") {
				if (run.kind === "reconcile") await ctx.runMutation(internal.transcripts_db.copy_reconcile, checkpoint);
				else {
					const input = await ctx.runQuery(internal.transcripts_db.copy_file, { runId: run._id });
					if (!input)
						await ctx.runMutation(internal.transcripts_db.advance, {
							...checkpoint,
							phase: "fold",
							cursor: run.cursor,
						});
					else {
						const prepared = await transcripts_host_post(
							"/api/v1/files/plugin-writers/inspect",
							{ writerId: destination.writerId, path: input.file.path, maxBytes: chatbe_ROLLOVER_MAX_BYTES },
							token,
							transcripts_prepared,
						);
						if (prepared.nodeId !== input.file.nodeId || prepared.content === null || prepared.contentRevision === null)
							throw new transcripts_StepError(
								"A transcript file moved or was replaced. Restore it before retrying.",
								"conflict",
							);
						await ctx.runMutation(internal.transcripts_db.save_input, {
							...checkpoint,
							fileId: input.file._id,
							content: prepared.content,
							contentRevision: prepared.contentRevision,
						});
					}
				}
			} else if (run.phase === "fold") {
				await ctx.runMutation(internal.transcripts_db.fold, checkpoint);
			} else if (run.phase === "stage") await ctx.runMutation(internal.transcripts_db.stage, checkpoint);
			else if (run.phase === "prepare") {
				const write = await ctx.runQuery(internal.transcripts_db.next_write, { runId: run._id, status: "staged" });
				if (!write)
					await ctx.runMutation(internal.transcripts_db.advance, { ...checkpoint, phase: "validate", cursor: null });
				else {
					const isTail = run.endOrder === destination.tailOrder && write.order === run.outputOrder;
					const path = chatbe_rollover_path(
						destination.folderPath,
						channel.transcriptSlug,
						isTail ? 0 : write.order + 1,
					);
					const prepared = await transcripts_host_post(
						"/api/v1/files/plugin-writers/inspect",
						{ writerId: destination.writerId, path, maxBytes: chatbe_ROLLOVER_MAX_BYTES },
						token,
						transcripts_prepared,
					);
					const target = await ctx.runQuery(internal.transcripts_db.target, { runId: run._id, path });
					if (!target.file && prepared.nodeId !== null)
						throw new transcripts_StepError(
							"Another file already uses this transcript path. Move it before retrying.",
							"conflict",
						);
					if (target.file && prepared.nodeId !== target.file.nodeId)
						throw new transcripts_StepError(
							"A transcript file moved or was replaced. Restore it before retrying.",
							"conflict",
						);
					if (run.kind === "incremental" && target.input && prepared.contentRevision !== target.input.contentRevision)
						throw new transcripts_StepError(
							"The transcript changed while its new parts were prepared. Rebuild the Files copy.",
							"conflict",
						);
					await ctx.runMutation(internal.transcripts_db.prepare_write, {
						...checkpoint,
						writeId: write._id,
						path,
						expectedParentNodeId: prepared.expectedParentNodeId,
						expectedNodeId: prepared.nodeId,
						expectedContentRevision: prepared.contentRevision,
						expectedReaderRevision: prepared.readerRevision,
						detached: prepared.detached,
					});
				}
			} else if (run.phase === "validate" || run.phase === "archive") {
				const input = await ctx.runQuery(internal.transcripts_db.next_input, { runId: run._id });
				if (!input)
					await ctx.runMutation(internal.transcripts_db.advance, {
						...checkpoint,
						phase: run.phase === "validate" ? "publish" : "place",
						cursor: null,
					});
				else if (run.phase === "validate") {
					const prepared = await transcripts_host_post(
						"/api/v1/files/plugin-writers/inspect",
						{ writerId: destination.writerId, path: input.path, maxBytes: chatbe_ROLLOVER_MAX_BYTES },
						token,
						transcripts_prepared,
					);
					if (
						prepared.nodeId !== input.nodeId ||
						prepared.contentRevision === null ||
						(run.kind === "incremental" && prepared.contentRevision !== input.contentRevision)
					)
						throw new transcripts_StepError(
							"The transcript changed while its new parts were prepared. Rebuild the Files copy.",
							"conflict",
						);
					await ctx.runMutation(internal.transcripts_db.validate_input, {
						...checkpoint,
						fileId: input.fileId,
						contentRevision: prepared.contentRevision,
						archived: false,
					});
				} else {
					const targetOrder = input.path.endsWith(`/${channel.transcriptSlug}.md`) ? run.outputOrder : input.order;
					const output = await ctx.runQuery(internal.transcripts_db.output_for_order, {
						runId: run._id,
						order: targetOrder,
					});
					if (!output || output.path !== input.path)
						await transcripts_host_post(
							"/api/v1/files/plugin-archive",
							{
								path: input.path,
								writer: {
									writerId: destination.writerId,
									operationId: `${run._id}:archive:${input.fileId}`,
									writerGeneration: run.writerGeneration,
									nodeId: input.nodeId,
									sequence: run.barrier,
									expectedContentRevision: input.contentRevision,
								},
							},
							token,
							transcripts_file_result,
						);
					await ctx.runMutation(internal.transcripts_db.validate_input, {
						...checkpoint,
						fileId: input.fileId,
						contentRevision: input.contentRevision,
						archived: true,
					});
				}
			} else if (run.phase === "publish") {
				const write = await ctx.runQuery(internal.transcripts_db.next_write, { runId: run._id, status: "prepared" });
				if (!write)
					await ctx.runMutation(internal.transcripts_db.advance, { ...checkpoint, phase: "archive", cursor: null });
				else {
					const receipt = await transcripts_host_post(
						"/api/v1/files/write",
						{
							path: write.path,
							expectedParentNodeId: write.expectedParentNodeId,
							content: write.content,
							contentType: "text/markdown;charset=utf-8",
							nonCollaborative: true,
							writer: {
								writerId: destination.writerId,
								operationId: write.operationId,
								writerGeneration: run.writerGeneration,
								sequence: run.barrier,
								expectedNodeId: write.expectedNodeId,
								expectedContentRevision: write.expectedContentRevision,
								expectedReaderRevision: write.expectedReaderRevision,
								contentHash: write.contentHash,
							},
						},
						token,
						transcripts_file_result,
					);
					if (!receipt.nodeId || !receipt.contentRevision)
						throw new Error("Bonobo Senate did not confirm the transcript content.");
					await ctx.runMutation(internal.transcripts_db.save_receipt, {
						...checkpoint,
						writeId: write._id,
						nodeId: receipt.nodeId,
						contentRevision: receipt.contentRevision,
					});
				}
			} else if (run.phase === "place") await ctx.runMutation(internal.transcripts_db.place, checkpoint);
			else if (run.phase === "finish" || run.phase === "activate" || run.phase === "jobs")
				await ctx.runMutation(internal.transcripts_db.finish, checkpoint);
			await ctx.runMutation(internal.transcripts_db.release, {
				...checkpoint,
				error: null,
				errorCode: null,
				retryAfterMs: null,
				definiteRefusal: false,
			});
		} catch (error) {
			const message = transcripts_get_error_message(error, "Files sync failed. Try again.");
			await ctx.runMutation(internal.transcripts_db.release, {
				...checkpoint,
				error: message,
				errorCode: transcripts_get_error_code(error, message),
				retryAfterMs: error instanceof transcripts_HostError ? error.retryAfterMs : null,
				definiteRefusal:
					!run.fenceUncertain &&
					error instanceof transcripts_HostError &&
					[400, 401, 403, 404, 409].includes(error.status),
			});
		}
	},
});
