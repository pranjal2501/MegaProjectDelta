const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const { createReview } = require("../controllers/review.js");
const { deleteListing } = require("../controllers/listing.js");

//Create review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(createReview)
);

// Delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(deleteListing)
);

module.exports = router;
