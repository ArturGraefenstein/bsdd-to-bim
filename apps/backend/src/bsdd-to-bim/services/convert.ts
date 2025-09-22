import type {BSDDDictionaryMetadata} from "../types/bsdd-dictionary.types.js";
import { xmlBuilder } from "../utils/xml-builder.utils.js";
import type {DictionaryPropertiesResponseContractV1} from "../types/swagger.types.js";

export const convert = (propertiesOnDictionary: DictionaryPropertiesResponseContractV1): string => {
	const myInput = propertiesOnDictionary?.properties?.map(bsddProperty => {
		return {
			[bsddProperty.name!]: {
				"code": bsddProperty.code,
			}
		}
	})
	return xmlBuilder.build(myInput);
};

/**
<PropertyName>
	<code>propery-code</code>
	</PropertyName>

 */
