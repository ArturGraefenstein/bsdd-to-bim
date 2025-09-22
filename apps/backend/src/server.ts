// src/server.ts
import { createServer } from "node:http";
import {
	createYoga,
	createSchema,
	type YogaInitialContext,
} from "graphql-yoga";
import { prisma } from "./prisma.js";
import type { Context } from "@context/context.js";
import { DateTimeISOResolver } from "graphql-scalars";
import { QueryModule } from "@resolvers/query.js";
import { MutationModule } from "@resolvers/mutation.js";
import {
	useJWT,
	createInlineSigningKeyProvider,
} from "@graphql-yoga/plugin-jwt";
import { useGraphQLMiddleware } from "@envelop/graphql-middleware";
import { permissions } from "./shield.js";
import { loadFiles } from "@graphql-tools/load-files";

const typeDefs = await loadFiles("src/**/*.graphql");

console.log(process.env.JWT_SECRET);
const yoga = createYoga<Context>({
	schema: createSchema({
		typeDefs,
		resolvers: {
			DateTime: DateTimeISOResolver,
			Query: QueryModule.resolvers,
			Mutation: MutationModule.resolvers,
		},
	}),
	context: (yogaContext: YogaInitialContext) => {
		const deviceAuthToken =
			yogaContext.request.headers.get("device-authorization") ?? undefined;
		return { prisma, deviceAuthToken } satisfies Context;
	},
	plugins: [
		useJWT({
			signingKeyProviders: [
				createInlineSigningKeyProvider(process.env.JWT_SECRET!),
			],
			tokenVerification: {
				issuer: "https://service.reckersfluid.de",
				audience: "reckers-service",
				algorithms: ["HS256"],
				ignoreExpiration: true,
			},
			extendContext: true,
			reject: { missingToken: false, invalidToken: false },
		}),
		useGraphQLMiddleware([permissions]),
	],
});

const port = process.env.SERVER_PORT || 4000;
createServer(yoga).listen(port, () => {
	console.log(`🚀 Yoga läuft: http://localhost:${port}/graphql`);
});
