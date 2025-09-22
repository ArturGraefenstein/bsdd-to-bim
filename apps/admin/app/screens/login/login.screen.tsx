import { useEffect } from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";

import { useNavigate } from "react-router";

import { AuthLayout, Box, Text8, VStack } from "@package/design-system";
import {
	LoginForm,
	type LoginFormValues,
} from "@features/auth/forms/login-form";
import type { login_LoginMutation } from "@relay/login_LoginMutation.graphql";

import type { login_LoginQuery } from "@relay/login_LoginQuery.graphql";
import { useAuthStore } from "~/store";

import { LOGIN_MUTATION, QUERY } from "./login.graphql";

export const LoginScreen = () => {
	const query = useLazyLoadQuery<login_LoginQuery>(QUERY, {});
	const [login] = useMutation<login_LoginMutation>(LOGIN_MUTATION);

	const navigate = useNavigate();
	const { login: loginAuthStore } = useAuthStore();

	useEffect(() => {
		if (query.setupStatus === "UNTOUCHED") {
			navigate("/setup");
		}
	}, [query.setupStatus, navigate]);

	const handleSubmit = (values: LoginFormValues) => {
		return new Promise<void>((resolve, reject) => {
			login({
				variables: {
					email: values.email,
					password: values.password,
					platform: "WEB",
				},
				onCompleted: (response) => {
					if (response.login) {
						loginAuthStore(response.login);
						navigate("/dashboard");
					}
					resolve();
				},
				onError: (error) => {
					reject(error);
				},
			});
		});
	};

	return (
		<AuthLayout>
			<VStack flex="1" gap="16" alignItems="initial">
				<Box>
					<Text8>BSDD to BIM</Text8>
				</Box>
				<LoginForm onSubmit={handleSubmit} />
			</VStack>
		</AuthLayout>
	);
};
