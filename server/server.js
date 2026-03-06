require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api/messages", messageRoutes);

/* ---------------- MONGODB CONNECTION ---------------- */

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

/* ---------------- API ROUTES ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/tutors", tutorRoutes);

/* ---------------- SOCKET.IO ---------------- */

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {

    socket.join(roomId);

    console.log("Joined room:", roomId);

  });

  const Message = require("./models/Message");

socket.on("sendMessage", async (data) => {
  try {
    const { roomId, sender, receiver, text } = data;

    const newMessage = await Message.create({
      sender,
      receiver,
      text
    });

    io.to(roomId).emit("receiveMessage", newMessage);
  } catch (error) {
    console.error("Message create error:", error);
  }
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

});

/* ---------------- SERVER ---------------- */

server.listen(5000, () => {
  console.log("Server running on port 5000");
});