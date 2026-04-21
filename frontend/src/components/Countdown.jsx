import { useState, useEffect } from "react";

// 3:00 PM IST = 09:30 UTC
const TARGET = new Date("2026-05-10T09:30:00Z");

const pad = (n) => String(n).padStart(2, "0");

export default function Countdown() {
  const [diff, setDiff] = useState(() => Math.max(0, TARGET - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, TARGET - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  if (diff === 0) {
    return (
      <div className="mt-10 text-center">
        <p className="font-serif-display italic text-[1.6rem] text-[var(--gold-soft)]">
          Today is the day ✦
        </p>
      </div>
    );
  }

  const days  = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins  = Math.floor((diff % 3_600_000)  / 60_000);
  const secs  = Math.floor((diff % 60_000)     / 1_000);

  const units = [
    { label: "days",  val: days  },
    { label: "hours", val: hours },
    { label: "mins",  val: mins  },
    { label: "secs",  val: secs  },
  ];

  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      <p className="font-accent text-[8px] text-[var(--gold)]/60 tracking-[0.35em]">
        time until the celebration
      </p>

      {/* thin gold rule */}
      <div className="w-40 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

      <div className="flex items-end gap-4 md:gap-6">
        {units.map(({ label, val }, i) => (
          <div key={label} className="flex items-end gap-4 md:gap-6">
            <div className="flex flex-col items-center gap-1 min-w-[2.2rem]">
              <span
                className="font-serif-display text-[2.8rem] md:text-5xl text-[var(--gold)] leading-none tabular-nums"
                style={{ textShadow: "0 0 22px rgba(212,175,55,0.55)" }}
              >
                {pad(val)}
              </span>
              <span className="font-accent text-[7px] text-[var(--ivory-dim)] tracking-[0.28em]">
                {label}
              </span>
            </div>
            {i < 3 && (
              <span className="font-serif-display text-[1.2rem] text-[var(--gold)]/35 leading-none mb-5">
                ·
              </span>
            )}
          </div>
        ))}
      </div>

      {/* thin gold rule */}
      <div className="w-40 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
    </div>
  );
}
