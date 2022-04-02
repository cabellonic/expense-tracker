const express = require("express");

const router = express.Router();

// Controlers
const {
	getTransactionById,
	createTransaction,
	updateTransaction,
	deleteTransaction,
} = require("../controllers/transaction.controller");

router.get("/transaction/:transaction_id", getTransactionById);
router.post("/transaction", createTransaction);
router.put("/transaction/:transaction_id", updateTransaction);
router.delete("/transaction/:transaction_id", deleteTransaction);

module.exports = router;
