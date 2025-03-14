import { Sale, ISale } from '../models/sale.model';
import { Product } from '../models/product.model'; // Import Product model to update stock

// Function to create a new sale
export const createSale = async (saleData: ISale) => {
    const sale = new Sale(saleData);
    // Update product stock
    await Product.findByIdAndUpdate(saleData.productId, { $inc: { quantity: -saleData.quantity } });
    return await sale.save();
};

// Function to get all sales
export const getAllSales = async () => {
    return await Sale.find().populate('customerId productId'); // Populate customer and product details
};

// Function to get a sale by ID
export const getSaleById = async (id: string) => {
    return await Sale.findById(id).populate('customerId productId');
};

// Function to update a sale
export const updateSale = async (id: string, saleData: Partial<ISale>) => {
    return await Sale.findByIdAndUpdate(id, saleData, { new: true });
};

// Function to delete a sale
export const deleteSale = async (id: string) => {
    return await Sale.findByIdAndDelete(id);
}; 