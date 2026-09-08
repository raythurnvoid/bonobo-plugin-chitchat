import { paginationOptsValidator, paginationResultValidator } from "convex/server";
import { v } from "convex/values";
import { chat_member_label } from "../shared/chat-display";
import { query } from "./_generated/server";
import { auth_get_current_access } from "./auth";

export const list = query({
	args: { paginationOpts: paginationOptsValidator },
	returns: paginationResultValidator(v.object({ userId: v.string(), displayName: v.union(v.string(), v.null()) })),
	handler: async (ctx, args) => {
		const access = await auth_get_current_access(ctx);
		if (access._nay) return { page: [], isDone: true, continueCursor: "" };
		const page = await ctx.db
			.query("workspace_members")
			.withIndex("by_installation_active_hostUserId", (q) =>
				q.eq("installationId", access._yay.installation._id).eq("active", true),
			)
			.paginate({
				...args.paginationOpts,
				numItems: Math.min(100, Math.max(1, args.paginationOpts.numItems)),
				maximumRowsRead: 100,
				maximumBytesRead: 256_000,
			});
		// Short pages still carry their cursor; people without content access cannot join a channel.
		return {
			...page,
			page: page.page
				.filter((member) => member.canRead && !member.cleanupPending)
				.map((member) => ({ userId: member.hostUserId, displayName: member.displayName })),
		};
	},
});

export const resolve = query({
	args: { userIds: v.array(v.string()) },
	returns: v.union(v.record(v.string(), v.union(v.string(), v.null())), v.null()),
	handler: async (ctx, args) => {
		const access = await auth_get_current_access(ctx);
		if (access._nay || args.userIds.length > 50) return null;
		const entries = await Promise.all(
			[...new Set(args.userIds)].map(async (userId) => {
				const member = await ctx.db
					.query("workspace_members")
					.withIndex("by_installation_hostUserId", (q) =>
						q.eq("installationId", access._yay.installation._id).eq("hostUserId", userId),
					)
					.unique();
				return [
					userId,
					member?.active && member.canRead && !member.cleanupPending ? chat_member_label(member.displayName) : null,
				] as const;
			}),
		);
		return Object.fromEntries(entries);
	},
});
