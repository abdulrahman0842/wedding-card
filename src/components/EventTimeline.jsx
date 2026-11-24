import { BookOpen, CheckCircle2, Heart, Moon, Sparkles, Users, Utensils } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { formatShortDate } from '../utils/date';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { PatternBg } from './Ornaments';

const ICONS = {
  arrival: Users,
  ceremony: BookOpen,
  dua: Sparkles,
  couple: Heart,
  dinner: Utensils,
  end: CheckCircle2,
};

function TimelineColumn({ event }) {
  return (
    <div className="rounded-2xl border border-gold/40 bg-pine-dark/50 p-6 backdrop-blur-sm sm:p-8">
      <h3 className="text-center text-3xl text-ivory">
        {formatShortDate(event)} <span className="text-gold">–</span> {event.shortName}
      </h3>

      <ol className="relative mt-8 space-y-7 before:absolute before:bottom-3 before:left-[1.35rem] before:top-3 before:w-px before:bg-gradient-to-b before:from-gold before:via-gold/60 before:to-gold/20">
        {event.timeline.map((step) => {
          const Icon = ICONS[step.icon] ?? Moon;
          return (
            <li key={step.time + step.label} className="relative flex items-center gap-4">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold bg-pine text-gold-light">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium tracking-wider text-gold-light">
                  {step.time}
                </p>
                <p className="font-serif text-xl text-ivory">{step.label}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function EventTimeline() {
  return (
    <section id="timeline" aria-labelledby="timeline-title" className="relative overflow-hidden bg-pine px-5 py-20 text-ivory sm:py-28">
      <PatternBg opacity={0.1} />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading id="timeline-title" eyebrow="Schedule" title="Wedding Timeline" tone="dark" />
        <div className="grid gap-6 md:grid-cols-2">
          {weddingConfig.events.map((event, i) => (
            <Reveal key={event.id} delay={i * 120}>
              <TimelineColumn event={event} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}