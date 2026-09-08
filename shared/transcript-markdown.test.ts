// @vitest-environment node
import { describe, expect, test } from "vitest";
import {
	chatbe_bounded_author_name,
	chatbe_channel_header,
	chatbe_collision_slug,
	chatbe_format_message_block,
	chatbe_readme_markdown,
	chatbe_rollover_path,
	chatbe_slug_channel_name,
	chatbe_utf8_byte_size,
} from "./transcript-markdown";

describe("chatbe_format_message_block", () => {
	test("keeps the exact private header, UTC timestamp, marker and reply indent", () => {
		const root = chatbe_format_message_block({
			message: {
				marker: "chan-1:msg1",
				createdAt: Date.UTC(2026, 7, 26, 12, 0),
				authorName: "Alice",
				text: "hello",
				attachments: [],
				editedAt: null,
				deletedAt: null,
			},
			indent: "",
			reactionCounts: new Map(),
		});
		const reply = chatbe_format_message_block({
			message: {
				marker: "chan-1:msg1:reply1",
				createdAt: Date.UTC(2026, 7, 26, 12, 1),
				authorName: "Bob",
				text: "hi",
				attachments: [],
				editedAt: null,
				deletedAt: null,
			},
			indent: "  ",
			reactionCounts: new Map(),
		});
		expect([chatbe_channel_header("general", "Daily talk", true), root, reply].join("\n\n")).toBe(
			[
				"# general",
				"",
				"Private Chitchat channel. This copy starts with access for the channel's members and the organization owner. File managers can change its sharing, including who can read later updates. This file is a derived copy. Edit chat in the Chitchat page, not here.",
				"",
				"Daily talk",
				"",
				"<!-- chitchat:msg:chan-1:msg1 -->",
				"**Alice** · 2026-08-26 12:00 UTC",
				"hello",
				"",
				"  <!-- chitchat:msg:chan-1:msg1:reply1 -->",
				"  **Bob** · 2026-08-26 12:01 UTC",
				"  hi",
			].join("\n"),
		);
	});
	test("keeps attachment names, reaction counts and edit/delete flags", () => {
		const message = {
			marker: "message",
			createdAt: Date.UTC(2026, 7, 26, 12),
			authorName: "Alice",
			text: "hello world",
			attachments: [{ name: "notes.md" }],
			editedAt: 1,
			deletedAt: null as number | null,
		};
		const rendered = chatbe_format_message_block({
			message,
			indent: "",
			reactionCounts: new Map([
				["thumbs_up", 2],
				["heart", 1],
			]),
		});
		expect(rendered).toBe(
			"<!-- chitchat:msg:message -->\n**Alice** · 2026-08-26 12:00 UTC (edited)\nhello world\nattachments: notes.md\nreactions: 👍 2, ❤️ 1",
		);
		const deleted = chatbe_format_message_block({
			message: { ...message, deletedAt: 2 },
			indent: "",
			reactionCounts: new Map(),
		});
		expect(deleted).toBe("<!-- chitchat:msg:message -->\n**Alice** · 2026-08-26 12:00 UTC (edited) (message deleted)");
	});
});

describe("chatbe_rollover_path", () => {
	test("main file has no index and rollovers pad to three digits", () => {
		expect(chatbe_rollover_path("/chitchat", "general", 0)).toBe("/chitchat/general.md");
		expect(chatbe_rollover_path("/chitchat", "general", 1)).toBe("/chitchat/general.001.md");
		expect(chatbe_rollover_path("/chitchat", "general", 12)).toBe("/chitchat/general.012.md");
	});
});

describe("chatbe_slug_channel_name", () => {
	test("keeps plain names and flattens separators and reserved characters", () => {
		expect(chatbe_slug_channel_name("general")).toBe("general");
		expect(chatbe_slug_channel_name("Team Plans / 2026")).toBe("team-plans-2026");
		expect(chatbe_slug_channel_name("a\\b:c*d?")).toBe("a-b-c-d");
		expect(chatbe_slug_channel_name("Café & Tea")).toBe("cafe-tea");
		expect(chatbe_slug_channel_name("README")).toBe("readme-channel");
		expect(chatbe_slug_channel_name("AGENTS")).toBe("agents-channel");
	});

	test("falls back to channel when nothing safe remains", () => {
		expect(chatbe_slug_channel_name("***")).toBe("channel");
		expect(chatbe_slug_channel_name("   ")).toBe("channel");
	});
});

describe("chatbe_collision_slug", () => {
	test("is deterministic and differs per channel key", async () => {
		const first = await chatbe_collision_slug("general", "chan-1");
		const again = await chatbe_collision_slug("general", "chan-1");
		const other = await chatbe_collision_slug("general", "chan-2");

		expect(again).toBe(first);
		expect(other).not.toBe(first);
		expect(first.startsWith("general-")).toBe(true);
		expect(first.length).toBeLessThanOrEqual(120);
	});
});

describe("chatbe_bounded_author_name", () => {
	test("strips control characters, escapes markdown, and bounds the byte size", () => {
		expect(chatbe_bounded_author_name("Alice")).toBe("Alice");
		expect(chatbe_bounded_author_name("A\u0000B")).toBe("A B");
		expect(chatbe_bounded_author_name("**bold**")).toBe("\\*\\*bold\\*\\*");
		expect(chatbe_bounded_author_name(null)).toBeNull();
		expect(chatbe_bounded_author_name("   ")).toBeNull();

		const bounded = chatbe_bounded_author_name("é".repeat(200));
		expect(bounded).not.toBeNull();
		expect(chatbe_utf8_byte_size(bounded!)).toBeLessThanOrEqual(128);
		expect(bounded!.endsWith("�")).toBe(false);
	});
});

describe("chatbe_readme_markdown", () => {
	test("lists channels sorted by name with links to their main files", () => {
		const markdown = chatbe_readme_markdown([
			{ name: "zebra", slug: "zebra" },
			{ name: "general", slug: "general" },
		]);

		expect(markdown.indexOf("- [general](./general.md)")).toBeLessThan(markdown.indexOf("- [zebra](./zebra.md)"));
		expect(markdown).toContain("derived copy");
		expect(markdown).toContain("Later updates follow that sharing, even if channel membership changes.");
		expect(markdown).toContain("File managers can unlock them or apply their own lock");
		expect(markdown).toContain("The `source` label is only a description.");
		expect(markdown).not.toContain("resets each folder's sharing");
	});
});
