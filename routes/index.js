const express = require("express");
const router = express.Router();
const auth = require("./auth");
const account = require("./account_list");
const workOrder = require("./work_order");
const wo_details = require("./wo_detail");

router.use("/auth", auth);
router.use("/accounts", account);
router.use("/work-orders", workOrder);
router.use("/WO-details", wo_details);

module.exports = router;
