import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';

interface SalesData {
  date: string;
  total: number;
}

interface ProductData {
  name: string;
  quantity: number;
}

interface CategoryData {
  category: string;
  sales: number;
  productCount: number;  // Number of products in this category
}

interface SaleHistoryData {
  _id: string;
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  date: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [topProducts, setTopProducts] = useState<ProductData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [salesHistory, setSalesHistory] = useState<SaleHistoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch sales data
        const salesResponse = await axios.get(`${API_BASE_URL}/analytics/sales`, { headers });
        setSalesData(salesResponse.data?.data || []);
        console.log(salesResponse.data?.data);

        // Fetch top products
        const productsResponse = await axios.get(`${API_BASE_URL}/analytics/top-products`, { headers });
        setTopProducts(productsResponse.data?.data || []);
        console.log(productsResponse.data?.data);
        // Fetch category data
        const categoryResponse = await axios.get(`${API_BASE_URL}/analytics/categories`, { headers });
        setCategoryData(categoryResponse.data?.data || []);
        console.log(categoryResponse.data?.data);

        // Fetch sales history
        const historyResponse = await axios.get(`${API_BASE_URL}/analytics/sales-history`, { headers });
        setSalesHistory(historyResponse.data?.data || []);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Format date for the table
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading analytics...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="flex flex-wrap -mx-3">
        {/* Sales Trend Chart */}
        <div className="w-full md:w-1/2 px-3 mb-6">
          <div className="bg-white p-4 rounded-lg shadow h-full">
            <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" name="Sales" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Chart */}
        {/* <div className="w-full md:w-1/2 px-3 mb-6">
          <div className="bg-white p-4 rounded-lg shadow h-full">
            <h2 className="text-lg font-semibold mb-4">Top Products</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#82ca9d" name="Units Sold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div> */}

        {/* Category Distribution */}
        <div className="w-full md:w-1/2 px-3 mb-6">
          <div className="bg-white p-4 rounded-lg shadow h-full">
            <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="sales"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No category data available
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="w-full md:w-1/2 px-3 mb-6">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4">
              <div className="bg-white p-4 rounded-lg shadow h-full">
                <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-blue-600">
                  ₹{salesData.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="w-1/2 px-2 mb-4">
              <div className="bg-white p-4 rounded-lg shadow h-full">
                <h3 className="text-lg font-semibold mb-2">Total Units Sold</h3>
                <p className="text-3xl font-bold text-green-600">
                  {topProducts.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">All time</p>
              </div>
            </div>
            <div className="w-1/2 px-2">
              <div className="bg-white p-4 rounded-lg shadow h-full">
                <h3 className="text-lg font-semibold mb-2">Active Products</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {categoryData.reduce((sum, category) => sum + (category.productCount || 0), 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">In inventory</p>
              </div>
            </div>
            <div className="w-1/2 px-2">
              <div className="bg-white p-4 rounded-lg shadow h-full">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <p className="text-3xl font-bold text-orange-600">
                  {categoryData.length}
                </p>
                <p className="text-sm text-gray-500 mt-1">Product categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales History Table Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Sales History</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesHistory.length > 0 ? (
                  salesHistory.map((sale) => (
                    <tr key={sale._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(sale.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{sale.totalPrice.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No sales history available
                    </td>
                  </tr>
                )}
              </tbody>
              {salesHistory.length > 0 && (
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-sm font-medium text-gray-900">
                      Total Sales
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      ₹{salesHistory.reduce((sum, sale) => sum + sale.totalPrice, 0).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 