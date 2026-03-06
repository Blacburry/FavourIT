const express = require("express");
const router = express.Router();

const { getMessages, getInbox } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getInbox);
router.get("/:userId", protect, getMessages);

module.exports = router;