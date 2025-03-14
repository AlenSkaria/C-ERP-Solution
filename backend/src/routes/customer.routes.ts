import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { isManagerOrAbove } from '../middleware/role.middleware';
import {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomerInfo,
    deleteCustomerInfo
} from '../controllers/customer.controller';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Allow Cashiers, Managers, Admins, and Super Admins to add a new customer
router.post('/', createCustomer); // Add a new customer
router.get('/', getCustomers); // Search for customers
router.get('/:id', getCustomer); // Get customer by ID
router.put('/:id', isManagerOrAbove, updateCustomerInfo); // Update customer
router.delete('/:id', isManagerOrAbove, deleteCustomerInfo); // Delete customer

export default router; 