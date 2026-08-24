// @vitest-environment node
// happy-dom does not apply stylesheets, so every rule this file cares about is pinned on the
// stylesheet text itself; this test only reads the file.
import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

const css = readFileSync(new URL("./chitchat.css", import.meta.url), "utf8");

/**
 * Returns the body of the first rule whose selector is exactly `selector`.
 *
 * A plain `indexOf` would match the same text inside another block, so several assertions below
 * would pass on a declaration written in the wrong place. Matching the selector at a rule boundary
 * and taking the balanced body is what makes them mean anything.
 */
function rule_body(selector: string, source = css): string {
	// The selector arrives as a regex fragment. Anchoring it at the start of a line is what keeps
	// `.message` from matching the tail of `.message-actions`, and what makes "this declaration is
	// in this block" mean something instead of "this text is somewhere in the file".
	const pattern = new RegExp(`^[\\t ]*${selector}\\s*\\{([^}]*)\\}`, "mu");
	return pattern.exec(source)?.[1] ?? "";
}

/**
 * Returns the whole body of an `@media` block, nested rules included.
 *
 * `[^}]*` stops at the first inner rule's closing brace, so a media block has to be read by
 * counting braces.
 */
function media_body(query: string): string {
	const start = css.indexOf(`@media ${query} {`);
	if (start < 0) {
		return "";
	}
	let depth = 0;
	for (let index = css.indexOf("{", start); index < css.length; index += 1) {
		if (css[index] === "{") {
			depth += 1;
		} else if (css[index] === "}") {
			depth -= 1;
			if (depth === 0) {
				return css.slice(css.indexOf("{", start) + 1, index);
			}
		}
	}
	return "";
}

