const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../../db");
const { config } = require("dotenv");
config();

exports.singup = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	// Check if the user already exists
	const existingUser = await pool.query(
		"SELECT email FROM app_user WHERE email = $1",
		[email]
	);

	if (existingUser.rowCount) {
		return res.json({ message: "User already exists" });
	}

	// User does not exist, so let's create with a password hashed
	const hashedPass = await bcrypt.hash(password, 10);
	const newUserQuery = await pool.query(
		"INSERT INTO app_user (first_name, last_name, email, passhash) VALUES ($1, $2, $3, $4) RETURNING id, email",
		[firstName, lastName, email, hashedPass]
	);

	// Generate a token for the user
	jwt.sign(
		{
			email: newUserQuery.rows[0].email,
			id: newUserQuery.rows[0].id,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "1h" },
		(err, token) => {
			if (err) {
				return res.status(500).json({
					isLoggedIn: false,
					message: "Internal server error",
				});
			}
			// Send the token to the client
			res.json({
				isLoggedIn: true,
				token,
				email: newUserQuery.rows[0].email,
			});
		}
	);
};
