import {
	SetupStatus,
	SignInPlatform,
	type MutationResolvers,
} from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { UserRole } from "@generated/prisma/client.js";
import { hashPassword } from "@modules/auth/password.js";
import { allow } from "@modules/auth/permissions.js";
import { createModule } from "@binder/create-module.js";
import { loginWithPassword } from "@modules/auth/auth.js";
import { createError } from "@modules/error/error.js";
import { GLOBAL_ERRORS } from "@package/shared/error/index.js";

export const setupInstance: MutationResolvers<Context>["setupInstance"] =
	async (_q, params, ctx) => {
		const system = await ctx.prisma.system.findFirst();
		if (system?.setupStatus === SetupStatus.Initialized) {
			throw createError(
				"Instance already initialized",
				GLOBAL_ERRORS.INSTANCE_ALREADY_INITIALIZED,
			);
		}
		const setupStatus = SetupStatus.Initialized;
		const { password, ...userData } = params;
		const passwordHash = await hashPassword(password);
		await ctx.prisma.user.create({
			data: {
				...userData,
				passwordHash,
				role: UserRole.SUPER,
				createdAt: new Date(),
			},
		});
		await ctx.prisma.system.create({
			data: {
				setupStatus,
			},
		});
		return loginWithPassword(
			ctx,
			params.email,
			params.password,
			SignInPlatform.Web,
		);
	};

export const setupInstancePermissions = allow;

export const setupInstanceModule = createModule({
	resolver: setupInstance,
	shield: setupInstancePermissions,
});
