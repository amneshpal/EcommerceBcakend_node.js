const Wishlist = require("../models/Wishlist");

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else {
      if (wishlist.products.includes(productId))
        return res.status(400).json({ message: "Product already in wishlist" });
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.json({ message: "Product added to wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to wishlist", error: err.message });
  }
};

// Get user wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate("products");
    res.json({ message: "Wishlist fetched", products: wishlist ? wishlist.products : [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist", error: err.message });
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
    await wishlist.save();

    res.json({ message: "Product removed from wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove product", error: err.message });
  }
};

