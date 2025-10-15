// const express = require("express");
// const router = express.Router();
// const protect = require("../middlewares/authMiddleware");
// const roleAuth = require("../middlewares/roleMiddleware");
// const { getSalesAnalytics, getTopProducts, getUserStats } = require("../controllers/analyticsController");

// router.get("/sales", protect, roleAuth("admin"), getSalesAnalytics);
// router.get("/products", protect, roleAuth("admin"), getTopProducts);
// router.get("/users", protect, roleAuth("admin"), getUserStats);

// module.exports = router;





const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const roleAuth = require("../middlewares/roleMiddleware");
const {
  getSalesAnalytics,
  getTopProducts,
  getUserStats,
} = require("../controllers/analyticsController");

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Admin-only analytics APIs for monitoring performance
 */

/**
 * @swagger
 * /analytics/sales:
 *   get:
 *     summary: Get total sales and revenue analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     description: Returns total confirmed orders and total revenue (for admin only).
 *     responses:
 *       200:
 *         description: Sales analytics fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Sales analytics fetched"
 *               analytics:
 *                 totalRevenue: 150000
 *                 totalOrders: 45
 *       403:
 *         description: Unauthorized (Only admin can access)
 *       500:
 *         description: Failed to fetch analytics
 */
router.get("/sales", protect, roleAuth("admin"), getSalesAnalytics);

/**
 * @swagger
 * /analytics/products:
 *   get:
 *     summary: Get top-selling products
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     description: Returns a list of top 10 best-selling products based on quantity sold.
 *     responses:
 *       200:
 *         description: Top-selling products fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Top-selling products fetched"
 *               topProducts:
 *                 - _id: "671c45fe2ac05b778b9e918f"
 *                   totalSold: 120
 *                 - _id: "671c45fe2ac05b778b9e9192"
 *                   totalSold: 85
 *       403:
 *         description: Unauthorized (Only admin can access)
 *       500:
 *         description: Failed to fetch top products
 */
router.get("/products", protect, roleAuth("admin"), getTopProducts);

/**
 * @swagger
 * /analytics/users:
 *   get:
 *     summary: Get user statistics (total customers and vendors)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     description: Returns total number of registered customers and vendors.
 *     responses:
 *       200:
 *         description: User stats fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User stats fetched"
 *               customers: 120
 *               vendors: 15
 *       403:
 *         description: Unauthorized (Only admin can access)
 *       500:
 *         description: Failed to fetch user stats
 */
router.get("/users", protect, roleAuth("admin"), getUserStats);

module.exports = router;
