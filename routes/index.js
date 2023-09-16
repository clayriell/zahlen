const express = require("express");
const router = express.Router();
const auth = require("./auth");
const account = require("./account_list");
const workOrder = require("./work_order")

router.use("/auth", auth);
router.use("/accounts", account);
router.use("/work-orders" , workOrder )
module.exports = router;

