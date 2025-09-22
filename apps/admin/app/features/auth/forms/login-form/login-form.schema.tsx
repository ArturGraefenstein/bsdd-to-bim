import z from "zod";

import { type FormSchema } from "@package/shared/types";

import type { LoginFormValues } from "./login-form.types";

export const LoginFormSchema: FormSchema<LoginFormValues> = z.object({
	email: z.email(),
	password: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein. "),
});
