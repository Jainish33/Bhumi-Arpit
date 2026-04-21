import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion } from "framer-motion";

import Dove from "./Dove";
import AudioToggle from "./AudioToggle";
import SkipButton from "./SkipButton";
import Particles from "./Particles";

import ForestScene from "./scenes/ForestScene";
import RiverScene from "./scenes/RiverScene";
import TempleScene from "./scenes/TempleScene";
import NightScene from "./scenes/NightScene";

import Mandala from "./motifs/Mandala";
import Lotus from "./motifs/Lotus";
import Diya from "./motifs/Diya";
import Toran from "./motifs/Toran";
import Paisley from "./motifs/Paisley";
import OmSymbol from "./motifs/OmSymbol";
import RosePetals from "./RosePetals";
import Countdown from "./Countdown";

gsap.registerPlugin(ScrollTrigger);

const EVENT = {
  bride: "Bhumika Darbar",
  brideParents: "Daughter of Hinaben & DharmaSinh",
  groom: "Arpit Patel",
  groomParents: "Son of Vinaben & Prafullchandra",
  dateLong: "Sunday, 10th May 2026",
  time: "3:00 PM onwards",
  dinner: "5:00 PM",
  venue: "Shri Surat Jilla Leuva Patidar Samaj Vadi",
  city: "Bardoli, Surat, Gujarat",
  maps: "https://maps.app.goo.gl/sQTYYgP7wRsGdBBS6",
};

const CAL_URL = (() => {
  const title = encodeURIComponent("Bhumika & Arpit · Engagement");
  const details = encodeURIComponent(
    "Join us for the engagement of Bhumika Darbar & Arpit Patel.\nDinner at 5:00 PM.\n" + EVENT.maps
  );
  const location = encodeURIComponent(EVENT.venue + ", " + EVENT.city);
  const dates = "20260510T093000Z/20260510T163000Z";
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
})();

function MedallionFrame({ letter }) {
  return (
    <div className="medallion-frame">
      <span className="medallion-letter">{letter}</span>
      <svg
        viewBox="0 0 104 104"
        width="104"
        height="104"
        aria-hidden="true"
        style={{ position: "absolute", top: -8, left: -8, pointerEvents: "none" }}
      >
        <circle cx="52" cy="52" r="50" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="5 3" opacity="0.55" />
        <circle cx="52" cy="52" r="47" fill="none" stroke="#B48521" strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  );
}

