import { graphql } from "react-relay";
export const CONVERT_DICTIONARY_MUTATION = graphql`
	mutation converter_convertDictionaryAndDownloadMutation(
		$input: ConvertDictionaryInput!
	) {
		convertDictionaryAndDownload(input: $input) {
			blob
		}
	}
`;
