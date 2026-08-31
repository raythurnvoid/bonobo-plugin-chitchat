import { chat_ANONYMOUS_MEMBER_LABEL, chat_REACTION_EMOJI } from "../chat-data";

/**
 * The Markdown rendering for projected channel files.
 *
 * The block renderers, the header, and the rollover splitter are copied from the host's
 * `convex/plugins_projections_chitchat.ts` (the old core projection engine) so the block format
 * stays byte-for-byte identical across the cutover. The host module dies once the migration
 * finishes; this file is the surviving copy.
 */

const MISSING_NAME = chat_ANONYMOUS_MEMBER_LABEL;

/**
 * Copied from the host's `PRIVATE_DISCLOSURE`. The organization owner reads every scope and
 * every restricted file before any grant is consulted, so copy that says "private" must say
 * this too. The wording is the file header's, not the chat page's — keep them separate.
 */
const PRIVATE_DISCLOSURE =
	"Only the people in this channel can read this file — and the organization owner, who can read everything in this workspace.";

/**
 * Rollover cap for one projected file, in UTF-8 bytes. The host engine used 600,000; the plugin
 * backend reads files back through `/api/v1/files/read`, which answers 404 above its 128,000-byte
 * cap with no partial read. 100,000 leaves headroom so each send's read-plus-write stays around
 * 200 KB.
 */
export const chatbe_ROLLOVER_MAX_BYTES = 100_000;

/** Bound one rendered author label so a hostile profile name cannot bloat every block. */
const AUTHOR_NAME_MAX_BYTES = 128;

// Leave room for the largest rollover suffix (`.127.md`) inside a short file-system segment.
const COLLISION_SLUG_MAX_LENGTH = 120;

export type chatbe_ProjectionMessage = {
	key: string;
	createdAt: number;
	createdBy: string;
	value: {
		text: string;
		attachments: { name: string }[];
		editedAt: number | null;
		deletedAt: number | null;
	};
};

export type chatbe_ProjectionReaction = {
	targetKey: string;
	token: string;
	removed: boolean;
};

export type chatbe_ChannelProjectionInput = {
	channelKey: string;
	channelName: string;
	topic: string | null;
	isPrivate: boolean;
	messages: chatbe_ProjectionMessage[];
	repliesByRootKey: Map<string, chatbe_ProjectionMessage[]>;
	reactionsByTargetKey: Map<string, chatbe_ProjectionReaction[]>;
	displayNames: Map<string, string | null>;
};

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

