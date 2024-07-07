// When ever we try to login for linkedIn, we have to submit our user name and password  which is a proof of our identity, it is called as authentication

// On IG, we can delete only our own posts and cannot delete our friend's post as we don't have any access to it. This is authorization.

// We never store password as it is.We store their hashed form. 
/* 
While signing up(registeration), first, password will be given as an input to hashing func and as an output it returns an unreadable string1 which is impossible to convert into correct password. And then it is stored in DB.
While logging up, we take the password from user and then it is passed to hashing func and it will give a string2. If the string1 stored in db and string2 got from user are same, user is logged in. Otherwise, it won't.

Characteristics of hashing function:
1. One way function: We can derive output from input, but reverse is not possible. Means, we can convert password into hashed form but hashed form cannot be converted back.
2. For different input, output is different but string length is same.
3. A small change in input bring a large change in output.
Hashing func(alogrithm) : SHA256, MD5, CRC, BCRYPT

SALTING:
--It is a string of 32 chars or more which is appended in password and then this mixture(salt+string) is passed into a hashing func to inhance the security.
--Attackers make their own reverse lookup table which contains list of commonly used passwords and their hash forms. If we add salt in our passwords their hash form completely changes due to which they become uncommon.

To implement hashing, salting and authentication we've built-in amazing npm package called "PASSPORT"
--Express compatible authentication middleware for node.js
--It is a library that helps in authentication.
--It allows us to sign up by other platforms too.(like sign up by google)
--Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.
--Strategy means how we are logging in like through fb, ig etc. In our mega project, we're going to use local strategy.
--By default, passport adds a hashed n salted username and password for that, in our user model we have to User.plugin.
Additionally, it also add various methods for our instances made from model like authentication, change password etc.


CONFIGURING STRATEGY:
--Means, how to set up basic settings for strategy
--Passport requires express session middleware.
--passport.initialize() initializes passport
--Hamare user ko barbar login na karna pade isliye : passport.session();
--passport.use(new localStrategy(User.authenticate())); to let user log in or sign up through local strategy using passport
--passport.serializeUser(User.serializeUser()); serialize means once session is started, store the data so that user need not to login again and again till the session ends.
--passport.deserializeUser(User.deserializeUser()); deserialize means once session is ended, remove the data so that user have to login.
--  let fakeUser = new User(
    {
      email:"student@gmai.com",
      username:"deltaStudent"
    }
  )
  const registeredUser = await User.register(fakeUser,"helloworldISmyPassword");
  Convenience method to register a new user instance with a given password. Checks if username is unique. 

  // The below passport.authenticate(strategyName,{failuerRedirect: "/path",failureFlash: true}) is a middleware that autheticates the user.
router.post("/login",passport.authenticate("local",{failureRedirect: "/login"}),async(req,res)=>{
    res.send("Welcome to wanderlust!");
})

How to check if the user is logged in?
req.isAuthenticated()
req is an object which automatically stores all the information of user.
If the req.user is undefined, user is not logged in

In our project, user must be logged in before creating  a new listing

When a signup is completed, user must be  loggedIn automatically which happens with most of the websites.
req.login(newRegistration,callback) is a middleware that automatically logins the registered person and thus automatically req.user gets free from it's undefined state which was due to lack of log in.

req.path : stores path which we wish to access
req.originalUrl : Store the entire url that we wish to access

listing must be deleted or edited by the owner of listings
*/