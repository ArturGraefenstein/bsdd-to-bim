import { redirect } from "react-router";

import { isLoggedIn } from "~/utils/auth";

export function meta() {
	return [
		{ title: "Reckers Fluid Service App" },
		{ name: "description", content: "Welcome to Reckers Fluid Service App!" },
	];
}

export function clientLoader() {
	if (isLoggedIn()) {
		return redirect("/dashboard");
	}
	return redirect("/login");
}

export default function Home() {
	return null;
}
