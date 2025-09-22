import { redirect } from "react-router";

import { DashboardScreen } from "~/screens/dashboard";
import { isLoggedIn } from "~/utils/auth";

export function clientLoader() {
	if (!isLoggedIn()) {
		return redirect("/login");
	}
	return null;
}

export default function Dashboard() {
	return <DashboardScreen />;
}
