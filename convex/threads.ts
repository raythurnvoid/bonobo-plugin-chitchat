import { v } from "convex/values";
import { doc } from "convex-helpers/validators";
import { messages_get_access } from "./messages";
import { query } from "./_generated/server";
import schema from "./schema";

export const get_summary = query({
	args: { rootMessageId: v.id("messages") },
	returns: v.union(doc(schema, "thread_summaries"), v.null()),
	handler: async (ctx, args) => {
		const access = await messages_get_access(ctx, args.rootMessageId);
		if (access._nay || access._yay.message.rootMessageId !== null) return null;
		return ctx.db
			.query("thread_summaries")
			.withIndex("by_rootMessage", (q) => q.eq("rootMessageId", args.rootMessageId))
			.first();
	},
});
