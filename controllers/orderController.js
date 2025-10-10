// const Order = require("../models/Order");
// const Product = require("../models/Product");

// // Place order
// exports.createOrder = async (req, res) => {
//   const { products } = req.body;

//   let totalPrice = 0;
//   const detailedProducts = await Promise.all(products.map(async p => {
//     const prod = await Product.findById(p.productId);
//     if(!prod) throw new Error(`Product not found: ${p.productId}`);
//     totalPrice += prod.price * p.quantity;
//     return { productId: p.productId, quantity: p.quantity, price: prod.price };
//   }));

//   const order = await Order.create({
//     userId: req.user._id,
//     products: detailedProducts,
//     totalPrice,
//     status: "pending",
//     paymentStatus: "unpaid"
//   });

//   res.status(201).json(order);
// };

// // Get all orders (admin)
// exports.getOrders = async (req, res) => {
//   const orders = await Order.find().populate("userId", "name email").populate("products.productId", "name price");
//   res.json(orders);
// };

// // Update order status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     order.status = req.body.status || order.status;
//     order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getUserOrders = async (req, res) => {
//   try {
//     if (req.user._id.toString() !== req.params.userId) {
//       return res.status(403).json({ message: "Not authorized to view these orders" });
//     }

//     const orders = await Order.find({ userId: req.params.userId })
//       .populate("products.productId", "name price");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Pending order 
// exports.getPendingOrders = async (req, res) => {
//   try {
//     const pendingOrders = await Order.find({ status: "pending" })
//       .populate("userId", "name email")
//       .populate("products.productId", "name price");
    
//     res.json({
//       message: "Pending orders fetched successfully",
//       orders: pendingOrders
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch pending orders", error: error.message });
//   }
// };







const Order = require("../models/Order");
const Product = require("../models/Product");
const nodemailer = require("nodemailer");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS  // app password or email password
  }
});

// Place order
exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    let totalPrice = 0;
    const detailedProducts = await Promise.all(products.map(async p => {
      const prod = await Product.findById(p.productId);
      if (!prod) throw new Error(`Product not found: ${p.productId}`);
      totalPrice += prod.price * p.quantity;
      return { productId: p.productId, quantity: p.quantity, price: prod.price };
    }));

    const order = await Order.create({
      userId: req.user._id,
      products: detailedProducts,
      totalPrice,
      status: "pending",
      paymentStatus: "unpaid"
    });

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: `Order Confirmation - ${order._id}`,
      text: `Hi ${req.user.name},\n\nYour order has been placed successfully!\nTotal Price: ₹${totalPrice}\nStatus: ${order.status}\n\nThank you for shopping with us!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Email error:", error);
      else console.log("Email sent:", info.response);
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

// Get all orders (admin/vendor)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "name price");
    res.json({ message: "All orders fetched", orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Update order status (admin/vendor)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

    const updatedOrder = await order.save();
    res.json({ message: "Order updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};

// Get orders for a specific user (customer)
exports.getUserOrders = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: "Not authorized to view these orders" });
    }

    const orders = await Order.find({ userId: req.params.userId })
      .populate("products.productId", "name price");
    res.json({ message: "User orders fetched", orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user orders", error: error.message });
  }
};

// Get all pending orders (admin/vendor)
exports.getPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find({ status: "pending" })
      .populate("userId", "name email")
      .populate("products.productId", "name price");

    res.json({
      message: "Pending orders fetched successfully",
      orders: pendingOrders
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending orders", error: error.message });
  }
};
