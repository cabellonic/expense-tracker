import Layout from "layout/Layout";
import CategoriesList from "./components/CategoriesList";

const CategoriesPage = () => {
	return (
		<Layout pageTitle={"Filter by categories"}>
			<CategoriesList />
		</Layout>
	);
};

export default CategoriesPage;
