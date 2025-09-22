import { Checkbox as EpicCheckbox } from "@thekeytechnology/epic-ui/checkbox";

import type { CheckboxProps } from "./checkbox.types";

export const Checkbox = ({ ...props }: CheckboxProps) => {
	return <EpicCheckbox {...props} />;
};
