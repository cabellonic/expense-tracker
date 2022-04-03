import { useEffect, useState, useContext } from "react";
import { navigate, useParams } from "@reach/router";
// Components
import Layout from "layout/Layout";
import TransactionList from "components/lists/TransactionList";
import Pagination from "components/ui/Pagination";
// Context
import { AuthContext } from "context/AuthContext";
import TransactionListPH from "components/lists/TransactionListPH";

const CategoryPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);
	const [paginationInfo, setPaginationInfo] = useState(null);
	const { userToken } = useContext(AuthContext);
	const { category_id, page } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/transactions/category/${category_id}/${page}`,
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
			setPaginationInfo(resData.paginationInfo);
			setIsLoading(false);
		};
		fetchData();
	}, [category_id, userToken, page]);

	return (
		<Layout pageTitle={"Filter by categories"} from="/categories">
			{isLoading ? (
				<TransactionListPH />
			) : (
				<TransactionList transactions={transactions} />
			)}
			<Pagination
				path={`/category/${category_id}`}
				paginationInfo={paginationInfo}
			/>
		</Layout>
	);
};

export default CategoryPage;
