import { useEffect, useState } from 'react';
import { CalendarCheck, PartyPopper } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { formatLongDate, formatTimeRange, getCountdown } from '../utils/date';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { PatternBg } from './Ornaments';

function Unit({ value, label }) {
  return (
    <div className="flex min-w-0 flex-col items-center">
      <div className="w-full rounded-xl border border-gold-dark/40 bg-ivory py-3 text-center shadow-inner sm:py-4">
        <span className="font-serif text-4xl font-semibold tabular-nums text-pine sm:text-5xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-olive-dark sm:text-xs">
        {label}
      </span>
    </div>
  );
}

/** One independent countdown, driven by its own event date. */
function CountdownBlock({ event, now, tone }) {
  const state = getCountdown(event, now);
  const accent = tone === 'nikah' ? 'text-pine' : 'text-olive-dark';

  return (
    <div className="rounded-2xl border border-gold-dark/40 bg-white/60 p-5 shadow-sm backdrop-blur-sm sm:p-7">
      <h3 className={`text-center text-3xl font-medium ${accent}`}>Countdown to {event.shortName}</h3>
      <p className="mt-1 text-center text-sm text-olive-dark">
        {formatLongDate(event)} · {formatTimeRange(event)}
      </p>

      <div className="mt-6" role="timer" aria-label={`Countdown to ${event.shortName}`}>
        {state.status === 'upcoming' && (
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <Unit value={state.days} label="Days" />
            <Unit value={state.hours} label="Hours" />
            <Unit value={state.minutes} label="Minutes" />
            <Unit value={state.seconds} label="Seconds" />
          </div>
        )}
        {state.status === 'live' && (
          <p className="flex items-center justify-center gap-2 py-6 text-center font-serif text-3xl text-pine">
            <PartyPopper className="h-6 w-6 text-gold-dark" aria-hidden="true" />
            {event.shortName} Celebration Day
          </p>
        )}
        {state.status === 'completed' && (
          <p className="flex items-center justify-center gap-2 py-6 text-center font-serif text-3xl text-pine">
            <CalendarCheck className="h-6 w-6 text-gold-dark" aria-hidden="true" />
            {event.shortName} Completed
          </p>
        )}
      </div>
    </div>
  );
}

export default function WeddingCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="relative overflow-hidden bg-ivory-dark px-5 py-20 sm:py-28">
      <PatternBg color="#8A6A22" opacity={0.07} />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading id="countdown-title" eyebrow="Save the dates" title="Counting the Days">
          {weddingConfig.text.weddingMessage}
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          {weddingConfig.events.map((event, i) => (
            <Reveal key={event.id} delay={i * 120}>
              <CountdownBlock event={event} now={now} tone={event.theme} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
