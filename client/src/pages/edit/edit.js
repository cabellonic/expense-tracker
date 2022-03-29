import { useParams } from "@reach/router";
import Layout from "layout/Layout";
import EditTransactionForm from "components/transaction-form/EditTransactionForm";
// Dummy data
import transactions from "data/transactions";

const EditTransaction = () => {
	const { id } = useParams();

	const transaction = transactions.find((item) => item.id === id);

	return (
		<Layout pageTitle={"Edit transaction"} from={`/transactions/${id}`}>
			<EditTransactionForm transaction={transaction} />
		</Layout>
	);
};

export default EditTransaction;
