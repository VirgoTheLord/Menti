const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "User already exists" });
    }
    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.status(200).json({ message: "Sign In Successful", token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error occurred while signing up",
      error: error.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error: error });
  }
});

module.exports = userRouter;
