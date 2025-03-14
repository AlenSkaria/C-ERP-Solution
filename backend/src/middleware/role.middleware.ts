import { Request, Response, NextFunction } from 'express';

export const isManagerOrAbove = (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    
    if (userRole === 'Manager' || userRole === 'Admin' || userRole === 'Super Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
}; 