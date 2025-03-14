import axios from 'axios';
import { API_BASE_URL } from './config';

export const getCustomers = async (query = "") => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Access token required');
  }
  const response = await axios.get(`${API_BASE_URL}/customers`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: { query }
  });
  return response.data; // Assuming the response data is an array of customers
}; 