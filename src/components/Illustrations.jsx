import { useId } from 'react';

const uid = (prefix, raw) => `${prefix}-${raw.replace(/:/g, '')}`;

/** Night-time mosque scene for the Nikah card. */
export function MosqueIllustration({ className = '' }) {
  const raw = useId();
  const sky = uid('sky', raw);
  const glow = uid('glow', raw);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#051F17" />
          <stop offset="0.65" stopColor="#0F5A41" />
          <stop offset="1" stopColor="#E6CF93" />
        </linearGradient>
        <radialGradient id={glow} cx="0.5" cy="0.62" r="0.55">
          <stop offset="0" stopColor="#F6E6B4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F6E6B4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${sky})`} />
      <rect width="400" height="240" fill={`url(#${glow})`} />

      {/* stars */}
      <g fill="#FBF6EA">
        <circle cx="40" cy="30" r="1.4" />
        <circle cx="90" cy="64" r="1" />
        <circle cx="150" cy="22" r="1.2" />
        <circle cx="262" cy="40" r="1" />
        <circle cx="318" cy="70" r="1.4" />
        <circle cx="366" cy="26" r="1.2" />
        <circle cx="206" cy="14" r="0.9" />
        <circle cx="120" cy="96" r="0.8" />
      </g>
      {/* moon */}
      <g transform="translate(302 22)">
        <circle cx="16" cy="16" r="15" fill="#F3E3AE" />
        <circle cx="23" cy="11" r="13" fill="#0B3D2E" opacity="0.92" />
      </g>

      {/* mosque */}
      <g fill="#F7EFD9">
        <rect x="199" y="52" width="2" height="22" />
        <circle cx="200" cy="52" r="3" />
        <path d="M148 168v-26c0-42 22-66 52-66s52 24 52 66v26z" />
        <rect x="140" y="140" width="120" height="6" />
        <path d="M92 168v-18c0-20 12-30 28-30s28 10 28 30v18z" />
        <path d="M252 168v-18c0-20 12-30 28-30s28 10 28 30v18z" />
        {/* minarets */}
        <path d="M44 92l11-40 11 40z" />
        <rect x="48" y="92" width="14" height="76" />
        <rect x="43" y="108" width="24" height="5" />
        <path d="M334 92l11-40 11 40z" />
        <rect x="338" y="92" width="14" height="76" />
        <rect x="333" y="108" width="24" height="5" />
      </g>
      {/* lit windows & door */}
      <g fill="#C9A24D">
        <path d="M188 168v-26a12 12 0 0 1 24 0v26z" />
        <path d="M110 168v-14a6 6 0 0 1 12 0v14z" />
        <path d="M278 168v-14a6 6 0 0 1 12 0v14z" />
        <rect x="53" y="120" width="4" height="9" rx="2" />
        <rect x="343" y="120" width="4" height="9" rx="2" />
        <rect x="53" y="140" width="4" height="9" rx="2" />
        <rect x="343" y="140" width="4" height="9" rx="2" />
      </g>
      {/* ground */}
      <rect y="168" width="400" height="72" fill="#072A20" />
      <path d="M0 168h400v8H0z" fill="#0B3D2E" />
      {/* gold ground line */}
      <rect y="176" width="400" height="1.5" fill="#C9A24D" opacity="0.6" />
    </svg>
  );
}

/** Dusk reception-lawn scene for the Walima card. */
export function LawnIllustration({ className = '' }) {
  const raw = useId();
  const sky = uid('dusk', raw);
  const lawn = uid('lawn', raw);
  // Bulbs placed exactly on the two cubic-bezier segments of the string-light path below.
  const bez = (p0, p1, p2, p3, t) => {
    const m = 1 - t;
    return {
      x: m * m * m * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t * t * t * p3[0],
      y: m * m * m * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t * t * t * p3[1],
    };
  };
  const segments = [
    [[0, 52], [70, 86], [130, 86], [200, 56]],
    [[200, 56], [270, 26], [330, 26], [400, 62]],
  ];
  const bulbs = segments.flatMap((s) =>
    Array.from({ length: 7 }, (_, k) => bez(...s, (k + 0.5) / 7)),
  );
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2F3620" />
          <stop offset="0.55" stopColor="#8A6A22" />
          <stop offset="1" stopColor="#F0D9A0" />
        </linearGradient>
        <linearGradient id={lawn} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B4126" />
          <stop offset="1" stopColor="#1E2314" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${sky})`} />

      {/* distant trees */}
      <g fill="#2A301B" opacity="0.9">
        <circle cx="30" cy="150" r="30" />
        <circle cx="74" cy="158" r="24" />
        <circle cx="330" cy="154" r="28" />
        <circle cx="376" cy="150" r="30" />
      </g>

      {/* pavilion */}
      <g>
        <path d="M110 170V104c0-12 10-20 22-20h136c12 0 22 8 22 20v66z" fill="#FBF6EA" />
        <path d="M96 106c10-30 60-46 104-46s94 16 104 46z" fill="#E6CF93" />
        <path d="M96 106h208" stroke="#8A6A22" strokeWidth="2" />
        <rect x="198" y="46" width="4" height="16" fill="#8A6A22" />
        <circle cx="200" cy="44" r="4" fill="#C9A24D" />
        {/* arches */}
        <g fill="#8A6A22" opacity="0.95">
          <path d="M126 170v-38a16 16 0 0 1 32 0v38z" />
          <path d="M184 170v-46a16 16 0 0 1 32 0v46z" />
          <path d="M242 170v-38a16 16 0 0 1 32 0v38z" />
        </g>
        <g fill="#F7E7B0">
          <path d="M131 170v-34a11 11 0 0 1 22 0v34z" />
          <path d="M189 170v-42a11 11 0 0 1 22 0v42z" />
          <path d="M247 170v-34a11 11 0 0 1 22 0v34z" />
        </g>
      </g>

      {/* string lights */}
      <path
        d="M0 52C70 86 130 86 200 56S330 26 400 62"
        fill="none"
        stroke="#3B4126"
        strokeWidth="1"
        opacity="0.7"
      />
      <g fill="#FFF1B8">
        {bulbs.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y + 3} r="2.4" opacity="0.95" />
        ))}
      </g>

      {/* lawn */}
      <rect y="170" width="400" height="70" fill={`url(#${lawn})`} />
      <path d="M200 170L120 240h160z" fill="#E6CF93" opacity="0.22" />
      {/* round tables */}
      <g>
        <ellipse cx="70" cy="206" rx="26" ry="7" fill="#FBF6EA" opacity="0.95" />
        <ellipse cx="330" cy="206" rx="26" ry="7" fill="#FBF6EA" opacity="0.95" />
        <ellipse cx="200" cy="222" rx="30" ry="8" fill="#FBF6EA" />
        <g fill="#C9A24D">
          <circle cx="70" cy="203" r="3" />
          <circle cx="330" cy="203" r="3" />
          <circle cx="200" cy="218" r="3.4" />
        </g>
      </g>
      <rect y="170" width="400" height="1.5" fill="#C9A24D" opacity="0.6" />
    </svg>
  );
}
