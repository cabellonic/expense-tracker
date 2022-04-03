const jwt = require("jsonwebtoken");
const { pool } = require("../db");
const { config } = require("dotenv");
config();

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

		// The token is valid, so we can get the transaction
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
				return res
					.status(404)
					.json({ ok: false, message: "Transaction not found" });
			}

			res.json({ ok: true, transaction: transaction.rows[0] });
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Error" });
		}
	});
};

exports.createTransaction = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { amount, title, note, type, category } = req.body;

	// If length is bigger than 10 the database will throw an error
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

		// The token is valid, so we can create the transaction
		try {
			// Starting with the transaction
			await pool.query("BEGIN");

			// We get the category id
			const categoryId = await pool.query(
				`
				SELECT id
				FROM category
				WHERE slug = $1
				AND user_id = $2
				`,
				[category, decoded.id]
			);

			// Updating the user balance
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

			// Inserting the new transaction
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

			// Check if the transaction was created successfully
			if (!newTransaction.rowCount) {
				return res.json({ ok: false, message: "Error" });
			}

			// All go well, we commit the transaction
			await pool.query("COMMIT");

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

	// If length is bigger than 10 the database will throw an error
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

		// The token is valid, so we can update the transaction
		try {
			// Starting with the transaction
			await pool.query("BEGIN");

			// We get the new category id
			const newCategoryId = await pool.query(
				`
				SELECT id
				FROM category
				WHERE slug = $1
				AND user_id = $2
				`,
				[category, decoded.id]
			);

			if (!newCategoryId.rowCount) {
				return res.json({ ok: false, message: "Category not found" });
			}

			// Getting the transaction
			const transaction = await pool.query(
				`
				SELECT amount, type
				FROM transaction
				WHERE transaction.id = $1
				AND transaction.user_id = $2
				`,
				[transaction_id, decoded.id]
			);

			// First I verify if the transaction exists
			if (!transaction.rowCount) {
				return res.json({ ok: false, message: "Transaction not found" });
			}

			// Now check If the type is different, If it is I don't want to update
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
					newCategoryId.rows[0].id,
					new Date(),
					transaction_id,
					decoded.id,
				]
			);

			if (!updatedTransaction.rowCount) {
				return res.json({ ok: false, message: "Error" });
			}

			// All go well, we commit the transaction
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

		// The token is valid, so we can delete the transaction
		try {
			// Starting with the transaction
			await pool.query("BEGIN");

			// Deleting the transaction
			await pool.query(
				`
				DELETE FROM transaction
				WHERE id = $1
				AND user_id = $2
				`,
				[transaction_id, decoded.id]
			);

			// Updating the user balance
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

			// All go well, we commit the transaction
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
