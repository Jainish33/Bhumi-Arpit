import Mandala from "../motifs/Mandala";
import OmSymbol from "../motifs/OmSymbol";

/**
 * Fully animated SVG temple scene — no photos.
 * Symmetrical temple silhouette with kalash, dome, spire.
 * Giant divine mandala halo behind. Om symbol glowing.
 */
export default function TempleScene() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Dusk sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, rgba(212,140,60,0.35), transparent 55%), linear-gradient(180deg, #1a0f1c 0%, #2a1428 40%, #3a1a1a 60%, #1a0f14 100%)",
        }}
      />

      {/* Large divine mandala halo behind temple */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "38%",
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 0 50px rgba(232,201,106,0.55))",
        }}
      >
        <Mandala size={360} color="#E8C96A" opacity={0.55} speed={80} />
      </div>

      {/* Sacred geometry rays (fanning out from temple) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" style={{ mixBlendMode: "screen", opacity: 0.5 }}>
        <defs>
          <linearGradient id="tray" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFD98A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFD98A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g style={{ transformOrigin: "500px 700px", animation: "ray-breathe 10s ease-in-out infinite alternate" }}>
          {[-60, -40, -20, 0, 20, 40, 60].map((deg, i) => (
            <polygon
              key={i}
              points="490,700 510,700 560,0 440,0"
              fill="url(#tray)"
              opacity={0.35 + (i === 3 ? 0.25 : 0)}
              transform={`rotate(${deg} 500 700)`}
            />
          ))}
        </g>
      </svg>

      {/* Distant hills */}
      <svg className="absolute bottom-0 left-0 w-full" style={{ height: "40%" }} viewBox="0 0 1000 300" preserveAspectRatio="none">
        <path d="M0 300 L0 200 L140 150 L260 190 L380 140 L520 200 L660 150 L800 200 L940 160 L1000 180 L1000 300 Z" fill="#0f0714" opacity="0.9" />
      </svg>

      {/* Temple silhouette - symmetric */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        viewBox="0 0 400 420"
        width="min(85vw, 520px)"
        style={{ filter: "drop-shadow(0 -10px 40px rgba(232,201,106,0.2))" }}
      >
        <g fill="#08040a" stroke="#D4AF37" strokeWidth="0.7">
          {/* Base platform */}
          <rect x="40" y="380" width="320" height="38" />
          <rect x="60" y="360" width="280" height="22" />
          {/* Main hall */}
          <rect x="110" y="260" width="180" height="100" />
          {/* Door arch */}
          <path d="M180 360 L180 310 Q200 280 220 310 L220 360 Z" fill="#1a0a1a" />
          {/* Side towers */}
          <polygon points="80,360 110,210 140,360" />
          <polygon points="260,360 290,210 320,360" />
          {/* Central shikhara (spire) stepped */}
          <polygon points="150,260 200,80 250,260" />
          <polygon points="160,220 200,140 240,220" fill="#0f060f" />
          <polygon points="170,180 200,120 230,180" fill="#180a16" />
          {/* Kalash (pot) at top */}
          <circle cx="200" cy="70" r="10" fill="#E8C96A" stroke="#B4822C" />
          <rect x="197" y="50" width="6" height="22" fill="#D4AF37" />
          <polygon points="200,40 194,54 206,54" fill="#E8C96A" />
          {/* Small mango-leaf decorations under kalash */}
          <path d="M190 78 Q200 86 210 78" fill="#2a7548" stroke="#123a20" />
        </g>

        {/* Warm light from inside sanctuary */}
        <rect x="184" y="322" width="32" height="36" fill="url(#sanctum)" opacity="0.9">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </rect>
        <defs>
          <radialGradient id="sanctum" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#FFE9A8" />
            <stop offset="100%" stopColor="#E87A2C" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating Om above the temple */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "14%",
          transform: "translateX(-50%)",
          filter: "drop-shadow(0 0 12px rgba(232,201,106,0.7))",
          animation: "om-pulse 4s ease-in-out infinite",
        }}
      >
        <OmSymbol size={56} color="#FFD98A" />
      </div>
    </div>
  );
}
