import mongoose, { Schema, Document } from 'mongoose';

// Define customer interface
export interface ICustomer extends Document {
    name: string;
    email: string;
    phone: string;
    address: string;
    
}

// Create customer schema
const customerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
}, { timestamps: true });

// Create and export the model
export const Customer = mongoose.model<ICustomer>('Customer', customerSchema); 