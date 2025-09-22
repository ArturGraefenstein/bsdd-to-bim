import jwt from "jsonwebtoken";
import {
	JWT_TOKEN_VERIFICATION_ERROR,
	signJwtToken,
	verifyJwtToken,
	type JWTDuration,
} from "./jwt.js";
import type { SignInPlatform } from "@generated/resolvers-types.js";
import { createError } from "@modules/error/error.js";
import { GLOBAL_ERRORS } from "@package/shared/error/index.js";

export enum AppTokenTarget {
	USER,
	DEVICE,
	DEVICE_LINK,
}

export enum AppTokenType {
	REFRESH_TOKEN,
	ACCESS_TOKEN,
}

export type AppTokenPayload = {
	target: AppTokenTarget;
	type: AppTokenType;
	platform: SignInPlatform;
} & jwt.JwtPayload;

export function signAppToken<T extends AppTokenPayload>(
	sub: string,
	payload: T,
	duration: JWTDuration,
) {
	return signJwtToken(sub, payload, duration);
}

export enum APP_TOKEN_VERIFICATION_ERROR {
	TOKEN_HAS_INVALID_TARGET,
	TOKEN_HAS_INVALID_TYPE,
}

export function verifyAppToken<T extends AppTokenPayload>(
	token: string,
	target: AppTokenTarget,
	type: AppTokenType,
): T {
	const payload = verifyJwtToken<T>(token);

	if (payload === JWT_TOKEN_VERIFICATION_ERROR.TOKEN_EXPIRED) {
		if (type === AppTokenType.ACCESS_TOKEN) {
			throw createError(
				"Access token expired",
				GLOBAL_ERRORS.ACCESS_TOKEN_EXPIRED,
			);
		}
		throw createError(
			"Refresh token expired",
			GLOBAL_ERRORS.REFRESH_TOKEN_EXPIRED,
		);
	}

	if (payload === JWT_TOKEN_VERIFICATION_ERROR.TOKEN_INVALID) {
		if (type === AppTokenType.ACCESS_TOKEN) {
			throw createError(
				"Access token invalid",
				GLOBAL_ERRORS.ACCESS_TOKEN_INVALID,
			);
		}
		throw createError(
			"Refresh token invalid",
			GLOBAL_ERRORS.REFRESH_TOKEN_INVALID,
		);
	}

	if (payload.target !== target) {
		if (type === AppTokenType.ACCESS_TOKEN) {
			throw createError(
				"Access token invalid",
				GLOBAL_ERRORS.ACCESS_TOKEN_INVALID,
			);
		}
		throw createError(
			"Refresh token invalid",
			GLOBAL_ERRORS.REFRESH_TOKEN_INVALID,
		);
	}

	if (payload.type !== type) {
		if (type === AppTokenType.ACCESS_TOKEN) {
			throw createError(
				"Access token invalid",
				GLOBAL_ERRORS.ACCESS_TOKEN_INVALID,
			);
		}
		throw createError(
			"Refresh token invalid",
			GLOBAL_ERRORS.REFRESH_TOKEN_INVALID,
		);
	}

	return payload as T;
}
