export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'alumni' | 'student';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
