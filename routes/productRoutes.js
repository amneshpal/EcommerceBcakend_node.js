// const express = require("express");
// const router = express.Router();
// const { createProduct, getProducts, updateProduct, deleteProduct,addReview,getReviews} = require("../controllers/productController");
// const protect = require("../middlewares/authMiddleware");
// const roleAuth = require("../middlewares/roleMiddleware");

// // Public
// router.get("/", getProducts);

// // Only vendors or admins can create/update/delete products
// router.post("/", protect, roleAuth("vendor", "admin"), createProduct);
// router.put("/:id", protect, roleAuth("vendor", "admin"), updateProduct);
// router.delete("/:id", protect, roleAuth("admin"), deleteProduct);

// // Add review
// router.post("/:id/review", protect, addReview);

// // Get reviews
// router.get("/:id/reviews", getReviews);

// module.exports = router;




// swagger 


const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addReview,
  getReviews,
} = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");
const roleAuth = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (with filters, pagination, search)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15"
 *               description:
 *                 type: string
 *                 example: "Latest Apple iPhone"
 *               price:
 *                 type: number
 *                 example: 120000
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               stock:
 *                 type: integer
 *                 example: 10
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["iphone.png"]
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/", protect, roleAuth("vendor", "admin"), createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 16 Pro"
 *               description:
 *                 type: string
 *                 example: "Next-gen Apple iPhone"
 *               price:
 *                 type: number
 *                 example: 999
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               stock:
 *                 type: number
 *                 example: 5
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["iphone16.png"]
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, roleAuth("vendor", "admin"), updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, roleAuth("admin"), deleteProduct);

/**
 * @swagger
 * /products/{id}/review:
 *   post:
 *     summary: Add a review for a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Amazing phone with great battery life!"
 *     responses:
 *       200:
 *         description: Review added successfully
 *       400:
 *         description: Already reviewed
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post("/:id/review", protect, addReview);

/**
 * @swagger
 * /products/{id}/reviews:
 *   get:
 *     summary: Get reviews for a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/:id/reviews", getReviews);

module.exports = router;
