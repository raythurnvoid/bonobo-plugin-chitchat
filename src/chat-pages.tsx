import { useState } from "react";

export function use_chat_page(key: string) {
	const [page, setPage] = useState<{ key: string; cursor: string | null; previous: (string | null)[]; number: number }>(
		{ key, cursor: null, previous: [], number: 1 },
	);
	if (page.key !== key) setPage({ key, cursor: null, previous: [], number: 1 });
	return {
		cursor: page.key === key ? page.cursor : null,
		number: page.number,
		canGoBack: page.previous.length > 0,
		next: (cursor: string) =>
			setPage((current) => ({
				key,
				cursor,
				previous: [...current.previous, current.cursor].slice(-20),
				number: current.number + 1,
			})),
		back: () =>
			setPage((current) =>
				current.previous.length === 0
					? current
					: {
							...current,
							cursor: current.previous[current.previous.length - 1],
							previous: current.previous.slice(0, -1),
							number: current.number - 1,
						},
			),
		first: () => setPage({ key, cursor: null, previous: [], number: 1 }),
	};
}

export function ChatPageControls(props: {
	page: ReturnType<typeof use_chat_page>;
	result: { isDone: boolean; continueCursor: string } | undefined;
	label: string;
}) {
	if (props.page.number === 1 && props.result?.isDone) return null;
	return (
		<div className="page-controls" aria-label={`${props.label} pages`}>
			{props.page.number > 1 ? (
				<button type="button" className="button" onClick={props.page.first}>
					First
				</button>
			) : null}
			<button type="button" className="button" disabled={!props.page.canGoBack} onClick={props.page.back}>
				Previous
			</button>
			<span>Page {props.page.number}</span>
			<button
				type="button"
				className="button"
				disabled={!props.result || props.result.isDone}
				onClick={() => {
					if (props.result) props.page.next(props.result.continueCursor);
				}}
			>
				Next
			</button>
		</div>
	);
}
