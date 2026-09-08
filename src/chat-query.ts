import { useQuery, type OptionalRestArgsOrSkip } from "convex/react";
import { getFunctionName, type FunctionReference } from "convex/server";
import { useState } from "react";
import type { use_chat_session } from "./session";

// Keep one bounded query result during a verified JWT swap, never during ordinary loading or denial.
export function use_chat_query<Query extends FunctionReference<"query">>(
	session: Pick<ReturnType<typeof use_chat_session>, "ready" | "refreshing" | "member">,
	query: Query,
	...args: OptionalRestArgsOrSkip<Query>
) {
	const current = useQuery(query, ...(session.ready || session.refreshing ? args : ["skip"]));
	const key = JSON.stringify([
		getFunctionName(query),
		args,
		session.member?.hostUserId,
		session.member?.installationId,
		session.member?.generation,
		session.member?.membershipLifetime,
	]);
	const [previous, setPrevious] = useState({ key, value: session.refreshing ? undefined : current });
	const value = session.refreshing
		? args[0] !== "skip" && previous.key === key
			? previous.value
			: undefined
		: current;
	if (previous.key !== key || previous.value !== value) setPrevious({ key, value });
	return value;
}
