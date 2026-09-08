/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { z } from "zod";
import { api, internal } from "./_generated/api";
import schema from "./schema";
import { transcripts_encrypt } from "./transcripts_secrets";
import { transcripts_index_request } from "./transcripts_index";
import { channels_queue_index } from "./channels";
import { chatbe_readme_markdown } from "../shared/transcript-markdown";

const modules = import.meta.glob("./**/*.ts");
const ROOT = "/chitchat-index-tests";
const PATH = `${ROOT}/README.md`;

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

function host() {
	const files = new Map<string, { nodeId: string; content: string; revision: string }>();
	const receipts = new Map<string, { fingerprint: string; value: object }>();
	const calls: { path: string; body: unknown }[] = [];
	let generation = 1;
	let writes = 0;
	let loseWrite = false;
	let loseFence = false;
	let denied = false;
	let beforeWrite: (() => Promise<void>) | null = null;
	const writeSchema = z.object({
		writerId: z.string(),
		operationId: z.string(),
		writerGeneration: z.number(),
		sequence: z.number().int().positive(),
		path: z.string(),
		expectedParentNodeId: z.string(),
		expectedNodeId: z.string().nullable(),
		expectedContentRevision: z.string().nullable(),
		expectedReaderRevision: z.null(),
		content: z.string(),
		contentHash: z.string(),
	});
	vi.stubGlobal(
		"fetch",
		vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
			const path = new URL(String(input)).pathname;
			const body: unknown = JSON.parse(String(init?.body));
			calls.push({ path, body });
			if (denied) return Response.json({ message: "Files write permission was removed." }, { status: 403 });
			if (path.endsWith("/ensure"))
				return Response.json({
					writerId: "root-writer",
					rootNodeId: "root",
					folderNodeId: "root",
					writerGeneration: generation,
					readerRevision: null,
					detached: false,
					created: false,
				});
			if (path.endsWith("/prepare")) {
				const request = z.object({ path: z.string() }).parse(body);
				const file = files.get(request.path);
				return Response.json({
					nodeId: file?.nodeId ?? null,
					content: file?.content ?? null,
					contentRevision: file?.revision ?? null,
					expectedParentNodeId: "root",
					writerGeneration: generation,
					readerRevision: null,
					detached: false,
				});
			}
			if (path.endsWith("/fence")) {
				const request = z
					.object({
						writerId: z.string(),
						operationId: z.string(),
						writerGeneration: z.number(),
						nextGeneration: z.number(),
					})
					.parse(body);
				const saved = receipts.get(request.operationId);
				if (saved) {
					expect(saved.fingerprint).toBe(JSON.stringify(body));
					return Response.json(saved.value);
				}
				if (request.writerGeneration !== generation) return Response.json({ message: "Stale writer" }, { status: 409 });
				expect(request.nextGeneration).toBe(generation + 1);
				generation++;
				const value = {
					_id: request.operationId,
					operationId: request.operationId,
					writerGeneration: generation,
					nodeId: "root",
					contentRevision: null,
					readerRevision: null,
				};
				receipts.set(request.operationId, { fingerprint: JSON.stringify(body), value });
				if (loseFence) {
					loseFence = false;
					throw new TypeError("Fence response lost");
				}
				return Response.json(value);
			}
			if (path.endsWith("/write")) {
				const request = writeSchema.parse(body);
				if (beforeWrite) {
					const callback = beforeWrite;
					beforeWrite = null;
					await callback();
				}
				// Press checks its current generation before both receipt replay and finalization.
				if (request.writerGeneration !== generation) return Response.json({ message: "Stale writer" }, { status: 409 });
				const saved = receipts.get(request.operationId);
				if (saved) {
					expect(saved.fingerprint).toBe(JSON.stringify(body));
					return Response.json(saved.value);
				}
				const file = files.get(request.path);
				if (
					(file?.nodeId ?? null) !== request.expectedNodeId ||
					(file?.revision ?? null) !== request.expectedContentRevision
				)
					return Response.json({ message: "The content revision changed." }, { status: 409 });
				expect(new TextEncoder().encode(request.content).byteLength).toBeLessThanOrEqual(100_000);
				writes++;
				const next = {
					nodeId: file?.nodeId ?? `node-${writes}`,
					content: request.content,
					revision: `revision-${writes}`,
				};
				files.set(request.path, next);
				const value = {
					_id: request.operationId,
					operationId: request.operationId,
					writerGeneration: generation,
					nodeId: next.nodeId,
					contentRevision: next.revision,
					readerRevision: null,
				};
				receipts.set(request.operationId, { fingerprint: JSON.stringify(body), value });
				if (loseWrite) {
					loseWrite = false;
					throw new TypeError("Write response lost");
				}
				return Response.json(value);
			}
			throw new Error(`Unexpected host call: ${path}`);
		}),
	);
	return {
		files,
		calls,
		receipts,
		writes: () => writes,
		generation: () => generation,
		loseWrite: () => {
			loseWrite = true;
		},
		loseFence: () => {
			loseFence = true;
		},
		deny: () => {
			denied = true;
		},
		beforeWrite: (callback: () => Promise<void>) => {
			beforeWrite = callback;
		},
	};
}

