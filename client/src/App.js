import { Router } from "@reach/router";
// Components
import Home from "./pages/home/home";
import AllTransactions from "./pages/transactions/all";
import Incomes from "./pages/transactions/incomes";
import Expenses from "./pages/transactions/expenses";
import AddIncome from "./pages/add/income";
import AddExpense from "./pages/add/expense";
import EditTransaction from "pages/edit/edit";
// Util
import { registerIcons } from "./util/fontAwesome";
registerIcons();

function App() {
	return (
		<Router>
			<Home path="/" />
			<AllTransactions path="/transactions" />
			<Incomes path="/transactions/incomes" />
			<Expenses path="/transactions/expenses" />
			<AddIncome path="/add/income" />
			<AddExpense path="/add/expense" />
			<EditTransaction path="/edit" />
		</Router>
	);
}

export default App;
