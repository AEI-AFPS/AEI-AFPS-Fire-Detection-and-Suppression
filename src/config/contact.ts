/**
 * Central contact & company config.
 * All values sourced from .env (VITE_ prefix).
 * Use these constants throughout the app instead of hardcoding strings.
 */

export const CONTACT_PHONE    = import.meta.env.CONTACT_PHONE    ?? '+91 79953 28191';
export const CONTACT_EMAIL    = import.meta.env.CONTACT_EMAIL    ?? 'info@aei-afps.com';
export const CONTACT_ADDRESS  = (import.meta.env.CONTACT_ADDRESS  ?? 'Plot # P2/4, IDA Uppal, Hyderabad, Telangana, Pin-500039, India').replace(/\\n/g, '\n');
export const WHATSAPP_NUMBER  = import.meta.env.WHATSAPP_NUMBER  ?? '917995328191';
export const COMPANY_NAME     = import.meta.env.COMPANY_NAME     ?? 'Associated Engineering Industries';
export const COMPANY_SHORT    = import.meta.env.COMPANY_SHORT    ?? 'AEI FireGuard';
export const COMPANY_DIVISION = import.meta.env.COMPANY_DIVISION ?? 'AFPS Division';
