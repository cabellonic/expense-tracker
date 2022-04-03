// Components
import Layout from "layout/Layout";
import AddCategoryForm from "./forms/AddCategoryForm";

const AddCategoryPage = () => {
	return (
		<Layout pageTitle={"Add category"} from="/config/categories">
			<AddCategoryForm />
		</Layout>
	);
};

export default AddCategoryPage;
