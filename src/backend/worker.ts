import { z } from "zod";
import type { BonoboEnv } from "bonobo-plugin-sdk";
import type { BonoboHttpApi, BonoboHttpApiPath } from "bonobo-plugin-sdk/http-api";
import {
	chat_attachment_schema,
	chat_BACKEND_ENDPOINTS,
	chat_channel_is_private,
	chat_CHANNEL_NAME_MAX_LENGTH,
	chat_CHANNEL_TOPIC_MAX_LENGTH,
	chat_channel_value_schema,
	chat_inverted_ms,
	chat_key_timestamp,
	chat_message_channel_key,
	chat_message_value_schema,
	chat_REACTION_TOKENS,
	chat_reply_root_key,
	chat_user_id_schema,
	type chat_MessageValue,
} from "../chat-data";
import { chatbe_create_host, chatbe_host_message, type chatbe_Host, type chatbe_HostAnswer } from "./host";
import {
	chatbe_bounded_author_name,
	chatbe_channel_header,
	chatbe_collision_slug,
	chatbe_file_contains_block,
	chatbe_format_message_block,
	chatbe_insert_reply_block,
	chatbe_readme_markdown,
	chatbe_replace_header,
	chatbe_rollover_path,
	chatbe_ROLLOVER_MAX_BYTES,
	chatbe_sha256_hex,
	chatbe_slug_channel_name,
	chatbe_splice_block,
	chatbe_split_rollover,
	chatbe_utf8_byte_size,
	type chatbe_ProjectionMessage,
	type chatbe_ProjectionReaction,
} from "./markdown";
import {
	chatbe_channel_state_location,
	chatbe_channel_state_schema,
	chatbe_PROJECTION_COLLECTION,
	chatbe_request_state_schema,
	chatbe_REQUESTS_COLLECTION,
	chatbe_root_state_schema,
	chatbe_ROOT_STATE_KEY,
	chatbe_tail_path,
	type chatbe_ChannelState,
	type chatbe_RootState,
} from "./state";

/**
 * The Chitchat backend: every chat write goes through these invoke endpoints, and each one
 * updates the document store first (the store is the source of truth) and then the projected
 * Markdown transcript files. A file update that fails or finds no block leaves the store
 * correct; the reconcile endpoint rebuilds the transcript from the store.
 *
 * Authorization model: the host verifies the acting member (`actorUserId`) and every store or
 * file door re-checks scope membership, so a non-member's call on a private channel fails at the
 * door and the refusal is relayed. The worker itself only adds the authorship rule: members may
 * edit and delete their own messages only.
 */

/** The host store door refuses values over this canonical-JSON size; pre-check for a clear message. */
const STORE_VALUE_MAX_BYTES = 16_384;

/** How many rolled-over files an edit/delete/reaction scans for a block before giving up. */
const TRANSCRIPT_SCAN_MAX_FILES = 8;

/** Full-rebuild page caps; over these, reconcile degrades to a truncated tail rebuild. */
const RECONCILE_MESSAGE_PAGES = 3;
const RECONCILE_REPLY_PAGES = 2;
const RECONCILE_REACTION_PAGES = 2;
const LIST_PAGE_SIZE = 100;

const DEFAULT_ROOT_PATH = "/chitchat";

type Ctx = {
	host: chatbe_Host;
	actorUserId: string;
	now: number;
	/**
	 * Stable per-workspace digest input for the fallback root-folder name. The envelope carries
	 * no installation id, so the organization and workspace ids stand in — every run of this
	 * installation derives the same fallback path.
	 */
	rootDigestInput: string;
};

// #region envelope and responses

const envelope_schema = z.object({
	pluginRunId: z.string(),
	event: z.literal("ui.invoke.requested"),
	organizationId: z.string().min(1),
	workspaceId: z.string().min(1),
	actorUserId: z.string().min(1),
	invoke: z.object({
		endpointId: z.string(),
		serializationKey: z.string().nullable(),
		input: z.unknown(),
	}),
});

function json_response(status: number, body: unknown) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json" },
	});
}

function refuse(status: number, message: string) {
	return json_response(status, { message });
}

/** Relay a refused door answer to the page, keeping the door's status, message, and retry hint. */
function relay_refusal(answer: chatbe_HostAnswer) {
	const retryAfterMs =
		typeof answer.body === "object" && answer.body !== null
			? (answer.body as Record<string, unknown>).retryAfterMs
			: undefined;
	return json_response(answer.status, {
		message: chatbe_host_message(answer),
		...(typeof retryAfterMs === "number" ? { retryAfterMs } : {}),
	});
}

// #endregion envelope and responses

// #region door calls

async function door<P extends BonoboHttpApiPath, T>(
	ctx: Ctx,
	path: P,
	body: BonoboHttpApi[P]["POST"]["body"],
	schema: z.ZodType<T>,
): Promise<T | Response> {
	const answer = await ctx.host.post(path, body);
	if (answer.status !== 200) {
		return relay_refusal(answer);
	}

	const parsed = schema.safeParse(answer.body);
	if (!parsed.success) {
		return refuse(502, `The host answered ${path} with an unexpected shape`);
	}
	return parsed.data;
}

const read_answer_schema = z.object({ document: z.unknown() });
const write_answer_schema = z.object({ revision: z.number(), byteSize: z.number() });
const write_batch_answer_schema = z.object({ documents: z.unknown() });
const list_answer_schema = z.object({
	documents: z.array(z.unknown()),
	cursor: z.string().nullable(),
	isDone: z.boolean(),
});
const files_read_answer_schema = z.object({ path: z.string(), content: z.string() });
const files_write_answer_schema = z.object({ path: z.string(), nodeId: z.string() });
const folders_ensure_answer_schema = z.object({ nodeId: z.string(), path: z.string(), created: z.boolean() });

function data_read(ctx: Ctx, collection: string, key: string) {
	return door(ctx, "/api/v1/plugin-data/read", { collection, key }, read_answer_schema);
}

function data_write(ctx: Ctx, collection: string, key: string, value: Record<string, unknown>) {
	return door(ctx, "/api/v1/plugin-data/write", { collection, key, value }, write_answer_schema);
}

function data_write_batch(ctx: Ctx, documents: { collection: string; key: string; value: Record<string, unknown> }[]) {
	return door(ctx, "/api/v1/plugin-data/write-batch", { documents }, write_batch_answer_schema);
}

function data_list(
	ctx: Ctx,
	body: { collection: string; keyPrefix?: string; limit?: number; cursor?: string | null },
) {
	return door(ctx, "/api/v1/plugin-data/list", body, list_answer_schema);
}

