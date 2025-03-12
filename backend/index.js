import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Database Connection
// mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// Default Route
app.get("/", (req, res) => {
    res.send("E-commerce API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
