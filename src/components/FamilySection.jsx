
import { weddingConfig } from '../data/weddingConfig';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function FamilySection() {
  const { text } = weddingConfig;

  const familyMembers = [
    {
      name: 'Ansari Saad',
      relation: 'S/O Akhlaque Ahmed',
    },
    {
      name: 'Saifurrahman',
      relation: 'S/O Ashfaque Ahmed',
    },
    {
      name: 'Umar',
      relation: 'S/O Ansari Saad',
    },
  ];

  return (
    <section
      aria-labelledby="family-title"
      className="relative overflow-hidden bg-ivory px-5 py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-2xl">
        <SectionHeading
          id="family-title"
          eyebrow="Host & Invitation"
          title="Family Invitation"
        >
          {text.familyMessage}
        </SectionHeading>

        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-gold-dark/40 bg-white/60 px-6 py-10 text-center shadow-sm sm:px-12 sm:py-12">

            {/* Hosts */}
            <p className="eyebrow">With Best Compliments From</p>

            <h3 className="mt-5 font-serif text-3xl leading-relaxed text-pine sm:text-4xl">
              Akhlaque Ahmed
              <span className="block my-1 text-xl text-gold-dark">&</span>
              Ashfaque Ahmed
            </h3>

            <p className="mt-4 text-sm tracking-wide text-olive-dark">
              Sons of Late Saleem Ahmed
            </p>

            {/* Divider */}
            <div className="mx-auto my-9 flex max-w-xs items-center gap-4">
              <div className="h-px flex-1 bg-gold-dark/40" />
              <span className="text-lg text-gold-dark">✦</span>
              <div className="h-px flex-1 bg-gold-dark/40" />
            </div>

            {/* Awaiting your presence */}
            <p className="eyebrow">Awaiting Your Presence</p>

            <div className="mt-7 space-y-6">
              {familyMembers.map((member, index) => (
                <div key={member.name}>
                  <p className="font-serif text-2xl text-pine sm:text-3xl">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm text-olive-dark">
                    {member.relation}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-9 h-px max-w-20 bg-gold-dark/50" />

            <p className="mt-5 font-serif text-lg italic text-olive-dark">
              Your gracious presence will be an honour to us
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
