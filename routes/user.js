const express = require("express");
const router = express.Router();
const User= require("../models/user.js");
const wrapAsyc = require("../utils/wrapAsyc");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");


router.get("/signup",userController.renderSignup);


router.post("/signup", wrapAsyc(userController.signup));



router.get("/login", userController.renderLogin);

router.post("/login",
    saveRedirectUrl, 
    passport.authenticate("local",
    {failureRedirect: "/login", failureFlash: true}),userController.login);



router.get("/logout",userController.logout);
module.exports = router;