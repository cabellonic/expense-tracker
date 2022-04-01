import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
// Components
import Form from "components/ui/form/Form";
import Input from "components/ui/form/Input";
import Fieldset from "components/ui/form/Fieldset";
import Button from "components/ui/Button";
import ErrorMessage from "components/ui/form/ErrorMessage";
// Context
import { AuthContext } from "context/AuthContext";

const LoginForm = ({}) => {
	const [errorMessage, setErrorMessage] = useState();
	const { login } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const onSubmit = async (data) => {
		const { email, password } = data;
		try {
			const response = await fetch("http://localhost:5000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const resData = await response.json();
			// If credentials are invalid
			if (!resData.isLoggedIn) return setErrorMessage(resData.message);

			login(resData.token, resData.userId);
		} catch (err) {
			// HANDLE ERROR LATER
			console.log(err);
		}
	};

	const emailRegister = register("email", {
		required: true,
		pattern: /^\S+@\S+$/i,
		value: "cabellonic@gmail.com",
	});
	const passwordRegister = register("password", {
		required: true,
		min: 5,
		value: "somepassword",
	});
	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Input
					register={emailRegister}
					placeholder="Email"
					error={errors.email}
				/>
				<Input
					register={passwordRegister}
					placeholder="Password"
					error={errors.password}
					type="password"
				/>

				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<Fieldset>
					<Button type="submit">Log in</Button>
				</Fieldset>
			</Form>
		</>
	);
};

export default LoginForm;
