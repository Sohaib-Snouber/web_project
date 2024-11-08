const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },  // Added unique email field
  role: { type: String, enum: ["user", "admin"], default: "user" }, // User role
  createdAt: { type: Date, default: Date.now }, // Creation date
});

// Middleware to hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password hasn't changed

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to verify password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to hide sensitive information
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password; // Remove password from the returned object
  return obj;
};

module.exports = mongoose.model("User", userSchema);
