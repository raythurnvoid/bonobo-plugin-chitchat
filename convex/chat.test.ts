/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import type { FunctionReturnType } from "convex/server";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { api, internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { channel_members_remove_host_member } from "./channel_members";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");
const pageOptions = { cursor: null, numItems: 50 };

beforeEach(() => {
	vi.useFakeTimers();
	vi.setSystemTime(1_800_000_000_000);
});
afterEach(() => {
	vi.clearAllTimers();
	vi.useRealTimers();
});

async function fixture() {
	const t = convexTest(schema, modules);
	const installationId = await t.run(async (ctx) => {
		const installationId = await ctx.db.insert("installations", {
			hostInstallationId: "installation-one",
			hostOrganizationId: "org-one",
			hostWorkspaceId: "workspace-one",
			hostPluginVersionId: "version-one",
			hostServiceAccountId: "service-one",
			organizationOwnerUserId: "owner",
			status: "ready",
			appliedAccessRevision: 1,
			invalidatedAtRevision: 0,
			bootstrapStartRevision: 1,
			bootstrapCursor: null,
			bootstrapPhase: "events",
			bootstrapTargetRevision: 1,
			generation: "generation-one",
			outputRoot: null,
		});
		for (const userId of ["alice", "bob", "viewer", "owner"]) {
			await ctx.db.insert("workspace_members", {
				installationId,
				hostUserId: userId,
				hostMembershipId: `membership-${userId}`,
				membershipLifetime: 1,
				active: true,
				displayName: userId,
				revision: 1,
				canRead: true,
				canWrite: userId !== "viewer",
				isOwner: userId === "owner",
				cleanupPending: false,
			});
			await ctx.db.insert("sessions", {
				installationId,
				hostSessionId: `session-${userId}`,
				exchangeId: `exchange-${userId}`,
				hostUserId: userId,
				hostMembershipId: `membership-${userId}`,
				membershipLifetime: 1,
				requiredRevision: 1,
				validatedAt: Date.now(),
				expiresAt: Date.now() + 30_000,
				canRead: true,
				canWrite: userId !== "viewer",
				isOwner: userId === "owner",
				displayName: userId,
				revokedAt: null,
				revokedRevision: null,
				expiryJobId: null,
			});
		}
		return installationId;
	});
	const asUser = (userId: string) =>
		t.withIdentity({
			issuer: "https://press.test/plugins/chitchat",
			subject: `session-${userId}`,
			exchangeId: `exchange-${userId}`,
		});
	return {
		t,
		installationId,
		alice: asUser("alice"),
		bob: asUser("bob"),
		viewer: asUser("viewer"),
		owner: asUser("owner"),
	};
}

async function create_channel(
	h: Awaited<ReturnType<typeof fixture>>,
	visibility: "public" | "private" = "public",
	invitedUserIds: string[] = [],
) {
	const result = await h.alice.mutation(api.channels.create, {
		clientRequestId: crypto.randomUUID(),
		name: "general",
		topic: "",
		visibility,
		invitedUserIds,
	});
	if (result._yay?.kind !== "channel") throw new Error(JSON.stringify(result));
	return result._yay.channelId;
}

async function send(
	h: Awaited<ReturnType<typeof fixture>>,
	channelId: Id<"channels">,
	text = "hello",
	sender = h.alice,
) {
	const result = await sender.mutation(api.messages.send, {
		channelId,
		clientRequestId: crypto.randomUUID(),
		text,
		attachments: [],
		mentions: [],
	});
	if (result._yay?.kind !== "message") throw new Error(JSON.stringify(result));
	return result._yay;
}

describe("channels.create", () => {
	test("creates private principals atomically and isolates another member", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private", ["bob"]);
		expect(await h.bob.query(api.channels.get, { channelId })).not.toBeNull();
		expect(await h.viewer.query(api.channels.get, { channelId })).toBeNull();
		expect(await h.owner.query(api.channels.get, { channelId })).not.toBeNull();
		expect(
			(await h.owner.query(api.channels.list_mine, { archived: false, paginationOpts: pageOptions })).page,
		).toEqual([]);
		const readers = await h.t.run((ctx) =>
			ctx.db
				.query("transcript_jobs")
				.withIndex("by_channel_sequence", (q) => q.eq("channelId", channelId))
				.collect(),
		);
		expect(readers.find((job) => job.operation.kind === "readers")?.operation).toMatchObject({
			readers: [
				{ userId: "alice", membershipLifetime: 1 },
				{ userId: "bob", membershipLifetime: 1 },
			],
		});
	});

	test("rejects an ineligible invite without channel or transcript writes", async () => {
		const h = await fixture();
		const result = await h.alice.mutation(api.channels.create, {
			clientRequestId: "invalid-invite",
			name: "private",
			topic: "",
			visibility: "private",
			invitedUserIds: ["somebody-else"],
		});
		expect(result._nay).toBeDefined();
		expect(await h.t.run((ctx) => ctx.db.query("channels").collect())).toEqual([]);
		expect(await h.t.run((ctx) => ctx.db.query("transcript_jobs").collect())).toEqual([]);
		await h.t.run(async (ctx) => {
			const bob = await ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", h.installationId).eq("hostUserId", "bob"),
				)
				.first();
			await ctx.db.patch("workspace_members", bob!._id, { canRead: false });
		});
		expect(
			(
				await h.alice.mutation(api.channels.create, {
					clientRequestId: "stale-roster",
					name: "private",
					topic: "",
					visibility: "private",
					invitedUserIds: ["bob"],
				})
			)._nay,
		).toBeDefined();
		expect(await h.t.run((ctx) => ctx.db.query("channels").collect())).toEqual([]);
	});

	test("reserves name collisions and sequences the shared index independently", async () => {
		const h = await fixture();
		const first = await create_channel(h);
		const second = await create_channel(h);
		const a = await h.alice.query(api.channels.get, { channelId: first });
		const b = await h.alice.query(api.channels.get, { channelId: second });
		expect(a!.transcriptSlug).not.toBe(b!.transcriptSlug);
		expect(await h.t.run(async (ctx) => (await ctx.db.query("transcript_indexes").first())?.desiredSequence)).toBe(2);
	});
});

