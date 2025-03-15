import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';

interface User {
  firstName: string;
  lastName: string;
  role: string;
}

interface SalesData {
  date: string;
  total: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setUserRole(JSON.parse(userData).role);

      // Fetch revenue data only for admin and super admin
      if (JSON.parse(userData).role === 'Admin' || JSON.parse(userData).role === 'Super Admin') {
        fetchRevenueData();
      }
    }
    setLoading(false);
  }, []);

  const fetchRevenueData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/analytics/sales`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const salesData: SalesData[] = response.data?.data || [];
      const total = salesData.reduce((sum, item) => sum + item.total, 0);
      setTotalRevenue(total);
    } catch (error) {
      console.error('Error fetching revenue:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {user && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl mb-2">
            Welcome {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">
            You are logged in as {user.role}
          </p>
        </div>
      )}
      
      {/* Revenue Preview Card for Admin/Super Admin */}
      {(userRole === 'Admin' || userRole === 'Super Admin') && (
        <div 
          onClick={() => navigate('/analytics')}
          className="mb-6 cursor-pointer transform transition-transform"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Total Revenue</h2>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  ₹{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Click to view detailed analytics →
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Dashboard tiles </h3>
          <p className="text-gray-600">This is under development 😊</p>
        </div>
        
        
      </div>
    </div>
  );
};

export default Dashboard; 