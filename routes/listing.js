const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");

const {listingSchema, reviewSchema} =require("../schema.js");
const expressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");

const {isLoggedIn, isOwner,validateListing}= require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer')

const {storage}= require("../cloudConfig.js");

const upload = multer({ storage});



// index route

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
     wrapAsync(listingController.createlisting));


// new route  
router.get("/new" ,isLoggedIn,listingController.renderNewForm );


router.route("/:id")
.get( wrapAsync(listingController.showListing))
.delete(isLoggedIn,
    isOwner, 
    wrapAsync(listingController.deleteListing))
.put(isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
     wrapAsync(listingController.updateListing));
 



  
  



// edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;