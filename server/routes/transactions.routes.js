const express = require("express");

const router = express.Router();

// Controlers
const {
	getAllTransactions,
	getTransactionsByCategory,
	getIncomeTransactions,
	getExpenseTransactions,
} = require("../controllers/transactions.controller");

router.get("/transactions/:page", getAllTransactions);
router.get("/transactions/incomes/:page", getIncomeTransactions);
router.get("/transactions/expenses/:page", getExpenseTransactions);
router.get(
	"/transactions/category/:category_slug/:page",
	getTransactionsByCategory
);

module.exports = router;
