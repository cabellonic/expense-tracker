const express = require("express");

const router = express.Router();

const { login, singup } = require("../controllers/auth.controllers");

router.post("/login", login);
router.post("/singup", singup);

module.exports = router;
