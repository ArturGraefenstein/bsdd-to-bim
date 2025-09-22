import { css } from "@styled-system/css";

export const RootWrapperClass = css({
	display: "flex",
	flexDirection: "row",
	height: "100vh",
	width: "100vw",
	backgroundColor: "bg.canvas",
});

export const LeftWrappeClass = css({
	display: "flex",
	flexDirection: "column",
	width: "80",
	height: "100%",
	overflow: "hidden",
	borderRightWidth: "1px",
	borderRightStyle: "solid",
	borderRightColor: "border.subtle",
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

export const MenueItemsWrapperClass = css({
	display: "flex",
	flexDirection: "column",
	paddingX: "4",
	marginTop: "16",
});