describe("chitchat.css message actions", () => {
	const baseBlock = rule_body("\\.message-actions");

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

	test("anchors the overlay above the row and never below it", () => {
		// The cluster is taller than a grouped continuation, so the overhang has to go somewhere.
		// bottom: 0 sends it upward onto the previous row of the same group, whose buttons are not
		// live while this row is hovered. A top anchor would hang it into the next row instead,
		// under an opaque background, and that row's clicks would land on these buttons.
		expect(baseBlock).toContain("position: absolute");
		expect(baseBlock).toContain("bottom: 0");
		// The shipped 6px margin would push the box back down if it survived.
		expect(baseBlock).toContain("margin-top: 0");
		expect(baseBlock).not.toMatch(/margin-top:\s*[1-9]/u);
	});

	test("reserves room for the cluster instead of covering the text it sits on", () => {
		// A hovered row shows an opaque cluster over its own body. The reserve has to be bounded by
		// the column, not a fixed length: 304px alone leaves an 18px text column at the log's 420px
		// floor, and a negative one inside the measured 335px narrow frame.
		const hoverReserve = rule_body("\\.message:hover \\.message-text,\\s*\\.message:focus-within \\.message-text");
		expect(hoverReserve).toMatch(/padding-right:\s*min\(/u);
		expect(baseBlock).toMatch(/max-width:\s*\d/u);
		// The cluster has to wrap for the reserve and the box to agree. A flex line that may not wrap
		// does not shrink below its buttons, so it runs past the max-width instead of obeying it: in
		// the 340px thread panel the three buttons spilled out of the row and the whole panel scrolled
		// sideways. Wrapping keeps the overflow inside the box and sends it upward, the direction the
		// anchor test above already chose. Measured in the live frame on 2026-08-24.
		expect(baseBlock).toContain("flex-wrap: wrap");
		expect(baseBlock).toContain("justify-content: end");
	});

	test("keeps the cluster transparent to the pointer and restores it on the buttons", () => {
		// The cluster's box lies over message text and attachment links. Restoring `auto` on the
		// container would make that whole box swallow clicks meant for what is underneath it.
		expect(baseBlock).toContain("pointer-events: none");
		const revealed = rule_body("\\.message:hover \\.message-actions,\\s*\\.message:focus-within \\.message-actions");
		expect(revealed).toContain("opacity: 1");
		expect(revealed).not.toContain("pointer-events");

		const descendantReveal = rule_body(
			"\\.message:hover \\.message-actions \\*,\\s*\\.message:focus-within \\.message-actions \\*",
		);
		expect(descendantReveal).toContain("pointer-events: auto");
	});
});

describe("chitchat.css reveal reaches every action button", () => {
	test("every button class inside the cluster is covered by a reveal selector", () => {
		// The palette items live two levels inside the cluster and declare no pointer-events of
		// their own. A reveal selector naming `.button` would leave them dead: keyboard cannot
		// substitute for the check, because focus() + Enter dispatches a click with no hit test.
		const reveals = [...css.matchAll(/\.message:(?:hover|focus-within) \.message-actions([^,{]*)[,{]/gu)].map(
			(match) => match[1]!.trim(),
		);
		const clusterButtons = ["message-action", "reaction-palette-item"];
		const uncovered = clusterButtons.filter(
			(name) => !reveals.some((reveal) => reveal === "*" || reveal === `.${name}`),
		);
		// Names the class that lost its reveal, rather than reporting a missing selector string.
		expect(uncovered).toEqual([]);
	});
});

describe("chitchat.css density constants", () => {
	test("a leader row is 52px and a grouped continuation is 24px", () => {
		// The two min-heights alone change nothing: at the shipped 8px padding a leader is already
		// 60px and a continuation 39px, so both string matches would pass against today's file.
		// The padding pair is what produces the numbers, and the two rows need different padding.
		const message = rule_body("\\.message");
		expect(message).toContain("min-height: 52px");
		expect(message).toContain("padding: 4px 10px");

		const continuation = rule_body("\\.message\\.is-continuation");
		expect(continuation).toContain("min-height: 24px");
		expect(continuation).toContain("padding: 0 10px");
	});

	test("the inter-group gap is carried by the leader, not by the list", () => {
		expect(rule_body("\\.message-list")).toContain("gap: 0");
		expect(rule_body("\\.message\\.is-leader")).toContain("margin-top: 16px");
	});

	test("the avatar has its own track and every other child stays out of it", () => {
		// `.message` has seven in-flow children. Placing only the avatar would auto-place the
		// attachments list and the row-level error into the 54px track, one character per line.
		expect(rule_body("\\.message")).toMatch(/grid-template-columns:\s*54px/u);
		expect(rule_body("\\.message > \\*")).toContain("grid-column: 2");

		const avatar = rule_body("\\.message-avatar");
		expect(avatar).toContain("grid-column: 1");
		expect(avatar).toContain("grid-row: 1 / span 2");

		// A 32px avatar spanning both rows of a continuation would force it to 32px and put §5's
		// 24px out of reach while the min-height match stayed green.
		expect(rule_body("\\.message\\.is-continuation \\.message-avatar")).toContain("display: none");
		// The hidden head is out of flow and so is not a grid item; without this the body would
		// auto-place into the avatar track and lose alignment with its own leader.
		expect(rule_body("\\.message\\.is-continuation \\.message-text")).toContain("grid-column: 2");
	});

	test("the remaining density and target sizes are declared on their own selectors", () => {
		expect(rule_body("\\.channel-link")).toContain("min-height: 48px");
		expect(rule_body("\\.day-divider")).toContain("min-height: 32px");
		// Both inline targets drop to 28px. Leaving the chip at 44px puts every reacted row back at
		// 102px — within 8px of today's height — while the file still contains the string "28px".
		expect(rule_body("\\.message-action")).toContain("min-height: 28px");
		expect(rule_body("\\.reaction-chip")).toContain("min-height: 28px");
		// Standalone controls keep the full target size.
		expect(rule_body("\\.button")).toContain("min-height: 44px");
	});
});

describe("chitchat.css thread column", () => {
	test("the column resizes by its flex basis, with a floor and a hit area", () => {
		// A definite flex-basis is the flex base size, so a handle writing `width` moves nothing at
		// all while the separator's announced value counts down.
		const thread = rule_body("\\.thread");
		expect(thread).toMatch(/flex:\s*0 1 var\(--thread-width/u);
		expect(thread).toContain("min-width: 244px");

		// In flow the handle would add its own width to every derived breakpoint.
		expect(rule_body("\\.channel-body")).toContain("position: relative");
		const handle = rule_body("\\.thread-resize");
		expect(handle).toContain("position: absolute");
		expect(handle).toContain("width: 24px");
	});
});

describe("chitchat.css narrow layout", () => {
	const narrow = media_body("(max-width: 719px)");

	test("the thread overlay hides the floating toggle and the separator behind it", () => {
		expect(narrow).not.toBe("");
		expect(rule_body("\\.chitchat\\.has-thread \\.drawer-toggle", narrow)).toContain("display: none");
		// Left visible, the handle is a focusable separator announcing a width nothing uses,
		// sitting behind an opaque fixed overlay.
		expect(rule_body("\\.thread-resize", narrow)).toContain("display: none");
	});

	test("the thread head takes no clearance for a button that is not there", () => {
		// The way out of the narrow overlay is the back control in the thread head. Clearance for
		// the floating toggle would leave 96px of empty padding beside it.
		expect(rule_body("\\.thread-head", narrow)).not.toContain("padding-left");
	});

	test("keeps a reduced-motion escape for the drawer transition", () => {
		expect(media_body("(prefers-reduced-motion: reduce)")).toContain("transition: none");
	});
});

describe("chitchat.css log floor", () => {
	test("the 420px floor is scoped to the side-by-side band", () => {
		// Below 720px both flex siblings leave the flow and `.channel-body` holds the log alone, so
		// an unscoped floor overflows the measured 335px frame by 85px. Either spelling is correct:
		// scope the floor, or reset it in the narrow block.
		const wide = media_body("(min-width: 720px)");
		const scopedFloor = rule_body("\\.message-log", wide).includes("min-width: 420px");
		const narrowReset = rule_body("\\.message-log", media_body("(max-width: 719px)")).includes("min-width: 0");
		expect(scopedFloor || narrowReset).toBe(true);
	});
});

describe("chitchat.css icon rail", () => {
	// Both bounds are load-bearing. Without the lower one the rule also reaches the ≤719px drawer,
	// where `.chitchat.has-thread .sidebar` outranks the drawer's own `.sidebar` three classes to one.
	const rail = media_body("(min-width: 720px) and (max-width: 903px)");

	test("collapses only while a thread is open, inside the two-bound band", () => {
		expect(rail).not.toBe("");
		expect(rule_body("\\.chitchat\\.has-thread \\.sidebar", rail)).toContain("width: 56px");

		// Unqualified, the rule costs every channel name to a member at an 800px frame who never
		// opens a thread.
		expect(rule_body("\\.sidebar", rail)).not.toContain("width: 56px");
		// And no other rule in the file may collapse the rail behind the qualifier's back.
		const otherFiftySix = css.replace(rail, "");
		expect(otherFiftySix).not.toContain("width: 56px");
	});

	test("the collapsed rail centres its initials instead of ellipsing them", () => {
		const link = rule_body("\\.chitchat\\.has-thread \\.channel-link", rail);
		expect(link).toContain("padding: 10px 4px");
		expect(link).toContain("text-align: center");
	});
});

describe("chitchat.css chrome colours", () => {
	test("leaves the four colours phase 1 does not repaint", () => {
		// §5's reserved-use rule is about status colour. These four are chrome, and phase 2's amber
		// unread badge collides with an archived row if this one moves. They travel through the
		// palette now, so the rule names the role and the dark block still resolves it to the same
		// value — the rendered colour is unchanged, only the indirection is new.
		expect(rule_body("\\.button-primary")).toContain("var(--cc-accent-surface)");
		expect(rule_body("\\.attachment-button")).toContain("var(--cc-accent)");
		expect(rule_body("\\.attachment-link")).toContain("var(--cc-accent)");
		expect(rule_body("\\.channel-archived-badge")).toContain("var(--cc-warning-text)");

		const dark = rule_body(":root");
		expect(dark).toContain("--cc-accent-surface: #24304a");
		expect(dark).toMatch(/--cc-accent:[^;]*#8ab4ff/u);
		expect(dark).toContain("--cc-warning-text: #c9a44a");
	});
});

describe("chitchat.css theme", () => {
	/** Every custom property a palette block declares, in order. */
	function palette_names(block: string) {
		return [...block.matchAll(/(--cc-[\w-]+)\s*:/gu)].map((match) => match[1]);
	}

	test("the light block declares exactly the properties the dark block does", () => {
		const dark = palette_names(rule_body(":root"));
		const light = palette_names(rule_body(":root\\.theme-light"));

		// A property the light block forgets falls back to its dark value, so one missed line puts a
		// near-black surface or unreadable text inside an otherwise light page. Nothing renders in
		// this environment, so the two lists are what catches it.
		expect(dark.length).toBeGreaterThan(20);
		expect(light).toEqual(dark);
	});

	test("no rule outside the palette writes a colour of its own", () => {
		// The palette blocks are the only place a literal belongs. A colour written straight into a
		// rule cannot follow the theme, and it would be invisible until someone switched to light.
		const rules = css.slice(css.indexOf("* {"));
		expect(rules.match(/#[0-9a-fA-F]{3,8}|rgba?\(/gu)).toBeNull();
	});

	test("the ten roles the host resolves read the host first and fall back to a literal", () => {
		// The host sends finished colour values, so on these roles Chitchat wears the app's own
		// palette instead of guessing at it. The literal after the comma is what an older host with
		// no theme channel gets, and it must be there or those roles paint nothing at all.
		for (const block of [rule_body(":root"), rule_body(":root\\.theme-light")]) {
			for (const [property, token] of [
				["--cc-surface", "surface"],
				["--cc-surface-raised", "surface-raised"],
				["--cc-surface-hover", "surface-hover"],
				["--cc-border", "border"],
				["--cc-border-strong", "border-strong"],
				["--cc-text", "text"],
				["--cc-text-muted", "text-muted"],
				["--cc-text-subtle", "text-subtle"],
				["--cc-accent", "accent"],
				["--cc-danger-text", "danger"],
			] as const) {
				expect([property, block.includes(`${property}: var(--bonobo-${token}, #`)]).toEqual([property, true]);
			}
		}
	});
});
