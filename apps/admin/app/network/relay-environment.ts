import {
	errorMiddleware,
	loggerMiddleware,
	perfMiddleware,
	RelayNetworkLayer,
	uploadMiddleware,
	urlMiddleware,
} from "react-relay-network-modern";
import { RecordSource, Store } from "relay-runtime";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";

import { disablePersistedQueriesMiddleware } from "./disable-persisted-queries-middleware";
import {
	createErrorMiddleware,
	type ErrorCallback,
	type OnLogoutCallback,
} from "./error-middleware";
import { JwtMiddleware } from "./jwt-middleware";
import { RetryMiddleware } from "./retry-middleware";
import { WSSubscription } from "./ws-subscription";

const RelayStore = new Store(new RecordSource());

const isDev = import.meta.env.ENVIRONMENT === "development";
const enableLogs = isDev;

const createRelayNetworkLayer = (
	onError: ErrorCallback,
	onLogout: OnLogoutCallback,
) =>
	new RelayNetworkLayer(
		[
			urlMiddleware({
				url: () => Promise.resolve(`${import.meta.env.VITE_API_BASE}/graphql`),
			}),
			disablePersistedQueriesMiddleware,
			enableLogs ? loggerMiddleware() : null,
			enableLogs ? errorMiddleware() : null,
			enableLogs ? perfMiddleware() : null,
			createErrorMiddleware(onError, onLogout),
			JwtMiddleware,
			RetryMiddleware,
			uploadMiddleware(),
		],
		{
			subscribeFn: WSSubscription,
		},
	);

export const createRelayEnvironment = (
	onError: ErrorCallback,
	onLogout: OnLogoutCallback,
) =>
	new RelayModernEnvironment({
		network: createRelayNetworkLayer(onError, onLogout),
		store: RelayStore,
	});
