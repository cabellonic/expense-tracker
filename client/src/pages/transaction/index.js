import { useEffect, useState, useContext } from "react";
import { useParams } from "@reach/router";
// Components
import Layout from "layout/Layout";
import Transaction from "./components/Transaction";
// Context
import { AuthContext } from "context/AuthContext";

const TransactionPage = ({ location }) => {
	const [transaction, setTransaction] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { userToken } = useContext(AuthContext);
	const { transaction_id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/transaction/${transaction_id}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			const resData = await response.json();
			setTransaction(resData.transaction);
			setIsLoading(false);
		};
		fetchData();
	}, [transaction_id, userToken]);

	return (
		<Layout pageTitle={transaction.title} from={location.state?.from}>
			{!isLoading && <Transaction transaction={transaction} />}
		</Layout>
	);
};

export default TransactionPage;
