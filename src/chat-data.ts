import { z } from "zod";

/**
 * The fixed reaction palette. Tokens (not raw emoji) live in document keys because emoji
 * keys are unreliable, not uniformly refused: the store's key rule rejects only control
 * and format characters, so simple emoji pass while ZWJ-joined ones fail. A fixed ASCII
 * token set keeps reaction keys predictable; the emoji are only how the page renders them.
 */
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

/**
 * Server-appended keys end with `<invertedPaddedMs>:<rand4>`. The inverted part is
 * `9999999999999 - epochMs` padded to 13 digits, so ascending key order is newest first.
 */
const INVERTED_MS_COMPLEMENT = 9_999_999_999_999;
const KEY_TAIL_REGEX = /(?:^|:)(\d{13}):([^:]{1,16})$/;

/**
 * Reads the creation time out of a server-appended key (channel, message, or reply).
 * Returns null when the key does not end with the `<invertedPaddedMs>:<rand>` tail —
 * the store is generic and other writers can put arbitrary ASCII keys in any collection,
 * so an unparseable key means "not one of ours" and the doc is dropped.
 */
export function chat_key_timestamp(key: string): number | null {
	const match = KEY_TAIL_REGEX.exec(key);
	if (!match) {
		return null;
	}
	return INVERTED_MS_COMPLEMENT - Number(match[1]);
}

/**
 * The 13-digit inverted-timestamp segment of an appended key — the exact inverse of
 * `chat_key_timestamp`. The backend mints message and reply keys with it.
 */
export function chat_inverted_ms(nowMs: number): string {
	return String(INVERTED_MS_COMPLEMENT - nowMs).padStart(13, "0");
}

/**
 * What a private channel's key starts with, and what its scope covers.
 *
 * A private channel is not a different kind of channel. It is an ordinary channel whose key sits
 * under this prefix, so the scope created over that key hides the channel, its messages, its replies
 * and its reactions in one go — they all key off the channel key. A direct message is a private
 * channel with two people in it and nothing else.
 *
 * `/` and not `:`, because every key parser here splits on `:` and counts the parts.
 */
const PRIVATE_CHANNEL_KEY_PREFIX = "p/";
const PRIVATE_CHANNEL_KEY_REGEX = /^p\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u;

/**
 * The collections a private channel's scope must cover.
 *
 * All four, in one `scopes.createWithDocument` call with the first channel document. A scope
 * covering three of them would leave the fourth readable by the whole workspace.
 */
export const chat_PRIVATE_CHANNEL_COLLECTIONS = ["channels", "messages", "replies", "reactions"];

/**
 * What "private" really means here, in the same words everywhere the word appears.
 *
 * The organization owner passes every permission check before any grant is read, so the owner reads
 * every private channel and every direct message. Copy that says "private" and stops there is a
 * disclosure, so this sentence travels with it.
 */
export const chat_PRIVATE_CHANNEL_DISCLOSURE =
	"Only the people added here can read it — and the organization owner, who can read everything in this workspace.";

/**
 * Channel keys are client-generated. Public channels use `put`; private channels use the atomic
 * scope-and-document call. Both store a SHARED document, so any member who can see the channel can
 * rename or archive it. A UUID leaves room for message and reply segments under the 128 budget.
 */
export function chat_create_channel_key(visibility: "public" | "private"): string {
	const id = crypto.randomUUID();
	return visibility === "private" ? `${PRIVATE_CHANNEL_KEY_PREFIX}${id}` : id;
}

/**
 * Whether a channel is private, read from its own key.
 *
 * The key is the only source. Storing a flag in the channel value would let the two disagree, and
 * the value is writable by everybody who can see the channel while the key never changes.
 */
export function chat_channel_is_private(channelKey: string): boolean {
	return channelKey.startsWith(PRIVATE_CHANNEL_KEY_PREFIX);
}

/** Whether a key has the exact shape Chitchat mints for one private channel and its scope. */
export function chat_private_channel_key_is_valid(channelKey: string): boolean {
	return PRIVATE_CHANNEL_KEY_REGEX.test(channelKey);
}

