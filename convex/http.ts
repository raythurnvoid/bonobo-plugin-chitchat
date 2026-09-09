import { httpRouter } from "convex/server";
import { z } from "zod";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { press_HTTP_URL, press_get_lease } from "./press";

const DEV_PLUGIN_ORIGIN = process.env.DEV_PLUGIN_ORIGIN;
const PRESS_ORIGIN = new URL(press_HTTP_URL).origin;
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
					{ message: "Press could not confirm access to Chitchat." },
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
			// The cron still polls for later changes. Admission below rechecks current access.
			const ready =
				(installation?.status === "ready" && installation.appliedAccessRevision >= facts.requiredRevision) ||
				(await ctx.runAction(internal.access.sync, {
					installationId,
					requiredRevision: facts.requiredRevision,
				}));
			if (!ready)
				return Response.json(
					{ message: "Chitchat is syncing workspace access. Try again shortly." },
					{ status: 503, headers },
				);
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

export default router;
