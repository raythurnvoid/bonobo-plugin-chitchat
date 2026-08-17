import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
	'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Dialog_Props = {
	labelledBy: string;
	onClose: () => void;
	children: ReactNode;
};

/**
 * Modal dialog: focus is trapped inside, Escape closes, and closing gives focus back to
 * the control that opened it. Content marks the initial-focus control (a non-destructive
 * one, per the a11y contract) with `data-dialog-initial`; without the mark the first
 * focusable control is used.
 */
export function Dialog(props: Dialog_Props) {
	const panelRef = useRef<HTMLDivElement | null>(null);

	// Move focus in on open and back to the opener on unmount.
	useEffect(() => {
		const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		const panel = panelRef.current;
		const initial =
			panel?.querySelector<HTMLElement>("[data-dialog-initial]") ?? panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
		initial?.focus();
		return () => {
			opener?.focus();
		};
	}, []);

	const handle_key_down = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Escape") {
			event.stopPropagation();
			props.onClose();
			return;
		}
		if (event.key !== "Tab") {
			return;
		}
		const panel = panelRef.current;
		if (!panel) {
			return;
		}
		const focusables = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)];
		if (focusables.length === 0) {
			return;
		}
		const first = focusables[0];
		const last = focusables[focusables.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};

	return (
		<div className="dialog-overlay">
			<div
				ref={panelRef}
				className="dialog"
				role="dialog"
				aria-modal="true"
				aria-labelledby={props.labelledBy}
				onKeyDown={handle_key_down}
			>
				{props.children}
			</div>
		</div>
	);
}