/** Message keys are `<channelKey>:<invertedPaddedMs>:<rand4>` — appended under this prefix. */
export function chat_message_key_prefix(channelKey: string) {
	return `${channelKey}:`;
}

/** The channel key of a message key, or null when the key is not message-shaped. */
export function chat_message_channel_key(messageKey: string): string | null {
	const parts = messageKey.split(":");
	if (parts.length < 3 || chat_key_timestamp(messageKey) === null) {
		return null;
	}
	return parts.slice(0, -2).join(":");
}

/** Reply keys are `<rootMessageKey>:<invertedPaddedMs>:<rand4>` — appended under this prefix. */
export function chat_reply_key_prefix(rootMessageKey: string) {
	return `${rootMessageKey}:`;
}

/**
 * The caller key for putOwned on a reaction. The server appends `:<userId>`,
 * so the stored key is `<messageKey>:<token>:<userId>` and nobody can forge another
 * member's reaction key through this op. A removal writes `{ removed: true }` on the
 * same key instead of deleting it, so the change feed can see the removal.
 */
export function chat_reaction_caller_key(messageKey: string, token: chat_ReactionToken) {
	return `${messageKey}:${token}`;
}

/**
 * Splits a stored reaction key into the reacted-to message key, the palette token, and the
 * server-appended user id tail. Returns null for foreign or malformed keys. The tail is
 * parsed for completeness only — counting always groups by the doc's `createdBy`, because
 * a caller can smuggle any id into the caller part of the key while `createdBy` is stamped
 * by the server.
 */
export function chat_parse_reaction_key(
	storedKey: string,
): { targetKey: string; token: chat_ReactionToken; keyTailUserId: string } | null {
	const parts = storedKey.split(":");
	// Shortest real shape: channel-level target (2 parts) + token + user id.
	if (parts.length < 4) {
		return null;
	}
	const token = parts[parts.length - 2];
	if (!(chat_REACTION_TOKENS as readonly string[]).includes(token)) {
		return null;
	}
	const targetKey = parts.slice(0, -2).join(":");
	if (chat_key_timestamp(targetKey) === null) {
		return null;
	}
	return { targetKey, token: token as chat_ReactionToken, keyTailUserId: parts[parts.length - 1] };
}

/** The root message key of a reply key, or null when the key is not reply-shaped. */
export function chat_reply_root_key(replyKey: string): string | null {
	const parts = replyKey.split(":");
	// A reply key is its root key (>= 3 parts: channel key + message tail) plus 2 parts.
	if (parts.length < 5) {
		return null;
	}
	const rootKey = parts.slice(0, -2).join(":");
	if (chat_key_timestamp(rootKey) === null || chat_key_timestamp(replyKey) === null) {
		return null;
	}
	return rootKey;
}

/** The full root message key of a message or reply key, without assuming a channel-key length. */
export function chat_root_message_key(key: string): string | null {
	const parts = key.split(":");
	if (parts.length === 3) {
		return chat_key_timestamp(key) === null ? null : key;
	}
	if (parts.length === 5) {
		return chat_reply_root_key(key);
	}
	return null;
}

/**
 * The caller key of the member's public read-cursor document in the `cursors` collection. It is
 * written with `putOwned` and the server appends `:<userId>`, so the stored key is `me:<userId>`
 * — one document per member, and nobody can write another member's.
 */
export const chat_CURSOR_CALLER_KEY = "me";

/** The stored key of one member's public cursor doc — what the cursors watch narrows to. */
export function chat_cursor_stored_key(userId: string) {
	return `${chat_CURSOR_CALLER_KEY}:${userId}`;
}

/**
 * The caller key of this member's read cursor for one private channel. The doc lives in the
 * `channels` collection INSIDE the channel's scope range, because a `p/` key in the public cursor
 * map would tell every member the channel exists. The server appends `:<userId>` on `putOwned`,
 * so the stored key is `<channelKey>:read:<userId>` and the per-scope channels watch already
 * delivers it at no extra subscription. `chat_validate_channel_doc` drops it from channel lists
 * because its value has no `name`.
 */
