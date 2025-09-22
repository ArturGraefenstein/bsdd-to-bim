import type { BSDDDictionaryMetadata } from "../types/bsdd-dictionary.types.js";
import { xmlBuilder } from "../utils/xml-builder.utils.js";

export const convert = (json: BSDDDictionaryMetadata): string => {
	const myInput = json;
	return xmlBuilder.build(myInput);
};
