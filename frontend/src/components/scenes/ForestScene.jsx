import Mandala from "../motifs/Mandala";

/**
 * Fully animated SVG forest — no photos. Layered silhouettes,
 * drifting mist, glowing moon-mandala, swaying trees.
 */
export default function ForestScene({ dim = 0 }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 0, opacity: 1 - dim }}
      aria-hidden="true"
    >
      {/* Night-forest gradient sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #06110d 0%, #0b2018 40%, #0a1810 75%, #050c09 100%)",
        }}
      />

      {/* Distant glowing mandala-moon */}
      <div
        className="absolute"
        style={{ top: "8%", right: "14%", filter: "drop-shadow(0 0 40px rgba(232,201,106,0.45))" }}
      >
        <Mandala size={220} color="#E8C96A" opacity={0.45} speed={90} />
      </div>

      {/* Soft mist bands */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        <defs>
          <linearGradient id="mist" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1a3a2a" stopOpacity="0" />
            <stop offset="50%" stopColor="#1a3a2a" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1a3a2a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g style={{ animation: "mist-drift 22s ease-in-out infinite alternate" }}>
          <ellipse cx="300" cy="600" rx="520" ry="90" fill="url(#mist)" opacity="0.6" />
          <ellipse cx="800" cy="680" rx="420" ry="60" fill="url(#mist)" opacity="0.5" />
        </g>
        <g style={{ animation: "mist-drift 30s ease-in-out infinite alternate-reverse" }}>
          <ellipse cx="500" cy="780" rx="620" ry="70" fill="url(#mist)" opacity="0.55" />
        </g>
      </svg>

      {/* Back tree layer (tiny distant trees) */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1000 260" preserveAspectRatio="none">
        <g fill="#0a1a13" opacity="0.9">
          {Array.from({ length: 14 }).map((_, i) => {
            const x = (i / 13) * 1000;
            const h = 120 + ((i * 37) % 50);
            return (
              <g
                key={i}
                style={{
                  transformOrigin: `${x}px 260px`,
                  animation: `tree-sway ${8 + (i % 5)}s ease-in-out infinite`,
                  animationDelay: `${(i % 4) * 0.6}s`,
                }}
              >
                {/* Tall cypress-like tree */}
                <path d={`M${x - 10} 260 L${x} ${260 - h} L${x + 10} 260 Z`} />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Middle tree layer — full trees with foliage */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1000 340" preserveAspectRatio="none">
        <g fill="#06110c">
          {[
            { x: 120, s: 1 },
            { x: 260, s: 1.2 },
            { x: 420, s: 0.9 },
            { x: 600, s: 1.15 },
            { x: 780, s: 1 },
            { x: 920, s: 1.05 },
          ].map((t, i) => (
            <g
              key={i}
              style={{
                transformOrigin: `${t.x}px 340px`,
                animation: `tree-sway ${9 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <rect x={t.x - 3} y={120} width="6" height="220" />
              <ellipse cx={t.x} cy={120} rx={44 * t.s} ry={56 * t.s} />
              <ellipse cx={t.x - 20 * t.s} cy={150} rx={30 * t.s} ry={40 * t.s} />
              <ellipse cx={t.x + 20 * t.s} cy={150} rx={30 * t.s} ry={40 * t.s} />
              <ellipse cx={t.x} cy={88} rx={30 * t.s} ry={38 * t.s} />
            </g>
          ))}
        </g>
      </svg>

      {/* Sun-ray beams piercing through canopy */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
        style={{ mixBlendMode: "screen", opacity: 0.55 }}
      >
        <defs>
          <linearGradient id="ray" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g style={{ transformOrigin: "700px 0", animation: "ray-breathe 8s ease-in-out infinite alternate" }}>
          <polygon points="680,0 720,0 820,1000 740,1000" fill="url(#ray)" />
          <polygon points="740,0 760,0 900,1000 820,1000" fill="url(#ray)" opacity="0.7" />
          <polygon points="600,0 640,0 620,1000 540,1000" fill="url(#ray)" opacity="0.6" />
          <polygon points="780,0 800,0 960,1000 880,1000" fill="url(#ray)" opacity="0.5" />
        </g>
      </svg>

      {/* Fireflies — a couple of bright pulsing dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        {[
          [180, 400, 0],
          [320, 620, 1.2],
          [640, 520, 2.4],
          [780, 380, 0.6],
          [460, 720, 1.8],
        ].map(([x, y, d], i) => (
          <g key={i} style={{ animation: `firefly-pulse 3s ease-in-out infinite`, animationDelay: `${d}s`, transformOrigin: `${x}px ${y}px` }}>
            <circle cx={x} cy={y} r="4" fill="#FFF1B5" opacity="0.9" />
            <circle cx={x} cy={y} r="14" fill="#FFE9A8" opacity="0.18" />
          </g>
        ))}
      </svg>

      {/* Foreground branch with hanging leaves */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1000 180" preserveAspectRatio="none">
        <g style={{ transformOrigin: "0 0", animation: "branch-sway 6s ease-in-out infinite" }}>
          <path d="M0 20 Q180 60 380 40 Q420 38 430 60" stroke="#0a1a13" strokeWidth="4" fill="none" />
          {[60, 140, 220, 300, 370].map((x, i) => (
            <g key={i} transform={`translate(${x} ${i % 2 ? 70 : 60})`}>
              <path d="M0 0 Q8 12 4 28 Q0 22 0 0 Z" fill="#0f2a1c" stroke="#1f5134" strokeWidth="0.4" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
