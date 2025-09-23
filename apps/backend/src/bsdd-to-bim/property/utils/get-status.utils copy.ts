import type { PropertyContractV5 } from "@modules/bsdd-api/swagger.types.js";
import { PropertyQuantity } from "../types/quantity.types.js";

export const getPhysicalQuantity = (property: PropertyContractV5): string => {
	return property.physicalQuantity ?? PropertyQuantity.ohne;
};
