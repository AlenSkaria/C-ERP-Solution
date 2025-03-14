import axios from 'axios';
import { API_BASE_URL } from './config';

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  brand: string;
  price: number;
  quantity: number;
  size: string[];
  color: string[];
  material: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Product[];
}

export const getProducts = async (): Promise<ApiResponse> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Access token required');
  }
  const response = await axios.get(`${API_BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}; 