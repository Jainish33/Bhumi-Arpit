/**
 * Paisley / Buta — classic Indian teardrop motif. Good for decorative corners.
 */
export default function Paisley({ size = 60, color = "#D4AF37", opacity = 0.8, flipX = false }) {
  return (
    <svg
      viewBox="0 0 120 160"
      width={size}
      height={(size / 120) * 160}
      style={{ opacity, transform: flipX ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth="1.2">
        <path d="M60 150 C100 130 110 90 90 55 C75 30 50 22 40 40 C32 58 50 72 66 70 C78 68 84 56 78 48" />
        <path d="M60 150 C96 128 104 92 88 60" opacity="0.55" />
        <circle cx="72" cy="62" r="3" fill={color} />
        <circle cx="82" cy="52" r="2" fill={color} />
        {/* Inner filigree */}
        <path d="M58 140 Q68 120 74 100" />
        <path d="M52 132 Q62 112 68 96" opacity="0.55" />
        {/* Small flowers */}
        <g fill={color} fillOpacity="0.7">
          <circle cx="50" cy="118" r="1.6" />
          <circle cx="58" cy="108" r="1.6" />
          <circle cx="66" cy="98" r="1.6" />
        </g>
      </g>
    </svg>
  );
}
