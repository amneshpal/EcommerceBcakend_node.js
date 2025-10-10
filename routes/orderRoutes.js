const express = require("express");
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus,getUserOrders,getPendingOrders} = require("../controllers/orderController");
const protect = require("../middlewares/authMiddleware");
const roleAuth = require("../middlewares/roleMiddleware");

// Customer places order
router.post("/", protect, roleAuth("customer"), createOrder);

// Vendor/Admin can see all orders
router.get("/", protect, roleAuth("vendor", "admin"), getOrders);

// Vendor/Admin can update order status
router.put("/:id", protect, roleAuth("vendor", "admin"), updateOrderStatus);

// Customer can see their own orders
router.get("/user/:userId", protect, roleAuth("customer"), getUserOrders);

// Pending orders
router.get("/pending", protect, roleAuth("vendor", "admin"), getPendingOrders);

module.exports = router;
