import { useContext, useEffect, useState } from "react";
// Components
import Layout from "layout/Layout";
import CategoriesList from "components/lists/CategoriesList";
import CategoryListPH from "components/lists/CategoryListPH";
// Context
import { AuthContext } from "context/AuthContext";

const CategoriesPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { userToken } = useContext(AuthContext);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/categories/used`,
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
	}, [userToken]);

	return (
		<Layout pageTitle={"Filter by categories"}>
			{isLoading ? (
				<CategoryListPH />
			) : (
				<CategoriesList categories={categories} showCount />
			)}
		</Layout>
	);
};

export default CategoriesPage;
