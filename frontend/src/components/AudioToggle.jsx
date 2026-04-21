import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle({ muted, setMuted, onBeat }) {
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);
  const prevBassRef = useRef(0);
  const cooldownRef = useRef(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.72;
    a.loop = true;

    let started = false;

    const startAudio = () => {
      if (started) return;
      a.play()
        .then(() => {
          started = true;
          setMuted(false);
          document.removeEventListener("click", startAudio);
          document.removeEventListener("touchstart", startAudio);
          document.removeEventListener("scroll", startAudio);
        })
        .catch(() => {});
    };

    a.play()
      .then(() => { started = true; setMuted(false); })
      .catch(() => {
        setMuted(true);
        document.addEventListener("click", startAudio, { passive: true });
        document.addEventListener("touchstart", startAudio, { passive: true });
        document.addEventListener("scroll", startAudio, { passive: true, once: true });
      });

    return () => {
      document.removeEventListener("click", startAudio);
      document.removeEventListener("touchstart", startAudio);
      document.removeEventListener("scroll", startAudio);
    };
  }, [setMuted]);

  // Beat detection via Web Audio API AnalyserNode
  useEffect(() => {
    if (!onBeat) return;
    const a = audioRef.current;
    if (!a) return;

    const runTick = () => {
      const analyser = analyserRef.current;
      if (!analyser) return;
      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        // Bass bins 1–6 (~86–516 Hz) — captures kick/dhol fundamentals
        const bass = (data[1] + data[2] + data[3] + data[4] + data[5] + data[6]) / 6;
        if (!cooldownRef.current && bass > prevBassRef.current * 1.25 && bass > 40) {
          onBeat();
          cooldownRef.current = true;
          setTimeout(() => { cooldownRef.current = false; }, 200);
        }
        prevBassRef.current = prevBassRef.current * 0.78 + bass * 0.22;
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const initAnalyser = () => {
      // Guard: audio element already wired to an AudioContext
      if (a._analyserReady) {
        analyserRef.current = a._analyserNode;
        ctxRef.current = a._audioCtx;
        runTick();
        return;
      }
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const source = ctx.createMediaElementSource(a);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        a._audioCtx = ctx;
        a._analyserNode = analyser;
        a._analyserReady = true;
        ctxRef.current = ctx;
        analyserRef.current = analyser;
        runTick();
      } catch { /* Web Audio unavailable — silent fallback */ }
    };

    const onPlay = () => {
      if (ctxRef.current?.state === "suspended") ctxRef.current.resume().catch(() => {});
      initAnalyser();
    };

    a.addEventListener("play", onPlay);
    if (!a.paused) initAnalyser();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      a.removeEventListener("play", onPlay);
    };
  }, [onBeat]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (ctxRef.current?.state === "suspended") {
      await ctxRef.current.resume().catch(() => {});
    }
    try {
      if (muted) { await a.play(); setMuted(false); }
      else        { a.pause();     setMuted(true); }
    } catch { setMuted(true); }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" preload="auto" data-testid="ambient-audio" />
      <button
        onClick={toggle}
        aria-label={muted ? "Play ambient music" : "Pause ambient music"}
        className="floating-control audio-toggle"
        data-testid="audio-toggle"
      >
        {muted ? <VolumeX size={18} strokeWidth={1.4} /> : <Volume2 size={18} strokeWidth={1.4} />}
      </button>
    </>
  );
}
