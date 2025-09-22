import { retryMiddleware } from "react-relay-network-modern";

export const RetryMiddleware = retryMiddleware({
	fetchTimeout: 15000,
	retryDelays: (attempt) => 2 ** (attempt + 4) * 100,
	beforeRetry: ({ abort, attempt }) => {
		if (attempt > 3) abort();
	},
	statusCodes: [500, 503, 504],
});
