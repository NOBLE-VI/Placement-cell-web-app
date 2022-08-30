const express = require("express");
const studentController = require("../controller/studentController");


const router = express.Router();


router.post("/create", studentController.createStudent);


module.exports = router;
