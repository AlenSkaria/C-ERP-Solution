import { Request, Response } from 'express';
import { createSale, getAllSales, getSaleById, updateSale, deleteSale } from '../services/sale.service';

// Controller function to create a new sale
export const addSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const sale = await createSale(req.body);
        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Controller function to get all sales
export const listSales = async (req: Request, res: Response): Promise<void> => {
    try {
        const sales = await getAllSales();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Controller function to get a sale by ID
export const getSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const sale = await getSaleById(req.params.id);
        if (!sale) {
            res.status(404).json({ error: 'Sale not found' });
            return;
        }
        res.json(sale);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Controller function to update a sale
export const updateSaleInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const sale = await updateSale(req.params.id, req.body);
        if (!sale) {
            res.status(404).json({ error: 'Sale not found' });
            return;
        }
        res.json(sale);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Controller function to delete a sale
export const deleteSaleInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const sale = await deleteSale(req.params.id);
        if (!sale) {
            res.status(404).json({ error: 'Sale not found' });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}; 