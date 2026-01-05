import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';
import type {
  AuthResponse,
  RegisterPayload,
  LoginPayload,
  Course,
  CoursePayload,
  Enrollment,
  ApiResponse,
} from '@/types';

// Token management
const TOKEN_KEY = 'auth_token';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Generic fetch wrapper
async function fetchApi<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = getToken();
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(token || undefined),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'An error occurred',
        errors: data.errors,
      };
    }

    return {
      success: true,
      data,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Auth API
export const authApi = {
  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> => {
    return fetchApi<AuthResponse>(API_ENDPOINTS.register, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  login: async (payload: LoginPayload): Promise<ApiResponse<AuthResponse>> => {
    return fetchApi<AuthResponse>(API_ENDPOINTS.login, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    const result = await fetchApi<{ message: string }>(API_ENDPOINTS.logout, {
      method: 'POST',
    });
    removeToken();
    return result;
  },

  getMe: async (): Promise<ApiResponse<{ user: AuthResponse['user'] }>> => {
    return fetchApi<{ user: AuthResponse['user'] }>(API_ENDPOINTS.me);
  },
};

// Courses API
export const coursesApi = {
  getAll: async (): Promise<ApiResponse<{ courses: Course[] }>> => {
    return fetchApi<{ courses: Course[] }>(API_ENDPOINTS.courses);
  },

  getById: async (id: string): Promise<ApiResponse<{ course: Course }>> => {
    return fetchApi<{ course: Course }>(API_ENDPOINTS.course(id));
  },

  create: async (payload: CoursePayload): Promise<ApiResponse<{ course: Course }>> => {
    return fetchApi<{ course: Course }>(API_ENDPOINTS.courses, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update: async (id: string, payload: Partial<CoursePayload>): Promise<ApiResponse<{ course: Course }>> => {
    return fetchApi<{ course: Course }>(API_ENDPOINTS.course(id), {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return fetchApi<{ message: string }>(API_ENDPOINTS.course(id), {
      method: 'DELETE',
    });
  },
};

// Enrollments API
export const enrollmentsApi = {
  getAll: async (): Promise<ApiResponse<{ enrollments: Enrollment[] }>> => {
    return fetchApi<{ enrollments: Enrollment[] }>(API_ENDPOINTS.enrollments);
  },

  enroll: async (courseId: string): Promise<ApiResponse<{ enrollment: Enrollment }>> => {
    return fetchApi<{ enrollment: Enrollment }>(API_ENDPOINTS.enrollment(courseId), {
      method: 'POST',
    });
  },

  getStatus: async (courseId: string): Promise<ApiResponse<{ enrollment: Enrollment }>> => {
    return fetchApi<{ enrollment: Enrollment }>(API_ENDPOINTS.enrollment(courseId));
  },

  updateProgress: async (
    courseId: string,
    data: { lessonId?: number; progress?: number }
  ): Promise<ApiResponse<{ enrollment: Enrollment }>> => {
    return fetchApi<{ enrollment: Enrollment }>(API_ENDPOINTS.enrollmentProgress(courseId), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  unenroll: async (courseId: string): Promise<ApiResponse<{ message: string }>> => {
    return fetchApi<{ message: string }>(API_ENDPOINTS.enrollment(courseId), {
      method: 'DELETE',
    });
  },
};
