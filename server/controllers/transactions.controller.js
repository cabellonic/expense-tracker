const jwt = require("jsonwebtoken");
const { pool } = require("../db");
const { config } = require("dotenv");
config();

const TRANSACTIONS_PER_PAGE = 10;

exports.getAllTransactions = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { page } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				ok: false,
				message: "Invalid token",
			});
		}

		// The token is valid, so we can get all the transactions
		try {
			const transactions = await pool.query(
				`
				SELECT transaction.id, title, note, amount, created_at, type,
					category.name AS category_name, category.slug AS category_slug, count(*) OVER() AS total_transactions
				FROM transaction, category
				WHERE transaction.category_id = category.id
				AND transaction.user_id = $1
				ORDER BY created_at
				DESC LIMIT $2
				OFFSET $3;
				`,
				[decoded.id, TRANSACTIONS_PER_PAGE, (page - 1) * TRANSACTIONS_PER_PAGE]
			);

			if (!transactions.rowCount) {
				// If we have no transactions and is the first page then was a valid request
				// Thats why we return ok: true
				if (page === 1) {
					return res.json({ ok: true, message: "No transactions" });
				}
				// But if is other page then we return ok: false
				return res.json({ ok: false, message: "No more transactions" });
			}

			const total_transactions = transactions.rows[0].total_transactions;
			const total_pages = Math.ceil(total_transactions / TRANSACTIONS_PER_PAGE);

			res.json({
				ok: true,
				transactions: transactions.rows,
				paginationInfo: {
					total_transactions,
					current_page: page,
					total_pages,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.getTransactionsByCategory = async (req, res) => {
	const token = req.headers["authorization"].split(" ")[1];
	const { category_slug, page } = req.params;

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
				category.name AS category_name, category.slug AS category_slug, count(*) OVER() AS total_transactions
				FROM transaction, category
				WHERE transaction.user_id = $1
				AND category.slug = $2
				AND transaction.category_id = category.id
				ORDER BY created_at
				DESC LIMIT $3
				OFFSET $4;
				`,
				[
					decoded.id,
					category_slug,
					TRANSACTIONS_PER_PAGE,
					(page - 1) * TRANSACTIONS_PER_PAGE,
				]
			);

			if (!transactions.rowCount) {
				if (page === 1) {
					// If we have no transactions and is the first page then was a valid request
					// Thats why we return ok: true
					return res.json({ ok: true, message: "No expense transactions" });
				}
				// But if is other page then we return ok: false
				return res.json({ ok: false, message: "No more transactions" });
			}

			if (!transactions.rowCount) {
				return res.json({ ok: false, message: "Transaction not found" });
			}

			const total_transactions = transactions.rows[0].total_transactions;
			const total_pages = Math.ceil(total_transactions / TRANSACTIONS_PER_PAGE);

			res.status(200).json({
				ok: true,
				transactions: transactions.rows,
				paginationInfo: {
					total_transactions,
					current_page: page,
					total_pages,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.getIncomeTransactions = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { page } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "Invalid token" });
		}

		// The token is valid, so we can get all the income transactions
		try {
			const transactions = await pool.query(
				`
				SELECT transaction.id, title, note, amount, created_at, updated_at, type,
					category.name AS category_name, category.slug AS category_slug, count(*) OVER() AS total_transactions
				FROM transaction, category
				WHERE type='income'
				AND transaction.category_id = category.id
				AND transaction.user_id = $1
				ORDER BY created_at
				DESC LIMIT $2
				OFFSET $3;
				`,
				[decoded.id, TRANSACTIONS_PER_PAGE, (page - 1) * TRANSACTIONS_PER_PAGE]
			);

			if (!transactions.rowCount) {
				if (page === 1) {
					// If we have no transactions and is the first page then was a valid request
					// Thats why we return ok: true
					return res.json({ ok: true, message: "No expense transactions" });
				}
				// But if is other page then we return ok: false
				return res.json({ ok: false, message: "No more transactions" });
			}

			const total_transactions = transactions.rows[0].total_transactions;
			const total_pages = Math.ceil(total_transactions / TRANSACTIONS_PER_PAGE);

			res.json({
				ok: true,
				transactions: transactions.rows,
				paginationInfo: {
					total_transactions,
					current_page: page,
					total_pages,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.getExpenseTransactions = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { page } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "Invalid token" });
		}

		// The token is valid, so we can get all the expense transactions
		try {
			const transactions = await pool.query(
				`
				SELECT transaction.id, title, note, amount, created_at, updated_at, type,
					category.name AS category_name, category.slug AS category_slug, count(*) OVER() AS total_transactions
				FROM transaction, category
				WHERE type='expense'
				AND transaction.category_id = category.id
				AND transaction.user_id = $1
				ORDER BY created_at
				DESC LIMIT $2
				OFFSET $3;
				`,
				[decoded.id, TRANSACTIONS_PER_PAGE, (page - 1) * TRANSACTIONS_PER_PAGE]
			);

			if (!transactions.rowCount) {
				if (page === 1) {
					// If we have no transactions and is the first page then was a valid request
					// Thats why we return ok: true
					return res.json({ ok: true, message: "No expense transactions" });
				}
				// But if is other page then we return ok: false
				return res.json({ ok: false, message: "No more transactions" });
			}

			const total_transactions = transactions.rows[0].total_transactions;
			const total_pages = Math.ceil(total_transactions / TRANSACTIONS_PER_PAGE);

			res.json({
				ok: true,
				transactions: transactions.rows,
				paginationInfo: {
					total_transactions,
					current_page: page,
					total_pages,
				},
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};
