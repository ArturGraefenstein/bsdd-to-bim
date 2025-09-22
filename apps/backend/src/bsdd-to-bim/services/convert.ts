import { xmlBuilder } from "../utils/xml-builder.utils.js";
import type {
	DictionaryPropertiesResponseContractV1,
	PropertyListItemContractV1,
} from "../types/swagger.types.js";
import { getGuidFromProperty } from "../property/utils/create-guid-from-property.utils.js";
import { PropertyStatus } from "../property/types/property-status.types.js";
import { DateFormatter } from "concurrently/dist/src/date-format.js";
import { DateTimeFormatter, LocalDate } from "@js-joda/core";
import moment from "moment-timezone";

export const convert = (
	propertiesOnDictionary: DictionaryPropertiesResponseContractV1,
): string => {
	const myInput = propertiesOnDictionary?.properties?.map((bsddProperty) => {
		return {
			Container: {
				property: {
					guid: getGuidFromProperty(bsddProperty),
					status: PropertyStatus.active,
					visibility: "child",
					organisation: handleOrganization(
						propertiesOnDictionary,
						bsddProperty,
					),
					dateOfCreation: formatDate(Date.now()),
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
