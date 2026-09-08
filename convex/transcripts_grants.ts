import { z } from "zod";
import { v } from "convex/values";
import { doc } from "convex-helpers/validators";
import { internalAction, internalMutation, internalQuery, type ActionCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import { press_post } from "./press";
import { transcripts_decrypt, transcripts_encrypt } from "./transcripts_secrets";
import { transcripts_index_request } from "./transcripts_index";
import { chatbe_channel_header } from "../shared/transcript-markdown";
import schema from "./schema";

const grant_response = z.object({ token: z.string(), expiresAt: z.number(), scopes: z.array(z.string()) });
const scoped_grant_response = grant_response.extend({
	actorUserId: z.string(),
	organizationId: z.string(),
	workspaceId: z.string(),
	installationId: z.string(),
});
export const transcripts_host_scope = z.object({
	writerId: z.string(),
	rootNodeId: z.string(),
	folderNodeId: z.string(),
	writerGeneration: z.number(),
	readerRevision: z.number().nullable(),
	detached: z.boolean(),
	created: z.boolean(),
});

export class transcripts_HostError extends Error {
	constructor(
		message: string,
		public readonly status: number,
		public readonly code?: string,
	) {
		super(message);
	}
}

export async function transcripts_host_post<T>(
	path: string,
	body: unknown,
	token: string,
	schema: z.ZodType<T>,
): Promise<T> {
	const response = await press_post(path, body, token);
	if (response.status !== 200) {
		const failure = z.object({ message: z.string(), code: z.string().optional() }).safeParse(response.body);
		throw new transcripts_HostError(
			failure.success ? `${failure.data.message} (${response.status})` : `Files sync failed (${response.status}).`,
			response.status,
			failure.success ? failure.data.code : undefined,
		);
	}
	const parsed = schema.safeParse(response.body);
	if (!parsed.success) throw new Error("Press returned an invalid Files response.");
	return parsed.data;
}

export const get = internalQuery({
	args: { channelId: v.id("channels") },
	returns: v.union(
		v.null(),
		v.object({
			grant: doc(schema, "host_grants"),
			installation: doc(schema, "installations"),
			channel: doc(schema, "channels"),
			readers: v.array(v.object({ userId: v.string(), membershipLifetime: v.number() })),
		}),
	),
	handler: async (ctx, args) => {
		const grant = await ctx.db
			.query("host_grants")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		if (!grant) return null;
		const installation = await ctx.db.get("installations", grant.installationId);
		const channel = await ctx.db.get("channels", args.channelId);
		const sponsor = await ctx.db
			.query("workspace_members")
			.withIndex("by_installation_hostUserId", (q) =>
				q.eq("installationId", grant.installationId).eq("hostUserId", grant.sponsorUserId),
			)
			.unique();
		if (
			!installation ||
			installation.status !== "ready" ||
			!channel ||
			!sponsor?.active ||
			sponsor.cleanupPending ||
			sponsor.membershipLifetime !== grant.sponsorLifetime
		)
			return null;
		const members =
			channel.visibility === "private"
				? await ctx.db
						.query("channel_members")
						.withIndex("by_channel_hostUserId", (q) => q.eq("channelId", channel._id))
						.take(50)
				: [];
		const readers = [];
		for (const member of members) {
			const current = await ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", grant.installationId).eq("hostUserId", member.hostUserId),
				)
				.unique();
			if (current?.active && !current.cleanupPending && current.membershipLifetime === member.membershipLifetime)
				readers.push({ userId: member.hostUserId, membershipLifetime: member.membershipLifetime });
		}
		return { grant, installation, channel, readers };
	},
});

export async function transcripts_get_token(ctx: ActionCtx, channelId: Id<"channels">) {
	const current = await ctx.runQuery(internal.transcripts_grants.get, { channelId });
	if (!current || !current.grant.sealedSecret || current.grant.sealedExpiresAt <= Date.now())
		throw new Error("Connect Files sync again to continue.");
	return { ...current, token: await transcripts_decrypt(current.grant.sealedSecret) };
}

