import logo from "@assets/logo.png";
import { Cog, LayoutDashboard, User, Wrench } from "lucide-react";
import type { FC } from "react";

import { NavbarItem } from "@ui/navbar-item";

import {
	LeftWrappeClass,
	LogoClass,
	LogoWrapperClass,
	MenueItemsWrapperClass,
	RightWrapperClass,
	RootWrapperClass,
} from "./dashboard-layout.styles";
import type { DashboardLayoutProps } from "./dashboard-layout.types";

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
	return (
		<div className={RootWrapperClass}>
			<div className={LeftWrappeClass}>
				<div className={LogoWrapperClass}>
					<img className={LogoClass} src={logo} alt="main brand illustration" />
				</div>
				<div className={MenueItemsWrapperClass}>
					<NavbarItem
						icon={<LayoutDashboard />}
						label="Dashboard"
						path="/dashboard"
					/>
					<NavbarItem icon={<Wrench />} label="Converter" path="/converter" />
					<NavbarItem icon={<User />} label="Geräte" path="/profile" />
					<NavbarItem icon={<Cog />} label="Einstellungen" path="/help" />
				</div>
			</div>
			<div className={RightWrapperClass}>{children}</div>
		</div>
	);
};
