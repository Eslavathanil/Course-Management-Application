// API Configuration
// Update this URL to point to your Express backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  me: `${API_BASE_URL}/auth/me`,
  
  // Courses
  courses: `${API_BASE_URL}/courses`,
  course: (id: string) => `${API_BASE_URL}/course/${id}`,
  
  // Enrollments
  enrollments: `${API_BASE_URL}/enrollments`,
  enrollment: (courseId: string) => `${API_BASE_URL}/enrollments/${courseId}`,
  enrollmentProgress: (courseId: string) => `${API_BASE_URL}/enrollments/${courseId}/progress`,
} as const;

// Request headers helper
export const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};
