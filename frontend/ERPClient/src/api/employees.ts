import axios from 'axios';
import { API_BASE_URL } from './config';

export interface Employee {
  id: string;
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
  const response = await axios.get(`${API_BASE_URL}/employees`);
  return response.data.employees;
};

// Get promotion history for an employee
export const getPromotionHistory = async (employeeId: string): Promise<PromotionHistory[]> => {
  const response = await axios.get(`${API_BASE_URL}/employees/${employeeId}/promotion-history`);
  return response.data.promotions;
};

// Promote an employee
export const promoteEmployee = async (employeeId: string, data: PromoteEmployeeData): Promise<Employee> => {
  const response = await axios.put(`${API_BASE_URL}/employees/${employeeId}/promote`, data);
  return response.data.employee;
}; 