const jwt = require("jsonwebtoken");
const { pool } = require("../db");
const { config } = require("dotenv");
config();

exports.getAllTransactions = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];

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
				SELECT transaction.id, title, note, amount, created_at, type,
					category.name AS category_name, category.slug AS category_slug
				FROM transaction, category
				WHERE transaction.category_id = category.id
				AND transaction.user_id = $1
				ORDER BY created_at
				DESC LIMIT 10;
				`,
				[decoded.id]
			);

			if (!transactions.rowCount) {
				return res.json({ message: "No transactions" });
			}

			res.json({ transactions: transactions.rows });
		} catch (err) {
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.getTransactionById = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { transaction_id } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				isLoggedIn: false,
				message: "Invalid token",
			});
		}

		try {
			const transaction = await pool.query(
				`
				SELECT transaction.id, title, note, amount, created_at, updated_at, type,
					category.name AS category_name, category.slug AS category_slug
				FROM transaction, category
				WHERE transaction.id = $1
				AND transaction.category_id = category.id
				AND transaction.user_id = $2
				`,
				[transaction_id, decoded.id]
			);

			if (!transaction.rowCount) {
				return res.json({ message: "Transaction not found" });
			}

			res.json({ transaction: transaction.rows[0] });
		} catch (err) {
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.getIncomeTransactions = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "Invalid token" });
		}
		try {
			const transactions = await pool.query(
				`
				SELECT transaction.id, title, note, amount, created_at, updated_at, type,
					category.name AS category_name, category.slug AS category_slug
				FROM transaction, category
				WHERE type='income'
				AND transaction.category_id = category.id
				AND transaction.user_id = $1
				ORDER BY created_at
				DESC LIMIT 10
				`,
				[decoded.id]
			);

			if (!transactions.rowCount) {
				return res.json({ message: "No income transactions" });
			}

			res.json({ transactions: transactions.rows });
		} catch (err) {
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.getExpenseTransactions = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "Invalid token" });
		}
		try {
			const transactions = await pool.query(
				`
				SELECT transaction.id, title, note, amount, created_at, updated_at, type,
					category.name AS category_name, category.slug AS category_slug
				FROM transaction, category
				WHERE type='expense'
				AND transaction.category_id = category.id
				AND transaction.user_id = $1
				ORDER BY created_at
				DESC LIMIT 10
				`,
				[decoded.id]
			);
			if (!transactions.rowCount) {
				return res.json({ message: "No expense transactions" });
			}
			res.json({ transactions: transactions.rows });
		} catch (err) {
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.createTransaction = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { amount, title, note, type, category } = req.body;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "Invalid token" });
		}

		try {
			const categoryId = await pool.query(
				`
				SELECT id
				FROM category
				WHERE slug = $1
				AND user_id = $2
				`,
				[category, decoded.id]
			);

			if (!categoryId.rowCount) {
				return res.json({ ok: false, message: "Category not found" });
			}

			// The token is valid so we can create the transaction
			const newTransaction = await pool.query(
				`
				INSERT INTO transaction
				(amount, title, note, type, created_at, category_id, user_id)
				VALUES
				($1, $2, $3, $4, $5, $6, $7)
				RETURNING *
				`,
				[
					amount,
					title,
					note,
					type,
					new Date(),
					categoryId.rows[0].id,
					decoded.id,
				]
			);

			if (!newTransaction.rowCount) {
				return res.json({ ok: false, message: "Error" });
			}

			res.status(201).json({
				ok: true,
				transaction: newTransaction.rows[0],
			});
		} catch (err) {
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.updateTransaction = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { transaction_id } = req.params;
	const { amount, title, note, category } = req.body;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "Invalid token" });
		}

		try {
			// Get category id
			const categoryId = await pool.query(
				`
				SELECT id
				FROM category
				WHERE slug = $1
				`,
				[category]
			);

			if (!categoryId.rowCount) {
				return res.json({ ok: false, message: "Category not found" });
			}

			// The token is valid so we can update the transaction
			const updatedTransaction = await pool.query(
				`
				UPDATE transaction
				SET amount = $1,
					title = $2,
					note = $3,
					category_id = $4,
					updated_at = $5
				WHERE id = $6
				AND user_id = $7
				`,
				[
					amount,
					title,
					note,
					categoryId.rows[0].id,
					new Date(),
					transaction_id,
					decoded.id,
				]
			);

			if (!updatedTransaction.rowCount) {
				return res.json({ ok: false, message: "Error" });
			}

			res.status(201).json({
				ok: true,
				transaction_id,
			});
		} catch (err) {
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.deleteTransaction = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { transaction_id } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "You do not have permission" });
		}

		try {
			const deletedTransaction = await pool.query(
				`
				DELETE FROM transaction
				WHERE id = $1
				AND user_id = $2
				`,
				[transaction_id, decoded.id]
			);

			if (!deletedTransaction.rowCount) {
				return res.json({
					ok: false,
					message: "The transaction does not exist",
				});
			}

			res.status(201).json({
				ok: true,
				transaction_id,
			});
		} catch (err) {
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};
