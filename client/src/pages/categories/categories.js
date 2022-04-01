import { useEffect, useState } from "react";
// Components
import Layout from "layout/Layout";
import CategoriesList from "./components/CategoriesList";

const CategoriesPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:5000/categories");
			const resData = await response.json();
			setCategories(resData);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<Layout pageTitle={"Filter by categories"}>
			{!isLoading && <CategoriesList categories={categories} />}
		</Layout>
	);
};

export default CategoriesPage;
