import { type MutationResolvers } from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { createModule } from "@binder/create-module.js";
import { isAuthenticated } from "@modules/auth/permissions.js";
import { fetchDictionary } from "./dictionary.js";

const convertDictionaryResolver: MutationResolvers<Context>["convertDictionary"] =
	async (_q, params) => {
		const { uri } = params.input;

		const dict = await fetchDictionary({ uri });
		const data = await dict.json();
		console.log("DICT", data);

		return { converted: true };
	};

const convertDictionaryPermissions = isAuthenticated;

export const convertDictionaryModule = createModule({
	resolver: convertDictionaryResolver,
	shield: convertDictionaryPermissions,
});
