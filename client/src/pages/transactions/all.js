import { useEffect, useState } from "react";
// Components
import Layout from "layout/Layout";
import Tabs from "./components/Tabs";
import TransactionList from "components/transaction-list/TransactionList";

function AllTransactions() {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:5000/transactions`);
			const resData = await response.json();
			setTransactions(resData.transactions);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<Layout pageTitle={"All transactions"}>
			<Tabs />
			{!isLoading && <TransactionList transactions={transactions} />}
		</Layout>
	);
}

export default AllTransactions;
