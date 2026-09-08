// Shared display rules for chat and transcript rendering.
export const chat_REACTION_TOKENS = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"] as const;

export type chat_ReactionToken = (typeof chat_REACTION_TOKENS)[number];

export const chat_REACTION_EMOJI: Record<chat_ReactionToken, string> = {
	thumbs_up: "👍",
	heart: "❤️",
	laugh: "😂",
	wow: "😮",
	sad: "😢",
	party: "🎉",
	rocket: "🚀",
	eyes: "👀",
};

export const chat_REACTION_LABELS: Record<chat_ReactionToken, string> = {
	thumbs_up: "Thumbs up",
	heart: "Heart",
	laugh: "Laugh",
	wow: "Wow",
	sad: "Sad",
	party: "Party",
	rocket: "Rocket",
	eyes: "Eyes",
};

export const chat_PRIVATE_CHANNEL_DISCLOSURE =
	"Only the people added here and the organization owner can read this channel. Its copies in Files have separate sharing settings. File managers can share those copies, including later updates, with other people.";

export const chat_ANONYMOUS_MEMBER_LABEL = "Someone with no name yet";

export function chat_member_label(displayName: string | null): string {
	return displayName !== null && displayName !== "" ? displayName : chat_ANONYMOUS_MEMBER_LABEL;
}

/**
 * The `@word` under the caret, or null when the caret is not in a mention. The `@` must sit at
 * the start of the text or after whitespace so `hello@x` is not treated as a mention.
 */
export function chat_mention_query_at(value: string, caret: number): { start: number; query: string } | null {
	const match = /(?:^|\s)@([^\s@]*)$/.exec(value.slice(0, caret));
	if (match === null) {
		return null;
	}
	const query = match[1] ?? "";
	return { start: caret - query.length - 1, query };
}

/**
 * Members the @-menu may offer: everyone except the sender, sorted by the label that will be
 * inserted, filtered with a case-insensitive substring. A null display name uses
 * {@link chat_ANONYMOUS_MEMBER_LABEL}.
 */
export function chat_filter_mention_members<Member extends { userId: string; displayName: string | null }>(
	members: Member[],
	query: string,
	selfUserId: string,
): (Member & { label: string })[] {
	const needle = query.toLowerCase();
	return members
		.filter((member) => member.userId !== selfUserId)
		.map((member) => ({ ...member, label: chat_member_label(member.displayName) }))
		.filter((member) => member.label.toLowerCase().includes(needle))
		.sort((a, b) => a.label.localeCompare(b.label));
}

export function chat_insert_mention(text: string, start: number, caret: number, label: string) {
	return {
		text: `${text.slice(0, start)}@${label} ${text.slice(caret)}`,
		caret: start + label.length + 2,
	};
}

/**
 * Ids whose inserted `@Name` is still in the sent text. Deleting the name from the composer
 * deletes the mention, so a rename later cannot retarget a leftover id.
 */
export function chat_mention_ids_still_in_text<Id extends string>(
	chosen: Iterable<readonly [Id, string]>,
	text: string,
): Id[] {
	const ids: Id[] = [];
	for (const [id, name] of chosen) {
		if (text.includes(`@${name}`)) {
			ids.push(id);
		}
	}
	return ids;
}

export function chat_format_recency(timestamp: number, now: number): string {
	const age = now - timestamp;
	if (age < 60_000) {
		return "just now";
	}
	if (age < 60 * 60_000) {
		return `${Math.floor(age / 60_000)}m ago`;
	}
	if (age < 24 * 60 * 60_000) {
		return `${Math.floor(age / (60 * 60_000))}h ago`;
	}
	if (age < 7 * 24 * 60 * 60_000) {
		return new Date(timestamp).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
	}
	return new Date(timestamp).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function chat_get_error_message(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}
