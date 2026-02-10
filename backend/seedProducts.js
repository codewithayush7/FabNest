import mongoose from "mongoose";
import productModel from "./models/productModel.js";
import "dotenv/config";

const products = [
  {
    name: "Women Round Neck Cotton Top",
    description: "Lightweight cotton top",
    price: 100,
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    image: ["https://dummyimage.com/600x400"],
    date: Date.now(),
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "Comfortable cotton t-shirt",
    price: 200,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestseller: true,
    image: ["https://dummyimage.com/600x400"],
    date: Date.now(),
  },
  {
    name: "Men Tapered Fit Trousers",
    description: "Slim fit trousers",
    price: 190,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    image: ["https://dummyimage.com/600x400"],
    date: Date.now(),
  },
  {
    name: "Women Winter Jacket",
    description: "Warm winter jacket",
    price: 320,
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    image: ["https://dummyimage.com/600x400"],
    date: Date.now(),
  },
];

const seedProducts = async () => {
  try {
    console.log("🌱 Seeding products...");

    await mongoose.connect(process.env.MONGO_URI);

    await productModel.deleteMany();
    await productModel.insertMany(products);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();
