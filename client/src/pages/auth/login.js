import { useForm } from "react-hook-form";
// Components
import Layout from "layout/Layout";
import LoginForm from "components/auth-form/LoginForm";

const LoginPage = () => {
	return (
		<Layout pageTitle={"Log in"}>
			<LoginForm />
		</Layout>
	);
};

export default LoginPage;
