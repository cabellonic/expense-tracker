import { useContext, useEffect, useState } from "react";
// Components
import Layout from "layout/Layout";
import AddCategoryTab from "./components/AddCategoryTab";
import CategoriesList from "components/lists/CategoriesList";
import CategorieListPH from "components/lists/CategorieListPH";
import EditCategoryButton from "./components/EditCategoryButton";
// Context
import { AuthContext } from "context/AuthContext";

const EditCategories = () => {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { userToken } = useContext(AuthContext);

	// Get categories fetch use effect
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/categories`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			const resData = await response.json();
			setCategories(resData.categories);
			setIsLoading(false);
		};
		fetchData();
	}, [userToken, setCategories]);

	return (
		<Layout pageTitle={"Edit categories"} from="/config">
			<AddCategoryTab />
			{isLoading ? (
				<CategorieListPH></CategorieListPH>
			) : (
				<CategoriesList categories={categories} href={`/config/category`}>
					<EditCategoryButton />
				</CategoriesList>
			)}
		</Layout>
	);
};

export default EditCategories;
