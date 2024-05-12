const express = require("express");
const { login, signup, sendMoney, createUser } = require("../controllers/auth");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendmoney", sendMoney);
router.get("/createuser", createUser);
module.exports = router;
