const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true },
  github: { type: String },
  linkedin: { type: String },
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      techStack: [String],
      githubUrl: String,
      liveDemo: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);