const express = require("express");

const router = express.Router();

const {
	login,
	singup,
	handleLogin,
} = require("../controllers/auth.controller");

router.get("/login", handleLogin);
router.post("/login", login);
router.post("/singup", singup);

module.exports = router;
