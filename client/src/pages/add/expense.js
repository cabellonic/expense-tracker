import Layout from "layout/Layout";
import AddTransactionForm from "components/transaction-form/AddTransactionForm";

const AddExpensePage = () => {
	return (
		<Layout pageTitle={"New transaction"}>
			<AddTransactionForm type="expense" />
		</Layout>
	);
};

export default AddExpensePage;
