// @vitest-environment node
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { BonoboEnv } from "bonobo-plugin-sdk";
import { chat_inverted_ms } from "../chat-data";
import worker from "./worker";

/**
 * These tests run the worker against an in-memory fake of the host doors. The fake keeps the
 * door bodies and answer shapes of the real routes, plus the two storage-layer rules the worker
 * leans on: the owned-doc overwrite refusal and the folder-occupied 409.
 */

type FakeDoc = {
	value: Record<string, unknown>;
	revision: number;
	createdBy: string;
	createdAt: number;
	ownership: "shared" | "owned";
};

function create_fake_host() {
	const collections = new Map<string, Map<string, FakeDoc>>();
	const files = new Map<string, string>();
	const folders = new Map<string, { readOnly?: boolean; readScopeId?: string } | undefined>();
	const archivedPaths: string[] = [];
	const occupiedFolderPaths = new Set<string>();
	/** Scripted one-shot refusals by door path. */
	const refusals = new Map<string, { status: number; body: unknown }>();
	const calls: string[] = [];

	const collection_of = (name: string) => {
		const existing = collections.get(name);
		if (existing) {
			return existing;
		}
		const created = new Map<string, FakeDoc>();
		collections.set(name, created);
		return created;
	};

	const to_public_doc = (collection: string, key: string, doc: FakeDoc) => ({
		collection,
		key,
		value: doc.value,
		revision: doc.revision,
		byteSize: JSON.stringify(doc.value).length,
		writeMode: "normal",
		createdBy: doc.createdBy,
		updatedBy: doc.createdBy,
		ownership: doc.ownership,
		createdAt: doc.createdAt,
		updatedAt: doc.createdAt,
	});

	const write_one = (
		actor: string,
		input: { collection: string; key: string; value: Record<string, unknown> },
	): { status: number; body: unknown } | null => {
		const docs = collection_of(input.collection);
		const existing = docs.get(input.key);
		if (existing && existing.ownership === "owned" && existing.createdBy !== actor) {
			return { status: 409, body: { message: "This document belongs to another writer" } };
		}
		docs.set(input.key, {
			value: input.value,
			revision: (existing?.revision ?? 0) + 1,
			createdBy: existing?.createdBy ?? actor,
			createdAt: existing?.createdAt ?? Date.now(),
			ownership: existing?.ownership ?? "shared",
		});
		return null;
	};

	const fake = {
		actor: "user_alice",
		collections,
		files,
		folders,
		archivedPaths,
		occupiedFolderPaths,
		refusals,
		calls,
		seed_doc(
			collection: string,
			key: string,
			value: Record<string, unknown>,
			opts?: { createdBy?: string; createdAt?: number; ownership?: "shared" | "owned" },
		) {
			collection_of(collection).set(key, {
				value,
				revision: 1,
				createdBy: opts?.createdBy ?? "user_alice",
				createdAt: opts?.createdAt ?? 1,
				ownership: opts?.ownership ?? "shared",
			});
		},
		handle(path: string, body: Record<string, unknown>): { status: number; body: unknown } {
			calls.push(path);
			const scripted = refusals.get(path);
			if (scripted) {
				refusals.delete(path);
				return scripted;
			}

			if (path === "/api/v1/plugin-data/read") {
				const doc = collection_of(body.collection as string).get(body.key as string);
				return {
					status: 200,
					body: { document: doc ? to_public_doc(body.collection as string, body.key as string, doc) : null },
				};
			}
			if (path === "/api/v1/plugin-data/write") {
				const refused = write_one(fake.actor, body as { collection: string; key: string; value: Record<string, unknown> });
				if (refused) {
					return refused;
				}
				const doc = collection_of(body.collection as string).get(body.key as string)!;
				return { status: 200, body: { revision: doc.revision, byteSize: JSON.stringify(doc.value).length } };
			}
			if (path === "/api/v1/plugin-data/write-batch") {
				const documents = body.documents as { collection: string; key: string; value: Record<string, unknown> }[];
				// Like the real batch: refuse the whole batch before writing anything.
				for (const input of documents) {
					const docs = collection_of(input.collection);
					const existing = docs.get(input.key);
					if (existing && existing.ownership === "owned" && existing.createdBy !== fake.actor) {
						return { status: 409, body: { message: "This document belongs to another writer" } };
					}
				}
				for (const input of documents) {
					write_one(fake.actor, input);
				}
				return { status: 200, body: { documents: documents.map((input) => ({ key: input.key })) } };
			}
			if (path === "/api/v1/plugin-data/list") {
				const docs = collection_of(body.collection as string);
				const prefix = (body.keyPrefix as string | undefined) ?? "";
				const keys = [...docs.keys()].filter((key) => key.startsWith(prefix)).sort();
				const offset = body.cursor ? Number(body.cursor) : 0;
				const limit = (body.limit as number | undefined) ?? 100;
				const page = keys.slice(offset, offset + limit);
				return {
					status: 200,
					body: {
						documents: page.map((key) => to_public_doc(body.collection as string, key, docs.get(key)!)),
						cursor: String(offset + page.length),
						isDone: offset + page.length >= keys.length,
					},
				};
			}
			if (path === "/api/v1/files/read") {
				const content = files.get(body.path as string);
				if (content === undefined) {
					return { status: 404, body: { message: "Not found" } };
				}
				return { status: 200, body: { path: body.path, nodeId: `node-${body.path}`, content } };
			}
			if (path === "/api/v1/files/write") {
				files.set(body.path as string, body.content as string);
				return { status: 200, body: { path: body.path, nodeId: `node-${body.path}`, contentType: "text/markdown" } };
			}
			if (path === "/api/v1/files/plugin-folders/ensure") {
				if (occupiedFolderPaths.has(body.path as string)) {
					return { status: 409, body: { message: "This path is used by an item this plugin does not own" } };
				}
				const created = !folders.has(body.path as string);
				folders.set(body.path as string, body.access as { readOnly?: boolean; readScopeId?: string } | undefined);
				return { status: 200, body: { nodeId: `node-${body.path}`, path: body.path, created } };
			}
			if (path === "/api/v1/files/plugin-archive") {
				const had = files.delete(body.path as string);
				archivedPaths.push(body.path as string);
				return { status: 200, body: { archivedNodes: had ? 1 : 0 } };
			}
			return { status: 500, body: { message: `Fake host has no handler for ${path}` } };
		},
	};
	return fake;
}

