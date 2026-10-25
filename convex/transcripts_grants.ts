import { z } from "zod";
import type { BonoboHttpApi, BonoboHttpApiPath } from "bonobo-plugin-sdk/http-api";
import { ConvexError, v } from "convex/values";
import { doc } from "convex-helpers/validators";
import { internalAction, internalMutation, internalQuery, type ActionCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import { press_post } from "./press";
import { transcripts_decrypt, transcripts_encrypt } from "./transcripts_secrets";
import { transcripts_index_request } from "./transcripts_index";
import { transcripts_next_retry, transcripts_retry_delay, transcripts_wake } from "./transcripts_wake";
import { transcripts_db_resume_readers } from "./transcripts_db";
import { chatbe_channel_header } from "../shared/transcript-markdown";
import { chat_transcript_error_code, type chat_TranscriptErrorCode } from "../shared/chat";
import schema from "./schema";

const grant_response = z.object({ token: z.string(), expiresAt: z.number(), scopes: z.array(z.string()) });
const scoped_grant_response = grant_response.extend({
	actorUserId: z.string(),
	organizationId: z.string(),
	workspaceId: z.string(),
	installationId: z.string(),
});
export const transcripts_host_scope = z
	.object({
		writer: z.object({
			writerId: z.string(),
			rootNodeId: z.string(),
			folderNodeId: z.string(),
			writerGeneration: z.number(),
			readerRevision: z.number().nullable(),
			detached: z.boolean(),
		}),
	})
	.transform((result) => result.writer);

export class transcripts_HostError extends Error {
	constructor(
		message: string,
		public readonly status: number,
		public readonly code?: string,
		// From the host `Retry-After` header, mostly sent with 429.
		public readonly retryAfterMs: number | null = null,
	) {
		super(message);
	}
}

// A local refusal that already knows its error code, for example an expired Files connection.
export class transcripts_StepError extends Error {
	constructor(
		message: string,
		public readonly errorCode: chat_TranscriptErrorCode,
	) {
		super(message);
	}
}

export function transcripts_get_error_message(error: unknown, fallback: string) {
	// Convex keeps expected refusal data separate from its cross-function error message.
	if (error instanceof ConvexError && typeof error.data === "string") return error.data;
	return error instanceof Error ? error.message : fallback;
}

// Sort a failed step into an error code. Only "temporary" retries by itself.
// A final 400/401/403/404 from Bonobo Senate never gets better on its own, so it waits for a person.
export function transcripts_get_error_code(error: unknown, message: string): chat_TranscriptErrorCode {
	if (error instanceof transcripts_StepError) return error.errorCode;
	if (error instanceof transcripts_HostError) {
		if (error.status === 401) return "auth_expired";
		if (error.status === 403) return "permission";
		if (error.status === 413) return "too_large";
		if (error.status === 408 || error.status === 429 || error.status >= 500) return "temporary";
		return "conflict";
	}
	if (/exceeds|too large/i.test(message)) return "too_large";
	// A mutation refusal with a message for people waits for that person, like a host 409.
	if (error instanceof ConvexError && typeof error.data === "string") return "conflict";
	// Other errors have no known reason, for example a failed fetch, a timeout, or a short Convex error.
	// They may work on the next try.
	return "temporary";
}

function transcripts_host_error(response: Awaited<ReturnType<typeof press_post>>, fallback: string) {
	const failure = z.object({ message: z.string(), code: z.string().optional() }).safeParse(response.body);
	const retryAfter = Number(response.retryAfter);
	return new transcripts_HostError(
		failure.success ? `${failure.data.message} (${response.status})` : `${fallback} (${response.status}).`,
		response.status,
		failure.success ? failure.data.code : undefined,
		response.retryAfter !== null && Number.isFinite(retryAfter) ? retryAfter * 1000 : null,
	);
}

export async function transcripts_host_post<Path extends BonoboHttpApiPath, T>(
	path: Path,
	body: BonoboHttpApi[Path]["POST"]["body"],
	token: string,
	schema: z.ZodType<T>,
): Promise<T> {
	const response = await press_post(path, body, token);
	if (response.status !== 200) throw transcripts_host_error(response, "Files sync failed");
	const parsed = schema.safeParse(response.body);
	if (!parsed.success) throw new Error("Bonobo Senate returned an invalid Files response.");
	return parsed.data;
}

export const get = internalQuery({
	args: { channelId: v.id("channels") },
	returns: v.union(
		v.null(),
		// The member list is being read again. Files work waits and retries by itself.
		v.literal("not_ready"),
		v.literal("sponsor_gone"),
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
		if (installation?.status === "bootstrapping") return "not_ready";
		if (!installation || installation.status !== "ready" || !channel) return null;
		if (!sponsor?.active || sponsor.cleanupPending || sponsor.membershipLifetime !== grant.sponsorLifetime)
			return "sponsor_gone";
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

async function get_current(ctx: ActionCtx, channelId: Id<"channels">) {
	const current = await ctx.runQuery(internal.transcripts_grants.get, { channelId });
	if (current === "not_ready")
		throw new transcripts_StepError("Chitchat is updating workspace access. Files sync will retry.", "temporary");
	if (current === "sponsor_gone")
		throw new transcripts_StepError("The Files sponsor no longer has access. Connect again.", "sponsor_gone");
	return current;
}

export async function transcripts_get_token(ctx: ActionCtx, channelId: Id<"channels">) {
	const current = await get_current(ctx, channelId);
	if (!current || !current.grant.sealedSecret || current.grant.sealedExpiresAt <= Date.now())
		throw new transcripts_StepError("Connect Files sync again to continue.", "auth_expired");
	return { ...current, token: await transcripts_decrypt(current.grant.sealedSecret) };
}

export const get_by_id = internalQuery({
	args: { grantId: v.id("host_grants") },
	returns: v.union(doc(schema, "host_grants"), v.null()),
	handler: async (ctx, args) => await ctx.db.get("host_grants", args.grantId),
});

// Rollback keeps a proof even after the sponsor loses chat access. Bonobo Senate limits it to cancellation.
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
				errorCode: undefined,
				retry: undefined,
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
				errorCode: undefined,
				retry: undefined,
				updatedAt: Date.now(),
			});
		} else return false;
		await transcripts_wake(ctx, { grantId: grant._id }, Date.now());
		return true;
	},
});

