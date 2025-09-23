type UploadOptions = {
	base64: string;
	bearerToken?: string;
};

export async function uploadFile(options: UploadOptions) {
	const { base64, bearerToken } = options;

	const user55 = "e1406cd1-f1ca-44d2-ab51-79629d3b043d";
	const referer = "https://via.bund.de/bmdv/bim-portal/edu/bim/merkmale/import";
	// create form
	const form = new FormData();
	// text field (approver)
	form.append("approver", user55);

	// file field: provide a readable stream and filename + content type
	const orgaId = "445a9244-4107-493b-8afc-6b0215b2a602";
	const buffer = Buffer.from(base64, "base64");
	const blob = new Blob([buffer], { type: "text/xml" });

	form.append("file", blob, "upload.xml"); // third param is filename
	// Node form-data exposes headers including the content-type with boundary

	const headers = {
		...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
		...(orgaId ? { "orga-id": orgaId } : {}),
		...(referer ? { Referer: referer } : {}),
		// include the form headers (content-type with boundary)
		// you can add other headers if you need (accept, etc.)
		Accept: "application/json, text/plain, */*",
	};

	const res = await fetch(
		"https://via.bund.de/bmdv/bim-portal/edu/bim/merkmale/api/v1/loading/check",
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				...headers,
			},
			body: form as any,
		},
	);

	return res.status;
}
