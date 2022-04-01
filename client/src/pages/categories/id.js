import { useEffect, useState } from "react";
import { useParams } from "@reach/router";
// Components
import Layout from "layout/Layout";
import TransactionList from "components/transaction-list/TransactionList";

const Category = () => {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { category_id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`http://localhost:5000/categories/${category_id}`
			);
			const resData = await response.json();
			setTransactions(resData.transactions);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<Layout pageTitle={"Filter by categories"} from="/categories">
			{!isLoading && transactions && (
				<TransactionList transactions={transactions} />
			)}
		</Layout>
	);
};

export default Category;
