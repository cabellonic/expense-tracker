// Components
import Layout from "layout/Layout";
import AddTransactionForm from "./forms/AddTransactionForm";

const AddIncomePage = () => {
	return (
		<Layout pageTitle={"New transaction"}>
			<AddTransactionForm type="income" />
		</Layout>
	);
};

export default AddIncomePage;
