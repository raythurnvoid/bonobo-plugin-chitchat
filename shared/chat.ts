import { v, type Infer } from "convex/values";

export const chat_REACTION_TOKENS = ["thumbs_up", "heart", "laugh", "wow", "sad", "party", "rocket", "eyes"] as const;
export const chat_MESSAGE_MAX_BYTES = 16_384;
export const chat_CHANNEL_MEMBER_LIMIT = 50;
export const chat_PAGE_SIZE = 50;
export const chat_PAGE_MAX_BYTES = 900_000;

export const chat_reaction_token = v.union(
	v.literal("thumbs_up"),
	v.literal("heart"),
	v.literal("laugh"),
	v.literal("wow"),
	v.literal("sad"),
	v.literal("party"),
	v.literal("rocket"),
	v.literal("eyes"),
);
export const chat_attachment = v.object({ fileNodeId: v.string(), name: v.string() });
export const chat_member_level = v.union(v.literal("read"), v.literal("write"), v.literal("manage"));
export const chat_error = v.object({ message: v.string(), name: v.optional(v.string()) });

export type chat_Result<T> = { _yay: T; _nay?: never } | { _nay: { message: string; name?: string }; _yay?: never };

export const chat_write_receipt = v.union(
	v.object({ kind: v.literal("message"), messageId: v.id("messages"), revision: v.number(), sequence: v.number() }),
	v.object({ kind: v.literal("channel"), channelId: v.id("channels"), revision: v.number() }),
	v.object({ kind: v.literal("reaction"), messageId: v.id("messages"), token: chat_reaction_token, on: v.boolean() }),
	v.object({
		kind: v.literal("membership"),
		channelId: v.id("channels"),
		membershipRevision: v.number(),
		left: v.boolean(),
		deleted: v.boolean(),
		pending: v.boolean(),
	}),
);
export const chat_write_result = v.union(v.object({ _yay: chat_write_receipt }), v.object({ _nay: chat_error }));
export type chat_WriteResult = chat_Result<Infer<typeof chat_write_receipt>>;

export const chat_transcript_operation = v.union(
	v.object({
		kind: v.literal("block"),
		messageId: v.id("messages"),
		rootSequence: v.number(),
		replySequence: v.number(),
		renderedBlock: v.string(),
		sourceRevision: v.number(),
	}),
	v.object({ kind: v.literal("header"), name: v.string(), topic: v.string(), isPrivate: v.boolean() }),
	v.object({ kind: v.literal("archive"), archived: v.boolean() }),
	v.object({
		kind: v.literal("readers"),
		readerRevision: v.number(),
		readers: v.array(v.object({ userId: v.string(), membershipLifetime: v.number() })),
		deleted: v.boolean(),
	}),
);

export function chat_validate_request_id(requestId: string) {
	return requestId.length > 0 && requestId.length <= 64;
}

export function chat_validate_message(value: {
	text: string;
	attachments: { fileNodeId: string; name: string }[];
	mentions: string[];
	authorName: string | null;
}) {
	if (value.text.trim() === "" && value.attachments.length === 0) {
		return "Enter a message or attach a file.";
	}
	if (value.attachments.length > 20 || value.attachments.some((file) => !file.fileNodeId || !file.name)) {
		return "A message can attach up to 20 named files.";
	}
	if (value.mentions.length > 50 || value.mentions.some((id) => !id)) {
		return "A message can mention up to 50 people.";
	}
	const storedValue = {
		text: value.text,
		attachments: value.attachments,
		editedAt: null,
		deletedAt: null,
		...(value.mentions.length > 0 ? { mentions: value.mentions } : {}),
		...(value.authorName !== null ? { authorName: value.authorName } : {}),
	};
	if (new TextEncoder().encode(JSON.stringify(storedValue)).byteLength > chat_MESSAGE_MAX_BYTES) {
		return "This message is too long to store. Shorten it and send again.";
	}
	return null;
}
