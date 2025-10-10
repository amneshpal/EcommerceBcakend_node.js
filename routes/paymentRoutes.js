const express = require("express");
const router = express.Router();
const {createPaymentOrder,verifyPayment,updateOrderPaymentStatus} = require("../controllers/paymentController");
const protect  = require("../middlewares/authMiddleware");

// ✅ Create Razorpay order
router.post("/create-order", protect, createPaymentOrder);

// ✅ Verify payment signature
router.post("/verify", protect, verifyPayment);

// ✅ Update order payment status
router.put("/update/:orderId", protect, updateOrderPaymentStatus);

module.exports = router;
