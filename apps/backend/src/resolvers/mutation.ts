import type { MutationResolvers } from "@generated/resolvers-types.js";
import { setupInstanceModule } from "@modules/system/setupInstance.js";
import { bindModules } from "@binder/create-module.js";
import { loginModule } from "@modules/auth/login-mutation.js";
import { refreshTokenModule } from "@modules/auth/refresh-token-mutation.js";
import { convertDictionaryAndDownloadModule } from "@modules/bsdd-api/convert-dictionary-and-download.js";
import { convertDictionaryAndUploadModule } from "@modules/bsdd-api/convert-dictionary-and-upload.js";

export const MutationModule = bindModules<MutationResolvers>({
	setupInstance: setupInstanceModule,
	login: loginModule,
	refreshToken: refreshTokenModule,
	convertDictionaryAndDownload: convertDictionaryAndDownloadModule,
	convertDictionaryAndUpload: convertDictionaryAndUploadModule,
});
