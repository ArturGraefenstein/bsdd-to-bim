import { createModule } from "@binder/create-module.js";
import {
	type QueryResolvers,
	SetupStatus,
} from "@generated/resolvers-types.js";
import { allow } from "@modules/auth/permissions.js";

export const setupStatus: QueryResolvers["setupStatus"] = async (
	_q,
	_p,
	ctx,
) => {
	return ctx.prisma.system.findFirst().then((system) => {
		return system?.setupStatus ?? SetupStatus.Untouched;
	});
};

export const setupStatusPermissions = allow;

export const setupStatusModule = createModule({
	resolver: setupStatus,
	shield: setupStatusPermissions,
});
