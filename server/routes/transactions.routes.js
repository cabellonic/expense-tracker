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
router.get("/transactions/:id", getTransactionById);
router.put("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;