type FakeHost = ReturnType<typeof create_fake_host>;

const env = {
	BONOBO: {
		host: { apiOrigin: "https://host.test", token: "run-token" },
		secrets: { get: async () => null },
	},
} as BonoboEnv;

let fake: FakeHost;

beforeEach(() => {
	fake = create_fake_host();
	vi.stubGlobal("fetch", async (url: string | URL | Request, init?: RequestInit) => {
		const path = new URL(typeof url === "string" ? url : url instanceof URL ? url.href : url.url).pathname;
		const answer = fake.handle(path, JSON.parse(String(init?.body)) as Record<string, unknown>);
		return new Response(JSON.stringify(answer.body), { status: answer.status });
	});
});

async function invoke(endpointId: string, input: unknown) {
	const envelope = {
		pluginRunId: "run-1",
		event: "ui.invoke.requested",
		eventId: "event-1",
		organizationId: "org-1",
		workspaceId: "ws-1",
		actorUserId: fake.actor,
		configuration: null,
		source: null,
		invoke: { endpointId, serializationKey: null, input },
	};
	const response = await worker.fetch(
		new Request("https://plugin.local/x", { method: "POST", body: JSON.stringify(envelope) }),
		env,
	);
	return { status: response.status, body: (await response.json()) as Record<string, unknown> };
}

/** A store key with a real inverted-timestamp tail, so `chat_key_timestamp` parses it. */
function minted_key(prefix: string, ms: number, tail = "aaaa") {
	return `${prefix}:${chat_inverted_ms(ms)}:${tail}`;
}

function seed_public_channel(channelKey = "chan-public", name = "general") {
	fake.seed_doc("channels", channelKey, { name, archivedAt: null });
	return channelKey;
}

