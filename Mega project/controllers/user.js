const User = require("../models/user");

module.exports.renderSignUpForm =  (req, res) => {
    res.render("signup.ejs");
  }

module.exports.registerUser =  async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ email, username });
      let result = await User.register(newUser, password);
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        // req.flash("success","Welcome to Wanderlust!");
        res.redirect("/listings");
        console.log(result);
      });
    } catch (error) {
      // req.flash("error",error.message);
      // res.redirect("/signup");
      console.log(error);
    }
  }


module.exports.renderLogInForm =  (req, res) => {
    res.render("login.ejs");
  }


// When flash will start: failureflash: true (along with failureRedirect)
module.exports.loginUser = async (req, res) => {
    // req.flash("success","Welcome back!");
    // res.redirect(req.locals.redirect);
    let user = req.user;
    res.redirect("/listings"); 
  }

module.exports.logOutUser =  (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      // req.flash("success","You are logged out");
      res.redirect("/listings");
    });
  }