import { graphql } from "react-relay";

export const QUERY = graphql`
	query setup_Query {
		setupStatus
	}
`;

export const SETUP_MUTATION = graphql`
	mutation setup_SetupMutation(
		$email: String!
		$firstName: String!
		$lastName: String!
		$password: String!
	) {
		setupInstance(
			email: $email
			firstName: $firstName
			lastName: $lastName
			password: $password
		) {
			accessToken
			refreshToken
		}
	}
`;
