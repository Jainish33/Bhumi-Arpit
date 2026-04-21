import { useMemo } from "react";

export default function Lanterns({ count = 12 }) {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = -Math.random() * 18;
      const duration = 18 + Math.random() * 14;
      const drift = (Math.random() - 0.5) * 120;
      const scale = 0.75 + Math.random() * 0.8;
      return { i, left, delay, duration, drift, scale };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
      {items.map((d) => (
        <span
          key={d.i}
          className="lantern"
          style={{
            left: `${d.left}%`,
            bottom: "-10vh",
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            transform: `scale(${d.scale})`,
            // eslint-disable-next-line
            ["--lx"]: `${d.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
