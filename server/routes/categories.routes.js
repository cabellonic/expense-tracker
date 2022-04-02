const express = require("express");

const router = express.Router();

// Controlers
const {
	getAllCategories,
	getTransactionsByCategory,
	getAllUsedCategories,
} = require("../controllers/categories.controller");

router.get("/categories", getAllCategories);
router.get("/categories/used", getAllUsedCategories);
router.get("/categories/:category", getTransactionsByCategory);

module.exports = router;
