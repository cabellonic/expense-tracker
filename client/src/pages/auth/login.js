import { useForm } from "react-hook-form";
// Components
import Form from "components/ui/form/Form";
import Input from "components/ui/form/Input";
import Fieldset from "components/ui/form/Fieldset";
import Button from "components/ui/Button";
import Layout from "layout/Layout";

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const onSubmit = (data) => console.log(data);

	const emailRegister = register("email", {
		required: true,
		pattern: /^\S+@\S+$/i,
	});
	const passwordRegister = register("password", { required: true, min: 5 });

	return (
		<Layout pageTitle={"Log in"}>
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
		</Layout>
	);
};

export default LoginPage;
