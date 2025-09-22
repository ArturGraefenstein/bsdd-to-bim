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
		ignores: ["dist/**", "styled-system/**", "node_modules/**"],
	},
]);
