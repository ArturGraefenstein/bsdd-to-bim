import { useAuthStore } from "~/store";

export const isLoggedIn = () => {
	const { isLoggedIn } = useAuthStore.getState();
	return isLoggedIn;
};
