import express from "express";
import "dotenv/config";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import cors from "cors";

const app = express(); //init express
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse form data?
app.use(cors());

// need to install and use if needed
// app.use(cookieParser())

connectDB(); // MongoDB connection starts here 

// Routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
