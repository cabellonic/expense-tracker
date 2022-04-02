import { useEffect, useState } from "react";
import { useParams } from "@reach/router";
// Components
import Layout from "layout/Layout";
import Transaction from "components/transaction/Transaction";

const TransactionPage = () => {
	const [transaction, setTransaction] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:5000/transactions/${id}`);
			const resData = await response.json();
			setTransaction(resData.transaction);
			setIsLoading(false);
		};
		fetchData();
	}, [id]);

	return (
		<Layout pageTitle={transaction.title}>
			{!isLoading && <Transaction transaction={transaction} />}
		</Layout>
	);
};

export default TransactionPage;
