const express = require("express");
const router = express.Router();
const auth = require("./auth");
const account = require("./account_list");
const workOrder = require("./work_order");
const detail = require("./detail");
const invoice = require("./invoice");

router.use("/auth", auth);
router.use("/accounts", account);
router.use("/work-orders", workOrder);
router.use("/details", detail);
router.use("/invoices", invoice);
module.exports = router;
