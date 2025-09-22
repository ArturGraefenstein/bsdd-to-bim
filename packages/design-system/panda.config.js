import { defineConfig } from "@pandacss/dev";

import { createPreset } from "@thekeytechnology/epic-ui-panda-preset";

import { indigo } from "./src/theme/colors";

export default defineConfig({
	preflight: true,
	presets: [
		"@pandacss/preset-base",
		createPreset({
			accentColor: "indigo",
			grayColor: "mauve",
		}),
	],
	include: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"../../node_modules/@thekeytechnology/epic-ui/src/**/*.{js,jsx,ts,tsx}",
		"../../apps/admin/app/**/*.{js,jsx,ts,tsx}",
	],

	theme: {
		extend: {
			tokens: {
				colors: {
					indigo,
				},
			},
		},
	},
	exclude: [],
	jsxFramework: "react",
	outdir: "styled-system",
	importMap: "@styled-system",
});
