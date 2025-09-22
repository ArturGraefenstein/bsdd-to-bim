import {
	type MutationResolvers,
	type RefreshTokenPayload,
} from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { allow } from "./permissions.js";
import { createModule } from "@binder/create-module.js";
import { createError } from "@modules/error/error.js";
import { GLOBAL_ERRORS } from "@package/shared/error/index.js";
import { signUserTokens, verifyUserToken } from "./user-token.js";
import { AppTokenType } from "./token.js";

const refreshTokenResolver: MutationResolvers<Context>["refreshToken"] = async (
	_q,
	params,
	ctx,
) => {
	const { refreshToken } = params;

	let deviceRefreshTokenInDBId: string | undefined;

	const userTokenPayload = verifyUserToken(
		refreshToken,
		AppTokenType.REFRESH_TOKEN,
	);

	const refreshTokenInDB = await ctx.prisma.userSessions.findFirst({
		where: {
			refreshToken,
		},
	});
	const user = await ctx.prisma.user.findFirst({
		where: { id: userTokenPayload.sub },
	});
	if (!refreshTokenInDB || !user) {
		throw createError(
			"Refresh token has expired",
			GLOBAL_ERRORS.REFRESH_TOKEN_EXPIRED,
		);
	}

	const newUserTokens = await signUserTokens(
		ctx,
		user.id,
		user.role,
		userTokenPayload.platform,
	);

	const payload: RefreshTokenPayload = {
		accessToken: newUserTokens.accessToken,
		refreshToken: newUserTokens.refreshToken,
	};

	await ctx.prisma.userSessions.delete({
		where: {
			id: refreshTokenInDB.id,
		},
	});

	if (deviceRefreshTokenInDBId) {
		await ctx.prisma.deviceSessions.delete({
			where: {
				id: deviceRefreshTokenInDBId,
			},
		});
	}

	return payload;
};

const refreshTokenPermissions = allow;

export const refreshTokenModule = createModule({
	resolver: refreshTokenResolver,
	shield: refreshTokenPermissions,
});

export const refreshTokenPayloadPermissoins = {
	refreshToken: allow,
	accessToken: allow,
	deviceRefreshToken: allow,
	deviceAccessToken: allow,
};
