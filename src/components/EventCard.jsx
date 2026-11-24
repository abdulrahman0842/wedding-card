import { CalendarDays, CalendarPlus, Clock, Copy, MapPin, Navigation, Info } from 'lucide-react';
import { formatLongDate } from '../utils/date';
import { eventSummaryText, googleCalendarUrl, mapsDirectionsUrl, mapsViewUrl } from '../utils/links';
import { copyText } from '../utils/actions';
import { useToast } from '../context/ToastContext';
import { LawnIllustration, MosqueIllustration } from './Illustrations';
import { FloralBorder } from './Ornaments';

const THEMES = {
  nikah: {
    card: 'border-pine/30',
    badge: 'bg-pine text-gold-light',
    title: 'text-pine',
    icon: 'text-pine',
    primary: 'btn-primary',
    Art: MosqueIllustration,
    label: 'Day 1 · Nikah',
  },
  walima: {
    card: 'border-gold-dark/50',
    badge: 'bg-gold-dark text-white',
    title: 'text-olive-dark',
    icon: 'text-gold-dark',
    primary: 'btn-gold',
    Art: LawnIllustration,
    label: 'Day 2 · Walima',
  },
};

function Detail({ icon: Icon, label, iconClass, children }) {
  return (
    <div className="flex gap-3">
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`} aria-hidden="true" />
      <div className="min-w-0">
        <dt className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-olive">{label}</dt>
        <dd className="mt-0.5 text-base text-pine [overflow-wrap:anywhere]">{children}</dd>
      </div>
    </div>
  );
}

export default function EventCard({ event }) {
  const notify = useToast();
  const t = THEMES[event.theme] ?? THEMES.nikah;

  const copyDetails = async () => {
    const ok = await copyText(eventSummaryText(event));
    notify(ok ? `${event.name} details copied` : 'Could not copy — please select the text manually');
  };

  return (
    <article
      aria-labelledby={`${event.id}-title`}
      className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-ivory shadow-[0_18px_40px_-18px_rgba(11,61,46,0.35)] ${t.card}`}
    >
      <div className="relative h-48 sm:h-56">
        <t.Art className="absolute inset-0 h-full w-full" />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] ${t.badge}`}
        >
          {t.label}
        </span>
      </div>
      <FloralBorder className="-mt-1 h-6 bg-ivory text-gold" />

      <div className="flex flex-1 flex-col px-5 pb-6 pt-2 sm:px-7">
        <h3 id={`${event.id}-title`} className={`text-center text-4xl font-medium ${t.title}`}>
          {event.name}
        </h3>

        <dl className="mt-6 space-y-4">
          <Detail icon={CalendarDays} label="Date" iconClass={t.icon}>
            {formatLongDate(event)}
          </Detail>
          <Detail icon={Clock} label="Time" iconClass={t.icon}>
            {event.time}
          </Detail>
          <Detail icon={MapPin} label="Venue" iconClass={t.icon}>
            <span className="font-medium">{event.venue}</span>
            <address className="mt-0.5 text-[0.95rem] not-italic text-olive-dark">{event.address}</address>
          </Detail>
          {event.info && (
            <Detail icon={Info} label="Good to know" iconClass={t.icon}>
              <span className="text-[0.95rem] text-olive-dark">{event.info}</span>
            </Detail>
          )}
        </dl>

        <div className="mt-auto grid gap-2.5 pt-7">
          <a
            href={mapsViewUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${t.primary}`}
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            View Location on Google Maps
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <a
              href={mapsDirectionsUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              Add to Google Calendar
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <button type="button" onClick={copyDetails} className="btn text-olive-dark hover:bg-gold/15">
            <Copy className="h-4 w-4" aria-hidden="true" />
            Copy Event Details
          </button>
        </div>
      </div>
    </article>
  );
}