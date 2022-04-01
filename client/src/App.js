import { Router } from "@reach/router";
// Components
import Loading from "layout/Loading";
import HomePage from "pages/home/home";
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
import NotFoundPage from "pages/not-found/not-found";
// Hookes
import { useAuth } from "hook/use-auth";
// Context
import { AuthContext } from "context/AuthContext";
// Util
import { registerIcons } from "util/fontAwesome";
import Category from "pages/categories/id";
registerIcons();

const App = () => {
	const { isLoggedIn, token, userId, login, logout } = useAuth();

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, userToken: token, userId: userId, login, logout }}
		>
			{isLoggedIn === null ? (
				<Loading />
			) : (
				<Router>
					{isLoggedIn ? (
						<>
							<HomePage path="/home" />
							<ConfigPage path="/config" />
							<CategoriesPage path="/categories" />
							<Category path="/categories/:category_id" />
							<Transaction path="/transactions/:id" />
							<AllTransactions path="/transactions" />
							<Incomes path="/transactions/incomes" />
							<Expenses path="/transactions/expenses" />
							<AddIncome path="/add/income" />
							<AddExpense path="/add/expense" />
							<EditTransaction path="/edit/:id" />
						</>
					) : (
						<>
							<GuestHomePage path="/" />
							<LoginPage path="/login" />
							<SingupPage path="/singup" />
						</>
					)}
					<NotFoundPage default />
				</Router>
			)}
		</AuthContext.Provider>
	);
};

export default App;
