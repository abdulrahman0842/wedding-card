import { weddingConfig } from '../data/weddingConfig';

const { timezone, utcOffset } = weddingConfig;

/** Absolute instants for an event, built with the explicit wedding-timezone offset. */
export const eventStart = (event) => new Date(`${event.date}T${event.startTime}:00${utcOffset}`);
export const eventEnd = (event) => new Date(`${event.date}T${event.endTime}:00${utcOffset}`);

const parts = (date, options) =>
  Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: timezone, ...options })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );

/** "15 December 2026" */
export function formatShortDate(event) {
  const p = parts(eventStart(event), { day: 'numeric', month: 'long', year: 'numeric' });
  return `${p.day} ${p.month} ${p.year}`;
}

/** "Tuesday, 15 December 2026" — weekday is derived, never hard-coded. */
export function formatLongDate(event) {
  const p = parts(eventStart(event), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return `${p.weekday}, ${p.day} ${p.month} ${p.year}`;
}

export function formatWeekday(event) {
  return parts(eventStart(event), { weekday: 'long' }).weekday;
}

/** "13:05" -> "1:05 PM" */
export function formatTime12(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`;
}

export const formatTimeRange = (event) =>
  `${formatTime12(event.startTime)} – ${formatTime12(event.endTime)}`;

/**
 * Countdown state for an event.
 *  - upcoming: now < start  -> remaining days/hours/minutes/seconds
 *  - live:     start <= now <= end
 *  - completed: now > end   (never negative values)
 */
export function getCountdown(event, nowMs) {
  const start = eventStart(event).getTime();
  const end = eventEnd(event).getTime();

  if (nowMs < start) {
    const total = Math.floor((start - nowMs) / 1000);
    return {
      status: 'upcoming',
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
    };
  }
  return { status: nowMs <= end ? 'live' : 'completed' };
}
