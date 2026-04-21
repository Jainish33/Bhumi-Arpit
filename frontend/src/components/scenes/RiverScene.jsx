import Lotus from "../motifs/Lotus";

/**
 * Fully animated SVG river at golden hour — no photos.
 * Flowing sine-wave water, reflection shimmer, floating lotuses.
 */
export default function RiverScene() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Sky → water gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #2a1a10 0%, #7a4a1f 22%, #c2823a 38%, #8b5a24 50%, #2e3a3e 72%, #0c1e2c 100%)",
        }}
      />

      {/* Sun on horizon */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "38%",
          transform: "translate(-50%, -50%)",
          width: 160,
          height: 160,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, #FFE9A8 0%, #F0B65C 35%, rgba(212,175,55,0.35) 65%, transparent 80%)",
          filter: "blur(1px)",
          animation: "sun-glow 6s ease-in-out infinite alternate",
        }}
      />

      {/* Distant mountains (soft silhouette) */}
      <svg className="absolute w-full" style={{ top: "42%" }} viewBox="0 0 1000 120" preserveAspectRatio="none">
        <path d="M0 120 L0 72 L120 40 L220 70 L340 30 L460 80 L580 50 L700 72 L820 40 L940 76 L1000 50 L1000 120 Z" fill="#0c2030" opacity="0.85" />
        <path d="M0 120 L0 96 L160 80 L280 98 L420 82 L560 100 L720 84 L860 100 L1000 86 L1000 120 Z" fill="#081824" />
      </svg>

      {/* River body with flowing sine waves */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "55%" }}
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="river-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8C96A" stopOpacity="0.85" />
            <stop offset="15%" stopColor="#B4822C" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#1d3a4a" />
            <stop offset="100%" stopColor="#050e16" />
          </linearGradient>
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFE9A8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1000" height="400" fill="url(#river-grad)" />

        {/* Animated wave bands */}
        {[0, 80, 160, 240, 320].map((y, i) => (
          <g key={i} style={{ animation: `wave-flow ${6 + i * 1.5}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>
            <path
              d={`M0 ${y} Q250 ${y - 6} 500 ${y} T1000 ${y}`}
              stroke="url(#shimmer)"
              strokeWidth="1.4"
              fill="none"
              opacity={0.55 - i * 0.08}
            />
          </g>
        ))}

        {/* Reflection stripes (horizontal gold shimmer under the sun) */}
        <g style={{ animation: "reflection-shift 4s ease-in-out infinite" }}>
          <rect x="420" y="20" width="160" height="3" fill="#FFE9A8" opacity="0.6" rx="2" />
          <rect x="380" y="60" width="240" height="2" fill="#E8C96A" opacity="0.5" rx="2" />
          <rect x="340" y="110" width="320" height="2" fill="#D4AF37" opacity="0.4" rx="2" />
          <rect x="300" y="170" width="400" height="1.5" fill="#B4822C" opacity="0.35" rx="2" />
        </g>
      </svg>

      {/* Floating lotuses on water */}
      <div className="absolute" style={{ bottom: "14%", left: "12%", animation: "lotus-float 6s ease-in-out infinite" }}>
        <Lotus size={62} color="#E8C96A" opacity={0.75} bloom />
      </div>
      <div className="absolute" style={{ bottom: "8%", left: "72%", animation: "lotus-float 7.5s ease-in-out infinite", animationDelay: "1.2s" }}>
        <Lotus size={50} color="#FFD98A" opacity={0.7} />
      </div>
      <div className="absolute" style={{ bottom: "22%", left: "48%", animation: "lotus-float 5.5s ease-in-out infinite", animationDelay: "0.6s" }}>
        <Lotus size={38} color="#D4AF37" opacity={0.65} />
      </div>

      {/* Bank silhouettes (reeds) */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1000 90" preserveAspectRatio="none" style={{ height: "14%" }}>
        <g fill="#050c0a">
          <path d="M0 90 L0 70 Q40 50 60 72 Q80 40 100 72 Q130 40 160 72 L200 60 L240 72 L280 50 L320 74 L380 60 L420 74 L460 50 L500 74 L0 74 Z" opacity="0.9" />
        </g>
        <g stroke="#123a20" strokeWidth="1.2" fill="none">
          {[40, 120, 180, 260, 320, 410].map((x, i) => (
            <g key={i} style={{ transformOrigin: `${x}px 90px`, animation: `reed-sway 5s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
              <path d={`M${x} 90 Q${x + 3} 60 ${x - 2} 30`} />
              <path d={`M${x + 6} 90 Q${x + 10} 60 ${x + 5} 34`} opacity="0.7" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
