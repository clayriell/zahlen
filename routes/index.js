const express = require("express");
const router = express.Router();
const auth = require("./auth");
const account = require("./account_list");
const workOrder = require("./work_order");
const wo_details = require("./wo_detail");
const invoice = require("./invoice");

router.use("/auth", auth);
router.use("/accounts", account);
router.use("/work-orders", workOrder);
router.use("/WO-details", wo_details);
router.use("/invoices", invoice);
module.exports = router;
