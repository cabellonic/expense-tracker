import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { navigate } from "@reach/router";
// Components
import Form from "components/ui/form-elements/Form";
import Input from "components/ui/form-elements/Input";
import Fieldset from "components/ui/form-elements/Fieldset";
import Button from "components/ui/Button";
import ErrorMessage from "components/ui/ErrorMessage";
// Context
import { AuthContext } from "context/AuthContext";

const SingupForm = () => {
	const [errorMessage, setErrorMessage] = useState();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { login } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const onSubmit = async (data) => {
		const { firstName, lastName, email, password } = data;
		setIsSubmitting(true);

		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/singup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					password,
					avatar: `/avatar/Monster${Math.floor(Math.random() * 23)}.png`,
				}),
			});

			const resData = await response.json();
			setIsSubmitting(false);
			// If credentials are invalid
			if (!resData.isLoggedIn) return setErrorMessage(resData.message);

			login(resData.token);
			navigate("/home");
		} catch (err) {
			console.log(err);
		}
	};

	const firstNameRegister = register("firstName", {
		required: true,
		maxLength: 25,
	});
	const lastNameRegister = register("lastName", {
		maxLength: 25,
	});
	const emailRegister = register("email", {
		required: true,
		pattern: /^\S+@\S+$/i,
	});
	const passwordRegister = register("password", {
		required: true,
		min: 5,
	});

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Input
				register={firstNameRegister}
				placeholder="First Name"
				error={errors.firstName}
			/>
			<Input
				register={lastNameRegister}
				placeholder="Last Name"
				error={errors.lastName}
			/>
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
				<Button type="submit" green disabled={isSubmitting}>
					Sing up
				</Button>
			</Fieldset>
		</Form>
	);
};

export default SingupForm;
