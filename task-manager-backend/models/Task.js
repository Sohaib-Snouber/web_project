const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt'
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
