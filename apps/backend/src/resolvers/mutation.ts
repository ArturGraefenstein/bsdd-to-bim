import type { MutationResolvers } from "@generated/resolvers-types.js";
import { setupInstanceModule } from "@modules/system/setupInstance.js";
import { bindModules } from "@binder/create-module.js";
import { loginModule } from "@modules/auth/login-mutation.js";
import { refreshTokenModule } from "@modules/auth/refresh-token-mutation.js";

export const MutationModule = bindModules<MutationResolvers>({
	setupInstance: setupInstanceModule,
	login: loginModule,
	refreshToken: refreshTokenModule,
});
