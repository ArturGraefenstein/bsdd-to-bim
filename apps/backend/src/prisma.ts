import { PrismaClient } from "./__generated__/prisma/index.js";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		// optional: log: ['query', 'info', 'warn', 'error'],
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
