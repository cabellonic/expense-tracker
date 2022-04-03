const jwt = require("jsonwebtoken");
const { pool } = require("../db");

exports.getUser = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "Invalid token" });
		}

		// The token is valid, so we can get the user from the database
		try {
			const user = await pool.query(
				`
                SELECT id, first_name, last_name, avatar, email, expense, income 
                FROM app_user
                WHERE id = $1
                `,
				[decoded.id]
			);

			if (!user.rowCount) {
				res.status(404).json({ ok: false, mmessage: "No user found" });
			}

			res.json({ ok: true, user: user.rows[0] });
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Something went wrong" });
		}
	});
};

exports.updateUser = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { firstName, lastName, avatar } = req.body;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.status(401).json({ ok: false, message: "Invalid token" });
		}

		// The token is valid, so we can update the user in the database
		try {
			await pool.query(
				`
                UPDATE app_user
                SET first_name = $1,
                    last_name = $2,
					avatar = $3
                WHERE id = $4
                `,
				[firstName, lastName, avatar, decoded.id]
			);

			res.json({ ok: true, message: "User information updated!" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Something went wrong" });
		}
	});
};

exports.deleteUser = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res
				.status(401)
				.json({ ok: false, message: "You have no power here!" });
		}

		// The token is valid, so we can delete the user from the database
		try {
			await pool.query(
				`
                DELETE FROM app_user
                WHERE id = $1
                `,
				[decoded.id]
			);

			res.json({ ok: true, message: "User deleted!" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, message: "Something went wrong" });
		}
	});
};
