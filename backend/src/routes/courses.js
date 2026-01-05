const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/auth');

// Validation middleware
const validateCourse = [
  body('name').trim().notEmpty().withMessage('Course name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('instructor').trim().notEmpty().withMessage('Instructor name is required'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('level').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid level'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
];

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, level, search, sort } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by level
    if (level) {
      query.level = level;
    }
    
    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    let coursesQuery = Course.find(query).populate('enrollmentCount');
    
    // Sorting
    if (sort) {
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      const sortField = sort.replace('-', '');
      coursesQuery = coursesQuery.sort({ [sortField]: sortOrder });
    } else {
      coursesQuery = coursesQuery.sort('-createdAt');
    }
    
    const courses = await coursesQuery;
    
    res.json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/courses
// @desc    Create new course
// @access  Private (instructors/admins)
router.post('/', protect, validateCourse, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().reduce((acc, err) => {
          acc[err.path] = err.msg;
          return acc;
        }, {})
      });
    }

    const course = await Course.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
