import { css } from "@styled-system/css";

export const BackgroundClass = css({
	display: "flex",
	height: "100vh",
	alignItems: "center",
	justifyContent: "center",
});

export const BackgroundImageClass = css({
	position: "fixed",
	top: 0,
	left: 0,
	zIndex: -1,
	objectFit: "cover",
	w: "100%",
	h: "100%",
	opacity: 0.5,
});

export const WrapperClass = css({
	display: "flex",
	flexDirection: "row",
	minH: "1xl",
	minW: "4xl",
	borderRadius: "2xl",
	overflow: "hidden",
});

export const LeftWrappeClass = css({
	display: "flex",
	flex: 1.5,
	alignSelf: "stretch",
	backgroundColor: "bg.subtle",
	alignItems: "center",
	justifyContent: "center",
});

export const RightWrapperClass = css({
	display: "flex",
	flex: 1,
	backgroundColor: "bg.emphasized",
	padding: "16",
	alignItems: "center",
});

export const LeftImageClass = css({
	maxWidth: "300px",
	maxHeight: "500px",
	objectFit: "contain",
});
