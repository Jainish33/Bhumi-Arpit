import { ChevronDown } from "lucide-react";

export default function SkipButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="floating-control skip-btn"
      aria-label="Skip to invitation details"
      data-testid="skip-to-details"
    >
      <span>Skip to Details</span>
      <ChevronDown size={14} strokeWidth={1.6} />
    </button>
  );
}
