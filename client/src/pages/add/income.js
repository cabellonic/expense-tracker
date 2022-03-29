import Layout from "layout/Layout";
import AddTransactionForm from "components/transaction-form/AddTransactionForm";

const AddIncomePage = () => {
	return (
		<Layout pageTitle={"New transaction"}>
			<AddTransactionForm type="income" />
		</Layout>
	);
};

export default AddIncomePage;