async function fixture(isPrivate = false) {
	const remote = host();
	const t = convexTest(schema, modules);
	const installationId = await t.run(async (ctx) => {
		const id = await ctx.db.insert("installations", {
			hostInstallationId: "installation",
			hostOrganizationId: "org",
			hostWorkspaceId: "workspace",
			hostPluginVersionId: "version",
			hostServiceAccountId: "service",
			organizationOwnerUserId: "alice",
			status: "ready",
			appliedAccessRevision: 1,
			invalidatedAtRevision: 0,
			bootstrapStartRevision: 1,
			bootstrapCursor: null,
			bootstrapPhase: "events",
			bootstrapTargetRevision: 1,
			generation: "one",
			outputRoot: ROOT,
		});
		await ctx.db.insert("workspace_members", {
			installationId: id,
			hostUserId: "alice",
			hostMembershipId: "membership",
			membershipLifetime: 1,
			active: true,
			displayName: "Alice",
			revision: 1,
			canRead: true,
			canWrite: true,
			isOwner: true,
			cleanupPending: false,
		});
		await ctx.db.insert("sessions", {
			installationId: id,
			hostSessionId: "session",
			exchangeId: "exchange",
			hostUserId: "alice",
			hostMembershipId: "membership",
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
		subject: "session",
		exchangeId: "exchange",
	});
	const created = await alice.mutation(api.channels.create, {
		clientRequestId: "create",
		name: "General",
		topic: "",
		visibility: isPrivate ? "private" : "public",
		invitedUserIds: [],
	});
	if (created._yay?.kind !== "channel") throw new Error("Channel creation failed");
	const channelId = created._yay.channelId;
	const grantId = await t.run(
		async (ctx) =>
			await ctx.db.insert("host_grants", {
				installationId,
				channelId,
				sponsorUserId: "alice",
				sponsorLifetime: 1,
				clientRequestId: "connect",
				rootPath: ROOT,
				phase: "ready",
				lifecycleRequestId: "seal",
				sourceSecret: "",
				interactiveSecret: await transcripts_encrypt("psg_interactive"),
				interactiveExpiresAt: Date.now() + 86_400_000,
				sealedSecret: await transcripts_encrypt("psg_sealed"),
				sealedExpiresAt: Date.now() + 86_400_000,
				error: null,
				updatedAt: Date.now(),
			}),
	);
	await t.mutation(internal.transcripts_grants.save_destination, {
		grantId,
		lifecycleRequestId: "seal",
		writerId: "channel-writer",
		rootWriterId: "root-writer",
		rootNodeId: "root",
		folderNodeId: "root",
		folderPath: ROOT,
		writerGeneration: 1,
		readerRevision: null,
		detached: false,
	});
	const indexId = (await t.run(async (ctx) => await ctx.db.query("transcript_indexes").first()))!._id;
	const state = async () => (await t.run(async (ctx) => await ctx.db.get("transcript_indexes", indexId)))!;
	const request = async (reconcile = false) =>
		await t.run(async (ctx) => await transcripts_index_request(ctx, { indexId, reconcile }));
	const tick = async () => await t.action(internal.transcripts_index.run, { indexId });
	const drain = async (blocked = false) => {
		for (let attempt = 0; attempt < 300; attempt++) {
			await tick();
			const current = await state();
			if (current.status === "blocked") {
				if (blocked) return current;
				throw new Error(current.error ?? "Index blocked");
			}
			if (current.status === "ready") return current;
		}
		throw new Error("Index did not finish");
	};
	const seed = async (names: string[]) =>
		await t.run(async (ctx) => {
			const original = (await ctx.db.get("channels", channelId))!;
			const { _id: _id, _creationTime: _time, ...value } = original;
			const entries = [];
			for (const name of names) {
				const publicId = crypto.randomUUID();
				const slug = `channel-${publicId}`;
				const id = await ctx.db.insert("channels", {
					...value,
					visibility: "public",
					publicId,
					transcriptSlug: slug,
					name,
					sortName: name.toLowerCase(),
				});
				await channels_queue_index(ctx, (await ctx.db.get("channels", id))!);
				entries.push({ channelId: id, name, slug });
			}
			return entries;
		});
	return { t, alice, channelId, grantId, indexId, remote, state, request, tick, drain, seed };
}

describe("transcript index", () => {
	test("pages all entries and uses the exact existing locale order", async () => {
		const { t, channelId, remote, seed, drain, state } = await fixture();
		const entries = await seed([
			"zebra",
			"Éclair",
			"alpha",
			"Äpfel",
			...Array.from({ length: 120 }, (_, i) => `Room ${i}`),
		]);
		const channel = (await t.run(async (ctx) => await ctx.db.get("channels", channelId)))!;
		await drain();
		expect(remote.files.get(PATH)!.content).toBe(
			chatbe_readme_markdown([{ name: channel.name, slug: channel.transcriptSlug }, ...entries]),
		);
		expect((await state()).entryCount).toBe(125);
		expect(remote.writes()).toBe(1);
	});

	test("creates the empty README when the first connected channel is private", async () => {
		const { remote, drain } = await fixture(true);
		const index = await drain();
		expect(index.appliedSequence).toBe(0);
		expect(index.nodeId).not.toBeNull();
		expect(remote.files.get(PATH)!.content).toBe(chatbe_readme_markdown([]));
		expect(
			z.object({ sequence: z.number() }).parse(remote.calls.find((call) => call.path.endsWith("/write"))!.body)
				.sequence,
		).toBe(1);
	});

	test("keeps a frozen source barrier while later names wait", async () => {
		const { remote, state, seed, tick, drain } = await fixture();
		await tick();
		await seed(["Later channel"]);
		for (let i = 0; i < 5 && (await state()).appliedSequence < 1; i++) await tick();
		expect(remote.files.get(PATH)!.content).not.toContain("Later channel");
		await drain();
		expect(remote.files.get(PATH)!.content).toContain("Later channel");
		expect(remote.writes()).toBe(2);
	});

	test("blocks the complete oversized README and folds newer archive jobs on retry", async () => {
		const { t, remote, seed, request, drain, state } = await fixture();
		await drain();
		const previous = { ...remote.files.get(PATH)! };
		const entries = await seed(Array.from({ length: 550 }, (_, i) => `${"界".repeat(60)} ${i}`));
		expect((await drain(true)).error).toContain("100,000");
		expect(remote.files.get(PATH)).toEqual(previous);
		expect((await state()).appliedSequence).toBe(1);
		await t.run(async (ctx) => {
			for (const entry of entries.slice(0, 200)) {
				const channel = (await ctx.db.get("channels", entry.channelId))!;
				await ctx.db.patch("channels", channel._id, { archivedAt: Date.now() });
				await channels_queue_index(ctx, { ...channel, archivedAt: Date.now() });
			}
		});
		await request();
		await drain();
		expect((await state()).entryCount).toBe(351);
		expect(remote.files.get(PATH)!.nodeId).toBe(previous.nodeId);
		expect(remote.files.get(PATH)!.content).not.toContain(entries[0]!.name);
		expect(remote.writes()).toBe(2);
	});

	test("never adopts a preoccupied, replaced, or moved README path", async () => {
		const { remote, request, seed, drain } = await fixture();
		remote.files.set(PATH, { nodeId: "human-file", content: "Keep this text", revision: "human" });
		expect((await drain(true)).error).toContain("different file");
		await request(true);
		expect((await drain(true)).error).toContain("different file");
		expect(remote.writes()).toBe(0);
		remote.files.delete(PATH);
		await request();
		await drain();
		const saved = remote.files.get(PATH)!;
		await seed(["New room"]);
		remote.files.set(PATH, { ...saved, nodeId: "replacement" });
		expect((await drain(true)).error).toContain("different file");
		await request(true);
		expect((await drain(true)).error).toContain("different file");
		remote.files.delete(PATH);
		await request();
		expect((await drain(true)).error).toContain("different file");
		expect(remote.writes()).toBe(1);
	});

	test("replays an uncertain initial write unchanged before learning its file id", async () => {
		const { t, indexId, remote, tick, request, drain, state } = await fixture();
		remote.loseWrite();
		for (let i = 0; i < 10 && remote.writes() === 0; i++) await tick();
		expect((await state()).nodeId).toBeNull();
		expect(await t.mutation(internal.transcripts_index.claim, { indexId })).toBeNull();
		await request();
		await drain();
		expect(remote.writes()).toBe(1);
		expect((await state()).nodeId).toBe(remote.files.get(PATH)!.nodeId);
		const calls = remote.calls.filter((call) => call.path.endsWith("/write"));
		expect(calls).toHaveLength(2);
		expect(calls[1]!.body).toEqual(calls[0]!.body);
	});

	test("rebuild first recovers an unknown committed file and then fences it", async () => {
		const { remote, tick, request, drain } = await fixture();
		remote.loseWrite();
		for (let i = 0; i < 10 && remote.writes() === 0; i++) await tick();
		remote.files.get(PATH)!.content += "\nHuman text";
		remote.files.get(PATH)!.revision = "human";
		await request(true);
		await drain();
		expect(remote.files.get(PATH)!.content).not.toContain("Human text");
		expect(remote.generation()).toBe(2);
		expect(remote.writes()).toBe(2);
		const operations = remote.calls.filter((call) => /\/(write|fence)$/.test(call.path));
		expect(operations.slice(0, 3).map((call) => call.path.split("/").at(-1))).toEqual(["write", "write", "fence"]);
	});

	test("requires explicit rebuild for human edits and replays a lost fence receipt", async () => {
		const { remote, seed, drain, tick, request } = await fixture();
		await drain();
		const originalId = remote.files.get(PATH)!.nodeId;
		remote.files.get(PATH)!.content += "\nHuman text";
		remote.files.get(PATH)!.revision = "human";
		await seed(["Later room"]);
		expect((await drain(true)).error).toContain("text changed");
		expect(remote.files.get(PATH)!.content).toContain("Human text");
		remote.loseFence();
		await request(true);
		await tick();
		expect(remote.generation()).toBe(2);
		await request();
		await drain();
		expect(remote.files.get(PATH)!.nodeId).toBe(originalId);
		expect(remote.files.get(PATH)!.content).not.toContain("Human text");
		const fences = remote.calls.filter((call) => call.path.endsWith("/fence"));
		expect(fences).toHaveLength(2);
		expect(fences[0]!.body).toEqual(fences[1]!.body);
		expect(remote.generation()).toBe(2);
	});

	test("fences a delayed old publish and ignores its stale native checkpoints", async () => {
		const { t, indexId, remote, seed, tick, request, drain, state } = await fixture();
		await drain();
		await seed(["New room"]);
		for (let i = 0; i < 10; i++) {
			await tick();
			const index = await state();
			const run = index.activeRunId
				? await t.run(async (ctx) => await ctx.db.get("transcript_index_runs", index.activeRunId!))
				: null;
			if (run?.prepared) break;
		}
		const old = (await t.mutation(internal.transcripts_index.claim, { indexId }))!;
		await t.mutation(internal.transcripts_index.release, {
			runId: old._id,
			claim: old.claim,
			receipt: null,
			retryable: false,
			error: null,
		});
		remote.beforeWrite(async () => {
			await request(true);
			await tick();
		});
		await tick();
		expect(remote.generation()).toBe(2);
		expect(remote.writes()).toBe(1);
		await t.mutation(internal.transcripts_index.release, {
			runId: old._id,
			claim: old.claim,
			receipt: null,
			retryable: false,
			error: "Stale error",
		});
		await t.mutation(internal.transcripts_index.step, { runId: old._id, claim: old.claim });
		expect((await state()).status).toBe("pending");
		expect((await state()).error).toBeNull();
		await drain();
		expect(remote.files.get(PATH)!.content).toContain("New room");
		expect(remote.writes()).toBe(2);
	});

	test("removes completed jobs and retired runs only after the host write is confirmed", async () => {
		const { t, indexId, remote, seed, tick, request, drain, state } = await fixture();
		await seed(Array.from({ length: 60 }, (_, i) => `Room ${i}`));
		remote.loseWrite();
		for (let i = 0; i < 20 && remote.writes() === 0; i++) await tick();
		await t.mutation(internal.transcripts_index.cleanup, { indexId, throughCreatedAt: Date.now() + 1000 });
		expect(await t.run(async (ctx) => (await ctx.db.query("transcript_index_jobs").collect()).length)).toBe(61);
		expect((await state()).activeRunId).not.toBeNull();
		await request();
		await drain();
		for (let i = 0; i < 3; i++)
			await t.mutation(internal.transcripts_index.cleanup, { indexId, throughCreatedAt: Date.now() + 1000 });
		expect(await t.run(async (ctx) => await ctx.db.query("transcript_index_jobs").collect())).toEqual([]);
		expect(await t.run(async (ctx) => await ctx.db.query("transcript_index_runs").collect())).toEqual([]);
		await seed(["After cleanup"]);
		await drain();
		expect(remote.files.get(PATH)!.content).toContain("After cleanup");
	});

	test("keeps file permission loss blocked even during an explicit rebuild", async () => {
		const { remote, drain, request } = await fixture();
		await drain();
		remote.deny();
		await request(true);
		expect((await drain(true)).error).toContain("permission");
		expect(remote.writes()).toBe(1);
		expect(remote.generation()).toBe(1);
	});

	test("a retry of an already saved index stays ready", async () => {
		const { request, tick, drain, state, remote } = await fixture();
		await drain();
		await request();
		await tick();
		expect((await state()).status).toBe("ready");
		expect(remote.writes()).toBe(1);
	});

	test("a new rebuild can replace manual edits made after an earlier rebuild prepared its write", async () => {
		const { t, request, tick, drain, state, remote } = await fixture();
		await drain();
		await request(true);
		for (let i = 0; i < 10; i++) {
			await tick();
			const index = await state();
			const current = index.activeRunId
				? await t.run(async (ctx) => await ctx.db.get("transcript_index_runs", index.activeRunId!))
				: null;
			if (current?.prepared) break;
		}
		remote.files.get(PATH)!.content += "\nNew human edit";
		remote.files.get(PATH)!.revision = "new-human";
		expect((await drain(true)).error).toContain("content revision");
		await request(true);
		await drain();
		expect(remote.generation()).toBe(3);
		expect(remote.files.get(PATH)!.content).not.toContain("New human edit");
	});
});
