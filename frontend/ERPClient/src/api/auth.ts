import axios from 'axios';
import { API_BASE_URL } from './config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    // more
  };
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

export const register = async (data: RegisterData): Promise<LoginResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, { ...data, role: 'Cashier' });
  return response.data;
}; 