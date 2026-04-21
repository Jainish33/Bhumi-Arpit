/**
 * Mandala — animated concentric sacred-geometry ornament.
 * Two counter-rotating rings + central lotus bud.
 * Pure SVG, no dependencies.
 */
export default function Mandala({ size = 140, color = "#D4AF37", opacity = 0.85, speed = 60 }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ opacity }}
      className="block"
    >
      <defs>
        <radialGradient id="mg-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="70%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="96" fill="url(#mg-core)" />

      {/* Outer ring — rotates one way */}
      <g
        stroke={color}
        strokeWidth="0.8"
        fill="none"
        style={{
          transformOrigin: "100px 100px",
          animation: `mandala-spin ${speed}s linear infinite`,
        }}
      >
        <circle cx="100" cy="100" r="92" strokeDasharray="1 5" />
        <circle cx="100" cy="100" r="82" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="100" y1="12" x2="100" y2="22"
            transform={`rotate(${i * 15} 100 100)`}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={`p${i}`}
            d="M100 30 Q104 38 100 44 Q96 38 100 30 Z"
            fill={color}
            fillOpacity="0.55"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </g>

      {/* Inner ring — counter-rotates */}
      <g
        stroke={color}
        strokeWidth="0.7"
        fill="none"
        style={{
          transformOrigin: "100px 100px",
          animation: `mandala-spin-rev ${speed * 0.7}s linear infinite`,
        }}
      >
        <circle cx="100" cy="100" r="64" />
        <circle cx="100" cy="100" r="52" strokeDasharray="2 3" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`pet${i}`}
            d="M100 52 Q110 70 100 86 Q90 70 100 52 Z"
            fill={color}
            fillOpacity="0.4"
            transform={`rotate(${i * 45} 100 100)`}
          />
        ))}
      </g>

      {/* Center lotus bud */}
      <g>
        <circle cx="100" cy="100" r="16" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.8" />
        <circle cx="100" cy="100" r="6" fill={color} fillOpacity="0.9" />
      </g>
    </svg>
  );
}
