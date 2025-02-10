const express = require("express");
const router = express.Router();
const { AvailableProduct, Cart, PastOrders } = require("./models");

// 1️⃣ Get Available Products
router.get("/products", async (req, res) => {
    try {
        const products = await AvailableProduct.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2️⃣ Add Product to Cart
router.post("/cart", async (req, res) => {
    try {
        const { name, quantity } = req.body;

        // Check if the product exists
        const product = await AvailableProduct.findOne({ name });
        if (!product) {
            return res.status(404).json({ error: "Product not available" });
        }

        // Add to cart with product reference
        const newCartItem = new Cart({ product: product._id, quantity });
        await newCartItem.save();
        res.json({ message: `${name} added to cart!` });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3️⃣ Get Cart Items
router.get("/cart", async (req, res) => {
    try {
        const cartItems = await Cart.find().populate("product");
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4️⃣ Remove Item from Cart
router.delete("/cart/:id", async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: "Item removed from cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5️⃣ Get Order History
router.get("/orders", async (req, res) => {
    try {
        const orders = await PastOrders.find().populate("product");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6️⃣ Place an Order
router.post("/orders", async (req, res) => {
    try {
        const cartItems = await Cart.find();
        if (cartItems.length === 0) {
            return res.status(400).json({ error: "Your cart is empty!" });
        }

        // Convert cart items to past orders
        const orders = cartItems.map(item => ({
            product: item.product,
            quantity: item.quantity
        }));

        await PastOrders.insertMany(orders);
        await Cart.deleteMany({}); // Empty the cart after ordering

        res.json({ message: "Order placed successfully!" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7️⃣ Smart Suggestions (Dynamic)
router.get("/smart-suggestions", async (req, res) => {
    try {
        const cartItems = await Cart.find().populate("product");
        const pastOrders = await PastOrders.find().populate("product");
        const availableProducts = await AvailableProduct.find();

        let suggestions = [];
        const today = new Date();

        // 📌 Expiration-based suggestions
        pastOrders.forEach(order => {
            if (order.product.expiry && new Date(order.product.expiry) < today) {
                suggestions.push({ message: `Your ${order.product.name} may have expired. Consider restocking!` });
            }
        });

        // 📌 Substitute recommendations
        cartItems.forEach(cartItem => {
            const isAvailable = availableProducts.some(p => p.name.toLowerCase() === cartItem.product.name.toLowerCase());

            if (!isAvailable) {
                const alternatives = availableProducts
                    .filter(p => p.category === cartItem.product.category && p.name.toLowerCase() !== cartItem.product.name.toLowerCase())
                    .map(p => p.name);

                suggestions.push({
                    message: `${cartItem.product.name} is out of stock. Would you like an alternative?`,
                    alternatives: alternatives.length > 0 ? alternatives : ["No alternatives available"]
                });
            }
        });

        // 📌 Personalized reorder recommendations
        const reorderThreshold = 30;
        pastOrders.forEach(order => {
            const lastPurchaseDate = new Date(order.orderDate);
            const daysSincePurchase = Math.floor((today - lastPurchaseDate) / (1000 * 60 * 60 * 24));

            if (daysSincePurchase > reorderThreshold) {
                suggestions.push({ message: `You last bought ${order.product.name} ${daysSincePurchase} days ago. Need a refill?` });
            }
        });

        res.json({ suggestions });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