export function chat_private_cursor_caller_key(channelKey: string) {
	return `${channelKey}:read`;
}

/**
 * Splits a stored private-cursor key into its channel key and the server-appended user id tail.
 * Returns null for every other key shape in the channels collection — real channel docs and
 * foreign keys alike. Match the owner by the doc's `createdBy`, not the tail: the server stamps
 * `createdBy`, while the tail is only parsed here for completeness.
 */
export function chat_parse_private_cursor_key(storedKey: string): { channelKey: string; keyTailUserId: string } | null {
	const parts = storedKey.split(":");
	if (parts.length !== 3 || parts[1] !== "read") {
		return null;
	}
	if (!chat_channel_is_private(parts[0])) {
		return null;
	}
	return { channelKey: parts[0], keyTailUserId: parts[2] };
}

// #region value schemas

export const chat_CHANNEL_NAME_MAX_LENGTH = 64;

export const chat_CHANNEL_TOPIC_MAX_LENGTH = 250;

export const chat_channel_value_schema = z.object({
	name: z.string().min(1).max(chat_CHANNEL_NAME_MAX_LENGTH),
	archivedAt: z.number().nullable(),
	/**
	 * Optional, and it must stay optional. Every channel written before the topic existed carries no
	 * `topic`, `chat_validate_channel_doc` drops a value that fails to parse, and the store drops
	 * every null — so a required field would empty the channel list of an existing workspace.
	 */
	topic: z.string().max(chat_CHANNEL_TOPIC_MAX_LENGTH).optional(),
});

export type chat_ChannelValue = z.infer<typeof chat_channel_value_schema>;

export const chat_attachment_schema = z.object({
	fileNodeId: z.string().min(1),
	name: z.string().min(1),
});

export type chat_Attachment = z.infer<typeof chat_attachment_schema>;

export const chat_message_value_schema = z.object({
	text: z.string(),
	attachments: z.array(chat_attachment_schema),
	editedAt: z.number().nullable(),
	deletedAt: z.number().nullable(),
	/**
	 * User ids the author mentioned with `@Name` in `text`. Only ids whose name is still present
	 * in the text at send time are stored. Optional: messages written before mentions existed
	 * carry none, and a required field would drop them all at validation.
	 */
	mentions: z.array(z.string()).optional(),
});

export type chat_MessageValue = z.infer<typeof chat_message_value_schema>;

/**
 * The backend invoke endpoints, shared between the manifest, the worker router, and the page's
 * `client.backend.invoke` calls. Every endpoint runs under the one installation-wide
 * serialization lock so transcript read-modify-write stays ordered.
 */
export const chat_BACKEND_ENDPOINTS = [
	{ id: "message-send", path: "/messages/send" },
	{ id: "message-edit", path: "/messages/edit" },
	{ id: "message-delete", path: "/messages/delete" },
	{ id: "reply-send", path: "/replies/send" },
	{ id: "reaction-toggle", path: "/reactions/toggle" },
	{ id: "channel-manage", path: "/channels/manage" },
	{ id: "reconcile", path: "/reconcile" },
] as const;

export type chat_BackendEndpointId = (typeof chat_BACKEND_ENDPOINTS)[number]["id"];

