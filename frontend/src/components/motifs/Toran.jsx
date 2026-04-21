/**
 * Toran — hanging mango-leaf & marigold garland.
 * Sways gently on a pendulum.
 */
export default function Toran({ width = 360, color = "#1F5134", accent = "#D4AF37" }) {
  // Ten alternating leaves + marigold beads
  const items = Array.from({ length: 11 });
  return (
    <svg viewBox="0 0 360 80" width={width} height={(width / 360) * 80} aria-hidden="true">
      <defs>
        <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a7548" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      {/* String arc */}
      <path d="M4 8 Q180 40 356 8" stroke={accent} strokeWidth="0.8" fill="none" />

      {items.map((_, i) => {
        const t = i / (items.length - 1);
        const x = 4 + t * 352;
        // quadratic bezier y at parameter t
        const y = (1 - t) * (1 - t) * 8 + 2 * (1 - t) * t * 40 + t * t * 8;
        const flip = i % 2 === 0 ? 1 : -1;
        return (
          <g
            key={i}
            transform={`translate(${x} ${y})`}
            style={{
              transformOrigin: `${x}px ${y}px`,
              animation: `toran-sway 4s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {/* Mango leaf */}
            <path
              d={`M0 0 Q${10 * flip} 12 ${4 * flip} 34 Q${-2 * flip} 22 0 0 Z`}
              fill="url(#leaf-grad)"
              stroke="#123a20"
              strokeWidth="0.5"
            />
            <path
              d={`M0 2 Q${3 * flip} 16 ${2 * flip} 30`}
              stroke="#0a2513"
              strokeWidth="0.5"
              fill="none"
              opacity="0.6"
            />
            {/* Marigold bead between leaves */}
            {i < items.length - 1 && (
              <circle
                cx={16}
                cy={8}
                r="3.2"
                fill={accent}
                stroke="#a07a20"
                strokeWidth="0.4"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
