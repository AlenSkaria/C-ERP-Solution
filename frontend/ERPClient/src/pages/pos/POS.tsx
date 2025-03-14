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
    if (!customerId || !productId) {
      alert("Please select a customer and a product.");
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
      alert("Sale added successfully!");
      // Reset fields after successful sale
      setCustomerId(null);
      setProductId(null);
      setQuantity(1);
      setTotalPrice(0);
    } catch (err) {
      console.error("Error adding sale:", err);
    }
  };

  useEffect(() => {
    fetchCustomers(searchCustomerQuery);
    fetchProducts();
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-2xl font-bold mb-6">Point of Sale</h1>

        <div className="mb-4">
          <input
            type="text"
            value={searchCustomerQuery}
            onChange={(e) => {
              setSearchCustomerQuery(e.target.value);
              fetchCustomers(e.target.value);
            }}
            placeholder="Search Customer"
            className="p-2 border border-gray-300 rounded"
          />
          <ul>
            {customers && customers.map((customer) => (
              <li key={customer._id} className="flex justify-between items-center">
                <span>{customer.name}</span>
                <button
                  onClick={() => setCustomerId(customer._id)}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchProductQuery}
            onChange={(e) => {
              setSearchProductQuery(e.target.value);
            }}
            placeholder="Search Product"
            className="p-2 border border-gray-300 rounded"
          />
          <ul>
            {filteredProducts && filteredProducts.map((product) => (
              <li key={product._id} onClick={() => setProductId(product._id)}>
                {product.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label>Total Price:</label>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <button onClick={handleAddSale} className="p-2 bg-blue-500 text-white rounded">
          Add Sale
        </button>
      </div>
    </div>
  );
};

export default POS; 