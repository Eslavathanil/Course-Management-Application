const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { protect } = require('../middleware/auth');

// @route   GET /api/enrollments
// @desc    Get user's enrollments
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course')
      .sort('-enrolledAt');
    
    res.json({
      success: true,
      count: enrollments.length,
      enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/enrollments/:courseId
// @desc    Enroll in a course
// @access  Private
router.post('/:courseId', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId
    });
    
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }
    
    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: req.params.courseId
    });
    
    await enrollment.populate('course');
    
    res.status(201).json({
      success: true,
      enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/enrollments/:courseId
// @desc    Get enrollment status for a course
// @access  Private
router.get('/:courseId', protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId
    }).populate('course');
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Not enrolled in this course'
      });
    }
    
    res.json({
      success: true,
      enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/enrollments/:courseId/progress
// @desc    Update course progress
// @access  Private
router.put('/:courseId/progress', protect, async (req, res) => {
  try {
    const { lessonId, progress } = req.body;
    
    let enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId
    });
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Not enrolled in this course'
      });
    }
    
    // Add completed lesson if provided
    if (lessonId !== undefined) {
      const lessonExists = enrollment.completedLessons.some(
        l => l.lessonId === lessonId
      );
      
      if (!lessonExists) {
        enrollment.completedLessons.push({ lessonId });
      }
    }
    
    // Update progress percentage
    if (progress !== undefined) {
      enrollment.progress = Math.min(100, Math.max(0, progress));
    }
    
    await enrollment.save();
    await enrollment.populate('course');
    
    res.json({
      success: true,
      enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/enrollments/:courseId
// @desc    Unenroll from a course
// @access  Private
router.delete('/:courseId', protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndDelete({
      user: req.user._id,
      course: req.params.courseId
    });
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Not enrolled in this course'
      });
    }
    
    res.json({
      success: true,
      message: 'Successfully unenrolled from course'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
