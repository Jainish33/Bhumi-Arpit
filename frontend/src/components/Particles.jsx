import { useMemo } from "react";

const VARIANTS = {
  firefly: { cn: "particle",         minSize: 2, sizeExtra: 4, minDur: 12, durExtra: 10 },
  incense: { cn: "particle-incense", minSize: 3, sizeExtra: 5, minDur: 18, durExtra: 12 },
  water:   { cn: "particle-water",   minSize: 1, sizeExtra: 3, minDur: 9,  durExtra: 8  },
};

export default function Particles({ count = 20, variant = "firefly" }) {
  const v = VARIANTS[variant] ?? VARIANTS.firefly;

  const dots = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      i,
      size:     v.minSize + Math.random() * v.sizeExtra,
      left:     Math.random() * 100,
      delay:   -Math.random() * 14,
      duration: v.minDur + Math.random() * v.durExtra,
      drift:    (Math.random() - 0.5) * 80,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, variant]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.i}
          className={v.cn}
          style={{
            width:           `${d.size}px`,
            height:          `${d.size}px`,
            left:            `${d.left}%`,
            bottom:          "-10vh",
            animationDuration:`${d.duration}s`,
            animationDelay:  `${d.delay}s`,
            // eslint-disable-next-line
            ["--drift"]:     `${d.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
