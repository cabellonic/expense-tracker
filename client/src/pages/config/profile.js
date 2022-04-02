// Components
import EditUserForm from "components/config-form/EditUserForm";
import Layout from "layout/Layout";

const EditUserPage = () => {
	return (
		<Layout pageTitle={"Configuration"} from="/config">
			<EditUserForm />
		</Layout>
	);
};

export default EditUserPage;