describe("messages.send", () => {
	test("concurrent callers and duplicate requests keep sequence and counters exact", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		const request = { channelId, clientRequestId: "concurrent-once", text: "one", attachments: [], mentions: [] };
		const results = await Promise.all([
			h.alice.mutation(api.messages.send, request),
			h.alice.mutation(api.messages.send, request),
			send(h, channelId, "two", h.bob),
		]);
		expect(results[0]).toEqual(results[1]);
		expect(
			(await h.alice.query(api.messages.latest_roots, { channelId }))!.messages.map((entry) => entry.sequence),
		).toEqual([2, 1]);
		expect(await h.alice.query(api.channels.get, { channelId })).toMatchObject({ lastRootSequence: 2 });
	});
	test("stores one message, receipt and immutable export after exact retries", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		const request = { channelId, clientRequestId: "send-once", text: "original", attachments: [], mentions: [] };
		const a = await h.alice.mutation(api.messages.send, request);
		const b = await h.alice.mutation(api.messages.send, request);
		expect(a).toEqual(b);
		expect((await h.alice.query(api.messages.latest_roots, { channelId }))!.messages).toHaveLength(1);
		const messageId = a._yay?.kind === "message" ? a._yay.messageId : null;
		if (messageId === null) throw new Error("Send failed");
		await h.alice.mutation(api.messages.edit, {
			messageId,
			clientRequestId: "edit-once",
			expectedRevision: 1,
			text: "changed",
			mentions: [],
		});
		const jobs = await h.t.run((ctx) =>
			ctx.db
				.query("transcript_jobs")
				.withIndex("by_channel_sequence", (q) => q.eq("channelId", channelId))
				.collect(),
		);
		const blocks = jobs.filter((job) => job.operation.kind === "block");
		expect(blocks).toHaveLength(2);
		expect(blocks[0]!.operation).toMatchObject({ renderedBlock: expect.stringContaining("original") });
		expect(blocks[1]!.operation).toMatchObject({ renderedBlock: expect.stringContaining("changed") });
		expect((await h.alice.mutation(api.messages.send, { ...request, text: "other" }))._nay?.name).toBe("conflict");
	});

	test("confirms a saved send after archive but refuses a new send", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		const request = { channelId, clientRequestId: "before-archive", text: "saved", attachments: [], mentions: [] };
		const saved = await h.alice.mutation(api.messages.send, request);
		await h.alice.mutation(api.channels.archive, {
			channelId,
			clientRequestId: "archive",
			expectedRevision: 1,
			archived: true,
		});
		expect(await h.alice.mutation(api.messages.send, request)).toEqual(saved);
		expect(
			(await h.alice.mutation(api.messages.send, { ...request, clientRequestId: "after-archive" }))._nay,
		).toBeDefined();
	});

	test("keeps viewer, expired session and foreign installation out", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		const request = { channelId, clientRequestId: "deny", text: "no", attachments: [], mentions: [] };
		expect((await h.viewer.mutation(api.messages.send, request))._nay).toBeDefined();
		await h.t.run(async (ctx) => {
			const bob = await ctx.db
				.query("sessions")
				.withIndex("by_hostSessionId", (q) => q.eq("hostSessionId", "session-bob"))
				.first();
			await ctx.db.patch("sessions", bob!._id, { expiresAt: Date.now() });
		});
		expect(await h.bob.query(api.messages.latest_roots, { channelId })).toBeNull();
		const other = await h.t.run(async (ctx) => {
			const installation = (await ctx.db.get("installations", h.installationId))!;
			const { _id, _creationTime, ...value } = installation;
			return ctx.db.insert("installations", { ...value, hostInstallationId: "other" });
		});
		await h.t.run(async (ctx) => {
			const viewer = await ctx.db
				.query("sessions")
				.withIndex("by_hostSessionId", (q) => q.eq("hostSessionId", "session-viewer"))
				.first();
			await ctx.db.patch("sessions", viewer!._id, { installationId: other });
		});
		expect(await h.viewer.query(api.channels.get, { channelId })).toBeNull();
	});

	test("keeps attachment-only sends and enforces size and selection proof", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		const attachment = { fileNodeId: "file-one", name: "picture.png" };
		const request = { channelId, clientRequestId: "attachment", text: "", attachments: [attachment], mentions: [] };
		expect((await h.alice.mutation(api.messages.send, request))._nay).toBeDefined();
		await h.t.run((ctx) =>
			ctx.db.insert("attachment_proofs", {
				installationId: h.installationId,
				hostUserId: "alice",
				membershipLifetime: 1,
				...attachment,
				expiresAt: Date.now() + 30_000,
			}),
		);
		expect((await h.alice.mutation(api.messages.send, request))._yay?.kind).toBe("message");
		expect(
			(
				await h.alice.mutation(api.messages.send, {
					...request,
					clientRequestId: "oversize",
					text: "😀".repeat(5000),
					attachments: [],
				})
			)._nay,
		).toBeDefined();
		expect((await h.alice.query(api.messages.latest_roots, { channelId }))!.messages).toHaveLength(1);
	});
});

