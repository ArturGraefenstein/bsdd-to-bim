import { navbarItem } from "./navbar-item.styles";
import type { NavbarItemProps } from "./navbar-item.types";

export const NavbarItem = ({ icon, label }: NavbarItemProps) => {
	const classes = navbarItem({ active: true });
	return (
		<div className={classes.root}>
			<div className={classes.innerWrapper}>
				{icon}
				<span>{label} </span>
			</div>
		</div>
	);
};
