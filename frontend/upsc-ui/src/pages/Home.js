import { motion } from "framer-motion";
import "../App.css";

export default function Home() {
  return (
    <motion.div
      className="page-bg"
      style={{ backgroundImage: "url('/images/upsc_bg.jpg')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="overlay">
        <h1>UPSC Intelligent Knowledge Retrieval</h1>
        <p>
          AI-powered search for NCERT, Prelims & Mains
        </p>
      </div>
    </motion.div>
  );
}