describe("messages.list_replies", () => {
	test("pages beyond 100 and preserves total versus active counts", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		const root = await send(h, channelId);
		for (let i = 0; i < 121; i++)
			await h.bob.mutation(api.messages.reply, {
				rootMessageId: root.messageId,
				clientRequestId: `reply-${i}`,
				text: `reply ${i}`,
				attachments: [],
				mentions: [],
			});
		let cursor: string | null = null;
		const sequences: number[] = [];
		for (;;) {
			const page: FunctionReturnType<typeof api.messages.list_replies> = await h.alice.query(
				api.messages.list_replies,
				{ rootMessageId: root.messageId, anchorSequence: 121, paginationOpts: { cursor, numItems: 50 } },
			);
			sequences.push(...page.page.map((entry) => entry.sequence));
			if (page.isDone) break;
			cursor = page.continueCursor;
		}
		expect(sequences).toEqual(Array.from({ length: 121 }, (_, i) => 121 - i));
		const latest = (await h.alice.query(api.messages.latest_replies, { rootMessageId: root.messageId }))!.messages[0]!;
		await h.bob.mutation(api.messages.remove, {
			messageId: latest._id,
			clientRequestId: "delete-reply",
			expectedRevision: 1,
		});
		expect(await h.alice.query(api.threads.get_summary, { rootMessageId: root.messageId })).toMatchObject({
			totalReplyCount: 121,
			activeReplyCount: 120,
			lastReplySequence: 121,
		});
		expect(
			(await h.alice.query(api.messages.latest_replies, { rootMessageId: root.messageId }))!.messages[0],
		).toMatchObject({ sequence: 121, text: "", deletedAt: expect.any(Number) });
	});
});

