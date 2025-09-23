type UploadOptions = {
	base64: string;
	bearerToken?: string;
};

export async function uploadDo(options: UploadOptions): Promise<boolean> {
	const { base64, bearerToken } = options;
	const url =
		"https://via.bund.de/bmdv/bim-portal/edu/bim/merkmale/api/v1/loading";
	const orgaId = "445a9244-4107-493b-8afc-6b0215b2a602";
	const admin = "e1406cd1-f1ca-44d2-ab51-79629d3b043d";
	const user55 = "e1406cd1-f1ca-44d2-ab51-79629d3b043d";
	const referer = "https://via.bund.de/bmdv/bim-portal/edu/bim/merkmale/import";

	const form = new FormData();

	// append text fields
	form.append("approver", user55);
	form.append("admin", admin);

	// append file field
	// base64 → Blob
	const buffer = Buffer.from(base64, "base64");
	const blob = new Blob([buffer], { type: "text/xml" });
	form.append("file", blob, "upload.xml"); // third param is filename

	const headers: Record<string, string> = {
		Accept: "application/json, text/plain, */*",
		...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
		...(orgaId ? { "orga-id": orgaId } : {}),
		...(referer ? { Referer: referer } : {}),
	};

	const res = await fetch(url, {
		method: "POST",
		headers,
		body: form as any, // Node fetch expects any for FormData
	});

	return res.status === 200;
}
