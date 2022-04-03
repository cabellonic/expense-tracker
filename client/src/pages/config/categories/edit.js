import { useContext, useEffect, useState } from "react";
import { useParams } from "@reach/router";
// Components
import Layout from "layout/Layout";
import EditCategoryForm from "./forms/EditCategoryForm";
// Context
import { AuthContext } from "context/AuthContext";
import { navigate } from "@reach/router";

const EditCategoryPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [category, setCategory] = useState(null);
	const { userToken } = useContext(AuthContext);
	const { category_id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/category/${category_id}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			const resData = await response.json();
			if (!resData.ok) return navigate("/config/categories");
			setCategory(resData.category);
			setIsLoading(false);
		};
		fetchData();
	}, [userToken, category_id]);

	return (
		<Layout pageTitle={"Edit category"} from="/config/categories">
			{isLoading ? <></> : <EditCategoryForm category={category} />}
		</Layout>
	);
};

export default EditCategoryPage;