export const save_error = internalMutation({
	args: {
		grantId: v.id("host_grants"),
		lifecycleRequestId: v.string(),
		error: v.string(),
		errorCode: chat_transcript_error_code,
		retryAfterMs: v.union(v.number(), v.null()),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		const grant = await ctx.db.get("host_grants", args.grantId);
		if (grant?.lifecycleRequestId !== args.lifecycleRequestId) return;
		const retry = transcripts_next_retry(grant.retry, args.errorCode);
		if (retry) {
			await ctx.db.patch("host_grants", grant._id, {
				error: args.error,
				errorCode: args.errorCode,
				retry,
				updatedAt: Date.now(),
			});
			// Replace the step watchdog. If it stayed, it would run the step again after 61 s and skip the backoff.
			await transcripts_wake(ctx, { grantId: grant._id }, null);
			await transcripts_wake(
				ctx,
				{ grantId: grant._id },
				Date.now() + transcripts_retry_delay(retry.failures, args.retryAfterMs),
			);
			return;
		}
		// A final refusal waits for Reconnect, which starts a new grant. Nothing retries it before that.
		await ctx.db.patch("host_grants", grant._id, {
			error: args.error,
			errorCode: args.errorCode,
			retry: undefined,
			updatedAt: Date.now(),
			...(grant.phase !== "ready" ? { phase: "blocked" as const } : {}),
		});
		await transcripts_wake(ctx, { grantId: grant._id }, null);
		const channel = await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", grant.channelId))
			.unique();
		if (channel)
			await ctx.db.patch("transcript_channels", channel._id, {
				status: "blocked",
				error: args.error,
				errorCode: args.errorCode,
			});
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
				throw new ConvexError("The Files destination changed. Its saved path cannot be adopted.");
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
		await ctx.db.patch("host_grants", grant._id, {
			selectIndexOnReady: false,
			error: null,
			errorCode: undefined,
			retry: undefined,
			updatedAt: Date.now(),
		});
		// This step finished, so its watchdog has nothing left to repeat.
		await transcripts_wake(ctx, { grantId: grant._id }, null);
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
				errorCode: undefined,
				retry: undefined,
				nextAttemptAt: Date.now(),
			});
		// The new connection also restarts a reader change that stopped on the old one.
		if (readerRun && readerRun.phase !== "complete") await transcripts_db_resume_readers(ctx, readerRun);
		const deletion = await ctx.db
			.query("transcript_deletions")
			.withIndex("by_channel", (q) => q.eq("channelId", channel._id))
			.unique();
		if (deletion && deletion.completedAt === null)
			await ctx.db.patch("transcript_deletions", deletion._id, {
				nextAttemptAt: Date.now(),
				error: null,
				errorCode: undefined,
				retry: undefined,
			});
		if (state) await transcripts_wake(ctx, { channelStateId: state._id }, Date.now());
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
			await transcripts_wake(ctx, { indexId }, Date.now());
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
				errorCode: "auth_expired",
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
		await transcripts_wake(ctx, { grantId: grant._id }, Date.now());
	},
});

