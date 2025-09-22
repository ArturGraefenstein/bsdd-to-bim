import { type MutationResolvers } from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { createModule } from "@binder/create-module.js";
import { isAuthenticated } from "@modules/auth/permissions.js";
import { Api } from "../../bsdd-to-bim/types/swagger.types.js";

const convertDictionaryResolver: MutationResolvers<Context>["convertDictionary"] =
	async (_q, params) => {
		const { uri } = params.input;

		// const dict = await fetchDictionary({ uri });
		// const data = await dict.json();
		// const properties = await fetchDictionaryProperties({ uri });
		// const propData = await properties.json();

		// const classes = await fetchDictionaryClasses({ uri });
		// const classData = await classes.json();

		// const classObj = await fetchClass({ uri });
		// //console.log("DICT", classData);

		const api = new Api();
		const dictFromApi = await api.api.dictionaryGet({ Uri: uri });

		const dictData = await dictFromApi.json();
		console.log("DICT FROM API", dictData);

		return { converted: true };
	};

const convertDictionaryPermissions = isAuthenticated;

export const convertDictionaryModule = createModule({
	resolver: convertDictionaryResolver,
	shield: convertDictionaryPermissions,
});
