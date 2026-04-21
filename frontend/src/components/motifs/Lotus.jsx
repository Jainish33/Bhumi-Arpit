/**
 * Lotus — stylized Indian lotus, outlined.
 * Eight petals with gentle bloom animation.
 */
export default function Lotus({ size = 80, color = "#D4AF37", opacity = 0.9, bloom = false }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden="true" style={{ opacity }}>
      <g
        style={
          bloom
            ? {
                transformOrigin: "100px 100px",
                animation: "lotus-bloom 6s ease-in-out infinite alternate",
              }
            : undefined
        }
      >
        {petals.map((r) => (
          <path
            key={r}
            d="M100 100 Q85 60 100 20 Q115 60 100 100 Z"
            fill={color}
            fillOpacity="0.18"
            stroke={color}
            strokeWidth="0.9"
            transform={`rotate(${r} 100 100)`}
          />
        ))}
        {petals.map((r) => (
          <path
            key={`in${r}`}
            d="M100 100 Q92 74 100 50 Q108 74 100 100 Z"
            fill={color}
            fillOpacity="0.32"
            stroke={color}
            strokeWidth="0.7"
            transform={`rotate(${r + 22.5} 100 100)`}
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="7" fill={color} />
      <circle cx="100" cy="100" r="3.5" fill="#FFF3C7" />
    </svg>
  );
}
