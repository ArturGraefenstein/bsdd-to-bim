import { useStore } from "@thekeytechnology/epic-ui/form";

import { Box, Text3 } from "@package/design-system";

import type { FieldContainerProps } from "./field-container.types";

export const FieldContainer = ({
	label,
	field,
	children,
}: FieldContainerProps) => {
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<Box>
			<Box>
				<Text3>{label}</Text3>
				{children}
			</Box>
			{errors.map((error) => (
				<Text3 key={error?.message} color="red.9">
					{error?.message}
				</Text3>
			))}
		</Box>
	);
};
