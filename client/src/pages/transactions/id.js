import { useParams } from "@reach/router";
// Components
import Layout from "layout/Layout";
import Transaction from "components/transaction/Transaction";
// Dummy data
import transactions from "data/transactions";

const TransactionPage = () => {
	const { id } = useParams();
	const transaction = transactions.find((item) => item.id === id);

	return (
		<Layout pageTitle={transaction.title}>
			<Transaction transaction={transaction} />
		</Layout>
	);
};

export default TransactionPage;
