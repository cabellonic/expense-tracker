import { useForm } from "react-hook-form";
// Components
import Button from "components/ui/Button";
import Fieldset from "components/ui/form/Fieldset";
import Form from "components/ui/form/Form";
import Input from "components/ui/form/Input";

const LoginForm = ({}) => {
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
			console.log(resData);
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

				<Fieldset>
					<Button href={"/singup"} green>
						I'm new here
					</Button>
				</Fieldset>
			</Form>
		</>
	);
};

export default LoginForm;
