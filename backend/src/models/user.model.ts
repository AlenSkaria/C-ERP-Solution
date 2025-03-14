// Define an interface representing a user document in MongoDB.

import mongoose, { Model, Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  role: "Super Admin" | "Admin" | "Manager" | "Cashier";
  createdAt: Date;
  updatedAt: Date;
}

// schema corresponding to the document interface.

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: { 
      type: String, 
      required: true,
      trim: true 
    },
    lastName: { 
      type: String, 
      required: true,
      trim: true 
    },
    username: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    dateOfBirth: { 
      type: Date, 
      required: true 
    },
    role: {
      type: String,
      enum: ["Super Admin", "Admin", "Manager", "Cashier"],
      default: "Cashier",
    },
  },
  { timestamps: true }
);

// Creating and exporting the model.

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
