import { weddingConfig, coupleNames } from '../data/weddingConfig';
import { eventEnd, eventStart, formatLongDate, formatTimeRange } from './date';

const place = (event) => `${event.venue}, ${event.address}`;

/** Google Maps "view this place" link for one event's venue. */
export function mapsViewUrl(event) {
  if (event.mapsUrl) return event.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place(event))}`;
}

/** Google Maps turn-by-turn directions to one event's venue. */
export function mapsDirectionsUrl(event) {
  if (event.directionsUrl) return event.directionsUrl;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    place(event),
  )}&travelmode=driving`;
}

// Formats a Date in the wedding timezone as "20261222T160000" (local wall-clock time, paired with ctz)
function compactInWeddingTz(date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: weddingConfig.timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  return `${parts.year}${parts.month}${parts.day}T${parts.hour}${parts.minute}${parts.second}`;
}

/** Google Calendar "add event" link, using the event's own date/time and the wedding timezone. */
export function googleCalendarUrl(event) {
  const start = compactInWeddingTz(eventStart(event));
  const end = compactInWeddingTz(eventEnd(event));

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.name} – ${coupleNames}`,
    dates: `${start}/${end}`,
    ctz: weddingConfig.timezone,
    details: `${event.info}\n\nDress code: ${event.dressCode}`,
    location: place(event),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Plain-text summary for "Copy event details". */
export function eventSummaryText(event) {
  return [
    `${event.name} – ${coupleNames}`,
    formatLongDate(event),
    formatTimeRange(event),
    `${event.venue}`,
    event.address,
    `Dress code: ${event.dressCode}`,
    `Directions: ${mapsViewUrl(event)}`,
  ].join('\n');
}