/**
 * Label used when a roster row has no profile name. That includes a member who signed in
 * anonymously. It is not "Former member": that label is only for an id that `members.resolve`
 * maps to null because the person has left.
 */
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
export function chat_filter_mention_members(
	members: { userId: string; displayName: string | null }[],
	query: string,
	selfUserId: string,
): { userId: string; displayName: string | null; label: string }[] {
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
export function chat_mention_ids_still_in_text(chosen: Iterable<readonly [string, string]>, text: string): string[] {
	const ids: string[] = [];
	for (const [id, name] of chosen) {
		if (text.includes(`@${name}`)) {
			ids.push(id);
		}
	}
	return ids;
}

/**
 * Copy for a refused `members.list`. `not_consented` is the ordinary state until an admin
 * accepts `workspace.members.read`; other names share one line so the composer never looks broken.
 */
export function chat_mention_roster_refusal_copy(name: string): string {
	if (name === "not_consented") {
		return "This workspace has not allowed Chitchat to read the member list yet. An admin can accept the plugin's current permissions.";
	}
	return "The member list is not available right now. You can keep typing.";
}

/**
 * The member's public read cursor map: newest read time per public channel key, epoch ms. One doc
 * per member (`me:<userId>` in `cursors`). Private channel keys must never appear here — a `p/`
 * key in a workspace-readable value discloses the channel's existence. Private read state lives
 * in each scope's own range instead (see `chat_private_cursor_caller_key`).
 */
export const chat_cursor_map_value_schema = z.object({
	channels: z.record(z.string(), z.number()),
});

export type chat_CursorMapValue = z.infer<typeof chat_cursor_map_value_schema>;

/** Per-collection durable append positions covered by one private read cursor. */
export const chat_private_activity_cursor_schema = z.object({
	messages: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
	replies: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
});

export type chat_PrivateActivityCursor = z.infer<typeof chat_private_activity_cursor_schema>;

/**
 * A private channel's per-member read cursor. `activity` drives unread state. `at` only places
 * the New divider. Map an old time-only cursor to zero sequences so rollout may show extra unread
 * state but can never hide a new append.
 */
export const chat_private_cursor_value_schema = z.union([
	z.object({
		at: z.number(),
		activity: chat_private_activity_cursor_schema,
	}),
	z.object({ at: z.number(), activity: z.undefined().optional() }).transform((value) => ({
		at: value.at,
		activity: { messages: 0, replies: 0 },
	})),
]);

// #endregion value schemas

// #region document validation

/**
 * The BonoboPublicDoc envelope every read surface returns (plain watch and window
 * updates alike). The store is a generic multi-writer surface, so every doc is runtime
 * validated before the page uses it; a doc that fails is dropped and counted.
 */
const public_doc_schema = z.object({
	collection: z.string(),
	key: z.string().min(1).max(128),
	value: z.record(z.string(), z.unknown()),
	revision: z.number(),
	createdBy: z.string().min(1),
	updatedBy: z.string(),
	ownership: z.union([z.literal("shared"), z.literal("owned")]),
	createdAt: z.number(),
	updatedAt: z.number(),
});

/** A validated store document with its typed value and the creation time read from the key. */
export type chat_Doc<V> = {
	key: string;
	value: V;
	revision: number;
	createdBy: string;
	updatedBy: string;
	createdAt: number;
	updatedAt: number;
	/** Creation time parsed from the key tail — the trusted, server-minted chronology. */
	timestamp: number;
};

function validate_keyed_doc<V>(raw: unknown, valueSchema: z.ZodType<V>): chat_Doc<V> | null {
	const envelope = public_doc_schema.safeParse(raw);
	if (!envelope.success) {
		return null;
	}
	const timestamp = chat_key_timestamp(envelope.data.key);
	if (timestamp === null) {
		return null;
	}
	const value = valueSchema.safeParse(envelope.data.value);
	if (!value.success) {
		return null;
	}
	return {
		key: envelope.data.key,
		value: value.data,
		revision: envelope.data.revision,
		createdBy: envelope.data.createdBy,
		updatedBy: envelope.data.updatedBy,
		createdAt: envelope.data.createdAt,
		updatedAt: envelope.data.updatedAt,
		timestamp,
	};
}

export function chat_validate_channel_doc(raw: unknown): chat_Doc<chat_ChannelValue> | null {
	const envelope = public_doc_schema.safeParse(raw);
	if (!envelope.success) {
		return null;
	}
	const value = chat_channel_value_schema.safeParse(envelope.data.value);
	if (!value.success) {
		return null;
	}
	return {
		key: envelope.data.key,
		value: value.data,
		revision: envelope.data.revision,
		createdBy: envelope.data.createdBy,
		updatedBy: envelope.data.updatedBy,
		createdAt: envelope.data.createdAt,
		updatedAt: envelope.data.updatedAt,
		// Channel keys are client-generated with no server time tail; use createdAt instead.
		timestamp: envelope.data.createdAt,
	};
}

export function chat_validate_message_doc(raw: unknown): chat_Doc<chat_MessageValue> | null {
	return validate_keyed_doc(raw, chat_message_value_schema);
}

/**
 * A live reaction is `{}`. A removal is `{ removed: true }` on the same owned key, so the
 * change feed can see it. Extra fields are ignored: `z.object` strips them. A strict schema
 * would make an older client drop the whole doc if a later version adds a field.
 */
export const chat_reaction_value_schema = z.object({
	removed: z.literal(true).optional(),
});

/** A validated reaction document with its parsed key parts. */
export type chat_ReactionDoc = {
	key: string;
	targetKey: string;
	token: chat_ReactionToken;
	createdBy: string;
	revision: number;
	updatedAt: number;
	removed: boolean;
};

export function chat_validate_reaction_doc(raw: unknown): chat_ReactionDoc | null {
	const envelope = public_doc_schema.safeParse(raw);
	if (!envelope.success) {
		return null;
	}
	const parsed = chat_parse_reaction_key(envelope.data.key);
	if (parsed === null) {
		return null;
	}
	const value = chat_reaction_value_schema.safeParse(envelope.data.value);
	if (!value.success) {
		return null;
	}
	return {
		key: envelope.data.key,
		targetKey: parsed.targetKey,
		token: parsed.token,
		createdBy: envelope.data.createdBy,
		revision: envelope.data.revision,
		updatedAt: envelope.data.updatedAt,
		removed: value.data.removed === true,
	};
}

/** A public cursor doc keeps ownership because the watch must accept only this member's owned row. */
export type chat_CursorMapDoc = chat_Doc<chat_CursorMapValue> & { ownership: "shared" | "owned" };

/** The member's public cursor doc, or null when the doc fails validation. */
export function chat_validate_cursor_map_doc(raw: unknown): chat_CursorMapDoc | null {
	const envelope = public_doc_schema.safeParse(raw);
	if (!envelope.success) {
		return null;
	}
	const value = chat_cursor_map_value_schema.safeParse(envelope.data.value);
	if (!value.success) {
		return null;
	}
	return {
		key: envelope.data.key,
		value: value.data,
		revision: envelope.data.revision,
		createdBy: envelope.data.createdBy,
		updatedBy: envelope.data.updatedBy,
		createdAt: envelope.data.createdAt,
		updatedAt: envelope.data.updatedAt,
		ownership: envelope.data.ownership,
		// Cursor keys are client-chosen with no server time tail; use createdAt instead.
		timestamp: envelope.data.createdAt,
	};
}

/** A validated private-cursor document from the channels collection. */
export type chat_PrivateCursorDoc = {
	key: string;
	channelKey: string;
	createdBy: string;
	at: number;
	activity: chat_PrivateActivityCursor;
	revision: number;
};

export function chat_validate_private_cursor_doc(raw: unknown): chat_PrivateCursorDoc | null {
	const envelope = public_doc_schema.safeParse(raw);
	if (!envelope.success || envelope.data.ownership !== "owned") {
		return null;
	}
	const parsed = chat_parse_private_cursor_key(envelope.data.key);
	if (parsed === null) {
		return null;
	}
	const value = chat_private_cursor_value_schema.safeParse(envelope.data.value);
	if (!value.success) {
		return null;
	}
	return {
		key: envelope.data.key,
		channelKey: parsed.channelKey,
		createdBy: envelope.data.createdBy,
		at: value.data.at,
		activity: value.data.activity,
		revision: envelope.data.revision,
	};
}

// #endregion document validation

// #region unread state

/**
 * Merges two cursor maps by per-channel maximum. The conflict retry uses it: the winner the
 * watch delivered and the write that lost both carry real read times, and a plain overwrite in
 * either direction would move some channel's cursor backwards.
 */
export function chat_merge_cursor_maps(a: chat_CursorMapValue, b: chat_CursorMapValue): chat_CursorMapValue {
	const channels: Record<string, number> = { ...a.channels };
	for (const [channelKey, at] of Object.entries(b.channels)) {
		const existing = channels[channelKey];
		channels[channelKey] = existing === undefined ? at : Math.max(existing, at);
	}
	return { channels };
}

/** Per-channel unread state folded from the public recent feed against the cursor map. */
export type chat_PublicUnread = {
	/** Messages newer than the cursor, capped by the feed's 100-message horizon. */
	unreadCount: number;
	/** How many of those name the member. */
	mentionCount: number;
	/** The newest unread message, for the Unreads view's one-line preview. */
	latest: chat_Doc<chat_MessageValue>;
};

/**
 * Folds the public recent feed into per-channel unread state. A message counts when it is newer
 * than the channel's cursor, not deleted, and not the member's own. The feed holds only the
 * newest 100 public messages, so a channel whose news has fallen out of it shows as read — the
 * accepted horizon of the zero-write unread design.
 */
export function chat_fold_public_unreads(opts: {
	docs: chat_Doc<chat_MessageValue>[];
	cursorChannels: Record<string, number>;
	selfUserId: string;
}): Map<string, chat_PublicUnread> {
	const result = new Map<string, chat_PublicUnread>();
	for (const doc of opts.docs) {
		const channelKey = chat_message_channel_key(doc.key);
		if (channelKey === null || chat_channel_is_private(channelKey)) {
			continue;
		}
		if (doc.value.deletedAt !== null || doc.createdBy === opts.selfUserId) {
			continue;
		}
		const lastReadMs = opts.cursorChannels[channelKey];
		if (lastReadMs !== undefined && doc.timestamp <= lastReadMs) {
			continue;
		}

		const mention = doc.value.mentions?.includes(opts.selfUserId) ? 1 : 0;
		const existing = result.get(channelKey);
		if (existing === undefined) {
			result.set(channelKey, { unreadCount: 1, mentionCount: mention, latest: doc });
		} else {
			existing.unreadCount += 1;
			existing.mentionCount += mention;
			if (doc.timestamp > existing.latest.timestamp) {
				existing.latest = doc;
			}
		}
	}
	return result;
}

/**
 * Design decision 5's one time ladder for thread summaries and channel recency: relative under
 * 24 hours, clock time within the last 7 days, the absolute date beyond. Message rows do NOT use
 * this — they show clock time and carry the absolute date in their accessible name.
 */
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

// #endregion unread state

// #region HTTP response schemas

/** Response of `POST /api/v1/plugin-data/read`. */
export const chat_plugin_data_read_response_schema = z.object({
	document: public_doc_schema.nullable(),
});

export const chat_files_list_item_schema = z.object({
	path: z.string(),
	name: z.string(),
	kind: z.union([z.literal("file"), z.literal("folder")]),
	nodeId: z.string(),
	contentType: z.string().nullable(),
	updatedAt: z.number(),
});

export type chat_FilesListItem = z.infer<typeof chat_files_list_item_schema>;

/** Response of `POST /api/v1/files/list`. */
export const chat_files_list_response_schema = z.object({
	items: z.array(chat_files_list_item_schema),
	cursor: z.string().nullable(),
	isDone: z.boolean(),
});

/**
 * Response of `POST /api/v1/plugin-data/list`, the deep-history fallback's envelope.
 *
 * `fetchJson` resolves `unknown`. Validate each public-document envelope here so paging can use its
 * key even when the collection-specific validator later drops its value.
 */
export const chat_plugin_data_list_response_schema = z.object({
	documents: z.array(public_doc_schema),
	cursor: z.string().nullable(),
	isDone: z.boolean(),
});

/** Response of `POST /api/v1/files/download-urls`. */
export const chat_download_urls_response_schema = z.object({
	items: z.array(z.object({ fileNodeId: z.string(), url: z.string(), expiresAt: z.number() })),
	errors: z.array(z.object({ fileNodeId: z.string(), message: z.string() })),
	truncated: z.boolean(),
});

// #endregion HTTP response schemas

export function chat_get_error_message(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}
