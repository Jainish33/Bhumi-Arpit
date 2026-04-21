/**
 * Dove — inline SVG so we have full control of animation,
 * glow, and transparent background. White feathered dove
 * with a gentle golden aura.
 */
export default function Dove() {
  return (
    <div className="dove-img">
      <svg
        viewBox="0 0 220 160"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="doveGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE8A8" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#D4AF37" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#F2EFE4" />
            <stop offset="100%" stopColor="#D9D2BE" />
          </linearGradient>
          <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E6DFC9" />
          </linearGradient>
        </defs>

        {/* Soft golden aura */}
        <ellipse cx="110" cy="80" rx="108" ry="70" fill="url(#doveGlow)" />

        {/* Back wing (feather) */}
        <path
          d="M70 80 Q55 40 100 35 Q135 40 150 70 Q120 60 90 72 Q78 76 70 80 Z"
          fill="url(#wingGrad)"
          opacity="0.9"
        />

        {/* Body */}
        <path
          d="M58 92 Q70 70 105 72 Q150 74 175 85 Q168 100 140 104 Q110 106 88 108 Q68 108 58 92 Z"
          fill="url(#bodyGrad)"
          stroke="rgba(122,90,28,0.15)"
          strokeWidth="0.8"
        />

        {/* Head */}
        <circle cx="176" cy="83" r="11" fill="url(#bodyGrad)" stroke="rgba(122,90,28,0.15)" strokeWidth="0.8" />

        {/* Beak */}
        <path d="M187 83 L196 81 L187 86 Z" fill="#E8C96A" stroke="#B08C2A" strokeWidth="0.4" />

        {/* Eye */}
        <circle cx="180" cy="81.5" r="1.3" fill="#2a2115" />

        {/* Front wing (main spread) */}
        <path
          d="M82 92 Q60 58 96 46 Q132 40 155 70 Q140 72 120 72 Q100 74 90 82 Q84 88 82 92 Z"
          fill="url(#wingGrad)"
          stroke="rgba(122,90,28,0.1)"
          strokeWidth="0.6"
        />

        {/* Wing feather lines */}
        <g stroke="rgba(122,90,28,0.18)" strokeWidth="0.6" fill="none" strokeLinecap="round">
          <path d="M98 50 Q108 58 112 70" />
          <path d="M110 48 Q118 60 122 70" />
          <path d="M122 50 Q130 62 134 70" />
          <path d="M135 54 Q142 64 146 70" />
        </g>

        {/* Tail */}
        <path
          d="M60 92 Q45 96 38 104 Q50 100 62 99 Z"
          fill="url(#bodyGrad)"
          stroke="rgba(122,90,28,0.12)"
          strokeWidth="0.6"
        />

        {/* Leg hint */}
        <path d="M130 107 Q132 114 130 118" stroke="#B08C2A" strokeWidth="0.8" fill="none" />
        <path d="M140 107 Q142 114 140 118" stroke="#B08C2A" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );
}
