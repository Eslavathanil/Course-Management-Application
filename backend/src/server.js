// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// === CORS Setup ===
// Allow both localhost (development) and deployed frontend on Render
const allowedOrigins = [
  'http://localhost:8080', // local dev
  process.env.FRONTEND_URL, // deployed frontend on Render
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error(`CORS policy does not allow access from ${origin}`));
      }
    },
    credentials: true, // allows cookies / auth headers
  })
);

// === Body parser ===
app.use(express.json());

// === Routes ===
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enrollments', require('./routes/enrollments'));

// === Health check endpoint ===
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// === Start server ===
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
