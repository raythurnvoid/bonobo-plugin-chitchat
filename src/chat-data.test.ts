import { describe, expect, test } from "vitest";
import {
	chat_channel_value_schema,
	chat_create_channel_key,
	chat_key_timestamp,
	chat_message_key_prefix,
	chat_message_value_schema,
	chat_parse_reaction_key,
	chat_reaction_caller_key,
	chat_reply_key_prefix,
	chat_reply_root_key,
	chat_validate_channel_doc,
	chat_validate_message_doc,
	chat_validate_reaction_doc,
} from "./chat-data";

/** Builds the server's inverted 13-digit key segment for an epoch-ms timestamp. */
function inv(epochMs: number): string {
	return String(9_999_999_999_999 - epochMs).padStart(13, "0");
}

/** Channel keys are client-generated UUIDs; a fixed one keeps the fixtures readable. */
const CHANNEL_KEY = "a3f0c9e2-6a52-4d1c-9a41-2f8e5b7c1d20";

function message_key(channelKey: string, epochMs: number, rand = "bbbb"): string {
	return `${channelKey}:${inv(epochMs)}:${rand}`;
}

function doc_envelope(overrides: Record<string, unknown>): Record<string, unknown> {
	return {
		collection: "messages",
		key: message_key(CHANNEL_KEY, 2_000),
		value: { text: "hi", attachments: [], editedAt: null, deletedAt: null },
		revision: 1,
		createdBy: "user_a",
		updatedBy: "user_a",
		ownership: "owned",
		createdAt: 2_000,
		updatedAt: 2_000,
		...overrides,
	};
}

describe("chat_key_timestamp", () => {
	test("round-trips message and reply keys", () => {
		const messageKey = message_key(CHANNEL_KEY, 1_700_000_000_500);
		const replyKey = `${messageKey}:${inv(1_700_000_001_000)}:cccc`;
		expect(chat_key_timestamp(messageKey)).toBe(1_700_000_000_500);
		expect(chat_key_timestamp(replyKey)).toBe(1_700_000_001_000);
	});

	test("refuses keys without the inverted 13-digit tail, client channel keys included", () => {
		expect(chat_key_timestamp("plain-key")).toBeNull();
		expect(chat_key_timestamp("123:aaaa")).toBeNull();
		expect(chat_key_timestamp(`${inv(1_000)}`)).toBeNull();
		expect(chat_key_timestamp(CHANNEL_KEY)).toBeNull();
	});

	test("a later message sorts lexicographically before an earlier one", () => {
		const earlier = message_key(CHANNEL_KEY, 5_000);
		const later = message_key(CHANNEL_KEY, 5_005);
		expect(later < earlier).toBe(true);
	});
});

describe("key builders", () => {
	test("chat_create_channel_key mints unique printable-ASCII keys with prefix room to spare", () => {
		const key = chat_create_channel_key();
		expect(key).toMatch(/^[\x21-\x7E]+$/);
		expect(key).not.toBe(chat_create_channel_key());
		// The key must still work as a message keyPrefix: channel + message tail (19) +
		// reply tail (19) + longest token (10) + server user-id suffix (33) within 128.
		expect(key.length + 19 + 19 + 10 + 33).toBeLessThanOrEqual(128);
	});

	test("prefixes end with a colon so the channel key is a strict prefix", () => {
		expect(chat_message_key_prefix(CHANNEL_KEY)).toBe(`${CHANNEL_KEY}:`);
		const messageKey = message_key(CHANNEL_KEY, 2_000);
		expect(chat_reply_key_prefix(messageKey)).toBe(`${messageKey}:`);
	});

	test("a worst-case reply-reaction stored key stays inside the 128-char limit", () => {
		// channel uuid (36) : message tail (18) : reply tail (18) : longest token (9) : user id.
		const messageKey = message_key(CHANNEL_KEY, 0);
		const replyKey = `${messageKey}:${inv(0)}:dddd`;
		const callerKey = chat_reaction_caller_key(replyKey, "thumbs_up");
		// Convex ids are ~32 chars; the server appends ":<userId>".
		const storedKey = `${callerKey}:${"k".repeat(32)}`;
		expect(storedKey.length).toBeLessThanOrEqual(128);
	});
});