/** Seed the projection as an earlier run would have left it, so tests can skip the bootstrap. */
function seed_projection(channelKey: string, name = "general", tailContent?: string) {
	fake.seed_doc("projection", "__root__", { rootPath: "/chitchat", readmePath: "/chitchat/README.md" });
	const slug = name;
	fake.seed_doc("projection", channelKey, {
		slug,
		folderPath: "/chitchat",
		tailIndex: 0,
		name,
		topic: null,
		archived: false,
	});
	fake.files.set("/chitchat/README.md", "# Chitchat");
	fake.files.set(
		`/chitchat/${slug}.md`,
		tailContent ??
			`# ${name}\n\nPublic Chitchat channel. This file is a derived copy. Edit chat in the Chitchat page, not here.`,
	);
	return { tailPath: `/chitchat/${slug}.md` };
}

describe("message-send", () => {
	test("bootstraps the projection and appends the block on a fresh channel", async () => {
		seed_public_channel();

		const sent = await invoke("message-send", {
			channelKey: "chan-public",
			text: "hello world",
			authorName: "Alice",
			clientRequestId: "req-1",
		});

		expect(sent.status).toBe(200);
		const messageKey = sent.body.messageKey as string;
		expect(messageKey.startsWith("chan-public:")).toBe(true);

		// The store holds the message with the author snapshot, and the request outcome.
		const messageDoc = fake.collections.get("messages")!.get(messageKey)!;
		expect(messageDoc.value).toMatchObject({ text: "hello world", authorName: "Alice", deletedAt: null });
		expect(fake.collections.get("requests")!.get("req-1")!.value).toMatchObject({ messageKey });

		// The projection bootstrapped: root folder, README with the channel row, locked tail file.
		expect(fake.folders.get("/chitchat")).toMatchObject({ readOnly: true });
		expect(fake.files.get("/chitchat/README.md")).toContain("- [general](./general.md)");
		const tail = fake.files.get("/chitchat/general.md")!;
		expect(tail).toContain(`<!-- chitchat:msg:${messageKey} -->`);
		expect(tail).toContain("**Alice**");
		expect(tail).toContain("hello world");
	});

	test("replaying the same clientRequestId answers the stored key and appends nothing", async () => {
		seed_public_channel();

		const first = await invoke("message-send", {
			channelKey: "chan-public",
			text: "hello",
			authorName: "Alice",
			clientRequestId: "req-dup",
		});
		const replay = await invoke("message-send", {
			channelKey: "chan-public",
			text: "hello",
			authorName: "Alice",
			clientRequestId: "req-dup",
		});

		expect(replay.status).toBe(200);
		expect(replay.body).toMatchObject({ messageKey: first.body.messageKey, replayed: true });
		expect(fake.collections.get("messages")!.size).toBe(1);
		const tail = fake.files.get("/chitchat/general.md")!;
		expect(tail.split(`<!-- chitchat:msg:${first.body.messageKey as string} -->`)).toHaveLength(2);
	});

	test("a replayed send writes back a block the first run never appended", async () => {
		seed_public_channel();
		const { tailPath } = seed_projection("chan-public");
		const headerOnly = fake.files.get(tailPath)!;

		const send = {
			channelKey: "chan-public",
			text: "hello",
			authorName: "Alice",
			clientRequestId: "req-lost",
		};
		const first = await invoke("message-send", send);
		const messageKey = first.body.messageKey as string;

		// The first run wrote the store, then died before the file write. Put the transcript back
		// to what such a run would have left behind: the header, and no block.
		fake.files.set(tailPath, headerOnly);

		const replay = await invoke("message-send", send);

		expect(replay.status).toBe(200);
		expect(replay.body).toMatchObject({ messageKey, replayed: true });
		// One document and one block: the repair rendered the stored message, it did not send again.
		expect(fake.collections.get("messages")!.size).toBe(1);
		const tail = fake.files.get(tailPath)!;
		expect(tail.split(`<!-- chitchat:msg:${messageKey} -->`)).toHaveLength(2);
		expect(tail).toContain("hello");
	});

	test("a missing channel answers 404 and an archived channel answers 409", async () => {
		const missing = await invoke("message-send", {
			channelKey: "nope",
			text: "hi",
			clientRequestId: "req-a",
		});
		expect(missing.status).toBe(404);

		fake.seed_doc("channels", "chan-archived", { name: "old", archivedAt: 5 });
		const archived = await invoke("message-send", {
			channelKey: "chan-archived",
			text: "hi",
			clientRequestId: "req-b",
		});
		expect(archived.status).toBe(409);
		expect(archived.body.message).toContain("archived");
	});

	test("a value over the 16 KiB store cap is refused before anything is written", async () => {
		seed_public_channel();
		seed_projection("chan-public");

		const sent = await invoke("message-send", {
			channelKey: "chan-public",
			text: "x".repeat(17_000),
			clientRequestId: "req-big",
		});

		expect(sent.status).toBe(413);
		expect(sent.body.message).toContain("too long");
		expect(fake.collections.get("messages")?.size ?? 0).toBe(0);
		expect(fake.collections.get("requests")?.get("req-big")).toBeUndefined();
	});

	test("a door refusal is relayed to the page with its status and message", async () => {
		seed_public_channel();
		fake.refusals.set("/api/v1/plugin-data/read", { status: 403, body: { message: "Permission denied" } });

		const sent = await invoke("message-send", {
			channelKey: "chan-public",
			text: "hi",
			clientRequestId: "req-denied",
		});

		expect(sent.status).toBe(403);
		expect(sent.body.message).toBe("Permission denied");
	});

	test("an append that crosses the rollover cap archives the tail and restarts it", async () => {
		seed_public_channel();
		const header = "# general\n\nPublic Chitchat channel. This file is a derived copy. Edit chat in the Chitchat page, not here.";
		const bigTail = `${header}\n\n<!-- chitchat:msg:${minted_key("chan-public", 1)} -->\n**Old** · t\n${"y".repeat(99_000)}`;
		seed_projection("chan-public", "general", bigTail);

		const sent = await invoke("message-send", {
			channelKey: "chan-public",
			text: "z".repeat(2_000),
			clientRequestId: "req-roll",
		});

		expect(sent.status).toBe(200);
		// The rolled file keeps the old tail verbatim, header included.
		expect(fake.files.get("/chitchat/general.001.md")).toBe(bigTail);
		const newTail = fake.files.get("/chitchat/general.md")!;
		expect(newTail.startsWith(header)).toBe(true);
		expect(newTail).toContain(`<!-- chitchat:msg:${sent.body.messageKey as string} -->`);
		expect(newTail).not.toContain("y".repeat(99_000));
		const state = fake.collections.get("projection")!.get("chan-public")!;
		expect(state.value.tailIndex).toBe(1);
	});

	test("a send call stays well under the 20-call door budget", async () => {
		seed_public_channel();
		seed_projection("chan-public");
		fake.calls.length = 0;

		await invoke("message-send", { channelKey: "chan-public", text: "hi", clientRequestId: "req-c" });

		expect(fake.calls.length).toBeLessThanOrEqual(10);
	});
});

