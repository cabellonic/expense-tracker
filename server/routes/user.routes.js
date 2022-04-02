const express = require("express");

const router = express.Router();

// Controlers
const { getUser, updateUser } = require("../controllers/user.controller");

router.get("/user", getUser);
router.put("/user", updateUser);

module.exports = router;
