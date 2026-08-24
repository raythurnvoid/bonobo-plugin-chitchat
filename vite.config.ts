import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The host publishes exactly the three files named in bonobo.plugin.json
// (dist/frontend/index.html + assets/index.js + assets/index.css), so the build
// must emit fixed, unhashed names and a single JS chunk.
export default defineConfig({
	/*
	 * The page runs on real React and Ariakit, and a plugin file may not exceed 900,000 bytes.
	 * Unminified, React alone came to 947,309 bytes, so shipping it readable is not possible.
	 *
	 * Only the identifier names are given up. `minify` still runs, but the build script then reformats
	 * the output with prettier, which puts the code back on 25,784 lines averaging 27 characters. So
	 * the published dist keeps a readable line structure a reviewer can follow, and of the publish
	 * gate's mechanical checks only the single-character-identifier one is tripped — an advisory that
	 * blocks nothing, written for exactly this case: a bundled dependency the author cannot rename.
	 */
	esbuild: { minifyIdentifiers: true, minifySyntax: true, minifyWhitespace: true },
	plugins: [
		react(),
		{
			// Zod v4 probes eval support with `const F = Function; new F("")`. The bundler
			// inlines the alias, and the publish gate rejects any `Function(` in dist as
			// dynamically-assembled code. Replace the probe with `return false` so zod
			// always takes its no-eval (jitless) paths — the sandboxed plugin iframe runs
			// under a CSP where eval is blocked anyway.
			name: "strip-zod-eval-probe",
			transform(code, id) {
				if (!id.includes("zod")) {
					return null;
				}

				const probe = /const F = Function;\s*new F\(""\);\s*return true;/;
				if (!probe.test(code)) {
					return null;
				}

				return { code: code.replace(probe, "return false;"), map: null };
			},
		},
	],
	base: "./",
	build: {
		outDir: "dist/frontend",
		// Only the JavaScript is squeezed, and only because React does not fit otherwise. The
		// stylesheet is 42 KB and the budget has room, so it stays readable for review.
		cssMinify: false,
		// Published plugin source stays readable and reviewable.
		minify: "esbuild",
		rollupOptions: {
			output: {
				entryFileNames: "assets/index.js",
				chunkFileNames: "assets/[name].js",
				assetFileNames: "assets/index[extname]",
				// Guarantees a single JS chunk (rolldown-vite's replacement for
				// the deprecated inlineDynamicImports: true).
				codeSplitting: false,
			},
		},
	},
});
