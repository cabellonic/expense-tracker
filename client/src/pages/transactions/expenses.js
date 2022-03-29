import Layout from "layout/Layout";
import Tabs from "./components/Tabs";
import TransactionList from "components/transaction-list/TransactionList";

function Expenses() {
	return (
		<Layout pageTitle={"Transactions"}>
			<Tabs />
			<TransactionList />
		</Layout>
	);
}

export default Expenses;
