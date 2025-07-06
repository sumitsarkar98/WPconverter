import express from "express";
import productsRoutes from "./routes/products.routes.js";
import path from "path";
import cors from "cors";

const app = express();

// CORS config
app.use(
  cors({
    origin: "https://w-pconverter.vercel.app",
    methods: ["POST"],
  })
);

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api", productsRoutes);

export default app;
