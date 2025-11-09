const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Academic', 'Sports', 'Arts', 'Community Service', 'Need-based', 'Merit-based', 'Research', 'Other']
  },
  eligibility: {
    minGPA: {
      type: Number,
      min: 0,
      max: 4
    },
    majors: [{
      type: String,
      trim: true
    }],
    universities: [{
      type: String,
      trim: true
    }],
    graduationYear: {
      type: Number
    },
    other: {
      type: String
    }
  },
  deadline: {
    type: Date,
    required: true
  },
  applicationUrl: {
    type: String,
    trim: true
  },
  requirements: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for search functionality
scholarshipSchema.index({ title: 'text', description: 'text', provider: 'text' });

module.exports = mongoose.model('Scholarship', scholarshipSchema); 