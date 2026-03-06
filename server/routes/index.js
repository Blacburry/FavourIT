const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const tutorRoutes = require("./tutorRoutes");
const messageRoutes = require("./messageRoutes");

router.use("/auth", authRoutes);
router.use("/tutors", tutorRoutes);
router.use("/messages", messageRoutes);

module.exports = router;