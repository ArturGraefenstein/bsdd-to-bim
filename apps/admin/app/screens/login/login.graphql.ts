import { graphql } from "react-relay";

export const QUERY = graphql`
	query login_LoginQuery {
		setupStatus
	}
`;

export const LOGIN_MUTATION = graphql`
	mutation login_LoginMutation(
		$email: String!
		$password: String!
		$platform: SignInPlatform!
	) {
		login(email: $email, password: $password, platform: $platform) {
			refreshToken
			accessToken
		}
	}
`;
