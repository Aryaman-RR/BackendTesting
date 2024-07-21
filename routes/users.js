const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// JWT Secret
const JWT_SECRET = "abcdefghijklmnopqrstuvwxyz";

// Register
router.post("/users/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post("/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Logout
router.post("/users/logout", (req, res) => {
  res.send({ message: "User logged out successfully" });
});

module.exports = router;
