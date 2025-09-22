/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line no-undef
const baseConfig = require("./packages/graphql/relay-base.config.js");

// eslint-disable-next-line no-undef
module.exports = {
	root: ".",
	sources: {
		"apps/admin": "admin",
		"packages/shared": "shared",
	},
	projects: {
		admin: {
			...baseConfig,
			output: "./apps/admin/__generated__",
			base: "shared",
		},
		shared: {
			...baseConfig,
			output: "./packages/shared/__generated__",
		},
	},
};
