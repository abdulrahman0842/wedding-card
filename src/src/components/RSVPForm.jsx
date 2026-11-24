import { useState } from 'react';
import { CalendarPlus, CheckCircle2, Loader2, Send } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { formatShortDate } from '../utils/date';
import { googleCalendarUrl } from '../utils/links';
import { validatePhone } from '../utils/phone';
import { submitRSVP } from '../services/rsvpService';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { FrameCorners } from './Ornaments';

const { events, rsvp } = weddingConfig;

const OPTIONS = [
  ...events.map((e) => ({ value: e.id, label: e.shortName, sub: formatShortDate(e) })),
  { value: 'both', label: 'Both Events', sub: events.map((e) => e.shortName).join(' & ') },
];

const EMPTY = { name: '', phone: '', guests: '1', attending: '', message: '' };

function validate(v) {
  const errors = {};
  const name = v.name.trim();
  if (!name) errors.name = 'Please enter your name';
  else if (name.length < 2) errors.name = 'Name is too short';
  else if (!/\p{L}/u.test(name)) errors.name = 'Name must contain letters';

  const phoneError = validatePhone(v.phone);
  if (phoneError) errors.phone = phoneError;

  const guests = Number(v.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > rsvp.maxGuests)
    errors.guests = `Choose between 1 and ${rsvp.maxGuests} guests`;

  if (!v.attending) errors.attending = 'Please select which event(s) you will attend';
  return errors;
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-800">
      {message}
    </p>
  );
}

export default function RSVPForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const set = (field) => (e) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onBlur = (field) => () => {
    const next = validate(values);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      document.getElementById(`rsvp-${firstKey}`)?.focus();
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const record = await submitRSVP({
        name: values.name.trim(),
        phone: values.phone.trim(),
        guests: Number(values.guests),
        attending: values.attending,
        message: values.message.trim(),
      });
      setSaved(record);
    } catch {
      setSubmitError('Something went wrong while saving your response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const attendedEvents = saved
    ? events.filter((ev) => saved.attending === 'both' || saved.attending === ev.id)
    : [];

  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="relative bg-ivory-dark px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <SectionHeading id="rsvp-title" eyebrow="Kindly reply" title="RSVP">
          Let us know which celebration(s) you will honour us with your presence at.
        </SectionHeading>

        <Reveal>
          <div className="relative bg-ivory px-5 py-9 shadow-[0_20px_50px_-25px_rgba(11,61,46,0.45)] sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute inset-2 border border-gold-dark/50" />
            <FrameCorners inset="inset-2" />

            {saved ? (
              <div className="relative text-center" role="status">
                <CheckCircle2 className="mx-auto h-14 w-14 text-gold-dark" aria-hidden="true" />
                <h3 className="mt-4 text-4xl text-pine">JazakAllahu Khairan, {saved.name.split(' ')[0]}!</h3>
                <p className="mx-auto mt-3 max-w-md text-olive-dark">
                  Your response has been received. We have noted{' '}
                  <strong>
                    {saved.guests} {saved.guests === 1 ? 'guest' : 'guests'}
                  </strong>{' '}
                  for{' '}
                  <strong>
                    {saved.attending === 'both'
                      ? 'both the Nikah and the Walima'
                      : `the ${attendedEvents[0].name}`}
                  </strong>
                  . We can’t wait to celebrate with you.
                </p>
                <p className="mt-2 text-xs text-olive">
                  Demo mode: your reply is stored on this device only.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
                  {attendedEvents.map((ev) => (
                    <a
                      key={ev.id}
                      href={googleCalendarUrl(ev)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                      Add {ev.shortName} to Calendar
                    </a>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn mt-3 text-olive-dark underline-offset-4 hover:underline"
                  onClick={() => setSaved(null)}
                >
                  Edit my response
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="relative space-y-6">
                <div>
                  <label htmlFor="rsvp-name" className="mb-1.5 block text-sm font-medium text-pine">
                    Guest name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="rsvp-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={80}
                    value={values.name}
                    onChange={set('name')}
                    onBlur={onBlur('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
                    className="field"
                    placeholder="Your full name"
                  />
                  <FieldError id="rsvp-name-error" message={errors.name} />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rsvp-phone" className="mb-1.5 block text-sm font-medium text-pine">
                      Phone number <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="rsvp-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      maxLength={20}
                      value={values.phone}
                      onChange={(e) =>
                        set('phone')({ target: { value: e.target.value.replace(/[^\d+\s\-()]/g, '') } })
                      }
                      onBlur={onBlur('phone')}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'rsvp-phone-error' : 'rsvp-phone-hint'}
                      className="field"
                      placeholder="98765 43210"
                    />
                    {errors.phone ? (
                      <FieldError id="rsvp-phone-error" message={errors.phone} />
                    ) : (
                      <p id="rsvp-phone-hint" className="mt-1.5 text-xs text-olive">
                        10-digit mobile, or +country code
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="rsvp-guests" className="mb-1.5 block text-sm font-medium text-pine">
                      Number of guests <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="rsvp-guests"
                      name="guests"
                      value={values.guests}
                      onChange={set('guests')}
                      aria-invalid={Boolean(errors.guests)}
                      aria-describedby={errors.guests ? 'rsvp-guests-error' : undefined}
                      className="field"
                    >
                      {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'guest' : 'guests'} (including you)
                        </option>
                      ))}
                    </select>
                    <FieldError id="rsvp-guests-error" message={errors.guests} />
                  </div>
                </div>

                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-pine">
                    Will you attend? <span aria-hidden="true">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {OPTIONS.map((opt, i) => (
                      <label key={opt.value} className="cursor-pointer">
                        <input
                          id={i === 0 ? 'rsvp-attending' : undefined}
                          type="radio"
                          name="attending"
                          value={opt.value}
                          checked={values.attending === opt.value}
                          onChange={set('attending')}
                          className="peer sr-only"
                          aria-describedby={errors.attending ? 'rsvp-attending-error' : undefined}
                        />
                        <span className="block rounded-lg border border-gold-dark/40 bg-white/70 px-3 py-3 text-center transition peer-checked:border-pine peer-checked:bg-pine peer-checked:text-ivory peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2 hover:border-gold-dark">
                          <span className="block font-serif text-xl leading-tight">{opt.label}</span>
                          <span className="mt-0.5 block text-xs opacity-80">{opt.sub}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <FieldError id="rsvp-attending-error" message={errors.attending} />
                </fieldset>

                <div>
                  <label htmlFor="rsvp-message" className="mb-1.5 block text-sm font-medium text-pine">
                    Message for the couple <span className="font-normal text-olive">(optional)</span>
                  </label>
                  <textarea
                    id="rsvp-message"
                    name="message"
                    rows={3}
                    maxLength={rsvp.maxMessageLength}
                    value={values.message}
                    onChange={set('message')}
                    className="field resize-y"
                    placeholder="Share your duas and good wishes…"
                  />
                  <p className="mt-1 text-right text-xs text-olive">
                    {values.message.length}/{rsvp.maxMessageLength}
                  </p>
                </div>

                {submitError && (
                  <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                    {submitError}
                  </p>
                )}

                <button type="submit" disabled={submitting} className="btn btn-primary w-full py-3.5 text-base">
                  {submitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  )}
                  {submitting ? 'Sending…' : 'Confirm Attendance'}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
