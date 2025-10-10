// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   price: { type: Number, required: true },
//   category: String,
//   stock: { type: Number, default: 0 },
//   images: [String],
//   vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// }, { timestamps: true });

// module.exports = mongoose.model("Product", productSchema);




const mongoose = require("mongoose");

// Sub-schema for reviews
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, default: 0 },
  images: [String],
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviews: [reviewSchema]   // <-- added reviews
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
