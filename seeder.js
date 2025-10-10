require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const connectDB = require("./config/db");

connectDB();

async function seedAdmin() {
  const adminExists = await User.findOne({ email: "admin@example.com" });
  if (adminExists) {
    console.log("Admin already exists");
    process.exit();
  }

  await User.create({
    name: "Super Admin",
    email: "admin@example.com",
    password: "Admin@123", // plain password, will be hashed by schema
    role: "admin"
  });

  console.log("Admin created successfully");
  process.exit();
}

seedAdmin();
