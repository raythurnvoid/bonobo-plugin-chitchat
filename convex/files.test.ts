import { convexTest } from "convex-test";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { afterEach, describe, expect, test, vi } from "vitest";
import { api, internal } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

afterEach(() => vi.unstubAllGlobals());

async function setup() {
	const t = convexTest(schema, modules);
	const facts = {
		hostSessionId: "session",
		hostUserId: "member",
		hostMembershipId: "membership",
		hostOrganizationId: "organization",
		hostWorkspaceId: "workspace",
		hostInstallationId: "installation",
		hostPluginVersionId: "version",
		hostServiceAccountId: "account",
		membershipLifetime: 1,
		requiredRevision: 0,
		canRead: true,
		canWrite: true,
		isOwner: false,
		organizationOwnerUserId: "owner",
		displayName: "Member",
		exchangeId: "exchange",
		validatedAt: Date.now(),
		expiresAt: Date.now() + 30_000,
	};
	const installationId = await t.mutation(internal.access.ensure_installation, { facts, generation: "new" });
	if (!installationId) throw new Error("Setup has no installation");
	await t.mutation(internal.access.accept_snapshot_page, {
		installationId,
		expectedStartRevision: null,
		expectedCursor: null,
		page: {
			startRevision: 0,
			currentRevision: 0,
			continueCursor: null,
			members: [
				{
					hostUserId: facts.hostUserId,
					hostMembershipId: facts.hostMembershipId,
					membershipLifetime: 1,
					displayName: "Member",
					active: true,
					canRead: true,
					canWrite: true,
					isOwner: false,
				},
			],
		},
	});
	await t.mutation(internal.access.finish_snapshot, { installationId });
	await t.mutation(internal.access.finish_catchup, { installationId, observedRevision: 0 });
	await t.mutation(internal.access.admit_lease, { installationId, facts });
	const user = t.withIdentity({
		issuer: "https://press.test/plugins-services",
		subject: facts.hostSessionId,
		exchangeId: facts.exchangeId,
	});
	const created = await user.mutation(api.channels.create, {
		clientRequestId: "channel",
		name: "general",
		topic: "",
		visibility: "public",
		invitedUserIds: [],
	});
	if (created._nay || created._yay.kind !== "channel") throw new Error("Setup has no channel");
	return { t, user, facts, channelId: created._yay.channelId };
}

async function serve_selection(facts: Awaited<ReturnType<typeof setup>>["facts"], downloads: Response) {
	const keys = await generateKeyPair("ES256");
	const jwk = { ...(await exportJWK(keys.publicKey)), kid: "test", alg: "ES256", use: "sig" };
	const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
		const url = input instanceof Request ? input.url : String(input);
		if (url.endsWith("/.well-known/jwks.json")) return Response.json({ keys: [jwk] });
		if (url.endsWith("/api/v1/plugins/identity/exchange")) {
			const request = JSON.parse(String(init?.body));
			const expiresAt = Math.min(facts.expiresAt, request.requestedExpiresAt);
			const jwt = await new SignJWT({ ...facts, expiresAt, exchangeId: request.exchangeId })
				.setProtectedHeader({ alg: "ES256", kid: "test" })
				.setIssuer("https://press.test/plugins-services")
				.setAudience("bonobo-plugin:chitchat")
				.setSubject(facts.hostSessionId)
				.setExpirationTime(Math.floor(expiresAt / 1000))
				.sign(keys.privateKey);
			return Response.json({ jwt });
		}
		expect(url).toBe("https://press.test/api/v1/files/download-urls");
		return downloads;
	});
	vi.stubGlobal("fetch", fetchMock);
	return fetchMock;
}

describe("authorize_selection", () => {
	test("uses the current Press file name and saves only a bounded proof", async () => {
		const { t, user, facts, channelId } = await setup();
		await serve_selection(
			facts,
			Response.json({ items: [{ fileNodeId: "file", name: "Report.pdf", url: "https://storage.test/secret-signed-url" }] }),
		);
		expect(
			await user.action(api.files.authorize_selection, { pressToken: "plu_current", fileNodeIds: ["file"] }),
		).toEqual({ _yay: [{ fileNodeId: "file", name: "Report.pdf" }] });
		const saved = await user.mutation(api.messages.send, {
			channelId,
			clientRequestId: "send",
			text: "",
			attachments: [{ fileNodeId: "file", name: "Report.pdf" }],
			mentions: [],
		});
		expect(saved._yay?.kind).toBe("message");
		const proofs = await t.run(async (ctx) => await ctx.db.query("attachment_proofs").collect());
		expect(proofs).toHaveLength(1);
		expect(proofs[0]).toMatchObject({ fileNodeId: "file", name: "Report.pdf", membershipLifetime: 1 });
		expect(JSON.stringify(proofs)).not.toContain("secret-signed-url");
	});

	test("rejects a bearer from a different Press session before reading files", async () => {
		const { t, user, facts } = await setup();
		const fetchMock = await serve_selection(
			{ ...facts, hostSessionId: "other-session", hostUserId: "other-member" },
			Response.json({ items: [] }),
		);
		expect(
			await user.action(api.files.authorize_selection, { pressToken: "plu_other", fileNodeIds: ["private-file"] }),
		).toMatchObject({ _nay: { message: "Unauthorized" } });
		expect(fetchMock.mock.calls.some(([input]) => String(input).endsWith("/files/download-urls"))).toBe(false);
		expect(await t.run(async (ctx) => await ctx.db.query("attachment_proofs").collect())).toEqual([]);
	});

	test("cannot turn a refused cross-workspace file into an attachment", async () => {
		const { t, user, facts, channelId } = await setup();
		await serve_selection(facts, Response.json({ message: "Permission denied" }, { status: 403 }));
		expect(
			(
				await user.action(api.files.authorize_selection, {
					pressToken: "plu_current",
					fileNodeIds: ["other-workspace-file"],
				})
			)._nay,
		).toBeDefined();
		expect(
			(
				await user.mutation(api.messages.send, {
					channelId,
					clientRequestId: "forged",
					text: "",
					attachments: [{ fileNodeId: "other-workspace-file", name: "Private.pdf" }],
					mentions: [],
				})
			)._nay,
		).toBeDefined();
		expect(await t.run(async (ctx) => await ctx.db.query("messages").collect())).toEqual([]);
	});

	test("a saved request stays confirmable after its selection proof expires", async () => {
		const { t, user, facts, channelId } = await setup();
		await user.mutation(internal.files.save_selection, {
			attachments: [{ fileNodeId: "file", name: "Report.pdf" }],
			membershipLifetime: 1,
			expiresAt: facts.expiresAt,
		});
		const request = {
			channelId,
			clientRequestId: "saved",
			text: "",
			attachments: [{ fileNodeId: "file", name: "Report.pdf" }],
			mentions: [],
		};
		const saved = await user.mutation(api.messages.send, request);
		expect(saved._yay?.kind).toBe("message");
		await t.run(async (ctx) => {
			const proof = await ctx.db.query("attachment_proofs").unique();
			if (proof) await ctx.db.patch(proof._id, { expiresAt: Date.now() - 1 });
		});
		expect(await user.mutation(api.messages.send, request)).toEqual(saved);
		expect((await user.mutation(api.messages.send, { ...request, clientRequestId: "new-send" }))._nay).toBeDefined();
	});
});
