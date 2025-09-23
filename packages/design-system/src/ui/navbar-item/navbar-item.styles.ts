import { css, sva } from "@styled-system/css";

export const navbarItem = sva({
	slots: ["root", "innerWrapper"],
	base: {
		root: {
			height: "10",
			alignSelf: "stretch",
			display: "flex",
			paddingY: "0.5",
		},
		innerWrapper: {
			display: "flex",
			flexDirection: "row",
			rounded: "lg",
			alignItems: "center",
			gap: "2",
			paddingLeft: "2",
		},
	},
	variants: {
		active: {
			true: {
				innerWrapper: {
					display: "flex",
					flex: 1,
					flexDirection: "row",
					alignSelf: "stretch",
					rounded: "lg",
					backgroundColor: "bg.subtle",
				},
			},
			false: {},
		},
	},
	defaultVariants: {
		active: false,
	},
});

export const RootWrapperClass = css({
	height: "10",
	alignSelf: "stretch",
	display: "flex",
	paddingY: "0.5",
});

export const InnerWrapperClass = css({
	display: "flex",
	flexDirection: "row",
	rounded: "lg",
});

export const RightWrapperClass = css({
	display: "flex",
	flex: 1,
});

export const LogoWrapperClass = css({
	display: "flex",
	alignSelf: "stretch",
	alignItems: "center",
	justifyContent: "center",
	paddingTop: "6",
	paddingX: "4",
});

export const LogoClass = css({
	maxWidth: "200px",
	maxHeight: "80px",
	objectFit: "contain",
});
