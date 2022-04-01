import { useEffect, useState } from "react";
import { useParams } from "@reach/router";
// Components
import Layout from "layout/Layout";
import EditTransactionForm from "components/transaction-form/EditTransactionForm";

const EditTransaction = () => {
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
	}, []);

	return (
		<Layout pageTitle={"Edit transaction"} from={`/transactions/${id}`}>
			{!isLoading && <EditTransactionForm transaction={transaction} />}
		</Layout>
	);
};

export default EditTransaction;
