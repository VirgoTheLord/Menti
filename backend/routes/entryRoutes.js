const express = require("express");
const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.get("/signup", (req, res) => {
  const { username, password, email, role } = req.body;
});

module.exports = userRouter;
