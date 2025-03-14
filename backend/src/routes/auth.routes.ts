import express from "express";
import { registerUser, loginUser, getProfile, getUserByIdController, getAllUsersController } from '../controllers/auth.controller';
import { registerValidation, loginValidation } from '../validations/auth.validation';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);

// Protected routes
router.get("/profile", authenticateToken, getProfile);

// Admin routes
router.get('/users', authenticateToken, isAdmin, getAllUsersController);
router.get('/users/:userId', authenticateToken, isAdmin, getUserByIdController);

export default router;
