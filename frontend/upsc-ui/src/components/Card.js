export default function Card({ item }) {
  return (
    <div style={{
      background: "white",
      padding: 15,
      width: 300,
      borderRadius: 8,
      color: "black",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <p><b>Relevance:</b> {item.relevance}%</p>

      {Object.entries(item).map(([k,v]) =>
        !["relevance","score","keywords","prelims_keywords","mains_keywords"].includes(k)
        ? <p key={k}><b>{k}:</b> {v}</p>
        : null
      )}
    </div>
  );
}
