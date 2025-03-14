import { body } from "express-validator";

export const registerValidation = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number'),
    body('dateOfBirth')
        .isISO8601().withMessage('Invalid date format')
        .custom((value) => {
            const date = new Date(value);
            const now = new Date();
            if (date > now) {
                throw new Error('Date of birth cannot be in the future');
            }
            return true;
        }),
    body('role').isIn(['Super Admin', 'Admin', 'Manager', 'Cashier'])
        .withMessage('Invalid role')
];

export const loginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
]; 