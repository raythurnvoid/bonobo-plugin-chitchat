import { z } from "zod";
import { v } from "convex/values";
import { internalAction, internalMutation, type ActionCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import { transcripts_get_token, transcripts_host_post, transcripts_HostError } from "./transcripts_grants";
import { chatbe_rollover_path } from "../shared/transcript-markdown";
import { transcripts_decrypt, transcripts_encrypt } from "./transcripts_secrets";

export const transcripts_prepared = z.object({
	nodeId: z.string().nullable(),
	content: z.string().nullable(),
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
					"/api/internal/plugins/files/rollback-readers",
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
				// A definite mismatch proves this bearer did not commit the journal. Save the new proof before retrying.
				await ctx.runMutation(internal.transcripts_db.set_reader_rollback_source, {
					...checkpoint,
					sourceSecret: await transcripts_encrypt(token),
				});
				return;
			}
			if (!rollback.restored && !rollback.detached)
				throw new Error("Press has not restored the previous Files readers.");
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
			"/api/internal/plugins/files/prepare",
			{
				writerId: destination.writerId,
				path: chatbe_rollover_path(destination.folderPath, context.channel.transcriptSlug, 0),
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
			"/api/internal/plugins/files/readers",
			{
				writerId: destination.writerId,
				operationId: `${run._id}:${job.sequence}:readers:${run.readerAttempt}`,
				writerGeneration: run.writerGeneration,
				expectedReaderRevision: destination.readerRevision,
				readers: run.readerSnapshot.readers,
			},
			readerToken,
			transcripts_receipt,
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
			if (!cancelled) throw new Error("Channel access changed during Files sync. Try again.");
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
	if (operation.deleted && !destination.detached && run.readerStep === 0) {
		await transcripts_host_post(
			"/api/internal/plugins/files/archive",
			{
				writerId: destination.writerId,
				operationId: `${run._id}:delete`,
				writerGeneration: run.writerGeneration,
				path: destination.folderPath,
				nodeId: destination.folderNodeId,
				sequence: run.barrier,
			},
			token,
			transcripts_receipt,
		);
	}
	await ctx.runMutation(internal.transcripts_db.complete_control, {
		...checkpoint,
		readerRevision: Math.max(context.channel.membershipRevision, operation.readerRevision),
		...(run.kind === "reconcile" ? { foldedSequence: job.sequence } : {}),
	});
}

export const run_channel = internalAction({
	args: { channelId: v.id("channels") },
	returns: v.null(),
	handler: async (ctx, args): Promise<void> => {
		if (await ctx.runMutation(internal.channel_members.complete_without_files, args)) return;
		const reader = await ctx.runMutation(internal.transcripts_db.claim_readers, args);
		if (reader) {
			const checkpoint = { runId: reader.run._id, claim: reader.run.claim };
			try {
				const source =
					(await ctx.runQuery(internal.transcripts_grants.reader_source, args)) ?? reader.run.readerSourceSecret;
				if (!source) throw new Error("Connect Files sync again to continue.");
				await readers_step(ctx, reader, await transcripts_decrypt(source));
				await ctx.runMutation(internal.transcripts_db.release_readers, { ...checkpoint, error: null });
			} catch (error) {
				await ctx.runMutation(internal.transcripts_db.release_readers, {
					...checkpoint,
					error: error instanceof Error ? error.message : "Files readers could not be updated.",
				});
			}
			return;
		}
		const current = await ctx.runMutation(internal.transcripts_db.claim, args);
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
									"/api/internal/plugins/files/archive",
									{
										writerId: destination.writerId,
										operationId: `${previous._id}:archive:${input.fileId}`,
										writerGeneration: previous.writerGeneration,
										path: input.path,
										nodeId: input.nodeId,
										sequence: previous.barrier,
										expectedContentRevision: input.contentRevision,
									},
									token,
									transcripts_receipt,
								);
								archived = true;
							} catch (error) {
								if (!(error instanceof transcripts_HostError) || error.status !== 409) throw error;
								const prepared = await transcripts_host_post(
									"/api/internal/plugins/files/prepare",
									{ writerId: destination.writerId, path: input.path },
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
							"/api/internal/plugins/files/write",
							{
								writerId: destination.writerId,
								path: write.path,
								operationId: write.operationId,
								writerGeneration: previous.writerGeneration,
								sequence: previous.barrier,
								expectedParentNodeId: write.expectedParentNodeId,
								expectedNodeId: write.expectedNodeId,
								expectedContentRevision: write.expectedContentRevision,
								expectedReaderRevision: write.expectedReaderRevision,
								contentHash: write.contentHash,
								content: write.content,
							},
							token,
							transcripts_receipt,
						);
						if (!receipt.nodeId || !receipt.contentRevision)
							throw new Error("Press did not confirm the transcript content.");
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
							"/api/internal/plugins/files/prepare",
							{
								writerId: destination.writerId,
								path: write.path,
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
					"/api/internal/plugins/files/fence",
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
							"/api/internal/plugins/files/prepare",
							{ writerId: destination.writerId, path: input.file.path },
							token,
							transcripts_prepared,
						);
						if (prepared.nodeId !== input.file.nodeId || prepared.content === null || prepared.contentRevision === null)
							throw new Error("A transcript file moved or was replaced. Restore it before retrying.");
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
						"/api/internal/plugins/files/prepare",
						{ writerId: destination.writerId, path },
						token,
						transcripts_prepared,
					);
					const target = await ctx.runQuery(internal.transcripts_db.target, { runId: run._id, path });
					if (!target.file && prepared.nodeId !== null)
						throw new Error("Another file already uses this transcript path. Move it before retrying.");
					if (target.file && prepared.nodeId !== target.file.nodeId)
						throw new Error("A transcript file moved or was replaced. Restore it before retrying.");
					if (run.kind === "incremental" && target.input && prepared.contentRevision !== target.input.contentRevision)
						throw new Error("The transcript changed while its new parts were prepared. Rebuild the Files copy.");
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
						"/api/internal/plugins/files/prepare",
						{ writerId: destination.writerId, path: input.path },
						token,
						transcripts_prepared,
					);
					if (
						prepared.nodeId !== input.nodeId ||
						prepared.contentRevision === null ||
						(run.kind === "incremental" && prepared.contentRevision !== input.contentRevision)
					)
						throw new Error("The transcript changed while its new parts were prepared. Rebuild the Files copy.");
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
							"/api/internal/plugins/files/archive",
							{
								writerId: destination.writerId,
								operationId: `${run._id}:archive:${input.fileId}`,
								writerGeneration: run.writerGeneration,
								path: input.path,
								nodeId: input.nodeId,
								sequence: run.barrier,
								expectedContentRevision: input.contentRevision,
							},
							token,
							transcripts_receipt,
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
						"/api/internal/plugins/files/write",
						{
							writerId: destination.writerId,
							path: write.path,
							operationId: write.operationId,
							writerGeneration: run.writerGeneration,
							sequence: run.barrier,
							expectedParentNodeId: write.expectedParentNodeId,
							expectedNodeId: write.expectedNodeId,
							expectedContentRevision: write.expectedContentRevision,
							expectedReaderRevision: write.expectedReaderRevision,
							contentHash: write.contentHash,
							content: write.content,
						},
						token,
						transcripts_receipt,
					);
					if (!receipt.nodeId || !receipt.contentRevision)
						throw new Error("Press did not confirm the transcript content.");
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
				retryable: false,
				definiteRefusal: false,
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : "Files sync failed. Try again.";
			await ctx.runMutation(internal.transcripts_db.release, {
				...checkpoint,
				error: message,
				retryable: error instanceof TypeError || /timeout|timed out|temporarily|\(5\d\d\)|\(429\)/i.test(message),
				definiteRefusal:
					!run.fenceUncertain &&
					error instanceof transcripts_HostError &&
					[400, 401, 403, 404, 409].includes(error.status),
			});
		}
	},
});

