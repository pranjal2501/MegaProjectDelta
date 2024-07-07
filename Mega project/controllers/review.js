
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
    console.log(req.body);
    let review = new Review(req.body.review);
    review.name = req.user._id;
    // Instead of destructuring id
    let listing = await Listing.findById(req.params.id);
    let result = listing.review.push(review);
    await review.save();
    await listing.save();
    // res.redirect(`/listings/${req.params.id}`);
    res.render("show.ejs");
  }

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    // review array ke andar jo bhi obj reviewId se m atch karega, wo pull(delete) hoga
    Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  }