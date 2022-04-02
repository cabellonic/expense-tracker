const jwt = require("jsonwebtoken");
const { pool } = require("../db");

exports.getAllCategories = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				ok: false,
				message: "Invalid token",
			});
		}

		try {
			// The token is valid so lets select the categories from the database
			const categories = await pool.query(
				`
				SELECT *
				FROM category
				WHERE category.user_id = $1
				`,
				[decoded.id]
			);

			// I'll return the categories even if there are no one cause the user can delete all if they want
			return res.json({ ok: true, categories: categories.rows });
		} catch (err) {
			console.log(err);
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
				ok: false,
				message: "Invalid token",
			});
		}

		// I'll get all used the categories from the database
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
			console.log(err);
			return res
				.status(500)
				.json({ ok: false, message: "Something went wrong" });
		}
	});
};
