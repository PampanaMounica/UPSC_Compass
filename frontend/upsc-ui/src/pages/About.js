import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="page-bg"
      style={{ backgroundImage: "url('/images/upsc_about.jpg')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <div className="overlay">
      <h2>About UPSC</h2>

      <p>
        The Union Public Service Commission conducts the Civil Services Examination
        for IAS, IPS, IFS and other services.
      </p>

      <p>
        This project uses AI-based semantic search to help aspirants
        retrieve relevant content efficiently.
      </p>
    </div>
  </motion.div>
);


}
