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

describe("chitchat.css unread mark", () => {
	test("the New messages rule paints in the unread amber and nothing else", () => {
		// Decision 1 gives amber exactly two jobs, unread and mention emphasis. This is the log's
		// own unread boundary, so it must read as the same amber the rail badges use — not as the
		// blue that means "state the member owns".
		const divider = rule_body("\\.new-divider");
		expect(divider).toContain("var(--cc-unread-accent)");
		expect(divider).not.toContain("var(--cc-accent");
		expect(rule_body("\\.new-divider::before")).toContain("var(--cc-unread-accent)");
	});

	test("it is a full-width rule, not a floating word", () => {
		// A bare label would read as a message. The line is what makes it a boundary.
		const before = rule_body("\\.new-divider::before");
		expect(before).toContain("flex: 1");
		expect(before).toContain("height: 1px");
	});
});

describe("chitchat.css selected channel row", () => {
	test("carries its own blue, stronger than the tinted primary button", () => {
		// Decision 1 gives blue to selection. Sharing the button's tint made the chosen row hard to
		// find in the list, and brightening the shared role would have shouted from every Send button.
		const selected = rule_body('\\.channel-link\\[aria-current="page"\\]');
		expect(selected).toContain("var(--cc-accent-surface-selected)");
		expect(selected).not.toContain("var(--cc-accent-surface)");
		expect(selected).not.toContain("var(--cc-unread-accent)");
	});
});

describe("chitchat.css channel row actions", () => {
	const actions = rule_body("\\.channel-item-actions");

	test("overlays its own row instead of adding a second line to it", () => {
		// In flow the cluster was display:none -> flex on hover, which pushed every row below it
		// down while the member was aiming at one of them.
		expect(actions).toContain("position: absolute");
		expect(actions).not.toContain("display: none");
		expect(rule_body("\\.channel-item")).toContain("position: relative");
	});

	test("hides with opacity so the buttons stay in the tab order", () => {
		expect(actions).toContain("opacity: 0");
		expect(actions).not.toContain("visibility: hidden");
		expect(css).toMatch(/\.channel-item:has\(:focus-visible\) \.channel-item-actions/u);
	});

	test("reveals for keyboard focus only, never for the click that opens the channel", () => {
		// `:focus-within` also matched the mouse click that selects a row, so the chosen row answered
		// by covering its own name with Rename and Archive.
		expect(css).not.toMatch(/:focus-within \.channel-item-actions/u);
		expect(css).not.toMatch(/\.channel-item:focus-within \.channel-link/u);
	});

	test("stays revealed while its menu is open, so the trigger cannot vanish under the pointer", () => {
		// The menu takes focus out of the row, so hover and :focus-visible both stop matching. Without
		// this the trigger disappeared the moment its own menu opened. Assert the reveal rule itself:
		// naming the selector alone also matched the pointer-events rule, and passed with the reveal
		// deleted.
		expect(
			rule_body(
				'\\.channel-item:hover \\.channel-item-actions,\\s*\\.channel-item:has\\(:focus-visible\\) \\.channel-item-actions,\\s*\\.channel-item:has\\(\\[aria-expanded="true"\\]\\) \\.channel-item-actions',
			),
		).toContain("opacity: 1");
	});

	test("keeps the cluster transparent to the pointer and restores it on the buttons", () => {
		// The cluster's box lies over the channel button underneath it.
		expect(actions).toContain("pointer-events: none");
		expect(
			rule_body(
				'\\.channel-item:hover \\.channel-item-actions \\*,\\s*\\.channel-item:has\\(:focus-visible\\) \\.channel-item-actions \\*,\\s*\\.channel-item:has\\(\\[aria-expanded="true"\\]\\) \\.channel-item-actions \\*',
			),
		).toContain("pointer-events: auto");
	});

	test("reserves only one trigger's width, not a row of text buttons", () => {
		// Three text buttons needed min(150px, 55%) and still truncated the name. One 28px trigger
		// leaves the name almost the whole row.
		expect(
			rule_body(
				'\\.channel-item:hover \\.channel-link,\\s*\\.channel-item:has\\(:focus-visible\\) \\.channel-link,\\s*\\.channel-item:has\\(\\[aria-expanded="true"\\]\\) \\.channel-link',
			),
		).toContain("padding-right: 42px");
	});

	test("the trigger takes the dense target size, not the standalone one", () => {
		const trigger = rule_body("\\.ChannelRowMenu-trigger");
		expect(trigger).toContain("width: 28px");
		expect(trigger).toContain("height: 28px");
	});

	test("the menu floats above the sidebar instead of being clipped by it", () => {
		// The sidebar scrolls, so an in-flow menu was cut off by the first row opened near the bottom.
		const popover = rule_body("\\.ChannelRowMenu-popover");
		expect(popover).toMatch(/z-index:\s*\d/u);
		expect(popover).toContain("box-shadow");
	});

	test("destructive menu items use the shared danger colour", () => {
		expect(rule_body("\\.ChannelRowMenu-item-danger")).toContain("color: var(--cc-danger-text)");
	});

	test("the Leave and Delete group has a visible separator", () => {
		const separator = rule_body("\\.ChannelRowMenu-separator");
		expect(separator).toContain("height: 1px");
		expect(separator).toContain("background: var(--cc-border)");
	});
});