describe("reply-send", () => {
	test("nests the reply under its root, between the root and the next message", async () => {
		seed_public_channel();
		const rootKey = minted_key("chan-public", 100);
		const laterKey = minted_key("chan-public", 200);
		fake.seed_doc("messages", rootKey, { text: "root", attachments: [], editedAt: null, deletedAt: null });
		fake.seed_doc("messages", laterKey, { text: "later", attachments: [], editedAt: null, deletedAt: null });
		const header = "# general";
		seed_projection(
			"chan-public",
			"general",
			`${header}\n\n<!-- chitchat:msg:${rootKey} -->\n**A** · t\nroot\n\n<!-- chitchat:msg:${laterKey} -->\n**B** · t\nlater`,
		);

		const sent = await invoke("reply-send", {
			rootMessageKey: rootKey,
			text: "nested answer",
			authorName: "Bob",
			clientRequestId: "req-r1",
		});

		expect(sent.status).toBe(200);
		expect(sent.body.transcriptUpdated).toBe(true);
		const replyKey = sent.body.messageKey as string;
		expect(replyKey.startsWith(`${rootKey}:`)).toBe(true);
		expect(fake.collections.get("replies")!.get(replyKey)).toBeDefined();

		const tail = fake.files.get("/chitchat/general.md")!;
		const replyIndex = tail.indexOf(`  <!-- chitchat:msg:${replyKey} -->`);
		expect(replyIndex).toBeGreaterThan(tail.indexOf(rootKey));
		expect(replyIndex).toBeLessThan(tail.indexOf(`<!-- chitchat:msg:${laterKey} -->`));
	});

	test("a replayed reply writes back a block the first run never nested", async () => {
		seed_public_channel();
		const rootKey = minted_key("chan-public", 100);
		fake.seed_doc("messages", rootKey, { text: "root", attachments: [], editedAt: null, deletedAt: null });
		const rootOnly = `# general\n\n<!-- chitchat:msg:${rootKey} -->\n**A** · t\nroot`;
		seed_projection("chan-public", "general", rootOnly);

		const send = {
			rootMessageKey: rootKey,
			text: "nested answer",
			authorName: "Bob",
			clientRequestId: "req-r-lost",
		};
		const first = await invoke("reply-send", send);
		const replyKey = first.body.messageKey as string;

		// Same crash window as the message case: the reply is in the store, not in the file.
		fake.files.set("/chitchat/general.md", rootOnly);

		const replayed = await invoke("reply-send", send);

		expect(replayed.status).toBe(200);
		expect(replayed.body).toMatchObject({ messageKey: replyKey, replayed: true });
		expect(fake.collections.get("replies")!.size).toBe(1);
		const tail = fake.files.get("/chitchat/general.md")!;
		expect(tail.split(`<!-- chitchat:msg:${replyKey} -->`)).toHaveLength(2);
		// The repair nests the block under its root, indented, like a first-run reply.
		expect(tail).toContain(`  <!-- chitchat:msg:${replyKey} -->`);
	});

	test("a reply to a missing root answers 404", async () => {
		seed_public_channel();
		const missing = await invoke("reply-send", {
			rootMessageKey: minted_key("chan-public", 1),
			text: "hi",
			clientRequestId: "req-r2",
		});
		expect(missing.status).toBe(404);
	});
});

