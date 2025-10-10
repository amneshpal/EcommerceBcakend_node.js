const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controllers/wishlistController");
//Allow users to save products they like.
// Add product to wishlist
router.post("/:productId", protect, addToWishlist);

// Get user wishlist
router.get("/", protect, getWishlist);

// Remove product from wishlist
router.delete("/:productId", protect, removeFromWishlist);

module.exports = router;
