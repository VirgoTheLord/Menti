const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "player"],
    required: true,
    default: "player",
  },
});

//middleware to has your passwrod here itself
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error);
  }
});

//making a user schmema method to matchpassword
userSchema.methods.matchPassword = async function (newPassword) {
  return await bcrypt.compare(this.password, newPassword);
};

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
