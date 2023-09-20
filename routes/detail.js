const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/:wo_id", controllers.detail.getByWoId);
router.post("/:wo_id", controllers.detail.addByWO);
router.put("/:id", controllers.detail.update);
router.delete("/:id", controllers.detail.delete);

module.exports = router;
