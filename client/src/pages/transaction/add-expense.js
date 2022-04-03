// Components
import Layout from "layout/Layout";
import AddTransactionForm from "./forms/AddTransactionForm";

const AddExpensePage = () => {
	return (
		<Layout pageTitle={"New transaction"}>
			<AddTransactionForm type="expense" />
		</Layout>
	);
};

export default AddExpensePage;
