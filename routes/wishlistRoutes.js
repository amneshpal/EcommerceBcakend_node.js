// const express = require("express");
// const router = express.Router();
// const protect = require("../middlewares/authMiddleware");
// const { addToWishlist, getWishlist, removeFromWishlist } = require("../controllers/wishlistController");
// //Allow users to save products they like.
// // Add product to wishlist
// router.post("/:productId", protect, addToWishlist);

// // Get user wishlist
// router.get("/", protect, getWishlist);

// // Remove product from wishlist
// router.delete("/:productId", protect, removeFromWishlist);

// module.exports = router;






const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management APIs for saving favorite products
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get logged-in user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     description: Fetch all products saved in the authenticated user's wishlist.
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Wishlist fetched"
 *               products:
 *                 - _id: "671c52a9fbc123a6d09a5c34"
 *                   name: "iPhone 15 Pro"
 *                   price: 120000
 *                   category: "Electronics"
 *       401:
 *         description: Unauthorized (JWT required)
 *       500:
 *         description: Failed to fetch wishlist
 */
router.get("/", protect, getWishlist);

/**
 * @swagger
 * /wishlist/{productId}:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     description: Add a product to the user's wishlist. The product ID should be passed in the URL path.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to add
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product added to wishlist"
 *               wishlist:
 *                 userId: "671c45fe2ac05b778b9e918f"
 *                 products:
 *                   - "671c52a9fbc123a6d09a5c34"
 *       400:
 *         description: Product already in wishlist
 *       401:
 *         description: Unauthorized (JWT required)
 *       500:
 *         description: Failed to add to wishlist
 */
router.post("/:productId", protect, addToWishlist);

/**
 * @swagger
 * /wishlist/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     description: Remove a specific product from the user's wishlist.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product removed from wishlist"
 *               wishlist:
 *                 userId: "671c45fe2ac05b778b9e918f"
 *                 products: []
 *       404:
 *         description: Wishlist not found
 *       401:
 *         description: Unauthorized (JWT required)
 *       500:
 *         description: Failed to remove product
 */
router.delete("/:productId", protect, removeFromWishlist);

module.exports = router;
