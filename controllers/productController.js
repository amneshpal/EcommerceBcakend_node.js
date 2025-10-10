const Product = require("../models/Product");

// Create product (vendor/admin)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, images } = req.body;
    const product = await Product.create({ 
      name, 
      description, 
      price, 
      category, 
      stock, 
      images, 
      vendorId: req.user._id 
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

// Get all products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json({ message: "Products retrieved successfully", products });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to retrieve products", error: error.message });
//   }
// };


// Pagination, Search & Filters in product listing
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", category, minPrice, maxPrice } = req.query;
    const query = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category = category;
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({ message: "Products fetched", total, page: Number(page), limit: Number(limit), products });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};



// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product retrieved successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve product", error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    Object.assign(product, req.body);
    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    await product.remove();
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};


// Add review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyReviewed = product.reviews.find(r => r.userId.toString() === req.user._id.toString());
    if (alreadyReviewed) return res.status(400).json({ message: "You already reviewed this product" });

    product.reviews.push({ userId: req.user._id, rating, comment });
    await product.save();

    res.json({ message: "Review added", reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ message: "Failed to add review", error: err.message });
  }
};

// Get reviews
exports.getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews.userId", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Reviews fetched", reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
};