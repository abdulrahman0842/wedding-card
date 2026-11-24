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
      full: 'Abdul Rahman ',
      relation: 'Son of',
      parents: 'Mr. Akhlaque Ahmed',
    },
    bride: {
      first: 'Maryam',
      full: 'Maryam',
      relation: 'Daughter of',
      parents: 'Mr. Akhtar Husain',
    },
  },

  text: {
    bismillahArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    bismillahLatin: 'Bismillahir Rahmanir Raheem',
    blessing: 'With the blessings of Allah (SWT)',
    coverGreeting: "You're Cordially Invited",
    weddingMessage:
      'With the blessings of Allah (SWT), we joyfully invite you to celebrate the beginning of our new journey together.',
    heroRequest:
      'We request the pleasure of your company as we celebrate our wedding festivities.',
    familyMessage:
      'Together with our families, we invite you to share in our happiness and bless us with your presence.',
    footerSignoff: ['With love and duas,', 'Abdulrahman & Ayesha'],
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
      date: '2026-12-15',
      startTime: '11:00',
      endTime: '12:30',
      venue: 'Jameel Masjid',
      address: 'Saleem Munshi nagar, Malegaon, Maharashtra 423203, India',
      info: 'The Nikah ceremony will take place at the mosque. Guests are requested to arrive 15 minutes early.',
      dressCode: 'Traditional / Modest Attire',
      // Optional overrides (e.g. a precise Google Maps share link). Leave empty to auto-generate.
      mapsUrl: '',
      directionsUrl: '',
      timeline: [
        { time: '10:45', label: 'Guest arrival', icon: 'arrival' },
        { time: '11:00', label: 'Nikah ceremony begins', icon: 'ceremony' },
        { time: '12:00', label: 'Dua and congratulations', icon: 'dua' },
        { time: '12:30', label: 'Ceremony concludes', icon: 'end' },
      ],
    },
    {
      id: 'walima',
      name: 'Walima Reception',
      shortName: 'Walima',
      art: 'lawn',
      theme: 'walima',
      date: '2026-12-18',
      startTime: '19:00',
      endTime: '22:30',
      venue: 'Royal Celebration Lawns',
      address: 'Mumbai Agra Highway, Malegaon, Maharashtra 423203, India',
      info: 'Join us for an evening of celebration, dinner and togetherness.',
      dressCode: 'Traditional / Formal Attire',
      mapsUrl: '',
      directionsUrl: '',
      timeline: [
        { time: '19:00', label: 'Guest arrival', icon: 'arrival' },
        { time: '19:30', label: "Couple's arrival", icon: 'couple' },
        { time: '20:00', label: 'Dinner', icon: 'dinner' },
        { time: '22:30', label: 'Celebration concludes', icon: 'end' },
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
    { id: 'rsvp', label: 'RSVP' },
  ],
};

export const coupleNames = `${weddingConfig.couple.groom.first} & ${weddingConfig.couple.bride.first}`;
