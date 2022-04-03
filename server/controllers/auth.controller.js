const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");
const { pool } = require("../db");
const { config } = require("dotenv");
config();

// I want the user be able to add, edit and remove all the categories
// So I need even the default categories to be linked to the user id
// I will create all the categories in this array when the user is created
const CATEGORIES = [
	"Food",
	"Salary",
	"Sport",
	"Shopping",
	"Travel",
	"Streaming",
	"Insurance",
	"Healthcare",
	"Bills",
	"GYM",
	"Clothes",
	"Education",
	"Gift",
	"Decoration",
	"Gaming",
];

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

	try {
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
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

exports.singup = async (req, res) => {
	const { firstName, lastName, email, password, avatar } = req.body;

	try {
		// Starting transaction
		await pool.query("BEGIN");

		// Check if the user already exists
		const existingUser = await pool.query(
			`
			SELECT email
			FROM app_user
			WHERE email = $1
			`,
			[email]
		);

		if (existingUser.rowCount) {
			return res.json({ isLoggedIn: false, message: "User already exists" });
		}

		// User does not exist, so let's create with a password hashed
		const hashedPass = await bcrypt.hash(password, 10);
		const newUserQuery = await pool.query(
			`
			INSERT INTO app_user (first_name, last_name, avatar, email, passhash)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id, email
			`,
			[firstName, lastName, avatar, email, hashedPass]
		);

		if (!newUserQuery.rowCount) {
			return res.json({ isLoggedIn: false, message: "Cannot create user" });
		}

		// The user was created, now we need to create their default categories
		CATEGORIES.map(async (category) => {
			await pool.query(
				`
				INSERT INTO category (name, slug, user_id)
				VALUES ($1, $2, $3)
				`,
				[category, slugify(category, { lower: true }), newUserQuery.rows[0].id]
			);
		});

		// The user and the categories were created, so we commit the transaction
		await pool.query("COMMIT");

		// Generating a token for the user
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
					id: newUserQuery.rows[0].id,
				});
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};
