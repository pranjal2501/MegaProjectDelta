
const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
  }

module.exports.renderNewForm =  (req, res) => {
    res.render("new.ejs");
  }

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("owner").populate({path:"review",populate:{path : "name",},});
    const data = listing;
    // res.send(data);
    console.log(`Listing in show route: ${JSON.stringify(data, null, 2)}`);
    res.render("show.ejs", { data });
  }

module.exports.createNewListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file. filename;
    const newListing = req.body.listing;
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    let result = await Listing.create(newListing);
    // Owner of new listing is the current user which can be accessed bu req.user
    // req.flash("success","New listing added");
    res.redirect("/listings");
  }

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("edit.ejs", { listing });
  }

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    console.log(`Request body is: ${req.body}`);
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
    if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file. filename;
    listing.image = {url,filename};
    await listing.save();
    }
    res.redirect(`/listings/${id}`);
  }

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  }