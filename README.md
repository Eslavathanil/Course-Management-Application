# Course Management Backend

Express.js backend with MongoDB for the Course Management application.

## Features

- 🔐 JWT Authentication (Register, Login, Logout)
- 📚 Course CRUD Operations
- 📝 Course Enrollment & Progress Tracking
- ✅ Input Validation
- 🔒 Protected Routes

## Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your settings:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key for JWT
   - `FRONTEND_URL`: Your frontend URL for CORS

3. **Start MongoDB**
   Make sure MongoDB is running locally or use MongoDB Atlas.

4. **Run the Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

### Courses
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/courses` | Get all courses | No |
| POST | `/api/courses` | Create course | Yes |
| GET | `/api/course/:id` | Get single course | No |
| PUT | `/api/course/:id` | Update course | Yes |
| DELETE | `/api/course/:id` | Delete course | Yes |

### Enrollments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/enrollments` | Get user enrollments | Yes |
| POST | `/api/enrollments/:courseId` | Enroll in course | Yes |
| GET | `/api/enrollments/:courseId` | Get enrollment status | Yes |
| PUT | `/api/enrollments/:courseId/progress` | Update progress | Yes |
| DELETE | `/api/enrollments/:courseId` | Unenroll from course | Yes |

## Query Parameters (GET /api/courses)

- `category`: Filter by category
- `level`: Filter by level (beginner, intermediate, advanced)
- `search`: Search in name and description
- `sort`: Sort field (prefix with `-` for descending)

Example: `/api/courses?level=beginner&sort=-price`

## Models

### User
- name, email, password, role (user/instructor/admin)

### Course
- name, description, instructor, duration, level, category, price, thumbnail, totalLessons

### Enrollment
- user, course, status, progress, completedLessons, enrolledAt, completedAt
