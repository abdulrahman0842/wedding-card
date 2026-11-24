import { weddingConfig } from '../data/weddingConfig';
import EventCard from './EventCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function EventsSection() {
  return (
    <section id="events" aria-labelledby="events-title" className="bg-ivory px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="events-title" eyebrow="Schedule" title="Wedding Events" />
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {weddingConfig.events.map((event, i) => (
            <Reveal key={event.id} delay={i * 150}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}