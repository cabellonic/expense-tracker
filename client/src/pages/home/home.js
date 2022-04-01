import { useEffect, useState } from "react";
// Components
import Layout from "layout/Layout";
import TransactionList from "components/transaction-list/TransactionList";
import HomeHeader from "./components/HomeHeader";

const HomePage = () => {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:5000/transactions");
			const resData = await response.json();
			setTransactions(resData.transactions);
		};
		fetchData();
	}, []);

	return (
		<Layout balance menu>
			<HomeHeader />
			<TransactionList transactions={transactions} />
		</Layout>
	);
};

export default HomePage;