export const get_by_id = internalQuery({
	args: { grantId: v.id("host_grants") },
	returns: v.union(doc(schema, "host_grants"), v.null()),
	handler: async (ctx, args) => await ctx.db.get("host_grants", args.grantId),
});

// Rollback keeps a proof even after the sponsor loses chat access. Press limits it to cancellation.
export const reader_source = internalQuery({
	args: { channelId: v.id("channels") },
	returns: v.union(v.string(), v.null()),
	handler: async (ctx, args) =>
		(
			await ctx.db
				.query("host_grants")
				.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
				.unique()
		)?.sealedSecret ?? null,
});

export const save_step = internalMutation({
	args: { grantId: v.id("host_grants"), lifecycleRequestId: v.string(), secret: v.string(), expiresAt: v.number() },
	returns: v.boolean(),
	handler: async (ctx, args) => {
		const grant = await ctx.db.get("host_grants", args.grantId);
		if (!grant || grant.lifecycleRequestId !== args.lifecycleRequestId) return false;
		if (grant.phase === "seal") {
			await ctx.db.patch("host_grants", grant._id, {
				phase: "ready",
				sealedSecret: args.secret,
				sealedExpiresAt: args.expiresAt,
				sourceSecret: "",
				error: null,
				updatedAt: Date.now(),
			});
		} else if (grant.phase === "exchange" || grant.phase === "renew") {
			await ctx.db.patch("host_grants", grant._id, {
				phase: "seal",
				interactiveSecret: args.secret,
				interactiveExpiresAt: args.expiresAt,
				sourceSecret: args.secret,
				lifecycleRequestId: crypto.randomUUID(),
				error: null,
				updatedAt: Date.now(),
			});
		} else return false;
		await ctx.scheduler.runAfter(0, internal.transcripts_grants.connect, { grantId: grant._id });
		return true;
	},
});

export const save_error = internalMutation({
	args: { grantId: v.id("host_grants"), lifecycleRequestId: v.string(), error: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const grant = await ctx.db.get("host_grants", args.grantId);
		if (grant?.lifecycleRequestId === args.lifecycleRequestId) {
			await ctx.db.patch("host_grants", grant._id, { error: args.error, updatedAt: Date.now() });
			const channel = await ctx.db
				.query("transcript_channels")
				.withIndex("by_channel", (q) => q.eq("channelId", grant.channelId))
				.unique();
			if (channel) await ctx.db.patch("transcript_channels", channel._id, { status: "blocked", error: args.error });
		}
	},
});

