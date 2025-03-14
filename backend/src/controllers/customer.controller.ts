import { Request, Response } from 'express';
import { addCustomer, searchCustomers, getCustomerById, updateCustomer, deleteCustomer } from '../services/customer.service';

// Controller function to add a new customer
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const customer = await addCustomer(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Controller function to search for customers
export const getCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const customers = await searchCustomers(req.query);
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Controller function to get a customer by ID
export const getCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const customer = await getCustomerById(req.params.id);
        if (!customer) {
            res.status(404).json({ error: 'Customer not found' });
            return;
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Controller function to update a customer
export const updateCustomerInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const customer = await updateCustomer(req.params.id, req.body);
        if (!customer) {
            res.status(404).json({ error: 'Customer not found' });
            return;
        }
        res.json(customer);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Controller function to delete a customer
export const deleteCustomerInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const customer = await deleteCustomer(req.params.id);
        if (!customer) {
            res.status(404).json({ error: 'Customer not found' });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}; 