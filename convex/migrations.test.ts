/// <reference types="vite/client" />
// TODO(migration): delete this file with `migrations.ts` in phase B.
import { convexTest } from "convex-test";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { internal } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

beforeEach(() => {
	vi.useFakeTimers();
	vi.setSystemTime(1_800_000_000_000);
});
afterEach(() => {
	vi.clearAllTimers();
	vi.useRealTimers();
});

describe("erase", () => {
	test("deletes reader rows and private transcript work, strips old fields, and keeps messages", async () => {
		const t = convexTest(schema, modules);

		// Seed rows in the shape that the reader-list code (before dc18f64) wrote.
		const seeded = await t.run(async (ctx) => {
			const installationId = await ctx.db.insert("installations", {
				hostInstallationId: "installation-one",
				hostOrganizationId: "org-one",
				hostWorkspaceId: "workspace-one",
				hostPluginVersionId: "version-one",
				hostServiceAccountId: "service-one",
				organizationOwnerUserId: "owner",
				status: "ready",
				appliedAccessRevision: 1,
				invalidatedAtRevision: 0,
				bootstrapStartRevision: 1,
				bootstrapCursor: null,
				bootstrapPhase: "events",
				bootstrapTargetRevision: 1,
				generation: "generation-one",
				outputRoot: null,
			});
			const channel = {
				installationId,
				generation: "generation-one",
				name: "general",
				sortName: "general",
				topic: "",
				createdBy: "alice",
				createdAt: 0,
				revision: 1,
				membershipRevision: 1,
				memberCount: 0,
				archivedAt: null,
				deletedAt: null,
				lastRootSequence: 1,
				lastReplySequence: 0,
				lastRootAt: 0,
				lastReplyAt: 0,
			};
			const publicId = await ctx.db.insert("channels", {
				...channel,
				publicId: "public",
				visibility: "public",
				transcriptSlug: "public",
			});
			const privateId = await ctx.db.insert("channels", {
				...channel,
				publicId: "private",
				visibility: "private",
				transcriptSlug: "private",
			});

			const message = {
				installationId,
				rootMessageId: null,
				marker: "marker",
				authorHostUserId: "alice",
				authorName: "alice",
				createdAt: 0,
				sequence: 1,
				channelReplySequence: null,
				text: "hello",
				attachments: [],
				mentions: [],
				revision: 1,
				editedAt: null,
				deletedAt: null,
			};
			await ctx.db.insert("messages", { ...message, channelId: publicId, visibility: "public", publicId: "m1" });
			const privateMessageId = await ctx.db.insert("messages", {
				...message,
				channelId: privateId,
				visibility: "private",
				publicId: "m2",
			});

			const state = {
				desiredSequence: 2,
				renderedSequence: 0,
				appliedSequence: 0,
				workerGeneration: 0,
				status: "pending" as const,
				error: null,
				nextAttemptAt: 0,
				readerRevision: 1,
			};
			await ctx.db.insert("transcript_channels", { ...state, channelId: publicId });
			const wakeJobId = await ctx.scheduler.runAt(Date.now() + 60_000, internal.transcripts_worker.dispatch, {
				channelId: privateId,
			});
			await ctx.db.insert("transcript_channels", { ...state, channelId: privateId, wakeJobId });

			const job = { attempts: 0, nextAttemptAt: 0, workerGeneration: 0, createdAt: 0, error: null };
			const header = { kind: "header" as const, name: "general", topic: "" };
			await ctx.db.insert("transcript_jobs", {
				...job,
				channelId: publicId,
				sequence: 1,
				operation: { ...header, isPrivate: false },
				status: "pending",
				retry: { failures: 1, since: 0 },
			});
			await ctx.db.insert("transcript_jobs", {
				...job,
				channelId: publicId,
				sequence: 2,
				operation: { kind: "archive", archived: true },
				status: "blocked",
			});
			await ctx.db.insert("transcript_jobs", {
				...job,
				channelId: privateId,
				sequence: 1,
				operation: { ...header, isPrivate: true },
				status: "complete",
			});
			await ctx.db.insert("transcript_jobs", {
				...job,
				channelId: privateId,
				sequence: 2,
				operation: { kind: "readers", readerRevision: 2, readers: [], deleted: false },
				status: "blocked",
				retry: { failures: 3, since: 0 },
			});

			const destination = {
				writerId: "writer",
				rootWriterId: "root-writer",
				rootNodeId: "root",
				folderNodeId: "folder",
				folderPath: "/chitchat",
				writerGeneration: 1,
				header: "",
				tailOrder: 0,
				runId: null,
				readerRevision: 1,
				detached: false,
				readerRunId: null,
				readerError: "Old reader error",
				readerErrorCode: "permission" as const,
			};
			await ctx.db.insert("transcript_destinations", { ...destination, channelId: publicId });
			await ctx.db.insert("transcript_destinations", { ...destination, channelId: privateId });

			const run = {
				recoveryRunId: null,
				barrier: 1,
				fenceUncertain: false,
				phase: "copy" as const,
				writerGeneration: 1,
				leaseUntil: 0,
				claim: "",
				startOrder: 0,
				endOrder: 0,
				cursor: null,
				foldedSequence: 0,
				header: "",
				outputOrder: 0,
				buffer: "",
				outputCount: 0,
				error: null,
				createdAt: 0,
				readerReceiptId: null,
				readerOriginalReceiptId: null,
				readerSourceSecret: null,
				readerRollbackSecret: null,
				readerAttempt: 0,
				readerRefresh: false,
				readerStep: 0,
				readerSnapshot: { revision: 1, readers: [{ userId: "alice", membershipLifetime: 1 }] },
			};
			const publicRunId = await ctx.db.insert("transcript_runs", { ...run, channelId: publicId, kind: "incremental" });
			const privateRunId = await ctx.db.insert("transcript_runs", { ...run, channelId: privateId, kind: "readers" });

			const write = {
				order: 0,
				path: "/chitchat/general.md",
				content: "",
				contentHash: "hash",
				expectedParentNodeId: "folder",
				expectedNodeId: null,
				expectedContentRevision: null,
				expectedReaderRevision: 1,
				operationId: "operation",
				nodeId: null,
				contentRevision: null,
				fileId: null,
				status: "prepared" as const,
			};
			await ctx.db.insert("transcript_writes", { ...write, runId: publicRunId });
			await ctx.db.insert("transcript_writes", { ...write, runId: privateRunId });

			const fileId = await ctx.db.insert("transcript_files", {
				channelId: privateId,
				order: 0,
				path: "/chitchat/private.md",
				nodeId: "file",
				contentRevision: "revision",
				content: "hello",
				header: "",
				active: true,
			});
			await ctx.db.insert("transcript_blocks", {
				channelId: privateId,
				messageId: privateMessageId,
				rootSequence: 1,
				replySequence: 0,
				text: "hello",
				fileId,
				start: 0,
				end: 5,
				sourceRevision: 1,
			});
			await ctx.db.insert("transcript_paths", {
				channelId: privateId,
				path: "/chitchat/private.md",
				fileId,
				archived: false,
			});

			await ctx.db.insert("host_grants", {
				installationId,
				channelId: privateId,
				sponsorUserId: "alice",
				sponsorLifetime: 1,
				clientRequestId: "connect",
				rootPath: "/chitchat",
				selectIndexOnReady: false,
				phase: "ready",
				lifecycleRequestId: "lifecycle",
				sourceSecret: "",
				interactiveSecret: null,
				interactiveExpiresAt: 0,
				sealedSecret: null,
				sealedExpiresAt: 0,
				error: null,
				updatedAt: 0,
			});
			const indexId = await ctx.db.insert("transcript_indexes", {
				installationId,
				grantChannelId: privateId,
				generation: "generation-one",
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
				status: "ready",
				error: null,
			});

			const request = { installationId, actorUserId: "alice", actorLifetime: 1, runId: null, grantId: null };
			await ctx.db.insert("transcript_requests", {
				...request,
				channelId: publicId,
				clientRequestId: "public",
				operation: "reconcile",
			});
			await ctx.db.insert("transcript_requests", {
				...request,
				channelId: privateId,
				clientRequestId: "private",
				operation: "connect",
			});

			const resultId = await ctx.db.insert("request_results", {
				installationId,
				actorHostUserId: "alice",
				clientRequestId: "leave",
				operation: "leave",
				fingerprint: "fingerprint",
				result: {
					kind: "membership",
					channelId: privateId,
					membershipRevision: 2,
					left: true,
					deleted: false,
					pending: true,
				},
				createdAt: 0,
			});
			await ctx.db.insert("channel_access_changes", {
				channelId: privateId,
				installationId,
				actorHostUserId: "alice",
				actorLifetime: 1,
				clientRequestId: "leave",
				operation: "leave",
				fingerprint: "fingerprint",
				expectedMembershipRevision: 1,
				readerRevision: 2,
				principals: [],
				deleted: false,
				left: true,
				status: "pending",
				createdAt: 0,
				hostReceiptId: null,
			});
			await ctx.db.insert("transcript_deletions", {
				channelId: privateId,
				installationId,
				actorHostUserId: null,
				actorLifetime: null,
				barrier: 1,
				archiveStartedAt: null,
				completedAt: null,
				cursor: 0,
				claim: "",
				leaseUntil: 0,
				nextAttemptAt: 0,
				error: null,
				prepared: null,
			});
			return { publicId, privateId, wakeJobId, indexId, resultId };
		});

		await t.mutation(internal.migrations.erase, {});
		await t.finishAllScheduledFunctions(() => vi.advanceTimersByTime(0), 1000);

		const after = await t.run(async (ctx) => ({
			messages: await ctx.db.query("messages").collect(),
			channels: await ctx.db.query("channels").collect(),
			states: await ctx.db.query("transcript_channels").collect(),
			jobs: await ctx.db.query("transcript_jobs").collect(),
			destinations: await ctx.db.query("transcript_destinations").collect(),
			runs: await ctx.db.query("transcript_runs").collect(),
			writes: await ctx.db.query("transcript_writes").collect(),
			files: await ctx.db.query("transcript_files").collect(),
			blocks: await ctx.db.query("transcript_blocks").collect(),
			paths: await ctx.db.query("transcript_paths").collect(),
			grants: await ctx.db.query("host_grants").collect(),
			requests: await ctx.db.query("transcript_requests").collect(),
			accessChanges: await ctx.db.query("channel_access_changes").collect(),
			deletions: await ctx.db.query("transcript_deletions").collect(),
			index: await ctx.db.get("transcript_indexes", seeded.indexId),
			result: await ctx.db.get("request_results", seeded.resultId),
			wake: await ctx.db.system.get("_scheduled_functions", seeded.wakeJobId),
		}));

		// Chat rows stay.
		expect(after.messages, "messages are kept").toHaveLength(2);
		expect(after.channels, "channels are kept").toHaveLength(2);

		// Private channels lose all transcript work, and their wake-up is cancelled.
		const privateRows = [
			...after.states,
			...after.jobs,
			...after.destinations,
			...after.runs,
			...after.files,
			...after.blocks,
			...after.paths,
			...after.grants,
			...after.requests,
		].filter((row) => row.channelId === seeded.privateId);
		expect(privateRows, "private channel transcript rows are deleted").toEqual([]);
		expect(after.writes, "writes of private runs are deleted").toHaveLength(1);
		expect(after.wake?.state.kind, "the private wake-up is cancelled").toBe("canceled");
		expect(after.index?.grantChannelId, "the index no longer uses the private Files connection").toBeUndefined();

		// The removed tables are empty.
		expect(after.accessChanges, "channel_access_changes rows are deleted").toEqual([]);
		expect(after.deletions, "transcript_deletions rows are deleted").toEqual([]);

		// Public rows keep their work, without the removed fields.
		expect(
			after.jobs.map(({ sequence, operation, status, retry }) => ({ sequence, operation, status, retry })),
			"public jobs lose isPrivate, retry, and the blocked status",
		).toEqual([
			{ sequence: 1, operation: { kind: "header", name: "general", topic: "" }, status: "pending", retry: undefined },
			{ sequence: 2, operation: { kind: "archive", archived: true }, status: "running", retry: undefined },
		]);
		expect(Object.keys(after.states[0]!), "channel states lose readerRevision").not.toContain("readerRevision");
		expect(
			Object.keys(after.destinations[0]!).filter((key) => key.startsWith("reader") || key === "detached"),
			"destinations lose reader fields",
		).toEqual([]);
		expect(
			Object.keys(after.runs[0]!).filter((key) => key.startsWith("reader")),
			"runs lose reader fields",
		).toEqual([]);
		expect(Object.keys(after.writes[0]!), "writes lose expectedReaderRevision").not.toContain("expectedReaderRevision");
		expect(after.result?.result, "request results lose pending").toEqual({
			kind: "membership",
			channelId: seeded.privateId,
			membershipRevision: 2,
			left: true,
			deleted: false,
		});
		expect(after.requests.map((request) => request.channelId)).toEqual([seeded.publicId]);
	});
});
