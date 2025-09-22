import backgroundImage from "@assets/background.jpg";
import logo from "@assets/logo.png";
import type { FC } from "react";

import {
	BackgroundClass,
	BackgroundImageClass,
	LeftImageClass,
	LeftWrappeClass,
	RightWrapperClass,
	WrapperClass,
} from "./auth-layout.styles";
import type { AuthLayoutProps } from "./auth-layout.types";

export const AuthLayout: FC<AuthLayoutProps> = ({ leftImageSrc, children }) => {
	return (
		<div className={BackgroundClass}>
			<img
				className={BackgroundImageClass}
				src={backgroundImage}
				alt="background"
			/>
			<div className={WrapperClass}>
				<div className={LeftWrappeClass}>
					<img
						className={LeftImageClass}
						src={leftImageSrc ?? logo}
						alt="main brand illustration"
					/>
				</div>
				<div className={RightWrapperClass}>{children}</div>
			</div>
		</div>
	);
};
