import { Input as EpicInput } from "@thekeytechnology/epic-ui/input";

import type { TextInputProps } from "./text-input.types";

export const TextInput = ({ ...props }: TextInputProps) => {
	return <EpicInput {...props} />;
};
