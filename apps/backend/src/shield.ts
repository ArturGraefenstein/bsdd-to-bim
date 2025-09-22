import { shield } from "graphql-shield";
import { allow } from "@modules/auth/permissions.js";
import { QueryModule } from "@resolvers/query.js";
import { MutationModule } from "@resolvers/mutation.js";
import { tokenPayloadPermissions } from "@modules/auth/login-mutation.js";
import { refreshTokenPayloadPermissoins } from "@modules/auth/refresh-token-mutation.js";

export const permissions = shield(
	{
		Query: QueryModule.shield,
		Mutation: MutationModule.shield,
		TokenPayload: tokenPayloadPermissions,
		RefreshTokenPayload: refreshTokenPayloadPermissoins,
	},
	{ allowExternalErrors: true, fallbackRule: allow },
);