/**
 * Read one transcript file; a missing file answers null instead of a refusal, for heal paths.
 * Transcript files stay under the rollover cap, so the route's read cap never truncates one.
 */
async function files_read_or_null(ctx: Ctx, path: string) {
	const answer = await ctx.host.post("/api/v1/files/read", { path });
	if (answer.status === 404) {
		return null;
	}
	if (answer.status !== 200) {
		return relay_refusal(answer);
	}

	const parsed = files_read_answer_schema.safeParse(answer.body);
	if (!parsed.success) {
		return refuse(502, "The host answered /api/v1/files/read with an unexpected shape");
	}
	return parsed.data;
}

/**
 * Every transcript write asks for the plugin-named lock. On a create that locks the new file;
 * on an update the door ignores the request and the existing lock stays.
 */
function files_write(ctx: Ctx, path: string, content: string) {
	return door(
		ctx,
		"/api/v1/files/write",
		// A transcript is a derived file this backend rewrites whole, and it must come back byte for
		// byte the way it was written. A collaborative file is stored by parsing the markdown into
		// the editor's document and serializing it back, and that round trip keeps no HTML comments,
		// so the `<!-- chitchat:msg:<key> -->` marker above every block was silently lost. The replay
		// guard looks that marker up to decide whether a block is already in the file, so with the
		// markers gone it always decided "missing" and appended a second copy of the same message.
		// The door reads this flag only when the write creates the file.
		{ path, content, nonCollaborative: true, access: { readOnly: true } },
		files_write_answer_schema,
	);
}

function folders_ensure(ctx: Ctx, path: string, access?: { readOnly?: boolean; readScopeId?: string }) {
	return door(
		ctx,
		"/api/v1/files/plugin-folders/ensure",
		{ path, ...(access ? { access } : {}) },
		folders_ensure_answer_schema,
	);
}

function files_archive(ctx: Ctx, path: string) {
	return door(ctx, "/api/v1/files/plugin-archive", { path }, z.object({ archivedNodes: z.number() }));
}

// #endregion door calls

// #region stored documents

const stored_doc_schema = z.object({
	key: z.string(),
	value: z.record(z.string(), z.unknown()),
	revision: z.number(),
	createdBy: z.string(),
	createdAt: z.number(),
});

type StoredDoc = z.infer<typeof stored_doc_schema>;

function parse_stored_doc(raw: unknown): StoredDoc | null {
	const parsed = stored_doc_schema.safeParse(raw);
	return parsed.success ? parsed.data : null;
}

type MessageDoc = {
	key: string;
	createdBy: string;
	createdAt: number;
	value: chat_MessageValue;
	/** The author's self-written display-name snapshot; not part of the page's value schema. */
	authorName: string | null;
};

function parse_message_doc(raw: unknown): MessageDoc | null {
	const doc = parse_stored_doc(raw);
	if (doc === null) {
		return null;
	}
	const value = chat_message_value_schema.safeParse(doc.value);
	if (!value.success) {
		return null;
	}

	const rawAuthorName = doc.value.authorName;
	return {
		key: doc.key,
		createdBy: doc.createdBy,
		// Prefer the key's minted timestamp so ordering matches what the page derives from keys.
		createdAt: chat_key_timestamp(doc.key) ?? doc.createdAt,
		value: value.data,
		authorName: typeof rawAuthorName === "string" ? rawAuthorName : null,
	};
}

/** Which store collection a message-shaped key lives in: 3 segments = root, 5 = reply. */
function message_collection_for_key(key: string): "messages" | "replies" | null {
	const parts = key.split(":").length;
	if (parts === 3) {
		return "messages";
	}
	if (parts === 5) {
		return "replies";
	}
	return null;
}

function to_projection_message(doc: MessageDoc): chatbe_ProjectionMessage {
	return {
		key: doc.key,
		createdAt: doc.createdAt,
		createdBy: doc.createdBy,
		value: {
			text: doc.value.text,
			attachments: doc.value.attachments.map((attachment) => ({ name: attachment.name })),
			editedAt: doc.value.editedAt,
			deletedAt: doc.value.deletedAt,
		},
	};
}

/** Render one block with the message's own author snapshot, per-message, never a shared roster. */
function render_block(doc: MessageDoc, reactions: chatbe_ProjectionReaction[]) {
	const indent = message_collection_for_key(doc.key) === "replies" ? "  " : "";
	return chatbe_format_message_block({
		message: to_projection_message(doc),
		indent,
		displayNames: new Map([[doc.createdBy, chatbe_bounded_author_name(doc.authorName)]]),
		reactions,
	});
}

const reaction_doc_value_schema = z.object({ removed: z.boolean() });

/** The live reactions of one message, straight from the store. One page covers the palette. */
async function list_reactions_for(ctx: Ctx, targetKey: string): Promise<chatbe_ProjectionReaction[] | Response> {
	const listed = await data_list(ctx, {
		collection: "reactions",
		keyPrefix: `${targetKey}:`,
		limit: LIST_PAGE_SIZE,
	});
	if (listed instanceof Response) {
		return listed;
	}

	const reactions: chatbe_ProjectionReaction[] = [];
	for (const raw of listed.documents) {
		const doc = parse_stored_doc(raw);
		if (doc === null) {
			continue;
		}
		const value = reaction_doc_value_schema.safeParse(doc.value);
		if (!value.success) {
			continue;
		}
		const token = doc.key.slice(targetKey.length + 1).split(":")[0];
		if (!token || !(chat_REACTION_TOKENS as readonly string[]).includes(token)) {
			continue;
		}
		reactions.push({ targetKey, token, removed: value.data.removed });
	}
	return reactions;
}

function random_key_tail() {
	const bytes = crypto.getRandomValues(new Uint8Array(4));
	return Array.from(bytes)
		.map((byte) => (byte % 36).toString(36))
		.join("");
}

function mint_appended_key(prefix: string, nowMs: number) {
	return `${prefix}${chat_inverted_ms(nowMs)}:${random_key_tail()}`;
}

function message_value_json(value: Record<string, unknown>) {
	return chatbe_utf8_byte_size(JSON.stringify(value));
}

// #endregion stored documents

// #region root and channel projection state

async function read_root_state(ctx: Ctx): Promise<chatbe_RootState | null | Response> {
	const read = await data_read(ctx, chatbe_PROJECTION_COLLECTION, chatbe_ROOT_STATE_KEY);
	if (read instanceof Response) {
		return read;
	}

	const doc = parse_stored_doc(read.document);
	if (doc === null) {
		return null;
	}
	const state = chatbe_root_state_schema.safeParse(doc.value);
	return state.success ? state.data : null;
}

