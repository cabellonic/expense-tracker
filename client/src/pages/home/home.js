import { useContext, useEffect, useState } from "react";
// Components
import Layout from "layout/Layout";
import HomeHeader from "./components/HomeHeader";
import TransactionList from "components/lists/TransactionList";
import TransactionListPH from "components/lists/TransactionListPH";
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
		<Layout pageTitle={"Home"} balance menu>
			<HomeHeader />
			{isLoading ? (
				<TransactionListPH />
			) : (
				<TransactionList transactions={transactions} />
			)}
		</Layout>
	);
};

export default HomePage;
