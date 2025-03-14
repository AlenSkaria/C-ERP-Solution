import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api/config";

interface Sale {
  _id: string;
  customerId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  productId: {
    _id: string;
    name: string;
    description: string;
    category: string;
    subCategory: string;
    brand: string;
    price: number;
  };
  quantity: number;
  totalPrice: number;
  dateOfSale: string;
}

const Sales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sales`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSales(response.data);
    } catch (err) {
      setError("Failed to fetch sales history");
      console.error("Error fetching sales:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-2xl font-bold mb-6">Sales History</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date of Sale</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.customerId.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.productId.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{sale.totalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sale.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales; 