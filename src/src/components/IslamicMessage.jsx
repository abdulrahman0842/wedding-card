import { weddingConfig } from '../data/weddingConfig';
import { Crescent, FloralBorder, FrameCorners, PatternBg } from './Ornaments';
import Reveal from './Reveal';

export default function IslamicMessage() {
  const { ayah } = weddingConfig;
  return (
    <section aria-label="Islamic wedding message" className="relative overflow-hidden bg-sand/60 px-5 py-20 sm:py-28">
      <PatternBg color="#8A6A22" opacity={0.08} />
      <Reveal className="relative mx-auto max-w-3xl">
        <figure className="relative bg-ivory px-6 py-14 text-center shadow-[0_20px_50px_-25px_rgba(11,61,46,0.45)] sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute inset-2 border border-gold-dark/60" />
          <div className="pointer-events-none absolute inset-3.5 border border-gold/40" />
          <FrameCorners inset="inset-2" />

          <Crescent className="mx-auto h-9 w-9 text-gold" />
          <blockquote>
            <p lang="ar" dir="rtl" className="mt-5 font-arabic text-2xl leading-[2.1] text-pine sm:text-3xl sm:leading-[2.1]">
              {ayah.arabic}
            </p>
            <FloralBorder className="my-4 h-6" />
            <p className="font-serif text-2xl italic leading-relaxed text-olive-dark sm:text-3xl">
              “{ayah.translation}”
            </p>
          </blockquote>
          <figcaption className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">
            {ayah.reference}
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
