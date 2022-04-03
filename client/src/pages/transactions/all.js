import { useEffect, useState, useContext } from "react";
import { useParams, navigate } from "@reach/router";
// Components
import Layout from "layout/Layout";
import Tabs from "./components/Tabs";
import TransactionList from "components/lists/TransactionList";
import Pagination from "./components/Pagination";
// Context
import { AuthContext } from "context/AuthContext";

function AllTransactions() {
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);
	const [paginationInfo, setPaginationInfo] = useState(null);
	const { userToken } = useContext(AuthContext);
	const { page } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/transactions/${page}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			const resData = await response.json();
			if (!resData.ok) return navigate("/home");
			setTransactions(resData.transactions);
			setPaginationInfo(resData.paginationInfo);
			setIsLoading(false);
		};
		fetchData();
	}, [userToken, page]);

	return (
		<Layout pageTitle={"All transactions"}>
			<Tabs />
			{!isLoading && <TransactionList transactions={transactions} />}
			<Pagination path="/transactions" paginationInfo={paginationInfo} />
		</Layout>
	);
}

export default AllTransactions;
