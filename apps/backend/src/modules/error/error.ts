import { GraphQLError } from "graphql";
import type { GLOBAL_ERRORS } from "@package/shared/error/index.js";

export const createError = (message: string, code: GLOBAL_ERRORS) => {
	return new GraphQLError(message, {
		extensions: {
			code,
		},
	});
};
