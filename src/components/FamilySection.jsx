import { weddingConfig } from '../data/weddingConfig';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function FamilySection() {
  const { couple, text } = weddingConfig;
  const { groom } = couple;

  return (
    <section aria-labelledby="family-title" className="bg-ivory px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-xl">
        <SectionHeading id="family-title" eyebrow="Host & Invitation" title="Family Invitation">
          {text.familyMessage}
        </SectionHeading>
        <Reveal>
          <div className="rounded-2xl border border-gold-dark/40 bg-white/60 px-6 py-8 text-center shadow-sm sm:px-10">
            <p className="eyebrow">Cordially invited by</p>
            <p className="mt-3 font-serif text-3xl leading-snug text-pine sm:text-4xl">
              {groom.parents}
            </p>
            <p className="mt-3 text-sm text-olive-dark">
              Father of the groom, <span className="font-medium">{groom.full}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}