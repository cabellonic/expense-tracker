const jwt = require("jsonwebtoken");
const { pool } = require("../db");

exports.getUser = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.json({ ok: false, message: "Invalid token" });
		}

		try {
			const user = await pool.query(
				`
                SELECT *
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
			res.status(500).json({ ok: false, message: "Something went wrong" });
		}
	});
};

exports.updateUser = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	const { firstName, lastName } = req.body;

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.status(401).json({ ok: false, message: "Invalid token" });
		}

		try {
			await pool.query(
				`
                UPDATE app_user
                SET first_name = $1,
                    last_name = $2
                WHERE id = $3
                `,
				[firstName, lastName, decoded.id]
			);

			res.json({ ok: true, message: "User information updated!" });
		} catch (err) {
			res.status(500).json({ ok: false, message: "Something went wrong" });
		}
	});
};
