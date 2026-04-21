/**
 * Golden peacock — divine messenger matching the Indian mystical theme.
 * Deep-forest eye spots (#0B1A14 → emerald → gold) mirror the site palette.
 */
export default function Dove() {
  return (
    <div className="dove-img">
      <svg
        viewBox="0 0 240 175"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="pkAura" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#FFE8A8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pkBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5DC78" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9A6E18" />
          </linearGradient>
          <linearGradient id="pkWing" x1="0%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#F0D060" />
            <stop offset="100%" stopColor="#8A6010" />
          </linearGradient>
          <linearGradient id="pkTail" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C89010" />
            <stop offset="100%" stopColor="#6A5010" />
          </linearGradient>
        </defs>

        {/* Golden aura */}
        <ellipse cx="122" cy="95" rx="115" ry="75" fill="url(#pkAura)" />

        {/* Tail feather 1 — centre */}
        <path d="M62 98 Q38 112 14 145 Q17 135 16 148 Q23 133 25 146 Q30 126 50 110 Z" fill="url(#pkTail)" opacity="0.9" />
        <ellipse cx="15.5" cy="147" rx="4.5" ry="6" fill="#0B1A14" opacity="0.9" />
        <ellipse cx="15.5" cy="147" rx="2.5" ry="3.5" fill="#1A8060" opacity="0.85" />
        <circle cx="15.5" cy="147" r="1.2" fill="#D4AF37" />

        {/* Tail feather 2 — lower */}
        <path d="M60 107 Q36 122 16 158 Q20 147 19 160 Q26 144 28 157 Q34 136 52 118 Z" fill="url(#pkTail)" opacity="0.8" />
        <ellipse cx="18.5" cy="159" rx="4" ry="5.5" fill="#0B1A14" opacity="0.9" />
        <ellipse cx="18.5" cy="159" rx="2.2" ry="3.2" fill="#1A8060" opacity="0.85" />
        <circle cx="18.5" cy="159" r="1.1" fill="#D4AF37" />

        {/* Tail feather 3 — upper */}
        <path d="M56 90 Q32 105 12 132 Q16 122 14 134 Q22 120 23 132 Q28 113 46 102 Z" fill="url(#pkTail)" opacity="0.75" />
        <ellipse cx="13.5" cy="133" rx="4" ry="5" fill="#0B1A14" opacity="0.85" />
        <ellipse cx="13.5" cy="133" rx="2.2" ry="3" fill="#1A8060" opacity="0.8" />
        <circle cx="13.5" cy="133" r="1" fill="#D4AF37" />

        {/* Wing — back (slightly behind) */}
        <path d="M95 88 Q80 58 112 42 Q138 32 160 54 Q142 54 126 64 Q108 76 95 88 Z" fill="url(#pkWing)" stroke="#8A6010" strokeWidth="0.6" opacity="0.82" />

        {/* Wing — front (main) */}
        <path d="M82 92 Q65 58 98 40 Q128 26 155 50 Q136 50 118 62 Q100 74 82 92 Z" fill="url(#pkWing)" stroke="#8A6010" strokeWidth="0.7" />
        <g stroke="#8A6010" strokeWidth="0.6" fill="none" strokeLinecap="round">
          <path d="M102 44 Q104 58 106 72" />
          <path d="M115 40 Q116 55 118 68" />
          <path d="M128 42 Q129 56 131 70" />
          <path d="M141 48 Q142 60 143 72" />
        </g>

        {/* Body */}
        <path d="M62 100 Q76 80 114 82 Q156 84 182 92 Q175 114 148 120 Q118 124 92 120 Q66 116 62 100 Z" fill="url(#pkBody)" stroke="#8A6010" strokeWidth="0.8" />

        {/* Neck */}
        <path d="M178 92 Q190 80 194 72 Q200 78 195 84 Q186 90 178 92 Z" fill="url(#pkBody)" stroke="#8A6010" strokeWidth="0.6" />

        {/* Head */}
        <circle cx="197" cy="68" r="11.5" fill="url(#pkBody)" stroke="#8A6010" strokeWidth="0.8" />

        {/* Crest feathers */}
        <line x1="193" y1="57" x2="191" y2="46" stroke="#D4AF37" strokeWidth="1.1" />
        <line x1="197" y1="56" x2="197" y2="44" stroke="#D4AF37" strokeWidth="1.1" />
        <line x1="201" y1="57" x2="203" y2="46" stroke="#D4AF37" strokeWidth="1.1" />
        <circle cx="191" cy="45" r="2.2" fill="#1A8060" />
        <circle cx="197" cy="43" r="2.2" fill="#1A8060" />
        <circle cx="203" cy="45" r="2.2" fill="#1A8060" />

        {/* Eye */}
        <circle cx="202" cy="66" r="2" fill="#1a1000" />
        <circle cx="202.5" cy="65.5" r="0.7" fill="rgba(255,248,200,0.6)" />

        {/* Beak */}
        <path d="M208 66 L221 64 L208 70 Z" fill="#E8C96A" stroke="#946E1A" strokeWidth="0.4" />
      </svg>
    </div>
  );
}
