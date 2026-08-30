/**
 * @vitest-environment happy-dom
 */
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { Dialog } from "./dialog";

afterEach(() => {
	document.body.removeAttribute("tabindex");
	cleanup();
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
