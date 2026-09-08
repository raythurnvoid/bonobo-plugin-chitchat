import type { BonoboClient } from "bonobo-plugin-sdk/frontend";
import { useSyncExternalStore } from "react";
import type { Doc } from "../convex/_generated/dataModel";

export type chat_PendingSend = {
	clientRequestId: string;
	text: string;
	attachments: Doc<"messages">["attachments"];
	mentions: string[];
	status: "sending" | "failed";
	error: string | null;
};
type Draft = {
	text: string;
	attachments: Doc<"messages">["attachments"];
	mentions: [string, string][];
	pending: chat_PendingSend[];
};
const empty: Draft = { text: "", attachments: [], mentions: [], pending: [] };
const owners = new WeakMap<BonoboClient, ReturnType<typeof create_drafts>>();

function create_drafts() {
	const slots = new Map<string, Draft>();
	const listeners = new Set<() => void>();
	return {
		get: (key: string) => slots.get(key) ?? empty,
		subscribe: (listener: () => void) => {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		},
		set: (key: string, draft: Draft) => {
			if (draft.text.length > 16_384) return "This draft is too long. Shorten it before adding more text.";
			if (draft.mentions.length > 50) return "A message can mention up to 50 people.";
			const nonempty = draft.text !== "" || draft.attachments.length > 0 || draft.pending.length > 0;
			if (nonempty && !slots.has(key) && slots.size >= 20) {
				return "You have 20 saved drafts. Send or clear one before starting another.";
			}
			if (
				draft.pending.length > 5 ||
				[...slots.entries()].reduce(
					(total, [id, value]) => total + (id === key ? 0 : value.pending.length),
					draft.pending.length,
				) > 20
			) {
				return "Retry or remove an unconfirmed message before sending another.";
			}
			if (nonempty) slots.set(key, draft);
			else slots.delete(key);
			for (const listener of listeners) listener();
			return null;
		},
	};
}

export function use_chat_draft(client: BonoboClient, key: string) {
	let owner = owners.get(client);
	if (!owner) {
		owner = create_drafts();
		owners.set(client, owner);
	}
	const drafts = owner;
	const value = useSyncExternalStore(drafts.subscribe, () => drafts.get(key));
	return { value, get: () => drafts.get(key), set: (draft: Draft) => drafts.set(key, draft) };
}
