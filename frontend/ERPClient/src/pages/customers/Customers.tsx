import { useEffect, useState } from "react";
import { getCustomers } from "../../api/customers"; // Assuming you have a function to fetch customers
import axios from "axios";
import { API_BASE_URL } from "../../api/config";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const fetchCustomers = async (query = "") => {
    try {
      const response = await getCustomers(query);
      setCustomers(response);
    } catch (err) {
      setError("Failed to fetch customers");
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = () => {
    fetchCustomers(searchQuery);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      await axios.post(`${API_BASE_URL}/customers`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowForm(false);
      setFormData({ name: '', email: '', phone: '', address: '' });
      fetchCustomers(); // Refresh the customer list
    } catch (err) {
      setFormError("Failed to add customer");
      console.error("Error adding customer:", err);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-2xl font-bold mb-6">Customers</h1>
        <div className="mb-4 flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or phone"
            className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-black text-white rounded-r-md hover:bg-gray-800"
          >
            Search
          </button>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          {showForm ? 'Close Form' : 'Add New Customer'}
        </button>
        {showForm && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Add New Customer</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {formError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleFormChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <button type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                Submit
              </button>
            </form>
          </div>
        )}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers; 