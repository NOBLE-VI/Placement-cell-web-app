const express = require("express");
const testController = require("../controller/testController");
const router = express.Router();


router.get("/profile", testController.profile);
router.get("/post", testController.post);


module.exports = router;