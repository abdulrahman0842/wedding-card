import { GoldDivider } from './Ornaments';

export default function SectionHeading({ eyebrow, title, children, tone = 'light', id }) {
  const dark = tone === 'dark';
  return (
    <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      {eyebrow && <p className={`eyebrow ${dark ? '!text-gold-light' : ''}`}>{eyebrow}</p>}
      <h2
        id={id}
        className={`mt-3 text-4xl font-medium leading-tight sm:text-5xl ${
          dark ? 'text-ivory' : 'text-pine'
        }`}
      >
        {title}
      </h2>
      <GoldDivider className="mt-4" />
      {children && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? 'text-ivory/85' : 'text-olive-dark'}`}>
          {children}
        </p>
      )}
    </header>
  );
}
