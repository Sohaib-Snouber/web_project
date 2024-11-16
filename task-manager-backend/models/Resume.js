// task-manager-backend/models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sections: [
    {
      title: String,
      content: String,
    },
  ],
});

module.exports = mongoose.model('Resume', resumeSchema);
