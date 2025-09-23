import logo from "@assets/logo.png";
import { ReactComponent as RowsIcon } from "@assets/rows.svg";
import { ReactComponent as SettingsIcon } from "@assets/settings.svg";
import { ReactComponent as DevicesIcon } from "@assets/tablet.svg";
import { ReactComponent as UsersIcon } from "@assets/users.svg";

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
					<NavbarItem icon={<RowsIcon />} label="Dashboard" path="/dashboard" />
					<NavbarItem
						icon={<UsersIcon />}
						label="Converter"
						path="/converter"
					/>
					<NavbarItem icon={<DevicesIcon />} label="Geräte" path="/profile" />
					<NavbarItem
						icon={<SettingsIcon />}
						label="Einstellungen"
						path="/help"
					/>
				</div>
			</div>
			<div className={RightWrapperClass}>{children}</div>
		</div>
	);
};
