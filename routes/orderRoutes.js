// const express = require("express");
// const router = express.Router();
// const { createOrder, getOrders, updateOrderStatus,getUserOrders,getPendingOrders} = require("../controllers/orderController");
// const protect = require("../middlewares/authMiddleware");
// const roleAuth = require("../middlewares/roleMiddleware");

// // Customer places order
// router.post("/", protect, roleAuth("customer"), createOrder);

// // Vendor/Admin can see all orders
// router.get("/", protect, roleAuth("vendor", "admin"), getOrders);

// // Vendor/Admin can update order status
// router.put("/:id", protect, roleAuth("vendor", "admin"), updateOrderStatus);

// // Customer can see their own orders
// router.get("/user/:userId", protect, roleAuth("customer"), getUserOrders);

// // Pending orders
// router.get("/pending", protect, roleAuth("vendor", "admin"), getPendingOrders);

// module.exports = router;



const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getUserOrders,
  getPendingOrders,
} = require("../controllers/orderController");
const protect = require("../middlewares/authMiddleware");
const roleAuth = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs for customers, vendors, and admin
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 670b5c11f7e48a44a49a78dc
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Failed to place order
 */
router.post("/", protect, roleAuth("customer"), createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (for vendor/admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all orders with user and product details
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Failed to fetch orders
 */
router.get("/", protect, roleAuth("vendor", "admin"), getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order status or payment status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: shipped
 *               paymentStatus:
 *                 type: string
 *                 example: paid
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to update order
 */
router.put("/:id", protect, roleAuth("vendor", "admin"), updateOrderStatus);

/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: Get all orders for the logged-in customer
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the logged-in user
 *     responses:
 *       200:
 *         description: Returns orders for the specific user
 *       403:
 *         description: Not authorized to view these orders
 *       404:
 *         description: Orders not found
 *       500:
 *         description: Failed to fetch user orders
 */
router.get("/user/:userId", protect, roleAuth("customer"), getUserOrders);

/**
 * @swagger
 * /orders/pending:
 *   get:
 *     summary: Get all pending orders (admin/vendor)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending orders fetched successfully
 *       500:
 *         description: Failed to fetch pending orders
 */
router.get("/pending", protect, roleAuth("vendor", "admin"), getPendingOrders);

module.exports = router;
