import { type MutationResolvers } from "@generated/resolvers-types.js";
import type { Context } from "@context/context.js";
import { createModule } from "@binder/create-module.js";
import { allow } from "@modules/auth/permissions.js";
import { convertDictionary } from "../../bsdd-to-bim/services/convert.js";
import fs from "node:fs";
import { uploadFile } from "../../bsdd-to-bim/services/upload.js";
import { uploadDo } from "../../bsdd-to-bim/services/upload-do.js";
import { match } from "ts-pattern";
import { refreshToken2 } from "../../bsdd-to-bim/services/refresh.js";

const convertDictionaryResolver: MutationResolvers<Context>["convertDictionary"] =
	async (_q, params) => {
		const { uri } = params.input;

		const convertedXML = await convertDictionary(uri);
		const base64 = Buffer.from(convertedXML, "utf-8").toString("base64");

		let bearer =
			"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZcjdGVDh5NVJDVWFVdDlrYUhrQXMxVW5yak0tQ0xQckRBaXZVVlAwU09zIn0.eyJleHAiOjE3NTg2MjM4NDMsImlhdCI6MTc1ODYyMzc4MywianRpIjoiOGI5NzM0MDktMmY5Yi00ZTZmLWEyMzUtMjhlN2ZjZjE4MzcxIiwiaXNzIjoiaHR0cHM6Ly92aWEucmVzLmJ1bmQuZGUvYm1kdi9iaW0tcG9ydGFsL2VkdS9iaW0vYXV0aC9yZWFsbXMvYmltIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImUxNDA2Y2QxLWYxY2EtNDRkMi1hYjUxLTc5NjI5ZDNiMDQzZCIsInR5cCI6IkJlYXJlciIsImF6cCI6InVzZXJwb29sIiwic2lkIjoiYWM4ZjkyZjEtYTMxMS00M2E2LWJiMTgtYjQyNGRkM2UxNTVjIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYmltIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSGFja2F0aG9uIFVzZXI1NSIsInByZWZlcnJlZF91c2VybmFtZSI6ImhhY2thdGhvbi51c2VyLmJpbWQrNTVAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IkhhY2thdGhvbiIsImZhbWlseV9uYW1lIjoiVXNlcjU1IiwiZW1haWwiOiJoYWNrYXRob24udXNlci5iaW1kKzU1QGdtYWlsLmNvbSJ9.ioVhIeXbj7szRUskn2K99o3WokiUeZ0iU9c1PEyyrP57K2OmMxt-ofdo68pJRvQ1i7VyyERkyLZR8MzVK3rQ8OGGcGtkQUrV2SFVyyOk2uugyNGVPralneiEzAkdhPwo3JpZljywZb-SDdJVEubVLsuTgvUqboAEOLmBopR5TEbm6fNqhepU9AQ6ohcUaWOBOmoFoyX0mUHe9Zvhf2709Ok9I7UIMKHFEjX0NGrfGc-3btQQndYoPS842nCAI5piLESE7FZhtVimtQl0aPpiCgUqwtEepaQFL2LrUxySTwYwjDO2FaEoFmxYlmAN3VrrjESU9gM_EALTKqDmRAp6YA";

		const refreshToken = fs.readFileSync("refreshtoken.txt", "utf-8");
		console.log("refreshToken", refreshToken);
		await fs.writeFileSync("./bim.xml", convertedXML);

		const canUploadStatus = await uploadFile({
			base64: base64,
			bearerToken: bearer,
		});

		match(canUploadStatus)
			.with(200, async () => {
				const hasUploaded = await uploadDo({
					base64: base64,
					bearerToken: bearer,
				});
				if (hasUploaded) {
					console.log("has uploaded");
				} else {
					console.log("upload failed");
				}
			})
			.with(401, async () => {
				const newBearer = await refreshToken2({
					refreshToken: refreshToken,
				});

				fs.writeFile(
					"./refreshtoken.txt",
					refreshToken,
					{
						encoding: "utf-8",
					},
					() => {},
				);
				const canUploadStatus = await uploadFile({
					base64: base64,
					bearerToken: newBearer.token,
				});

				if (canUploadStatus !== 200) return;

				const hasUploaded = await uploadDo({
					base64: base64,
					bearerToken: newBearer.token,
				});
				if (hasUploaded) {
					console.log("has uploaded");
				} else {
					console.log("upload failed");
				}
			})
			.otherwise(() => {});

		return { converted: true, blob: base64 };
	};

const convertDictionaryPermissions = allow;

export const convertDictionaryModule = createModule({
	resolver: convertDictionaryResolver,
	shield: convertDictionaryPermissions,
});
