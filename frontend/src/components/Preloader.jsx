import { useState, useEffect } from "react";
import Lotus from "./motifs/Lotus";
import OmSymbol from "./motifs/OmSymbol";

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState("in"); // "in" | "bloom" | "out"

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("bloom"), 250);
    const t2 = setTimeout(() => setPhase("out"),   1900);
    const t3 = setTimeout(() => onDone(),           2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: "var(--bg-forest)",
        zIndex: 9999,
        opacity: phase === "out" ? 0 : 1,
        pointerEvents: phase === "out" ? "none" : "all",
        transition: phase === "out" ? "opacity 0.7s ease" : "none",
      }}
    >
      {/* Radial gold halo behind lotus */}
      <div
        style={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
          opacity: phase === "bloom" ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Lotus blooms in */}
      <div
        style={{
          opacity: phase === "in" ? 0 : 1,
          transform: phase === "in" ? "scale(0.35)" : "scale(1)",
          transition: "opacity 0.7s ease, transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
          filter: "drop-shadow(0 0 32px rgba(212,175,55,0.85))",
        }}
      >
        <Lotus size={104} color="#D4AF37" opacity={1} bloom />
      </div>

      {/* Om symbol fades in beneath */}
      <div
        style={{
          opacity: phase === "bloom" ? 1 : 0,
          transition: "opacity 0.6s ease 0.3s",
          marginTop: 18,
          filter: "drop-shadow(0 0 12px rgba(232,201,106,0.8))",
        }}
      >
        <OmSymbol size={30} color="#E8C96A" />
      </div>

      {/* Tagline */}
      <p
        className="font-accent text-[9px] text-[var(--gold)] tracking-[0.45em] mt-5"
        style={{
          opacity: phase === "bloom" ? 1 : 0,
          transition: "opacity 0.7s ease 0.5s",
        }}
      >
        A DIVINE MESSAGE IN THE WIND
      </p>
    </div>
  );
}
