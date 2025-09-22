import { xmlBuilder } from "../utils/xml-builder.utils.js";

import { getGuidFromProperty } from "../property/utils/create-guid-from-property.utils.js";
import { PropertyStatus } from "../property/types/property-status.types.js";

import moment from "moment-timezone";
import { PropertyQuantity } from "../property/types/quantity.types.js";
import { PropertyDimension } from "../property/types/property-dimension.types.js";
import { PropertyDataType } from "../property/types/property-data-type.types.js";
import { PropertyUnit } from "../property/types/property-units.types.js";
import type { DictionaryPropertiesResponseContractV1 } from "@modules/bsdd-api/swagger.types.js";
import { getApi } from "../../modules/bsdd-api/api.js";

export const convert = async (
	propertiesOnDictionary: DictionaryPropertiesResponseContractV1,
): Promise<string[]> => {
	const countryResponse = await getApi().countryGet();
	const localResponse = await getApi().languageGet();

	const locale = propertiesOnDictionary.defaultLanguageCode ?? "de-DE";
	const countryCode = locale.split("-").slice().reverse().shift() ?? "";
	const countryName =
		countryResponse.data.find((e) => e.code === countryCode)?.name ?? "US";

	const language = localResponse.data.find((e) => e.isoCode === locale)?.name;

	const myInput = propertiesOnDictionary?.properties?.map((bsddProperty) => {
		return {
			"?xml": {
				$version: "1.0",
				$encoding: "UTF-8",
				$standalone: "yes",
			},
			Container: {
				property: {
					guid: getGuidFromProperty(bsddProperty),
					status: PropertyStatus.active,
					visibility: "child",
					organisation: handleOrganization(),
					dateOfCreation: formatDate(new Date()),
					dateOfActivation: formatDate(new Date()),
					dateOfRevision: formatDate(new Date()),
					dateOfVersion: formatDate(new Date()),
					versionNumber: 1,
					revisionNumber: 1,
					creatorsLanguage: {
						$name: language,
						$country: countryName,
						"#text": locale,
					},
					namesInLanguage: {
						name: bsddProperty.name,
						language: {
							$name: language,
							$country: countryName,
							"#text": locale,
						},
					},
					definitionsInLanguage: {
						definition: bsddProperty.name,
						language: {
							$name: language,
							$country: countryName,
							"#text": locale,
						},
					},
					descriptionsInLanguage: {
						description: bsddProperty.descriptionPart,
						language: {
							$name: language,
							$country: countryName,
							"#text": locale,
						},
					},
					groupOfProperties: [
						{
							$name: "Wand",
							$versionNumber: 3,
							$revisionNumber: 1,
							"#text": "935a6e8d-af3b-4211-86b1-0ca4c08afdc1",
						},
					], // TODO: unknown
					countryOfUse: {
						$name: countryName,
						"#text": countryCode,
					},
					countryOfOrigin: {
						$name: countryName,
						"#text": countryCode,
					},
					physicalQuantity: {
						siUnit: PropertyQuantity.ohne,
						language: {
							$name: language, // TODO
							$country: countryName,
							"#text": propertiesOnDictionary.defaultLanguageCode,
						},
					},
					dimension: PropertyDimension.without,
					dataType: PropertyDataType["Aufzählung"],
					dynamicProperty: "no",
					units: PropertyUnit.unitless,
					listOfPossibleValuesInLanguage: [
						{
							possibleValue: "Laubholz",
							language: {
								$name: language,
								$country: countryName,
								"#text": locale,
							},
						},
					],
					// dateOfLastChanged: formatDate(new Date()),
				},
			},
		};
	});
	return myInput?.map((e) => xmlBuilder.build(e)) ?? [];
};

const handleOrganization = () => {
	return {
		$name: "BSDD Import",
		"#text": "445a9244-4107-493b-8afc-6b0215b2a602",
	};
};

const formatDate = (date: Date): string => {
	return moment(date).tz(moment.tz.guess()).format("YYYY-MM-DDTHH:mm:ssZ");
};
