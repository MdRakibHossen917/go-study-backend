const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    default: '',
  },
  passingYear: {
    type: String,
    default: '',
  },
  grade: {
    type: String,
    default: '',
  },
  board: {
    type: String,
    default: '',
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  technologies: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
});

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  ssc: {
    type: educationSchema,
    default: {},
  },
  hsc: {
    type: educationSchema,
    default: {},
  },
  bsc: {
    type: educationSchema,
    default: {},
  },
  msc: {
    type: educationSchema,
    default: {},
  },
  projects: {
    type: [projectSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
profileSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Profile', profileSchema);

