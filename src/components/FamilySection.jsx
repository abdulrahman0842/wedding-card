import { weddingConfig } from '../data/weddingConfig';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function Family({ person }) {
  return (
    <div className="rounded-2xl border border-gold-dark/40 bg-white/60 px-6 py-8 text-center shadow-sm">
      <p className="eyebrow">{person.relation}</p>
      <p className="mt-3 font-serif text-3xl leading-snug text-pine">{person.parents}</p>
      <p className="mt-3 text-sm text-olive-dark">
        {person.relation === 'Son of' ? 'Parents of the groom,' : 'Parents of the bride,'}{' '}
        <span className="font-medium">{person.full}</span>
      </p>
    </div>
  );
}

export default function FamilySection() {
  const { couple, text } = weddingConfig;
  return (
    <section aria-labelledby="family-title" className="bg-ivory px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading id="family-title" eyebrow="With our families" title="Family Invitation">
          {text.familyMessage}
        </SectionHeading>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Family person={couple.groom} />
          </Reveal>
          <Reveal delay={120}>
            <Family person={couple.bride} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
