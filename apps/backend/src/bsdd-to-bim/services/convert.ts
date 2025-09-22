import { xmlBuilder } from "../utils/xml-builder.utils.js";
import type {
	DictionaryPropertiesResponseContractV1,
	PropertyListItemContractV1,
} from "../types/swagger.types.js";
import { getGuidFromProperty } from "../property/utils/create-guid-from-property.utils.js";
import { PropertyStatus } from "../property/types/property-status.types.js";

import moment from "moment-timezone";
import { getCountryByLocale } from "../utils/locale-countries.js";
import { PropertyQuantity } from "../property/types/quantity.types.js";
import { PropertyDimension } from "../property/types/property-dimension.types.js";
import { PropertyDataType } from "../property/types/property-data-type.types.js";
import { PropertyUnit } from "../property/types/property-units.types.js";

export const convert = (
	propertiesOnDictionary: DictionaryPropertiesResponseContractV1,
): string => {
	const country = getCountryByLocale(
		propertiesOnDictionary.defaultLanguageCode,
	);

	const myInput = propertiesOnDictionary?.properties?.map((bsddProperty) => {
		return {
			"?xml": {
				$version: 1.0,
				$encoding: "UTF-8",
				$standalone: "yes",
			},
			Container: {
				property: {
					guid: getGuidFromProperty(bsddProperty),
					status: PropertyStatus.active,
					visibility: "child",
					organisation: handleOrganization(
						propertiesOnDictionary,
						bsddProperty,
					),
					dateOfCreation: formatDate(new Date()),
					dateOfActivation: undefined, // TODO
					dateOfRevision: undefined, // TODO
					dateOfVersion: formatDate(new Date()),
					versionNumber: 1,
					revisionNumber: 1,
					creatorsLanguage: {
						$name: country.native_name, // TODO
						$country: country.native_name,
						"#text": propertiesOnDictionary.defaultLanguageCode,
					},
					namesInLanguage: {
						name: bsddProperty.name,
						language: {
							$name: country.native_name, // TODO
							$country: country.native_name,
							"#text": propertiesOnDictionary.defaultLanguageCode,
						},
					},
					definitionsInLanguage: {
						definition: bsddProperty.name,
						language: {
							$name: country.native_name, // TODO
							$country: country.native_name,
							"#text": propertiesOnDictionary.defaultLanguageCode,
						},
					},
					descriptionsInLanguage: {
						description: bsddProperty.descriptionPart,
						language: {
							$name: country.native_name, // TODO
							$country: country.native_name,
							"#text": propertiesOnDictionary.defaultLanguageCode,
						},
					},
					examplesInLanguage: undefined,
					groupOfProperties: undefined,
					countryOfUse: {
						$name: country.native_name, // TODO
						"#text": propertiesOnDictionary.defaultLanguageCode,
					},
					countryOfOrigin: {
						$name: country.native_name, // TODO
						"#text": propertiesOnDictionary.defaultLanguageCode,
					},
					physicalQuantity: {
						siUnit: PropertyQuantity.ohne,
						language: {
							$name: country.native_name, // TODO
							$country: country.native_name,
							"#text": propertiesOnDictionary.defaultLanguageCode,
						},
					},
					dimension: PropertyDimension.without,
					dataType: PropertyDataType["Aufzählung"],
					dynamicProperty: "no",
					units: PropertyUnit.unitless,
					listOfPossibleValuesInLanguage: [],
				},
			},
		};
	});
	return xmlBuilder.build(myInput);
};

const handleOrganization = (
	propertiesOnDictionary: DictionaryPropertiesResponseContractV1,
	bsddProperty: PropertyListItemContractV1,
) => {
	return {};
};

const formatDate = (date: Date): string => {
	return moment(date).tz(moment.tz.guess()).format("YYYY-MM-DDTHH:mm:ssZ");
};
