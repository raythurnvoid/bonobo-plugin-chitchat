import type { BonoboUiFrontendClient } from "bonobo-plugin-sdk/frontend";
import type { FunctionReturnType } from "convex/server";

/**
 * The plugin doors the page calls on the frame's own Convex client, plus the small shapes the
 * page names for them. Most doors are called where they are used; only the roster read has a
 * mapping two callers share.
 */

type Doors = BonoboUiFrontendClient["api"]["plugins_data"];

/** A workspace member as the pickers and the @-menu name them. */
export type chat_Member = { userId: string; displayName: string | null };

/** One private range this member is in, as the `watch_my_scopes` door delivers it. */
export type chat_Scope = NonNullable<FunctionReturnType<Doors["watch_my_scopes"]>>[number];

/** One grant on a private range, as the `watch_scope_principals` door delivers it. */
export type chat_ScopePrincipal = { userId: string; level: "member" | "manage" };

export type chat_MemberListResult =
	| { _yay: { members: chat_Member[]; cursor: string | null } }
	| { _nay: { name: string; message: string } };

/**
 * One page of the workspace roster. The door answers null when the read was refused and
 * `refusal` while no admin has accepted `workspace.members.read`; a rejected call is
 * `unavailable`. None of the three may look like an empty roster: a page that reads
 * `members: []` tells the member this workspace has nobody in it, and the one refusal an admin
 * can fix would never be seen.
 */
export function chat_list_members(
	client: BonoboUiFrontendClient,
	args: { limit: number; cursor?: string },
): Promise<chat_MemberListResult> {
	return client.convex.query(client.api.plugins_data.list_members, args).then(
		(answer) => {
			if (answer === null) {
				return { _nay: { name: "denied", message: "Chitchat can no longer read the member list" } };
			}
			if (answer.refusal !== undefined) {
				return {
					_nay: { name: "not_consented", message: "This workspace has not allowed Chitchat to read the member list" },
				};
			}
			return { _yay: { members: answer.members, cursor: answer.cursor } };
		},
		() => ({ _nay: { name: "unavailable", message: "Failed to read the member list" } }),
	);
}
