import Layout from "layout/Layout";
import Tabs from "./components/Tabs";
import TransactionList from "components/transaction-list/TransactionList";

function Incomes() {
	return (
		<Layout pageTitle={"Incomes"}>
			<Tabs />
			<TransactionList />
		</Layout>
	);
}

export default Incomes;
