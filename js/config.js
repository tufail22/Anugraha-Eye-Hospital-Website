// =========================================================================
// ANUGRAHA EYE HOSPITAL - CLIENT CONFIGURATION & CLOUD KEYS
// =========================================================================

/**
 * Configure your Supabase project credentials below.
 * Obtain these from: Supabase Dashboard -> Project Settings -> API
 * 
 * NOTE: The anonKey is a PUBLIC key meant for browser clients.
 * All write security is strictly enforced by PostgreSQL Row-Level Security (RLS).
 * Never put your service_role key here.
 */
window.SUPABASE_CONFIG = {
  // Your Supabase Project URL (e.g. "https://xyzcompany.supabase.co")
  url: window.ENV_SUPABASE_URL || "",
  
  // Your Supabase Public Anon Key
  anonKey: window.ENV_SUPABASE_ANON_KEY || "",
  
  // Cloud Storage bucket name for images/media
  storageBucket: "hospital-media"
};
