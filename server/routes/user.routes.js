const express = require("express");

const router = express.Router();

// Controlers
const { getUser } = require("../controllers/user.controller");

router.get("/user", getUser);

module.exports = router;
