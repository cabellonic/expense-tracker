const { pool } = require("../db");

exports.getAllCategories = async (req, res) => {
	try {
		const categories = await pool.query("SELECT * FROM category");
		if (!categories.rowCount) {
			res.status(404).json({ message: "No categories found" });
		}
		res.json(categories.rows);
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

exports.getTransactionsByCategory = async (req, res) => {
	const { category } = req.params;
	const transactions = await pool.query(
		"SELECT transaction.id, title, note, amount, created_at, updated_at, type, category.name AS category_name, category.slug AS category_slug FROM transaction, category WHERE category.slug=$1 AND transaction.category_id = category.id",
		[category]
	);
	if (!transactions.rowCount) {
		return res.status(404).json({ message: "Transaction not found" });
	}
	res.status(200).json({ transactions: transactions.rows });
};
