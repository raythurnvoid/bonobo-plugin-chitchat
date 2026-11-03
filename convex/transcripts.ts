import { v } from "convex/values";
import type { RegisteredMutation } from "convex/server";
import { zodToConvex } from "convex-helpers/server/zod4";
import { action, internalMutation, mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { chat_error, chat_transcript_error_code, chat_validate_request_id, type chat_Result } from "../shared/chat";
import { chatbe_sha256_hex } from "../shared/transcript-markdown";
import { transcripts_encrypt } from "./transcripts_secrets";
import { press_get_lease, press_lease_facts } from "./press";
import { transcripts_index_request } from "./transcripts_index";
import { transcripts_wake } from "./transcripts_wake";
import { channels_get_access } from "./channels";

// Private channels get no transcript. See the TODO in `channels_queue_transcript`.
async function get_access(ctx: QueryCtx | MutationCtx, channelId: Id<"channels">) {
	const access = await channels_get_access(ctx, channelId);
	if (access._yay?.channel.visibility === "private") return { _nay: { message: "Not found" } } as const;
	return access;
}

export const status = query({
	args: { channelId: v.id("channels") },
	returns: v.union(
		v.null(),
		v.object({
			status: v.union(
				v.literal("not_connected"),
				v.literal("pending"),
				v.literal("running"),
				v.literal("blocked"),
				v.literal("ready"),
			),
			error: v.union(v.string(), v.null()),
			// The code of the shown error. Null when it is not known.
			errorCode: v.union(chat_transcript_error_code, v.null()),
			channelName: v.string(),
			// When temporary failures in a row started, and when the next try runs.
			retryingSince: v.union(v.number(), v.null()),
			nextAttemptAt: v.union(v.number(), v.null()),
			desiredSequence: v.number(),
			appliedSequence: v.number(),
			folderPath: v.union(v.string(), v.null()),
			folderNodeId: v.union(v.string(), v.null()),
			canConnect: v.boolean(),
			canReconcile: v.boolean(),
			indexStatus: v.union(v.literal("pending"), v.literal("running"), v.literal("blocked"), v.literal("ready")),
			indexError: v.union(v.string(), v.null()),
			indexErrorCode: v.union(chat_transcript_error_code, v.null()),
		}),
	),
	handler: async (ctx, args) => {
		const access = await get_access(ctx, args.channelId);
		if (access._nay) return null;
		const state = await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		const grant = await ctx.db
			.query("host_grants")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		const destination = await ctx.db
			.query("transcript_destinations")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		const index = await ctx.db
			.query("transcript_indexes")
			.withIndex("by_installation_generation", (q) =>
				q.eq("installationId", access._yay.installation._id).eq("generation", access._yay.installation.generation),
			)
			.unique();
		// Show the first error in the order the work runs. A temporary error is a wait, not a block.
		const shown = grant?.error
			? { error: grant.error, errorCode: grant.errorCode }
			: state?.error
				? { error: state.error, errorCode: state.errorCode }
				: null;
		const final = (doc: { error: string | null; errorCode?: string } | null | undefined) =>
			!!doc?.error && doc.errorCode !== "temporary";
		const wakes = await Promise.all(
			[grant?.wakeJobId, state?.wakeJobId].map(async (id) =>
				id ? await ctx.db.system.get("_scheduled_functions", id) : null,
			),
		);
		const pendingTimes = wakes.flatMap((job) => (job?.state.kind === "pending" ? [job.scheduledTime] : []));
		return {
			status: !grant
				? ("not_connected" as const)
				: final(grant)
					? ("blocked" as const)
					: grant.phase !== "ready"
						? ("pending" as const)
						: (state?.status ?? ("pending" as const)),
			error: shown?.error ?? null,
			errorCode: shown?.errorCode ?? null,
			channelName: access._yay.channel.name,
			retryingSince: grant?.retry?.since ?? state?.retry?.since ?? null,
			nextAttemptAt: pendingTimes.length ? Math.min(...pendingTimes) : null,
			desiredSequence: state?.desiredSequence ?? 0,
			appliedSequence: state?.appliedSequence ?? 0,
			folderPath: destination?.folderPath ?? grant?.rootPath ?? null,
			folderNodeId: destination?.folderNodeId ?? null,
			canConnect: access._yay.canManage,
			canReconcile: access._yay.canManage && !!destination,
			indexStatus: index?.status ?? ("pending" as const),
			indexError: index?.error ?? null,
			indexErrorCode: index?.errorCode ?? null,
		};
	},
});

export const begin_connect = internalMutation({
	args: {
		channelId: v.id("channels"),
		sourceSecret: v.string(),
		clientRequestId: v.string(),
		facts: zodToConvex(press_lease_facts),
	},
	returns: v.union(v.object({ _yay: v.null() }), v.object({ _nay: chat_error })),
	handler: async (ctx, args): Promise<chat_Result<null>> => {
		const access = await get_access(ctx, args.channelId);
		if (access._nay) return access;
		const { session, member, installation: currentInstallation } = access._yay;
		const facts = args.facts;
		if (
			!facts.canRead ||
			!facts.canWrite ||
			facts.expiresAt <= Date.now() ||
			facts.hostSessionId !== session.hostSessionId ||
			facts.hostUserId !== member.hostUserId ||
			facts.hostMembershipId !== member.hostMembershipId ||
			facts.membershipLifetime !== member.membershipLifetime ||
			facts.hostInstallationId !== currentInstallation.hostInstallationId ||
			facts.hostOrganizationId !== currentInstallation.hostOrganizationId ||
			facts.hostWorkspaceId !== currentInstallation.hostWorkspaceId ||
			facts.hostPluginVersionId !== currentInstallation.hostPluginVersionId ||
			facts.hostServiceAccountId !== currentInstallation.hostServiceAccountId ||
			facts.requiredRevision > currentInstallation.appliedAccessRevision
		)
			return { _nay: { message: "Refresh Chitchat before connecting Files for this workspace." } };
		if (!access._yay.canManage) return { _nay: { message: "A channel manager must connect Files." } };
		if (!chat_validate_request_id(args.clientRequestId)) return { _nay: { message: "Invalid request ID" } };
		const request = await ctx.db
			.query("transcript_requests")
			.withIndex("by_installation_actor_request", (q) =>
				q
					.eq("installationId", access._yay.installation._id)
					.eq("actorUserId", access._yay.member.hostUserId)
					.eq("clientRequestId", args.clientRequestId),
			)
			.unique();
		if (
			request &&
			(request.channelId !== args.channelId ||
				request.operation !== "connect" ||
				request.actorLifetime !== access._yay.member.membershipLifetime)
		)
			return { _nay: { name: "conflict", message: "This request ID was used for another Files change." } };
		const existing = await ctx.db
			.query("host_grants")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		if (request && existing?.clientRequestId !== args.clientRequestId) return { _yay: null };
		if (existing?.clientRequestId === args.clientRequestId) {
			if (
				existing.sponsorUserId !== access._yay.member.hostUserId ||
				existing.sponsorLifetime !== access._yay.member.membershipLifetime
			)
				return { _nay: { message: "This Files request belongs to another connection." } };
			await transcripts_wake(ctx, { grantId: existing._id }, Date.now());
			return { _yay: null };
		}
		const installation = access._yay.installation;
		const rootPath =
			installation.outputRoot ?? `/chitchat-${(await chatbe_sha256_hex(installation.generation)).slice(0, 24)}`;
		if (installation.outputRoot === null)
			await ctx.db.patch("installations", installation._id, { outputRoot: rootPath });
		const values = {
			installationId: installation._id,
			channelId: args.channelId,
			sponsorUserId: access._yay.member.hostUserId,
			sponsorLifetime: access._yay.member.membershipLifetime,
			clientRequestId: args.clientRequestId,
			rootPath,
			selectIndexOnReady: true,
			phase: "exchange" as const,
			sourceSecret: args.sourceSecret,
			lifecycleRequestId: crypto.randomUUID(),
			interactiveSecret: null,
			interactiveExpiresAt: 0,
			sealedSecret: null,
			sealedExpiresAt: 0,
			error: null,
			updatedAt: Date.now(),
		};
		const grantId = existing?._id ?? (await ctx.db.insert("host_grants", values));
		// Keep the saved wake-up so the old pending one is replaced, not left running beside a new one.
		if (existing) await ctx.db.replace("host_grants", existing._id, { ...values, wakeJobId: existing.wakeJobId });
		await ctx.db.insert("transcript_requests", {
			installationId: installation._id,
			actorUserId: access._yay.member.hostUserId,
			actorLifetime: access._yay.member.membershipLifetime,
			channelId: args.channelId,
			clientRequestId: args.clientRequestId,
			operation: "connect",
			grantId,
			runId: null,
		});
		await transcripts_wake(ctx, { grantId }, Date.now());
		return { _yay: null };
	},
});

type begin_connect_Result =
	typeof begin_connect extends RegisteredMutation<infer _Visibility, infer _Args, infer ReturnValue>
		? Awaited<ReturnValue>
		: never;

export const connect = action({
	args: { channelId: v.id("channels"), pluginToken: v.string(), clientRequestId: v.string() },
	returns: v.union(v.object({ _yay: v.null() }), v.object({ _nay: chat_error })),
	handler: async (ctx, args): Promise<chat_Result<null>> => {
		if (!/^plu_[A-Za-z0-9_-]+$/.test(args.pluginToken))
			return { _nay: { message: "Refresh the plugin and connect again." } };
		let answer;
		try {
			answer = await press_get_lease(args.pluginToken);
		} catch {
			return { _nay: { message: "Bonobo Senate could not confirm this Files connection. Refresh and try again." } };
		}
		if (!answer.lease)
			return { _nay: { message: "Bonobo Senate could not confirm this Files connection. Refresh and try again." } };
		return (await ctx.runMutation(internal.transcripts.begin_connect, {
			channelId: args.channelId,
			clientRequestId: args.clientRequestId,
			sourceSecret: await transcripts_encrypt(args.pluginToken),
			facts: answer.lease.facts,
		})) as begin_connect_Result;
	},
});

export const retry = mutation({
	args: { channelId: v.id("channels") },
	returns: v.union(v.object({ _yay: v.null() }), v.object({ _nay: chat_error })),
	handler: async (ctx, args): Promise<chat_Result<null>> => {
		const access = await get_access(ctx, args.channelId);
		if (access._nay) return access;
		if (!access._yay.canManage) return { _nay: { message: "A channel manager must retry Files sync." } };
		const state = await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		// A person asked, so start every loop again now with a fresh retry count.
		if (state)
			await ctx.db.patch("transcript_channels", state._id, {
				status: "pending",
				error: null,
				errorCode: undefined,
				retry: undefined,
				nextAttemptAt: Date.now(),
			});
		const grant = await ctx.db
			.query("host_grants")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		// A final grant error needs Reconnect. A temporary one can try again now.
		if (grant?.errorCode === "temporary") {
			await ctx.db.patch("host_grants", grant._id, { retry: undefined });
			await transcripts_wake(ctx, { grantId: grant._id }, Date.now());
		}
		const destination = await ctx.db
			.query("transcript_destinations")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		const run = destination?.runId ? await ctx.db.get("transcript_runs", destination.runId) : null;
		if (run?.kind === "incremental" && ["copy", "fold", "stage", "prepare", "validate"].includes(run.phase)) {
			// No publication has started. Read current manual text again without changing generated content.
			await ctx.db.patch("transcript_destinations", destination!._id, { runId: null });
		}
		const index = await ctx.db
			.query("transcript_indexes")
			.withIndex("by_installation_generation", (q) =>
				q.eq("installationId", access._yay.installation._id).eq("generation", access._yay.installation.generation),
			)
			.unique();
		if (index) await transcripts_index_request(ctx, { indexId: index._id, reconcile: false });
		if (state) await transcripts_wake(ctx, { channelStateId: state._id }, Date.now());
		return { _yay: null };
	},
});

export const reconcile = mutation({
	args: { channelId: v.id("channels"), clientRequestId: v.string() },
	returns: v.union(v.object({ _yay: v.null() }), v.object({ _nay: chat_error })),
	handler: async (ctx, args): Promise<chat_Result<null>> => {
		const access = await get_access(ctx, args.channelId);
		if (access._nay) return access;
		if (!access._yay.canManage) return { _nay: { message: "A channel manager must rebuild the Files copy." } };
		if (!chat_validate_request_id(args.clientRequestId)) return { _nay: { message: "Invalid request ID" } };
		const request = await ctx.db
			.query("transcript_requests")
			.withIndex("by_installation_actor_request", (q) =>
				q
					.eq("installationId", access._yay.installation._id)
					.eq("actorUserId", access._yay.member.hostUserId)
					.eq("clientRequestId", args.clientRequestId),
			)
			.unique();
		if (request)
			return request.channelId === args.channelId &&
				request.operation === "reconcile" &&
				request.actorLifetime === access._yay.member.membershipLifetime
				? { _yay: null }
				: { _nay: { name: "conflict", message: "This request ID was used for another Files change." } };
		const destination = await ctx.db
			.query("transcript_destinations")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		const state = await ctx.db
			.query("transcript_channels")
			.withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
			.unique();
		if (!destination || !state) return { _nay: { message: "Connect Files first." } };
		const active = destination.runId ? await ctx.db.get("transcript_runs", destination.runId) : null;
		const index = await ctx.db
			.query("transcript_indexes")
			.withIndex("by_installation_generation", (q) =>
				q.eq("installationId", access._yay.installation._id).eq("generation", access._yay.installation.generation),
			)
			.unique();
		if (index) await transcripts_index_request(ctx, { indexId: index._id, reconcile: true });
		if (
			active?.kind === "reconcile" &&
			active.phase !== "complete" &&
			(state.status !== "blocked" || active.phase === "recover" || (active.phase === "fence" && active.claim !== ""))
		) {
			await ctx.db.insert("transcript_requests", {
				installationId: access._yay.installation._id,
				actorUserId: access._yay.member.hostUserId,
				actorLifetime: access._yay.member.membershipLifetime,
				channelId: args.channelId,
				clientRequestId: args.clientRequestId,
				operation: "reconcile",
				runId: active._id,
				grantId: null,
			});
			await ctx.db.patch("transcript_channels", state._id, {
				status: "pending",
				error: null,
				errorCode: undefined,
				retry: undefined,
				nextAttemptAt: Date.now(),
			});
			await transcripts_wake(ctx, { channelStateId: state._id }, Date.now());
			return { _yay: null };
		}
		const runId = await ctx.db.insert("transcript_runs", {
			channelId: args.channelId,
			recoveryRunId: active?.phase === "publish" || active?.phase === "archive" ? active._id : null,
			barrier: state.desiredSequence,
			kind: "reconcile",
			fenceUncertain: false,
			phase: active?.phase === "publish" || active?.phase === "archive" ? "recover" : "fence",
			writerGeneration: destination.writerGeneration + 1,
			leaseUntil: 0,
			claim: "",
			startOrder: 0,
			endOrder: destination.tailOrder,
			cursor: null,
			foldedSequence: state.appliedSequence,
			header: destination.header,
			outputOrder: 0,
			buffer: "",
			outputCount: 0,
			error: null,
			createdAt: Date.now(),
		});
		await ctx.db.patch("transcript_destinations", destination._id, { runId });
		await ctx.db.insert("transcript_requests", {
			installationId: access._yay.installation._id,
			actorUserId: access._yay.member.hostUserId,
			actorLifetime: access._yay.member.membershipLifetime,
			channelId: args.channelId,
			clientRequestId: args.clientRequestId,
			operation: "reconcile",
			runId,
			grantId: null,
		});
		await ctx.db.patch("transcript_channels", state._id, {
			status: "pending",
			error: null,
			errorCode: undefined,
			retry: undefined,
			nextAttemptAt: Date.now(),
			workerGeneration: state.workerGeneration + 1,
		});
		await transcripts_wake(ctx, { channelStateId: state._id }, Date.now());
		return { _yay: null };
	},
});
