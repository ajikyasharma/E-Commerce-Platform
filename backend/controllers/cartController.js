import Cart from "../models/Cart.js";

// ✅ Add Product to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, image } = req.body;
    const userId = req.user.id; // JWT middleware se userId milegi

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, title, price, image });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Get User Cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Remove Item from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Clear Cart After Order
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.findOneAndDelete({ userId });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
