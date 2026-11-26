import { useEffect, useRef, useState } from 'react';
import { MailOpen } from 'lucide-react';
import { weddingConfig, coupleNames } from '../data/weddingConfig';
import {
  Crescent,
  FrameCorners,
  GoldDivider,
  PatternBg,
  ArchFrame,
} from './Ornaments';
import { prefersReducedMotion } from '../utils/actions';

export default function InvitationCover({ onStart, onDone, guestName }) {
  const [opening, setOpening] = useState(false);
  const timer = useRef();

  const { initials } = weddingConfig.couple;
  const { text } = weddingConfig;

  useEffect(() => () => clearTimeout(timer.current), []);

  const open = () => {
    if (opening) return;

    setOpening(true);
    onStart?.();

    timer.current = setTimeout(
      () => onDone?.(),
      prefersReducedMotion() ? 0 : 1250
    );
  };

  const door =
    'absolute inset-y-0 w-1/2 overflow-hidden bg-pine transition-transform duration-[900ms] ease-[cubic-bezier(0.7,0,0.2,1)] delay-300';

  const doorArt = (
    <>
      <PatternBg opacity={0.19} size={64} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,87,63,0.55),rgba(7,42,32,0.95)_80%)]" />
    </>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Wedding invitation of ${coupleNames}`}
      className="fixed inset-0 z-[100] overflow-hidden print:hidden"
    >
      {/* Emerald opening doors */}
      <div className={`${door} left-0 ${opening ? '-translate-x-full' : ''}`}>
        <div className="absolute inset-y-0 left-0 w-screen">
          {doorArt}
        </div>
        <div className="absolute inset-y-0 right-0 w-px bg-gold/70" />
      </div>

      <div className={`${door} right-0 ${opening ? 'translate-x-full' : ''}`}>
        <div className="absolute inset-y-0 right-0 w-screen">
          {doorArt}
        </div>
        <div className="absolute inset-y-0 left-0 w-px bg-gold/70" />
      </div>

      {/* Invitation cover */}
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto px-5 py-6">
        <div
          className={`relative my-auto w-full max-w-[390px] overflow-hidden bg-ivory px-7 py-7 text-center shadow-[0_30px_90px_rgba(0,0,0,0.5)] transition-all duration-500 sm:px-12 sm:py-9 ${opening ? 'scale-95 opacity-0' : 'animate-fade-up'
            }`}
        >
          {/* Decorative borders */}
          <div className="pointer-events-none absolute inset-2 border border-gold/70" />
          <div className="pointer-events-none absolute inset-3 border border-gold/25" />

          <FrameCorners inset="inset-2" />

          <ArchFrame className="pointer-events-none absolute inset-x-4 top-5 h-[65%] w-[calc(100%-2rem)] opacity-40" />

          <div className="relative z-10">

            {/* Bismillah */}
            <Crescent className="mx-auto h-8 w-8 text-gold-dark" />

            <p
              lang="ar"
              dir="rtl"
              className="mt-3 font-arabic text-2xl text-pine"
            >
              {text.bismillahArabic}
            </p>



            <GoldDivider className="mt-6" />

            {/* Family welcome */}
            <p className="mt-7 font-serif text-xl leading-relaxed text-pine sm:text-2xl">
              {text.hostFamily}
            </p>

            <p className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold-dark">
              {text.welcomeMessage}
            </p>

            {/* Personalized guest name */}
            <div className="mt-6">

              <p className="mt-2 font-serif text-2xl font-semibold text-pine sm:text-3xl break-words">
                {guestName}
              </p>

              <div className="mx-auto mt-3 h-px w-16 bg-gold/60" />
            </div>

            <GoldDivider className="mt-6" />

            {/* Couple initials */}
            <p
              className="mt-7 font-serif text-7xl font-medium leading-none tracking-tight text-pine sm:text-8xl"
              aria-label={`${initials[0]} and ${initials[1]}`}
            >
              {initials[0]}
              <span className="mx-2 font-script text-5xl font-normal text-gold-dark">
                &amp;
              </span>
              {initials[1]}
            </p>

            {/* Wedding greeting */}
            <p className="mt-6 font-serif text-2xl italic text-olive-dark sm:text-3xl">
              {text.coverGreeting}
            </p>


            {/* Open invitation */}
            <button
              type="button"
              onClick={open}
              disabled={opening}
              autoFocus
              className="btn btn-primary mt-8 w-full px-7 py-3 shadow-md"
            >
              <MailOpen className="h-4 w-4" aria-hidden="true" />
              Open Invitation
            </button>

            <p className="mt-4 text-[0.6rem] uppercase tracking-[0.2em] text-olive/70">
              {text.blessing}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
