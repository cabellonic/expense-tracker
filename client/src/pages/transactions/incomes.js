import { useEffect, useState, useContext } from "react";
// Components
import Layout from "layout/Layout";
import Tabs from "./components/Tabs";
import TransactionList from "components/transaction-list/TransactionList";
// Context
import { AuthContext } from "context/AuthContext";

function Incomes() {
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { userToken } = useContext(AuthContext);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/transactions/incomes`,
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
		<Layout pageTitle={"Income transactions"}>
			<Tabs />
			{!isLoading && <TransactionList transactions={transactions} />}
		</Layout>
	);
}

export default Incomes;
