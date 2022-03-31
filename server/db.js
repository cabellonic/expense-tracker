const { Pool } = require("pg");

const { config } = require("dotenv");
config();

console.log(process.env.DATABASE);

exports.pool = new Pool({
	user: process.env.USER,
	host: process.env.HOST,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
	port: process.env.PORT,
});
