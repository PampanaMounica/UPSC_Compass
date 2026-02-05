const express = require("express");
const cors = require("cors");
const searchRoute = require("./routes/search");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Health check (REQUIRED for Render)
app.get("/", (req, res) => {
  res.status(200).send("UPSC Compass Backend Running");
});

// 🔹 Routes
app.use("/search", searchRoute);

// 🔹 Render dynamic port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Node backend running on port ${PORT}`);
});
