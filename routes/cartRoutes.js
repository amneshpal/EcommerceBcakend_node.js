// const express = require("express");
// const router = express.Router();
// const { addToCart, getCart, updateCart, removeFromCart } = require("../controllers/cartController");
// const protect = require("../middlewares/authMiddleware");
// const roleAuth = require("../middlewares/roleMiddleware");

// // Customer actions
// router.post("/", protect, roleAuth("customer"), addToCart);
// router.get("/", protect, roleAuth("customer"), getCart);
// router.put("/", protect, roleAuth("customer"), updateCart);
// router.delete("/:productId", protect, roleAuth("customer"), removeFromCart);

// module.exports = router;






// swagger  




const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");
const protect = require("../middlewares/authMiddleware");
const roleAuth = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management APIs for customers
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add product to cart use cx token and productId after creating user and product 
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 670a4c9bf2d5b6a4c45d98ef
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to add to cart
 */
router.post("/", protect, roleAuth("customer"), addToCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get logged-in user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user's cart with product details
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Failed to fetch cart
 */
router.get("/", protect, roleAuth("customer"), getCart);

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Update quantity or remove product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 670a4c9bf2d5b6a4c45d98ef
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Product or cart not found
 *       500:
 *         description: Failed to update cart
 */
router.put("/", protect, roleAuth("customer"), updateCart);

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Remove a specific product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to remove from cart
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *       404:
 *         description: Product or cart not found
 *       500:
 *         description: Failed to remove product
 */
router.delete("/:productId", protect, roleAuth("customer"), removeFromCart);

module.exports = router;
