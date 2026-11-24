import { ChevronDown } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { formatShortDate, formatWeekday } from '../utils/date';
import { Crescent, GoldDivider, MosqueSilhouette, PatternBg } from './Ornaments';

export default function HeroSection({ ready }) {
  const { couple, text, events } = weddingConfig;

  // Staggered entrance once the cover has started opening
  const anim = (delay) =>
    ready ? { className: 'animate-fade-up', style: { animationDelay: `${delay}ms` } } : { className: 'opacity-0' };

  return (
    <section
      id="home"
      aria-labelledby="couple-names"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-pine px-5 pb-44 pt-24 text-center text-ivory sm:pb-52"
    >
      <PatternBg opacity={0.13} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(20,87,63,0.6),rgba(7,42,32,0.92)_80%)]" />
      <div className="pointer-events-none absolute inset-3 border border-gold/40 sm:inset-5" />
      <div className="pointer-events-none absolute inset-[18px] hidden border border-gold/20 sm:block" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div {...anim(100)}>
          <Crescent className="mx-auto h-8 w-8 text-gold" />
          <p lang="ar" dir="rtl" className="mt-3 font-arabic text-3xl text-gold-light sm:text-4xl">
            {text.bismillahArabic}
          </p>
          <p className="mt-2 font-serif text-xl italic text-ivory/95">{text.bismillahLatin}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gold-light">{text.blessing}</p>
        </div>

        <div {...anim(300)}>
          <h1 id="couple-names" className="mt-8 font-serif font-medium leading-[0.95]">
            <span className="block text-6xl sm:text-8xl">{couple.groom.first}</span>
            <span className="my-2 block font-script text-5xl font-normal text-gold sm:text-6xl" aria-label="and">
              &amp;
            </span>
            <span className="block text-6xl sm:text-8xl">{couple.bride.first}</span>
          </h1>
        </div>

        <div {...anim(550)}>
          <GoldDivider className="mt-8" />
          <p className="mx-auto mt-5 max-w-xl font-serif text-xl italic leading-relaxed text-ivory/95 sm:text-2xl">
            {text.heroRequest}
          </p>
        </div>

        {/* Two separate event dates — never merged */}
        <ul
          {...anim(800)}
          className={`mx-auto mt-9 grid max-w-xl list-none grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 ${
            ready ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          {events.map((event) => (
            <li
              key={event.id}
              className="rounded-lg border border-gold/50 bg-pine-dark/60 px-4 py-4 backdrop-blur-sm"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gold-light">{event.shortName}</p>
              <p className="mt-1 font-serif text-2xl text-ivory">{formatShortDate(event)}</p>
              <p className="text-sm text-ivory/80">{formatWeekday(event)}</p>
            </li>
          ))}
        </ul>
      </div>

      <MosqueSilhouette className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-pine-dark sm:h-44" />
      <a
        href="#countdown"
        aria-label="Scroll to countdown"
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-gold-light"
      >
        <ChevronDown className="h-7 w-7 animate-bob" aria-hidden="true" />
      </a>
    </section>
  );
}
