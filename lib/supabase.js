// =========================================================================
// ANUGRAHA EYE HOSPITAL - SUPABASE CLIENT INITIALIZATION & HEALTH CHECK
// =========================================================================

(function() {
  'use strict';

  let client = null;
  let connectionState = {
    isConfigured: false,
    isConnected: false,
    lastChecked: null,
    error: null
  };

  function initSupabase() {
    const config = window.SUPABASE_CONFIG || {};
    const url = config.url && config.url.trim();
    const key = config.anonKey && config.anonKey.trim();

    if (!url || !key || url.includes("your-project-id")) {
      connectionState.isConfigured = false;
      connectionState.isConnected = false;
      return null;
    }

    if (typeof window.supabase === 'undefined' || typeof window.supabase.createClient !== 'function') {
      console.warn("[Supabase] Supabase JS SDK not loaded yet.");
      return null;
    }

    try {
      client = window.supabase.createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      connectionState.isConfigured = true;
      return client;
    } catch (err) {
      console.error("[Supabase] Initialization error:", err);
      connectionState.error = err.message;
      return null;
    }
  }

  async function checkConnection() {
    if (!client) {
      client = initSupabase();
    }
    if (!client) {
      connectionState.isConnected = false;
      return false;
    }

    try {
      const { data, error } = await client
        .from('cms_site_settings')
        .select('id')
        .limit(1);

      if (error && error.code !== 'PGRST116') {
        connectionState.isConnected = false;
        connectionState.error = error.message;
        return false;
      }

      connectionState.isConnected = true;
      connectionState.error = null;
      connectionState.lastChecked = new Date();
      return true;
    } catch (err) {
      connectionState.isConnected = false;
      connectionState.error = err.message;
      return false;
    }
  }

  window.getSupabaseClient = function() {
    if (!client) {
      client = initSupabase();
    }
    return client;
  };

  window.isSupabaseConfigured = function() {
    const config = window.SUPABASE_CONFIG || {};
    return !!(config.url && config.anonKey && !config.url.includes("your-project-id"));
  };

  window.getSupabaseConnectionState = function() {
    return { ...connectionState };
  };

  window.checkSupabaseConnection = checkConnection;

  // Attempt initial check once DOM is ready
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      initSupabase();
      checkConnection();
    });
  }
})();