/** Every public channel's projection state, for README rows and slug-collision checks. */
async function list_public_channel_states(ctx: Ctx): Promise<Map<string, chatbe_ChannelState> | Response> {
	const states = new Map<string, chatbe_ChannelState>();
	const listed = await data_list(ctx, { collection: chatbe_PROJECTION_COLLECTION, limit: LIST_PAGE_SIZE });
	if (listed instanceof Response) {
		return listed;
	}

	for (const raw of listed.documents) {
		const doc = parse_stored_doc(raw);
		if (doc === null || doc.key === chatbe_ROOT_STATE_KEY) {
			continue;
		}
		const state = chatbe_channel_state_schema.safeParse(doc.value);
		if (state.success) {
			states.set(doc.key, state.data);
		}
	}
	return states;
}

async function write_readme(ctx: Ctx, rootState: chatbe_RootState, states: Map<string, chatbe_ChannelState>) {
	const channels = [...states.values()]
		.filter((state) => !state.archived)
		.map((state) => ({ name: state.name, slug: state.slug }));
	return files_write(ctx, rootState.readmePath, chatbe_readme_markdown(channels));
}

/**
 * Make sure the projection root folder, the README, and the root state doc exist. The plan's
 * fallback name was `chitchat-<installation id prefix>`, but the invoke envelope carries no
 * installation id, so a occupied `/chitchat` falls back to a workspace-digest suffix instead.
 */
async function ensure_root(ctx: Ctx): Promise<chatbe_RootState | Response> {
	const existing = await read_root_state(ctx);
	if (existing instanceof Response) {
		return existing;
	}
	if (existing !== null) {
		return existing;
	}

	let rootPath = DEFAULT_ROOT_PATH;
	let ensured = await folders_ensure(ctx, rootPath, { readOnly: true });
	if (ensured instanceof Response) {
		if (ensured.status !== 409) {
			return ensured;
		}
		// `/chitchat` is used by an item this plugin does not own. Take a deterministic sibling.
		const digest = await chatbe_sha256_hex(ctx.rootDigestInput);
		rootPath = `${DEFAULT_ROOT_PATH}-${digest.slice(0, 8)}`;
		ensured = await folders_ensure(ctx, rootPath, { readOnly: true });
		if (ensured instanceof Response) {
			return ensured;
		}
	}

	const rootState: chatbe_RootState = { rootPath, readmePath: `${rootPath}/README.md` };

	const states = await list_public_channel_states(ctx);
	if (states instanceof Response) {
		return states;
	}
	const readme = await write_readme(ctx, rootState, states);
	if (readme instanceof Response) {
		return readme;
	}

	const stateWrite = await data_write(ctx, chatbe_PROJECTION_COLLECTION, chatbe_ROOT_STATE_KEY, rootState);
	if (stateWrite instanceof Response) {
		return stateWrite;
	}
	return rootState;
}

type ChannelDoc = {
	key: string;
	name: string;
	topic: string | null;
	archived: boolean;
	archivedAt: number | null;
};

async function read_channel_doc(ctx: Ctx, channelKey: string): Promise<ChannelDoc | Response> {
	const read = await data_read(ctx, "channels", channelKey);
	if (read instanceof Response) {
		return read;
	}

	const doc = parse_stored_doc(read.document);
	if (doc === null) {
		return refuse(404, "Channel not found");
	}
	const value = chat_channel_value_schema.safeParse(doc.value);
	if (!value.success) {
		return refuse(404, "Channel not found");
	}
	return {
		key: channelKey,
		name: value.data.name,
		topic: value.data.topic ?? null,
		archived: value.data.archivedAt !== null,
		archivedAt: value.data.archivedAt,
	};
}

type ChannelProjection = {
	rootState: chatbe_RootState;
	state: chatbe_ChannelState;
	stateLocation: { collection: string; key: string };
};

/**
 * Load one channel's projection state, creating the folder, the tail file, the state doc, and
 * (for a public channel) the README row when they are missing. First send on a fresh channel and
 * healing after a lost state doc both go through here.
 */
async function ensure_channel(ctx: Ctx, channel: ChannelDoc): Promise<ChannelProjection | Response> {
	const stateLocation = chatbe_channel_state_location(channel.key);
	const rootState = await ensure_root(ctx);
	if (rootState instanceof Response) {
		return rootState;
	}

	const read = await data_read(ctx, stateLocation.collection, stateLocation.key);
	if (read instanceof Response) {
		return read;
	}
	const existingDoc = parse_stored_doc(read.document);
	if (existingDoc !== null) {
		const existingState = chatbe_channel_state_schema.safeParse(existingDoc.value);
		if (existingState.success) {
			return { rootState, state: existingState.data, stateLocation };
		}
	}

	let slug: string;
	let folderPath: string;
	if (chat_channel_is_private(channel.key)) {
		// A digest suffix keeps two same-named private channels in separate folders, because two
		// channels sharing one ACL-bound folder would leak one channel to the other's members.
		const digest = await chatbe_sha256_hex(channel.key);
		slug = `${chatbe_slug_channel_name(channel.name)}-${digest.slice(0, 8)}`;
		folderPath = `${rootState.rootPath}/private/${slug}`;

		const parent = await folders_ensure(ctx, `${rootState.rootPath}/private`, { readOnly: true });
		if (parent instanceof Response) {
			return parent;
		}
		// The channel's data scope id IS the channel key; binding it makes the folder readable by
		// exactly the channel's members (and the organization owner).
		const folder = await folders_ensure(ctx, folderPath, { readOnly: true, readScopeId: channel.key });
		if (folder instanceof Response) {
			return folder;
		}
	} else {
		const states = await list_public_channel_states(ctx);
		if (states instanceof Response) {
			return states;
		}
		slug = chatbe_slug_channel_name(channel.name);
		for (const [stateKey, state] of states) {
			if (stateKey !== channel.key && state.slug === slug) {
				slug = await chatbe_collision_slug(channel.name, channel.key);
				break;
			}
		}
		folderPath = rootState.rootPath;

		states.set(channel.key, {
			slug,
			folderPath,
			tailIndex: 0,
			name: channel.name,
			topic: channel.topic,
			archived: channel.archived,
		});
		const readme = await write_readme(ctx, rootState, states);
		if (readme instanceof Response) {
			return readme;
		}
	}

	const state: chatbe_ChannelState = {
		slug,
		folderPath,
		tailIndex: 0,
		name: channel.name,
		topic: channel.topic,
		archived: channel.archived,
	};

	// Keep an existing tail's content: `ensure_channel` may run because only the state doc was
	// lost. A 409 answer would mean an unowned occupant, which files_write reports anyway.
	const existingTail = await files_read_or_null(ctx, chatbe_tail_path(state));
	if (existingTail instanceof Response) {
		return existingTail;
	}
	if (existingTail === null) {
		const header = chatbe_channel_header(channel.name, channel.topic, chat_channel_is_private(channel.key));
		const tail = await files_write(ctx, chatbe_tail_path(state), header);
		if (tail instanceof Response) {
			return tail;
		}
	}

	const stateWrite = await data_write(ctx, stateLocation.collection, stateLocation.key, state);
	if (stateWrite instanceof Response) {
		return stateWrite;
	}
	return { rootState, state, stateLocation };
}

