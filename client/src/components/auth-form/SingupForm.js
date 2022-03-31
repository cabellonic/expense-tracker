import { useForm } from "react-hook-form";
// Components
import Form from "components/ui/form/Form";
import Input from "components/ui/form/Input";
import Fieldset from "components/ui/form/Fieldset";
import Button from "components/ui/Button";

const SingupForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const onSubmit = async (data) => {
		const { firstName, lastName, email, password } = data;
		try {
			const response = await fetch("http://localhost:5000/singup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ firstName, lastName, email, password }),
			});

			const responseData = await response.json();
			console.log(responseData);
		} catch (err) {
			// HANDLE ERROR LATER
			console.log(err);
		}
	};

	const firstNameRegister = register("firstName", {
		required: true,
		maxLength: 25,
		value: "Nicolás",
	});
	const lastNameRegister = register("lastName", {
		maxLength: 25,
		value: "Cabello",
	});
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

			<Fieldset>
				<Button type="submit" green>
					Sing up
				</Button>
			</Fieldset>
		</Form>
	);
};

export default SingupForm;
