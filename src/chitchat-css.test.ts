// @vitest-environment node
// happy-dom does not apply stylesheets, so the keyboard-reachability rule for message
// actions is pinned on the stylesheet text itself; this test only reads the file.
import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("chitchat.css message actions", () => {
	const css = readFileSync(new URL("./chitchat.css", import.meta.url), "utf8");
	// The base rule is declared before the hover/focus-within reveal rule.
	const baseBlock = /\.message-actions\s*\{[^}]*\}/u.exec(css)?.[0] ?? "";

	test("hides the cluster with opacity so the buttons stay in the tab order", () => {
		// display:none or visibility:hidden would drop the buttons from the tab order, and a
		// plain text-only row has no other focusable child — focus could never enter the row
		// to trigger the :focus-within reveal (WCAG 2.1.1).
		expect(baseBlock).toContain("opacity: 0");
		expect(baseBlock).not.toContain("display: none");
		expect(baseBlock).not.toContain("visibility: hidden");
	});

	test("reveals the cluster on focus-within as well as hover", () => {
		expect(css).toMatch(/\.message:focus-within \.message-actions/u);
	});
});
