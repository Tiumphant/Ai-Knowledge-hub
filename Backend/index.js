// index.js
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import ConnectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 8080;

// Connect to MongoDB and start server
ConnectDB()
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