export default function Invitation() {
  const rootRef = useRef(null);
  const doveRef = useRef(null);
  const parchmentRef = useRef(null);
  const lotusPreviewRef = useRef(null);
  const detailsRef = useRef(null);
  const [muted, setMuted] = useState(false);
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

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ink-write reveal: each word sweeps in from left like golden calligraphy
      gsap.utils.toArray("[data-reveal]").forEach((block) => {
        const words = block.querySelectorAll(".reveal-word");
        gsap.fromTo(
          words,
          { opacity: 0, filter: "blur(5px)", clipPath: "inset(0 105% 0 0)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            clipPath: "inset(0 0% 0 0)",
            duration: 0.72,
            stagger: 0.09,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

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
        tl.to(doveEl, { opacity: 0, duration: 0.05 }, 0);
        tl.to(doveEl, { opacity: 1, scale: 0.9, duration: 0.05 }, 0.15);
        tl.to(doveEl, {
          x: () => vw() * 0.55,
          y: () => vh() * 0.35,
          rotate: 6,
          duration: 0.25,
          ease: "sine.inOut",
        }, 0.18);
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

      if (parchmentRef.current) {
        const pEl = parchmentRef.current;
        const lotusEl = lotusPreviewRef.current;
        gsap.set(pEl, { scaleY: 0.02, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pEl,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        if (lotusEl) {
          gsap.set(lotusEl, { scale: 0, opacity: 0 });
          tl.to(lotusEl, { scale: 1.3, opacity: 1, duration: 0.65, ease: "back.out(1.7)" });
          tl.to(lotusEl, { scale: 0, opacity: 0, duration: 0.35, ease: "power2.in" }, "+=0.3");
          tl.to(pEl, { scaleY: 1, opacity: 1, duration: 1.8, ease: "power3.out" }, "-=0.1");
        } else {
          tl.to(pEl, { scaleY: 1, opacity: 1, duration: 1.8, ease: "power3.out" });
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Hide skip button past 60% scroll
  useEffect(() => {
    const onScroll = () => {
      const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      setShowSkip(progress < 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      <div
        ref={doveRef}
        className="dove-wrap"
        aria-hidden="true"
        data-testid="dove-element"
        style={{ visibility: showSkip ? "visible" : "hidden" }}
      >
        <Dove />
      </div>

      {/* ============ ACT 1 · AWAKENING FOREST ============ */}
      <section className="scene" data-testid="act-1-forest">
        <ForestScene />
        <Particles count={22} variant="firefly" />
        <div className="grain-overlay" />
        <div className="vignette" />

        <div className="scene-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center"
          >
            {/* Floating Om above the title */}
            <div
              className="mb-6"
              style={{ filter: "drop-shadow(0 0 14px rgba(232,201,106,0.6))", animation: "om-pulse 5s ease-in-out infinite" }}
            >
              <OmSymbol size={44} color="#E8C96A" />
            </div>

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
      <section className="scene" data-testid="act-2-messenger">
        <ForestScene />
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: "radial-gradient(ellipse at 65% 40%, rgba(232,201,106,0.18), transparent 55%)",
          }}
        />
        <Particles count={18} variant="firefly" />
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
        onClick={addRipple}
        onTouchStart={addRipple}
      >
        <RiverScene />
        <div className="grain-overlay" />
        <div className="vignette" />

        {rippleList.map((r) => (
          <span key={r.id} className="ripple" style={{ left: r.x, top: r.y, zIndex: 5 }} />
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
      <section className="scene" data-testid="act-3-journey-temple">
        <TempleScene />
        <Particles count={14} variant="incense" />
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
        {/* Animated backdrop — mandala halo + stars */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.22), transparent 65%), #05080f",
          }}
        />
        <div
          className="absolute left-1/2 top-[18%] -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ filter: "drop-shadow(0 0 40px rgba(212,175,55,0.35))" }}
        >
          <Mandala size={420} color="#D4AF37" opacity={0.18} speed={100} />
        </div>
        <Particles count={16} variant="firefly" />
        <RosePetals />
        <div className="grain-overlay" />
        <div className="vignette" />

        {/* Lotus bloom that appears first, then fades as parchment unrolls */}
        <div
          ref={lotusPreviewRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -60,
            marginTop: -60,
            zIndex: 20,
            pointerEvents: "none",
            filter: "drop-shadow(0 0 32px rgba(212,175,55,0.95))",
          }}
        >
          <Lotus size={120} color="#D4AF37" opacity={1} bloom />
        </div>

        <div className="scene-content">
          <span className="font-accent text-[10px] text-[var(--gold)]/80 mb-6">
            the message unrolls
          </span>

          <div ref={parchmentRef} className="parchment relative" data-testid="parchment-card">
            {/* Animated border that draws itself */}
            <span className="parchment-border-top" />
            <span className="parchment-border-right" />
            <span className="parchment-border-bottom" />
            <span className="parchment-border-left" />

            <span className="parchment-edge top" />
            <span className="parchment-edge bottom" />

            {/* Toran hanging from top */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-14 z-20 pointer-events-none">
              <Toran width={320} />
            </div>

            {/* Corner paisleys */}
            <div className="absolute top-6 left-4 opacity-80"><Paisley size={40} color="#8a6818" /></div>
            <div className="absolute top-6 right-4 opacity-80"><Paisley size={40} color="#8a6818" flipX /></div>
            <div className="absolute bottom-6 left-4 opacity-80" style={{ transform: "scaleY(-1)" }}><Paisley size={40} color="#8a6818" /></div>
            <div className="absolute bottom-6 right-4 opacity-80" style={{ transform: "scale(-1, -1)" }}><Paisley size={40} color="#8a6818" /></div>

            <div className="text-center relative z-10 pt-6">
              {/* Om at top of card */}
              <div className="flex justify-center mb-3">
                <OmSymbol size={38} color="#7a5a1c" />
              </div>

              <p className="font-accent text-[9px] md:text-[10px] text-[#7a5a1c] tracking-[0.3em] mb-1">
                ✦ shubh sagai · engagement ceremony ✦
              </p>

              {/* Sanskrit blessing */}
              <p className="font-serif-display text-[1rem] text-[#9a7428] mt-2 mb-0" style={{ fontStyle: "italic" }}>
                सह नाववतु · सह नौ भुनक्तु
              </p>
              <p className="font-accent text-[7px] text-[#7a5a1c]/60 tracking-widest mb-4">
                may we walk together · may we grow together
              </p>

              <p className="font-accent text-[10px] md:text-[11px] text-[#7a5a1c] mb-5 tracking-[0.25em]">
                ✦ with the blessings of our elders ✦
              </p>

              <p className="font-sans-body text-sm md:text-base text-[var(--ink)]/75">
                {EVENT.brideParents}
              </p>
              <h2 className="name-shimmer font-serif-display text-[2.4rem] md:text-5xl mt-1 tracking-tight">
                {EVENT.bride}
              </h2>

              {/* Photo medallions with "&" divider */}
              <div className="flex justify-center items-center my-5 gap-5">
                <MedallionFrame letter="B" />
                <div className="flex flex-col items-center gap-0">
                  <Lotus size={28} color="#7a5a1c" opacity={0.75} />
                  <p className="font-serif-display italic text-2xl md:text-3xl text-[#7a5a1c] leading-none my-1">
                    &amp;
                  </p>
                  <Lotus size={28} color="#7a5a1c" opacity={0.75} />
                </div>
                <MedallionFrame letter="A" />
              </div>

              <p className="font-sans-body text-sm md:text-base text-[var(--ink)]/75">
                {EVENT.groomParents}
              </p>
              <h2 className="name-shimmer font-serif-display text-[2.4rem] md:text-5xl mt-1 tracking-tight">
                {EVENT.groom}
              </h2>

              <div className="flex justify-center mt-8 mb-6">
                <span className="flourish-line w-full max-w-[280px]">
                  <span className="font-accent text-[10px] whitespace-nowrap">request the honour of your presence</span>
                </span>
              </div>

              <div className="space-y-4 font-sans-body text-[var(--ink)]">
                <div>
                  <p className="font-accent text-[10px] text-[#7a5a1c]">date</p>
                  <p className="font-serif-display text-2xl md:text-3xl">{EVENT.dateLong}</p>
                </div>
                <div>
                  <p className="font-accent text-[10px] text-[#7a5a1c]">engagement</p>
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

              {/* Diya row at the bottom of the parchment */}
              <div className="diya-row mt-8">
                <Diya size={54} />
                <Diya size={64} />
                <Diya size={54} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ACT 5 · ENDING · NIGHT SKY ============ */}
      <section className="scene" data-testid="act-5-ending">
        <NightScene />
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
            With hearts full of gratitude, we await your presence on this sacred occasion.
          </p>

          <Countdown />

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
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

          {/* Couple mandala sign-off */}
          <div className="mt-20 flex flex-col items-center gap-3">
            <div style={{ filter: "drop-shadow(0 0 20px rgba(212,175,55,0.4))" }}>
              <Mandala size={90} color="#D4AF37" opacity={0.7} speed={40} />
            </div>
            <div className="font-serif-display italic text-[var(--gold-soft)] text-lg md:text-xl">
              Bhumika <span className="mx-2 text-[var(--gold)]">✦</span> Arpit
            </div>
            <p className="font-accent text-[10px] text-[var(--ivory-dim)]">
              10 · 05 · 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
