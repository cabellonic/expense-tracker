// Components
import Layout from "layout/Layout";
import SingupForm from "./forms/SingupForm";

const SingupPage = () => {
	return (
		<Layout pageTitle={"Sing up"} to="/">
			<SingupForm />
		</Layout>
	);
};

export default SingupPage;
