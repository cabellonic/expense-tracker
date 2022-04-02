import { useContext, useEffect, useState } from "react";
// Components
import Layout from "layout/Layout";
import CategoriesList from "./components/CategoriesList";
// Context
import { AuthContext } from "context/AuthContext";

const CategoriesPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { userToken } = useContext(AuthContext);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:5000/categories/used", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			const resData = await response.json();
			setCategories(resData.categories);
			setIsLoading(false);
		};
		fetchData();
	}, [userToken]);

	return (
		<Layout pageTitle={"Filter by categories"}>
			{!isLoading && <CategoriesList categories={categories} />}
		</Layout>
	);
};

export default CategoriesPage;
