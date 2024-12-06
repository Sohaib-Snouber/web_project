const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  authCode: { type: String },
  authCodeExpires: { type: Date },
  resetToken: String,
  resetTokenExpires: Date, // Expiry for the reset token
});

module.exports = mongoose.model("User", userSchema);