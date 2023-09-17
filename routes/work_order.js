const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post("/", controllers.workOrder.create);
router.get("/get", controllers.workOrder.getAll);
router.get("/status/:status", controllers.workOrder.getByStatus);
router.get("/:id", controllers.workOrder.getById);
router.put("/:id", controllers.workOrder.update);
router.post("/submit/:id", controllers.workOrder.submit);
module.exports = router;
