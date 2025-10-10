const express = require("express");
const router = express.Router();
const { addToCart, getCart, updateCart, removeFromCart } = require("../controllers/cartController");
const protect = require("../middlewares/authMiddleware");
const roleAuth = require("../middlewares/roleMiddleware");

// Customer actions
router.post("/", protect, roleAuth("customer"), addToCart);
router.get("/", protect, roleAuth("customer"), getCart);
router.put("/", protect, roleAuth("customer"), updateCart);
router.delete("/:productId", protect, roleAuth("customer"), removeFromCart);

module.exports = router;
