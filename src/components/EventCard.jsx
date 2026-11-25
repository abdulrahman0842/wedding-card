
import {
  CalendarDays,
  CalendarPlus,
  Clock,
  MapPin,
  Navigation,
  Info,
} from 'lucide-react';

import { formatLongDate } from '../utils/date';
import {
  googleCalendarUrl,
  mapsDirectionsUrl,
  mapsViewUrl,
} from '../utils/links';
import { LawnIllustration, MosqueIllustration } from './Illustrations';

const THEMES = {
  nikah: {
    card: 'border-pine/20',
    header: 'bg-pine text-ivory',
    badge: 'border-gold/50 text-gold-light',
    title: 'text-ivory',
    icon: 'text-gold-dark',
    primary: 'btn-primary',
    Art: MosqueIllustration,
    subtitle: 'A blessed beginning',
    label: 'Day One · Nikah',
  },
  walima: {
    card: 'border-gold-dark/30',
    header: 'bg-[#F0E6D2] text-pine',
    badge: 'border-gold-dark/50 text-gold-dark',
    title: 'text-pine',
    icon: 'text-gold-dark',
    primary: 'btn-gold',
    Art: LawnIllustration,
    subtitle: 'A celebration of togetherness',
    label: 'Day Two · Walima',
  },
};

function Detail({ icon: Icon, label, iconClass, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand/50">
        <Icon className={`h-4 w-4 ${iconClass}`} aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-olive">
          {label}
        </dt>

        <dd className="mt-1 text-base leading-relaxed text-pine [overflow-wrap:anywhere]">
          {children}
        </dd>
      </div>
    </div>
  );
}

export default function EventCard({ event }) {
  const t = THEMES[event.theme] ?? THEMES.nikah;

  return (
    <article
      aria-labelledby={`${event.id}-title`}
      className={`flex h-full flex-col overflow-hidden rounded-xl border bg-ivory shadow-[0_18px_45px_-24px_rgba(11,61,46,0.35)] ${t.card}`}
    >
      {/* Event artwork */}
      <div className="relative h-48 overflow-hidden sm:h-56">
        <t.Art className="absolute inset-0 h-full w-full" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        <div className="absolute left-5 top-5">
          <span
            className={`inline-block border bg-pine-dark/70 px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] backdrop-blur-sm ${t.badge}`}
          >
            {t.label}
          </span>
        </div>
      </div>

      {/* Event heading */}
      <div className={`px-5 py-6 text-center sm:px-7 ${t.header}`}>
        <p className="text-xs italic opacity-75">{t.subtitle}</p>

        <h3
          id={`${event.id}-title`}
          className={`mt-1 font-serif text-4xl font-medium ${t.title}`}
        >
          {event.name}
        </h3>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col px-5 py-6 sm:px-7">
        <div className="grid grid-cols-2 gap-4 border-b border-gold/25 pb-6">
          <div>
            <div className="flex items-center gap-2 text-olive">
              <CalendarDays className="h-4 w-4" />
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider">
                Date
              </span>
            </div>

            <p className="mt-2 font-serif text-lg font-medium leading-tight text-pine">
              {formatLongDate(event)}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-olive">
              <Clock className="h-4 w-4" />
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider">
                Time
              </span>
            </div>

            <p className="mt-2 font-serif text-lg font-medium text-pine">
              {event.time}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <Detail icon={MapPin} label="Venue" iconClass={t.icon}>
            <span className="font-semibold">{event.venue}</span>

            <address className="mt-1 text-sm not-italic text-olive-dark">
              {event.address}
            </address>
          </Detail>

          {event.info && (
            <Detail icon={Info} label="Good to know" iconClass={t.icon}>
              <span className="text-sm text-olive-dark">{event.info}</span>
            </Detail>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-3 pt-8">
          <a
            href={mapsDirectionsUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn w-full ${t.primary}`}
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get Directions
            <span className="sr-only"> (opens in a new tab)</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={mapsViewUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-xs"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              View Map
            </a>

            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-xs"
            >
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              Calendar
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
