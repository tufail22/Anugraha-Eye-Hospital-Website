// =========================================================================
// ANUGRAHA EYE HOSPITAL - CLIENT CONFIGURATION & CLOUD KEYS
// =========================================================================

/**
 * Configure your Supabase project credentials below.
 * Project: anugraha-eye-hospital-2021 (fihrlxfitctsedthcdlf)
 * Region: ap-south-1
 * 
 * NOTE: The anonKey is a PUBLIC key safe for browser clients.
 * All write security is strictly enforced by PostgreSQL Row-Level Security (RLS).
 * Never put your service_role key here.
 */
window.SUPABASE_CONFIG = {
  // Your Supabase Project URL
  url: window.ENV_SUPABASE_URL || "https://fihrlxfitctsedthcdlf.supabase.co",
  
  // Your Supabase Public Anon Key
  anonKey: window.ENV_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaHJseGZpdGN0c2VkdGhjZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NjYyNjEsImV4cCI6MjEwMjU0MjI2MX0.EaAigAleExL1TivVnnc1l49joj5HEExd-QsY1aG28Kc",
  
  // Cloud Storage bucket name for images/media
  storageBucket: "hospital-media"
};
