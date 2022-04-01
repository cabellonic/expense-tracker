const jwt = require("jsonwebtoken");
const { pool } = require("../db");
const { config } = require("dotenv");
config();

exports.getAllTransactions = async (req, res) => {
	res.status(200).json({ message: "All transactions" });
};

exports.getTransactionById = async (req, res) => {
	const { id } = req.params;
	res.status(200).json({ message: `Transaction of id ${id}` });
};

exports.createTransaction = async (req, res) => {
	const { amount, title, note, type, category, token } = req.body;

	// Get category id
	const categoryId = await pool.query(
		"SELECT id FROM category WHERE name = $1",
		[category]
	);
	if (!categoryId.rowCount)
		return res.status(400).json({ message: "Category not found" });

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Invalid token" });
		}

		// The token is valid so we can create the transaction
		const newTransaction = await pool.query(
			"INSERT INTO transaction (amount, title, note, type, created_at, category_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
			[amount, title, note, type, new Date(), categoryId.rows[0].id, decoded.id]
		);

		if (!newTransaction.rowCount) {
			return res.status(400).json({ message: "Error" });
		}

		res.status(201).json({
			message: "Transaction created",
			transaction: newTransaction.rows[0],
		});
	});
};

exports.updateTransaction = async (req, res) => {
	const { id } = req.params;

	res.status(200).json({ message: "Transaction updated successfully" });
};

exports.deleteTransaction = async (req, res) => {
	const { id } = req.params;

	res.status(200).json({ message: "Transaction deleted successfully" });
};
