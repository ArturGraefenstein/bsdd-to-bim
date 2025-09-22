import { Button as EpicButton } from "@thekeytechnology/epic-ui/button";

import type { ButtonProps } from "./button.types";

export const Button = ({ ...props }: ButtonProps) => {
	return <EpicButton {...props} />;
};
