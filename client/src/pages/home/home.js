import { useContext, useEffect, useState } from "react";
// Components
import Layout from "layout/Layout";
import TransactionList from "components/transaction-list/TransactionList";
import HomeHeader from "./components/HomeHeader";
// Context
import { AuthContext } from "context/AuthContext";

const HomePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);
	const { userToken } = useContext(AuthContext);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/transactions/1`,
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
		<Layout balance menu>
			<HomeHeader />
			{!isLoading && <TransactionList transactions={transactions} />}
		</Layout>
	);
};

export default HomePage;
