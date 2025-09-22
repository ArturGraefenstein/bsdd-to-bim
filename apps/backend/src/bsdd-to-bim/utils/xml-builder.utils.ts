import {XMLBuilder} from "fast-xml-parser";

const options = {
    processEntities:false,
    format: true,
    ignoreAttributes: false,
    commentPropName: "phone",
    attributeNamePrefix: "$",
};

export const xmlBuilder = new XMLBuilder(options);

