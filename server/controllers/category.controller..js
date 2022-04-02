const jwt = require("jsonwebtoken");
const { pool } = require("../db");

exports.getTransactionsByCategory = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];
	const { category } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				ok: false,
				message: "Invalid token",
			});
		}

		// The token is valid, so we can now query the database
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
				return res.json({ ok: false, message: "Transaction not found" });
			}

			res.status(200).json({ ok: true, transactions: transactions.rows });
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.deleteCategory = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];
	const { category } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				ok: false,
				message: "Invalid token",
			});
		}

		// The token is valid, so we can now delete the category from the database
		try {
			const deletedCategory = await pool.query(
				`
				DELETE FROM category
				WHERE category.slug = $1
				AND category.user_id = $2
				RETURNING category.slug
				`,
				[category, decoded.id]
			);

			if (!deletedCategory.rowCount) {
				return res.status(404).json({ message: "Category not found" });
			}

			res.json({ ok: true, message: "Category deleted!" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};
