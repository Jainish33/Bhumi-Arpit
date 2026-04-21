import { useEffect, useRef } from "react";

const COLORS = ["#FFF3C7", "#E8C96A", "#D4AF37", "#F5DC78", "#FFE8A8"];

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const spawn = (cx, cy) => {
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.35 + Math.random() * 0.9;
        particles.push({
          x: cx + (Math.random() - 0.5) * 6,
          y: cy + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.55,
          size: 1.2 + Math.random() * 2.4,
          alpha: 0.85,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      if (particles.length > 90) particles.splice(0, particles.length - 90);
    };

    const onMove = (e) => {
      const src = e.touches ? e.touches[0] : e;
      spawn(src.clientX, src.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.alpha < 0.02) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.05;   // gentle gravity
        p.alpha *= 0.91;
        p.size  *= 0.96;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 998 }}
      aria-hidden="true"
    />
  );
}
