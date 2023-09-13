const express = require("express");
const router = express.Router();
const auth = require("./auth");
const account = require("./accountList");

router.use("/auth", auth);
router.use("/account", account);
module.exports = router;
