import { describe, expect, test } from "vitest";
import {
	chat_ANONYMOUS_MEMBER_LABEL,
	chat_channel_is_private,
	chat_channel_value_schema,
	chat_create_channel_key,
	chat_filter_mention_members,
	chat_insert_mention,
	chat_key_timestamp,
	chat_member_label,
	chat_mention_ids_still_in_text,
	chat_mention_query_at,
	chat_mention_roster_refusal_copy,
	chat_message_key_prefix,
	chat_message_value_schema,
	chat_parse_reaction_key,
	chat_plugin_data_list_response_schema,
	chat_plugin_data_read_response_schema,
	chat_private_channel_key_is_valid,
	chat_reaction_caller_key,
	chat_reply_key_prefix,
	chat_reply_root_key,
	chat_root_message_key,
	chat_validate_channel_doc,
	chat_validate_message_doc,
	chat_validate_private_cursor_doc,
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
		for (const visibility of ["public", "private"] as const) {
			const key = chat_create_channel_key(visibility);
			expect(key).toMatch(/^[\x21-\x7E]+$/);
			expect(key).not.toBe(chat_create_channel_key(visibility));
			// The key must still work as a message keyPrefix: channel + message tail (19) +
			// reply tail (19) + longest token (10) + server user-id suffix (33) within 128.
			expect(key.length + 19 + 19 + 10 + 33).toBeLessThanOrEqual(128);
			// A private channel is told apart by its key alone, and by nothing else. The key never
			// changes, while a flag in the channel value would be rewritable by anybody who sees it.
			expect(chat_channel_is_private(key)).toBe(visibility === "private");
		}
	});

	test("a private channel key carries no colon, so every key parser still counts the same parts", () => {
		const key = chat_create_channel_key("private");
		expect(chat_private_channel_key_is_valid(key)).toBe(true);
		const messageKey = message_key(key, 3_000);
		const replyKey = message_key(messageKey, 3_100);
		expect(key).not.toContain(":");
		expect(chat_reply_root_key(replyKey)).toBe(messageKey);
		expect(chat_parse_reaction_key(`${messageKey}:heart:user_1`)).toEqual({
			targetKey: messageKey,
			token: "heart",
			keyTailUserId: "user_1",
		});
	});

	test("the private-channel contract needs one exact p/ UUID", () => {
		expect(chat_private_channel_key_is_valid(`p/${CHANNEL_KEY}`)).toBe(true);
		expect(chat_private_channel_key_is_valid(CHANNEL_KEY)).toBe(false);
		expect(chat_private_channel_key_is_valid("p/")).toBe(false);
		expect(chat_private_channel_key_is_valid("p/not-a-uuid")).toBe(false);
		expect(chat_private_channel_key_is_valid(`p/${CHANNEL_KEY}:child`)).toBe(false);
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

describe("chat_root_message_key", () => {
	test("keeps full public and private roots and strips full reply tails", () => {
		const publicRoot = message_key(CHANNEL_KEY, 2_000, "aa00");
		const privateRoot = message_key(`p/${CHANNEL_KEY}`, 2_000, "aaff");
		expect(chat_root_message_key(publicRoot)).toBe(publicRoot);
		expect(chat_root_message_key(privateRoot)).toBe(privateRoot);
		expect(chat_root_message_key(`${publicRoot}:${inv(3_000)}:r001`)).toBe(publicRoot);
		expect(chat_root_message_key(`${privateRoot}:${inv(3_000)}:r002`)).toBe(privateRoot);
	});

	test("refuses malformed, nested, and stored reaction keys", () => {
		const root = message_key(CHANNEL_KEY, 2_000);
		expect(chat_root_message_key("not-a-message")).toBeNull();
		expect(chat_root_message_key(`${root}:${inv(3_000)}:r001:${inv(4_000)}:nested`)).toBeNull();
		expect(chat_root_message_key(`${root}:heart:user_b`)).toBeNull();
	});
});

describe("value schemas", () => {
	test("channel names must be 1-64 characters", () => {
		expect(chat_channel_value_schema.safeParse({ name: "general", archivedAt: null }).success).toBe(true);
		expect(chat_channel_value_schema.safeParse({ name: "", archivedAt: null }).success).toBe(false);
		expect(chat_channel_value_schema.safeParse({ name: "x".repeat(65), archivedAt: null }).success).toBe(false);
	});

	test("channel topics are optional and capped", () => {
		// A channel stored before the topic existed carries none, and it must still parse. If it did
		// not, every such channel would be dropped on read and the workspace would show no channels.
		expect(chat_channel_value_schema.safeParse({ name: "general", archivedAt: null }).success).toBe(true);
		expect(chat_channel_value_schema.safeParse({ name: "general", archivedAt: null, topic: "" }).success).toBe(true);
		expect(
			chat_channel_value_schema.safeParse({ name: "general", archivedAt: null, topic: "x".repeat(250) }).success,
		).toBe(true);
		expect(
			chat_channel_value_schema.safeParse({ name: "general", archivedAt: null, topic: "x".repeat(251) }).success,
		).toBe(false);
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
			chat_message_value_schema.safeParse({
				text: "hi",
				attachments: [{ fileNodeId: "" }],
				editedAt: null,
				deletedAt: null,
			}).success,
		).toBe(false);
	});
});

describe("chat_plugin_data_list_response_schema", () => {
	test("rejects an envelope with no documents and keeps a null cursor", () => {
		// The deep-history fallback reads this off `fetchJson`, which resolves `unknown`. The store
		// validates each document but never the envelope, so this is the only check on the shape the
		// page destructures.
		expect(chat_plugin_data_list_response_schema.safeParse({ cursor: null, isDone: true }).success).toBe(false);
		expect(chat_plugin_data_list_response_schema.safeParse({ documents: [], cursor: 7, isDone: true }).success).toBe(
			false,
		);

		const parsed = chat_plugin_data_list_response_schema.safeParse({
			documents: [
				{
					collection: "messages",
					key: "anything",
					value: { futureField: true },
					revision: 1,
					createdBy: "user_1",
					updatedBy: "user_1",
					ownership: "shared",
					createdAt: 1,
					updatedAt: 1,
				},
			],
			cursor: null,
			isDone: false,
		});
		// The full envelope and unknown value fields must survive for the collection validator.
		expect(parsed.success && parsed.data).toEqual({
			documents: [
				{
					collection: "messages",
					key: "anything",
					value: { futureField: true },
					revision: 1,
					createdBy: "user_1",
					updatedBy: "user_1",
					ownership: "shared",
					createdAt: 1,
					updatedAt: 1,
				},
			],
			cursor: null,
			isDone: false,
		});
		expect(
			chat_plugin_data_list_response_schema.safeParse({
				documents: [{ key: "no public envelope" }],
				cursor: null,
				isDone: false,
			}).success,
		).toBe(false);
	});
});

describe("chat_plugin_data_read_response_schema", () => {
	test("requires the document field and accepts a missing stored document", () => {
		expect(chat_plugin_data_read_response_schema.safeParse({}).success).toBe(false);
		expect(chat_plugin_data_read_response_schema.safeParse({ document: null }).success).toBe(true);
		expect(chat_plugin_data_read_response_schema.safeParse({ document: doc_envelope({}) }).success).toBe(true);
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

	test("accepts only owned private cursor documents", () => {
		const key = `p/${CHANNEL_KEY}:read:user_me`;
		const raw = doc_envelope({
			collection: "channels",
			key,
			value: { at: 3_000, activity: { messages: 4, replies: 2 } },
			ownership: "owned",
		});
		expect(chat_validate_private_cursor_doc(raw)).toMatchObject({
			key,
			channelKey: `p/${CHANNEL_KEY}`,
			createdBy: "user_a",
			at: 3_000,
			activity: { messages: 4, replies: 2 },
			revision: 1,
		});
		expect(chat_validate_private_cursor_doc({ ...raw, ownership: "shared" })).toBeNull();
		expect(chat_validate_private_cursor_doc({ ...raw, value: { at: 3_000 } })).toMatchObject({
			at: 3_000,
			activity: { messages: 0, replies: 0 },
		});
		expect(
			chat_validate_private_cursor_doc({
				...raw,
				value: { at: 3_000, activity: { messages: -1, replies: 0 } },
			}),
		).toBeNull();
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
			updatedAt: 2_000,
			removed: false,
		});
		expect(chat_validate_reaction_doc(doc_envelope({ key: `${messageKey}:sparkles:user_b`, value: {} }))).toBeNull();
		const marker = chat_validate_reaction_doc(
			doc_envelope({
				collection: "reactions",
				key: `${messageKey}:party:user_b`,
				value: { removed: true },
				createdBy: "user_b",
			}),
		);
		expect(marker?.removed).toBe(true);
	});
});

describe("chat_mention_query_at", () => {
	test("opens on an isolated @ and keeps the letters after it as the query", () => {
		expect(chat_mention_query_at("Hi @Bo", 6)).toEqual({ start: 3, query: "Bo" });
		expect(chat_mention_query_at("@", 1)).toEqual({ start: 0, query: "" });
	});

	test("ignores an @ that is stuck to the previous word", () => {
		expect(chat_mention_query_at("hello@x", 7)).toBeNull();
		expect(chat_mention_query_at("Hi @Bo there", 12)).toBeNull();
	});
});

describe("chat_filter_mention_members", () => {
	const roster = [
		{ userId: "user_me", displayName: "Me" },
		{ userId: "user_bob", displayName: "Bob" },
		{ userId: "user_cleo", displayName: "Cleo Pane" },
		{ userId: "user_anon", displayName: null },
	];

	test("filters by case-insensitive substring, excludes the sender, and sorts by label", () => {
		expect(chat_filter_mention_members(roster, "o", "user_me").map((member) => member.label)).toEqual([
			"Bob",
			"Cleo Pane",
			chat_ANONYMOUS_MEMBER_LABEL,
		]);
		expect(chat_filter_mention_members(roster, "PANE", "user_me").map((member) => member.userId)).toEqual([
			"user_cleo",
		]);
	});

	test("a null display name uses the same anonymous label the people picker uses", () => {
		expect(chat_member_label(null)).toBe(chat_ANONYMOUS_MEMBER_LABEL);
		expect(chat_filter_mention_members(roster, "someone", "user_me")).toEqual([
			{ userId: "user_anon", displayName: null, label: chat_ANONYMOUS_MEMBER_LABEL },
		]);
	});
});

describe("chat_insert_mention", () => {
	test("replaces the @query with @Name and a trailing space", () => {
		expect(chat_insert_mention("Hi @B", 3, 5, "Bob")).toEqual({ text: "Hi @Bob ", caret: 8 });
	});

	test("keeps the ids whose @Name still stands in the sent text", () => {
		const chosen: Array<readonly [string, string]> = [
			["user_bob", "Bob"],
			["user_cleo", "Cleo"],
		];
		expect(chat_mention_ids_still_in_text(chosen, "Hi @Bob")).toEqual(["user_bob"]);
	});
});

describe("chat_mention_roster_refusal_copy", () => {
	test("not_consented tells the member an admin must accept the current permissions", () => {
		expect(chat_mention_roster_refusal_copy("not_consented")).toContain(
			"has not allowed Chitchat to read the member list",
		);
	});

	test("any other refusal keeps the composer usable", () => {
		expect(chat_mention_roster_refusal_copy("unavailable")).toContain("not available right now");
	});
});
