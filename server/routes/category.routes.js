const express = require("express");

const router = express.Router();

// Controlers
const {
	getTransactionsByCategory,
	deleteCategory,
} = require("../controllers/category.controller.");

router.get("/category/:category", getTransactionsByCategory);
router.delete("/category/:category", deleteCategory);

module.exports = router;