describe("messages.edit", () => {
	test("preserves anchored order and rejects an old revision", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		const first = await send(h, channelId, "first");
		await send(h, channelId, "second");
		await h.alice.mutation(api.messages.edit, {
			messageId: first.messageId,
			clientRequestId: "edit-first",
			expectedRevision: 1,
			text: "edited first",
			mentions: [],
		});
		await send(h, channelId, "third");
		const page = await h.alice.query(api.messages.list_roots, {
			channelId,
			anchorSequence: 2,
			paginationOpts: pageOptions,
		});
		expect(page.page.map((entry) => entry.text)).toEqual(["second", "edited first"]);
		expect(
			(
				await h.alice.mutation(api.messages.edit, {
					messageId: first.messageId,
					clientRequestId: "stale",
					expectedRevision: 1,
					text: "wrong",
					mentions: [],
				})
			)._nay?.name,
		).toBe("conflict");
		expect(
			(
				await h.bob.mutation(api.messages.remove, {
					messageId: first.messageId,
					clientRequestId: "not-mine",
					expectedRevision: 2,
				})
			)._nay,
		).toBeDefined();
	});
});

describe("read_states", () => {
	test("own bursts cannot hide another author's unread and deletion clears it", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		const other = await send(h, channelId, "from Bob", h.bob);
		for (let i = 0; i < 120; i++) await send(h, channelId, `own ${i}`);
		expect(await h.alice.query(api.read_states.get_for_channel, { channelId })).toMatchObject({
			hasUnread: true,
			latest: { _id: other.messageId },
		});
		await h.bob.mutation(api.messages.remove, {
			messageId: other.messageId,
			clientRequestId: "remove-unread",
			expectedRevision: 1,
		});
		expect(await h.alice.query(api.read_states.get_for_channel, { channelId })).toMatchObject({ hasUnread: false });
	});

	test("keeps independent private reply sequence and max-merges cursors", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private", ["bob"]);
		const root = await send(h, channelId);
		await h.bob.mutation(api.messages.reply, {
			rootMessageId: root.messageId,
			clientRequestId: "private-reply",
			text: "reply",
			attachments: [],
			mentions: [],
		});
		await h.alice.mutation(api.read_states.mark_read, { channelId, rootSequence: 1, replySequence: 0 });
		expect(await h.alice.query(api.read_states.get_for_channel, { channelId })).toMatchObject({ hasUnread: true });
		await h.alice.mutation(api.read_states.mark_read, { channelId, rootSequence: 1, replySequence: 1 });
		await h.alice.mutation(api.read_states.mark_read, { channelId, rootSequence: 0, replySequence: 0 });
		expect(await h.alice.query(api.read_states.get_for_channel, { channelId })).toMatchObject({
			hasUnread: false,
			state: { rootSequence: 1, replySequence: 1 },
		});
	});

	test("deduplicates mentions and keeps an edit at its original sequence", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		const message = await h.bob.mutation(api.messages.send, {
			channelId,
			clientRequestId: "mention",
			text: "@alice hi",
			attachments: [],
			mentions: ["alice", "alice"],
		});
		if (message._yay?.kind !== "message") throw new Error("Send failed");
		expect(await h.alice.query(api.read_states.get_for_channel, { channelId })).toMatchObject({ mentionCount: 1 });
		await h.alice.mutation(api.read_states.mark_read, { channelId, rootSequence: 1, replySequence: 0 });
		await h.bob.mutation(api.messages.edit, {
			messageId: message._yay.messageId,
			clientRequestId: "edit-mention",
			expectedRevision: 1,
			text: "@alice later",
			mentions: ["alice"],
		});
		expect(await h.alice.query(api.read_states.get_for_channel, { channelId })).toMatchObject({
			hasUnread: false,
			mentionCount: 0,
		});
	});
});

