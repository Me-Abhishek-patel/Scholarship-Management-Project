const express = require('express');
const { body, validationResult } = require('express-validator');
const Application = require('../models/Application');
const Scholarship = require('../models/Scholarship');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all applications for current user
router.get('/my', auth, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('scholarship', 'title provider amount deadline category')
      .sort({ submittedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    console.error('Get user applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applications for scholarships created by current user
router.get('/received', auth, async (req, res) => {
  try {
    // Find scholarships created by current user
    const scholarships = await Scholarship.find({ createdBy: req.user._id });
    const scholarshipIds = scholarships.map(s => s._id);
    
    const applications = await Application.find({ scholarship: { $in: scholarshipIds } })
      .populate('scholarship', 'title provider amount deadline')
      .populate('applicant', 'name email university major gpa')
      .sort({ submittedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    console.error('Get received applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit application for a scholarship
router.post('/:scholarshipId', auth, [
  body('personalStatement').trim().isLength({ min: 50 }).withMessage('Personal statement must be at least 50 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { scholarshipId } = req.params;
    const { personalStatement, additionalInfo } = req.body;

    // Check if scholarship exists
    const scholarship = await Scholarship.findById(scholarshipId);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    // Check if scholarship is still active and deadline hasn't passed
    if (!scholarship.isActive || new Date() > scholarship.deadline) {
      return res.status(400).json({ message: 'Scholarship is no longer accepting applications' });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      scholarship: scholarshipId,
      applicant: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this scholarship' });
    }

    // Create new application
    const application = new Application({
      scholarship: scholarshipId,
      applicant: req.user._id,
      personalStatement,
      additionalInfo
    });

    await application.save();
    
    await application.populate([
      { path: 'scholarship', select: 'title provider amount deadline' },
      { path: 'applicant', select: 'name email' }
    ]);
    
    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ message: 'Server error during application submission' });
  }
});

// Update application status (only by scholarship creator)
router.put('/:applicationId/status', auth, [
  body('status').isIn(['pending', 'approved', 'rejected', 'under_review']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId)
      .populate('scholarship');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if current user is the scholarship creator
    if (application.scholarship.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    await application.populate([
      { path: 'scholarship', select: 'title provider amount deadline' },
      { path: 'applicant', select: 'name email university major gpa' }
    ]);

    res.json({
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error during status update' });
  }
});

// Get specific application details
router.get('/:applicationId', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate('scholarship')
      .populate('applicant', 'name email university major gpa phone graduationYear');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is either the applicant or scholarship creator
    const isApplicant = application.applicant._id.toString() === req.user._id.toString();
    const isScholarshipCreator = application.scholarship.createdBy.toString() === req.user._id.toString();

    if (!isApplicant && !isScholarshipCreator) {
      return res.status(403).json({ message: 'Not authorized to view this application' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Withdraw application (only by applicant before deadline)
router.delete('/:applicationId', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate('scholarship');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is the applicant
    if (application.applicant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to withdraw this application' });
    }

    // Check if scholarship deadline hasn't passed
    if (new Date() > application.scholarship.deadline) {
      return res.status(400).json({ message: 'Cannot withdraw application after deadline' });
    }

    await Application.findByIdAndDelete(applicationId);

    res.json({ message: 'Application withdrawn successfully' });
  } catch (error) {
    console.error('Withdraw application error:', error);
    res.status(500).json({ message: 'Server error during application withdrawal' });
  }
});

module.exports = router; 