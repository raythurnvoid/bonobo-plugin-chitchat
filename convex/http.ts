import { httpRouter } from "convex/server";
import { z } from "zod";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { press_HTTP_URL, press_get_lease } from "./press";
import { access_notices_verify } from "./access_notices";

const DEV_PLUGIN_ORIGIN = process.env.DEV_PLUGIN_ORIGIN;
const PRESS_ORIGIN = new URL(press_HTTP_URL).origin;
const MAX_NOTICE_BYTES = 4096;
const router = httpRouter();

router.route({
	path: "/auth/lease",
	method: "OPTIONS",
	handler: httpAction(async (_ctx, request) => {
		const origin = request.headers.get("Origin");
		if (origin === null || (origin !== PRESS_ORIGIN && (!DEV_PLUGIN_ORIGIN || origin !== DEV_PLUGIN_ORIGIN)))
			return new Response(null, { status: 403 });
		return new Response(null, {
			status: 204,
			headers: {
				"Access-Control-Allow-Origin": origin,
				Vary: "Origin",
				"Access-Control-Allow-Methods": "POST",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Max-Age": "600",
			},
		});
	}),
});

router.route({
	path: "/auth/lease",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const origin = request.headers.get("Origin");
		if (origin === null || (origin !== PRESS_ORIGIN && (!DEV_PLUGIN_ORIGIN || origin !== DEV_PLUGIN_ORIGIN)))
			return new Response(null, { status: 403 });
		const headers = { "Access-Control-Allow-Origin": origin, Vary: "Origin", "Cache-Control": "no-store" };
		try {
			const raw: unknown = await request.json();
			const body = z
				.object({ pressToken: z.string().startsWith("plu_").max(512) })
				.strict()
				.safeParse(raw);
			if (!body.success) return Response.json({ message: "Invalid session request." }, { status: 400, headers });
			const answer = await press_get_lease(body.data.pressToken);
			if (!answer.lease)
				return Response.json(
					{ message: "Bonobo Senate could not confirm access to Chitchat." },
					{ status: answer.status === 401 || answer.status === 403 ? answer.status : 503, headers },
				);
			const { jwt, facts } = answer.lease;
			const installationId = await ctx.runMutation(internal.access.ensure_installation, {
				facts,
				generation: crypto.randomUUID(),
			});
			if (!installationId)
				return Response.json({ message: "Chitchat access expired. Try again." }, { status: 409, headers });
			const installation = await ctx.runQuery(internal.access.get_installation, { installationId });
			// Access notices bring later changes. Admission below rechecks current access.
			const ready =
				(installation?.status === "ready" && installation.appliedAccessRevision >= facts.requiredRevision) ||
				(
					await ctx.runAction(internal.access.sync, {
						installationId,
						requiredRevision: facts.requiredRevision,
						budgetMs: 12_000,
					})
				).ready;
			if (!ready) {
				const syncing = await ctx.runQuery(internal.access.get_installation, { installationId });
				// The frame shows a status and asks again by itself. "members" means the member list is
				// still being read. "events" means only later changes are left.
				return Response.json(
					{
						code: "syncing",
						phase: syncing?.status === "bootstrapping" && syncing.bootstrapPhase !== "events" ? "members" : "events",
						retryAfterMs: 2_000,
					},
					{ status: 503, headers: { ...headers, "Retry-After": "2" } },
				);
			}
			if (facts.expiresAt - Date.now() < 5_000)
				return Response.json({ message: "Chitchat access expired during setup. Try again." }, { status: 409, headers });
			const admitted = await ctx.runMutation(internal.access.admit_lease, { installationId, facts });
			if (!admitted) return Response.json({ message: "Chitchat access changed. Try again." }, { status: 409, headers });
			const expiresAt = Math.floor(facts.expiresAt / 1000) * 1000;
			return Response.json(
				{ jwt, expiresAt, validForMs: Math.max(0, expiresAt - Date.now()) },
				{ status: 200, headers },
			);
		} catch {
			return Response.json({ message: "Could not connect to Chitchat. Try again." }, { status: 503, headers });
		}
	}),
});

const access_notice = z.object({
	type: z.literal("workspace.access.changed"),
	timestamp: z.string(),
	data: z.object({ installationId: z.string(), revision: z.number().int().nonnegative() }),
});

// Bonobo Senate posts here when workspace access changes. The notice only says "pull now": Chitchat
// reads the changes from the access feed. Bonobo Senate retries until this answers 200.
router.route({
	path: "/bonobo/access-events",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		// Bonobo Senate waits at most 15 s. Leave time for the signature check and the answer.
		const stopAt = Date.now() + 8_000;
		try {
			// A real notice is about 200 bytes. Refuse a big unsigned body before reading or hashing it.
			if (Number(request.headers.get("Content-Length") ?? 0) > MAX_NOTICE_BYTES)
				return Response.json({ message: "Access notice is too large." }, { status: 413 });
			// Check the exact bytes. Parsing or decoding first could change what was signed.
			const body = new Uint8Array(await request.arrayBuffer());
			if (body.byteLength > MAX_NOTICE_BYTES)
				return Response.json({ message: "Access notice is too large." }, { status: 413 });
			if (!(await access_notices_verify(ctx, request.headers, body)))
				return Response.json({ message: "Invalid signature." }, { status: 401 });
			const notice = access_notice.safeParse(JSON.parse(new TextDecoder().decode(body)));
			if (!notice.success) return Response.json({ message: "Invalid access notice." }, { status: 400 });

			const installation = await ctx.runQuery(internal.access.get_installation_by_host, {
				hostInstallationId: notice.data.data.installationId,
			});
			// Nothing to do for an installation Chitchat never saw, for a removed one, or when already caught up.
			// A new installation starts its sync on the first lease request.
			if (
				!installation ||
				installation.status === "revoked" ||
				(installation.status === "ready" && installation.appliedAccessRevision >= notice.data.data.revision)
			)
				return new Response(null, { status: 200 });

			const { ready, progressed, needsLease } = await ctx.runAction(internal.access.sync, {
				installationId: installation._id,
				requiredRevision: notice.data.data.revision,
				budgetMs: Math.max(0, stopAt - Date.now()),
			});
			// A disabled or just upgraded installation cannot sync until its next lease, which syncs to the head
			// anyway. Answer 200, or Bonobo Senate would retry this notice for days.
			if (ready || needsLease) return new Response(null, { status: 200 });
			const after = await ctx.runQuery(internal.access.get_installation, { installationId: installation._id });
			if (after?.status === "revoked") return new Response(null, { status: 200 });
			// Saved progress stays. Ask for the notice again in 5 s only when this sync saved something.
			// Otherwise answer without Retry-After. Then Bonobo Senate uses its normal backoff, and a lasting
			// failure does not repeat every 5 s.
			return Response.json(
				{ message: "Chitchat is still syncing access." },
				{ status: 503, ...(progressed ? { headers: { "Retry-After": "5" } } : {}) },
			);
		} catch {
			return Response.json({ message: "Chitchat could not sync access." }, { status: 503 });
		}
	}),
});

export default router;
