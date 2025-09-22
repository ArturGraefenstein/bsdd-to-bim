import type { FormPropsBase } from "@thekeytechnology/epic-ui/form";

export type LoginFormValues = {
	email: string;
	password: string;
};

export type LoginFormProps = FormPropsBase<LoginFormValues>;
