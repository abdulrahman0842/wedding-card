import { weddingConfig, coupleNames } from '../data/weddingConfig';
import { formatLongDate, formatTimeRange } from './date';

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

// "2026-12-15" + "11:00" -> "20261215T110000" (local wall-clock time, paired with ctz below)
const compact = (date, time) => `${date.replaceAll('-', '')}T${time.replace(':', '')}00`;

/** Google Calendar "add event" link, using the event's own date/time and the wedding timezone. */
export function googleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.name} – ${coupleNames}`,
    dates: `${compact(event.date, event.startTime)}/${compact(event.date, event.endTime)}`,
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
