import type {
	MiddlewareNextFn,
	RelayNetworkLayerRequest,
	RelayRequestAny,
} from "react-relay-network-modern";

export type ErrorCallback = (errorCode: string) => void;
export type OnLogoutCallback = () => void;

export const disablePersistedQueriesMiddleware =
	(next: MiddlewareNextFn) => async (req: RelayRequestAny) => {
		if (!isRelayRequest(req)) {
			return next(req);
		}
		const { operation, variables } = req;
		const text = operation.text;
		if (!text) {
			// Falls Artefakt kein text enthält (weil build persisted war), geben wir
			// eine hilfreiche Fehlermeldung zurück statt id zu senden.
			throw new Error(
				`Relay operation "${operation.name}" enthält kein 'text'. ` +
					`Deaktiviere Persisted Queries im Build oder generiere Artefakte ohne Persist.`,
			);
		}

		// Setze den Body explizit – ohne 'id'
		req.fetchOpts = {
			...req.fetchOpts,
			body: JSON.stringify({
				query: text,
				variables,
				operationName: operation.name,
			}),
		};

		return next(req);
	};

function isRelayRequest(
	request: RelayRequestAny,
): request is RelayNetworkLayerRequest {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return (request as RelayNetworkLayerRequest).id !== undefined;
}
