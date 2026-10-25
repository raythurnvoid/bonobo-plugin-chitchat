import type { MutationCtx } from "./_generated/server";
import type { Infer } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import type { chat_transcript_retry, chat_TranscriptErrorCode } from "../shared/chat";

// Temporary failures retry after 30 s, 1 min, 2 min, 5 min, 10 min, then every 15 min. They never give up.
const RETRY_DELAYS = [30_000, 60_000, 120_000, 300_000, 600_000, 900_000];

// Return the wait before the next try after `failures` temporary failures in a row.
// A host `Retry-After` wins over the ladder. The ladder adds ±20% jitter so many docs do not retry together.
export function transcripts_retry_delay(failures: number, retryAfterMs: number | null) {
	if (retryAfterMs !== null) return Math.min(Math.max(retryAfterMs, 1_000), 3_600_000);
	const base = RETRY_DELAYS[Math.min(Math.max(failures, 1), RETRY_DELAYS.length) - 1]!;
	return Math.round(base * (0.8 + Math.random() * 0.4));
}

// Count one more temporary failure in a row. Any other result clears the count.
export function transcripts_next_retry(
	retry: Infer<typeof chat_transcript_retry> | undefined,
	errorCode: chat_TranscriptErrorCode | null,
) {
	return errorCode === "temporary"
		? { failures: (retry?.failures ?? 0) + 1, since: retry?.since ?? Date.now() }
		: undefined;
}

// Return true when the saved pending job already runs at or before `at`. Otherwise cancel it.
// A dispatcher that runs as this job sees its own job as "inProgress", not "pending", so it is never kept
// here. Convex works this way since convex-backend 96dcfad8a (June 2026), and convex-test does the same.
async function keep_pending(ctx: MutationCtx, wakeJobId: Id<"_scheduled_functions"> | undefined, at: number | null) {
	const job = wakeJobId ? await ctx.db.system.get("_scheduled_functions", wakeJobId) : null;
	if (job?.state.kind !== "pending") return false;
	if (at !== null && job.scheduledTime <= at) return true;
	await ctx.scheduler.cancel(job._id);
	return false;
}

// Arm the one wake-up of a transcript owner doc at `at`, or cancel it when `at` is null.
//
// The wake-up is a scheduled mutation. Convex runs a scheduled mutation exactly once, so a saved
// wake-up cannot be lost the way a scheduled action can. Keep the earliest pending job: the
// dispatcher it runs looks at every gate again and arms the next one.
export async function transcripts_wake(
	ctx: MutationCtx,
	owner:
		| { channelStateId: Id<"transcript_channels"> }
		| { indexId: Id<"transcript_indexes"> }
		| { grantId: Id<"host_grants"> },
	at: number | null,
) {
	if ("channelStateId" in owner) {
		const state = await ctx.db.get("transcript_channels", owner.channelStateId);
		if (!state || (await keep_pending(ctx, state.wakeJobId, at))) return;
		const wakeJobId =
			at === null
				? undefined
				: await ctx.scheduler.runAt(at, internal.transcripts_worker.dispatch, { channelId: state.channelId });
		await ctx.db.patch("transcript_channels", state._id, { wakeJobId });
	} else if ("indexId" in owner) {
		const index = await ctx.db.get("transcript_indexes", owner.indexId);
		if (!index || (await keep_pending(ctx, index.wakeJobId, at))) return;
		const wakeJobId =
			at === null ? undefined : await ctx.scheduler.runAt(at, internal.transcripts_index.dispatch, owner);
		await ctx.db.patch("transcript_indexes", index._id, { wakeJobId });
	} else {
		const grant = await ctx.db.get("host_grants", owner.grantId);
		if (!grant || (await keep_pending(ctx, grant.wakeJobId, at))) return;
		const wakeJobId =
			at === null ? undefined : await ctx.scheduler.runAt(at, internal.transcripts_grants.dispatch, owner);
		await ctx.db.patch("host_grants", grant._id, { wakeJobId });
	}
}
