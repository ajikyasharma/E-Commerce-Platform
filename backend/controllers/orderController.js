import Order from "../models/Order.js"; // ✅ Order Model

// 🛍 Create a new order
export const createOrder = async (req, res) => {
    console.log("hii")
    try {
        const userId = req.user.id; // ✅ Getting user ID from JWT
        const { products, totalAmount, paymentId } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        const newOrder = new Order({
            userId,
            products,
            totalAmount,
            paymentId,
            status: "pending",
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

// 📦 Get user orders
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; // ✅ Get user ID from JWT
        const orders = await Order.find({ userId });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};
