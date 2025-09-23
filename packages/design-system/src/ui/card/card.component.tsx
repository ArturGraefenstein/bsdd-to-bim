import {
	Card as CardPrimitive,
	type CardProps,
} from "@thekeytechnology/epic-ui/card";

export const Card = ({
	footerNode,
	children,
	description,
	title,
	...props
}: CardProps) => {
	return (
		<CardPrimitive
			title={title}
			description={description}
			footerNode={footerNode}
			width="sm"
			{...props}
		>
			{children}
		</CardPrimitive>
	);
};
