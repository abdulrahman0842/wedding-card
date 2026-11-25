/**
 * Single source of truth for the invitation.
 * Edit this file to change names, dates, venues, timings and copy —
 * no component contains hard-coded wedding details.
 *
 * Dates are plain "YYYY-MM-DD" and times are 24h "HH:mm", interpreted in
 * `timezone` / `utcOffset` below (Asia/Kolkata has no daylight saving, so a
 * fixed +05:30 offset is always correct).
 */
export const weddingConfig = {
  timezone: 'Asia/Kolkata',
  utcOffset: '+05:30',

  // Leave empty to use the page's own URL when sharing.
  shareUrl: '',

  // Optional background music. Leave `src` empty to hide the music control.
  // Put an audio file in /public (e.g. /public/audio/nasheed.mp3) and set
  // src: './audio/nasheed.mp3'. It is always muted/paused until the guest taps it.
  music: { src: '', label: 'Background music' },

  couple: {
    initials: ['A', 'M'],
    groom: {
      first: 'Abdul Rahman',
      full: 'Abdul Rahman Akhlaque Ahmed',
      relation: 'Son of',
      parents: 'Mr. Akhlaque Ahmed',
    },
    bride: {
      first: 'Maryam',
      full: 'Maryam Akhtar Husain',
      relation: 'Daughter of',
      parents: 'Mr. Akhtar Husain',
    },
  },

  text: {
  bismillahArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  bismillahLatin: 'Bismillahir Rahmanir Raheem',
  blessing: 'With the blessings of Allah (SWT)',

  coverGreeting: "You're Cordially Invited",
  hostFamily: 'The Family of Late Saleem Ahmed',
  welcomeMessage: 'Cordially Welcomes You',

  weddingMessage:
    'With the blessings of Allah (SWT), we joyfully invite you to celebrate the beginning of our new journey together.',
  heroRequest:
    'We request the pleasure of your company as we celebrate our wedding festivities.',
  familyMessage:
    'Together with our families, we invite you to share in our happiness and bless us with your presence.',
  footerSignoff: ['With love and duas,', 'Abdul Rahman & Maryam'],
  footerLine: 'We look forward to celebrating these special moments with you.',
  jazakArabic: 'جزاك الله خيراً',
  jazakLatin: 'JazakAllahu Khairan',
},

  ayah: {
    arabic:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ',
    translation:
      'And among His signs is that He created for you spouses from among yourselves so that you may find tranquility in them, and He placed between you affection and mercy.',
    reference: 'Quran – Surah Ar-Rum (30:21)',
  },

  // Two separate events. Never merge them — each has its own date, venue and links.
 events: [
  {
    id: 'nikah',
    name: 'Nikah Ceremony',
    shortName: 'Nikah',
    art: 'mosque',
    theme: 'nikah',
    date: '2026-12-22',
    time: 'After Asr Namaz (Jama\'at at 4:00 PM)',
    venue: 'Masjid Jameela',
    address: 'Saleem Munshi Nagar, Malegaon',
    info: 'The Nikah ceremony will take place at the mosque after Asr Namaz (Jama\'at at 4:00 PM).',
    dressCode: 'Traditional / Modest Attire',
    // Optional overrides (e.g. a precise Google Maps share link). Leave empty to auto-generate.
    mapsUrl: '',
    directionsUrl: '',
    timeline: [
      { time: '4:00 PM', label: 'Asr Namaz (Jama\'at)', icon: 'arrival' },
      { time: 'After Asr', label: 'Nikah ceremony', icon: 'ceremony' },
      { time: 'Followed by', label: 'Dua and congratulations', icon: 'dua' },
    ],
  },
  {
    id: 'walima',
    name: 'Walima Reception',
    shortName: 'Walima',
    art: 'lawn',
    theme: 'walima',
    date: '2026-12-23',
    time: '8:00 PM',
    venue: 'Lotus Lawns',
    address: '80 ft. road, behind Naurang Colony, Malegaon',
    info: 'Join us for an evening of celebration, dinner and togetherness.',
    dressCode: 'Traditional / Formal Attire',
    mapsUrl: '',
    directionsUrl: '',
    timeline: [
      { time: '8:00 PM', label: 'Guest arrival & dinner', icon: 'dinner' },
    ],
  },
],

  rsvp: {
    maxGuests: 10,
    maxMessageLength: 300,
  },

  nav: [
    { id: 'home', label: 'Home' },
    { id: 'countdown', label: 'Countdown' },
    { id: 'events', label: 'Events' },
    { id: 'timeline', label: 'Schedule' },

  ],
};

export const coupleNames = `${weddingConfig.couple.groom.first} & ${weddingConfig.couple.bride.first}`;
