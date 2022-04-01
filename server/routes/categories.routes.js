const express = require("express");

const router = express.Router();

// Controlers
const { getAllCategories } = require("../controllers/categories.controller");

router.get("/categories", getAllCategories);
// router.get("/categories/:id", getTransactionsByCategory);

module.exports = router;
