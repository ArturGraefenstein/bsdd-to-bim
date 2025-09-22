import { graphql } from "react-relay";

export const QUERY = graphql`
	query dashboard_Query {
		me {
			id
			firstName
			lastName
			email
			role
			createdAt
		}
	}
`;
