import { bindModules } from "@binder/create-module.js";
import type { QueryResolvers } from "@generated/resolvers-types.js";
import { meModule } from "@modules/user/me.js";

export const QueryModule = bindModules<QueryResolvers>({
	me: meModule,
});
