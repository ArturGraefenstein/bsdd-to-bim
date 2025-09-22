import { decodeToken } from "react-jwt";

import type { JwtClaimData } from "~/store";

export const decodeAccessToken = (
	accessToken?: string,
): JwtClaimData | null => {
	return accessToken ? decodeToken<JwtClaimData>(accessToken) : null;
};
