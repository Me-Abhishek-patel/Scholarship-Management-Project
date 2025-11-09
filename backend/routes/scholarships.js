const express = require('express');
const { body, validationResult } = require('express-validator');
const Scholarship = require('../models/Scholarship');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all scholarships with filtering and search
router.get('/', async (req, res) => {
  try {
    const { search, category, minAmount, maxAmount, page = 1, limit = 10 } = req.query;
    
    let query = { isActive: true };
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }
    
    // Amount range filter
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }
    
    // Filter by deadline (only future deadlines)
    query.deadline = { $gte: new Date() };
    
    const skip = (page - 1) * limit;
    
    const scholarships = await Scholarship.find(query)
      .populate('createdBy', 'name email')
      .sort({ deadline: 1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Scholarship.countDocuments(query);
    
    res.json({
      scholarships,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    console.error('Get scholarships error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single scholarship by ID
router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    res.json(scholarship);
  } catch (error) {
    console.error('Get scholarship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new scholarship (authenticated users only)
router.post('/', auth, [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('provider').trim().isLength({ min: 2 }).withMessage('Provider name is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('category').isIn(['Academic', 'Sports', 'Arts', 'Community Service', 'Need-based', 'Merit-based', 'Research', 'Other']).withMessage('Invalid category'),
  body('deadline').isISO8601().withMessage('Invalid deadline date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const scholarshipData = {
      ...req.body,
      createdBy: req.user._id
    };

    const scholarship = new Scholarship(scholarshipData);
    await scholarship.save();
    
    await scholarship.populate('createdBy', 'name email');
    
    res.status(201).json({
      message: 'Scholarship created successfully',
      scholarship
    });
  } catch (error) {
    console.error('Create scholarship error:', error);
    res.status(500).json({ message: 'Server error during scholarship creation' });
  }
});

// Update scholarship (only by creator)
router.put('/:id', auth, [
  body('title').optional().trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('provider').optional().trim().isLength({ min: 2 }).withMessage('Provider name is required'),
  body('amount').optional().isNumeric().withMessage('Amount must be a number'),
  body('category').optional().isIn(['Academic', 'Sports', 'Arts', 'Community Service', 'Need-based', 'Merit-based', 'Research', 'Other']).withMessage('Invalid category'),
  body('deadline').optional().isISO8601().withMessage('Invalid deadline date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const scholarship = await Scholarship.findById(req.params.id);
    
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    // Check if user is the creator
    if (scholarship.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this scholarship' });
    }
    
    Object.assign(scholarship, req.body);
    await scholarship.save();
    
    await scholarship.populate('createdBy', 'name email');
    
    res.json({
      message: 'Scholarship updated successfully',
      scholarship
    });
  } catch (error) {
    console.error('Update scholarship error:', error);
    res.status(500).json({ message: 'Server error during scholarship update' });
  }
});

// Delete scholarship (only by creator)
router.delete('/:id', auth, async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    
    // Check if user is the creator
    if (scholarship.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this scholarship' });
    }
    
    await Scholarship.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    console.error('Delete scholarship error:', error);
    res.status(500).json({ message: 'Server error during scholarship deletion' });
  }
});

// Get scholarships created by current user
router.get('/user/created', auth, async (req, res) => {
  try {
    const scholarships = await Scholarship.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(scholarships);
  } catch (error) {
    console.error('Get user scholarships error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 