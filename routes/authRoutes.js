
// swagger 



// const express = require("express");
// const router = express.Router();
// const {
//   signup,
//   login,
//   getProfile,
//   updateProfile,
//   deleteAccount,
//   logout,
//   getAllUsers,
// } = require("../controllers/authController");
// const protect = require("../middlewares/authMiddleware");
// const roleAuth = require("../middlewares/roleMiddleware");

// /**
//  * @swagger
//  * tags:
//  *   name: Authentication
//  *   description: User authentication and profile management
//  */



// /**
//  * @swagger
//  * /auth/signup:
//  *   post:
//  *     summary: Register a new user
//  *     tags: [Authentication]
//  *     description: Creates a new user account with name, email, password, and role.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *               - password
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: John Doe
//  *               email:
//  *                 type: string
//  *                 example: johndoe@example.com
//  *               password:
//  *                 type: string
//  *                 example: 123456
//  *               role:
//  *                 type: string
//  *                 enum: [customer, vendor]
//  *                 example: customer
//  *     responses:
//  *       201:
//  *         description: User registered successfully
//  *       400:
//  *         description: User already exists
//  *       403:
//  *         description: Cannot register as admin directly
//  *       500:
//  *         description: Server error during signup
//  */
// router.post("/signup", signup);

// /**
//  * @swagger
//  * /auth/login:
//  *   post:
//  *     summary: Login a user
//  *     tags: [Authentication]
//  *     description: Authenticates a user and returns a JWT token.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: johndoe@example.com
//  *               password:
//  *                 type: string
//  *                 example: 123456
//  *     responses:
//  *       200:
//  *         description: Login successful
//  *       401:
//  *         description: Invalid email or password
//  *       500:
//  *         description: Server error during login
//  */
// router.post("/login", login);

// /**
//  * @swagger
//  * /auth/profile:
//  *   get:
//  *     summary: Get logged-in user profile
//  *     tags: [Authentication]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Profile fetched successfully
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Server error while fetching profile
//  */
// router.get("/profile", protect, getProfile);

// /**
//  * @swagger
//  * /auth/profile:
//  *   put:
//  *     summary: Update user profile
//  *     tags: [Authentication]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: false
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: New Name
//  *               email:
//  *                 type: string
//  *                 example: newemail@example.com
//  *               password:
//  *                 type: string
//  *                 example: newpassword123
//  *     responses:
//  *       200:
//  *         description: Profile updated successfully
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Server error during profile update
//  */
// router.put("/profile", protect, updateProfile);

// /**
//  * @swagger
//  * /auth/delete:
//  *   delete:
//  *     summary: Delete user account
//  *     tags: [Authentication]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: User account deleted successfully
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Server error during account deletion
//  */
// router.delete("/delete", protect, deleteAccount);

// /**
//  * @swagger
//  * /auth/logout:
//  *   post:
//  *     summary: Logout user
//  *     tags: [Authentication]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Logged out successfully
//  */
// router.post("/logout", protect, logout);

// /**
//  * @swagger
//  * /auth/users:
//  *   get:
//  *     summary: Get all users (Admin only)
//  *     tags: [Authentication]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: All users fetched successfully
//  *       403:
//  *         description: Access denied (Admins only)
//  *       500:
//  *         description: Server error while fetching users
//  */
// router.get("/users", protect, roleAuth("admin"), getAllUsers);

// module.exports = router;





// const express = require("express");
// const router = express.Router();
// const {
//   signup,
//   login,
//   getProfile,
//   updateProfile,
//   deleteAccount,
//   logout,
//   getAllUsers,
//   forgotPassword,
//   resetPassword,
//   // verifyEmail,
//   // verifyPhone
// } = require("../controllers/authController");

// const protect = require("../middlewares/authMiddleware");
// const roleAuth = require("../middlewares/roleMiddleware");

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/forgot-password", forgotPassword);
// router.put("/reset-password/:resetToken", resetPassword);
// router.get("/profile", protect, getProfile);
// router.put("/profile", protect, updateProfile);
// router.delete("/delete", protect, deleteAccount);
// router.post("/logout", protect, logout);
// router.get("/users", protect, roleAuth("admin"), getAllUsers);
// // router.get("/verify-email/:token", verifyEmail);
// // router.post("/verify-phone", verifyPhone);

// module.exports = router;






/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and management APIs
 */

const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const roleAuth = require("../middlewares/roleMiddleware");
const {
  signup,
  login,
  getProfile,
  updateProfile,
  deleteAccount,
  logout,
  getAllUsers,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "John Doe" }
 *               email: { type: string, example: "john@example.com" }
 *               password: { type: string, example: "password123" }
 *               role: { type: string, example: "customer" }
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post("/signup", signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "john@example.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset link
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "john@example.com" }
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /auth/reset-password/{resetToken}:
 *   put:
 *     summary: Reset password using token
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         schema:
 *           type: string
 *           example: 123abcresetToken
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password: { type: string, example: "newPassword123" }
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.put("/reset-password/:resetToken", resetPassword);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       404:
 *         description: User not found
 */
router.get("/profile", protect, getProfile);

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "John Doe" }
 *               email: { type: string, example: "john@example.com" }
 *               password: { type: string, example: "newPassword123" }
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: User not found
 */
router.put("/profile", protect, updateProfile);

/**
 * @swagger
 * /auth/delete:
 *   delete:
 *     summary: Delete logged-in user account
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/delete", protect, deleteAccount);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", protect, logout);

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users fetched successfully
 *       403:
 *         description: Admins only
 */
router.get("/users", protect, roleAuth("admin"), getAllUsers);

module.exports = router;
