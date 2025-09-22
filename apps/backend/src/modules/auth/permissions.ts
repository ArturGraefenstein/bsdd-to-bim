import type { Context } from "@context/context.js";
import { UserRole } from "@generated/prisma/client.js";

import { rule, type IRules } from "graphql-shield";
import { createError } from "@modules/error/error.js";
import { GLOBAL_ERRORS } from "@package/shared/error/index.js";

export { allow, deny } from "graphql-shield";

const checkAuthentication = (ctx: Context) => {
	const token = ctx.jwt?.token.value;
	if (!token)
		return createError(
			"Missiong authentication token",
			GLOBAL_ERRORS.MISSING_AUTH_TOKEN,
		);
	return true;
};

export const isAuthenticated = rule({ cache: "contextual" })(async (
	_p,
	_a,
	ctx: Context,
) => {
	return checkAuthentication(ctx);
});

export const isAdmin = rule({ cache: "contextual" })(async (
	_p,
	_a,
	ctx: Context,
) => {
	const authCheck = checkAuthentication(ctx);
	if (authCheck !== true) {
		return authCheck;
	}
	const role = ctx.jwt?.payload.role;
	const hasAdminRole = role === UserRole.ADMIN || role === UserRole.SUPER;
	if (!hasAdminRole) {
		return createError(
			"Not enough permissions",
			GLOBAL_ERRORS.NOT_ENOUGH_PERMISSIONS,
		);
	}
	return true;
});

export const hasRole = (roles: UserRole[]) =>
	rule({ cache: "contextual" })(async (_p, _a, ctx: Context) => {
		const authCheck = checkAuthentication(ctx);
		if (authCheck !== true) {
			return authCheck;
		}
		const hasRequierdRole = ctx.jwt && roles.includes(ctx.jwt.payload.role);
		if (!hasRequierdRole) {
			return createError(
				"Not enough permissions",
				GLOBAL_ERRORS.NOT_ENOUGH_PERMISSIONS,
			);
		}
		return true;
	});

export type RuleMap<T> = Partial<Record<keyof T, IRules>>;
