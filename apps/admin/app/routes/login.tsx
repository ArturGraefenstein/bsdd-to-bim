import { redirect } from "react-router";

import { LoginScreen } from "~/screens/login";
import { isLoggedIn } from "~/utils/auth";

export function clientLoader() {
	if (isLoggedIn()) {
		return redirect("/dashboard");
	}
	return null;
}

export default function Login() {
	return <LoginScreen />;
}
