import { z } from "zod";

/**
 * The fixed reaction palette. Tokens (not raw emoji) live in document keys because the
 * store refuses non-ASCII key characters; the emoji are only how the page renders them.
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
 * Channel keys are client-generated so channels are created through `put`, which makes the
 * doc SHARED — any member can rename or archive it. A UUID is printable ASCII and short
 * enough (36 chars) to leave room for the message and reply segments under the 128 budget.
 */
export function chat_create_channel_key(): string {
	return crypto.randomUUID();
}

/** Message keys are `<channelKey>:<invertedPaddedMs>:<rand4>` — appended under this prefix. */
export function chat_message_key_prefix(channelKey: string) {
	return `${channelKey}:`;
}

/** Reply keys are `<rootMessageKey>:<invertedPaddedMs>:<rand4>` — appended under this prefix. */
export function chat_reply_key_prefix(rootMessageKey: string) {
	return `${rootMessageKey}:`;
}

/**
 * The caller key for putOwned/removeOwned on a reaction. The server appends `:<userId>`,
 * so the stored key is `<messageKey>:<token>:<userId>` and nobody can forge another
 * member's reaction key through this op.
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

// #region value schemas

export const chat_CHANNEL_NAME_MAX_LENGTH = 64;

export const chat_channel_value_schema = z.object({
	name: z.string().min(1).max(chat_CHANNEL_NAME_MAX_LENGTH),
	archivedAt: z.number().nullable(),
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
});

export type chat_MessageValue = z.infer<typeof chat_message_value_schema>;

// #endregion value schemas

// #region document validation

/**
 * The PublicDoc envelope every read surface returns (watch updates and the HTTP list
 * route alike). The store is a generic multi-writer surface, so every doc is runtime
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

/** A validated reaction document with its parsed key parts. The value carries nothing. */
export type chat_ReactionDoc = {
	key: string;
	targetKey: string;
	token: chat_ReactionToken;
	createdBy: string;
	revision: number;
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
	return {
		key: envelope.data.key,
		targetKey: parsed.targetKey,
		token: parsed.token,
		createdBy: envelope.data.createdBy,
		revision: envelope.data.revision,
	};
}

// #endregion document validation

// #region HTTP response schemas

/** Response of `POST /api/v1/plugin-data/list`. Documents are validated one by one later. */
export const chat_plugin_data_list_response_schema = z.object({
	documents: z.array(z.unknown()),
	cursor: z.string().nullable(),
	isDone: z.boolean(),
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
