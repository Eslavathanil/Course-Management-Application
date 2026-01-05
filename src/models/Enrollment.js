const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true
  },
  status: {
    type: String,
    enum: ['enrolled', 'in-progress', 'completed'],
    default: 'enrolled'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completedLessons: [{
    lessonId: Number,
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Compound index to ensure user can only enroll once per course
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// Update status based on progress
EnrollmentSchema.pre('save', function(next) {
  if (this.progress > 0 && this.progress < 100) {
    this.status = 'in-progress';
  } else if (this.progress === 100) {
    this.status = 'completed';
    this.completedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
