import { Request, Response } from 'express';
import { getSalesData, getTopProducts, getSalesByCategory, getSalesHistory } from '../services/analytics.service';

// Controller function to get sales data
export const getSalesAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await getSalesData();
        res.json({ 
            success: true,
            data 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: (error as Error).message 
        });
    }
};

// Controller function to get top products
export const getTopProductsAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await getTopProducts();
        res.json({ 
            success: true,
            data 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: (error as Error).message 
        });
    }
};

// Controller function to get category sales
export const getCategoryAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await getSalesByCategory();
        res.json({ 
            success: true,
            data 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: (error as Error).message 
        });
    }
};

// Controller function to get sales history
export const getSalesHistoryAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;

        // Validate page and limit
        if (page < 1 || limit < 1 || limit > 100) {
            res.status(400).json({
                success: false,
                error: 'Invalid pagination parameters. Page must be >= 1 and limit must be between 1 and 100'
            });
            return;
        }

        const result = await getSalesHistory(page, limit);
        res.json({
            success: true,
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: (error as Error).message
        });
    }
}; 