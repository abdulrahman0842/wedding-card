/**
 * RSVP persistence.
 *
 * DEMO: responses are stored in localStorage on the guest's device.
 * To go live, replace the body of `submitRSVP` with a real call and keep the
 * same signature — the form needs no other change. Example with Supabase:
 *
 *   import { createClient } from '@supabase/supabase-js';
 *   const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
 *
 *   export async function submitRSVP(payload) {
 *     const { data, error } = await supabase
 *       .from('rsvps')
 *       .insert({
 *         guest_name: payload.name,
 *         phone: payload.phone,
 *         guests: payload.guests,
 *         attending: payload.attending, // 'nikah' | 'walima' | 'both'
 *         message: payload.message,
 *       })
 *       .select()
 *       .single();
 *     if (error) throw error;
 *     return data;
 *   }
 */

const STORAGE_KEY = 'wedding-rsvps-v1';

export function getStoredRSVPs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

/**
 * @param {{name:string, phone:string, guests:number, attending:'nikah'|'walima'|'both', message:string}} payload
 * @returns {Promise<object>} the saved record
 */
export async function submitRSVP(payload) {
  const record = {
    id: globalThis.crypto?.randomUUID?.() ?? `rsvp-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...payload,
  };

  try {
    const all = getStoredRSVPs();
    all.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable (private mode) — still show confirmation in the demo */
  }

  await new Promise((resolve) => setTimeout(resolve, 600)); // simulate network latency
  return record;
}