/**
 * Append one rendered block to the channel's tail file. Refreshes a stale header (a rename that
 * went past the projection), and rolls the tail over into a numbered read-only file when the
 * append would cross the size cap. The rolled file keeps the old tail verbatim, header included —
 * a small, documented deviation from the core splitter's header-less rollover files.
 */
async function append_block(ctx: Ctx, projection: ChannelProjection, channel: ChannelDoc, block: string) {
	const { state, stateLocation } = projection;
	const tailPath = chatbe_tail_path(state);
	const header = chatbe_channel_header(channel.name, channel.topic, chat_channel_is_private(channel.key));

	const tail = await files_read_or_null(ctx, tailPath);
	if (tail instanceof Response) {
		return tail;
	}

	let content = tail === null ? header : tail.content;
	let stateChanged = false;
	// Refresh the header when the stored name or topic moved past what the tail was rendered with.
	if (state.name !== channel.name || state.topic !== channel.topic) {
		content = chatbe_replace_header(content, header);
		state.name = channel.name;
		state.topic = channel.topic;
		stateChanged = true;
	}

	const appended = `${content}\n\n${block}`;
	if (chatbe_utf8_byte_size(appended) > chatbe_ROLLOVER_MAX_BYTES) {
		const archivedPath = chatbe_rollover_path(state.folderPath, state.slug, state.tailIndex + 1);
		const archived = await files_write(ctx, archivedPath, content);
		if (archived instanceof Response) {
			return archived;
		}
		const restarted = await files_write(ctx, tailPath, `${header}\n\n${block}`);
		if (restarted instanceof Response) {
			return restarted;
		}
		state.tailIndex += 1;
		stateChanged = true;
	} else {
		const written = await files_write(ctx, tailPath, appended);
		if (written instanceof Response) {
			return written;
		}
	}

	if (stateChanged) {
		const stateWrite = await data_write(ctx, stateLocation.collection, stateLocation.key, state);
		if (stateWrite instanceof Response) {
			return stateWrite;
		}
	}
	return null;
}

/**
 * Find the transcript file containing a block and rewrite it with `edit`. Scans the tail first,
 * then the rolled files newest-first, bounded. Answers false when the block is in none of them —
 * the store is already correct and reconcile will heal the transcript.
 */
async function update_block_in_transcript(
	ctx: Ctx,
	state: chatbe_ChannelState,
	key: string,
	edit: (content: string) => string | null,
): Promise<boolean | Response> {
	const paths = [chatbe_tail_path(state)];
	for (let index = state.tailIndex; index >= 1 && paths.length < TRANSCRIPT_SCAN_MAX_FILES; index -= 1) {
		paths.push(chatbe_rollover_path(state.folderPath, state.slug, index));
	}

	for (const path of paths) {
		const file = await files_read_or_null(ctx, path);
		if (file instanceof Response) {
			return file;
		}
		if (file === null) {
			continue;
		}

		const edited = edit(file.content);
		if (edited === null) {
			continue;
		}
		const written = await files_write(ctx, path, edited);
		if (written instanceof Response) {
			return written;
		}
		return true;
	}
	return false;
}

// #endregion root and channel projection state

// #region idempotent send requests

/** A replayed clientRequestId answers the stored outcome instead of sending twice. */
async function read_request_state(ctx: Ctx, clientRequestId: string) {
	const read = await data_read(ctx, chatbe_REQUESTS_COLLECTION, clientRequestId);
	if (read instanceof Response) {
		return read;
	}

	const doc = parse_stored_doc(read.document);
	if (doc === null) {
		return null;
	}
	const state = chatbe_request_state_schema.safeParse(doc.value);
	return state.success ? state.data : null;
}

// #endregion idempotent send requests

// #region endpoint handlers

const send_input_schema = z.object({
	channelKey: z.string().min(1).max(128),
	text: z.string().min(1),
	attachments: z.array(chat_attachment_schema).max(20).default([]),
	mentions: z.array(chat_user_id_schema).max(50).default([]),
	/** The sender's own display name, snapshotted onto the message for transcript rendering. */
	authorName: z.string().nullable().default(null),
	clientRequestId: z.string().min(1).max(64),
});

async function handle_message_send(ctx: Ctx, input: z.infer<typeof send_input_schema>) {
	const replayed = await read_request_state(ctx, input.clientRequestId);
	if (replayed instanceof Response) {
		return replayed;
	}
	if (replayed !== null) {
		const repaired = await repair_replayed_block(ctx, replayed.messageKey);
		if (repaired instanceof Response) {
			return repaired;
		}
		return json_response(200, { messageKey: replayed.messageKey, replayed: true });
	}

	const channel = await read_channel_doc(ctx, input.channelKey);
	if (channel instanceof Response) {
		return channel;
	}
	if (channel.archived) {
		return refuse(409, "This channel is archived");
	}

	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) {
		return projection;
	}

	const messageKey = mint_appended_key(`${input.channelKey}:`, ctx.now);
	const value: Record<string, unknown> = {
		text: input.text,
		attachments: input.attachments,
		editedAt: null,
		deletedAt: null,
		...(input.mentions.length > 0 ? { mentions: input.mentions } : {}),
		...(chatbe_bounded_author_name(input.authorName) !== null
			? { authorName: chatbe_bounded_author_name(input.authorName) }
			: {}),
	};
	if (message_value_json(value) > STORE_VALUE_MAX_BYTES) {
		return refuse(413, "This message is too long to store. Shorten it and send again.");
	}

	// The store first: it is the source of truth, and a transcript write that dies after this
	// leaves a block missing until reconcile, never a block without a document.
	const written = await data_write_batch(ctx, [
		{ collection: "messages", key: messageKey, value },
		{
			collection: chatbe_REQUESTS_COLLECTION,
			key: input.clientRequestId,
			value: { endpoint: "message-send", messageKey, createdAt: ctx.now },
		},
	]);
	if (written instanceof Response) {
		return written;
	}

	const doc = parse_message_doc({
		key: messageKey,
		value,
		revision: 1,
		createdBy: ctx.actorUserId,
		createdAt: ctx.now,
	});
	if (doc === null) {
		return refuse(500, "Failed to render the sent message");
	}
	const appended = await append_block(ctx, projection, channel, render_block(doc, []));
	if (appended instanceof Response) {
		return appended;
	}

	return json_response(200, { messageKey });
}

