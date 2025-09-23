import { redirect } from "react-router";

import { ConverterScreen } from "~/screens/converter/index.js";
import { isLoggedIn } from "~/utils/auth.js";

export function clientLoader() {
	if (!isLoggedIn()) {
		return redirect("/login");
	}
	return null;
}

export default function Converter() {
	return <ConverterScreen />;
}
