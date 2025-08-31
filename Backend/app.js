// app.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import docRoutes from "./routes/docRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true, // allow cookies/auth headers
  })
);

// Routes
app.use("/api", authRoutes);
app.use("/api", docRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

export default app;
