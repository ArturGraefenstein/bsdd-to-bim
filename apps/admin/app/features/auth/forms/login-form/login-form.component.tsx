import { useForm } from "@thekeytechnology/epic-ui/form";
import { type FC } from "react";

import { Stack } from "@package/design-system";
import { Form, SubmitButton, TextInputField } from "@forms/index";

import { LoginFormSchema } from "./login-form.schema";
import type { LoginFormProps, LoginFormValues } from "./login-form.types";

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		} as LoginFormValues,
		onSubmit: (values) => onSubmit(values.value),
		validators: {
			onSubmit: LoginFormSchema,
		},
	});

	return (
		<Form form={form}>
			<Stack gap="8">
				<form.Field name="email">
					{(field) => <TextInputField field={field} label="Email" />}
				</form.Field>
				<form.Field name="password">
					{(field) => (
						<TextInputField field={field} label="Passwort" type="password" />
					)}
				</form.Field>
				<SubmitButton form={form} label="Login" />
			</Stack>
		</Form>
	);
};
