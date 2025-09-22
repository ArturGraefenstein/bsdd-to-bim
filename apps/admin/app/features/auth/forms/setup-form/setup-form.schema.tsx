import z from "zod";

import { type FormSchema } from "@package/shared/types";

import type { SetupFormValues } from "./setup-form.types";

export const SetupFormSchema: FormSchema<SetupFormValues> = z
	.object({
		firstName: z.string().min(2, "Vorname muss mindestens 2 Zeichen lang sein"),
		lastName: z.string().min(2, "Nachname muss mindestens 2 Zeichen lang sein"),
		email: z.email("Ungültige Email Adresse"),
		password: z
			.string()
			.min(8, "Passwort muss mindestens 8 Zeichen lang sein. "),
		passwordConfirmation: z
			.string()
			.min(8, "Passwort muss mindestens 8 Zeichen lang sein. "),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwörter stimmen nicht überein",
		path: ["passwordConfirmation"],
	});
