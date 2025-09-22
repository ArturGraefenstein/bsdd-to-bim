import { Api } from "../../bsdd-to-bim/types/swagger.types.js";

const bsddApi = new Api();
export const getApi = () => {
	return bsddApi.api;
};
