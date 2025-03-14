import { Product, IProduct } from '../models/product.model';

export const createProduct = async (productData: Partial<IProduct>): Promise<IProduct> => {
    const product = new Product(productData);
    return await product.save();
};

export const updateProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
    return await Product.findByIdAndDelete(id);
};

export const getAllProducts = async (query: any) => {
    if (Object.keys(query).length > 0) {
        return await searchProducts(query);
    }
    return await Product.find();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id);
};

export const addProduct = async (productData: IProduct) => {
    const product = new Product(productData);
    return await product.save();
};

export const searchProducts = async (query: any) => {
    const searchCriteria: any = {};
    
    if (query.query) {
        const regex = new RegExp(query.query, 'i');
        searchCriteria.$or = [
            { name: { $regex: regex } },
            { category: { $regex: regex } },
            { brand: { $regex: regex } }
        ];
    }

    return await Product.find(searchCriteria);
}; 