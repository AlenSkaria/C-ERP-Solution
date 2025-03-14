import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs"; // Used to hash passwords securely
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (user: IUser): string => {
    return jwt.sign(
        { 
            id: user._id,
            email: user.email,
            role: user.role 
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
    );
};

// Get user profile
export const getUserProfile = async (userId: string): Promise<IUser> => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error("User not found");
    return user;
};

// Register user
export const register = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    dateOfBirth: Date,
    role: string
): Promise<IUser> => {
    // Check existing user by email or username
    const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
    });
    if (existingUser) {
        if (existingUser.email === email) {
            throw new Error("Email already exists");
        }
        throw new Error("Username already exists");
    }

    // Hash password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({ 
        firstName, 
        lastName, 
        username, 
        email, 
        password: hashedPassword, 
        dateOfBirth,
        role 
    });

    // Save user to database and return the saved user
    return await newUser.save();
};

// Login user
export const login = async (email: string, password: string): Promise<{ user: IUser; token: string }> => {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid credentials");

    // Generate token
    const token = generateToken(user);

    return { user, token };
};

export const getUserById = async (userId: string) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const getAllUsers = async () => {
    const users = await User.find().select('-password');
    return users;
};
