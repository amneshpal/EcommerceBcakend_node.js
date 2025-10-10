const express = require("express");
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct,addReview,getReviews} = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");
const roleAuth = require("../middlewares/roleMiddleware");

// Public
router.get("/", getProducts);

// Only vendors or admins can create/update/delete products
router.post("/", protect, roleAuth("vendor", "admin"), createProduct);
router.put("/:id", protect, roleAuth("vendor", "admin"), updateProduct);
router.delete("/:id", protect, roleAuth("admin"), deleteProduct);

// Add review
router.post("/:id/review", protect, addReview);

// Get reviews
router.get("/:id/reviews", getReviews);

module.exports = router;
