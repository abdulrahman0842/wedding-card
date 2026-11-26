
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Navbar() {
  const { nav, couple } = weddingConfig;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [solid, setSolid] = useState(false);

  // Highlight the section currently in view
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (en) => en.isIntersecting && setActive(en.target.id)
        ),
      { rootMargin: '-45% 0px -50% 0px' },
    );

    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [nav]);

  // Navbar background on scroll
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const link = (id, label, mobile) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => setOpen(false)}
      aria-current={active === id ? 'true' : undefined}
      className={
        mobile
          ? `block rounded-lg px-4 py-3 text-base tracking-wide ${
              active === id
                ? 'bg-gold/20 text-gold-light'
                : 'text-ivory/90'
            }`
          : `relative px-3 py-2 text-sm tracking-widest uppercase transition-colors ${
              active === id
                ? 'text-gold-light'
                : 'text-ivory/80 hover:text-ivory'
            }`
      }
    >
      {label}
    </a>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 print:hidden ${
        solid || open
          ? 'bg-pine-dark/95 shadow-lg backdrop-blur'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-6xl items-center gap-8 px-4"
      >
        <a
          href="#home"
          className="font-serif text-2xl text-gold-light"
          aria-label="Back to the top of the invitation"
        >
          {couple.initials[0]}{' '}
          <span className="text-gold">&amp;</span>{' '}
          {couple.initials[1]}
        </a>

        <div className="hidden items-center md:flex ml-auto">
          {nav.map((n) => link(n.id, n.label, false))}
        </div>

        <div className="ml-auto flex items-center">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ivory/90 transition hover:bg-gold/20 hover:text-gold-light md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open
              ? <X className="h-6 w-6" aria-hidden="true" />
              : <Menu className="h-6 w-6" aria-hidden="true" />
            }
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-gold/30 px-3 pb-4 pt-2 md:hidden"
        >
          {nav.map((n) => link(n.id, n.label, true))}
        </div>
      )}
    </header>
  );
}
