/**
 * Om — Sanskrit Om symbol rendered as elegant stroke art (not a font).
 */
export default function OmSymbol({ size = 60, color = "#D4AF37" }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Bindu (dot) */}
        <circle cx="82" cy="22" r="3.5" fill={color} />
        {/* Crescent under bindu */}
        <path d="M72 30 Q82 36 92 30" />
        {/* Main 3 */}
        <path d="M40 40 C18 40 14 64 36 68 C54 70 58 58 46 56 C34 56 36 78 56 82 C76 86 90 70 84 56" />
        {/* Tail flourish */}
        <path d="M82 58 C96 60 102 72 92 84 C86 90 78 88 74 84" />
        {/* Upper flourish */}
        <path d="M58 44 C70 36 82 42 82 52" />
      </g>
    </svg>
  );
}
