const jwt = require("jsonwebtoken");
const { pool } = require("../db");

exports.getUser = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.status(401).json({ ok: false, message: "Invalid token" });
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
				res.status(404).json({ message: "No user found" });
			}

			res.json({ user: user.rows[0] });
		} catch (err) {
			res.status(500).json({ message: "Something went wrong" });
		}
	});
};
