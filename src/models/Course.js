const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a course name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  instructor: {
    type: String,
    required: [true, 'Please add an instructor name']
  },
  duration: {
    type: String,
    required: [true, 'Please add course duration']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  thumbnail: {
    type: String,
    default: null
  },
  totalLessons: {
    type: Number,
    default: 10
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for enrollment count
CourseSchema.virtual('enrollmentCount', {
  ref: 'Enrollment',
  localField: '_id',
  foreignField: 'course',
  count: true
});

module.exports = mongoose.model('Course', CourseSchema);
