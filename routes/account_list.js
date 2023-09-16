const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post("/", controllers.account.create);
router.get("/get", controllers.account.getAll);
router.put("/:code", controllers.account.update);
router.delete("/:code", controllers.account.delete);
router.get("/parent/:parent_code", controllers.account.getByParent);

module.exports = router;