function author_label(userId: string, displayNames: Map<string, string | null>) {
	const name = displayNames.get(userId);
	if (name !== undefined && name !== null && name !== "") {
		return name;
	}

	return MISSING_NAME;
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

/**
 * A file-system-safe base name for one channel's projected files. The host derived this through
 * its shared file-name normalizer; the plugin keeps a compact local version with the same
 * intent: path separators become dashes, control characters and reserved punctuation drop out,
 * and an empty result falls back to "channel".
 */
function slug_channel_name(channelName: string) {
	const base = channelName
		.replace(/[/\\]+/g, "-")
		.replace(/[\p{Cc}\p{Cf}]+/gu, " ")
		.replace(/[<>:"|?*#%[\]{}^`~]+/g, " ")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/\.+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^[-.]+|[-.]+$/g, "");
	return base.slice(0, 80) || "channel";
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

function format_reaction_line(reactions: chatbe_ProjectionReaction[]) {
	const counts = new Map<string, number>();
	for (const reaction of reactions) {
		if (reaction.removed) {
			continue;
		}

		counts.set(reaction.token, (counts.get(reaction.token) ?? 0) + 1);
	}

	return format_reaction_counts_line(counts);
}

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

/**
 * One message or reply block. The `<!-- chitchat:msg:<key> -->` marker line identifies the block
 * across rebuilds; the edit and delete endpoints find a block by this marker and replace it with
 * a block rendered from the store document, never from the file's own text.
 */
export function chatbe_format_message_block(args: {
	message: chatbe_ProjectionMessage;
	indent: string;
	displayNames: Map<string, string | null>;
	reactions?: chatbe_ProjectionReaction[];
	reactionCounts?: ReadonlyMap<string, number>;
}) {
	const { message, indent, displayNames } = args;
	const edited = message.value.editedAt !== null;
	const deleted = message.value.deletedAt !== null;
	const flags = [edited ? "(edited)" : null, deleted ? "(message deleted)" : null].filter(
		(flag): flag is string => flag !== null,
	);
	const flagText = flags.length > 0 ? ` ${flags.join(" ")}` : "";
	const lines = [
		`${indent}<!-- chitchat:msg:${message.key} -->`,
		`${indent}**${author_label(message.createdBy, displayNames)}** · ${format_utc(message.createdAt)}${flagText}`,
	];

	if (!deleted) {
		for (const textLine of message.value.text.split("\n")) {
			lines.push(`${indent}${textLine}`);
		}

		if (message.value.attachments.length > 0) {
			lines.push(`${indent}attachments: ${message.value.attachments.map((attachment) => attachment.name).join(", ")}`);
		}
	}

	const reactionLine = args.reactionCounts
		? format_reaction_counts_line(args.reactionCounts)
		: format_reaction_line(args.reactions ?? []);
	if (reactionLine !== null) {
		lines.push(`${indent}${reactionLine}`);
	}

	return lines.join("\n");
}

function sort_messages(messages: chatbe_ProjectionMessage[]) {
	return [...messages].sort((left, right) => {
		if (left.createdAt !== right.createdAt) {
			return left.createdAt - right.createdAt;
		}

		return left.key < right.key ? -1 : left.key > right.key ? 1 : 0;
	});
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

	return lines.join("\n");
}

/**
 * Build one channel's markdown as message blocks. Oldest first. Replies sit under their root
 * with a two-space indent. Rebuilds always come from store docs, never from parsing comments.
 */
export function chatbe_build_channel_markdown(input: chatbe_ChannelProjectionInput) {
	const header = chatbe_channel_header(input.channelName, input.topic, input.isPrivate);
	const blocks: string[] = [];

	for (const message of sort_messages(input.messages)) {
		blocks.push(
			chatbe_format_message_block({
				message,
				indent: "",
				displayNames: input.displayNames,
				reactions: input.reactionsByTargetKey.get(message.key) ?? [],
			}),
		);

		const replies = sort_messages(input.repliesByRootKey.get(message.key) ?? []);
		for (const reply of replies) {
			blocks.push(
				chatbe_format_message_block({
					message: reply,
					indent: "  ",
					displayNames: input.displayNames,
					reactions: input.reactionsByTargetKey.get(reply.key) ?? [],
				}),
			);
		}
	}

	return { header, blocks, markdown: [header, ...blocks].join("\n\n") };
}

/**
 * Split on message-block boundaries so a rollover file never cuts a comment in half.
 * `files[0]` is the oldest (`slug.001.md`). The last file is the newest main (`slug.md`).
 */
export function chatbe_split_rollover(args: { header: string; blocks: string[]; maxBytes: number }) {
	const { header, blocks, maxBytes } = args;
	if (blocks.length === 0) {
		return [header];
	}

	const files: string[][] = [[]];
	let current = files[0]!;
	let currentIsMain = true;

	const push_block = (block: string) => {
		const candidate = currentIsMain ? [header, ...current, block].join("\n\n") : [...current, block].join("\n\n");
		if (current.length > 0 && chatbe_utf8_byte_size(candidate) > maxBytes) {
			files.push([]);
			current = files[files.length - 1]!;
			currentIsMain = false;
			current.push(block);
			return;
		}

		current.push(block);
	};

	// Pack newest blocks into the main file first, then spill older blocks into older files.
	for (const block of [...blocks].reverse()) {
		push_block(block);
	}

	const rendered = files.map((fileBlocks, index) => {
		// Packing walked newest-first so the newest tail stays in the main file.
		// Reverse each file so messages inside it are oldest first.
		const ordered = [...fileBlocks].reverse();
		if (index === 0) {
			return [header, ...ordered].join("\n\n");
		}

		return ordered.join("\n\n");
	});

	// `files[0]` was filled with newest-first packing, so reverse to oldest-first files.
	return rendered.reverse();
}

function block_marker_line(key: string) {
	return `<!-- chitchat:msg:${key} -->`;
}

/**
 * Find one message block inside a transcript file by its marker line. The block starts at the
 * marker's line (indent included) and ends right before the next blank line followed by another
 * marker, or at the end of the file. Returns null when the marker is not in this file.
 */
function find_block_range(content: string, key: string) {
	const marker = block_marker_line(key);
	const markerIndex = content.indexOf(marker);
	if (markerIndex === -1) {
		return null;
	}

	// Walk back over the block's indent to the start of the marker's line.
	let start = content.lastIndexOf("\n", markerIndex - 1) + 1;
	if (content.slice(start, markerIndex).trim() !== "") {
		return null;
	}

	// The block ends where the next block begins. Blocks are separated by one blank line and
	// always start with a marker line (indented for replies).
	const nextBlock = /\n\n[ ]*<!-- chitchat:msg:/g;
	nextBlock.lastIndex = markerIndex + marker.length;
	const nextMatch = nextBlock.exec(content);
	const end = nextMatch ? nextMatch.index : content.length;

	// Strip the separating blank line before the block, except for the first block after the header.
	return { start, end };
}

export function chatbe_file_contains_block(content: string, key: string) {
	return find_block_range(content, key) !== null;
}

/**
 * Replace one message block in a transcript file with a block rendered from store documents.
 * Returns null when the block is not in this file, so the caller can try an older rollover file.
 */
export function chatbe_splice_block(content: string, key: string, replacementBlock: string) {
	const range = find_block_range(content, key);
	if (range === null) {
		return null;
	}

	return content.slice(0, range.start) + replacementBlock + content.slice(range.end);
}

/**
 * Insert a reply block under its root message: after the root block and after every reply block
 * already nested there, so replies keep their order. Returns null when the root is not in this file.
 */
export function chatbe_insert_reply_block(content: string, rootKey: string, replyBlock: string) {
	const rootRange = find_block_range(content, rootKey);
	if (rootRange === null) {
		return null;
	}

	// Existing replies of this root follow the root block and carry the root key as a marker
	// prefix. The first block that is not one of them is where the nested run ends.
	let insertAt = rootRange.end;
	const nextBlock = /\n\n([ ]*)<!-- chitchat:msg:([^>]+) -->/g;
	nextBlock.lastIndex = insertAt;
	for (let match = nextBlock.exec(content); match !== null; match = nextBlock.exec(content)) {
		if (match.index !== insertAt || !match[2]!.startsWith(`${rootKey}:`)) {
			break;
		}

		const range = find_block_range(content, match[2]!);
		if (range === null) {
			break;
		}
		insertAt = range.end;
		nextBlock.lastIndex = insertAt;
	}

	return content.slice(0, insertAt) + "\n\n" + replyBlock + content.slice(insertAt);
}

/**
 * Replace everything before the first message block with a freshly rendered header. A file with
 * no block yet is all header. Used when a rename or topic change made the stored header stale.
 */
export function chatbe_replace_header(content: string, header: string) {
	const firstBlock = /\n\n[ ]*<!-- chitchat:msg:/.exec(content);
	if (firstBlock === null) {
		return header;
	}

	return header + content.slice(firstBlock.index);
}

export function chatbe_rollover_path(folderPath: string, slug: string, rolloverIndex: number) {
	if (rolloverIndex === 0) {
		return `${folderPath}/${slug}.md`;
	}

	return `${folderPath}/${slug}.${String(rolloverIndex).padStart(3, "0")}.md`;
}

/**
 * The root README is the channel list: it maps channel names to their projected files so a
 * rename never has to move transcript files. The old engine's README was static text; this one
 * is rewritten by `channel-manage` and by reconcile.
 */
export function chatbe_readme_markdown(channels: { name: string; slug: string }[]) {
	const lines = [
		"# Chitchat",
		"",
		"These files are a derived copy of Chitchat channels in this workspace.",
		"",
		"- Edit chat in the Chitchat page, not in these files.",
		"- Private channels appear under `private/`. Each channel folder is visible only to the people in that channel — and the organization owner, who can read everything in this workspace.",
		"- Do not share those folders by hand. The plugin resets each folder's sharing to the channel's members.",
		"- Author names are a snapshot written with each message. A rename shows up on later messages.",
		"- The folder is read-only. The workspace agent can read these files with bash.",
	];

	const sorted = [...channels].sort((left, right) => left.name.localeCompare(right.name));
	if (sorted.length > 0) {
		lines.push("", "## Channels", "");
		for (const channel of sorted) {
			lines.push(`- [${channel.name}](./${channel.slug}.md)`);
		}
	}

	return lines.join("\n");
}
