const jwt = require("jsonwebtoken");
const { pool } = require("../db");
const slugify = require("slugify");

exports.getCategoryBySlug = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];
	const { category_slug } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				ok: false,
				message: "Invalid token",
			});
		}

		// The token is valid, so we can now query the database
		try {
			const category = await pool.query(
				`
				SELECT *
				FROM category
				WHERE category.slug = $1
				AND category.user_id = $2
				`,
				[category_slug, decoded.id]
			);

			if (!category.rowCount) {
				return res.json({ ok: false, message: "Transaction not found" });
			}

			res.status(200).json({ ok: true, category: category.rows[0] });
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.createCategory = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];
	const { name } = req.body;
	const slug = slugify(name, { lower: true });

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				ok: false,
				message: "Invalid token",
			});
		}

		// The token is valid, so we can now query the database
		try {
			const category = await pool.query(
				`
				INSERT INTO category (name, slug, user_id)
				VALUES ($1, $2, $3)
				ON CONFLICT (slug)
				DO NOTHING
				RETURNING *
				`,
				[name, slug, decoded.id]
			);

			// If the category already exists, we don't create it
			if (!category.rowCount) {
				return res.json({ ok: false, message: "That category already exist!" });
			}

			res.status(200).json({ ok: true, category: category.rows[0] });
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.updateCategory = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];
	const { category_slug } = req.params;
	const { name } = req.body;
	const slug = slugify(name, { lower: true });

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				ok: false,
				message: "Invalid token",
			});
		}

		// The token is valid, so we can update the category
		try {
			const updatedCategory = await pool.query(
				`
				UPDATE category
				SET name = $1,
					slug = $2
				WHERE category.slug = $3
				AND category.user_id = $4
				RETURNING *
				`,
				[name, slug, category_slug, decoded.id]
			);

			if (!updatedCategory.rowCount) {
				return res.json({ ok: false, message: "Category not found" });
			}

			res.status(200).json({ ok: true, category: updatedCategory.rows[0] });
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.deleteCategory = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];
	const { category_slug } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				ok: false,
				message: "Invalid token",
			});
		}

		// The token is valid, so we can now delete the category from the database
		try {
			// If the category has transactions, we can't delete it
			const transactions = await pool.query(
				`
				SELECT category.* 
				FROM category
				LEFT JOIN transaction
				ON category.id = transaction.category_id
				WHERE category.slug = $1
				AND transaction.user_id = $2
				`,
				[category_slug, decoded.id]
			);

			if (transactions.rowCount) {
				return res.json({
					ok: false,
					message: "You can't delete a category that has transactions",
				});
			}

			const deletedCategory = await pool.query(
				`
				DELETE FROM category
				WHERE category.slug = $1
				AND category.user_id = $2
				RETURNING category.slug
				`,
				[category_slug, decoded.id]
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
