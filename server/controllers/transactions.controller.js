const { pool } = require("../db");

exports.getAllTransactions = async (req, res) => {
	res.status(200).json({ message: "All transactions" });
};

exports.getTransactionById = async (req, res) => {
	const { id } = req.params;
	res.status(200).json({ message: `Transaction of id ${id}` });
};

exports.createTransaction = async (req, res) => {
	res.status(200).json({ message: "Transaction created successfully" });
};

exports.updateTransaction = async (req, res) => {
	const { id } = req.params;

	res.status(200).json({ message: "Transaction updated successfully" });
};

exports.deleteTransaction = async (req, res) => {
	const { id } = req.params;

	res.status(200).json({ message: "Transaction deleted successfully" });
};
