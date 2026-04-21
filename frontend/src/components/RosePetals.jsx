const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${4 + ((i * 19 + 5) % 90)}%`,
  delay: `${((i * 0.6 + 0.2) % 7).toFixed(2)}s`,
  duration: `${(5.5 + ((i * 0.85) % 3)).toFixed(1)}s`,
  size: 10 + ((i * 3) % 10),
  rot: 120 + ((i * 57) % 240),
  hue: 340 + ((i * 7) % 30),
}));

export default function RosePetals() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {PETALS.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: "-2%",
            "--petal-rot": `${p.rot}deg`,
            animation: `petal-fall ${p.duration} ease-in ${p.delay} infinite`,
          }}
        >
          <svg width={p.size} height={Math.round(p.size * 1.4)} viewBox="0 0 20 28">
            <defs>
              <radialGradient id={`pg${p.id}`} cx="45%" cy="35%" r="60%">
                <stop offset="0%" stopColor={`hsl(${p.hue}, 75%, 70%)`} />
                <stop offset="100%" stopColor={`hsl(${p.hue}, 65%, 48%)`} />
              </radialGradient>
            </defs>
            <path
              d="M10 2 Q18 7 16 18 Q10 26 4 18 Q2 7 10 2 Z"
              fill={`url(#pg${p.id})`}
              stroke={`hsl(${p.hue}, 60%, 38%)`}
              strokeWidth="0.4"
              opacity="0.85"
            />
            <path
              d="M10 5 Q13 11 11 18 Q10 21 9 18 Q7 11 10 5 Z"
              fill="rgba(255,255,255,0.25)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
