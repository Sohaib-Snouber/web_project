const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },  // The task text
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }  // Reference to the user who created this task
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
