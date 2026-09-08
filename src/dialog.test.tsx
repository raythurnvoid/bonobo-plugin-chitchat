/**
 * @vitest-environment happy-dom
 */
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { useState } from "react";
import { Dialog } from "./dialog";

afterEach(() => {
	document.body.removeAttribute("tabindex");
	cleanup();
});

test("returns focus to an available opener when the dialog closes", async () => {
	function Probe() {
		const [open, setOpen] = useState(false);
		return (
			<>
				<button type="button" onClick={() => setOpen(true)}>
					Open
				</button>
				{open ? (
					<Dialog labelledBy="dialog-title" onClose={() => setOpen(false)}>
						<h2 id="dialog-title">A dialog</h2>
						<button type="button" onClick={() => setOpen(false)}>
							Cancel
						</button>
					</Dialog>
				) : null}
			</>
		);
	}
	render(<Probe />);
	const opener = screen.getByRole("button", { name: "Open" });
	opener.focus();
	fireEvent.click(opener);
	expect(document.activeElement).toBe(screen.getByRole("button", { name: "Cancel" }));
	fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
	await waitFor(() => expect(document.activeElement).toBe(opener));
});

test("does not redirect a normal focus transfer between dialog controls", async () => {
	render(
		<Dialog labelledBy="dialog-title" onClose={() => {}}>
			<h2 id="dialog-title">Choose a file</h2>
			<button type="button" data-dialog-initial>
				Cancel
			</button>
			<button type="button">A file</button>
		</Dialog>,
	);
	const cancel = screen.getByRole("button", { name: "Cancel" });
	const file = screen.getByRole("button", { name: "A file" });
	const focus = vi.spyOn(cancel, "focus");
	// Browsers briefly expose body during focusout, before focusing relatedTarget.
	vi.spyOn(document, "activeElement", "get").mockReturnValue(document.body);
	fireEvent.focusOut(cancel, { relatedTarget: file });
	await Promise.resolve();
	expect(focus).not.toHaveBeenCalled();
});

test("restores lost focus and traps Tab on the panel when every control is disabled", async () => {
	const onClose = vi.fn();
	render(
		<Dialog labelledBy="dialog-title" onClose={onClose}>
			<h2 id="dialog-title">Busy dialog</h2>
			<button type="button" data-dialog-initial disabled>
				Cancel
			</button>
		</Dialog>,
	);
	const dialog = screen.getByRole("dialog", { name: "Busy dialog" });
	expect(document.activeElement).toBe(dialog);

	document.body.tabIndex = -1;
	document.body.focus();
	fireEvent.focusOut(dialog);
	await waitFor(() => expect(document.activeElement).toBe(dialog));

	expect(fireEvent.keyDown(dialog, { key: "Tab" })).toBe(false);
	expect(document.activeElement).toBe(dialog);
	fireEvent.keyDown(dialog, { key: "Escape" });
	expect(onClose).toHaveBeenCalledTimes(1);
});
