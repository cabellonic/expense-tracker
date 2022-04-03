const express = require("express");

const router = express.Router();

// Controlers
const {
	getCategoryBySlug,
	updateCategory,
	deleteCategory,
} = require("../controllers/category.controller.");

router.get("/category/:category_slug", getCategoryBySlug);
router.put("/category/:category_slug", updateCategory);
router.delete("/category/:category_slug", deleteCategory);

module.exports = router;
