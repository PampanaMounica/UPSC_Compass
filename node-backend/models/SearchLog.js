const mongoose = require("mongoose");

const SearchLogSchema = new mongoose.Schema({
  query: String,

  ncert_count: Number,
  prelims_count: Number,
  mains_count: Number,

  avg_relevance: Number,
  avg_mrr: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SearchLog", SearchLogSchema);
