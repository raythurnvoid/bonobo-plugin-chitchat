/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { ConvexError } from "convex/values";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { z } from "zod";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { api, internal } from "./_generated/api";
import schema from "./schema";
import { transcripts_encrypt } from "./transcripts_secrets";
import { channel_members_remove_host_member } from "./channel_members";
import { chatbe_channel_header, chatbe_readme_markdown } from "../shared/transcript-markdown";
import { transcripts_get_error_message } from "./transcripts_worker";

const modules = import.meta.glob("./**/*.ts");
const ROOT = "/chitchat-test-generation";

beforeEach(() => {
	vi.useFakeTimers();
	vi.setSystemTime(1_800_000_000_000);
	process.env.CHITCHAT_GRANT_ENCRYPTION_KEY = btoa("k".repeat(32));
});
afterEach(() => {
	vi.clearAllTimers();
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

function host(isPrivate = false) {
	const files = new Map<string, { nodeId: string; content: string; revision: string }>();
	const archived = new Map<string, { nodeId: string; content: string; revision: string }>();
	const receipts = new Map<string, object>();
	const fileSequences = new Map<string, number>();
	const generations = new Map<string, number>([
		["writer", 1],
		["root-writer", 1],
	]);
	let writes = 0;
	let loseNextWrite = false;
	let loseBeforeWrite = false;
	let loseNextArchive = false;
	let failFence: "refused" | "lost" | null = null;
	let readerRevision: number | null = isPrivate ? 1 : null;
	let readers = isPrivate
		? [
				{ userId: "alice", membershipLifetime: 1 },
				{ userId: "bob", membershipLifetime: 1 },
			]
		: [];
	const readerJournals = new Map<string, typeof readers>();
	const readerProofs = new Map<string, string>();
	const cancelledReaderOperations = new Set<string>();
	let oldTokenExpired = false;
	let oldTokenForgotten = false;
	let oldVersionChanged = false;
	let detached = false;
	let afterReaders: (() => Promise<void>) | null = null;
	let beforeWrite: (() => Promise<void>) | null = null;
	let denyWrites = false;
	let failWritePath: string | null = null;
	let refuseRollback = false;
	const removedReaders = new Set<string>();
	const writeBody = z.object({
		writerId: z.string(),
		path: z.string(),
		operationId: z.string(),
		writerGeneration: z.number(),
		sequence: z.number(),
		expectedNodeId: z.string().nullable(),
		expectedContentRevision: z.string().nullable(),
		content: z.string(),
		expectedReaderRevision: z.number().nullable(),
	});
	vi.stubGlobal(
		"fetch",
		vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
			const path = new URL(String(input)).pathname;
			const body: unknown = JSON.parse(String(init?.body));
			const bearer = new Headers(init?.headers).get("Authorization") ?? "";
			if (path.endsWith("/write") && beforeWrite) {
				const callback = beforeWrite;
				beforeWrite = null;
				await callback();
			}
			if (oldTokenExpired && bearer === "Bearer psg_sealed" && !path.endsWith("/rollback-readers"))
				return Response.json({ message: "Unauthenticated" }, { status: 401 });
			if (denyWrites && !path.endsWith("/rollback-readers"))
				return Response.json({ message: "Permission denied" }, { status: 403 });
			if (path.endsWith("/rollback-readers")) {
				if (refuseRollback)
					return Response.json({ message: "The Files readers changed after this update." }, { status: 409 });
				const request = z
					.object({
						operationId: z.string(),
						receiptId: z.string().optional(),
						originalReaderOperationId: z.string().optional(),
					})
					.parse(body);
				if (receipts.has(request.operationId)) return Response.json(receipts.get(request.operationId));
				const originalId = request.receiptId ?? request.originalReaderOperationId!;
				const proof = readerProofs.get(originalId);
				if (
					(oldVersionChanged && bearer === "Bearer psg_sealed") ||
					(!oldVersionChanged && proof && proof !== bearer) ||
					(!proof && oldTokenForgotten && bearer === "Bearer psg_sealed")
				)
					return Response.json({ message: "Unauthenticated", code: "reader_proof_mismatch" }, { status: 401 });
				readers = (readerJournals.get(request.receiptId ?? request.originalReaderOperationId!) ?? readers).filter(
					(reader) => !removedReaders.has(reader.userId),
				);
				readerRevision = (readerRevision ?? 0) + 1;
				cancelledReaderOperations.add(originalId);
				readerProofs.set(originalId, bearer);
				const acknowledgement = { _id: request.operationId, readerRevision, detached: false, restored: true };
				receipts.set(request.operationId, acknowledgement);
				return Response.json(acknowledgement);
			}
			if (path.endsWith("/readers")) {
				const request = z
					.object({
						operationId: z.string(),
						expectedReaderRevision: z.number(),
						writerGeneration: z.number(),
						readers: z.array(z.object({ userId: z.string(), membershipLifetime: z.number() })),
					})
					.parse(body);
				if (cancelledReaderOperations.has(request.operationId))
					return Response.json({ message: "This operation was already used" }, { status: 409 });
				if (request.writerGeneration !== generations.get("writer"))
					return Response.json({ message: "Stale reader writer generation" }, { status: 409 });
				if (receipts.has(request.operationId)) return Response.json(receipts.get(request.operationId));
				if (request.expectedReaderRevision !== readerRevision)
					return Response.json({ message: "Stale readers" }, { status: 409 });
				readerJournals.set(request.operationId, readers);
				readerProofs.set(request.operationId, bearer);
				readers = request.readers;
				readerRevision++;
				const receipt = {
					_id: request.operationId,
					nodeId: "folder",
					contentRevision: null,
					writerGeneration: request.writerGeneration,
					readerRevision,
					operationId: request.operationId,
				};
				receipts.set(request.operationId, receipt);
				if (afterReaders) {
					const callback = afterReaders;
					afterReaders = null;
					await callback();
				}
				return Response.json(receipt);
			}
			if (path.endsWith("/prepare")) {
				const request = z.object({ writerId: z.string(), path: z.string() }).parse(body);
				const file = files.get(request.path);
				return Response.json({
					nodeId: file?.nodeId ?? null,
					content: file?.content ?? null,
					contentRevision: file?.revision ?? null,
					expectedParentNodeId: "folder",
					writerGeneration: generations.get(request.writerId),
					readerRevision,
					detached,
				});
			}
			if (path.endsWith("/fence")) {
				if (failFence === "refused") {
					failFence = null;
					return Response.json({ message: "This item is read-only." }, { status: 409 });
				}
				const request = z
					.object({
						writerId: z.string(),
						operationId: z.string(),
						writerGeneration: z.number(),
						nextGeneration: z.number(),
					})
					.parse(body);
				if (receipts.has(request.operationId)) return Response.json(receipts.get(request.operationId));
				if (generations.get(request.writerId) !== request.writerGeneration)
					return Response.json({ message: "Stale writer" }, { status: 409 });
				generations.set(request.writerId, request.nextGeneration);
				const receipt = {
					_id: request.operationId,
					nodeId: "folder",
					contentRevision: null,
					writerGeneration: request.nextGeneration,
					readerRevision: null,
					operationId: request.operationId,
				};
				receipts.set(request.operationId, receipt);
				if (failFence === "lost") {
					failFence = null;
					throw new TypeError("Fence response lost");
				}
				return Response.json(receipt);
			}
			if (path.endsWith("/write")) {
				const request = writeBody.parse(body);
				if (loseBeforeWrite) {
					loseBeforeWrite = false;
					throw new TypeError("Write request lost before commit");
				}
				if (request.path === failWritePath) {
					failWritePath = null;
					return Response.json({ message: "The content revision changed." }, { status: 409 });
				}
				if (generations.get(request.writerId) !== request.writerGeneration)
					return Response.json({ message: "Stale writer" }, { status: 409 });
				if (receipts.has(request.operationId)) return Response.json(receipts.get(request.operationId));
				if (request.expectedReaderRevision !== readerRevision)
					return Response.json({ message: "Stale readers" }, { status: 409 });
				const file = files.get(request.path);
				if (
					(file?.nodeId ?? null) !== request.expectedNodeId ||
					(file?.revision ?? null) !== request.expectedContentRevision
				)
					return Response.json({ message: "The content revision changed." }, { status: 409 });
				if (new TextEncoder().encode(request.content).byteLength > 100_000) throw new Error("File guard exceeded");
				writes++;
				const saved = {
					nodeId: file?.nodeId ?? `file-${writes}`,
					content: request.content,
					revision: `revision-${writes}`,
				};
				files.set(request.path, saved);
				fileSequences.set(`${request.writerId}:${request.writerGeneration}:${request.path}`, request.sequence);
				const receipt = {
					_id: request.operationId,
					nodeId: saved.nodeId,
					contentRevision: saved.revision,
					writerGeneration: request.writerGeneration,
					readerRevision: request.expectedReaderRevision,
					operationId: request.operationId,
				};
				receipts.set(request.operationId, receipt);
				if (loseNextWrite) {
					loseNextWrite = false;
					throw new TypeError("Network response lost");
				}
				return Response.json(receipt);
			}
			if (path.endsWith("/archive")) {
				if (detached) return Response.json({ message: "The transcript readers are managed in Files" }, { status: 409 });
				const request = z
					.object({
						writerId: z.string(),
						path: z.string(),
						nodeId: z.string(),
						operationId: z.string(),
						writerGeneration: z.number(),
						sequence: z.number(),
						expectedContentRevision: z.string().optional(),
					})
					.parse(body);
				if (receipts.has(request.operationId)) return Response.json(receipts.get(request.operationId));
				const sequenceKey = `${request.writerId}:${request.writerGeneration}:${request.path}`;
				if ((fileSequences.get(sequenceKey) ?? -1) >= request.sequence)
					return Response.json({ message: "A newer transcript write already exists" }, { status: 409 });
				if (files.get(request.path)?.nodeId !== request.nodeId)
					return Response.json({ message: "Wrong archive target" }, { status: 409 });
				if (
					request.expectedContentRevision !== undefined &&
					request.expectedContentRevision !== files.get(request.path)?.revision
				)
					return Response.json({ message: "Archive content changed" }, { status: 409 });
				archived.set(request.path, files.get(request.path)!);
				files.delete(request.path);
				fileSequences.set(sequenceKey, request.sequence);
				const receipt = {
					_id: request.operationId,
					nodeId: request.nodeId,
					contentRevision: null,
					writerGeneration: request.writerGeneration,
					readerRevision: null,
					operationId: request.operationId,
				};
				receipts.set(request.operationId, receipt);
				if (loseNextArchive) {
					loseNextArchive = false;
					throw new TypeError("Archive response lost");
				}
				return Response.json(receipt);
			}
			if (path.endsWith("/ensure")) {
				const request = z.object({ channelId: z.string() }).parse(body);
				return Response.json({
					writerId: request.channelId === "__root" ? "root-writer" : "writer",
					rootNodeId: "folder",
					folderNodeId: "folder",
					writerGeneration: generations.get(request.channelId === "__root" ? "root-writer" : "writer"),
					readerRevision,
					detached,
					created: false,
				});
			}
			throw new Error(`Unexpected Press call: ${path}`);
		}),
	);
	return {
		files,
		archived,
		receipts,
		generations,
		loseWrite: (beforeCommit = false) => {
			loseNextWrite = !beforeCommit;
			loseBeforeWrite = beforeCommit;
		},
		failFence: (failure: "refused" | "lost") => {
			failFence = failure;
		},
		writes: () => writes,
		readers: () => readers,
		afterReaders: (callback: () => Promise<void>) => {
			afterReaders = callback;
		},
		beforeWrite: (callback: () => Promise<void>) => {
			beforeWrite = callback;
		},
		denyWrites: (denied = true) => {
			denyWrites = denied;
		},
		loseArchive: () => {
			loseNextArchive = true;
		},
		failWrite: (path: string) => {
			failWritePath = path;
		},
		refuseRollback: () => {
			refuseRollback = true;
		},
		removeReader: (userId: string) => {
			removedReaders.add(userId);
		},
		expireToken: (forget = false) => {
			oldTokenExpired = true;
			oldTokenForgotten = forget;
		},
		upgrade: () => {
			oldTokenExpired = true;
			oldVersionChanged = true;
		},
		detach: () => {
			detached = true;
		},
	};
}

