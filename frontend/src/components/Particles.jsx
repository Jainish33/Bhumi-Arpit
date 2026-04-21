import { useMemo } from "react";

export default function Particles({ count = 20 }) {
  const dots = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = 2 + Math.random() * 4;
      const left = Math.random() * 100;
      const delay = -Math.random() * 14;
      const duration = 12 + Math.random() * 10;
      const drift = (Math.random() - 0.5) * 80;
      return { i, size, left, delay, duration, drift };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.i}
          className="particle"
          style={{
            width: `${d.size}px`,
            height: `${d.size}px`,
            left: `${d.left}%`,
            bottom: "-10vh",
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            // eslint-disable-next-line
            ["--drift"]: `${d.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
