
// ============================================================================
// API CONFIGURATION
// ============================================================================
// SECURITY NOTES:
// - All hardcoded API keys have been REMOVED for security
// - Keys are loaded from environment variables only
// - SUPABASE_SERVICE_ROLE is intentionally excluded (never expose in frontend)
// - In production, consider moving sensitive API calls to a backend proxy
// ============================================================================

export const API_KEYS = {
  // === PUBLIC / CLIENT-SAFE KEYS ===
  
  // Supabase PUBLIC configuration (anon key is designed for client use with RLS)
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON: import.meta.env.VITE_SUPABASE_ANON || '',
  // NOTE: SUPABASE_SERVICE_ROLE must NEVER be in client code

  // Firebase PUBLIC configuration (designed to be public with security rules)
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || '',
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || '',
  FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
  
  // IP Info (public tier, client-safe)
  IPINFO_TOKEN: import.meta.env.VITE_IPINFO_TOKEN || '',
  IPAPI_KEY: import.meta.env.VITE_IPAPI_KEY || '',
  
  // === API KEYS (load from environment variables) ===
  // These should ideally be proxied through a backend in production
  
  // Abstract APIs
  ABSTRACT_EMAIL_REPUTATION: import.meta.env.VITE_ABSTRACT_EMAIL_REPUTATION || '',
  ABSTRACT_PHONE_VALIDATION: import.meta.env.VITE_ABSTRACT_PHONE_VALIDATION || '',
  ABSTRACT_VAT_VALIDATION: import.meta.env.VITE_ABSTRACT_VAT_VALIDATION || '',
  
  // Security/Breach APIs
  ENZOIC: import.meta.env.VITE_ENZOIC || '',
  VIRUSTOTAL_API_KEY: import.meta.env.VITE_VIRUSTOTAL_API_KEY || '',
  ABUSEIPDB_API_KEY: import.meta.env.VITE_ABUSEIPDB_API_KEY || '',
  
  // Threat Intelligence APIs
  SHODAN_API_KEY: import.meta.env.VITE_SHODAN_API_KEY || '',
  CENSYS_API_ID: import.meta.env.VITE_CENSYS_API_ID || '',
  CENSYS_API_SECRET: import.meta.env.VITE_CENSYS_API_SECRET || '',
  GREYNOISE_API_KEY: import.meta.env.VITE_GREYNOISE_API_KEY || '',
  ALIENVAULT_OTX_API_KEY: import.meta.env.VITE_ALIENVAULT_OTX_API_KEY || '',
  
  // SMS Service (Twilio)
  TWILIO_ACCOUNT_SID: import.meta.env.VITE_TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: import.meta.env.VITE_TWILIO_AUTH_TOKEN || '',
  TWILIO_PHONE_NUMBER: import.meta.env.VITE_TWILIO_PHONE_NUMBER || ''
};

// API Base URLs (these are not secrets)
export const API_BASE_URLS = {
  SHODAN: 'https://api.shodan.io',
  CENSYS: 'https://search.censys.io/api',
  GREYNOISE: 'https://api.greynoise.io',
  ALIENVAULT_OTX: 'https://otx.alienvault.com/api/v1',
  IPAPI: 'https://ipapi.co'
};
