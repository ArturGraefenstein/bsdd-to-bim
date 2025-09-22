import type { GraphQLError } from "graphql/error";
import { createClient, TerminatedCloseEvent } from "graphql-ws";
import { type SubscribeFunction } from "react-relay-network-modern";
import { Observable } from "relay-runtime";

import { decodeAccessToken } from "~/features/auth/utils";
import { useAuthStore } from "~/store";

export const WSSubscription: SubscribeFunction = (operation, variables) =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	Observable.create((sink) => {
		if (!operation.text) {
			sink.error(new Error("Operation text cannot be empty"));
			return;
		}

		const loginData = useAuthStore.getState().jwtTokenData;
		const accountId = decodeAccessToken(loginData?.accessToken)?.accountId;

		const subscriptionClient = createClient({
			url: `${import.meta.env.VITE_WS_API_BASE}/graphql/ws?token=${loginData?.accessToken ?? ""}&accountId=${accountId ?? ""}`,
			retryAttempts: 3,
			keepAlive: 10000,
			lazy: true,
		});

		return subscriptionClient.subscribe(
			{
				operationName: operation.name,
				query: operation.text,
				variables,
			},
			{
				...sink,
				error: (err: GraphQLError[] | GraphQLError | TerminatedCloseEvent) => {
					if (Array.isArray(err)) {
						sink.error(new Error(err.map(({ message }) => message).join(", ")));
						return;
					}

					if (err instanceof TerminatedCloseEvent) {
						sink.error(
							new Error(
								`Socket closed with event ${err.code.toString()} ${err.reason || ""}`,
							),
						);
						return;
					}
					sink.error(err);
				},
			},
		);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}) as any;
