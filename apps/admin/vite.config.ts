import * as path from "node:path";

import { reactRouter } from "@react-router/dev/vite";
import graphql from "@rollup/plugin-graphql";
import { defineConfig, type PluginOption } from "vite";
import relay from "vite-plugin-relay";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		graphql() as PluginOption,
		reactRouter(),
		tsconfigPaths({ root: "./" }),
		relay,
		svgr({
			svgrOptions: {
				exportType: "named",
				ref: true,
				svgo: false,
				titleProp: true,
			},
			include: "**/*.svg",
		}),
	],
	resolve: {
		alias: {
			"@styled-system": path.resolve(
				__dirname,
				"../../packages/design-system/styled-system",
			),
			"@assets": path.resolve(__dirname, "./app/assets"),
		},
	},
});
