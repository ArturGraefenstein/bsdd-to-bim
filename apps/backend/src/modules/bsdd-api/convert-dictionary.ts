import { type MutationResolvers } from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { createModule } from "@binder/create-module.js";
import { allow, isAuthenticated } from "@modules/auth/permissions.js";
import { getApi } from "./api.js";
import { convert } from "../../bsdd-to-bim/services/convert.js";
import fs from "node:fs";

const convertDictionaryResolver: MutationResolvers<Context>["convertDictionary"] =
	async (_q, params) => {
		const { uri } = params.input;

		const api = getApi();

		// const dict = await api.dictionaryGet({ Uri: uri });

		const properties = await api.dictionaryGetWithProperties({ Uri: uri });
		//console.log("PROPERTIES", properties.data);
		const xml = await convert(properties.data);
		await fs.writeFileSync("./bim.xml", xml);
		console.log("DICT", xml);

		const base64 = Buffer.from(xml, "utf-8").toString("base64");

		return { converted: true, blob: base64 };
	};

const convertDictionaryPermissions = allow;

export const convertDictionaryModule = createModule({
	resolver: convertDictionaryResolver,
	shield: convertDictionaryPermissions,
});
