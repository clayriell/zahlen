const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post("/", controllers.workOrder.create);
router.get("/get" , controllers.workOrder.getAll)

module.exports = router;
