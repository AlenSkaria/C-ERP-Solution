import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { isManagerOrAbove } from '../middleware/role.middleware';
import {
    createProductController,
    getAllProductsController,
    getProductByIdController
} from '../controllers/product.controller';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Routes accessible by Manager, Admin, and Super Admin
router.post('/', isManagerOrAbove, createProductController);
router.get('/', isManagerOrAbove, getAllProductsController);
router.get('/:id', isManagerOrAbove, getProductByIdController);

export default router; 