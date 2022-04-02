const express = require("express");

const router = express.Router();

// Controlers
const {
	getAllCategories,
	getAllUsedCategories,
} = require("../controllers/categories.controller");

router.get("/categories", getAllCategories);
router.get("/categories/used", getAllUsedCategories);

module.exports = router;
