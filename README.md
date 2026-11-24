# Islamic Wedding Invitation — React + Vite + Tailwind

A digital wedding card for **two separate events**: the Nikah (15 Dec 2026, Masjid-e-Noor) and the Walima (18 Dec 2026, Royal Celebration Lawns).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview
```

Requires Node 18+.

## Change the details

Everything lives in **`src/data/weddingConfig.js`**: names, parents, copy, dates, times, venues, addresses, dress code, timeline steps, RSVP limits and nav. No component hard-codes wedding details.

- Dates are `YYYY-MM-DD`, times are 24h `HH:mm`, read in `timezone` / `utcOffset` (Asia/Kolkata, +05:30). Weekdays are derived from the date.
- Maps and calendar links are generated per event. Set `mapsUrl` / `directionsUrl` on an event to use an exact Google Maps share link instead.
- **Music (optional):** drop a file in `public/audio/`, then set `music.src: './audio/your-file.mp3'`. With `src` empty no control is shown. Music never autoplays and starts only when a guest taps the button.

## RSVP backend

`src/services/rsvpService.js` stores replies in `localStorage` (demo). Replace the body of `submitRSVP` with a Supabase insert (example included in the file); the form needs no changes.

## Structure

```
src/
  App.jsx                      page composition, cover state
  data/weddingConfig.js        all wedding content
  utils/                       date/timezone, map + calendar links, share/copy, phone validation
  services/rsvpService.js      RSVP persistence
  components/
    InvitationCover, HeroSection, WeddingCountdown, EventsSection, EventCard,
    EventTimeline, IslamicMessage, FamilySection, RSVPForm, Footer, PrintCard,
    Navbar, BackToTop, MusicControl, Reveal, Ornaments, Illustrations
```

## Notes

- Print (`Ctrl/Cmd+P` or the printer button) outputs a dedicated one-page card; the rest of the site is hidden.
- `prefers-reduced-motion` disables animations and the cover opens instantly.
- Fonts (Cormorant Garamond, Jost, Amiri, Aref Ruqaa) load from Google Fonts.
