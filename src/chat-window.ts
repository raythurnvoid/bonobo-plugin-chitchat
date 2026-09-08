import { useQueries, useQuery } from "convex/react";
import type { PaginationResult } from "convex/server";
import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../convex/_generated/api";
import type { Doc, Id } from "../convex/_generated/dataModel";

type Page = { id: number; cursor: string | null; endCursor?: string };
type Window = { anchor: number; pages: Page[]; newerAnchor: number | null; extend: boolean };
type Head = { messages: Doc<"messages">[]; sequence: number };

// Each pane owns at most 3 MiB, including its separate live head.
const WINDOW_BYTES = 3 * 1024 * 1024;

export function use_chat_window(props: {
	target: { channelId: Id<"channels"> } | { rootMessageId: Id<"messages"> };
	enabled: boolean;
	retain: boolean;
}) {
	const replies = "rootMessageId" in props.target;
	const byteLimit = WINDOW_BYTES - (replies ? 32 * 1024 : 0);
	const rootHead = useQuery(
		api.messages.latest_roots,
		props.enabled && "channelId" in props.target ? props.target : "skip",
	);
	const replyHead = useQuery(
		api.messages.latest_replies,
		props.enabled && "rootMessageId" in props.target ? props.target : "skip",
	);
	const observedHead = replies ? replyHead : rootHead;
	const [window, setWindow] = useState<Window | null>(null);
	const nextPageId = useRef(0);
	const pageCache = useRef(new Map<number, PaginationResult<Doc<"messages">>>());
	const retained = useRef<{ head: Head | null; rows: Doc<"messages">[] }>({ head: null, rows: [] });
	const targetId = "rootMessageId" in props.target ? props.target.rootMessageId : props.target.channelId;
	const queriesEnabled = props.enabled && observedHead !== null;
	// Convex useQueries needs the same descriptor object until its inputs change.
	const queries = useMemo(
		() =>
			Object.fromEntries(
				(queriesEnabled ? (window?.pages ?? []) : []).map((page) => [
					String(page.id),
					{
						query: replies ? api.messages.list_replies : api.messages.list_roots,
						args: {
							...(replies ? { rootMessageId: targetId } : { channelId: targetId }),
							anchorSequence: window!.anchor,
							paginationOpts: {
								numItems: 50,
								cursor: page.cursor,
								...(page.endCursor ? { endCursor: page.endCursor } : {}),
							},
						},
					},
				]),
			),
		[queriesEnabled, window, replies, targetId],
	);
	const results = useQueries(queries) as Record<string, PaginationResult<Doc<"messages">> | Error | undefined>;
	const head = observedHead === undefined && props.retain ? retained.current.head : (observedHead ?? null);
	const activeIds = new Set(window?.pages.map((page) => page.id));
	for (const id of pageCache.current.keys()) {
		if (!activeIds.has(id) || observedHead === null || (!props.enabled && !props.retain)) pageCache.current.delete(id);
	}
	const pages =
		window?.pages.map((descriptor) => {
			const result = results[String(descriptor.id)];
			if (props.enabled && observedHead !== null && result && !(result instanceof Error))
				pageCache.current.set(descriptor.id, result);
			// A frozen end cursor keeps the same range visible while its subscription reconnects.
			return { descriptor, result: result ?? pageCache.current.get(descriptor.id) };
		}) ?? [];
	const error = pages.find((page) => page.result instanceof Error)?.result;
	const readyPages = pages.filter(
		(page): page is { descriptor: Page; result: PaginationResult<Doc<"messages">> } =>
			page.result !== undefined && !(page.result instanceof Error),
	);
	const loadedRows = window === null ? (head?.messages ?? []) : readyPages.flatMap((page) => page.result.page);
	const rows = observedHead === null ? [] : props.enabled ? loadedRows : props.retain ? retained.current.rows : [];
	const bytes = new TextEncoder().encode(JSON.stringify({ rows, head })).byteLength;
	const lastPage = readyPages.at(-1);
	const loading =
		props.enabled &&
		observedHead !== null &&
		(head === null || pages.some((page) => results[String(page.descriptor.id)] === undefined));

	useEffect(() => {
		if (!props.enabled && !props.retain) {
			retained.current = { head: null, rows: [] };
			setWindow(null);
		} else if (props.enabled) retained.current = { head, rows };
	}, [props.enabled, props.retain, head, rows]);

	useEffect(() => {
		if (!window || !props.enabled) return;
		// Freeze each page's right boundary once returned. Edits cannot shift a neighbour's range.
		const changed = readyPages.some(({ descriptor, result }) => !descriptor.endCursor && !result.isDone);
		const split = readyPages.some(({ result }) => result.pageStatus === "SplitRequired");
		if (split) {
			const anchor = rows[0]?.sequence ?? window.anchor;
			setWindow({
				anchor,
				pages: [{ id: ++nextPageId.current, cursor: null }],
				newerAnchor: window.newerAnchor,
				extend: false,
			});
		} else if (bytes > byteLimit && window.pages.length > 1) {
			// Drop the newest history page when loading older rows. It can be fetched again by sequence.
			setWindow({ ...window, pages: window.pages.slice(1), newerAnchor: rows[0]?.sequence ?? window.anchor });
		} else if (window.extend && lastPage) {
			setWindow({
				...window,
				extend: false,
				pages: lastPage.result.isDone
					? window.pages
					: [
							...window.pages.map((page) => ({ ...page, endCursor: lastPage.result.continueCursor })),
							{ id: ++nextPageId.current, cursor: lastPage.result.continueCursor },
						],
			});
		} else if (changed) {
			setWindow({
				...window,
				pages: window.pages.map((page) => {
					const result = results[String(page.id)];
					return !page.endCursor && result && !(result instanceof Error) && !result.isDone
						? { ...page, endCursor: result.continueCursor }
						: page;
				}),
			});
		}
	}, [window, props.enabled, results, bytes]);

	const latest = () => setWindow(null);
	const older = () => {
		if (!props.enabled || loading || !head) return;
		if (!window) {
			if ((head.messages.at(-1)?.sequence ?? 0) > 1)
				setWindow({
					anchor: head.sequence,
					pages: [{ id: ++nextPageId.current, cursor: null }],
					newerAnchor: head.sequence,
					extend: true,
				});
			return;
		}
		if (!lastPage || lastPage.result.isDone) return;
		const next = [...window.pages, { id: ++nextPageId.current, cursor: lastPage.result.continueCursor }];
		const maximum = replies ? 2 : 5;
		setWindow({
			...window,
			pages: next.slice(-maximum),
			newerAnchor: next.length > maximum ? (rows[0]?.sequence ?? window.anchor) : window.newerAnchor,
		});
	};
	const newer = () => {
		if (!window?.newerAnchor || !props.enabled || loading) return;
		if (window.newerAnchor >= (head?.sequence ?? 0)) latest();
		else
			setWindow({
				anchor: window.newerAnchor,
				pages: [{ id: ++nextPageId.current, cursor: null }],
				newerAnchor: Math.min(head?.sequence ?? window.newerAnchor, window.newerAnchor + 50),
				extend: false,
			});
	};
	return {
		rows,
		denied: observedHead === null,
		loading,
		error:
			observedHead === null
				? "Messages are unavailable. Your access may have changed."
				: error instanceof Error
					? error.message
					: null,
		sequence: head?.sequence ?? 0,
		atLatest: window === null,
		hasOlder: window === null ? (head?.messages.at(-1)?.sequence ?? 0) > 1 : !!lastPage && !lastPage.result.isDone,
		hasNewer: window !== null,
		newCount: window ? Math.max(0, (head?.sequence ?? 0) - window.anchor) : 0,
		older,
		newer,
		latest,
	};
}