describe("reactions.set", () => {
	test("desired state and retries change counts once", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		const message = await send(h, channelId);
		const request = { messageId: message.messageId, clientRequestId: "reaction-on", token: "heart" as const, on: true };
		await h.bob.mutation(api.reactions.set, request);
		await h.bob.mutation(api.reactions.set, request);
		await h.alice.mutation(api.reactions.set, { ...request, clientRequestId: "alice-heart" });
		expect(await h.bob.query(api.reactions.get_for_message, { messageId: message.messageId })).toEqual([
			{ token: "heart", count: 2, reactedByMe: true },
		]);
		await h.bob.mutation(api.reactions.set, { ...request, clientRequestId: "reaction-off", on: false });
		expect(await h.bob.query(api.reactions.get_for_message, { messageId: message.messageId })).toEqual([
			{ token: "heart", count: 1, reactedByMe: false },
		]);
	});
});

describe("channel_members", () => {
	test("promotes the lowest remaining member when the last manager leaves", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private", ["viewer", "bob"]);
		await h.alice.mutation(api.channel_members.leave, {
			channelId,
			clientRequestId: "manager-leave",
			expectedMembershipRevision: 1,
		});
		const change = await h.t.run((ctx) =>
			ctx.db
				.query("channel_access_changes")
				.withIndex("by_channel_status", (q) => q.eq("channelId", channelId).eq("status", "pending"))
				.unique(),
		);
		expect(change?.principals.find((entry) => entry.hostUserId === "bob")?.level).toBe("manage");
		expect(
			await h.t.mutation(internal.channel_members.complete_change, {
				changeId: change!._id,
				readerRevision: change!.readerRevision,
				hostReceiptId: "confirmed-readers",
			}),
		).toBe(true);
		expect(await h.bob.query(api.channels.permissions, { channelId })).toMatchObject({ canManage: true });
	});

	test("promotes a successor after the manager is removed from Press", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private", ["viewer", "bob"]);
		await h.t.mutation(internal.access.apply_event, {
			installationId: h.installationId,
			revision: 2,
			event: {
				kind: "member",
				member: {
					hostUserId: "alice",
					hostMembershipId: "membership-alice",
					membershipLifetime: 1,
					displayName: "alice",
					active: false,
					canRead: false,
					canWrite: false,
					isOwner: false,
				},
			},
		});
		expect(await h.bob.query(api.channels.permissions, { channelId })).toMatchObject({ canManage: true });
	});

	test("refuses a last manager downgrade without a successor", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private");
		expect(
			(
				await h.alice.mutation(api.channel_members.change, {
					channelId,
					clientRequestId: "drop-manager",
					expectedMembershipRevision: 1,
					hostUserId: "alice",
					level: "read",
				})
			)._nay,
		).toBeDefined();
		expect(await h.alice.query(api.channels.permissions, { channelId })).toMatchObject({ canManage: true });
	});

	test("finishes private changes when Files has never been connected", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private", ["bob"]);
		await h.alice.mutation(api.channel_members.leave, {
			channelId,
			clientRequestId: "leave-without-files",
			expectedMembershipRevision: 1,
		});
		expect(await h.t.mutation(internal.channel_members.complete_without_files, { channelId })).toBe(true);
		expect(await h.alice.query(api.channels.get, { channelId })).toBeNull();
		expect(await h.bob.query(api.channels.permissions, { channelId })).toMatchObject({ canManage: true });
		expect(await h.t.run((ctx) => ctx.db.query("host_grants").collect())).toEqual([]);
	});
	test("another principal's read downgrade does not prevent leaving", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private", ["bob"]);
		await h.t.run(async (ctx) => {
			const alice = await ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", h.installationId).eq("hostUserId", "alice"),
				)
				.first();
			await ctx.db.patch("workspace_members", alice!._id, { canRead: false });
		});
		expect(
			(
				await h.bob.mutation(api.channel_members.leave, {
					channelId,
					clientRequestId: "leave-read-downgrade",
					expectedMembershipRevision: 1,
				})
			)._yay,
		).toMatchObject({ pending: true });
		const change = await h.t.run((ctx) => ctx.db.query("channel_access_changes").first());
		expect(
			await h.t.mutation(internal.channel_members.complete_change, {
				changeId: change!._id,
				readerRevision: 2,
				hostReceiptId: "reader-receipt",
			}),
		).toBe(true);
		expect(
			await h.bob.query(api.channel_members.status, { channelId, clientRequestId: "leave-read-downgrade" }),
		).toMatchObject({ status: "complete", left: true });
	});
	test("cancels a compensated deletion without claiming deletion or changing current members", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private", ["bob"]);
		const request = { channelId, clientRequestId: "cancel-delete", expectedMembershipRevision: 1 };
		await h.alice.mutation(api.channel_members.delete_channel, request);
		const change = await h.t.run((ctx) => ctx.db.query("channel_access_changes").first());
		expect(
			await h.t.mutation(internal.channel_members.cancel_change, {
				changeId: change!._id,
				hostReceiptId: "restored-readers",
			}),
		).toBe(true);
		expect(
			await h.t.mutation(internal.channel_members.cancel_change, { changeId: change!._id, hostReceiptId: "duplicate" }),
		).toBe(true);
		expect(
			await h.alice.query(api.channel_members.status, { channelId, clientRequestId: request.clientRequestId }),
		).toEqual({
			status: "cancelled",
			membershipRevision: 1,
			left: false,
			deleted: false,
		});
		expect((await h.alice.mutation(api.channel_members.delete_channel, request))._nay?.name).toBe("conflict");
		expect(await h.alice.query(api.channels.get, { channelId })).toMatchObject({
			memberCount: 2,
			membershipRevision: 1,
			deletedAt: null,
		});
	});
	test("reserves a pending request ID across different channels", async () => {
		const h = await fixture();
		const first = await create_channel(h, "private", ["bob"]);
		const second = await create_channel(h, "private", ["bob"]);
		const request = {
			channelId: first,
			clientRequestId: "pending-once",
			expectedMembershipRevision: 1,
			expectedPrincipalCount: 2,
		};
		expect((await h.bob.mutation(api.channel_members.leave, request))._yay).toMatchObject({ pending: true });
		expect((await h.bob.mutation(api.channel_members.leave, { ...request, channelId: second }))._nay?.name).toBe(
			"conflict",
		);
		expect(
			await h.bob.query(api.channel_members.status, { channelId: first, clientRequestId: "pending-once" }),
		).toMatchObject({ status: "pending" });
	});
	test("cannot complete a queued manager change after the manager loses write access", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private", ["bob"]);
		await h.alice.mutation(api.channel_members.change, {
			channelId,
			clientRequestId: "remove-bob",
			expectedMembershipRevision: 1,
			hostUserId: "bob",
			level: null,
		});
		await h.t.run(async (ctx) => {
			const actor = await ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", h.installationId).eq("hostUserId", "alice"),
				)
				.first();
			await ctx.db.patch("workspace_members", actor!._id, { canWrite: false });
		});
		const change = await h.t.run((ctx) => ctx.db.query("channel_access_changes").first());
		expect(
			await h.t.mutation(internal.channel_members.complete_change, {
				changeId: change!._id,
				readerRevision: 2,
				hostReceiptId: "late",
			}),
		).toBe(false);
		expect(await h.t.run(async (ctx) => (await ctx.db.get("channels", channelId))!.memberCount)).toBe(2);
	});
	test("closes content during reader change and confirms leave after lost access", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private", ["bob"]);
		const request = { channelId, clientRequestId: "leave", expectedMembershipRevision: 1, expectedPrincipalCount: 2 };
		expect((await h.bob.mutation(api.channel_members.leave, request))._yay).toMatchObject({
			pending: true,
			left: true,
		});
		expect(await h.alice.query(api.messages.latest_roots, { channelId })).toBeNull();
		const change = await h.t.run((ctx) => ctx.db.query("channel_access_changes").first());
		expect(
			await h.t.mutation(internal.channel_members.complete_change, {
				changeId: change!._id,
				readerRevision: 2,
				hostReceiptId: "confirmed-reader-write",
			}),
		).toBe(true);
		expect(await h.bob.query(api.channels.get, { channelId })).toBeNull();
		expect((await h.bob.mutation(api.channel_members.leave, request))._yay).toMatchObject({
			pending: false,
			left: true,
		});
		expect(await h.bob.query(api.channel_members.status, { channelId, clientRequestId: "leave" })).toMatchObject({
			status: "complete",
			left: true,
		});
	});

	test("remove and reinvite never restores old private grants or cursors", async () => {
		const h = await fixture();
		const channelId = await create_channel(h, "private", ["bob"]);
		await send(h, channelId);
		await h.bob.mutation(api.read_states.mark_read, { channelId, rootSequence: 1, replySequence: 0 });
		await h.t.run(async (ctx) => {
			const member = await ctx.db
				.query("workspace_members")
				.withIndex("by_installation_hostUserId", (q) =>
					q.eq("installationId", h.installationId).eq("hostUserId", "bob"),
				)
				.first();
			await ctx.db.patch("workspace_members", member!._id, { membershipLifetime: 2 });
			const session = await ctx.db
				.query("sessions")
				.withIndex("by_hostSessionId", (q) => q.eq("hostSessionId", "session-bob"))
				.first();
			await ctx.db.patch("sessions", session!._id, { membershipLifetime: 2 });
		});
		expect(await h.bob.query(api.channels.get, { channelId })).toBeNull();
		expect(
			await h.t.run((ctx) =>
				channel_members_remove_host_member(ctx, {
					installationId: h.installationId,
					hostUserId: "bob",
					membershipLifetime: 2,
				}),
			),
		).toBe(true);
		expect(await h.t.run((ctx) => ctx.db.query("read_states").collect())).toEqual([]);
		expect(await h.alice.query(api.channels.get, { channelId })).toMatchObject({ memberCount: 1 });
	});
});

