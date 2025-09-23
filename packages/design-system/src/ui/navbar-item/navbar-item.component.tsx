import { navbarItem } from "./navbar-item.styles";
import type { NavbarItemProps } from "./navbar-item.types";

export const NavbarItem = ({ icon, label, path }: NavbarItemProps) => {
	const onClick = () => {
		window.location.href = path;
	};
	const classes = navbarItem({ active: true });
	return (
		<div className={classes.root} onClick={onClick}>
			<div className={classes.innerWrapper}>
				{icon}
				<span>{label} </span>
			</div>
		</div>
	);
};
