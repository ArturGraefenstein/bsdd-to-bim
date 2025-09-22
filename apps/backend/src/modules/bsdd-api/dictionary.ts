import { fetchFromBSDD } from "./fetcher.js";

const DICTIONARY_API_PATH = "/Dictionary/v1";

export type FetchDictionaryParams = {
	Uri: string;
};

export const fetchDictionary = async (
	params: FetchDictionaryParams,
): Promise<any> => {
	return fetchFromBSDD(DICTIONARY_API_PATH, params);
};