describe("indexed history", () => {
	test("returns only the requested bounded page from 100,000 isolated messages", async () => {
		const h = await fixture();
		const channelId = await create_channel(h);
		for (let start = 0; start < 100_000; start += 1000) {
			await h.t.run(async (ctx) => {
				await Promise.all(
					Array.from({ length: 1000 }, (_, index) => {
						const sequence = start + index + 1;
						return ctx.db.insert("messages", {
							installationId: h.installationId,
							channelId,
							visibility: "public",
							rootMessageId: null,
							publicId: `synthetic-${sequence}`,
							marker: `synthetic-${sequence}`,
							authorHostUserId: "alice",
							authorName: "alice",
							createdAt: Date.now(),
							sequence,
							channelReplySequence: null,
							text: `message ${sequence}`,
							attachments: [],
							mentions: [],
							revision: 1,
							editedAt: null,
							deletedAt: null,
						});
					}),
				);
			});
		}
		await h.t.run((ctx) => ctx.db.patch("channels", channelId, { lastRootSequence: 100_000 }));
		const first = await h.alice.query(api.messages.list_roots, {
			channelId,
			anchorSequence: 100_000,
			paginationOpts: { cursor: null, numItems: 800 },
		});
		expect(first.page).toHaveLength(50);
		expect(first.page[0]!.sequence).toBe(100_000);
		expect(first.page.at(-1)!.sequence).toBe(99_951);
		expect(first.isDone).toBe(false);
		const second = await h.alice.query(api.messages.list_roots, {
			channelId,
			anchorSequence: 100_000,
			paginationOpts: { cursor: first.continueCursor, numItems: 50 },
		});
		expect(second.page[0]!.sequence).toBe(99_950);
		expect((await h.alice.query(api.messages.latest_roots, { channelId }))!.messages).toHaveLength(50);
	}, 120_000);
});
