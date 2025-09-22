import { type MutationResolvers } from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { createModule } from "@binder/create-module.js";
import { allow, isAuthenticated } from "@modules/auth/permissions.js";
import { getApi } from "./api.js";

const convertDictionaryResolver: MutationResolvers<Context>["convertDictionary"] =
	async (_q, params) => {
		const { uri } = params.input;

		const api = getApi();

		const dict = await api.dictionaryGet({ Uri: uri });

		const properties = await api.dictionaryGetWithProperties({ Uri: uri });

		for (const property of properties.data.properties || []) {
			const propertyUri = property.uri;
			if (!propertyUri) continue;

			const propertyObj = await api.propertyGet({ uri: propertyUri });
			console.log("PROPERTY", propertyObj.data);
		}

		// const classes = await api.dictionaryClassesGetWithClasses({ Uri: uri });

		// for (const cls of classes.data.classes || []) {
		// 	const classUri = cls.uri;
		// 	if (!classUri) continue;

		// 	const classObj = await api.classGet({ Uri: classUri });
		// 	const classProperties = await api.classPropertiesGet({
		// 		ClassUri: classUri,
		// 	});
		// 	const classRelations = await api.classRelationsGet({
		// 		ClassUri: classUri,
		// 		GetReverseRelations: true,
		// 	});

		// 	console.log("CLASS", classObj.data);
		// 	console.log("CLASS", classProperties.data);
		// 	console.log("CLASS", classRelations.data);
		// }

		return { converted: true };
	};

const convertDictionaryPermissions = allow;

export const convertDictionaryModule = createModule({
	resolver: convertDictionaryResolver,
	shield: convertDictionaryPermissions,
});
