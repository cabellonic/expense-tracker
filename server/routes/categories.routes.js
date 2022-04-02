const express = require("express");

const router = express.Router();

// Controlers
const {
	getAllCategories,
	getTransactionsByCategory,
	getAllUsedCategories,
	deleteCategory,
} = require("../controllers/categories.controller");

router.get("/categories", getAllCategories);
router.get("/categories/used", getAllUsedCategories);

router.get("/categories/:category", getTransactionsByCategory);
router.delete("/categories/:category", deleteCategory);

module.exports = router;
