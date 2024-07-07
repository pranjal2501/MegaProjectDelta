// Cookies are small datapackets sent by server to browser which mainly contains name value pair.
// There are mainly two types of cookie: signed and unsigned(normal)
// Signed are those whose value is fixed and if it is tempared (changed), we can notice it with the help of 
// Signed cookie is a way to check whether the cookie which we've sent from server is same when we're accessing it from browser.
// How to send signed cookie?
// res.send("name","value",{signed:true});
// How to verify whether the cookie is the same?
// app.use(cookieParser("secretCode"));
// req.send(req.signedCookies);
// If the output is {}, the cookie has been tempered(completely changed)
// If the output is { name: false }, only cookie's value has been changed.
// If the output is {name:"value"}, the cookie is not tempered
// Unsigned cookie are normal cookie which we can easily manipulate and are sent as follows:
//  res.cookie("name","value") is used to send cookie.

// Cookie Parser
// It is an npm package that helps us to access the sent/modified cookies in our server.
// By default all the cookies are stored in req.cookie but it is not possible to directly access the stored cookies due to which parser is used.

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.listen(3000,()=>{console.log("Server started")})

app.use(cookieParser("secretCode"));

app.get("/sc",(req,res)=>{
    res.cookie("name","pranjali",{signed:true});
    // let {color = "white"} = req.cookies;
    res.send(`Give`);
})

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    // console.log(req.cookies);
    res.send("Posts");
})
app.get("/user",(req,res)=>{
    res.send("users");
})
app.get("/cookie",(req,res)=>{
    res.send("cookie");
})