export const save_destination = internalMutation({
	args: {
		grantId: v.id("host_grants"),
		lifecycleRequestId: v.string(),
		writerId: v.string(),
		rootWriterId: v.string(),
		rootNodeId: v.string(),
		folderNodeId: v.string(),
		folderPath: v.string(),
		writerGeneration: v.number(),
		readerRevision: v.union(v.number(), v.null()),
		detached: v.boolean(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const grant = await ctx.db.get("host_grants", args.grantId);
		if (!grant || grant.lifecycleRequestId !== args.lifecycleRequestId) return;
		const channel = (await ctx.db.get("channels", grant.channelId))!;
		const installation = await ctx.db.get("installations", grant.installationId);
		const sponsor = await ctx.db
			.query("workspace_members")
			.withIndex("by_installation_hostUserId", (q) =>
				q.eq("installationId", grant.installationId).eq("hostUserId", grant.sponsorUserId),
			)
			.unique();
		if (
			installation?.status !== "ready" ||
			!sponsor?.active ||
			sponsor.cleanupPending ||
			sponsor.membershipLifetime !== grant.sponsorLifetime
		)
			throw new Error("The Files sponsor no longer has access. Connect again.");
		const current = await ctx.db
			.query("transcript_destinations")
			.withIndex("by_channel", (q) => q.eq("channelId", grant.channelId))
			.unique();
		const { grantId: _grantId, lifecycleRequestId: _request, ...destination } = args;
		if (current) {
			if (current.writerId !== args.writerId || current.folderNodeId !== args.folderNodeId)
				throw new Error("The Files destination changed. Its saved path cannot be adopted.");
			await ctx.db.patch("transcript_destinations", current._id, {
				readerRevision: args.readerRevision,
				detached: args.detached,
			});
		} else
			await ctx.db.insert("transcript_destinations", {
				...destination,
				channelId: grant.channelId,
				header: chatbe_channel_header(channel.name, channel.topic, channel.visibility === "private"),
				tailOrder: 0,
				runId: null,
				readerRunId: null,
				readerError: null,
			});
		await ctx.db.patch("host_grants", grant._id, { selectIndexOnReady: false, error: null, updatedAt: Date.now() });
		const state = await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", channel._id))
			.unique();
		const [run, readerRun] = await Promise.all([
			current?.runId ? ctx.db.get("transcript_runs", current.runId) : null,
			current?.readerRunId ? ctx.db.get("transcript_runs", current.readerRunId) : null,
		]);
		// A new grant adds no transcript work when the existing destination is already synced.
		if (state)
			await ctx.db.patch("transcript_channels", state._id, {
				status:
					current &&
					(!run || run.phase === "complete") &&
					(!readerRun || readerRun.phase === "complete") &&
					state.appliedSequence === state.desiredSequence
						? "ready"
						: "pending",
				error: null,
				nextAttemptAt: Date.now(),
			});
		await ctx.scheduler.runAfter(0, internal.transcripts_worker.run_channel, { channelId: channel._id });
		const index = await ctx.db
			.query("transcript_indexes")
			.withIndex("by_installation_generation", (q) =>
				q.eq("installationId", channel.installationId).eq("generation", channel.generation),
			)
			.unique();
		if (index) {
			// Only a new explicit connection chooses another sponsor. Renewal keeps that choice.
			if (grant.selectIndexOnReady || !index.grantChannelId)
				await ctx.db.patch("transcript_indexes", index._id, { grantChannelId: channel._id });
			if (grant.selectIndexOnReady || !index.grantChannelId || index.grantChannelId === channel._id)
				await transcripts_index_request(ctx, { indexId: index._id, reconcile: false });
		} else {
			const indexId = await ctx.db.insert("transcript_indexes", {
				installationId: channel.installationId,
				generation: channel.generation,
				grantChannelId: channel._id,
				desiredSequence: 0,
				appliedSequence: 0,
				status: "pending",
				error: null,
				activeRunId: null,
				nodeId: null,
				contentRevision: null,
				writerId: null,
				writerGeneration: 0,
				parentNodeId: null,
				foldedSequence: 0,
				entryBytes: 0,
				entryCount: 0,
			});
			await ctx.scheduler.runAfter(0, internal.transcripts_index.run, { indexId });
		}
		await ctx.scheduler.runAfter(12 * 60 * 60 * 1000, internal.transcripts_grants.renew, { grantId: grant._id });
	},
});

export const renew = internalMutation({
	args: { grantId: v.id("host_grants") },
	returns: v.null(),
	handler: async (ctx, args) => {
		const grant = await ctx.db.get("host_grants", args.grantId);
		if (!grant || grant.phase !== "ready" || grant.selectIndexOnReady) return;
		if (!grant.interactiveSecret || grant.interactiveExpiresAt <= Date.now()) {
			await ctx.db.patch("host_grants", grant._id, {
				error: "Connect Files sync again to continue.",
				phase: "blocked",
			});
			return;
		}
		await ctx.db.patch("host_grants", grant._id, {
			phase: "renew",
			sourceSecret: grant.interactiveSecret,
			lifecycleRequestId: crypto.randomUUID(),
			updatedAt: Date.now(),
		});
		await ctx.scheduler.runAfter(0, internal.transcripts_grants.connect, args);
	},
});

export const connect = internalAction({
	args: { grantId: v.id("host_grants") },
	returns: v.null(),
	handler: async (ctx, args) => {
		const grant: Doc<"host_grants"> | null = await ctx.runQuery(internal.transcripts_grants.get_by_id, args);
		if (!grant || grant.phase === "blocked") return;
		try {
			const current = await ctx.runQuery(internal.transcripts_grants.get, { channelId: grant.channelId });
			if (!current) throw new Error("The Files sponsor no longer has access. Connect again.");
			if (grant.phase !== "ready") {
				const source = await transcripts_decrypt(grant.sourceSecret);
				const operation = grant.phase;
				const body = {
					requestId: grant.lifecycleRequestId,
					...(operation === "seal" ? { destinationPathPrefix: grant.rootPath } : {}),
				};
				// Always ask for the saved result first. The previous bearer may already be rotated.
				let response = await press_post("/api/internal/plugins/service-grants/recover", { operation, ...body }, source);
				if (response.status === 404)
					response = await press_post(
						`/api/internal/plugins/service-grants/${operation === "seal" ? "seal-processing" : operation}`,
						body,
						source,
					);
				if (response.status !== 200) {
					const failure = z.object({ message: z.string() }).safeParse(response.body);
					throw new Error(failure.success ? failure.data.message : "Files connection failed. Try again.");
				}
				const parsed = (operation === "renew" ? grant_response : scoped_grant_response).safeParse(response.body);
				if (!parsed.success || parsed.data.expiresAt <= Date.now())
					throw new Error("Press returned an invalid Files grant.");
				if (operation !== "renew") {
					const scoped = scoped_grant_response.parse(response.body);
					if (
						scoped.actorUserId !== grant.sponsorUserId ||
						scoped.installationId !== current.installation.hostInstallationId ||
						scoped.organizationId !== current.installation.hostOrganizationId ||
						scoped.workspaceId !== current.installation.hostWorkspaceId
					)
						throw new Error("This Press session belongs to another workspace or person.");
				}
				await ctx.runMutation(internal.transcripts_grants.save_step, {
					grantId: grant._id,
					lifecycleRequestId: grant.lifecycleRequestId,
					secret: await transcripts_encrypt(parsed.data.token),
					expiresAt: parsed.data.expiresAt,
				});
				return;
			}
			const token = await transcripts_decrypt(grant.sealedSecret!);
			const root = await transcripts_host_post(
				"/api/internal/plugins/files/ensure",
				{
					datasetGeneration: current.installation.generation,
					channelId: "__root",
					rootPath: grant.rootPath,
					path: grant.rootPath,
					readOnly: true,
				},
				token,
				transcripts_host_scope,
			);
			const folderPath =
				current.channel.visibility === "private"
					? `${grant.rootPath}/private/${current.channel.transcriptSlug}`
					: grant.rootPath;
			const destination = await transcripts_host_post(
				"/api/internal/plugins/files/ensure",
				{
					datasetGeneration: current.installation.generation,
					channelId: current.channel.publicId,
					rootPath: grant.rootPath,
					path: folderPath,
					readOnly: true,
					...(current.channel.visibility === "private" ? { readers: current.readers } : {}),
				},
				token,
				transcripts_host_scope,
			);
			await ctx.runMutation(internal.transcripts_grants.save_destination, {
				grantId: grant._id,
				lifecycleRequestId: grant.lifecycleRequestId,
				writerId: destination.writerId,
				rootWriterId: root.writerId,
				rootNodeId: root.rootNodeId,
				folderNodeId: destination.folderNodeId,
				folderPath,
				writerGeneration: destination.writerGeneration,
				readerRevision: destination.readerRevision,
				detached: destination.detached,
			});
		} catch (error) {
			await ctx.runMutation(internal.transcripts_grants.save_error, {
				grantId: grant._id,
				lifecycleRequestId: grant.lifecycleRequestId,
				error: error instanceof Error ? error.message : "Files connection failed. Try again.",
			});
		}
	},
});
