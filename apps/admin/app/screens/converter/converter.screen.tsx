import type { converter_convertDictionaryMutation } from "@relay/converter_convertDictionaryMutation.graphql";
import { FieldPrimitives as Field } from "@thekeytechnology/epic-ui/field";

import { useState } from "react";
import { useMutation } from "react-relay";

import {
	Button,
	Card,
	DashboardLayout,
	HStack,
	Stack,
	TextInput,
} from "@package/design-system";

import { CONVERT_DICTIONARY_MUTATION } from "~/screens/converter/converter.graphql";
import { downloadXml } from "~/screens/converter/converter.utils";

export const ConverterScreen = () => {
	const [commit, isInFlight] = useMutation<converter_convertDictionaryMutation>(
		CONVERT_DICTIONARY_MUTATION,
	);
	const [input, setInput] = useState("");

	const handleReset = () => {
		setInput("");
	};
	const handleSubmit = () => {
		commit({
			variables: {
				input: {
					uri: input,
				},
			},
			onCompleted: (response) => {
				const blob = response.convertDictionary.blob;
				downloadXml(blob, `${input}.xml`);
				window.alert("Download successfull.");
			},
			onError: (e) => {
				window.alert("Invalid url");
				console.error(e);
			},
		});
	};
	return (
		<DashboardLayout>
			<Card
				style={{ width: "100%", height: "100%", flex: "1" }}
				title={"BSDD Dictionary -> Bim Property Import"}
				description={
					"Create bim property import file from bsdd dictionary link."
				}
			>
				<Stack gap="4">
					<Field.Root>
						<Field.Label>Dictionary Url (BSDD)</Field.Label>
						<TextInput
							placeholder={
								"https://identifier.buildingsmart.org/uri/bs-agri/fruitvegs/1.6"
							}
							type="text"
							id="bsdd-dictionary"
							name="dictionary-url-(bsdd)"
							value={input}
							onChange={(e) => {
								setInput(e.currentTarget.value);
							}}
						/>
					</Field.Root>
					<HStack gap="3">
						<Button variant="outline" onClick={handleReset}>
							Clear
						</Button>
						<Button disabled={isInFlight} onClick={handleSubmit}>
							Download
						</Button>
					</HStack>
				</Stack>
			</Card>
		</DashboardLayout>
	);
};
