const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const { clearParserCache } = require("mysql2");

router.get("/get", controller.invoice.getAll);
router.get("/" , controller.invoice.getByNumber)

module.exports = router;
