# Course Management Application

A simple MERN stack application (MongoDB, Express, React, Node.js) that allows users to register, log in, and manage courses. The app is organized into **backend** and **frontend** folders for clarity.

---

## Objective

Implement a full-stack application with the following modules:

- **Register**: New user registration with validations and hashed passwords.
- **Login**: User authentication with JWT tokens.
- **Courses CRUD**: Create, Read, Update, Delete courses with proper validations.
## 📸 Application Preview

### Course Management Application Page
![Course Management Application](https://res.cloudinary.com/dp8gu4t9m/image/upload/v1767546016/Screenshot_2026-01-04_214647_wlox2q.png)
---

## Folder Structure

```
Course-Management-Application/
├─ backend/ # Node.js + Express API
├─ frontend/ # React application
└─ README.md
```

## ✨ Features

| Feature | Description |
|---------|-------------|
| 👤 User Registration | Register a new user with validation and hashed passwords |
| 🔑 Login & JWT Auth | Secure login with JWT authentication |
| 📚 Courses CRUD | Create, Read, Update, Delete courses |
| 🧾 Validation | Input validation for email, password, and course fields |

---

## 🛠 Tech Stack

**Frontend:**

- React 18
- React Router v6
- React Query
- React Hook Form
- Tailwind CSS
- Zod (validation)
- Lucide Icons

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (authentication)
- bcryptjs (password hashing)
- CORS

---

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm
## Installation

### 1. Clone the repository

git clone <YOUR_GIT_URL>
cd course-management-app

---

### 2. Backend Setup

cd backend
npm install

Create a .env file inside the backend folder and add:

PORT=5000
MONGO_URI=mongodb://localhost:27017/course_management
JWT_SECRET=your_jwt_secret

Start the backend server:

npm run dev

Backend runs on:
http://localhost:5000

---

### 3. Frontend Setup

cd ../frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

---

## API Reference

### Authentication

| Method | Endpoint             | Description         | Protected |
|------|---------------------|--------------------|-----------|
| POST | /api/auth/register  | Register user      | No        |
| POST | /api/auth/login     | Login user         | No        |
| GET  | /api/auth/profile   | Get user profile   | Yes       |

---

### Courses

| Method | Endpoint             | Description          | Protected |
|------|---------------------|----------------------|-----------|
| GET  | /api/courses        | Get all courses     | No        |
| GET  | /api/course/:id     | Get single course   | No        |
| POST | /api/courses        | Create course       | Yes       |
| PUT  | /api/course/:id     | Update course       | Yes       |
| DELETE | /api/course/:id   | Delete course       | Yes       |

---

## Authentication

For protected routes, include the JWT token in the request header:

Authorization: Bearer <your_token>

---

## Tech Stack

Frontend: React, Vite, Axios  
Backend: Node.js, Express  
Database: MongoDB  
Authentication: JWT

---

## Notes

- Make sure MongoDB is running before starting the backend.
- Register and login to obtain a JWT token.
- Use the token to access protected endpoints.
