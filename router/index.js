const express = require("express");
const router = express.Router();

const homeController = require("../controller/homeController");

console.log("Main router running");


router.get("/", homeController.home);
router.use("/test", require("./test"));
router.use("/user", require("./user"));
router.use("/student", require("./student"));
router.use("/interview", require("./interview"));

module.exports = router;