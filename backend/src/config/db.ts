import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Use your Atlas connection string from the environment variable
    const mongoURI = process.env.MONGOURI || "";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
