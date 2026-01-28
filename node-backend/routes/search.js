const express = require("express");
const axios = require("axios");
const SearchLog = require("../models/SearchLog");

const router = express.Router();
const FLASK_URL = "https://upsc-ml-api.onrender.com/search";


router.post("/", async (req, res) => {
  try {
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
        ? arr.reduce((s,x)=>s+(x.relevance||0),0)/arr.length
        : 0;

    // --- save to MongoDB ---
    await SearchLog.create({
      query: req.body.query,
      ncert_count: ncert.length,
      prelims_count: prelims.length,
      mains_count: mains.length,
      avg_relevance: avg([...ncert,...prelims,...mains]),
      avg_mrr: 0   // optional (you can compute later)
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
