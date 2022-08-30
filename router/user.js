const express = require("express");
const passport= require("passport");

const userController = require("../controller/userController");

const router = express.Router();


router.get("/profile",passport.checkAuthentication, userController.profile);
router.get("/post", userController.post);
router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);
router.get("/sign-out", userController.destroySession);
router.post("/create", userController.create);


router.post("/create-session", passport.authenticate(
    "local",
    {failureRedirect: "/user/sign-in"},
), userController.createSession);



module.exports = router;
