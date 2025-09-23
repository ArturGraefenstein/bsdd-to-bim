import { FieldPrimitives as Field } from "@thekeytechnology/epic-ui/field";
import { XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { useMutation } from "react-relay";

import {
	Button,
	Card,
	DashboardLayout,
	HStack,
	Stack,
	TextInput,
	Toast,
} from "@package/design-system";

import type { converter_convertDictionaryAndDownloadMutation } from "@relay/converter_convertDictionaryAndDownloadMutation.graphql";
import { CONVERT_DICTIONARY_MUTATION } from "~/screens/converter/converter.graphql";
import { downloadXml } from "~/screens/converter/converter.utils";

export const ConverterScreen = () => {
	const [commit, isInFlight] =
		useMutation<converter_convertDictionaryAndDownloadMutation>(
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
				const blob = response.convertDictionaryAndDownload.blob;
				downloadXml(blob, `${input}.xml`);
				toaster.create({
					title: "Dictionary converted.",
					description: "The dictionary has been converted successfully.",
					type: "info",
					duration: 300000,
					onStatusChange: (res) => {
						if (res.status === "unmounted") {
							handleReset();
						}
					},
				});
			},
			onError: (e) => {
				toaster.create({
					title: "URL Invalid.",
					description: "Please try another url.",
					type: "error",
				});
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
							Convert and Download
						</Button>
					</HStack>
				</Stack>
			</Card>
			<Toast.Toaster toaster={toaster}>
				{(toast) => (
					<Toast.Root key={toast.id}>
						<Toast.Title>{toast.title}</Toast.Title>
						<Toast.Description>{toast.description}</Toast.Description>
						{toast.action ? (
							<Toast.ActionTrigger asChild>
								<Button variant="solid" size="sm">
									{toast.action.label ?? ""}
								</Button>
							</Toast.ActionTrigger>
						) : (
							<Fragment />
						)}
						<Toast.CloseTrigger asChild>
							<Button size="sm" variant="link">
								<XIcon />
							</Button>
						</Toast.CloseTrigger>
					</Toast.Root>
				)}
			</Toast.Toaster>
		</DashboardLayout>
	);
};

const toaster = Toast.createToaster({
	placement: "bottom-end",
	overlap: true,
	gap: 16,
});
