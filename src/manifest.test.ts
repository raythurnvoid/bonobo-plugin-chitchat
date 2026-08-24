// @vitest-environment node
// The default happy-dom environment rewrites import.meta.url to an http URL, which breaks the
// file reads below; this test only touches the filesystem, so it runs under node.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

/**
 * Guard the manifest against the host's `plugins_validate_manifest` rules this plugin depends on
 * (packages/app/shared/plugins.ts). The checks mirror the documented limits rather than importing
 * the validator, because the plugin repository builds standalone.
 */

const manifest = JSON.parse(readFileSync(new URL("../bonobo.plugin.json", import.meta.url), "utf8")) as {
	schemaVersion: number;
	name: string;
	displayName: string;
	version: string;
	description: string;
	compatibility: { bonoboPluginRuntime: string };
	events: unknown[];
	pages: { id: string; title: string; entry: string; navItem?: { label: string; icon?: string } }[];
	capabilities: string[];
	outboundOrigins: string[];
	files: { path: string; sha256: string; bytes: number; contentType: string }[];
};

describe("bonobo.plugin.json", () => {
	test("names the plugin chitchat with the runtime-1 compatibility", () => {
		expect(manifest.name).toBe("chitchat");
		expect(manifest.displayName).toBe("Chitchat");
		expect(manifest.schemaVersion).toBe(1);
		expect(manifest.compatibility.bonoboPluginRuntime).toBe("1");
		expect(manifest.version).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+$/);
		expect(manifest.displayName.length).toBeLessThanOrEqual(80);
		expect(manifest.description.length).toBeLessThanOrEqual(2000);
	});

	test("declares one nav page whose entry is a listed text/html file", () => {
		expect(manifest.pages).toHaveLength(1);
		const page = manifest.pages[0]!;
		expect(page.id).toBe("chat");
		expect(page.id).toMatch(/^[a-z0-9][a-z0-9-]{0,63}$/);
		expect(page.title).toBe("Chitchat");
		expect(page.navItem?.label).toBe("Chitchat");
		expect(page.navItem?.label.length).toBeLessThanOrEqual(40);
		const entry = manifest.files.find((file) => file.path === page.entry);
		expect(entry?.contentType).toBe("text/html");
	});

	test("declares exactly the data-read, user-write, files-read, and members-read capabilities", () => {
		// plugin.data.user-write requires plugin.data.read — dropping the read capability
		// is a publish rejection. workspace.members.read is what the private-channel people
		// picker reads; without it a member could create a private channel and never add
		// anybody to it.
		expect([...manifest.capabilities].sort()).toEqual([
			"plugin.data.read",
			"plugin.data.user-write",
			"workspace.files.read",
			"workspace.members.read",
		]);
	});

	test("declares no events, secrets, file views, or outbound origins", () => {
		expect(manifest.events).toEqual([]);
		expect(manifest.outboundOrigins).toEqual([]);
		expect("secrets" in manifest).toBe(false);
		expect("fileViews" in manifest).toBe(false);
		expect("uiOutboundOrigins" in manifest).toBe(false);
	});

	test("lists only dist/ files inside the documented size caps", () => {
		expect(manifest.files.length).toBeLessThanOrEqual(64);
		let total = 0;
		for (const file of manifest.files) {
			expect(file.path.startsWith("dist/")).toBe(true);
			expect(file.sha256).toMatch(/^sha256:[a-f0-9]{64}$/);
			expect(file.bytes).toBeLessThanOrEqual(900_000);
			total += file.bytes;
		}
		expect(total).toBeLessThanOrEqual(16 * 1024 * 1024);
	});

	test("matches the built dist bytes exactly, including the dist manifest copy", () => {
		// Publishing verifies these hashes against the fetched files; a stale dist would publish
		// old code under a new version.
		for (const file of manifest.files) {
			const bytes = readFileSync(new URL(`../${file.path}`, import.meta.url));
			expect(file.bytes).toBe(bytes.byteLength);
			expect(file.sha256).toBe(`sha256:${createHash("sha256").update(bytes).digest("hex")}`);
		}
		const distManifest = readFileSync(new URL("../dist/bonobo.plugin.json", import.meta.url), "utf8");
		const rootManifest = readFileSync(new URL("../bonobo.plugin.json", import.meta.url), "utf8");
		expect(distManifest).toBe(rootManifest);
	});

	test("the dist bundle never calls the Function constructor", () => {
		// The mechanical publish gate rejects `Function(` in dist as dynamically-assembled
		// code. Zod's eval probe used to trip it; the strip-zod-eval-probe transform in
		// vite.config.ts removes it, and this pin fails the build if it ever comes back.
		const bundle = readFileSync(new URL("../dist/frontend/assets/index.js", import.meta.url), "utf8");
		expect(bundle).not.toMatch(/\bFunction\s*\(/);
	});

	test("no dist text file carries a line over the 1000-character review limit", () => {
		for (const file of manifest.files) {
			if (
				!file.contentType.startsWith("text/") &&
				file.contentType !== "application/javascript" &&
				file.contentType !== "application/json"
			) {
				continue;
			}
			const text = readFileSync(new URL(`../${file.path}`, import.meta.url), "utf8");
			const longest = text.split(/\r?\n/u).reduce((max, line) => Math.max(max, line.length), 0);
			expect(longest).toBeLessThanOrEqual(1_000);
		}
	});
});
