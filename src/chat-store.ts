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

export type chat_AccumulatingStore<V> = {
	/**
	 * Merges one watch or window update into the store and returns the update's validated
	 * docs (callers use them for arrival detection). Never removes anything: a doc that
	 * fell out of a plain watch's newest-100 window stays.
	 */
	apply_window(docs: unknown[]): chat_Doc<V>[];
	/** Merges one locally synthesized doc (an acked own send, edit, or delete). */
	apply_local(doc: chat_Doc<V>): void;
	/** All docs sorted ascending by key — with inverted-ms keys that is newest first. */
	get_sorted(): chat_Doc<V>[];
	/** How many raw docs failed validation and were dropped. */
	dropped_count(): number;
};

/**
 * The accumulate-by-key seam store for messages and thread replies. Every update merges
 * into one map keyed by document key: keys are never reused, deletes are value
 * tombstones (`deletedAt`), and a doc only advances forward (a lower revision never
 * overwrites a higher one). The revision-forward merge is also what lets an optimistic
 * local echo coexist with the server's later delivery of the same key.
 */
export function chat_create_accumulating_store<V>(
	validate: (raw: unknown) => chat_Doc<V> | null,
): chat_AccumulatingStore<V> {
	const byKey = new Map<string, chat_Doc<V>>();
	let dropped = 0;

	const merge_one = (doc: chat_Doc<V>) => {
		const existing = byKey.get(doc.key);
		if (existing === undefined || doc.revision >= existing.revision) {
			byKey.set(doc.key, doc);
		}
	};

	const merge_raw = (docs: unknown[]) => {
		const valid: chat_Doc<V>[] = [];
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
 * The replace-from-window seam store for reactions (and channels). Each watch update
 * replaces the whole content — a reaction physically removed by removeOwned must
 * disappear, so reactions never accumulate across updates.
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

/** Replies per root message key, counted from the bounded channel-wide replies watch. */
export function chat_count_replies(docs: chat_Doc<chat_MessageValue>[]): Map<string, number> {
	const counts = new Map<string, number>();
	for (const doc of docs) {
		const rootKey = chat_reply_root_key(doc.key);
		if (rootKey === null) {
			continue;
		}
		counts.set(rootKey, (counts.get(rootKey) ?? 0) + 1);
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
