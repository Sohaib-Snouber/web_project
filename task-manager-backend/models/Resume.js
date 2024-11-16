// task-manager-backend/models/Resume.js
const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    title: String,
    content: String,
  });

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sections: [sectionSchema],
});

module.exports = mongoose.model('Resume', resumeSchema);