const reply_input_schema = z.object({
	rootMessageKey: z.string().min(1).max(200),
	text: z.string().min(1),
	attachments: z.array(chat_attachment_schema).max(20).default([]),
	mentions: z.array(chat_user_id_schema).max(50).default([]),
	authorName: z.string().nullable().default(null),
	clientRequestId: z.string().min(1).max(64),
});

async function handle_reply_send(ctx: Ctx, input: z.infer<typeof reply_input_schema>) {
	const replayed = await read_request_state(ctx, input.clientRequestId);
	if (replayed instanceof Response) {
		return replayed;
	}
	if (replayed !== null) {
		const repaired = await repair_replayed_block(ctx, replayed.messageKey);
		if (repaired instanceof Response) {
			return repaired;
		}
		return json_response(200, { messageKey: replayed.messageKey, replayed: true });
	}

	if (message_collection_for_key(input.rootMessageKey) !== "messages") {
		return refuse(400, "Replies can only answer a root message");
	}
	const channelKey = chat_message_channel_key(input.rootMessageKey) ?? input.rootMessageKey.split(":")[0]!;

	const rootRead = await data_read(ctx, "messages", input.rootMessageKey);
	if (rootRead instanceof Response) {
		return rootRead;
	}
	if (parse_message_doc(rootRead.document) === null) {
		return refuse(404, "Message not found");
	}

	const channel = await read_channel_doc(ctx, channelKey);
	if (channel instanceof Response) {
		return channel;
	}
	if (channel.archived) {
		return refuse(409, "This channel is archived");
	}

	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) {
		return projection;
	}

	const replyKey = mint_appended_key(`${input.rootMessageKey}:`, ctx.now);
	const value: Record<string, unknown> = {
		text: input.text,
		attachments: input.attachments,
		editedAt: null,
		deletedAt: null,
		...(input.mentions.length > 0 ? { mentions: input.mentions } : {}),
		...(chatbe_bounded_author_name(input.authorName) !== null
			? { authorName: chatbe_bounded_author_name(input.authorName) }
			: {}),
	};
	if (message_value_json(value) > STORE_VALUE_MAX_BYTES) {
		return refuse(413, "This message is too long to store. Shorten it and send again.");
	}

	const written = await data_write_batch(ctx, [
		{ collection: "replies", key: replyKey, value },
		{
			collection: chatbe_REQUESTS_COLLECTION,
			key: input.clientRequestId,
			value: { endpoint: "reply-send", messageKey: replyKey, createdAt: ctx.now },
		},
	]);
	if (written instanceof Response) {
		return written;
	}

	const doc = parse_message_doc({
		key: replyKey,
		value,
		revision: 1,
		createdBy: ctx.actorUserId,
		createdAt: ctx.now,
	});
	if (doc === null) {
		return refuse(500, "Failed to render the sent reply");
	}
	const block = render_block(doc, []);
	const transcriptUpdated = await update_block_in_transcript(ctx, projection.state, input.rootMessageKey, (content) =>
		chatbe_insert_reply_block(content, input.rootMessageKey, block),
	);
	if (transcriptUpdated instanceof Response) {
		return transcriptUpdated;
	}

	return json_response(200, { messageKey: replyKey, transcriptUpdated });
}

const edit_input_schema = z.object({
	messageKey: z.string().min(1).max(200),
	text: z.string().min(1),
	mentions: z.array(chat_user_id_schema).max(50).default([]),
});

const delete_input_schema = z.object({
	messageKey: z.string().min(1).max(200),
});

async function load_own_message(ctx: Ctx, messageKey: string) {
	const collection = message_collection_for_key(messageKey);
	if (collection === null) {
		return refuse(400, "Not a message key");
	}

	const read = await data_read(ctx, collection, messageKey);
	if (read instanceof Response) {
		return read;
	}
	const doc = parse_message_doc(read.document);
	if (doc === null) {
		return refuse(404, "Message not found");
	}
	// The authorship rule: machine-written docs are shared at the storage layer, so the worker is
	// the place that keeps another member's messages out of reach.
	if (doc.createdBy !== ctx.actorUserId) {
		return refuse(403, "You can only change your own messages");
	}
	return { collection, doc };
}

/**
 * Whether a block for `key` is already in one of the channel's transcript files. Scans the same
 * bounded set of files `update_block_in_transcript` scans: the tail first, then rolled files
 * newest-first.
 */
async function transcript_has_block(
	ctx: Ctx,
	state: chatbe_ChannelState,
	key: string,
): Promise<boolean | Response> {
	const paths = [chatbe_tail_path(state)];
	for (let index = state.tailIndex; index >= 1 && paths.length < TRANSCRIPT_SCAN_MAX_FILES; index -= 1) {
		paths.push(chatbe_rollover_path(state.folderPath, state.slug, index));
	}

	for (const path of paths) {
		const file = await files_read_or_null(ctx, path);
		if (file instanceof Response) {
			return file;
		}
		if (file !== null && chatbe_file_contains_block(file.content, key)) {
			return true;
		}
	}
	return false;
}

/**
 * Write the transcript block of a replayed send when the first attempt never wrote it.
 *
 * The store and the transcript are two systems with one write each. A send writes the store
 * first. If the run dies after that write, the page retries with the same request id, and the
 * replay branch would answer "already done" while the block is still missing from the file. So
 * look for the block first and write it only when it is absent. A block that is already there is
 * left alone, which is what makes this safe to run on every replay.
 */
async function repair_replayed_block(ctx: Ctx, messageKey: string): Promise<null | Response> {
	const collection = message_collection_for_key(messageKey);
	if (collection === null) {
		return null;
	}
	// Both key shapes put the channel key in the first `:` segment.
	const channel = await read_channel_doc(ctx, messageKey.split(":")[0]!);
	if (channel instanceof Response) {
		return channel;
	}
	// An archived channel takes no new writes. Its store doc is still correct, and reconcile
	// rebuilds the transcript if the channel is ever reopened.
	if (channel.archived) {
		return null;
	}

	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) {
		return projection;
	}
	const present = await transcript_has_block(ctx, projection.state, messageKey);
	if (present instanceof Response) {
		return present;
	}
	if (present) {
		return null;
	}

	const read = await data_read(ctx, collection, messageKey);
	if (read instanceof Response) {
		return read;
	}
	const doc = parse_message_doc(read.document);
	if (doc === null) {
		return null;
	}

	const block = render_block(doc, []);
	if (collection === "messages") {
		const appended = await append_block(ctx, projection, channel, block);
		return appended instanceof Response ? appended : null;
	}

	const rootKey = chat_reply_root_key(messageKey);
	if (rootKey === null) {
		return null;
	}
	const inserted = await update_block_in_transcript(ctx, projection.state, rootKey, (content) =>
		chatbe_insert_reply_block(content, rootKey, block),
	);
	return inserted instanceof Response ? inserted : null;
}

