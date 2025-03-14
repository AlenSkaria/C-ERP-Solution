import { Request, Response } from "express";
import { register, login, getUserProfile, getUserById, getAllUsers } from "../services/auth.service";
import { validationResult } from "express-validator";

// Controller function to handle user registration
export const registerUser = async (req: Request, res: Response) => {
    try {
        // Check for validation errors which is actually done in the middleware Register validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        // Extract data from request body
        const { firstName, lastName, username, email, password, dateOfBirth, role } = req.body;

        // Call register function from auth.service.ts
        const user = await register(
            firstName,
            lastName,
            username,
            email,
            password,
            new Date(dateOfBirth),
            role
        );

        // Send success response
        res.status(201).json({ 
            message: "User registered successfully", 
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                role: user.role
            }
        });
    } catch (err) {
        // Send error response if registration fails
        res.status(400).json({ error: (err as Error).message });
    }
};

// Controller function to handle user login
export const loginUser = async (req: Request, res: Response) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        // Extract data from request body
        const { email, password } = req.body;

        // Call login function from auth.service.ts
        const { user, token } = await login(email, password);

        // Send success response with token
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                role: user.role
            },
            token
        });
    } catch (err) {
        // Send error response if login fails
        res.status(401).json({ error: (err as Error).message });
    }
};

// Controller function to get user profile
export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const user = await getUserProfile(userId);
        res.json({ user });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};

export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await getUserById(userId);
        res.json({ user });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json({ users });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
  