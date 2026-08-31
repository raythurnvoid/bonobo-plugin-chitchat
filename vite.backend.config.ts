import { defineConfig } from "vite";

// Bundles the backend worker to the single file the manifest's backend.entry names
// (dist/backend/worker.js). No React here, so the output ships unminified and readable;
// the build script still runs prettier over it so no bundled line trips the publish
// gate's line-length check.
export default defineConfig({
	plugins: [
		{
			// Same probe strip as vite.config.ts: zod v4 tests eval support with
			// `const F = Function; new F("")`, and the publish gate rejects any `Function(`
			// in dist. The worker runtime blocks eval anyway, so force zod's jitless paths.
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
	build: {
		// Only the backend folder is cleared; dist/frontend from the first build step stays.
		outDir: "dist/backend",
		emptyOutDir: true,
		minify: false,
		lib: {
			entry: "src/backend/worker.ts",
			formats: ["es"],
			fileName: () => "worker.js",
		},
		rollupOptions: {
			output: {
				// One reviewable file, like the manifest expects.
				codeSplitting: false,
			},
		},
	},
});
