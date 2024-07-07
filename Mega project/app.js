// if(process.env.NODE_ENV != "production"){
// require('dotenv').config();
// }
// console.log(process.env.SECRET);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const port = 8080;
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

// Remaining DAY 49 LAST THREE VDOS
const flash = require("connect-flash");
const session = require("express-session");

const sessionOptions = {
  secret:"mySuperSecret" ,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

app.use(session(sessionOptions));
// app.use(flash()); 

// app.use((req,res,next)=>{
//   req.locals.success = 4;
//   // Withut next(), page will stuck
//   res.send(req.locals.success);
// })

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.curUser = req.user;
  next();
})

const  listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.listen(port, () => {
  console.log("Server started ", port);
});

// app.get("/demoUser",async(req,res)=>{
//   let fakeUser = new User(
//     {
//       email:"student@gmai.com",
//       username:"deltaStudent3"
//     }
//   )
//   const registeredUser = await User.register(fakeUser,"heloworldISmyPassword");
//   res.send(registeredUser);
// })

app.use("/listings",listingRouter);
app.use("/listings/:id/review",reviewRouter);
app.use("/user",userRouter);


async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Some error occured while connecting to DB");
  });

// // If the request is not fulfilled by the above routes:
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});  

app.use((err, req, res, next) => {
    let {status=500,message = "Something went wrong"} = err;
    console.log(err);
    res.render("error.ejs",{err});
});
