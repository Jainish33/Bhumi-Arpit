import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle({ muted, setMuted }) {
  const audioRef = useRef(null);

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

    // Attempt autoplay immediately (works on some browsers / when prior interaction exists)
    a.play()
      .then(() => {
        started = true;
        setMuted(false);
      })
      .catch(() => {
        // Browser requires a user gesture — fire on the very first interaction
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

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (muted) {
        await a.play();
        setMuted(false);
      } else {
        a.pause();
        setMuted(true);
      }
    } catch {
      setMuted(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/ambient.mp3"
        preload="auto"
        data-testid="ambient-audio"
      />
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
