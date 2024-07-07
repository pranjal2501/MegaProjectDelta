const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const { renderSignUpForm, registerUser, renderLogInForm, loginUser, logOutUser } = require("../controllers/user.js");
// const {saveRedirectURL} = require("../middleware.js");

router.route("/signup")
.get(renderSignUpForm)
.post(wrapAsync(registerUser));

router.route("/login")
.get(renderLogInForm)
.post(
  passport.authenticate("local", { failureRedirect: "/login" }),
  loginUser
);

router.get("/logout",logOutUser);

module.exports = router;