describe("message-edit and message-delete", () => {
	function seed_message(createdBy: string) {
		seed_public_channel();
		const key = minted_key("chan-public", 100);
		fake.seed_doc(
			"messages",
			key,
			{ text: "original", attachments: [], editedAt: null, deletedAt: null, authorName: "Bob" },
			{ createdBy },
		);
		seed_projection(
			"chan-public",
			"general",
			`# general\n\n<!-- chitchat:msg:${key} -->\n**Bob** · t\noriginal`,
		);
		return key;
	}

	test("the author edits their message: doc updated and block rewritten with (edited)", async () => {
		const key = seed_message("user_alice");

		const edited = await invoke("message-edit", { messageKey: key, text: "corrected" });

		expect(edited.status).toBe(200);
		expect(edited.body.transcriptUpdated).toBe(true);
		expect(fake.collections.get("messages")!.get(key)!.value).toMatchObject({
			text: "corrected",
			authorName: "Bob",
		});
		const tail = fake.files.get("/chitchat/general.md")!;
		expect(tail).toContain("corrected");
		expect(tail).toContain("(edited)");
		expect(tail).not.toContain("original");
	});

	test("another member's edit is refused with 403 and changes nothing", async () => {
		const key = seed_message("user_bob");

		const edited = await invoke("message-edit", { messageKey: key, text: "hijack" });

		expect(edited.status).toBe(403);
		expect(fake.collections.get("messages")!.get(key)!.value.text).toBe("original");
		expect(fake.files.get("/chitchat/general.md")).toContain("original");
	});

	test("a delete tombstones the doc and removes the text from the transcript only", async () => {
		const key = seed_message("user_alice");

		const deleted = await invoke("message-delete", { messageKey: key });

		expect(deleted.status).toBe(200);
		const doc = fake.collections.get("messages")!.get(key)!;
		// The doc keeps the text, like the old user-door tombstone; only the file drops it.
		expect(doc.value.text).toBe("original");
		expect(doc.value.deletedAt).not.toBeNull();
		const tail = fake.files.get("/chitchat/general.md")!;
		expect(tail).toContain("(message deleted)");
		expect(tail).not.toContain("original");

		const again = await invoke("message-delete", { messageKey: key });
		expect(again.status).toBe(200);
		expect(again.body.replayed).toBe(true);
	});

	test("an edit finds a block that already rolled over into a numbered file", async () => {
		seed_public_channel();
		const key = minted_key("chan-public", 100);
		fake.seed_doc("messages", key, { text: "original", attachments: [], editedAt: null, deletedAt: null });
		seed_projection("chan-public", "general", "# general\n\nfresh tail with no blocks");
		fake.collections.get("projection")!.get("chan-public")!.value.tailIndex = 1;
		fake.files.set("/chitchat/general.001.md", `# general\n\n<!-- chitchat:msg:${key} -->\n**A** · t\noriginal`);

		const edited = await invoke("message-edit", { messageKey: key, text: "fixed" });

		expect(edited.status).toBe(200);
		expect(edited.body.transcriptUpdated).toBe(true);
		expect(fake.files.get("/chitchat/general.001.md")).toContain("fixed");
	});
});

