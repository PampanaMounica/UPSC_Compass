import { useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";

export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const search = async () => {
    try {
      const res = await fetch("https://upsc-compass-backend.onrender.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });

      if (!res.ok) throw new Error();
      setData(await res.json());
    } catch {
      alert("Backend not reachable");
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
        Search
      </button>

      {data && ["ncert","prelims","mains"].map(ds => (
        <div key={ds}>
          <h3>{ds.toUpperCase()}</h3>
          <div style={{ display: "flex", gap: 20 }}>
            {data[ds].map((r,i)=><Card key={i} item={r} />)}
          </div>
        </div>
      ))}

    </div>
  </motion.div>
);

}