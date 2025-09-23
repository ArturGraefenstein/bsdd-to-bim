import { type MutationResolvers } from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { createModule } from "@binder/create-module.js";
import { allow } from "@modules/auth/permissions.js";
import { convertDictionary } from "../../bsdd-to-bim/services/convert.js";
import fs from "node:fs";

const convertDictionaryResolver: MutationResolvers<Context>["convertDictionary"] =
	async (_q, params) => {
		const { uri } = params.input;

		// const api = getApi();

		// const dict = await api.dictionaryGet({ Uri: uri });

		// const dictionary = await api.dictionaryGetWithProperties({ Uri: uri });
		// console.log("Dictionary fetched:", dictionary.data);
		// const classes = await api.dictionaryClassesGetWithClasses({ Uri: uri });
		// const materials = classes.data.classes?.filter(
		// 	(c) => c.classType === "Material",
		// );
		// const groupOfClases = classes.data.classes?.filter(
		// 	(c) => c.classType === "GroupOfProperties",
		// );
		// const cleanClasses = classes.data.classes?.filter(
		// 	(c) => c.classType === "Class",
		// );

		// console.log("Materials fetched:", materials);
		// console.log("Groups fetched:", groupOfClases);
		// console.log("Clean classes fetched:", cleanClasses);
		// //

		// console.log("Classes fetched:", classes.data);
		// const classRelations = await api.classGet({
		// 	Uri: "https://identifier.buildingsmart.org/uri/buildingsmart-de/BACnet/0.1/class/bSD_Pset_BACnetCommon", // Example class URI
		// 	IncludeClassRelations: true,
		// 	IncludeChildClassReferences: true,
		// 	IncludeClassProperties: true,
		// 	IncludeReverseRelations: true,
		// });
		// console.log("classRelations", classRelations.data);
		//console.log("PROPERTIES", properties.data);
		// console.log("PROPERTIES COUNT", properties.data);
		// const xml = await convert(properties.data);
		// await fs.writeFileSync("./bim.xml", xml);
		// console.log("DICT", xml);

		const convertedXML = await convertDictionary(uri);

		// console.log("WRITING TO FILE", convertedXML);
		await fs.writeFileSync("./bim.xml", convertedXML);

		const base64 = Buffer.from(convertedXML, "utf-8").toString("base64");

		return { converted: true, blob: base64 };
	};

const convertDictionaryPermissions = allow;

export const convertDictionaryModule = createModule({
	resolver: convertDictionaryResolver,
	shield: convertDictionaryPermissions,
});
