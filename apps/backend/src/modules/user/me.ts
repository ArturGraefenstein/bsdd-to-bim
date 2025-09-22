import { type QueryResolvers } from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { isAuthenticated } from "@modules/auth/permissions.js";
import { createModule } from "@binder/create-module.js";
import { createError } from "@modules/error/error.js";
import { GLOBAL_ERRORS } from "@package/shared/error/index.js";

export const me: QueryResolvers<Context>["me"] = async (_p, _a, ctx) => {
	const userId = ctx.jwt?.payload.sub;
	const user = await ctx.prisma.user.findUnique({
		where: { id: userId },
	});
	if (!user) {
		throw createError("User not found", GLOBAL_ERRORS.USER_NOT_FOUND);
	}

	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		role: user.role,
		createdAt: user?.createdAt,
	};
};

export const mePermissions = isAuthenticated;

export const meModule = createModule({
	resolver: me,
	shield: mePermissions,
});
