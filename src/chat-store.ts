import {
	chat_REACTION_TOKENS,
	chat_reply_root_key,
	type chat_Doc,
	type chat_MessageValue,
	type chat_ReactionDoc,
	type chat_ReactionToken,
} from "./chat-data";

function warn_dropped(raw: unknown) {
	if (import.meta.env.DEV) {
		console.warn("[chitchat] Dropped an invalid document", { raw });
	}
}

export type chat_AccumulatingStore<T extends { key: string; revision: number }> = {
	/**
	 * Merges one watch, window, feed, or HTTP page into the store and returns the update's
	 * validated docs (callers use them for arrival detection). Never removes anything: a
	 * doc that fell out of a plain watch's newest-100 window stays.
	 */
	apply_window(docs: unknown[]): T[];
	/** Merges one locally synthesized doc (an acked own send, edit, or delete). */
	apply_local(doc: T): void;
	/** All docs sorted ascending by key — with inverted-ms keys that is newest first. */
	get_sorted(): T[];
	/** How many raw docs failed validation and were dropped. */
	dropped_count(): number;
};

/**
 * The accumulate-by-key seam store for messages, replies, and reactions. Every update
 * merges into one map keyed by document key: keys are never reused, a doc only advances
 * forward (a lower revision never overwrites a higher one), and the same merge lets an
 * optimistic local echo coexist with the server's later delivery of the same key.
 * Message deletes are value tombstones (`deletedAt`). Reaction deletes are `{ removed: true }`
 * on the same owned key, so they stay in the map and the change feed can see them.
 */
export function chat_create_accumulating_store<T extends { key: string; revision: number }>(
	validate: (raw: unknown) => T | null,
): chat_AccumulatingStore<T> {
	const byKey = new Map<string, T>();
	let dropped = 0;

	const merge_one = (doc: T) => {
		const existing = byKey.get(doc.key);
		if (existing === undefined || doc.revision >= existing.revision) {
			byKey.set(doc.key, doc);
		}
	};

	const merge_raw = (docs: unknown[]) => {
		const valid: T[] = [];
		for (const raw of docs) {
			const doc = validate(raw);
			if (doc === null) {
				dropped += 1;
				warn_dropped(raw);
				continue;
			}
			valid.push(doc);
			merge_one(doc);
		}
		return valid;
	};

	return {
		apply_window: merge_raw,
		apply_local: merge_one,
		get_sorted() {
			return [...byKey.values()].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
		},
		dropped_count: () => dropped,
	};
}

export type chat_WindowStore<T> = {
	/** Replaces the whole content with this window's validated docs. */
	apply_window(docs: unknown[]): T[];
	get_all(): T[];
	dropped_count(): number;
};

/**
 * The replace-from-window seam store for channels and the public recent-messages feed.
 * Each watch update replaces the whole content. Reactions no longer use this: a removal
 * is an in-place marker, so they accumulate like messages.
 */
export function chat_create_window_store<T>(validate: (raw: unknown) => T | null): chat_WindowStore<T> {
	let items: T[] = [];
	let dropped = 0;
	return {
		apply_window(docs) {
			const next: T[] = [];
			for (const raw of docs) {
				const item = validate(raw);
				if (item === null) {
					dropped += 1;
					warn_dropped(raw);
					continue;
				}
				next.push(item);
			}
			items = next;
			return next;
		},
		get_all: () => items,
		dropped_count: () => dropped,
	};
}

export type chat_ReactionGroup = {
	token: chat_ReactionToken;
	count: number;
	reactedByMe: boolean;
};

/**
 * Groups reaction docs per reacted-to key, in palette order, counting distinct reactors.
 * Grouping keys on the doc's `createdBy`, never on the key tail: the server stamps
 * `createdBy`, while the caller part of a putOwned key can smuggle any user id.
 */
export function chat_group_reactions(docs: chat_ReactionDoc[], myUserId: string): Map<string, chat_ReactionGroup[]> {
	const reactorsByTarget = new Map<string, Map<chat_ReactionToken, Set<string>>>();
	for (const doc of docs) {
		// A removed marker keeps the slot and the key, but it is not a live reaction.
		if (doc.removed) {
			continue;
		}
		let byToken = reactorsByTarget.get(doc.targetKey);
		if (byToken === undefined) {
			byToken = new Map();
			reactorsByTarget.set(doc.targetKey, byToken);
		}
		let reactors = byToken.get(doc.token);
		if (reactors === undefined) {
			reactors = new Set();
			byToken.set(doc.token, reactors);
		}
		reactors.add(doc.createdBy);
	}

	const groups = new Map<string, chat_ReactionGroup[]>();
	for (const [targetKey, byToken] of reactorsByTarget) {
		const targetGroups: chat_ReactionGroup[] = [];
		for (const token of chat_REACTION_TOKENS) {
			const reactors = byToken.get(token);
			if (reactors === undefined || reactors.size === 0) {
				continue;
			}
			targetGroups.push({ token, count: reactors.size, reactedByMe: reactors.has(myUserId) });
		}
		groups.set(targetKey, targetGroups);
	}
	return groups;
}

/**
 * Replies per root message key, counted from the accumulated channel-wide replies.
 *
 * `latestAt` is the newest reply time the window holds for that root. The summary line shows it as
 * "Last reply …", and it is only honest for a root the window already covers. A root it does not
 * reach reports `replyCount: "unknown"` and renders no summary at all, so no caller can read a
 * time here that the window did not actually deliver.
 */
export function chat_count_replies(
	docs: chat_Doc<chat_MessageValue>[],
): Map<string, { count: number; latestAt: number }> {
	const counts = new Map<string, { count: number; latestAt: number }>();
	for (const doc of docs) {
		const rootKey = chat_reply_root_key(doc.key);
		if (rootKey === null) {
			continue;
		}
		const existing = counts.get(rootKey);
		if (existing === undefined) {
			counts.set(rootKey, { count: 1, latestAt: doc.timestamp });
		} else {
			existing.count += 1;
			existing.latestAt = Math.max(existing.latestAt, doc.timestamp);
		}
	}
	return counts;
}

/**
 * Reply counts are exact once the replies window has nothing more below it. While
 * `hasMore` says replies may still be missing, cap a large count at "99+" instead of
 * pretending precision.
 */
export function chat_format_reply_count(count: number, hasMore: boolean): string {
	return count > 99 && hasMore ? "99+" : String(count);
}
