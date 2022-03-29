import Layout from "layout/Layout";
import EditTransactionForm from "components/transaction-form/EditTransactionForm";

const EditTransaction = () => {
	return (
		<Layout pageTitle={"Edit transaction"}>
			<EditTransactionForm />
		</Layout>
	);
};

export default EditTransaction;
