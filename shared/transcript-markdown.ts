import { chat_ANONYMOUS_MEMBER_LABEL, chat_REACTION_EMOJI } from "./chat-display";

// Keep the existing Markdown text and the 100,000-byte part limit.

const MISSING_NAME = chat_ANONYMOUS_MEMBER_LABEL;

/**
 * File sharing starts with the channel's readers. A file manager can change it for later
 * updates too. Keep this file-header wording separate from the chat-page disclosure.
 */
const PRIVATE_DISCLOSURE =
	"This copy starts with access for the channel's members and the organization owner. File managers can change its sharing, including who can read later updates.";

// Every published part must fit the same UTF-8 byte guard.
export const chatbe_ROLLOVER_MAX_BYTES = 100_000;

/**
 * Keep each stored author name within the message-size budget.
 */
const AUTHOR_NAME_MAX_BYTES = 128;

// Leave room for numbered parts inside a short file-system segment.
const COLLISION_SLUG_MAX_LENGTH = 120;

export function chatbe_utf8_byte_size(text: string) {
	return new TextEncoder().encode(text).byteLength;
}

function pad2(value: number) {
	return String(value).padStart(2, "0");
}

function format_utc(ms: number) {
	const date = new Date(ms);
	return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())} ${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())} UTC`;
}

/**
 * Bound and sanitize one author label before it lands in Markdown. Control and format
 * characters become spaces, `\` and `*` are escaped so a name cannot change block structure,
 * and the result is cut at a UTF-8 byte bound without splitting a code point.
 */
export function chatbe_bounded_author_name(name: string | null) {
	if (name === null) {
		return null;
	}
	const safeName = name
		.replace(/[\p{Cc}\p{Cf}]+/gu, " ")
		.replace(/\\/g, "\\\\")
		.replace(/\*/g, "\\*")
		.trim();
	if (safeName === "") {
		return null;
	}
	if (chatbe_utf8_byte_size(safeName) <= AUTHOR_NAME_MAX_BYTES) {
		return safeName;
	}

	const bytes = new TextEncoder().encode(safeName).slice(0, AUTHOR_NAME_MAX_BYTES);
	return new TextDecoder().decode(bytes).replace(/�$/, "");
}

// Keep file names stable when channel display names change.
function slug_channel_name(channelName: string) {
	const base =
		channelName
			.normalize("NFKD")
			.replace(/\p{Mark}/gu, "")
			.toLowerCase()
			.replace(/[^a-z0-9_-]+/g, "-")
			.replace(/-+/g, "-")
			.replace(/_+/g, "_")
			.replace(/[-_]{2,}/g, "-")
			.slice(0, 80)
			.replace(/^[-_]+|[-_]+$/g, "") || "channel";
	return ["readme", "agents", "skill"].includes(base) ? `${base}-channel` : base;
}

export async function chatbe_sha256_hex(text: string) {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
	return Array.from(new Uint8Array(digest))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}

/**
 * The slug used when the plain channel-name slug is already taken by another channel. Hash the
 * full key: UUID prefixes collide at large channel counts, while this fixed digest keeps public
 * file names and private folder names stable and bounded.
 */
export async function chatbe_collision_slug(channelName: string, channelKey: string) {
	const base = slug_channel_name(channelName);
	const suffix = await chatbe_sha256_hex(channelKey);
	const boundedBase = base.slice(0, COLLISION_SLUG_MAX_LENGTH - suffix.length - 1).replace(/[._-]+$/u, "") || "channel";
	return `${boundedBase}-${suffix}`;
}

export { slug_channel_name as chatbe_slug_channel_name };

function format_reaction_counts_line(counts: ReadonlyMap<string, number>) {
	const parts: string[] = [];
	for (const [token, count] of counts) {
		if (count <= 0) {
			continue;
		}
		const emoji = (chat_REACTION_EMOJI as Record<string, string>)[token] ?? token;
		parts.push(`${emoji} ${count}`);
	}

	if (parts.length === 0) {
		return null;
	}

	return `reactions: ${parts.join(", ")}`;
}

// The native queue saves this exact block in the source mutation.
export function chatbe_format_message_block(args: {
	message: {
		marker: string;
		createdAt: number;
		authorName: string | null;
		text: string;
		attachments: { name: string }[];
		editedAt: number | null;
		deletedAt: number | null;
	};
	indent: string;
	reactionCounts: ReadonlyMap<string, number>;
}) {
	const { message, indent } = args;
	const flags = [
		message.editedAt !== null ? "(edited)" : null,
		message.deletedAt !== null ? "(message deleted)" : null,
	].filter(Boolean);
	const flagText = flags.length ? ` ${flags.join(" ")}` : "";
	const lines = [
		`${indent}<!-- chitchat:msg:${message.marker} -->`,
		`${indent}**${message.authorName || MISSING_NAME}** · ${format_utc(message.createdAt)}${flagText}`,
	];
	if (message.deletedAt === null) {
		for (const line of message.text.replace(/\r\n?/g, "\n").split("\n")) lines.push(indent + line);
		if (message.attachments.length)
			lines.push(`${indent}attachments: ${message.attachments.map((attachment) => attachment.name).join(", ")}`);
	}
	const reactions = format_reaction_counts_line(args.reactionCounts);
	if (reactions !== null) lines.push(indent + reactions);
	return lines.join("\n").replace(/\r\n?/g, "\n");
}

export function chatbe_channel_header(channelName: string, topic: string | null, isPrivate: boolean) {
	const lines = [
		`# ${channelName}`,
		"",
		isPrivate
			? `Private Chitchat channel. ${PRIVATE_DISCLOSURE} This file is a derived copy. Edit chat in the Chitchat page, not here.`
			: "Public Chitchat channel. This file is a derived copy. Edit chat in the Chitchat page, not here.",
	];
	if (topic !== null && topic !== "") {
		lines.push("", topic);
	}

	return lines.join("\n").replace(/\r\n?/g, "\n");
}

export function chatbe_rollover_path(folderPath: string, slug: string, rolloverIndex: number) {
	if (rolloverIndex === 0) {
		return `${folderPath}/${slug}.md`;
	}

	return `${folderPath}/${slug}.${String(rolloverIndex).padStart(3, "0")}.md`;
}

// The independent README queue keeps public channel names separate from immutable file paths.
export function chatbe_readme_markdown(channels: { name: string; slug: string }[]) {
	const lines = [
		"# Chitchat",
		"",
		"These files are a derived copy of Chitchat channels in this workspace.",
		"",
		"- Edit chat in the Chitchat page. File edits do not change chat and may be replaced by later updates.",
		"- Private channels appear under `private/`. New channel folders allow the channel's members and the organization owner to read them.",
		"- File managers can change sharing. Later updates follow that sharing, even if channel membership changes.",
		"- Author names are a snapshot written with each message. A rename shows up on later messages.",
		"- New files and folders start locked. File managers can unlock them or apply their own lock to stop plugin writes.",
		"- The `plugin-name` metadata label lets Chitchat update a file or reuse a folder. Removing it stops those operations. The `source` label is only a description.",
		"- The workspace agent can read files it has access to with bash.",
	];

	const sorted = [...channels].sort((left, right) => left.name.localeCompare(right.name));
	if (sorted.length > 0) {
		lines.push("", "## Channels", "");
		for (const channel of sorted) {
			lines.push(`- [${channel.name}](./${channel.slug}.md)`);
		}
	}

	return lines.join("\n").replace(/\r\n?/g, "\n");
}
