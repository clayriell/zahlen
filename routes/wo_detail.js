const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/:wo_id", controllers.WO_Details.getByWoId);
router.post("/:wo_id", controllers.WO_Details.create);
router.put("/:id", controllers.WO_Details.update);
router.delete("/:id", controllers.WO_Details.delete);

module.exports = router;