describe("reaction-toggle", () => {
	test("toggling on writes the actor-keyed doc and renders the count; off removes it", async () => {
		seed_public_channel();
		const key = minted_key("chan-public", 100);
		fake.seed_doc("messages", key, { text: "root", attachments: [], editedAt: null, deletedAt: null });
		seed_projection("chan-public", "general", `# general\n\n<!-- chitchat:msg:${key} -->\n**A** · t\nroot`);

		const on = await invoke("reaction-toggle", { targetKey: key, token: "thumbs_up", on: true });
		expect(on.status).toBe(200);
		const reactionDoc = fake.collections.get("reactions")!.get(`${key}:thumbs_up:user_alice`)!;
		expect(reactionDoc.value).toEqual({ removed: false });
		expect(fake.files.get("/chitchat/general.md")).toContain("reactions: 👍 1");

		const off = await invoke("reaction-toggle", { targetKey: key, token: "thumbs_up", on: false });
		expect(off.status).toBe(200);
		expect(fake.collections.get("reactions")!.get(`${key}:thumbs_up:user_alice`)!.value).toEqual({ removed: true });
		expect(fake.files.get("/chitchat/general.md")).not.toContain("reactions:");
	});
});

describe("channel-manage", () => {
	test("create makes the doc, the projection, and the README row; a name twin gets a digest slug", async () => {
		const first = await invoke("channel-manage", { action: "create", name: "general", clientRequestId: "req-c1" });
		expect(first.status).toBe(200);
		const firstKey = first.body.channelKey as string;
		expect(fake.collections.get("channels")!.get(firstKey)!.value).toMatchObject({ name: "general" });
		expect(fake.files.get("/chitchat/general.md")).toContain("# general");
		expect(fake.files.get("/chitchat/README.md")).toContain("- [general](./general.md)");

		const second = await invoke("channel-manage", { action: "create", name: "general", clientRequestId: "req-c2" });
		expect(second.status).toBe(200);
		const secondKey = second.body.channelKey as string;
		const secondState = fake.collections.get("projection")!.get(secondKey)!;
		expect(secondState.value.slug).not.toBe("general");
		expect((secondState.value.slug as string).startsWith("general-")).toBe(true);
		expect(fake.files.get(`/chitchat/${secondState.value.slug as string}.md`)).toContain("# general");
	});

	test("rename updates the doc, the tail header, and the README, and keeps file names", async () => {
		seed_public_channel();
		seed_projection("chan-public");

		const renamed = await invoke("channel-manage", { action: "update", channelKey: "chan-public", name: "town hall" });

		expect(renamed.status).toBe(200);
		expect(fake.collections.get("channels")!.get("chan-public")!.value).toMatchObject({ name: "town hall" });
		// The transcript file keeps its old slug; only the header and the README say the new name.
		const tail = fake.files.get("/chitchat/general.md")!;
		expect(tail).toContain("# town hall");
		expect(fake.files.get("/chitchat/README.md")).toContain("- [town hall](./general.md)");
		expect(fake.collections.get("projection")!.get("chan-public")!.value.name).toBe("town hall");
	});

	test("archiving removes the channel from the README but keeps its files", async () => {
		seed_public_channel();
		seed_projection("chan-public");

		const archived = await invoke("channel-manage", {
			action: "update",
			channelKey: "chan-public",
			archived: true,
		});

		expect(archived.status).toBe(200);
		expect(fake.collections.get("channels")!.get("chan-public")!.value.archivedAt).not.toBeNull();
		expect(fake.files.get("/chitchat/README.md")).not.toContain("general.md");
		expect(fake.files.get("/chitchat/general.md")).toBeDefined();
	});

	test("ensure on a private channel builds the scoped folder and keeps it out of the README", async () => {
		const channelKey = "p/11111111-1111-1111-1111-111111111111";
		fake.seed_doc("channels", channelKey, { name: "secret plans", archivedAt: null });

		const ensured = await invoke("channel-manage", { action: "ensure", channelKey });

		expect(ensured.status).toBe(200);
		expect(fake.folders.get("/chitchat/private")).toMatchObject({ readOnly: true });
		const folderPath = [...fake.folders.keys()].find((path) => path.startsWith("/chitchat/private/secret-plans-"));
		expect(folderPath).toBeDefined();
		// The folder's reader list is bound to the channel's data scope — the scope id IS the key.
		expect(fake.folders.get(folderPath!)).toMatchObject({ readOnly: true, readScopeId: channelKey });

		const tailPath = [...fake.files.keys()].find((path) => path.startsWith(`${folderPath!}/secret-plans-`));
		expect(tailPath).toBeDefined();
		expect(fake.files.get(tailPath!)).toContain("Private Chitchat channel.");

		// State lives inside the channel scope, and the README never names the channel.
		expect(fake.collections.get("channels")!.get(`${channelKey}:projection`)).toBeDefined();
		expect(fake.files.get("/chitchat/README.md")).not.toContain("secret");
	});

	test("a replayed create finishes the projection the first run never wrote", async () => {
		const created = await invoke("channel-manage", { action: "create", name: "general", clientRequestId: "req-c1" });
		const channelKey = created.body.channelKey as string;

		// The first run stored the channel, then died before the projection existed.
		fake.collections.get("projection")!.delete(channelKey);
		fake.files.delete("/chitchat/general.md");

		const replay = await invoke("channel-manage", { action: "create", name: "general", clientRequestId: "req-c1" });

		expect(replay.status).toBe(200);
		expect(replay.body).toMatchObject({ channelKey, replayed: true });
		// The channel the page can already post into has its folder and tail file back.
		expect(fake.collections.get("projection")!.get(channelKey)).toBeDefined();
		expect(fake.files.get("/chitchat/general.md")).toContain("# general");
	});

	test("an occupied /chitchat root falls back to the same digest path on every run", async () => {
		fake.occupiedFolderPaths.add("/chitchat");

		const first = await invoke("channel-manage", { action: "create", name: "general", clientRequestId: "req-f1" });
		expect(first.status).toBe(200);
		const rootState = fake.collections.get("projection")!.get("__root__")!;
		const rootPath = rootState.value.rootPath as string;
		expect(rootPath.startsWith("/chitchat-")).toBe(true);
		expect(fake.folders.has(rootPath)).toBe(true);

		// A second bootstrap in the same workspace lands on the same digest path.
		fake.collections.get("projection")!.delete("__root__");
		const second = await invoke("channel-manage", { action: "create", name: "random", clientRequestId: "req-f2" });
		expect(second.status).toBe(200);
		expect(fake.collections.get("projection")!.get("__root__")!.value.rootPath).toBe(rootPath);
	});
});

