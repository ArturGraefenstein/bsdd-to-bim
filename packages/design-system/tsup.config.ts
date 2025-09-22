import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	external: [
		"@package/design-system",
		"react/jsx-runtime",
		"react",
		"react-dom",
	],
	dts: true,
	clean: true,
	tsconfig: "./tsconfig.json",
	esbuildOptions: (options) => {
		options.external = [
			...(options.external ?? []),
			"@styled-system/*",
			"@assets/*",
		];
	},
});
