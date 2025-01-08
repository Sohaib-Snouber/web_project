// task-manager-backend/models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, unique: true, required: true }, // Add unique name for each resume
  format: { type: String, required: false }, // Store the selected format name
  content: { type: Object, required: true }, // Full resume content stored as an object
});

module.exports = mongoose.model('Resume', resumeSchema);
