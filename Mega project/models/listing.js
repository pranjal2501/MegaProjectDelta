const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js");
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    requred: true,
  },
  description: {
    type: String,
  },
  image: {
    url:String,
    Filename:String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

const Listing = mongoose.model("Listing", listingSchema);

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});

module.exports = Listing;
