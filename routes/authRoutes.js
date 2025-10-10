const express = require("express");
const router = express.Router();
const { signup, login, getProfile, updateProfile, deleteAccount, logout, getAllUsers } = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");
const roleAuth = require("../middlewares/roleMiddleware"); // <-- Add this

// Public
router.post("/signup", signup);
router.post("/login", login);

// Private
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/delete", protect, deleteAccount);
router.post("/logout", protect, logout);

// Only admin can access this route.
// Passwords are never returned.
router.get("/users", protect, roleAuth("admin"), getAllUsers);

module.exports = router;
