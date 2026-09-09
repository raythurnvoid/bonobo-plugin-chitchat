import type { QueryCtx } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import type { chat_Result } from "../shared/chat";

if (!process.env.PRESS_HTTP_URL) {
	throw new Error("PRESS_HTTP_URL is not set in Convex env");
}
const PRESS_ISSUER = `${process.env.PRESS_HTTP_URL}/plugins-services`;

export async function auth_get_current_access(ctx: QueryCtx): Promise<
	chat_Result<{
		session: Doc<"sessions">;
		installation: Doc<"installations">;
		member: Doc<"workspace_members">;
	}>
> {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity || identity.issuer !== PRESS_ISSUER || typeof identity.exchangeId !== "string") {
		return { _nay: { message: "Unauthenticated" } };
	}

	const session = await ctx.db
		.query("sessions")
		.withIndex("by_hostSessionId", (q) => q.eq("hostSessionId", identity.subject))
		.unique();
	if (!session || session.revokedAt !== null || session.expiresAt <= Date.now()) {
		return { _nay: { message: "Unauthorized" } };
	}
	const installation = await ctx.db.get(session.installationId);
	if (
		!installation ||
		installation.status !== "ready" ||
		installation.appliedAccessRevision < session.requiredRevision ||
		session.requiredRevision < installation.invalidatedAtRevision
	) {
		return { _nay: { message: "Unauthorized" } };
	}
	const member = await ctx.db
		.query("workspace_members")
		.withIndex("by_installation_hostUserId", (q) =>
			q.eq("installationId", installation._id).eq("hostUserId", session.hostUserId),
		)
		.unique();
	if (
		!member ||
		!member.active ||
		member.hostMembershipId !== session.hostMembershipId ||
		member.membershipLifetime !== session.membershipLifetime ||
		!session.canRead ||
		!member.canRead ||
		member.cleanupPending
	) {
		return { _nay: { message: "Permission denied" } };
	}
	if (session.exchangeId !== identity.exchangeId) {
		// A normal renewal can reach the subscription before the browser installs its new JWT.
		const sameMember =
			identity.hostUserId === member.hostUserId && identity.membershipLifetime === member.membershipLifetime;
		return { _nay: { message: "Unauthorized", ...(sameMember ? { name: "refresh_required" } : {}) } };
	}
	return { _yay: { session, installation, member } };
}
