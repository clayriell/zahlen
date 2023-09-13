const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post("/register", controllers.auth.register);
router.post("/login", controllers.auth.login);
router.get("/get", controllers.auth.getAll);
router.put("/reset-password", controllers.auth.resetPassword);
router.get("/", controllers.auth.search);
module.exports = router;
