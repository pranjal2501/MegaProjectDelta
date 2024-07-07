const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then(()=>{console.log("Connected to DB")}).catch((err)=>{console.log("Some error occured")});

const initFunc = async ()=>{
    // Will delete the existing data
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        //Means, keep all the object key-val same, just do owner : id, yani ki obj ko fela do aur usme owner add kardo.
        ...obj,
        owner: '667d2291843145956e44ece8'
    }))
    await Listing.insertMany(initData.data);
    console.log("Initial data added");
}
initFunc();