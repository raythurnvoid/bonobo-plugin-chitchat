import { v } from "convex/values";
import { z } from "zod";
import type { Doc } from "./_generated/dataModel";
import { action, internalMutation, internalQuery, type QueryCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { auth_get_current_access } from "./auth";
import { press_get_lease, press_post } from "./press";
import { chat_attachment, chat_error, type chat_Result } from "../shared/chat";

export async function files_validate_attachments(
	ctx: QueryCtx,
	access: { session: Doc<"sessions">; installation: Doc<"installations">; member: Doc<"workspace_members"> },
	attachments: { fileNodeId: string; name: string }[],
) {
	for (const attachment of attachments) {
		const proof = await ctx.db
			.query("attachment_proofs")
			.withIndex("by_installation_hostUserId_fileNodeId", (q) =>
				q
					.eq("installationId", access.installation._id)
					.eq("hostUserId", access.member.hostUserId)
					.eq("fileNodeId", attachment.fileNodeId),
			)
			.unique();
		if (
			!proof ||
			proof.membershipLifetime !== access.member.membershipLifetime ||
			proof.name !== attachment.name ||
			proof.expiresAt <= Date.now()
		) {
			return "Check attachment access again before sending.";
		}
	}
	return null;
}

export const selection_authority = internalQuery({
	args: {},
	returns: v.union(
		v.null(),
		v.object({
			hostSessionId: v.string(),
			hostUserId: v.string(),
			hostInstallationId: v.string(),
			membershipLifetime: v.number(),
			expiresAt: v.number(),
		}),
	),
	handler: async (ctx) => {
		const access = await auth_get_current_access(ctx);
		if (access._nay) return null;
		const { session, installation, member } = access._yay;
		return {
			hostSessionId: session.hostSessionId,
			hostUserId: member.hostUserId,
			hostInstallationId: installation.hostInstallationId,
			membershipLifetime: member.membershipLifetime,
			expiresAt: session.expiresAt,
		};
	},
});

export const save_selection = internalMutation({
	args: { attachments: v.array(chat_attachment), expiresAt: v.number(), membershipLifetime: v.number() },
	returns: v.boolean(),
	handler: async (ctx, args) => {
		const access = await auth_get_current_access(ctx);
		if (
			access._nay ||
			access._yay.member.membershipLifetime !== args.membershipLifetime ||
			args.expiresAt <= Date.now()
		)
			return false;
		const { installation, member } = access._yay;
		for (const attachment of args.attachments) {
			const existing = await ctx.db
				.query("attachment_proofs")
				.withIndex("by_installation_hostUserId_fileNodeId", (q) =>
					q
						.eq("installationId", installation._id)
						.eq("hostUserId", member.hostUserId)
						.eq("fileNodeId", attachment.fileNodeId),
				)
				.unique();
			const fields = {
				installationId: installation._id,
				hostUserId: member.hostUserId,
				membershipLifetime: member.membershipLifetime,
				...attachment,
				expiresAt: args.expiresAt,
			};
			if (existing) await ctx.db.replace(existing._id, fields);
			else await ctx.db.insert("attachment_proofs", fields);
		}
		await ctx.scheduler.runAt(args.expiresAt, internal.files.expire_selections, {});
		return true;
	},
});

export const authorize_selection = action({
	args: { pressToken: v.string(), fileNodeIds: v.array(v.string()) },
	returns: v.union(v.object({ _yay: v.array(chat_attachment) }), v.object({ _nay: chat_error })),
	handler: async (ctx, args): Promise<chat_Result<{ fileNodeId: string; name: string }[]>> => {
		if (args.fileNodeIds.length === 0 || args.fileNodeIds.length > 20 || !args.pressToken.startsWith("plu_")) {
			return { _nay: { message: "Choose between 1 and 20 files." } };
		}
		const authority = await ctx.runQuery(internal.files.selection_authority, {});
		if (!authority) return { _nay: { message: "Unauthorized" } };
		try {
			// Bind the supplied Press bearer to this native session before checking its file access.
			const lease = await press_get_lease(args.pressToken, authority.expiresAt);
			if (lease.status !== 200 || !lease.lease)
				return { _nay: { message: "Press could not confirm attachment access." } };
			const facts = lease.lease.facts;
			if (
				facts.hostSessionId !== authority.hostSessionId ||
				facts.hostUserId !== authority.hostUserId ||
				facts.hostInstallationId !== authority.hostInstallationId ||
				facts.membershipLifetime !== authority.membershipLifetime
			) {
				return { _nay: { message: "Unauthorized" } };
			}
			const answer = await press_post(
				"/api/v1/files/download-urls",
				{
					fileNodeIds: args.fileNodeIds,
					expiresInSeconds: 10,
				},
				args.pressToken,
			);
			const body = z
				.object({ items: z.array(z.object({ fileNodeId: z.string(), name: z.string() })).max(20) })
				.safeParse(answer.body);
			if (
				answer.status !== 200 ||
				!body.success ||
				new Set(body.data.items.map((file) => file.fileNodeId)).size !== new Set(args.fileNodeIds).size ||
				body.data.items.some((file) => !args.fileNodeIds.includes(file.fileNodeId))
			) {
				return { _nay: { message: "One of these files is no longer available." } };
			}
			const saved = await ctx.runMutation(internal.files.save_selection, {
				attachments: body.data.items,
				expiresAt: Math.min(facts.expiresAt, authority.expiresAt),
				membershipLifetime: authority.membershipLifetime,
			});
			return saved ? { _yay: body.data.items } : { _nay: { message: "Attachment access expired. Try again." } };
		} catch {
			return { _nay: { message: "Could not reach Press. Try again." } };
		}
	},
});

export const expire_selections = internalMutation({
	args: {},
	returns: v.null(),
	handler: async (ctx) => {
		const proofs = await ctx.db
			.query("attachment_proofs")
			.withIndex("by_expiresAt", (q) => q.lte("expiresAt", Date.now()))
			.take(100);
		for (const proof of proofs) await ctx.db.delete(proof._id);
		if (proofs.length === 100) await ctx.scheduler.runAfter(0, internal.files.expire_selections, {});
		return null;
	},
});
