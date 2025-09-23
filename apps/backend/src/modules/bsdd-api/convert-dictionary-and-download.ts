import { type MutationResolvers } from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { createModule } from "@binder/create-module.js";
import { allow } from "@modules/auth/permissions.js";
import { convertDictionary } from "../../bsdd-to-bim/services/convert.js";

const convertDictionaryAndDownloadResolver: MutationResolvers<Context>["convertDictionaryAndDownload"] =
	async (_q, params) => {
		const { uri } = params.input;

		const convertedXML = await convertDictionary(uri);
		const base64 = Buffer.from(convertedXML, "utf-8").toString("base64");

		return { converted: true, blob: base64 };
	};

const convertDictionaryAndDownloadPermissions = allow;

export const convertDictionaryAndDownloadModule = createModule({
	resolver: convertDictionaryAndDownloadResolver,
	shield: convertDictionaryAndDownloadPermissions,
});
