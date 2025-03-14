import { Request, Response } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../services/product.service';

// Controller function to add a new product
export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Controller function to get all products or search for products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getAllProducts(req.query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Controller function to update a product
export const updateProductInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await updateProduct(req.params.id, req.body);
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

// Controller function to delete a product
export const deleteProductInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await deleteProduct(req.params.id);
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
}; 