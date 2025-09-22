import { Api } from "./swagger.types.js";

const bsddApi = new Api();
export const getApi = () => {
	return bsddApi.api;
};
