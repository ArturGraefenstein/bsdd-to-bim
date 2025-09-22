import { authMiddleware } from "react-relay-network-modern";

import { GLOBAL_ERRORS } from "@package/shared/error";
import { decodeAccessToken } from "~/features/auth/utils";

import { type JwtTokenData, useAuthStore } from "../store/auth-store";

import { AuthError } from "./auth-error";

export const isJwtTokenData = (response: unknown): response is JwtTokenData =>
	typeof response === "object" &&
	response !== null &&
	"accessToken" in response &&
	"refreshToken" in response;

export const refreshJWTToken = () => {
	const state = useAuthStore.getState();
	const refreshToken = state.jwtTokenData?.refreshToken;
	const accountId = decodeAccessToken(state.jwtTokenData?.accessToken);
	return fetch(`${import.meta.env.VITE_API_BASE}/api/refresh-token`, {
		method: "POST",
		headers: new Headers({ "content-type": "application/json" }),
		body: JSON.stringify({
			refreshToken,
			accountId,
		}),
	})
		.then((res) => res.json())
		.then((json) => {
			if (!json || !isJwtTokenData(json)) {
				return Promise.reject(
					new AuthError(
						"Auth Refresh Token expired",
						GLOBAL_ERRORS.REFRESH_TOKEN_EXPIRED,
					),
				);
			}

			const token = json.accessToken;
			useAuthStore.getState().setJwtTokenData(json);
			return token;
		})
		.catch(() =>
			Promise.reject(
				new AuthError(
					"Auth Refresh Token expired",
					GLOBAL_ERRORS.REFRESH_TOKEN_EXPIRED,
				),
			),
		);
};

export const JwtMiddleware = authMiddleware({
	allowEmptyToken: true,
	token: () => useAuthStore.getState().jwtTokenData?.accessToken || "",
	tokenRefreshPromise: refreshJWTToken,
});
