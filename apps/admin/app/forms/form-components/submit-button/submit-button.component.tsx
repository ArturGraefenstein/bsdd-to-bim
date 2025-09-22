import { useStore } from "@thekeytechnology/epic-ui/form";
import type { FC } from "react";

import { Button } from "@package/design-system";

import type { SubmitButtonProps } from "./submit-button.types";

export const SubmitButton: FC<SubmitButtonProps> = ({ label, form }) => {
	const canSubmit = useStore(form.store, (state) => state.canSubmit);
	const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
	const disabled = !canSubmit;
	return (
		<Button disabled={disabled} loading={isSubmitting}>
			{label}
		</Button>
	);
};