describe("reconcile", () => {
	test("rebuilds the full transcript from store docs and archives stale rolled files", async () => {
		seed_public_channel();
		const oldKey = minted_key("chan-public", 100);
		const newKey = minted_key("chan-public", 200);
		const replyKey = minted_key(oldKey, 150);
		fake.seed_doc(
			"messages",
			oldKey,
			{ text: "first", attachments: [], editedAt: null, deletedAt: null, authorName: "Alice" },
			{ createdBy: "user_alice" },
		);
		fake.seed_doc("messages", newKey, { text: "second", attachments: [], editedAt: null, deletedAt: null });
		fake.seed_doc("replies", replyKey, { text: "answer", attachments: [], editedAt: null, deletedAt: null });
		fake.seed_doc("reactions", `${oldKey}:heart:user_bob`, { removed: false }, { createdBy: "user_bob" });
		seed_projection("chan-public", "general", "# general\n\ngarbage transcript");
		fake.collections.get("projection")!.get("chan-public")!.value.tailIndex = 2;
		fake.files.set("/chitchat/general.001.md", "stale");
		fake.files.set("/chitchat/general.002.md", "stale");

		const reconciled = await invoke("reconcile", { channelKey: "chan-public" });

		expect(reconciled.status).toBe(200);
		expect(reconciled.body).toMatchObject({ done: true, files: 1 });
		const tail = fake.files.get("/chitchat/general.md")!;
		expect(tail.indexOf("first")).toBeGreaterThan(-1);
		expect(tail.indexOf("first")).toBeLessThan(tail.indexOf("second"));
		expect(tail.indexOf(`  <!-- chitchat:msg:${replyKey} -->`)).toBeGreaterThan(tail.indexOf("first"));
		expect(tail.indexOf(`  <!-- chitchat:msg:${replyKey} -->`)).toBeLessThan(tail.indexOf("second"));
		expect(tail).toContain("**Alice**");
		expect(tail).toContain("reactions: ❤️ 1");
		expect(tail).not.toContain("garbage");
		// The rebuild fit one file, so the stale rolled files were archived.
		expect(fake.archivedPaths).toContain("/chitchat/general.001.md");
		expect(fake.archivedPaths).toContain("/chitchat/general.002.md");
		expect(fake.collections.get("projection")!.get("chan-public")!.value.tailIndex).toBe(0);
	});

	test("history over the list caps rebuilds only the tail and says truncated", async () => {
		seed_public_channel();
		for (let index = 0; index < 301; index += 1) {
			fake.seed_doc("messages", minted_key("chan-public", 1_000_000 - index, `k${String(index).padStart(3, "0")}`), {
				text: `m${index}`,
				attachments: [],
				editedAt: null,
				deletedAt: null,
			});
		}
		seed_projection("chan-public", "general", "# general\n\nold tail");
		fake.files.set("/chitchat/general.001.md", "untouched roll");
		fake.collections.get("projection")!.get("chan-public")!.value.tailIndex = 1;

		const reconciled = await invoke("reconcile", { channelKey: "chan-public" });

		expect(reconciled.status).toBe(200);
		expect(reconciled.body).toMatchObject({ done: true, truncated: true });
		expect(fake.files.get("/chitchat/general.001.md")).toBe("untouched roll");
		expect(fake.files.get("/chitchat/general.md")).not.toContain("old tail");
	});

	test("a null channelKey rebuilds the README from the live public states", async () => {
		seed_public_channel();
		seed_projection("chan-public");
		fake.files.set("/chitchat/README.md", "stale readme");

		const reconciled = await invoke("reconcile", { channelKey: null });

		expect(reconciled.status).toBe(200);
		expect(fake.files.get("/chitchat/README.md")).toContain("- [general](./general.md)");
	});
});

describe("envelope handling", () => {
	test("an unknown endpoint answers 404 and a malformed envelope answers 400", async () => {
		const unknown = await invoke("no-such-endpoint", {});
		expect(unknown.status).toBe(404);

		const response = await worker.fetch(
			new Request("https://plugin.local/x", { method: "POST", body: JSON.stringify({ event: "files.upload.completed" }) }),
			env,
		);
		expect(response.status).toBe(400);
	});
});
