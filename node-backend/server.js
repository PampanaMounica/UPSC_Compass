const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const searchRoute = require("./routes/search");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();   // 🔥 MongoDB connected here

// 🔹 HEALTH CHECK ROUTE (IMPORTANT FOR RENDER)
app.get("/", (req, res) => {
  res.status(200).send("UPSC Compass Backend Running");
});

// Routes
app.use("/search", searchRoute);

// Port (Render requires this)
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Node backend running on port ${PORT}`);
});
