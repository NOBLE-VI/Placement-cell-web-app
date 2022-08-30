const express = require("express");
const interviewController = require("../controller/interviewController");
const passport= require("passport");


const router = express.Router();


router.get("/home", interviewController.home);
router.post("/create", passport.checkAuthentication, interviewController.createInterview);
router.get("/download", passport.checkAuthentication, interviewController.download);



module.exports = router;

