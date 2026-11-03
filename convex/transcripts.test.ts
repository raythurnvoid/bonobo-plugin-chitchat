/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { ConvexError } from "convex/values";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { z } from "zod";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { api, internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import schema from "./schema";
import { transcripts_encrypt } from "./transcripts_secrets";
import { chatbe_channel_header, chatbe_readme_markdown } from "../shared/transcript-markdown";
import { transcripts_get_error_code, transcripts_get_error_message, transcripts_HostError } from "./transcripts_grants";

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

type TestConvex = ReturnType<typeof convexTest>;

// Take the newest pending job with this name and cancel it, so a later timer does not run it a second time.
async function take_scheduled(t: TestConvex, name: string) {
	return await t.run(async (ctx) => {
		const pending = (await ctx.db.system.query("_scheduled_functions").collect()).filter(
			(job) => job.name === name && job.state.kind === "pending",
		);
		const job = pending.at(-1) ?? null;
		if (job) await ctx.scheduler.cancel(job._id);
		return job;
	});
}

// Run one channel wake-up by hand: the dispatcher claims, then the action it started does one step.
async function dispatch_channel(t: TestConvex, channelId: Id<"channels">) {
	await t.mutation(internal.transcripts_worker.dispatch, { channelId });
	const job = await take_scheduled(t, "transcripts_worker:run");
	if (job) await t.action(internal.transcripts_worker.run, job.args[0]);
}

async function dispatch_index(t: TestConvex, indexId: Id<"transcript_indexes">) {
	await t.mutation(internal.transcripts_index.dispatch, { indexId });
	const job = await take_scheduled(t, "transcripts_index:run");
	if (job) await t.action(internal.transcripts_index.run, job.args[0]);
}

// Run the current step of a Files connection, like its dispatcher does.
async function run_grant(t: TestConvex, grantId: Id<"host_grants">) {
	const grant = await t.run(async (ctx) => await ctx.db.get("host_grants", grantId));
	if (grant)
		await t.action(internal.transcripts_grants.connect, { grantId, lifecycleRequestId: grant.lifecycleRequestId });
}

function host() {
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
	let oldTokenExpired = false;
	let beforeWrite: (() => Promise<void>) | null = null;
	let denyWrites = false;
	let failWritePath: string | null = null;
	const writeBody = z
		.object({
			path: z.string(),
			content: z.string(),
			contentType: z.literal("text/markdown;charset=utf-8"),
			nonCollaborative: z.literal(true),
			expectedParentNodeId: z.string(),
			writer: z.object({
				writerId: z.string(),
				operationId: z.string(),
				writerGeneration: z.number(),
				sequence: z.number(),
				expectedNodeId: z.string().nullable(),
				expectedContentRevision: z.string().nullable(),
				contentHash: z.string(),
			}),
		})
		.transform(({ writer, ...request }) => ({ ...request, ...writer }));
	vi.stubGlobal(
		"fetch",
		vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
			const path = new URL(String(input)).pathname;
			expect(path.startsWith("/api/v1/")).toBe(true);
			const body: unknown = JSON.parse(String(init?.body));
			const bearer = new Headers(init?.headers).get("Authorization") ?? "";
			if (path.endsWith("/write") && beforeWrite) {
				const callback = beforeWrite;
				beforeWrite = null;
				await callback();
			}
			if (oldTokenExpired && bearer === "Bearer psg_sealed")
				return Response.json({ message: "Unauthenticated" }, { status: 401 });
			if (denyWrites) return Response.json({ message: "Permission denied" }, { status: 403 });
			if (path.endsWith("/plugin-writers/inspect")) {
				const request = z.object({ writerId: z.string(), path: z.string(), maxBytes: z.literal(100_000) }).parse(body);
				const file = files.get(request.path);
				return Response.json({
					nodeId: file?.nodeId ?? null,
					content: file?.content ?? null,
					contentType: file ? "text/markdown;charset=utf-8" : null,
					contentRevision: file?.revision ?? null,
					expectedParentNodeId: "folder",
					writerGeneration: generations.get(request.writerId),
				});
			}
			if (path.endsWith("/plugin-writers/advance")) {
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
				if (receipts.has(request.operationId)) return Response.json({ receipt: receipts.get(request.operationId) });
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
					operationId: request.operationId,
				};
				receipts.set(request.operationId, receipt);
				if (loseNextWrite) {
					loseNextWrite = false;
					throw new TypeError("Network response lost");
				}
				return Response.json({ receipt });
			}
			if (path.endsWith("/plugin-archive")) {
				const request = z
					.object({
						path: z.string(),
						writer: z.object({
							writerId: z.string(),
							nodeId: z.string(),
							operationId: z.string(),
							writerGeneration: z.number(),
							sequence: z.number(),
							expectedContentRevision: z.string().optional(),
						}),
					})
					.transform(({ path, writer }) => ({ path, ...writer }))
					.parse(body);
				if (receipts.has(request.operationId)) return Response.json({ receipt: receipts.get(request.operationId) });
				const sequenceKey = `${request.writerId}:${request.writerGeneration}:${request.path}`;
				if ((fileSequences.get(sequenceKey) ?? -1) >= request.sequence)
					return Response.json({ message: "A newer transcript write already exists" }, { status: 409 });
				if (files.get(request.path)?.nodeId !== request.nodeId)
					return Response.json({ message: "Wrong Trash target" }, { status: 409 });
				if (
					request.expectedContentRevision !== undefined &&
					request.expectedContentRevision !== files.get(request.path)?.revision
				)
					return Response.json({ message: "Content changed before moving to Trash" }, { status: 409 });
				archived.set(request.path, files.get(request.path)!);
				files.delete(request.path);
				fileSequences.set(sequenceKey, request.sequence);
				const receipt = {
					_id: request.operationId,
					nodeId: request.nodeId,
					contentRevision: null,
					writerGeneration: request.writerGeneration,
					operationId: request.operationId,
				};
				receipts.set(request.operationId, receipt);
				if (loseNextArchive) {
					loseNextArchive = false;
					throw new TypeError("Move to Trash response lost");
				}
				return Response.json({ receipt });
			}
			if (path.endsWith("/ensure")) {
				const request = z.object({ writer: z.object({ resourceKey: z.string() }) }).parse(body);
				const key = z.tuple([z.string(), z.string()]).parse(JSON.parse(request.writer.resourceKey));
				const writerId = key[1] === "__root" ? "root-writer" : "writer";
				return Response.json({
					writer: {
						writerId,
						rootNodeId: "folder",
						folderNodeId: "folder",
						writerGeneration: generations.get(writerId),
					},
				});
			}
			throw new Error(`Unexpected Bonobo Senate call: ${path}`);
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
		expireToken: () => {
			oldTokenExpired = true;
		},
	};
}

