// =========================================================================
// ANUGRAHA EYE HOSPITAL - SECURE AUTHENTICATION CLIENT (Supabase Auth)
// =========================================================================

(function() {
  'use strict';

  const authClient = {
    /**
     * Sign in using Supabase Auth Email/Password
     */
    async signIn(email, password) {
      const client = window.getSupabaseClient();
      if (!client) {
        // Fallback for initial local setup/demo if keys are pending configuration
        if (email === 'web@admin' && password === 'Admin@2001') {
          sessionStorage.setItem('anugraha_admin_auth', 'true');
          sessionStorage.setItem('anugraha_admin_user', JSON.stringify({ email: 'web@admin', role: 'admin' }));
          return { user: { email: 'web@admin' }, session: { access_token: 'local-dev-mock-token' }, error: null };
        }
        return { user: null, session: null, error: { message: "Supabase is not configured yet. Configure js/config.js with your project credentials." } };
      }

      let cleanEmail = email.trim();
      if (cleanEmail === 'web@admin' || cleanEmail === 'admin') {
        cleanEmail = 'admin@anugrahaeyehospital.com';
      }

      try {
        const { data, error } = await client.auth.signInWithPassword({
          email: cleanEmail,
          password: password
        });

        if (error) {
          return { user: null, session: null, error };
        }

        sessionStorage.setItem('anugraha_admin_auth', 'true');
        sessionStorage.setItem('anugraha_admin_user', JSON.stringify(data.user));

        if (window.cmsClient && typeof window.cmsClient.logAuditEvent === 'function') {
          window.cmsClient.logAuditEvent('SIGN_IN', 'AUTH', { email: data.user?.email });
        }

        return { user: data.user, session: data.session, error: null };
      } catch (err) {
        return { user: null, session: null, error: { message: err.message } };
      }
    },

    /**
     * Sign out current admin user
     */
    async signOut() {
      sessionStorage.removeItem('anugraha_admin_auth');
      sessionStorage.removeItem('anugraha_admin_user');

      const client = window.getSupabaseClient();
      if (client) {
        try {
          await client.auth.signOut();
        } catch (e) {
          console.warn("[Auth] SignOut error:", e);
        }
      }
      return { error: null };
    },

    /**
     * Check if currently authenticated
     */
    async isAuthenticated() {
      const client = window.getSupabaseClient();
      if (client) {
        try {
          const { data } = await client.auth.getSession();
          if (data && data.session) {
            sessionStorage.setItem('anugraha_admin_auth', 'true');
            return true;
          }
        } catch (e) {
          // ignore
        }
      }
      return sessionStorage.getItem('anugraha_admin_auth') === 'true';
    },

    /**
     * Get current user details
     */
    async getCurrentUser() {
      const client = window.getSupabaseClient();
      if (client) {
        try {
          const { data } = await client.auth.getUser();
          if (data && data.user) return data.user;
        } catch (e) {
          // ignore
        }
      }
      const raw = sessionStorage.getItem('anugraha_admin_user');
      return raw ? JSON.parse(raw) : null;
    },

    /**
     * Listen for auth state changes
     */
    onAuthStateChange(callback) {
      const client = window.getSupabaseClient();
      if (client && client.auth) {
        return client.auth.onAuthStateChange((event, session) => {
          if (session) {
            sessionStorage.setItem('anugraha_admin_auth', 'true');
          } else {
            sessionStorage.removeItem('anugraha_admin_auth');
          }
          if (typeof callback === 'function') callback(event, session);
        });
      }
    }
  };

  window.authClient = authClient;
})();
