import { type MutationResolvers } from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { loginWithPassword } from "./auth.js";
import { allow } from "./permissions.js";
import { createModule } from "@binder/create-module.js";

export const login: MutationResolvers<Context>["login"] = async (
	_q,
	{ email, password, platform },
	ctx,
) => {
	return loginWithPassword(ctx, email, password, platform);
};

export const loginPermissions = allow;

export const loginModule = createModule({
	resolver: login,
	shield: loginPermissions,
});

export const tokenPayloadPermissions = {
	accessToken: allow,
	refreshToken: allow,
};
