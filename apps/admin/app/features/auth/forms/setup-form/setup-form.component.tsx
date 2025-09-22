import { useForm } from "@thekeytechnology/epic-ui/form";
import { type FC } from "react";

import { Stack } from "@package/design-system";
import { Form, SubmitButton, TextInputField } from "@forms/index";

import { SetupFormSchema } from "./setup-form.schema";
import type { SetupFormProps, SetupFormValues } from "./setup-form.types";

export const SetupForm: FC<SetupFormProps> = ({ onSubmit }) => {
	const form = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		} as SetupFormValues,
		onSubmit: (values) => onSubmit(values.value),
		validators: {
			onSubmit: SetupFormSchema,
		},
	});

	return (
		<Form form={form}>
			<Stack gap="8">
				<form.Field name="firstName">
					{(field) => <TextInputField field={field} label="Vorname" />}
				</form.Field>
				<form.Field name="lastName">
					{(field) => <TextInputField field={field} label="Nachname" />}
				</form.Field>
				<form.Field name="email">
					{(field) => <TextInputField field={field} label="Email" />}
				</form.Field>
				<form.Field name="password">
					{(field) => (
						<TextInputField field={field} label="Passwort" type="password" />
					)}
				</form.Field>
				<form.Field name="passwordConfirmation">
					{(field) => (
						<TextInputField
							field={field}
							label="Passwort bestätigen"
							type="password"
						/>
					)}
				</form.Field>
				<SubmitButton form={form} label="Einrichten" />
			</Stack>
		</Form>
	);
};
