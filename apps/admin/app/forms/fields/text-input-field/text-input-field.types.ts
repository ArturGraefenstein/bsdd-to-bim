import type { FieldComponentProps } from "@thekeytechnology/epic-ui/form";

export type TextFieldProps = {
	label: string;
	type?: React.HTMLInputTypeAttribute | undefined;
} & FieldComponentProps<string>;
