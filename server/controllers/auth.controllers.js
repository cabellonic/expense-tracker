const bcrypt = require("bcrypt");
const { pool } = require("../db");

exports.login = async (req, res) => {
	const { email, password } = req.body;

	const potentialLogin = await pool.query(
		"SELECT email, passhash FROM app_user WHERE email = $1",
		[email]
	);

	if (!potentialLogin.rowCount) {
		return res
			.status(401)
			.json({ loggedIn: false, message: "Invalid credentials" });
	}

	const isValid = await bcrypt.compare(
		password,
		potentialLogin.rows[0].passhash
	);

	if (!isValid) {
		return res
			.status(401)
			.json({ loggedIn: false, message: "Invalid credentials" });
	}

	console.log("user found!", potentialLogin.rows[0], isValid);

	res.json({ isLoggedIn: true, email: potentialLogin.rows[0].email });
};

exports.singup = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const existingUser = await pool.query(
		"SELECT email FROM app_user WHERE email = $1",
		[email]
	);

	if (existingUser.rowCount) {
		return res.json({ message: "User already exists" });
	}

	const hashedPass = await bcrypt.hash(password, 10);
	const newUserQuery = await pool.query(
		"INSERT INTO app_user (first_name, last_name, email, passhash) VALUES ($1, $2, $3, $4) RETURNING id, email",
		[firstName, lastName, email, hashedPass]
	);

	res.json({ isLoggedIn: true, email: newUserQuery.rows[0].email });
};
