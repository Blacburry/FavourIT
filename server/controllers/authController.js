const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// Signup
const signupUser = async (req, res) => {
  try {
    const { name, email, password, branch, year } = req.body;

    if (!name || !email || !password || !branch || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });


    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      branch,
      year,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Me
const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  signupUser,
  loginUser,
  getMe,
};