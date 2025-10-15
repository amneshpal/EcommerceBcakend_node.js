// const express = require("express");
// const router = express.Router();
// const {createPaymentOrder,verifyPayment,updateOrderPaymentStatus} = require("../controllers/paymentController");
// const protect  = require("../middlewares/authMiddleware");

// // ✅ Create Razorpay order
// router.post("/create-order", protect, createPaymentOrder);

// // ✅ Verify payment signature
// router.post("/verify", protect, verifyPayment);

// // ✅ Update order payment status
// router.put("/update/:orderId", protect, updateOrderPaymentStatus);

// module.exports = router;






/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Razorpay Payment Management APIs
 */

const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  createPaymentOrder,
  verifyPayment,
  updateOrderPaymentStatus,
} = require("../controllers/paymentController");

/**
 * @swagger
 * /api/payments/create-order:
 *   post:
 *     summary: Create a Razorpay order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               currency:
 *                 type: string
 *                 example: INR
 *               receipt:
 *                 type: string
 *                 example: rcpt_12345
 *     responses:
 *       201:
 *         description: Razorpay order created successfully
 *       500:
 *         description: Failed to create Razorpay order
 */
router.post("/create-order", protect, createPaymentOrder);

/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify Razorpay payment signature
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *                 example: order_HK12345
 *               razorpay_payment_id:
 *                 type: string
 *                 example: pay_HK12345
 *               razorpay_signature:
 *                 type: string
 *                 example: 5a1b3c4d5e6f7g8h9i0j
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Invalid signature verification
 *       500:
 *         description: Failed to verify payment
 */
router.post("/verify", protect, verifyPayment);

/**
 * @swagger
 * /api/payments/update/{orderId}:
 *   put:
 *     summary: Update payment status of an order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: 670a1f7e3b5f2a001f2b3456
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentStatus:
 *                 type: string
 *                 enum: [pending, paid, failed]
 *                 example: paid
 *     responses:
 *       200:
 *         description: Order payment status updated
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to update order payment status
 */
router.put("/update/:orderId", protect, updateOrderPaymentStatus);

module.exports = router;
