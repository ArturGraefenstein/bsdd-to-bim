import type { PrismaClient, UserRole } from "@generated/prisma/client.js";
import type { JWTExtendContextFields } from "@graphql-yoga/plugin-jwt";

type JWTContext = JWTExtendContextFields & {
	payload: { role: UserRole };
};
export type Context = {
	prisma: PrismaClient;
	deviceAuthToken?: string;
	jwt?: JWTContext;
};