// Each grant step makes at most two host calls with a 15 s timeout each.
const GRANT_STEP_WATCHDOG_MS = 61_000;

export const dispatch = internalMutation({
	args: { grantId: v.id("host_grants") },
	returns: v.null(),
	handler: async (ctx, args) => {
		const grant = await ctx.db.get("host_grants", args.grantId);
		// A blocked grant waits for Reconnect, which replaces it.
		if (!grant || grant.phase === "blocked") return null;
		// Arm the watchdog in this transaction. If the action never ends, the same step runs again.
		await transcripts_wake(ctx, { grantId: grant._id }, Date.now() + GRANT_STEP_WATCHDOG_MS);
		await ctx.scheduler.runAfter(0, internal.transcripts_grants.connect, {
			grantId: grant._id,
			lifecycleRequestId: grant.lifecycleRequestId,
		});
		return null;
	},
});

export const connect = internalAction({
	args: { grantId: v.id("host_grants"), lifecycleRequestId: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		const grant: Doc<"host_grants"> | null = await ctx.runQuery(internal.transcripts_grants.get_by_id, {
			grantId: args.grantId,
		});
		if (!grant || grant.phase === "blocked" || grant.lifecycleRequestId !== args.lifecycleRequestId) return;
		try {
			const current = await get_current(ctx, grant.channelId);
			if (!current)
				throw new transcripts_StepError("The Files sponsor no longer has access. Connect again.", "sponsor_gone");
			if (grant.phase !== "ready") {
				const source = await transcripts_decrypt(grant.sourceSecret);
				const operation = grant.phase;
				const body = {
					requestId: grant.lifecycleRequestId,
					...(operation === "seal" ? { destinationPathPrefix: grant.rootPath } : {}),
				};
				// Always ask for the saved result first. The previous bearer may already be rotated.
				let response = await press_post("/api/v1/plugins/service-grants/recover", { operation, ...body }, source);
				if (response.status === 404)
					response = await press_post(
						`/api/v1/plugins/service-grants/${operation === "seal" ? "seal-processing" : operation}`,
						body,
						source,
					);
				// Keep the HTTP status. A final 400/401/403/404 must stop the grant instead of retrying it.
				if (response.status !== 200) throw transcripts_host_error(response, "Files connection failed");
				const parsed = (operation === "renew" ? grant_response : scoped_grant_response).safeParse(response.body);
				if (!parsed.success || parsed.data.expiresAt <= Date.now())
					throw new Error("Bonobo Senate returned an invalid Files grant.");
				if (operation !== "renew") {
					const scoped = scoped_grant_response.parse(response.body);
					if (
						scoped.actorUserId !== grant.sponsorUserId ||
						scoped.installationId !== current.installation.hostInstallationId ||
						scoped.organizationId !== current.installation.hostOrganizationId ||
						scoped.workspaceId !== current.installation.hostWorkspaceId
					)
						throw new Error("This Bonobo Senate session belongs to another workspace or person.");
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
				"/api/v1/files/plugin-folders/ensure",
				{
					path: grant.rootPath,
					writer: {
						resourceKey: JSON.stringify([current.installation.generation, "__root"]),
						rootNodeId: null,
					},
					access: { readOnly: true },
				},
				token,
				transcripts_host_scope,
			);
			const folderPath =
				current.channel.visibility === "private"
					? `${grant.rootPath}/private/${current.channel.transcriptSlug}`
					: grant.rootPath;
			const destination = await transcripts_host_post(
				"/api/v1/files/plugin-folders/ensure",
				{
					path: folderPath,
					writer: {
						resourceKey: JSON.stringify([current.installation.generation, current.channel.publicId]),
						rootNodeId: root.rootNodeId,
					},
					access: {
						readOnly: true,
						...(current.channel.visibility === "private" ? { readers: current.readers } : {}),
					},
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
			const message = transcripts_get_error_message(error, "Files connection failed. Try again.");
			await ctx.runMutation(internal.transcripts_grants.save_error, {
				grantId: grant._id,
				lifecycleRequestId: grant.lifecycleRequestId,
				error: message,
				errorCode: transcripts_get_error_code(error, message),
				retryAfterMs: error instanceof transcripts_HostError ? error.retryAfterMs : null,
			});
		}
	},
});
