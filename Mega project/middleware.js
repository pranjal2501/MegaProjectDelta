const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema  } = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req,res,next)=>{
    console.log("In isLoggedIN");
    if(!req.isAuthenticated())
        {
            console.log(req.originalUrl);
            // req.session.redirectUrl = req.originalUrl;
          // req.flash("error","You must be logged in to create new listing");
          return res.redirect("/user/login");
        }
    next();
}

// DAY 51 VIDEO 5 NOTWORKING
// module.exports.saveRedirectURL = (req,res,next)=>{
//     if (req.session.redirectUrl) {
//         req.locals.redirect = req.session.redirectUrl;
//     }
//     next();
// }


module.exports.isOwner = async (req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let listingOwnerId = listing.owner._id;
    let currentUserId = res.locals.curUser._id;
    // res.locals.curUser = req.user;
    if (listingOwnerId.equals(currentUserId)) {
        console.log("In isOwner1");
        next();
      }
      else{
      // req.flash("error","You're not owner of the listing");
        console.log("In isOwner2");
        return res.send("You're not owner of the listing");
        
    }
    
}

module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
       if (error) {
        throw new ExpressError(400,error);
       }else{
        next(); 
       }
};   


module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if (error) { 
      // console.log(err); 
      throw new ExpressError(400, error);
    } else {
      next();
    }
  };

module.exports.isAuthor = async(req,res,next) =>{
  let {reviewId} = req.params;
  let review = await Review.findById(reviewId);
  let reviewOwnerId = review.name;
  let currentUserId = res.locals.curUser._id;
    // res.locals.curUser = req.user;
    if (reviewOwnerId.equals(currentUserId)) {
        console.log("In isOwner1");
        next();
      }
      else{
        console.log("In isOwner2");
        // req.flash("error","You're not owner of the listing");
        return res.send("You're not author of the review")
    }
}
  