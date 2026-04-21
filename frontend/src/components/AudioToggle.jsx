import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle({ muted, setMuted }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.35;
    a.loop = true;
  }, []);

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
    } catch (e) {
      // Autoplay blocked — keep muted
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
