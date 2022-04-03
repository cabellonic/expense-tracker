const { Pool } = require("pg");

const { config } = require("dotenv");
config();

const pool = new Pool({
	user: process.env.USER,
	host: process.env.HOST,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
	port: process.env.PORT,
	ssl: {
		rejectUnauthorized: false,
	},
});

pool.query(
	`
	CREATE TABLE IF NOT EXISTS app_user (
		id BIGSERIAL NOT NULL PRIMARY KEY,
		first_name VARCHAR(20) NOT NULL,
		last_name VARCHAR(20),
		avatar VARCHAR(255) NOT NULL,
		email VARCHAR(50) UNIQUE NOT NULL,
		passhash VARCHAR(255) NOT NULL,
		income NUMERIC(10,2) DEFAULT 0,
		expense NUMERIC(10,2) DEFAULT 0
	)
	`,
	(err, res) => {
		if (err) console.log(err);
	}
);
pool.query(
	`
	CREATE TABLE IF NOT EXISTS app_user (
		id BIGSERIAL NOT NULL PRIMARY KEY,
		first_name VARCHAR(20) NOT NULL,
		last_name VARCHAR(20),
		avatar VARCHAR(255) NOT NULL,
		email VARCHAR(50) UNIQUE NOT NULL,
		passhash VARCHAR(255) NOT NULL,
		income NUMERIC(10,2) DEFAULT 0,
		expense NUMERIC(10,2) DEFAULT 0
	)
	`,
	(err, res) => {
		if (err) console.log(err);
	}
);
pool.query(
	`
	CREATE TABLE IF NOT EXISTS category (
		id BIGSERIAL NOT NULL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		slug VARCHAR(255) NOT NULL,
		user_id BIGINT REFERENCES app_user (id) ON DELETE CASCADE
	);
	`,
	(err, res) => {
		if (err) console.log(err);
	}
);
pool.query(
	`
	CREATE TABLE IF NOT EXISTS transaction (
		id BIGSERIAL NOT NULL PRIMARY KEY,
		amount NUMERIC(10,2) NOT NULL,
		title VARCHAR(255) NOT NULL,
		note TEXT,
		type VARCHAR(255) NOT NULL,
		created_at TIMESTAMP,
		updated_at TIMESTAMP,
		category_id INTEGER REFERENCES category (id) ON DELETE CASCADE,
		user_id BIGINT REFERENCES app_user (id) ON DELETE CASCADE
	);
	`,
	(err, res) => {
		if (err) console.log(err);
	}
);

module.exports = {
	pool,
};
