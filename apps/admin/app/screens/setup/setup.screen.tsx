import { useEffect } from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";

import { useNavigate } from "react-router";

import { AuthLayout, Box, Text8, VStack } from "@package/design-system";

import type { setup_Query } from "@relay/setup_Query.graphql";
import type { setup_SetupMutation } from "@relay/setup_SetupMutation.graphql";
import {
	SetupForm,
	type SetupFormValues,
} from "~/features/auth/forms/setup-form";
import { useAuthStore } from "~/store";

import { isLoggedIn } from "~/utils/auth";

import { QUERY, SETUP_MUTATION } from "./setup.graphql";

export const SetupScreen = () => {
	const query = useLazyLoadQuery<setup_Query>(QUERY, {});

	const [setup] = useMutation<setup_SetupMutation>(SETUP_MUTATION);

	const navigate = useNavigate();
	const { login: loginAuthStore } = useAuthStore();

	useEffect(() => {
		if (query.setupStatus === "INITIALIZED") {
			if (isLoggedIn()) {
				navigate("/dashboard");
			} else {
				navigate("/login");
			}
		}
	}, [query.setupStatus, navigate]);

	const handleSubmit = (values: SetupFormValues) => {
		return new Promise<void>((resolve, reject) => {
			setup({
				variables: {
					email: values.email,
					password: values.password,
					firstName: values.firstName,
					lastName: values.lastName,
				},
				onCompleted: (response) => {
					if (response.setupInstance) {
						loginAuthStore(response.setupInstance);
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
					<Text8>System einrichten</Text8>
				</Box>
				<SetupForm onSubmit={handleSubmit} />
			</VStack>
		</AuthLayout>
	);
};
