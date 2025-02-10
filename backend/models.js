const mongoose = require("mongoose");

// Available Products Schema
const AvailableProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    expiry: { type: Date },
});


const AvailableProduct = mongoose.model("AvailableProduct", AvailableProductSchema);

// Cart Schema
const CartSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "AvailableProduct", required: true },
    quantity: { type: Number, default: 1 },
});

const Cart = mongoose.model("Cart", CartSchema);

// Past Orders Schema
const PastOrdersSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "AvailableProduct", required: true },
    quantity: { type: Number, default: 1 },
    orderDate: { type: Date, default: Date.now },
});

const PastOrders = mongoose.model("PastOrders", PastOrdersSchema);

module.exports = { AvailableProduct, Cart, PastOrders };