async function splice_updated_block(ctx: Ctx, doc: MessageDoc) {
	// A reply key's `chat_message_channel_key` answer would be the ROOT key, not the channel.
	// Both key shapes put the channel key in the first `:` segment.
	const channelKey = doc.key.split(":")[0]!;
	const channel = await read_channel_doc(ctx, channelKey);
	if (channel instanceof Response) {
		return channel;
	}
	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) {
		return projection;
	}

	const reactions = await list_reactions_for(ctx, doc.key);
	if (reactions instanceof Response) {
		return reactions;
	}
	const block = render_block(doc, reactions);
	return update_block_in_transcript(ctx, projection.state, doc.key, (content) =>
		chatbe_splice_block(content, doc.key, block),
	);
}

async function handle_message_edit(ctx: Ctx, input: z.infer<typeof edit_input_schema>) {
	const loaded = await load_own_message(ctx, input.messageKey);
	if (loaded instanceof Response) {
		return loaded;
	}
	if (loaded.doc.value.deletedAt !== null) {
		return refuse(409, "This message was deleted");
	}

	const value: Record<string, unknown> = {
		text: input.text,
		attachments: loaded.doc.value.attachments,
		editedAt: ctx.now,
		deletedAt: null,
		...(input.mentions.length > 0 ? { mentions: input.mentions } : {}),
		...(loaded.doc.authorName !== null ? { authorName: loaded.doc.authorName } : {}),
	};
	if (message_value_json(value) > STORE_VALUE_MAX_BYTES) {
		return refuse(413, "This message is too long to store. Shorten it and send again.");
	}

	const written = await data_write(ctx, loaded.collection, input.messageKey, value);
	if (written instanceof Response) {
		return written;
	}

	const updatedDoc: MessageDoc = {
		...loaded.doc,
		value: { ...loaded.doc.value, text: input.text, editedAt: ctx.now, mentions: input.mentions },
	};
	const transcriptUpdated = await splice_updated_block(ctx, updatedDoc);
	if (transcriptUpdated instanceof Response) {
		return transcriptUpdated;
	}
	// The page echoes the stored doc locally; the revision keeps its merge-forward store correct.
	return json_response(200, { transcriptUpdated, revision: written.revision });
}

async function handle_message_delete(ctx: Ctx, input: z.infer<typeof delete_input_schema>) {
	const loaded = await load_own_message(ctx, input.messageKey);
	if (loaded instanceof Response) {
		return loaded;
	}
	if (loaded.doc.value.deletedAt !== null) {
		return json_response(200, { transcriptUpdated: false, replayed: true });
	}

	// A delete is a value tombstone, like the old user-door delete: the doc stays, renderers
	// show the deleted marker and drop the text.
	const value: Record<string, unknown> = {
		text: loaded.doc.value.text,
		attachments: loaded.doc.value.attachments,
		editedAt: loaded.doc.value.editedAt,
		deletedAt: ctx.now,
		...(loaded.doc.value.mentions !== undefined ? { mentions: loaded.doc.value.mentions } : {}),
		...(loaded.doc.authorName !== null ? { authorName: loaded.doc.authorName } : {}),
	};
	const written = await data_write(ctx, loaded.collection, input.messageKey, value);
	if (written instanceof Response) {
		return written;
	}

	const updatedDoc: MessageDoc = { ...loaded.doc, value: { ...loaded.doc.value, deletedAt: ctx.now } };
	const transcriptUpdated = await splice_updated_block(ctx, updatedDoc);
	if (transcriptUpdated instanceof Response) {
		return transcriptUpdated;
	}
	return json_response(200, { transcriptUpdated, revision: written.revision });
}

const reaction_input_schema = z.object({
	targetKey: z.string().min(1).max(200),
	token: z.enum(chat_REACTION_TOKENS),
	on: z.boolean(),
});

async function handle_reaction_toggle(ctx: Ctx, input: z.infer<typeof reaction_input_schema>) {
	const collection = message_collection_for_key(input.targetKey);
	if (collection === null) {
		return refuse(400, "Not a message key");
	}

	const read = await data_read(ctx, collection, input.targetKey);
	if (read instanceof Response) {
		return read;
	}
	const target = parse_message_doc(read.document);
	if (target === null) {
		return refuse(404, "Message not found");
	}

	// The acting member comes from the envelope, so nobody can toggle another member's reaction.
	const reactionKey = `${input.targetKey}:${input.token}:${ctx.actorUserId}`;
	const written = await data_write(ctx, "reactions", reactionKey, { removed: !input.on });
	if (written instanceof Response) {
		return written;
	}

	const transcriptUpdated = await splice_updated_block(ctx, target);
	if (transcriptUpdated instanceof Response) {
		return transcriptUpdated;
	}
	return json_response(200, { transcriptUpdated, key: reactionKey, revision: written.revision });
}

const channel_manage_input_schema = z.discriminatedUnion("action", [
	z.object({
		action: z.literal("create"),
		name: z.string().min(1).max(chat_CHANNEL_NAME_MAX_LENGTH),
		topic: z.string().max(chat_CHANNEL_TOPIC_MAX_LENGTH).nullable().default(null),
		clientRequestId: z.string().min(1).max(64),
	}),
	z.object({ action: z.literal("ensure"), channelKey: z.string().min(1).max(128) }),
	// One merged update per run: the page's rename dialog changes name and topic together, and
	// the archive dialogs flip only `archived`. Absent fields keep the stored value.
	z.object({
		action: z.literal("update"),
		channelKey: z.string().min(1).max(128),
		name: z
			.string()
			.min(1)
			.max(chat_CHANNEL_NAME_MAX_LENGTH)
			.optional(),
		topic: z.string().max(chat_CHANNEL_TOPIC_MAX_LENGTH).nullable().optional(),
		archived: z.boolean().optional(),
	}),
]);

/**
 * After a channel doc change, refresh the projection: state fields, the README (public
 * channels), and the tail header — a rename must show in the transcript without waiting for the
 * next append.
 */
