// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "src/**/*.graphql", // oder 'src/schema/**/*.graphql'
	generates: {
		"src/__generated__/resolvers-types.ts": {
			plugins: ["typescript", "typescript-resolvers"],
			config: {
				useTypeImports: true,
				enumsAsConst: true,
				contextType: "../context/context.js#Context",
				scalars: {
					DateTime: "Date",
					File: "File",
				},
			},
		},
		"../../packages/graphql/schema.graphql": {
			plugins: ["schema-ast"],
			config: {
				includeDirectives: true,
				sort: true,
			},
		},
	},
};
export default config;
