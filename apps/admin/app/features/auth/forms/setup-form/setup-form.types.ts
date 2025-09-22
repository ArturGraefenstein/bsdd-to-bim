import type { FormPropsBase } from "@thekeytechnology/epic-ui/form";

export type SetupFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
};

export type SetupFormProps = FormPropsBase<SetupFormValues>;
