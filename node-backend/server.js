const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const searchRoute = require("./routes/search");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();   // 🔥 MongoDB connected here

app.use("/search", searchRoute);

app.listen(3001, () =>
  console.log("Node backend running on port 3001")
);
