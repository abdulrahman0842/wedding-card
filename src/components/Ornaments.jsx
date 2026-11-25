import { useId } from 'react';

/** Repeating eight-pointed-star Islamic geometric pattern (fills its positioned parent). */
export function PatternBg({ color = '#C9A24D', opacity = 0.14, size = 72, className = '' }) {
  const id = `pat-${useId().replace(/:/g, '')}`;
  const c = size / 2;
  const r = size * 0.3;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1">
            <rect x={c - r} y={c - r} width={2 * r} height={2 * r} />
            <rect
              x={c - r}
              y={c - r}
              width={2 * r}
              height={2 * r}
              transform={`rotate(45 ${c} ${c})`}
            />
            <circle cx={c} cy={c} r={r * 0.5} />
          </g>
          <g fill={color}>
            <circle cx="0" cy="0" r="1.6" />
            <circle cx={size} cy="0" r="1.6" />
            <circle cx="0" cy={size} r="1.6" />
            <circle cx={size} cy={size} r="1.6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Gold ornamental divider. Colour comes from `currentColor`. */
export function GoldDivider({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 24"
      className={`mx-auto h-5 w-48 text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M4 12H88" strokeLinecap="round" />
      <path d="M152 12H236" strokeLinecap="round" />
      <path d="M96 12c6-8 14-8 18 0M144 12c-6-8-14-8-18 0" />
      <rect x="114.5" y="6.5" width="11" height="11" transform="rotate(45 120 12)" />
      <rect x="117" y="9" width="6" height="6" transform="rotate(45 120 12)" fill="currentColor" />
      <circle cx="94" cy="12" r="1.6" fill="currentColor" />
      <circle cx="146" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Crescent moon (mask-based so it is crisp at any size). */
export function Crescent({ className = '' }) {
  const id = `cr-${useId().replace(/:/g, '')}`;
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className={className}>
      <defs>
        <mask id={id}>
          <rect width="48" height="48" fill="white" />
          <circle cx="31" cy="20" r="16" fill="black" />
        </mask>
      </defs>
      <circle cx="22" cy="24" r="18" fill="currentColor" mask={`url(#${id})`} />
      <path
        d="M37 30l1.6 3.4 3.7.5-2.7 2.6.7 3.7-3.3-1.8-3.3 1.8.7-3.7-2.7-2.6 3.7-.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function Corner({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className={`absolute h-11 w-11 text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <path d="M2 46V16C2 7 7 2 16 2h30" />
      <path d="M9 46V20c0-7 4-11 11-11h26" opacity="0.5" />
      <path d="M14 14c4 0 7 3 7 7-4 0-7-3-7-7z" fill="currentColor" stroke="none" opacity="0.85" />
      <circle cx="2" cy="2" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Four ornamental corners for a framed card. Parent must be `relative`. */
export function FrameCorners({ inset = 'inset-3' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${inset}`}>
      <Corner className="left-0 top-0" />
      <Corner className="right-0 top-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
    </div>
  );
}

/** Delicate floral strip (repeating sprig + blossom). Colour via `currentColor`. */
export function FloralBorder({ className = '' }) {
  const id = `fl-${useId().replace(/:/g, '')}`;
  return (
    <svg aria-hidden="true" className={`h-8 w-full text-gold ${className}`} preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="84" height="32" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <path d="M0 16c10-9 22-9 32 0s22 9 32 0 14-6 20 0" opacity="0.7" />
            <path d="M24 12c-3-5-1-9 4-10M30 20c4 5 9 5 12 1" opacity="0.6" />
          </g>
          <g fill="currentColor">
            <circle cx="42" cy="16" r="2.2" />
            <circle cx="42" cy="9.8" r="2.6" opacity="0.8" />
            <circle cx="47.9" cy="14.1" r="2.6" opacity="0.8" />
            <circle cx="45.6" cy="21" r="2.6" opacity="0.8" />
            <circle cx="38.4" cy="21" r="2.6" opacity="0.8" />
            <circle cx="36.1" cy="14.1" r="2.6" opacity="0.8" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Subtle mosque skyline silhouette. Colour via `currentColor`. */
export function MosqueSilhouette({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 200"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      fill="currentColor"
    >
      {/* central dome */}
      <rect x="398" y="12" width="4" height="30" />
      <circle cx="400" cy="12" r="5" />
      <path d="M296 150v-30c0-52 42-80 104-80s104 28 104 80v30z" />
      <rect x="284" y="118" width="232" height="8" />
      {/* side domes */}
      <path d="M176 150v-22c0-26 20-38 47-38s47 12 47 38v22z" />
      <path d="M530 150v-22c0-26 20-38 47-38s47 12 47 38v22z" />
      <rect x="221" y="74" width="4" height="18" />
      <rect x="575" y="74" width="4" height="18" />
      {/* minarets */}
      <path d="M94 62L108 14l14 48z" />
      <rect x="98" y="62" width="20" height="88" />
      <rect x="92" y="82" width="32" height="6" />
      <path d="M678 62l14-48 14 48z" />
      <rect x="682" y="62" width="20" height="88" />
      <rect x="676" y="82" width="32" height="6" />
      {/* outer low domes */}
      <path d="M10 150v-14c0-16 14-24 32-24s32 8 32 24v14z" />
      <path d="M726 150v-14c0-16 14-24 32-24s32 8 32 24v14z" />
      {/* base */}
      <rect x="0" y="150" width="800" height="50" />
    </svg>
  );
}


/** Elegant Islamic mihrab-inspired arch frame. */
export function ArchFrame({ className = '', stroke = '#C9A24D' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 520"
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      {/* Outer arch */}
      <path
        d="M12 508V190C12 95 88 12 200 12s188 83 188 178v318"
        stroke={stroke}
        strokeWidth="1.5"
        opacity=".85"
      />

      {/* Inner arch */}
      <path
        d="M25 508V192C25 105 96 26 200 26s175 79 175 166v316"
        stroke={stroke}
        strokeWidth=".7"
        opacity=".5"
      />

      {/* Decorative arch crown */}
      <path
        d="M177 32L200 12l23 20M186 43l14-12 14 12"
        stroke={stroke}
        strokeWidth="1"
        opacity=".8"
      />

      {/* Side ornaments */}
      <path
        d="M12 210c20-12 20-32 0-44M388 210c-20-12-20-32 0-44"
        stroke={stroke}
        strokeWidth="1"
        opacity=".6"
      />

      {/* Base decorations */}
      <path
        d="M12 495h35m306 0h35"
        stroke={stroke}
        strokeWidth="1"
        opacity=".7"
      />

      <circle cx="200" cy="12" r="3" fill={stroke} />
      <circle cx="12" cy="508" r="2" fill={stroke} />
      <circle cx="388" cy="508" r="2" fill={stroke} />
    </svg>
  );
}
