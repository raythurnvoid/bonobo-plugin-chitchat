import { describe, expect, test } from "vitest";
import {
	chat_validate_message_doc,
	chat_validate_reaction_doc,
	type chat_MessageValue,
	type chat_ReactionDoc,
} from "./chat-data";
import {
	chat_count_replies,
	chat_create_accumulating_store,
	chat_create_window_store,
	chat_format_reply_count,
	chat_group_reactions,
} from "./chat-store";

function inv(epochMs: number): string {
	return String(9_999_999_999_999 - epochMs).padStart(13, "0");
}

const CHANNEL_KEY = `${inv(1_000)}:chan`;

function message_key(epochMs: number, rand = "aaaa"): string {
	return `${CHANNEL_KEY}:${inv(epochMs)}:${rand}`;
}

function message_doc(
	epochMs: number,
	overrides: { rand?: string; text?: string; revision?: number; createdBy?: string; deletedAt?: number | null } = {},
): Record<string, unknown> {
	return {
		collection: "messages",
		key: message_key(epochMs, overrides.rand ?? "aaaa"),
		value: {
			text: overrides.text ?? `text-${epochMs}`,
			attachments: [],
			editedAt: null,
			deletedAt: overrides.deletedAt ?? null,
		} satisfies chat_MessageValue,
		revision: overrides.revision ?? 1,
		createdBy: overrides.createdBy ?? "user_a",
		updatedBy: overrides.createdBy ?? "user_a",
		ownership: "owned",
		createdAt: epochMs,
		updatedAt: epochMs,
	};
}

function reaction_doc(targetKey: string, token: string, createdBy: string, keyTail = createdBy): Record<string, unknown> {
	return {
		collection: "reactions",
		key: `${targetKey}:${token}:${keyTail}`,
		value: {},
		revision: 1,
		createdBy,
		updatedBy: createdBy,
		ownership: "owned",
		createdAt: 1,
		updatedAt: 1,
	};
}

describe("chat_create_accumulating_store", () => {
	test("keeps a message that fell out of a later watch window", () => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		// Window 1 holds M1 and M2; in window 2, M1 has fallen out (overflowed by M3).
		store.apply_window([message_doc(1_000, { rand: "m1" }), message_doc(2_000, { rand: "m2" })]);
		store.apply_window([message_doc(3_000, { rand: "m3" }), message_doc(2_000, { rand: "m2" })]);

		const keys = store.get_sorted().map((doc) => doc.key);
		expect(keys).toContain(message_key(1_000, "m1"));
		expect(keys).toHaveLength(3);
	});

	test("merges an overlapping HTTP page with the watch window, each key exactly once", () => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		store.apply_window([message_doc(3_000, { rand: "m3" }), message_doc(2_000, { rand: "m2" })]);
		store.apply_page([message_doc(2_000, { rand: "m2" }), message_doc(1_000, { rand: "m1" })]);

		const keys = store.get_sorted().map((doc) => doc.key);
		expect(keys).toEqual([message_key(3_000, "m3"), message_key(2_000, "m2"), message_key(1_000, "m1")]);
	});

	test("sorts ascending by key, which is newest first with inverted keys", () => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		store.apply_window([message_doc(1_000, { rand: "m1" }), message_doc(5_000, { rand: "m5" })]);
		const sorted = store.get_sorted();
		expect(sorted[0].timestamp).toBe(5_000);
		expect(sorted[1].timestamp).toBe(1_000);
	});

	test("a tombstone keeps the key and replaces the value in place", () => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		store.apply_window([message_doc(2_000, { rand: "m2", text: "hello" })]);
		store.apply_window([message_doc(2_000, { rand: "m2", revision: 2, deletedAt: 9_000 })]);

		const sorted = store.get_sorted();
		expect(sorted).toHaveLength(1);
		expect(sorted[0].key).toBe(message_key(2_000, "m2"));
		expect(sorted[0].value.deletedAt).toBe(9_000);
	});

	test("an edit with a higher revision replaces the text; a stale lower revision does not", () => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		store.apply_window([message_doc(2_000, { rand: "m2", text: "first", revision: 1 })]);
		store.apply_window([message_doc(2_000, { rand: "m2", text: "edited", revision: 3 })]);
		expect(store.get_sorted()[0].value.text).toBe("edited");

		store.apply_page([message_doc(2_000, { rand: "m2", text: "stale", revision: 2 })]);
		expect(store.get_sorted()).toHaveLength(1);
		expect(store.get_sorted()[0].value.text).toBe("edited");
	});

	test("drops and counts poisoned payload docs while keeping the valid rest", () => {
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		store.apply_window([
			message_doc(1_000, { rand: "m1" }),
			{ collection: "messages", key: "junk", value: { garbage: true } },
			null,
			message_doc(2_000, { rand: "m2", text: "ok" }),
			{ ...message_doc(3_000, { rand: "m3" }), value: { text: 42 } },
		]);

		expect(store.get_sorted()).toHaveLength(2);
		expect(store.dropped_count()).toBe(3);
	});
});