async function fixture(isPrivate = false) {
	const remote = host(isPrivate);
	const t = convexTest(schema, modules);
	const installationId = await t.run(async (ctx) => {
		const id = await ctx.db.insert("installations", {
			hostInstallationId: "installation-one",
			hostOrganizationId: "org-one",
			hostWorkspaceId: "workspace-one",
			hostPluginVersionId: "version-one",
			hostServiceAccountId: "service-one",
			organizationOwnerUserId: "alice",
			status: "ready",
			appliedAccessRevision: 1,
			invalidatedAtRevision: 0,
			bootstrapStartRevision: 1,
			bootstrapCursor: null,
			bootstrapPhase: "events",
			bootstrapTargetRevision: 1,
			generation: "generation-one",
			outputRoot: ROOT,
		});
		await ctx.db.insert("workspace_members", {
			installationId: id,
			hostUserId: "alice",
			hostMembershipId: "membership-alice",
			membershipLifetime: 1,
			active: true,
			displayName: "Alice",
			revision: 1,
			canRead: true,
			canWrite: true,
			isOwner: true,
			cleanupPending: false,
		});
		for (const userId of ["bob", "charlie"])
			await ctx.db.insert("workspace_members", {
				installationId: id,
				hostUserId: userId,
				hostMembershipId: `membership-${userId}`,
				membershipLifetime: 1,
				active: true,
				displayName: userId,
				revision: 1,
				canRead: true,
				canWrite: true,
				isOwner: false,
				cleanupPending: false,
			});
		await ctx.db.insert("sessions", {
			installationId: id,
			hostSessionId: "session-alice",
			exchangeId: "exchange-alice",
			hostUserId: "alice",
			hostMembershipId: "membership-alice",
			membershipLifetime: 1,
			requiredRevision: 1,
			validatedAt: Date.now(),
			expiresAt: Date.now() + 30_000,
			canRead: true,
			canWrite: true,
			isOwner: true,
			displayName: "Alice",
			revokedAt: null,
			revokedRevision: null,
			expiryJobId: null,
		});
		return id;
	});
	const alice = t.withIdentity({
		issuer: "https://press.test/plugins/chitchat",
		subject: "session-alice",
		exchangeId: "exchange-alice",
	});
	const created = await alice.mutation(api.channels.create, {
		clientRequestId: "create",
		name: "General",
		topic: "Team chat",
		visibility: isPrivate ? "private" : "public",
		invitedUserIds: isPrivate ? ["bob"] : [],
	});
	if (!created._yay || created._yay.kind !== "channel") throw new Error("Channel creation failed");
	const channelId = created._yay.channelId;
	const channel = (await alice.query(api.channels.get, { channelId }))!;
	await t.run(async (ctx) => {
		await ctx.db.insert("host_grants", {
			installationId,
			channelId,
			sponsorUserId: "alice",
			sponsorLifetime: 1,
			clientRequestId: "connect",
			rootPath: ROOT,
			selectIndexOnReady: false,
			phase: "ready",
			lifecycleRequestId: "seal",
			sourceSecret: "",
			interactiveSecret: await transcripts_encrypt("psg_interactive"),
			interactiveExpiresAt: Date.now() + 86_400_000,
			sealedSecret: await transcripts_encrypt("psg_sealed"),
			sealedExpiresAt: Date.now() + 6 * 86_400_000,
			error: null,
			updatedAt: Date.now(),
		});
		await ctx.db.insert("transcript_destinations", {
			channelId,
			writerId: "writer",
			rootWriterId: "root-writer",
			rootNodeId: "folder",
			folderNodeId: "folder",
			folderPath: isPrivate ? `${ROOT}/private/${channel.transcriptSlug}` : ROOT,
			writerGeneration: 1,
			readerRevision: isPrivate ? 1 : null,
			detached: false,
			header: chatbe_channel_header(channel.name, channel.topic, isPrivate),
			tailOrder: 0,
			runId: null,
			readerRunId: null,
			readerError: null,
		});
		const index = await ctx.db.query("transcript_indexes").first();
		if (index) await ctx.db.patch("transcript_indexes", index._id, { grantChannelId: channelId });
	});
	const send = async (text: string, key: string = crypto.randomUUID()) => {
		const result = await alice.mutation(api.messages.send, {
			channelId,
			clientRequestId: key,
			text,
			attachments: [],
			mentions: [],
		});
		if (!result._yay || result._yay.kind !== "message") throw new Error(result._nay?.message ?? "Message send failed");
		return result._yay;
	};
	const drain = async (expectBlocked = false) => {
		for (let step = 0; step < 3000; step++) {
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			const status = await alice.query(api.transcripts.status, { channelId });
			if (status?.status === "blocked") {
				if (expectBlocked) return status;
				throw new Error(status.error ?? "Transcript blocked");
			}
			if (status?.status === "ready" && status.appliedSequence === status.desiredSequence) return status;
		}
		throw new Error("Transcript worker did not finish");
	};
	const reconnect = async (targetChannelId = channelId, actorHostUserId = "alice") => {
		const actor = (await t.run(
			async (ctx) =>
				await ctx.db
					.query("workspace_members")
					.withIndex("by_installation_hostUserId", (q) =>
						q.eq("installationId", installationId).eq("hostUserId", actorHostUserId),
					)
					.unique(),
		))!;
		const session = (await t.run(
			async (ctx) =>
				await ctx.db
					.query("sessions")
					.withIndex("by_hostSessionId", (q) => q.eq("hostSessionId", `session-${actorHostUserId}`))
					.unique(),
		))!;
		const actorClient = t.withIdentity({
			issuer: "https://press.test/plugins/chitchat",
			subject: session.hostSessionId,
			exchangeId: session.exchangeId,
		});
		const filesFetch = fetch;
		const keys = await generateKeyPair("ES256");
		const publicKey = { ...(await exportJWK(keys.publicKey)), kid: "reconnect", alg: "ES256", use: "sig" };
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
				const path = new URL(String(input)).pathname;
				if (path === "/.well-known/jwks.json") return Response.json({ keys: [publicKey] });
				if (path.endsWith("/chitchat/lease")) {
					const request = z
						.object({ exchangeId: z.string(), requestedExpiresAt: z.number() })
						.parse(JSON.parse(String(init?.body)));
					const jwt = await new SignJWT({
						hostSessionId: session.hostSessionId,
						hostUserId: actorHostUserId,
						hostMembershipId: actor.hostMembershipId,
						hostOrganizationId: "org-one",
						hostWorkspaceId: "workspace-one",
						hostInstallationId: "installation-one",
						hostPluginVersionId: "version-one",
						hostServiceAccountId: "service-one",
						membershipLifetime: actor.membershipLifetime,
						requiredRevision: 1,
						canRead: actor.canRead,
						canWrite: actor.canWrite,
						isOwner: actor.isOwner,
						organizationOwnerUserId: actorHostUserId,
						displayName: actor.displayName,
						exchangeId: request.exchangeId,
						validatedAt: Date.now(),
						expiresAt: request.requestedExpiresAt,
					})
						.setProtectedHeader({ alg: "ES256", kid: "reconnect" })
						.setIssuer("https://press.test/plugins/chitchat")
						.setAudience("chitchat")
						.setSubject(session.hostSessionId)
						.setExpirationTime(Math.floor(request.requestedExpiresAt / 1000))
						.sign(keys.privateKey);
					return Response.json({ jwt });
				}
				if (!path.includes("service-grants")) return await filesFetch(input, init);
				if (path.endsWith("/recover")) return Response.json({ message: "No saved grant response" }, { status: 404 });
				return Response.json({
					token: path.endsWith("/exchange") ? "psg_fresh_interactive" : "psg_fresh_sealed",
					expiresAt: Date.now() + 86_400_000,
					scopes: path.endsWith("/exchange") ? [] : ["files:write"],
					actorUserId: actorHostUserId,
					organizationId: "org-one",
					workspaceId: "workspace-one",
					installationId: "installation-one",
				});
			}),
		);
		expect(
			(
				await actorClient.action(api.transcripts.connect, {
					channelId: targetChannelId,
					pluginToken: "plu_current",
					clientRequestId: crypto.randomUUID(),
				})
			)._nay,
		).toBeUndefined();
		const grant = (await t.run(
			async (ctx) =>
				await ctx.db
					.query("host_grants")
					.withIndex("by_channel", (q) => q.eq("channelId", targetChannelId))
					.unique(),
		))!;
		for (let step = 0; step < 3; step++) await t.action(internal.transcripts_grants.connect, { grantId: grant._id });
		return (await t.run(async (ctx) => await ctx.db.get("host_grants", grant._id)))!;
	};
	const drainDeletion = async () => {
		for (let step = 0; step < 3000; step++) {
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			const deletion = await t.run(async (ctx) => await ctx.db.query("transcript_deletions").first());
			if (deletion?.completedAt !== null && deletion?.completedAt !== undefined) return deletion;
		}
		throw new Error("Transcript deletion did not finish");
	};
	return { t, alice, installationId, channelId, channel, remote, send, drain, drainDeletion, reconnect };
}

