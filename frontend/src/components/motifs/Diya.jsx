/**
 * Diya — oil lamp with a flickering flame.
 * Base is a brass-gold cup; flame animates via CSS.
 */
export default function Diya({ size = 60 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <defs>
        <radialGradient id="flame-grad" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#FFF6C4" />
          <stop offset="45%" stopColor="#FFC46A" />
          <stop offset="85%" stopColor="#E87A2C" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#7a2f0a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cup-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8C96A" />
          <stop offset="60%" stopColor="#B48521" />
          <stop offset="100%" stopColor="#6F4913" />
        </linearGradient>
      </defs>

      {/* Glow aura */}
      <ellipse
        cx="60" cy="48" rx="46" ry="40"
        fill="url(#flame-grad)"
        opacity="0.55"
        style={{ transformOrigin: "60px 60px", animation: "flame-glow 2.6s ease-in-out infinite" }}
      />

      {/* Flame */}
      <g style={{ transformOrigin: "60px 72px", animation: "flame-dance 1.8s ease-in-out infinite" }}>
        <path
          d="M60 28 C52 44 48 56 60 72 C72 56 68 44 60 28 Z"
          fill="url(#flame-grad)"
        />
        <path
          d="M60 40 C56 52 54 60 60 72 C66 60 64 52 60 40 Z"
          fill="#FFF6C4"
          opacity="0.8"
        />
      </g>

      {/* Wick */}
      <rect x="58.5" y="70" width="3" height="6" fill="#2a1a0a" />

      {/* Diya cup */}
      <path
        d="M18 76 Q60 68 102 76 Q98 96 60 100 Q22 96 18 76 Z"
        fill="url(#cup-grad)"
        stroke="#6F4913"
        strokeWidth="0.8"
      />
      <path d="M22 78 Q60 72 98 78" fill="none" stroke="#FFE9A8" strokeOpacity="0.55" strokeWidth="1" />
      {/* Decorative dots */}
      <g fill="#6F4913">
        <circle cx="30" cy="88" r="1.2" />
        <circle cx="45" cy="92" r="1.2" />
        <circle cx="60" cy="94" r="1.2" />
        <circle cx="75" cy="92" r="1.2" />
        <circle cx="90" cy="88" r="1.2" />
      </g>
    </svg>
  );
}
