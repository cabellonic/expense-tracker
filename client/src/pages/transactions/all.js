import Layout from "layout/Layout";
import Tabs from "./components/Tabs";
import TransactionList from "components/transaction-list/TransactionList";

function AllTransactions() {
	return (
		<Layout pageTitle={"All transactions"}>
			<Tabs />
			<TransactionList />
		</Layout>
	);
}

export default AllTransactions;
