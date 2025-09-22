import type { GLOBAL_ERRORS } from "@package/shared/error";

export class AuthError extends Error {
	public code: GLOBAL_ERRORS;

	constructor(message: string, code: GLOBAL_ERRORS) {
		super(message);
		this.name = "AuthError";
		this.code = code;
	}
}
