import { defineConfig } from "eslint/config";

import eslintConfig from "@package/config/eslint.config.js";

export default defineConfig([
	...eslintConfig,
	{
		rules: {
			"@typescript-eslint/no-floating-promises": [
				"error",
				{
					allowForKnownSafeCalls: [
						{
							from: "package",
							name: "NavigateFunction",
							package: "react-router",
						},
					],
				},
			],
		},
	},
	{
		files: ["apps/admin/**", "apps/webapp/**"],
		rules: {
			"no-restricted-imports": [
				"error",
				{
					patterns: [
						{
							group: ["@styled-system/*"],
							message:
								"Imports from @styled-system/* are not allowed. Use the @design-system/* components instead.",
						},
					],
				},
			],
		},
	},
	{
		ignores: [
			"apps/admin/build/**",
			"apps/admin/node_modules/**",
			"apps/admin/.react-router/**",
			"apps/webapp/build/**",
			"apps/webapp/node_modules/**",
			"apps/webapp/.react-router/**",
			"packages/design-system/dist/**",
			"packages/design-system/styled-system/**",
			"packages/design-system/node_modules/**",
			"packages/graphql/graphql.ts",
		],
	},
]);
