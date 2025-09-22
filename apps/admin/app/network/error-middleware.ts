import type {
	MiddlewareNextFn,
	RelayRequestAny,
} from "react-relay-network-modern";

import { GLOBAL_ERRORS } from "@package/shared/error";
import { useAuthStore } from "~/store";

import { AuthError } from "./auth-error";

export type ErrorCallback = (errorCode: string) => void;
export type OnLogoutCallback = () => void;

export const createErrorMiddleware = (
	onError: ErrorCallback,
	onLogout: OnLogoutCallback,
) => {
	return (next: MiddlewareNextFn) => async (req: RelayRequestAny) => {
		try {
			const res = await next(req);
			const errors = res.errors?.map((e) => e.message.toLowerCase()) || [];
			const firstError = errors[0];
			if (firstError) {
				onError(firstError);
			}
			return res;
		} catch (error) {
			if (
				error instanceof AuthError &&
				error.code === GLOBAL_ERRORS.REFRESH_TOKEN_EXPIRED
			) {
				onLogout();
				useAuthStore.getState().logout();
				onError(error.code);
			}
			throw error;
		}
	};
};
