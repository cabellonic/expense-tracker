const { pool } = require("../db");

exports.getAllCategories = async (req, res) => {
	try {
		const categories = await pool.query("SELECT * FROM category");
		if (!categories.rowCount) {
			res.status(404).json({ message: "No categories found" });
		}

		res.json(categories.rows);
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" });
	}
};
