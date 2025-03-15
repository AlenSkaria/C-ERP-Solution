import { useEffect, useState } from "react";
import { getCustomers } from "../../api/customers"; // Function to fetch customers
import { getProducts, ApiResponse, Product } from "../../api/products"; // Function to fetch products and import ApiResponse type and Product type
import axios from "axios";
import { API_BASE_URL } from "../../api/config";

const POS = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [searchCustomerQuery, setSearchCustomerQuery] = useState<string>("");
  const [searchProductQuery, setSearchProductQuery] = useState<string>("");
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>('');
  const [selectedProductName, setSelectedProductName] = useState<string>('');
  const [saleError, setSaleError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchCustomers = async (query: string) => {
    try {
      const response: any = await getCustomers(query);
      console.log('Fetched customers:', response); // Log the fetched data
      setCustomers(response); // Assuming response is the array of customers
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const products: Product[] = await getProducts();
      console.log('Fetched products:', products); // Log the fetched data
      setProducts(products); // Set products directly
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Implement client-side filtering for product search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchProductQuery.toLowerCase())
  );

  const handleAddSale = async () => {
    console.log(customerId, productId, quantity, totalPrice);
    setSaleError(null);
    setSuccessMessage(null); // Reset success message before attempting sale
    
    if (!customerId || !productId) {
      setSaleError("Please select a customer and a product.");
      return;
    }

    const saleData = {
      customerId,
      productId,
      quantity,
      totalPrice,
    };

    try {
      await axios.post(`${API_BASE_URL}/sales`, saleData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      setSuccessMessage("Sale added successfully!");
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
      
      // Reset fields after successful sale
      setCustomerId(null);
      setProductId(null);
      setQuantity(1);
      setTotalPrice(0);
      setSelectedCustomerName('');
      setSelectedProductName('');
    } catch (err: any) {
      console.error("Error adding sale:", err);
      setSaleError(err.response?.data?.message || err.response?.data?.error || "Failed to add sale. Please try again.");
    }
  };

  // Update the customer selection handler
  const handleCustomerSelect = (customer: any) => {
    setCustomerId(customer._id);
    setSelectedCustomerName(customer.name);
  };

  // Update the product selection handler
  const handleProductSelect = (product: any) => {
    setProductId(product._id);
    setSelectedProductName(product.name);
  };

  useEffect(() => {
    fetchCustomers(searchCustomerQuery);
    fetchProducts();
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-2xl font-bold mb-6">Point of Sale</h1>

        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            value={searchCustomerQuery}
            onChange={(e) => {
              setSearchCustomerQuery(e.target.value);
              fetchCustomers(e.target.value);
            }}
            placeholder="Search Customer"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <ul className="mt-2">
            {searchCustomerQuery ? (
              customers.length > 0 ? (
                customers.map((customer) => (
                  <li key={customer._id} className="flex justify-between items-center p-2 hover:bg-gray-50">
                    <span>{customer.name}</span>
                    <button
                      onClick={() => handleCustomerSelect(customer)}
                      className="ml-2 px-2 py-1 bg-black text-white rounded hover:bg-gray-800"
                    >
                      Confirm
                    </button>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No customers found matching "{searchCustomerQuery}"</li>
              )
            ) : null}
          </ul>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Selected Customer</label>
          <input
            type="text"
            value={selectedCustomerName}
            disabled
            className="p-2 border border-gray-300 rounded w-full bg-gray-50"
            placeholder="No customer selected"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchProductQuery}
            onChange={(e) => {
              setSearchProductQuery(e.target.value);
            }}
            placeholder="Search Product"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <ul className="mt-2">
            {searchProductQuery ? (
              filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li 
                    key={product._id} 
                    onClick={() => handleProductSelect(product)}
                    className="p-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                  >
                    <span>{product.name}</span>
                    <span className="text-gray-500">₹{product.price}</span>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No products found matching "{searchProductQuery}"</li>
              )
            ) : null}
          </ul>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Selected Product</label>
          <input
            type="text"
            value={selectedProductName}
            disabled
            className="p-2 border border-gray-300 rounded w-full bg-gray-50"
            placeholder="No product selected"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Price:</label>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <button onClick={handleAddSale} className="p-2 bg-black text-white rounded hover:bg-gray-800 w-full">
          Add Sale
        </button>
        {saleError && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {saleError}
          </div>
        )}
      </div>
    </div>
  );
};

export default POS; 