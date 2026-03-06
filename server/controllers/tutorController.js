const TutorListing = require("../models/TutorListing");

// Get listings created by logged in tutor
const getMyListings = async (req, res) => {
  try {
    const listings = await TutorListing.find({
      tutorId: req.user._id
    });

    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Create tutor listing
const createListing = async (req, res) => {
  try {
    const { subject, branch, year, semester, price, description } = req.body;

    if (!subject || !branch || !year || !semester || !price) {
      return res.status(400).json({ message: "Missing required listing fields" });
    }

    const listing = await TutorListing.create({
      tutorId: req.user._id,
      subject,
      branch,
      year,
      semester,
      price,
      description,
    });

    res.status(201).json({
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tutor listings
const getListings = async (req, res) => {
  try {
    const { branch, year, semester, subject } = req.query;

    let filter = {};

    if (branch) filter.branch = branch;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;
    if (subject) filter.subject = subject;

    const listings = await TutorListing.find(filter)
      .populate("tutorId", "name email branch year")
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single tutor listing
const getListingById = async (req, res) => {
  try {
    const listing = await TutorListing.findById(req.params.id).populate(
      "tutorId",
      "name email branch year"
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createListing,
  getListings,
  getListingById,
  getMyListings,
};