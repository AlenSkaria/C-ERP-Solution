import { useEffect, useState } from "react";
import { getProducts, Product, createProduct, CreateProductData } from "../../api/products";

interface ApiResponse {
  success: boolean;
  data: Product[];
}

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateProductData>({
    name: '',
    description: '',
    category: '',
    subCategory: '',
    brand: '',
    price: 0,
    quantity: 0,
    size: [],
    color: [],
    material: '',
    status: 'active',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = (await getProducts()) as ApiResponse;
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'select-multiple') {
      const { selectedOptions } = e.target as HTMLSelectElement;
      const values = Array.from(selectedOptions, (option: HTMLOptionElement) => option.value);
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Reset form error before submission
    try {
      await createProduct(formData);
      await fetchProducts(); // Refetch products to update the list
      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        category: '',
        subCategory: '',
        brand: '',
        price: 0,
        quantity: 0,
        size: [],
        color: [],
        material: '',
        status: 'active',
      });
    } catch (err) {
      setFormError("Failed to add product");
      console.error("Error adding product:", err);
    }
  };

  if (loading)
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error)
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="flex justify-center min-h-screen ">
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-2xl font-bold mb-6">Inventory</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          {showForm ? 'Close Form' : 'Add New Product'}
        </button>
        {showForm && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Add New Product</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {formError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SubCategory</label>
                <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="Shirts">Shirts</option>
                  <option value="Pants">Pants</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Brand</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <select name="size" multiple value={formData.size} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <select name="color" multiple value={formData.color} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="White">White</option>
                  <option value="Light Blue">Light Blue</option>
                  <option value="Navy">Navy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Material</label>
                <input type="text" name="material" value={formData.material} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="discontinued">Discontinued</option>
                </select>
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
                {[
                  "Name",
                  "Category",
                  "Brand",
                  "Price",
                  "Quantity",
                  "Status",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50" style={{textAlign: "center"}}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : product.status === "inactive"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
