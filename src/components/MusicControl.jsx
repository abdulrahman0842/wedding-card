import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

/**
 * Optional background music. Renders nothing unless `music.src` is set in the config.
 * Never autoplays: audio stays paused/muted until the guest taps the button.
 */
export default function MusicControl() {
  const { src, label } = weddingConfig.music;
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  if (!src) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      audio.volume = 0.35;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" muted={!playing} />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Mute ${label}` : `Play ${label}`}
        className="fixed bottom-5 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-pine text-gold-light shadow-lg transition hover:bg-pine-light print:hidden"
      >
        {playing ? <Volume2 className="h-5 w-5" aria-hidden="true" /> : <VolumeX className="h-5 w-5" aria-hidden="true" />}
      </button>
    </>
  );
}
