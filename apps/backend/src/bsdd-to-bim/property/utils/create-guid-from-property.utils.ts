import { deterministicUUID } from "../../utils/determinisitc-id.utils.js";
import type { PropertyListItemContractV1 } from "@modules/bsdd-api/swagger.types.js";

export const getGuidFromProperty = (
	data: PropertyListItemContractV1,
	salt: string,
): string => {
	if (!data.code) throw new Error("Invalid code");
	return deterministicUUID(data.code, salt);
};
