const API_BASE_URL = "https://api.bsdd.buildingsmart.org/api";

export const fetchFromBSDD = async (
	path: string,
	params: Record<string, string>,
): Promise<any> => {
	const url = new URL(`${API_BASE_URL}/${path}`);
	Object.keys(params).forEach((key) =>
		url.searchParams.append(key, params[key]!),
	);
	return fetch(url);
};
