// Components
import Layout from "layout/Layout";
import LoginForm from "./forms/LoginForm";

const LoginPage = () => {
	return (
		<Layout pageTitle={"Log in"} to="/">
			<LoginForm />
		</Layout>
	);
};

export default LoginPage;
