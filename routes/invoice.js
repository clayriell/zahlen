const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/get", controller.invoice.getAll);
router.get("/", controller.invoice.getByNumber);
router.post("/", controller.invoice.payment);

module.exports = router;