describe("chitchat.css composer", () => {
	test("the input and its controls share one line", () => {
		// Stacked, the composer cost ~130px of a 900px frame and read heavier than the log.
		expect(rule_body("\\.composer-bar")).toContain("display: flex");
		expect(rule_body("\\.composer-input")).toContain("flex: 1");
	});

	test("the bar keeps a standalone target height and the input keeps a growth ceiling", () => {
		expect(rule_body("\\.composer-bar")).toContain("min-height: 44px");
		expect(rule_body("\\.composer-input")).toMatch(/max-height:\s*\d/u);
	});

	test("the field border is drawn once, around the whole bar", () => {
		// The reference composer puts the controls inside the field. A border on the textarea as well
		// drew a box inside a box, and the controls sat outside both.
		expect(rule_body("\\.composer-bar")).toContain("border: 1px solid var(--cc-border-strong)");
		expect(rule_body("\\.composer-input")).toContain("border: none");
		expect(rule_body("\\.composer-bar:focus-within")).toContain("outline: 2px solid var(--cc-accent)");
	});
});

describe("chitchat.css thread summary", () => {
	test("stays neutral: no blue call to action and no amber", () => {
		// Decision 1: blue is state the member owns and amber is unread. A summary is a link.
		const summary = rule_body("\\.message-thread-summary");
		expect(summary).toContain("var(--cc-text-thread-summary)");
		expect(summary).not.toContain("var(--cc-unread-accent)");
		expect(rule_body("\\.message-thread-summary-recency")).toContain("var(--cc-text-subtle)");
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
		expect(rule_body("\\.chitchat:has\\(\\.thread\\) \\.drawer-toggle", narrow)).toContain("display: none");
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
	// where the thread-qualified sidebar rule outranks the drawer's own `.sidebar` rule.
	const rail = media_body("(min-width: 720px) and (max-width: 903px)");

	test("hides the two head controls that do not fit in 56px", () => {
		// Left in, the wordmark and the create button clipped mid-word ("Chitch", "Crea chan") and
		// gave the rail its own horizontal scrollbar.
		const hidden = rule_body(
			"\\.chitchat:has\\(\\.thread\\) \\.channel-section-title,\\s*\\.chitchat:has\\(\\.thread\\) \\.sidebar-title,\\s*\\.chitchat:has\\(\\.thread\\) \\.sidebar-create,\\s*\\.chitchat:has\\(\\.thread\\) \\.channel-item-actions",
			rail,
		);
		expect(hidden).toContain("display: none");
		// And the expanded overlay must bring them back, or expanding the rail shows a headless list.
		expect(rail).toMatch(/\.sidebar\.is-expanded \.sidebar-title/u);
		expect(rail).toMatch(/\.sidebar\.is-expanded \.sidebar-create/u);
	});

	test("drops the hover reserve, because the collapsed rail shows no row actions", () => {
		// The reserve is written for a 240px row. Left to apply here it would push the centred
		// initial out of a 56px one on hover.
		expect(
			rule_body(
				"\\.chitchat:has\\(\\.thread\\) \\.channel-item:hover \\.channel-link,\\s*\\.chitchat:has\\(\\.thread\\) \\.channel-item:has\\(:focus-visible\\) \\.channel-link",
				rail,
			),
		).toContain("padding-right: 4px");
	});

	test("the expanded drawer reserves the same 42px as the wide rail", () => {
		// The drawer shows the same single trigger, so it must reserve the same room. It kept the old
		// three-button min(150px, 55%) when the trigger replaced them: measured in the browser, that
		// held 118px of a 215px row for a 28px button and cut the channel name to 95px.
		expect(
			rule_body(
				'\\.chitchat:has\\(\\.thread\\) \\.sidebar\\.is-expanded \\.channel-item:hover \\.channel-link,\\s*\\.chitchat:has\\(\\.thread\\) \\.sidebar\\.is-expanded \\.channel-item:has\\(:focus-visible\\) \\.channel-link,\\s*\\.chitchat:has\\(\\.thread\\) \\.sidebar\\.is-expanded \\.channel-item:has\\(\\[aria-expanded="true"\\]\\) \\.channel-link',
				rail,
			),
		).toContain("padding-right: 42px");
		// No rail rule may bring a percentage reserve back. The trigger is a fixed 28px, so a reserve
		// that scales with the row width is always the old cluster's value. Scoped to the rail on
		// purpose: message rows still carry several inline buttons and keep their own percentage.
		expect(rail).not.toMatch(/padding-right:\s*min\(/u);
	});

	test("collapses only while a thread is open, inside the two-bound band", () => {
		expect(rail).not.toBe("");
		expect(rule_body("\\.chitchat:has\\(\\.thread\\) \\.sidebar", rail)).toContain("width: 56px");

		// Unqualified, the rule costs every channel name to a member at an 800px frame who never
		// opens a thread.
		expect(rule_body("\\.sidebar", rail)).not.toContain("width: 56px");
		// And no other rule in the file may collapse the rail behind the qualifier's back.
		const otherFiftySix = css.replace(rail, "");
		expect(otherFiftySix).not.toContain("width: 56px");
	});

	test("the collapsed rail centres its initials instead of ellipsing them", () => {
		const link = rule_body("\\.chitchat:has\\(\\.thread\\) \\.channel-link", rail);
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
		const light = palette_names(rule_body(":root\\.light"));

		// A property the light block forgets falls back to its dark value, so one missed line puts a
		// near-black surface or unreadable text inside an otherwise light page. Nothing renders in
		// this environment, so the two lists are what catches it.
		expect(dark.length).toBeGreaterThan(20);
		expect(light).toEqual(dark);
	});

	test("each palette block declares the matching color-scheme", () => {
		// Scrollbars and native controls are painted by the browser, not by this file, and they follow
		// `color-scheme` alone. Without it Chrome drew a light scrollbar with stepper arrows down the
		// middle of the dark message list. The frame is its own document, so the host app's own
		// declaration never reaches it.
		expect(rule_body(":root")).toContain("color-scheme: dark");
		expect(rule_body(":root\\.light")).toContain("color-scheme: light");
	});

	test("no rule outside the palette writes a colour of its own", () => {
		// The palette blocks are the only place a literal belongs. A colour written straight into a
		// rule cannot follow the theme, and it would be invisible until someone switched to light.
		const rules = css.slice(css.indexOf("* {"));
		expect(rules.match(/#[0-9a-fA-F]{3,8}|rgba?\(/gu)).toBeNull();
	});

	test("the ten app-scale roles read the app's variable first and fall back to a literal", () => {
		// The SDK writes the app's numbered scales onto the document under their real names, so on
		// these roles Chitchat wears the app's own palette instead of guessing at it — the same
		// `var(--color-base-1-01)` the app itself uses. The literal after the comma is what a host
		// that sends no theme gets, and it must be there or those roles paint nothing at all.
		for (const block of [rule_body(":root"), rule_body(":root\\.light")]) {
			for (const [property, scale] of [
				["--cc-surface", "--color-base-1-01"],
				["--cc-surface-raised", "--color-base-1-03"],
				["--cc-surface-hover", "--color-base-1-06"],
				["--cc-border", "--color-base-1-08"],
				["--cc-border-strong", "--color-base-1-11"],
				["--cc-text", "--color-fg-12"],
				["--cc-text-muted", "--color-fg-09"],
				["--cc-text-subtle", "--color-fg-07"],
				["--cc-accent", "--color-accent-05"],
				["--cc-danger-text", "--color-red-09"],
			] as const) {
				expect([property, block.includes(`${property}: var(${scale}, #`)]).toEqual([property, true]);
			}
		}
		// Nothing in the file still reads the old host role names.
		expect(css).not.toContain("--bonobo-");
	});
});
