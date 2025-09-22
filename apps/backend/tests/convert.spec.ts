import { assert, describe, expect, it } from "vitest";
import { convert } from "../src/bsdd-to-bim/services/convert";
import * as fs from "node:fs";

describe("convert", () => {
	it("foo", async () => {
		const returned = await convert(response);
		// console.log(returned[3]);

		try {
			await fs.writeFile(
				"./upload.xml",
				returned[3]!,
				{
					encoding: "utf8",
				},
				(err) => {
					console.log(err);
				},
			);
		} catch (err) {
			throw new Error(
				`Failed to write XML file to ${"x"}: ${(err as Error).message}`,
			);
		}
	});
});

const response = {
	properties: [
		{
			uri: "https://identifier.buildingsmart.org/uri/bs-agri/fruitvegs/1.6/prop/color",
			code: "color",
			name: "Color",
			descriptionPart:
				"The property possessed by an object of producing different sensations on the eye as a result of the w",
		},
		{
			uri: "https://identifier.buildingsmart.org/uri/bs-agri/fruitvegs/1.6/prop/country-of-origin",
			code: "country-of-origin",
			name: "Country of origin",
			descriptionPart: "Production location",
		},
		{
			uri: "https://identifier.buildingsmart.org/uri/bs-agri/fruitvegs/1.6/prop/height",
			code: "height",
			name: "Height",
			descriptionPart:
				"Distance from bottom to top of something standing upright",
		},
		{
			uri: "https://identifier.buildingsmart.org/uri/bs-agri/fruitvegs/1.6/prop/volume",
			code: "volume",
			name: "Volume",
			descriptionPart:
				"Volume is a scalar quantity expressing the amount of three-dimensional space enclosed by a closed sur",
		},
	],
	propertiesTotalCount: 4,
	propertiesOffset: 0,
	propertiesCount: 4,
	code: "fruitvegs",
	uri: "https://identifier.buildingsmart.org/uri/bs-agri/fruitvegs/1.6",
	name: "Fruit and vegetables",
	version: "1.6",
	organizationCodeOwner: "bs-agri",
	organizationNameOwner: "bSDD Agri demo company",
	defaultLanguageCode: "en-US",
	isLatestVersion: false,
	isVerified: false,
	isPrivate: false,
	license: "No license",
	licenseUrl: "https://technical.buildingsmart.org/services/bsdd/license/",
	qualityAssuranceProcedure: "Use at own risk - this is for demo purposes only",
	status: "Active",
	releaseDate: "2022-12-26T00:00:00Z",
	lastUpdatedUtc: "2025-05-20T19:00:50Z",
};
