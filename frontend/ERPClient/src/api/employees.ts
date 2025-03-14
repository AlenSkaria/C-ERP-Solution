import axios from 'axios';
import { API_BASE_URL } from './config';

export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  username: string;
}

export interface PromotionHistory {
  id: string;
  employeeId: string;
  oldRole: string;
  newRole: string;
  reason: string;
  date: string;
}

export interface PromoteEmployeeData {
  newRole: string;
  reason: string;
}

// Get all employees
export const getEmployees = async (): Promise<Employee[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Access token required');
  }
  const response = await axios.get(`${API_BASE_URL}/employees`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.users || [];
};

// Get promotion history for an employee
export const getPromotionHistory = async (employeeId: string): Promise<PromotionHistory[]> => {
  const response = await axios.get(`${API_BASE_URL}/employees/${employeeId}/promotion-history`);
  return response.data.promotions;
};

// Promote an employee
export const promoteEmployee = async (employeeId: string, data: { newRole: string, reason: string }): Promise<Employee> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Access token required');
  }
  const response = await axios.put(`${API_BASE_URL}/employees/${employeeId}/promote`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.employee;
}; 