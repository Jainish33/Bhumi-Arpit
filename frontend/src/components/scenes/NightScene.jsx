import Lanterns from "../Lanterns";

/**
 * Fully animated SVG night sky — no photos.
 * Crescent moon, twinkling stars, drifting clouds, floating lanterns.
 */
export default function NightScene() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Deep night sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 90%, rgba(232,140,40,0.25), transparent 55%), linear-gradient(180deg, #030510 0%, #0a0d22 45%, #1a0d1a 75%, #2a1408 100%)",
        }}
      />

      {/* Twinkling stars */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        {[
          [80, 60], [150, 120], [240, 80], [320, 180], [420, 60], [520, 140],
          [620, 100], [720, 200], [820, 60], [900, 140], [180, 240], [380, 260],
          [580, 280], [780, 260], [60, 200], [940, 240], [480, 340], [280, 380],
          [680, 360], [120, 420], [860, 420], [340, 460], [540, 480], [740, 460],
        ].map(([x, y], i) => {
          const delay = (i * 0.23) % 4;
          const size = 1 + ((i * 7) % 3);
          return (
            <g key={i} style={{ animation: "star-twinkle 3s ease-in-out infinite", animationDelay: `${delay}s`, transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r={size} fill="#FFF3C7" />
              <circle cx={x} cy={y} r={size * 3} fill="#FFE9A8" opacity="0.18" />
            </g>
          );
        })}
      </svg>

      {/* Crescent moon */}
      <svg className="absolute" style={{ top: "10%", right: "12%", width: 110, height: 110, filter: "drop-shadow(0 0 40px rgba(255,233,168,0.65))" }} viewBox="0 0 120 120">
        <defs>
          <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF6DC" />
            <stop offset="80%" stopColor="#F7E0A0" />
            <stop offset="100%" stopColor="#B89A4C" />
          </radialGradient>
        </defs>
        <g style={{ transformOrigin: "60px 60px", animation: "moon-rock 16s ease-in-out infinite alternate" }}>
          <circle cx="60" cy="60" r="38" fill="url(#moon-glow)" />
          <circle cx="74" cy="52" r="36" fill="#030510" />
          {/* Tiny star beside moon */}
          <circle cx="22" cy="40" r="1.6" fill="#FFF6DC" />
          <circle cx="12" cy="72" r="1.2" fill="#FFE9A8" />
        </g>
      </svg>

      {/* Drifting wispy clouds */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" style={{ opacity: 0.4 }}>
        <defs>
          <linearGradient id="cloud" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a2438" stopOpacity="0" />
            <stop offset="50%" stopColor="#3a2438" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3a2438" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g style={{ animation: "cloud-drift 40s linear infinite" }}>
          <ellipse cx="200" cy="320" rx="260" ry="22" fill="url(#cloud)" />
          <ellipse cx="700" cy="260" rx="320" ry="18" fill="url(#cloud)" opacity="0.7" />
        </g>
      </svg>

      {/* Horizon silhouette — distant temple row */}
      <svg className="absolute bottom-0 left-0 w-full" style={{ height: "18%" }} viewBox="0 0 1000 180" preserveAspectRatio="none">
        <g fill="#03070c">
          <path d="M0 180 L0 140 L80 140 L90 110 L100 140 L160 140 L160 100 L180 80 L200 100 L200 140 L260 140 L275 115 L290 140 L360 140 L370 120 L380 140 L460 140 L470 90 L490 60 L510 90 L510 140 L590 140 L600 115 L615 140 L700 140 L710 105 L725 130 L740 140 L820 140 L835 118 L850 140 L1000 140 L1000 180 Z" />
        </g>
      </svg>

      {/* Rising lanterns */}
      <Lanterns count={16} />
    </div>
  );
}