describe("chat_parse_reaction_key", () => {
	test("splits the target key, token, and server-appended user id", () => {
		const messageKey = message_key(CHANNEL_KEY, 2_000);
		const parsed = chat_parse_reaction_key(`${messageKey}:heart:user_b`);
		expect(parsed).toEqual({ targetKey: messageKey, token: "heart", keyTailUserId: "user_b" });
	});

	test("refuses unknown tokens and malformed keys", () => {
		const messageKey = message_key(CHANNEL_KEY, 2_000);
		expect(chat_parse_reaction_key(`${messageKey}:sparkles:user_b`)).toBeNull();
		expect(chat_parse_reaction_key("heart:user_b")).toBeNull();
		expect(chat_parse_reaction_key(`junk:heart:user_b`)).toBeNull();
	});
});

describe("chat_reply_root_key", () => {
	test("returns the root message key of a reply key", () => {
		const messageKey = message_key(CHANNEL_KEY, 2_000);
		const replyKey = `${messageKey}:${inv(3_000)}:cccc`;
		expect(chat_reply_root_key(replyKey)).toBe(messageKey);
	});

	test("refuses keys that are not reply-shaped", () => {
		expect(chat_reply_root_key(message_key(CHANNEL_KEY, 2_000))).toBeNull();
		expect(chat_reply_root_key("junk:junk:junk:junk:junk:junk")).toBeNull();
	});
});

describe("value schemas", () => {
	test("channel names must be 1-64 characters", () => {
		expect(chat_channel_value_schema.safeParse({ name: "general", archivedAt: null }).success).toBe(true);
		expect(chat_channel_value_schema.safeParse({ name: "", archivedAt: null }).success).toBe(false);
		expect(chat_channel_value_schema.safeParse({ name: "x".repeat(65), archivedAt: null }).success).toBe(false);
	});

	test("message values validate text, attachments, and the tombstone fields", () => {
		expect(
			chat_message_value_schema.safeParse({
				text: "hi",
				attachments: [{ fileNodeId: "n1", name: "a.png" }],
				editedAt: null,
				deletedAt: 123,
			}).success,
		).toBe(true);
		expect(chat_message_value_schema.safeParse({ text: "hi" }).success).toBe(false);
		expect(
			chat_message_value_schema.safeParse({ text: "hi", attachments: [{ fileNodeId: "" }], editedAt: null, deletedAt: null })
				.success,
		).toBe(false);
	});
});

describe("document validation", () => {
	test("accepts a well-formed message doc and reads the timestamp from the key", () => {
		const doc = chat_validate_message_doc(doc_envelope({}));
		expect(doc).not.toBeNull();
		expect(doc?.timestamp).toBe(2_000);
		expect(doc?.value.text).toBe("hi");
	});

	test("drops docs with a foreign key, a bad value, or a broken envelope", () => {
		expect(chat_validate_message_doc(doc_envelope({ key: "not-a-chat-key" }))).toBeNull();
		expect(chat_validate_message_doc(doc_envelope({ value: { nope: true } }))).toBeNull();
		expect(chat_validate_message_doc({ key: 42 })).toBeNull();
		expect(chat_validate_message_doc(null)).toBeNull();
	});

	test("validates channel docs", () => {
		const raw = doc_envelope({
			collection: "channels",
			key: CHANNEL_KEY,
			value: { name: "general", archivedAt: null },
		});
		expect(chat_validate_channel_doc(raw)?.value.name).toBe("general");
		// Client-generated channel keys carry no server time tail; createdAt stands in.
		expect(chat_validate_channel_doc(raw)?.timestamp).toBe(2_000);
		expect(chat_validate_channel_doc(doc_envelope({ key: CHANNEL_KEY, value: { name: "" } }))).toBeNull();
	});

	test("validates reaction docs and parses their key parts", () => {
		const messageKey = message_key(CHANNEL_KEY, 2_000);
		const raw = doc_envelope({
			collection: "reactions",
			key: `${messageKey}:party:user_b`,
			value: {},
			createdBy: "user_b",
		});
		const doc = chat_validate_reaction_doc(raw);
		expect(doc).toEqual({
			key: `${messageKey}:party:user_b`,
			targetKey: messageKey,
			token: "party",
			createdBy: "user_b",
			revision: 1,
		});
		expect(chat_validate_reaction_doc(doc_envelope({ key: `${messageKey}:sparkles:user_b`, value: {} }))).toBeNull();
	});
});
