const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../../db");
const { config } = require("dotenv");
config();

exports.handleLogin = async (req, res) => {
	const token = req.headers["authorization"]?.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.json({
				isLoggedIn: false,
				message: "Invalid token",
			});
		}

		// We got a valid token so we keep the user's session
		return res.json({
			isLoggedIn: true,
			token,
			email: decoded.email,
			userId: decoded.id,
			expirationDate: decoded.exp,
		});
	});
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	// We try to get the user from the database
	const potentialLogin = await pool.query(
		`
		SELECT email, passhash, id
		FROM app_user
		WHERE email = $1
		`,
		[email]
	);

	if (!potentialLogin.rowCount) {
		return res
			.status(401)
			.json({ isLoggedIn: false, message: "Invalid credentials" });
	}

	// We got an user so we compare the provided password with the one in the database
	const isValid = await bcrypt.compare(
		password,
		potentialLogin.rows[0].passhash
	);

	if (!isValid) {
		return res
			.status(401)
			.json({ isLoggedIn: false, message: "Invalid credentials" });
	}

	// We got a valid user so we create a token
	jwt.sign(
		{
			email: potentialLogin.rows[0].email,
			id: potentialLogin.rows[0].id,
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
				email: potentialLogin.rows[0].email,
				userId: potentialLogin.rows[0].id,
			});
		}
	);
};
