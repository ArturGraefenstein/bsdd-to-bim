import type {BSDDDictionaryMetadata} from "../types/bsdd-dictionary.types.js";
import { xmlBuilder } from "../utils/xml-builder.utils.js";

export const convert = (json: BSDDDictionaryMetadata): string => {
	const myInput = json.Properties?.map(bsddProperty => {
		return {
			[bsddProperty.Name]: {
				"code": bsddProperty.Code,
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
