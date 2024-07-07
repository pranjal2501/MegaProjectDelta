const express = require("express");
const app = express();
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const flash = require("connect-flash");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {index, renderNewForm, showListing, createNewListing, editListing, updateListing, deleteListing} = require("../controllers/listing.js");
// const multer  = require('multer');
// const {storage} = require("../cloudConfig.js");
// const upload = multer({ storage });//Telling multer to store uploaded files into storage of cloudinary

router
.route("/")
.get(wrapAsync(index))
.post(
  isLoggedIn,
  // upload.single('listing[image]'),
  validateListing,
  wrapAsync(createNewListing)
);
// Uploading singlefile and field from which we are going to extract file

  // All teh data related to file is stored in req.file
  // res.send(req.file);


// New listing route
router.get("/new", isLoggedIn,renderNewForm);

router.route("/:id")
.get(wrapAsync(showListing))
.patch(
  isLoggedIn,
  isOwner,
  // upload.single('listing[image]'),
  validateListing,
  wrapAsync(updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(deleteListing)
)

// Editing listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(editListing)
);

module.exports = router;
