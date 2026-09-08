import { describe, expect, test } from "vitest";
import {
	chat_ANONYMOUS_MEMBER_LABEL,
	chat_filter_mention_members,
	chat_insert_mention,
	chat_member_label,
	chat_mention_ids_still_in_text,
	chat_mention_query_at,
} from "./chat-display";

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