describe("transcripts_get_error_message", () => {
	test("uses the expected refusal data instead of transport diagnostics", () => {
		const error = new ConvexError("A transcript block is missing or repeated.");
		error.message = "Uncaught ConvexError: transport diagnostics\n    at handler (transcripts_db.ts:304:15)";
		expect(transcripts_get_error_message(error, "Files sync failed.")).toBe(
			"A transcript block is missing or repeated.",
		);
	});

	test("keeps existing messages for other errors and rejects non-string error data", () => {
		const error = new ConvexError({ message: "An object payload" });
		error.message = "Existing diagnostics";
		expect(transcripts_get_error_message(error, "Files sync failed.")).toBe("Existing diagnostics");
		expect(transcripts_get_error_message(new TypeError("Request timed out"), "Files sync failed.")).toBe(
			"Request timed out",
		);
		expect(transcripts_get_error_message(null, "Files sync failed.")).toBe("Files sync failed.");
	});
});

describe("transcript publication", () => {
	test.each(["committed", "uncommitted"])(
		"rebuild settles an uncertain %s initial write before fencing",
		async (outcome) => {
			const { t, alice, channelId, channel, remote, send, drain } = await fixture();
			await send("Latest chat text");
			remote.loseWrite(outcome === "uncommitted");
			for (let step = 0; step < 40; step++) {
				await t.action(internal.transcripts_worker.run_channel, { channelId });
				if ((await alice.query(api.transcripts.status, { channelId }))?.error) break;
			}
			const main = `${ROOT}/${channel.transcriptSlug}.md`;
			const initialId = remote.files.get(main)?.nodeId;
			expect((await alice.query(api.transcripts.status, { channelId }))?.error).toContain("lost");
			expect(
				(await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "recover-initial" }))._nay,
			).toBeUndefined();
			await drain();
			const saved = remote.files.get(main)!;
			if (initialId) expect(saved.nodeId).toBe(initialId);
			expect(saved.content.match(/Latest chat text/g)).toHaveLength(1);
			expect(remote.files.size).toBe(1);
		},
	);

	test("a new confirmed rebuild replaces a blocked prepared revision", async () => {
		const { t, alice, channelId, channel, remote, send, drain } = await fixture();
		await send("Canonical chat text");
		await drain();
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "first-confirmation" });
		for (let step = 0; step < 40; step++) {
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			const run = await t.run(async (ctx) => {
				const destination = await ctx.db.query("transcript_destinations").first();
				return destination?.runId ? await ctx.db.get("transcript_runs", destination.runId) : null;
			});
			if (run?.phase === "publish") break;
		}
		const main = `${ROOT}/${channel.transcriptSlug}.md`;
		const saved = remote.files.get(main)!;
		saved.content += "\nHuman text after preparation";
		saved.revision = "manual-between-prepare-and-write";
		expect((await drain(true))?.error).toContain("revision changed");
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "second-confirmation" });
		await drain();
		expect(remote.files.get(main)!.content).toContain("Canonical chat text");
		expect(remote.files.get(main)!.content).not.toContain("Human text");
		remote.files.get(main)!.content += "\nKeep later human text";
		remote.files.get(main)!.revision = "later-manual-edit";
		const writes = remote.writes();
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "first-confirmation" });
		await drain();
		expect(remote.writes()).toBe(writes);
		expect(remote.files.get(main)!.content).toContain("Keep later human text");
	});

	test("rebuild recovers a new numbered part after its write reply was lost", async () => {
		const { t, alice, channelId, channel, remote, send, drain } = await fixture();
		for (let index = 0; index < 6; index++) await send(`${index}: ${"x".repeat(15_000)}`);
		await drain();
		const main = `${ROOT}/${channel.transcriptSlug}.md`;
		const mainId = remote.files.get(main)!.nodeId;
		await send(`rollover: ${"y".repeat(15_000)}`);
		remote.loseWrite();
		for (let step = 0; step < 40; step++) {
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			if ((await alice.query(api.transcripts.status, { channelId }))?.error) break;
		}
		const numbered = [...remote.files.entries()].find(([path]) => path !== main)!;
		expect(numbered).toBeDefined();
		const numberedId = numbered[1].nodeId;
		await send("Newest message during recovery");
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "recover-numbered" });
		await drain();
		expect(remote.files.get(main)!.nodeId).toBe(mainId);
		expect(remote.files.get(numbered[0])!.nodeId).toBe(numberedId);
		const allText = [...remote.files.values()].map((file) => file.content).join("\n");
		expect(allText.match(/Newest message during recovery/g)).toHaveLength(1);
		expect(await t.run(async (ctx) => await ctx.db.query("transcript_blocks").collect())).toHaveLength(8);
	});

	test("preserves the Markdown format and recovers a lost write without duplicate blocks", async () => {
		const { t, alice, channelId, channel, remote, send, drain } = await fixture();
		await drain();
		const main = `${ROOT}/${channel.transcriptSlug}.md`;
		const originalId = remote.files.get(main)!.nodeId;
		await send("Hello from chat", "send-once");
		remote.loseWrite();
		for (let step = 0; step < 30 && remote.writes() < 2; step++)
			await t.action(internal.transcripts_worker.run_channel, { channelId });
		expect(remote.writes()).toBe(2);
		await alice.mutation(api.transcripts.retry, { channelId });
		await drain();
		expect(remote.files.get(main)!.nodeId).toBe(originalId);
		expect(remote.files.get(main)!.content.match(/Hello from chat/g)).toHaveLength(1);
		expect(remote.writes()).toBe(2);
	});

	test("finds an old reply beyond eight files and repacks a complete suffix", async () => {
		const { t, alice, channelId, channel, remote, send, drain } = await fixture();
		const first = await send("First root");
		for (let index = 0; index < 70; index++) await send(`${index}: ${"x".repeat(15_000)}`);
		expect(
			(await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "first-rebuild" }))._nay,
		).toBeUndefined();
		await drain();
		expect(remote.files.size).toBeGreaterThan(8);
		const main = `${ROOT}/${channel.transcriptSlug}.md`;
		const mainId = remote.files.get(main)!.nodeId;
		const reply = await alice.mutation(api.messages.reply, {
			rootMessageId: first.messageId,
			clientRequestId: "old-reply",
			text: `Reply to the oldest root ${"r".repeat(15_000)}`,
			attachments: [],
			mentions: [],
		});
		expect(reply._nay).toBeUndefined();
		await drain();
		const oldest = remote.files.get(`${ROOT}/${channel.transcriptSlug}.001.md`)!.content;
		expect(oldest.indexOf("Reply to the oldest root")).toBeGreaterThan(oldest.indexOf("First root"));
		expect(oldest.indexOf("Reply to the oldest root")).toBeLessThan(oldest.indexOf("0: xxx"));
		expect(remote.files.get(main)!.nodeId).toBe(mainId);
		for (const file of remote.files.values())
			expect(new TextEncoder().encode(file.content).byteLength).toBeLessThanOrEqual(100_000);
		const blocks = await t.run(async (ctx) => await ctx.db.query("transcript_blocks").collect());
		expect(blocks).toHaveLength(72);
	});

	test("preserves manual text and refuses ambiguous owned blocks before reconcile", async () => {
		const { t, alice, channelId, channel, remote, send, drain } = await fixture();
		const first = await send("Original text");
		await drain();
		const main = `${ROOT}/${channel.transcriptSlug}.md`;
		const file = remote.files.get(main)!;
		file.content += "\n\nA manual note.";
		file.revision = "manual-revision";
		await alice.mutation(api.messages.edit, {
			messageId: first.messageId,
			expectedRevision: 1,
			clientRequestId: "edit",
			text: "Updated text",
			mentions: [],
		});
		await drain();
		expect(remote.files.get(main)!.content).toContain("A manual note.");
		const block = await t.run(
			async (ctx) =>
				await ctx.db
					.query("transcript_blocks")
					.withIndex("by_message", (q) => q.eq("messageId", first.messageId))
					.unique(),
		);
		remote.files.get(main)!.content += `\n\n${block!.text}`;
		remote.files.get(main)!.revision = "duplicated-block";
		await alice.mutation(api.messages.edit, {
			messageId: first.messageId,
			expectedRevision: 2,
			clientRequestId: "edit-again",
			text: "Final text",
			mentions: [],
		});
		expect((await drain(true))?.error).toBe(
			"A transcript block is missing or repeated. Rebuild the Files copy to replace it.",
		);
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "repair" });
		await drain();
		expect(remote.files.get(main)!.content.match(/Final text/g)).toHaveLength(1);
		expect(remote.files.get(main)!.content).not.toContain("A manual note.");
		expect(remote.generations.get("writer")).toBe(2);
	});

	test("keeps a completed rebuild request idempotent after later manual edits", async () => {
		const { t, alice, channelId, channel, remote, send, drain } = await fixture();
		await send("Saved text");
		await drain();
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "rebuild-once" });
		await drain();
		const main = `${ROOT}/${channel.transcriptSlug}.md`;
		remote.files.get(main)!.content += "\nA new manual note.";
		remote.files.get(main)!.revision = "manual-after-rebuild";
		const before = remote.writes();
		expect(
			(await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "rebuild-once" }))._nay,
		).toBeUndefined();
		await drain();
		expect(remote.writes()).toBe(before);
		expect(remote.files.get(main)!.content).toContain("A new manual note.");
		expect(await t.run(async (ctx) => (await ctx.db.query("transcript_requests").collect()).length)).toBe(1);
	});

	test("reconcile keeps its source barrier while a later edit waits", async () => {
		const { t, alice, channelId, channel, remote, send, drain } = await fixture();
		const first = await send("At the barrier");
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "frozen-view" });
		const barrier = (await alice.query(api.transcripts.status, { channelId }))!.desiredSequence;
		await alice.mutation(api.messages.edit, {
			messageId: first.messageId,
			expectedRevision: 1,
			clientRequestId: "later-edit",
			text: "After the barrier",
			mentions: [],
		});
		for (let step = 0; step < 50; step++) {
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			if ((await alice.query(api.transcripts.status, { channelId }))!.appliedSequence >= barrier) break;
		}
		const main = `${ROOT}/${channel.transcriptSlug}.md`;
		expect(remote.files.get(main)!.content).toContain("At the barrier");
		expect(remote.files.get(main)!.content).not.toContain("After the barrier");
		await drain();
		expect(remote.files.get(main)!.content).toContain("After the barrier");
	});

	test("rebuild settles a lost archive after a temporary permission refusal", async () => {
		const { t, alice, channelId, channel, remote, send, drain } = await fixture();
		const messages = [];
		for (let index = 0; index < 7; index++) messages.push(await send(`${index}: ${"x".repeat(15_000)}`));
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "large-history" });
		await drain();
		expect(remote.files.size).toBe(2);
		for (const message of messages)
			await alice.mutation(api.messages.edit, {
				messageId: message.messageId,
				expectedRevision: 1,
				clientRequestId: `shrink-${message.messageId}`,
				text: "Short message",
				mentions: [],
			});
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "compact-history" });
		remote.loseArchive();
		for (let step = 0; step < 80; step++) {
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			if ((await alice.query(api.transcripts.status, { channelId }))?.error) break;
		}
		expect((await alice.query(api.transcripts.status, { channelId }))?.error).toContain("Archive response lost");
		remote.denyWrites();
		await alice.mutation(api.transcripts.retry, { channelId });
		expect((await drain(true))?.error).toContain("Permission denied");
		remote.denyWrites(false);
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "recover-archive" });
		await drain();
		expect(remote.files.size).toBe(1);
		expect(remote.files.get(`${ROOT}/${channel.transcriptSlug}.md`)!.content.match(/Short message/g)).toHaveLength(7);
	});

	test("reconcile retains all messages and archives surplus parts from a failed repack", async () => {
		const { t, alice, channelId, channel, remote, send, drain } = await fixture();
		const first = await send("small");
		for (let index = 0; index < 12; index++) await send(`${index}: ${"x".repeat(15_000)}`);
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "initial" });
		await drain();
		expect(remote.files.size).toBe(2);
		const main = `${ROOT}/${channel.transcriptSlug}.md`;
		const mainId = remote.files.get(main)!.nodeId;
		await alice.mutation(api.messages.edit, {
			messageId: first.messageId,
			expectedRevision: 1,
			clientRequestId: "grow",
			text: "y".repeat(15_000),
			mentions: [],
		});
		remote.failWrite(main);
		await drain(true);
		expect(remote.files.size).toBe(3);
		await alice.mutation(api.messages.edit, {
			messageId: first.messageId,
			expectedRevision: 2,
			clientRequestId: "shrink",
			text: "small again",
			mentions: [],
		});
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "repair-partial" });
		await drain();
		expect(remote.files.size).toBe(2);
		expect(remote.files.get(main)!.nodeId).toBe(mainId);
		const blocks = await t.run(async (ctx) => await ctx.db.query("transcript_blocks").collect());
		expect(blocks).toHaveLength(13);
		for (const block of blocks)
			expect([...remote.files.values()].filter((file) => file.content.includes(block.text))).toHaveLength(1);
		const lastRun = (await t.run(async (ctx) => await ctx.db.query("transcript_runs").order("desc").first()))!;
		for (let step = 0; step < 100; step++)
			await t.mutation(internal.transcripts_cleanup.channel, { channelId, throughCreatedAt: lastRun._creationTime });
		expect(await t.run(async (ctx) => await ctx.db.query("transcript_staged_blocks").collect())).toEqual([]);
		expect(await t.run(async (ctx) => await ctx.db.query("transcript_jobs").collect())).toEqual([]);
		await send("After cleanup");
		await drain();
		expect(remote.files.get(main)!.content).toContain("After cleanup");
	});
});