export const sweep = internalMutation({
	args: {},
	returns: v.null(),
	handler: async (ctx) => {
		for (const status of ["pending", "running"] as const) {
			const states = await ctx.db
				.query("transcript_channels")
				.withIndex("by_status_nextAttemptAt", (q) => q.eq("status", status).lte("nextAttemptAt", Date.now()))
				.take(20);
			for (const state of states)
				await ctx.scheduler.runAfter(0, internal.transcripts_worker.run_channel, { channelId: state.channelId });
		}
		for (const phase of ["exchange", "renew", "seal"] as const) {
			const grants = await ctx.db
				.query("host_grants")
				.withIndex("by_phase_updatedAt", (q) => q.eq("phase", phase).lt("updatedAt", Date.now() - 60_000))
				.take(20);
			for (const grant of grants) {
				await ctx.db.patch("host_grants", grant._id, { updatedAt: Date.now() });
				await ctx.scheduler.runAfter(0, internal.transcripts_grants.connect, { grantId: grant._id });
			}
		}
		for (const status of ["pending", "running", "blocked"] as const) {
			const jobs = await ctx.db
				.query("transcript_jobs")
				.withIndex("by_kind_status_nextAttemptAt", (q) =>
					q.eq("operation.kind", "readers").eq("status", status).lte("nextAttemptAt", Date.now()),
				)
				.take(20);
			for (const job of jobs)
				await ctx.scheduler.runAfter(0, internal.transcripts_worker.run_channel, { channelId: job.channelId });
		}
		for (const status of ["pending", "running"] as const) {
			const indexes = await ctx.db
				.query("transcript_indexes")
				.withIndex("by_status", (q) => q.eq("status", status))
				.take(20);
			for (const index of indexes)
				await ctx.scheduler.runAfter(0, internal.transcripts_index.run, { indexId: index._id });
		}
	},
});
