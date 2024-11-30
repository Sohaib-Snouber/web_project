// task-manager-backend/models/Resume.js
const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    title: String,
    content: String,
  });

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, unique: true, required: true }, // Add unique name for each resume
  format: { type: String, required: false }, // Store the selected format name
  sections: { type: [sectionSchema], required: false }, // Correct placement of required
});

module.exports = mongoose.model('Resume', resumeSchema);
