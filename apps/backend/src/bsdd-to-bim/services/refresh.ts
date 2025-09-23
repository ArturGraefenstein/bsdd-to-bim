type RefreshTokenOptions = {
	refreshToken: string;
	// cookie?: string;
};

export async function refresh(
	opts: RefreshTokenOptions,
): Promise<{ token: string }> {
	const { refreshToken } = opts;

	const url =
		"https://via.bund.de/bmdv/bim-portal/edu/bim/infrastruktur/api/v1/user/refresh-token";
	const referer = "https://via.bund.de/bmdv/bim-portal/edu/bim/merkmale/import";
	const orgaId = "445a9244-4107-493b-8afc-6b0215b2a602";

	const headers: Record<string, string> = {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
		...(orgaId ? { "orga-id": orgaId } : {}),
		...(referer ? { Referer: referer } : {}),
		// ...(cookie ? { Cookie: cookie } : {}),
	};

	const body = JSON.stringify({
		refreshToken,
	});

	const res = await fetch(url, {
		method: "POST",
		headers,
		body,
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(
			`Token refresh failed: ${res.status} ${res.statusText} - ${text}`,
		);
	}

	return res.json(); // returns the new token or session info
}

export async function refreshToken2({
	refreshToken,
}: {
	refreshToken: string;
}): Promise<{ token: string; refreshToken: string }> {
	const url =
		"https://via.bund.de/bmdv/bim-portal/edu/bim/infrastruktur/api/v1/user/refresh-token";

	const body = {
		refreshToken: refreshToken,
	};
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (err) {
		console.error("Error refreshing token:", err);
		return { token: "", refreshToken: "" };
	}
}
