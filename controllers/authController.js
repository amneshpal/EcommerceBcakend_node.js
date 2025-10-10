const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc    Register new user
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Prevent normal users from registering as admin
    if (role === "admin") {
      return res.status(403).json({ message: "You cannot register as admin directly" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "customer",
    });

    res.status(201).json({
      message: "User registered successfully",
      // _id: user._id,
      // name: user.name,
      // email: user.email,
      // role: user.role,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// @desc    Get logged-in user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    if (req.user) {
      res.json({
        message: "Profile fetched successfully",
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    // Only admin can access
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const users = await User.find().select("-password"); // exclude passwords
    res.json({
      message: "All users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) user.password = req.body.password;

      const updatedUser = await user.save();

      res.json({
        message: "Profile updated successfully",
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error during profile update" });
  }
};

// @desc    Delete user account
// @route   DELETE /api/auth/delete
// @access  Private
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      await user.deleteOne();
      res.json({ message: "User account deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Server error during account deletion" });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};
