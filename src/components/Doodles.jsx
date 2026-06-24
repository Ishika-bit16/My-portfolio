import "../styles/doodles.css";

const DOODLES = [
  { id: 1, x: "5%",  y: "10%", size: 60, opacity: 0.13, rotate: 15,  delay: 0,   shape: "star"     },
  { id: 2, x: "88%", y: "5%",  size: 45, opacity: 0.10, rotate: -20, delay: 0.4, shape: "squiggle" },
  { id: 3, x: "92%", y: "40%", size: 55, opacity: 0.12, rotate: 30,  delay: 0.8, shape: "circle"   },
  { id: 4, x: "2%",  y: "55%", size: 50, opacity: 0.11, rotate: -10, delay: 1.2, shape: "diamond"  },
  { id: 5, x: "75%", y: "70%", size: 40, opacity: 0.10, rotate: 45,  delay: 0.6, shape: "star"     },
  { id: 6, x: "15%", y: "80%", size: 65, opacity: 0.09, rotate: 5,   delay: 1.0, shape: "squiggle" },
  { id: 7, x: "50%", y: "8%",  size: 35, opacity: 0.08, rotate: -35, delay: 0.2, shape: "cross"    },
  { id: 8, x: "35%", y: "92%", size: 42, opacity: 0.10, rotate: 20,  delay: 1.4, shape: "circle"   },
];

function DoodleSVG({ shape, size }) {
  if (shape === "star") return (
    <svg width={size} height={size} viewBox="0 0 60 50">
      <polygon
        points="25,2 30,18 47,18 34,29 39,46 25,36 11,46 16,29 3,18 20,18"
        fill="none" stroke="#F5C842" strokeWidth="2.5" strokeLinejoin="round"
      />
    </svg>
  );
  if (shape === "squiggle") return (
    <svg width={size} height={size / 2} viewBox="0 0 60 30">
      <path
        d="M5,15 Q20,2 35,15 Q50,28 65,15 Q72,8 78,15"
        fill="none" stroke="#7EC8A0" strokeWidth="3" strokeLinecap="round"
      />
    </svg>
  );
  if (shape === "circle") return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" stroke="#B8A9E8" strokeWidth="2.5" strokeDasharray="6 4" />
    </svg>
  );
  if (shape === "diamond") return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <polygon points="25,3 47,25 25,47 3,25" fill="none" stroke="#F5C842" strokeWidth="2.5" />
    </svg>
  );
  if (shape === "cross") return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <line x1="25" y1="5" x2="25" y2="45" stroke="#7EC8A0" strokeWidth="3" strokeLinecap="round" />
      <line x1="5" y1="25" x2="45" y2="25" stroke="#7EC8A0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
  return null;
}

export default function Doodles() {
  return (
    <div className="doodles-layer">
      {DOODLES.map((d) => (
        <div
          key={d.id}
          className="doodle"
          style={{
            left: d.x,
            top: d.y,
            opacity: d.opacity,
            transform: `rotate(${d.rotate}deg)`,
            animationDelay: `${d.delay}s`,
          }}
        >
          <DoodleSVG shape={d.shape} size={d.size} />
        </div>
      ))}
    </div>
  );
}
