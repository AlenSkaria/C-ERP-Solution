import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { isManagerOrAbove } from '../middleware/role.middleware';
import {
    addProduct,
    getProducts,
    getProductByIdController,
    updateProductInfo,
    deleteProductInfo
} from '../controllers/product.controller';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Allow access to add and search products
router.post('/', isManagerOrAbove, addProduct); // Add a new product
router.get('/', getProducts); // Search for products
router.get('/:id', getProductByIdController); // Get product by ID
router.put('/:id', isManagerOrAbove, updateProductInfo); // Update product
router.delete('/:id', isManagerOrAbove, deleteProductInfo); // Delete product

export default router; 