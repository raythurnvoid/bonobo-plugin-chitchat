import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const preact_source = (path: string) => fileURLToPath(new URL(`./node_modules/preact/${path}`, import.meta.url));

// The host publishes exactly the three files named in bonobo.plugin.json
// (dist/frontend/index.html + assets/index.js + assets/index.css), so the build
// must emit fixed, unhashed names and a single JS chunk.
export default defineConfig({
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
	resolve: {
		// Bundle Preact's readable source. Its compact distribution fails the plugin source-review limits.
		alias: [
			{ find: "react/jsx-dev-runtime", replacement: preact_source("jsx-runtime/src/index.js") },
			{ find: "react/jsx-runtime", replacement: preact_source("jsx-runtime/src/index.js") },
			{ find: "react-dom/client", replacement: preact_source("compat/client.mjs") },
			{ find: "react-dom", replacement: preact_source("compat/src/index.js") },
			{ find: "react", replacement: preact_source("compat/src/index.js") },
			{ find: "preact/compat", replacement: preact_source("compat/src/index.js") },
			{ find: "preact/hooks", replacement: preact_source("hooks/src/index.js") },
			{ find: "preact/jsx-dev-runtime", replacement: preact_source("jsx-runtime/src/index.js") },
			{ find: "preact/jsx-runtime", replacement: preact_source("jsx-runtime/src/index.js") },
			{ find: "preact/test-utils", replacement: preact_source("test-utils/src/index.js") },
			{ find: "preact", replacement: preact_source("src/index.js") },
		],
	},
	build: {
		outDir: "dist/frontend",
		// Published plugin source stays readable and reviewable.
		minify: false,
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
