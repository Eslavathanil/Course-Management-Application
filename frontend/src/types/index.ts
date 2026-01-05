// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Course types
export interface Course {
  _id: string;
  name: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  price: number;
  thumbnail?: string;
  totalLessons?: number;
  enrollmentCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CoursePayload {
  name: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  price: number;
  thumbnail?: string;
}

// Enrollment types
export interface Enrollment {
  _id: string;
  user: string;
  course: Course;
  status: 'enrolled' | 'in-progress' | 'completed';
  progress: number;
  completedLessons: { lessonId: number; completedAt: string }[];
  enrolledAt: string;
  completedAt?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
