import { useContext, useEffect, useState } from "react";
import { useParams } from "@reach/router";
// Components
import Layout from "layout/Layout";
import EditTransactionForm from "components/transaction-form/EditTransactionForm";
// Context
import { AuthContext } from "context/AuthContext";

const EditTransaction = () => {
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
		<Layout
			pageTitle={"Edit transaction"}
			from={`/transaction/${transaction_id}`}
		>
			{!isLoading && <EditTransactionForm transaction={transaction} />}
		</Layout>
	);
};

export default EditTransaction;
