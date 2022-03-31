// Components
import Layout from "layout/Layout";
import SingupForm from "components/auth-form/SingupForm";

const SingupPage = () => {
	return (
		<Layout pageTitle={"Sing up"}>
			<SingupForm />
		</Layout>
	);
};

export default SingupPage;
