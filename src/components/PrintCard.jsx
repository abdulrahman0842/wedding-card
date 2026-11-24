import { weddingConfig, coupleNames } from '../data/weddingConfig';
import { formatLongDate, formatTimeRange } from '../utils/date';

/** Print-only wedding card. Hidden on screen; everything else is hidden when printing. */
export default function PrintCard() {
  const { couple, text, events, ayah } = weddingConfig;
  return (
    <div className="hidden print:block">
      <div className="mx-auto max-w-[170mm] border-[3px] border-double border-[#8A6A22] px-10 py-12 text-center text-[#0B3D2E]">
        <p lang="ar" dir="rtl" className="font-arabic text-3xl">
          {text.bismillahArabic}
        </p>
        <p className="mt-1 font-serif text-lg italic">{text.bismillahLatin}</p>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#8A6A22]">{text.blessing}</p>

        <h1 className="mt-6 font-serif text-6xl leading-tight">
          {couple.groom.first}
          <span className="block font-script text-4xl text-[#8A6A22]">&amp;</span>
          {couple.bride.first}
        </h1>
        <p className="mx-auto mt-6 max-w-md font-serif text-xl italic">{text.weddingMessage}</p>

        <div className="mt-8 grid grid-cols-2 gap-6 border-y border-[#8A6A22]/60 py-6 text-left">
          {events.map((e) => (
            <div key={e.id} className="break-inside-avoid">
              <h2 className="font-serif text-2xl">{e.name}</h2>
              <p className="mt-2 text-sm">{formatLongDate(e)}</p>
              <p className="text-sm">{formatTimeRange(e)}</p>
              <p className="mt-2 text-sm font-medium">{e.venue}</p>
              <p className="text-sm">{e.address}</p>
              <p className="mt-2 text-xs">Dress code: {e.dressCode}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-md font-serif text-lg italic">“{ayah.translation}”</p>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#8A6A22]">{ayah.reference}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <p>
            <span className="block text-xs uppercase tracking-widest text-[#8A6A22]">{couple.groom.relation}</span>
            {couple.groom.parents}
          </p>
          <p>
            <span className="block text-xs uppercase tracking-widest text-[#8A6A22]">{couple.bride.relation}</span>
            {couple.bride.parents}
          </p>
        </div>

        <p className="mt-8 font-serif text-xl italic">
          {text.footerSignoff[0]} {coupleNames}
        </p>
        <p lang="ar" dir="rtl" className="mt-3 font-script text-2xl">
          {text.jazakArabic}
        </p>
      </div>
    </div>
  );
}
