const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post("/create", controllers.account.create);
router.get("/get", controllers.account.getAll);
module.exports = router;
