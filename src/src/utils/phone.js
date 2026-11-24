/**
 * Phone validation.
 *  - With a leading "+": international number, 8–15 digits (E.164 range).
 *  - Without "+": a 10-digit Indian mobile number starting 6–9 (optionally prefixed by 0 or 91).
 *  - Rejects obviously fake numbers such as 0000000000 or 9999999999.
 */
export function validatePhone(raw) {
  const value = raw.trim();
  if (!value) return 'Phone number is required';
  if (!/^\+?[\d\s\-()]+$/.test(value)) return 'Use digits only (spaces, dashes and + are fine)';

  const digits = value.replace(/\D/g, '');
  if (/^(\d)\1+$/.test(digits)) return 'Please enter a valid phone number';

  if (value.startsWith('+')) {
    return digits.length >= 8 && digits.length <= 15
      ? ''
      : 'International numbers need 8–15 digits';
  }

  let national = digits;
  if (national.length === 12 && national.startsWith('91')) national = national.slice(2);
  else if (national.length === 11 && national.startsWith('0')) national = national.slice(1);

  return /^[6-9]\d{9}$/.test(national)
    ? ''
    : 'Enter a valid 10-digit mobile number (or use +country code)';
}
