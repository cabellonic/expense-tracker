const jwt = require("jsonwebtoken");
const { pool } = require("../db");
const { config } = require("dotenv");
config();

const TRANSACTIONS_PER_PAGE = 10;

exports.getTransactionById = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { transaction_id } = req.params;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({
				ok: false,
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
				if (page === 1) {
					return res.json({ ok: true, message: "No transactions" });
				}
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
					return res.json({ ok: true, message: "No expense transactions" });
				}
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
					return res.json({ ok: true, message: "No expense transactions" });
				}
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

exports.createTransaction = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { amount, title, note, type, category } = req.body;

	if (amount.length > 10) {
		return res.json({
			ok: false,
			message: "That's too much, don't you think?",
		});
	}

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "Invalid token" });
		}

		try {
			// STARTING THE TRANSACTION
			await pool.query("BEGIN");
			// GETTING THE CATEGORY ID
			const categoryId = await pool.query(
				`
				SELECT id
				FROM category
				WHERE slug = $1
				AND user_id = $2
				`,
				[category, decoded.id]
			);

			// UPDATING USER BALANCE
			if (type === "expense") {
				await pool.query(
					`
					UPDATE app_user
					SET expense = expense - $1
					WHERE id = $2
				`,
					[amount, decoded.id]
				);
			} else {
				await pool.query(
					`
					UPDATE app_user
					SET income = income + $1
					WHERE id = $2
				`,
					[amount, decoded.id]
				);
			}

			// INSERTING THE NEW TRANSACTION
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

			// ENDING THE TRANSACTION
			await pool.query("COMMIT");

			if (!newTransaction.rowCount) {
				return res.json({ ok: false, message: "Error" });
			}

			res.status(201).json({
				ok: true,
				transaction: newTransaction.rows[0],
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				ok: false,
				message: "Something went wrong, please try again later.",
			});
		}
	});
};

exports.updateTransaction = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { transaction_id } = req.params;
	const { amount, title, note, category, type } = req.body;

	if (amount.length > 10) {
		return res.json({
			ok: false,
			message: "That's too much, don't you think?",
		});
	}

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "Invalid token" });
		}

		try {
			// STARTING THE TRANSACTION
			await pool.query("BEGIN");

			// GETTING THE CATEGORY ID
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

			// GETTING THE TRANSACTION
			const transaction = await pool.query(
				`
				SELECT amount, type
				FROM transaction, category
				WHERE transaction.id = $1
				AND transaction.category_id = category.id
				AND transaction.user_id = $2
				`,
				[transaction_id, decoded.id]
			);

			// First I verify if the transaction exists
			if (!transaction.rowCount)
				return res.json({ ok: false, message: "Transaction not found" });

			// Now If the type is different I dont update
			if (transaction.rows[0].type !== type)
				return res.json({
					ok: false,
					message: "Cannot update transaction type",
				});

			// I get the old transaction amount
			const oldAmount = transaction.rows[0].amount;

			// And now I update the user balance
			if (type === "expense") {
				const updatedAmount = Math.abs(oldAmount) - parseFloat(amount);
				await pool.query(
					`
					UPDATE app_user
					SET expense = expense + $1
					WHERE id = $2
				`,
					[updatedAmount, decoded.id]
				);
			} else {
				const updatedAmount = -Math.abs(oldAmount) + parseFloat(amount);
				await pool.query(
					`
				UPDATE app_user
				SET income = income + $1
				WHERE id = $2
			`,
					[updatedAmount, decoded.id]
				);
			}

			// Now I can update the transaction
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

			// ENDING THE TRANSACTION
			await pool.query("COMMIT");

			res.status(201).json({
				ok: true,
				transaction_id,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.deleteTransaction = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { transaction_id } = req.params;
	const { amount, type } = req.body;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "You do not have permission" });
		}

		try {
			// STARTING THE TRANSACTION
			await pool.query("BEGIN");

			// DELETING THE TRANSACTION
			await pool.query(
				`
				DELETE FROM transaction
				WHERE id = $1
				AND user_id = $2
				`,
				[transaction_id, decoded.id]
			);

			// UPDATING USER BALANCE
			// The operation will be the inverse of the one done in the insert
			if (type === "expense") {
				await pool.query(
					`
					UPDATE app_user
					SET expense = expense + $1
					WHERE id = $2
				`,
					[amount, decoded.id]
				);
			} else {
				await pool.query(
					`
					UPDATE app_user
					SET income = income - $1
					WHERE id = $2
				`,
					[amount, decoded.id]
				);
			}

			// ENDING THE TRANSACTION
			await pool.query("COMMIT");

			res.status(201).json({
				ok: true,
				transaction_id,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};
