import { FieldContainer } from "@forms/fields/field-container";
import type { FC } from "react";

import { Checkbox } from "@package/design-system";

import type { CheckboxFieldProps } from "./checkbox-field.types";

export const CheckboxField: FC<CheckboxFieldProps> = ({ label, field }) => {
	return (
		<FieldContainer field={field} label={label}>
			<Checkbox
				checked={field.state.value}
				onCheckedChange={(e) => {
					field.handleChange(!!e.checked);
				}}
			/>
		</FieldContainer>
	);
};
