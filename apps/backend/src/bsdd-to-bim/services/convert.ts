import { xmlBuilder } from "../utils/xml-builder.utils.js";

import { getGuidFromProperty } from "../property/utils/create-guid-from-property.utils.js";

import moment from "moment-timezone";
import { PropertyDimension } from "../property/types/property-dimension.types.js";
import { PropertyUnit } from "../property/types/property-units.types.js";
import type {
	ClassContractV1,
	CountryContractV1,
	DictionaryPropertiesResponseContractV1,
	LanguageContractV1,
	PropertyContractV5,
} from "@modules/bsdd-api/swagger.types.js";
import { getApi } from "../../modules/bsdd-api/api.js";
import { getStatus } from "../property/utils/get-status.utils.js";
import { getPhysicalQuantity } from "../property/utils/get-status.utils copy.js";

export const convertDictionary = async (uri: string) => {
	const dictionary = await getApi().dictionaryGetWithProperties({ Uri: uri });
	const classes = await getApi().dictionaryClassesGetWithClasses({ Uri: uri });
	const allClassesWithDetailsPromise = Promise.allSettled(
		classes.data.classes?.map((cls) =>
			getApi().classGet({
				Uri: cls.uri ?? "",
				IncludeClassRelations: true,
				IncludeChildClassReferences: true,
				IncludeClassProperties: true,
				IncludeReverseRelations: true,
			}),
		) ?? [],
	);
	const allClassesWithDetails = await allClassesWithDetailsPromise.then(
		(results) =>
			results
				.map((res) => (res.status === "fulfilled" ? res.value.data : undefined))
				.filter(Boolean) as ClassContractV1[],
	);

	const materials = allClassesWithDetails.filter(
		(c) => c.classType === "Material",
	);
	const groupOfClases = allClassesWithDetails.filter(
		(c) => c.classType === "GroupOfProperties",
	);
	const cleanClasses = allClassesWithDetails.filter(
		(c) => c.classType === "Class",
	);

	const countries = await getApi().countryGet();
	const languages = await getApi().languageGet();

	const salt = Math.random().toString(36).substring(2, 15);

	const properties = [];
	for (const property of dictionary.data.properties || []) {
		const propertyUri = property.uri;
		if (!propertyUri) continue;

		const propertyObj = await getApi().propertyGet({
			uri: propertyUri,
		});
		properties.push(propertyObj.data);
	}
	const propertiesInput = convertProperties(
		dictionary.data,
		allClassesWithDetails,
		properties,
		salt,
		countries.data,
		languages.data,
	);
	const groupOfPropertiesInput = convertPropertyGroup(
		dictionary.data,
		cleanClasses || [],
		properties,
		salt,
		countries.data,
		languages.data,
	);
	const xml = await generateXMLWithInputContainer({
		propertyGroup: groupOfPropertiesInput.filter(Boolean),
		property: propertiesInput,
	});
	return xml;
};

export const generateXMLWithInputContainer = async (
	container: Record<string, unknown>,
): Promise<string> => {
	const myInput = {
		"?xml": {
			$version: "1.0",
			$encoding: "UTF-8",
			$standalone: "yes",
		},
		Container: container,
	};
	const xml = xmlBuilder.build(myInput);
	return xml;
};

export const convertPropertyGroup = (
	dictionary: DictionaryPropertiesResponseContractV1,
	classes: ClassContractV1[],
	properties: PropertyContractV5[],
	salt: string,
	countries: CountryContractV1[],
	languages: LanguageContractV1[],
): Record<string, unknown>[] => {
	return classes?.map((classDetails) => {
		const fallbackLanguageIsoCode =
			classDetails.creatorLanguageCode ??
			dictionary.defaultLanguageCode ??
			"de-DE";
		const languageIsoCode =
			fallbackLanguageIsoCode.length !== 5 ? "en-GB" : fallbackLanguageIsoCode;
		const countryCode =
			languageIsoCode.split("-").slice().reverse().shift() ?? "";

		const languageName =
			languages.find((e) => e.isoCode === countryCode)?.name ?? "English";
		const countryName =
			countries.find((c) => c.code === countryCode)?.name ?? "United Kingdom";

		return {
			guid: getGuidFromProperty(classDetails, salt),
			status: getStatus(classDetails.status ?? ""),
			visibility: "child",
			organisation: handleOrganization(),
			dateOfCreation: formatDate(new Date()),
			dateOfDeactivation: classDetails.deActivationDateUtc
				? formatDate(new Date(classDetails.deActivationDateUtc))
				: undefined,
			dateOfActivation: formatDate(new Date(classDetails.activationDateUtc)),
			dateOfRevision: formatDate(
				new Date(classDetails.revisionDateUtc ?? classDetails.versionDateUtc),
			),
			dateOfVersion: formatDate(new Date(classDetails.versionDateUtc)),
			versionNumber: Math.max(classDetails.versionNumber ?? 1, 1),
			revisionNumber: Math.max(classDetails.revisionNumber ?? 1, 1),
			creatorsLanguage: {
				$name: getLanguageName(
					languages,
					classDetails.creatorLanguageCode ?? languageIsoCode,
					languageName,
				),
				$country: getCountryName(countries, countryCode, countryName),
				"#text": languageIsoCode,
			},
			namesInLanguage: {
				name: classDetails.name,
				language: {
					$name: languageName,
					$country: countryName,
					"#text": languageIsoCode,
				},
			},
			definitionsInLanguage: classDetails.definition
				? {
						definition: classDetails.definition,
						language: {
							$name: languageName,
							$country: countryName,
							"#text": languageIsoCode,
						},
					}
				: undefined,
			visualRepresentation: classDetails.visualRepresentationUri
				? {
						pictureUrl: classDetails.visualRepresentationUri,
					}
				: undefined,
			countryOfUse: (classDetails.countriesOfUse?.length
				? classDetails.countriesOfUse
				: [countryCode]
			)?.map((countryOfUse) => ({
				$name: getCountryName(
					countries,
					countryOfUse ?? countryCode,
					countryName,
				),
				"#text": countryOfUse ?? countryCode,
			})),
			countryOfOrigin: {
				$name: getCountryName(
					countries,
					classDetails.countryOfOrigin ?? countryCode,
					countryName,
				),
				"#text": classDetails.countryOfOrigin ?? countryCode,
			},
			categoryOfGroupOfProperties: {
				"#text":
					classDetails.classType === "Class" ? "class" : "alternative use",
			},
			properties: classDetails.classProperties
				?.map((classProperty) => {
					const propertyDetails = properties.find(
						(p) => p.uri === classProperty.propertyUri,
					);
					return propertyDetails
						? {
								$name: propertyDetails?.name,
								$versionNumber: Math.max(propertyDetails.versionNumber ?? 1, 1),
								$revisionNumber: Math.max(
									propertyDetails.revisionNumber ?? 1,
									1,
								),
								"#text": getGuidFromProperty(propertyDetails, salt),
							}
						: undefined;
				})
				.filter(Boolean),
		};
	});
};

