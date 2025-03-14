import User from '../models/user.model';
import { IUser } from '../models/user.model';

export const getAllEmployees = async (): Promise<IUser[]> => {
    const users = await User.find().select('-password -__v');
    return users;
};

export const promoteEmployee = async (
    userId: string,
    newRole: 'Admin' | 'Manager',
    reason: string
): Promise<IUser> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Only allow promotion to Admin or Manager
    if (newRole !== 'Admin' && newRole !== 'Manager') {
        throw new Error('Invalid promotion role. Can only promote to Admin or Manager');
    }

    // Store the promotion reason (you might want to create a separate collection for this)
    user.role = newRole;
    await user.save();

    return user;
}; 