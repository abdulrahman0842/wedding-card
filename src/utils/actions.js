import { weddingConfig, coupleNames } from '../data/weddingConfig';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/** Clipboard write with a legacy fallback for older / non-secure contexts. */
export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** Native Web Share where available; otherwise copy the invitation URL. */
export async function shareInvitation(notify) {
  const url = weddingConfig.shareUrl || window.location.href;
  const data = {
    title: `${coupleNames} · Wedding Invitation`,
    text: `You're cordially invited to the wedding of ${coupleNames}.`,
    url,
  };
  if (navigator.share) {
    try {
      await navigator.share(data);
      return;
    } catch (err) {
      if (err?.name === 'AbortError') return; // user closed the share sheet
    }
  }
  const ok = await copyText(url);
  notify(ok ? 'Invitation link copied to clipboard' : 'Could not copy — please copy the page URL');
}

export const printInvitation = () => window.print();
