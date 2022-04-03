import { useEffect, useState, useContext } from "react";
import { navigate, useParams } from "@reach/router";
// Components
import Layout from "layout/Layout";
import TransactionList from "components/lists/TransactionList";
// Context
import { AuthContext } from "context/AuthContext";

const CategoryPage = () => {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { userToken } = useContext(AuthContext);
	const { category_id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/transactions/category/${category_id}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			const resData = await response.json();
			if (!resData.ok) return navigate("/categories");
			setTransactions(resData.transactions);
			setIsLoading(false);
		};
		fetchData();
	}, [category_id, userToken]);

	return (
		<Layout pageTitle={"Filter by categories"} from="/categories">
			{!isLoading && transactions && (
				<TransactionList transactions={transactions} />
			)}
		</Layout>
	);
};

export default CategoryPage;
