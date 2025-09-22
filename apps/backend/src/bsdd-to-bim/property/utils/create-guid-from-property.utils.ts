import type {PropertyListItemContractV1} from "../../types/swagger.types.js";
import { deterministicUUID } from "../../utils/determinisitc-id.utils.js";

export const getGuidFromProperty = (data: PropertyListItemContractV1): string => {
    if(!data.code) throw new Error("Invalid code")
    return deterministicUUID(data.code)
}