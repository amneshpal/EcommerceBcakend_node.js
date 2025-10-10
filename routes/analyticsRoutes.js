const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const roleAuth = require("../middlewares/roleMiddleware");
const { getSalesAnalytics, getTopProducts, getUserStats } = require("../controllers/analyticsController");

router.get("/sales", protect, roleAuth("admin"), getSalesAnalytics);
router.get("/products", protect, roleAuth("admin"), getTopProducts);
router.get("/users", protect, roleAuth("admin"), getUserStats);

module.exports = router;
