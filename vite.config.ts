import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The host publishes exactly the three files named in bonobo.plugin.json
// (dist/frontend/index.html + assets/index.js + assets/index.css), so the build
// must emit fixed, unhashed names and a single JS chunk.
export default defineConfig({
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
		// Keep the stylesheet readable for review.
		cssMinify: false,
		// The build formats the minified JavaScript again for review.
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
