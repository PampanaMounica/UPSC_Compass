const express = require("express");
const axios = require("axios");

const router = express.Router();

// 🔹 Flask ML API URL (Render)
const FLASK_URL = "https://upsc-compass-1314.onrender.com/search";

router.post("/", async (req, res) => {
  try {
    // Call Flask ML service
    const response = await axios.post(
      FLASK_URL,
      req.body
    );

    const data = response.data;

    // --- calculate analytics ---
    const ncert = data.ncert || [];
    const prelims = data.prelims || [];
    const mains = data.mains || [];

    const avg = arr =>
      arr.length
        ? arr.reduce((sum, x) => sum + (x.relevance || 0), 0) / arr.length
        : 0;

    // --- attach analytics to response (NO DB) ---
    const analytics = {
      ncert_count: ncert.length,
      prelims_count: prelims.length,
      mains_count: mains.length,
      avg_relevance: avg([...ncert, ...prelims, ...mains]),
      avg_mrr: 0   // placeholder (can compute later)
    };

    res.json({
      ...data,
      analytics
    });

  } catch (err) {
    console.error("Search route error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
