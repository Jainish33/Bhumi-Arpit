import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion } from "framer-motion";

import Dove from "./Dove";
import AudioToggle from "./AudioToggle";
import SkipButton from "./SkipButton";
import Particles from "./Particles";
import Lanterns from "./Lanterns";

gsap.registerPlugin(ScrollTrigger);

const IMG = {
  forest:
    "https://images.unsplash.com/photo-1761920521457-ce2b0dbb67aa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwyfHxteXN0aWNhbCUyMGRhcmslMjBmb3Jlc3QlMjBzdW5yYXlzfGVufDB8fHx8MTc3Njc2MjAxM3ww&ixlib=rb-4.1.0&q=85",
  river:
    "https://static.prod-images.emergentagent.com/jobs/a18d11ab-a86c-4b17-91b5-6305f482d719/images/38403f343eb3d74066501a693790a45934cc98096ed62430fef8c732e3b58b97.png",
  temple:
    "https://images.unsplash.com/photo-1765298409890-45d17b3ac8f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjB0ZW1wbGUlMjBzaWxob3VldHRlfGVufDB8fHx8MTc3Njc2MjAxM3ww&ixlib=rb-4.1.0&q=85",
  lanterns:
    "https://images.pexels.com/photos/4870192/pexels-photo-4870192.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

const EVENT = {
  bride: "Bhumika Darbar",
  brideParents: "Daughter of Hinaben & DharmaSinh",
  groom: "Arpit Patel",
  groomParents: "Son of Vinaben & Prafullchandra",
  date: "10 MAY 2026",
  dateLong: "Sunday, 10th May 2026",
  time: "3:00 PM onwards",
  dinner: "5:00 PM",
  venue: "Shri Surat Jilla Leuva Patidar Samaj Vadi",
  city: "Surat, Gujarat",
  maps: "https://share.google/GOfs4sIcSrrG3Gx7o",
};

// Google Calendar link (UTC times for 10 May 2026 3PM IST -> 09:30 UTC)
const CAL_URL = (() => {
  const title = encodeURIComponent("Bhumika & Arpit · Engagement");
  const details = encodeURIComponent(
    "Join us for the engagement of Bhumika Darbar & Arpit Patel.\nDinner at 5:00 PM.\n" + EVENT.maps
  );
  const location = encodeURIComponent(EVENT.venue + ", " + EVENT.city);
  // 3:00 PM IST = 09:30 UTC; dinner ends ~10:00 PM IST = 16:30 UTC
  const dates = "20260510T093000Z/20260510T163000Z";
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
})();

export default function Invitation() {
  const rootRef = useRef(null);
  const doveRef = useRef(null);
  const parchmentRef = useRef(null);
  const detailsRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [rippleList, setRippleList] = useState([]);
  const [showSkip, setShowSkip] = useState(true);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  // Word-by-word reveal for elements with [data-reveal]
  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray("[data-reveal]");
      blocks.forEach((block) => {
        const words = block.querySelectorAll(".reveal-word");
        gsap.to(words, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Dove flight path — tied to full-page scroll
      const doveEl = doveRef.current;
      if (doveEl) {
        gsap.set(doveEl, { xPercent: -20, yPercent: -10, opacity: 0, scale: 0.6 });

        const vh = () => window.innerHeight;
        const vw = () => window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });

        // Act 1 → appears
        tl.to(doveEl, { opacity: 0, duration: 0.05 }, 0);
        // Act 2 — enter from top-left, glide to right
        tl.to(doveEl, { opacity: 1, scale: 0.9, duration: 0.05 }, 0.15);
        tl.to(doveEl, {
          x: () => vw() * 0.55,
          y: () => vh() * 0.35,
          rotate: 6,
          duration: 0.25,
          ease: "sine.inOut",
        }, 0.18);
        // Act 3 — curve across river/temple
        tl.to(doveEl, {
          x: () => vw() * 0.1,
          y: () => vh() * 0.55,
          rotate: -4,
          scale: 1,
          duration: 0.25,
          ease: "sine.inOut",
        }, 0.45);
        tl.to(doveEl, {
          x: () => vw() * 0.45,
          y: () => vh() * 0.35,
          rotate: 4,
          duration: 0.2,
          ease: "sine.inOut",
        }, 0.62);
        // Act 4 — fly up and out (leave the message behind)
        tl.to(doveEl, {
          x: () => vw() * 0.75,
          y: () => -vh() * 0.15,
          rotate: -8,
          scale: 0.5,
          duration: 0.1,
          ease: "power2.in",
        }, 0.72);
        tl.to(doveEl, { opacity: 0, duration: 0.06 }, 0.78);
      }

      // Parchment unroll
      if (parchmentRef.current) {
        gsap.set(parchmentRef.current, { scaleY: 0.02, opacity: 0 });
        gsap.to(parchmentRef.current, {
          scaleY: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: parchmentRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Parallax on scene backgrounds
      gsap.utils.toArray(".scene-bg[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Hide skip button once user has reached the details section
  useEffect(() => {
    const onScroll = () => {
      const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      setShowSkip(progress < 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ripple on river click/touch
  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left;
    const y = (e.touches?.[0]?.clientY ?? e.clientY) - rect.top;
    const id = Date.now() + Math.random();
    setRippleList((list) => [...list, { id, x, y }]);
    setTimeout(() => {
      setRippleList((list) => list.filter((r) => r.id !== id));
    }, 1500);
  };

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={rootRef} className="relative">
      <AudioToggle muted={muted} setMuted={setMuted} />
      {showSkip && <SkipButton onClick={scrollToDetails} />}

      {/* Fixed Dove across all acts */}
      <div ref={doveRef} className="dove-wrap" aria-hidden="true" data-testid="dove-element">
        <Dove />
      </div>

      {/* ============ ACT 1 · AWAKENING FOREST ============ */}
      <section className="scene" data-testid="act-1-forest" style={{ background: "var(--bg-forest)" }}>
        <div
          className="scene-bg"
          data-parallax
          style={{
            backgroundImage: `url("${IMG.forest}")`,
            filter: "brightness(0.55) saturate(1.05)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,26,20,0.85) 0%, rgba(11,26,20,0.35) 45%, rgba(11,26,20,0.85) 100%)",
          }}
        />
        <div className="sunrays z-[2]" />
        <Particles count={22} />
        <div className="grain-overlay" />
        <div className="vignette" />

        <div className="scene-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center"
          >
            <div className="intro-dot mb-10" />
            <span className="font-accent text-[10px] md:text-xs text-[var(--gold)] mb-6">
              A Divine Message in the Wind
            </span>

            <h1 className="font-serif-display text-[2.4rem] leading-[1.08] md:text-6xl text-[var(--ivory)] max-w-[22ch]" data-reveal data-testid="hero-title">
              {"In the quiet harmony of nature…".split(" ").map((w, i) => (
                <span key={i} className="reveal-word mr-[0.25em]">{w}</span>
              ))}
            </h1>

            <div className="mt-12 gold-divider">
              <span className="font-accent text-[10px]">a tale begins</span>
            </div>

            <div className="mt-24 flex flex-col items-center text-[var(--ivory-dim)]">
              <span className="font-accent text-[10px]">scroll gently</span>
              <div className="mt-4 w-[1px] h-14 bg-gradient-to-b from-[var(--gold)]/60 to-transparent animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ ACT 2 · DIVINE MESSENGER ============ */}
      <section className="scene" data-testid="act-2-messenger" style={{ background: "var(--bg-midnight)" }}>
        <div
          className="scene-bg"
          data-parallax
          style={{
            backgroundImage: `url("${IMG.forest}")`,
            filter: "brightness(0.4) hue-rotate(-8deg) saturate(1.1) blur(2px)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 65% 40%, rgba(232,201,106,0.18), transparent 55%), linear-gradient(180deg, rgba(9,13,23,0.6) 0%, rgba(9,13,23,0.9) 100%)",
          }}
        />
        <Particles count={18} />
        <div className="grain-overlay" />
        <div className="vignette" />

        <div className="scene-content">
          <h2
            className="font-serif-display text-[2rem] md:text-5xl text-[var(--ivory)] max-w-[18ch] leading-[1.1]"
            data-reveal
          >
            {"A message…".split(" ").map((w, i) => (
              <span key={i} className="reveal-word mr-[0.25em]">{w}</span>
            ))}
          </h2>

          <h3
            className="mt-8 font-serif-display italic text-xl md:text-3xl text-[var(--gold-soft)] max-w-[22ch]"
            data-reveal
          >
            {"carried through time".split(" ").map((w, i) => (
              <span key={i} className="reveal-word mr-[0.25em]">{w}</span>
            ))}
          </h3>

          <h3
            className="mt-6 font-serif-display italic text-xl md:text-3xl text-[var(--gold-soft)] max-w-[22ch]"
            data-reveal
          >
            {"guided by destiny".split(" ").map((w, i) => (
              <span key={i} className="reveal-word mr-[0.25em]">{w}</span>
            ))}
          </h3>
        </div>
      </section>

      {/* ============ ACT 3 · THE JOURNEY · RIVER ============ */}
      <section
        className="scene"
        data-testid="act-3-journey-river"
        style={{ background: "var(--bg-river)" }}
        onClick={addRipple}
        onTouchStart={addRipple}
      >
        <div
          className="scene-bg"
          data-parallax
          style={{
            backgroundImage: `url("${IMG.river}")`,
            filter: "brightness(0.7) saturate(1.15)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,30,44,0.55) 0%, rgba(12,30,44,0.1) 40%, rgba(12,30,44,0.8) 100%)",
          }}
        />
        <div className="grain-overlay" />
        <div className="vignette" />

        {/* Ripples rendered here */}
        {rippleList.map((r) => (
          <span key={r.id} className="ripple" style={{ left: r.x, top: r.y }} />
        ))}

        <div className="scene-content">
          <h2
            className="font-serif-display text-[2rem] md:text-5xl text-[var(--ivory)] max-w-[20ch] leading-[1.1]"
            data-reveal
          >
            {"Two souls, bound by unseen threads".split(" ").map((w, i) => (
              <span key={i} className="reveal-word mr-[0.25em]">{w}</span>
            ))}
          </h2>

          <p className="mt-10 font-accent text-[10px] md:text-xs text-[var(--gold)]/80">
            tap the water · feel the ripples
          </p>
        </div>
      </section>

      {/* ============ ACT 3b · TEMPLE HORIZON ============ */}
      <section className="scene" data-testid="act-3-journey-temple" style={{ background: "var(--bg-dusk)" }}>
        <div
          className="scene-bg"
          data-parallax
          style={{
            backgroundImage: `url("${IMG.temple}")`,
            filter: "brightness(0.55) saturate(1.1)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, rgba(212,175,55,0.25), transparent 55%), linear-gradient(180deg, rgba(26,15,28,0.8) 0%, rgba(26,15,28,0.2) 50%, rgba(26,15,28,0.9) 100%)",
          }}
        />
        <Particles count={14} />
        <div className="grain-overlay" />
        <div className="vignette" />

        <div className="scene-content">
          <h2
            className="font-serif-display text-[2rem] md:text-5xl text-[var(--ivory)] max-w-[22ch] leading-[1.1]"
            data-reveal
          >
            {"now step into a new beginning".split(" ").map((w, i) => (
              <span key={i} className="reveal-word mr-[0.25em]">{w}</span>
            ))}
          </h2>
        </div>
      </section>

      {/* ============ ACT 4 · THE REVEAL · PARCHMENT ============ */}
      <section
        ref={detailsRef}
        className="scene"
        data-testid="act-4-reveal"
        style={{ background: "var(--bg-night)" }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.18), transparent 65%), #05080f",
          }}
        />
        <Particles count={16} />
        <div className="grain-overlay" />
        <div className="vignette" />

        <div className="scene-content">
          <span className="font-accent text-[10px] text-[var(--gold)]/80 mb-8">
            the message unrolls
          </span>

          <div ref={parchmentRef} className="parchment" data-testid="parchment-card">
            <span className="parchment-edge top" />
            <span className="parchment-edge bottom" />

            <div className="text-center">
              <p className="font-accent text-[10px] md:text-[11px] text-[#7a5a1c] mb-8">
                ✦ with the blessings of our elders ✦
              </p>

              <p className="font-sans-body text-sm md:text-base text-[var(--ink)]/75">
                {EVENT.brideParents}
              </p>
              <h2 className="font-serif-display text-[2.4rem] md:text-5xl text-[var(--ink)] mt-1 tracking-tight">
                {EVENT.bride}
              </h2>

              <p className="font-serif-display italic text-2xl md:text-3xl text-[#7a5a1c] my-5">
                &amp;
              </p>

              <p className="font-sans-body text-sm md:text-base text-[var(--ink)]/75">
                {EVENT.groomParents}
              </p>
              <h2 className="font-serif-display text-[2.4rem] md:text-5xl text-[var(--ink)] mt-1 tracking-tight">
                {EVENT.groom}
              </h2>

              <div className="gold-divider my-9" style={{ color: "#7a5a1c" }}>
                <span className="font-accent text-[10px]">request your presence</span>
              </div>

              <div className="space-y-4 font-sans-body text-[var(--ink)]">
                <div>
                  <p className="font-accent text-[10px] text-[#7a5a1c]">date</p>
                  <p className="font-serif-display text-2xl md:text-3xl">{EVENT.dateLong}</p>
                </div>
                <div>
                  <p className="font-accent text-[10px] text-[#7a5a1c]">ceremony</p>
                  <p className="font-serif-display text-xl md:text-2xl">{EVENT.time}</p>
                </div>
                <div>
                  <p className="font-accent text-[10px] text-[#7a5a1c]">dinner</p>
                  <p className="font-serif-display text-xl md:text-2xl">{EVENT.dinner}</p>
                </div>
                <div>
                  <p className="font-accent text-[10px] text-[#7a5a1c]">venue</p>
                  <p className="font-serif-display text-xl md:text-2xl leading-snug">
                    {EVENT.venue}
                  </p>
                  <p className="font-sans-body text-sm text-[var(--ink)]/70 mt-1">
                    {EVENT.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ACT 5 · ENDING · LANTERNS ============ */}
      <section className="scene" data-testid="act-5-ending" style={{ background: "#030510" }}>
        <div
          className="scene-bg"
          data-parallax
          style={{
            backgroundImage: `url("${IMG.lanterns}")`,
            filter: "brightness(0.55) saturate(1.2)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, rgba(232,160,60,0.25), transparent 60%), linear-gradient(180deg, rgba(3,5,16,0.4) 0%, rgba(3,5,16,0.85) 100%)",
          }}
        />
        <Lanterns count={14} />
        <div className="grain-overlay" />
        <div className="vignette" />

        <div className="scene-content">
          <h2
            className="font-serif-display text-[2.2rem] md:text-6xl text-[var(--ivory)] max-w-[20ch] leading-[1.08]"
            data-reveal
          >
            {"Be a part of this beautiful story.".split(" ").map((w, i) => (
              <span key={i} className="reveal-word mr-[0.25em]">{w}</span>
            ))}
          </h2>

          <p className="mt-8 font-sans-body text-[var(--ivory-dim)] max-w-[34ch]">
            With hearts full of gratitude, we await your presence on this sacred evening.
          </p>

          <div className="mt-14 flex flex-col sm:flex-row gap-4">
            <a
              href={EVENT.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              data-testid="cta-view-location"
            >
              <span>View Location</span>
            </a>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              data-testid="cta-add-calendar"
            >
              <span>Add to Calendar</span>
            </a>
          </div>

          <div className="mt-24 font-serif-display italic text-[var(--gold-soft)] text-lg md:text-xl">
            Bhumika <span className="mx-2 text-[var(--gold)]">✦</span> Arpit
          </div>
          <p className="mt-2 font-accent text-[10px] text-[var(--ivory-dim)]">
            10 · 05 · 2026
          </p>
        </div>
      </section>
    </div>
  );
}
