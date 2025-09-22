// eslint-disable-next-line no-undef
module.exports = {
	schema: "packages/graphql/schema.graphql",
	language: "typescript",
	customScalarTypes: {
		ZonedDateTIme: "string",
		BigDecimal: "number",
		DayOfWeek: "string",
		LocalTime: "string",
		LocalDate: "string",
	},
	noFutureProofEnums: true,
	eagerEsModules: true,
};