async function refresh_channel_projection(ctx: Ctx, channel: ChannelDoc) {
	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) {
		return projection;
	}
	const { state, stateLocation, rootState } = projection;

	if (state.name !== channel.name || state.topic !== channel.topic || state.archived !== channel.archived) {
		if (state.name !== channel.name || state.topic !== channel.topic) {
			const tailPath = chatbe_tail_path(state);
			const tail = await files_read_or_null(ctx, tailPath);
			if (tail instanceof Response) {
				return tail;
			}
			if (tail !== null) {
				const header = chatbe_channel_header(channel.name, channel.topic, chat_channel_is_private(channel.key));
				const written = await files_write(ctx, tailPath, chatbe_replace_header(tail.content, header));
				if (written instanceof Response) {
					return written;
				}
			}
		}

		state.name = channel.name;
		state.topic = channel.topic;
		state.archived = channel.archived;
		const stateWrite = await data_write(ctx, stateLocation.collection, stateLocation.key, state);
		if (stateWrite instanceof Response) {
			return stateWrite;
		}
	}

	if (!chat_channel_is_private(channel.key)) {
		const states = await list_public_channel_states(ctx);
		if (states instanceof Response) {
			return states;
		}
		const readme = await write_readme(ctx, rootState, states);
		if (readme instanceof Response) {
			return readme;
		}
	}
	return null;
}

async function handle_channel_manage(ctx: Ctx, input: z.infer<typeof channel_manage_input_schema>) {
	if (input.action === "create") {
		const replayed = await read_request_state(ctx, input.clientRequestId);
		if (replayed instanceof Response) {
			return replayed;
		}
		if (replayed !== null) {
			// The channel doc is stored, but the run may have died before the folder and tail file
			// existed. `ensure_channel` is idempotent, so finish that half here instead of leaving a
			// channel the page can post into with no transcript behind it.
			const channel = await read_channel_doc(ctx, replayed.messageKey);
			if (channel instanceof Response) {
				return channel;
			}
			const ensured = await ensure_channel(ctx, channel);
			if (ensured instanceof Response) {
				return ensured;
			}
			return json_response(200, { channelKey: replayed.messageKey, replayed: true });
		}

		// Public only. A private channel needs its data scope, which only the page's user-door
		// scope-and-document call can create; its projection bootstraps on the first send.
		const channelKey = crypto.randomUUID();
		const written = await data_write_batch(ctx, [
			{
				collection: "channels",
				key: channelKey,
				value: {
					name: input.name,
					archivedAt: null,
					...(input.topic !== null && input.topic !== "" ? { topic: input.topic } : {}),
				},
			},
			{
				collection: chatbe_REQUESTS_COLLECTION,
				key: input.clientRequestId,
				value: { endpoint: "channel-manage", messageKey: channelKey, createdAt: ctx.now },
			},
		]);
		if (written instanceof Response) {
			return written;
		}

		const ensured = await ensure_channel(ctx, {
			key: channelKey,
			name: input.name,
			topic: input.topic !== "" ? input.topic : null,
			archived: false,
			archivedAt: null,
		});
		if (ensured instanceof Response) {
			return ensured;
		}
		return json_response(200, { channelKey });
	}

	const channel = await read_channel_doc(ctx, input.channelKey);
	if (channel instanceof Response) {
		return channel;
	}

	if (input.action === "ensure") {
		const ensured = await ensure_channel(ctx, channel);
		if (ensured instanceof Response) {
			return ensured;
		}
		return json_response(200, {});
	}

	// An untouched archived flag keeps its original timestamp; only a real flip stamps now.
	const archivedAt = input.archived === undefined ? channel.archivedAt : input.archived ? (channel.archivedAt ?? ctx.now) : null;
	const updated: ChannelDoc = {
		key: channel.key,
		name: input.name ?? channel.name,
		topic: input.topic !== undefined ? input.topic : channel.topic,
		archived: archivedAt !== null,
		archivedAt,
	};
	const value: Record<string, unknown> = {
		name: updated.name,
		archivedAt: updated.archivedAt,
		...(updated.topic !== null ? { topic: updated.topic } : {}),
	};
	const written = await data_write(ctx, "channels", channel.key, value);
	if (written instanceof Response) {
		return written;
	}

	const refreshed = await refresh_channel_projection(ctx, updated);
	if (refreshed instanceof Response) {
		return refreshed;
	}
	return json_response(200, {});
}

const reconcile_input_schema = z.object({
	channelKey: z.string().min(1).max(128).nullable().default(null),
});

/**
 * Rebuild one channel's transcript from the store. When the channel fits the run's list caps,
 * the whole file set is rewritten; a larger channel gets a truncated tail-only rebuild and says
 * so — a deviation from the plan's unbounded resumable rebuild, sized to dev-scale data.
 */
