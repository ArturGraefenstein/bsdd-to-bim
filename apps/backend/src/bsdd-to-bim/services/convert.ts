import { xmlBuilder } from "../utils/xml-builder.utils.js";

import { getGuidFromProperty } from "../property/utils/create-guid-from-property.utils.js";

import moment from "moment-timezone";
import { PropertyDimension } from "../property/types/property-dimension.types.js";
import { PropertyUnit } from "../property/types/property-units.types.js";
import type {
	CountryContractV1,
	DictionaryPropertiesResponseContractV1,
	LanguageContractV1,
	PropertyContractV5,
} from "@modules/bsdd-api/swagger.types.js";
import { getApi } from "../../modules/bsdd-api/api.js";
import { getStatus } from "../property/utils/get-status.utils.js";
import { getPhysicalQuantity } from "../property/utils/get-status.utils copy.js";

export const convertDictionary = async (
	propertiesOnDictionary: DictionaryPropertiesResponseContractV1,
) => {
	const properties = [];
	for (const property of propertiesOnDictionary.properties || []) {
		const propertyUri = property.uri;
		if (!propertyUri) continue;

		const propertyObj = await getApi().propertyGet({
			uri: propertyUri,
		});
		properties.push(propertyObj.data);
	}
	return convertProperties(propertiesOnDictionary, properties);
};

export const convertProperties = async (
	dictionary: DictionaryPropertiesResponseContractV1,
	properties: PropertyContractV5[],
): Promise<string> => {
	const countryResponse = await getApi().countryGet();
	const localResponse = await getApi().languageGet();

	const randomString = Math.random().toString(36).substring(2, 15);
	const myInput = {
		"?xml": {
			$version: "1.0",
			$encoding: "UTF-8",
			$standalone: "yes",
		},
		Container: {
			property: properties?.map((bsddProperty) => {
				const fallbackLanguageIsoCode =
					bsddProperty.creatorLanguageCode ??
					dictionary.defaultLanguageCode ??
					"de-DE";
				const languageIsoCode =
					fallbackLanguageIsoCode.length !== 5
						? "en-GB"
						: fallbackLanguageIsoCode;
				const countryCode =
					languageIsoCode.split("-").slice().reverse().shift() ?? "";

				const languageName =
					localResponse.data.find((e) => e.isoCode === countryCode)?.name ??
					"English";
				const countryName =
					countryResponse.data.find((c) => c.code === countryCode)?.name ??
					"United Kingdom";

				return {
					guid: getGuidFromProperty(bsddProperty, randomString),
					status: getStatus(bsddProperty.status ?? ""),
					visibility: "child",
					organisation: handleOrganization(),
					dateOfCreation: formatDate(new Date()),
					dateOfDeactivation: bsddProperty.deActivationDateUtc
						? formatDate(new Date(bsddProperty.deActivationDateUtc))
						: undefined,
					dateOfActivation: formatDate(
						new Date(bsddProperty.activationDateUtc),
					),
					dateOfRevision: formatDate(
						new Date(
							bsddProperty.revisionDateUtc ?? bsddProperty.versionDateUtc,
						),
					),
					dateOfVersion: formatDate(new Date(bsddProperty.versionDateUtc)),
					versionNumber: Math.max(bsddProperty.versionNumber ?? 1, 1),
					revisionNumber: Math.max(bsddProperty.revisionNumber ?? 1, 1),
					creatorsLanguage: {
						$name: getLanguageName(
							localResponse.data,
							bsddProperty.creatorLanguageCode ?? languageIsoCode,
							languageName,
						),
						$country: getCountryName(
							countryResponse.data,
							countryCode,
							countryName,
						),
						"#text": languageIsoCode,
					},
					namesInLanguage: {
						name: bsddProperty.name,
						language: {
							$name: languageName,
							$country: countryName,
							"#text": languageIsoCode,
						},
					},
					definitionsInLanguage: bsddProperty.definition
						? {
								definition: bsddProperty.definition,
								language: {
									$name: languageName,
									$country: countryName,
									"#text": languageIsoCode,
								},
							}
						: undefined,
					descriptionsInLanguage: bsddProperty.description
						? {
								description: bsddProperty.description,
								language: {
									$name: languageName,
									$country: countryName,
									"#text": languageIsoCode,
								},
							}
						: undefined,
					examplesInLanguage: bsddProperty.example
						? {
								example: bsddProperty.example,
								language: {
									$name: languageName,
									$country: countryName,
									"#text": languageIsoCode,
								},
							}
						: undefined,
					groupOfProperties: [
						{
							$name: "Wand",
							$versionNumber: 3,
							$revisionNumber: 1,
							"#text": "935a6e8d-af3b-4211-86b1-0ca4c08afdc1",
						},
					],
					visualRepresentation: bsddProperty.visualRepresentationUri
						? {
								pictureUrl: bsddProperty.visualRepresentationUri,
							}
						: undefined,
					countryOfUse: (bsddProperty.countriesOfUse?.length
						? bsddProperty.countriesOfUse
						: [countryCode]
					)?.map((countryOfUse) => ({
						$name: getCountryName(
							countryResponse.data,
							countryOfUse ?? countryCode,
							countryName,
						),
						"#text": countryOfUse ?? countryCode,
					})),
					countryOfOrigin: {
						$name: getCountryName(
							countryResponse.data,
							bsddProperty.countryOfOrigin ?? countryCode,
							countryName,
						),
						"#text": bsddProperty.countryOfOrigin ?? countryCode,
					},
					physicalQuantity: {
						siUnit: getPhysicalQuantity(bsddProperty),
						language: {
							$name: languageName,
							$country: countryName,
							"#text": languageIsoCode,
						},
					},
					dimension: bsddProperty.dimension ?? PropertyDimension.without,
					dataType: bsddProperty.allowedValues?.length
						? "enumerated"
						: bsddProperty.dataType,
					dynamicProperty: bsddProperty.isDynamic ? "yes" : "no",
					units: bsddProperty.units ?? PropertyUnit.unitless,
					listOfPossibleValuesInLanguage: bsddProperty.allowedValues?.length
						? bsddProperty.allowedValues.map((possibleValue) => ({
								possibleValue: possibleValue.value,
								language: {
									$name: languageName,
									$country: countryName,
									"#text": languageIsoCode,
								},
							}))
						: undefined,
				};
			}),
		},
	};
	const xml = xmlBuilder.build(myInput);
	return xml;
};

const getCountryName = (
	countries: CountryContractV1[],
	code: string,
	defaultName: string,
): string => {
	return (
		countries.find((country) => country.code === code)?.name || defaultName
	);
};

const getLanguageName = (
	languages: LanguageContractV1[],
	isoCode: string,
	defaultName: string,
): string => {
	return (
		languages.find((language) => language.isoCode === isoCode)?.name ||
		defaultName
	);
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
