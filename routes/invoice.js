const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const { clearParserCache } = require("mysql2");

router.get("/get", controller.invoice.getAll);

module.exports = router;
