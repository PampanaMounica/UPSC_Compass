import { useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";

// 🔹 Backend API (local + Render safe)
const API_URL = "https://upsc-compass-backend-7qza.onrender.com/search";


export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) {
      alert("Please enter a UPSC topic");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });

      if (!res.ok) throw new Error("Request failed");

      const result = await res.json();
      setData(result);

    } catch (err) {
      console.error(err);
      alert("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="page-bg"
      style={{ backgroundImage: "url('/images/upsc_search.jpg')" }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <div className="overlay">

        <h2>Search UPSC Topics</h2>

        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Indian Constitution"
          style={{ padding: 10, width: 300 }}
        />

        <button onClick={search} style={{ marginLeft: 10 }}>
          {loading ? "Searching..." : "Search"}
        </button>

        {/* 🔹 Results */}
        {data && ["ncert", "prelims", "mains"].map(ds => (
          <div key={ds}>
            <h3>{ds.toUpperCase()}</h3>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {(data[ds] || []).length === 0 && (
                <p>No results found</p>
              )}

              {(data[ds] || []).map((r, i) => (
                <Card key={i} item={r} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </motion.div>
  );
}
