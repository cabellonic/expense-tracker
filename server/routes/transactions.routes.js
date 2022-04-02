const express = require("express");

const router = express.Router();

// Controlers
const {
	getAllTransactions,
	getTransactionById,
	createTransaction,
	updateTransaction,
	deleteTransaction,
	getIncomeTransactions,
	getExpenseTransactions,
} = require("../controllers/transactions.controller");

router.get("/transactions/:page", getAllTransactions);
router.get("/transactions/incomes/:page", getIncomeTransactions);
router.get("/transactions/expenses/:page", getExpenseTransactions);

router.get("/transaction/:transaction_id", getTransactionById);
router.post("/transaction", createTransaction);
router.put("/transaction/:transaction_id", updateTransaction);
router.delete("/transaction/:transaction_id", deleteTransaction);

module.exports = router;