describe("transcript readers", () => {
	test("leaves after a membership refresh stops a fence before HTTP", async () => {
		const { t, alice, installationId, channelId, remote, drain } = await fixture(true);
		await drain();
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "fence-before-refresh" });
		await t.mutation(internal.access.restart_snapshot, { installationId, revoked: false });
		await t.action(internal.transcripts_worker.run_channel, { channelId });
		expect(remote.generations.get("writer")).toBe(1);
		const members = await t.run(async (ctx) =>
			(await ctx.db.query("workspace_members").collect()).map((member) => ({
				hostUserId: member.hostUserId,
				hostMembershipId: member.hostMembershipId,
				membershipLifetime: member.membershipLifetime,
				active: member.active,
				displayName: member.displayName,
				canRead: member.canRead,
				canWrite: member.canWrite,
				isOwner: member.isOwner,
			})),
		);
		expect(
			await t.mutation(internal.access.accept_snapshot_page, {
				installationId,
				expectedStartRevision: null,
				expectedCursor: null,
				page: { startRevision: 1, currentRevision: 1, continueCursor: null, members },
			}),
		).toBe(true);
		await t.mutation(internal.access.finish_snapshot, { installationId });
		expect(await t.mutation(internal.access.finish_catchup, { installationId, observedRevision: 1 })).toBe(true);
		const channel = (await alice.query(api.channels.get, { channelId }))!;
		expect(
			(
				await alice.mutation(api.channel_members.leave, {
					channelId,
					expectedMembershipRevision: channel.membershipRevision,
					clientRequestId: "leave-after-refresh",
				})
			)._nay,
		).toBeUndefined();
		for (let step = 0; step < 30; step++) await t.action(internal.transcripts_worker.run_channel, { channelId });
		expect((await t.run(async (ctx) => await ctx.db.query("channel_access_changes").first()))?.status).toBe("complete");
		expect(remote.readers()).toEqual([{ userId: "bob", membershipLifetime: 1 }]);
	});

	test.each(["expired", "forgotten", "committed", "source-changed", "upgraded"])(
		"reconnect settles %s reader proof before using a new grant",
		async (outcome) => {
			const { t, alice, installationId, channelId, channel, remote, drain, reconnect } = await fixture(true);
			await drain();
			expect(
				(
					await alice.mutation(api.channel_members.change, {
						channelId,
						expectedMembershipRevision: channel.membershipRevision,
						clientRequestId: "invite-with-old-grant",
						hostUserId: "charlie",
						level: "read",
					})
				)._nay,
			).toBeUndefined();
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			if (outcome === "committed" || outcome === "source-changed" || outcome === "upgraded") {
				remote.afterReaders(async () => {
					if (outcome === "source-changed") {
						await t.run(async (ctx) => {
							const bob = (await ctx.db
								.query("workspace_members")
								.withIndex("by_installation_hostUserId", (q) =>
									q.eq("installationId", installationId).eq("hostUserId", "bob"),
								)
								.unique())!;
							await ctx.db.patch("workspace_members", bob._id, { active: false, membershipLifetime: 2 });
							await channel_members_remove_host_member(ctx, {
								installationId,
								hostUserId: "bob",
								membershipLifetime: 2,
							});
						});
						remote.removeReader("bob");
					}
					throw new TypeError("Reader reply lost");
				});
				await t.action(internal.transcripts_worker.run_channel, { channelId });
			}
			remote.expireToken(outcome === "forgotten");
			if (outcome === "upgraded") remote.upgrade();
			expect((await reconnect()).error).toBeNull();
			await alice.mutation(api.transcripts.retry, { channelId });
			await drain();
			expect(
				(await alice.query(api.channel_members.status, { channelId, clientRequestId: "invite-with-old-grant" }))
					?.status,
			).toBe(outcome === "source-changed" ? "cancelled" : "complete");
			expect(remote.readers().map((reader) => reader.userId)).toEqual(
				outcome === "source-changed" ? ["alice"] : ["alice", "bob", "charlie"],
			);
		},
	);

	test.each(["refused", "lost", "lost-then-refused", "lost-then-refused-no-rebuild"] as const)(
		"settles a %s rebuild fence before private leave",
		async (failure) => {
			const { t, alice, channelId, remote, drain } = await fixture(true);
			await drain();
			remote.failFence(failure === "refused" ? "refused" : "lost");
			await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: `fence-${failure}` });
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			expect((await alice.query(api.transcripts.status, { channelId }))?.error).toBeTruthy();
			if (failure.startsWith("lost-then-refused")) {
				remote.denyWrites();
				await alice.mutation(api.transcripts.retry, { channelId });
				await t.action(internal.transcripts_worker.run_channel, { channelId });
				expect((await alice.query(api.transcripts.status, { channelId }))?.status).toBe("blocked");
				remote.denyWrites(false);
				if (failure === "lost-then-refused")
					await alice.mutation(api.transcripts.reconcile, {
						channelId,
						clientRequestId: "rebuild-after-fence-refusal",
					});
			}
			const before = (await alice.query(api.channels.get, { channelId }))!;
			expect(
				(
					await alice.mutation(api.channel_members.leave, {
						channelId,
						expectedMembershipRevision: before.membershipRevision,
						clientRequestId: `leave-${failure}`,
					})
				)._nay,
			).toBeUndefined();
			if (failure === "lost") vi.setSystemTime(Date.now() + 30_000);
			for (let step = 0; step < 30; step++) await t.action(internal.transcripts_worker.run_channel, { channelId });
			const change = await t.run(async (ctx) => await ctx.db.query("channel_access_changes").first());
			expect(change?.status).toBe("complete");
			expect(remote.readers()).toEqual([{ userId: "bob", membershipLifetime: 1 }]);
			const destination = await t.run(async (ctx) => await ctx.db.query("transcript_destinations").first());
			expect(destination?.writerGeneration).toBe(remote.generations.get("writer"));
		},
	);

	test("finishes leave while an earlier Markdown edit is blocked", async () => {
		const { t, alice, channelId, channel, remote, send, drain } = await fixture(true);
		const message = await send("Original message");
		await drain();
		const path = `${ROOT}/private/${channel.transcriptSlug}/${channel.transcriptSlug}.md`;
		remote.files.get(path)!.content = "A replaced manual document.";
		remote.files.get(path)!.revision = "manual-replacement";
		await alice.mutation(api.messages.edit, {
			messageId: message.messageId,
			expectedRevision: 1,
			clientRequestId: "blocked-edit",
			text: "Queued edit",
			mentions: [],
		});
		await drain(true);
		const before = remote.writes();
		expect(
			(
				await alice.mutation(api.channel_members.leave, {
					channelId,
					clientRequestId: "leave-after-block",
					expectedMembershipRevision: 1,
				})
			)._nay,
		).toBeUndefined();
		for (let step = 0; step < 15; step++) await t.action(internal.transcripts_worker.run_channel, { channelId });
		expect(
			(await alice.query(api.channel_members.status, { channelId, clientRequestId: "leave-after-block" }))?.status,
		).toBe("complete");
		expect(remote.readers().map((reader) => reader.userId)).toEqual(["bob"]);
		expect(remote.writes()).toBe(before);
		expect((await alice.query(api.transcripts.status, { channelId }))?.status).toBe("blocked");
	});

	test("blocks new file text until a lost reader response is cancelled after source cleanup", async () => {
		const { t, alice, channelId, channel, installationId, remote, send, drain } = await fixture(true);
		await send("Before the membership change");
		await drain();
		expect(
			(
				await alice.mutation(api.channel_members.change, {
					channelId,
					clientRequestId: "lost-invite",
					expectedMembershipRevision: 1,
					hostUserId: "charlie",
					level: "read",
				})
			)._nay,
		).toBeUndefined();
		remote.afterReaders(async () => {
			await t.run(async (ctx) => {
				const bob = (await ctx.db
					.query("workspace_members")
					.withIndex("by_installation_hostUserId", (q) =>
						q.eq("installationId", installationId).eq("hostUserId", "bob"),
					)
					.unique())!;
				await ctx.db.patch("workspace_members", bob._id, { active: false, membershipLifetime: 2 });
				await channel_members_remove_host_member(ctx, { installationId, hostUserId: "bob", membershipLifetime: 2 });
			});
			remote.removeReader("bob");
			throw new TypeError("Lost the applied reader response");
		});
		await drain(true);
		const before = remote.writes();
		await send("Must wait for reader cancellation");
		await t.action(internal.transcripts_worker.run_channel, { channelId });
		expect(remote.writes()).toBe(before);
		await alice.mutation(api.transcripts.retry, { channelId });
		await drain();
		expect(remote.readers().map((reader) => reader.userId)).toEqual(["alice"]);
		expect(
			remote.files.get(`${ROOT}/private/${channel.transcriptSlug}/${channel.transcriptSlug}.md`)!.content,
		).toContain("Must wait for reader cancellation");
		expect((await alice.query(api.channel_members.status, { channelId, clientRequestId: "lost-invite" }))?.status).toBe(
			"cancelled",
		);
	});

	test("keeps a pending change closed when a newer Files reader revision prevents rollback", async () => {
		const { t, alice, channelId, installationId, remote, drain } = await fixture(true);
		await drain();
		await alice.mutation(api.channel_members.change, {
			channelId,
			clientRequestId: "newer-readers",
			expectedMembershipRevision: 1,
			hostUserId: "charlie",
			level: "read",
		});
		remote.afterReaders(async () => {
			await t.run(async (ctx) => {
				const actor = (await ctx.db
					.query("workspace_members")
					.withIndex("by_installation_hostUserId", (q) =>
						q.eq("installationId", installationId).eq("hostUserId", "alice"),
					)
					.unique())!;
				await ctx.db.patch("workspace_members", actor._id, { canWrite: false });
			});
			remote.refuseRollback();
		});
		expect((await drain(true))?.error).toContain("Files readers changed");
		expect(
			(await alice.query(api.channel_members.status, { channelId, clientRequestId: "newer-readers" }))?.status,
		).toBe("pending");
		expect(await alice.query(api.messages.latest_roots, { channelId })).toBeNull();
	});

	test("restores the previous readers before cancelling an actor who lost write authority", async () => {
		const { t, alice, channelId, installationId, remote, drain } = await fixture(true);
		await drain();
		const changed = await alice.mutation(api.channel_members.change, {
			channelId,
			clientRequestId: "invite-charlie",
			expectedMembershipRevision: 1,
			expectedPrincipalCount: 2,
			hostUserId: "charlie",
			level: "read",
		});
		expect(changed._yay?.kind).toBe("membership");
		remote.afterReaders(async () => {
			await t.run(async (ctx) => {
				const actor = (await ctx.db
					.query("workspace_members")
					.withIndex("by_installation_hostUserId", (q) =>
						q.eq("installationId", installationId).eq("hostUserId", "alice"),
					)
					.unique())!;
				await ctx.db.patch("workspace_members", actor._id, { canWrite: false });
			});
			remote.denyWrites();
		});
		await drain();
		expect(
			remote
				.readers()
				.map((reader) => reader.userId)
				.sort(),
		).toEqual(["alice", "bob"]);
		const members = await t.run(
			async (ctx) =>
				await ctx.db
					.query("channel_members")
					.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channelId))
					.collect(),
		);
		expect(members.map((member) => member.hostUserId).sort()).toEqual(["alice", "bob"]);
		expect(
			(await alice.query(api.channel_members.status, { channelId, clientRequestId: "invite-charlie" }))?.status,
		).toBe("cancelled");
	});
});

