import { useForm } from "react-hook-form";
// Components
import Button from "components/ui/Button";
import Fieldset from "components/ui/form/Fieldset";
import Form from "components/ui/form/Form";
import Input from "components/ui/form/Input";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

const LoginForm = ({}) => {
	const { isLoggedIn, userToken, login, singout } = useContext(AuthContext);

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
			login(resData.token);
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

				<Fieldset>
					<Button type="submit">Log in</Button>
				</Fieldset>
			</Form>
		</>
	);
};

export default LoginForm;
