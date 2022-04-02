const jwt = require("jsonwebtoken");
const { pool } = require("../db");
const { config } = require("dotenv");
config();

exports.getAllTransactions = async (req, res) => {
	const transactions = await pool.query(`
	SELECT transaction.id, title, note, amount, created_at, type,
		category.name AS category_name, category.slug AS category_slug
	FROM transaction, category
	WHERE transaction.category_id = category.id
	ORDER BY created_at
	DESC LIMIT 10;
	`);
	if (!transactions.rowCount) {
		return res.json({ message: "No transactions" });
	}
	res.status(200).json({ transactions: transactions.rows });
};

exports.getTransactionById = async (req, res) => {
	const { id } = req.params;
	const transaction = await pool.query(
		`
		SELECT transaction.id, title, note, amount, created_at, updated_at, type,
			category.name AS category_name, category.slug AS category_slug
		FROM transaction, category
		WHERE transaction.id=$1
		AND transaction.category_id = category.id
		`,
		[id]
	);
	if (!transaction.rowCount) {
		return res.status(404).json({ message: "Transaction not found" });
	}
	res.status(200).json({ transaction: transaction.rows[0] });
};

exports.getIncomeTransactions = async (req, res) => {
	const transactions = await pool.query(
		`
		SELECT transaction.id, title, note, amount, created_at, updated_at, type,
			category.name AS category_name, category.slug AS category_slug
		FROM transaction, category
		WHERE type='income'
		AND transaction.category_id = category.id
		ORDER BY created_at
		DESC LIMIT 10
		`
	);
	if (!transactions.rowCount) {
		return res.json({ message: "No income transactions" });
	}
	res.status(200).json({ transactions: transactions.rows });
};

exports.getExpenseTransactions = async (req, res) => {
	const transactions = await pool.query(
		`
		SELECT transaction.id, title, note, amount, created_at, updated_at, type,
			category.name AS category_name, category.slug AS category_slug
		FROM transaction, category WHERE type='expense'
		AND transaction.category_id = category.id
		ORDER BY created_at
		DESC LIMIT 10
		`
	);
	if (!transactions.rowCount) {
		return res.json({ message: "No expense transactions" });
	}
	res.status(200).json({ transactions: transactions.rows });
};

exports.createTransaction = async (req, res) => {
	const { amount, title, note, type, category, token } = req.body;

	// Get category id
	const categoryId = await pool.query(
		`
		SELECT id
		FROM category
		WHERE name = $1
		`,
		[category]
	);

	if (!categoryId.rowCount)
		return res.status(400).json({ ok: false, message: "Category not found" });

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.status(401).json({ ok: false, message: "Invalid token" });
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
			[amount, title, note, type, new Date(), categoryId.rows[0].id, decoded.id]
		);

		if (!newTransaction.rowCount) {
			return res.status(400).json({ ok: false, message: "Error" });
		}

		res.status(201).json({
			ok: true,
			transaction: newTransaction.rows[0],
		});
	});
};

exports.updateTransaction = async (req, res) => {
	const { id } = req.params;
	const { amount, title, note, category, token } = req.body;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.status(401).json({ ok: false, message: "Invalid token" });
		}

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
			return res.status(400).json({ ok: false, message: "Category not found" });
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
			[amount, title, note, categoryId.rows[0].id, new Date(), id, decoded.id]
		);

		if (!updatedTransaction.rowCount) {
			return res.status(400).json({ ok: false, message: "Error" });
		}

		res.status(201).json({
			ok: true,
			transaction_id: id,
		});
	});
};

exports.deleteTransaction = async (req, res) => {
	const { id } = req.params;

	res.status(200).json({ message: "Transaction deleted successfully" });
};
