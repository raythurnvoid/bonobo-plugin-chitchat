import { z } from "zod";
import { chat_channel_is_private } from "../chat-data";

/**
 * Where the backend keeps its projection bookkeeping in the plugin document store.
 *
 * Public state lives in the machine-only `projection` collection (it is not in the manifest's
 * `userWritableCollections`, so members cannot write it). A private channel's state doc must not
 * disclose the channel to non-members, so it lives INSIDE the channel's scope: the `channels`
 * collection with a `<channelKey>:projection` key, which the scope's `<channelKey>` prefix
 * covers. Members of the channel could overwrite that doc through the user door; every read here
 * re-validates, and an unreadable state doc just means "set the projection up again".
 */

export const chatbe_PROJECTION_COLLECTION = "projection";
export const chatbe_REQUESTS_COLLECTION = "requests";
export const chatbe_ROOT_STATE_KEY = "__root__";

export const chatbe_root_state_schema = z.object({
	rootPath: z.string().min(1),
	readmePath: z.string().min(1),
});

export type chatbe_RootState = z.infer<typeof chatbe_root_state_schema>;

export const chatbe_channel_state_schema = z.object({
	slug: z.string().min(1),
	folderPath: z.string().min(1),
	/** How many rolled-over files exist (`slug.001.md` … `slug.<tailIndex>.md`). 0 = only the tail. */
	tailIndex: z.number().int().min(0),
	/** The channel name and topic the tail file's header was last rendered with. */
	name: z.string(),
	topic: z.string().nullable(),
	archived: z.boolean(),
});

export type chatbe_ChannelState = z.infer<typeof chatbe_channel_state_schema>;

/**
 * One send request's stored outcome, keyed by the page's `clientRequestId`. The installation
 * serialization lock orders every backend run, so read-then-write on this key is race-free.
 * These docs are kept forever; at dev scale that is accepted debt.
 */
export const chatbe_request_state_schema = z.object({
	endpoint: z.string(),
	messageKey: z.string(),
	createdAt: z.number(),
});

export type chatbe_RequestState = z.infer<typeof chatbe_request_state_schema>;

export function chatbe_channel_state_location(channelKey: string) {
	if (chat_channel_is_private(channelKey)) {
		return { collection: "channels", key: `${channelKey}:projection` };
	}

	return { collection: chatbe_PROJECTION_COLLECTION, key: channelKey };
}

export function chatbe_tail_path(state: Pick<chatbe_ChannelState, "folderPath" | "slug">) {
	return `${state.folderPath}/${state.slug}.md`;
}
