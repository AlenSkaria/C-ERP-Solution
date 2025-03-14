import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
    addSale,
    listSales,
    getSale,
    updateSaleInfo,
    deleteSaleInfo
} from '../controllers/sale.controller';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Routes for sales operations
router.post('/', addSale); // Create a new sale
router.get('/', listSales); // Get all sales
router.get('/:id', getSale); // Get a sale by ID
router.put('/:id', updateSaleInfo); // Update a sale
router.delete('/:id', deleteSaleInfo); // Delete a sale

export default router; 