describe("private transcript deletion", () => {
	test("copies an accepted message before archiving its transcript", async () => {
		const { alice, channelId, channel, remote, send, drain, drainDeletion } = await fixture(true);
		await send("Already copied");
		await drain();
		await send("Saved just before deletion");
		await alice.mutation(api.channel_members.delete_channel, {
			channelId,
			clientRequestId: "delete-with-pending-copy",
			expectedMembershipRevision: 1,
		});

		await drainDeletion();
		const path = `${ROOT}/private/${channel.transcriptSlug}/${channel.transcriptSlug}.md`;
		expect(remote.archived.get(path)?.content).toContain("Saved just before deletion");
		expect(remote.readers()).toEqual([]);
		expect(await alice.query(api.messages.latest_roots, { channelId })).toBeNull();
	});

	test("keeps copy recovery visible after private access is removed", async () => {
		const { t, alice, channelId, channel, remote, send, drain, drainDeletion, reconnect } = await fixture(true);
		const message = await send("Before manual replacement");
		await drain();
		const path = `${ROOT}/private/${channel.transcriptSlug}/${channel.transcriptSlug}.md`;
		remote.files.get(path)!.content = "A manual replacement";
		remote.files.get(path)!.revision = "manual";
		await alice.mutation(api.messages.edit, {
			messageId: message.messageId,
			expectedRevision: 1,
			clientRequestId: "edit-before-delete",
			text: "Accepted edit",
			mentions: [],
		});
		await drain(true);
		await alice.mutation(api.channel_members.delete_channel, {
			channelId,
			clientRequestId: "delete-with-blocked-copy",
			expectedMembershipRevision: 1,
		});

		for (let step = 0; step < 20; step++) await t.action(internal.transcripts_worker.run_channel, { channelId });
		expect(remote.readers()).toEqual([]);
		expect(remote.archived.size).toBe(0);
		expect((await alice.query(api.transcripts.status, { channelId }))?.status).toBe("blocked");
		expect(
			(
				await alice.query(api.transcripts.list_deletions, {
					paginationOpts: { cursor: null, numItems: 10 },
				})
			).page,
		).toEqual([{ channelId, name: channel.name }]);
		expect((await reconnect()).error).toBeNull();
		expect(
			(
				await alice.mutation(api.transcripts.reconcile, {
					channelId,
					clientRequestId: "rebuild-deleted-copy",
				})
			)._nay,
		).toBeUndefined();
		await drainDeletion();
		expect(remote.archived.get(path)?.content).toContain("Accepted edit");
		expect(
			(
				await alice.query(api.transcripts.list_deletions, {
					paginationOpts: { cursor: null, numItems: 10 },
				})
			).page,
		).toEqual([]);
	});

	test("a rebuild folds the deletion before it publishes, but archives only after publication", async () => {
		const { t, alice, channelId, channel, remote, send, drain, drainDeletion } = await fixture(true);
		await send("Initial text");
		await drain();
		await send("Pending before rebuild");
		await alice.mutation(api.channel_members.delete_channel, {
			channelId,
			clientRequestId: "delete-before-rebuild",
			expectedMembershipRevision: 1,
		});
		await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "rebuild-through-deletion" });
		await drainDeletion();
		const path = `${ROOT}/private/${channel.transcriptSlug}/${channel.transcriptSlug}.md`;
		expect(remote.archived.get(path)?.content).toContain("Pending before rebuild");
		const state = await t.run(async (ctx) => await ctx.db.query("transcript_channels").first());
		expect(state?.appliedSequence).toBe(state?.desiredSequence);
	});

	test("archives more than 256 known parts in bounded steps and keeps unrelated files", async () => {
		const { t, alice, channelId, channel, remote, send, drain, drainDeletion } = await fixture(true);
		await send("First part");
		await drain();
		const folder = `${ROOT}/private/${channel.transcriptSlug}`;
		remote.files.set(`${folder}/unrelated.md`, { nodeId: "unrelated", revision: "manual", content: "Keep this file" });
		await t.run(async (ctx) => {
			for (let order = 1; order <= 260; order++) {
				const path = `${folder}/${channel.transcriptSlug}-${order}.md`;
				const file = { nodeId: `part-${order}`, content: `Part ${order}`, revision: `part-${order}` };
				remote.files.set(path, file);
				await ctx.db.insert("transcript_files", {
					channelId,
					order,
					path,
					nodeId: file.nodeId,
					contentRevision: file.revision,
					content: file.content,
					header: "",
					active: true,
				});
			}
		});
		await alice.mutation(api.channel_members.delete_channel, {
			channelId,
			clientRequestId: "delete-many-parts",
			expectedMembershipRevision: 1,
		});
		for (let step = 0; step < 12; step++) {
			const before = remote.archived.size;
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			expect(remote.archived.size - before).toBeLessThanOrEqual(1);
		}
		await drainDeletion();
		expect(remote.archived.size).toBe(261);
		expect(remote.files.get(`${folder}/unrelated.md`)?.content).toBe("Keep this file");
	});

	test("replays a lost file archive response and keeps manual text", async () => {
		const { t, alice, channelId, channel, remote, send, drain, drainDeletion, reconnect } = await fixture(true);
		await send("Copied text");
		await drain();
		const path = `${ROOT}/private/${channel.transcriptSlug}/${channel.transcriptSlug}.md`;
		remote.files.get(path)!.content += "\nManual note to preserve";
		remote.files.get(path)!.revision = "manual-note";
		remote.loseArchive();
		await alice.mutation(api.channel_members.delete_channel, {
			channelId,
			clientRequestId: "delete-lost-response",
			expectedMembershipRevision: 1,
		});
		for (let step = 0; step < 30; step++) {
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			if ((await alice.query(api.transcripts.status, { channelId }))?.error) break;
		}
		const before = await t.run(async (ctx) => await ctx.db.query("transcript_deletions").first());
		expect(before?.error).toContain("Archive response lost");
		expect(before?.prepared).not.toBeNull();
		expect(
			(
				await alice.mutation(api.transcripts.reconcile, {
					channelId,
					clientRequestId: "cannot-rebuild-archive",
				})
			)._nay?.message,
		).toContain("being archived");
		expect((await reconnect()).error).toBeNull();
		expect((await alice.mutation(api.transcripts.retry, { channelId }))._nay).toBeUndefined();
		await drainDeletion();
		expect(remote.archived.size).toBe(1);
		expect(remote.archived.get(path)?.content).toContain("Manual note to preserve");
		expect(remote.receipts.has(before!.prepared!.operationId)).toBe(true);
	});

	test("the sweep resumes an expired archive claim and ignores its late completion", async () => {
		const { t, alice, channelId, remote, send, drain, drainDeletion } = await fixture(true);
		await send("Survive a stopped worker");
		await drain();
		await alice.mutation(api.channel_members.delete_channel, {
			channelId,
			clientRequestId: "delete-before-worker-stops",
			expectedMembershipRevision: 1,
		});
		for (let step = 0; step < 20; step++) {
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			const state = await t.run(async (ctx) => await ctx.db.query("transcript_channels").first());
			if (state?.appliedSequence === state?.desiredSequence) break;
		}
		const original = (await t.mutation(internal.transcripts_deletions.claim, { channelId }))!;
		expect(original.deletion.prepared).not.toBeNull();
		expect(remote.archived.size).toBe(0);
		vi.setSystemTime(Date.now() + 60_001);
		const beforeSweep = await t.run(
			async (ctx) => (await ctx.db.system.query("_scheduled_functions").collect()).length,
		);
		await t.mutation(internal.transcripts_worker.sweep, {});
		const scheduled = await t.run(async (ctx) => await ctx.db.system.query("_scheduled_functions").collect());
		expect(scheduled.slice(beforeSweep).some((job) => job.name === "transcripts_worker:run_channel")).toBe(true);
		const resumed = (await t.mutation(internal.transcripts_deletions.claim, { channelId }))!;
		expect(resumed.deletion.prepared).toEqual(original.deletion.prepared);
		expect(resumed.deletion.claim).not.toBe(original.deletion.claim);
		await t.mutation(internal.transcripts_deletions.release, {
			deletionId: original.deletion._id,
			claim: original.deletion.claim,
			error: null,
		});
		const afterLateRelease = (await t.run(
			async (ctx) => await ctx.db.get("transcript_deletions", original.deletion._id),
		))!;
		expect(afterLateRelease.prepared).toEqual(original.deletion.prepared);
		expect(afterLateRelease.cursor).toBe(-1);
		vi.setSystemTime(Date.now() + 60_001);
		await drainDeletion();
		expect(remote.archived.size).toBe(1);
	});

	test("manual sharing leaves remaining transcript files active", async () => {
		const { t, alice, channelId, channel, remote, send, drain, drainDeletion, reconnect } = await fixture(true);
		await send("Keep this manual copy");
		await drain();
		await alice.mutation(api.channel_members.delete_channel, {
			channelId,
			clientRequestId: "delete-then-manual-sharing",
			expectedMembershipRevision: 1,
		});
		for (let step = 0; step < 10; step++) {
			await t.action(internal.transcripts_worker.run_channel, { channelId });
			if (await t.run(async (ctx) => await ctx.db.query("transcript_deletions").first())) break;
		}
		remote.detach();
		expect((await reconnect()).error).toBeNull();
		await drainDeletion();
		expect(remote.archived.size).toBe(0);
		expect(
			remote.files.get(`${ROOT}/private/${channel.transcriptSlug}/${channel.transcriptSlug}.md`)?.content,
		).toContain("Keep this manual copy");
	});

	test("limits deleted-copy recovery to the owner or the original actor's current membership", async () => {
		const { t, alice, channelId, installationId, remote, send, drain } = await fixture(true);
		await send("Private text");
		await drain();
		await t.run(async (ctx) => {
			const session = (await ctx.db.query("sessions").first())!;
			await ctx.db.patch("sessions", session._id, { isOwner: false });
			const actor = (await ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", installationId).eq("hostUserId", "alice"),
				)
				.unique())!;
			await ctx.db.patch("workspace_members", actor._id, { isOwner: false });
			const { _id, _creationTime, ...fields } = session;
			await ctx.db.insert("sessions", {
				...fields,
				hostSessionId: "session-bob",
				exchangeId: "exchange-bob",
				hostUserId: "bob",
				hostMembershipId: "membership-bob",
				isOwner: false,
			});
		});
		const bob = t.withIdentity({
			issuer: "https://press.test/plugins/chitchat",
			subject: "session-bob",
			exchangeId: "exchange-bob",
		});
		remote.afterReaders(async () => remote.denyWrites());
		await alice.mutation(api.channel_members.delete_channel, {
			channelId,
			clientRequestId: "delete-as-manager",
			expectedMembershipRevision: 1,
		});
		for (let step = 0; step < 20; step++) await t.action(internal.transcripts_worker.run_channel, { channelId });
		const paginationOpts = { cursor: null, numItems: 10 };
		expect((await alice.query(api.transcripts.list_deletions, { paginationOpts })).page).toHaveLength(1);
		expect((await alice.query(api.transcripts.status, { channelId }))?.canConnect).toBe(true);
		expect((await bob.query(api.transcripts.list_deletions, { paginationOpts })).page).toEqual([]);
		expect(await bob.query(api.transcripts.status, { channelId })).toBeNull();
		expect((await bob.mutation(api.transcripts.retry, { channelId }))._nay).toBeDefined();
		expect(await alice.query(api.messages.latest_roots, { channelId })).toBeNull();

		await t.run(async (ctx) => {
			for (const session of await ctx.db.query("sessions").collect())
				await ctx.db.patch(
					"sessions",
					session._id,
					session.hostUserId === "bob" ? { isOwner: true } : { membershipLifetime: 2 },
				);
			for (const member of await ctx.db.query("workspace_members").collect()) {
				if (member.hostUserId === "bob") await ctx.db.patch("workspace_members", member._id, { isOwner: true });
				if (member.hostUserId === "alice")
					await ctx.db.patch("workspace_members", member._id, { membershipLifetime: 2 });
			}
		});
		expect((await bob.query(api.transcripts.list_deletions, { paginationOpts })).page).toHaveLength(1);
		expect((await bob.query(api.transcripts.status, { channelId }))?.canConnect).toBe(true);
		expect((await alice.query(api.transcripts.list_deletions, { paginationOpts })).page).toEqual([]);
		expect(await alice.query(api.transcripts.status, { channelId })).toBeNull();
		expect((await alice.mutation(api.transcripts.retry, { channelId }))._nay).toBeDefined();
	});

	test.each([true, false])(
		"last-member cleanup keeps owner recovery when a destination is saved: %s",
		async (hasDestination) => {
			const { t, alice, channelId, installationId, remote, send, drain, drainDeletion, reconnect } =
				await fixture(true);
			await send("Copy before workspace departure");
			if (hasDestination) await drain();
			remote.expireToken(true);
			await t.run(async (ctx) => {
				await ctx.db.patch("installations", installationId, { organizationOwnerUserId: "charlie" });
				if (!hasDestination) {
					const destination = (await ctx.db.query("transcript_destinations").first())!;
					await ctx.db.delete("transcript_destinations", destination._id);
				}
				const session = (await ctx.db.query("sessions").first())!;
				const { _id, _creationTime, ...fields } = session;
				await ctx.db.insert("sessions", {
					...fields,
					hostSessionId: "session-charlie",
					exchangeId: "exchange-charlie",
					hostUserId: "charlie",
					hostMembershipId: "membership-charlie",
					isOwner: true,
				});
				for (const member of await ctx.db.query("workspace_members").collect()) {
					if (member.hostUserId === "charlie") await ctx.db.patch("workspace_members", member._id, { isOwner: true });
					else await ctx.db.patch("workspace_members", member._id, { active: false, membershipLifetime: 2 });
				}
				await channel_members_remove_host_member(ctx, { installationId, hostUserId: "bob", membershipLifetime: 2 });
				await channel_members_remove_host_member(ctx, { installationId, hostUserId: "alice", membershipLifetime: 2 });
			});
			const queued = await t.run(async (ctx) => ({
				deletion: await ctx.db.query("transcript_deletions").first(),
				progress: await ctx.db.query("transcript_channels").first(),
			}));
			expect(queued.deletion?.barrier).toBe(queued.progress?.desiredSequence);
			expect(queued.deletion?.archiveStartedAt).toBeNull();
			for (let step = 0; step < 30; step++) await t.action(internal.transcripts_worker.run_channel, { channelId });
			const deletion = await t.run(async (ctx) => await ctx.db.query("transcript_deletions").first());
			expect(deletion?.actorHostUserId).toBeNull();
			expect(deletion?.completedAt).toBeNull();
			expect(remote.archived.size).toBe(0);
			expect(remote.readers()).toHaveLength(2);
			const charlie = t.withIdentity({
				issuer: "https://press.test/plugins/chitchat",
				subject: "session-charlie",
				exchangeId: "exchange-charlie",
			});
			expect(
				(await charlie.query(api.transcripts.list_deletions, { paginationOpts: { cursor: null, numItems: 10 } })).page,
			).toHaveLength(1);
			expect((await charlie.query(api.transcripts.status, { channelId }))?.canConnect).toBe(true);
			expect(await charlie.query(api.messages.latest_roots, { channelId })).toBeNull();
			expect(await alice.query(api.transcripts.status, { channelId })).toBeNull();
			expect((await reconnect(channelId, "charlie")).error).toBeNull();
			expect((await charlie.mutation(api.transcripts.retry, { channelId }))._nay).toBeUndefined();
			await drainDeletion();
			expect(remote.readers()).toEqual([]);
			expect(remote.archived.size).toBe(1);
			expect([...remote.archived.values()][0]!.content).toContain("Copy before workspace departure");
			expect(
				(
					await charlie.query(api.transcripts.list_deletions, {
						paginationOpts: { cursor: null, numItems: 10 },
					})
				).page,
			).toEqual([]);
		},
	);

	test("last-member cleanup does not offer Files recovery when no connection was started", async () => {
		const { t, alice, installationId } = await fixture();
		const created = await alice.mutation(api.channels.create, {
			clientRequestId: "never-connected",
			name: "No Files copy",
			topic: "",
			visibility: "private",
			invitedUserIds: ["bob"],
		});
		if (created._yay?.kind !== "channel") throw new Error("Channel creation failed");
		const channelId = created._yay.channelId;
		await t.run(async (ctx) => {
			await channel_members_remove_host_member(ctx, { installationId, hostUserId: "bob", membershipLifetime: 2 });
			await channel_members_remove_host_member(ctx, { installationId, hostUserId: "alice", membershipLifetime: 2 });
		});
		await t.action(internal.transcripts_worker.run_channel, { channelId });
		const state = await t.run(async (ctx) => ({
			channel: await ctx.db.get("channels", channelId),
			deletion: await ctx.db
				.query("transcript_deletions")
				.withIndex("by_channel", (q) => q.eq("channelId", channelId))
				.unique(),
		}));
		expect(state.channel?.deletedAt).not.toBeNull();
		expect(state.deletion).toBeNull();
	});
});

