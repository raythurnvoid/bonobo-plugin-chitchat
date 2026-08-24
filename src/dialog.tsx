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

	// Preact can destroy the control the person is standing on while the dialog stays open, and focus
	// then falls to the document body. Its child matching treats an old child that rendered as null as
	// a match before it compares keys, so a section appearing in the middle of the dialog can shift
	// the actions row onto one of those empty slots. The real row is then unmounted and built again.
	// Escape stops working too, because the handler below lives on the panel. Keys on the children do
	// not prevent it. Measured in the people dialog, where the roster arriving destroyed the focused
	// Close button.
	//
	// Only a focus that landed nowhere is repaired. A person clicking something always lands on an
	// element, and pulling focus back from that would fight them instead of helping.
	useEffect(() => {
		const panel = panelRef.current;
		if (!panel) {
			return;
		}

		const restore_lost_focus = () => {
			if (!panel.isConnected || document.activeElement !== document.body) {
				return;
			}
			const next =
				panel.querySelector<HTMLElement>("[data-dialog-initial]") ??
				panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
			next?.focus();
		};

		// focusout runs while the node is being removed, before the replacement is in place, so the
		// check waits for the render to finish.
		const handle_focus_out = () => queueMicrotask(restore_lost_focus);
		panel.addEventListener("focusout", handle_focus_out);
		return () => panel.removeEventListener("focusout", handle_focus_out);
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
