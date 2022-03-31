import { useForm } from "react-hook-form";
// Components
import Form from "components/ui/form/Form";
import Input from "components/ui/form/Input";
import Fieldset from "components/ui/form/Fieldset";
import Button from "components/ui/Button";
import Layout from "layout/Layout";

const SingUpPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const onSubmit = (data) => console.log(data);

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
	const passwordRegister = register("password", { required: true, min: 5 });

	return (
		<Layout pageTitle={"Sing up"}>
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

				<Fieldset>
					<Button href={"/login"}>I have an account</Button>
				</Fieldset>
			</Form>
		</Layout>
	);
};

export default SingUpPage;
