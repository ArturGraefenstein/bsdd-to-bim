import { UserRole } from "@generated/prisma/client.js";
import type {
	SignInPlatform,
	TokenPayload,
} from "@generated/resolvers-types.js";
import {
	AppTokenTarget,
	AppTokenType,
	signAppToken,
	verifyAppToken,
	type AppTokenPayload,
} from "./token.js";
import type { Context } from "@context/context.js";

export const signUserTokens = async (
	ctx: Context,
	userId: string,
	role: UserRole,
	platform: SignInPlatform,
) => {
	const accessToken = await signUserToken(
		userId,
		role,
		AppTokenType.ACCESS_TOKEN,
		platform,
	);
	const refreshToken = await signUserToken(
		userId,
		role,
		AppTokenType.REFRESH_TOKEN,
		platform,
	);

	await ctx.prisma.userSessions.create({
		data: {
			userId,
			refreshToken,
		},
	});

	const tokens: TokenPayload = {
		accessToken,
		refreshToken,
	};
	return tokens;
};

export type UserTokenPayload = {
	role: UserRole;
} & AppTokenPayload;

const signUserToken = async (
	userId: string,
	role: UserRole,
	type: AppTokenType,
	platform: SignInPlatform,
) =>
	signAppToken(
		userId,
		{
			role,
			platform,
			type,
			target: AppTokenTarget.USER,
		},
		type === AppTokenType.REFRESH_TOKEN ? "7d" : "10m",
	);

export function verifyUserToken<T extends UserTokenPayload>(
	token: string,
	type: AppTokenType,
): T {
	return verifyAppToken<T>(token, AppTokenTarget.USER, type);
}
