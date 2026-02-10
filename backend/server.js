import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 10000;

// DB & services
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5175",
      "https://fabnest.onrender.com",
    ],
    credentials: true,
  }),
);

// API routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ---- STATIC FILES (SAFE) ----
const frontendDist = path.join(__dirname, "../frontend/dist");
const adminDist = path.join(__dirname, "../admin/dist");

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
}

if (fs.existsSync(adminDist)) {
  app.use("/admin", express.static(adminDist));
}

// ---- SPA FALLBACK (Express 5 safe) ----
if (fs.existsSync(frontendDist)) {
  app.use((req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server running on port:", port);
});
