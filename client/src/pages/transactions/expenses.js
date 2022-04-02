import { useEffect, useState, useContext } from "react";
// Components
import Layout from "layout/Layout";
import Tabs from "./components/Tabs";
import TransactionList from "components/transaction-list/TransactionList";
// Context
import { AuthContext } from "context/AuthContext";

function Expenses() {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { userToken } = useContext(AuthContext);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`http://localhost:5000/transactions/expenses`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			const resData = await response.json();
			setTransactions(resData.transactions);
			setIsLoading(false);
		};
		fetchData();
	}, [userToken]);

	return (
		<Layout pageTitle={"Expense transactions"}>
			<Tabs />
			{!isLoading && <TransactionList transactions={transactions} />}
		</Layout>
	);
}

export default Expenses;