async function handle_reconcile(ctx: Ctx, input: z.infer<typeof reconcile_input_schema>) {
	if (input.channelKey === null) {
		const rootState = await ensure_root(ctx);
		if (rootState instanceof Response) {
			return rootState;
		}
		const states = await list_public_channel_states(ctx);
		if (states instanceof Response) {
			return states;
		}
		const readme = await write_readme(ctx, rootState, states);
		if (readme instanceof Response) {
			return readme;
		}
		return json_response(200, { done: true });
	}

	const channel = await read_channel_doc(ctx, input.channelKey);
	if (channel instanceof Response) {
		return channel;
	}
	const projection = await ensure_channel(ctx, channel);
	if (projection instanceof Response) {
		return projection;
	}
	const { state, stateLocation } = projection;

	const collect = async (collection: string, maxPages: number) => {
		const documents: unknown[] = [];
		let cursor: string | null = null;
		let isDone = false;
		for (let page = 0; page < maxPages && !isDone; page += 1) {
			const listed = await data_list(ctx, {
				collection,
				keyPrefix: `${input.channelKey}:`,
				limit: LIST_PAGE_SIZE,
				...(cursor !== null ? { cursor } : {}),
			});
			if (listed instanceof Response) {
				return listed;
			}
			documents.push(...listed.documents);
			cursor = listed.cursor;
			isDone = listed.isDone;
		}
		return { documents, isDone };
	};

	const [messagesRaw, repliesRaw, reactionsRaw] = [
		await collect("messages", RECONCILE_MESSAGE_PAGES),
		await collect("replies", RECONCILE_REPLY_PAGES),
		await collect("reactions", RECONCILE_REACTION_PAGES),
	];
	if (messagesRaw instanceof Response) {
		return messagesRaw;
	}
	if (repliesRaw instanceof Response) {
		return repliesRaw;
	}
	if (reactionsRaw instanceof Response) {
		return reactionsRaw;
	}

	const messages: MessageDoc[] = [];
	for (const raw of messagesRaw.documents) {
		const doc = parse_message_doc(raw);
		if (doc !== null && message_collection_for_key(doc.key) === "messages") {
			messages.push(doc);
		}
	}
	const repliesByRoot = new Map<string, MessageDoc[]>();
	for (const raw of repliesRaw.documents) {
		const doc = parse_message_doc(raw);
		if (doc === null || message_collection_for_key(doc.key) !== "replies") {
			continue;
		}
		const rootKey = doc.key.split(":").slice(0, 3).join(":");
		const bucket = repliesByRoot.get(rootKey) ?? [];
		bucket.push(doc);
		repliesByRoot.set(rootKey, bucket);
	}
	const reactionsByTarget = new Map<string, chatbe_ProjectionReaction[]>();
	for (const raw of reactionsRaw.documents) {
		const doc = parse_stored_doc(raw);
		if (doc === null) {
			continue;
		}
		const value = reaction_doc_value_schema.safeParse(doc.value);
		if (!value.success) {
			continue;
		}
		const parts = doc.key.split(":");
		const token = parts[parts.length - 2];
		if (!token || !(chat_REACTION_TOKENS as readonly string[]).includes(token)) {
			continue;
		}
		const targetKey = parts.slice(0, -2).join(":");
		const bucket = reactionsByTarget.get(targetKey) ?? [];
		bucket.push({ targetKey, token, removed: value.data.removed });
		reactionsByTarget.set(targetKey, bucket);
	}

	const header = chatbe_channel_header(channel.name, channel.topic, chat_channel_is_private(channel.key));
	const sort = (docs: MessageDoc[]) =>
		[...docs].sort((left, right) =>
			left.createdAt !== right.createdAt
				? left.createdAt - right.createdAt
				: left.key < right.key
					? -1
					: left.key > right.key
						? 1
						: 0,
		);
	// Render each block with the message's own author snapshot, matching the append path.
	const blocks: string[] = [];
	for (const message of sort(messages)) {
		blocks.push(render_block(message, reactionsByTarget.get(message.key) ?? []));
		for (const reply of sort(repliesByRoot.get(message.key) ?? [])) {
			blocks.push(render_block(reply, reactionsByTarget.get(reply.key) ?? []));
		}
	}

	const truncated = !messagesRaw.isDone || !repliesRaw.isDone || !reactionsRaw.isDone;
	if (truncated) {
		// Too much history for one run: rewrite only the tail with the newest blocks that fit,
		// leave rolled files alone, and say so.
		const files = chatbe_split_rollover({ header, blocks, maxBytes: chatbe_ROLLOVER_MAX_BYTES });
		const written = await files_write(ctx, chatbe_tail_path(state), files[files.length - 1]!);
		if (written instanceof Response) {
			return written;
		}
		return json_response(200, { done: true, truncated: true });
	}

	const files = chatbe_split_rollover({ header, blocks, maxBytes: chatbe_ROLLOVER_MAX_BYTES });
	// `files` is oldest-first; the newest becomes the tail, the rest the numbered rolled files.
	for (let index = 0; index < files.length - 1; index += 1) {
		const written = await files_write(ctx, chatbe_rollover_path(state.folderPath, state.slug, index + 1), files[index]!);
		if (written instanceof Response) {
			return written;
		}
	}
	const tailWritten = await files_write(ctx, chatbe_tail_path(state), files[files.length - 1]!);
	if (tailWritten instanceof Response) {
		return tailWritten;
	}

	// Archive rolled files beyond the rebuilt set, so a shrunken history leaves no stale tail.
	const newTailIndex = files.length - 1;
	for (let index = newTailIndex + 1; index <= state.tailIndex; index += 1) {
		const archived = await files_archive(ctx, chatbe_rollover_path(state.folderPath, state.slug, index));
		if (archived instanceof Response) {
			return archived;
		}
	}

	if (state.tailIndex !== newTailIndex || state.name !== channel.name || state.topic !== channel.topic) {
		state.tailIndex = newTailIndex;
		state.name = channel.name;
		state.topic = channel.topic;
		state.archived = channel.archived;
		const stateWrite = await data_write(ctx, stateLocation.collection, stateLocation.key, state);
		if (stateWrite instanceof Response) {
			return stateWrite;
		}
	}

	return json_response(200, { done: true, files: files.length });
}

// #endregion endpoint handlers

async function handle_invoke(ctx: Ctx, endpointId: string, input: unknown): Promise<Response> {
	const parse = <T>(schema: z.ZodType<T>): T | Response => {
		const parsed = schema.safeParse(input ?? {});
		if (!parsed.success) {
			return refuse(400, "Invalid input for this endpoint");
		}
		return parsed.data;
	};

	switch (endpointId) {
		case "message-send": {
			const parsed = parse(send_input_schema);
			return parsed instanceof Response ? parsed : handle_message_send(ctx, parsed);
		}
		case "message-edit": {
			const parsed = parse(edit_input_schema);
			return parsed instanceof Response ? parsed : handle_message_edit(ctx, parsed);
		}
		case "message-delete": {
			const parsed = parse(delete_input_schema);
			return parsed instanceof Response ? parsed : handle_message_delete(ctx, parsed);
		}
		case "reply-send": {
			const parsed = parse(reply_input_schema);
			return parsed instanceof Response ? parsed : handle_reply_send(ctx, parsed);
		}
		case "reaction-toggle": {
			const parsed = parse(reaction_input_schema);
			return parsed instanceof Response ? parsed : handle_reaction_toggle(ctx, parsed);
		}
		case "channel-manage": {
			const parsed = parse(channel_manage_input_schema);
			return parsed instanceof Response ? parsed : handle_channel_manage(ctx, parsed);
		}
		case "reconcile": {
			const parsed = parse(reconcile_input_schema);
			return parsed instanceof Response ? parsed : handle_reconcile(ctx, parsed);
		}
		default:
			return refuse(404, "Unknown endpoint");
	}
}

const worker = {
	async fetch(request: Request, env: BonoboEnv): Promise<Response> {
		let body: unknown;
		try {
			body = await request.json();
		} catch {
			return refuse(400, "Invalid request body");
		}

		const envelope = envelope_schema.safeParse(body);
		if (!envelope.success) {
			// This plugin declares no upload events, so anything but a UI invoke is unexpected.
			return refuse(400, "Unsupported event");
		}

		const known = chat_BACKEND_ENDPOINTS.some((endpoint) => endpoint.id === envelope.data.invoke.endpointId);
		if (!known) {
			return refuse(404, "Unknown endpoint");
		}

		const ctx: Ctx = {
			host: chatbe_create_host(env),
			actorUserId: envelope.data.actorUserId,
			now: Date.now(),
			rootDigestInput: `${envelope.data.organizationId}:${envelope.data.workspaceId}`,
		};
		return handle_invoke(ctx, envelope.data.invoke.endpointId, envelope.data.invoke.input);
	},
};

export default worker;
