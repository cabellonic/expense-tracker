const express = require("express");

const router = express.Router();

// Controlers
const {
	getAllCategories,
	getTransactionsByCategory,
} = require("../controllers/categories.controller");

router.get("/categories", getAllCategories);
router.get("/categories/:category", getTransactionsByCategory);

module.exports = router;
