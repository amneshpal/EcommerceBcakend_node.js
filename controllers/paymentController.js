const razorpay = require("../utils/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

// 1️⃣ Create payment order
exports.createPaymentOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      message: "Razorpay order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

// 2️⃣ Verify payment signature (after success)
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature verification",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};

// 3️⃣ Update payment status in Order
exports.updateOrderPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = paymentStatus;
    if (paymentStatus === "paid") {
      order.status = "confirmed";
    }

    await order.save();
    res.json({
      success: true,
      message: "Order payment status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order payment status",
      error: error.message,
    });
  }
};
