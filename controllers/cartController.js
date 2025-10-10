const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if(!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if(cart) {
      const itemIndex = cart.products.findIndex(p => p.productId.equals(productId));
      if(itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    } else {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    }

    await cart.save();
    res.json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("products.productId", "name price");
    if(!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
};

// Update product quantity in cart
exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });
    if(!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.products.findIndex(p => p.productId.equals(productId));
    if(itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

    if(quantity <= 0) {
      cart.products.splice(itemIndex, 1);
    } else {
      cart.products[itemIndex].quantity = quantity;
    }

    await cart.save();
    res.json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart", error: error.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user._id });
    if(!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => !p.productId.equals(productId));
    await cart.save();
    res.json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove product", error: error.message });
  }
};
