import type { FC } from "react";

import { TextInput } from "@package/design-system";

import { FieldContainer } from "../field-container";

import type { TextFieldProps } from "./text-input-field.types";

export const TextInputField: FC<TextFieldProps> = ({
	label,
	field,
	...props
}) => {
	return (
		<FieldContainer field={field} label={label}>
			<TextInput
				value={field.state.value}
				onChange={(e) => {
					field.handleChange(e.target.value);
				}}
				{...props}
			/>
		</FieldContainer>
	);
};
