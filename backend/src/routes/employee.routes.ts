import express from 'express';
import { getAllEmployeesController, promoteEmployeeController } from '../controllers/employee.controller';
import { authenticateToken, isSuperAdmin } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication and Super Admin role
router.use(authenticateToken, isSuperAdmin);

// Get all employees
router.get('/', getAllEmployeesController);

// Promote employee
router.put('/:id/promote', promoteEmployeeController);

export default router; 