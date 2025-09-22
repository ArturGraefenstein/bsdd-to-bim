import { verifyPassword } from "./password.js";
import { createError } from "@modules/error/error.js";
import { GLOBAL_ERRORS } from "@package/shared/error/index.js";
import type { SignInPlatform } from "@generated/resolvers-types.js";
import { signUserTokens } from "./user-token.js";
import type { Context } from "@context/context.js";

export async function loginWithPassword(
	ctx: Context,
	email: string,
	password: string,
	platform: SignInPlatform,
) {
	const user = await ctx.prisma.user.findUnique({ where: { email } });
	if (!user || !(await verifyPassword(user.passwordHash, password)))
		throw createError("Invalid credentials", GLOBAL_ERRORS.INVALID_CREDENTIALS);
	return signUserTokens(ctx, user.id, user.role, platform);
}
