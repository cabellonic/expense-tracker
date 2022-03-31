import { Router } from "@reach/router";
// Components
import Home from "pages/home/home";
// GuestHomePage will be the default page for not logged in users
// But for now I will render it in the /guest route
import GuestHomePage from "pages/home/guest";
import ConfigPage from "pages/config/config";
import SingupPage from "pages/auth/singup";
import LoginPage from "pages/auth/login";
import CategoriesPage from "pages/categories/categories";
import Transaction from "pages/transactions/id";
import AllTransactions from "pages/transactions/all";
import Incomes from "pages/transactions/incomes";
import Expenses from "pages/transactions/expenses";
import AddIncome from "pages/add/income";
import AddExpense from "pages/add/expense";
import EditTransaction from "pages/edit/edit";
// Hookes
import { useAuth } from "hook/use-auth";
// Context
import { AuthContext } from "context/AuthContext";
// Util
import { registerIcons } from "util/fontAwesome";
registerIcons();

const App = () => {
	const { isLoggedIn, userToken, login, singout } = useAuth();
	return (
		<AuthContext.Provider value={{ isLoggedIn, userToken, login, singout }}>
			<Router>
				<Home path="/" />
				<GuestHomePage path="/guest" />
				<LoginPage path="/login" />
				<SingupPage path="/singup" />
				<ConfigPage path="/config" />
				<CategoriesPage path="/categories" />
				<Transaction path="/transactions/:id" />
				<AllTransactions path="/transactions" />
				<Incomes path="/transactions/incomes" />
				<Expenses path="/transactions/expenses" />
				<AddIncome path="/add/income" />
				<AddExpense path="/add/expense" />
				<EditTransaction path="/edit/:id" />
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
