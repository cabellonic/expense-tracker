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

router.get("/transactions", getAllTransactions);
router.post("/transactions", createTransaction);
router.get("/transactions/incomes", getIncomeTransactions);
router.get("/transactions/expenses", getExpenseTransactions);
router.get("/transactions/:transaction_id", getTransactionById);
router.put("/transactions/:transaction_id", updateTransaction);
router.delete("/transactions/:transaction_id", deleteTransaction);

module.exports = router;
