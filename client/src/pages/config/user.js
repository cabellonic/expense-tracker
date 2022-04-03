// Components
import Layout from "layout/Layout";
import EditUserForm from "./forms/EditUserForm";

const EditUserPage = () => {
	return (
		<Layout pageTitle={"Edit profile"} from="/config">
			<EditUserForm />
		</Layout>
	);
};

export default EditUserPage;
