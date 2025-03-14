import { Request, Response } from 'express';
import { createProduct, getAllProducts, getProductById } from '../services/product.service';

export const createProductController = async (req: Request, res: Response) => {
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

export const getAllProductsController = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
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