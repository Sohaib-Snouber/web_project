const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },  // The task description
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Reference to the creator of the task
  status: { type: String, enum: ["pending", "completed"], default: "pending" },  // Task status
  createdAt: { type: Date, default: Date.now },  // Task creation date
  dueDate: { type: Date },  // Optional due date for the task
});

// Middleware to set default values or perform any action before saving
taskSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

