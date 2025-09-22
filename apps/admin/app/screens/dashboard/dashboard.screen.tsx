import { useLazyLoadQuery } from "react-relay";

import { DashboardLayout } from "@package/design-system";
import type { dashboard_Query } from "@relay/dashboard_Query.graphql";

import { QUERY } from "./dashboard.graphql";

export const DashboardScreen = () => {
	const query = useLazyLoadQuery<dashboard_Query>(QUERY, {});
	return (
		<DashboardLayout>
			<div>
				<h1>Dashboard</h1>
				<p>
					Welcome {query.me.firstName} {query.me.lastName} to the dashboard!
				</p>
			</div>
		</DashboardLayout>
	);
};
