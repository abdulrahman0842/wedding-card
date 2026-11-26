
import { weddingConfig } from '../data/weddingConfig';
import {
  Crescent,
  GoldDivider,
  MosqueSilhouette,
  PatternBg,
} from './Ornaments';

export default function Footer() {
  const { text } = weddingConfig;

  return (
    <footer className="relative overflow-hidden bg-pine px-5 pb-36 pt-20 text-center text-ivory print:hidden sm:pb-44">
      <PatternBg opacity={0.1} />

      <div className="relative mx-auto max-w-2xl">
        <Crescent className="mx-auto h-9 w-9 text-gold" />

        <p className="mt-6 font-serif text-3xl italic text-gold-light">
          {text.footerSignoff[0]}
        </p>

        <p className="mt-3 font-serif text-3xl leading-relaxed text-ivory sm:text-4xl">
          {text.footerSignoff[1]}
        </p>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ivory/85">
          {text.footerLine}
        </p>

        <GoldDivider className="mt-8" />

        <p
          lang="ar"
          dir="rtl"
          className="mt-6 font-script text-4xl text-gold-light sm:text-5xl"
        >
          {text.jazakArabic}
        </p>

        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-ivory/80">
          {text.jazakLatin}
        </p>
      </div>

      <MosqueSilhouette className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-pine-dark sm:h-36" />
    </footer>
  );
}
