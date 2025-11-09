const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  scholarship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholarship',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'under_review'],
    default: 'pending'
  },
  personalStatement: {
    type: String,
    required: true
  },
  documents: [{
    name: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  additionalInfo: {
    type: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure one application per user per scholarship
applicationSchema.index({ scholarship: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema); 