export const convertProperties = (
	dictionary: DictionaryPropertiesResponseContractV1,
	classes: ClassContractV1[],
	properties: PropertyContractV5[],
	salt: string,
	countries: CountryContractV1[],
	languages: LanguageContractV1[],
): Record<string, unknown>[] => {
	return properties?.map((bsddProperty) => {
		const fallbackLanguageIsoCode =
			bsddProperty.creatorLanguageCode ??
			dictionary.defaultLanguageCode ??
			"de-DE";
		const languageIsoCode =
			fallbackLanguageIsoCode.length !== 5 ? "en-GB" : fallbackLanguageIsoCode;
		const countryCode =
			languageIsoCode.split("-").slice().reverse().shift() ?? "";

		const languageName =
			languages.find((e) => e.isoCode === countryCode)?.name ?? "English";
		const countryName =
			countries.find((c) => c.code === countryCode)?.name ?? "United Kingdom";

		const groups = classes
			.filter((cls) => cls.classType === "Class")
			.filter((cls) =>
				cls.classProperties?.some(
					(prop) => prop.propertyUri === bsddProperty.uri,
				),
			);

		const groupOfPropertiesInput = groups.map((group) => ({
			$name: group.name,
			$versionNumber: Math.max(group.versionNumber ?? 1, 1),
			$revisionNumber: Math.max(group.revisionNumber ?? 1, 1),
			"#text": getGuidFromProperty(group, salt),
		}));

		return {
			guid: getGuidFromProperty(bsddProperty, salt),
			status: getStatus(bsddProperty.status ?? ""),
			visibility: "child",
			organisation: handleOrganization(),
			dateOfCreation: formatDate(new Date()),
			dateOfDeactivation: bsddProperty.deActivationDateUtc
				? formatDate(new Date(bsddProperty.deActivationDateUtc))
				: undefined,
			dateOfActivation: formatDate(new Date(bsddProperty.activationDateUtc)),
			dateOfRevision: formatDate(
				new Date(bsddProperty.revisionDateUtc ?? bsddProperty.versionDateUtc),
			),
			dateOfVersion: formatDate(new Date(bsddProperty.versionDateUtc)),
			versionNumber: Math.max(bsddProperty.versionNumber ?? 1, 1),
			revisionNumber: Math.max(bsddProperty.revisionNumber ?? 1, 1),
			creatorsLanguage: {
				$name: getLanguageName(
					languages,
					bsddProperty.creatorLanguageCode ?? languageIsoCode,
					languageName,
				),
				$country: getCountryName(countries, countryCode, countryName),
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
			groupOfProperties: groupOfPropertiesInput,
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
					countries,
					countryOfUse ?? countryCode,
					countryName,
				),
				"#text": countryOfUse ?? countryCode,
			})),
			countryOfOrigin: {
				$name: getCountryName(
					countries,
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
			dimension: bsddProperty.dimension?.length
				? bsddProperty.dimension
				: PropertyDimension.without,
			dataType: bsddProperty.allowedValues?.length
				? "enumerated"
				: bsddProperty.dataType,
			dynamicProperty: bsddProperty.isDynamic ? "yes" : "no",
			units: bsddProperty.units?.length
				? bsddProperty.units
				: PropertyUnit.unitless,
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
	});
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
