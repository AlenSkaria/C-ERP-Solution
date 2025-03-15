import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { isManagerOrAbove } from '../middleware/role.middleware';
import {
    getSalesAnalytics,
    getTopProductsAnalytics,
    getCategoryAnalytics,
    getSalesHistoryAnalytics
} from '../controllers/analytics.controller';

const router = express.Router();

// All routes require authentication and manager or above access
router.use(authenticateToken);
router.use(isManagerOrAbove);

// Analytics routes
router.get('/sales', getSalesAnalytics);
router.get('/top-products', getTopProductsAnalytics);
router.get('/categories', getCategoryAnalytics);
router.get('/sales-history', getSalesHistoryAnalytics);

export default router; 