const Message = require("../models/Message");

const getMessages = async (req, res) => {

  try {

    const { userId } = req.params;

    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userId },
        { sender: userId, receiver: myId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

const getInbox = async (req, res) => {
  try {
    const myId = req.user._id;

    // Find all messages where I am either the sender or receiver
    const messages = await Message.find({
      $or: [{ sender: myId }, { receiver: myId }]
    })
    .populate("sender", "name email profileImage")
    .populate("receiver", "name email profileImage")
    .sort({ createdAt: -1 });

    // Extract unique users from those messages (excluding myself)
    const uniqueUsersMap = new Map();

    messages.forEach((msg) => {
      
      let otherUser = null;
      
      // Determine which user property is the "other" person
      if (msg.sender._id.toString() === myId.toString()) {
        otherUser = msg.receiver;
      } else {
        otherUser = msg.sender;
      }

      // Add to Map to deduplicate by ID
      if (otherUser && !uniqueUsersMap.has(otherUser._id.toString())) {
        uniqueUsersMap.set(otherUser._id.toString(), otherUser);
      }
      
    });

    // Convert values back to simple array
    const inboxUsers = Array.from(uniqueUsersMap.values());

    res.json(inboxUsers);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMessages, getInbox };