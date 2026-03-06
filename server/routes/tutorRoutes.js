const express = require("express");
const router = express.Router();

const {
  createListing,
  getListings,
  getListingById,
  getMyListings,
} = require("../controllers/tutorController");

const { protect } = require("../middleware/authMiddleware");

// CREATE listing
router.post("/", protect, createListing);

// GET listings created by logged-in tutor
router.get("/my-listings", protect, getMyListings);

// GET all listings
router.get("/", getListings);

// GET single listing
router.get("/:id", getListingById);

module.exports = router;