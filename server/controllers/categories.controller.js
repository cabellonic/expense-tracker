const jwt = require("jsonwebtoken");
const { pool } = require("../db");

exports.getAllCategories = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];
	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				isLoggedIn: false,
				message: "Invalid token",
			});
		}

		try {
			const categories = await pool.query(
				`
				SELECT *
				FROM category
				WHERE category.user_id = $1
				`,
				[decoded.id]
			);

			// I'll return the categories even if there are no one
			return res.json({ ok: true, categories: categories.rows });
		} catch (err) {
			return res
				.status(500)
				.json({ ok: false, message: "Something went wrong" });
		}
	});
};

// Instead of using the above query and getting all the categories created by the user and filtering them in the frontend
// I prefered to get all the categories filtered directly from the database
exports.getAllUsedCategories = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];
	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				isLoggedIn: false,
				message: "Invalid token",
			});
		}

		try {
			const categories = await pool.query(
				`
				SELECT category.*, count( transaction.category_id ) 
				FROM category
				LEFT JOIN transaction
				ON category.id = transaction.category_id
				WHERE transaction.user_id = $1
				GROUP BY category.id
				ORDER BY count DESC
				`,
				[decoded.id]
			);

			// I'll return the categories even if there are no one
			return res.json({ ok: true, categories: categories.rows });
		} catch (err) {
			return res
				.status(500)
				.json({ ok: false, message: "Something went wrong" });
		}
	});
};

exports.getTransactionsByCategory = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];
	const { category } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				isLoggedIn: false,
				message: "Invalid token",
			});
		}

		try {
			const transactions = await pool.query(
				`
				SELECT transaction.id, title, note, amount, created_at, updated_at, type,
				category.name AS category_name, category.slug AS category_slug
				FROM transaction, category
				WHERE category.slug=$1
				AND transaction.category_id = category.id
				AND transaction.user_id = $2
				ORDER BY created_at
				DESC LIMIT 10
				`,
				[category, decoded.id]
			);
			if (!transactions.rowCount) {
				return res.status(404).json({ message: "Transaction not found" });
			}
			res.status(200).json({ transactions: transactions.rows });
		} catch (err) {
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};
