import { useContext, useEffect, useState } from "react";
// Components
import Layout from "layout/Layout";
import CategoryCard from "./components/CategoryCard";
import Button from "components/ui/Button";
// Context
import { AuthContext } from "context/AuthContext";

const EditCategories = () => {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
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

	if (isLoading) return <></>;

	return (
		<Layout pageTitle={"Edit categories"} from="/config">
			<Button>Add category</Button>
			{categories.map((category) => (
				<CategoryCard key={category.id} category={category} />
			))}
		</Layout>
	);
};

export default EditCategories;