describe("transcript grants", () => {
	test.each([false, true])("reconnect keeps an idle synced channel ready (private: %s)", async (isPrivate) => {
		const { t, alice, channelId, remote, send, drain, reconnect } = await fixture(isPrivate);
		await send("Saved before reconnect");
		await drain();
		const writes = remote.writes();
		expect((await reconnect()).error).toBeNull();
		const status = await alice.query(api.transcripts.status, { channelId });
		expect(status?.status).toBe("ready");
		expect(status?.appliedSequence).toBe(status?.desiredSequence);
		expect(remote.writes()).toBe(writes);
		const completed = await t.run(async (ctx) => {
			const destination = (await ctx.db.query("transcript_destinations").first())!;
			return (await ctx.db.get("transcript_runs", destination.runId!))!;
		});
		expect(completed.phase).toBe("complete");
		for (let step = 0; step < 20; step++)
			await t.mutation(internal.transcripts_cleanup.channel, { channelId, throughCreatedAt: completed._creationTime });
		expect(await t.run(async (ctx) => (await ctx.db.query("transcript_destinations").first())?.runId)).toBeNull();
		expect((await reconnect()).error).toBeNull();
		expect((await alice.query(api.transcripts.status, { channelId }))?.status).toBe("ready");
		expect(remote.writes()).toBe(writes);
	});

	test.each(["queued", "rebuild"] as const)("reconnect leaves %s transcript work pending", async (kind) => {
		const { t, alice, channelId, channel, remote, send, drain, reconnect } = await fixture();
		await send("Saved before reconnect");
		await drain();
		if (kind === "queued") await send("Still waiting to sync");
		else await alice.mutation(api.transcripts.reconcile, { channelId, clientRequestId: "rebuild-before-connect" });
		const before = await t.run(async (ctx) => await ctx.db.query("transcript_destinations").first());
		expect((await reconnect()).error).toBeNull();
		expect((await alice.query(api.transcripts.status, { channelId }))?.status).toBe("pending");
		const after = await t.run(async (ctx) => await ctx.db.query("transcript_destinations").first());
		expect(after?.runId).toBe(before?.runId);
		await drain();
		const status = await alice.query(api.transcripts.status, { channelId });
		expect(status?.status).toBe("ready");
		if (kind === "queued")
			expect(remote.files.get(`${ROOT}/${channel.transcriptSlug}.md`)?.content).toContain("Still waiting to sync");
	});

	test("a late refusal from the previous index sponsor cannot block the new connection", async () => {
		const { t, alice, remote, reconnect } = await fixture();
		const index = (await t.run(async (ctx) => await ctx.db.query("transcript_indexes").first()))!;
		const created = await alice.mutation(api.channels.create, {
			clientRequestId: "next-index-sponsor",
			name: "Next sponsor",
			topic: "",
			visibility: "public",
			invitedUserIds: [],
		});
		if (created._yay?.kind !== "channel") throw new Error("Channel creation failed");
		const otherId = created._yay.channelId;
		remote.beforeWrite(async () => {
			remote.expireToken();
			expect((await reconnect(otherId)).error).toBeNull();
		});
		for (let step = 0; step < 15; step++) {
			await t.action(internal.transcripts_index.run, { indexId: index._id });
			const current = (await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))!;
			if (current.grantChannelId === otherId) break;
		}
		const rebound = (await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))!;
		expect(rebound.grantChannelId).toBe(otherId);
		expect(rebound.status).toBe("pending");
		expect(rebound.error).toBeNull();
		for (let step = 0; step < 20; step++) await t.action(internal.transcripts_index.run, { indexId: index._id });
		expect((await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))?.status).toBe("ready");
		expect(remote.writes()).toBe(1);
	});

	test("a sponsor removed during Files setup cannot replace the index connection", async () => {
		const { t, alice, installationId, channelId, reconnect } = await fixture();
		const index = (await t.run(async (ctx) => await ctx.db.query("transcript_indexes").first()))!;
		const created = await alice.mutation(api.channels.create, {
			clientRequestId: "removed-index-sponsor",
			name: "Removed sponsor",
			topic: "",
			visibility: "public",
			invitedUserIds: [],
		});
		if (created._yay?.kind !== "channel") throw new Error("Channel creation failed");
		const filesFetch = fetch;
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
				const response = await filesFetch(input, init);
				if (new URL(String(input)).pathname.endsWith("/ensure"))
					await t.run(async (ctx) => {
						const sponsor = await ctx.db
							.query("workspace_members")
							.withIndex("by_installation_hostUserId", (q) =>
								q.eq("installationId", installationId).eq("hostUserId", "alice"),
							)
							.unique();
						await ctx.db.patch("workspace_members", sponsor!._id, { active: false });
					});
				return response;
			}),
		);
		expect((await reconnect(created._yay.channelId)).error).toContain("no longer has access");
		expect((await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))?.grantChannelId).toBe(
			channelId,
		);
	});

	test("an explicit connection refreshes a blocked index without changing its prepared write", async () => {
		const { t, alice, channelId, remote, reconnect } = await fixture();
		const index = (await t.run(async (ctx) => await ctx.db.query("transcript_indexes").first()))!;
		remote.loseWrite();
		for (let step = 0; step < 15 && remote.writes() === 0; step++)
			await t.action(internal.transcripts_index.run, { indexId: index._id });
		const prepared = (await t.run(async (ctx) => await ctx.db.query("transcript_index_runs").first()))!;
		expect(prepared.prepared).toBe(true);
		remote.expireToken();
		await alice.mutation(api.transcripts.retry, { channelId });
		await t.action(internal.transcripts_index.run, { indexId: index._id });
		expect((await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))?.error).toContain("401");
		const created = await alice.mutation(api.channels.create, {
			clientRequestId: "new-index-sponsor",
			name: "New sponsor",
			topic: "",
			visibility: "public",
			invitedUserIds: [],
		});
		if (created._yay?.kind !== "channel") throw new Error("Channel creation failed");
		const otherId = created._yay.channelId;
		const connectedGrant = await reconnect(otherId);
		expect(connectedGrant.error).toBeNull();
		expect(connectedGrant.selectIndexOnReady).toBe(false);
		const rebound = (await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))!;
		expect(rebound.grantChannelId).toBe(otherId);
		expect(rebound.activeRunId).toBe(prepared._id);
		const resumed = (await t.run(async (ctx) => await ctx.db.get("transcript_index_runs", prepared._id)))!;
		expect(resumed.grantChannelId).toBe(otherId);
		for (const key of [
			"content",
			"expectedNodeId",
			"expectedContentRevision",
			"writerId",
			"writerGeneration",
			"prepared",
		] as const)
			expect(resumed[key]).toEqual(prepared[key]);
		for (let step = 0; step < 20; step++) await t.action(internal.transcripts_index.run, { indexId: index._id });
		expect((await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))?.status).toBe("ready");
		expect(remote.writes()).toBe(2);
		expect(remote.files.get(`${ROOT}/README.md`)?.content).toContain("New sponsor");

		const originalGrant = (await t.run(
			async (ctx) =>
				await ctx.db
					.query("host_grants")
					.withIndex("by_channel", (q) => q.eq("channelId", channelId))
					.unique(),
		))!;
		await t.mutation(internal.transcripts_grants.renew, { grantId: originalGrant._id });
		for (let step = 0; step < 3; step++)
			await t.action(internal.transcripts_grants.connect, { grantId: originalGrant._id });
		expect((await t.run(async (ctx) => await ctx.db.get("host_grants", originalGrant._id)))?.error).toBeNull();
		expect((await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))?.grantChannelId).toBe(
			otherId,
		);
	});

	test("a failed new connection keeps the current index sponsor", async () => {
		const { t, alice, channelId, remote, reconnect } = await fixture();
		const index = (await t.run(async (ctx) => await ctx.db.query("transcript_indexes").first()))!;
		for (let step = 0; step < 15; step++) await t.action(internal.transcripts_index.run, { indexId: index._id });
		const created = await alice.mutation(api.channels.create, {
			clientRequestId: "refused-index-sponsor",
			name: "Refused sponsor",
			topic: "",
			visibility: "public",
			invitedUserIds: [],
		});
		if (created._yay?.kind !== "channel") throw new Error("Channel creation failed");
		remote.denyWrites();
		const refusedGrant = await reconnect(created._yay.channelId);
		expect(refusedGrant.error).toContain("Permission denied");
		expect(refusedGrant.selectIndexOnReady).toBe(true);
		expect((await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))?.grantChannelId).toBe(
			channelId,
		);
		expect(remote.writes()).toBe(1);
	});

	test("recovers lost exchange, seal and renewal responses with the saved request and encrypted source", async () => {
		const { t, alice, channelId } = await fixture();
		const filesFetch = fetch;
		const keys = await generateKeyPair("ES256");
		const publicKey = { ...(await exportJWK(keys.publicKey)), kid: "lease-test", use: "sig", alg: "ES256" };
		let leaseWorkspace = "another-workspace";
		const saved = new Map<string, object>();
		const calls = { exchange: 0, seal: 0, renew: 0 };
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
				const path = new URL(String(input)).pathname;
				if (path === "/.well-known/jwks.json") return Response.json({ keys: [publicKey] });
				if (path.endsWith("/chitchat/lease")) {
					const request = z
						.object({ exchangeId: z.string(), requestedExpiresAt: z.number() })
						.parse(JSON.parse(String(init?.body)));
					const jwt = await new SignJWT({
						hostSessionId: "session-alice",
						hostUserId: "alice",
						hostMembershipId: "membership-alice",
						hostOrganizationId: "org-one",
						hostWorkspaceId: leaseWorkspace,
						hostInstallationId: "installation-one",
						hostPluginVersionId: "version-one",
						hostServiceAccountId: "service-one",
						membershipLifetime: 1,
						requiredRevision: 1,
						canRead: true,
						canWrite: true,
						isOwner: true,
						organizationOwnerUserId: "alice",
						displayName: "Alice",
						exchangeId: request.exchangeId,
						validatedAt: Date.now(),
						expiresAt: request.requestedExpiresAt,
					})
						.setProtectedHeader({ alg: "ES256", kid: "lease-test" })
						.setIssuer("https://press.test/plugins/chitchat")
						.setAudience("chitchat")
						.setSubject("session-alice")
						.setExpirationTime(Math.floor(request.requestedExpiresAt / 1000))
						.sign(keys.privateKey);
					return Response.json({ jwt });
				}
				if (!path.includes("service-grants")) return await filesFetch(input, init);
				const body = z
					.object({ requestId: z.string(), operation: z.enum(["exchange", "seal", "renew"]).optional() })
					.parse(JSON.parse(String(init?.body)));
				const source = new Headers(init?.headers).get("Authorization");
				const operation =
					body.operation ?? (path.endsWith("/exchange") ? "exchange" : path.endsWith("/renew") ? "renew" : "seal");
				const key = `${source}:${operation}:${body.requestId}`;
				if (path.endsWith("/recover"))
					return saved.has(key)
						? Response.json(saved.get(key))
						: Response.json({ message: "No saved grant response" }, { status: 404 });
				calls[operation]++;
				const result = {
					token: `psg_${operation}_${calls[operation]}`,
					expiresAt: Date.now() + (operation === "seal" ? 6 : 1) * 86_400_000,
					scopes: operation === "seal" ? ["files:write"] : [],
					actorUserId: "alice",
					organizationId: "org-one",
					workspaceId: "workspace-one",
					installationId: "installation-one",
				};
				saved.set(key, result);
				throw new TypeError("Response lost after mint");
			}),
		);
		expect(
			(
				await alice.action(api.transcripts.connect, {
					channelId,
					pluginToken: "plu_other_workspace",
					clientRequestId: "wrong-connect",
				})
			)._nay,
		).toBeDefined();
		expect(calls).toEqual({ exchange: 0, seal: 0, renew: 0 });
		leaseWorkspace = "workspace-one";
		expect(
			(
				await alice.action(api.transcripts.connect, {
					channelId,
					pluginToken: "plu_current_frame",
					clientRequestId: "new-connect",
				})
			)._nay,
		).toBeUndefined();
		const grantId = (await t.run(
			async (ctx) =>
				await ctx.db
					.query("host_grants")
					.withIndex("by_channel", (q) => q.eq("channelId", channelId))
					.unique(),
		))!._id;
		for (let step = 0; step < 5; step++) await t.action(internal.transcripts_grants.connect, { grantId });
		let grant = (await t.run(async (ctx) => await ctx.db.get("host_grants", grantId)))!;
		expect(grant.phase).toBe("ready");
		expect(grant.error).toBeNull();
		expect(calls).toEqual({ exchange: 1, seal: 1, renew: 0 });
		expect(JSON.stringify(grant)).not.toContain("plu_current_frame");
		expect(JSON.stringify(grant)).not.toContain("psg_");
		await t.mutation(internal.transcripts_grants.renew, { grantId });
		for (let step = 0; step < 5; step++) await t.action(internal.transcripts_grants.connect, { grantId });
		grant = (await t.run(async (ctx) => await ctx.db.get("host_grants", grantId)))!;
		expect(grant.phase).toBe("ready");
		expect(calls).toEqual({ exchange: 1, seal: 2, renew: 1 });
		await t.run(async (ctx) => await ctx.db.patch("host_grants", grantId, { interactiveExpiresAt: Date.now() - 1 }));
		await t.mutation(internal.transcripts_grants.renew, { grantId });
		expect((await t.run(async (ctx) => await ctx.db.get("host_grants", grantId)))?.phase).toBe("blocked");
		expect(calls.renew).toBe(1);
	});
});

describe("transcript index", () => {
	test("uses its own source sequence and the existing public README format", async () => {
		const { t, channel, remote } = await fixture();
		const index = (await t.run(async (ctx) => await ctx.db.query("transcript_indexes").first()))!;
		for (let step = 0; step < 15; step++) await t.action(internal.transcripts_index.run, { indexId: index._id });
		expect(remote.files.get(`${ROOT}/README.md`)?.content).toBe(
			chatbe_readme_markdown([{ name: channel.name, slug: channel.transcriptSlug }]),
		);
		expect((await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))?.appliedSequence).toBe(1);
	});
});
