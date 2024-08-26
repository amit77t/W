const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsyc.js");
const expressError = require("../utils/expressError.js");


const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} =  require("../middleware.js");


const reviewController = require("../controllers/reviews.js");
// post reviews Route


router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));
    
    // delete reviews Route
    
    
    router.delete("/:reviewId",
        isLoggedIn,
        isReviewAuthor,
        wrapAsync(reviewController.deleteReview)
    );
    


    module.exports = router;