import "../styles/pill.css";

export default function Pill({ label, delay = 0 }) {
  return (
    <span className="pill" style={{ animationDelay: `${delay}s` }}>
      {label}
    </span>
  );
}
