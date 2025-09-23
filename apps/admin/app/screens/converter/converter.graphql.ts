import { graphql } from "react-relay";
export const CONVERT_DICTIONARY_MUTATION = graphql`
	mutation converter_convertDictionaryMutation(
		$input: ConvertDictionaryInput!
	) {
		convertDictionary(input: $input) {
			blob
		}
	}
`;