async function fixture(isPrivate = false) {
	const remote = host();
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
		issuer: "https://press.test/plugins-services",
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
			folderPath: ROOT,
			writerGeneration: 1,
			header: chatbe_channel_header(channel.name, channel.topic),
			tailOrder: 0,
			runId: null,
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
			await dispatch_channel(t, channelId);
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
			issuer: "https://press.test/plugins-services",
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
				if (path.endsWith("/plugins/identity/exchange")) {
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
						.setIssuer("https://press.test/plugins-services")
						.setAudience("bonobo-plugin:chitchat")
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
		for (let step = 0; step < 3; step++) await run_grant(t, grant._id);
		return (await t.run(async (ctx) => await ctx.db.get("host_grants", grant._id)))!;
	};
	return { t, alice, installationId, channelId, channel, remote, send, drain, reconnect };
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

describe("transcripts_get_error_code", () => {
	test("retries an error without an HTTP status and stops on a final host refusal", () => {
		const local = new Error("Files sync failed.");
		expect(transcripts_get_error_code(local, local.message)).toBe("temporary");
		const missing = new transcripts_HostError("Not found (404)", 404);
		expect(transcripts_get_error_code(missing, missing.message)).toBe("conflict");
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
				await dispatch_channel(t, channelId);
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
			await dispatch_channel(t, channelId);
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
			await dispatch_channel(t, channelId);
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
		for (let step = 0; step < 30 && remote.writes() < 2; step++) await dispatch_channel(t, channelId);
		expect(remote.writes()).toBe(2);
		await alice.mutation(api.transcripts.retry, { channelId });
		await drain();
		expect(remote.files.get(main)!.nodeId).toBe(originalId);
		expect(remote.files.get(main)!.content.match(/Hello from chat/g)).toHaveLength(1);
		expect(remote.writes()).toBe(2);
		const writes = vi.mocked(fetch).mock.calls.filter(([input]) => String(input).endsWith("/files/write"));
		expect(writes.length).toBeGreaterThan(2);
		for (const [, init] of writes) expect(JSON.parse(String(init?.body))).toMatchObject({ force: true });
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
			await dispatch_channel(t, channelId);
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
			await dispatch_channel(t, channelId);
			if ((await alice.query(api.transcripts.status, { channelId }))?.error) break;
		}
		expect((await alice.query(api.transcripts.status, { channelId }))?.error).toContain("Move to Trash response lost");
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

describe("channels_queue_transcript", () => {
	test("a private channel gets no transcript write, even with a Files connection", async () => {
		const { t, channelId, remote, send } = await fixture(true);
		await send("Private text");
		for (let step = 0; step < 100; step++) await dispatch_channel(t, channelId);
		expect(remote.writes()).toBe(0);
		expect(await t.run(async (ctx) => await ctx.db.query("transcript_jobs").collect())).toEqual([]);
	});
});

describe("transcript grants", () => {
	test("reconnect keeps an idle synced channel ready", async () => {
		const { t, alice, channelId, remote, send, drain, reconnect } = await fixture();
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
			await dispatch_index(t, index._id);
			const current = (await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))!;
			if (current.grantChannelId === otherId) break;
		}
		const rebound = (await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))!;
		expect(rebound.grantChannelId).toBe(otherId);
		expect(rebound.status).toBe("pending");
		expect(rebound.error).toBeNull();
		for (let step = 0; step < 20; step++) await dispatch_index(t, index._id);
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
		for (let step = 0; step < 15 && remote.writes() === 0; step++) await dispatch_index(t, index._id);
		const prepared = (await t.run(async (ctx) => await ctx.db.query("transcript_index_runs").first()))!;
		expect(prepared.prepared).toBe(true);
		remote.expireToken();
		await alice.mutation(api.transcripts.retry, { channelId });
		await dispatch_index(t, index._id);
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
		for (let step = 0; step < 20; step++) await dispatch_index(t, index._id);
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
		for (let step = 0; step < 3; step++) await run_grant(t, originalGrant._id);
		expect((await t.run(async (ctx) => await ctx.db.get("host_grants", originalGrant._id)))?.error).toBeNull();
		expect((await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))?.grantChannelId).toBe(
			otherId,
		);
	});

	test("a failed new connection keeps the current index sponsor", async () => {
		const { t, alice, channelId, remote, reconnect } = await fixture();
		const index = (await t.run(async (ctx) => await ctx.db.query("transcript_indexes").first()))!;
		for (let step = 0; step < 15; step++) await dispatch_index(t, index._id);
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
				if (path.endsWith("/plugins/identity/exchange")) {
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
						.setIssuer("https://press.test/plugins-services")
						.setAudience("bonobo-plugin:chitchat")
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
		for (let step = 0; step < 5; step++) await run_grant(t, grantId);
		let grant = (await t.run(async (ctx) => await ctx.db.get("host_grants", grantId)))!;
		expect(grant.phase).toBe("ready");
		expect(grant.error).toBeNull();
		expect(calls).toEqual({ exchange: 1, seal: 1, renew: 0 });
		expect(JSON.stringify(grant)).not.toContain("plu_current_frame");
		expect(JSON.stringify(grant)).not.toContain("psg_");
		await t.mutation(internal.transcripts_grants.renew, { grantId });
		for (let step = 0; step < 5; step++) await run_grant(t, grantId);
		grant = (await t.run(async (ctx) => await ctx.db.get("host_grants", grantId)))!;
		expect(grant.phase).toBe("ready");
		expect(calls).toEqual({ exchange: 1, seal: 2, renew: 1 });
		await t.run(async (ctx) => await ctx.db.patch("host_grants", grantId, { interactiveExpiresAt: Date.now() - 1 }));
		await t.mutation(internal.transcripts_grants.renew, { grantId });
		expect((await t.run(async (ctx) => await ctx.db.get("host_grants", grantId)))?.phase).toBe("blocked");
		expect(calls.renew).toBe(1);
	});
});

describe("transcript wake-ups", () => {
	const pending_jobs = async (t: TestConvex) =>
		(await t.run(async (ctx) => await ctx.db.system.query("_scheduled_functions").collect())).filter(
			(job) => job.state.kind === "pending",
		);
	// Run every due scheduled function, and the work they schedule, without moving the clock.
	// Moving it would expire the 60 s claim leases while the actions still run.
	const settle = async (t: TestConvex) => await t.finishAllScheduledFunctions(() => vi.advanceTimersByTime(0), 1000);

	test("a grant step refused with 401 stops at blocked and arms nothing", async () => {
		const { t } = await fixture();
		const grantId = await t.run(async (ctx) => {
			const grant = (await ctx.db.query("host_grants").first())!;
			// A renewal whose source bearer the host no longer accepts, like the dead grants on the dev deployment.
			await ctx.db.patch("host_grants", grant._id, {
				phase: "renew",
				sourceSecret: await transcripts_encrypt("psg_dead"),
				lifecycleRequestId: "renew-dead",
			});
			return grant._id;
		});
		const filesFetch = fetch;
		let grantCalls = 0;
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
				if (!new URL(String(input)).pathname.includes("service-grants")) return await filesFetch(input, init);
				grantCalls++;
				return Response.json({ message: "Unauthenticated" }, { status: 401 });
			}),
		);
		await t.mutation(internal.transcripts_grants.dispatch, { grantId });
		await settle(t);
		const grant = (await t.run(async (ctx) => await ctx.db.get("host_grants", grantId)))!;
		expect(grant.phase).toBe("blocked");
		expect(grant.errorCode).toBe("auth_expired");
		expect(grantCalls).toBe(1);
		expect(await pending_jobs(t)).toEqual([]);
	});

	test("a temporary grant failure waits for its backoff, not for the step watchdog", async () => {
		const { t } = await fixture();
		const grantId = await t.run(async (ctx) => {
			const grant = (await ctx.db.query("host_grants").first())!;
			await ctx.db.patch("host_grants", grant._id, {
				phase: "renew",
				sourceSecret: await transcripts_encrypt("psg_busy"),
				lifecycleRequestId: "renew-busy",
			});
			return grant._id;
		});
		const filesFetch = fetch;
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
				if (!new URL(String(input)).pathname.includes("service-grants")) return await filesFetch(input, init);
				return Response.json({ message: "Too many requests" }, { status: 429, headers: { "Retry-After": "600" } });
			}),
		);
		await t.mutation(internal.transcripts_grants.dispatch, { grantId });
		await settle(t);
		const wakes = (await pending_jobs(t)).filter((job) => job.name === "transcripts_grants:dispatch");
		expect(wakes.map((job) => job.scheduledTime - Date.now())).toEqual([600_000]);
	});

	test("a changed Files destination stops the grant instead of retrying it", async () => {
		const { t } = await fixture();
		const grantId = await t.run(async (ctx) => {
			const destination = (await ctx.db.query("transcript_destinations").first())!;
			await ctx.db.patch("transcript_destinations", destination._id, { writerId: "old-writer" });
			return (await ctx.db.query("host_grants").first())!._id;
		});
		await t.mutation(internal.transcripts_grants.dispatch, { grantId });
		await settle(t);
		const grant = (await t.run(async (ctx) => await ctx.db.get("host_grants", grantId)))!;
		expect(grant.errorCode).toBe("conflict");
		expect((await pending_jobs(t)).filter((job) => job.name === "transcripts_grants:dispatch")).toEqual([]);
	});

	test("the watchdog finishes channel work whose action never ran", async () => {
		const { t, channel, remote, send } = await fixture();
		await send("Saved after a crash");
		// Run the dispatcher that the send armed. Then drop its action, like a deploy that stops it.
		vi.advanceTimersByTime(0);
		await t.finishInProgressScheduledFunctions();
		const lost = await take_scheduled(t, "transcripts_worker:run");
		expect(lost).not.toBeNull();
		// The watchdog runs the dispatcher again one second after the 60 s lease.
		vi.advanceTimersByTime(61_000);
		await settle(t);
		expect((await t.run(async (ctx) => await ctx.db.query("transcript_channels").first()))?.status).toBe("ready");
		expect(remote.files.get(`${ROOT}/${channel.transcriptSlug}.md`)?.content).toContain("Saved after a crash");
	});

	test("idle channels keep no scheduled work", async () => {
		const { t, alice, channelId, send } = await fixture();
		await send("First");
		await send("Second");
		await expect(settle(t)).resolves.toBeUndefined();
		expect(await alice.query(api.transcripts.status, { channelId })).toMatchObject({ status: "ready" });
		expect(await pending_jobs(t)).toEqual([]);
		const count = async () =>
			(await t.run(async (ctx) => await ctx.db.system.query("_scheduled_functions").collect())).length;
		const before = await count();
		vi.advanceTimersByTime(60 * 60_000);
		await t.finishInProgressScheduledFunctions();
		expect(await count()).toBe(before);
	});
});

describe("transcript index", () => {
	test("uses its own source sequence and the existing public README format", async () => {
		const { t, channel, remote } = await fixture();
		const index = (await t.run(async (ctx) => await ctx.db.query("transcript_indexes").first()))!;
		for (let step = 0; step < 15; step++) await dispatch_index(t, index._id);
		expect(remote.files.get(`${ROOT}/README.md`)?.content).toBe(
			chatbe_readme_markdown([{ name: channel.name, slug: channel.transcriptSlug }]),
		);
		expect((await t.run(async (ctx) => await ctx.db.get("transcript_indexes", index._id)))?.appliedSequence).toBe(1);
	});
});
