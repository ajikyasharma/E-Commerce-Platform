import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ Using JWT middleware

const router = express.Router();

router.post("/create", authMiddleware, createOrder); // ✅ Place Order
router.get("/:userId", authMiddleware, getUserOrders); // ✅ Get User Orders

export default router;
