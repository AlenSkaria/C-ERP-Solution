import mongoose, { Schema, Document } from 'mongoose';

// Define valid categories and subcategories
export const PRODUCT_CATEGORIES = {
    MENS: "Men's",
    WOMENS: "Women's"
} as const;

export const PRODUCT_SUBCATEGORIES = {
    [PRODUCT_CATEGORIES.MENS]: [
        "T-Shirts",
        "Shirts",
        "Jeans",
        "Pants",
        "Suits",
        "Jackets",
        "Sweaters",
        "Accessories"
    ],
    [PRODUCT_CATEGORIES.WOMENS]: [
        "Dresses",
        "Tops",
        "Pants",
        "Skirts",
        "Jeans",
        "Jackets",
        "Sweaters",
        "Accessories"
    ]
} as const;

// Define valid sizes for each category
export const PRODUCT_SIZES = {
    [PRODUCT_CATEGORIES.MENS]: ["XS", "S", "M", "L", "XL", "XXL"],
    [PRODUCT_CATEGORIES.WOMENS]: ["XS", "S", "M", "L", "XL", "XXL"]
} as const;

// Define valid product status
export const PRODUCT_STATUS = ["active", "inactive", "discontinued"] as const;

// Define product interface
export interface IProduct extends Document {
    name: string;
    description: string;
    category: keyof typeof PRODUCT_CATEGORIES;
    subCategory: string;
    brand: string;
    price: number;
    quantity: number;
    size: string[];
    color: string[];
    material: string;
    status: typeof PRODUCT_STATUS[number];
    createdAt: Date;
    updatedAt: Date;
}

// Create product schema
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters long']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: Object.keys(PRODUCT_CATEGORIES),
            message: 'Invalid category'
        }
    },
    subCategory: {
        type: String,
        required: [true, 'Subcategory is required']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
        default: 0
    },
    size: {
        type: [String],
        required: [true, 'At least one size is required']
    },
    color: {
        type: [String],
        required: [true, 'At least one color is required']
    },
    material: {
        type: String,
        required: [true, 'Material is required'],
        trim: true
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: PRODUCT_STATUS,
            message: 'Invalid status'
        },
        default: 'active'
    }
}, {
    timestamps: true
});

// Create and export the model
export const Product = mongoose.model<IProduct>('Product', productSchema); 