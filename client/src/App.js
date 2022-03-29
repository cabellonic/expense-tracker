import { Router } from "@reach/router";
// Components
import Home from "pages/home/home";
import Transaction from "pages/transactions/id";
import AllTransactions from "pages/transactions/all";
import Incomes from "pages/transactions/incomes";
import Expenses from "pages/transactions/expenses";
import AddIncome from "pages/add/income";
import AddExpense from "pages/add/expense";
import EditTransaction from "pages/edit/edit";
// Util
import { registerIcons } from "./util/fontAwesome";
registerIcons();

const App = () => {
	return (
		<Router>
			<Home path="/" />
			<Transaction path="/transactions/:id" />
			<AllTransactions path="/transactions" />
			<Incomes path="/transactions/incomes" />
			<Expenses path="/transactions/expenses" />
			<AddIncome path="/add/income" />
			<AddExpense path="/add/expense" />
			<EditTransaction path="/edit/:id" />
		</Router>
	);
};

export default App;
