const express = require("express");
const router = express.Router();
const auth = require("./auth");
const account = require("./account_list");

router.use("/auth", auth);
router.use("/accounts", account);
module.exports = router;
