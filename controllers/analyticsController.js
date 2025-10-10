const Order = require("../models/Order");
const User = require("../models/User");

// a) Total sales / revenue
exports.getSalesAnalytics = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      { $match: { status: "confirmed" } }, // Only confirmed/delivered
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" }, totalOrders: { $sum: 1 } } }
    ]);

    res.json({ message: "Sales analytics fetched", analytics: sales[0] || { totalRevenue: 0, totalOrders: 0 } });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sales analytics", error: err.message });
  }
};

// b) Top-selling products
exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      { $group: { _id: "$products.productId", totalSold: { $sum: "$products.quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 10 }
    ]);

    res.json({ message: "Top-selling products fetched", topProducts });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch top products", error: err.message });
  }
};

// c) Total customers/vendors
exports.getUserStats = async (req, res) => {
  try {
    const customers = await User.countDocuments({ role: "customer" });
    const vendors = await User.countDocuments({ role: "vendor" });
    
    res.json({ message: "User stats fetched", customers, vendors });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user stats", error: err.message });
  }
};
