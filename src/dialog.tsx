import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
	'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Dialog_Props = {
	labelledBy: string;
	accessUnavailable?: boolean;
	onReconnect?: () => void;
	onClose: () => void;
	children: ReactNode;
};

function dialog_initial_focus_target(panel: HTMLElement) {
	const marked = panel.querySelector<HTMLElement>("[data-dialog-initial]");
	return marked?.matches(FOCUSABLE_SELECTOR) ? marked : (panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? panel);
}

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
		const initial = panel === null ? null : dialog_initial_focus_target(panel);
		initial?.focus();
		return () => {
			opener?.focus();
		};
	}, []);

	// A roster or access update can remove the focused control. Restore focus only if it
	// fell to the body; keep a person's deliberate focus on another control.
	useEffect(() => {
		const panel = panelRef.current;
		if (!panel) {
			return;
		}

		const restore_lost_focus = () => {
			if (!panel.isConnected || document.activeElement !== document.body) {
				return;
			}
			dialog_initial_focus_target(panel).focus();
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
			event.preventDefault();
			panel.focus();
			return;
		}
		const first = focusables[0];
		const last = focusables[focusables.length - 1];
		if (document.activeElement === panel) {
			event.preventDefault();
			(event.shiftKey ? last : first).focus();
		} else if (event.shiftKey && document.activeElement === first) {
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
				tabIndex={-1}
				aria-modal="true"
				aria-labelledby={props.accessUnavailable ? undefined : props.labelledBy}
				aria-label={props.accessUnavailable ? "Channel access is unavailable" : undefined}
				onKeyDown={handle_key_down}
			>
				{props.accessUnavailable ? (
					<>
						<h2 className="dialog-title">Channel access is unavailable</h2>
						<p>Your changes are kept. Reconnect to continue.</p>
						<div className="dialog-actions">
							<button type="button" className="button" onClick={props.onClose}>
								Close
							</button>
							<button type="button" className="button" onClick={props.onReconnect}>
								Reconnect
							</button>
						</div>
					</>
				) : (
					props.children
				)}
			</div>
		</div>
	);
}
