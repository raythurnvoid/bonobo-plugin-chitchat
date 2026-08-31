// @vitest-environment node
import { describe, expect, test } from "vitest";
import {
	chatbe_bounded_author_name,
	chatbe_build_channel_markdown,
	chatbe_collision_slug,
	chatbe_file_contains_block,
	chatbe_format_message_block,
	chatbe_insert_reply_block,
	chatbe_readme_markdown,
	chatbe_replace_header,
	chatbe_rollover_path,
	chatbe_ROLLOVER_MAX_BYTES,
	chatbe_slug_channel_name,
	chatbe_splice_block,
	chatbe_split_rollover,
	chatbe_utf8_byte_size,
	type chatbe_ChannelProjectionInput,
} from "./markdown";

const names = new Map<string, string | null>([
	["user_alice", "Alice"],
	["user_bob", "Bob"],
	["user_anon", null],
]);

describe("chatbe_build_channel_markdown", () => {
	test("formats a message with edit, attachments, reactions, and a nested reply", () => {
		const built = chatbe_build_channel_markdown({
			channelKey: "chan-1",
			channelName: "general",
			topic: null,
			isPrivate: false,
			messages: [
				{
					key: "chan-1:msg1",
					createdAt: Date.UTC(2026, 7, 26, 12, 0),
					createdBy: "user_alice",
					value: {
						text: "hello world",
						attachments: [{ name: "notes.md" }],
						editedAt: Date.UTC(2026, 7, 26, 12, 5),
						deletedAt: null,
					},
				},
			],
			repliesByRootKey: new Map([
				[
					"chan-1:msg1",
					[
						{
							key: "chan-1:msg1:reply1",
							createdAt: Date.UTC(2026, 7, 26, 12, 1),
							createdBy: "user_bob",
							value: { text: "hi", attachments: [], editedAt: null, deletedAt: null },
						},
					],
				],
			]),
			reactionsByTargetKey: new Map([
				[
					"chan-1:msg1",
					[
						{ targetKey: "chan-1:msg1", token: "thumbs_up", removed: false },
						{ targetKey: "chan-1:msg1", token: "thumbs_up", removed: false },
						{ targetKey: "chan-1:msg1", token: "heart", removed: false },
						{ targetKey: "chan-1:msg1", token: "laugh", removed: true },
					],
				],
			]),
			displayNames: names,
		});

		expect(built.markdown).toContain("# general");
		expect(built.markdown).toContain("<!-- chitchat:msg:chan-1:msg1 -->");
		expect(built.markdown).toContain("**Alice** · 2026-08-26 12:00 UTC (edited)");
		expect(built.markdown).toContain("hello world");
		expect(built.markdown).toContain("attachments: notes.md");
		expect(built.markdown).toContain("reactions: 👍 2, ❤️ 1");
		expect(built.markdown).not.toContain("😂");
		expect(built.markdown).toContain("  <!-- chitchat:msg:chan-1:msg1:reply1 -->");
		expect(built.markdown).toContain("  **Bob** · 2026-08-26 12:01 UTC");
		expect(built.markdown).toContain("  hi");
	});

	test("keeps a deleted message as a tombstone and uses the missing-name label", () => {
		const built = chatbe_build_channel_markdown({
			channelKey: "chan-1",
			channelName: "general",
			topic: null,
			isPrivate: false,
			messages: [
				{
					key: "chan-1:msg1",
					createdAt: Date.UTC(2026, 7, 26, 12, 0),
					createdBy: "user_anon",
					value: { text: "secret", attachments: [], editedAt: null, deletedAt: Date.UTC(2026, 7, 26, 12, 2) },
				},
			],
			repliesByRootKey: new Map(),
			reactionsByTargetKey: new Map(),
			displayNames: names,
		});

		expect(built.markdown).toContain("**Someone with no name yet**");
		expect(built.markdown).toContain("(message deleted)");
		expect(built.markdown).not.toContain("secret");
	});

	test("rebuilds the same markdown twice from the same store docs", () => {
		const input: chatbe_ChannelProjectionInput = {
			channelKey: "chan-1",
			channelName: "general",
			topic: null,
			isPrivate: false,
			messages: [
				{
					key: "chan-1:msg1",
					createdAt: 1,
					createdBy: "user_alice",
					value: { text: "hello", attachments: [], editedAt: null, deletedAt: null },
				},
			],
			repliesByRootKey: new Map(),
			reactionsByTargetKey: new Map(),
			displayNames: names,
		};

		expect(chatbe_build_channel_markdown(input).markdown).toBe(chatbe_build_channel_markdown(input).markdown);
	});

	test("keeps a stable block id across a rebuild that only adds a later message", () => {
		const first = chatbe_build_channel_markdown({
			channelKey: "chan-1",
			channelName: "general",
			topic: null,
			isPrivate: false,
			messages: [
				{
					key: "chan-1:msg1",
					createdAt: 1,
					createdBy: "user_alice",
					value: { text: "hello", attachments: [], editedAt: null, deletedAt: null },
				},
			],
			repliesByRootKey: new Map(),
			reactionsByTargetKey: new Map(),
			displayNames: names,
		});
		const second = chatbe_build_channel_markdown({
			channelKey: "chan-1",
			channelName: "general",
			topic: null,
			isPrivate: false,
			messages: [
				{
					key: "chan-1:msg1",
					createdAt: 1,
					createdBy: "user_alice",
					value: { text: "hello", attachments: [], editedAt: null, deletedAt: null },
				},
				{
					key: "chan-1:msg2",
					createdAt: 2,
					createdBy: "user_bob",
					value: { text: "later", attachments: [], editedAt: null, deletedAt: null },
				},
			],
			repliesByRootKey: new Map(),
			reactionsByTargetKey: new Map(),
			displayNames: names,
		});

		expect(first.markdown).toContain("<!-- chitchat:msg:chan-1:msg1 -->");
		expect(second.markdown).toContain("<!-- chitchat:msg:chan-1:msg1 -->");
		expect(second.markdown).toContain("<!-- chitchat:msg:chan-1:msg2 -->");
	});

	test("byte-exact fixture: one message with a reply", () => {
		const built = chatbe_build_channel_markdown({
			channelKey: "chan-1",
			channelName: "general",
			topic: "Daily talk",
			isPrivate: true,
			messages: [
				{
					key: "chan-1:msg1",
					createdAt: Date.UTC(2026, 7, 26, 12, 0),
					createdBy: "user_alice",
					value: { text: "hello", attachments: [], editedAt: null, deletedAt: null },
				},
			],
			repliesByRootKey: new Map([
				[
					"chan-1:msg1",
					[
						{
							key: "chan-1:msg1:reply1",
							createdAt: Date.UTC(2026, 7, 26, 12, 1),
							createdBy: "user_bob",
							value: { text: "hi", attachments: [], editedAt: null, deletedAt: null },
						},
					],
				],
			]),
			reactionsByTargetKey: new Map(),
			displayNames: names,
		});

		expect(built.markdown).toBe(
			[
				"# general",
				"",
				"Private Chitchat channel. Only the people in this channel can read this file — and the organization owner, who can read everything in this workspace. This file is a derived copy. Edit chat in the Chitchat page, not here.",
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
});

describe("chatbe_format_message_block", () => {
	test("renders precomputed reaction counts the same as raw reaction docs", () => {
		const message = {
			key: "chan-1:msg1",
			createdAt: 1,
			createdBy: "user_alice",
			value: { text: "hello", attachments: [], editedAt: null, deletedAt: null },
		};

		const fromDocs = chatbe_format_message_block({
			message,
			indent: "",
			displayNames: names,
			reactions: [
				{ targetKey: "chan-1:msg1", token: "thumbs_up", removed: false },
				{ targetKey: "chan-1:msg1", token: "thumbs_up", removed: false },
			],
		});
		const fromCounts = chatbe_format_message_block({
			message,
			indent: "",
			displayNames: names,
			reactionCounts: new Map([["thumbs_up", 2]]),
		});

		expect(fromCounts).toBe(fromDocs);
		expect(fromCounts).toContain("reactions: 👍 2");
	});
});

describe("chatbe_split_rollover", () => {
	test("puts oldest messages in slug.001 and the newest tail in the main file", () => {
		const blocks = ["<!-- chitchat:msg:old -->\nold", "<!-- chitchat:msg:new -->\nnew"];
		const files = chatbe_split_rollover({
			header: "# general",
			blocks,
			maxBytes: chatbe_utf8_byte_size("# general\n\n<!-- chitchat:msg:new -->\nnew"),
		});

		expect(files).toHaveLength(2);
		expect(files[0]).toContain("<!-- chitchat:msg:old -->");
		expect(files[0]).not.toContain("# general");
		expect(files[1]).toContain("# general");
		expect(files[1]).toContain("<!-- chitchat:msg:new -->");
		expect(files[1]).not.toContain("<!-- chitchat:msg:old -->");
	});

	test("keeps oldest-first order inside a single file", () => {
		const blocks = ["<!-- chitchat:msg:old -->\nold", "<!-- chitchat:msg:new -->\nnew"];
		const files = chatbe_split_rollover({
			header: "# general",
			blocks,
			maxBytes: 900_000,
		});

		expect(files).toHaveLength(1);
		expect(files[0]!.indexOf("<!-- chitchat:msg:old -->")).toBeLessThan(files[0]!.indexOf("<!-- chitchat:msg:new -->"));
	});

	test("splits at the backend cap without cutting a block", () => {
		// Each block is ~20,020 bytes, so five fit under 100,000 only without the header,
		// and every file boundary must land between blocks.
		const block = (index: number) => `<!-- chitchat:msg:m${index} -->\n${"x".repeat(20_000)}`;
		const blocks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(block);
		const files = chatbe_split_rollover({
			header: "# general",
			blocks,
			maxBytes: chatbe_ROLLOVER_MAX_BYTES,
		});

		expect(files.length).toBeGreaterThan(1);
		for (const file of files) {
			expect(chatbe_utf8_byte_size(file)).toBeLessThanOrEqual(chatbe_ROLLOVER_MAX_BYTES);
		}
		// Every block survives the split exactly once, oldest file first.
		const joined = files.join("\n\n");
		for (let index = 0; index < blocks.length; index += 1) {
			expect(joined.split(`<!-- chitchat:msg:m${index} -->`)).toHaveLength(2);
		}
		expect(files[files.length - 1]).toContain("# general");
		expect(files[files.length - 1]).toContain("<!-- chitchat:msg:m9 -->");
		expect(files[0]).toContain("<!-- chitchat:msg:m0 -->");
	});

	test("an oversized single block still becomes its own file", () => {
		const blocks = [`<!-- chitchat:msg:big -->\n${"x".repeat(200_000)}`];
		const files = chatbe_split_rollover({ header: "# general", blocks, maxBytes: chatbe_ROLLOVER_MAX_BYTES });

		expect(files).toHaveLength(1);
		expect(files[0]).toContain("# general");
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
		expect(chatbe_slug_channel_name("Team Plans / 2026")).toBe("Team-Plans-2026");
		expect(chatbe_slug_channel_name("a\\b:c*d?")).toBe("a-b-c-d");
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
		expect(chatbe_bounded_author_name("A B")).toBe("A B");
		expect(chatbe_bounded_author_name("**bold**")).toBe("\\*\\*bold\\*\\*");
		expect(chatbe_bounded_author_name(null)).toBeNull();
		expect(chatbe_bounded_author_name("   ")).toBeNull();

		const bounded = chatbe_bounded_author_name("é".repeat(200));
		expect(bounded).not.toBeNull();
		expect(chatbe_utf8_byte_size(bounded!)).toBeLessThanOrEqual(128);
		expect(bounded!.endsWith("�")).toBe(false);
	});
});

describe("chatbe_splice_block", () => {
	const transcript = [
		"# general",
		"",
		"Public Chitchat channel. This file is a derived copy. Edit chat in the Chitchat page, not here.",
		"",
		"<!-- chitchat:msg:chan-1:msg1 -->",
		"**Alice** · 2026-08-26 12:00 UTC",
		"hello",
		"",
		"  <!-- chitchat:msg:chan-1:msg1:reply1 -->",
		"  **Bob** · 2026-08-26 12:01 UTC",
		"  hi",
		"",
		"<!-- chitchat:msg:chan-1:msg2 -->",
		"**Bob** · 2026-08-26 12:02 UTC",
		"bye",
	].join("\n");

	test("replaces exactly one block and keeps its neighbors", () => {
		const spliced = chatbe_splice_block(
			transcript,
			"chan-1:msg1",
			"<!-- chitchat:msg:chan-1:msg1 -->\n**Alice** · 2026-08-26 12:00 UTC (edited)\nhello again",
		);

		expect(spliced).not.toBeNull();
		expect(spliced).toContain("hello again");
		expect(spliced).not.toContain("\nhello\n");
		expect(spliced).toContain("  hi");
		expect(spliced).toContain("bye");
	});

	test("a root marker never matches its replies and a reply splices at its indent", () => {
		// The root marker's closing ` -->` keeps it from matching the reply marker's longer key.
		const spliced = chatbe_splice_block(
			transcript,
			"chan-1:msg1:reply1",
			"  <!-- chitchat:msg:chan-1:msg1:reply1 -->\n  **Bob** · 2026-08-26 12:01 UTC (edited)\n  hi there",
		);

		expect(spliced).not.toBeNull();
		expect(spliced).toContain("  hi there");
		expect(spliced).toContain("hello");
		expect(spliced).toContain("bye");
	});

	test("returns null when the block is in another file", () => {
		expect(chatbe_splice_block(transcript, "chan-1:missing", "x")).toBeNull();
		expect(chatbe_file_contains_block(transcript, "chan-1:msg2")).toBe(true);
		expect(chatbe_file_contains_block(transcript, "chan-1:missing")).toBe(false);
	});

	test("splicing the last block keeps the file end clean", () => {
		const spliced = chatbe_splice_block(
			transcript,
			"chan-1:msg2",
			"<!-- chitchat:msg:chan-1:msg2 -->\n**Bob** · 2026-08-26 12:02 UTC (message deleted)",
		);

		expect(spliced).not.toBeNull();
		expect(spliced!.endsWith("(message deleted)")).toBe(true);
	});
});

describe("chatbe_insert_reply_block", () => {
	const transcript = [
		"# general",
		"",
		"<!-- chitchat:msg:chan-1:msg1 -->",
		"**Alice** · 2026-08-26 12:00 UTC",
		"hello",
		"",
		"  <!-- chitchat:msg:chan-1:msg1:reply1 -->",
		"  **Bob** · 2026-08-26 12:01 UTC",
		"  hi",
		"",
		"<!-- chitchat:msg:chan-1:msg2 -->",
		"**Bob** · 2026-08-26 12:02 UTC",
		"bye",
	].join("\n");

	test("inserts after the root's existing replies, before the next root", () => {
		const inserted = chatbe_insert_reply_block(
			transcript,
			"chan-1:msg1",
			"  <!-- chitchat:msg:chan-1:msg1:reply2 -->\n  **Alice** · 2026-08-26 12:03 UTC\n  welcome",
		);

		expect(inserted).not.toBeNull();
		expect(inserted!.indexOf("reply2")).toBeGreaterThan(inserted!.indexOf("reply1"));
		expect(inserted!.indexOf("reply2")).toBeLessThan(inserted!.indexOf("chan-1:msg2"));
	});

	test("inserts right after a root with no replies yet", () => {
		const inserted = chatbe_insert_reply_block(
			transcript,
			"chan-1:msg2",
			"  <!-- chitchat:msg:chan-1:msg2:replyA -->\n  **Alice** · 2026-08-26 12:04 UTC\n  ok",
		);

		expect(inserted).not.toBeNull();
		expect(inserted!.indexOf("replyA")).toBeGreaterThan(inserted!.indexOf("bye"));
	});

	test("returns null when the root is in another file", () => {
		expect(chatbe_insert_reply_block(transcript, "chan-1:missing", "x")).toBeNull();
	});
});

describe("chatbe_replace_header", () => {
	test("swaps the header and keeps every block", () => {
		const content = "# old name\n\nPublic Chitchat channel.\n\n<!-- chitchat:msg:k1 -->\n**Alice** · t\nhello";
		const replaced = chatbe_replace_header(content, "# new name\n\nPublic Chitchat channel.");

		expect(replaced).toBe("# new name\n\nPublic Chitchat channel.\n\n<!-- chitchat:msg:k1 -->\n**Alice** · t\nhello");
	});

	test("a file with no blocks becomes just the new header", () => {
		expect(chatbe_replace_header("# old name\n\nPublic Chitchat channel.", "# new")).toBe("# new");
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
	});
});
