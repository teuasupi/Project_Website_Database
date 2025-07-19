export interface User {
  id: number;
  email: string;
  fullName: string;
  graduationYear?: number;
  nim?: string;
  major?: string;
  phoneNumber?: string;
  address?: string;
  profilePhoto?: string;
  role: "admin" | "user";
  currentCompany?: string;
  position?: string;
  password?: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: Omit<User, "password">;
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: string;
}

export interface DatabaseResult<T = any> {
  affectedRows?: number;
  insertId?: number;
  changedRows?: number;
  data?: T;
}