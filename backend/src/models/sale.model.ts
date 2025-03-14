import mongoose, { Schema, Document } from 'mongoose';

export interface ISale extends Document {
    customerId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    quantity: number;
    totalPrice: number;
    dateOfSale: Date;
}

const saleSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    dateOfSale: { type: Date, default: Date.now }
});

export const Sale = mongoose.model<ISale>('Sale', saleSchema); 