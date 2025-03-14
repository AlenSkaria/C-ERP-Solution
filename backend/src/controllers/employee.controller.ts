import { Request, Response } from 'express';
import { getAllEmployees, promoteEmployee } from '../services/employee.service';

export const getAllEmployeesController = async (req: Request, res: Response) => {
    try {
        const users = await getAllEmployees();
        res.json({ users });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const promoteEmployeeController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { newRole, reason } = req.body;

        const user = await promoteEmployee(id, newRole, reason);
        res.json({ user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}; 