describe("chat_create_window_store", () => {
	test("replaces the whole window: a reaction absent from the next update disappears", () => {
		const store = chat_create_window_store(chat_validate_reaction_doc);
		const target = message_key(2_000);
		store.apply_window([reaction_doc(target, "heart", "user_a"), reaction_doc(target, "heart", "user_b")]);
		expect(store.get_all()).toHaveLength(2);

		store.apply_window([reaction_doc(target, "heart", "user_b")]);
		const remaining = store.get_all();
		expect(remaining).toHaveLength(1);
		expect(remaining[0]?.createdBy).toBe("user_b");
	});

	test("drops and counts invalid reaction docs", () => {
		const store = chat_create_window_store(chat_validate_reaction_doc);
		const target = message_key(2_000);
		store.apply_window([reaction_doc(target, "heart", "user_a"), reaction_doc(target, "sparkles", "user_a"), 42]);
		expect(store.get_all()).toHaveLength(1);
		expect(store.dropped_count()).toBe(2);
	});
});

describe("chat_group_reactions", () => {
	function as_reaction(raw: Record<string, unknown>): chat_ReactionDoc {
		const doc = chat_validate_reaction_doc(raw);
		if (doc === null) {
			throw new Error("fixture reaction doc is invalid");
		}
		return doc;
	}

	test("groups by token with distinct reactors and marks the caller's own reaction", () => {
		const target = message_key(2_000);
		const groups = chat_group_reactions(
			[
				as_reaction(reaction_doc(target, "heart", "user_a")),
				as_reaction(reaction_doc(target, "heart", "user_b")),
				as_reaction(reaction_doc(target, "party", "user_b")),
			],
			"user_a",
		);
		expect(groups.get(target)).toEqual([
			{ token: "heart", count: 2, reactedByMe: true },
			{ token: "party", count: 1, reactedByMe: false },
		]);
	});

	test("a forged doc whose key tail names another user counts under createdBy", () => {
		const target = message_key(2_000);
		// user_b smuggled user_a's id into the caller key part; the server stamped createdBy user_b.
		const forged = as_reaction(reaction_doc(target, "heart", "user_b", "user_a"));
		const genuine = as_reaction(reaction_doc(target, "heart", "user_b"));

		const groups = chat_group_reactions([forged, genuine], "user_a");
		// Both docs belong to user_b, so the count stays 1 and user_a is NOT marked as a reactor.
		expect(groups.get(target)).toEqual([{ token: "heart", count: 1, reactedByMe: false }]);
	});
});

describe("chat_count_replies", () => {
	test("counts replies per root key and ignores junk keys", () => {
		const root = message_key(2_000);
		const docs = [1_000, 1_001, 1_002].map((ms) => ({
			...message_doc(0, {}),
			collection: "replies",
			key: `${root}:${inv(ms)}:r${ms}`,
		}));
		const store = chat_create_accumulating_store(chat_validate_message_doc);
		store.apply_window(docs);
		const counts = chat_count_replies(store.get_sorted());
		expect(counts.get(root)).toBe(3);
	});
});

describe("chat_format_reply_count", () => {
	test("caps the display at 99+", () => {
		expect(chat_format_reply_count(3)).toBe("3");
		expect(chat_format_reply_count(99)).toBe("99");
		expect(chat_format_reply_count(100)).toBe("99+");
	});
});
