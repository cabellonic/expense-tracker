const express = require("express");

const router = express.Router();

// Controlers
const {
	getUser,
	updateUser,
	deleteUser,
} = require("../controllers/user.controller");

router.get("/user", getUser);
router.put("/user", updateUser);
router.delete("/user", deleteUser);

module.exports = router;
