import type { FC } from "react";

import type { FormProps } from "./form.types";

export const Form: FC<FormProps> = ({ children, form }) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		void form.handleSubmit();
	};
	return <form onSubmit={handleSubmit}>{children}</form>;
};
