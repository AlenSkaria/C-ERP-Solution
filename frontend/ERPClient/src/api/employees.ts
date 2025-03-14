import axios from 'axios';
import { API_BASE_URL } from './config';

export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  username: string;
  dateOfBirth: string;
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
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dateOfBirth: string;
  role: string;
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
  console.log('API Response:', response.data);
  
  if (response.data.users) {
    // Validate the structure of each user
    const validatedUsers = response.data.users.map((user: any) => ({
      _id: user._id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      username: user.username || '',
      dateOfBirth: user.dateOfBirth || '',
      role: user.role || 'Cashier'  // Default to Cashier if no role specified
    }));
    console.log('Validated users:', validatedUsers);
    return validatedUsers;
  }
  return [];
};

// Get promotion history for an employee
export const getPromotionHistory = async (employeeId: string): Promise<PromotionHistory[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Access token required');
  }
  const response = await axios.get(`${API_BASE_URL}/employees/${employeeId}/promotion-history`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.promotions || [];
};

// Promote an employee
export const promoteEmployee = async (employeeId: string, data: PromoteEmployeeData): Promise<Employee> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Access token required');
  }
  console.log('Sending promotion request:', { employeeId, data });
  const response = await axios.put(`${API_BASE_URL}/employees/${employeeId}/promote`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log('Promotion response:', response.data);
  return response.data.employee;
}; 