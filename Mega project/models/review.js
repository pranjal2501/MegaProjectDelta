const mongoose = require("mongoose");
const User = require("./user.js");
const { Schema } = mongoose;
const reviewSchema = new mongoose.Schema({
    comment:String,
    ratings:{
        type: Number,
        min : 1,
        max : 5
    },
    name:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});
const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;