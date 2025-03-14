import { Product, IProduct } from '../models/product.model';

export const createProduct = async (productData: Partial<IProduct>): Promise<IProduct> => {
    const product = new Product(productData);
    return await product.save();
};

export const getAllProducts = async (): Promise<IProduct[]> => {
    return await Product.find({ status: { $ne: 'discontinued' } });
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id);
}; 