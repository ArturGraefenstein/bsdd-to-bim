import { create } from "zustand";
import { persist } from "zustand/middleware";

export type JwtTokenData = {
	accessToken: string;
	refreshToken: string;
};

type AuthState = {
	isLoggedIn: boolean;
	jwtTokenData?: JwtTokenData;
	setJwtTokenData: (jwtTokenData: JwtTokenData) => void;
	login: (jwtTokenData: JwtTokenData) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isLoggedIn: false,
			jwtTokenData: undefined,
			setJwtTokenData: (jwtTokenData) => {
				set(() => ({ isLoggedIn: true, jwtTokenData }));
			},
			login: (jwtTokenData) => {
				set(() => ({ isLoggedIn: true, jwtTokenData }));
			},
			logout: () => {
				set(() => ({ isLoggedIn: false, jwtTokenData: undefined }));
			},
		}),
		{
			name: "auth-store",
		},
	),
);
