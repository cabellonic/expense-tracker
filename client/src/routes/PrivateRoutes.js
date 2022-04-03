import { Redirect, Router } from "@reach/router";
// Pages
import HomePage from "pages/home/home";
// Configuration pages
import ConfigPage from "pages/config";
import ConfigCategories from "pages/config/categories";
import AddCategoryPage from "pages/config/categories/add";
import EditCategoryPage from "pages/config/categories/edit";
import EditUserPage from "pages/config/user";
// Categories page
import CategoriesPage from "pages/categories";
// Category page
import CategoryPage from "pages/category";
// Transaction page
import TransactionPage from "pages/transaction";
import EditTransaction from "pages/transaction/edit";
import AddIncome from "pages/transaction/add-income";
import AddExpense from "pages/transaction/add-expense";
// Transactions lists
import AllTransactions from "pages/transactions/all";
import Incomes from "pages/transactions/incomes";
import Expenses from "pages/transactions/expenses";
// Common page
import NotFoundPage from "pages/not-found/not-found";

const PrivateRoutes = () => {
	return (
		<Router>
			<HomePage path="/home" />

			<ConfigPage path="/config" />
			<EditUserPage path="/config/user" />
			<ConfigCategories path="/config/categories" />
			<AddCategoryPage path="/config/categories/add" />
			<EditCategoryPage path="/config/category/:category_id" />

			<CategoriesPage path="/categories" />
			<Redirect
				from="/category/:category_id"
				to="/category/:category_id/1"
				noThrow={true}
			/>
			<CategoryPage path="/category/:category_id/:page" />

			<TransactionPage path="/transaction/:transaction_id" />
			<AddIncome path="/add/income" />
			<AddExpense path="/add/expense" />
			<EditTransaction path="/edit/:transaction_id" />

			<Redirect from="/transactions" to="/transactions/1" noThrow={true} />
			<AllTransactions path="/transactions/:page" />
			<Redirect from="/incomes" to="/incomes/1" noThrow={true} />
			<Incomes path="/incomes/:page" />
			<Redirect from="/expenses" to="/expenses/1" noThrow={true} />
			<Expenses path="/expenses/:page" />

			<NotFoundPage default />
		</Router>
	);
};

export default PrivateRoutes;
